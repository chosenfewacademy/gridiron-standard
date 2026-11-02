import fs from "node:fs";
import { createAuditAdapter, createResearchAdapter } from "./adapter-factory.js";
import { parseAuditJson } from "./audit-parser.js";
import { validateAudit } from "./audit-validator.js";
import { saveAuditRecord, queueReaudit } from "./persistence.js";
import { getCurrentApprovedCard, linkApprovedAuditToPlayer } from "./player-history.js";
import { loadBaselineControls } from "./baseline-controls.js";
import type { PlayerIdentity } from "./player-resolver.js";

const MAX_REVISIONS = Number(process.env.GRIDIRON_MAX_REVISIONS ?? "3");

export async function executeQuickRecheck(
  player: PlayerIdentity
): Promise<Record<string, unknown>> {
  const current = getCurrentApprovedCard(player.player_id);

  if (!current) {
    return {
      status: "FULL_AUDIT_REQUIRED",
      player_id: player.player_id,
      player: player.full_name,
      reason: "Quick Recheck requires an existing approved current card."
    };
  }

  const position = String(current.position ?? player.position ?? "");
  if (!position) {
    return {
      status: "FULL_AUDIT_REQUIRED",
      player_id: player.player_id,
      player: player.full_name,
      reason: "Exact Madden position is unresolved."
    };
  }

  const controls = loadBaselineControls(position);
  const locks = JSON.parse(fs.readFileSync("state/locks.json", "utf8"));
  const state = JSON.parse(fs.readFileSync("state/project-state.json", "utf8"));

  const task = {
    task_id: `QUICK_${player.player_id}_${Date.now()}`,
    type: "quick_recheck",
    audit_type: "QUICK_RECHECK",
    player_id: player.player_id,
    player_name: player.full_name,
    team: player.team ?? null,
    position,
    previous_card: current,
    baseline_controls: {
      top_10: controls.top_10,
      first_out: controls.first_out,
      external_controls: controls.external_controls
    },
    constraints: {
      max_ovr_change: 1,
      may_add_or_remove_95_plus: false,
      may_modify_locked_top10: false,
      escalate_if_material_architecture_change: true,
      escalate_if_top10_challenger: true
    }
  };

  const research = await createResearchAdapter();
  const evidence = await research.gather(task);

  if (!evidence.minimum_evidence_met) {
    const record = {
      audit_id: `${task.task_id}_INSUFFICIENT`,
      audit_type: "QUICK_RECHECK",
      status: "INSUFFICIENT_EVIDENCE",
      player_id: player.player_id,
      position,
      confidence: "LOW",
      methodology_version: state.methodology_version,
      created_at: new Date().toISOString(),
      missing_evidence: evidence.missing_evidence,
      sources: evidence.sources
    };

    saveAuditRecord(record as any, renderMarkdown(record));
    queueReaudit({
      severity: "REVIEW",
      reason: "QUICK_RECHECK_INSUFFICIENT_EVIDENCE",
      player_id: player.player_id,
      audit_id: record.audit_id,
      created_at: new Date().toISOString()
    });
    return record;
  }

  const analyst = await createAuditAdapter();
  let feedback: string[] = [];
  let parsed: any = null;
  let validation: any = null;
  let responseText = "";

  for (let attempt = 1; attempt <= MAX_REVISIONS; attempt++) {
    const result = await analyst.runAudit({
      task,
      evidence,
      state,
      locks,
      revision_feedback: feedback
    });

    responseText = result.text;
    parsed = parseAuditJson(result.text);

    parsed.player_id = player.player_id;
    parsed.position = position;
    parsed.audit_type = "QUICK_RECHECK";
    parsed.methodology_version = state.methodology_version;
    parsed.created_at ??= new Date().toISOString();
    parsed.ovr_before = Number(current.ovr);

    validation = validateAudit(parsed);

    const errors = validation.errors as string[];

    if (typeof parsed.ovr_after !== "number") {
      errors.push("Quick Recheck missing numeric ovr_after.");
    } else if (Math.abs(parsed.ovr_after - Number(current.ovr)) > 1) {
      errors.push("Quick Recheck exceeds 1-point OVR limit.");
    }

    if (parsed.added_95_plus || parsed.removed_95_plus) {
      errors.push("Quick Recheck cannot add or remove 95+ traits.");
    }

    if (parsed.challenger_flag) {
      errors.push("Top 10 challenger requires Full Audit / positional review.");
    }

    if (parsed.material_attribute_redistribution === true) {
      errors.push("Material attribute redistribution requires Full Audit.");
    }

    validation.valid = errors.length === 0;
    if (validation.valid) break;
    feedback = errors;
  }

  if (!validation?.valid) {
    const escalation = {
      status: "FULL_AUDIT_REQUIRED",
      player_id: player.player_id,
      player: player.full_name,
      reason: "Quick Recheck exceeded allowed scope or failed validation.",
      validation_errors: validation?.errors ?? [],
      previous_audit_id: current.current_audit_id ?? null
    };

    queueReaudit({
      severity: "RE-AUDIT REQUIRED",
      reason: "QUICK_RECHECK_ESCALATED_TO_FULL_AUDIT",
      player_id: player.player_id,
      detail: escalation,
      created_at: new Date().toISOString()
    });

    return escalation;
  }

  parsed.major_flags = [...new Set([
    ...(parsed.major_flags ?? []),
    ...validation.flags
  ])];

  parsed.status = validation.auto_approve
    ? "APPROVED"
    : (parsed.major_flags.length ? "FLAGGED" : "VALIDATED");

  saveAuditRecord(parsed, responseText);

  if (parsed.status === "APPROVED") {
    linkApprovedAuditToPlayer(parsed);
  } else if (parsed.status === "FLAGGED") {
    queueReaudit({
      severity: "REVIEW",
      reason: parsed.major_flags,
      player_id: player.player_id,
      audit_id: parsed.audit_id,
      created_at: new Date().toISOString()
    });
  }

  return parsed;
}

function renderMarkdown(record: Record<string, unknown>): string {
  return `# ${record.audit_id}\n\nStatus: ${record.status}\n\n\`\`\`json\n${JSON.stringify(record, null, 2)}\n\`\`\``;
}
