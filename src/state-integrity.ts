import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export function hashFile(rel: string): string {
  const buffer = fs.readFileSync(path.resolve(rel));
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

export function createIntegrityManifest(): Record<string, string> {
  const files = [
    "AGENTS.md",
    "state/project-state.json",
    "state/locks.json",
    "config/output-policy.json",
    "config/team-branding.json",
    "config/madden-entry-order.json"
  ];

  const manifest: Record<string, string> = {};
  for (const file of files) {
    if (fs.existsSync(path.resolve(file))) {
      manifest[file] = hashFile(file);
    }
  }

  fs.mkdirSync(path.resolve("state"), { recursive: true });
  fs.writeFileSync(
    path.resolve("state/integrity-manifest.json"),
    JSON.stringify({
      created_at: new Date().toISOString(),
      files: manifest
    }, null, 2) + "\n"
  );

  return manifest;
}
