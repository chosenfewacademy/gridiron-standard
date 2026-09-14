import fs from "node:fs";
import path from "node:path";
import { findTeamPlayers } from "./player-resolver.js";
import { executePlayerAudit } from "./player-executor.js";

export interface BulkAuditOptions {
  team: string;
  position?: string;
}

export interface BulkAuditItem {
  player_id: string;
  player: string;
  position: string | null;
  status: string;
  audit_id?: string | null;
  major_flags?: string[];
  challenger_flag?: boolean;
  reason?: string;
}

export interface BulkAuditResult {
  batch_id: string;
  team: string;
  position: string | null;
  started_at: string;
  completed_at: string;
  players_total: number;
  players_processed: number;
  approved: number;
  flagged: number;
  insufficient_evidence: number;
  unresolved_position: number;
  failed: number;
  items: BulkAuditItem[];
  review_report_file: string;
}

export async function executeTeamBulkAudit(
  options: BulkAuditOptions
): Promise<BulkAuditResult> {
  const team = options.team.toUpperCase();
  const position = options.position?.toUpperCase();

  const players = findTeamPlayers(team, position);
  const startedAt = new Date().toISOString();
  const batchId =
    `TEAM_${team}_${position ?? "ALL"}_${startedAt.replace(/[:.]/g, "-")}`;

  const items: BulkAuditItem[] = [];

  for (const player of players) {
    if (!player.position) {
      items.push({
        player_id: player.player_id,
        player: player.full_name,
        position: null,
        status: "UNRESOLVED_POSITION",
        reason: "Exact Madden position must be resolved before Full Audit."
      });
      continue;
    }

    try {
      const result: any = await executePlayerAudit(player);

      items.push({
        player_id: player.player_id,
        player: player.full_name,
        position: player.position,
        status: String(result.status ?? "UNKNOWN"),
        audit_id: result.audit_id ?? null,
        major_flags: result.major_flags ?? [],
        challenger_flag: Boolean(result.challenger_flag)
      });
    } catch (error) {
      items.push({
        player_id: player.player_id,
        player: player.full_name,
        position: player.position,
        status: "FAILED",
        reason: error instanceof Error ? error.message : String(error)
      });
    }
  }

  const completedAt = new Date().toISOString();

  const result: BulkAuditResult = {
    batch_id: batchId,
    team,
    position: position ?? null,
    started_at: startedAt,
    completed_at: completedAt,
    players_total: players.length,
    players_processed: items.length,
    approved: items.filter(x => x.status === "APPROVED").length,
    flagged: items.filter(x => x.status === "FLAGGED" || (x.major_flags?.length ?? 0) > 0).length,
    insufficient_evidence: items.filter(x => x.status === "INSUFFICIENT_EVIDENCE").length,
    unresolved_position: items.filter(x => x.status === "UNRESOLVED_POSITION").length,
    failed: items.filter(x => x.status === "FAILED").length,
    items,
    review_report_file: ""
  };

  const reportPath = saveBatchReport(result);
  result.review_report_file = reportPath;

  const jsonPath = path.resolve("audits/teams", team, `${batchId}.json`);
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2) + "\n");

  return result;
}

function saveBatchReport(result: BulkAuditResult): string {
  const dir = path.resolve("audits/teams", result.team);
  fs.mkdirSync(dir, { recursive: true });

  const file = path.join(dir, `${result.batch_id}-review.md`);

  const reviewItems = result.items.filter(item =>
    item.status === "FLAGGED" ||
    item.status === "INSUFFICIENT_EVIDENCE" ||
    item.status === "UNRESOLVED_POSITION" ||
    item.status === "FAILED" ||
    (item.major_flags?.length ?? 0) > 0
  );

  const lines: string[] = [
    `# ${result.team}${result.position ? ` ${result.position}` : ""} Bulk Audit Review`,
    "",
    `Batch: ${result.batch_id}`,
    `Started: ${result.started_at}`,
    `Completed: ${result.completed_at}`,
    "",
    "## Summary",
    "",
    `- Total players: ${result.players_total}`,
    `- Approved: ${result.approved}`,
    `- Flagged: ${result.flagged}`,
    `- Insufficient evidence: ${result.insufficient_evidence}`,
    `- Unresolved positions: ${result.unresolved_position}`,
    `- Failed: ${result.failed}`,
    "",
    "## Review Queue",
    ""
  ];

  if (!reviewItems.length) {
    lines.push("No flagged or unresolved cases.");
  } else {
    for (const item of reviewItems) {
      const severity = item.challenger_flag
        ? "RE-AUDIT REQUIRED"
        : item.status === "FAILED"
          ? "RE-AUDIT REQUIRED"
          : item.status === "INSUFFICIENT_EVIDENCE"
            ? "REVIEW"
            : item.status === "UNRESOLVED_POSITION"
              ? "REVIEW"
              : "REVIEW";

      lines.push(`### ${item.player}`);
      lines.push("");
      lines.push(`- Severity: ${severity}`);
      lines.push(`- Position: ${item.position ?? "UNRESOLVED"}`);
      lines.push(`- Status: ${item.status}`);
      if (item.audit_id) lines.push(`- Audit ID: ${item.audit_id}`);
      if (item.major_flags?.length) {
        lines.push(`- Flags: ${item.major_flags.join(", ")}`);
      }
      if (item.reason) lines.push(`- Reason: ${item.reason}`);
      lines.push("");
    }
  }

  fs.writeFileSync(file, lines.join("\n") + "\n");
  return file;
}
