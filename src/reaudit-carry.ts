/**
 * Superseding re-audit carry-forward (addendum 2026-11-04d, commissioner t56s525 tooling + t56s532 batch re-locks).
 * Usage: npm run reaudit:carry -- <POS> --by <name> --at <iso> --note "..." --confirm TOP10_REAUDIT_CARRY
 *
 * For a freshly triggered superseding TOP10_REAUDIT item (QUEUED_NOT_STARTED, supersedes_lock_audit_id set, nothing recorded),
 * appends to the NEW item the approved records of the superseded run (the COMPLETED item whose last audit id is that lock):
 * candidate audit, dossiers, ratings (incl. revisions), head-to-heads and tiebreaks. Each carried approval is a new
 * append-only record naming the commissioner, `carried_from` (the superseded lock id) and the original approval.
 * Position-wide stages (variance, scarcity, cross-audit) and the lock are NOT carried: they re-run under the new item with
 * run-scoped inbox files (src/grok-bot-transport.ts runScoped). No file is copied, rewritten or deleted; audit records,
 * baselines, locks and cards are untouched. Guard: carried approvals are checked in scripts/protected-paths-check.mjs.
 */
import fs from "node:fs";
import path from "node:path";
import { ids } from "./stage-engine.js";
import { findReauditItem } from "./reaudit-executor.js";

export const CARRY_RERUN = (pos: string) => { const I = ids(`${pos}_REAUDIT`); return new Set([I.variance, I.scarcity, I.cross, I.lock]); };

export function supersededItem(state: any, pos: string, lockId: string) {
  return (state.pending_reaudit_queue ?? []).find((x: any) => x?.type === "TOP10_REAUDIT" && x.position === pos && x.status === "COMPLETED" && (x.audit_ids ?? []).at(-1) === lockId) ?? null;
}

export function carryForward(pos: string, o: { approved_by: string; approved_at: string; note: string }, root = process.cwd()) {
  if (!o.approved_by || !/^\d{4}-\d\d-\d\dT/.test(o.approved_at ?? "") || !o.note) throw new Error("--by, ISO --at and --note are required.");
  const statePath = path.join(root, "state/project-state.json");
  const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  const { index, item } = findReauditItem(state, pos);
  if (!item) throw new Error(`${pos}: no active TOP10_REAUDIT queue item (trigger first).`);
  if (!item.supersedes_lock_audit_id) throw new Error(`${pos}: active item does not supersede a re-audit lock; nothing to carry.`);
  if (item.status !== "QUEUED_NOT_STARTED" || (item.audit_ids ?? []).length || (item.approvals ?? []).length || (item.completed_tasks ?? []).length)
    throw new Error(`${pos}: carry only into a freshly triggered item (QUEUED_NOT_STARTED, nothing recorded).`);
  const prior = supersededItem(state, pos, item.supersedes_lock_audit_id);
  if (!prior) throw new Error(`${pos}: no COMPLETED item ending in ${item.supersedes_lock_audit_id}.`);
  const rerun = CARRY_RERUN(pos);
  const carried = (prior.approvals ?? []).filter((a: any) => a?.decision === "APPROVED" && !rerun.has(a.task_id)
    && (prior.audit_ids ?? []).includes(a.audit_id) && (prior.completed_tasks ?? []).includes(a.task_id));
  if (!carried.length) throw new Error(`${pos}: superseded run has no approved records to carry.`);
  const uniq = (xs: string[]) => [...new Set(xs)];
  item.status = "IN_PROGRESS"; item.started_at = o.approved_at; item.updated_at = o.approved_at;
  item.audit_ids = uniq(carried.map((a: any) => a.audit_id));
  item.completed_tasks = uniq(carried.map((a: any) => a.task_id));
  item.approvals = carried.map((a: any) => ({ decision: "APPROVED", task_id: a.task_id, audit_id: a.audit_id, ...(a.supersedes ? { supersedes: a.supersedes } : {}),
    approved_by: o.approved_by, approved_at: o.approved_at, note: o.note, carried_from: item.supersedes_lock_audit_id,
    original_approval: { approved_by: a.approved_by, approved_at: a.approved_at } }));
  item.current_stage = "carry_forward"; item.current_task = null; item.awaiting = null;
  item.last_result = { status: "CARRIED_FORWARD", carried_from: item.supersedes_lock_audit_id, carried: item.approvals.length, rerun: [...rerun] };
  state.pending_reaudit_queue[index] = item; fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n");
  return { position: pos, carried_from: item.supersedes_lock_audit_id, carried: item.approvals.length, tasks: item.completed_tasks.length, rerun: [...rerun] };
}

if (process.argv[1] && /reaudit-carry\.[tj]s$/.test(process.argv[1])) {
  const argv = process.argv.slice(2); const opt = (k: string) => { const j = argv.indexOf(k); return j >= 0 ? argv[j + 1] : undefined; };
  if (opt("--confirm") !== "TOP10_REAUDIT_CARRY") { console.error("Refusing: pass --confirm TOP10_REAUDIT_CARRY."); process.exit(2); }
  try { console.log(JSON.stringify(carryForward(String(argv[0]).toUpperCase(), { approved_by: opt("--by")!, approved_at: opt("--at")!, note: opt("--note")! }), null, 2)); }
  catch (e) { console.error(String((e as Error).message)); process.exitCode = 1; }
}
