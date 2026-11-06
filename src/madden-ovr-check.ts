/**
 * Madden 27 overall PRE-CHECK (estimated, NOT verified). Scope: docs/addendum-2026-11-03-madden-ovr-validation.md (user t53u/t54u).
 * Estimates the in-game OVR our attribute build would produce and flags gaps vs our stated overall.
 * Read-only: never changes a rating, never feeds a rating/gate/validator. madden_order_verified stays false.
 * In-game results logged in data/ingame-validation/<POS>.json are the ground truth and are used later to recalibrate.
 * Usage: npm run madden:ovr-check [-- --write]
 */
import fs from "node:fs";
import path from "node:path";

export type Attrs = Record<string, number>;
export interface ArchetypeDef { group: string; weights: Record<string, number>; desired_high: number; desired_low: number; confidence: string }
export interface WeightsFile { archetypes: Record<string, ArchetypeDef>; fallbacks: Record<string, string>; position_map: Record<string, string> }

export function loadWeights(root = process.cwd()): WeightsFile {
  return JSON.parse(fs.readFileSync(path.join(root, "config/madden-ovr-weights.estimated.json"), "utf8"));
}

export function archetypesFor(pos: string, w: WeightsFile): string[] {
  const g = w.position_map[pos] ?? pos;
  const all = Object.entries(w.archetypes);
  if (g === "EDGE") return all.filter(([k, a]) => a.group === "DE" || k === "OLB_PowerRusher" || k === "OLB_SpeedRusher").map(([k]) => k);
  return all.filter(([, a]) => a.group === g).map(([k]) => k);
}

function attrValue(a: Attrs, k: string, fb: Record<string, string>): { v: number; sub?: string } | null {
  if (typeof a[k] === "number") return { v: a[k] };
  const f = fb[k];
  if (f && typeof a[f] === "number") return { v: a[f], sub: `${k}<-${f}` };
  return null;
}

export function archetypeOvr(a: Attrs, def: ArchetypeDef, fb: Record<string, string>) {
  let s = 0, tw = 0; const subs: string[] = [], missing: string[] = [];
  for (const [k, wt] of Object.entries(def.weights)) {
    const r = attrValue(a, k, fb);
    if (!r) { missing.push(k); continue; }
    if (r.sub) subs.push(r.sub);
    s += r.v * wt; tw += wt;
  }
  const wavg = tw ? s / tw : 0;
  const raw = (wavg - def.desired_low) * 99 / (def.desired_high - def.desired_low);
  return { ovr: Math.max(12, Math.min(99, Math.round(raw))), raw, substitutions: subs, missing };
}

export function estimateOvr(pos: string, a: Attrs, w = loadWeights()) {
  const per: Record<string, number> = {}; let best = "", bestRaw = -1e9; let subs: string[] = [], missing: string[] = [];
  for (const k of archetypesFor(pos, w)) {
    const r = archetypeOvr(a, w.archetypes[k], w.fallbacks);
    per[k] = r.ovr;
    if (r.raw > bestRaw) { bestRaw = r.raw; best = k; subs = r.substitutions; missing = r.missing; }
  }
  return { estimated_ovr: best ? per[best] : null, best_archetype: best, per_archetype: per, substitutions: subs, missing };
}

/**
 * Style-preserving proposal only. Do not write the shift onto a card.
 * config/madden-ovr-weights.estimated.json is not a validated Madden 27 reproduction.
 * Shifts every attribute the best archetype weighs by the same delta d (keeps the mean-centred
 * shape), smallest |d| that reproduces the stated overall under this unverified estimate.
 */
export function suggestFix(pos: string, a: Attrs, target: number, w = loadWeights()) {
  const est = estimateOvr(pos, a, w);
  if (est.estimated_ovr === null || est.estimated_ovr === target) return null;
  const def = w.archetypes[est.best_archetype];
  const keys = Object.keys(def.weights).filter(k => typeof a[k] === "number");
  const dir = target > est.estimated_ovr ? 1 : -1;
  for (let d = 1; d <= 40; d++) {
    const b: Attrs = { ...a };
    for (const k of keys) b[k] = Math.max(0, Math.min(99, a[k] + dir * d));
    if (estimateOvr(pos, b, w).estimated_ovr === target) {
      const lever = Object.entries(def.weights).sort((x, y) => y[1] - x[1]).slice(0, 4).map(([k, v]) => `${k}(${v}%)`);
      return { archetype: est.best_archetype, uniform_shift: dir * d, attributes: keys, top_levers: lever, per_point_ovr: +(99 / (def.desired_high - def.desired_low) / 100).toFixed(4) };
    }
  }
  // Rounding can step over the target with a uniform shift: fall back to a weight-ordered round-robin of +/-1 steps.
  const order = Object.entries(def.weights).filter(([k]) => typeof a[k] === "number").sort((x, y) => y[1] - x[1]).map(([k]) => k);
  const b: Attrs = { ...a }; const changes: Record<string, number> = {};
  for (let i = 0; i < 400; i++) {
    const k = order[i % order.length];
    b[k] = Math.max(0, Math.min(99, b[k] + dir)); changes[k] = (changes[k] ?? 0) + dir;
    const e = estimateOvr(pos, b, w).estimated_ovr!;
    if (e === target) return { archetype: est.best_archetype, uniform_shift: null, round_robin_changes: changes, attributes: Object.keys(changes), top_levers: order.slice(0, 4), per_point_ovr: 0 };
    if ((dir > 0 && e > target) || (dir < 0 && e < target)) { b[k] -= dir; changes[k] -= dir; if (!changes[k]) delete changes[k]; }
  }
  return { archetype: est.best_archetype, uniform_shift: null, attributes: keys, top_levers: [], per_point_ovr: 0 };
}

// ---------- data loading (read-only) ----------
interface Row { group: string; position: string; player: string; stated_ovr: number; attrs: Attrs; source: string; madden_ovr?: number | null }

export function lockedBaselineRows(pos: string, root = process.cwd()): Row[] {
  const locks = JSON.parse(fs.readFileSync(path.join(root, "state/locks.json"), "utf8"));
  const bf = locks.positions?.[pos]?.baseline_file; if (!bf) return [];
  const base = JSON.parse(fs.readFileSync(path.join(root, bf), "utf8"));
  const st = JSON.parse(fs.readFileSync(path.join(root, "state/project-state.json"), "utf8"));
  const items = (st.pending_reaudit_queue ?? []).filter((x: any) => x?.type === "TOP10_REAUDIT" && x.position === pos);
  const approved = new Set(items.flatMap((i: any) => i.approvals ?? []).filter((x: any) => x.decision === "APPROVED").map((x: any) => x.audit_id));
  const dir = path.join(root, "audits/league", pos);
  const recs = fs.readdirSync(dir).filter(f => f.endsWith(".json")).map(f => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")))
    .filter(r => r.task_type === "player_rating" && r.ratings && approved.has(r.audit_id));
  const sup = new Set(recs.map(r => r.supersedes).filter(Boolean));
  const eff = recs.filter(r => !sup.has(r.audit_id));
  const nameOf = (r: any) => (r.players?.[0] ?? r.player ?? "").toLowerCase();
  return (base.top_10 ?? []).map((t: any) => {
    const r = eff.filter(x => nameOf(x) === t.player.toLowerCase()).sort((x, y) => (y.revision ?? 0) - (x.revision ?? 0))[0];
    return { group: `${pos} locked top 10`, position: pos, player: t.player, stated_ovr: t.ovr, attrs: r?.ratings ?? {}, source: r?.audit_id ?? "NOT_FOUND",
      madden_ovr: r?.madden_reference?.[0]?.ovr ?? null };
  });
}

export function teamRoomRows(team: string, pos: string, root = process.cwd()): Row[] {
  const dir = path.join(root, "research-inbox/teams", team, pos);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith(".json")).map(f => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")))
    .filter(r => r.record_type === "team_room_rating" && r.ratings)
    .map(r => ({ group: `${team} ${pos} room`, position: pos, player: r.player, stated_ovr: r.overall, attrs: r.ratings, source: `research-inbox/teams/${team}/${pos}/${r.player_id}.json`, madden_ovr: r.madden_reference?.ovr ?? null }));
}

export function runCheck(root = process.cwd()) {
  const w = loadWeights(root);
  const rows: Row[] = [...["QB", "RB", "WR", "TE", "LT"].flatMap(p => lockedBaselineRows(p, root)), ...teamRoomRows("PHI", "QB", root), ...teamRoomRows("PHI", "RB", root)];
  return rows.map(r => {
    const e = estimateOvr(r.position, r.attrs, w);
    const gap = e.estimated_ovr === null ? null : e.estimated_ovr - r.stated_ovr;
    return { ...r, ...e, gap, flag: gap === null ? "NO_ESTIMATE" : Math.abs(gap) <= 1 ? "OK" : Math.abs(gap) <= 3 ? "MINOR_GAP" : "MAJOR_GAP",
      fix: gap && Math.abs(gap) > 1 ? suggestFix(r.position, r.attrs, r.stated_ovr, w) : null };
  });
}

export function backtest(root = process.cwd()) {
  const w = loadWeights(root); const out: any[] = [];
  for (const [f, pos] of [["QB", "QB"], ["RB", "RB"]]) {
    const p = path.join(root, "references/madden", `${f}_madden27_reference.json`); if (!fs.existsSync(p)) continue;
    const d = JSON.parse(fs.readFileSync(p, "utf8"));
    for (const [name, v] of Object.entries<any>(d.players)) {
      const a = v.attributes ?? v; const ovr = v.ovr ?? v.OVR;
      out.push({ pos, player: name, madden_ovr: ovr, estimated: estimateOvr(pos, a, w).estimated_ovr });
    }
  }
  return out;
}

function fixText(f: any) {
  if (!f) return "-";
  if (f.uniform_shift !== null) return `${f.uniform_shift > 0 ? "+" : ""}${f.uniform_shift} on ${f.attributes.join("/")}`;
  if (f.round_robin_changes) return Object.entries(f.round_robin_changes).map(([k, v]: any) => `${k} ${v > 0 ? "+" : ""}${v}`).join(", ");
  return "no reachable fix (archetype switch)";
}

function main() {
  const write = process.argv.includes("--write");
  const res = runCheck(); const bt = backtest();
  const btErr = bt.map(b => Math.abs(b.estimated - b.madden_ovr));
  const lines = [
    `# Madden 27 OVR pre-check (ESTIMATED, NOT VERIFIED) — generated ${new Date().toISOString()}`, "",
    "Formula/weights: config/madden-ovr-weights.estimated.json. In-game results (data/ingame-validation) are ground truth. madden_order_verified=false.", "",
    `Backtest vs repo Madden 27 references: n=${bt.length}, exact=${btErr.filter(x => x === 0).length}, within 1=${btErr.filter(x => x <= 1).length}, max err=${Math.max(0, ...btErr)}`, "",
    "| Group | Player | Ours | Est. in-game | Gap | Flag | Best archetype | Style-preserving fix (uniform shift on weighted attrs) | Top levers | Source |",
    "|---|---|---|---|---|---|---|---|---|---|",
    ...res.map(r => `| ${r.group} | ${r.player} | ${r.stated_ovr} | ${r.estimated_ovr ?? "-"} | ${r.gap ?? "-"} | ${r.flag} | ${r.best_archetype} | ${fixText(r.fix)} | ${r.fix?.top_levers?.join(", ") ?? ""} | ${r.source} |`),
    "", "Backtest detail:", "", "| Pos | Player | Madden 27 | Est. |", "|---|---|---|---|", ...bt.map(b => `| ${b.pos} | ${b.player} | ${b.madden_ovr} | ${b.estimated} |`)];
  console.log(lines.join("\n"));
  if (write) {
    const stamp = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" }).replace(/-/g, "");
    fs.mkdirSync("docs/validation", { recursive: true });
    fs.writeFileSync(`docs/validation/madden-ovr-precheck-${stamp}.md`, lines.join("\n") + "\n");
    fs.writeFileSync(`docs/validation/madden-ovr-precheck-${stamp}.json`, JSON.stringify({ estimated: true, verified: false, madden_order_verified: false, backtest: bt, results: res }, null, 1) + "\n");
  }
}

if (process.argv[1] && /madden-ovr-check\.(ts|js)$/.test(process.argv[1])) main();
