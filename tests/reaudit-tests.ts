import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { stateChangeAllowed } from "../scripts/protected-paths-check.mjs";
import { applyFullAuditEvidenceGate, calendarSubject, isPositionWideTask } from "../src/evidence-gate.js";
import { planReaudit, executeReauditStep } from "../src/reaudit-executor.js";

const J = (o: any) => JSON.stringify(o, null, 2);
const NOW = "2026-11-02T13:30:00-05:00";
const cal = (extra: any = {}) => ({ nfl_season: 2026, player_id: "POSITION_WIDE:QB", team: "NFL", valid_from: "2026-08-01T00:00:00Z", valid_until: "2027-03-01T00:00:00Z",
  preseason_start: "2026-08-07T00:00:00Z", regular_season_start: "2026-09-10T00:20:00Z", postseason_start: "2027-01-16T05:00:00Z", season_end: "2027-02-15T05:00:00Z",
  current_season_games_available: 8, current_season_games_played: 8, regular_season_games_scheduled: 17, regular_season_complete: false, postseason_complete: false,
  sources: [{ url: "https://media.nfl.com/news-and-releases/kickoff", retrieved_at: "2026-11-02T18:21:28Z", claims: ["2026 regular season kicks off Sept 9"] },
    { url: "https://operations.nfl.com/calendar-events/nfl-important-dates", retrieved_at: "2026-11-02T18:21:16Z", claims: ["Super Bowl LXI Feb 14, 2027"] }], ...extra });
const ev = (task: any, calendar: any) => ({ task_id: task.task_id, position: "QB", researched_at: "2026-11-02T18:21:00Z", conflicts: [], normalized: {},
  sources: [{ name: "PFF", url: "https://www.pff.com/x", retrieved_at: "2026-11-02T18:21:00Z", published_at: null, authority_tier: 1, claims: ["c"] }],
  minimum_evidence_met: true, missing_evidence: [], fresh_web_research_observed: true, calendar_web_search_observed: true, calendar });
const calErr = (task: any, c: any) => applyFullAuditEvidenceGate(ev(task, c) as any, task, NOW).missing_evidence.filter((m: string) => /CALENDAR|SUBJECT/.test(m));

export async function runReauditTests(sync: (n: string, f: () => void) => void) {
  const pending: Promise<void>[] = [];
  const test = (n: string, f: () => void | Promise<void>) => sync(n, () => { const r = f(); if (r instanceof Promise) pending.push(r.then(() => console.log(`PASS ${n} (async)`))); });
  const base = { positions: { QB: "LOCKED", LG: "IN_PROGRESS" }, current_position: "LG", completed_tasks: ["X"],
    pending_reaudit_queue: [{ type: "TOP10_REAUDIT", position: "QB", status: "QUEUED_NOT_STARTED", queued_at: "q", reason: "r" }] as any[] };
  const withItem = (patch: any) => ({ ...base, pending_reaudit_queue: [{ ...base.pending_reaudit_queue[0], ...patch }] });
  test("guard: re-audit progress fields on the TOP10_REAUDIT item are allowed", () => {
    const started = withItem({ status: "IN_PROGRESS", started_at: "s", current_stage: "provisional_top_10", current_task: "QB_REAUDIT_PROVISIONAL_TOP10", completed_tasks: [], audit_ids: [] });
    assert.equal(stateChangeAllowed(J(base), J(started)).ok, true);
    const waiting = withItem({ ...started.pending_reaudit_queue[0], status: "AWAITING_REVIEW_MAJOR", audit_ids: ["A1"], last_result: { status: "FLAGGED" }, awaiting: { reason: "REVIEW_MAJOR" } });
    assert.equal(stateChangeAllowed(J(started), J(waiting)).ok, true);
    assert.equal(stateChangeAllowed(J(base), J(waiting)).ok, true, "start-and-stop within one push range");
  });
  test("guard: re-audit exception rejects completion, identity changes, removals, history rewrites and other state", () => {
    const started = withItem({ status: "IN_PROGRESS", started_at: "s", completed_tasks: ["A"], audit_ids: ["A1"] });
    for (const [why, head, from] of [
      ["COMPLETED", withItem({ status: "COMPLETED" }), base], ["identity", withItem({ position: "RB" }), base], ["removal", { ...base, pending_reaudit_queue: [] }, base],
      ["current_position", { ...withItem({ status: "IN_PROGRESS" }), current_position: "QB" }, base], ["top-level completed_tasks", { ...withItem({ status: "IN_PROGRESS" }), completed_tasks: [] }, base],
      ["unlock", { ...withItem({ status: "IN_PROGRESS" }), positions: { QB: "IN_PROGRESS", LG: "IN_PROGRESS" } }, base],
      ["audit_ids rewrite", withItem({ status: "IN_PROGRESS", started_at: "s", completed_tasks: ["A"], audit_ids: ["Z"] }), started],
      ["started_at rewrite", withItem({ status: "IN_PROGRESS", started_at: "t", completed_tasks: ["A"], audit_ids: ["A1"] }), started],
      ["unknown field", withItem({ status: "IN_PROGRESS", baseline: [] }), base],
    ] as any[]) assert.equal(stateChangeAllowed(J(from), J(head)).ok, false, why);
  });
  test("engine: re-audit plans a LOCKED position without mutating state", () => {
    const st = JSON.parse(fs.readFileSync("state/project-state.json", "utf8")); const before = J(st);
    const plan = planReaudit(st, "QB");
    assert.equal(plan.task.task_id, "QB_REAUDIT_PROVISIONAL_TOP10"); assert.equal((plan.task as any).audit_type, "TOP10_REAUDIT");
    assert.equal(((plan.task as any).baseline_controls.top_10).length, 10); assert.equal(J(st), before);
  });
  test("executor: re-audit step records only guard-allowed queue fields", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "reaudit-"));
    for (const f of ["state/project-state.json", "state/locks.json", "data/baselines/QB.json", "data/candidate-pools/QB.reaudit.json", "config/position-metrics.json", "config/methodology.json", "data/players/registry.json"]) {
      fs.mkdirSync(path.dirname(path.join(root, f)), { recursive: true }); if (fs.existsSync(f)) fs.copyFileSync(f, path.join(root, f)); }
    const sp = path.join(root, "state/project-state.json"); const s0 = JSON.parse(fs.readFileSync(sp, "utf8"));
    const PROGRESS = ["status", "started_at", "updated_at", "current_stage", "current_task", "completed_tasks", "audit_ids", "last_result", "awaiting"];
    s0.pending_reaudit_queue = s0.pending_reaudit_queue.map((x: any) => x.position !== "QB" ? x :
      { ...Object.fromEntries(Object.entries(x).filter(([k]) => !PROGRESS.includes(k))), status: "QUEUED_NOT_STARTED" });
    fs.writeFileSync(sp, J(s0) + "\n");
    const before = fs.readFileSync(sp, "utf8");
    const r: any = await executeReauditStep("QB", { root, now: () => NOW, research: { gather: async (t: any) => ({ task_id: t.task_id, minimum_evidence_met: false, missing_evidence: ["CALENDAR_UNRESOLVED"], sources: [] }) } });
    assert.equal(r.status, "INSUFFICIENT_EVIDENCE");
    const after = fs.readFileSync(path.join(root, "state/project-state.json"), "utf8");
    assert.equal(stateChangeAllowed(before, after).ok, true, JSON.stringify(stateChangeAllowed(before, after)));
    const a = JSON.parse(after), b = JSON.parse(before); assert.equal(a.current_position, b.current_position); assert.deepEqual(a.positions, b.positions);
    assert.equal(a.pending_reaudit_queue.find((x: any) => x.position === "QB").status, "IN_PROGRESS");
    assert.equal(fs.readFileSync(path.join(root, "data/baselines/QB.json"), "utf8"), fs.readFileSync("data/baselines/QB.json", "utf8"));
  });
  test("calendar: position-wide subject only for top-10 and pair tasks", () => {
    const prov = { task_id: "QB_REAUDIT_PROVISIONAL_TOP10", position: "QB", type: "provisional_top_10" };
    const pair = { task_id: "QB_REAUDIT_PAIR_01", position: "QB", type: "pair_audit" };
    const single = { task_id: "QB_FULL", position: "QB", type: "full_audit", player_id: "p1", team: "CIN" };
    assert(isPositionWideTask(prov) && isPositionWideTask(pair) && !isPositionWideTask(single));
    assert.deepEqual(calendarSubject(prov), { player_id: "POSITION_WIDE:QB", team: "NFL" });
    assert.deepEqual(calErr(prov, cal()), []); assert.deepEqual(calErr(pair, cal()), []);
    assert(calErr(single, cal()).length > 0, "single-player keeps strict subject");
    assert.deepEqual(calErr(single, cal({ player_id: "p1", team: "CIN" })), []);
    assert(calErr(prov, cal({ sources: [{ url: "https://www.espn.com/x", retrieved_at: "2026-11-02T18:21:28Z", claims: ["regular season", "Super Bowl"] }] })).length > 0, "non-nfl source rejected");
    assert(calErr(prov, cal({ sources: [cal().sources[0]] })).includes("POSITION_WIDE_CALENDAR_START_END_SOURCES_MISSING"));
    assert(calErr(prov, cal({ sources: cal().sources.map((s: any) => ({ ...s, retrieved_at: "2026-10-30T00:00:00Z" })) })).length > 0, "stale sources rejected");
  });
  await Promise.all(pending);
}
