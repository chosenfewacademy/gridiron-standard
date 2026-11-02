#!/usr/bin/env node
// Structural validation of a downloaded research artifact directory before it is proposed in a PR.
// Checks JSON parses, evidence files have sources with URLs + retrieved_at, and every item cites a listed source.
import fs from "node:fs";
import path from "node:path";
const dir = process.argv[2];
if (!dir || !fs.existsSync(dir)) { console.error(`Artifact dir missing: ${dir}`); process.exit(1); }
const errors = [];
for (const name of fs.readdirSync(dir)) {
  if (!name.endsWith(".json")) continue;
  let data; try { data = JSON.parse(fs.readFileSync(path.join(dir, name), "utf8")); } catch { errors.push(`${name}: invalid JSON`); continue; }
  if (!/^evidence.*\.json$/.test(name) || !Array.isArray(data?.sources)) continue;
  const urls = new Set();
  for (const s of data.sources) { if (!s?.url || !s?.retrieved_at) errors.push(`${name}: source missing url/retrieved_at`); else urls.add(s.url); }
  for (const [cat, v] of Object.entries(data.normalized ?? {}))
    for (const item of v?.items ?? []) if (item?.source_url && !urls.has(item.source_url)) errors.push(`${name}: ${cat} cites unlisted source ${item.source_url}`);
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Research artifact structurally valid: ${dir}`);
