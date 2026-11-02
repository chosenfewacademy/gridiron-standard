// Commissioner-sanctioned pool approval: npm run pool:approve -- <POS[,POS...] | --all> --by "<name>" --confirm APPROVE_POOLS
// Approves each data/candidate-pools/<POS>.proposed.json and <POS>.reaudit.proposed.json that passes its coverage gate.
// Writes <POS>.json / <POS>.reaudit.json (status APPROVED). Never touches baselines, locks, state, cards or audits.
import fs from "node:fs";
import { approvePool } from "./coverage-gate.js";
const argv = process.argv.slice(2);
const val = (f: string) => { const i = argv.indexOf(f); return i >= 0 ? argv[i + 1] : undefined; };
if (val("--confirm") !== "APPROVE_POOLS") { console.error("Refusing: pass --confirm APPROVE_POOLS (explicit commissioner approval)."); process.exit(2); }
const by = val("--by"); if (!by) { console.error("Refusing: --by <approver> required."); process.exit(2); }
const files = fs.readdirSync("data/candidate-pools").filter(f => /\.proposed\.json$/.test(f)).sort();
const want = argv.includes("--all") ? null : new Set(String(argv[0] ?? "").toUpperCase().split(",").filter(Boolean));
const pick = files.filter(f => !want || want.has(f.split(".")[0]));
if (!pick.length) { console.error("No matching proposed pools."); process.exit(2); }
let failed = 0;
for (const f of pick) {
  try { console.log(`APPROVED ${f} -> ${approvePool(f, by)}`); }
  catch (e) { failed++; console.error(`BLOCKED ${f}: ${(e as Error).message}`); }
}
process.exitCode = failed ? 1 : 0;
