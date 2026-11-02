import fs from "node:fs";
import path from "node:path";
import { NflverseRosterSource } from "./nflverse-roster-source.js";
import { refreshRoster } from "./roster-refresh.js";

// Usage: roster:refresh -- [season] [--from-file <csv>] [--add-only] [--dry-run] [--positions C,RG,...] [--names "A B,C D"] [--free-agent] [--id-only]
const args = process.argv.slice(2);
const flag = (n: string) => args.includes(n);
const value = (n: string) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const season = Number(args.find(a => /^\d{4}$/.test(a)) ?? "2026");
const dryRun = flag("--dry-run");

try {
  const result = await refreshRoster(new NflverseRosterSource(season, value("--from-file")), {
    addOnly: flag("--add-only"), idOnly: flag("--id-only"), dryRun, freeAgent: flag("--free-agent"), positions: value("--positions")?.split(",").map(x => x.trim().toUpperCase()),
    names: value("--names")?.split(",").map(x => x.trim()).filter(Boolean)
  });
  if (dryRun) { console.log(JSON.stringify({ season, dry_run: true, ...result }, null, 2)); process.exit(0); }

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
