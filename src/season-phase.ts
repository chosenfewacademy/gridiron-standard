import { createHash } from "node:crypto";
import { z } from "zod";

export const SEASON_PHASES = ["OFFSEASON", "PRESEASON", "REGULAR_SEASON_EARLY",
  "REGULAR_SEASON_ESTABLISHED", "POSTSEASON", "COMPLETE_SEASON"] as const;
export type SeasonPhase = typeof SEASON_PHASES[number];

// Operational evidence-sampling default, not an NFL rule or a Madden rating formula.
export const DEFAULT_ESTABLISHED_AFTER_GAMES = 4;
export const CALENDAR_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const instant = z.string().datetime({ offset: true });
export const calendarSnapshotSchema = z.object({
  nfl_season: z.number().int().min(1920),
  player_id: z.string().min(1), team: z.string().min(1),
  valid_from: instant, valid_until: instant,
  preseason_start: instant, regular_season_start: instant,
  postseason_start: instant, season_end: instant,
  current_season_games_available: z.number().int().nonnegative(),
  current_season_games_played: z.number().int().nonnegative(),
  regular_season_games_scheduled: z.number().int().positive(),
  regular_season_complete: z.boolean(),
  postseason_complete: z.boolean(),
  sources: z.array(z.object({
    url: z.string().url(), retrieved_at: instant, claims: z.array(z.string().min(1)).min(1),
    season: z.number().int().min(1920).optional(), boundary_valid_from: instant.optional(),
    boundary_valid_until: instant.optional(), authority_class: z.enum(["OFFICIAL_NFL_CALENDAR", "OFFICIAL_NFL_SCHEDULE", "OFFICIAL_NFL_TEAM_SCHEDULE"]).optional(),
    content_fingerprint: z.string().regex(/^[a-f0-9]{64}$/).optional()
  })).min(1)
});
export type CalendarSnapshot = z.infer<typeof calendarSnapshotSchema>;
export interface SampleSizeContext {
  weighting: "COMPLETED_SEASON_PRIMARY_WITH_CURRENT_CONTEXT" |
    "COMPLETED_SEASON_PRIMARY_WITH_SMALL_CURRENT_SAMPLE" | "CURRENT_SEASON_PRIMARY_PRIOR_CONTEXT";
  established_after_games: number;
  player_sample_limited: boolean;
  limitations: string[];
}
export interface SeasonMetadata {
  nfl_season: number;
  season_phase: SeasonPhase;
  evidence_season: number;
  sample_size_context: SampleSizeContext;
  current_season_games_available: number;
  current_season_games_played: number;
  prior_season_used_as_primary_baseline: boolean;
}
export type SeasonContext = { status: "RESOLVED"; metadata: SeasonMetadata; calendar: CalendarSnapshot } |
  { status: "UNAVAILABLE"; errors: string[] };
export type CalendarResolutionLevel = "LIVE_OFFICIAL" | "CACHED_AUTHORITATIVE" | "STORED_OFFICIAL_ARTIFACT";
export type AuthoritativeSeasonContext = (Extract<SeasonContext, { status: "RESOLVED" }> & {
  resolution_level: CalendarResolutionLevel; boundary_fingerprint: string; source_fresh: boolean;
}) | Extract<SeasonContext, { status: "UNAVAILABLE" }>;

export function isOfficialNflUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password &&
      (url.hostname === "nfl.com" || url.hostname.endsWith(".nfl.com"));
  } catch { return false; }
}

export function deriveSeasonContext(
  input: unknown, asOf: string, subject: { player_id?: unknown; team?: unknown },
  options: { establishedAfterGames?: number } = {}
): SeasonContext {
  const result = calendarSnapshotSchema.safeParse(input);
  if (!result.success) return { status: "UNAVAILABLE", errors: ["CALENDAR_UNAVAILABLE_OR_INVALID"] };
  const calendar = result.data;
  const now = Date.parse(asOf);
  const threshold = options.establishedAfterGames ?? DEFAULT_ESTABLISHED_AFTER_GAMES;
  const errors: string[] = [];
  if (!Number.isFinite(now)) errors.push("CALENDAR_INVALID_AS_OF");
  if (!Number.isInteger(threshold) || threshold < 1) errors.push("CALENDAR_INVALID_SAMPLE_THRESHOLD");
  if (calendar.player_id !== subject.player_id || calendar.team !== subject.team) errors.push("CALENDAR_SUBJECT_MISMATCH");
  const dates = [calendar.valid_from, calendar.preseason_start, calendar.regular_season_start,
    calendar.postseason_start, calendar.season_end, calendar.valid_until].map(Date.parse);
  if (dates.some((value, index) => index > 0 && value <= dates[index - 1])) errors.push("CALENDAR_BOUNDARIES_INCONSISTENT");
  if (now < dates[0] || now >= dates[5]) errors.push("CALENDAR_OUTSIDE_COVERAGE");
  for (const source of calendar.sources) {
    if (!isOfficialNflUrl(source.url)) errors.push("CALENDAR_NONOFFICIAL_SOURCE");
    const age = now - Date.parse(source.retrieved_at);
    if (age < 0 || age > CALENDAR_MAX_AGE_MS) errors.push("CALENDAR_STALE_OR_FUTURE_SOURCE");
  }
  const available = calendar.current_season_games_available;
  const played = calendar.current_season_games_played;
  if (played > available || available > calendar.regular_season_games_scheduled) errors.push("CALENDAR_GAME_COUNTS_INCONSISTENT");
  if (now < dates[2] && (available !== 0 || played !== 0)) errors.push("CALENDAR_PRESEASON_REGULAR_GAMES_CONFLICT");
  if ((now >= dates[3] && !calendar.regular_season_complete) ||
      (now >= dates[4] && !calendar.postseason_complete) ||
      (calendar.postseason_complete && !calendar.regular_season_complete) ||
      (now < dates[2] && (calendar.regular_season_complete || calendar.postseason_complete))) {
    errors.push("CALENDAR_COMPLETION_STATUS_CONFLICT");
  }
  if (errors.length) return { status: "UNAVAILABLE", errors: [...new Set(errors)] };
  const phase: SeasonPhase = now < dates[1] ? "OFFSEASON" : now < dates[2] ? "PRESEASON" :
    now < dates[3] ? (available < threshold ? "REGULAR_SEASON_EARLY" : "REGULAR_SEASON_ESTABLISHED") :
      now < dates[4] ? "POSTSEASON" : "COMPLETE_SEASON";
  const priorPrimary = phase === "OFFSEASON" || phase === "PRESEASON" || phase === "REGULAR_SEASON_EARLY";
  const early = phase === "REGULAR_SEASON_EARLY";
  return { status: "RESOLVED", calendar, metadata: {
    nfl_season: calendar.nfl_season, season_phase: phase,
    evidence_season: calendar.nfl_season - (priorPrimary ? 1 : 0),
    current_season_games_available: available, current_season_games_played: played,
    prior_season_used_as_primary_baseline: priorPrimary,
    sample_size_context: {
      weighting: early ? "COMPLETED_SEASON_PRIMARY_WITH_SMALL_CURRENT_SAMPLE" : priorPrimary ?
        "COMPLETED_SEASON_PRIMARY_WITH_CURRENT_CONTEXT" : "CURRENT_SEASON_PRIMARY_PRIOR_CONTEXT",
      established_after_games: threshold, player_sample_limited: played < threshold,
      limitations: [
        ...(early ? ["Small current-season samples cannot automatically override the completed-season baseline."] : []),
        ...(played < threshold ? ["Player regular-season sample is limited; retain availability, workload, and prior-season context."] : []),
        "Game counts do not establish sufficient snaps, attempts, or exact-trait confidence; document those samples in category evidence."
      ]
    }
  } };
}

function boundaryFingerprint(calendar: CalendarSnapshot): string {
  return createHash("sha256").update(JSON.stringify({ season: calendar.nfl_season, valid_from: calendar.valid_from,
    valid_until: calendar.valid_until, preseason_start: calendar.preseason_start,
    regular_season_start: calendar.regular_season_start, postseason_start: calendar.postseason_start,
    season_end: calendar.season_end })).digest("hex");
}
function enrichCalendar(calendar: CalendarSnapshot): CalendarSnapshot {
  const fingerprint=boundaryFingerprint(calendar);
  return { ...calendar, sources: calendar.sources.map(source=>({ ...source, season:source.season??calendar.nfl_season,
    boundary_valid_from:source.boundary_valid_from??calendar.valid_from, boundary_valid_until:source.boundary_valid_until??calendar.valid_until,
    authority_class:source.authority_class??(source.url.includes("/by-team/")?"OFFICIAL_NFL_TEAM_SCHEDULE":source.url.includes("schedule")?"OFFICIAL_NFL_SCHEDULE":"OFFICIAL_NFL_CALENDAR"),
    content_fingerprint:source.content_fingerprint??createHash("sha256").update(`${fingerprint}:${source.url}:${source.claims.join("|")}`).digest("hex") })) };
}

function immutableBoundaryContext(input: unknown, asOf: string, subject: { player_id?: unknown; team?: unknown },
  options: { establishedAfterGames?: number } = {}): AuthoritativeSeasonContext {
  const parsed = calendarSnapshotSchema.safeParse(input);
  if (!parsed.success) return { status: "UNAVAILABLE", errors: ["CALENDAR_UNAVAILABLE_OR_INVALID"] };
  const calendar = parsed.data; const now = Date.parse(asOf); const errors: string[] = [];
  if (!Number.isFinite(now)) errors.push("CALENDAR_INVALID_AS_OF");
  if (calendar.player_id !== subject.player_id || calendar.team !== subject.team) errors.push("CALENDAR_SUBJECT_MISMATCH");
  const dates = [calendar.valid_from, calendar.preseason_start, calendar.regular_season_start,
    calendar.postseason_start, calendar.season_end, calendar.valid_until].map(Date.parse);
  if (dates.some((value, index) => index > 0 && value <= dates[index - 1])) errors.push("CALENDAR_BOUNDARIES_INCONSISTENT");
  if (now < dates[0] || now >= dates[5]) errors.push("CALENDAR_OUTSIDE_COVERAGE");
  if (calendar.sources.some(source => !isOfficialNflUrl(source.url))) errors.push("CALENDAR_NONOFFICIAL_SOURCE");
  if (calendar.sources.some(source => Date.parse(source.retrieved_at) > now)) errors.push("CALENDAR_FUTURE_SOURCE");
  // A cached boundary may establish only immutable pre-season phases. Once games begin,
  // game counts and completion state are mutable and require a fresh official snapshot.
  if (now >= dates[2]) errors.push("CALENDAR_MUTABLE_STATE_REQUIRES_FRESH_SOURCE");
  if (calendar.current_season_games_available !== 0 || calendar.current_season_games_played !== 0 ||
      calendar.regular_season_complete || calendar.postseason_complete) errors.push("CALENDAR_PRESEASON_REGULAR_GAMES_CONFLICT");
  if (errors.length) return { status: "UNAVAILABLE", errors: [...new Set(errors)] };
  const phase: SeasonPhase = now < dates[1] ? "OFFSEASON" : "PRESEASON";
  const threshold = options.establishedAfterGames ?? DEFAULT_ESTABLISHED_AFTER_GAMES;
  return { status: "RESOLVED", calendar:enrichCalendar(calendar), resolution_level: "CACHED_AUTHORITATIVE",
    boundary_fingerprint: boundaryFingerprint(calendar), source_fresh: false, metadata: {
      nfl_season: calendar.nfl_season, season_phase: phase, evidence_season: calendar.nfl_season - 1,
      current_season_games_available: 0, current_season_games_played: 0, prior_season_used_as_primary_baseline: true,
      sample_size_context: { weighting: "COMPLETED_SEASON_PRIMARY_WITH_CURRENT_CONTEXT", established_after_games: threshold,
        player_sample_limited: true, limitations: ["Season phase is established from immutable official NFL boundaries; mutable game counts require fresh evidence.",
          "Player regular-season sample is unavailable; retain current role, availability, and completed-season evidence."] }
    } };
}

export function resolveAuthoritativeSeasonContext(input: { live?: unknown; cached?: unknown; stored?: unknown[] }, asOf: string,
  subject: { player_id?: unknown; team?: unknown }, options: { establishedAfterGames?: number } = {}): AuthoritativeSeasonContext {
  const candidates = [input.live, input.cached, ...(input.stored ?? [])].filter(value => value !== undefined);
  const parsed = candidates.map(value => calendarSnapshotSchema.safeParse(value)).filter(result => result.success).map(result => result.data);
  const applicable = parsed.filter(c => c.player_id === subject.player_id && c.team === subject.team &&
    Date.parse(asOf) >= Date.parse(c.valid_from) && Date.parse(asOf) < Date.parse(c.valid_until) && c.sources.every(s => isOfficialNflUrl(s.url)));
  const fingerprints = new Set(applicable.map(boundaryFingerprint));
  if (fingerprints.size > 1) return { status: "UNAVAILABLE", errors: ["CALENDAR_AUTHORITATIVE_SOURCE_CONFLICT"] };
  if (input.live !== undefined) {
    const live = deriveSeasonContext(input.live, asOf, subject, options);
    if (live.status === "RESOLVED") return { ...live, calendar:enrichCalendar(live.calendar), resolution_level: "LIVE_OFFICIAL", boundary_fingerprint: boundaryFingerprint(live.calendar), source_fresh: true };
  }
  const fallbacks = [input.cached, input.live, ...(input.stored ?? [])];
  for (const [index, value] of fallbacks.entries()) {
    if (value === undefined) continue;
    const fallback = immutableBoundaryContext(value, asOf, subject, options);
    if (fallback.status === "RESOLVED") return { ...fallback, resolution_level: index <= 1 ? "CACHED_AUTHORITATIVE" : "STORED_OFFICIAL_ARTIFACT" };
  }
  return { status: "UNAVAILABLE", errors: ["CALENDAR_UNRESOLVED"] };
}
