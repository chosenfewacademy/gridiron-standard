#!/usr/bin/env node
// Free, deterministic nflverse downloads for Grok Bot research (no API key, no paid calls).
// Usage: node scripts/nflverse-fetch.mjs <dataset> <season>
//   datasets: snap_counts | stats_player_week | stats_player_reg | roster
// Writes ONLY to research-inbox/_cache/ and a .provenance.json with url + retrieved_at
// (method DETERMINISTIC_HELPER) for use in provenance.json retrievals.
import fs from "node:fs";
import path from "node:path";
const BASE = "https://github.com/nflverse/nflverse-data/releases/download";
const URLS = {
  snap_counts: s => `${BASE}/snap_counts/snap_counts_${s}.csv`,
  stats_player_week: s => `${BASE}/stats_player/stats_player_week_${s}.csv`,
  stats_player_reg: s => `${BASE}/stats_player/stats_player_reg_${s}.csv`,
  roster: s => `${BASE}/rosters/roster_${s}.csv`
};
const [dataset, season] = process.argv.slice(2);
if (!URLS[dataset] || !/^\d{4}$/.test(season ?? "")) { console.error(`Usage: nflverse-fetch <${Object.keys(URLS).join("|")}> <season>`); process.exit(2); }
const url = URLS[dataset](season);
const res = await fetch(url, { redirect: "follow" });
if (!res.ok) { console.error(`HTTP ${res.status} for ${url}`); process.exit(1); }
const body = await res.text();
const dir = path.resolve("research-inbox/_cache"); fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, `${dataset}_${season}.csv`);
fs.writeFileSync(file, body);
const retrieved_at = new Date().toISOString();
fs.writeFileSync(file + ".provenance.json", JSON.stringify({ url, retrieved_at, method: "DETERMINISTIC_HELPER", bytes: body.length }, null, 2) + "\n");
console.log(JSON.stringify({ file: path.relative(process.cwd(), file), url, retrieved_at, rows: body.split("\n").length - 1 }));
