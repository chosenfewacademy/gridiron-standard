export interface ProposedAudit {
  audit_type: string;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  ovr_before?: number | null;
  ovr_after?: number | null;
  challenger_flag?: boolean;
  added_95_plus?: boolean;
  removed_95_plus?: boolean;
  changed_97_plus_or_99?: boolean;
  major_position_change?: boolean;
  locked_control_conflict?: boolean;
}

export function majorFlags(audit: ProposedAudit): string[] {
  const flags: string[] = [];
  const before = audit.ovr_before ?? null;
  const after = audit.ovr_after ?? null;

  if (audit.challenger_flag) flags.push("TOP10_CHALLENGER");
  if (before !== null && after !== null && Math.abs(after - before) >= 2) flags.push("OVR_CHANGE_2_PLUS");
  if (audit.added_95_plus || audit.removed_95_plus) flags.push("95_PLUS_CHANGE");
  if (audit.changed_97_plus_or_99) flags.push("97_PLUS_OR_99_CHANGE");
  if (audit.major_position_change) flags.push("MAJOR_POSITION_CHANGE");
  if (audit.locked_control_conflict) flags.push("LOCKED_CONTROL_CONFLICT");

  if (audit.audit_type === "QUICK_RECHECK") {
    if (before !== null && after !== null && Math.abs(after - before) > 1) {
      flags.push("QUICK_RECHECK_EXCEEDS_OVR_LIMIT");
    }
    if (audit.added_95_plus || audit.removed_95_plus) {
      flags.push("QUICK_RECHECK_95_PLUS_PROHIBITED");
    }
  }

  return [...new Set(flags)];
}

export function mayAutoApprove(audit: ProposedAudit): boolean {
  return audit.confidence === "HIGH" && majorFlags(audit).length === 0;
}
