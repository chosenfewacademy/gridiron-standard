import { z } from "zod";
import { CALENDAR_MAX_AGE_MS, resolveAuthoritativeSeasonContext, type SeasonPhase } from "./season-phase.js";
import { evaluateQbEvidenceCriticality } from "./qb-evidence-policy.js";
import type { EvidencePackage } from "./research.js";

export interface EvidenceRequirement { name: string; layer: "PRIMARY" | "CURRENT" | "MULTI_YEAR" | "POSTSEASON"; allowNotApplicable?: boolean }
const COMMON: EvidenceRequirement[] = [
  { name: "performance_summary", layer: "PRIMARY" },
  { name: "postseason_context", layer: "POSTSEASON", allowNotApplicable: true },
  { name: "multi_year_trend", layer: "MULTI_YEAR" },
  ...["current_role", "roster_depth_chart", "injury_practice_status", "age_career_trajectory", "team_system_context"]
    .map(name => ({ name, layer: "CURRENT" as const })),
  { name: "preseason_participation", layer: "CURRENT", allowNotApplicable: true },
  ...["durability_availability", "recent_performance_trend", "locked_control_comparisons", "outside_control_comparisons", "position_specific_traits"]
    .map(name => ({ name, layer: "PRIMARY" as const }))
];
const QB = ["passing_production_efficiency", "advanced_passing_metrics", "pressure_performance",
  "accuracy_by_depth", "turnover_worthy_mistakes", "rushing_designed_run_value", "scrambling_sack_avoidance"];

export function requiredEvidenceCategories(position: string, phase: SeasonPhase): EvidenceRequirement[] {
  return [...COMMON.map(item => ({ ...item })),
    ...(position === "QB" ? QB.map(name => ({ name, layer: "PRIMARY" as const })) : []),
    ...(!["OFFSEASON", "PRESEASON"].includes(phase) ? [{ name: "current_season_performance", layer: "CURRENT" as const }] : [])];
}

const instant = z.string().datetime({ offset: true });
export const evidenceCategorySchema = z.object({
  status: z.enum(["satisfied", "partial", "missing", "not_applicable"]),
  confidence: z.enum(["HIGH", "MEDIUM", "LOW"]),
  items: z.array(z.object({
    claim: z.string().trim().min(1), source_url: z.string().url(), retrieved_at: instant,
    season: z.number().int(), period: z.enum(["REGULAR_SEASON", "POSTSEASON", "CURRENT_CONTEXT"])
  })).min(1),
  limitations: z.array(z.string()),
  not_applicable_reason: z.string().trim().min(1).optional(),
  compared_controls: z.array(z.string()).optional()
});
const packageSchema = z.object({
  task_id: z.string(), position: z.string(), researched_at: instant,
  sources: z.array(z.object({ name: z.string().min(1), url: z.string().url(), retrieved_at: instant,
    published_at: z.string().nullable(), authority_tier: z.number().int().min(1).max(5), claims: z.array(z.string()) })).min(1),
  normalized: z.record(z.unknown()), conflicts: z.array(z.record(z.unknown())),
  minimum_evidence_met: z.boolean(), missing_evidence: z.array(z.string())
});

function controlNames(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map(item => typeof item === "string" ? item : item?.player).filter((name): name is string => typeof name === "string");
}
function qbPolicyCategories(normalized: Record<string, unknown>): Record<string, unknown> | null {
  const parent=normalized.position_specific_traits as any;
  if (!parent?.domain_assessments && !parent?.trait_assessments) return null;
  return { ...normalized,
    ...Object.fromEntries(Object.entries(parent.domain_assessments ?? {}).map(([key,value])=>[`domain:${key}`,value])),
    ...Object.fromEntries(Object.entries(parent.trait_assessments ?? {}).map(([key,value])=>[`trait:${key}`,value])) };
}

/** Season-calendar subject (commissioner-approved 2026-11-02): provisional_top_10 and pair_audit tasks with no single
 * player (and, under Addendum v1.1.2, candidate_audit tasks) may use a position-wide subject {player_id: "POSITION_WIDE:<POS>", team: "NFL"}. Every other task keeps the strict
 * player/team match. Position-wide calendars must resolve LIVE from fresh official nfl.com sources that state the
 * regular-season start and the season end (Super Bowl). */
export const POSITION_WIDE_TASK_TYPES = new Set(["provisional_top_10", "pair_audit", "candidate_audit"]);
export function isPositionWideTask(task: Record<string, unknown>): boolean {
  return POSITION_WIDE_TASK_TYPES.has(String(task.type)) && (task.player_id === undefined || task.player_id === null);
}
export function calendarSubject(task: Record<string, unknown>): { player_id?: unknown; team?: unknown } {
  return isPositionWideTask(task) ? { player_id: `POSITION_WIDE:${String(task.position)}`, team: "NFL" } : task;
}

// This gate never approves an audit, mutates its input, or writes project state.
export function applyFullAuditEvidenceGate(evidence: EvidencePackage, task: Record<string, unknown>, asOf: string): EvidencePackage {
  const context = resolveAuthoritativeSeasonContext({ live: evidence.calendar,
    cached: evidence.calendar_fallbacks?.[0], stored: evidence.calendar_fallbacks?.slice(1) }, asOf, calendarSubject(task));
  const errors: string[] = [];
  if (isPositionWideTask(task) && context.status === "RESOLVED") {
    const claims = context.calendar.sources.flatMap(s => s.claims).join(" | ");
    if (context.resolution_level !== "LIVE_OFFICIAL") errors.push("POSITION_WIDE_CALENDAR_REQUIRES_LIVE_OFFICIAL");
    if (!/regular[- ]season/i.test(claims) || !/super bowl|season end/i.test(claims)) errors.push("POSITION_WIDE_CALENDAR_START_END_SOURCES_MISSING");
  }
  const checked = packageSchema.safeParse(evidence);
  if (!checked.success) errors.push("INVALID_FULL_AUDIT_EVIDENCE_STRUCTURE");
  if (evidence.calendar_web_search_observed !== true && context.status !== "RESOLVED") errors.push("FRESH_CALENDAR_RESEARCH_UNAVAILABLE");
  if (evidence.fresh_web_research_observed !== true) errors.push("fresh_web_research_unavailable");
  if (context.status !== "RESOLVED") errors.push(...context.errors);
  const warnings: string[] = [];
  if (checked.success && context.status === "RESOLVED") {
    const data = checked.data;
    const metadata = context.metadata;
    if (data.task_id !== task.task_id || data.position !== task.position) errors.push("EVIDENCE_TASK_MISMATCH");
    if (!data.sources.some(source => source.authority_tier === 1 && source.claims.length)) errors.push("HIGH_AUTHORITY_EVIDENCE_MISSING");
    const sources = new Map(data.sources.map(source => [source.url, source]));
    const fresh = (time: string) => Date.parse(asOf) - Date.parse(time) >= 0 && Date.parse(asOf) - Date.parse(time) <= CALENDAR_MAX_AGE_MS;
    if (!fresh(data.researched_at)) errors.push("EVIDENCE_STALE_OR_FUTURE");
    const requirements = requiredEvidenceCategories(data.position, metadata.season_phase);
    for (const name of Object.keys(data.normalized)) {
      if (!requirements.some(requirement => requirement.name === name)) errors.push(`${name}: UNEXPECTED_UNCHECKED_CATEGORY`);
    }
    for (const requirement of requirements) {
      const category = evidenceCategorySchema.safeParse(data.normalized[requirement.name]);
      const fail = (reason: string) => errors.push(`${requirement.name}: ${reason}`);
      if (!category.success) { fail("MISSING_OR_INVALID_CATEGORY"); continue; }
      const value = category.data;
      const notApplicable = value.status === "not_applicable";
      const qbCategories=data.position === "QB" ? qbPolicyCategories(data.normalized as Record<string, unknown>) : null;
      const qbPolicy = qbCategories ? evaluateQbEvidenceCriticality(qbCategories, data.conflicts) : null;
      const policySubject = qbPolicy?.subjects.find(subject => subject.name === requirement.name);
      const policyPermitsGap = policySubject && policySubject.criticality !== "CORE_BLOCKING" && policySubject.substitute_approved;
      if (value.status !== "satisfied" && !(notApplicable && requirement.allowNotApplicable && value.not_applicable_reason) && !policyPermitsGap) fail("CATEGORY_NOT_SATISFIED");
      if (value.confidence === "LOW" && !policyPermitsGap) fail("LOW_CONFIDENCE_EVIDENCE");
      for (const item of value.items) {
        const source = sources.get(item.source_url);
        if (!source || !fresh(item.retrieved_at) || !fresh(source.retrieved_at)) fail("UNTRACEABLE_OR_STALE_ITEM");
        if (item.season > metadata.nfl_season) fail("FUTURE_SEASON_EVIDENCE");
        if (["OFFSEASON", "PRESEASON"].includes(metadata.season_phase) &&
          item.season === metadata.nfl_season && item.period === "REGULAR_SEASON") fail("NONEXISTENT_UPCOMING_REGULAR_SEASON_SAMPLE");
      }
      const expectedSeason = requirement.layer === "CURRENT" ? metadata.nfl_season : metadata.evidence_season;
      if (!value.items.some(item => item.season === expectedSeason)) fail("REQUIRED_SEASON_NOT_COVERED");
      if (!notApplicable) {
        if (requirement.layer === "PRIMARY" && !value.items.some(item => item.season === expectedSeason && item.period === "REGULAR_SEASON")) fail("PRIMARY_REGULAR_SEASON_SAMPLE_MISSING");
        if (requirement.layer === "POSTSEASON" && !value.items.some(item => item.season === expectedSeason && item.period === "POSTSEASON")) fail("POSTSEASON_SAMPLE_MISSING");
        if (requirement.layer === "MULTI_YEAR" && !value.items.some(item => item.season < expectedSeason)) fail("MULTI_YEAR_CONTEXT_MISSING");
        if (requirement.name === "current_season_performance" && metadata.current_season_games_played > 0 &&
          !value.items.some(item => item.season === metadata.nfl_season && item.period === "REGULAR_SEASON")) fail("CURRENT_REGULAR_SEASON_SAMPLE_MISSING");
      }
      const controls = task.baseline_controls as { top_10?: unknown; external_controls?: unknown } | undefined;
      if (requirement.name === "locked_control_comparisons") {
        const expected = controlNames(controls?.top_10);
        if (!expected.length || !expected.every(name => value.compared_controls?.includes(name))) fail("LOCKED_CONTROL_COVERAGE_MISSING");
      }
      if (requirement.name === "outside_control_comparisons") {
        const expected = controlNames(controls?.external_controls);
        if (!expected.some(name => value.compared_controls?.includes(name))) fail("NEAREST_OUTSIDE_CONTROL_MISSING");
      }
    }
    const qbCategories=qbPolicyCategories(data.normalized as Record<string, unknown>);
    if (data.position === "QB" && qbCategories) {
      const policy=evaluateQbEvidenceCriticality(qbCategories, data.conflicts);
      errors.push(...policy.blockers); warnings.push(...policy.supporting_weaknesses,...policy.secondary_low_confidence,...policy.contextual_gaps);
    }
  }
  const policyAwareQb = evidence.position === "QB" && qbPolicyCategories(evidence.normalized) !== null;
  const declaredMissing = policyAwareQb ? [] : (Array.isArray(evidence.missing_evidence) ? evidence.missing_evidence : []);
  const missing = [...new Set([...declaredMissing, ...errors])];
  return {
    ...evidence,
    audit_type: "FULL_AUDIT",
    ...(context.status === "RESOLVED" ? context.metadata : {
      nfl_season: null, season_phase: null, evidence_season: null, sample_size_context: null,
      current_season_games_available: null, current_season_games_played: null, prior_season_used_as_primary_baseline: null
    }),
    minimum_evidence_met: missing.length === 0,
    missing_evidence: missing,
    evidence_warnings: [...new Set(warnings)], gate_reasons: [...new Set([...missing,...warnings])],
    calendar_resolution_level: context.status === "RESOLVED" ? context.resolution_level : null
  };
}
