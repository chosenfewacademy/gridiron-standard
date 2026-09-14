import { createHash } from 'node:crypto';
import { z } from 'zod';
import { applyFullAuditEvidenceGate } from './evidence-gate.js';
import type { EvidencePackage } from './research.js';

export const QB_ATTRIBUTES = ['THP', 'SAC', 'MAC', 'DAC', 'RUN', 'TUP', 'PAC', 'BSK', 'AWR',
  'SPD', 'ACC', 'AGI', 'COD', 'STR', 'CAR', 'JMP', 'INJ', 'STA', 'TGH'] as const;
export const QB_DOMAINS = ['arm_strength', 'short_accuracy', 'intermediate_accuracy', 'deep_accuracy', 'pressure_performance',
  'pocket_movement', 'sack_avoidance', 'processing_decision_making', 'play_action', 'throws_on_run', 'scrambling',
  'designed_rushing', 'ball_security', 'durability', 'workload_availability', 'consistency', 'opponent_context_adjustments'] as const;
export const RECONSTRUCTION_STATES = ['NOT_STARTED', 'RESEARCH_READY', 'EVIDENCE_INSUFFICIENT', 'PROPOSED', 'VALIDATED', 'USER_APPROVED', 'LOCKED'] as const;
type Attribute = typeof QB_ATTRIBUTES[number];
type Status = typeof RECONSTRUCTION_STATES[number];
const text = z.string().trim().min(1);
const instant = z.string().datetime({ offset: true });
const rating = z.number().int().min(0).max(99);
const confidence = z.enum(['HIGH', 'MEDIUM', 'LOW']);
const threshold = z.union([z.literal(90), z.literal(95), z.literal(97), z.literal(99)]);
function exactMap<K extends string, S extends z.ZodTypeAny>(keys: readonly K[], schema: S) {
  return z.object(Object.fromEntries(keys.map(k => [k, schema])) as Record<K, S>).strict();
}
const rarity = exactMap(['90', '95', '97', '99'] as const, text);
const architectureTrait = z.object({
  football_meaning: text, madden_gameplay_effect: text, engine_effect_status: z.literal('MADDEN_27_UNVERIFIED'),
  supporting_evidence: z.array(text).min(1), forbidden_substitutes: z.array(text).min(1), expected_confidence: text,
  interactions: z.array(z.enum(QB_ATTRIBUTES)).min(1), ovr_materiality: z.literal('UNVERIFIED'),
  mainly_gameplay_identity: z.boolean(), gameplay_role: text, scarcity: rarity
}).strict();
const criticality = z.enum(['CORE_BLOCKING', 'CORE_SUPPORTING', 'SECONDARY_TRAIT', 'CONTEXTUAL']);
const hierarchy = z.array(z.string().regex(/^Tier [1-5]:/)).length(5);
export const qbArchitectureSchema = z.object({
  position: z.literal('QB'), architecture_version: z.literal('1.0.0'), reconstruction_architecture_version: z.literal('1.0.0'),
  status: z.literal('RECONSTRUCTION_FRAMEWORK_NOT_RECOVERED_HISTORY'), editor_order_verified: z.literal(false),
  ovr_formula_status: z.literal('EMPIRICAL_UNVERIFIED'), principles: z.array(text).min(1),
  evidence_domains: exactMap(QB_DOMAINS, text), attributes: exactMap(QB_ATTRIBUTES, architectureTrait),
  evidence_criticality: z.object({ attributes: exactMap(QB_ATTRIBUTES, criticality), domains: exactMap(QB_DOMAINS, criticality) }).strict(),
  evidence_hierarchies: exactMap(QB_ATTRIBUTES, hierarchy),
  confidence_rules: z.object({ core_blocking_low: text, core_supporting_low: text, secondary_trait_low: text,
    low_confidence_scarcity_cap: z.number().int().min(0).max(99) }).strict(),
  engine_source_notes: z.array(z.object({ url: z.string().url(), scope: text })).min(1)
}).strict();
const source = z.object({ source_id: text, url: z.string().url(), retrieved_at: instant, description: text }).strict();
const traitReview = z.object({ confidence, evidence_confidence: confidence, evidence_tier: z.number().int().min(1).max(5),
  direct_or_inferred: z.enum(['DIRECT', 'SUBSTITUTED', 'INFERRED']), primary_evidence_sources: z.array(text).min(1),
  rationale: text, uncertainty_flag: z.boolean(), source_ids: z.array(text).min(1), why_not_higher: text, why_not_lower: text,
  sample_size_context: text, limitations: z.array(text),
  scarcity_support: z.array(z.object({ threshold, rationale: text, source_ids: z.array(text).min(1) }).strict()) }).strict();
const observation = z.object({ observed_ovr: rating, card_fingerprint: text, observed_at: instant, observer: text,
  game_version: text, platform: text, mode: text, roster_file: text, settings: text, evidence_ref: text,
  entry_snapshot: z.record(rating) }).strict();
export const qbFullCardSchema = z.object({
  schema_version: z.literal('qb-reconstruction/1'), architecture_version: z.literal('1.0.0'), reconstruction_architecture_version: z.literal('1.0.0'),
  player: z.object({ player_id: text, player_name: text, team: text, position: z.literal('QB') }).strict(),
  locked_target_ovr: rating, proposed_ovr: rating.nullable(), ratings: exactMap(QB_ATTRIBUTES, rating),
  supplemental_ratings: z.record(rating).refine(r => Object.keys(r).every(k => !QB_ATTRIBUTES.includes(k as Attribute) && k !== 'OVR'), 'Supplemental ratings cannot override QB fields or OVR'),
  sources: z.array(source).min(1), trait_reviews: exactMap(QB_ATTRIBUTES, traitReview),
  domain_reviews: exactMap(QB_DOMAINS, z.object({ assessment: text, source_ids: z.array(text).min(1), limitations: z.array(text) }).strict()),
  control_comparisons: z.array(z.object({ player_id: text, mode: z.enum(['HIERARCHY_ONLY', 'RECONSTRUCTED']),
    card_fingerprint: text.nullable(), assessment: text, limitations: z.array(text), conflict: z.boolean() }).strict()),
  internal_trait_coherence: text, meaningful_weaknesses: text, readiness_vs_reputation: text, archetype_description: text,
  scarcity_flags: z.array(z.object({ attribute: z.enum(QB_ATTRIBUTES), threshold }).strict()),
  validator_findings: z.array(text), approval_status: z.enum(RECONSTRUCTION_STATES),
  revision_history: z.array(z.object({ revision: z.number().int().positive(), prior_proposal_fingerprint: text,
    audit_logic_reference: text, reasons: z.record(text), prior_card_snapshot: z.record(z.unknown()) }).strict()),
  observations: z.array(observation)
}).strict();
export type QbFullCard = z.infer<typeof qbFullCardSchema>;
export interface Baseline {
  position: string; status: string; architecture_version: string;
  top_10: { rank: number; player: string; ovr: number }[];
  external_controls: { player: string; ovr: number }[];
  last_in?: { player: string; ovr: number }; first_out?: { player: string; ovr: number };
}
interface Identity { player_id: string; full_name: string; position: string | null }
export interface ReconstructionItem { player_id: string; player_name: string; position: 'QB'; rank: number | null;
  role: 'TOP_10' | 'FIRST_OUT' | 'OUTSIDE_CONTROL'; locked_target_ovr: number; status: Status }
export function buildReconstructionQueue(baseline: Baseline, registry: Identity[]): ReconstructionItem[] {
  if (baseline.status !== 'LOCKED' || baseline.position !== 'QB' || baseline.architecture_version !== '1.0.0'
    || baseline.top_10.length !== 10 || baseline.top_10.some((p, i) => p.rank !== i + 1)
    || baseline.external_controls.length !== 3) throw new Error('Invalid locked QB hierarchy');
  const controls = [...baseline.top_10, ...baseline.external_controls];
  if (new Set(controls.map(p => p.player)).size !== 13) throw new Error('Duplicate QB controls');
  const last = baseline.top_10[9];
  if (baseline.last_in?.player !== last.player || baseline.last_in.ovr !== last.ovr
    || !baseline.external_controls.some(p => p.player === baseline.first_out?.player && p.ovr === baseline.first_out.ovr)) throw new Error('Boundary control mismatch');
  return controls.map(p => {
    const matches = registry.filter(r => r.full_name === p.player && r.position === 'QB');
    if (matches.length !== 1) throw new Error(`Exact QB registry identity unavailable: ${p.player}`);
    return { player_id: matches[0].player_id, player_name: p.player, position: 'QB', rank: 'rank' in p ? z.number().int().parse(p.rank) : null,
      role: 'rank' in p ? 'TOP_10' : p.player === baseline.first_out?.player ? 'FIRST_OUT' : 'OUTSIDE_CONTROL',
      locked_target_ovr: rating.parse(p.ovr), status: 'NOT_STARTED' };
  });
}
function stable(value: unknown): string {
  if (Array.isArray(value)) return '[' + value.map(stable).join(',') + ']';
  if (value && typeof value === 'object') return '{' + Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => JSON.stringify(k) + ':' + stable(v)).join(',') + '}';
  return JSON.stringify(value);
}
const digest = (value: unknown) => createHash('sha256').update(stable(value)).digest('hex');
// Entry fingerprint changes with every rating, including supplemental attributes. No OVR calculation.
export function cardFingerprint(card: QbFullCard): string { return digest({ player: card.player, ratings: card.ratings, supplemental_ratings: card.supplemental_ratings }); }
export function proposalFingerprint(card: QbFullCard): string {
  const { approval_status, validator_findings, ...proposal } = card; return digest(proposal);
}
export function checkObservedOvr(card: QbFullCard): string[] {
  if (!card.observations.length) return ['OBSERVED_OVR_REQUIRED'];
  const errors: string[] = [];
  const latest = observation.parse(card.observations.at(-1));
  if (latest.card_fingerprint !== cardFingerprint(card)
    || stable(latest.entry_snapshot) !== stable({ ...card.ratings, ...card.supplemental_ratings })) errors.push('OBSERVATION_CARD_MISMATCH');
  if (latest.observed_ovr !== card.locked_target_ovr) errors.push('LOCKED_TARGET_OVR_MISMATCH');
  if (card.proposed_ovr !== null && latest.observed_ovr !== card.proposed_ovr) errors.push('PROPOSED_OBSERVED_OVR_MISMATCH');
  return errors;
}
export function validateScarcity(card: QbFullCard) {
  const flags: { attribute: Attribute; threshold: 90 | 95 | 97 | 99 }[] = [];
  const errors: string[] = [];
  const sources = new Set(card.sources.map(s => s.source_id));
  for (const attr of QB_ATTRIBUTES) for (const level of [90, 95, 97, 99] as const) if (card.ratings[attr] >= level) {
    flags.push({ attribute: attr, threshold: level });
    const support = card.trait_reviews[attr].scarcity_support.find(s => s.threshold === level);
    if (!support?.rationale.trim() || !support.source_ids.length || support.source_ids.some(id => !sources.has(id))
      || card.trait_reviews[attr].confidence !== 'HIGH') errors.push(`${attr}_${level}_EXACT_TRAIT_SUPPORT_REQUIRED`);
  }
  for (const attr of QB_ATTRIBUTES) {
    const review=card.trait_reviews[attr];
    if (review.evidence_confidence !== review.confidence) errors.push(`${attr}_CONFIDENCE_FIELDS_MISMATCH`);
    if (review.evidence_confidence === 'LOW' && card.ratings[attr] >= 90) errors.push(`${attr}_LOW_CONFIDENCE_SCARCITY_PROHIBITED`);
    if (review.evidence_confidence === 'LOW' && ['THP','SAC','MAC','DAC','TUP','BSK','AWR','INJ'].includes(attr)) errors.push(`${attr}_LOW_CORE_BLOCKING_CONFIDENCE`);
    if (review.primary_evidence_sources.some(id => !review.source_ids.includes(id))) errors.push(`${attr}_PRIMARY_SOURCE_NOT_IN_REVIEW_SOURCES`);
    if (review.direct_or_inferred !== 'DIRECT' && !review.uncertainty_flag) errors.push(`${attr}_INFERENCE_REQUIRES_UNCERTAINTY_FLAG`);
  }
  return { flags, errors };
}
export interface ReconstructionContext { baseline: Baseline; registry: Identity[]; evidence: EvidencePackage; as_of: string; reconstructed_controls: QbFullCard[] }
export interface ReconstructionValidation { valid: boolean; auto_approve: false; minimum_evidence_met: boolean;
  errors: string[]; flags: string[]; proposal_fingerprint: string; evidence: EvidencePackage }
// Only reports issued by this validator can authorize transitions; analyst-supplied valid:true is not accepted.
const reports = new WeakMap<ReconstructionValidation, { fingerprint: string; valid: boolean; evidence: boolean; report_digest: string }>();
export function validateReconstruction(input: unknown, context: ReconstructionContext): ReconstructionValidation {
  const card = qbFullCardSchema.parse(input);
  const errors: string[] = []; const flags = ['EMPIRICAL_OVR_CALIBRATION', 'EDITOR_ORDER_UNVERIFIED'];
  let queue: ReconstructionItem[] = [];
  try { queue = buildReconstructionQueue(context.baseline, context.registry); } catch (e) { errors.push(String(e)); }
  const subject = queue.find(p => p.player_id === card.player.player_id);
  if (!subject || subject.player_name !== card.player.player_name || subject.locked_target_ovr !== card.locked_target_ovr) errors.push('LOCKED_IDENTITY_OR_TARGET_CONFLICT');
  const evidence = applyFullAuditEvidenceGate(context.evidence, { task_id: context.evidence.task_id, ...card.player,
    team: card.player.team, position: 'QB', baseline_controls: context.baseline }, context.as_of);
  if (!evidence.minimum_evidence_met) errors.push(...evidence.missing_evidence);
  const sourceIds = new Set(card.sources.map(s => s.source_id));
  if (sourceIds.size !== card.sources.length) errors.push('DUPLICATE_SOURCE_IDS');
  for (const s of card.sources) if (!evidence.sources.some(e => e.url === s.url && e.retrieved_at === s.retrieved_at)) errors.push(`UNTRACEABLE_SOURCE:${s.source_id}`);
  for (const [key, review] of Object.entries({ ...card.trait_reviews, ...card.domain_reviews })) {
    if (review.source_ids.some(id => !sourceIds.has(id))) errors.push(`UNTRACEABLE_REVIEW:${key}`);
    if ('confidence' in review && review.confidence === 'LOW' && ['THP','SAC','MAC','DAC','TUP','BSK','AWR','INJ'].includes(key)) errors.push(`LOW_CORE_TRAIT_CONFIDENCE:${key}`);
    if ('confidence' in review && review.confidence === 'MEDIUM') flags.push(`MEDIUM_TRAIT_REVIEW:${key}`);
  }
  for (const control of queue.filter(p => p.player_id !== card.player.player_id)) {
    const comparison = card.control_comparisons.find(c => c.player_id === control.player_id);
    const rebuilt = context.reconstructed_controls.find(c => c.player.player_id === control.player_id && c.approval_status === 'LOCKED');
    if (!comparison) { errors.push(`CONTROL_COMPARISON_MISSING:${control.player_id}`); continue; }
    if (comparison.conflict) errors.push(`LOCKED_CONTROL_CONFLICT:${control.player_id}`);
    if (rebuilt) {
      if (comparison.mode !== 'RECONSTRUCTED' || comparison.card_fingerprint !== cardFingerprint(rebuilt)) errors.push(`RECONSTRUCTED_CONTROL_MISMATCH:${control.player_id}`);
      const cardOvr = card.observations.at(-1)?.observed_ovr ?? card.proposed_ovr;
      const controlOvr = rebuilt.observations.at(-1)?.observed_ovr ?? rebuilt.proposed_ovr;
      if (cardOvr !== null && cardOvr === controlOvr
        && stable(card.ratings) === stable(rebuilt.ratings)) errors.push(`IDENTICAL_SAME_OVR_BUILD_REVIEW_REQUIRED:${control.player_id}`);
    } else {
      flags.push(`HIERARCHY_ONLY_CONTROL:${control.player_id}`);
      if (comparison.mode !== 'HIERARCHY_ONLY' || comparison.card_fingerprint !== null || !comparison.limitations.length) errors.push(`FABRICATED_OR_UNQUALIFIED_CONTROL:${control.player_id}`);
    }
  }
  if (card.control_comparisons.some(c => !queue.some(q => q.player_id === c.player_id))
    || new Set(card.control_comparisons.map(c => c.player_id)).size !== card.control_comparisons.length) errors.push('INVALID_CONTROL_COMPARISON_IDENTITIES');
  const scarcity = validateScarcity(card); errors.push(...scarcity.errors);
  if (stable(card.scarcity_flags) !== stable(scarcity.flags)) errors.push('SCARCITY_FLAGS_MISMATCH');
  errors.push(...checkObservedOvr(card));
  const result: ReconstructionValidation = { valid: errors.length === 0, auto_approve: false,
    minimum_evidence_met: evidence.minimum_evidence_met, errors, flags, proposal_fingerprint: proposalFingerprint(card), evidence };
  reports.set(result, { fingerprint: result.proposal_fingerprint, valid: result.valid, evidence: evidence.minimum_evidence_met, report_digest: digest(result) });
  return result;
}
export interface UserApproval { actor: 'USER'; approval_id: string; proposal_fingerprint: string; approved_at: string; acknowledged_flags: string[] }
function requireReport(card: QbFullCard, report: ReconstructionValidation | undefined, requireValid: boolean) {
  const issued = report && reports.get(report);
  if (!issued || issued.report_digest !== digest(report) || issued.fingerprint !== proposalFingerprint(card) || !(requireValid ? issued.valid : issued.evidence)) throw new Error('Fresh application-issued validation required');
}
function requireApproval(card: QbFullCard, report: ReconstructionValidation, approval?: UserApproval) {
  requireReport(card, report, true);
  if (!approval || approval.actor !== 'USER' || !approval.approval_id.trim() || !instant.safeParse(approval.approved_at).success
    || approval.proposal_fingerprint !== proposalFingerprint(card) || report.flags.some(f => !approval.acknowledged_flags.includes(f))) throw new Error('Explicit user approval of this exact proposal and flags required');
}
const transitions: Record<Status, readonly Status[]> = {
  NOT_STARTED: ['RESEARCH_READY'], RESEARCH_READY: ['EVIDENCE_INSUFFICIENT', 'PROPOSED'],
  EVIDENCE_INSUFFICIENT: ['RESEARCH_READY'], PROPOSED: ['EVIDENCE_INSUFFICIENT', 'VALIDATED'],
  VALIDATED: ['USER_APPROVED'], USER_APPROVED: ['LOCKED'], LOCKED: []
};
export function transitionReconstruction(item: ReconstructionItem, next: Status, options: {
  card?: QbFullCard; report?: ReconstructionValidation; approval?: UserApproval; persistence_receipt?: string
} = {}): ReconstructionItem {
  if (!transitions[item.status]?.includes(next)) throw new Error(`Forbidden reconstruction transition ${item.status} -> ${next}`);
  if (['PROPOSED', 'VALIDATED', 'USER_APPROVED', 'LOCKED'].includes(next)) {
    const card = qbFullCardSchema.parse(options.card);
    if (card.player.player_id !== item.player_id || card.locked_target_ovr !== item.locked_target_ovr) throw new Error('Queue/card mismatch');
    requireReport(card, options.report, next !== 'PROPOSED');
    if (next !== 'PROPOSED') requireApproval(card, options.report!, options.approval);
    if (next === 'LOCKED' && !options.persistence_receipt?.trim()) throw new Error('Immutable persistence receipt required');
  }
  return { ...item, status: next };
}
export function preparePersistence(card: QbFullCard, report: ReconstructionValidation, approval: UserApproval) {
  requireApproval(card, report, approval);
  if (card.approval_status !== 'USER_APPROVED') throw new Error('USER_APPROVED state required before persistence');
  return { operation: 'APPEND_NEW_RECONSTRUCTION_RECORD_ONLY' as const,
    namespace: 'calibration/reconstructed/QB', record_id: proposalFingerprint(card),
    card: structuredClone(card), approval: structuredClone(approval), validation: structuredClone(report),
    update_current_card: false as const, modify_locked_baseline: false as const };
}
// The application supplies an append-only repository implementation after a future approved audit.
export interface ReconstructionStore { appendNew(record: ReturnType<typeof preparePersistence>): Promise<{ immutable_record_ref: string }> }
export async function persistApprovedReconstruction(card: QbFullCard, report: ReconstructionValidation, approval: UserApproval, store: ReconstructionStore) {
  return store.appendNew(preparePersistence(card, report, approval));
}
export function proposeRevision(previous: QbFullCard, proposed: QbFullCard, auditLogicReference: string, reasons: Record<string, string>): QbFullCard {
  const before = qbFullCardSchema.parse(previous); const next = qbFullCardSchema.parse(proposed);
  if (['USER_APPROVED', 'LOCKED'].includes(before.approval_status)) throw new Error('Approved reconstruction is immutable; a separate audit is required');
  if (stable(before.player) !== stable(next.player) || before.locked_target_ovr !== next.locked_target_ovr) throw new Error('Cannot change identity or locked OVR');
  const oldRatings: Record<string, number> = { ...before.ratings, ...before.supplemental_ratings };
  const newRatings: Record<string, number> = { ...next.ratings, ...next.supplemental_ratings };
  const changed = [...new Set([...Object.keys(oldRatings), ...Object.keys(newRatings)])].filter(a => oldRatings[a] !== newRatings[a]);
  if (!auditLogicReference.trim() || changed.some(a => !reasons[a]?.trim())) throw new Error('Every trait adjustment requires explicit audit logic, not target fitting');
  return { ...next, approval_status: 'PROPOSED', observations: [], validator_findings: [],
    revision_history: [...before.revision_history, { revision: before.revision_history.length + 1,
      prior_proposal_fingerprint: proposalFingerprint(before), audit_logic_reference: auditLogicReference, reasons: structuredClone(reasons),
      prior_card_snapshot: structuredClone(before) }] };
}

export function nextReconstructionPlayer(queue: readonly ReconstructionItem[]): ReconstructionItem | null {
  const first = queue.find(p => p.status !== 'LOCKED');
  return first ? { ...first } : null;
}
export function beginReconstruction(queue: readonly ReconstructionItem[], playerId: string): ReconstructionItem[] {
  if (nextReconstructionPlayer(queue)?.player_id !== playerId) throw new Error('Finish the preceding control before starting another');
  return queue.map(item => item.player_id === playerId ? transitionReconstruction(item, 'RESEARCH_READY') : { ...item });
}
