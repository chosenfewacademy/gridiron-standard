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
export function stateChangeAllowed(baseText, headText) {
  let a, b;
  try { a = JSON.parse(baseText); b = JSON.parse(headText); } catch { return { ok: false, reason: "unparseable state JSON" }; }
  const rest = o => { const c = { ...o }; delete c.pending_reaudit_queue; delete c.positions; return canon(c); };
  if (rest(a) !== rest(b)) return { ok: false, reason: "state keys other than pending_reaudit_queue/positions changed" };
  const pos = positionsOnlyAddPending(a, b); if (!pos.ok) return pos;
  const queueSame = canon(a.pending_reaudit_queue ?? []) === canon(b.pending_reaudit_queue ?? []);
  if (!queueSame) {
    const q = queueOnlyAppend(JSON.stringify({ ...a, positions: null }), JSON.stringify({ ...b, positions: null }));
    if (!q.ok) return q;
  }
  if (queueSame && pos.added.length === 0) return { ok: false, reason: "no allowed change" };
  return { ok: true };
}

/** allowState(path) => true only when the caller has verified queueOnlyAppend for that exact path. */
export function violations(lines, allowState = () => false) {
  const out = [];
  for (const line of lines.filter(Boolean)) {
    const [status, ...paths] = line.split("\t");
    for (const p of paths) {
      const hit = PROTECTED.find(x => x.re.test(p));
      if (hit && status === "M" && p === QUEUE_EXCEPTION_PATH && allowState(p)) continue;
      if (hit) out.push(`${status} ${p} (${hit.why})`);
      else if (APPEND_ONLY.test(p) && status[0] !== "A") out.push(`${status} ${p} (append-only research history)`);
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
  let allow = () => false;
  if (fileFlag < 0) {
    const mb = execFileSync("git", ["merge-base", base, head], { encoding: "utf8" }).trim();
    const show = ref => execFileSync("git", ["show", `${ref}:${QUEUE_EXCEPTION_PATH}`], { encoding: "utf8" });
    allow = p => { try { const r = stateChangeAllowed(show(mb), show(head)); if (!r.ok) console.error(`state exception not applicable: ${r.reason}`); return r.ok; } catch { return false; } };
  }
  const v = violations(diff, allow);
  if (v.length) { console.error("PROTECTED PATHS CHANGED:\n" + v.join("\n")); process.exit(1); }
  console.log("Protected paths unchanged.");
}
