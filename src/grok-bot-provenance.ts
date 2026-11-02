import { z } from "zod";
import { CALENDAR_MAX_AGE_MS } from "./season-phase.js";
import type { EvidencePackage } from "./research.js";

/**
 * Declared provenance for evidence authored by Grok Bot (GROK_BOT_FILE_TRANSPORT).
 * Grok Bot cannot be observed by the app the way Codex web_search events are, so the
 * "fresh web research" condition is satisfied ONLY by a complete, self-consistent
 * declaration: every query executed, every URL retrieved with a timestamp, and every
 * evidence source/item traceable to a declared retrieval. The full evidence gate still runs.
 */
const instant = z.string().datetime({ offset: true });
export const grokBotProvenanceSchema = z.object({
  transport: z.literal("GROK_BOT_FILE_TRANSPORT"),
  author: z.literal("grok-bot"),
  task_id: z.string().min(1),
  position: z.string().min(1),
  researched_at: instant,
  queries: z.array(z.object({ query: z.string().trim().min(3), executed_at: instant,
    purpose: z.enum(["EVIDENCE", "CALENDAR"]) })).min(1),
  retrievals: z.array(z.object({ url: z.string().url(), retrieved_at: instant,
    method: z.enum(["WEB_FETCH", "WEB_SEARCH_RESULT", "DETERMINISTIC_HELPER"]) })).min(1),
  attestation: z.literal("All listed queries and retrievals were performed live for this task; no EA ratings used as evidence.")
});
export type GrokBotProvenance = z.infer<typeof grokBotProvenanceSchema>;

export interface ProvenanceResult { valid: boolean; errors: string[]; evidence_queries: number; calendar_queries: number }

export function validateGrokBotProvenance(evidence: EvidencePackage, raw: unknown, asOf: string): ProvenanceResult {
  const parsed = grokBotProvenanceSchema.safeParse(raw);
  if (!parsed.success) return { valid: false, errors: ["PROVENANCE_INVALID_STRUCTURE"], evidence_queries: 0, calendar_queries: 0 };
  const p = parsed.data; const errors: string[] = [];
  const fresh = (t: string) => { const d = Date.parse(asOf) - Date.parse(t); return d >= 0 && d <= CALENDAR_MAX_AGE_MS; };
  if (p.task_id !== evidence.task_id) errors.push("PROVENANCE_TASK_MISMATCH");
  if (p.position !== evidence.position) errors.push("PROVENANCE_POSITION_MISMATCH");
  if (!fresh(p.researched_at)) errors.push("PROVENANCE_STALE_OR_FUTURE");
  for (const q of p.queries) if (!fresh(q.executed_at)) errors.push(`PROVENANCE_QUERY_STALE_OR_FUTURE:${q.query}`);
  const retrieved = new Map(p.retrievals.map(r => [r.url, r]));
  for (const r of p.retrievals) if (!fresh(r.retrieved_at)) errors.push(`PROVENANCE_RETRIEVAL_STALE_OR_FUTURE:${r.url}`);
  for (const s of evidence.sources ?? []) {
    const r = s.url ? retrieved.get(s.url) : undefined;
    if (!r) errors.push(`SOURCE_NOT_DECLARED_RETRIEVED:${s.url}`);
    else if (Date.parse(r.retrieved_at) !== Date.parse(s.retrieved_at)) errors.push(`SOURCE_RETRIEVAL_TIME_MISMATCH:${s.url}`);
  }
  for (const [name, cat] of Object.entries(evidence.normalized ?? {})) {
    for (const item of ((cat as any)?.items ?? []) as Array<{ source_url?: string }>)
      if (!item.source_url || !retrieved.has(item.source_url)) errors.push(`${name}: ITEM_SOURCE_NOT_DECLARED_RETRIEVED`);
  }
  const evidenceQueries = p.queries.filter(q => q.purpose === "EVIDENCE").length;
  const calendarQueries = p.queries.filter(q => q.purpose === "CALENDAR").length;
  if (!evidenceQueries) errors.push("PROVENANCE_NO_EVIDENCE_QUERIES");
  return { valid: errors.length === 0, errors: [...new Set(errors)], evidence_queries: evidenceQueries, calendar_queries: calendarQueries };
}
