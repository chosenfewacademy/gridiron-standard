import { resolvePlayer, findTeamPlayers } from "./player-resolver.js";
import type { Intent } from "./router.js";

export function resolveIntent(intent: Intent): Record<string, unknown> {
  if (intent.type === "FULL_PLAYER_AUDIT" ||
      intent.type === "RATINGS_ONLY" ||
      intent.type === "QUICK_RECHECK") {
    const resolution = resolvePlayer(intent.query);

    if (resolution.status === "NOT_FOUND") {
      return {
        status: "NEEDS_ROSTER_REFRESH",
        reason: "PLAYER_NOT_FOUND",
        query: intent.query
      };
    }

    if (resolution.status === "AMBIGUOUS") {
      return {
        status: "AMBIGUOUS",
        query: intent.query,
        candidates: resolution.candidates
      };
    }

    return {
      status: "RESOLVED",
      intent: intent.type,
      player: resolution.player
    };
  }

  return { status: "PASS_THROUGH", intent };
}

export function resolveTeamQuery(team: string, position?: string): Record<string, unknown> {
  const players = findTeamPlayers(team, position);
  return {
    status: players.length ? "RESOLVED" : "NEEDS_ROSTER_REFRESH",
    team: team.toUpperCase(),
    position: position?.toUpperCase() ?? null,
    players
  };
}
