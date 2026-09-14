import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { discover, type Source, type Context } from './discovery.js';

const output = path.dirname(fileURLToPath(import.meta.url));
const snapshot = JSON.parse(fs.readFileSync(path.join(output, 'source-inventory.json'), 'utf8'));
const sources: Source[] = snapshot.sources;
const json = (file: string) => JSON.parse(sources.find(s => s.file === file)!.text.replace(/^\uFEFF/, ''));
const baseline = json('data/baselines/QB.json');
const locks = json('state/locks.json');
const state = json('state/project-state.json');
if (locks.positions.QB.baseline_file !== 'data/baselines/QB.json' || locks.positions.QB.status !== 'LOCKED'
  || state.positions.QB !== 'LOCKED' || baseline.status !== 'LOCKED' || baseline.position !== 'QB') {
  throw new Error('Authoritative QB lock/state/baseline mismatch: preview aborted.');
}
const ctx: Context = {
  players: json('data/players/registry.json').players, baseline,
  checklist: json('config/madden-entry-order.json').positions.QB.filter((a: string) => a !== 'OVR'),
  verifiedInventory: null,
  trustedSources: { 'data/baselines/QB.json': 'Canonical locked baseline explicitly referenced by state/locks.json; authority covers stored hierarchy only, not absent attributes.' }
};
const result = discover(sources, ctx);
const architecture = sources.filter(s => /config\/positions\/QB\.md$/.test(s.file)).map(s => ({
  source_file: s.file, sha256: s.sha256, status: 'LOCKED/IMPORT_PENDING',
  authority: s.file.includes('!/') ? 'HISTORICAL_BOOTSTRAP_COPY' : 'CANONICAL_PLACEHOLDER',
  sections_present: ['title', 'import-pending status', 'future section checklist'],
  attribute_definitions: [], gameplay_sensitivity_rules: [], scarcity_rules: [], archetype_or_trait_guidance: [],
  missing_sections: ['OVR-sensitive attributes', 'secondary attributes', 'QB evidence-to-trait mapping',
    'gameplay sensitivity rules', 'archetype descriptors', 'verified Madden attribute inventory/order', 'analytical attribute hierarchy', 'QB-specific scarcity documentation'],
  safe_to_import: false, confidence: 'HIGH confidence this is a placeholder; no detailed architecture recoverable'
}));
const preview = { ...result, scope: { repository: snapshot.repository, excluded: snapshot.excluded,
  inventory_count: snapshot.inventory.length, text_sources: sources.length,
  unsupported: snapshot.inventory.filter((i: any) => i.inspection === 'UNSUPPORTED_FORMAT_REVIEW_REQUIRED') },
  locked_hierarchy: { source: 'data/baselines/QB.json', state_verified: true, baseline },
  architecture_artifacts: architecture,
  attribute_inventory: { verified: false, provisional_checklist_only: ctx.checklist,
    reason: 'Editor order is explicitly unverified and is not a complete authoritative Madden attribute inventory.' },
  ovr_calculation: { real_calculation: 'ABSENT', lookup: 'Stored OVR read/copy/display only; no attribute-to-OVR table',
    approximation: 'NONE FOUND', placeholder: 'ParsedAudit ovr_after is supplied by analyst; no calculator invoked',
    sources: ['src/audit-parser.ts', 'src/player-history.ts', 'src/card-spec.ts', 'src/ratings-only.ts',
      'src/export-collector.ts', 'src/validator.ts', 'src/quick-recheck.ts', 'src/audit-validator.ts'] }
};
fs.writeFileSync(path.join(output, 'preview.json'), JSON.stringify(preview, null, 2) + '\n');
const lines = ['# QB artifact inventory and import preview', '',
  `Scanned ${sources.length} text sources across repository and sibling project archive. Complete byte-hash inventory: source-inventory.json.`,
  `Found ${result.candidates.length} structured QB OVR/card records; ${result.candidates.filter(c => c.attributes_present.length).length} with attributes; ${result.would_create.length} proposed creations.`,
  '', 'All logical destinations are preview-only design identifiers, not implemented persistence paths. No importer exists in this utility.',
  '', '## Every relevant artifact', '', '| Source | Disposition | Reason |', '|---|---|---|'];
for (const a of result.artifacts) lines.push(`| ${a.source_file} | ${a.disposition} | ${a.reason.replace(/\|/g, '/')} |`);
lines.push('', '## Every structured QB candidate/version', '',
  'All fields, including source hashes and JSON locations, are retained in preview.json. Missing attributes below use the provisional checklist only; verified full-card completeness is unavailable.', '',
  '| Player ID / name | Position / OVR | Source / location | Authority | Present | Missing | Rejection reasons |', '|---|---|---|---|---|---|---|');
for (const c of result.candidates) lines.push(`| ${c.player_id} / ${c.player_name} | ${c.position} / ${c.OVR} | ${c.source_provenance.source_file} ${c.source_provenance.location} | ${c.approval_status} | ${c.attributes_present.join(', ') || 'none'} | ${c.attributes_missing.join(', ')} | ${c.rejection_reasons.join(', ')} |`);
lines.push('', '## Architecture', '', ...architecture.map(a => `- ${a.source_file}: ${a.authority}; title/status/checklist only. Missing: ${a.missing_sections.join('; ')}.`),
  '', '## Hierarchy copies', '', ...result.hierarchy_copies.map(c => `- ${c.source_file} ${c.location}: ${c.matches_locked_baseline ? 'matches canonical hierarchy and outside controls' : 'CONFLICT: explicit review required'}.`),
  '', '## Conflicting full cards', '', JSON.stringify(result.conflicts, null, 2),
  '', '## Canonical creation preview', '', '```json', JSON.stringify(result.would_create, null, 2), '```');
fs.writeFileSync(path.join(output, 'artifact-report.md'), lines.join('\n') + '\n');
console.log(JSON.stringify({ artifacts: result.artifacts.length, candidates: result.candidates.length,
  cards_with_attributes: result.candidates.filter(c => c.attributes_present.length).length,
  would_create: result.would_create.length, hierarchy_copies: result.hierarchy_copies, architecture }, null, 2));
