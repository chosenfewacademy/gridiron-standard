import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import {
  EvidenceCollectionError, FileEvidenceCheckpointStore, MemoryEvidenceCheckpointStore,
  createCheckpoint, resumeEvidence, QB_EVIDENCE_BATCHES, ensureCheckpointCategories, migrateLegacyBroadBatchFailures, type BatchCollector, type EvidenceCheckpoint
} from "../src/resumable-evidence.js";
import { CodexBatchEvidenceCollector, validateBatchResponse } from "../src/codex-batch-research.js";
import { refreshCalendarIfNeeded, type CalendarRefreshCheckpoint, type CalendarStore } from "../src/calendar-refresh.js";

const now = "2030-08-20T12:00:00.000Z";
const item = (url = "https://www.nfl.com/stats/fixture") => ({ claim: "Supported fixture claim", source_url: url,
  retrieved_at: now, season: 2029, period: "REGULAR_SEASON" as const });
const assessment = (status: "satisfied"|"partial"|"missing" = "satisfied", url?: string) => ({
  status, confidence: status === "satisfied" ? "HIGH" as const : "MEDIUM" as const,
  items: status === "missing" ? [] : [item(url)], limitations: status === "satisfied" ? [] : ["fixture gap"]
});

function fixture(): EvidenceCheckpoint {
  return createCheckpoint({ audit_id: "audit-existing", player_id: "fixture_qb", player_name: "Fixture QB",
    position: "QB", task: { task_id: "audit-existing", player_id: "fixture_qb", position: "QB" },
    category_names: ["performance_summary", "passing_production_efficiency", "multi_year_trend"], now });
}

export async function runResumableEvidenceTests(): Promise<void> {
  async function test(name: string, fn: () => Promise<void>) {
    try { await fn(); console.log(`PASS ${name}`); } catch (error) { console.error(`FAIL ${name}`); throw error; }
  }
  await test("timeout preserves earlier normalized batch and is retryable", async () => {
    const store = new MemoryEvidenceCheckpointStore(fixture()); let calls = 0;
    const collector: BatchCollector = { async collect(request) { calls++;
      if (request.batch_id === "A") return { categories: { performance_summary: assessment(), passing_production_efficiency: assessment() }, sources: [] };
      throw new EvidenceCollectionError("NETWORK_TOOL_TIMEOUT", "timed out");
    }};
    const result = await resumeEvidence(store, collector, { audit_id: "audit-existing", now: () => now,
      batches: [{ id: "A", categories: ["performance_summary", "passing_production_efficiency"] }, { id: "F", categories: ["multi_year_trend"] }] });
    assert.equal(calls, 2); assert.equal(result.categories.performance_summary.status, "SATISFIED");
    assert.equal(result.categories.multi_year_trend.status, "FAILED_RETRYABLE");
    assert.equal(result.categories.performance_summary.accepted_evidence.length, 1);
  });
  await test("resume skips satisfied and retryable category recovers", async () => {
    const checkpoint = fixture(); checkpoint.categories.performance_summary = { ...checkpoint.categories.performance_summary,
      status: "SATISFIED", accepted_evidence: [item()], source_urls: [item().source_url], retry_eligible: false };
    checkpoint.categories.multi_year_trend.status = "FAILED_RETRYABLE"; checkpoint.categories.multi_year_trend.attempt_count = 1;
    const store = new MemoryEvidenceCheckpointStore(checkpoint); const requested: string[][] = [];
    await resumeEvidence(store, { async collect(r) { requested.push(r.categories); return {
      categories: Object.fromEntries(r.categories.map(x => [x, assessment()])), sources: [] }; } },
      { audit_id: "audit-existing", now: () => now, batches: [{ id: "mixed", categories: ["performance_summary", "multi_year_trend"] }] });
    assert.deepEqual(requested, [["multi_year_trend"]]);
    assert.equal((await store.load("audit-existing")).categories.multi_year_trend.status, "SATISFIED");
  });
  await test("duplicate sources are avoided", async () => {
    const checkpoint = fixture(); checkpoint.categories.multi_year_trend = { ...checkpoint.categories.multi_year_trend,
      status: "PARTIAL", accepted_evidence: [item()], source_urls: [item().source_url], retry_eligible: true };
    const store = new MemoryEvidenceCheckpointStore(checkpoint);
    const result = await resumeEvidence(store, { async collect(r) { assert.deepEqual(r.avoid_source_urls, [item().source_url]);
      return { categories: { multi_year_trend: { ...assessment(), items: [item(), item("https://operations.nfl.com/fixture")] } }, sources: [] }; } },
      { audit_id: "audit-existing", now: () => now, batches: [{ id: "F", categories: ["multi_year_trend"] }] });
    assert.equal(result.categories.multi_year_trend.source_urls.length, 2);
    assert.equal(result.categories.multi_year_trend.accepted_evidence.length, 2);
  });
  await test("exhausted retry becomes terminal and parser failure preserves evidence", async () => {
    const checkpoint = fixture(); checkpoint.max_attempts = 2; checkpoint.categories.multi_year_trend = {
      ...checkpoint.categories.multi_year_trend, status: "PARTIAL", attempt_count: 1,
      accepted_evidence: [item()], source_urls: [item().source_url], retry_eligible: true };
    const store = new MemoryEvidenceCheckpointStore(checkpoint);
    const result = await resumeEvidence(store, { async collect() { throw new EvidenceCollectionError("PARSER_SCHEMA_FAILURE", "bad JSON"); } },
      { audit_id: "audit-existing", now: () => now, batches: [{ id: "F", categories: ["multi_year_trend"] }] });
    assert.equal(result.categories.multi_year_trend.status, "FAILED_TERMINAL");
    assert.equal(result.categories.multi_year_trend.accepted_evidence.length, 1);
    assert.equal(result.retry_history.at(-1)?.failure_kind, "PARSER_SCHEMA_FAILURE");
  });
  await test("provider conflicts are preserved and cannot satisfy a category", async () => {
    const store = new MemoryEvidenceCheckpointStore(fixture());
    const result = await resumeEvidence(store, { async collect() { return { categories: { multi_year_trend: assessment() }, sources: [],
      conflicts: [{ category: "multi_year_trend", detail: "providers disagree" }] }; } },
      { audit_id: "audit-existing", now: () => now, batches: [{ id: "F", categories: ["multi_year_trend"] }] });
    assert.equal(result.categories.multi_year_trend.status, "PARTIAL"); assert.equal(result.categories.multi_year_trend.unresolved_conflicts.length, 1);
    assert.equal(result.minimum_evidence_met, false);
  });
  await test("minimum evidence remains strict", async () => {
    const checkpoint = fixture(); for (const value of Object.values(checkpoint.categories)) value.status = "SATISFIED";
    checkpoint.minimum_evidence_met = true; checkpoint.categories.multi_year_trend.status = "FAILED_RETRYABLE";
    const store = new MemoryEvidenceCheckpointStore(checkpoint);
    const result = await resumeEvidence(store, { async collect() { throw new EvidenceCollectionError("NETWORK_TOOL_TIMEOUT", "timeout"); } },
      { audit_id: "audit-existing", now: () => now, batches: [{ id: "F", categories: ["multi_year_trend"] }] });
    assert.equal(result.minimum_evidence_met, false);
  });
  await test("file checkpoint writes are confined and protected state remains unchanged", async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "gridiron-resume-")); const protectedFile = path.join(dir, "protected.json");
    fs.writeFileSync(protectedFile, "locked"); const store = new FileEvidenceCheckpointStore(path.join(dir, "logs"));
    await store.save(fixture()); await resumeEvidence(store, { async collect() { throw new EvidenceCollectionError("GENUINE_EVIDENCE_UNAVAILABLE", "none exists"); } },
      { audit_id: "audit-existing", now: () => now, batches: [{ id: "F", categories: ["multi_year_trend"] }] });
    assert.equal(fs.readFileSync(protectedFile, "utf8"), "locked");
    assert.equal((await store.load("audit-existing")).categories.multi_year_trend.status, "FAILED_TERMINAL");
  });
  await test("QB micro-batches contain no more than three independently checkpointed domains", async () => {
    assert(QB_EVIDENCE_BATCHES.length >= 20);
    assert(QB_EVIDENCE_BATCHES.every(batch => batch.categories.length >= 1 && batch.categories.length <= 3));
    assert.equal(new Set(QB_EVIDENCE_BATCHES.map(batch => batch.id)).size, QB_EVIDENCE_BATCHES.length);
  });
  await test("strict response schema rejects mismatched categories and preserves leading JSON", async () => {
    const source={name:"NFL",url:item().source_url,retrieved_at:now,published_at:null,authority_tier:1,claims:["fixture"]};
    const valid=JSON.stringify({categories:{one:assessment()},sources:[source],conflicts:[],missing_fields:{one:[]}});
    assert.equal(validateBatchResponse(`${valid}\nlate explanatory prose was truncated`,["one"]).categories.one.status,"satisfied");
    assert.throws(()=>validateBatchResponse(valid,["different"]),/category keys/i);
  });
  await test("Codex micro-batches use fresh lightweight threads", async () => {
    let starts=0; const source={name:"NFL",url:item().source_url,retrieved_at:now,published_at:null,authority_tier:1,claims:["fixture"]};
    const client:any={startThread(){starts++;return{id:`thread-${starts}`,async run(){return{finalResponse:JSON.stringify({categories:{one:assessment()},sources:[source]}),items:[{type:"web_search"}]}}}}};
    const collector=new CodexBatchEvidenceCollector({requestTimeoutMs:1000,totalBudgetMs:5000,transport:"SDK_TRANSPORT"},()=>now,client);
    const request:any={audit_id:"a",player_id:"fixture",player_name:"Fixture",position:"QB",batch_id:"one",categories:["one"],attempt_number:1,prior_evidence:{},avoid_source_urls:[],task:{}};
    await collector.collect(request); await collector.collect(request); assert.equal(starts,2);
    assert.deepEqual(collector.diagnostics.map(x=>x.thread_id),["thread-1","thread-2"]);
  });
  await test("aged immutable cached calendar avoids refresh and preserves accepted player evidence", async () => {
    let saved:CalendarRefreshCheckpoint|null=null; const store:CalendarStore={async load(){return saved},async save(v){saved=structuredClone(v)}};
    const stale={nfl_season:2030,player_id:"fixture_qb",team:"TST",valid_from:"2030-03-01T00:00:00Z",valid_until:"2031-03-01T00:00:00Z",
      preseason_start:"2030-08-01T00:00:00Z",regular_season_start:"2030-09-01T00:00:00Z",postseason_start:"2031-01-01T00:00:00Z",season_end:"2031-02-01T00:00:00Z",
      current_season_games_available:0,current_season_games_played:0,regular_season_games_scheduled:17,regular_season_complete:false,postseason_complete:false,
      sources:[{url:"https://www.nfl.com/schedules/fixture",retrieved_at:"2030-08-01T00:00:00Z",claims:["calendar"]}]};
    const fresh=structuredClone(stale); fresh.sources[0].retrieved_at=now;
    const evidence:any={calendar:stale,normalized:{performance_summary:assessment()}}; let calls=0;
    const result=await refreshCalendarIfNeeded({evidence,task:{player_id:"fixture_qb",team:"TST"},audit_id:"a",as_of:now,store,
      collector:{async collect(){calls++;return fresh as any}}});
    assert.equal(calls,0); assert.deepEqual(result.normalized,evidence.normalized); assert.equal(saved,null);
  });
  await test("compiled JavaScript fallback runs only for recognized launcher failure", async () => {
    const run=spawnSync(process.execPath,["scripts/run-with-fallback.mjs","tests/fallback-probe.ts","tests/fallback-probe.js"],{
      encoding:"utf8",env:{...process.env,GRIDIRON_SIMULATE_TSX_ENOMEM:"1",GRIDIRON_FALLBACK_PROBE:"1"}});
    assert.equal(run.status,0,run.stderr); assert.match(run.stdout,/COMPILED_FALLBACK_PROBE_OK/); assert.match(run.stderr,/FALLBACK_USED/);
  });
  await test("legacy infrastructure terminals migrate once without losing history or genuine gaps", async () => {
    const checkpoint=fixture(); checkpoint.categories.multi_year_trend.status="FAILED_TERMINAL";
    checkpoint.categories.multi_year_trend.attempt_count=3; checkpoint.categories.multi_year_trend.normalized_evidence=assessment("partial");
    checkpoint.categories.multi_year_trend.accepted_evidence=[item()]; checkpoint.categories.multi_year_trend.failure_reason="Micro-batch old exceeded timeout";
    checkpoint.categories.passing_production_efficiency.status="FAILED_TERMINAL"; checkpoint.categories.passing_production_efficiency.attempt_count=3;
    checkpoint.categories.passing_production_efficiency.failure_reason="GENUINE_EVIDENCE_UNAVAILABLE";
    checkpoint.retry_history.push({batch_id:"F_MULTI_YEAR_AGE",categories:["multi_year_trend"],attempted_at:now,outcome:"FAILURE",failure_kind:"NETWORK_TOOL_TIMEOUT",reason:"timeout"});
    const migrated=migrateLegacyBroadBatchFailures(checkpoint,now);
    assert.equal(migrated.categories.multi_year_trend.status,"PARTIAL"); assert.equal(migrated.categories.multi_year_trend.attempt_count,0);
    assert.equal(migrated.categories.multi_year_trend.legacy_attempt_count,3); assert.equal(migrated.categories.multi_year_trend.accepted_evidence.length,1);
    assert.equal(migrated.categories.passing_production_efficiency.status,"FAILED_TERMINAL"); assert.equal(migrated.retry_history.length,1);
    assert.deepEqual(migrateLegacyBroadBatchFailures(migrated,now),migrated);
  });
  await test("phase change adds current-season evidence without replacing accepted categories",async()=>{
    const checkpoint=fixture();checkpoint.categories.performance_summary.accepted_evidence=[item()];
    const next=ensureCheckpointCategories(checkpoint,["current_season_performance"]);
    assert.equal(next.categories.current_season_performance.status,"NOT_ATTEMPTED");
    assert.equal(next.categories.performance_summary.accepted_evidence.length,1);
  });
  await test("expired timeout-only calendar cycle can renew while preserving history",async()=>{
    const old="2030-08-17T12:00:00.000Z";let saved:CalendarRefreshCheckpoint|null={audit_id:"a",status:"FAILED_TERMINAL",attempt_count:3,max_attempts:3,last_attempt_at:old,calendar:null,
      history:Array.from({length:3},()=>({started_at:old,ended_at:old,elapsed_ms:30000,outcome:"FAILURE" as const,reason:"AbortError timeout"}))};
    const store:CalendarStore={async load(){return structuredClone(saved)},async save(v){saved=structuredClone(v)}};
    const fresh:any={nfl_season:2030,player_id:"fixture_qb",team:"TST",valid_from:"2030-03-01T00:00:00Z",valid_until:"2031-03-01T00:00:00Z",preseason_start:"2030-08-01T00:00:00Z",regular_season_start:"2030-09-01T00:00:00Z",postseason_start:"2031-01-01T00:00:00Z",season_end:"2031-02-01T00:00:00Z",current_season_games_available:0,current_season_games_played:0,regular_season_games_scheduled:17,regular_season_complete:false,postseason_complete:false,sources:[{url:"https://www.nfl.com/schedules/fixture",retrieved_at:now,claims:["calendar"]}]};
    await refreshCalendarIfNeeded({evidence:{calendar:null},task:{player_id:"fixture_qb",team:"TST"},audit_id:"a",as_of:now,store,collector:{async collect(){return fresh}}});
    assert.equal(saved?.status,"SATISFIED");assert.equal(saved?.attempt_count,1);assert.equal(saved?.history.length,4);
  });
}
