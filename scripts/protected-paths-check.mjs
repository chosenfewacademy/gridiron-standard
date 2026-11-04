#!/usr/bin/env node
// Fails if a change set touches protected project state. Usage: node scripts/protected-paths-check.mjs <base-ref> [head-ref]
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export const PROTECTED = [
  { re: /^state\//, why: "project state, locks, checkpoints, thread" },
  { re: /^data\/baselines\//, why: "locked positional baselines" },
  { re: /^data\/players\/[^/]+\//, why: "approved player cards / history" },
  { re: /^data\/teams\//, why: "team-room state" },
  { re: /^audits\//, why: "immutable audit history" },
  { re: /^exports\/cards\//, why: "approved card exports" },
  { re: /^config\/madden-entry-order\.json$/, why: "madden_order_verified must stay until verified" },
  { re: /^bootstrap\//, why: "baseline import record" }
];
// Existing evidence logs may receive NEW files (propose-research-artifact) but never edits/deletes.
const APPEND_ONLY = /^logs\/qb-reconstruction\//;
// Addendum 2026-11-04d: authored audit texts (audit-attempt-*.md, revision-A*.md) and every run-scoped inbox file
// (*-R<n>.json / *-R<n>-<k>.md) are history: new files only, never edited, deleted or renamed. A superseding run writes
// run-scoped names instead of reusing the earlier run's files.
export const INBOX_APPEND_ONLY = /^research-inbox\/.+\/(audit-attempt-[^/]+\.md|revision-A\d+\.md|[^/]+-R\d+(-\d+)?\.(json|md))$/;

// NARROW EXCEPTION (commissioner-approved 2026-11-01): state/project-state.json may change only by APPENDING
// TOP10_REAUDIT items with status QUEUED_NOT_STARTED to pending_reaudit_queue. Every other key must be identical
// and existing queue items must be unchanged and in order. Anything else in state/ still fails.
export const QUEUE_EXCEPTION_PATH = "state/project-state.json";
const canon = v => JSON.stringify(v, (_k, x) => (x && typeof x === "object" && !Array.isArray(x) ? Object.fromEntries(Object.keys(x).sort().map(k => [k, x[k]])) : x));
export function queueOnlyAppend(baseText, headText) {
  let a, b;
  try { a = JSON.parse(baseText); b = JSON.parse(headText); } catch { return { ok: false, reason: "unparseable state JSON" }; }
  const qa = a.pending_reaudit_queue ?? [], qb = b.pending_reaudit_queue;
  if (!Array.isArray(qa) || !Array.isArray(qb)) return { ok: false, reason: "pending_reaudit_queue must be an array" };
  const rest = o => { const c = { ...o }; delete c.pending_reaudit_queue; return canon(c); };
  if (rest(a) !== rest(b)) return { ok: false, reason: "state keys other than pending_reaudit_queue changed" };
  if (qb.length <= qa.length) return { ok: false, reason: "queue did not grow by append" };
  for (let i = 0; i < qa.length; i++) if (canon(qa[i]) !== canon(qb[i])) return { ok: false, reason: `existing queue item ${i} changed` };
  for (const it of qb.slice(qa.length))
    if (!it || it.type !== "TOP10_REAUDIT" || it.status !== "QUEUED_NOT_STARTED" || typeof it.position !== "string")
      return { ok: false, reason: "appended items must be TOP10_REAUDIT with status QUEUED_NOT_STARTED" };
  return { ok: true };
}

// SECOND NARROW EXCEPTION (commissioner-approved 2026-11-02, option a): state/project-state.json may also change by
// ADDING new position keys to `positions` with value "PENDING". Existing position entries and every other key
// (locks, pointers, versions...) must be identical. May combine with a valid queue append; each rule still holds.
export function positionsOnlyAddPending(a, b) {
  const pa = a.positions ?? {}, pb = b.positions;
  if (!pb || typeof pb !== "object" || Array.isArray(pb)) return { ok: false, reason: "positions must be an object" };
  for (const k of Object.keys(pa)) if (!(k in pb) || canon(pa[k]) !== canon(pb[k])) return { ok: false, reason: `existing position ${k} changed or removed` };
  const added = Object.keys(pb).filter(k => !(k in pa));
  for (const k of added) if (pb[k] !== "PENDING") return { ok: false, reason: `new position ${k} must be PENDING` };
  return { ok: true, added };
}
// THIRD NARROW EXCEPTION (commissioner-approved 2026-11-02): an EXISTING TOP10_REAUDIT queue item may record re-audit
// progress. Identity fields stay identical; only REAUDIT_MUTABLE keys may change; status moves only along
// REAUDIT_TRANSITIONS (never to COMPLETED — completion changes baselines and needs commissioner approval);
// completed_tasks/audit_ids may only grow by append. Locks, positions, current_* pointers etc. remain covered elsewhere.
export const REAUDIT_MUTABLE = ["status", "started_at", "updated_at", "current_stage", "current_task", "completed_tasks", "audit_ids", "last_result", "awaiting", "approvals"];
export const REAUDIT_TRANSITIONS = { QUEUED_NOT_STARTED: ["QUEUED_NOT_STARTED", "IN_PROGRESS", "AWAITING_REVIEW_MAJOR"], IN_PROGRESS: ["IN_PROGRESS", "AWAITING_REVIEW_MAJOR"], AWAITING_REVIEW_MAJOR: ["AWAITING_REVIEW_MAJOR", "IN_PROGRESS"] };
const appendOnly = (x, y) => { const a = x ?? [], b = y ?? []; return Array.isArray(b) && Array.isArray(a) && b.length >= a.length && a.every((v, i) => canon(v) === canon(b[i])); };
export function reauditItemUpdate(x, y) {
  if (canon(x) === canon(y)) return { ok: true, changed: false };
  if (!x || !y || x.type !== "TOP10_REAUDIT" || y.type !== "TOP10_REAUDIT") return { ok: false, reason: "only TOP10_REAUDIT queue items may be updated" };
  const strip = o => { const c = { ...o }; for (const k of REAUDIT_MUTABLE) delete c[k]; return canon(c); };
  if (strip(x) !== strip(y)) return { ok: false, reason: "re-audit item identity fields changed" };
  const lockDone = lockCompletionOk(x, y);
  if (y.status === "COMPLETED" && !lockDone.ok) return { ok: false, reason: lockDone.reason };
  if (!lockDone.ok && !(REAUDIT_TRANSITIONS[x.status] ?? []).includes(y.status)) return { ok: false, reason: `status transition ${x.status} -> ${y.status} not allowed` };
  if (!appendOnly(x.completed_tasks, y.completed_tasks) || !appendOnly(x.audit_ids, y.audit_ids)) return { ok: false, reason: "completed_tasks/audit_ids are append-only" };
  if (x.started_at && x.started_at !== y.started_at) return { ok: false, reason: "started_at is immutable once set" };
  // FIFTH NARROW EXCEPTION (commissioner-approved 2026-11-02 1:36 PM ET): commissioner approvals of re-audit stages are
  // append-only records on the item; each must reference an audit already in audit_ids and its task must be completed.
  if (!appendOnly(x.approvals, y.approvals)) return { ok: false, reason: "approvals are append-only" };
  for (const ap of (y.approvals ?? []).slice((x.approvals ?? []).length)) {
    if (!ap || ap.decision !== "APPROVED" || typeof ap.approved_by !== "string" || !ap.approved_by || typeof ap.approved_at !== "string" ||
      !(y.audit_ids ?? []).includes(ap.audit_id) || !(y.completed_tasks ?? []).includes(ap.task_id))
      return { ok: false, reason: "approval must be APPROVED by a named commissioner, reference a recorded audit_id and a completed task" };
  }
  if (x.status === "AWAITING_REVIEW_MAJOR" && y.status === "IN_PROGRESS" && (y.approvals ?? []).length <= (x.approvals ?? []).length)
    return { ok: false, reason: "leaving AWAITING_REVIEW_MAJOR requires a new commissioner approval record" };
  return { ok: true, changed: true };
}
// SIXTH NARROW EXCEPTION (commissioner-approved 2026-11-02, card t33s4): the re-audit LOCK may (1) move the queue item
// IN_PROGRESS -> COMPLETED when its last appended audit id is the lock record <POS>_REAUDIT_LOCK_<YYYYMMDD> and
// current_stage is "lock"; (2) ADD data/baselines/<POS>.reaudit-<YYYYMMDD>.json; (3) in state/locks.json change only that
// position's baseline_file pointer (to the new file) + version/locked_at/lock_audit_id and APPEND one history entry
// naming the previous baseline file. Existing baseline files are never modified or deleted.
// Addendum 2026-11-04c (t56s525): optional same-day suffix b..z on the baseline file, B..Z on the lock id (second+ lock that day).
export const LOCK_BASELINE_RE = /^data\/baselines\/([A-Z]{1,5})\.reaudit-(\d{8})([b-z]?)\.json$/;
const lockIdFor = (k, m) => `${k}_REAUDIT_LOCK_${m[2]}${m[3].toUpperCase()}`;
export const LOCKS_PATH = "state/locks.json";
export function lockCompletionOk(x, y) {
  if (x?.status !== "IN_PROGRESS" || y?.status !== "COMPLETED") return { ok: false, reason: "COMPLETED only from IN_PROGRESS via the re-audit lock" };
  const last = (y.audit_ids ?? []).at(-1);
  if ((y.audit_ids ?? []).length !== (x.audit_ids ?? []).length + 1 || !new RegExp(`^${x.position}_REAUDIT_LOCK_\\d{8}[B-Z]?$`).test(String(last)) || y.current_stage !== "lock")
    return { ok: false, reason: "COMPLETED requires exactly one appended lock audit id <POS>_REAUDIT_LOCK_<YYYYMMDD> and current_stage lock" };
  return { ok: true };
}
export function locksChangeAllowed(baseText, headText) {
  let a, b; try { a = JSON.parse(baseText); b = JSON.parse(headText); } catch { return { ok: false, reason: "unparseable locks JSON" }; }
  const rest = o => { const c = { ...o }; delete c.positions; return canon(c); };
  if (rest(a) !== rest(b)) return { ok: false, reason: "locks keys other than positions changed" };
  const pa = a.positions ?? {}, pb = b.positions ?? {};
  // SEVENTH NARROW EXCEPTION (commissioner t50s441, 2026-11-04): the FIRST re-audit lock of a never-locked position may ADD
  // exactly one positions key whose entry is a first_lock with empty history pointing at its new dated baseline.
  const added = Object.keys(pb).filter(k => !(k in pa));
  if (added.length === 1 && Object.keys(pa).every(k => canon(pa[k]) === canon(pb[k]))) {
    const k = added[0], n = pb[k], m = LOCK_BASELINE_RE.exec(n?.baseline_file ?? "");
    if (!m || m[1] !== k || n.status !== "LOCKED" || n.first_lock !== true || (n.history ?? []).length || n.lock_audit_id !== `${k}_REAUDIT_LOCK_${m[2]}` || m[3])
      return { ok: false, reason: "first lock entry must be LOCKED, first_lock, empty history, dated baseline + matching lock_audit_id" };
    return { ok: true, position: k, baseline_file: n.baseline_file, first_lock: true };
  }
  if (canon(Object.keys(pa).sort()) !== canon(Object.keys(pb).sort())) return { ok: false, reason: "locks positions added/removed" };
  const changed = Object.keys(pa).filter(k => canon(pa[k]) !== canon(pb[k]));
  if (changed.length !== 1) return { ok: false, reason: "exactly one position lock may change" };
  const k = changed[0], o = pa[k], n = pb[k], m = LOCK_BASELINE_RE.exec(n.baseline_file ?? "");
  if (!m || m[1] !== k) return { ok: false, reason: `baseline_file must point at data/baselines/${k}.reaudit-<YYYYMMDD>.json` };
  if (n.status !== "LOCKED" || n.mutation_permission !== o.mutation_permission) return { ok: false, reason: "status/mutation_permission must stay" };
  if (n.lock_audit_id !== lockIdFor(k, m)) return { ok: false, reason: "lock_audit_id must match the new baseline date" };
  const strip = e => { const c = { ...e }; for (const x of ["baseline_file", "version", "locked_at", "lock_audit_id", "history"]) delete c[x]; return canon(c); };
  if (strip(o) !== strip(n)) return { ok: false, reason: "only baseline_file/version/locked_at/lock_audit_id/history may change" };
  const h = n.history ?? [];
  if (!appendOnly(o.history, h) || h.length !== (o.history ?? []).length + 1 || h.at(-1)?.baseline_file !== o.baseline_file)
    return { ok: false, reason: "history must append exactly one entry naming the previous baseline_file" };
  return { ok: true, position: k, baseline_file: n.baseline_file };
}
export function lockBaselineAddAllowed(status, p, jsonText, locksHeadText) {
  const m = LOCK_BASELINE_RE.exec(p); if (status !== "A" || !m) return false;
  try {
    const j = JSON.parse(jsonText), l = JSON.parse(locksHeadText).positions?.[m[1]];
    return j.status === "LOCKED" && j.position === m[1] && j.madden_order_verified === false && l?.baseline_file === p
      && (!!j.supersedes?.baseline_file || (j.first_lock === true && j.supersedes === null && l?.first_lock === true));
  } catch { return false; }
}

// EIGHTH NARROW EXCEPTION (addendum 2026-11-04d, commissioner t56s525/t56s532): reaudit:carry may append approvals with
// `carried_from` to a superseding item. Each must name the item's supersedes_lock_audit_id, and re-record an APPROVED approval
// (same task_id + audit_id) of the COMPLETED item of that position whose last audit id is that lock. Variance, scarcity,
// cross-audit and lock tasks are never carried (they re-run under the new item).
export const CARRY_RERUN_RE = /_REAUDIT_(VARIANCE_AUDIT|SCARCITY|CROSS_AUDIT|LOCK)$/;
export function carriedApprovalsOk(qa = [], qb = []) {
  for (let i = 0; i < qb.length; i++) {
    const y = qb[i], old = (qa[i]?.approvals ?? []).length;
    for (const ap of (y?.approvals ?? []).slice(old)) {
      if (!ap || ap.carried_from === undefined) continue;
      if (ap.carried_from !== y.supersedes_lock_audit_id) return { ok: false, reason: `queue item ${i}: carried_from must equal supersedes_lock_audit_id` };
      if (CARRY_RERUN_RE.test(String(ap.task_id))) return { ok: false, reason: `queue item ${i}: ${ap.task_id} must re-run, not be carried` };
      const prior = qb.find(x => x?.type === "TOP10_REAUDIT" && x.position === y.position && x.status === "COMPLETED" && (x.audit_ids ?? []).at(-1) === ap.carried_from);
      if (!prior || !(prior.approvals ?? []).some(p => p?.decision === "APPROVED" && p.task_id === ap.task_id && p.audit_id === ap.audit_id))
        return { ok: false, reason: `queue item ${i}: carried ${ap.audit_id} is not an approved record of ${ap.carried_from}` };
    }
  }
  return { ok: true };
}
export function queueUpdateAllowed(qa = [], qb) {
  if (!Array.isArray(qa) || !Array.isArray(qb)) return { ok: false, reason: "pending_reaudit_queue must be an array" };
  if (qb.length < qa.length) return { ok: false, reason: "queue items may not be removed" };
  for (let i = 0; i < qa.length; i++) { const r = reauditItemUpdate(qa[i], qb[i]); if (!r.ok) return { ok: false, reason: `queue item ${i}: ${r.reason}` }; }
  const c = carriedApprovalsOk(qa, qb); if (!c.ok) return c;
  for (const it of qb.slice(qa.length))
    if (!it || it.type !== "TOP10_REAUDIT" || it.status !== "QUEUED_NOT_STARTED" || typeof it.position !== "string")
      return { ok: false, reason: "appended items must be TOP10_REAUDIT with status QUEUED_NOT_STARTED" };
  return { ok: true };
}
export function stateChangeAllowed(baseText, headText) {
  let a, b;
  try { a = JSON.parse(baseText); b = JSON.parse(headText); } catch { return { ok: false, reason: "unparseable state JSON" }; }
  const rest = o => { const c = { ...o }; delete c.pending_reaudit_queue; delete c.positions; return canon(c); };
  if (rest(a) !== rest(b)) return { ok: false, reason: "state keys other than pending_reaudit_queue/positions changed" };
  const pos = positionsOnlyAddPending(a, b); if (!pos.ok) return pos;
  const queueSame = canon(a.pending_reaudit_queue ?? []) === canon(b.pending_reaudit_queue ?? []);
  if (!queueSame) {
    const q = queueUpdateAllowed(a.pending_reaudit_queue ?? [], b.pending_reaudit_queue);
    if (!q.ok) return q;
  }
  if (queueSame && pos.added.length === 0) return { ok: false, reason: "no allowed change" };
  return { ok: true };
}

// FOURTH NARROW EXCEPTION (commissioner-approved 2026-11-02 1:36 PM ET): NEW audit record files for TOP10_REAUDIT
// tasks may be added under audits/league/<POS>/<POS>_REAUDIT_*.{json,md}. Status must be "A" (added); existing audit
// files can never be modified, renamed or deleted. JSON records must declare audit_type TOP10_REAUDIT (checked by allowAudit).
export const REAUDIT_AUDIT_RE = /^audits\/league\/([A-Z]{1,5})\/\1_REAUDIT_[A-Z0-9_]+\.(json|md)$/;
export function reauditAuditAddAllowed(status, p, jsonText) {
  if (status !== "A" || !REAUDIT_AUDIT_RE.test(p)) return false;
  if (p.endsWith(".json")) { try { return JSON.parse(jsonText).audit_type === "TOP10_REAUDIT"; } catch { return false; } }
  return true;
}

/** allowState(path) => true only when the caller has verified queueOnlyAppend for that exact path. */
export function violations(lines, allowState = () => false, allowAudit = () => false, allowLocks = () => false, allowBaseline = () => false) {
  const out = [];
  for (const line of lines.filter(Boolean)) {
    const [status, ...paths] = line.split("\t");
    for (const p of paths) {
      const hit = PROTECTED.find(x => x.re.test(p));
      if (hit && status === "M" && p === QUEUE_EXCEPTION_PATH && allowState(p)) continue;
      if (hit && status === "A" && REAUDIT_AUDIT_RE.test(p) && allowAudit(status, p)) continue;
      if (hit && status === "M" && p === LOCKS_PATH && allowLocks(p)) continue;
      if (hit && status === "A" && LOCK_BASELINE_RE.test(p) && allowBaseline(status, p)) continue;
      if (hit) out.push(`${status} ${p} (${hit.why})`);
      else if (APPEND_ONLY.test(p) && status[0] !== "A") out.push(`${status} ${p} (append-only research history)`);
      else if (INBOX_APPEND_ONLY.test(p) && status[0] !== "A") out.push(`${status} ${p} (append-only inbox audit text / run-scoped file)`);
    }
  }
  return out;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const fileFlag = process.argv.indexOf("--name-status-file");
  const base = process.argv[2] ?? "origin/main", head = process.argv[3] ?? "HEAD";
  const diff = (fileFlag >= 0
    ? (await import("node:fs")).readFileSync(process.argv[fileFlag + 1], "utf8")
    : execFileSync("git", ["diff", "--name-status", `${base}...${head}`], { encoding: "utf8" })).split("\n");
  let allow = () => false, allowAudit = () => false, allowLocks = () => false, allowBaseline = () => false;
  if (fileFlag < 0) {
    const mb = execFileSync("git", ["merge-base", base, head], { encoding: "utf8" }).trim();
    const show = ref => execFileSync("git", ["show", `${ref}:${QUEUE_EXCEPTION_PATH}`], { encoding: "utf8" });
    allowAudit = (st, p) => { try { return reauditAuditAddAllowed(st, p, p.endsWith(".json") ? execFileSync("git", ["show", `${head}:${p}`], { encoding: "utf8" }) : ""); } catch { return false; } };
    const showP = (ref, p) => execFileSync("git", ["show", `${ref}:${p}`], { encoding: "utf8" });
    allowLocks = () => { try { const r = locksChangeAllowed(showP(mb, LOCKS_PATH), showP(head, LOCKS_PATH)); if (!r.ok) console.error(`locks exception not applicable: ${r.reason}`); return r.ok; } catch { return false; } };
    allowBaseline = (st, p) => { try { return lockBaselineAddAllowed(st, p, showP(head, p), showP(head, LOCKS_PATH)); } catch { return false; } };
    allow = p => { try { const r = stateChangeAllowed(show(mb), show(head)); if (!r.ok) console.error(`state exception not applicable: ${r.reason}`); return r.ok; } catch { return false; } };
  }
  const v = violations(diff, allow, allowAudit, allowLocks, allowBaseline);
  if (v.length) { console.error("PROTECTED PATHS CHANGED:\n" + v.join("\n")); process.exit(1); }
  console.log("Protected paths unchanged.");
}
