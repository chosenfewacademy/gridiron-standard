import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { discover } from './discovery.js';

const folder = path.dirname(fileURLToPath(import.meta.url));
const snapshot = JSON.parse(fs.readFileSync(path.join(folder, 'source-inventory.json'), 'utf8'));
const files = snapshot.inventory.filter((i: any) => !i.file.includes('!/'));
const hash = (file: string) => createHash('sha256').update(fs.readFileSync(path.resolve(snapshot.repository, file))).digest('hex');
const before = files.map((i: any) => ({ file: i.file, hash: hash(i.file) }));
for (const [index, file] of files.entries()) assert.equal(before[index].hash, file.sha256, `Source drift: ${file.file}`);
const json = (file: string) => JSON.parse(snapshot.sources.find((s: any) => s.file === file).text);
const context = { players: json('data/players/registry.json').players, baseline: json('data/baselines/QB.json'),
  checklist: json('config/madden-entry-order.json').positions.QB.filter((a: string) => a !== 'OVR'),
  verifiedInventory: null, trustedSources: {} };
const first = discover(snapshot.sources, context);
const second = discover(snapshot.sources, context);
assert.deepEqual(first, second, 'Discovery must be deterministic');
assert.deepEqual(files.map((i: any) => ({ file: i.file, hash: hash(i.file) })), before);
assert.equal(first.would_create.length, 0);
assert(first.candidates.every(c => !c.safe_to_import));
console.log(`PASS real repository read-only integration: ${files.length} source file/archive hashes unchanged; deterministic empty creation preview`);
