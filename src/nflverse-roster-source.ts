import fs from "node:fs";
import { parse } from "csv-parse/sync";
import type { ExternalPlayerRecord, RosterSource } from "./roster-source.js";
import { mapToMaddenBucket } from "./position-mapper.js";

interface NflverseRow {
  season?: string;
  team?: string;
  position?: string;
  depth_chart_position?: string;
  jersey_number?: string;
  status?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  birth_date?: string;
  height?: string;
  weight?: string;
  college?: string;
  gsis_id?: string;
  espn_id?: string;
  pff_id?: string;
  pfr_id?: string;
  years_exp?: string;
  football_name?: string;
}

export interface NflversePlayerRecord extends ExternalPlayerRecord {
  gsis_id?: string | null;
  espn_id?: string | null;
  pff_id?: string | null;
  pfr_id?: string | null;
  depth_chart_position?: string | null;
  source_position?: string | null;
  exact_position?: string | null;
  requires_role_resolution?: boolean;
  role_resolution_reason?: string | null;
  jersey_number?: number | null;
  roster_status?: string | null;
  birth_date?: string | null;
  height?: number | null;
  weight?: number | null;
  college?: string | null;
  years_exp?: number | null;
}

export class NflverseRosterSource implements RosterSource {
  /** csvFile: offline, free path (e.g. research-inbox/_cache/roster_2026.csv from npm run nflverse:fetch). */
  constructor(private readonly season = 2026, private readonly csvFile?: string) {}

  async fetchAllPlayers(): Promise<NflversePlayerRecord[]> {
    if (this.csvFile) return this.parseCsv(fs.readFileSync(this.csvFile, "utf8"));
    const url =
      `https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_${this.season}.csv`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Gridiron-Standard/1.0"
      }
    });

    if (!response.ok) {
      throw new Error(
        `nflverse roster download failed: ${response.status} ${response.statusText}`
      );
    }

    return this.parseCsv(await response.text());
  }

  parseCsv(csv: string): NflversePlayerRecord[] {
    const rows = parse(csv, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true
    }) as NflverseRow[];

    return rows
      .filter(row => row.full_name && row.team)
      .map(row => this.toRecord(row));
  }

  private toRecord(row: NflverseRow): NflversePlayerRecord {
    const mapped = mapToMaddenBucket(
      row.position ?? null,
      row.depth_chart_position ?? null
    );

    const aliases = new Set<string>();
    if (row.football_name && row.football_name !== row.full_name) {
      aliases.add(row.football_name);
    }

    const sourceId =
      row.gsis_id ||
      (row.pfr_id ? `pfr_${row.pfr_id}` : "") ||
      (row.espn_id ? `espn_${row.espn_id}` : "") ||
      undefined;

    return {
      source_id: sourceId,
      full_name: row.full_name!,
      team: row.team ?? null,
      position: mapped.exact_position,
      aliases: [...aliases],

      gsis_id: row.gsis_id || null,
      espn_id: row.espn_id || null,
      pff_id: row.pff_id || null,
      pfr_id: row.pfr_id || null,

      depth_chart_position: row.depth_chart_position || null,
      source_position: row.position || null,
      exact_position: mapped.exact_position,
      requires_role_resolution: mapped.requires_role_resolution,
      role_resolution_reason: mapped.reason ?? null,

      jersey_number: toNumber(row.jersey_number),
      roster_status: row.status || null,
      birth_date: row.birth_date || null,
      height: toNumber(row.height),
      weight: toNumber(row.weight),
      college: row.college || null,
      years_exp: toNumber(row.years_exp)
    };
  }
}

function toNumber(value?: string): number | null {
  if (!value?.trim()) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}
