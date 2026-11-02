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
  "individual_hard_audits", "positional_cross_audit", "lock",
  "candidate_audit", "background_analysis", "player_rating"
] as const;
/** Addendum v1.1.2 stage order (commissioner-approved 2026-11-02 1:56 PM ET). */
export const ORDER_V112 = ["candidate_audit", "background_analysis", "player_rating", "pair_audits", "scarcity_audit", "positional_cross_audit", "lock"] as const;
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
  reaudit?: { position: string; completed_tasks: string[]; baseline_controls?: Record<string, unknown>; approved_audit_ids?: string[] };
  /** Force the stage order (tests / explicit legacy runs). Default: v1.1.2 rules in usesOrderV112. */
  order?: "1.1.0" | "1.1.2" }

export const ids = (pos: string) => ({
  provisional: `${pos}_PROVISIONAL_TOP10`,
  pair: (n: number) => `${pos}_PAIR_${String(n).padStart(2, "0")}`,
  membership: `${pos}_MEMBERSHIP`,
  scarcity: `${pos}_SCARCITY`,
  hard: (n: number) => `${pos}_HARD_${String(n).padStart(2, "0")}`,
  cross: `${pos}_CROSS_AUDIT`,
  candidate: `${pos}_CANDIDATE_AUDIT`,
  background: (n: number) => `${pos}_BG_${String(n).padStart(2, "0")}`,
  rate: (n: number) => `${pos}_RATE_${String(n).padStart(2, "0")}`,
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

  if (usesOrderV112(state, pos, opts)) return planV112(pos, done, I, opts, mk);

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
  const pairs = legacy ?? generatePairs((ra ? `${pos}_REAUDIT` : pos) as Position, provTop, firstOut);
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
  if (t === "candidate_audit") {
    const set = names(audit.contention_set);
    if (set.length < 11 || new Set(set).size !== set.length) e.push("contention_set must list at least 11 distinct players (top 10 + first out)");
    if (!Array.isArray(audit.excluded)) e.push("excluded (pool players outside contention, with reasons) is required");
    if (audit.missing_top_players === undefined) e.push("missing_top_players must be stated (empty array if none)");
    else if (Array.isArray(audit.missing_top_players) && audit.missing_top_players.length) e.push("candidate pool is missing top players; pool must be amended first");
    if (Array.isArray(task.candidate_pool)) {
      const pool = new Set(task.candidate_pool.flatMap((c: any) => [c.player, ...(c.aliases ?? [])].map(normName)));
      for (const n of set) if (!pool.has(normName(n))) e.push(`${n} is not in the approved candidate pool`);
    }
  }
  if (t === "background_analysis" && (!audit.dossier || typeof audit.dossier !== "object")) e.push("dossier is required for background_analysis");
  if (t === "player_rating") {
    // Existing rating structure (AGENTS.md Core Rating Rules; config/madden-entry-order.json attribute set used by
    // src/card-spec.ts; docs/qb-full-audit-template.md): audit.ratings {ATTR: n}, per-trait confidence, proposed_ovr.
    const attrs = ratingAttributes(String(task.position ?? audit.position ?? ""));
    const r = audit.ratings ?? {};
    for (const a of attrs) if (!Number.isFinite(Number(r[a]))) e.push(`ratings.${a} is required`);
    for (const a of Object.keys(r)) if (!audit.trait_confidence?.[a]) e.push(`trait_confidence.${a} is required`);
    if (!Number.isFinite(Number(audit.proposed_ovr))) e.push("proposed_ovr is required (output of the attribute build, never a target)");
    if ("OVR" in r) e.push("OVR is not an attribute input; report proposed_ovr");
  }
  if (["candidate_audit", "background_analysis", "player_rating"].includes(String(t)) && audit.madden_reference !== undefined) {
    const refs = Array.isArray(audit.madden_reference) ? audit.madden_reference : [audit.madden_reference];
    if (refs.some((r: any) => r?.reference_only !== true || r?.used_as_evidence !== false)) e.push("madden_reference must be reference_only:true and used_as_evidence:false");
  }
  if (t === "membership_reopen") {
    const top = names(audit.final_top_10);
    if (top.length !== 10 || new Set(top).size !== 10) e.push("final_top_10 must list 10 distinct players");
  }
  if (t === "scarcity_audit" && (!audit.scarcity || typeof audit.scarcity !== "object")) e.push("scarcity summary is required");
  if (t === "positional_cross_audit" && !audit.cross_audit_result) e.push("cross_audit_result is required");
  return e;
}


/** v1.1.2 applies to every TOP10_REAUDIT and to positions with no completed tasks (in-progress positions finish the earlier order). */
/** Task ids that only exist in the earlier (v1.1.0) order. */
export const LEGACY_ORDER_TASK = /_(PROVISIONAL_TOP10|PAIR_\d\d|MEMBERSHIP|HARD_\d\d)$/;
export function usesOrderV112(state: ProjectState, pos: string, opts: EngineOptions = {}): boolean {
  if (opts.order) return opts.order === "1.1.2";
  if (opts.reaudit) return true;
  if (LEGACY_PAIR_SEQUENCES[pos as Position]) return false;
  return !state.completed_tasks.some(t => t.startsWith(`${pos}_`));
}

/** Contention set from the APPROVED candidate audit: >= 11 distinct names (top 10 + first out), all in the pool. */
export function contentionSet(cand: Record<string, any> | null): string[] {
  const set = names(cand?.contention_set);
  if (set.length < 11 || new Set(set).size !== set.length) throw new Error("APPROVED candidate audit must carry a contention_set of at least 11 distinct players.");
  return set;
}

/** Rating order: approved proposed_ovr desc; ties keep contention order. Madden/EA reference is never read here. */
export function ratingOrder(set: string[], overall: Record<string, number>): string[] {
  return set.map((p, i) => ({ p, i, o: overall[p] })).sort((a, b) => (b.o - a.o) || (a.i - b.i)).map(x => x.p);
}

function planV112(pos: Position, done: Set<string>, I: ReturnType<typeof ids>, opts: EngineOptions,
  mk: (stage: Stage, t: Record<string, unknown>) => StagePlan): StagePlan {
  const ra = opts.reaudit;
  const pool = ra ? requireApprovedReauditPool(pos, opts.root) : requireApprovedPool(pos, opts.root); // coverage gate
  const locked = ra?.baseline_controls ? { baseline_controls: ra.baseline_controls } : {};
  if (!done.has(I.candidate)) return mk("candidate_audit", { task_id: I.candidate, type: "candidate_audit", audit_order: "1.1.2", ...locked,
    candidate_pool: pool.candidates.map(c => ({ player: c.player, aliases: c.aliases ?? [], player_id: c.player_id, flags: c.flags ?? [] })) });
  const cand = approvedOutput(pos, I.candidate, opts);
  if (!cand) throw new Error(`${pos}: ${I.candidate} is completed but its approved record is missing.`);
  const set = [...contentionSet(cand)];
  // Commissioner add-only pool amendments append re-included players to the contention set (after the approved audit's list).
  for (const a of (pool as any).amendments ?? []) for (const n of a?.contention_additions ?? [])
    if (a.approved_by && a.approved_at && !set.some(x => normName(x) === normName(n))) set.push(n);
  const poolNames = new Set(pool.candidates.flatMap(c => [c.player, ...(c.aliases ?? [])].map(normName)));
  for (const n of set) if (!poolNames.has(normName(n))) throw new Error(`${pos}: contention player ${n} is not in the approved pool.`);
  // Single-player stages carry the strict calendar subject (player_id/team) from the approved pool.
  const subjectOf = (n: string) => { const c: any = pool.candidates.find(c => [c.player, ...(c.aliases ?? [])].some(x => normName(x) === normName(n))); return c ? { player_id: c.player_id, team: c.team } : {}; };
  const controls = { ...(ra?.baseline_controls ? { locked_baseline: ra.baseline_controls } : {}), top_10: set.slice(0, 10).map((player, i) => ({ rank: i + 1, player })), external_controls: set.slice(10) };
  for (let i = 0; i < set.length; i++) if (!done.has(I.background(i + 1)))
    return mk("background_analysis", { task_id: I.background(i + 1), type: "background_analysis", players: [set[i]], ...subjectOf(set[i]), baseline_controls: controls });
  const overall: Record<string, number> = {};
  for (let i = 0; i < set.length; i++) {
    if (!done.has(I.rate(i + 1))) return mk("player_rating", { task_id: I.rate(i + 1), type: "player_rating", players: [set[i]], ...subjectOf(set[i]), baseline_controls: controls,
      madden_reference_policy: "REFERENCE_ONLY_NEVER_EVIDENCE_NEVER_FORMULA_INPUT" });
    const r = approvedOutput(pos, I.rate(i + 1), opts);
    const o = Number(r?.proposed_ovr);
    if (!Number.isFinite(o)) throw new Error(`${pos}: approved ${I.rate(i + 1)} must carry proposed_ovr (output of the attribute build).`);
    overall[set[i]] = o;
  }
  const order = ratingOrder(set, overall);
  const rated = { ...controls, top_10: order.slice(0, 10).map((player, i) => ({ rank: i + 1, player, overall: overall[player] })), external_controls: order.slice(10) };
  // v1.1.2 head-to-heads use *_H2H_nn ids so they never collide with earlier-order *_PAIR_nn records (immutable history).
  const pair = generatePairs(I.lock.replace(/_LOCK$/, ""), order.slice(0, 10), order[10])
    .map(p => ({ ...p, task_id: p.task_id.replace(/_PAIR_(\d\d)$/, "_H2H_$1") })).find(p => !done.has(p.task_id));
  if (pair) return mk("pair_audits", { type: "pair_audit", ...pair, baseline_controls: rated });
  const final = order.slice(0, 10);
  if (!done.has(I.scarcity)) return mk("scarcity_audit", { task_id: I.scarcity, type: "scarcity_audit", players: final, baseline_controls: rated });
  if (!done.has(I.cross)) return mk("positional_cross_audit", { task_id: I.cross, type: "positional_cross_audit", players: final, baseline_controls: rated });
  return mk("lock", { task_id: I.lock, type: "lock", requires_commissioner_confirmation: ra ? `REAUDIT_REPLACE_BASELINE_${pos}` : `LOCK_${pos}`, players: final });
}

/** Rated attributes for a bucket = config/madden-entry-order.json order minus OVR (same list src/card-spec.ts uses). */
export function ratingAttributes(pos: string, root = process.cwd()): string[] {
  try { return (JSON.parse(fs.readFileSync(path.join(root, "config/madden-entry-order.json"), "utf8")).positions?.[pos] ?? []).filter((a: string) => a !== "OVR"); }
  catch { return []; }
}
