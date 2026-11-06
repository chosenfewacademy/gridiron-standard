import fs from "node:fs";
import path from "node:path";
import type { DatabaseSync } from "./db.js";

/** Reloads the Dallas cards and depth chart. Does not rewrite a locked card. */

export interface DalRestoreResult {
  inserted_players: number;
  inserted_cards: number;
  depth_rows: number;
}

interface DalCard {
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
  locked?: boolean;
  identity?: { player_id: string; full_name: string; position_bucket: string | null } | null;
}

interface DalDepth {
  player_name: string;
  player_id: string | null;
  pos_abb: string;
  pos_rank: number;
  pos_grp: string | null;
  snapshot_dt: string | null;
  source: string | null;
}

export function restoreDalCanonical(db: DatabaseSync, root: string, season: number): DalRestoreResult {
  const empty = { inserted_players: 0, inserted_cards: 0, depth_rows: 0 };
  const file = path.join(root, "data", "roster", "dal-full-ratings-import.json");
  if (!fs.existsSync(file)) return empty;
  const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as { cards: DalCard[]; depth: DalDepth[] };
  if (!Array.isArray(parsed.cards) || !Array.isArray(parsed.depth)) return empty;
  db.exec(`
    CREATE TABLE IF NOT EXISTS depth_chart(
      team_abbr TEXT, snapshot_dt TEXT, player_id TEXT, player_name TEXT,
      gsis_id TEXT, pos_grp TEXT, pos_abb TEXT, pos_name TEXT, pos_rank INTEGER, source TEXT
    )
  `);
  const findPlayer = db.prepare("SELECT player_id FROM players WHERE player_id = ?");
  const findByName = db.prepare("SELECT player_id FROM players WHERE team_abbr = 'DAL' AND full_name = ?");
  const insertPlayer = db.prepare(`
    INSERT INTO players(
      player_id, full_name, team_abbr, raw_team, position_bucket, roster_status,
      requires_role_resolution
    ) VALUES (?, ?, 'DAL', 'DAL', ?, 'ACT', 0)
  `);
  const insertMembership = db.prepare(`
    INSERT OR IGNORE INTO roster_membership(player_id, team_abbr, season, status, raw_roster_status, source)
    VALUES (?, 'DAL', ?, 'active', 'ACT', 'dal_canonical')
  `);
  const setBucket = db.prepare(
    "UPDATE players SET position_bucket = ?, depth_chart_position = ? WHERE player_id = ? AND team_abbr = 'DAL'"
  );
  const findCard = db.prepare(
    "SELECT card_id, ovr, pool_role, attributes_json FROM rating_cards WHERE card_id = ?"
  );
  const insertCard = db.prepare(`
    INSERT INTO rating_cards(
      card_id, player_id, player_name, position, ovr, audit_proposed_ovr, confidence,
      style_profile, weaknesses_json, source_audit_id, source_task_id, source_baseline_file,
      card_origin, pool_role, reference_only, attributes_json, seeded_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
  `);
  const insertAttr = db.prepare(
    "INSERT INTO rating_attributes(card_id, attribute, rating, confidence) VALUES (?, ?, ?, 'dal_canonical')"
  );
  let insertedPlayers = 0;
  let insertedCards = 0;
  const resolved = new Map<string, string>();
  for (const card of parsed.cards) {
    let playerId = (findPlayer.get(card.player_id) as { player_id: string } | undefined)?.player_id ?? null;
    if (!playerId) {
      playerId = (findByName.get(card.player_name) as { player_id: string } | undefined)?.player_id ?? null;
    }
    if (!playerId && card.identity) {
      insertPlayer.run(card.identity.player_id, card.identity.full_name, card.position);
      insertMembership.run(card.identity.player_id, season);
      insertedPlayers++;
      playerId = card.identity.player_id;
    }
    if (!playerId) continue;
    resolved.set(card.player_name, playerId);
    setBucket.run(card.position, card.position, playerId);
    const existing = findCard.get(card.card_id) as { ovr: number; pool_role: string; attributes_json: string } | undefined;
    if (existing) continue;
    if (card.locked || card.pool_role === "TOP10" || card.pool_role === "EXTERNAL_CONTROL" || card.pool_role === "FIRST_OUT") {
      continue;
    }
    insertCard.run(
      card.card_id, playerId, card.player_name, card.position, card.ovr, card.ovr, card.confidence,
      card.style_profile, card.weaknesses ? JSON.stringify(card.weaknesses) : null,
      card.source_audit_id, card.source_task_id, card.source_baseline_file, card.card_origin, card.pool_role,
      JSON.stringify(card.attributes), new Date().toISOString()
    );
    for (const [attribute, rating] of Object.entries(card.attributes)) {
      if (!Number.isInteger(rating)) continue;
      insertAttr.run(card.card_id, attribute, rating);
    }
    insertedCards++;
  }
  db.exec("DELETE FROM depth_chart WHERE team_abbr = 'DAL'");
  const insertDepth = db.prepare(`
    INSERT INTO depth_chart(team_abbr, snapshot_dt, player_id, player_name, gsis_id, pos_grp, pos_abb, pos_name, pos_rank, source)
    VALUES ('DAL', ?, ?, ?, NULL, ?, ?, ?, ?, ?)
  `);
  const labels: Record<string, string> = {
    QB: "Quarterback", RB: "Running Back", FB: "Fullback", WR: "Wide Receiver", TE: "Tight End",
    LT: "Left Tackle", LG: "Left Guard", C: "Center", RG: "Right Guard", RT: "Right Tackle",
    LEDGE: "Left Edge", REDGE: "Right Edge", DT: "Defensive Tackle", MIKE: "Mike", WILL: "Will",
    CB: "Cornerback", FS: "Free Safety", SS: "Strong Safety", K: "Kicker", P: "Punter", LS: "Long Snapper"
  };
  for (const slot of parsed.depth) {
    insertDepth.run(
      slot.snapshot_dt, resolved.get(slot.player_name) ?? slot.player_id, slot.player_name,
      slot.pos_grp, slot.pos_abb, labels[slot.pos_abb] ?? slot.pos_abb, slot.pos_rank, slot.source
    );
  }
  return { inserted_players: insertedPlayers, inserted_cards: insertedCards, depth_rows: parsed.depth.length };
}
