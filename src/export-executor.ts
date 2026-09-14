import { collectExportRecords } from "./export-collector.js";
import { writeExport } from "./export-writer.js";
import { resolvePlayer } from "./player-resolver.js";
import type { ExportMode, ExportRequest } from "./export-types.js";

export function exportPlayer(query: string, mode: ExportMode) {
  const resolved = resolvePlayer(query);
  if (resolved.status !== "RESOLVED" || !resolved.player) return resolved;

  const request: ExportRequest = {
    scope: "PLAYER",
    mode,
    player_id: resolved.player.player_id
  };
  const records = collectExportRecords(request);
  return {
    status: "OK",
    records: records.length,
    files: writeExport(records, mode, resolved.player.full_name)
  };
}

export function exportPosition(position: string, mode: ExportMode) {
  const request: ExportRequest = {
    scope: "POSITION",
    mode,
    position: position.toUpperCase()
  };
  const records = collectExportRecords(request);
  return {
    status: "OK",
    records: records.length,
    files: writeExport(records, mode, `POSITION_${position.toUpperCase()}`)
  };
}

export function exportTeam(team: string, mode: ExportMode, position?: string) {
  const request: ExportRequest = {
    scope: "TEAM",
    mode,
    team: team.toUpperCase(),
    position: position?.toUpperCase()
  };
  const records = collectExportRecords(request);
  return {
    status: "OK",
    records: records.length,
    files: writeExport(
      records,
      mode,
      `TEAM_${team.toUpperCase()}${position ? "_" + position.toUpperCase() : ""}`
    )
  };
}

export function exportFullRoster(mode: ExportMode) {
  const request: ExportRequest = {
    scope: "FULL_ROSTER",
    mode
  };
  const records = collectExportRecords(request);
  return {
    status: "OK",
    records: records.length,
    files: writeExport(records, mode, "FULL_ROSTER")
  };
}
