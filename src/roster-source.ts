export interface ExternalPlayerRecord {
  source_id?: string;
  full_name: string;
  team: string | null;
  position: string | null;
  aliases?: string[];
}

export interface RosterSource {
  fetchAllPlayers(): Promise<ExternalPlayerRecord[]>;
}

export interface RosterRefreshResult {
  added: number;
  updated: number;
  unchanged: number;
  conflicts: Array<Record<string, unknown>>;
}
