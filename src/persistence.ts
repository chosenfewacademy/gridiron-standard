import fs from "node:fs";
import path from "node:path";
import type { ParsedAudit } from "./audit-parser.js";

function safe(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]+/g, "_");
}

export function saveAuditRecord(audit: ParsedAudit, markdown: string): { json: string; md: string } {
  const pos = safe(audit.position);
  const dir = path.resolve("audits/league", pos);
  fs.mkdirSync(dir, { recursive: true });

  const id = safe(audit.audit_id);
  const jsonPath = path.join(dir, `${id}.json`);
  const mdPath = path.join(dir, `${id}.md`);

  // Immutable history: never overwrite an existing audit.
  if (fs.existsSync(jsonPath) || fs.existsSync(mdPath)) {
    throw new Error(`Immutable audit already exists: ${audit.audit_id}`);
  }

  fs.writeFileSync(jsonPath, JSON.stringify(audit, null, 2) + "\n");
  fs.writeFileSync(mdPath, markdown.trim() + "\n");
  return { json: jsonPath, md: mdPath };
}

export function queueReaudit(item: Record<string, unknown>): void {
  const statePath = path.resolve("state/project-state.json");
  const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  state.pending_reaudit_queue ??= [];
  state.pending_reaudit_queue.push(item);
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n");
}
