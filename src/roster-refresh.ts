import fs from "node:fs";
import path from "node:path";
import type { ExternalPlayerRecord, RosterRefreshResult, RosterSource } from "./roster-source.js";

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

export interface RefreshOptions {
  /** Only add new players; never modify existing registry entries (safe for non-locked positions). */
  addOnly?: boolean;
  /** Compute the result without writing the registry. */
  dryRun?: boolean;
  /** Restrict additions to these exact Madden buckets. */
  positions?: string[];
  registryPath?: string;
}

export async function refreshRoster(source: RosterSource, options: RefreshOptions = {}): Promise<RosterRefreshResult & { skipped_existing?: number }> {
  const registryPath = path.resolve(options.registryPath ?? "data/players/registry.json");
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const current = registry.players as any[];
  const incoming = await source.fetchAllPlayers();

  let added = 0;
  let updated = 0;
  let unchanged = 0;
  let skippedExisting = 0;
  const conflicts: Array<Record<string, unknown>> = [];

  const byId = new Map(current.map(p => [p.player_id, p]));

  for (const ext of incoming) {
    const id = ext.source_id ? `ext_${ext.source_id}` : slug(ext.full_name);
    let player = byId.get(id);

    if (!player) {
      // Fallback exact-name match helps preserve history if a future source introduces source IDs.
      const matches = current.filter(p => p.full_name.toLowerCase() === ext.full_name.toLowerCase());
      if (matches.length === 1) player = matches[0];
      if (matches.length > 1) {
        conflicts.push({ type: "DUPLICATE_NAME", external: ext, matches });
        continue;
      }
    }

    if (!player && options.positions && !options.positions.includes(String(ext.position))) continue;
    if (player && options.addOnly) { skippedExisting++; continue; }

    if (!player) {
      player = {
        player_id: id,
        full_name: ext.full_name,
        aliases: ext.aliases ?? [],
        team: ext.team,
        position: ext.position,
        historical_positions: ext.position ? [ext.position] : [],
        current_audit_id: null,
        audit_history: [],
        external_ids: {},
        roster_context_history: []
      };
      applySourceMetadata(player, ext as any);
      current.push(player);
      byId.set(player.player_id, player);
      added++;
      continue;
    }

    let changed = false;

    if (ext.team && ext.team !== player.team) {
      player.previous_team = player.team ?? null;
      player.team = ext.team;
      changed = true;
    }

    if (ext.position && ext.position !== player.position) {
      player.historical_positions ??= [];
      if (player.position && !player.historical_positions.includes(player.position)) {
        player.historical_positions.push(player.position);
      }
      if (!player.historical_positions.includes(ext.position)) {
        player.historical_positions.push(ext.position);
      }
      player.position = ext.position;
      changed = true;
    }

    const aliases = new Set([...(player.aliases ?? []), ...(ext.aliases ?? [])]);
    player.aliases = [...aliases];

    if (applySourceMetadata(player, ext as any)) changed = true;

    if (changed) updated++;
    else unchanged++;
  }

  registry.players = current.sort((a,b) => a.full_name.localeCompare(b.full_name));
  registry.last_refreshed_at = new Date().toISOString();

  if (!options.dryRun) fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n");

  return { added, updated, unchanged, conflicts, ...(options.addOnly ? { skipped_existing: skippedExisting } : {}) };
}


function applySourceMetadata(player: any, ext: any): boolean {
  let changed = false;

  player.external_ids ??= {};
  const ids = {
    gsis: ext.gsis_id ?? null,
    espn: ext.espn_id ?? null,
    pff: ext.pff_id ?? null,
    pfr: ext.pfr_id ?? null
  };

  for (const [key, value] of Object.entries(ids)) {
    if (value && player.external_ids[key] !== value) {
      player.external_ids[key] = value;
      changed = true;
    }
  }

  const fields = [
    "jersey_number","roster_status","birth_date","height","weight","college",
    "years_exp","source_position","depth_chart_position","requires_role_resolution",
    "role_resolution_reason"
  ];

  for (const field of fields) {
    const value = ext[field];
    if (value !== undefined && player[field] !== value) {
      player[field] = value;
      changed = true;
    }
  }

  return changed;
}
