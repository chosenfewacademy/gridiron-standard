import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { z } from "zod";
import { CodexResearchAdapter } from "../../src/codex-research.js";
import { resolvePlayer } from "../../src/player-resolver.js";
import { mapToMaddenBucket } from "../../src/position-mapper.js";
import { buildPlayerAuditTask } from "../../src/player-audit-task.js";
import { loadBaselineControls } from "../../src/baseline-controls.js";

// Evidence stage only. No audit executor, approval, queue, or card-linking imports.
const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.resolve(root, file), "utf8");
const resolution = resolvePlayer("Jalen Hurts");
if (resolution.status !== "RESOLVED" || !resolution.player) throw new Error("Player unresolved");
const player = resolution.player;
const mapping = mapToMaddenBucket(player.position);
if (mapping.exact_position !== "QB" || mapping.requires_role_resolution) throw new Error("Exact QB mapping required");
const task = buildPlayerAuditTask(player);
const controls = loadBaselineControls(task.position);
const baselineText = read(task.locked_baseline_file);
const categories = [
  "current_season_performance", "passing_production_efficiency", "advanced_passing_metrics",
  "pressure_performance", "accuracy_by_depth", "turnover_worthy_mistakes",
  "rushing_designed_run_value", "scrambling_sack_avoidance", "durability_availability",
  "current_injury_practice_status", "role_workload", "recent_performance_trend",
  "prior_season_context", "locked_top10_peer_comparisons", "outside_control_comparisons"
];
const runDirectory = path.resolve(root, "logs/audit-smoke", randomUUID());
fs.mkdirSync(runDirectory, { recursive: true });
function save(name: string, value: unknown) {
  fs.writeFileSync(path.join(runDirectory, name), JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
}
const startedAt = new Date().toISOString();
const request = {
  ...task, dry_run: true, as_of: startedAt, player, mapping,
  baseline_file: task.locked_baseline_file,
  baseline_sha256: createHash("sha256").update(baselineText).digest("hex"),
  authoritative_baseline: JSON.parse(baselineText), baseline_controls: controls,
  governing_instructions: read("AGENTS.md"),
  evidence_policy: read("config/evidence-policy.md"),
  evidence_schema: JSON.parse(read("schemas/evidence-package.schema.json")),
  qb_architecture: read("config/positions/QB.md"),
  required_categories: categories,
  research_instructions: `Perform a thorough Full Player Audit evidence collection for Jalen Hurts, not the earlier brief connectivity query.
Use fresh web search and open sources. Attempt ALL 15 required categories, including direct same-season comparisons with the STORED Top 10 and all three external controls. Do not change or challenge the stored rankings in this research stage. Prefer NFL/team/Next Gen Stats, official play-by-play, public advanced metrics from established analytics providers, PFR, ESPN, and publicly accessible PFF analysis. Search specifically for pressure splits, depth accuracy/CPOE, turnover-worthy rate or a clearly labeled interception/fumble substitute, designed runs versus scrambles, sacks/pressure-to-sack or comparable evidence, and injury/practice status. Seek a common peer table for production and advanced comparisons. Do not bypass subscriptions or fabricate unavailable premium values.
Current-season evidence is primary. Establish season and sample explicitly. If current regular-season data does not exist, state that with a source; distinguish preseason/camp observations from regular-season performance and prior-season context. Do not silently redefine current season. Attempt public substitutes for unavailable metrics; explain exactly what they do and do not measure. Preserve conflicting evidence.
Return the existing EvidencePackage JSON shape with normalized containing ONLY these 15 category keys. Each category must have {status: 'satisfied'|'partial'|'missing', confidence: 'HIGH'|'MEDIUM'|'LOW', items: [{claim: string, source_url: string, retrieved_at: ISO timestamp, season_or_period: string}], unavailable: string[], public_substitute: string|null, limitation: string|null}. Every normalized factual item MUST include a source URL and actual retrieval timestamp. Missing categories still require an honest search/availability explanation in limitation/unavailable; do not invent evidence items. All item URLs must also appear in sources. Give substantive evidence, not just URLs. Use at least one high-authority source and multiple independent sources where practical. Record all material gaps in missing_evidence, preserving confidence distinctions. Set minimum_evidence_met honestly for Full Audit readiness, not merely JSON completeness or identity confirmation. Do not weaken requirements to make it true. The existing QB architecture is import-pending; do not invent missing locked rules.
This research thread is read-only. Do not assign any Madden attributes, ratings, OVR, or Top 10 membership. Do not run project commands or write files. Collect evidence only. Limit research to a reasonable focused pass, then return valid JSON even if gaps remain.`
};
save("request.json", request);
const adapter = new CodexResearchAdapter({
  sandboxMode: "read-only", approvalPolicy: "never", webSearchMode: "live",
  workingDirectory: root, skipGitRepoCheck: true
}, { signal: AbortSignal.timeout(480_000) });
const time = z.string().datetime({ offset: true });
const categorySchema = z.object({
  status: z.enum(["satisfied", "partial", "missing"]), confidence: z.enum(["HIGH", "MEDIUM", "LOW"]),
  items: z.array(z.object({claim: z.string().min(1), source_url: z.string().url(), retrieved_at: time, season_or_period: z.string().min(1)})),
  unavailable: z.array(z.string()), public_substitute: z.string().nullable(), limitation: z.string().nullable()
});
const schema = z.object({
  task_id: z.literal(task.task_id), position: z.literal("QB"), researched_at: time,
  sources: z.array(z.object({name: z.string(), url: z.string().url(), retrieved_at: time,
    published_at: z.string().nullable(), authority_tier: z.number().int().min(1).max(5), claims: z.array(z.string())})),
  normalized: z.record(categorySchema), conflicts: z.array(z.record(z.unknown())),
  minimum_evidence_met: z.boolean(), missing_evidence: z.array(z.string())
});
console.log(`Researching all ${categories.length} categories; outputs: ${runDirectory}`);
try {
  const evidence = await adapter.gather(request);
  save("evidence.json", evidence);
  const checked = schema.safeParse(evidence);
  const errors: string[] = checked.success ? [] : checked.error.issues.map(issue => `${issue.path.join(".")}: ${issue.message}`);
  if (checked.success) {
    const urls = new Set(checked.data.sources.map(source => source.url));
    for (const name of categories) {
      const category = checked.data.normalized[name];
      if (!category) { errors.push(`Missing category ${name}`); continue; }
      if (category.status === "satisfied" && category.items.length === 0) errors.push(`No evidence for ${name}`);
      for (const item of category.items) if (!urls.has(item.source_url)) errors.push(`Unlisted source in ${name}: ${item.source_url}`);
    }
    if (!checked.data.sources.some(source => source.authority_tier === 1)) errors.push("No high-authority source");
  }
  if (!adapter.diagnostics.web_searches.length) errors.push("No observed fresh web searches");
  save("evidence-check.json", {
    structured_json_parsed: true, structure_and_provenance_valid: errors.length === 0, errors,
    reported_minimum_evidence_met: evidence.minimum_evidence_met,
    ready_for_manual_evidence_gate_review: errors.length === 0 && evidence.minimum_evidence_met === true,
    rating_generation_executed: false, validator_executed: false, revision_count: 0,
    missing_evidence: evidence.missing_evidence
  });
  console.log(JSON.stringify({ run_directory: runDirectory, minimum_evidence_met: evidence.minimum_evidence_met,
    source_count: evidence.sources.length, errors, missing_evidence: evidence.missing_evidence }, null, 2));
} catch (error) {
  save("error.json", { error: error instanceof Error ? error.message : String(error) });
  process.exitCode = 1;
} finally {
  save("research-diagnostics.json", { started_at: startedAt, completed_at: new Date().toISOString(), ...adapter.diagnostics });
}
