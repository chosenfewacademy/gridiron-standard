import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { CodexResearchAdapter } from "./codex-research.js";
import { resolvePlayer } from "./player-resolver.js";

// This runner deliberately imports no audit executor or persistence functions.
const timestamp = z.string().datetime({ offset: true });
const evidenceSchema = z.object({
  task_id: z.string().min(1),
  position: z.string().min(1),
  researched_at: timestamp,
  sources: z.array(z.object({
    name: z.string().min(1),
    url: z.string().url().nullable(),
    published_at: z.string().nullable(),
    retrieved_at: timestamp,
    authority_tier: z.number().int().min(1).max(5),
    claims: z.array(z.string())
  })),
  normalized: z.record(z.unknown()),
  conflicts: z.array(z.record(z.unknown())),
  minimum_evidence_met: z.boolean(),
  missing_evidence: z.array(z.string())
});

const startedAt = new Date().toISOString();
const taskId = `RESEARCH_SMOKE_${randomUUID()}`;
const outputFile = path.resolve("logs/research-smoke", `${taskId}.json`);
const adapter = new CodexResearchAdapter({
  workingDirectory: process.cwd(),
  sandboxMode: "read-only",
  approvalPolicy: "never",
  webSearchMode: "live",
  // Distributed source folders may not contain Git metadata; this does not relax the sandbox.
  skipGitRepoCheck: true
}, { signal: AbortSignal.timeout(180_000) });

const report: Record<string, unknown> = {
  task_id: taskId,
  started_at: startedAt,
  status: "BLOCKED",
  structured_json_parsed: false,
  structured_evidence_valid: false,
  fresh_web_research_succeeded: false,
  minimum_evidence_met: null
};

try {
  const resolution = resolvePlayer("Jalen Hurts");
  if (resolution.status !== "RESOLVED" || !resolution.player?.position) {
    throw new Error("Smoke-test player Jalen Hurts must resolve in the existing registry.");
  }
  const player = resolution.player;
  const evidence = await adapter.gather({
    task_id: taskId,
    type: "research_smoke_test",
    player_id: player.player_id,
    player_name: player.full_name,
    position: player.position,
    as_of: startedAt,
    query: "Look up current official NFL or Philadelphia Eagles information about Jalen Hurts. " +
      "Confirm team, quarterback role, and recent availability or news using fresh web searches. " +
      "Return source URLs, actual retrieval timestamps, and nonempty normalized factual evidence. " +
      "Prefer official team/NFL sources. Distinguish the current season from prior-season context. " +
      "This is a limited connectivity smoke test, not a Full Audit: report minimum_evidence_met honestly; " +
      "do not treat basic identity/news alone as sufficient for a full position evidence package. " +
      "Do not assign ratings or OVRs, create audits, run project commands, write files, or change any state."
  });
  report.structured_json_parsed = true;
  report.evidence = evidence;
  const checked = evidenceSchema.parse(evidence);
  report.structured_evidence_valid = true;
  report.minimum_evidence_met = checked.minimum_evidence_met;
  const checks = {
    thread_started: Boolean(adapter.diagnostics.thread_id),
    web_search_observed: adapter.diagnostics.web_searches.length > 0,
    task_matches: checked.task_id === taskId && checked.position === player.position,
    source_information: checked.sources.some(source =>
      source.url?.startsWith("https://") && source.claims.length > 0),
    retrieval_dates: checked.sources.length > 0,
    normalized_evidence: Object.keys(checked.normalized).length > 0,
    no_fresh_web_failure: !checked.missing_evidence.includes("fresh_web_research_unavailable")
  };
  report.checks = checks;
  report.fresh_web_research_succeeded = checks.web_search_observed &&
    checks.source_information && checks.no_fresh_web_failure;
  report.status = Object.values(checks).every(Boolean) ? "PASS" : "BLOCKED";
  // A limited smoke query can pass connectivity checks without meeting Full Audit evidence requirements.
  if (report.status !== "PASS") process.exitCode = 1;
} catch (error) {
  report.error = error instanceof Error ? error.message : String(error);
  process.exitCode = 1;
} finally {
  report.completed_at = new Date().toISOString();
  report.diagnostics = adapter.diagnostics;
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify(report, null, 2) + "\n", { flag: "wx" });
  console.log(JSON.stringify({ ...report, result_file: outputFile }, null, 2));
}
