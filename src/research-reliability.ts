import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { CodexBatchEvidenceCollector } from "./codex-batch-research.js";
import { EvidenceCollectionError, FileEvidenceCheckpointStore, createCheckpoint, resumeEvidence,
  type BatchCollector, type BatchRequest } from "./resumable-evidence.js";

const id=`RELIABILITY_${randomUUID()}`, startedAt=new Date().toISOString();
const root=path.resolve("logs/research-reliability"), store=new FileEvidenceCheckpointStore(root);
const batches=[{id:"SMOKE_LEAGUE_CALENDAR",categories:["league_calendar"]},
  {id:"SMOKE_SCHEDULE_SOURCE",categories:["schedule_source"]},
  {id:"SMOKE_RULES_RESOURCE",categories:["rules_resource"]}];
await store.save(createCheckpoint({audit_id:id,player_id:"non_player_reliability_fixture",player_name:"NFL league information",
  position:"N/A",task:{type:"RESEARCH_RELIABILITY_SMOKE",as_of:startedAt,nfl_season:2026,
    instruction:"Current public NFL league calendar, schedule publication, and rules information only; no player research."},
  category_names:batches.flatMap(x=>x.categories),now:startedAt,max_attempts:2}));
const live=new CodexBatchEvidenceCollector({requestTimeoutMs:30_000,totalBudgetMs:180_000}); let forced=true;
const isolated:BatchCollector={async collect(request:BatchRequest){
  if(forced&&request.batch_id==="SMOKE_SCHEDULE_SOURCE"){forced=false;const stamp=new Date().toISOString();
    throw new EvidenceCollectionError("NETWORK_TOOL_TIMEOUT","Intentional first-attempt harness timeout",
      {micro_batch_id:request.batch_id,attempt_number:request.attempt_number,started_at:stamp,ended_at:stamp,elapsed_ms:0,
        thread_id:null,timeout_stage:"THREAD_RUN",outcome:"FAILURE",failure_kind:"NETWORK_TOOL_TIMEOUT"});}
  return live.collect(request);
}};
await resumeEvidence(store,isolated,{audit_id:id,batches});
const result=await resumeEvidence(store,isolated,{audit_id:id,batches});
const report={run_id:id,started_at:startedAt,completed_at:new Date().toISOString(),non_player_smoke:true,
  micro_batches:batches.length,attempts:result.retry_history.length,
  successful_structured_responses:result.retry_history.filter(x=>x.outcome==="SUCCESS").length,
  timeouts:result.retry_history.filter(x=>x.failure_kind==="NETWORK_TOOL_TIMEOUT").length,
  intentional_timeouts:1,live_timeout_rate:live.diagnostics.filter(x=>x.failure_kind==="NETWORK_TOOL_TIMEOUT").length/live.diagnostics.length,
  parse_failures:result.retry_history.filter(x=>x.failure_kind==="PARSER_SCHEMA_FAILURE").length,
  sources_captured:result.source_provenance.length,checkpoint_persisted:true,
  retry_isolation_observed:result.categories.schedule_source.attempt_count===2,
  category_status:Object.fromEntries(Object.values(result.categories).map(x=>[x.evidence_category,x.status])),
  diagnostics:result.execution_diagnostics};
await fs.writeFile(path.join(root,id,"reliability-report.json"),JSON.stringify(report,null,2)+"\n"); console.log(JSON.stringify(report,null,2));
if(report.successful_structured_responses===0) process.exitCode=1;
