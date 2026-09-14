import fs from 'node:fs';
import path from 'node:path';
import { Codex } from '@openai/codex-sdk';
import { applyFullAuditEvidenceGate } from '../../src/evidence-gate.js';
import { QB_ATTRIBUTES, QB_DOMAINS, transitionReconstruction } from '../../src/qb-reconstruction.js';
const directory = path.resolve('logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3');
const read = (name: string) => JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8'));
const save = (name: string, value: unknown) => fs.writeFileSync(path.join(directory, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const request = read('request.json');
const original = read('evidence.json');
const error = read('stage-2-error.json');
const trace = 'C:/Users/xavie/.codex/sessions/2026/08/30/rollout-2026-08-30T21-25-46-01a0556c-2847-77c0-8607-814f786f62b9.jsonl';
// Recover public web event metadata only. Never copy private reasoning/session configuration.
const webEvents = fs.readFileSync(trace, 'utf8').trim().split('\n').map(line => JSON.parse(line))
  .filter(row => row.type === 'event_msg' && row.payload?.type === 'item_completed' && row.payload.item?.kind === 'web.search')
  .map(row => ({ timestamp: row.timestamp, item: row.payload.item }));
save('recovered-web-events.json', webEvents);
const queue = read('queue-after-evidence.json').map((item: any) => item.player_id === 'matthew_stafford' ? transitionReconstruction(item, 'RESEARCH_READY') : item);
save('queue-recovery-ready.json', queue);
const prompt = `The prior turn timed out after live web collection. Do NOT research further, run commands, write files, rate players or approve anything. Recover only already collected evidence into concise final JSON now. Keep the total response under 6500 tokens. Preserve original retrieval timestamps; never invent them. Keep incomplete evidence partial/missing, not satisfied.
Return the original EvidencePackage shape and all applicable normalized categories. Each category: status/confidence/items/limitations. One concise sourced item per category is enough to preserve a partial result; completeness is NOT implied. Every item has claim/source_url/retrieved_at/season/period. sources must list used URLs, name, published_at (nullable), retrieved_at, authority_tier and claims. Preserve provider conflicts and missing_evidence; do not average disputed data.
Under position_specific_traits include domain_assessments for all 17 requested domains and trait_assessments for all 19 traits, using the same status/confidence/items/limitations shape. Where no direct evidence was collected, return missing/LOW, empty items, and the exact gap. Do not extrapolate precise current physical traits from old combine data or reputation. Minimum evidence must remain false if necessary categories or traits are unresolved.
Use task_id ${request.task_id}, position QB. The application already resolved PRESEASON of NFL season 2026, primary regular season 2025. Current context is 2026; 2025 postseason is separate. This is evidence recovery, not a card proposal. Return JSON only immediately. Prefer a short honest incomplete package to an unfinished exhaustive answer.`;
save('recovery-prompt.json', { thread_id: error.thread_id, prompt });
const thread = new Codex({}).resumeThread(error.thread_id, { workingDirectory: process.cwd(), sandboxMode: 'read-only', approvalPolicy: 'never', webSearchMode: 'disabled', skipGitRepoCheck: true });
try {
  const result = await thread.run(prompt, { signal: AbortSignal.timeout(180_000) });
  save('recovery-result.json', result);
  const response = result.finalResponse;
  const recovered = JSON.parse(response.slice(response.indexOf('{'), response.lastIndexOf('}') + 1));
  save('evidence-recovered-raw.json', recovered);
  const errors: string[] = [];
  const parent = recovered.normalized?.position_specific_traits;
  for (const [kind, keys] of [['domain_assessments', QB_DOMAINS], ['trait_assessments', QB_ATTRIBUTES]] as const) for (const key of keys) {
    const assessment = parent?.[kind]?.[key];
    if (assessment?.status !== 'satisfied' || !['HIGH', 'MEDIUM'].includes(assessment?.confidence) || !assessment?.items?.length) errors.push(`${kind}.${key}: INCOMPLETE_OR_LOW_CONFIDENCE`);
    for (const item of assessment?.items ?? []) if (!recovered.sources?.some((s: any) => s.url === item.source_url && s.retrieved_at === item.retrieved_at)
      || !Number.isInteger(item.season) || !['REGULAR_SEASON', 'POSTSEASON', 'CURRENT_CONTEXT'].includes(item.period)) errors.push(`${kind}.${key}: UNTRACEABLE_ITEM`);
  }
  const evidence = applyFullAuditEvidenceGate({ ...recovered, calendar: original.calendar, calendar_web_search_observed: original.calendar_web_search_observed,
    fresh_web_research_observed: webEvents.length > 0, minimum_evidence_met: recovered.minimum_evidence_met === true && !errors.length,
    missing_evidence: [...(recovered.missing_evidence ?? []), ...errors] }, request, new Date().toISOString());
  save('evidence-recovered.json', evidence);
  const finalQueue = evidence.minimum_evidence_met ? queue : queue.map((item: any) => item.player_id === 'matthew_stafford' ? transitionReconstruction(item, 'EVIDENCE_INSUFFICIENT') : item);
  save('queue-after-recovery.json', finalQueue);
  save('recovery-check.json', { minimum_evidence_met: evidence.minimum_evidence_met, missing_evidence: evidence.missing_evidence,
    status: finalQueue[0].status, recovered_live_web_event_count: webEvents.length, rating_generation_executed: false,
    rating_revision_count: 0, proposed_ovr: null, observed_madden_ovr: null });
  console.log(JSON.stringify({ sources: evidence.sources.length, minimum_evidence_met: evidence.minimum_evidence_met, missing: evidence.missing_evidence }, null, 2));
} catch (e) {
  save('recovery-error.json', { error: String(e) });
  save('queue-after-recovery.json', queue.map((item: any) => item.player_id === 'matthew_stafford' ? transitionReconstruction(item, 'EVIDENCE_INSUFFICIENT') : item));
  console.error(String(e)); process.exitCode = 1;
}
