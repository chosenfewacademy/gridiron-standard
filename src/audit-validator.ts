import fs from "node:fs";
import path from "node:path";
import { majorFlags, mayAutoApprove } from "./validator.js";
import type { ParsedAudit } from "./audit-parser.js";

export interface ValidationResult {
  valid: boolean;
  auto_approve: boolean;
  errors: string[];
  flags: string[];
}

export function validateAudit(audit: ParsedAudit): ValidationResult {
  const errors: string[] = [];
  const ratings = audit.ratings ?? {};

  for (const [attribute, rating] of Object.entries(ratings)) {
    if (!Number.isInteger(rating) || rating < 0 || rating > 99) {
      errors.push(`Invalid rating ${attribute}=${rating}.`);
    }
  }

  if (!audit.position) errors.push("Missing position.");
  if (!audit.confidence) errors.push("Missing confidence.");
  if (!audit.methodology_version) errors.push("Missing methodology_version.");

  const flags = majorFlags({
    audit_type: audit.audit_type,
    confidence: audit.confidence,
    ovr_before: audit.ovr_before,
    ovr_after: audit.ovr_after,
    challenger_flag: audit.challenger_flag,
    added_95_plus: audit.added_95_plus,
    removed_95_plus: audit.removed_95_plus,
    changed_97_plus_or_99: audit.changed_97_plus_or_99,
    major_position_change: audit.major_position_change,
    locked_control_conflict: audit.locked_control_conflict
  });

  // Locked baseline mutation is prohibited outside explicit Top 10 re-audit.
  const locksPath = path.resolve("state/locks.json");
  const locks = JSON.parse(fs.readFileSync(locksPath, "utf8"));
  const lock = locks.positions?.[audit.position];
  if (lock?.status === "LOCKED" && audit.audit_type !== "TOP10_REAUDIT") {
    if ((audit as any).proposed_top10_mutation === true) {
      errors.push("LOCK VIOLATION: normal audit attempted Top 10 mutation.");
    }
  }

  return {
    valid: errors.length === 0,
    auto_approve: errors.length === 0 && mayAutoApprove({
      audit_type: audit.audit_type,
      confidence: audit.confidence,
      ovr_before: audit.ovr_before,
      ovr_after: audit.ovr_after,
      challenger_flag: audit.challenger_flag,
      added_95_plus: audit.added_95_plus,
      removed_95_plus: audit.removed_95_plus,
      changed_97_plus_or_99: audit.changed_97_plus_or_99,
      major_position_change: audit.major_position_change,
      locked_control_conflict: audit.locked_control_conflict
    }),
    errors,
    flags
  };
}
