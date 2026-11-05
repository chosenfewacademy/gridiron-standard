import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { defaultAccountingRule, findPlayerContracts, importContractSnapshot, loadCapSheet } from "./contracts.js";
import { defaultDbPath, migrate, openRosterDb, resetDbFile } from "./db.js";
import { latestSeason, loadAttributes, queryRoster, rosterStatus, type RosterQuery, type RosterRow } from "./query.js";
import { seedRoster } from "./seed.js";

interface Flags {
  [key: string]: string | boolean;
}

function parseArgs(argv: string[]): { command: string; flags: Flags } {
  const [command = "help", ...rest] = argv;
  const flags: Flags = {};
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (!arg.startsWith("--")) throw new Error(`Unexpected argument ${arg}`);
    const eq = arg.indexOf("=");
    if (eq >= 0) {
      flags[arg.slice(2, eq)] = arg.slice(eq + 1);
      continue;
    }
    const key = arg.slice(2);
    const next = rest[i + 1];
    if (next === undefined || next.startsWith("--")) flags[key] = true;
    else {
      flags[key] = next;
      i++;
    }
  }
  return { command, flags };
}

function flagString(flags: Flags, key: string): string | undefined {
  const value = flags[key];
  return typeof value === "string" ? value : undefined;
}

function dbPath(flags: Flags, root: string): string {
  return flagString(flags, "db") ?? defaultDbPath(root);
}

function usage(): string {
  return [
    "Gridiron roster database (derived; locks stay authoritative)",
    "",
    "  npm run roster:seed     [-- --db path] [--season 2026] [--root .]",
    "  npm run roster:import   [-- --db path] [--root .]",
    "  npm run roster:status   [-- --db path] [--json]",
    "  npm run roster:cap      [-- --team PHI] [--season 2026] [--rule in_season|top51] [--json]",
    "  npm run roster:contract [-- --player \"Jalen Hurts\"] [--json]",
    "  npm run roster:query    [-- --team PHI --position WR]",
    "                        [-- --position WR --top10] [--attrs] [--json]",
    "                        [-- --min-ovr 90] [--name Smith] [--status active|IR|PS|FA|other|on-roster|all]",
    "",
    "Team queries default to active, IR, and practice-squad players.",
    "Top-10 and league card queries include every published card.",
    "The sqlite file is rebuilt by roster:seed and is not source of truth."
  ].join("\n");
}

function printStatus(status: ReturnType<typeof rosterStatus>, asJson: boolean): void {
  if (asJson) {
    console.log(JSON.stringify(status, null, 2));
    return;
  }
  if (!status.seeded) {
    console.log("Roster database is empty. Run npm run roster:seed");
    return;
  }
  console.log(`schema ${status.schema_version}  season ${status.season}  seeded ${status.seeded_at}`);
  console.log(`teams ${status.teams}  players ${status.players}  memberships ${status.memberships}`);
  console.log(`rating_cards ${status.rating_cards}  attributes ${status.attribute_rows}  positions ${status.positions}`);
  const capText = status.league_cap == null ? "no league cap loaded" : money(status.league_cap);
  console.log(`contracts ${status.contracts}  contract_years ${status.contract_years}  teams_with_contracts ${status.teams_with_contracts}`);
  console.log(`cap_seasons ${status.cap_seasons}  league_cap ${capText}  rule ${status.accounting_rule ?? "-"}`);
  console.log(`warnings ${status.warnings}  top10_without_team ${status.top10_without_team}`);
  if (Object.keys(status.warning_counts).length) {
    console.log(Object.entries(status.warning_counts).map(([code, n]) => `${code}=${n}`).join("  "));
  }
  for (const row of status.baselines) {
    const newer = row.newer_unselected ? `  newer_unselected=${row.newer_unselected}` : "";
    console.log(`${row.position.padEnd(5)} ${row.cards.toString().padStart(3)} cards  ${row.selection_reason.padEnd(12)} ${row.baseline_file}${newer}`);
  }
}

function printRows(rows: RosterRow[], asJson: boolean): void {
  if (asJson) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }
  if (!rows.length) {
    console.log("no rows");
    return;
  }
  const header = ["Player", "Team", "Pos", "OVR", "EA", "Delta", "Rk", "Status", "Audit"];
  const widths = [26, 4, 5, 4, 4, 5, 3, 8, 32];
  const line = (cells: string[]) => cells.map((cell, i) => {
    const text = cell.length > widths[i] ? cell.slice(0, widths[i]) : cell;
    return text.padEnd(widths[i]);
  }).join("  ");
  console.log(line(header));
  for (const row of rows) {
    console.log(line([
      row.full_name,
      row.team_abbr ?? "-",
      row.position ?? "-",
      row.ovr == null ? "-" : String(row.ovr),
      row.madden_ovr == null ? "-" : String(row.madden_ovr),
      row.delta_ovr == null ? "-" : String(row.delta_ovr),
      row.baseline_rank == null ? "-" : String(row.baseline_rank),
      row.membership_status ?? "-",
      row.source_audit_id ?? "-"
    ]));
    if (row.attributes?.length) {
      console.log("  " + row.attributes.map(attr => {
        const extra = attr.madden_rating == null
          ? ""
          : ` ea ${attr.madden_rating}${attr.delta == null ? "" : ` d ${attr.delta}`}`;
        const tier = attr.tier ? ` ${attr.tier}` : "";
        return `${attr.attribute} ${attr.rating}${extra}${tier}`;
      }).join(" | "));
    }
  }
  console.log(`${rows.length} row${rows.length === 1 ? "" : "s"}`);
}

export function main(argv: string[]): number {
  const { command, flags } = parseArgs(argv);
  if (command === "help" || flags.help === true) {
    console.log(usage());
    return 0;
  }
  const root = path.resolve(flagString(flags, "root") ?? process.cwd());
  const file = path.resolve(dbPath(flags, root));

  if (command === "seed") {
    const season = flagString(flags, "season");
    if (season !== undefined && !/^\d{4}$/.test(season)) throw new Error("--season must be a four-digit year");
    resetDbFile(file);
    const db = openRosterDb(file);
    try {
      migrate(db);
      const result = seedRoster(db, {
        root,
        season: season ? Number(season) : undefined
      });
      console.log(`seeded ${file}`);
      console.log(`season ${result.season}  teams ${result.teams}  players ${result.players}  memberships ${result.memberships}`);
      console.log(`rating_cards ${result.rating_cards}  attributes ${result.attribute_rows}  positions ${result.positions}  warnings ${result.warnings.length}`);
      console.log(`contracts ${result.contracts}  contract_years ${result.contract_years}`);
      return 0;
    } finally {
      db.close();
    }
  }

  if (!fs.existsSync(file)) {
    throw new Error(`No roster database at ${file}. Run npm run roster:seed`);
  }
  const db = openRosterDb(file);
  try {
    migrate(db);
    if (command === "import") {
      db.exec("BEGIN IMMEDIATE");
      try {
        const result = importContractSnapshot(db, { root });
        db.exec("COMMIT");
        console.log(`imported contracts ${result.contracts}  years ${result.contractYears}  cap_seasons ${result.capSeasons}  warnings ${result.warnings.length}`);
        return 0;
      } catch (error) {
        db.exec("ROLLBACK");
        throw error;
      }
    }
    if (command === "status") {
      printStatus(rosterStatus(db), flags.json === true);
      return 0;
    }
    if (command === "query") {
      const min = flagString(flags, "min-ovr");
      const limit = flagString(flags, "limit");
      const status = flagString(flags, "status");
      if (flags.top10 === true && !flagString(flags, "position")) {
        throw new Error("--top10 requires --position");
      }
      if (!flagString(flags, "team") && !flagString(flags, "position") && min === undefined
        && !flagString(flags, "name") && flags.top10 !== true) {
        throw new Error("query needs --team, --position, --min-ovr, --name, or --top10\n" + usage());
      }
      const allowed = new Set(["active", "IR", "PS", "FA", "other", "on-roster", "all"]);
      if (status && !allowed.has(status)) throw new Error(`Unknown --status ${status}`);
      if (min !== undefined && !Number.isFinite(Number(min))) throw new Error("--min-ovr must be a number");
      const seasonFlag = flagString(flags, "season");
      const rows = queryRoster(db, {
        team: flagString(flags, "team"),
        position: flagString(flags, "position"),
        name: flagString(flags, "name"),
        minOvr: min !== undefined ? Number(min) : undefined,
        top10: flags.top10 === true,
        status: status as RosterQuery["status"],
        season: seasonFlag ? Number(seasonFlag) : undefined,
        limit: limit ? Number(limit) : undefined
      });
      if (flags.attrs === true) {
        const attrs = loadAttributes(db, rows.map(row => row.card_id).filter((id): id is string => Boolean(id)));
        for (const row of rows) {
          if (row.card_id) row.attributes = attrs.get(row.card_id) ?? [];
        }
      }
      printRows(rows, flags.json === true);
      return 0;
    }
    if (command === "cap") {
      const team = flagString(flags, "team");
      if (!team) throw new Error("--team is required\n" + usage());
      const seasonFlag = flagString(flags, "season");
      const season = seasonFlag ? Number(seasonFlag) : latestSeason(db);
      const requested = flagString(flags, "rule");
      if (requested && requested !== "in_season" && requested !== "top51") {
        throw new Error("--rule must be in_season or top51");
      }
      const rule = requested === "top51" || requested === "in_season"
        ? requested
        : defaultAccountingRule(db, season);
      const sheet = loadCapSheet(db, team, season, rule);
      if (flags.json === true) {
        console.log(JSON.stringify({ team: team.toUpperCase(), season, ...sheet }, null, 2));
        return 0;
      }
      console.log(`${team.toUpperCase()} ${season}  ${sheet.rule}`);
      console.log(`league cap ${money(sheet.leagueCap)}  carryover ${money(sheet.carryover)}  adjustments ${money(sheet.adjustments)}`);
      console.log(`committed ${money(sheet.committed)}  dead ${money(sheet.deadMoney)}  cap space ${money(sheet.capSpace)}`);
      console.log("Counted");
      for (const line of sheet.counted) console.log(`  ${line.playerName}  ${money(line.amount)}  ${line.reason}`);
      if (!sheet.counted.length) console.log("  none");
      if (sheet.dead.length) {
        console.log("Dead money");
        for (const line of sheet.dead) console.log(`  ${line.playerName}  ${money(line.amount)}  ${line.reason}`);
      }
      if (sheet.excluded.length) {
        console.log("Excluded");
        for (const line of sheet.excluded) console.log(`  ${line.playerName}  ${money(line.amount)}  ${line.reason}`);
      }
      return 0;
    }
    if (command === "contract") {
      const player = flagString(flags, "player");
      if (!player) throw new Error("--player is required\n" + usage());
      const seasonFlag = flagString(flags, "season");
      const season = seasonFlag ? Number(seasonFlag) : latestSeason(db);
      const deals = findPlayerContracts(db, player, season);
      if (!deals.length) {
        console.log(`no imported contract for ${player}`);
        return 0;
      }
      if (flags.json === true) {
        console.log(JSON.stringify(deals, null, 2));
        return 0;
      }
      for (const deal of deals) {
        console.log(`${deal.player_name}  ${deal.team_abbr}  ${deal.position ?? "-"}  OVR ${deal.ovr ?? "-"}  age ${deal.age ?? "-"}`);
        console.log(`id ${deal.contract_id}  signed ${deal.signing_year}  years ${deal.years ?? "-"}  total ${money(deal.total_value)}  AAV ${money(deal.aav)}`);
        console.log(`guarantees signing ${money(deal.guarantee_signing)}  roster ${money(deal.guarantee_roster)}  injury ${money(deal.guarantee_injury)}  other ${money(deal.guarantee_other)}  full ${money(deal.fully_guaranteed)}`);
        if (deal.source_name || deal.source_url) console.log(`source ${deal.source_name ?? ""} ${deal.source_url ?? ""}`.trim());
        for (const year of deal.seasons) {
          const marks = [
            year.void_year ? "void" : "",
            year.team_option ? "team-option" : "",
            year.player_option ? "player-option" : ""
          ].filter(Boolean).join(" ");
          console.log(`  ${year.season}  cap ${money(year.cap_hit)}  dead ${money(year.dead_money)}  base ${money(year.base_salary)} ${marks}`.trim());
        }
      }
      return 0;
    }
    throw new Error(`Unknown command ${command}\n${usage()}`);
  } finally {
    db.close();
  }
}

function money(value: number | null | undefined): string {
  if (value === null || value === undefined) return "-";
  const sign = value < 0 ? "-" : "";
  return `${sign}$${Math.abs(value).toLocaleString("en-US")}`;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  try {
    process.exit(main(process.argv.slice(2)));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
