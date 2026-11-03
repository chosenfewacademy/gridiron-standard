// Weekly in-season update (addendum v1.1.2 entry D, t36u). Read-only w.r.t. state/locks/baselines:
// it only scaffolds and validates PROPOSED revisions under research-inbox/. Never locks.
import fs from "node:fs";
import path from "node:path";

export type WeeklyCfg = any;
export interface PlayerProposal {
  player: string; baseline_ovr: number; prior_week_ovr: number; proposed_ovr: number;
  attribute_changes?: Record<string, { from: number; to: number }>;
  direction_streak_weeks?: number; event?: { reason: string; source_url?: string } | null;
  rationale?: string;
}
export interface WeeklyProposal { position: string; season: number; week: number; players: PlayerProposal[];
  prior_order: string[]; proposed_order: string[]; h2h?: { a: string; b: string; winner: string; rationale: string }[];
  checks?: Record<string, boolean>; status?: string; }

export function loadWeeklyConfig(file = "config/weekly-update.json"): WeeklyCfg { return JSON.parse(fs.readFileSync(file, "utf8")); }

export function capsFor(cfg: WeeklyCfg, p: PlayerProposal): { ovr: number; attr: number; mode: string } {
  const c = cfg.caps;
  if (p.event && c.event_override.reasons.includes(p.event.reason)) return { ovr: c.event_override.ovr_per_week, attr: c.event_override.attribute_per_week, mode: "event" };
  if ((p.direction_streak_weeks ?? 0) >= c.sustained.min_consecutive_weeks_same_direction) return { ovr: c.sustained.ovr_per_week, attr: c.sustained.attribute_per_week, mode: "sustained" };
  return { ovr: c.ovr_per_week, attr: c.attribute_per_week, mode: "base" };
}

export function shrinkK(cfg: WeeklyCfg, weeksSinceBaseline: number): number {
  let k = 0; for (const [w, v] of Object.entries(cfg.shrinkage.k_by_weeks_since_baseline)) if (weeksSinceBaseline >= Number(w)) k = v as number;
  return k;
}

/** Order changes: pairs that swapped relative order between prior and proposed. */
export function swappedPairs(prior: string[], next: string[]): [string, string][] {
  const out: [string, string][] = []; const pi = new Map(prior.map((n, i) => [n, i]));
  for (let i = 0; i < next.length; i++) for (let j = i + 1; j < next.length; j++) {
    const a = pi.get(next[i]), b = pi.get(next[j]); if (a !== undefined && b !== undefined && a > b) out.push([next[j], next[i]]);
  }
  return out;
}

export function validateWeeklyProposal(cfg: WeeklyCfg, w: WeeklyProposal): string[] {
  const e: string[] = [];
  if (w.status && w.status !== "PROPOSED") e.push(`status must be PROPOSED (weekly runs never lock), got ${w.status}`);
  for (const p of w.players) {
    const cap = capsFor(cfg, p); const d = p.proposed_ovr - p.prior_week_ovr;
    if (Math.abs(d) > cap.ovr) e.push(`${p.player}: OVR move ${d} exceeds ${cap.mode} cap ±${cap.ovr}`);
    if (cap.mode === "event" && cfg.caps.event_override.requires_source_url && !p.event?.source_url) e.push(`${p.player}: event override needs source_url`);
    for (const [k, v] of Object.entries(p.attribute_changes ?? {})) if (Math.abs(v.to - v.from) > cap.attr) e.push(`${p.player}: ${k} move ${v.to - v.from} exceeds ${cap.mode} cap ±${cap.attr}`);
    if (Math.abs(p.proposed_ovr - p.baseline_ovr) > cfg.caps.ovr_cumulative_vs_baseline_before_full_reaudit && cap.mode !== "event")
      e.push(`${p.player}: cumulative drift vs baseline > ${cfg.caps.ovr_cumulative_vs_baseline_before_full_reaudit}; trigger a full TOP10_REAUDIT instead`);
    if (!p.rationale && d !== 0) e.push(`${p.player}: rating change needs a judgment rationale`);
  }
  if (cfg.rank_change_requires_h2h) for (const [a, b] of swappedPairs(w.prior_order, w.proposed_order))
    if (!w.h2h?.some(h => (h.a === a && h.b === b) || (h.a === b && h.b === a))) e.push(`rank order changed ${a}/${b} without head-to-head`);
  for (const k of cfg.keep_checks) if (w.checks?.[k] !== true) e.push(`check not completed: ${k}`);
  return e;
}

function main(argv: string[]): void {
  const [cmd, pos, ...rest] = argv; const opt = (f: string) => { const i = rest.indexOf(f); return i >= 0 ? rest[i + 1] : undefined; };
  const cfg = loadWeeklyConfig(); const week = Number(opt("--week")); const season = Number(opt("--season") ?? cfg.season);
  if (!pos || !cfg.applies_to.includes(pos) || !Number.isInteger(week) || week < 1) throw new Error("usage: weekly:<propose|validate> QB --week <n> [--season 2026]");
  const dir = cfg.output_dir.replace("{POS}", pos).replace("{SEASON}", String(season)).replace("{WEEK}", String(week).padStart(2, "0"));
  const file = path.join(dir, "proposal.json");
  if (cmd === "propose") {
    if (fs.existsSync(file)) throw new Error(`${file} exists (add-only)`);
    const base = JSON.parse(fs.readFileSync(cfg.baseline[pos], "utf8"));
    const order = base.top_10.map((x: any) => x.player);
    const draft: WeeklyProposal = { position: pos, season, week, status: "PROPOSED", prior_order: order, proposed_order: order,
      players: base.top_10.map((x: any) => ({ player: x.player, baseline_ovr: x.ovr, prior_week_ovr: x.ovr, proposed_ovr: x.ovr, attribute_changes: {}, direction_streak_weeks: 0, event: null, rationale: "" })),
      h2h: [], checks: Object.fromEntries(cfg.keep_checks.map((k: string) => [k, false])) };
    fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(file, JSON.stringify(draft, null, 2) + "\n");
    console.log(`wrote ${file} (PROPOSED; fill prior_week_ovr from the last accepted weekly proposal; k=${shrinkK(cfg, week)})`);
  } else if (cmd === "validate") {
    const errs = validateWeeklyProposal(cfg, JSON.parse(fs.readFileSync(file, "utf8")));
    if (errs.length) { console.error(errs.join("\n")); process.exit(1); } console.log(`${file}: OK (PROPOSED; lock requires user confirmation)`);
  } else throw new Error("unknown command");
}
if (process.argv[1]?.endsWith("weekly-update.ts")) main(process.argv.slice(2));
