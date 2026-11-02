export type Position =
  | "QB" | "RB" | "WR" | "TE" | "LT" | "LG" | "C" | "RG" | "RT"
  | "REDGE" | "LEDGE" | "DT" | "MIKE" | "WILL" | "SAM"
  | "CB" | "FS" | "SS" | "K" | "P"
  | "FB" | "LS";

export type AuditStatus =
  | "DRAFT" | "VALIDATED" | "APPROVED"
  | "INSUFFICIENT_EVIDENCE" | "FLAGGED" | "ARCHIVED";

export type Confidence = "HIGH" | "MEDIUM" | "LOW";

export interface ProjectState {
  architecture_version: string;
  methodology_version: string;
  project: string;
  review_mode: "REVIEW_MAJOR";
  current_position: Position;
  current_stage: string;
  current_task: Record<string, unknown>;
  positions: Record<Position, "LOCKED" | "IN_PROGRESS" | "PENDING">;
  completed_tasks: string[];
  pending_reaudit_queue: unknown[];
}
