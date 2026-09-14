import fs from "node:fs";
import path from "node:path";
import { findTeamPlayers } from "./player-resolver.js";
import { getCurrentApprovedCard } from "./player-history.js";

export function createTeamRoomSnapshot(team: string, position: string): Record<string, unknown> {
  const players = findTeamPlayers(team.toUpperCase(), position.toUpperCase());

  const unresolved = players.filter(p => !getCurrentApprovedCard(p.player_id));
  if (unresolved.length) {
    throw new Error(
      `TEAM_ROOM_NOT_READY: ${unresolved.length} player(s) lack approved current cards.`
    );
  }

  const snapshot = {
    team: team.toUpperCase(),
    position: position.toUpperCase(),
    status: "LOCKED",
    locked_at: new Date().toISOString(),
    players: players.map(player => ({
      player_id: player.player_id,
      full_name: player.full_name,
      current_card: getCurrentApprovedCard(player.player_id)
    })),
    mutation_policy: "IMMUTABLE_UNTIL_EXPLICIT_TEAM_ROOM_REAUDIT"
  };

  const dir = path.resolve("data/teams", team.toUpperCase(), "rooms", position.toUpperCase());
  fs.mkdirSync(dir, { recursive: true });

  const versionFile = path.join(
    dir,
    `snapshot_${snapshot.locked_at.replace(/[:.]/g, "-")}.json`
  );
  const currentFile = path.join(dir, "current.json");

  fs.writeFileSync(versionFile, JSON.stringify(snapshot, null, 2) + "\n");
  fs.writeFileSync(currentFile, JSON.stringify(snapshot, null, 2) + "\n");

  return snapshot;
}
