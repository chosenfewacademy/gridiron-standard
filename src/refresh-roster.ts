import fs from "node:fs";
import path from "node:path";
import { NflverseRosterSource } from "./nflverse-roster-source.js";
import { refreshRoster } from "./roster-refresh.js";

const season = Number(process.argv[2] ?? "2026");

try {
  const result = await refreshRoster(new NflverseRosterSource(season));

  const unresolvedPath = path.resolve("data/players/unresolved-positions.json");
  const registry = JSON.parse(
    fs.readFileSync(path.resolve("data/players/registry.json"), "utf8")
  );

  const unresolved = registry.players
    .filter((p: any) => p.requires_role_resolution)
    .map((p: any) => ({
      player_id: p.player_id,
      full_name: p.full_name,
      team: p.team,
      source_position: p.source_position ?? null,
      depth_chart_position: p.depth_chart_position ?? null,
      reason: p.role_resolution_reason ?? null
    }));

  fs.writeFileSync(
    unresolvedPath,
    JSON.stringify({
      season,
      generated_at: new Date().toISOString(),
      count: unresolved.length,
      players: unresolved
    }, null, 2) + "\n"
  );

  console.log(JSON.stringify({
    season,
    ...result,
    unresolved_exact_madden_positions: unresolved.length
  }, null, 2));
} catch (error) {
  console.error("Roster refresh failed.");
  console.error(error);
  process.exitCode = 1;
}
