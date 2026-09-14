import fs from "node:fs/promises";
import path from "node:path";
import { applyFullAuditEvidenceGate, requiredEvidenceCategories } from "./evidence-gate.js";
import { CodexBatchEvidenceCollector } from "./codex-batch-research.js";
import { CodexCalendarCollector, ResponsesCalendarCollector } from "./codex-calendar-research.js";
import { FileCalendarStore, refreshCalendarIfNeeded } from "./calendar-refresh.js";
import { CALENDAR_MAX_AGE_MS, resolveAuthoritativeSeasonContext } from "./season-phase.js";
import { FileEvidenceCheckpointStore, QB_EVIDENCE_BATCHES, QB_CURRENT_SEASON_BATCH, assembleEvidencePackage,
  checkpointFromEvidence, ensureCheckpointCategories, recoverInterruptedCategories, resumeEvidence, type EvidenceCheckpoint } from "./resumable-evidence.js";
import { migrateLegacyBroadBatchFailures } from "./resumable-evidence.js";
import { ResponsesUsageBudget } from "./openai-responses-transport.js";

const args = process.argv.slice(2);
const option = (name: string) => { const at = args.indexOf(name); return at >= 0 ? args[at + 1] : undefined; };
const requestedAudit = option("--audit-id"); const requestedPlayer = option("--player");
const only = new Set((option("--only") ?? "").split(",").map(x=>x.trim()).filter(Boolean));
const transport=option("--transport") as "OPENAI_RESPONSES_TRANSPORT"|"SDK_TRANSPORT"|"EPHEMERAL_CLI_TRANSPORT"|undefined;
if (!requestedAudit && !requestedPlayer) throw new Error("Use --audit-id <existing id> or --player <existing registry id>.");
if(requestedAudit&&!/^[A-Za-z0-9_.-]+$/.test(requestedAudit))throw new Error("Unsafe audit_id");
if(requestedPlayer&&!/^[A-Za-z0-9_-]+$/.test(requestedPlayer))throw new Error("Unsafe player_id");
const root = path.resolve("logs/qb-reconstruction");
const responsesBudget=transport==="OPENAI_RESPONSES_TRANSPORT"||!transport?new ResponsesUsageBudget():undefined;
const responsesCalendar=responsesBudget?new ResponsesCalendarCollector({budget:responsesBudget}):null;
const run = await findExistingRun(root, requestedAudit, requestedPlayer);
const auditId = path.basename(run); const playerId = path.basename(path.dirname(run));
const store = new FileEvidenceCheckpointStore(path.dirname(run));
let checkpoint: EvidenceCheckpoint;
try { checkpoint = await store.load(auditId); }
catch {
  const [request, evidence] = await Promise.all([
    readJson(path.join(run, "request.json")), readJson(path.join(run, "evidence-manual-partial.json"))
  ]);
  checkpoint = checkpointFromEvidence({ audit_id: auditId, player_id: playerId,
    player_name: String(request.player?.full_name ?? request.original_registry_player?.full_name ?? evidence.player_name ?? playerId),
    position: String(request.position ?? evidence.position), task: request, evidence,
    source_artifact: path.relative(process.cwd(), path.join(run, "evidence-manual-partial.json")), now: new Date().toISOString() });
  await store.save(checkpoint);
}
checkpoint=migrateLegacyBroadBatchFailures(checkpoint,new Date().toISOString()); await store.save(checkpoint);
checkpoint=recoverInterruptedCategories(checkpoint); await store.save(checkpoint);
if (checkpoint.base_evidence) {
  checkpoint.base_evidence = await refreshCalendarIfNeeded({evidence:checkpoint.base_evidence,task:checkpoint.task,audit_id:auditId,
    as_of:new Date().toISOString(),collector:responsesCalendar??new CodexCalendarCollector(),store:new FileCalendarStore(path.join(run,"calendar-checkpoint.json")),
    request_timeout_ms:Number(option("--calendar-timeout-ms") ?? 30_000)});
  const asOf=new Date().toISOString(); const season=resolveAuthoritativeSeasonContext({live:checkpoint.base_evidence.calendar,cached:checkpoint.base_evidence.calendar},asOf,checkpoint.task);
  checkpoint.task={...checkpoint.task,as_of:asOf,...(season.status==="RESOLVED"?season.metadata:{})};
  if(season.status==="RESOLVED") checkpoint=ensureCheckpointCategories(checkpoint,
    requiredEvidenceCategories(checkpoint.position,season.metadata.season_phase).map(x=>x.name));
  await store.save(checkpoint);
  if(season.status!=="RESOLVED") {
    const evidence=assembleEvidencePackage(checkpoint); evidence.minimum_evidence_met=false;
    const checked=applyFullAuditEvidenceGate(evidence as any,checkpoint.task,asOf);
    const summary={audit_id:auditId,player_id:checkpoint.player_id,calendar_status:"FAILED_TERMINAL",
      reused_evidence_items:Object.values(checkpoint.categories).flatMap(x=>x.accepted_evidence).length,
      category_status:Object.fromEntries(Object.values(checkpoint.categories).map(x=>[x.evidence_category,x.status])),
      minimum_evidence_met:false,missing_evidence:checked.missing_evidence,reconstruction_status:"EVIDENCE_INSUFFICIENT",
      proposed_card:null,validator_findings:[],revision_count:0};
    await fs.writeFile(path.join(run,"evidence-resumed.json"),JSON.stringify(checked,null,2)+"\n");
    await fs.writeFile(path.join(run,"evidence-resume-summary.json"),JSON.stringify(summary,null,2)+"\n");
    console.log(JSON.stringify(summary,null,2)); process.exit(2);
  }
}
const collector = new CodexBatchEvidenceCollector({requestTimeoutMs:Number(option("--timeout-ms") ?? 45_000),
  totalBudgetMs:Number(option("--total-budget-ms") ?? 900_000),transport:transport??"AUTO",responsesBudget});
const batches=[...(checkpoint.categories.current_season_performance?[QB_CURRENT_SEASON_BATCH]:[]),...QB_EVIDENCE_BATCHES]
  .flatMap(batch=>{const names=batch.categories.filter(name=>Boolean(checkpoint.categories[name])&&(!only.size||only.has(name)));
    return Array.from({length:Math.ceil(names.length/2)},(_,i)=>({id:`${batch.id}_TARGET_${i+1}`,categories:names.slice(i*2,i*2+2)}));})
  .filter(batch=>batch.categories.length);
const result = await resumeEvidence(store, collector, { audit_id: auditId, batches,
  stale(category) { return category.normalized_evidence?.items.some(item=>Date.parse(new Date().toISOString())-Date.parse(item.retrieved_at)>CALENDAR_MAX_AGE_MS)??false; },
  minimumGate(value) {
    const evidence = assembleEvidencePackage(value); evidence.minimum_evidence_met = true;
    evidence.fresh_web_research_observed = true; evidence.calendar_web_search_observed = true;
    return applyFullAuditEvidenceGate(evidence as any, value.task, value.updated_at).minimum_evidence_met === true;
  }});
const evidence = assembleEvidencePackage(result); evidence.minimum_evidence_met = result.minimum_evidence_met;
const checked = applyFullAuditEvidenceGate(evidence as any, result.task, result.updated_at);
result.minimum_evidence_met = checked.minimum_evidence_met; await store.save(result);
await fs.writeFile(path.join(run, "evidence-resumed.json"), JSON.stringify(checked, null, 2) + "\n");
await fs.writeFile(path.join(run, "evidence-resume-diagnostics.json"), JSON.stringify([...(responsesCalendar?.diagnostics??[]),...collector.diagnostics], null, 2) + "\n");
const summary = { audit_id: auditId, player_id: result.player_id, reused_without_research: Object.values(result.categories)
  .filter(x => x.attempt_count === 0 && x.status === "SATISFIED").map(x => x.evidence_category),
  retried: result.retry_history.flatMap(x => x.categories),
  retry_counts: Object.fromEntries(Object.values(result.categories).map(x => [x.evidence_category, x.attempt_count])),
  category_status: Object.fromEntries(Object.values(result.categories).map(x => [x.evidence_category, x.status])),
  minimum_evidence_met: checked.minimum_evidence_met,
  missing_evidence: checked.missing_evidence,
  reconstruction_status: checked.minimum_evidence_met ? "EVIDENCE_READY" : "EVIDENCE_INSUFFICIENT",
  proposed_card: null, validator_findings: [], revision_count: 0 };
await fs.writeFile(path.join(run, "evidence-resume-summary.json"), JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));

async function findExistingRun(base: string, audit?: string, player?: string): Promise<string> {
  const players = player ? [player] : await fs.readdir(base);
  const candidates: Array<{dir:string;time:number}> = [];
  for (const id of players) { const playerDir = path.join(base, id); let runs: string[];
    try { runs = await fs.readdir(playerDir); } catch { continue; }
    for (const runId of runs) { if (audit && runId !== audit) continue; const dir = path.join(playerDir, runId);
      try { const stat = await fs.stat(path.join(dir, "evidence-manual-partial.json")); candidates.push({dir,time:stat.mtimeMs}); } catch {} }
  }
  candidates.sort((a,b) => b.time-a.time); if (!candidates.length) throw new Error("No existing interrupted audit with preserved evidence matched.");
  return candidates[0].dir;
}
async function readJson(file: string): Promise<any> { return JSON.parse(await fs.readFile(file, "utf8")); }
