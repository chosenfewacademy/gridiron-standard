import { capSummary } from "./contracts.js";
import type { DatabaseSync } from "./db.js";
import { DEFAULT_SEASON } from "./db.js";
import type { MembershipStatus } from "./membership.js";

export interface RosterQuery {
  team?: string;
  position?: string;
  minOvr?: number;
  name?: string;
  top10?: boolean;
  /** Default for a team query is on-roster (active, IR, PS). Card and top-10 queries default to all. */
  status?: MembershipStatus | "on-roster" | "all";
  season?: number;
  limit?: number;
}

export interface AttributeRow {
  attribute: string;
  rating: number;
  madden_rating: number | null;
  delta: number | null;
  confidence: string | null;
  tier: string | null;
}

export interface RosterRow {
  player_id: string | null;
  full_name: string;
  team_abbr: string | null;
  position: string | null;
  membership_status: string | null;
  raw_roster_status: string | null;
  card_id: string | null;
  ovr: number | null;
  madden_ovr: number | null;
  delta_ovr: number | null;
  baseline_rank: number | null;
  pool_role: string | null;
  source_audit_id: string | null;
  source_baseline_file: string | null;
  style_profile: string | null;
  confidence: string | null;
  season: number | null;
  jersey_number: number | null;
  college: string | null;
  years_exp: number | null;
  height_in: number | null;
  weight_lb: number | null;
  gsis_id: string | null;
  attributes?: AttributeRow[];
}

export interface BaselineStatusRow {
  position: string;
  baseline_file: string;
  version: string | null;
  lock_audit_id: string | null;
  selection_reason: string;
  newer_unselected: string | null;
  cards: number;
}

export interface RosterStatus {
  seeded: boolean;
  schema_version: number | null;
  seeded_at: string | null;
  season: number | null;
  teams: number;
  players: number;
  memberships: number;
  rating_cards: number;
  attribute_rows: number;
  positions: number;
  warnings: number;
  warning_counts: Record<string, number>;
  top10_without_team: number;
  contracts: number;
  contract_years: number;
  cap_seasons: number;
  league_cap: number | null;
  accounting_rule: string | null;
  teams_with_contracts: number;
  baselines: BaselineStatusRow[];
}

const ON_ROSTER = ["active", "IR", "PS"];

function count(db: DatabaseSync, sql: string): number {
  const row = db.prepare(sql).get() as { n: number } | undefined;
  return Number(row?.n ?? 0);
}

export function latestSeason(db: DatabaseSync): number {
  const row = db.prepare(
    "SELECT season FROM seed_runs ORDER BY seed_id DESC LIMIT 1"
  ).get() as { season?: number } | undefined;
  return typeof row?.season === "number" ? row.season : DEFAULT_SEASON;
}

export function rosterStatus(db: DatabaseSync): RosterStatus {
  const seeded = count(db, "SELECT COUNT(*) AS n FROM seed_runs") > 0;
  const run = db.prepare(`
    SELECT seeded_at, season, warning_count
    FROM seed_runs ORDER BY seed_id DESC LIMIT 1
  `).get() as { seeded_at?: string; season?: number; warning_count?: number } | undefined;
  const schema = db.prepare(
    "SELECT MAX(version) AS version FROM schema_migrations"
  ).get() as { version?: number | null } | undefined;
  const warningRows = db.prepare(`
    SELECT code, COUNT(*) AS n
    FROM seed_warnings
    WHERE seed_id = (SELECT MAX(seed_id) FROM seed_runs)
    GROUP BY code
  `).all() as { code: string; n: number }[];
  const warningCounts: Record<string, number> = {};
  for (const row of warningRows) warningCounts[row.code] = Number(row.n);
  const cap = capSummary(db, typeof run?.season === "number" ? run.season : null);
  const baselines = db.prepare(`
    SELECT
      b.position,
      b.baseline_file,
      b.version,
      b.lock_audit_id,
      b.selection_reason,
      b.newer_unselected,
      (SELECT COUNT(*) FROM rating_cards c WHERE c.position = b.position) AS cards
    FROM position_baselines b
    ORDER BY b.rowid
  `).all() as unknown as BaselineStatusRow[];

  return {
    seeded,
    schema_version: schema?.version == null ? null : Number(schema.version),
    seeded_at: run?.seeded_at ?? null,
    season: typeof run?.season === "number" ? run.season : null,
    teams: count(db, "SELECT COUNT(*) AS n FROM teams"),
    players: count(db, "SELECT COUNT(*) AS n FROM players"),
    memberships: count(db, "SELECT COUNT(*) AS n FROM roster_membership"),
    rating_cards: count(db, "SELECT COUNT(*) AS n FROM rating_cards"),
    attribute_rows: count(db, "SELECT COUNT(*) AS n FROM rating_attributes"),
    positions: baselines.length,
    warnings: Number(run?.warning_count ?? 0),
    warning_counts: warningCounts,
    top10_without_team: count(db, `
      SELECT COUNT(*) AS n
      FROM rating_cards c
      LEFT JOIN players p ON p.player_id = c.player_id
      WHERE c.pool_role = 'TOP10' AND (c.player_id IS NULL OR p.team_abbr IS NULL)
    `),
    contracts: cap.contracts,
    contract_years: cap.contract_years,
    cap_seasons: cap.cap_seasons,
    league_cap: cap.league_cap,
    accounting_rule: cap.accounting_rule,
    teams_with_contracts: cap.teams_with_contracts,
    baselines
  };
}

export function loadAttributes(db: DatabaseSync, cardIds: string[]): Map<string, AttributeRow[]> {
  const grouped = new Map<string, AttributeRow[]>();
  if (!cardIds.length) return grouped;
  const placeholders = cardIds.map(() => "?").join(", ");
  const rows = db.prepare(`
    SELECT card_id, attribute, rating, madden_rating, delta, confidence, tier
    FROM rating_attributes
    WHERE card_id IN (${placeholders})
    ORDER BY card_id, attribute
  `).all(...cardIds) as unknown as (AttributeRow & { card_id: string })[];
  for (const row of rows) {
    const list = grouped.get(row.card_id);
    const item: AttributeRow = {
      attribute: row.attribute,
      rating: row.rating,
      madden_rating: row.madden_rating,
      delta: row.delta,
      confidence: row.confidence,
      tier: row.tier
    };
    if (list) list.push(item);
    else grouped.set(row.card_id, [item]);
  }
  return grouped;
}

export function queryRoster(db: DatabaseSync, query: RosterQuery = {}): RosterRow[] {
  const season = query.season ?? latestSeason(db);
  const limit = query.limit ?? 200;
  const team = query.team?.trim().toUpperCase() || null;
  const position = query.position?.trim().toUpperCase() || null;
  const name = query.name?.trim() || null;
  const top10 = query.top10 === true;
  const params: (string | number | null)[] = [];
  const where: string[] = [];

  const cardMode = top10 || !team;
  let sql: string;
  if (cardMode) {
    sql = `
      SELECT
        c.player_id AS player_id,
        COALESCE(p.full_name, c.player_name) AS full_name,
        p.team_abbr AS team_abbr,
        c.position AS position,
        m.status AS membership_status,
        m.raw_roster_status AS raw_roster_status,
        c.card_id AS card_id,
        c.ovr AS ovr,
        c.madden_ovr AS madden_ovr,
        c.delta_ovr AS delta_ovr,
        c.baseline_rank AS baseline_rank,
        c.pool_role AS pool_role,
        c.source_audit_id AS source_audit_id,
        c.source_baseline_file AS source_baseline_file,
        c.style_profile AS style_profile,
        c.confidence AS confidence,
        m.season AS season,
        p.jersey_number AS jersey_number,
        p.college AS college,
        p.years_exp AS years_exp,
        p.height_in AS height_in,
        p.weight_lb AS weight_lb,
        p.gsis_id AS gsis_id
      FROM rating_cards c
      LEFT JOIN players p ON p.player_id = c.player_id
      LEFT JOIN roster_membership m ON m.player_id = c.player_id AND m.season = ?
    `;
    params.push(season);
    if (position) {
      where.push("c.position = ?");
      params.push(position);
    }
    if (team) {
      where.push("p.team_abbr = ?");
      params.push(team);
    }
    if (top10) where.push("c.pool_role = 'TOP10'");
    if (query.minOvr !== undefined) {
      where.push("c.ovr >= ?");
      params.push(query.minOvr);
    }
    if (name) {
      where.push("(c.player_name LIKE ? COLLATE NOCASE OR p.full_name LIKE ? COLLATE NOCASE)");
      params.push(`%${name}%`, `%${name}%`);
    }
    if (query.status && query.status !== "all") {
      if (query.status === "on-roster") where.push("m.status IN ('active', 'IR', 'PS')");
      else {
        where.push("m.status = ?");
        params.push(query.status);
      }
    }
  } else {
    sql = `
      SELECT
        p.player_id AS player_id,
        p.full_name AS full_name,
        p.team_abbr AS team_abbr,
        COALESCE(c.position, p.position_bucket) AS position,
        m.status AS membership_status,
        m.raw_roster_status AS raw_roster_status,
        c.card_id AS card_id,
        c.ovr AS ovr,
        c.madden_ovr AS madden_ovr,
        c.delta_ovr AS delta_ovr,
        c.baseline_rank AS baseline_rank,
        c.pool_role AS pool_role,
        c.source_audit_id AS source_audit_id,
        c.source_baseline_file AS source_baseline_file,
        c.style_profile AS style_profile,
        c.confidence AS confidence,
        m.season AS season,
        p.jersey_number AS jersey_number,
        p.college AS college,
        p.years_exp AS years_exp,
        p.height_in AS height_in,
        p.weight_lb AS weight_lb,
        p.gsis_id AS gsis_id
      FROM players p
      JOIN roster_membership m ON m.player_id = p.player_id AND m.season = ?
      LEFT JOIN rating_cards c
        ON c.player_id = p.player_id
       AND c.position = COALESCE(?, p.position_bucket)
      WHERE p.team_abbr = ?
    `;
    params.push(season, position, team);
    if (position) {
      where.push("p.position_bucket = ?");
      params.push(position);
    }
    if (query.minOvr !== undefined) {
      where.push("c.ovr >= ?");
      params.push(query.minOvr);
    }
    if (name) {
      where.push("p.full_name LIKE ? COLLATE NOCASE");
      params.push(`%${name}%`);
    }
    const status = query.status ?? "on-roster";
    if (status === "on-roster") {
      where.push(`m.status IN (${ON_ROSTER.map(() => "?").join(", ")})`);
      params.push(...ON_ROSTER);
    } else if (status !== "all") {
      where.push("m.status = ?");
      params.push(status);
    }
  }

  if (where.length) {
    sql += cardMode ? ` WHERE ${where.join(" AND ")}` : ` AND ${where.join(" AND ")}`;
  }
  sql += cardMode
    ? (top10
      ? " ORDER BY c.baseline_rank, full_name LIMIT ?"
      : " ORDER BY c.ovr DESC, c.position, full_name LIMIT ?")
    : " ORDER BY CASE WHEN c.ovr IS NULL THEN 1 ELSE 0 END, c.ovr DESC, p.full_name LIMIT ?";
  params.push(limit);
  return db.prepare(sql).all(...params) as unknown as RosterRow[];
}
