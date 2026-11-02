/**
 * Candidate-pool coverage gate (runs before provisional_top_10).
 *
 * A position's candidate pool must be cross-checked against several free, independent sources.
 * Every name in any source's top N must (a) exist in the player registry and (b) be in the pool
 * or be explicitly excluded with a reason. Anything unaccounted for blocks the stage, so a true
 * top-10 player cannot be silently missing from the registry or the pool.
 */
import fs from "node:fs";
import path from "node:path";

export type SourceKind = "grades" | "usage" | "stats" | "honors";
export interface CoverageSource {
  id: string; name: string; publisher: string; kind: SourceKind; season: number;
  url: string; retrieved_at: string; top: string[];
}
export interface PoolCandidate { player: string; player_id: string | null; team?: string | null; flags?: string[]; reasoning?: string; citations?: string[] }
export interface PoolExclusion { player: string; reason: string; code?: "NOT_ON_2026_ROSTER" | "OTHER_POSITION" | "BELOW_CUTOFF" | "INJURED" | "OTHER" }
export interface CandidatePool {
  position: string; status: "PROPOSED" | "APPROVED"; approved_by?: string; approved_at?: string;
  candidates: PoolCandidate[]; exclusions: PoolExclusion[]; coverage_sources: CoverageSource[];
}
export interface CoverageResult { ok: boolean; errors: string[]; missing_from_registry: string[]; unaccounted: Array<{ player: string; source: string; rank: number }> }

export const normName = (n: string) => n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/\b(jr|sr|ii|iii|iv|v)\b\.?/g, "").replace(/[^a-z0-9]+/g, "");

export function registryIndex(players: Array<{ player_id: string; full_name: string; aliases?: string[] }>) {
  const ids = new Set<string>(); const names = new Set<string>();
  for (const p of players) { ids.add(p.player_id); names.add(normName(p.full_name)); for (const a of p.aliases ?? []) names.add(normName(a)); }
  return { ids, names };
}

export function checkCoverage(pool: CandidatePool, registryPlayers: any[], opts: { topN?: number; minSources?: number; minKinds?: number; minPublishers?: number } = {}): CoverageResult {
  const topN = opts.topN ?? 20, errors: string[] = [];
  const reg = registryIndex(registryPlayers);
  const srcs = pool.coverage_sources ?? [];
  if (srcs.length < (opts.minSources ?? 3)) errors.push(`need >= ${opts.minSources ?? 3} coverage sources (got ${srcs.length})`);
  if (new Set(srcs.map(s => s.kind)).size < (opts.minKinds ?? 3)) errors.push(`need >= ${opts.minKinds ?? 3} distinct source kinds`);
  if (new Set(srcs.map(s => s.publisher)).size < (opts.minPublishers ?? 2)) errors.push(`need >= ${opts.minPublishers ?? 2} independent publishers`);
  for (const s of srcs) {
    if (!/^https:\/\//.test(s.url ?? "")) errors.push(`source ${s.id}: https url required`);
    if (!s.retrieved_at || Number.isNaN(Date.parse(s.retrieved_at))) errors.push(`source ${s.id}: retrieved_at required`);
    if (!Array.isArray(s.top) || !s.top.length) errors.push(`source ${s.id}: empty top list`);
  }
  const cand = new Map(pool.candidates.map(c => [normName(c.player), c]));
  const excl = new Map(pool.exclusions.map(e => [normName(e.player), e]));
  if (cand.size !== pool.candidates.length) errors.push("duplicate candidates");
  for (const k of cand.keys()) if (excl.has(k)) errors.push(`${cand.get(k)!.player} is both candidate and excluded`);
  for (const e of pool.exclusions) if (!e.reason || e.reason.trim().length < 10) errors.push(`exclusion of ${e.player} needs a reason`);

  const missing = new Set<string>(); const unaccounted: CoverageResult["unaccounted"] = [];
  const inRegistry = (name: string, id?: string | null) => (id ? reg.ids.has(id) : false) || reg.names.has(normName(name));
  for (const c of pool.candidates) if (!inRegistry(c.player, c.player_id)) missing.add(c.player);
  for (const s of srcs) s.top.slice(0, topN).forEach((name, i) => {
    const k = normName(name), e = excl.get(k);
    if (!cand.has(k) && !e) unaccounted.push({ player: name, source: s.id, rank: i + 1 });
    if (!inRegistry(name, cand.get(k)?.player_id) && e?.code !== "NOT_ON_2026_ROSTER") missing.add(name);
  });
  if (missing.size) errors.push(`missing from registry: ${[...missing].join(", ")}`);
  if (unaccounted.length) errors.push(`unaccounted top-${topN} names: ${[...new Set(unaccounted.map(u => u.player))].join(", ")}`);
  return { ok: errors.length === 0, errors, missing_from_registry: [...missing], unaccounted };
}

/** Pre-provisional gate: an APPROVED pool that passes coverage is required. Throws when blocked. */
export function requireApprovedPool(pos: string, root = process.cwd()): CandidatePool {
  const file = path.join(root, "data/candidate-pools", `${pos}.json`);
  if (!fs.existsSync(file)) throw new Error(`COVERAGE_GATE_BLOCKED: ${pos} has no approved candidate pool (data/candidate-pools/${pos}.json); proposed pools need commissioner approval.`);
  const pool = JSON.parse(fs.readFileSync(file, "utf8")) as CandidatePool;
  if (pool.position !== pos || pool.status !== "APPROVED" || !pool.approved_by || !pool.approved_at) throw new Error(`COVERAGE_GATE_BLOCKED: ${pos} pool is not APPROVED with approved_by/approved_at.`);
  const reg = JSON.parse(fs.readFileSync(path.join(root, "data/players/registry.json"), "utf8")).players;
  const r = checkCoverage(pool, reg);
  if (!r.ok) throw new Error(`COVERAGE_GATE_BLOCKED: ${pos}: ${r.errors.join("; ")}`);
  return pool;
}
