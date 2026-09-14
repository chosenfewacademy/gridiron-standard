import assert from 'node:assert/strict';
import fs from 'node:fs';
import { QB_ATTRIBUTES, qbArchitectureSchema, qbFullCardSchema, buildReconstructionQueue,
  transitionReconstruction, checkObservedOvr, cardFingerprint, validateScarcity, proposeRevision,
  validateReconstruction, preparePersistence, proposalFingerprint, beginReconstruction, nextReconstructionPlayer } from '../src/qb-reconstruction.js';
import { requiredEvidenceCategories } from '../src/evidence-gate.js';

// Fictional numeric cards only; no actual player receives proposed attributes.
const fixture = (): any => ({
  schema_version: 'qb-reconstruction/1', architecture_version: '1.0.0', reconstruction_architecture_version: '1.0.0',
  player: { player_id: 'fixture_qb', player_name: 'Fixture Quarterback', team: 'TST', position: 'QB' },
  locked_target_ovr: 70, proposed_ovr: null,
  ratings: Object.fromEntries(QB_ATTRIBUTES.map(a => [a, 60])), supplemental_ratings: {},
  sources: [{ source_id: 's1', url: 'https://example.com/fixture', retrieved_at: '2030-01-01T00:00:00Z', description: 'Synthetic evidence' }],
  trait_reviews: Object.fromEntries(QB_ATTRIBUTES.map(a => [a, { confidence: 'HIGH', evidence_confidence: 'HIGH', evidence_tier: 1,
    direct_or_inferred: 'DIRECT', primary_evidence_sources: ['s1'], rationale: 'Synthetic direct evidence', uncertainty_flag: false, source_ids: ['s1'],
    why_not_higher: 'Synthetic upper bound', why_not_lower: 'Synthetic lower bound', sample_size_context: 'Synthetic sample', limitations: [], scarcity_support: [] }])),
  domain_reviews: Object.fromEntries(['arm_strength', 'short_accuracy', 'intermediate_accuracy', 'deep_accuracy', 'pressure_performance',
    'pocket_movement', 'sack_avoidance', 'processing_decision_making', 'play_action', 'throws_on_run', 'scrambling', 'designed_rushing',
    'ball_security', 'durability', 'workload_availability', 'consistency', 'opponent_context_adjustments'].map(d => [d, { assessment: 'Synthetic assessment', source_ids: ['s1'], limitations: [] }])),
  control_comparisons: [], internal_trait_coherence: 'Synthetic coherent build', meaningful_weaknesses: 'Synthetic weakness',
  readiness_vs_reputation: 'Synthetic readiness distinct from reputation', archetype_description: 'Description after trait build',
  scarcity_flags: [], validator_findings: [], approval_status: 'PROPOSED', revision_history: [], observations: []
});
function completeFixture(): any {
  const card = fixture();
  const as_of = '2030-08-20T12:00:00Z';
  const top_10 = [{ player: card.player.player_name, rank: 1, ovr: 70 },
    ...Array.from({ length: 9 }, (_, i) => ({ player: `Synthetic Control ${i}`, rank: i + 2, ovr: 69 }))];
  const external_controls = Array.from({ length: 3 }, (_, i) => ({ player: `Synthetic Outside ${i}`, ovr: 68 }));
  const baseline = { position: 'QB', status: 'LOCKED', architecture_version: '1.0.0', top_10, external_controls,
    last_in: { player: top_10[9].player, ovr: 69 }, first_out: external_controls[0] };
  const registry = [...top_10, ...external_controls].map((p, i) => ({ player_id: i === 0 ? 'fixture_qb' : `synthetic_${i}`, full_name: p.player, position: 'QB' }));
  const url = 'https://www.nfl.com/stats/fixture';
  card.sources[0].url = url; card.sources[0].retrieved_at = as_of;
  card.control_comparisons = registry.slice(1).map(p => ({ player_id: p.player_id, mode: 'HIERARCHY_ONLY',
    card_fingerprint: null, assessment: 'Synthetic sourced comparison', limitations: ['No reconstructed attributes available'], conflict: false }));
  card.observations = [{ observed_ovr: 70, card_fingerprint: cardFingerprint(card), observed_at: as_of, observer: 'Fixture user',
    game_version: 'Synthetic game', platform: 'test', mode: 'test', roster_file: 'fixture', settings: 'synthetic unchanged conditions',
    evidence_ref: 'fixture screenshot', entry_snapshot: { ...card.ratings } }];
  const normalized: any = {};
  for (const r of requiredEvidenceCategories('QB', 'PRESEASON')) {
    const item = { claim: 'Synthetic evidence', source_url: url, retrieved_at: as_of, season: r.layer === 'CURRENT' ? 2030 : 2029,
      period: r.layer === 'CURRENT' ? 'CURRENT_CONTEXT' : r.layer === 'POSTSEASON' ? 'POSTSEASON' : 'REGULAR_SEASON' };
    normalized[r.name] = { status: 'satisfied', confidence: 'HIGH', items: [item], limitations: [], compared_controls: registry.map(p => p.full_name) };
    if (r.layer === 'MULTI_YEAR') normalized[r.name].items.push({ ...item, season: 2028 });
  }
  const evidence = { task_id: 'synthetic-task', position: 'QB', researched_at: as_of,
    sources: [{ name: 'Synthetic data', url, retrieved_at: as_of, published_at: null, authority_tier: 1, claims: ['Synthetic facts'] }],
    normalized, conflicts: [], missing_evidence: [], minimum_evidence_met: true, calendar_web_search_observed: true, fresh_web_research_observed: true,
    calendar: { nfl_season: 2030, player_id: 'fixture_qb', team: 'TST', valid_from: '2030-03-01T00:00:00Z', valid_until: '2031-03-01T00:00:00Z',
      preseason_start: '2030-08-01T00:00:00Z', regular_season_start: '2030-09-01T00:00:00Z', postseason_start: '2031-01-01T00:00:00Z', season_end: '2031-02-01T00:00:00Z',
      current_season_games_available: 0, current_season_games_played: 0, regular_season_games_scheduled: 17, regular_season_complete: false, postseason_complete: false,
      sources: [{ url: 'https://www.nfl.com/schedules/fixture', retrieved_at: as_of, claims: ['Synthetic calendar'] }] } };
  return { card, context: { baseline, registry, evidence, as_of, reconstructed_controls: [] } };
}
export function runQbReconstructionTests(test: (name: string, fn: () => void) => void) {
  test('QB full-card schema requires all attributes and trait analyses', () => {
    assert(qbFullCardSchema.safeParse(fixture()).success);
    for (const attr of QB_ATTRIBUTES) {
      const card = fixture(); delete card.ratings[attr];
      assert(!qbFullCardSchema.safeParse(card).success);
      const review = fixture(); delete review.trait_reviews[attr];
      assert(!qbFullCardSchema.safeParse(review).success);
    }
    const card = fixture(); card.ratings.THP = 100;
    assert(!qbFullCardSchema.safeParse(card).success);
  });
  test('QB architecture covers traits/domains without claiming verified OVR weights', () => {
    const architecture = qbArchitectureSchema.parse(JSON.parse(fs.readFileSync('config/qb-reconstruction-architecture.json', 'utf8')));
    assert.equal(Object.keys(architecture.attributes).length, 19);
    assert.equal(Object.keys(architecture.evidence_domains).length, 17);
    for (const attr of QB_ATTRIBUTES) assert.equal(architecture.attributes[attr].ovr_materiality, 'UNVERIFIED');
  });
  test('machine-readable schemas require the same complete QB trait and domain sets', () => {
    const read = (name: string) => JSON.parse(fs.readFileSync(`schemas/${name}.schema.json`, 'utf8'));
    for (const [name, traitKey, domainKey] of [['qb-full-card', 'ratings', 'domain_reviews'], ['qb-reconstruction-architecture', 'attributes', 'evidence_domains']]) {
      const schema = read(name); const deref = (node: any): any => node.$ref ? schema.$defs[node.$ref.split('/').at(-1)] : node;
      const root = deref(schema);
      assert.deepEqual(deref(root.properties[traitKey]).required, [...QB_ATTRIBUTES]);
      assert.equal(deref(root.properties[domainKey]).required.length, 17);
      assert.equal(deref(root.properties[traitKey]).additionalProperties, false);
    }
  });
  test('QB queue preserves locked hierarchy and registry IDs without mutating baseline', () => {
    const baseline = JSON.parse(fs.readFileSync('data/baselines/QB.json', 'utf8'));
    const registry = JSON.parse(fs.readFileSync('data/players/registry.json', 'utf8')).players;
    const before = JSON.stringify(baseline);
    const queue = buildReconstructionQueue(baseline, registry);
    assert.equal(JSON.stringify(baseline), before);
    assert.equal(queue.length, 13);
    assert.deepEqual(queue.slice(0, 10).map(q => [q.player_name, q.locked_target_ovr]), baseline.top_10.map((p: any) => [p.player, p.ovr]));
    assert(queue.every(q => q.status === 'NOT_STARTED'));
    assert.deepEqual(JSON.parse(fs.readFileSync('config/qb-reconstruction-queue.json', 'utf8')).players, queue);
    const broken = structuredClone(baseline); broken.top_10[0].rank = 2;
    assert.throws(() => buildReconstructionQueue(broken, registry));
  });
  test('reconstruction transitions cannot skip stages or auto-approve', () => {
    const item: any = { player_id: 'fixture_qb', player_name: 'Fixture Quarterback', position: 'QB', rank: 1,
      role: 'TOP_10', locked_target_ovr: 70, status: 'NOT_STARTED' };
    const ready = transitionReconstruction(item, 'RESEARCH_READY');
    assert.equal(item.status, 'NOT_STARTED');
    assert.equal(transitionReconstruction(ready, 'EVIDENCE_INSUFFICIENT').status, 'EVIDENCE_INSUFFICIENT');
    assert.throws(() => transitionReconstruction(item, 'LOCKED'));
    const proposed = { ...item, status: 'PROPOSED' as const };
    for (const status of ['VALIDATED', 'USER_APPROVED', 'LOCKED'] as const) assert.throws(() => transitionReconstruction(proposed, status));
    assert.throws(() => preparePersistence(fixture(), undefined as any, undefined as any));
  });
  test('manual observed OVR remains separate from locked target and proposal', () => {
    const card = fixture();
    assert(checkObservedOvr(card).includes('OBSERVED_OVR_REQUIRED'));
    card.observations.push({ observed_ovr: 69, card_fingerprint: cardFingerprint(card), observed_at: '2030-01-01T00:00:00Z',
      observer: 'fixture user', game_version: 'Madden test build', platform: 'test', mode: 'test', roster_file: 'test',
      settings: 'No boosts; synthetic fixture', evidence_ref: 'fixture screenshot', entry_snapshot: { ...card.ratings } });
    assert(checkObservedOvr(card).includes('LOCKED_TARGET_OVR_MISMATCH'));
    assert.equal(card.locked_target_ovr, 70); assert.equal(card.proposed_ovr, null);
    card.observations[0].observed_ovr = 70;
    assert.deepEqual(checkObservedOvr(card), []);
    card.ratings.THP = 61;
    assert(checkObservedOvr(card).includes('OBSERVATION_CARD_MISMATCH'));
  });
  test('scarcity requires explicit exact-trait support at every crossed threshold', () => {
    const card = fixture(); card.ratings.THP = 99;
    assert.equal(validateScarcity(card).errors.length, 4);
    card.trait_reviews.THP.scarcity_support = [90, 95, 97, 99].map(threshold => ({ threshold, rationale: 'Synthetic exact trait support', source_ids: ['s1'] }));
    assert.equal(validateScarcity(card).errors.length, 0);
    assert.deepEqual(validateScarcity(card).flags.map(f => f.threshold), [90, 95, 97, 99]);
    card.trait_reviews.THP.scarcity_support[3].source_ids = ['unknown'];
    assert(validateScarcity(card).errors.length > 0);
  });
  test('trait revisions require audit rationale and clear obsolete observations', () => {
    const before = fixture(); const next = fixture(); next.ratings.THP = 61;
    assert.throws(() => proposeRevision(before, next, 'audit-fixture', {}));
    const revised = proposeRevision(before, next, 'audit-fixture', { THP: 'New synthetic evidence supports adjustment' });
    assert.equal(before.ratings.THP, 60); assert.equal(revised.approval_status, 'PROPOSED');
    assert.equal(revised.revision_history.length, 1);
    assert.deepEqual(revised.observations, []);
    next.locked_target_ovr = 71;
    assert.throws(() => proposeRevision(before, next, 'audit-fixture', { THP: 'reason' }));
  });
  test('reconstruction preserves unverified editor order and fails closed without calendar evidence', () => {
    const before = fs.readFileSync('config/madden-entry-order.json', 'utf8');
    assert.equal(JSON.parse(before).verified, false);
    const baseline: any = { position: 'QB', status: 'LOCKED', architecture_version: '1.0.0', top_10: [
      { player: 'Fixture Quarterback', rank: 1, ovr: 70 }], external_controls: [] };
    const report = validateReconstruction(fixture(), { baseline, registry: [{ player_id: 'fixture_qb', full_name: 'Fixture Quarterback', position: 'QB' }],
      evidence: { task_id: 'fixture', position: 'QB', sources: [], normalized: {}, conflicts: [], minimum_evidence_met: true, missing_evidence: [], researched_at: '2030-01-01T00:00:00Z' },
      as_of: '2030-01-01T00:00:00Z', reconstructed_controls: [] });
    assert.equal(report.valid, false); assert.equal(report.auto_approve, false);
    assert(report.errors.some(e => e.includes('CALENDAR')));
    assert.equal(fs.readFileSync('config/madden-entry-order.json', 'utf8'), before);
  });
  test('validated synthetic proposal still requires explicit bound approval and persistence receipt', () => {
    const { card, context } = completeFixture();
    const report = validateReconstruction(card, context);
    assert.equal(report.valid, true, report.errors.join('\n')); assert.equal(report.auto_approve, false);
    const queue = buildReconstructionQueue(context.baseline, context.registry);
    assert.throws(() => beginReconstruction(queue, queue[1].player_id));
    const ready = beginReconstruction(queue, queue[0].player_id)[0];
    const proposed = transitionReconstruction(ready, 'PROPOSED', { card, report });
    assert.throws(() => transitionReconstruction(proposed, 'VALIDATED', { card, report }));
    const approval: any = { actor: 'USER', approval_id: 'synthetic-explicit-consent', proposal_fingerprint: proposalFingerprint(card),
      approved_at: context.as_of, acknowledged_flags: report.flags };
    const validated = transitionReconstruction(proposed, 'VALIDATED', { card, report, approval });
    const approved = transitionReconstruction(validated, 'USER_APPROVED', { card, report, approval });
    assert.throws(() => transitionReconstruction(approved, 'LOCKED', { card, report, approval }));
    card.approval_status = 'USER_APPROVED';
    const record = preparePersistence(card, report, approval);
    assert.equal(record.update_current_card, false); assert.equal(record.modify_locked_baseline, false);
    assert.equal(record.validation.minimum_evidence_met, true);
    const locked = transitionReconstruction(approved, 'LOCKED', { card, report, approval, persistence_receipt: 'synthetic-only-receipt' });
    assert.equal(nextReconstructionPlayer([locked, ...queue.slice(1)])?.player_id, queue[1].player_id);
    assert.throws(() => transitionReconstruction(locked, 'RESEARCH_READY'));
  });
  test('forged or edited reports and stale approvals cannot authorize persistence', () => {
    const { card, context } = completeFixture();
    const report = validateReconstruction(card, context); card.approval_status = 'USER_APPROVED';
    const approval: any = { actor: 'USER', approval_id: 'synthetic', proposal_fingerprint: proposalFingerprint(card), approved_at: context.as_of, acknowledged_flags: [...report.flags] };
    assert.throws(() => preparePersistence(card, { ...report }, approval));
    card.trait_reviews.THP.why_not_higher = 'Changed assessment';
    assert.throws(() => preparePersistence(card, report, approval));
    const fresh = completeFixture(); const freshReport = validateReconstruction(fresh.card, fresh.context);
    fresh.card.approval_status = 'USER_APPROVED'; freshReport.flags = [];
    assert.throws(() => preparePersistence(fresh.card, freshReport, { ...approval, proposal_fingerprint: proposalFingerprint(fresh.card) }));
  });
  test('same observed OVR cannot conceal identical builds behind null proposed OVR', () => {
    const { card, context } = completeFixture();
    const control = structuredClone(card);
    control.player.player_id = context.registry[1].player_id;
    control.player.player_name = context.registry[1].full_name;
    control.approval_status = 'LOCKED';
    context.baseline.top_10[1].ovr = 70;
    control.observations[0].card_fingerprint = cardFingerprint(control);
    context.reconstructed_controls = [control];
    card.control_comparisons[0].mode = 'RECONSTRUCTED';
    card.control_comparisons[0].card_fingerprint = cardFingerprint(control);
    const report = validateReconstruction(card, context);
    assert(report.errors.some(e => e.includes('IDENTICAL_SAME_OVR_BUILD')));
  });
}
