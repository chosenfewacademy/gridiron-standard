import fs from "node:fs";
import path from "node:path";
import type { PlayerIdentity } from "./player-resolver.js";

export interface PlayerAuditTask {
  task_id: string;
  type: "player_full_audit";
  audit_type: "FULL_AUDIT";
  player_id: string;
  player_name: string;
  team: string | null;
  position: string;
  locked_baseline_file: string;
  current_audit_id: string | null;
}

export function buildPlayerAuditTask(player: PlayerIdentity): PlayerAuditTask {
  if (!player.position) {
    throw new Error(
      `PLAYER_POSITION_UNRESOLVED: ${player.full_name} requires exact Madden position resolution before Full Audit.`
    );
  }

  const baselinePath = path.resolve(`data/baselines/${player.position}.json`);
  if (!fs.existsSync(baselinePath)) {
    throw new Error(
      `BASELINE_NOT_AVAILABLE: ${player.position} does not yet have a positional baseline file.`
    );
  }

  const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  if (baseline.status !== "LOCKED") {
    throw new Error(
      `BASELINE_NOT_LOCKED: ${player.position} must have a locked Top 10 before one-off player audits can use it as authoritative calibration.`
    );
  }

  const safe = player.player_id.replace(/[^a-zA-Z0-9._-]+/g, "_");
  return {
    task_id: `PLAYER_${safe}_${Date.now()}`,
    type: "player_full_audit",
    audit_type: "FULL_AUDIT",
    player_id: player.player_id,
    player_name: player.full_name,
    team: player.team ?? null,
    position: player.position,
    locked_baseline_file: `data/baselines/${player.position}.json`,
    current_audit_id: player.current_audit_id ?? null
  };
}
