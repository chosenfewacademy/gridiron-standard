import fs from "node:fs";
import path from "node:path";
import type { ProjectState } from "./types.js";

const STATE_PATH = path.resolve("state/project-state.json");

export function loadState(): ProjectState {
  return JSON.parse(fs.readFileSync(STATE_PATH, "utf8")) as ProjectState;
}

export function saveState(state: ProjectState): void {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + "\n");
}
