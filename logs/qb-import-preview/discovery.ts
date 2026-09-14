import { parse } from 'csv-parse/sync';
import { z } from 'zod';

export interface Source { file: string; sha256: string; text: string }
type Row = Record<string, any>;
export interface Context {
  players: { player_id: string; full_name: string; position: string | null }[];
  baseline: { architecture_version: string; top_10: { player: string; rank: number; ovr: number }[];
    external_controls: { player: string; ovr: number }[]; first_out?: { player: string; ovr: number }; last_in?: { player: string; ovr: number } };
  checklist: string[];
  // Only independently verified completeness inventories belong here, never placeholder editor orders.
  verifiedInventory: string[] | null;
  // Independent approval/provenance proof keyed by exact source path. A status label alone is insufficient.
  trustedSources: Record<string, string>;
}
const rating = z.number().int().min(0).max(99);
export const previewCardSchema = z.object({
  position: z.string().nullable(), player_id: z.string().nullable(), player_name: z.string().nullable(),
  OVR: rating.nullable(), full_madden_rating_set: z.record(rating),
  source_provenance: z.object({ source_file: z.string(), sha256: z.string(), location: z.string(),
    approval_reference: z.string().nullable(), identity_resolution: z.string() }),
  approval_status: z.enum(['APPROVED', 'PROVISIONAL', 'HISTORICAL', 'TEST_ONLY', 'AMBIGUOUS']),
  baseline_rank: z.number().int().nullable(), control_group_role: z.string(),
  architecture_version: z.string().nullable(), import_confidence: z.enum(['HIGH', 'LOW']),
  missing_fields: z.array(z.string()), attributes_present: z.array(z.string()), attributes_missing: z.array(z.string()),
  required_attribute_inventory_verified: z.boolean(), rejection_reasons: z.array(z.string()),
  safe_to_import: z.boolean()
}).strict();
export type PreviewCard = z.infer<typeof previewCardSchema>;
const nameOf = (o: Row): unknown => o.player_name ?? o.full_name ?? o.player ?? o.name;
const ovrOf = (o: Row): unknown => o.OVR ?? o.ovr ?? o.ovr_after;
const isObject = (v: unknown): v is Row => !!v && typeof v === 'object' && !Array.isArray(v);
const testPath = /(^|[\/!._-])(tests?|fixtures?|mocks?)([\/!._-]|$)|smoke/i;

function normalize(o: Row, parent: Row, source: Source, location: string, ctx: Context): PreviewCard {
  const name = nameOf(o);
  const byId = ctx.players.find(p => p.player_id === o.player_id);
  const byName = ctx.players.find(p => p.full_name === name);
  const player = byId ?? byName;
  const position = o.position ?? o.madden_position ?? parent.position ?? player?.position ?? null;
  const rawRatings = o.ratings ?? o.attributes ?? o.full_madden_rating_set
    ?? (Array.isArray(o.ordered_ratings) ? Object.fromEntries(o.ordered_ratings.map((r: Row) => [r.attribute, r.rating]))
      : Object.fromEntries(Object.entries(o).filter(([key]) => key !== 'OVR' && ctx.checklist.includes(key))));
  const ratings: Record<string, number> = {};
  const invalidRatings: string[] = [];
  if (isObject(rawRatings)) for (const [key, value] of Object.entries(rawRatings)) {
    if (rating.safeParse(value).success) ratings[key] = value;
    else invalidRatings.push(key);
  }
  else invalidRatings.push('ratings_not_object');
  const rawOvr = ovrOf(o);
  const ovr = rating.safeParse(rawOvr).success ? rawOvr as number : null;
  const locked = ctx.baseline.top_10.find(p => p.player === player?.full_name);
  const outside = ctx.baseline.external_controls.find(p => p.player === player?.full_name);
  const status = String(o.approval_status ?? o.status ?? parent.status ?? '').toUpperCase();
  const proof = ctx.trustedSources[source.file] ?? null;
  const classification = testPath.test(source.file) || o.mock === true || o.test_only === true ? 'TEST_ONLY'
    : /PROVISIONAL|DRAFT|PENDING|REJECTED/.test(status) ? 'PROVISIONAL'
    : status === 'APPROVED' || (status === 'LOCKED' && !!proof) ? 'APPROVED'
    : /HISTORICAL|SUPERSEDED/.test(status) || source.file.includes('.zip!/') ? 'HISTORICAL' : 'AMBIGUOUS';
  const missing = [];
  if (!player) missing.push('registry_identity');
  if (ovr === null) missing.push('OVR');
  if (!Object.keys(ratings).length) missing.push('full_madden_rating_set');
  if (!ctx.verifiedInventory?.length) missing.push('verified_full_attribute_inventory');
  const architecture = o.architecture_version ?? parent.architecture_version ?? null;
  if (!architecture) missing.push('architecture_version');
  const attrsMissing = (ctx.verifiedInventory ?? ctx.checklist).filter(a => !(a in ratings));
  if (attrsMissing.length) missing.push(...attrsMissing.map(a => `ratings.${a}`));
  const reasons: string[] = [];
  if (classification !== 'APPROVED') reasons.push('NOT_APPROVED');
  if (classification === 'TEST_ONLY') reasons.push('TEST_OR_MOCK_SOURCE');
  if (!proof) reasons.push('UNKNOWN_OR_UNVERIFIED_PROVENANCE');
  if (missing.length) reasons.push('INCOMPLETE_FULL_CARD');
  if (invalidRatings.length || (rawOvr !== undefined && ovr === null)) reasons.push('INVALID_RATING_VALUES');
  if (architecture && architecture !== ctx.baseline.architecture_version) reasons.push('ARCHITECTURE_VERSION_CONFLICT');
  const identityConflict = (o.player_id && o.player_id !== player?.player_id)
    || (name && name !== player?.full_name) || position !== 'QB' || player?.position !== 'QB';
  if (identityConflict) reasons.push('IDENTITY_OR_POSITION_CONFLICT');
  if (((locked ?? outside) && ovr !== null && ovr !== (locked ?? outside)!.ovr)
    || (o.rank !== undefined && o.rank !== locked?.rank)
    || (o.baseline_rank !== undefined && o.baseline_rank !== (locked?.rank ?? null))) reasons.push('LOCKED_HIERARCHY_CONFLICT');
  if (!locked && !outside) reasons.push('NOT_A_LOCKED_CALIBRATION_CONTROL');
  return previewCardSchema.parse({
    position: typeof position === 'string' ? position : null, player_id: player?.player_id ?? o.player_id ?? null,
    player_name: typeof name === 'string' ? name : player?.full_name ?? null, OVR: ovr,
    full_madden_rating_set: ratings,
    source_provenance: { source_file: source.file, sha256: source.sha256, location,
      approval_reference: proof, identity_resolution: byId ? 'exact registry player_id' : byName ? 'exact registry name' : 'unresolved' },
    approval_status: classification, baseline_rank: locked?.rank ?? null,
    control_group_role: locked ? (locked.rank === 10 ? 'LAST_IN_TOP_10' : 'TOP_10')
      : outside ? (ctx.baseline.first_out?.player === outside.player ? 'FIRST_OUT' : 'OUTSIDE_CONTROL') : 'NONE',
    architecture_version: architecture, import_confidence: reasons.length ? 'LOW' : 'HIGH',
    missing_fields: missing, attributes_present: Object.keys(ratings), attributes_missing: attrsMissing,
    required_attribute_inventory_verified: !!ctx.verifiedInventory?.length,
    rejection_reasons: reasons, safe_to_import: reasons.length === 0
  });
}

export function discover(sources: readonly Source[], ctx: Context) {
  const candidates: PreviewCard[] = [];
  const artifacts: { source_file: string; sha256: string; disposition: string; reason: string }[] = [];
  const hierarchyCopies: { source_file: string; location: string; matches_locked_baseline: boolean }[] = [];
  for (const source of sources) {
    const before = candidates.length;
    let parseError = '';
    function walk(value: unknown, location: string, parent: Row = {}) {
      if (Array.isArray(value)) { value.forEach((v, i) => walk(v, `${location}/${i}`, parent)); return; }
      if (!isObject(value)) return;
      const inherited = { ...parent, position: value.position ?? parent.position,
        architecture_version: value.architecture_version ?? parent.architecture_version, status: value.status ?? parent.status };
      if (value.position === 'QB' && Array.isArray(value.top_10)) {
        const fields = (b: Row) => ({ top_10: b.top_10, external_controls: b.external_controls, first_out: b.first_out, last_in: b.last_in });
        hierarchyCopies.push({ source_file: source.file, location,
          matches_locked_baseline: JSON.stringify(fields(value)) === JSON.stringify(fields(ctx.baseline)) });
      }
      const player = ctx.players.find(p => p.player_id === value.player_id || p.full_name === nameOf(value));
      const hasCardData = ovrOf(value) !== undefined || value.ratings || value.attributes || value.full_madden_rating_set || value.ordered_ratings;
      if ((value.player_id || typeof nameOf(value) === 'string') && hasCardData
        && (inherited.position === 'QB' || value.madden_position === 'QB' || player?.position === 'QB')) {
        candidates.push(normalize(value, inherited, source, location, ctx));
      }
      for (const [key, nested] of Object.entries(value)) {
        if (key === 'full_cards' && isObject(nested)) {
          for (const [identity, raw] of Object.entries(nested)) if (isObject(raw)) {
            const registered = ctx.players.find(p => p.player_id === identity || p.full_name === identity);
            walk({ player_name: registered?.full_name ?? identity, ...raw }, `${location}/full_cards/${identity}`, inherited);
          }
          continue;
        }
        if (isObject(nested) || Array.isArray(nested)) walk(nested, `${location}/${key}`, inherited);
      }
    }
    try {
      if (/\.json$/i.test(source.file)) walk(JSON.parse(source.text.replace(/^\uFEFF/, '')), '$');
      else if (/\.csv$/i.test(source.file)) {
        const rows = parse(source.text, { columns: true, skip_empty_lines: true, bom: true });
        rows.forEach((row: Row, i: number) => {
          const ratings: Record<string, number> = {};
          for (const attr of ctx.checklist) if (row[attr]?.trim()) ratings[attr] = Number(row[attr]);
          walk({ ...row, player_name: row.player_name ?? row.Player, position: row.position ?? row.Position,
            ovr: row.OVR?.trim() ? Number(row.OVR) : undefined, ratings }, `row:${i + 2}`);
        });
      } else for (const [i, block] of [...source.text.matchAll(/```json\s*([\s\S]*?)```/gi)].entries()) {
        walk(JSON.parse(block[1]), `json-block:${i + 1}`);
      }
    } catch (error) { parseError = String(error); }
    const relevant = /\bQB\b|quarterback|sensitivity|OVR|scarcity|full.card/i.test(source.text)
      || /QB/i.test(source.file) || ctx.players.some(p => p.position === 'QB' && source.text.includes(p.full_name));
    if (relevant || parseError) artifacts.push({ source_file: source.file, sha256: source.sha256,
      disposition: candidates.length > before ? 'CANDIDATES_EVALUATED' : 'MANUAL_REVIEW_NOT_IMPORTABLE',
      reason: parseError || (candidates.length > before ? 'See candidate-specific decisions.'
        : 'No machine-readable QB full card. Documentation, code, evidence, registry, or unstructured content; cannot import automatically.') });
  }
  const conflictingSources = new Set(hierarchyCopies.filter(c => !c.matches_locked_baseline).map(c => c.source_file));
  for (const c of candidates) if (conflictingSources.has(c.source_provenance.source_file)) {
    c.safe_to_import = false; c.import_confidence = 'LOW'; c.rejection_reasons.push('SOURCE_HIERARCHY_CONFLICT');
  }
  const conflicts: { player_id: string; versions: { source_file: string; location: string; authority: string }[];
    differing_fields: string[]; review_required: boolean }[] = [];
  const groups = new Map<string, PreviewCard[]>();
  for (const c of candidates.filter(c => c.attributes_present.length > 0)) {
    const key = c.player_id ?? c.player_name ?? c.source_provenance.location;
    groups.set(key, [...groups.get(key) ?? [], c]);
  }
  for (const [player_id, cards] of groups) {
    const fields = ['OVR', 'position', 'architecture_version', ...new Set(cards.flatMap(c => c.attributes_present.map(a => `ratings.${a}`)))];
    const value = (c: PreviewCard, field: string) => field.startsWith('ratings.') ? c.full_madden_rating_set[field.slice(8)] : c[field as keyof PreviewCard];
    const differences = fields.filter(f => new Set(cards.map(c => JSON.stringify(value(c, f)))).size > 1);
    if (!differences.length) continue;
    conflicts.push({ player_id, versions: cards.map(c => ({ ...c.source_provenance,
      authority: c.source_provenance.approval_reference && c.approval_status === 'APPROVED' ? 'INDEPENDENTLY_VERIFIED_APPROVED_SOURCE'
        : `${c.approval_status}_WITHOUT_VERIFIED_APPROVAL` })), differing_fields: differences, review_required: true });
    for (const c of cards) { c.safe_to_import = false; c.import_confidence = 'LOW'; c.rejection_reasons.push('CONFLICTING_CARD_VERSIONS_EXPLICIT_REVIEW_REQUIRED'); }
  }
  // Pure projection only. There is intentionally no importer and no filesystem/state API in this module.
  const seen = new Set<string>();
  const would_create = candidates.filter(c => c.safe_to_import).filter(c => {
    const key = c.player_id!; if (seen.has(key)) return false; seen.add(key); return true;
  }).map(record => ({ logical_destination: `calibration/QB/cards/${record.player_id}`, record }));
  return { schema_version: 'qb-import-preview/1', mode: 'READ_ONLY_PREVIEW', requires_explicit_import_approval: true,
    artifacts, candidates, conflicts, hierarchy_copies: hierarchyCopies, would_create };
}
