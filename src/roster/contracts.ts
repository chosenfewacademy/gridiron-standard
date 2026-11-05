import fs from "node:fs";
import path from "node:path";
import type { SeedWarning } from "./baselines.js";
import {
  ageOnSeptember1,
  buildCapSheet,
  type AccountingRule,
  type CapPlayerCharge,
  type CapSheet
} from "./cap.js";
import type { DatabaseSync } from "./db.js";
import { normalizeName } from "./names.js";
import { canonicalTeam } from "./teams.js";

export interface ImportOptions {
  root: string;
  season?: number;
  contractsDir?: string;
  capFile?: string;
}

export interface ImportResult {
  contracts: number;
  contractYears: number;
  capSeasons: number;
  warnings: SeedWarning[];
}

export interface ContractYearRow {
  season: number;
  cap_hit: number;
  dead_money: number | null;
  base_salary: number | null;
  signing_bonus_proration: number | null;
  option_bonus_proration: number | null;
  roster_bonus: number | null;
  workout_bonus: number | null;
  other_bonus: number | null;
  guarantee_signing: number | null;
  guarantee_roster: number | null;
  guarantee_injury: number | null;
  guarantee_other: number | null;
  team_option: number;
  player_option: number;
  void_year: number;
  cap_active_while_roster_retired: number;
}

export interface PlayerContract {
  contract_id: string;
  player_id: string;
  player_name: string;
  birth_date: string | null;
  age: number | null;
  team_abbr: string;
  position: string | null;
  ovr: number | null;
  signing_year: number;
  years: number | null;
  total_value: number | null;
  aav: number | null;
  signing_bonus: number | null;
  guarantee_signing: number | null;
  guarantee_roster: number | null;
  guarantee_injury: number | null;
  guarantee_other: number | null;
  fully_guaranteed: number | null;
  source_name: string | null;
  source_url: string | null;
  source_note: string | null;
  seasons: ContractYearRow[];
}

interface PlayerHit {
  player_id: string;
  full_name: string;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function dollars(value: unknown, label: string, required: boolean): number | null {
  if (value === undefined || value === null) {
    if (required) throw new Error(`${label} is required`);
    return null;
  }
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative integer number of dollars`);
  }
  return value;
}

function signedDollars(value: unknown, label: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value)) {
    throw new Error(`${label} must be an integer number of dollars`);
  }
  return value;
}

function flag(value: unknown, label: string): number {
  if (value === undefined || value === null || value === false || value === 0) return 0;
  if (value === true || value === 1) return 1;
  throw new Error(`${label} must be true or false`);
}

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function readJson(file: string): unknown {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function listContractFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(name => name.endsWith(".json") && !name.startsWith("_"))
    .sort()
    .map(name => path.join(dir, name));
}

function findPlayer(db: DatabaseSync, playerId: string | null, playerName: string | null, label: string): PlayerHit {
  if (playerId) {
    const row = db.prepare(
      "SELECT player_id, full_name FROM players WHERE player_id = ?"
    ).get(playerId) as PlayerHit | undefined;
    if (!row) throw new Error(`${label}: unknown player_id ${playerId}`);
    return row;
  }
  if (!playerName) throw new Error(`${label}: needs player_id or player_name`);
  const hits = db.prepare(
    "SELECT player_id, full_name FROM players"
  ).all() as unknown as PlayerHit[];
  const key = normalizeName(playerName);
  const matched = hits.filter(player => normalizeName(player.full_name) === key);
  if (matched.length === 1) return matched[0];
  if (matched.length === 0) throw new Error(`${label}: no registry player named ${playerName}`);
  throw new Error(`${label}: ${playerName} matches ${matched.map(player => player.player_id).join(", ")}`);
}

interface ParsedContract {
  contractId: string;
  player: PlayerHit;
  team: string;
  signingYear: number;
  years: number | null;
  totalValue: number | null;
  aav: number | null;
  signingBonus: number | null;
  guaranteeSigning: number | null;
  guaranteeRoster: number | null;
  guaranteeInjury: number | null;
  guaranteeOther: number | null;
  fullyGuaranteed: number | null;
  sourceName: string | null;
  sourceUrl: string | null;
  sourceNote: string | null;
  seasons: ContractYearRow[];
}

function parseContract(
  db: DatabaseSync,
  raw: unknown,
  fileSource: { source_name: string | null; source_url: string | null; source_note: string | null },
  warnings: SeedWarning[]
): ParsedContract {
  const row = asRecord(raw);
  if (!row) throw new Error("contract entry must be an object");
  const contractId = text(row.contract_id);
  if (!contractId) throw new Error("contract_id is required");
  const player = findPlayer(db, text(row.player_id), text(row.player_name), contractId);
  const team = canonicalTeam(text(row.team));
  if (!team) throw new Error(`${contractId}: team must be an NFL abbreviation`);
  const signingYear = dollars(row.signing_year, `${contractId} signing_year`, true);
  if (signingYear === null || signingYear < 1990 || signingYear > 2100) {
    throw new Error(`${contractId}: signing_year is not a season`);
  }
  const seasonsRaw = row.seasons;
  if (!Array.isArray(seasonsRaw) || seasonsRaw.length === 0) {
    throw new Error(`${contractId}: seasons must be a non-empty array`);
  }
  const seen = new Set<number>();
  const seasons: ContractYearRow[] = [];
  for (const item of seasonsRaw) {
    const year = asRecord(item);
    if (!year) throw new Error(`${contractId}: season entry must be an object`);
    const season = dollars(year.season, `${contractId} season`, true)!;
    if (seen.has(season)) throw new Error(`${contractId}: duplicate season ${season}`);
    seen.add(season);
    const teamOption = flag(year.team_option, `${contractId} ${season} team_option`);
    const playerOption = flag(year.player_option, `${contractId} ${season} player_option`);
    if (teamOption && playerOption) {
      warnings.push({ code: "OPTION_BOTH", detail: `${contractId} ${season} has team and player option` });
    }
    seasons.push({
      season,
      cap_hit: dollars(year.cap_hit, `${contractId} ${season} cap_hit`, true)!,
      dead_money: dollars(year.dead_money, `${contractId} ${season} dead_money`, false),
      base_salary: dollars(year.base_salary, `${contractId} ${season} base_salary`, false),
      signing_bonus_proration: dollars(year.signing_bonus_proration, `${contractId} ${season} signing_bonus_proration`, false),
      option_bonus_proration: dollars(year.option_bonus_proration, `${contractId} ${season} option_bonus_proration`, false),
      roster_bonus: dollars(year.roster_bonus, `${contractId} ${season} roster_bonus`, false),
      workout_bonus: dollars(year.workout_bonus, `${contractId} ${season} workout_bonus`, false),
      other_bonus: dollars(year.other_bonus, `${contractId} ${season} other_bonus`, false),
      guarantee_signing: dollars(year.guarantee_signing, `${contractId} ${season} guarantee_signing`, false),
      guarantee_roster: dollars(year.guarantee_roster, `${contractId} ${season} guarantee_roster`, false),
      guarantee_injury: dollars(year.guarantee_injury, `${contractId} ${season} guarantee_injury`, false),
      guarantee_other: dollars(year.guarantee_other, `${contractId} ${season} guarantee_other`, false),
      team_option: teamOption,
      player_option: playerOption,
      void_year: flag(year.void_year, `${contractId} ${season} void_year`),
      cap_active_while_roster_retired: flag(
        year.cap_active_while_roster_retired,
        `${contractId} ${season} cap_active_while_roster_retired`
      )
    });
  }
  const term = dollars(row.years, `${contractId} years`, false);
  const nonVoid = seasons.filter(year => !year.void_year).length;
  if (term !== null && term !== nonVoid) {
    warnings.push({
      code: "CONTRACT_TERM_MISMATCH",
      detail: `${contractId}: years ${term} but ${nonVoid} non-void season rows`
    });
  }
  return {
    contractId,
    player,
    team,
    signingYear,
    years: term,
    totalValue: dollars(row.total_value, `${contractId} total_value`, false),
    aav: dollars(row.aav, `${contractId} aav`, false),
    signingBonus: dollars(row.signing_bonus, `${contractId} signing_bonus`, false),
    guaranteeSigning: dollars(row.guarantee_signing, `${contractId} guarantee_signing`, false),
    guaranteeRoster: dollars(row.guarantee_roster, `${contractId} guarantee_roster`, false),
    guaranteeInjury: dollars(row.guarantee_injury, `${contractId} guarantee_injury`, false),
    guaranteeOther: dollars(row.guarantee_other, `${contractId} guarantee_other`, false),
    fullyGuaranteed: dollars(row.fully_guaranteed, `${contractId} fully_guaranteed`, false),
    sourceName: text(row.source_name) ?? fileSource.source_name,
    sourceUrl: text(row.source_url) ?? fileSource.source_url,
    sourceNote: text(row.source_note) ?? fileSource.source_note,
    seasons
  };
}

function clearContractRows(db: DatabaseSync): void {
  db.exec("DELETE FROM contract_years");
  db.exec("DELETE FROM contracts");
  db.exec("DELETE FROM team_cap_adjustments");
  db.exec("DELETE FROM team_cap_ledger");
  db.exec("DELETE FROM salary_cap");
}

/**
 * Replace contract and cap rows from data/roster/cap and data/roster/contracts.
 * Does not open a transaction and does not touch players, ratings, locks, or baselines.
 * An empty contracts directory leaves every player without a deal.
 */
export function importContractSnapshot(db: DatabaseSync, options: ImportOptions): ImportResult {
  const warnings: SeedWarning[] = [];
  const contractsDir = options.contractsDir ?? path.join(options.root, "data", "roster", "contracts");
  const capFile = options.capFile ?? path.join(options.root, "data", "roster", "cap", "league-cap.json");
  const importedAt = new Date().toISOString();
  clearContractRows(db);

  if (fs.existsSync(capFile)) {
    const parsed = asRecord(readJson(capFile));
    const seasons = parsed && Array.isArray(parsed.seasons) ? parsed.seasons : null;
    if (!seasons) throw new Error(`${capFile}: seasons array is required`);
    const insertCap = db.prepare(`
      INSERT INTO salary_cap(season, league_cap, accounting_rule, source_name, source_url, note)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    for (const item of seasons) {
      const row = asRecord(item);
      if (!row) throw new Error(`${capFile}: season entry must be an object`);
      const season = dollars(row.season, "league cap season", true)!;
      const leagueCap = dollars(row.league_cap, `league cap ${season}`, true)!;
      const rule = text(row.accounting_rule) ?? "in_season";
      if (rule !== "in_season" && rule !== "top51") {
        throw new Error(`league cap ${season}: accounting_rule must be in_season or top51`);
      }
      insertCap.run(season, leagueCap, rule, text(row.source_name), text(row.source_url), text(row.note));
    }
  }

  const insertContract = db.prepare(`
    INSERT INTO contracts(
      contract_id, player_id, team_abbr, signing_year, years, total_value, aav, signing_bonus,
      guarantee_signing, guarantee_roster, guarantee_injury, guarantee_other, fully_guaranteed,
      source_name, source_url, source_note, imported_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertYear = db.prepare(`
    INSERT INTO contract_years(
      contract_id, season, cap_hit, dead_money, base_salary, signing_bonus_proration,
      option_bonus_proration, roster_bonus, workout_bonus, other_bonus,
      guarantee_signing, guarantee_roster, guarantee_injury, guarantee_other,
      team_option, player_option, void_year, cap_active_while_roster_retired
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertAdjustment = db.prepare(`
    INSERT INTO team_cap_adjustments(team_abbr, season, carryover, adjustments, note)
    VALUES (?, ?, ?, ?, ?)
  `);

  let contracts = 0;
  let contractYears = 0;
  const seenIds = new Set<string>();
  for (const file of listContractFiles(contractsDir)) {
    const parsed = asRecord(readJson(file));
    if (!parsed || !Array.isArray(parsed.contracts)) {
      throw new Error(`${file}: contracts array is required`);
    }
    const fileSource = {
      source_name: text(parsed.source_name),
      source_url: text(parsed.source_url),
      source_note: text(parsed.source_note)
    };
    for (const raw of parsed.contracts) {
      const deal = parseContract(db, raw, fileSource, warnings);
      if (seenIds.has(deal.contractId)) throw new Error(`duplicate contract_id ${deal.contractId}`);
      seenIds.add(deal.contractId);
      insertContract.run(
        deal.contractId,
        deal.player.player_id,
        deal.team,
        deal.signingYear,
        deal.years,
        deal.totalValue,
        deal.aav,
        deal.signingBonus,
        deal.guaranteeSigning,
        deal.guaranteeRoster,
        deal.guaranteeInjury,
        deal.guaranteeOther,
        deal.fullyGuaranteed,
        deal.sourceName,
        deal.sourceUrl,
        deal.sourceNote,
        importedAt
      );
      for (const year of deal.seasons) {
        insertYear.run(
          deal.contractId,
          year.season,
          year.cap_hit,
          year.dead_money,
          year.base_salary,
          year.signing_bonus_proration,
          year.option_bonus_proration,
          year.roster_bonus,
          year.workout_bonus,
          year.other_bonus,
          year.guarantee_signing,
          year.guarantee_roster,
          year.guarantee_injury,
          year.guarantee_other,
          year.team_option,
          year.player_option,
          year.void_year,
          year.cap_active_while_roster_retired
        );
        contractYears++;
      }
      contracts++;
    }
    if (Array.isArray(parsed.adjustments)) {
      for (const raw of parsed.adjustments) {
        const row = asRecord(raw);
        if (!row) throw new Error(`${file}: adjustment must be an object`);
        const team = canonicalTeam(text(row.team));
        if (!team) throw new Error(`${file}: adjustment team is not an NFL abbreviation`);
        const season = dollars(row.season, "adjustment season", true)!;
        insertAdjustment.run(
          team,
          season,
          signedDollars(row.carryover ?? 0, "carryover"),
          signedDollars(row.adjustments ?? 0, "adjustments"),
          text(row.note)
        );
      }
    }
  }

  refreshCapLedger(db);
  const capSeasons = Number((db.prepare("SELECT COUNT(*) AS n FROM salary_cap").get() as { n: number }).n);
  return { contracts, contractYears, capSeasons, warnings };
}

export function loadCapSheet(
  db: DatabaseSync,
  team: string,
  season: number,
  rule: AccountingRule
): CapSheet {
  const cap = db.prepare(
    "SELECT league_cap, accounting_rule FROM salary_cap WHERE season = ?"
  ).get(season) as { league_cap: number; accounting_rule: AccountingRule } | undefined;
  if (!cap) throw new Error(`No league cap is loaded for ${season}. Import data/roster/cap/league-cap.json.`);
  const club = canonicalTeam(team);
  if (!club) throw new Error(`Unknown team ${team}`);
  const adjustment = db.prepare(
    "SELECT carryover, adjustments FROM team_cap_adjustments WHERE team_abbr = ? AND season = ?"
  ).get(club, season) as { carryover: number; adjustments: number } | undefined;
  const rows = db.prepare(`
    SELECT
      c.player_id,
      p.full_name,
      c.team_abbr,
      cy.cap_hit,
      cy.dead_money,
      cy.void_year,
      cy.cap_active_while_roster_retired,
      m.status AS membership_status,
      m.team_abbr AS membership_team
    FROM contract_years cy
    JOIN contracts c ON c.contract_id = cy.contract_id
    JOIN players p ON p.player_id = c.player_id
    LEFT JOIN roster_membership m ON m.player_id = c.player_id AND m.season = ?
    WHERE cy.season = ? AND c.team_abbr = ?
  `).all(season, season, club) as {
    player_id: string;
    full_name: string;
    team_abbr: string;
    cap_hit: number;
    dead_money: number | null;
    void_year: number;
    cap_active_while_roster_retired: number;
    membership_status: string | null;
    membership_team: string | null;
  }[];

  const charges: CapPlayerCharge[] = rows.map(row => {
    let status = row.membership_status;
    if (row.membership_team && row.membership_team !== row.team_abbr) status = "off_roster";
    return {
      playerId: row.player_id,
      playerName: row.full_name,
      capHit: row.cap_hit,
      deadMoney: row.dead_money,
      voidYear: row.void_year === 1,
      membershipStatus: status,
      capActiveWhileRosterRetired: row.cap_active_while_roster_retired === 1
    };
  });

  return buildCapSheet({
    leagueCap: cap.league_cap,
    carryover: adjustment?.carryover ?? 0,
    adjustments: adjustment?.adjustments ?? 0,
    rule,
    charges
  });
}

export function defaultAccountingRule(db: DatabaseSync, season: number): AccountingRule {
  const row = db.prepare(
    "SELECT accounting_rule FROM salary_cap WHERE season = ?"
  ).get(season) as { accounting_rule?: AccountingRule } | undefined;
  return row?.accounting_rule === "top51" ? "top51" : "in_season";
}

function refreshCapLedger(db: DatabaseSync): void {
  db.exec("DELETE FROM team_cap_ledger");
  const seasons = db.prepare(
    "SELECT season, accounting_rule, league_cap FROM salary_cap"
  ).all() as { season: number; accounting_rule: AccountingRule; league_cap: number }[];
  const insert = db.prepare(`
    INSERT INTO team_cap_ledger(
      team_abbr, season, accounting_rule, league_cap, carryover, adjustments,
      committed, dead_money, cap_space, players_counted, players_excluded, note
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const cap of seasons) {
    const teams = new Set<string>();
    const fromDeals = db.prepare(`
      SELECT DISTINCT c.team_abbr AS team
      FROM contracts c
      JOIN contract_years cy ON cy.contract_id = c.contract_id
      WHERE cy.season = ?
    `).all(cap.season) as { team: string }[];
    const fromAdj = db.prepare(
      "SELECT team_abbr AS team FROM team_cap_adjustments WHERE season = ?"
    ).all(cap.season) as { team: string }[];
    for (const row of [...fromDeals, ...fromAdj]) teams.add(row.team);
    for (const team of teams) {
      const sheet = loadCapSheet(db, team, cap.season, cap.accounting_rule);
      insert.run(
        team,
        cap.season,
        sheet.rule,
        sheet.leagueCap,
        sheet.carryover,
        sheet.adjustments,
        sheet.committed,
        sheet.deadMoney,
        sheet.capSpace,
        sheet.counted.length,
        sheet.excluded.length,
        "derived from imported cap hits"
      );
    }
  }
}

export function findPlayerContracts(db: DatabaseSync, query: string, season: number): PlayerContract[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const byId = db.prepare(`
    SELECT c.contract_id
    FROM contracts c
    JOIN players p ON p.player_id = c.player_id
    WHERE c.player_id = ? OR p.full_name = ? COLLATE NOCASE
    ORDER BY c.signing_year DESC, c.contract_id
  `).all(trimmed, trimmed) as { contract_id: string }[];
  const ids = byId.length
    ? byId
    : (db.prepare(`
        SELECT c.contract_id
        FROM contracts c
        JOIN players p ON p.player_id = c.player_id
        WHERE p.full_name LIKE ? COLLATE NOCASE
        ORDER BY p.full_name, c.signing_year DESC
      `).all(`%${trimmed}%`) as { contract_id: string }[]);
  return ids.map(row => loadContract(db, row.contract_id, season)).filter((row): row is PlayerContract => Boolean(row));
}

function loadContract(db: DatabaseSync, contractId: string, season: number): PlayerContract | null {
  const row = db.prepare(`
    SELECT
      c.*,
      p.full_name AS player_name,
      p.birth_date,
      p.position_bucket,
      r.ovr
    FROM contracts c
    JOIN players p ON p.player_id = c.player_id
    LEFT JOIN rating_cards r
      ON r.player_id = c.player_id
     AND (p.position_bucket IS NULL OR r.position = p.position_bucket)
    WHERE c.contract_id = ?
  `).get(contractId) as (PlayerContract & { position_bucket: string | null; birth_date: string | null }) | undefined;
  if (!row) return null;
  const seasons = db.prepare(`
    SELECT season, cap_hit, dead_money, base_salary, signing_bonus_proration, option_bonus_proration,
      roster_bonus, workout_bonus, other_bonus, guarantee_signing, guarantee_roster, guarantee_injury,
      guarantee_other, team_option, player_option, void_year, cap_active_while_roster_retired
    FROM contract_years
    WHERE contract_id = ?
    ORDER BY season
  `).all(contractId) as unknown as ContractYearRow[];
  return {
    contract_id: row.contract_id,
    player_id: row.player_id,
    player_name: row.player_name,
    birth_date: row.birth_date,
    age: ageOnSeptember1(row.birth_date, season),
    team_abbr: row.team_abbr,
    position: row.position_bucket,
    ovr: row.ovr ?? null,
    signing_year: row.signing_year,
    years: row.years,
    total_value: row.total_value,
    aav: row.aav,
    signing_bonus: row.signing_bonus,
    guarantee_signing: row.guarantee_signing,
    guarantee_roster: row.guarantee_roster,
    guarantee_injury: row.guarantee_injury,
    guarantee_other: row.guarantee_other,
    fully_guaranteed: row.fully_guaranteed,
    source_name: row.source_name,
    source_url: row.source_url,
    source_note: row.source_note,
    seasons
  };
}

export function capSummary(db: DatabaseSync, season: number | null): {
  contracts: number;
  contract_years: number;
  cap_seasons: number;
  league_cap: number | null;
  accounting_rule: string | null;
  teams_with_contracts: number;
} {
  const count = (sql: string) => Number((db.prepare(sql).get() as { n: number }).n);
  const cap = season === null
    ? undefined
    : db.prepare(
      "SELECT league_cap, accounting_rule FROM salary_cap WHERE season = ?"
    ).get(season) as { league_cap: number; accounting_rule: string } | undefined;
  const latest = cap ?? db.prepare(
    "SELECT league_cap, accounting_rule FROM salary_cap ORDER BY season DESC LIMIT 1"
  ).get() as { league_cap: number; accounting_rule: string } | undefined;
  return {
    contracts: count("SELECT COUNT(*) AS n FROM contracts"),
    contract_years: count("SELECT COUNT(*) AS n FROM contract_years"),
    cap_seasons: count("SELECT COUNT(*) AS n FROM salary_cap"),
    league_cap: latest?.league_cap ?? null,
    accounting_rule: latest?.accounting_rule ?? null,
    teams_with_contracts: count("SELECT COUNT(DISTINCT team_abbr) AS n FROM contracts")
  };
}
