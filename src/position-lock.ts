/**
 * Commissioner-controlled position lock. Never runs automatically: requires every stage
 * approved, no pending re-audits for the position, no existing baseline/lock, and the
 * explicit confirmation token LOCK_<POS>. Baselines are written once and never overwritten.
 */
import fs from "node:fs";
import path from "node:path";
import { approvedOutput, ids, planNext } from "./stage-engine.js";

export function lockPosition(pos: string, confirm: string | undefined, root = process.cwd()) {
  const r = (p: string) => path.join(root, p);
  const read = (p: string) => JSON.parse(fs.readFileSync(r(p), "utf8"));
  if (confirm !== `LOCK_${pos}`) throw new Error(`Commissioner confirmation required: --confirm LOCK_${pos}`);
  const state = read("state/project-state.json");
  const locks = read("state/locks.json");
  const baselineRel = `data/baselines/${pos}.json`;
  if (state.current_position !== pos || state.positions[pos] !== "IN_PROGRESS") throw new Error(`${pos} is not the in-progress position.`);
  if (fs.existsSync(r(baselineRel)) || locks.positions?.[pos]) throw new Error(`${pos} already has a baseline or lock; immutable.`);
  const opts = { auditsRoot: r("audits/league"), metricsPath: r("config/position-metrics.json") };
  const plan = planNext(state, opts);
  if (plan.stage !== "lock") throw new Error(`${pos} is at stage ${plan.stage}; all stages must be approved before lock.`);
  const pending = (state.pending_reaudit_queue ?? []).filter((q: any) => (q.task?.position ?? q.position) === pos);
  if (pending.length) throw new Error(`${pos} has ${pending.length} pending re-audit item(s).`);

  const I = ids(pos);
  const mem = approvedOutput(pos, I.membership, opts)!;
  const scar = approvedOutput(pos, I.scarcity, opts);
  const cross = approvedOutput(pos, I.cross, opts);
  if (!scar || !cross) throw new Error(`${pos}: scarcity and cross-audit APPROVED records are required.`);
  const final = (plan.task.players as string[]);
  const baseline = {
    position: pos, status: "LOCKED", version: `${pos}-lock-${new Date().toISOString().slice(0, 10)}`,
    architecture_version: state.architecture_version, methodology_version: state.methodology_version,
    top_10: final.map((player, i) => ({ rank: i + 1, player, hard_audit_id: approvedOutput(pos, I.hard(i + 1), opts)?.audit_id ?? null })),
    last_in: final[9], first_out: mem.first_out ?? null, external_controls: mem.external_controls ?? [],
    scarcity: scar.scarcity, cross_audit: { audit_id: cross.audit_id, result: cross.cross_audit_result },
    source_audits: { membership: mem.audit_id, scarcity: scar.audit_id, cross: cross.audit_id },
    mutation_policy: "TOP10_REAUDIT_ONLY"
  };
  fs.writeFileSync(r(baselineRel), JSON.stringify(baseline, null, 2) + "\n", { flag: "wx" });
  locks.positions[pos] = { status: "LOCKED", baseline_file: baselineRel, mutation_permission: "TOP10_REAUDIT_ONLY" };
  fs.writeFileSync(r("state/locks.json"), JSON.stringify(locks, null, 2) + "\n");

  state.positions[pos] = "LOCKED";
  const seq: string[] = read("config/position-sequence.json").sequence;
  const next = seq.find(p => state.positions[p] === "PENDING");
  if (next) {
    state.positions[next] = "IN_PROGRESS";
    state.current_position = next;
    const p = planNext(state, opts);
    state.current_stage = p.stage; state.current_task = p.task;
  } else { state.current_stage = "complete"; state.current_task = {}; }
  fs.writeFileSync(r("state/project-state.json"), JSON.stringify(state, null, 2) + "\n");
  return { locked: pos, baseline: baselineRel, next_position: next ?? null };
}
