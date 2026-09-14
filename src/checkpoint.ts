import fs from "node:fs";
import path from "node:path";
import type { ProjectState } from "./types.js";

export function createCheckpoint(state: ProjectState, label: string): string {
  const dir = path.resolve("state/checkpoints");
  fs.mkdirSync(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const file = path.join(dir, `${stamp}-${label}.json`);
  fs.writeFileSync(file, JSON.stringify(state, null, 2) + "\n");
  return file;
}
