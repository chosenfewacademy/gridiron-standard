import fs from "node:fs";
import path from "node:path";
import type { ExportRequest, ExportRecord } from "./export-types.js";

function loadRegistry(): any[] {
  const file = path.resolve("data/players/registry.json");
  return JSON.parse(fs.readFileSync(file, "utf8")).players ?? [];
}

function loadCurrentCard(playerId: string): any | null {
  const file = path.resolve("data/players", playerId, "current.json");
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function loadAudit(position: string | null, auditId: string | null): any | null {
  if (!position || !auditId) return null;
  const file = path.resolve("audits/league", position, `${auditId}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function collectExportRecords(request: ExportRequest): ExportRecord[] {
  const players = loadRegistry();

  const filtered = players.filter(player => {
    if (request.scope === "PLAYER") return player.player_id === request.player_id;
    if (request.scope === "POSITION") return player.position === request.position;
    if (request.scope === "TEAM") {
      if (player.team?.toUpperCase() !== request.team?.toUpperCase()) return false;
      if (request.position && player.position !== request.position) return false;
      return true;
    }
    return true;
  });

  const records: ExportRecord[] = [];

  for (const player of filtered) {
    const current = loadCurrentCard(player.player_id);

    if (!current) {
      if (!request.include_nonapproved) continue;
      records.push({
        player_id: player.player_id,
        player: player.full_name,
        team: player.team ?? null,
        position: player.position ?? null,
        ovr: null,
        ratings: {},
        audit_id: null,
        methodology_version: null,
        status: "NO_APPROVED_CURRENT_CARD",
        flags: []
      });
      continue;
    }

    const audit = loadAudit(current.position ?? player.position, current.current_audit_id ?? null);

    records.push({
      player_id: player.player_id,
      player: player.full_name,
      team: player.team ?? null,
      position: current.position ?? player.position ?? null,
      ovr: current.ovr ?? null,
      ratings: current.ratings ?? {},
      audit_id: current.current_audit_id ?? null,
      methodology_version: current.methodology_version ?? null,
      confidence: audit?.confidence ?? null,
      status: audit?.status ?? "APPROVED",
      archetype: audit?.archetype ?? audit?.player_identity ?? null,
      audit_date: audit?.created_at ?? current.approved_at ?? null,
      flags: audit?.major_flags ?? []
    });
  }

  return records;
}
