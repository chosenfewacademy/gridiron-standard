import fs from "node:fs";
import path from "node:path";
import type { EvidencePackage, ResearchAdapter } from "./research.js";
import type { CodexAuditResult, CodexRunInput } from "./codex-adapter.js";
import { validateGrokBotProvenance } from "./grok-bot-provenance.js";
import { applyFullAuditEvidenceGate } from "./evidence-gate.js";

/** File-based transport: Grok Bot authors files in research-inbox/<POS>/<TASK_ID>/ on a PR branch.
 * The app only READS evidence/audit files. Its only write is validator feedback inside the inbox dir. */
export const INBOX_ROOT = "research-inbox";
const safe = (v: string) => v.replace(/[^A-Za-z0-9._-]+/g, "_");

export function inboxDir(task: Record<string, unknown>, root = INBOX_ROOT): string {
  const pos = String(task.position ?? "UNKNOWN"); const id = String(task.task_id ?? "task");
  const dir = path.resolve(root, safe(pos), safe(id));
  if (!dir.startsWith(path.resolve(root) + path.sep)) throw new Error("Inbox path escaped research-inbox");
  return dir;
}
const readJson = (file: string) => JSON.parse(fs.readFileSync(file, "utf8"));
/** Addendum 2026-11-04d: a superseding re-audit run (task.inbox_run "R2", ...) uses run-scoped inbox file names. */
export const runScoped = (task: Record<string, unknown>, base: string, ext: string) => {
  const r = typeof task.inbox_run === "string" && /^R\d+$/.test(task.inbox_run) ? task.inbox_run : "";
  return r ? `${base}-${r}${ext}` : `${base}${ext}`;
};

export class GrokBotFileResearchAdapter implements ResearchAdapter {
  constructor(private readonly root = INBOX_ROOT, private readonly now = () => new Date().toISOString()) {}
  async gather(task: Record<string, unknown>): Promise<EvidencePackage> {
    const dir = inboxDir(task, this.root);
    const evidenceFile = path.join(dir, runScoped(task, "evidence", ".json")), provFile = path.join(dir, runScoped(task, "provenance", ".json"));
    const base: EvidencePackage = { task_id: String(task.task_id ?? ""), position: String(task.position ?? ""),
      researched_at: this.now(), sources: [], normalized: {}, conflicts: [], minimum_evidence_met: false, missing_evidence: [] };
    // Missing file = research not yet delivered: stop before any audit record or queue mutation.
    if (!fs.existsSync(evidenceFile)) throw new AwaitingGrokBotEvidenceError(path.relative(process.cwd(), evidenceFile));
    let evidence: EvidencePackage;
    try { evidence = readJson(evidenceFile); } catch { return { ...base, missing_evidence: ["GROK_BOT_EVIDENCE_INVALID_JSON"] }; }
    // Self-declared observation flags in the file are never trusted.
    delete (evidence as any).fresh_web_research_observed; delete (evidence as any).calendar_web_search_observed;
    // Author-declared minimum_evidence_met is never trusted; only the gate decides.
    evidence.minimum_evidence_met = false;
    const prov = fs.existsSync(provFile) ? (() => { try { return readJson(provFile); } catch { return null; } })() : null;
    const check = validateGrokBotProvenance(evidence, prov, this.now());
    const declared = { ...evidence,
      fresh_web_research_observed: check.valid,
      calendar_web_search_observed: check.valid && check.calendar_queries > 0,
      missing_evidence: [...(Array.isArray(evidence.missing_evidence) ? evidence.missing_evidence : []), ...check.errors] };
    // The unchanged Full Audit evidence gate decides minimum_evidence_met.
    const gateTask = { ...task, position: task.position ?? evidence.position };
    return applyFullAuditEvidenceGate(declared, gateTask, this.now());
  }
}

export class AwaitingGrokBotEvidenceError extends Error {
  constructor(readonly file: string) { super(`Awaiting Grok Bot evidence file: ${file}`); this.name = "AwaitingGrokBotEvidenceError"; }
}

/** Analyst adapter: reads audit-attempt-<n>.json (text Grok Bot wrote, same format Codex returned).
 * Revision feedback from the validator is written to feedback-attempt-<n-1>.json. */
export class AwaitingGrokBotAuditError extends Error {
  constructor(readonly file: string) { super(`Awaiting Grok Bot audit file: ${file}`); this.name = "AwaitingGrokBotAuditError"; }
}
export class GrokBotFileAuditAdapter {
  private attempt = 0;
  constructor(private readonly root = INBOX_ROOT) {}
  async runAudit(input: CodexRunInput): Promise<CodexAuditResult> {
    this.attempt += 1;
    const dir = inboxDir(input.task, this.root);
    if (input.revision_feedback?.length) {
      fs.mkdirSync(dir, { recursive: true });
      const fb = path.join(dir, runScoped(input.task, "feedback-attempt", `-${this.attempt - 1}.json`));
      if (!fs.existsSync(fb)) fs.writeFileSync(fb, JSON.stringify({ attempt: this.attempt - 1, errors: input.revision_feedback }, null, 2) + "\n");
    }
    const file = path.join(dir, runScoped(input.task, "audit-attempt", `-${this.attempt}.md`));
    if (!fs.existsSync(file)) throw new AwaitingGrokBotAuditError(path.relative(process.cwd(), file));
    const text = fs.readFileSync(file, "utf8");
    return { raw: { transport: "GROK_BOT_FILE_TRANSPORT", file }, text };
  }
}
