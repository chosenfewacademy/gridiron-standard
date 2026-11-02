import fs from "node:fs";
import { loadState, saveState } from "./state.js";
import { getNextTask } from "./state-machine.js";
import { createAuditAdapter, createResearchAdapter, selectedTransport } from "./adapter-factory.js";
import { withTransportChecks } from "./high-trait-evidence.js";
import { parseAuditJson } from "./audit-parser.js";
import { validateAudit } from "./audit-validator.js";
import { saveAuditRecord, queueReaudit } from "./persistence.js";
import { createCheckpoint } from "./checkpoint.js";

const MAX_REVISIONS = Number(process.env.GRIDIRON_MAX_REVISIONS ?? "3");

export async function executeNext(): Promise<Record<string, unknown>> {
  const state = loadState();
  const task = getNextTask(state);
  const locks = JSON.parse(fs.readFileSync("state/locks.json", "utf8"));

  const research = await createResearchAdapter();
  const evidence = await research.gather(task);

  if (!evidence.minimum_evidence_met) {
    const record = {
      audit_id: `${String((task as any).task_id ?? "task")}_INSUFFICIENT_${Date.now()}`,
      audit_type: taskTypeToAuditType(String((task as any).type ?? "")),
      status: "INSUFFICIENT_EVIDENCE",
      player_id: "N/A",
      position: String((task as any).position ?? state.current_position),
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
      task,
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
      state: state as any,
      locks,
      revision_feedback: feedback
    });

    responseText = result.text;
    parsed = parseAuditJson(result.text);
    validation = withTransportChecks(validateAudit(parsed), parsed, evidence, selectedTransport());

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
      audit_id: parsed.audit_id,
      task,
      created_at: new Date().toISOString()
    });
    return parsed;
  }

  parsed.major_flags = [...new Set([...(parsed.major_flags ?? []), ...validation.flags])];
  parsed.status = validation.auto_approve ? "APPROVED" : (parsed.major_flags.length ? "FLAGGED" : "VALIDATED");

  saveAuditRecord(parsed, responseText);

  if (parsed.status === "APPROVED") {
    const taskId = String((task as any).task_id ?? "");
    if (taskId && !state.completed_tasks.includes(taskId)) {
      state.completed_tasks.push(taskId);
    }
    createCheckpoint(state, taskId || "approved");
    saveState(state);
  } else if (parsed.status === "FLAGGED") {
    queueReaudit({
      severity: "REVIEW",
      reason: parsed.major_flags,
      audit_id: parsed.audit_id,
      task,
      created_at: new Date().toISOString()
    });
  }

  return parsed;
}

function taskTypeToAuditType(type: string): string {
  if (type === "pair_audit") return "FULL_AUDIT";
  if (type === "membership_reopen") return "TOP10_REAUDIT";
  return "FULL_AUDIT";
}

function renderMarkdown(record: Record<string, unknown>): string {
  return `# ${record.audit_id}\n\nStatus: ${record.status}\n\n\`\`\`json\n${JSON.stringify(record, null, 2)}\n\`\`\``;
}
