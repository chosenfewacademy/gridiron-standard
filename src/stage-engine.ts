/**
 * Generic per-position stage engine (AGENTS.md stage order, Methodology v1.1 A3 inputs).
 *
 * provisional_top_10 -> pair_audits -> membership_reopen -> scarcity_audit
 *   -> individual_hard_audits -> positional_cross_audit -> lock
 *
 * The engine is read-only: it derives the next task from state.completed_tasks plus
 * APPROVED, immutable audit records in audits/league/<POS>/. It never mutates state.
 * The executor (commissioner) records approvals; lock requires an explicit commissioner
 * confirmation (see position-lock.ts). All gates, the revision ceiling, immutability and
 * REVIEW_MAJOR approval are unchanged.
 */
import fs from "node:fs";
import path from "node:path";
import type { Position, ProjectState } from "./types.js";
import { normName, requireApprovedPool, requireApprovedReauditPool } from "./coverage-gate.js";

export const STAGES = [
  "provisional_top_10", "pair_audits", "membership_reopen", "scarcity_audit",
  "individual_hard_audits", "positional_cross_audit", "lock"
] as const;
export type Stage = typeof STAGES[number];

/** LG began before the engine existed: its provisional stage and pairs 01-02 ran outside it. */
export const LEGACY_PAIR_SEQUENCES: Partial<Record<Position, Array<{ task_id: string; players: [string, string] }>>> = {
  LG: [
    { task_id: "LG_PAIR_03", players: ["Steve Avila", "Tyler Smith"] },
    { task_id: "LG_PAIR_04", players: ["Isaac Seumalo", "Landon Dickerson"] },
    { task_id: "LG_PAIR_05", players: ["Matthew Bergeron", "Ezra Cleveland"] }
  ]
};

export interface EngineOptions { auditsRoot?: string; metricsPath?: string; root?: string;
  /** TOP10_REAUDIT mode (commissioner-triggered, queue-driven): plans a re-audit of a LOCKED position without touching
   *  current_position/completed_tasks of the main run. Task ids are <POS>_REAUDIT_*. */
  reaudit?: { position: string; completed_tasks: string[]; baseline_controls?: Record<string, unknown>; approved_audit_ids?: string[] } }

export const ids = (pos: string) => ({
  provisional: `${pos}_PROVISIONAL_TOP10`,
  pair: (n: number) => `${pos}_PAIR_${String(n).padStart(2, "0")}`,
  membership: `${pos}_MEMBERSHIP`,
  scarcity: `${pos}_SCARCITY`,
  hard: (n: number) => `${pos}_HARD_${String(n).padStart(2, "0")}`,
  cross: `${pos}_CROSS_AUDIT`,
  lock: `${pos}_LOCK`
});

/** Latest APPROVED audit record for a task id (records are immutable, never overwritten). */
export function approvedOutput(pos: string, taskId: string, opts: EngineOptions = {}): Record<string, any> | null {
  const dir = path.resolve(opts.auditsRoot ?? "audits/league", pos);
  if (!fs.existsSync(dir)) return null;
  const hits = fs.readdirSync(dir).filter(f => f.endsWith(".json"))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")))
    .filter(a => a.task_id === taskId && (a.status === "APPROVED" || (opts.reaudit?.approved_audit_ids ?? []).includes(a.audit_id)))
    .sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
  return hits.at(-1) ?? null;
}

const names = (xs: unknown): string[] =>
  Array.isArray(xs) ? xs.map(x => typeof x === "string" ? x : String((x as any)?.player ?? "")).filter(Boolean) : [];

/**
 * Pair generation, generalizing the LG pattern: adjacent provisional ranks (1v2, 3v4, ... 9v10)
 * stress-test ordering; a boundary pair (rank 10 vs first_out) stress-tests membership.
 */
export function generatePairs(pos: string, top10: string[], firstOut?: string | null) {
  if (top10.length !== 10) throw new Error(`${pos}: provisional Top 10 must list exactly 10 players (got ${top10.length}).`);
  const pairs = [] as Array<{ task_id: string; players: [string, string] }>;
  for (let i = 0; i < 10; i += 2) pairs.push({ task_id: ids(pos).pair(i / 2 + 1), players: [top10[i], top10[i + 1]] });
  if (firstOut) pairs.push({ task_id: ids(pos).pair(6), players: [top10[9], firstOut] });
  return pairs;
}

function positionInputs(pos: string, opts: EngineOptions) {
  const file = path.resolve(opts.metricsPath ?? "config/position-metrics.json");
  if (!fs.existsSync(file)) return undefined;
  const cfg = JSON.parse(fs.readFileSync(file, "utf8"));
  const p = cfg.positions?.[pos];
  if (!p) return undefined;
  return { methodology: cfg.governing_methodology ?? "1.1.0", common_inputs: cfg.common_inputs, ...p };
}

export interface StagePlan { position: string; stage: Stage; task: Record<string, unknown> }

export function planNext(state: ProjectState, opts: EngineOptions = {}): StagePlan {
  const ra = opts.reaudit;
  const pos = (ra ? ra.position : state.current_position) as Position;
  const done = new Set(ra ? ra.completed_tasks : state.completed_tasks);
  const I = ids(ra ? `${pos}_REAUDIT` : pos);
  const inputs = positionInputs(pos, opts);
  const mk = (stage: Stage, t: Record<string, unknown>): StagePlan =>
    ({ position: pos, stage, task: { ...t, position: pos, stage, ...(ra ? { audit_type: "TOP10_REAUDIT", reaudit: true } : {}),
      ...(inputs ? { position_inputs: inputs } : {}) } });

  if (state.positions[pos] === "LOCKED" && !ra) throw new Error(`${pos} is LOCKED; only an explicit TOP10_REAUDIT may change it.`);

  const legacy = ra ? undefined : LEGACY_PAIR_SEQUENCES[pos];
  const prov = approvedOutput(pos, I.provisional, opts);
  if (!legacy && !done.has(I.provisional)) {
    const pool = ra ? requireApprovedReauditPool(pos, opts.root) : requireApprovedPool(pos, opts.root); // coverage gate
    return mk("provisional_top_10", { task_id: I.provisional, type: "provisional_top_10",
      ...(ra?.baseline_controls ? { baseline_controls: ra.baseline_controls } : {}),
      candidate_pool: pool.candidates.map(c => ({ player: c.player, aliases: c.aliases ?? [], player_id: c.player_id, flags: c.flags ?? [] })) });
  }

  const provTop = names(prov?.provisional_top_10);
  const firstOut = names(prov ? [prov.first_out] : [])[0] ?? null;
  const controls = prov ? { ...(ra?.baseline_controls ? { locked_baseline: ra.baseline_controls } : {}), top_10: provTop.map((player, i) => ({ rank: i + 1, player })), external_controls: prov.external_controls ?? [] } : undefined;
  const withControls = (t: Record<string, unknown>) => controls ? { ...t, baseline_controls: controls } : t;

  if (!legacy && !prov) throw new Error(`${pos}: ${I.provisional} is completed but its APPROVED audit record is missing.`);
  const pairs = legacy ?? generatePairs(pos, provTop, firstOut);
  const pair = pairs.find(p => !done.has(p.task_id));
  if (pair) return mk("pair_audits", withControls({ type: "pair_audit", ...pair }));

  if (!done.has(I.membership)) return mk("membership_reopen", withControls({ task_id: I.membership, type: "membership_reopen" }));
  const mem = approvedOutput(pos, I.membership, opts);
  const final = names(mem?.final_top_10);
  if (final.length !== 10) throw new Error(`${pos}: APPROVED ${I.membership} record must carry final_top_10 with exactly 10 players.`);
  const finalControls = { top_10: final.map((player, i) => ({ rank: i + 1, player })), external_controls: mem!.external_controls ?? controls?.external_controls ?? [] };

  if (!done.has(I.scarcity)) return mk("scarcity_audit", { task_id: I.scarcity, type: "scarcity_audit", players: final, baseline_controls: finalControls });

  for (let i = 0; i < 10; i++) {
    if (!done.has(I.hard(i + 1))) return mk("individual_hard_audits",
      { task_id: I.hard(i + 1), type: "individual_hard_audit", players: [final[i]], rank: i + 1, baseline_controls: finalControls });
  }
  if (!done.has(I.cross)) return mk("positional_cross_audit", { task_id: I.cross, type: "positional_cross_audit", players: final, baseline_controls: finalControls });
  if (ra) return mk("lock", { task_id: I.lock, type: "lock", requires_commissioner_confirmation: `REAUDIT_REPLACE_BASELINE_${pos}`, players: final });
  return mk("lock", { task_id: I.lock, type: "lock", requires_commissioner_confirmation: `LOCK_${pos}`, players: final });
}

/** Stage-specific output requirements checked in addition to the normal audit validator. */
export function stageOutputErrors(task: Record<string, any>, audit: Record<string, any>): string[] {
  const e: string[] = [];
  const t = task.type;
  if (audit.task_id !== undefined && audit.task_id !== task.task_id) e.push(`task_id must be ${task.task_id}`);
  if (audit.position !== undefined && task.position && audit.position !== task.position) e.push(`position must be ${task.position}`);
  if (t === "provisional_top_10") {
    const top = names(audit.provisional_top_10);
    if (top.length !== 10 || new Set(top).size !== 10) e.push("provisional_top_10 must list 10 distinct players");
    if (!names([audit.first_out]).length) e.push("first_out is required");
    if (!Array.isArray(audit.external_controls) || !audit.external_controls.length) e.push("external_controls must be non-empty");
    if (Array.isArray(task.candidate_pool)) {
      const pool = new Set(task.candidate_pool.flatMap((c: any) => [c.player, ...(c.aliases ?? [])].map(normName)));
      for (const n of top) if (!pool.has(normName(n))) e.push(`${n} is not in the approved candidate pool`);
    }
  }
  if (t === "pair_audit" && !audit.pair_result) e.push("pair_result is required for pair_audit");
  if (t === "membership_reopen") {
    const top = names(audit.final_top_10);
    if (top.length !== 10 || new Set(top).size !== 10) e.push("final_top_10 must list 10 distinct players");
  }
  if (t === "scarcity_audit" && (!audit.scarcity || typeof audit.scarcity !== "object")) e.push("scarcity summary is required");
  if (t === "positional_cross_audit" && !audit.cross_audit_result) e.push("cross_audit_result is required");
  return e;
}
