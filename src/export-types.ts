export type ExportScope = "PLAYER" | "POSITION" | "TEAM" | "FULL_ROSTER";
export type ExportMode = "MADDEN_ENTRY" | "AUDIT_RICH";

export interface ExportRequest {
  scope: ExportScope;
  mode: ExportMode;
  player_id?: string;
  position?: string;
  team?: string;
  include_nonapproved?: boolean;
}

export interface ExportRecord {
  player_id: string;
  player: string;
  team: string | null;
  position: string | null;
  ovr: number | null;
  ratings: Record<string, number>;
  audit_id: string | null;
  methodology_version: string | null;
  confidence?: string | null;
  status?: string | null;
  archetype?: string | null;
  audit_date?: string | null;
  flags?: string[];
}
