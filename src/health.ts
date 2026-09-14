import fs from "node:fs";
import path from "node:path";

export function healthReport(): Record<string, unknown> {
  const required = [
    "state/project-state.json",
    "state/locks.json",
    "data/players/registry.json",
    "config/output-policy.json"
  ];

  const missing = required.filter(file => !fs.existsSync(path.resolve(file)));

  return {
    status: missing.length ? "degraded" : "ok",
    missing,
    timestamp: new Date().toISOString()
  };
}
