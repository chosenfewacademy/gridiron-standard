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
export interface PoolCandidate { player: string; aliases?: string[]; player_id: string | null; team?: string | null; flags?: string[]; reasoning?: string; citations?: string[] }
export interface PoolExclusion { player: string; player_id?: string | null; aliases?: string[]; reason: string; code?: "NOT_ON_2026_ROSTER" | "OTHER_POSITION" | "BELOW_CUTOFF" | "INJURED" | "OTHER" }
/** Players not on an active 2026 roster. Explicit status + public source; never a silent exclusion. */
export interface FreeAgentEntry { player: string; player_id: string | null; aliases?: string[]; status: "FREE_AGENT" | "CUT" | "RETIRED";
  last_team: string | null; status_as_of: string; source_url: string; note?: string }
/** IR / PUP / out players who would otherwise be top-20 candidates. in_pool says whether they are also candidates. */
export interface InjuredEntry { player: string; player_id: string; aliases?: string[]; team: string | null;
  status: "IR" | "IR_DESIGNATED_RETURN" | "PUP" | "NFI" | "INACTIVE" | "OUT" | "RESERVE_OTHER"; in_pool: boolean; status_as_of: string; source_url: string; note?: string }
export interface CandidatePool {
  position: string; status: "PROPOSED" | "APPROVED"; approved_by?: string; approved_at?: string;
  candidates: PoolCandidate[]; exclusions: PoolExclusion[]; coverage_sources: CoverageSource[];
  free_agents?: FreeAgentEntry[]; injured?: InjuredEntry[];
}
const FA_STATUS = new Set(["FREE_AGENT", "CUT", "RETIRED"]);
const INJ_STATUS = new Set(["IR", "IR_DESIGNATED_RETURN", "PUP", "NFI", "INACTIVE", "OUT", "RESERVE_OTHER"]);
/** Registry roster_status values that mean the player is hurt/out and must be listed in the injured section. */
export const INJURED_ROSTER_STATUS = new Set(["RES", "INA"]);
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
  const cand = new Map<string, PoolCandidate>();
  for (const c of pool.candidates) for (const n of [c.player, ...(c.aliases ?? [])]) {
    if (cand.has(normName(n)) && cand.get(normName(n)) !== c) errors.push(`duplicate candidates: ${n}`);
    cand.set(normName(n), c);
  }
  const excl = new Map<string, PoolExclusion>();
  for (const e of pool.exclusions) for (const n of [e.player, ...(e.aliases ?? [])]) excl.set(normName(n), e);
  for (const k of cand.keys()) if (excl.has(k)) errors.push(`${cand.get(k)!.player} is both candidate and excluded`);
  for (const e of pool.exclusions) if (e.code === "NOT_ON_2026_ROSTER") errors.push(`${e.player}: off-roster players belong in free_agents with an explicit status, not exclusions`);
  const fa = new Map<string, FreeAgentEntry>(), inj = new Map<string, InjuredEntry>();
  for (const f of pool.free_agents ?? []) {
    for (const n of [f.player, ...(f.aliases ?? [])]) fa.set(normName(n), f);
    if (!FA_STATUS.has(f.status)) errors.push(`free agent ${f.player}: status must be FREE_AGENT, CUT or RETIRED`);
    if (!/^https:\/\//.test(f.source_url ?? "") || !f.status_as_of) errors.push(`free agent ${f.player}: source_url and status_as_of required`);
    if (f.status !== "RETIRED" && !(f.player_id && reg.ids.has(f.player_id))) errors.push(`free agent ${f.player}: eligible (${f.status}) players must be in the registry`);
    if (cand.has(normName(f.player))) errors.push(`${f.player} is both candidate and free agent`);
  }
  for (const i of pool.injured ?? []) {
    for (const n of [i.player, ...(i.aliases ?? [])]) inj.set(normName(n), i);
    if (!INJ_STATUS.has(i.status)) errors.push(`injured ${i.player}: invalid status ${i.status}`);
    if (!/^https:\/\//.test(i.source_url ?? "") || !i.status_as_of) errors.push(`injured ${i.player}: source_url and status_as_of required`);
    if (!reg.ids.has(i.player_id)) errors.push(`injured ${i.player}: unknown player_id`);
    if (i.in_pool !== cand.has(normName(i.player))) errors.push(`injured ${i.player}: in_pool must match candidate membership`);
  }
  const rs = new Map(registryPlayers.map((p: any) => [p.player_id, p.roster_status]));
  for (const c of pool.candidates) if (c.player_id && INJURED_ROSTER_STATUS.has(String(rs.get(c.player_id))) && !inj.has(normName(c.player)))
    errors.push(`${c.player}: registry roster_status ${rs.get(c.player_id)} must be listed in the injured section`);
  for (const e of pool.exclusions) if (e.player_id && !reg.ids.has(e.player_id)) errors.push(`exclusion ${e.player}: unknown player_id ${e.player_id}`);
  for (const e of pool.exclusions) if (!e.reason || e.reason.trim().length < 10) errors.push(`exclusion of ${e.player} needs a reason`);

  const missing = new Set<string>(); const unaccounted: CoverageResult["unaccounted"] = [];
  const inRegistry = (name: string, id?: string | null) => (id ? reg.ids.has(id) : false) || reg.names.has(normName(name));
  for (const c of pool.candidates) if (!inRegistry(c.player, c.player_id)) missing.add(c.player);
  for (const s of srcs) s.top.slice(0, topN).forEach((name, i) => {
    const k = normName(name), e = excl.get(k), f = fa.get(k);
    if (!cand.has(k) && !e && !f && !inj.has(k)) unaccounted.push({ player: name, source: s.id, rank: i + 1 });
    if (f?.status === "RETIRED") return; // retired: registry not required, status + source recorded
    if (!inRegistry(name, cand.get(k)?.player_id ?? e?.player_id ?? f?.player_id ?? inj.get(k)?.player_id)) missing.add(name);
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
