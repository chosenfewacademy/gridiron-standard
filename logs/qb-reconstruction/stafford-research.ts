import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { Codex, type ThreadOptions } from '@openai/codex-sdk';
import { CodexResearchAdapter, type ResearchClient } from '../../src/codex-research.js';
import { resolvePlayer } from '../../src/player-resolver.js';
import { mapToMaddenBucket } from '../../src/position-mapper.js';
import { buildPlayerAuditTask } from '../../src/player-audit-task.js';
import { beginReconstruction, buildReconstructionQueue, transitionReconstruction, QB_ATTRIBUTES, QB_DOMAINS } from '../../src/qb-reconstruction.js';
import { applyFullAuditEvidenceGate } from '../../src/evidence-gate.js';
import { z } from 'zod';

// Deliberately no ordinary audit executor, approval, persistence or current-card writer.
const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(root, file), 'utf8');
const json = (file: string) => JSON.parse(read(file));
const baseline = json('data/baselines/QB.json');
const registry = json('data/players/registry.json').players;
const resolution = resolvePlayer('Matthew Stafford');
if (resolution.status !== 'RESOLVED' || !resolution.player) throw new Error('Stafford not resolved');
const player = resolution.player;
const mapping = mapToMaddenBucket(player.position);
if (player.player_id !== 'matthew_stafford' || mapping.exact_position !== 'QB' || mapping.requires_role_resolution) throw new Error('Exact identity mismatch');
const queue = buildReconstructionQueue(baseline, registry);
const planning = json('config/qb-reconstruction-queue.json');
if (JSON.stringify(queue) !== JSON.stringify(planning.players)) throw new Error('Queue/baseline mismatch');
if (queue[0].locked_target_ovr !== 91 || queue[0].rank !== 1) throw new Error('Locked comparison mismatch');
const directory = path.join(root, 'logs/qb-reconstruction/matthew_stafford', randomUUID());
fs.mkdirSync(directory, { recursive: true });
const save = (name: string, value: unknown) => fs.writeFileSync(path.join(directory, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const hash = (file: string) => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const protectedFiles: string[] = [];
function collect(folder: string) {
  for (const item of fs.readdirSync(path.join(root, folder), { withFileTypes: true })) {
    const file = path.posix.join(folder, item.name);
    if (item.isDirectory()) collect(file); else protectedFiles.push(file);
  }
}
for (const folder of ['data', 'state', 'bootstrap']) collect(folder);
protectedFiles.push('AGENTS.md', 'config/madden-entry-order.json', 'config/qb-reconstruction-queue.json');
const before = Object.fromEntries(protectedFiles.map(file => [file, hash(file)]));
save('integrity-before.json', before);
const activeQueue = beginReconstruction(queue, player.player_id);
save('queue-research-ready.json', activeQueue);
const task = {
  ...buildPlayerAuditTask(player), team: 'LAR',
  team_resolution: { registry_value: player.team, research_only_value: 'LAR', registry_modified: false,
    source_url: 'https://www.nfl.com/teams/los-angeles-rams/roster', corroborating_url: 'https://www.therams.com/team/players-roster/matthew-stafford/' },
  baseline_controls: baseline, qb_architecture: json('config/qb-reconstruction-architecture.json'),
  reconstruction_only: true, locked_target_ovr: 91, observed_madden_ovr: null, proposed_ovr: null,
  research_instructions: `Collect a thorough current phase-aware evidence package for ONLY Matthew Stafford. Do not assign any Madden ratings or OVR. Never use EA ratings as evidence. Do not audit another player; peer statistical comparisons are allowed.
Use official NFL/Rams statistics and current roster/injury/practice reports, NGS, reputable public advanced data, pressure/sack and depth/accuracy metrics, publicly available film-supported scouting. Cover completed regular season plus its postseason when the application-derived phase is preseason/offseason. Resolve provider disagreements by season, sample, definitions and scope, never averaging inconsistent figures.
Use all required normalized categories from the adapter. Within normalized.position_specific_traits ALSO return domain_assessments keyed by each of: ${QB_DOMAINS.join(', ')}; AND trait_assessments keyed by ${QB_ATTRIBUTES.join(', ')}.
Each nested assessment must be {status:'satisfied'|'partial'|'missing',confidence:'HIGH'|'MEDIUM'|'LOW',items:[{claim,source_url,retrieved_at,season,period:'REGULAR_SEASON'|'POSTSEASON'|'CURRENT_CONTEXT'}],limitations:[specific missing data and strongest public substitute]}. These nested maps belong INSIDE position_specific_traits, not extra normalized categories. Include normal status/confidence/items/limitations on that parent category too.
Every nested claim must cite a source also included in sources, actual retrieval timestamp, evidence season and sample/context. Include direct current evidence or explain uncertainty for speed, acceleration, agility, change of direction, strength, jumping, carrying, injury, stamina and toughness; no character judgments, old combine results as current truth, or guessed physical measurements. Current role/availability is not a substitute for strength/jump/toughness measurement. Incomplete traits must remain partial/missing with honest confidence.
Research every domain even if one is missing. Make a reasonable focused search for strongest public substitutes when premium splits/film/metrics are unavailable. Record exact remaining gaps, not generic 'more research needed'. Distinguish sack avoidance vs broken sack contact, pressure execution vs processing, play-action skill vs scheme, and on-run passing vs mobility.
Compare all stored Top10 names and all three outside controls using comparable sourced football evidence, but identify their full cards as unreconstructed. Never invent their attribute values. Stafford's stored ceiling position is a constraint, not an independent proof of current superiority or an OVR target to fit.
Set minimum_evidence_met false for incomplete necessary evidence, insufficient sample or unresolved material conflicts. Do not weaken requirements. Do not run project commands, write files, approve, persist or change state. Return structured JSON after a thorough but bounded research pass. Use a single response even if the honest result is insufficient evidence.`
};
save('request.json', { ...task, original_registry_player: player, as_of: new Date().toISOString(), baseline_sha256: hash('data/baselines/QB.json') });
let stage = 0;
const codex = new Codex({});
const client: ResearchClient = { startThread(options?: ThreadOptions) {
  const thread = codex.startThread(options);
  const number = ++stage;
  return { get id() { return thread.id; }, async run(prompt, options) {
    save(`stage-${number}-prompt.json`, { prompt, started_at: new Date().toISOString() });
    console.log(`Starting research stage ${number}`);
    try {
      const result = await thread.run(prompt, options);
      save(`stage-${number}-result.json`, { thread_id: thread.id, completed_at: new Date().toISOString(), ...result });
      console.log(`Completed research stage ${number}; ${result.items.filter(i => i.type === 'web_search').length} web events`);
      return result;
    } catch (error) {
      save(`stage-${number}-error.json`, { thread_id: thread.id, error: String(error) }); throw error;
    }
  } };
} };
const adapter = new CodexResearchAdapter({ sandboxMode: 'read-only', approvalPolicy: 'never', webSearchMode: 'live', workingDirectory: root, skipGitRepoCheck: true },
  { signal: AbortSignal.timeout(720_000) }, client);
const assessment = z.object({ status: z.enum(['satisfied', 'partial', 'missing']), confidence: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  items: z.array(z.object({ claim: z.string().min(1), source_url: z.string().url(), retrieved_at: z.string().datetime({ offset: true }), season: z.number().int(),
    period: z.enum(['REGULAR_SEASON', 'POSTSEASON', 'CURRENT_CONTEXT']) })), limitations: z.array(z.string()) });
console.log(`STAFFORD_OUTPUT=${directory}`);
try {
  const gathered = await adapter.gather(task);
  save('evidence-adapter.json', gathered);
  const extraErrors: string[] = [];
  const traits = gathered.normalized.position_specific_traits as Record<string, unknown> | undefined;
  for (const [kind, keys] of [['domain_assessments', QB_DOMAINS], ['trait_assessments', QB_ATTRIBUTES]] as const) {
    const map = traits?.[kind] as Record<string, unknown> | undefined;
    for (const key of keys) {
      const checked = assessment.safeParse(map?.[key]);
      if (!checked.success || checked.data.status !== 'satisfied' || checked.data.confidence === 'LOW' || !checked.data.items.length) {
        extraErrors.push(`${kind}.${key}: INCOMPLETE_OR_LOW_CONFIDENCE`); continue;
      }
      for (const item of checked.data.items) if (!gathered.sources.some(s => s.url === item.source_url && s.retrieved_at === item.retrieved_at)) extraErrors.push(`${kind}.${key}: UNTRACEABLE_ITEM`);
    }
  }
  const evidence = applyFullAuditEvidenceGate({ ...gathered, minimum_evidence_met: gathered.minimum_evidence_met && extraErrors.length === 0,
    missing_evidence: [...gathered.missing_evidence, ...extraErrors] }, task, new Date().toISOString());
  save('evidence.json', evidence);
  const finalQueue = evidence.minimum_evidence_met ? activeQueue : activeQueue.map(item => item.player_id === player.player_id ? transitionReconstruction(item, 'EVIDENCE_INSUFFICIENT') : item);
  save('queue-after-evidence.json', finalQueue);
  save('evidence-check.json', { minimum_evidence_met: evidence.minimum_evidence_met, extra_trait_domain_errors: extraErrors,
    missing_evidence: evidence.missing_evidence, status: finalQueue[0].status, next_step: evidence.minimum_evidence_met ? 'PROPOSAL_REQUIRED' : 'STOP_BEFORE_RATING_GENERATION',
    rating_generation_executed: false, trait_coherence_validator_executed: false, rating_revision_count: 0,
    locked_target_ovr: 91, proposed_ovr: null, observed_madden_ovr: null });
  console.log(JSON.stringify({ directory, minimum_evidence_met: evidence.minimum_evidence_met, phase: evidence.season_phase, evidence_season: evidence.evidence_season,
    sources: evidence.sources.length, missing_evidence: evidence.missing_evidence }, null, 2));
} finally {
  save('research-diagnostics.json', adapter.diagnostics);
  const after = Object.fromEntries(protectedFiles.map(file => [file, hash(file)]));
  const changed = protectedFiles.filter(file => before[file] !== after[file]);
  save('integrity-after.json', { protected_state_unchanged: changed.length === 0, changed, before, after });
  if (changed.length) throw new Error('Protected-state integrity failure');
}
