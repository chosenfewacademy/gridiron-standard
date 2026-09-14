import fs from "node:fs";
import { buildPlayerAuditTask } from "./player-audit-task.js";
import { loadBaselineControls } from "./baseline-controls.js";
import { CodexResearchAdapter } from "./codex-research.js";
import { CodexAuditAdapter } from "./codex-adapter.js";
import { parseAuditJson } from "./audit-parser.js";
import { validateAudit } from "./audit-validator.js";
import { saveAuditRecord, queueReaudit } from "./persistence.js";
import { linkApprovedAuditToPlayer, getCurrentApprovedCard } from "./player-history.js";
import type { PlayerIdentity } from "./player-resolver.js";
import { applyFullAuditEvidenceGate } from "./evidence-gate.js";

const MAX_REVISIONS = Number(process.env.GRIDIRON_MAX_REVISIONS ?? "3");

export async function executePlayerAudit(player: PlayerIdentity): Promise<Record<string, unknown>> {
  const task = buildPlayerAuditTask(player);
  const controls = loadBaselineControls(task.position);
  const locks = JSON.parse(fs.readFileSync("state/locks.json", "utf8"));
  const state = JSON.parse(fs.readFileSync("state/project-state.json", "utf8"));
  const previousCard = getCurrentApprovedCard(player.player_id);

  const research = new CodexResearchAdapter();
  const researchTask = {
    ...task,
    baseline_controls: {
      top_10: controls.top_10,
      first_out: controls.first_out,
      external_controls: controls.external_controls
    },
    previous_card: previousCard
  };
  const evidence = applyFullAuditEvidenceGate(
    await research.gather(researchTask), researchTask, new Date().toISOString()
  );

  if (!evidence.minimum_evidence_met) {
    const record = {
      audit_id: `${task.task_id}_INSUFFICIENT`,
      audit_type: "FULL_AUDIT",
      status: "INSUFFICIENT_EVIDENCE",
      player_id: player.player_id,
      position: task.position,
      confidence: "LOW",
      methodology_version: state.methodology_version,
      created_at: new Date().toISOString(),
      missing_evidence: evidence.missing_evidence,
      sources: evidence.sources
    };

    saveAuditRecord(record as any, renderMarkdown(record));
    queueReaudit({
      severity: "RE-AUDIT REQUIRED",
      reason: "INSUFFICIENT_EVIDENCE",
      player_id: player.player_id,
      audit_id: record.audit_id,
      created_at: new Date().toISOString()
    });
    return record;
  }

  const analyst = new CodexAuditAdapter();
  let feedback: string[] = [];
  let parsed: any = null;
  let validation: any = null;
  let responseText = "";

  for (let attempt = 1; attempt <= MAX_REVISIONS; attempt++) {
    const result = await analyst.runAudit({
      task: {
        ...task,
        requirements: {
          use_locked_top10_as_primary_reference: true,
          use_nearest_external_controls: true,
          why_not_higher_required: true,
          why_not_lower_required: true,
          player_identity_required: true,
          challenger_flag_required_if_close: true,
          may_not_mutate_locked_top10: true
        },
        baseline_controls: controls,
        previous_card: previousCard
      },
      evidence,
      state,
      locks,
      revision_feedback: feedback
    });

    responseText = result.text;
    parsed = parseAuditJson(result.text);

    // Canonical identity fields are application-controlled.
    parsed.player_id = player.player_id;
    parsed.position = task.position;
    parsed.audit_type = "FULL_AUDIT";
    parsed.methodology_version = state.methodology_version;
    parsed.created_at ??= new Date().toISOString();

    validation = validateAudit(parsed);

    // Structural Gridiron requirements for one-off player audits.
    if (!Array.isArray(parsed.nearest_controls) || parsed.nearest_controls.length === 0) {
      validation.errors.push("Missing nearest_controls.");
      validation.valid = false;
    }
    if (!parsed.player_identity) {
      validation.errors.push("Missing player_identity.");
      validation.valid = false;
    }
    if (!parsed.why_not_higher) {
      validation.errors.push("Missing why_not_higher.");
      validation.valid = false;
    }
    if (!parsed.why_not_lower) {
      validation.errors.push("Missing why_not_lower.");
      validation.valid = false;
    }

    if (validation.valid) break;
    feedback = validation.errors;
  }

  if (!validation?.valid) {
    parsed.status = "FLAGGED";
    parsed.major_flags = [...new Set([...(parsed.major_flags ?? []), "RE-AUDIT REQUIRED"])];
    saveAuditRecord(parsed, responseText || renderMarkdown(parsed));
    queueReaudit({
      severity: "RE-AUDIT REQUIRED",
      reason: "VALIDATION_FAILED_AFTER_3_ATTEMPTS",
      player_id: player.player_id,
      audit_id: parsed.audit_id,
      created_at: new Date().toISOString()
    });
    return parsed;
  }

  parsed.major_flags = [...new Set([...(parsed.major_flags ?? []), ...validation.flags])];
  parsed.status = validation.auto_approve ? "APPROVED" : (parsed.major_flags.length ? "FLAGGED" : "VALIDATED");

  saveAuditRecord(parsed, responseText);

  if (parsed.status === "APPROVED") {
    linkApprovedAuditToPlayer(parsed);
  } else if (parsed.status === "FLAGGED") {
    queueReaudit({
      severity: parsed.challenger_flag ? "RE-AUDIT REQUIRED" : "REVIEW",
      reason: parsed.major_flags,
      player_id: player.player_id,
      audit_id: parsed.audit_id,
      challenger_flag: parsed.challenger_flag ?? false,
      created_at: new Date().toISOString()
    });
  }

  return parsed;
}

function renderMarkdown(record: Record<string, unknown>): string {
  return `# ${record.audit_id}\n\nStatus: ${record.status}\n\n\`\`\`json\n${JSON.stringify(record, null, 2)}\n\`\`\``;
}
