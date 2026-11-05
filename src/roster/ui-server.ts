import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ageOnSeptember1 } from "./cap.js";
import {
  defaultAccountingRule,
  findPlayerContracts,
  importContractSnapshot,
  loadCapSheet,
  type PlayerContract
} from "./contracts.js";
import { defaultDbPath, migrate, openRosterDb, type DatabaseSync } from "./db.js";
import { normalizeName } from "./names.js";
import { latestSeason, loadAttributes, queryRoster, rosterStatus, type AttributeRow } from "./query.js";
import { seedRoster } from "./seed.js";
import { canonicalTeam } from "./teams.js";

const UI_DIR = fileURLToPath(new URL("../../roster/ui/", import.meta.url));
const STATIC: Record<string, { file: string; type: string }> = {
  "/": { file: "index.html", type: "text/html; charset=utf-8" },
  "/index.html": { file: "index.html", type: "text/html; charset=utf-8" },
  "/app.js": { file: "app.js", type: "text/javascript; charset=utf-8" },
  "/styles.css": { file: "styles.css", type: "text/css; charset=utf-8" }
};

export interface UiResponse {
  status: number;
  contentType: string;
  body: string;
}

function json(status: number, body: unknown): UiResponse {
  return { status, contentType: "application/json; charset=utf-8", body: JSON.stringify(body) };
}

function count(db: DatabaseSync, sql: string): number {
  return Number((db.prepare(sql).get() as { n: number }).n);
}

/** Open the roster database, migrate, and seed only when the file is new or empty. */
export function ensureRosterDatabase(file: string, root: string): DatabaseSync {
  const existed = fs.existsSync(file);
  const db = openRosterDb(file);
  migrate(db);
  if (!existed || count(db, "SELECT COUNT(*) AS n FROM seed_runs") === 0) {
    console.log(`Seeding ${file}`);
    seedRoster(db, { root });
    return db;
  }
  if (count(db, "SELECT COUNT(*) AS n FROM salary_cap") === 0 && fs.existsSync(path.join(root, "data", "roster", "cap", "league-cap.json"))) {
    console.log("Loading cap and contract files into the existing roster database");
    db.exec("BEGIN IMMEDIATE");
    try {
      importContractSnapshot(db, { root });
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
  }
  return db;
}

function attributeOrder(root: string, position: string | null): string[] {
  if (!position) return [];
  const file = path.join(root, "config", "madden-entry-order.json");
  if (!fs.existsSync(file)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as { positions?: Record<string, string[]> };
    return (parsed.positions?.[position] ?? []).filter(attribute => attribute !== "OVR");
  } catch {
    return [];
  }
}

function sortAttributes(rows: AttributeRow[], order: string[]): AttributeRow[] {
  const rank = new Map(order.map((attribute, index) => [attribute, index]));
  return [...rows].sort((a, b) => {
    const ar = rank.get(a.attribute) ?? 1000;
    const br = rank.get(b.attribute) ?? 1000;
    if (ar !== br) return ar - br;
    return a.attribute.localeCompare(b.attribute);
  });
}

function playerDetail(db: DatabaseSync, root: string, playerId: string, season: number): Record<string, unknown> | null {
  const player = db.prepare(`
    SELECT player_id, full_name, team_abbr, position_bucket, roster_status, jersey_number,
      birth_date, height_in, weight_lb, college, years_exp, gsis_id
    FROM players WHERE player_id = ?
  `).get(playerId) as Record<string, unknown> | undefined;
  if (!player) return null;
  const position = typeof player.position_bucket === "string" ? player.position_bucket : null;
  const card = db.prepare(`
    SELECT card_id, ovr, madden_ovr, delta_ovr, baseline_rank, pool_role, source_audit_id,
      source_baseline_file, style_profile, confidence, position
    FROM rating_cards
    WHERE player_id = ? AND (? IS NULL OR position = ?)
    ORDER BY ovr DESC
    LIMIT 1
  `).get(playerId, position, position) as Record<string, unknown> | undefined;
  const attributes = card?.card_id
    ? sortAttributes(loadAttributes(db, [String(card.card_id)]).get(String(card.card_id)) ?? [], attributeOrder(root, String(card.position ?? position)))
    : [];
  const contracts = findPlayerContracts(db, playerId, season);
  const membership = db.prepare(
    "SELECT status, team_abbr, raw_roster_status FROM roster_membership WHERE player_id = ? AND season = ?"
  ).get(playerId, season) as { status: string; team_abbr: string | null; raw_roster_status: string | null } | undefined;
  return {
    ...player,
    age: ageOnSeptember1(typeof player.birth_date === "string" ? player.birth_date : null, season),
    membership: membership ?? null,
    card: card ?? null,
    attributes,
    contracts
  };
}

function searchPlayers(db: DatabaseSync, q: string): unknown[] {
  const trimmed = q.trim();
  if (!trimmed) return [];
  return db.prepare(`
    SELECT
      p.player_id,
      p.full_name,
      p.team_abbr,
      p.position_bucket,
      c.ovr,
      c.madden_ovr,
      c.delta_ovr,
      m.status AS membership_status
    FROM players p
    LEFT JOIN rating_cards c
      ON c.player_id = p.player_id
     AND (p.position_bucket IS NULL OR c.position = p.position_bucket)
    LEFT JOIN roster_membership m ON m.player_id = p.player_id
    WHERE p.full_name LIKE ? COLLATE NOCASE OR p.player_id = ?
    ORDER BY (c.ovr IS NULL), c.ovr DESC, p.full_name
    LIMIT 40
  `).all(`%${trimmed}%`, trimmed);
}

export function handleRosterRequest(
  db: DatabaseSync,
  method: string,
  pathname: string,
  query: URLSearchParams,
  options: { root?: string } = {}
): UiResponse {
  if (method !== "GET" && method !== "HEAD") {
    return json(405, { error: "This roster UI is read-only." });
  }
  const root = options.root ?? process.cwd();
  const staticFile = STATIC[pathname];
  if (staticFile) {
    const body = fs.readFileSync(path.join(UI_DIR, staticFile.file), "utf8");
    return { status: 200, contentType: staticFile.type, body: method === "HEAD" ? "" : body };
  }
  if (!pathname.startsWith("/api/")) return json(404, { error: "Not found." });

  try {
    const season = query.get("season") ? Number(query.get("season")) : latestSeason(db);
    if (pathname === "/api/bootstrap") {
      const status = rosterStatus(db);
      const teams = db.prepare(`
        SELECT abbr, name, city, nickname, conference, division, primary_color, secondary_color, accent_color
        FROM teams
        ORDER BY conference, division, name
      `).all();
      const positions = (db.prepare(
        "SELECT position FROM position_baselines ORDER BY rowid"
      ).all() as { position: string }[]).map(row => row.position);
      return json(200, {
        season: status.season ?? season,
        teams,
        positions,
        players: status.players,
        rating_cards: status.rating_cards,
        contracts: status.contracts,
        league_cap: status.league_cap,
        accounting_rule: status.accounting_rule,
        teams_with_contracts: status.teams_with_contracts
      });
    }
    if (pathname === "/api/depth") {
      const team = canonicalTeam(query.get("team"));
      if (!team) return json(400, { error: "team is required" });
      const table = db.prepare(
        "SELECT 1 AS ok FROM sqlite_master WHERE type = 'table' AND name = 'depth_chart'"
      ).get() as { ok: number } | undefined;
      if (!table) return json(200, []);
      const slots = db.prepare(`
        SELECT
          d.pos_abb AS position,
          d.pos_rank AS rank,
          d.player_name AS player_name,
          d.player_id AS player_id,
          c.ovr AS ovr,
          c.position AS card_position
        FROM depth_chart d
        LEFT JOIN rating_cards c ON c.card_id = (
          SELECT card_id FROM rating_cards
          WHERE player_id = d.player_id
            AND (position = d.pos_abb OR player_name = d.player_name)
          ORDER BY CASE WHEN position = d.pos_abb THEN 0 ELSE 1 END
          LIMIT 1
        )
        WHERE d.team_abbr = ?
        ORDER BY d.pos_abb, d.pos_rank
      `).all(team);
      return json(200, slots);
    }
    if (pathname === "/api/roster") {
      const team = query.get("team");
      if (!team) return json(400, { error: "team is required" });
      return json(200, queryRoster(db, {
        team,
        position: query.get("position") ?? undefined,
        season,
        status: "on-roster",
        limit: 400
      }));
    }
    if (pathname === "/api/top10") {
      const position = query.get("position");
      if (!position) return json(400, { error: "position is required" });
      return json(200, queryRoster(db, { position, top10: true, season, limit: 10 }));
    }
    if (pathname === "/api/search") {
      return json(200, searchPlayers(db, query.get("q") ?? ""));
    }
    if (pathname === "/api/player") {
      const id = query.get("id");
      const name = query.get("name");
      if (!id && !name) return json(400, { error: "id or name is required" });
      if (id) {
        const detail = playerDetail(db, root, id, season);
        return detail ? json(200, detail) : json(404, { error: "Player not found." });
      }
      const hits = db.prepare(
        "SELECT player_id, full_name FROM players"
      ).all() as { player_id: string; full_name: string }[];
      const key = normalizeName(name ?? "");
      const matched = hits.filter(player => normalizeName(player.full_name) === key
        || normalizeName(player.full_name).includes(key));
      const exact = matched.filter(player => normalizeName(player.full_name) === key);
      const chosen = exact.length === 1 ? exact : matched.length === 1 ? matched : [];
      if (chosen.length !== 1) return json(200, { matches: (exact.length ? exact : matched).slice(0, 20) });
      const detail = playerDetail(db, root, chosen[0].player_id, season);
      return detail ? json(200, detail) : json(404, { error: "Player not found." });
    }
    if (pathname === "/api/cap") {
      const team = query.get("team");
      if (!team || !canonicalTeam(team)) return json(400, { error: "team is required" });
      const requested = query.get("rule");
      if (requested && requested !== "in_season" && requested !== "top51") {
        return json(400, { error: "rule must be in_season or top51" });
      }
      const rule = requested === "top51" || requested === "in_season"
        ? requested
        : defaultAccountingRule(db, season);
      return json(200, { team: canonicalTeam(team), season, ...loadCapSheet(db, team, season, rule) });
    }
    if (pathname === "/api/contract") {
      const player = query.get("player") ?? query.get("id") ?? "";
      if (!player) return json(400, { error: "player is required" });
      const deals: PlayerContract[] = findPlayerContracts(db, player, season);
      return json(200, deals);
    }
    return json(404, { error: "Not found." });
  } catch (error) {
    return json(500, { error: error instanceof Error ? error.message : String(error) });
  }
}

function serve(): void {
  const root = path.resolve(process.argv.includes("--root")
    ? process.argv[process.argv.indexOf("--root") + 1]
    : process.cwd());
  const file = path.resolve(process.env.ROSTER_DB?.trim() || defaultDbPath(root));
  const port = Number(process.env.ROSTER_UI_PORT ?? "4173");
  const db = ensureRosterDatabase(file, root);
  const server = http.createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://127.0.0.1");
    const result = handleRosterRequest(db, req.method ?? "GET", url.pathname, url.searchParams, { root });
    res.writeHead(result.status, {
      "Content-Type": result.contentType,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    });
    res.end(result.body);
  });
  server.listen(port, "127.0.0.1", () => {
    console.log(`Roster UI at http://127.0.0.1:${port}`);
    console.log(`Database ${file}`);
  });
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  try {
    serve();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
