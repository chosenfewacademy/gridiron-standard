import fs from "node:fs";
import path from "node:path";

export function getUnresolvedPositionPlayers(): any[] {
  const file = path.resolve("data/players/unresolved-positions.json");
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8")).players ?? [];
}

export function assignExactPosition(
  playerId: string,
  exactPosition: string,
  evidenceAuditId: string
): void {
  const registryPath = path.resolve("data/players/registry.json");
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const player = registry.players.find((p: any) => p.player_id === playerId);

  if (!player) throw new Error(`Unknown player_id: ${playerId}`);

  player.historical_positions ??= [];
  if (player.position && !player.historical_positions.includes(player.position)) {
    player.historical_positions.push(player.position);
  }
  if (!player.historical_positions.includes(exactPosition)) {
    player.historical_positions.push(exactPosition);
  }

  player.position = exactPosition;
  player.requires_role_resolution = false;
  player.role_resolution_reason = null;
  player.position_resolution_audit_id = evidenceAuditId;
  player.position_resolved_at = new Date().toISOString();

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n");
}
