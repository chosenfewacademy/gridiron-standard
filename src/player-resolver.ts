import fs from "node:fs";
import path from "node:path";

export interface PlayerIdentity {
  player_id: string;
  full_name: string;
  aliases: string[];
  team: string | null;
  position: string | null;
  historical_positions: string[];
  current_audit_id: string | null;
  audit_history: string[];
}

export interface Resolution {
  status: "RESOLVED" | "AMBIGUOUS" | "NOT_FOUND";
  player?: PlayerIdentity;
  candidates?: PlayerIdentity[];
  query: string;
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function loadRegistry(): PlayerIdentity[] {
  const file = path.resolve("data/players/registry.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return data.players as PlayerIdentity[];
}

export function resolvePlayer(
  query: string,
  team?: string,
  position?: string
): Resolution {
  const q = normalize(query);
  const players = loadRegistry();

  const scored = players
    .map(player => {
      const names = [
        player.full_name,
        ...(player.aliases ?? [])
      ].map(normalize);

      let score = 0;
      if (names.includes(q)) score += 100;
      if (normalize(player.full_name).endsWith(" " + q)) score += 70;
      if (normalize(player.full_name).startsWith(q + " ")) score += 50;
      if (normalize(player.full_name).includes(q)) score += 30;

      if (team && player.team?.toUpperCase() === team.toUpperCase()) score += 20;
      if (position && player.position === position.toUpperCase()) score += 20;

      return { player, score };
    })
    .filter(x => x.score > 0)
    .sort((a,b) => b.score - a.score);

  if (!scored.length) return { status: "NOT_FOUND", query };

  const top = scored[0].score;
  const tied = scored.filter(x => x.score === top).map(x => x.player);

  if (tied.length > 1) {
    return { status: "AMBIGUOUS", query, candidates: tied };
  }

  return { status: "RESOLVED", query, player: tied[0] };
}

export function findTeamPlayers(team: string, position?: string): PlayerIdentity[] {
  return loadRegistry().filter(p =>
    p.team?.toUpperCase() === team.toUpperCase() &&
    (!position || p.position === position.toUpperCase())
  );
}
