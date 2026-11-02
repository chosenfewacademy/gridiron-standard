/**
 * Queue-driven TOP10_REAUDIT runner for a LOCKED (or IN_PROGRESS) position (commissioner-approved 2026-11-02).
 * Usage: npm run reaudit:run -- <POS> --confirm TOP10_REAUDIT
 *
 * Runs ONE stage step through the unchanged pipeline (research gate, analyst, validator, 3-revision ceiling,
 * high-trait tiers). It records progress ONLY on the position's TOP10_REAUDIT queue item. It never changes
 * current_position / current_stage / current_task / completed_tasks of the main run, positions, locks,
 * baselines or cards. Membership-changing outputs (provisional_top_10, membership_reopen) never auto-approve:
 * they stop at AWAITING_REVIEW_MAJOR. The final stage never replaces the baseline; that needs the commissioner.
 */
import fs from "node:fs";
import path from "node:path";
import { planNext, stageOutputErrors, LEGACY_ORDER_TASK } from "./stage-engine.js";
import { createAuditAdapter, createResearchAdapter, selectedTransport } from "./adapter-factory.js";
import { withTransportChecks } from "./high-trait-evidence.js";
import { parseAuditJson } from "./audit-parser.js";
import { validateAudit } from "./audit-validator.js";
import { saveAuditRecord } from "./persistence.js";

const MAX_REVISIONS = Number(process.env.GRIDIRON_MAX_REVISIONS ?? "3");
// Standing rule: no approvals without the commissioner; every v1.1.2 player stage (incl. background dossiers) is reviewed.
const ALWAYS_REVIEW = new Set(["provisional_top_10", "membership_reopen", "positional_cross_audit", "candidate_audit", "background_analysis", "player_rating"]);

export function findReauditItem(state: any, pos: string) {
  const q: any[] = state.pending_reaudit_queue ?? [];
  const i = q.findIndex(x => x?.type === "TOP10_REAUDIT" && x.position === pos && ["QUEUED_NOT_STARTED", "IN_PROGRESS", "AWAITING_REVIEW_MAJOR"].includes(x.status));
  return { index: i, item: i >= 0 ? q[i] : null };
}

export function lockedBaselineControls(pos: string, root = process.cwd()) {
  const f = path.join(root, "data/baselines", `${pos}.json`);
  if (!fs.existsSync(f)) return undefined;
  const b = JSON.parse(fs.readFileSync(f, "utf8"));
  return { top_10: (b.top_10 ?? []).map((x: any) => ({ rank: x.rank, player: x.player })), external_controls: b.external_controls ?? [] };
}

export function planReaudit(state: any, pos: string, root = process.cwd()) {
  const { item } = findReauditItem(state, pos);
  if (!item) throw new Error(`${pos}: no active TOP10_REAUDIT queue item (trigger with npm run reaudit:trigger).`);
  return planNext(state, { root, auditsRoot: path.join(root, "audits/league"), metricsPath: path.join(root, "config/position-metrics.json"),
    reaudit: { position: pos, completed_tasks: item.completed_tasks ?? [], baseline_controls: lockedBaselineControls(pos, root),
      approved_audit_ids: (item.approvals ?? []).filter((a: any) => a.decision === "APPROVED").map((a: any) => a.audit_id) } });
}

/** Records a commissioner approval of the awaiting re-audit stage (append-only). Never touches locks/baselines/cards/pointers. */
export function approveReauditStage(pos: string, a: { audit_id: string; approved_by: string; approved_at: string; note?: string }, root = process.cwd()) {
  const statePath = path.join(root, "state/project-state.json");
  const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  const { index, item } = findReauditItem(state, pos);
  if (!item || item.status !== "AWAITING_REVIEW_MAJOR") throw new Error(`${pos}: no re-audit stage is awaiting approval.`);
  if (item.awaiting?.audit_id !== a.audit_id) throw new Error(`${pos}: awaiting audit is ${item.awaiting?.audit_id}, not ${a.audit_id}.`);
  if (!a.approved_by) throw new Error("approved_by is required.");
  const task_id = item.awaiting.task_id;
  item.completed_tasks = [...(item.completed_tasks ?? []), ...((item.completed_tasks ?? []).includes(task_id) ? [] : [task_id])];
  item.approvals = [...(item.approvals ?? []), { decision: "APPROVED", task_id, audit_id: a.audit_id, approved_by: a.approved_by, approved_at: a.approved_at, ...(a.note ? { note: a.note } : {}) }];
  item.status = "IN_PROGRESS"; item.awaiting = null; item.updated_at = new Date().toISOString();
  state.pending_reaudit_queue[index] = item; fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n");
  return item;
}

export interface ReauditDeps { research?: { gather(t: any): Promise<any> }; analyst?: { runAudit(i: any): Promise<{ text: string }> }; root?: string; now?: () => string }

export async function executeReauditStep(pos: string, deps: ReauditDeps = {}): Promise<Record<string, unknown>> {
  const root = deps.root ?? process.cwd(); const now = deps.now ?? (() => new Date().toISOString());
  const statePath = path.join(root, "state/project-state.json");
  const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  const { index, item } = findReauditItem(state, pos);
  if (!item) throw new Error(`${pos}: no active TOP10_REAUDIT queue item.`);
  const save = () => { state.pending_reaudit_queue[index] = item; fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n"); };
  // Addendum v1.1.2 restart: a checkpoint left open under the earlier order is superseded (its records stay as
  // immutable history). The item stays AWAITING_REVIEW_MAJOR; only the awaiting pointer moves to the new-order stage.
  let restart = false;
  if (item.status === "AWAITING_REVIEW_MAJOR" && LEGACY_ORDER_TASK.test(String(item.awaiting?.task_id ?? ""))) {
    restart = true;
    item.last_result = { restart: "ADDENDUM_V1_1_2", superseded_checkpoint: item.awaiting, earlier_order_audit_ids: [...(item.audit_ids ?? [])] };
  }
  if (item.status === "AWAITING_REVIEW_MAJOR" && !restart)
    return { status: "AWAITING_REVIEW_MAJOR", position: pos, awaiting: item.awaiting, instruction: "Commissioner REVIEW_MAJOR approval required before the re-audit continues." };

  const plan = planReaudit(state, pos, root);
  const task = plan.task as Record<string, any>;
  if (item.status === "QUEUED_NOT_STARTED") { item.status = "IN_PROGRESS"; item.started_at = now(); item.completed_tasks = item.completed_tasks ?? []; item.audit_ids = item.audit_ids ?? []; }
  item.current_stage = plan.stage; item.current_task = task.task_id; item.updated_at = now();
  if (restart) { item.awaiting = { reason: "ADDENDUM_V1_1_2_RESTART_IN_PROGRESS", task_id: task.task_id }; (task as any).earlier_order_inputs = item.last_result.earlier_order_audit_ids; }
  if (task.type === "lock") {
    item.status = "AWAITING_REVIEW_MAJOR"; item.awaiting = { reason: "REAUDIT_COMPLETE_BASELINE_REPLACEMENT_REQUIRES_COMMISSIONER", task_id: task.task_id };
    save(); return { status: "AWAITING_REVIEW_MAJOR", task };
  }
  const cwd = process.cwd();
  try {
    process.chdir(root);
    const research = deps.research ?? await createResearchAdapter();
    const evidence = await research.gather(task);
    if (!evidence.minimum_evidence_met) {
      const rec = { audit_id: `${task.task_id}_INSUFFICIENT_${Date.now()}`, task_id: task.task_id, audit_type: "TOP10_REAUDIT", status: "INSUFFICIENT_EVIDENCE",
        player_id: "N/A", position: pos, confidence: "LOW", methodology_version: state.methodology_version, created_at: now(), missing_evidence: evidence.missing_evidence, sources: evidence.sources };
      saveAuditRecord(rec as any, "```json\n" + JSON.stringify(rec, null, 2) + "\n```");
      item.audit_ids.push(rec.audit_id); item.last_result = { ...(restart ? item.last_result : {}), task_id: task.task_id, status: rec.status, missing_evidence: evidence.missing_evidence };
      save(); return rec;
    }
    const analyst = deps.analyst ?? await createAuditAdapter();
    let feedback: string[] = []; let parsed: any = null; let validation: any = null; let text = "";
    for (let attempt = 1; attempt <= MAX_REVISIONS; attempt++) {
      text = (await analyst.runAudit({ task, evidence, state, locks: JSON.parse(fs.readFileSync("state/locks.json", "utf8")), revision_feedback: feedback })).text;
      parsed = parseAuditJson(text); parsed.task_id ??= task.task_id; parsed.task_type ??= task.type; parsed.audit_type = "TOP10_REAUDIT";
      validation = withTransportChecks(validateAudit(parsed), parsed, evidence, selectedTransport());
      const se = stageOutputErrors(task, parsed);
      if (se.length) validation = { ...validation, valid: false, errors: [...(validation.errors ?? []), ...se] };
      if (validation.valid) break;
      feedback = validation.errors;
    }
    if (!validation.valid) {
      parsed.status = "FLAGGED"; parsed.major_flags = [...new Set([...(parsed.major_flags ?? []), "RE-AUDIT REQUIRED"])];
    } else {
      parsed.major_flags = [...new Set([...(parsed.major_flags ?? []), ...validation.flags])];
      const auto = validation.auto_approve && !ALWAYS_REVIEW.has(task.type);
      parsed.status = auto ? "APPROVED" : (parsed.major_flags.length || ALWAYS_REVIEW.has(task.type) ? "FLAGGED" : "VALIDATED");
    }
    saveAuditRecord(parsed, text);
    item.audit_ids.push(parsed.audit_id);
    item.last_result = { ...(restart ? item.last_result : {}), task_id: task.task_id, status: parsed.status, errors: validation.valid ? [] : validation.errors, flags: parsed.major_flags };
    if (parsed.status === "APPROVED" && !restart) item.completed_tasks.push(task.task_id);
    else { item.status = "AWAITING_REVIEW_MAJOR"; item.awaiting = { reason: validation.valid ? "REVIEW_MAJOR" : "VALIDATION_FAILED_AFTER_3_ATTEMPTS", task_id: task.task_id, audit_id: parsed.audit_id }; }
    item.updated_at = now();
    save(); return parsed;
  } finally { process.chdir(cwd); }
}

if (process.argv[1] && /reaudit-executor\.[tj]s$/.test(process.argv[1])) {
  const argv = process.argv.slice(2); const i = argv.indexOf("--confirm");
  const opt = (k: string) => { const j = argv.indexOf(k); return j >= 0 ? argv[j + 1] : undefined; };
  if (argv.includes("--approve")) {
    if (argv[i + 1] !== "TOP10_REAUDIT_APPROVE") { console.error("Refusing: pass --confirm TOP10_REAUDIT_APPROVE."); process.exit(2); }
    console.log(JSON.stringify(approveReauditStage(String(argv[0]).toUpperCase(), { audit_id: opt("--approve")!, approved_by: opt("--by")!, approved_at: opt("--at")!, note: opt("--note") }), null, 2));
    process.exit(0);
  }
  if (argv[i + 1] !== "TOP10_REAUDIT") { console.error("Refusing: pass --confirm TOP10_REAUDIT."); process.exit(2); }
  const pos = String(argv[0] ?? "").toUpperCase();
  executeReauditStep(pos).then(r => console.log(JSON.stringify(r, null, 2))).catch(e => { console.error(String(e?.message ?? e)); process.exitCode = 1; });
}
