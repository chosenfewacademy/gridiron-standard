import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { stateChangeAllowed, violations, reauditAuditAddAllowed } from "../scripts/protected-paths-check.mjs";
import { applyFullAuditEvidenceGate, calendarSubject, isPositionWideTask } from "../src/evidence-gate.js";
import { planReaudit, executeReauditStep } from "../src/reaudit-executor.js";
import { checkReauditPool } from "../src/coverage-gate.js";

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
  const asyncTests: Array<[string, () => Promise<void>]> = [];
  const test = (n: string, f: () => void | Promise<void>) => f.constructor.name === "AsyncFunction" ? asyncTests.push([n, f as () => Promise<void>]) : sync(n, f as () => void);
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
  test("guard: NEW TOP10_REAUDIT audit records may be added; existing audit files stay immutable", () => {
    const rec = J({ audit_id: "QB_REAUDIT_PAIR_01_A1", audit_type: "TOP10_REAUDIT" });
    assert.equal(reauditAuditAddAllowed("A", "audits/league/QB/QB_REAUDIT_PAIR_01_A1.json", rec), true);
    assert.equal(reauditAuditAddAllowed("A", "audits/league/QB/QB_REAUDIT_PAIR_01_A1.md", ""), true);
    for (const [st, p, t, why] of [["M", "audits/league/QB/QB_REAUDIT_PAIR_01_A1.json", rec, "modify"], ["D", "audits/league/QB/QB_REAUDIT_PAIR_01_A1.json", rec, "delete"],
      ["A", "audits/league/QB/QB_PAIR_01_A1.json", rec, "non-reaudit task"], ["A", "audits/league/QB/RB_REAUDIT_PAIR_01.json", rec, "position mismatch"],
      ["A", "audits/league/QB/QB_REAUDIT_X.json", J({ audit_type: "FULL_AUDIT" }), "wrong audit_type"], ["A", "audits/league/QB/QB_REAUDIT_X.txt", "", "extension"]] as any[])
      assert.equal(reauditAuditAddAllowed(st, p, t), false, why);
    const allow = (st: string, p: string) => reauditAuditAddAllowed(st, p, rec);
    assert.deepEqual(violations(["A\taudits/league/QB/QB_REAUDIT_PAIR_01_A1.json"], () => false, allow), []);
    assert.equal(violations(["M\taudits/league/QB/QB_REAUDIT_PAIR_01_A1.json", "D\taudits/league/QB/QB_A.json", "R100\taudits/a.json\taudits/league/QB/QB_REAUDIT_Z.json", "A\tdata/baselines/QB.json"], () => false, allow).length, 5); // rename reports both paths
    assert.equal(violations(["A\taudits/league/QB/QB_REAUDIT_PAIR_01_A1.json"]).length, 1, "default strict");
  });
  test("guard: commissioner approvals are append-only records that must reference recorded audits", () => {
    const waiting = withItem({ status: "AWAITING_REVIEW_MAJOR", started_at: "s", completed_tasks: [], audit_ids: ["A1"], awaiting: { task_id: "P", audit_id: "A1" } });
    const ap = { decision: "APPROVED", task_id: "P", audit_id: "A1", approved_by: "PhiXCrypto", approved_at: "2026-11-02T13:36:00-05:00" };
    const approved = withItem({ ...waiting.pending_reaudit_queue[0], status: "IN_PROGRESS", completed_tasks: ["P"], approvals: [ap], awaiting: null });
    assert.equal(stateChangeAllowed(J(waiting), J(approved)).ok, true);
    const mod = (patch: any) => withItem({ ...approved.pending_reaudit_queue[0], ...patch });
    for (const [why, head, from] of [
      ["resume without approval", mod({ approvals: [] }), waiting],
      ["unknown audit", mod({ approvals: [{ ...ap, audit_id: "ZZ" }] }), waiting],
      ["task not completed", mod({ completed_tasks: [], approvals: [ap] }), waiting],
      ["unnamed approver", mod({ approvals: [{ ...ap, approved_by: "" }] }), waiting],
      ["rewrite approval", mod({ approvals: [{ ...ap, approved_at: "x" }] }), approved],
      ["remove approval", mod({ approvals: [] }), approved],
      ["approval + lock change", { ...approved, positions: { QB: "IN_PROGRESS", LG: "IN_PROGRESS" } }, waiting],
      ["approval + current_position", { ...approved, current_position: "QB" }, waiting],
      ["COMPLETED", mod({ status: "COMPLETED" }), waiting],
    ] as any[]) assert.equal(stateChangeAllowed(J(from), J(head)).ok, false, why);
  });
  test("engine: re-audit plans a LOCKED position without mutating state", () => {
    const st = JSON.parse(fs.readFileSync("state/project-state.json", "utf8")); const before = J(st);
    const plan = planReaudit(st, "QB");
    assert.match(String(plan.task.task_id), /^QB_REAUDIT_/); assert.equal((plan.task as any).audit_type, "TOP10_REAUDIT");
    if (plan.stage === "pair_audits") { assert.equal((plan.task as any).baseline_controls.locked_baseline.top_10.length, 10); }
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
  test("executor: v1.1.2 restart supersedes an earlier-order checkpoint without approving it (guard-allowed)", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "reaudit112-"));
    for (const f of ["state/project-state.json", "state/locks.json", "data/baselines/QB.json", "data/candidate-pools/QB.reaudit.json", "config/position-metrics.json", "config/methodology.json", "data/players/registry.json"]) {
      fs.mkdirSync(path.dirname(path.join(root, f)), { recursive: true }); fs.copyFileSync(f, path.join(root, f)); }
    const sp = path.join(root, "state/project-state.json"); const s0 = JSON.parse(fs.readFileSync(sp, "utf8"));
    const qi = s0.pending_reaudit_queue.findIndex((x: any) => x.position === "QB");
    s0.pending_reaudit_queue[qi] = { ...s0.pending_reaudit_queue[qi], status: "AWAITING_REVIEW_MAJOR", started_at: "s", completed_tasks: ["QB_REAUDIT_PAIR_01"], audit_ids: ["QB_REAUDIT_PAIR_03_A1"],
      approvals: [], awaiting: { reason: "REVIEW_MAJOR", task_id: "QB_REAUDIT_PAIR_03", audit_id: "QB_REAUDIT_PAIR_03_A1" } };
    fs.writeFileSync(sp, J(s0) + "\n"); const before = fs.readFileSync(sp, "utf8");
    let seen: any = null;
    await executeReauditStep("QB", { root, now: () => NOW, research: { gather: async (t: any) => { seen = t; return { task_id: t.task_id, minimum_evidence_met: false, missing_evidence: ["X"], sources: [] }; } } });
    assert.equal(seen.task_id, "QB_REAUDIT_CANDIDATE_AUDIT"); assert.deepEqual(seen.earlier_order_inputs, ["QB_REAUDIT_PAIR_03_A1"]);
    const after = fs.readFileSync(sp, "utf8"); const it = JSON.parse(after).pending_reaudit_queue[qi];
    assert.equal(it.status, "AWAITING_REVIEW_MAJOR", "restart never approves or resumes past a checkpoint");
    assert.equal(it.last_result.superseded_checkpoint.task_id, "QB_REAUDIT_PAIR_03"); assert.deepEqual(it.completed_tasks, ["QB_REAUDIT_PAIR_01"]);
    assert.equal(stateChangeAllowed(before, after).ok, true, JSON.stringify(stateChangeAllowed(before, after)));
  });
  test("Addendum v1.1.2 enacted; v1.0, v1.1 and v1.1.1 text intact", () => {
    const a = fs.readFileSync("AGENTS.md", "utf8");
    assert.match(a, /^# Gridiron Standard 27\n\nArchitecture Version: 1\.0\.0/); assert.match(a, /## Amendment v1\.1 \(ENACTED\)/); assert.match(a, /## Addendum v1\.1\.1/);
    assert.match(a, /## Addendum v1\.1\.2 — Audit stage order \(ENACTED\)/); assert.ok(a.indexOf("v1.1.2") > a.indexOf("Addendum v1.1.1"));
    const m = JSON.parse(fs.readFileSync("config/methodology.json", "utf8"));
    assert.equal(m.architecture_version, "1.1.2"); assert.equal(m.methodology_version, "1.1.0");
    assert.deepEqual(m.audit_order.stages.slice(0, 4), ["candidate_audit", "background_analysis", "player_rating", "pair_audits"]);
    assert.match(fs.readFileSync("ARCHITECTURE_CHANGELOG.md", "utf8"), /## 1\.1\.2 \(addendum\)/);
  });
  test("calendar: candidate_audit is position-wide too", () => {
    const cand = { task_id: "QB_REAUDIT_CANDIDATE_AUDIT", position: "QB", type: "candidate_audit" };
    assert.deepEqual(calErr(cand, cal()), []); assert(!isPositionWideTask({ ...cand, type: "player_rating" }));
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
  test("pool amendment: approved add-only re-inclusion supersedes an exclusion; unapproved or uncited does not", () => {
    const reg = JSON.parse(fs.readFileSync("data/players/registry.json", "utf8")).players;
    const live = JSON.parse(fs.readFileSync("data/candidate-pools/QB.reaudit.json", "utf8"));
    const p = { ...live, status: "PROPOSED" };
    assert.equal(checkReauditPool(p, reg).ok, true, checkReauditPool(p, reg).errors.join("; "));
    assert(p.exclusions.some((e: any) => e.player === "Justin Herbert"), "exclusion record kept as history");
    const noApproval = { ...p, amendments: p.amendments.map((a: any) => ({ ...a, approved_by: undefined })) };
    assert(checkReauditPool(noApproval, reg).errors.some((e: string) => /both candidate and excluded/.test(e)));
    const uncited = { ...p, candidates: p.candidates.map((c: any) => ({ ...c, added_by_amendment: undefined })) };
    assert(checkReauditPool(uncited, reg).errors.some((e: string) => /both candidate and excluded/.test(e)));
  });
  test("engine: v1.1.2 background tasks carry the player calendar subject; amendment players join contention; dossiers are always reviewed", () => {
    const st = JSON.parse(fs.readFileSync("state/project-state.json", "utf8"));
    const item = st.pending_reaudit_queue.find((x: any) => x.position === "QB");
    if (!item.completed_tasks.includes("QB_REAUDIT_CANDIDATE_AUDIT")) return;
    const t: any = planReaudit(st, "QB").task;
    if (t.type === "background_analysis") { assert.ok(t.player_id && t.team); assert(!isPositionWideTask(t)); }
    const ext = t.baseline_controls?.external_controls ?? [];
    assert(ext.includes("Justin Herbert") && ext.includes("Sam Darnold"));
    assert.match(fs.readFileSync("src/reaudit-executor.ts", "utf8"), /ALWAYS_REVIEW = new Set\([^)]*"background_analysis"/);
  });
  for (const [n, f] of asyncTests) { await f(); console.log(`PASS ${n}`); } // sequential: executor chdirs
}
