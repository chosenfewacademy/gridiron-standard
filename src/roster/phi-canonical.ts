import fs from "node:fs";
import path from "node:path";
import type { DatabaseSync } from "./db.js";

/**
 * Reloads the completed Philadelphia cards and depth chart after a roster seed.
 * The file is the canonical import. Missing attributes are not invented.
 * Locked overalls are left unchanged when they differ from this record.
 */

export interface PhiRestoreResult {
  inserted_players: number;
  inserted_cards: number;
  refreshed_cards: number;
  depth_rows: number;
}

interface Identity {
  player_id: string;
  full_name: string;
  team_abbr: string | null;
  position_bucket: string | null;
  source_position: string | null;
  depth_chart_position: string | null;
  roster_status: string | null;
  jersey_number: number | null;
  birth_date: string | null;
  height_in: number | null;
  weight_lb: number | null;
  college: string | null;
  years_exp: number | null;
  gsis_id: string | null;
  espn_id: string | null;
  pff_id: string | null;
  pfr_id: string | null;
  aliases_json: string | null;
  historical_positions_json: string | null;
}

interface CanonCard {
  card_id: string;
  player_id: string;
  player_name: string;
  position: string;
  ovr: number;
  pool_role: string;
  confidence: string | null;
  style_profile: string | null;
  weaknesses: string[] | null;
  source_audit_id: string | null;
  source_task_id: string | null;
  source_baseline_file: string;
  card_origin: string;
  attributes: Record<string, number>;
  identity: Identity | null;
}

interface CanonDepth {
  team_abbr: string;
  snapshot_dt: string | null;
  player_id: string | null;
  player_name: string;
  gsis_id: string | null;
  pos_grp: string | null;
  pos_abb: string;
  pos_name: string | null;
  pos_rank: number;
  source: string | null;
}

interface CanonFile {
  cards: CanonCard[];
  depth: CanonDepth[];
}

const EAGLES_DT_BYRON = "nfl_00-0038978";

export function phiCanonicalPath(root: string): string {
  return path.join(root, "data", "roster", "phi-full-ratings-import.json");
}

/** Team-page player routes and direct player routes show one profile and hide the club tables. */
export function exclusivePlayerProfile(hash: string): { id: string; team: string | null } | null {
  const pathOnly = hash.replace(/^#/, "").split("?")[0] ?? "";
  const parts = pathOnly.split("/").filter(Boolean);
  if (parts[0] === "player" && parts[1]) return { id: decodeURIComponent(parts[1]), team: null };
  if (parts[0] === "team" && parts[2] === "player" && parts[3]) {
    return { id: decodeURIComponent(parts[3]), team: parts[1] };
  }
  return null;
}

function loadCanon(root: string): CanonFile | null {
  const file = phiCanonicalPath(root);
  if (!fs.existsSync(file)) return null;
  const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as CanonFile;
  if (!Array.isArray(parsed.cards) || !Array.isArray(parsed.depth)) return null;
  return parsed;
}

function namesFor(card: CanonCard): string[] {
  const names = [card.player_name];
  if (card.player_name === "Nolan Smith Jr.") names.push("Nolan Smith");
  if (card.identity?.full_name && !names.includes(card.identity.full_name)) names.push(card.identity.full_name);
  return names;
}

function sameAttributes(stored: string, attributes: Record<string, number>): boolean {
  const parsed = JSON.parse(stored) as Record<string, number>;
  const keys = new Set([...Object.keys(parsed), ...Object.keys(attributes)]);
  for (const key of keys) if (parsed[key] !== attributes[key]) return false;
  return true;
}

export function restorePhiCanonical(db: DatabaseSync, root: string, season: number): PhiRestoreResult {
  const empty = { inserted_players: 0, inserted_cards: 0, refreshed_cards: 0, depth_rows: 0 };
  const canon = loadCanon(root);
  if (!canon) return empty;
  db.exec(`
    CREATE TABLE IF NOT EXISTS depth_chart(
      team_abbr TEXT, snapshot_dt TEXT, player_id TEXT, player_name TEXT,
      gsis_id TEXT, pos_grp TEXT, pos_abb TEXT, pos_name TEXT, pos_rank INTEGER, source TEXT
    )
  `);

  const findById = db.prepare("SELECT player_id, full_name, team_abbr FROM players WHERE player_id = ?");
  const findByName = db.prepare(
    "SELECT player_id, full_name, team_abbr FROM players WHERE team_abbr = 'PHI' AND full_name = ?"
  );
  const insertPlayer = db.prepare(`
    INSERT INTO players(
      player_id, full_name, team_abbr, raw_team, position_bucket, source_position, depth_chart_position,
      roster_status, jersey_number, birth_date, height_in, weight_lb, college, years_exp,
      gsis_id, espn_id, pff_id, pfr_id, aliases_json, historical_positions_json,
      requires_role_resolution, role_resolution_reason, current_audit_id
    ) VALUES (?, ?, 'PHI', 'PHI', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NULL, NULL)
  `);
  const insertMembership = db.prepare(`
    INSERT OR IGNORE INTO roster_membership(player_id, team_abbr, season, status, raw_roster_status, source)
    VALUES (?, 'PHI', ?, 'active', ?, 'phi_canonical')
  `);
  const setBucket = db.prepare(
    "UPDATE players SET position_bucket = ?, depth_chart_position = ? WHERE player_id = ? AND team_abbr = 'PHI'"
  );
  const findCard = db.prepare(`
    SELECT card_id, player_id, player_name, position, ovr, pool_role, attributes_json
    FROM rating_cards
    WHERE position = ? AND (player_id = ? OR player_name = ? OR player_name = ?)
  `);
  const insertCard = db.prepare(`
    INSERT INTO rating_cards(
      card_id, player_id, player_name, position, ovr, audit_proposed_ovr, confidence,
      style_profile, weaknesses_json, source_audit_id, source_task_id, source_baseline_file,
      card_origin, pool_role, reference_only, attributes_json, seeded_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
  `);
  const updateAttrs = db.prepare(
    "UPDATE rating_cards SET attributes_json = ?, player_id = ? WHERE card_id = ? AND ovr = ?"
  );
  const deleteAttrs = db.prepare("DELETE FROM rating_attributes WHERE card_id = ?");
  const insertAttr = db.prepare(
    "INSERT INTO rating_attributes(card_id, attribute, rating, madden_rating, delta, confidence, tier) VALUES (?, ?, ?, NULL, NULL, 'phi_canonical', NULL)"
  );

  const resolved = new Map<string, string>();
  let insertedPlayers = 0;
  let insertedCards = 0;
  let refreshed = 0;

  for (const card of canon.cards) {
    if (!card.identity || card.identity.player_id !== card.player_id) continue;
    let playerId: string | null = null;
    if (card.player_id === EAGLES_DT_BYRON) {
      const exact = findById.get(EAGLES_DT_BYRON) as { player_id: string } | undefined;
      if (!exact) {
        const id = card.identity;
        insertPlayer.run(
          id.player_id, id.full_name, id.position_bucket, id.source_position, id.depth_chart_position,
          id.roster_status, id.jersey_number, id.birth_date, id.height_in, id.weight_lb, id.college,
          id.years_exp, id.gsis_id, id.espn_id, id.pff_id, id.pfr_id, id.aliases_json, id.historical_positions_json
        );
        insertMembership.run(id.player_id, season, id.roster_status);
        insertedPlayers++;
      }
      playerId = EAGLES_DT_BYRON;
    } else {
      const exact = findById.get(card.player_id) as { player_id: string } | undefined;
      if (exact) playerId = exact.player_id;
      else {
        const hits = namesFor(card).flatMap(name => findByName.all(name) as { player_id: string }[]);
        const unique = [...new Map(hits.map(hit => [hit.player_id, hit])).values()];
        if (unique.length === 1) playerId = unique[0].player_id;
        else if (unique.length === 0) {
          const id = card.identity;
          insertPlayer.run(
            id.player_id, id.full_name, card.position, id.source_position, card.position,
            id.roster_status, id.jersey_number, id.birth_date, id.height_in, id.weight_lb, id.college,
            id.years_exp, id.gsis_id, id.espn_id, id.pff_id, id.pfr_id, id.aliases_json, id.historical_positions_json
          );
          insertMembership.run(id.player_id, season, id.roster_status);
          insertedPlayers++;
          playerId = id.player_id;
        }
      }
    }
    if (!playerId) continue;
    resolved.set(`${card.player_name}|${card.position}`, playerId);
    setBucket.run(card.position, card.position, playerId);

    const alias = card.player_name === "Nolan Smith Jr." ? "Nolan Smith" : card.player_name;
    const existing = findCard.all(card.position, playerId, card.player_name, alias) as {
      card_id: string; ovr: number; pool_role: string; attributes_json: string;
    }[];
    const current = existing.find(row => row.card_id === card.card_id) ?? existing[0];
    if (current && current.ovr !== card.ovr) continue;
    if (current && sameAttributes(current.attributes_json, card.attributes)) continue;
    const cardId = current?.card_id ?? card.card_id;
    if (!current) {
      insertCard.run(
        card.card_id,
        playerId,
        card.player_name,
        card.position,
        card.ovr,
        card.ovr,
        card.confidence,
        card.style_profile,
        card.weaknesses ? JSON.stringify(card.weaknesses) : null,
        card.source_audit_id,
        card.source_task_id,
        card.source_baseline_file,
        card.card_origin,
        card.pool_role,
        JSON.stringify(card.attributes),
        new Date().toISOString()
      );
      insertedCards++;
    } else {
      const changed = updateAttrs.run(JSON.stringify(card.attributes), playerId, cardId, card.ovr);
      if (Number(changed.changes) !== 1) continue;
      refreshed++;
    }
    deleteAttrs.run(cardId);
    for (const [attribute, rating] of Object.entries(card.attributes)) {
      if (!Number.isInteger(rating)) continue;
      insertAttr.run(cardId, attribute, rating);
    }
  }

  db.exec("DELETE FROM depth_chart WHERE team_abbr = 'PHI'");
  const insertDepth = db.prepare(`
    INSERT INTO depth_chart(
      team_abbr, snapshot_dt, player_id, player_name, gsis_id, pos_grp, pos_abb, pos_name, pos_rank, source
    ) VALUES ('PHI', ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const slot of canon.depth) {
    const playerId = resolved.get(`${slot.player_name}|${slot.pos_abb}`)
      ?? (slot.player_id && findById.get(slot.player_id) ? slot.player_id : null)
      ?? [...resolved.entries()].find(([key]) => key.startsWith(`${slot.player_name}|`))?.[1]
      ?? null;
    insertDepth.run(
      slot.snapshot_dt, playerId, slot.player_name, slot.gsis_id, slot.pos_grp, slot.pos_abb, slot.pos_name, slot.pos_rank, slot.source
    );
  }

  return {
    inserted_players: insertedPlayers,
    inserted_cards: insertedCards,
    refreshed_cards: refreshed,
    depth_rows: canon.depth.length
  };
}
