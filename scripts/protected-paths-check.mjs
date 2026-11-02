#!/usr/bin/env node
// Fails if a change set touches protected project state. Usage: node scripts/protected-paths-check.mjs <base-ref> [head-ref]
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export const PROTECTED = [
  { re: /^state\//, why: "project state, locks, checkpoints, thread" },
  { re: /^data\/baselines\//, why: "locked positional baselines" },
  { re: /^data\/players\/[^/]+\//, why: "approved player cards / history" },
  { re: /^data\/teams\//, why: "team-room state" },
  { re: /^audits\//, why: "immutable audit history" },
  { re: /^exports\/cards\//, why: "approved card exports" },
  { re: /^config\/madden-entry-order\.json$/, why: "madden_order_verified must stay until verified" },
  { re: /^bootstrap\//, why: "baseline import record" }
];
// Existing evidence logs may receive NEW files (propose-research-artifact) but never edits/deletes.
const APPEND_ONLY = /^logs\/qb-reconstruction\//;

export function violations(lines) {
  const out = [];
  for (const line of lines.filter(Boolean)) {
    const [status, ...paths] = line.split("\t");
    for (const p of paths) {
      const hit = PROTECTED.find(x => x.re.test(p));
      if (hit) out.push(`${status} ${p} (${hit.why})`);
      else if (APPEND_ONLY.test(p) && status[0] !== "A") out.push(`${status} ${p} (append-only research history)`);
    }
  }
  return out;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const fileFlag = process.argv.indexOf("--name-status-file");
  const base = process.argv[2] ?? "origin/main", head = process.argv[3] ?? "HEAD";
  const diff = (fileFlag >= 0
    ? (await import("node:fs")).readFileSync(process.argv[fileFlag + 1], "utf8")
    : execFileSync("git", ["diff", "--name-status", `${base}...${head}`], { encoding: "utf8" })).split("\n");
  const v = violations(diff);
  if (v.length) { console.error("PROTECTED PATHS CHANGED:\n" + v.join("\n")); process.exit(1); }
  console.log("Protected paths unchanged.");
}
