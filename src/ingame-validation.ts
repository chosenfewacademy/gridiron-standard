/**
 * In-game validation log scaffolding (user t54u, 2026-11-03). Add-only.
 * `npm run ingame:scaffold` creates data/ingame-validation/<POS>.json (only if missing) for every locked position and
 * docs/ingame-onesheets/<POS>.md (exact values to enter, in config/madden-entry-order.json order; order unverified).
 * Entries are appended by hand after testing in Madden 27: never edit or delete an entry, add a new one instead.
 * The in-game OVR is ground truth; the estimate is only a pre-check and gets recalibrated from these logs.
 */
import fs from "node:fs";
import { lockedBaselineRows, estimateOvr, loadWeights } from "./madden-ovr-check.js";

export const LOCKED = ["QB", "RB", "WR", "TE", "LT"];

export function validateEntry(e: any): string[] {
  const err: string[] = [];
  for (const k of ["player", "position", "attributes_entered", "our_ovr", "in_game_ovr", "gap", "entered_at", "entered_by"]) if (e[k] === undefined) err.push(`missing ${k}`);
  if (typeof e.our_ovr === "number" && typeof e.in_game_ovr === "number" && e.gap !== e.in_game_ovr - e.our_ovr) err.push("gap must equal in_game_ovr - our_ovr");
  return err;
}

function main() {
  const order = JSON.parse(fs.readFileSync("config/madden-entry-order.json", "utf8"));
  const w = loadWeights();
  fs.mkdirSync("data/ingame-validation", { recursive: true }); fs.mkdirSync("docs/ingame-onesheets", { recursive: true });
  for (const pos of LOCKED) {
    const rows = lockedBaselineRows(pos);
    const keys: string[] = (order.positions?.[pos] ?? Object.keys(rows[0]?.attrs ?? {})).filter((k: string) => k !== "OVR");
    const extra = [...new Set(rows.flatMap(r => Object.keys(r.attrs)))].filter(k => !keys.includes(k));
    const cols = [...keys, ...extra];
    const log = `data/ingame-validation/${pos}.json`;
    if (!fs.existsSync(log)) fs.writeFileSync(log, JSON.stringify({
      kind: "ingame_validation_log", position: pos, policy: "add-only; append entries, never edit or delete; in-game OVR is ground truth",
      baseline_file: JSON.parse(fs.readFileSync("state/locks.json", "utf8")).positions[pos].baseline_file, madden_order_verified: false, entries: [] }, null, 1) + "\n");
    const md = [`# ${pos} — Madden 27 entry one-sheet (locked top 10)`, "",
      `Generated ${new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" })} from the effective approved ratings. Enter these values exactly; do NOT set OVR manually.`,
      "Column order follows config/madden-entry-order.json (madden_order_verified=false; confirm against the edit-player UI). Est. = pre-check estimate (not verified).",
      "After entering, append the result to data/ingame-validation/" + pos + ".json (template: data/ingame-validation/TEMPLATE.json).", "",
      `| Rank | Player | Our OVR | Est. | ${cols.join(" | ")} |`, `|---|---|---|---|${cols.map(() => "---").join("|")}|`,
      ...rows.map((r, i) => `| ${i + 1} | ${r.player} | ${r.stated_ovr} | ${estimateOvr(pos, r.attrs, w).estimated_ovr} | ${cols.map(k => r.attrs[k] ?? "-").join(" | ")} |`), ""];
    fs.writeFileSync(`docs/ingame-onesheets/${pos}.md`, md.join("\n"));
  }
  console.log("scaffold written");
}
if (process.argv[1] && /ingame-validation\.(ts|js)$/.test(process.argv[1])) main();
