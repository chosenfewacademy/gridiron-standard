/**
 * League-wide ceiling check (v1.1.2 addendum, card t35u). Read-only, add-only, never changes a rating.
 * Before the positional cross-audit, every rostered or free-agent player at the position OUTSIDE the
 * audited pool who has meaningful recent snaps is screened against the #10 and first-out (#11) players.
 * A candidate is FLAGGED when, with at least `min_sample`, he matches or beats the weaker of the two
 * references on at least `min_hits` screen metrics, including at least one `production` metric.
 * Any flag blocks approval of the cross-audit (the commissioner decides). Madden is never an input.
 */
import fs from "node:fs";
import path from "node:path";

export interface CeilingMetric { key: string; label: string; better: "higher" | "lower"; production?: boolean }
export interface CeilingConfig { min_hits: number; min_sample: number; sample_key: string; metrics: CeilingMetric[]; scope: string }
export type Row = { name: string } & Record<string, unknown>;
export interface CeilingResult {
  position: string; references: Row[]; thresholds: Record<string, number>; flagged: Array<Row & { hits: string[] }>;
  closest: Array<Row & { hits: string[]; score: number }>; screened: number; read_only: true; rating_changes: [];
}

export function ceilingConfig(pos: string, root = process.cwd()): CeilingConfig | null {
  try { const c = JSON.parse(fs.readFileSync(path.join(root, "config/ceiling-metrics.json"), "utf8")); const p = c.positions?.[pos.replace(/_REAUDIT$/, "")];
    return p ? { min_hits: c.min_hits, min_sample: p.min_sample, sample_key: p.sample_key, metrics: p.metrics, scope: c.scope } : null; } catch { return null; }
}

const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);

export function evaluateLeagueCeiling(pos: string, cfg: CeilingConfig, references: Row[], candidates: Row[], pool: string[], closestN = 5): CeilingResult {
  if (references.length < 1) throw new Error("ceiling check needs the #10 and first-out reference rows");
  const thresholds: Record<string, number> = {};
  for (const m of cfg.metrics) {
    const vals = references.map(r => num(r[m.key])).filter((v): v is number => v !== null);
    if (vals.length) thresholds[m.key] = m.better === "higher" ? Math.min(...vals) : Math.max(...vals);
  }
  const inPool = new Set(pool);
  const scored = candidates.filter(c => !inPool.has(c.name)).map(c => {
    const hits: string[] = []; let score = 0;
    for (const m of cfg.metrics) {
      const v = num(c[m.key]); const t = thresholds[m.key]; if (v === null || t === undefined) continue;
      const refs = references.map(r => num(r[m.key])).filter((x): x is number => x !== null);
      const spread = Math.max(1e-9, Math.abs(Math.max(...refs) - Math.min(...refs)) || Math.abs(t) * 0.1 || 1);
      const d = m.better === "higher" ? v - t : t - v; score += Math.max(-3, Math.min(1, d / spread));
      if (d >= 0) hits.push(m.key);
    }
    return { ...c, hits, score };
  });
  const eligible = (c: Row) => (num(c[cfg.sample_key]) ?? 0) >= cfg.min_sample;
  const isFlag = (c: { hits: string[] } & Row) => eligible(c) && c.hits.length >= cfg.min_hits && cfg.metrics.some(m => m.production && c.hits.includes(m.key));
  const flagged = scored.filter(isFlag);
  const closest = scored.filter(c => !isFlag(c) && eligible(c)).sort((a, b) => b.hits.length - a.hits.length || b.score - a.score).slice(0, closestN);
  return { position: pos, references, thresholds, flagged, closest, screened: scored.length, read_only: true, rating_changes: [] };
}

/** Validator used by stageOutputErrors for cross-audits that carry league_ceiling_check_required. */
export function ceilingCheckErrors(audit: any): string[] {
  const c = audit?.league_ceiling_check; if (!c || typeof c !== "object") return ["league_ceiling_check is required (league-wide screen outside the pool)"];
  const e: string[] = [];
  if (!Array.isArray(c.flagged)) e.push("league_ceiling_check.flagged must be an array");
  else if (c.flagged.length) e.push(`league_ceiling_check flagged ${c.flagged.map((f: any) => f.name).join(", ")}: cross-audit cannot be approved until the commissioner resolves it`);
  if (!Array.isArray(c.closest)) e.push("league_ceiling_check.closest (next closest outside the pool) is required");
  if (c.rating_changes && c.rating_changes.length) e.push("league_ceiling_check is read-only: rating_changes must be empty");
  return e;
}
