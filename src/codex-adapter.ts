import fs from "node:fs";
import path from "node:path";
import { Codex } from "@openai/codex-sdk";
import type { EvidencePackage } from "./research.js";

export interface CodexRunInput {
  task: Record<string, unknown>;
  evidence: EvidencePackage;
  state: Record<string, unknown>;
  locks: Record<string, unknown>;
  revision_feedback?: string[];
}

export interface CodexAuditResult {
  raw: unknown;
  text: string;
}

function readText(rel: string): string {
  return fs.readFileSync(path.resolve(rel), "utf8");
}

function readJson(rel: string): unknown {
  return JSON.parse(fs.readFileSync(path.resolve(rel), "utf8"));
}

export class CodexAuditAdapter {
  private codex = new Codex({});
  private thread: any | null = null;

  async initialize(): Promise<void> {
    const threadStatePath = path.resolve("state/thread.json");
    const threadState = JSON.parse(fs.readFileSync(threadStatePath, "utf8"));

    // The SDK supports durable thread/session context. The project JSON remains authoritative.
    // If a stored thread cannot be resumed in the installed SDK version/environment,
    // start a new thread without changing project state.
    try {
      if (threadState.codex_thread_id && typeof (this.codex as any).resumeThread === "function") {
        this.thread = await (this.codex as any).resumeThread(threadState.codex_thread_id);
      } else {
        this.thread = await this.codex.startThread();
      }
    } catch {
      this.thread = await this.codex.startThread();
    }

    const id = this.thread?.id ?? null;
    fs.writeFileSync(threadStatePath, JSON.stringify({ codex_thread_id: id }, null, 2) + "\n");
  }

  async runAudit(input: CodexRunInput): Promise<CodexAuditResult> {
    if (!this.thread) await this.initialize();

    const prompt = [
      readText("AGENTS.md"),
      "\n# ACTIVE TASK\n" + JSON.stringify(input.task, null, 2),
      "\n# AUTHORITATIVE PROJECT STATE\n" + JSON.stringify(input.state, null, 2),
      "\n# LOCK REGISTRY\n" + JSON.stringify(input.locks, null, 2),
      "\n# NORMALIZED EVIDENCE PACKAGE\n" + JSON.stringify(input.evidence, null, 2),
      input.revision_feedback?.length
        ? "\n# VALIDATION FEEDBACK TO CORRECT\n" + JSON.stringify(input.revision_feedback, null, 2)
        : "",
      "\nReturn a complete Gridiron Standard audit. Do not mutate files. " +
      "Respect locked baselines. If evidence is insufficient, say so explicitly. " +
      "Include machine-readable JSON in a fenced ```json block and then a concise human-readable audit."
    ].join("\n");

    const result = await this.thread.run(prompt);
    return {
      raw: result,
      text: extractText(result)
    };
  }
}

function extractText(result: any): string {
  if (typeof result === "string") return result;
  if (typeof result?.finalResponse === "string") return result.finalResponse;
  if (typeof result?.output_text === "string") return result.output_text;
  if (typeof result?.text === "string") return result.text;
  return JSON.stringify(result);
}
