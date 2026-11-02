// Commissioner state path for an ENACTED architecture addendum: adds sequence positions missing from
// state.positions as PENDING. Never changes an existing position, lock, pointer or any other key.
import fs from "node:fs";
const STATE = "state/project-state.json";
const seq: string[] = JSON.parse(fs.readFileSync("config/position-sequence.json", "utf8")).sequence;
const state = JSON.parse(fs.readFileSync(STATE, "utf8"));
const added = seq.filter(p => !(p in state.positions));
for (const p of added) state.positions[p] = "PENDING";
if (added.length) fs.writeFileSync(STATE, JSON.stringify(state, null, 2) + "\n");
console.log(JSON.stringify({ added }, null, 2));
