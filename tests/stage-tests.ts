import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NflverseRosterSource } from "../src/nflverse-roster-source.js";
import { refreshRoster } from "../src/roster-refresh.js";

type T = (name: string, fn: () => void | Promise<void>) => void;

const CSV = "full_name,team,position,depth_chart_position,gsis_id\nOld Guy,NYG,C,C,00-1\nNew Guy,DAL,C,C,00-2\nKick Er,DAL,K,K,00-3\nGuard Man,DAL,OL,G,00-4\nTack Le,DAL,OL,T,00-5\n";
function tmpRegistry(): { dir: string; reg: string; csv: string } {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "roster-"));
  const reg = path.join(dir, "registry.json"); const csv = path.join(dir, "roster.csv");
  fs.writeFileSync(reg, JSON.stringify({ players: [{ player_id: "ext_00-1", full_name: "Old Guy", team: "PHI", position: "C", current_audit_id: "KEEP" }] }));
  fs.writeFileSync(csv, CSV);
  return { dir, reg, csv };
}

export async function runRosterRefreshTests(test: T) {
  await test("roster:refresh offline --add-only never modifies existing players", async () => {
    const { reg, csv } = tmpRegistry();
    const r = await refreshRoster(new NflverseRosterSource(2026, csv), { addOnly: true, registryPath: reg });
    const players = JSON.parse(fs.readFileSync(reg, "utf8")).players;
    const old = players.find((p: any) => p.full_name === "Old Guy");
    assert.equal(old.team, "PHI"); assert.equal(old.current_audit_id, "KEEP");
    assert.equal(r.added, 4); assert.equal(r.updated, 0); assert.equal(r.skipped_existing, 1);
  });
  await test("roster:refresh --dry-run writes nothing; --positions filters additions", async () => {
    const { reg, csv } = tmpRegistry(); const before = fs.readFileSync(reg, "utf8");
    const r = await refreshRoster(new NflverseRosterSource(2026, csv), { addOnly: true, dryRun: true, positions: ["K", "RG"], registryPath: reg });
    assert.equal(fs.readFileSync(reg, "utf8"), before); assert.equal(r.added, 2, "K plus role-unresolved guard (could be RG); tackle excluded");
    const n = await refreshRoster(new NflverseRosterSource(2026, csv), { addOnly: true, dryRun: true, positions: ["K"], names: ["Tack Le"], registryPath: reg });
    assert.equal(n.added, 2, "--names admits an explicitly named player outside the position filter");
    await refreshRoster(new NflverseRosterSource(2025, csv), { addOnly: true, positions: [], names: ["New Guy"], freeAgent: true, registryPath: reg });
    const fa = JSON.parse(fs.readFileSync(reg, "utf8")).players.find((p: any) => p.full_name === "New Guy");
    assert.equal(fa.team, null); assert.equal(fa.previous_team, "DAL"); assert.equal(fa.roster_status, "UNSIGNED_FREE_AGENT");
    assert.equal(JSON.parse(fs.readFileSync(reg, "utf8")).players.find((p: any) => p.full_name === "Old Guy").team, "PHI");
  });
}

import { evaluateLeagueCeiling, ceilingCheckErrors, ceilingConfig } from "../src/league-ceiling.js";
import { planNext, generatePairs, stageOutputErrors, ids, ratingAttributes, usesOrderV112, LEGACY_ORDER_TASK, ratingOrder, approvedTiebreaks } from "../src/stage-engine.js";
import { getNextTask } from "../src/state-machine.js";
import { lockPosition } from "../src/position-lock.js";
import { checkCoverage, checkReauditPool, requireApprovedPool, requireApprovedReauditPool, approvePool, normName } from "../src/coverage-gate.js";
import { triggerTop10Reaudit } from "../src/top10-reaudit.js";

const REAL_STATE = JSON.parse(fs.readFileSync("state/project-state.json", "utf8"));
const TOP = Array.from({ length: 10 }, (_, i) => `C Player ${i + 1}`);

function sandbox(pos = "C") {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "stage-"));
  for (const d of ["state", "data/baselines", "config", "data/players", "data/candidate-pools", `audits/league/${pos}`]) fs.mkdirSync(path.join(root, d), { recursive: true });
  for (const f of ["state/locks.json", "config/position-sequence.json", "config/position-metrics.json"]) fs.copyFileSync(f, path.join(root, f));
  { const lp = path.join(root, "state/locks.json"); const lk = JSON.parse(fs.readFileSync(lp, "utf8")); if (lk.positions) delete lk.positions[pos]; fs.writeFileSync(lp, JSON.stringify(lk)); } // sandbox isolates the real lock for the fixture position (C locked 2026-11-04)
  fs.writeFileSync(path.join(root, "data/players/registry.json"), JSON.stringify({ players: [...TOP, "C Out", "C Ext"].map((n, i) => ({ player_id: `p${i}`, full_name: n })) }));
  fs.writeFileSync(path.join(root, `data/candidate-pools/${pos}.json`), JSON.stringify(goodPool(pos, "APPROVED")));
  const state = structuredClone(REAL_STATE);
  state.positions.LG = "LOCKED"; state.positions[pos] = "IN_PROGRESS";
  state.pending_reaudit_queue = (state.pending_reaudit_queue ?? []).filter((q: any) => q.position !== pos); // sandbox isolates the real queue (addendum 2026-11-04b)
  state.current_position = pos; state.current_stage = "provisional_top_10"; state.completed_tasks = [];
  const save = () => fs.writeFileSync(path.join(root, "state/project-state.json"), JSON.stringify(state));
  save();
  const opts = { root, auditsRoot: path.join(root, "audits/league"), metricsPath: path.join(root, "config/position-metrics.json"), order: "1.1.0" as const };
  let n = 0;
  const approve = (task_id: string, extra: Record<string, unknown> = {}) => {
    fs.writeFileSync(path.join(opts.auditsRoot, pos, `A${++n}.json`), JSON.stringify({ audit_id: `A${n}`, task_id, status: "APPROVED", position: pos, created_at: `2026-11-01T00:00:${String(n).padStart(2, "0")}Z`, ...extra }));
    state.completed_tasks.push(task_id); save();
  };
  return { root, state, opts, approve };
}

const SRC = (id: string, kind: string, publisher: string, top: string[]) =>
  ({ id, name: id, publisher, kind, season: 2026, url: `https://example.org/${id}`, retrieved_at: "2026-11-01T22:00:00-05:00", top: [...top] });
function goodPool(pos: string, status = "PROPOSED"): any {
  return { position: pos, status, ...(status === "APPROVED" ? { approved_by: "commissioner", approved_at: "2026-11-01" } : {}),
    candidates: [...TOP, "C Out"].map((player, i) => ({ player, player_id: i < 10 ? `p${i}` : "p10" })),
    exclusions: [{ player: "C Ext", reason: "PFF grade below cutoff; usage only", code: "BELOW_CUTOFF" }],
    coverage_sources: [SRC("pff", "grades", "PFF", TOP), SRC("snaps", "usage", "nflverse", ["C Ext", ...TOP]), SRC("ap", "honors", "AP", ["C Out"])] };
}

export function runCoverageGateTests(test: (n: string, f: () => void) => void) {
  const reg = [...TOP, "C Out", "C Ext"].map((n, i) => ({ player_id: `p${i}`, full_name: n }));
  test("coverage gate passes when every top name is pooled or excluded with reason", () => {
    const r = checkCoverage(goodPool("C"), reg); assert.equal(r.ok, true, r.errors.join("; "));
  });
  test("coverage gate blocks a top-ranked name missing from the pool", () => {
    const p = goodPool("C"); p.coverage_sources[2].top.push("Star Center");
    const r = checkCoverage(p, [...reg, { player_id: "s", full_name: "Star Center" }]);
    assert.equal(r.ok, false); assert.deepEqual(r.unaccounted.map(u => u.player), ["Star Center"]);
  });
  test("coverage gate blocks a top-ranked name missing from the registry, even if pooled", () => {
    const p = goodPool("C"); p.coverage_sources[0].top.push("Ghost Guy"); p.candidates.push({ player: "Ghost Guy", player_id: null });
    const r = checkCoverage(p, reg); assert.equal(r.ok, false); assert.deepEqual(r.missing_from_registry, ["Ghost Guy"]);
    p.candidates.pop(); p.exclusions.push({ player: "Ghost Guy", reason: "Retired after 2025; not on 2026 roster", code: "NOT_ON_2026_ROSTER" });
    assert.ok(checkCoverage(p, reg).errors.some(e => /belong in free_agents/.test(e)), "silent off-roster exclusion rejected");
    p.exclusions.pop();
    p.free_agents = [{ player: "Ghost Guy", player_id: null, status: "RETIRED", last_team: "CLE", status_as_of: "2026-06-09", source_url: "https://www.nfl.com/news/x" }];
    assert.equal(checkCoverage(p, reg).ok, true, "retired with status+source accounts for the name");
    p.free_agents[0].status = "FREE_AGENT";
    assert.equal(checkCoverage(p, reg).ok, false, "eligible free agent must be in registry");
    p.free_agents[0].player_id = "p11"; p.free_agents[0].player = "C Ext"; p.exclusions = []; p.coverage_sources[0].top.pop();
    assert.equal(checkCoverage(p, reg).ok, true, checkCoverage(p, reg).errors.join(";"));
  });
  test("coverage gate requires >=3 sources, 3 kinds, 2 publishers, urls and real exclusion reasons", () => {
    const p = goodPool("C"); p.coverage_sources = p.coverage_sources.slice(0, 2); assert.equal(checkCoverage(p, reg).ok, false);
    const q = goodPool("C"); q.coverage_sources.forEach((s: any) => s.publisher = "PFF"); assert.equal(checkCoverage(q, reg).ok, false);
    const u = goodPool("C"); u.coverage_sources[0].url = "http://x"; assert.equal(checkCoverage(u, reg).ok, false);
    const e = goodPool("C"); e.exclusions[0].reason = "no"; assert.equal(checkCoverage(e, reg).ok, false);
  });
  test("candidate aliases match source spellings (Patrick vs Pat Surtain II) via registry id", () => {
    const p = goodPool("C"); p.coverage_sources[0].top.push("Patrick Surtain II");
    const r2 = [...reg, { player_id: "ps", full_name: "Pat Surtain II" }];
    assert.equal(checkCoverage(p, r2).ok, false);
    p.candidates.push({ player: "Pat Surtain II", aliases: ["Patrick Surtain II"], player_id: "ps" });
    assert.equal(checkCoverage(p, r2).ok, true);
  });
  test("excluded names resolve registry membership through player_id", () => {
    const p = goodPool("C"); p.coverage_sources[0].top.push("Kamren Curl");
    p.exclusions.push({ player: "Kam Curl", aliases: ["Kamren Curl"], player_id: "kc", reason: "Below pool cutoff for this position" });
    assert.equal(checkCoverage(p, [...reg, { player_id: "kc", full_name: "Kam Curl" }]).ok, true);
    assert.equal(checkCoverage(p, reg).ok, false, "unknown exclusion player_id blocks");
  });
  test("re-audit pools: coverage gate + TOP10_REAUDIT trigger, proposed file stays PROPOSED, ignored by requireApprovedPool", () => {
    const p: any = goodPool("QB");
    assert.ok(checkReauditPool(p, reg).errors.some(e => /TOP10_REAUDIT/.test(e)), "missing trigger blocks");
    p.reaudit = { requires_trigger: "TOP10_REAUDIT", compared_list: ["A"], flags: [] };
    assert.equal(checkReauditPool(p, reg).ok, true, checkReauditPool(p, reg).errors.join(";"));
    p.status = "APPROVED"; assert.equal(checkReauditPool(p, reg).ok, false, "re-audit pool cannot be approved");
    p.status = "PROPOSED"; p.coverage_sources = p.coverage_sources.slice(0, 1); assert.equal(checkReauditPool(p, reg).ok, false, "normal coverage rules still apply");
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "reaudit-"));
    fs.mkdirSync(path.join(dir, "data/candidate-pools"), { recursive: true });
    fs.writeFileSync(path.join(dir, "data/candidate-pools/QB.reaudit.proposed.json"), JSON.stringify({ ...goodPool("QB"), status: "APPROVED", approved_by: "x", approved_at: "y" }));
    assert.throws(() => requireApprovedPool("QB", dir), "a re-audit file is never read as the active pool");
  });
  test("pool approval: gated, writes separate immutable APPROVED file; TOP10_REAUDIT only queues via state path", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "approve-"));
    for (const d of ["data/candidate-pools", "data/players", "data/baselines", "state"]) fs.mkdirSync(path.join(dir, d), { recursive: true });
    fs.writeFileSync(path.join(dir, "data/players/registry.json"), JSON.stringify({ players: reg }));
    const w = (f: string, o: unknown) => fs.writeFileSync(path.join(dir, f), JSON.stringify(o));
    w("data/candidate-pools/C.proposed.json", goodPool("C"));
    w("data/candidate-pools/QB.reaudit.proposed.json", { ...goodPool("QB"), reaudit: { requires_trigger: "TOP10_REAUDIT", compared_list: ["A"], flags: [] } });
    const bad = goodPool("RG"); bad.coverage_sources = bad.coverage_sources.slice(0, 1); w("data/candidate-pools/RG.proposed.json", bad);
    const state = { positions: { QB: "LOCKED", C: "PENDING" }, pending_reaudit_queue: [] as unknown[] }; w("state/project-state.json", state);
    const base = '{"locked":true}'; fs.writeFileSync(path.join(dir, "data/baselines/QB.json"), base);
    assert.throws(() => triggerTop10Reaudit("QB", "comm", dir), /no approved re-audit pool/, "trigger needs approved re-audit pool");
    assert.equal(approvePool("C.proposed.json", "comm", dir), "data/candidate-pools/C.json");
    assert.equal(requireApprovedPool("C", dir).approved_by, "comm");
    assert.equal(JSON.parse(fs.readFileSync(path.join(dir, "data/candidate-pools/C.proposed.json"), "utf8")).status, "PROPOSED", "proposed file untouched");
    assert.throws(() => approvePool("C.proposed.json", "comm", dir), /immutable/);
    assert.throws(() => approvePool("RG.proposed.json", "comm", dir), /COVERAGE_GATE_BLOCKED/);
    assert.throws(() => approvePool("C.proposed.json", " ", dir), /approved_by/);
    approvePool("QB.reaudit.proposed.json", "comm", dir);
    assert.throws(() => requireApprovedPool("QB", dir), "approved re-audit pool is not the active pool");
    assert.equal(requireApprovedReauditPool("QB", dir).status, "APPROVED");
    assert.throws(() => triggerTop10Reaudit("C", "comm", dir), /no approved re-audit pool/); // addendum 2026-11-04b: never-locked PENDING reaches the pool gate
    const it = triggerTop10Reaudit("QB", "comm", dir);
    assert.equal(it.status, "QUEUED_NOT_STARTED");
    const st = JSON.parse(fs.readFileSync(path.join(dir, "state/project-state.json"), "utf8"));
    assert.equal(st.pending_reaudit_queue.length, 1); assert.equal(st.positions.QB, "LOCKED", "lock state unchanged");
    assert.equal(fs.readFileSync(path.join(dir, "data/baselines/QB.json"), "utf8"), base, "baseline unchanged");
    assert.throws(() => triggerTop10Reaudit("QB", "comm", dir), /already has a queued/);
  });
  test("injured candidates must be explicit: status + source, in_pool consistent", () => {
    const r2 = reg.map(x => x.player_id === "p0" ? { ...x, roster_status: "RES" } : x);
    const p = goodPool("C");
    assert.ok(checkCoverage(p, r2).errors.some(e => /injured section/.test(e)), "IR candidate without injured entry blocks");
    p.injured = [{ player: "C Player 1", player_id: "p0", team: "X", status: "IR", in_pool: true, status_as_of: "2026-10-30", source_url: "https://github.com/nflverse/x" }];
    assert.equal(checkCoverage(p, r2).ok, true);
    p.injured[0].in_pool = false; assert.equal(checkCoverage(p, r2).ok, false);
    p.injured[0].in_pool = true; (p.injured[0] as any).status = "HURT"; assert.equal(checkCoverage(p, r2).ok, false);
    const q = goodPool("C"); q.coverage_sources[0].top.push("Hurt Guy");
    q.injured = [{ player: "Hurt Guy", player_id: "h", team: "X", status: "PUP", in_pool: false, status_as_of: "2026-10-30", source_url: "https://x.org" }];
    assert.equal(checkCoverage(q, [...reg, { player_id: "h", full_name: "Hurt Guy" }]).ok, true, "injured section accounts for a top name outside the pool");
  });
  test("name matching tolerates suffixes and accents (Jr., II)", () => {
    assert.equal(normName("Will Anderson Jr."), normName("Will Anderson")); assert.equal(normName("Patrick Surtain II"), normName("patrick surtain"));
  });
  test("provisional stage blocks without an APPROVED pool, and when coverage fails", () => {
    const { root, state, opts } = sandbox();
    fs.writeFileSync(path.join(root, "data/candidate-pools/C.json"), JSON.stringify(goodPool("C")));
    assert.throws(() => planNext(state, opts), /COVERAGE_GATE_BLOCKED.*not APPROVED/);
    const bad = goodPool("C", "APPROVED"); bad.coverage_sources[0].top.push("Star Center");
    fs.writeFileSync(path.join(root, "data/candidate-pools/C.json"), JSON.stringify(bad));
    assert.throws(() => planNext(state, opts), /COVERAGE_GATE_BLOCKED.*Star Center/);
    fs.rmSync(path.join(root, "data/candidate-pools/C.json"));
    assert.throws(() => planNext(state, opts), /no approved candidate pool/);
  });
  test("approved pool is attached and provisional names outside it are rejected", () => {
    const { state, opts } = sandbox(); const t: any = planNext(state, opts).task;
    assert.equal(t.candidate_pool.length, 11);
    const errs = stageOutputErrors(t, { provisional_top_10: [...TOP.slice(0, 9), "Outsider"], first_out: "C Out", external_controls: ["x"] });
    assert.ok(errs.some(e => /Outsider is not in the approved candidate pool/.test(e)));
  });
}

export function runStageEngineTests(test: (n: string, f: () => void) => void) {
  test("LG legacy sequence is exactly preserved: next is LG_PAIR_03 with position field", () => {
    const t: any = getNextTask(REAL_STATE);
    assert.equal(t.task_id, "LG_PAIR_03"); assert.equal(t.type, "pair_audit");
    assert.deepEqual(t.players, ["Steve Avila", "Tyler Smith"]); assert.equal(t.position, "LG"); assert.equal(t.stage, "pair_audits");
    assert.ok(t.position_inputs, "Methodology v1.1 per-position inputs attached");
  });
  test("LG legacy: 04, 05, then LG_MEMBERSHIP membership_reopen", () => {
    const s = structuredClone(REAL_STATE);
    s.completed_tasks.push("LG_PAIR_03"); assert.deepEqual((planNext(s).task as any).players, ["Isaac Seumalo", "Landon Dickerson"]);
    s.completed_tasks.push("LG_PAIR_04"); assert.equal(planNext(s).task.task_id, "LG_PAIR_05");
    s.completed_tasks.push("LG_PAIR_05"); const p = planNext(s);
    assert.equal(p.task.task_id, "LG_MEMBERSHIP"); assert.equal(p.task.type, "membership_reopen"); assert.equal(p.stage, "membership_reopen");
  });
  test("stage 1 provisional_top_10 is first for a fresh position (C)", () => {
    const { state, opts } = sandbox(); const p = planNext(state, opts);
    assert.equal(p.stage, "provisional_top_10"); assert.equal(p.task.task_id, "C_PROVISIONAL_TOP10"); assert.equal(p.task.position, "C");
  });
  test("stage 2 pair generation: adjacent ranks + boundary pair, controls attached", () => {
    const pairs = generatePairs("C", TOP, "C Out");
    assert.equal(pairs.length, 6); assert.deepEqual(pairs[0].players, ["C Player 1", "C Player 2"]);
    assert.deepEqual(pairs[5], { task_id: "C_PAIR_06", players: ["C Player 10", "C Out"] });
    assert.throws(() => generatePairs("C", TOP.slice(0, 9)));
    const { state, opts, approve } = sandbox();
    approve("C_PROVISIONAL_TOP10", { provisional_top_10: TOP, first_out: "C Out", external_controls: ["C Out", "C Ext"] });
    const p: any = planNext(state, opts).task;
    assert.equal(p.task_id, "C_PAIR_01"); assert.equal(p.baseline_controls.top_10.length, 10);
  });
  test("completed provisional without its APPROVED record fails closed", () => {
    const { state, opts } = sandbox(); state.completed_tasks.push("C_PROVISIONAL_TOP10");
    assert.throws(() => planNext(state, opts), /APPROVED audit record is missing/);
  });
  test("stages 3-7: membership, scarcity, 10 hard audits, cross audit, lock (commissioner)", () => {
    const { root, state, opts, approve } = sandbox(); const I = ids("C");
    approve(I.provisional, { provisional_top_10: TOP, first_out: "C Out", external_controls: ["C Out"] });
    for (let i = 1; i <= 6; i++) approve(I.pair(i), { pair_result: "ok" });
    assert.equal(planNext(state, opts).stage, "membership_reopen");
    const final = [...TOP.slice(0, 9), "C Out"];
    approve(I.membership, { final_top_10: final, first_out: "C Player 10", external_controls: ["C Player 10"] });
    const sc: any = planNext(state, opts); assert.equal(sc.stage, "scarcity_audit"); assert.deepEqual(sc.task.players, final);
    approve(I.scarcity, { scarcity: { "95_plus_count": 3 } });
    for (let i = 1; i <= 10; i++) {
      const h: any = planNext(state, opts); assert.equal(h.stage, "individual_hard_audits"); assert.deepEqual(h.task.players, [final[i - 1]]);
      approve(I.hard(i));
    }
    assert.equal(planNext(state, opts).stage, "positional_cross_audit");
    approve(I.cross, { cross_audit_result: "consistent" });
    const l: any = planNext(state, opts); assert.equal(l.stage, "lock"); assert.equal(l.task.requires_commissioner_confirmation, "LOCK_C");
    assert.throws(() => lockPosition("C", undefined, root), /confirmation required/);
    const res = lockPosition("C", "LOCK_C", root);
    assert.equal(res.next_position, "RG");
    const b = JSON.parse(fs.readFileSync(path.join(root, "data/baselines/C.json"), "utf8"));
    assert.equal(b.top_10[9].player, "C Out"); assert.equal(b.mutation_policy, "TOP10_REAUDIT_ONLY");
    const s2 = JSON.parse(fs.readFileSync(path.join(root, "state/project-state.json"), "utf8"));
    assert.equal(s2.positions.C, "LOCKED"); assert.equal(s2.current_position, "RG"); assert.equal(s2.current_stage, "candidate_audit");
    assert.match(String(s2.current_task.blocked), /COVERAGE_GATE_BLOCKED/, "next position waits for an approved pool");
    assert.throws(() => planNext({ ...s2, current_position: "C" }, opts), /LOCKED/);
  });
  test("lock refuses early stages, pending re-audits, and existing baselines", () => {
    const { root, state, approve } = sandbox();
    assert.throws(() => lockPosition("C", "LOCK_C", root), /stage (provisional_top_10|candidate_audit)/);
    approve("C_PROVISIONAL_TOP10", { provisional_top_10: TOP, first_out: "x", external_controls: ["x"] });
    state.pending_reaudit_queue = [{ task: { position: "C" } }];
    fs.writeFileSync(path.join(root, "state/project-state.json"), JSON.stringify(state));
    assert.throws(() => lockPosition("C", "LOCK_C", root));
    fs.writeFileSync(path.join(root, "data/baselines/C.json"), "{}");
    assert.throws(() => lockPosition("C", "LOCK_C", root), /immutable/);
  });
  test("stage output requirements are enforced as validation errors", () => {
    assert.ok(stageOutputErrors({ type: "provisional_top_10", task_id: "C_PROVISIONAL_TOP10" }, { provisional_top_10: TOP.slice(0, 9) }).length >= 3);
    assert.deepEqual(stageOutputErrors({ type: "provisional_top_10", task_id: "X" }, { provisional_top_10: TOP, first_out: "o", external_controls: ["o"] }), []);
    assert.ok(stageOutputErrors({ type: "membership_reopen", task_id: "X" }, { final_top_10: [...TOP.slice(0, 9), "C Player 1"] }).length);
    assert.ok(stageOutputErrors({ type: "pair_audit", task_id: "X" }, {}).length);
    assert.ok(stageOutputErrors({ type: "scarcity_audit", task_id: "X" }, {}).length);
    assert.ok(stageOutputErrors({ type: "positional_cross_audit", task_id: "X" }, {}).length);
    assert.ok(stageOutputErrors({ type: "pair_audit", task_id: "X", position: "C" }, { task_id: "Y", position: "LG", pair_result: 1 }).length === 2);
  });
  test("v1.1.2 order: candidate audit -> background -> rating -> H2H from rating order -> variance -> scarcity -> cross -> lock", () => {
    const { state, opts, approve } = sandbox(); const o = { ...opts, order: "1.1.2" as const }; const I = ids("C");
    const c: any = planNext(state, o); assert.equal(c.stage, "candidate_audit"); assert.equal(c.task.task_id, "C_CANDIDATE_AUDIT"); assert.equal(c.task.candidate_pool.length, 11);
    const set = [...TOP, "C Out"];
    assert.ok(stageOutputErrors(c.task, { contention_set: TOP }).length >= 3, "needs >=11, excluded, missing_top_players");
    assert.deepEqual(stageOutputErrors(c.task, { contention_set: set, excluded: [], missing_top_players: [] }), []);
    assert.ok(stageOutputErrors(c.task, { contention_set: set, excluded: [], missing_top_players: ["Star"] }).some(e => /missing top players/.test(e)));
    approve(I.candidate, { contention_set: set });
    for (let i = 1; i <= 11; i++) { const b: any = planNext(state, o); assert.equal(b.stage, "background_analysis"); assert.deepEqual(b.task.players, [set[i - 1]]); approve(I.background(i), { dossier: {} }); }
    const ovr = [80, 84, 70, 71, 60, 66, 75, 74, 62, 61, 79]; // stricter, stratified; C Out (79) rates into the top 10
    for (let i = 1; i <= 11; i++) { const r: any = planNext(state, o); assert.equal(r.stage, "player_rating"); assert.equal(r.task.madden_reference_policy, "REFERENCE_ONLY_NEVER_EVIDENCE_NEVER_FORMULA_INPUT"); approve(I.rate(i), { proposed_ovr: ovr[i - 1] }); }
    const h: any = planNext(state, o); assert.equal(h.stage, "pair_audits"); assert.equal(h.task.task_id, "C_H2H_01");
    assert.deepEqual(h.task.players, ["C Player 2", "C Player 1"]); assert.equal(h.task.baseline_controls.top_10[2].player, "C Out");
    for (let i = 1; i <= 5; i++) approve(`C_H2H_0${i}`, { pair_result: "ok" });
    const six: any = planNext(state, o); assert.equal(six.task.task_id, "C_H2H_06"); assert.deepEqual(six.task.players, ["C Player 10", "C Player 5"], "rank 10 vs first out");
    approve("C_H2H_06", { pair_result: "ok" });
    const v: any = planNext(state, o); assert.equal(v.stage, "variance_audit"); assert.equal(v.task.task_id, "C_VARIANCE_AUDIT"); assert.equal(v.task.variance_threshold, 10);
    approve(I.variance, { variance_gaps: [], madden_used_as_evidence: false });
    assert.equal(planNext(state, o).stage, "scarcity_audit"); approve(I.scarcity, { scarcity: {} });
    assert.equal(planNext(state, o).stage, "positional_cross_audit"); assert.equal((planNext(state, o) as any).task.league_ceiling_check_required, true); approve(I.cross, { cross_audit_result: "ok", league_ceiling_check: { flagged: [], closest: [] } });
    assert.equal((planNext(state, o).task as any).requires_commissioner_confirmation, "LOCK_C");
  });
  test("v1.1.2 rating output uses the existing structure (ratings by madden-entry-order attributes, trait_confidence, proposed_ovr); Madden reference only", () => {
    const t = { type: "player_rating", task_id: "QB_REAUDIT_RATE_01", position: "QB" };
    const attrs = ratingAttributes("QB"); assert.equal(attrs.length, 19); assert.ok(!attrs.includes("OVR"));
    const ratings = Object.fromEntries(attrs.map(a => [a, 70])); const conf = Object.fromEntries(attrs.map(a => [a, "MEDIUM"])); const sty = { style_profile: "Pocket precision passer, timing and accuracy", style_evidence: ["sourced split"] };
    assert.deepEqual(stageOutputErrors(t, { ratings, trait_confidence: conf, proposed_ovr: 78, ...sty }), []);
    assert.ok(stageOutputErrors(t, { ratings: { THP: 80 }, trait_confidence: { THP: "HIGH" }, proposed_ovr: 78 }).some(e => /ratings\.SAC/.test(e)));
    assert.ok(stageOutputErrors(t, { ratings: { ...ratings, OVR: 90 }, trait_confidence: { ...conf, OVR: "HIGH" }, proposed_ovr: 78 }).some(e => /OVR is not an attribute/.test(e)));
    assert.ok(stageOutputErrors(t, { ratings, trait_confidence: conf }).some(e => /proposed_ovr/.test(e)));
    assert.ok(stageOutputErrors(t, { ratings, trait_confidence: conf, proposed_ovr: 78, madden_reference: { ovr: 90, reference_only: true, used_as_evidence: true } }).some(e => /reference_only/.test(e)));
    assert.deepEqual(stageOutputErrors(t, { ratings, trait_confidence: conf, proposed_ovr: 78, ...sty, madden_reference: { ovr: 90, reference_only: true, used_as_evidence: false } }), []);
  });
  test("v1.1.2 applies to fresh positions and re-audits; in-progress LG keeps the earlier order", () => {
    assert.equal(usesOrderV112(REAL_STATE, "LG"), false); assert.equal(usesOrderV112(REAL_STATE, "C"), true);
    assert.equal(usesOrderV112(REAL_STATE, "QB", { reaudit: { position: "QB", completed_tasks: [] } }), true);
    assert.ok(LEGACY_ORDER_TASK.test("QB_REAUDIT_PAIR_03") && !LEGACY_ORDER_TASK.test("QB_REAUDIT_H2H_03") && !LEGACY_ORDER_TASK.test("QB_REAUDIT_CANDIDATE_AUDIT"));
  });
  test("locked positions (QB..LT) cannot be planned", () => {
    for (const pos of ["QB", "RB", "WR", "TE", "LT"]) assert.throws(() => planNext({ ...REAL_STATE, current_position: pos }), /LOCKED/);
  });
  test("league ceiling check: read-only screen flags comparable outsiders and blocks cross-audit", () => {
    const cfg = ceilingConfig("QB")!; assert.ok(cfg && cfg.metrics.length >= 5);
    for (const p of ["RB", "WR", "LT", "CB", "K"]) assert.ok(ceilingConfig(p), `ceiling config for ${p}`);
    const refs = [{ name: "R10", pff: 80, epa_db: 0.11, cpoe: 0, twp: 3, sack: 6.7, games: 24, db: 800 }, { name: "R11", pff: 76, epa_db: 0.13, cpoe: 0.7, twp: 2.8, sack: 5.5, games: 21, db: 780 }];
    const cands = [{ name: "Hot", pff: 77, epa_db: 0.12, cpoe: 3, twp: 4, sack: 5, games: 11, db: 300 },
      { name: "Small", pff: 90, epa_db: 0.3, cpoe: 5, twp: 1, sack: 3, games: 3, db: 90 },
      { name: "Meh", pff: 60, epa_db: -0.1, cpoe: 1, twp: 2, sack: 7, games: 17, db: 500 }, { name: "R10", pff: 99, db: 900 }];
    const r = evaluateLeagueCeiling("QB", cfg, refs, cands, ["R10", "R11"]);
    assert.deepEqual(r.flagged.map(f => f.name), ["Hot"]); assert.deepEqual(r.closest.map(c => c.name), ["Meh"]); assert.deepEqual(r.rating_changes, []);
    assert.ok(ceilingCheckErrors({}).length && ceilingCheckErrors({ league_ceiling_check: { flagged: [{ name: "Hot" }], closest: [] } }).some(e => /Hot/.test(e)));
    assert.deepEqual(ceilingCheckErrors({ league_ceiling_check: { flagged: [], closest: [] } }), []);
  });
  test("addendum 2026-11-04e: approved tiebreaks order tied players before the contention-order fallback", () => {
    const set = ["A", "Likely", "B", "Strange", "C"]; const o = { A: 90, Likely: 78, B: 78, Strange: 78, C: 70 };
    assert.deepEqual(ratingOrder(set, o), ["A", "Likely", "B", "Strange", "C"], "no tiebreaks: contention order");
    assert.deepEqual(ratingOrder(set, o, [{ winner: "Strange", loser: "Likely" }]), ["A", "B", "Strange", "Likely", "C"], "Strange above Likely; untested B keeps its contention slot first");
    assert.deepEqual(ratingOrder(set, o, [{ winner: "Strange", loser: "B" }, { winner: "B", loser: "Likely" }]), ["A", "Strange", "B", "Likely", "C"], "chained tiebreaks");
    assert.deepEqual(ratingOrder(set, o, [{ winner: "C", loser: "A" }]), ["A", "Likely", "B", "Strange", "C"], "different OVR never moves");
    assert.deepEqual(ratingOrder(set, o, [{ winner: "Strange", loser: "Likely" }, { winner: "Likely", loser: "Strange" }]), ["A", "Likely", "B", "Strange", "C"], "later tiebreak on the same pair overrides");
    assert.deepEqual(ratingOrder(set, o, [{ winner: "Likely", loser: "B" }, { winner: "B", loser: "Strange" }, { winner: "Strange", loser: "Likely" }]), ["A", "Likely", "B", "Strange", "C"], "cycle falls back to contention order");
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tb-")); fs.mkdirSync(path.join(dir, "TE"));
    const rec = (id: string, w: string, l: string, status = "FLAGGED") => fs.writeFileSync(path.join(dir, "TE", `${id}_A1.json`), JSON.stringify({ audit_id: `${id}_A1`, task_id: id, status, pair_result: { winner: w, loser: l } }));
    rec("TE_REAUDIT_TIEBREAK_43", "Strange", "Likely"); rec("TE_REAUDIT_TIEBREAK_44", "B", "Strange");
    const opts = { auditsRoot: dir, reaudit: { position: "TE", completed_tasks: [], approved_audit_ids: ["TE_REAUDIT_TIEBREAK_43_A1"] } } as any;
    assert.deepEqual(approvedTiebreaks("TE", ["TE_REAUDIT_TIEBREAK_43", "TE_REAUDIT_TIEBREAK_44", "TE_REAUDIT_H2H_01"], opts), [{ winner: "Strange", loser: "Likely" }], "only approved tiebreak records count");
  });
}
