import fs from "node:fs";
import type { ResearchAdapter } from "./research.js";
import type { CodexAuditResult, CodexRunInput } from "./codex-adapter.js";
import { GrokBotFileAuditAdapter, GrokBotFileResearchAdapter } from "./grok-bot-transport.js";

export type TransportChoice = "GROK_BOT_FILE_TRANSPORT" | "CODEX";
export interface AuditAdapter { runAudit(input: CodexRunInput): Promise<CodexAuditResult> }

export function selectedTransport(env: NodeJS.ProcessEnv = process.env): TransportChoice {
  const fromEnv = env.GRIDIRON_RESEARCH_TRANSPORT?.trim().toUpperCase();
  let fromConfig: string | undefined;
  try { fromConfig = JSON.parse(fs.readFileSync("config/research-transport.json", "utf8")).default_transport; } catch { /* default below */ }
  const value = fromEnv || fromConfig || "GROK_BOT_FILE_TRANSPORT";
  if (value === "CODEX" || value === "GROK_BOT_FILE_TRANSPORT") return value;
  throw new Error(`Unknown GRIDIRON_RESEARCH_TRANSPORT: ${value}`);
}

// Codex modules are imported lazily so the default transport never loads the OpenAI SDK.
export async function createResearchAdapter(env = process.env): Promise<ResearchAdapter> {
  if (selectedTransport(env) === "CODEX") { const m = await import("./codex-research.js"); return new m.CodexResearchAdapter(); }
  return new GrokBotFileResearchAdapter();
}
export async function createAuditAdapter(env = process.env): Promise<AuditAdapter> {
  if (selectedTransport(env) === "CODEX") { const m = await import("./codex-adapter.js"); return new m.CodexAuditAdapter(); }
  return new GrokBotFileAuditAdapter();
}
