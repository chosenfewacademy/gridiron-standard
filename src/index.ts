import { loadState } from "./state.js";
import { getNextTask } from "./state-machine.js";
import { route } from "./router.js";
import { executeNext } from "./executor.js";
import { resolveIntent, resolveTeamQuery } from "./intent-executor.js";
import { executePlayerAudit } from "./player-executor.js";
import { ratingsOnly } from "./ratings-only.js";
import { executeQuickRecheck } from "./quick-recheck.js";
import { executeTeamBulkAudit } from "./team-bulk-audit.js";
import { createTeamRoomSnapshot } from "./team-room-lock.js";
import { exportPlayer, exportPosition, exportTeam, exportFullRoster } from "./export-executor.js";
import { buildInputCardSpec } from "./card-spec.js";

const args = process.argv.slice(2);
const command = args.join(" ").trim() || "status";
const intent = route(command);
const state = loadState();

switch (intent.type) {
  case "STATUS":
    console.log(JSON.stringify({
      project: state.project,
      architecture_version: state.architecture_version,
      methodology_version: state.methodology_version,
      current_position: state.current_position,
      current_stage: state.current_stage,
      current_task: getNextTask(state),
      positions: state.positions,
      pending_reaudits: state.pending_reaudit_queue.length
    }, null, 2));
    break;

  case "CONTINUE": {
    const result = await executeNext();
    console.log(JSON.stringify(result, null, 2));
    break;
  }

  case "FULL_PLAYER_AUDIT": {
    const resolved: any = resolveIntent(intent);
    if (resolved.status !== "RESOLVED") {
      console.log(JSON.stringify(resolved, null, 2));
      break;
    }
    const result = await executePlayerAudit(resolved.player);
    console.log(JSON.stringify(result, null, 2));
    break;
  }

  case "RATINGS_ONLY": {
    const resolved: any = resolveIntent(intent);
    if (resolved.status !== "RESOLVED") {
      console.log(JSON.stringify(resolved, null, 2));
      break;
    }
    console.log(JSON.stringify(ratingsOnly(resolved.player), null, 2));
    break;
  }

  case "QUICK_RECHECK": {
    const resolved: any = resolveIntent(intent);
    if (resolved.status !== "RESOLVED") {
      console.log(JSON.stringify(resolved, null, 2));
      break;
    }
    const result = await executeQuickRecheck(resolved.player);
    console.log(JSON.stringify(result, null, 2));
    break;
  }

  case "TEAM_AUDIT": {
    const resolved: any = resolveTeamQuery(intent.team, intent.position);
    if (resolved.status !== "RESOLVED") {
      console.log(JSON.stringify(resolved, null, 2));
      break;
    }
    const result = await executeTeamBulkAudit({
      team: intent.team,
      position: intent.position
    });
    console.log(JSON.stringify(result, null, 2));
    break;
  }

  case "TEAM_ROOM_LOCK": {
    const snapshot = createTeamRoomSnapshot(intent.team, intent.position);
    console.log(JSON.stringify(snapshot, null, 2));
    break;
  }


  case "CARD_PLAYER":
    console.log(JSON.stringify(buildInputCardSpec(intent.query), null, 2));
    break;

  case "EXPORT_PLAYER":
    console.log(JSON.stringify(exportPlayer(intent.query, intent.mode), null, 2));
    break;

  case "EXPORT_POSITION":
    console.log(JSON.stringify(exportPosition(intent.position, intent.mode), null, 2));
    break;

  case "EXPORT_TEAM":
    console.log(JSON.stringify(exportTeam(intent.team, intent.mode, intent.position), null, 2));
    break;

  case "EXPORT_FULL":
    console.log(JSON.stringify(exportFullRoster(intent.mode), null, 2));
    break;

  case "TOP10_REAUDIT":
    console.log(JSON.stringify(intent, null, 2));
    console.log("Top 10 re-audit requires explicit commissioner confirmation: npm run reaudit:trigger -- <POS> --by <name> --confirm TOP10_REAUDIT (queues only; never starts an audit).");
    break;

  default:
    console.error("Ambiguous or unsupported command. No action executed.");
    process.exitCode = 2;
}
