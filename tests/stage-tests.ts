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
  });
}

import { planNext, generatePairs, stageOutputErrors, ids } from "../src/stage-engine.js";
import { getNextTask } from "../src/state-machine.js";
import { lockPosition } from "../src/position-lock.js";

const REAL_STATE = JSON.parse(fs.readFileSync("state/project-state.json", "utf8"));
const TOP = Array.from({ length: 10 }, (_, i) => `C Player ${i + 1}`);

function sandbox(pos = "C") {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "stage-"));
  for (const d of ["state", "data/baselines", "config", `audits/league/${pos}`]) fs.mkdirSync(path.join(root, d), { recursive: true });
  for (const f of ["state/locks.json", "config/position-sequence.json", "config/position-metrics.json"]) fs.copyFileSync(f, path.join(root, f));
  const state = structuredClone(REAL_STATE);
  state.positions.LG = "LOCKED"; state.positions[pos] = "IN_PROGRESS";
  state.current_position = pos; state.current_stage = "provisional_top_10"; state.completed_tasks = [];
  const save = () => fs.writeFileSync(path.join(root, "state/project-state.json"), JSON.stringify(state));
  save();
  const opts = { auditsRoot: path.join(root, "audits/league"), metricsPath: path.join(root, "config/position-metrics.json") };
  let n = 0;
  const approve = (task_id: string, extra: Record<string, unknown> = {}) => {
    fs.writeFileSync(path.join(opts.auditsRoot, pos, `A${++n}.json`), JSON.stringify({ audit_id: `A${n}`, task_id, status: "APPROVED", position: pos, created_at: `2026-11-01T00:00:${String(n).padStart(2, "0")}Z`, ...extra }));
    state.completed_tasks.push(task_id); save();
  };
  return { root, state, opts, approve };
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
    assert.equal(s2.positions.C, "LOCKED"); assert.equal(s2.current_position, "RG"); assert.equal(s2.current_stage, "provisional_top_10");
    assert.throws(() => planNext({ ...s2, current_position: "C" }, opts), /LOCKED/);
  });
  test("lock refuses early stages, pending re-audits, and existing baselines", () => {
    const { root, state, approve } = sandbox();
    assert.throws(() => lockPosition("C", "LOCK_C", root), /stage provisional_top_10/);
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
  test("locked positions (QB..LT) cannot be planned", () => {
    for (const pos of ["QB", "RB", "WR", "TE", "LT"]) assert.throws(() => planNext({ ...REAL_STATE, current_position: pos }), /LOCKED/);
  });
}
