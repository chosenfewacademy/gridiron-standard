// Read-only: npm run coverage:check -- <POS> [--proposed | --reaudit]
import fs from "node:fs";
import { checkCoverage, checkReauditPool } from "./coverage-gate.js";
const pos = String(process.argv[2] ?? "").toUpperCase();
const reaudit = process.argv.includes("--reaudit");
const file = `data/candidate-pools/${pos}${reaudit ? ".reaudit.proposed" : process.argv.includes("--proposed") ? ".proposed" : ""}.json`;
const pool = JSON.parse(fs.readFileSync(file, "utf8"));
const reg = JSON.parse(fs.readFileSync("data/players/registry.json", "utf8")).players;
const r = reaudit ? checkReauditPool(pool, reg) : checkCoverage(pool, reg);
console.log(JSON.stringify({ file, status: pool.status, candidates: pool.candidates.length, exclusions: pool.exclusions.length, sources: pool.coverage_sources.length, ...(reaudit ? { requires_trigger: pool.reaudit?.requires_trigger, flags: pool.reaudit?.flags?.length } : {}), ...r }, null, 2));
process.exitCode = r.ok ? 0 : 1;
