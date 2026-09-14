export interface ParsedAudit {
  audit_id: string;
  audit_type: string;
  status: string;
  player_id?: string;
  position: string;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  methodology_version: string;
  created_at: string;
  ovr_before?: number | null;
  ovr_after?: number | null;
  ratings?: Record<string, number>;
  challenger_flag?: boolean;
  nearest_controls?: string[];
  major_flags?: string[];
  added_95_plus?: boolean;
  removed_95_plus?: boolean;
  changed_97_plus_or_99?: boolean;
  major_position_change?: boolean;
  locked_control_conflict?: boolean;
  material_attribute_redistribution?: boolean;
  sources?: unknown[];
  [key: string]: unknown;
}

export function parseAuditJson(text: string): ParsedAudit {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start < 0 || end < 0) throw new Error("Audit output contains no JSON object.");
  return JSON.parse(candidate.slice(start, end + 1)) as ParsedAudit;
}
