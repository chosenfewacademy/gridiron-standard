import assert from 'node:assert/strict';
import { discover, type Context, type Source } from './discovery.js';

// Entirely fictional, in-memory fixtures. Never imported into repository state.
const card = { player_id: 'fixture_qb', player_name: 'Fixture QB', position: 'QB', ovr: 70,
  ratings: { A: 60, B: 65 }, status: 'APPROVED', architecture_version: '1.0.0' };
const source = (value: unknown, file = 'approved.json'): Source => ({ file, sha256: 'fixture-hash', text: JSON.stringify(value) });
const context: Context = {
  players: [{ player_id: 'fixture_qb', full_name: 'Fixture QB', position: 'QB' }],
  baseline: { architecture_version: '1.0.0', top_10: [{ player: 'Fixture QB', rank: 1, ovr: 70 }], external_controls: [] },
  checklist: ['A', 'B'], verifiedInventory: ['A', 'B'],
  trustedSources: { 'approved.json': 'fixture approval record verified independently' }
};
let count = 0;
function test(name: string, run: () => void) { run(); console.log(`PASS ${name}`); count++; }
test('approved artifact discovery creates only a preview', () => {
  const result = discover([source(card)], context);
  assert.equal(result.candidates[0].approval_status, 'APPROVED');
  assert.equal(result.would_create.length, 1);
  assert.deepEqual(result.would_create[0].record.full_madden_rating_set, card.ratings);
});
test('provisional artifact rejection despite trusted source', () => {
  const result = discover([source({ ...card, status: 'PROVISIONAL' })], context);
  assert.equal(result.would_create.length, 0);
  assert(result.candidates[0].rejection_reasons.includes('NOT_APPROVED'));
});
test('conflicting cards retain both versions and differences without selecting one', () => {
  const result = discover([source([card, { ...card, ratings: { A: 61, B: 65 } }])], context);
  assert.equal(result.candidates.length, 2);
  assert.equal(result.conflicts.length, 1);
  assert(result.conflicts[0].differing_fields.includes('ratings.A'));
  assert.equal(result.would_create.length, 0);
});
test('missing field rejection', () => {
  const result = discover([source({ ...card, ratings: { A: 60 } })], context);
  assert(result.candidates[0].attributes_missing.includes('B'));
  assert.equal(result.would_create.length, 0);
});
test('hierarchy OVR and rank conflicts reject', () => {
  for (const changed of [{ ovr: 71 }, { rank: 2 }]) {
    const result = discover([source({ ...card, ...changed })], context);
    assert(result.candidates[0].rejection_reasons.includes('LOCKED_HIERARCHY_CONFLICT'));
    assert.equal(result.would_create.length, 0);
  }
});
test('read-only discovery leaves frozen source and context unchanged', () => {
  const sources = [source(card)];
  const before = JSON.stringify({ sources, context });
  Object.freeze(sources[0]); Object.freeze(sources);
  discover(sources, context);
  assert.equal(JSON.stringify({ sources, context }), before);
});
test('mock paths and unknown provenance never qualify', () => {
  for (const file of ['tests/approved.json', 'unknown.json']) {
    assert.equal(discover([source(card, file)], context).would_create.length, 0);
  }
});
test('unverified inventory cannot establish full-card completeness', () => {
  const result = discover([source(card)], { ...context, verifiedInventory: null });
  assert(result.candidates[0].missing_fields.includes('verified_full_attribute_inventory'));
  assert.equal(result.would_create.length, 0);
});
test('nested QB hierarchy rows discovered without inventing ratings', () => {
  const result = discover([source({ position: 'QB', top_10: [{ player: 'Fixture QB', rank: 1, ovr: 70 }] })], context);
  assert.equal(result.candidates.length, 1);
  assert.deepEqual(result.candidates[0].full_madden_rating_set, {});
  assert.equal(result.would_create.length, 0);
});
test('existing repository full_cards map format preserves keyed identity', () => {
  const result = discover([source({ position: 'QB', status: 'LOCKED', architecture_version: '1.0.0',
    full_cards: { 'Fixture QB': { ovr: 70, ratings: card.ratings } } })], context);
  assert.equal(result.candidates[0].player_id, 'fixture_qb');
  assert.equal(result.would_create.length, 1);
});
test('exported ordered ratings and explicit flat ratings are discovered', () => {
  for (const shape of [{ ordered_ratings: [{ attribute: 'A', rating: 60 }, { attribute: 'B', rating: 65 }] }, { A: 60, B: 65 }]) {
    const { ratings, ...identity } = card;
    const result = discover([source({ ...identity, ...shape })], context);
    assert.deepEqual(result.candidates[0].full_madden_rating_set, ratings);
    assert.equal(result.would_create.length, 1);
  }
});
test('conflicting hierarchy container rejects even an otherwise complete matching card', () => {
  const result = discover([source({ position: 'QB', status: 'APPROVED', architecture_version: '1.0.0',
    top_10: [{ player: 'Fixture QB', rank: 2, ovr: 70 }], full_cards: { 'Fixture QB': card } })], context);
  assert.equal(result.would_create.length, 0);
  assert(result.candidates.every(c => c.rejection_reasons.includes('SOURCE_HIERARCHY_CONFLICT')));
});
test('incompatible explicit position and identity are rejected', () => {
  for (const changed of [{ position: 'RB' }, { player_id: 'unknown' }, { player_name: 'Wrong Name' }]) {
    const result = discover([source({ ...card, ...changed })], context);
    assert.equal(result.would_create.length, 0);
  }
});
test('CSV and fenced JSON supported; unstructured Markdown retained for review', () => {
  const sources = [
    { file: 'export.csv', sha256: 'fixture', text: 'Player,Position,OVR,A,B\nFixture QB,QB,70,60,65' },
    { file: 'card.md', sha256: 'fixture', text: '```json\n' + JSON.stringify(card) + '\n```' },
    { file: 'notes.md', sha256: 'fixture', text: 'QB full card: Fixture QB; A 60 B 65' }
  ];
  const result = discover(sources, context);
  assert.equal(result.candidates.length, 2);
  assert(result.artifacts.some(a => a.source_file === 'notes.md' && a.disposition === 'MANUAL_REVIEW_NOT_IMPORTABLE'));
});
console.log(`${count} preview safety tests passed`);
