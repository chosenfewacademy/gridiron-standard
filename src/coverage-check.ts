// Read-only: npm run coverage:check -- <POS> [--proposed]
import fs from "node:fs";
import { checkCoverage } from "./coverage-gate.js";
const pos = String(process.argv[2] ?? "").toUpperCase();
const file = `data/candidate-pools/${pos}${process.argv.includes("--proposed") ? ".proposed" : ""}.json`;
const pool = JSON.parse(fs.readFileSync(file, "utf8"));
const reg = JSON.parse(fs.readFileSync("data/players/registry.json", "utf8")).players;
const r = checkCoverage(pool, reg);
console.log(JSON.stringify({ file, status: pool.status, candidates: pool.candidates.length, exclusions: pool.exclusions.length, sources: pool.coverage_sources.length, ...r }, null, 2));
process.exitCode = r.ok ? 0 : 1;
