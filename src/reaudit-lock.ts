/**
 * TOP10_REAUDIT lock (addendum v1.1.3, commissioner card t31s9). Applies REAUDIT_REPLACE_BASELINE_<POS>:
 *  - writes a NEW baseline file data/baselines/<POS>.reaudit-<YYYYMMDD>.json (add-only; never overwrites),
 *  - keeps the old baseline file untouched and records it in state/locks.json positions.<POS>.history (append-only),
 *  - points positions.<POS>.baseline_file at the new file, writes an add-only lock audit record,
 *  - marks the queue item COMPLETED with the lock audit id.
 * Refuses unless the engine's next stage is the lock and every stage (incl. variance audit) is approved with no pending review.
 * Guard: SIXTH NARROW EXCEPTION in scripts/protected-paths-check.mjs (card t33s4) admits exactly these outputs.
 * Usage: npm run reaudit:lock -- <POS> --confirm REAUDIT_REPLACE_BASELINE_<POS> --by <name> --at <iso> [--dry-run]
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export interface LockInput {
  position: string; confirm: string; approved_by: string; approved_at: string;
  final_order: Array<{ player: string; ovr: number }>; // full contention order, rank 1 first (>= 11)
  scarcity?: unknown; stage_audit_ids: string[]; pending_review?: boolean; next_stage?: string;
}

export function buildLock(inp: LockInput, root = process.cwd()) {
  const pos = inp.position;
  if (inp.confirm !== `REAUDIT_REPLACE_BASELINE_${pos}`) throw new Error(`lock requires --confirm REAUDIT_REPLACE_BASELINE_${pos}`);
  if (inp.next_stage !== "lock") throw new Error(`${pos}: engine next stage is ${inp.next_stage}, not lock`);
  if (inp.pending_review) throw new Error(`${pos}: pending review (tiebreak/variance/revision) — resolve before locking`);
  if (!inp.approved_by || !/^\d{4}-\d\d-\d\dT/.test(inp.approved_at)) throw new Error("--by and ISO --at required");
  if (inp.final_order.length < 11) throw new Error("final order needs top 10 + first out");
  const locksPath = path.join(root, "state/locks.json");
  const locks = JSON.parse(fs.readFileSync(locksPath, "utf8"));
  const cur = locks.positions?.[pos];
  if (!cur || cur.status !== "LOCKED") throw new Error(`${pos}: no LOCKED entry in state/locks.json`);
  const day = inp.approved_at.slice(0, 10).replace(/-/g, "");
  const file = `data/baselines/${pos}.reaudit-${day}.json`;
  if (fs.existsSync(path.join(root, file))) throw new Error(`${file} already exists (add-only)`);
  const old = JSON.parse(fs.readFileSync(path.join(root, cur.baseline_file), "utf8"));
  const top = inp.final_order.slice(0, 10).map((p, i) => ({ rank: i + 1, player: p.player, ovr: p.ovr }));
  const baseline = { ...old, architecture_version: "1.1.3", status: "LOCKED", version: `reaudit-${day}`, top_10: top,
    last_in: { player: top[9].player, ovr: top[9].ovr }, first_out: { player: inp.final_order[10].player, ovr: inp.final_order[10].ovr },
    external_controls: inp.final_order.slice(10).map(p => ({ player: p.player, ovr: p.ovr })), scarcity: inp.scarcity ?? old.scarcity,
    supersedes: { baseline_file: cur.baseline_file, version: old.version }, stage_audit_ids: inp.stage_audit_ids,
    madden_order_verified: false, locked_by: inp.approved_by, locked_at: inp.approved_at };
  const lockId = `${pos}_REAUDIT_LOCK_${day}`;
  const newEntry = { ...cur, baseline_file: file, version: baseline.version, locked_at: inp.approved_at, lock_audit_id: lockId,
    history: [...(cur.history ?? []), { baseline_file: cur.baseline_file, version: old.version, superseded_at: inp.approved_at, superseded_by: lockId }] };
  const record = { audit_id: lockId, task_id: `${pos}_REAUDIT_LOCK`, task_type: "lock", audit_type: "TOP10_REAUDIT", position: pos, status: "APPROVED", confirmation: inp.confirm,
    approved_by: inp.approved_by, created_at: inp.approved_at, new_baseline_file: file, previous_baseline_file: cur.baseline_file };
  return { file, baseline, locksPath, locks: { ...locks, positions: { ...locks.positions, [pos]: newEntry } }, record,
    recordPath: path.join(root, `audits/league/${pos}/${lockId}.json`) };
}

export function applyLock(inp: LockInput, root = process.cwd()) {
  const b = buildLock(inp, root);
  fs.writeFileSync(path.join(root, b.file), JSON.stringify(b.baseline, null, 2) + "\n", { flag: "wx" });
  fs.mkdirSync(path.dirname(b.recordPath), { recursive: true });
  fs.writeFileSync(b.recordPath, JSON.stringify(b.record, null, 2) + "\n", { flag: "wx" });
  fs.writeFileSync(b.locksPath, JSON.stringify(b.locks, null, 2) + "\n");
  const sp = path.join(root, "state/project-state.json");
  const st = JSON.parse(fs.readFileSync(sp, "utf8"));
  const it = (st.pending_reaudit_queue ?? []).find((x: any) => x.position === inp.position && x.status === "IN_PROGRESS");
  if (it) { it.status = "COMPLETED"; it.updated_at = inp.approved_at; it.audit_ids = [...(it.audit_ids ?? []), b.record.audit_id]; it.current_stage = "lock"; fs.writeFileSync(sp, JSON.stringify(st, null, 2) + "\n"); }
  return b;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const a = process.argv.slice(2); const flag = (k: string) => { const i = a.indexOf(k); return i >= 0 ? a[i + 1] : undefined; };
  const pos = a[0];
  const { planNext, approvedOutput } = await import("./stage-engine.js");
  const { findReauditItem } = await import("./reaudit-executor.js");
  const state = JSON.parse(fs.readFileSync("state/project-state.json", "utf8"));
  const { item } = findReauditItem(state, pos);
  if (!item) throw new Error(`${pos}: no active TOP10_REAUDIT item`);
  const plan: any = planNext(state, { reaudit: { position: pos, completed_tasks: item.completed_tasks ?? [], approved_audit_ids: (item.approvals ?? []).map((x: any) => x.audit_id) } });
  const inp: LockInput = { position: pos, confirm: flag("--confirm") ?? "", approved_by: flag("--by") ?? "", approved_at: flag("--at") ?? "",
    final_order: plan.task?.final_order ?? [], next_stage: plan.stage,
    pending_review: item.status !== "IN_PROGRESS" || !!item.awaiting, stage_audit_ids: item.audit_ids ?? [],
    scarcity: approvedOutput(`${pos}_REAUDIT`, `${pos}_REAUDIT_SCARCITY`)?.scarcity };
  const out = a.includes("--dry-run") ? buildLock(inp) : applyLock(inp);
  console.log(JSON.stringify({ dry_run: a.includes("--dry-run"), file: out.file, lock_audit_id: out.record.audit_id, top_10: out.baseline.top_10 }, null, 2));
}
