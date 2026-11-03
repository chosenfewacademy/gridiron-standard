/**
 * Add-only tiebreak head-to-heads (commissioner card t31s1, 2026-11-02): extra pair_audit tasks `<POS>_REAUDIT_TIEBREAK_nn`
 * for players tied on overall whose order the standard v1.1.2 pairs did not test. Same evidence gate, validator and
 * pair_audit stage checks. The record is saved FLAGGED and left pending commissioner review (never auto-approved).
 * Usage: npm run reaudit:tiebreak -- <POS> --task <POS>_REAUDIT_TIEBREAK_nn --confirm TOP10_REAUDIT_TIEBREAK
 *        npm run reaudit:tiebreak -- <POS> --approve <AUDIT_ID> --by <name> --at <iso> [--note ...] --confirm TOP10_REAUDIT_TIEBREAK
 * Input: research-inbox/<POS>/<TASK>/task.json + audit-attempt-1.md. Never touches locks, baselines, cards or pointers.
 */
import fs from "node:fs";
import path from "node:path";
import { stageOutputErrors } from "./stage-engine.js";
import { createResearchAdapter, selectedTransport } from "./adapter-factory.js";
import { withTransportChecks } from "./high-trait-evidence.js";
import { parseAuditJson } from "./audit-parser.js";
import { validateAudit } from "./audit-validator.js";
import { saveAuditRecord } from "./persistence.js";
import { findReauditItem } from "./reaudit-executor.js";

export const TIEBREAK_TASK = /^[A-Z]+_REAUDIT_TIEBREAK_\d\d$/;

function load(root: string, pos: string) {
  const statePath = path.join(root, "state/project-state.json");
  const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  const { index, item } = findReauditItem(state, pos);
  if (!item) throw new Error(`${pos}: no active TOP10_REAUDIT queue item.`);
  return { state, index, item, save: () => { state.pending_reaudit_queue[index] = item; fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n"); } };
}

export async function runTiebreak(pos: string, task_id: string, deps: { research?: any; root?: string } = {}) {
  const root = deps.root ?? process.cwd();
  const { item, save } = load(root, pos);
  if (!TIEBREAK_TASK.test(task_id) || !task_id.startsWith(`${pos}_`)) throw new Error(`${task_id}: not a ${pos} tiebreak task id.`);
  const pendingTb = item.status === "AWAITING_REVIEW_MAJOR" && item.awaiting?.reason === "TIEBREAK_REVIEW";
  if (item.status !== "IN_PROGRESS" && !pendingTb) throw new Error(`${pos}: tiebreaks only while IN_PROGRESS (not ${item.status}).`);
  if ((item.audit_ids ?? []).some((a: string) => a.startsWith(task_id + "_")) || (item.completed_tasks ?? []).includes(task_id)) throw new Error(`${task_id} already recorded.`);
  const dir = path.join(root, "research-inbox", pos, task_id);
  const task = JSON.parse(fs.readFileSync(path.join(dir, "task.json"), "utf8"));
  if (task.task_id !== task_id || task.type !== "pair_audit" || task.players?.length !== 2) throw new Error(`${task_id}: task.json must be a two-player pair_audit.`);
  const text = fs.readFileSync(path.join(dir, "audit-attempt-1.md"), "utf8");
  const cwd = process.cwd();
  try {
    process.chdir(root);
    const evidence = await (deps.research ?? await createResearchAdapter()).gather(task);
    if (!evidence.minimum_evidence_met) throw new Error(`${task_id}: evidence gate failed: ${JSON.stringify(evidence.missing_evidence)}`);
    const parsed: any = parseAuditJson(text);
    parsed.audit_id = `${task_id}_A1`; parsed.task_id = task_id; parsed.task_type = "pair_audit"; parsed.audit_type = "TOP10_REAUDIT";
    const v: any = withTransportChecks(validateAudit(parsed), parsed, evidence, selectedTransport());
    const se = stageOutputErrors(task, parsed);
    if (!v.valid || se.length) throw new Error(`${parsed.audit_id} invalid: ${JSON.stringify([...(v.errors ?? []), ...se])}`);
    parsed.major_flags = [...new Set([...(parsed.major_flags ?? []), ...v.flags, "TIEBREAK_PENDING_COMMISSIONER_REVIEW"])];
    parsed.status = "FLAGGED";
    saveAuditRecord(parsed, text);
    item.audit_ids = [...item.audit_ids, parsed.audit_id];
    // Pending tiebreaks ride on the existing mutable `awaiting` pointer (no new item keys; guard unchanged).
    const pending = [...(pendingTb ? item.awaiting.pending ?? [] : []), { task_id, audit_id: parsed.audit_id }];
    item.status = "AWAITING_REVIEW_MAJOR"; item.awaiting = { reason: "TIEBREAK_REVIEW", ...pending[0], pending };
    item.last_result = { task_id, status: parsed.status, flags: parsed.major_flags };
    item.updated_at = new Date().toISOString(); save();
    return parsed;
  } finally { process.chdir(cwd); }
}

/** Append-only commissioner approval of one pending tiebreak; the awaiting pointer moves to the next pending one. */
export function approveTiebreak(pos: string, a: { audit_id: string; approved_by: string; approved_at: string; note?: string }, root = process.cwd()) {
  const { item, save } = load(root, pos);
  const pend: any[] = item.awaiting?.reason === "TIEBREAK_REVIEW" ? item.awaiting.pending ?? [] : [];
  const p = pend.find((x: any) => x.audit_id === a.audit_id);
  if (!p) throw new Error(`${a.audit_id} is not a pending tiebreak.`);
  if (!a.approved_by || !a.approved_at) throw new Error("approved_by and approved_at are required.");
  item.completed_tasks = [...item.completed_tasks, ...(item.completed_tasks.includes(p.task_id) ? [] : [p.task_id])];
  item.approvals = [...item.approvals, { decision: "APPROVED", task_id: p.task_id, audit_id: p.audit_id, approved_by: a.approved_by, approved_at: a.approved_at, ...(a.note ? { note: a.note } : {}) }];
  const rest = pend.filter((x: any) => x.audit_id !== a.audit_id);
  if (rest.length) item.awaiting = { reason: "TIEBREAK_REVIEW", ...rest[0], pending: rest }; else { item.status = "IN_PROGRESS"; item.awaiting = null; }
  item.updated_at = new Date().toISOString(); save();
  return item;
}

if (process.argv[1] && /tiebreak\.[tj]s$/.test(process.argv[1])) {
  const argv = process.argv.slice(2); const opt = (k: string) => { const j = argv.indexOf(k); return j >= 0 ? argv[j + 1] : undefined; };
  if (opt("--confirm") !== "TOP10_REAUDIT_TIEBREAK") { console.error("Refusing: pass --confirm TOP10_REAUDIT_TIEBREAK."); process.exit(2); }
  const pos = String(argv[0]).toUpperCase();
  if (opt("--approve")) { console.log(JSON.stringify(approveTiebreak(pos, { audit_id: opt("--approve")!, approved_by: opt("--by")!, approved_at: opt("--at")!, note: opt("--note") }), null, 2)); process.exit(0); }
  runTiebreak(pos, opt("--task")!).then(r => console.log(JSON.stringify(r, null, 2))).catch(e => { console.error(String(e?.message ?? e)); process.exitCode = 1; });
}
