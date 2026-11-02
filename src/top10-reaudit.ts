// Commissioner TOP10_REAUDIT trigger: npm run reaudit:trigger -- <POS[,POS...]> --by "<name>" --confirm TOP10_REAUDIT
// Queues a re-audit request through the state path (state.pending_reaudit_queue via queueReaudit). It does NOT start an audit,
// call research, or modify baselines, locks, cards, audit history or lock pointers. Requires an APPROVED re-audit pool.
import fs from "node:fs";
import path from "node:path";
import { requireApprovedReauditPool } from "./coverage-gate.js";
import { queueReaudit } from "./persistence.js";

export function triggerTop10Reaudit(pos: string, by: string, root = process.cwd(), now = new Date()) {
  const state = JSON.parse(fs.readFileSync(path.join(root, "state/project-state.json"), "utf8"));
  const posState = state.positions?.[pos];
  if (!posState) throw new Error(`${pos} is not a position in state`);
  if (posState !== "LOCKED" && posState !== "IN_PROGRESS") throw new Error(`${pos} is ${posState}; TOP10_REAUDIT applies to LOCKED or IN_PROGRESS positions`);
  const dup = (state.pending_reaudit_queue ?? []).find((q: any) => q.type === "TOP10_REAUDIT" && q.position === pos && q.status !== "COMPLETED");
  if (dup) throw new Error(`${pos} already has a queued TOP10_REAUDIT (${dup.requested_at})`);
  requireApprovedReauditPool(pos, root);
  const item = { type: "TOP10_REAUDIT", position: pos, task: { position: pos, stage: "top10_reaudit" }, status: "QUEUED_NOT_STARTED",
    position_state_at_trigger: posState, pool_file: `data/candidate-pools/${pos}.reaudit.json`,
    baseline_file: posState === "LOCKED" ? `data/baselines/${pos}.json` : null,
    requested_by: by, requested_at: now.toISOString(), trigger: "COMMISSIONER_EXPLICIT",
    note: "Queued only. No audit or research has started. The locked baseline/lock pointer stay unchanged until a completed TOP10_REAUDIT is approved." };
  const cwd = process.cwd();
  try { process.chdir(root); queueReaudit(item); } finally { process.chdir(cwd); }
  return item;
}

if (process.argv[1] && /top10-reaudit\.[tj]s$/.test(process.argv[1])) {
  const argv = process.argv.slice(2);
  const val = (f: string) => { const i = argv.indexOf(f); return i >= 0 ? argv[i + 1] : undefined; };
  if (val("--confirm") !== "TOP10_REAUDIT") { console.error("Refusing: pass --confirm TOP10_REAUDIT (explicit commissioner trigger)."); process.exit(2); }
  const by = val("--by"); if (!by) { console.error("Refusing: --by <commissioner> required."); process.exit(2); }
  let failed = 0;
  for (const pos of String(argv[0] ?? "").toUpperCase().split(",").filter(Boolean)) {
    try { const it = triggerTop10Reaudit(pos, by); console.log(`QUEUED ${pos} TOP10_REAUDIT (${it.position_state_at_trigger}) — not started`); }
    catch (e) { failed++; console.error(`BLOCKED ${pos}: ${(e as Error).message}`); }
  }
  process.exitCode = failed ? 1 : 0;
}
