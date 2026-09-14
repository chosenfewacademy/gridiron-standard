import { getCurrentApprovedCard } from "./player-history.js";
import type { PlayerIdentity } from "./player-resolver.js";

export function ratingsOnly(player: PlayerIdentity): Record<string, unknown> {
  const current = getCurrentApprovedCard(player.player_id);

  if (!current) {
    return {
      status: "FULL_AUDIT_REQUIRED",
      player_id: player.player_id,
      player: player.full_name,
      reason: "No approved current audit exists."
    };
  }

  return {
    status: "OK",
    player_id: player.player_id,
    player: player.full_name,
    position: current.position,
    ovr: current.ovr,
    ratings: current.ratings,
    audit_id: current.current_audit_id,
    methodology_version: current.methodology_version
  };
}
