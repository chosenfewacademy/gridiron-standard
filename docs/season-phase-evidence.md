# Season-phase-aware Full Player Audit evidence

## Implementation design and scope

The user-authorized evidence change is implemented as a pure calendar resolver and a pure evidence gate, followed by two-stage research integration. Date-only heuristics would confuse NFL season labels with calendar years. Accepting the research model's phase/readiness assertion alone would leave the application without independent checks. The implemented path instead collects sourced calendar facts and derives the phase and primary evidence season in application code.

Implementation sequence: write synthetic phase/gate tests; implement `src/season-phase.ts` and `src/evidence-gate.ts`; wire calendar-first research and an executor-level gate; test the wiring with an injected mock SDK; document calibration limitations; run typecheck, all tests and unchanged preflight. Tests do not call live research or player audits.

This applies to named-player Full Audit tasks (`player_full_audit` or `audit_type: FULL_AUDIT`). The player executor checks the gate again before creating an analyst. It does not alter positional workflow stages, Top 10 permissions, approval rules, Quick Recheck scope, or historical records. The legacy connectivity smoke query remains a connectivity query. Existing evidence records are not migrated or reclassified.

## Calendar provenance and phase derivation

Full Audit research starts a separate read-only Codex calendar thread with live web search and no permission escalation. Accepted calendar evidence must identify the NFL season, player, team, sourced phase boundaries and regular-season game counts. Calendar sources must be HTTPS `nfl.com` or a subdomain (including `operations.nfl.com`), have claims, and have retrieval timestamps no more than 24 hours old. Both calendar and performance stages must show actual SDK web-search events. Source URLs alone are not treated as proof of fresh research.

Official discovery entry points are [NFL Football Operations important dates](https://operations.nfl.com/calendar-events/nfl-important-dates) and the [NFL schedule](https://www.nfl.com/schedules/). No production dates are hard-coded. Calendar extraction still relies on the research collector reading the cited pages; hostname/shape checks cannot independently prove the accuracy of every extracted fact.

The sourced boundaries are:

- `valid_from`: NFL league-year start for `nfl_season`.
- `preseason_start`: official start of the subject team's camp/preseason activity.
- `regular_season_start`: first league regular-season kickoff.
- `postseason_start`: start of the day after the final scheduled regular-season game date, including the interval before playoff kickoff.
- `season_end`: start of the day after the final scheduled postseason game date.
- `valid_until`: next NFL league-year start. A snapshot outside this interval is rejected; obtain the next season's snapshot instead.

Boundaries must be strictly chronological and carry timezone-aware timestamps. The two game-conclusion boundaries use America/New_York calendar days, not guessed future final-whistle times. `regular_season_complete` and `postseason_complete` must separately confirm official final statuses before entry into the corresponding concluded phase. A postponed unfinished game therefore blocks a stale calendar boundary. The classifier uses half-open intervals: a boundary instant belongs to the new phase. January/February retain the NFL season identifier supplied by the official calendar. Scheduled games are not counted as completed merely because a kickoff date has passed.

If any required boundary or count is unavailable, unpublished, conflicting, stale, future-retrieved, or inconsistent, `season_phase` and the other derived fields are null, and `minimum_evidence_met` is false. There is no calendar-year or cached-memory fallback. This can intentionally block an offseason request when future boundaries have not yet been established authoritatively.

## Evidence behavior by phase

| Phase | Primary performance season | Required contextual treatment |
|---|---|---|
| OFFSEASON | Previous NFL regular season | Its postseason where applicable; multi-year trend; current role, roster/depth, injury/practice, participation relevance, age/career and team/system context |
| PRESEASON | Previous NFL regular season | Same complete package, with current camp/preseason participation and role evidence; no nonexistent upcoming regular-season production requirement |
| REGULAR_SEASON_EARLY | Previous NFL regular season | Add current performance/absence evidence; small samples cannot automatically override the completed-season baseline |
| REGULAR_SEASON_ESTABLISHED | Current NFL regular season | Prior seasons remain sustainability/trajectory context; retain warnings if the individual has few appearances |
| POSTSEASON | Current NFL regular season | Separate postseason evidence; do not merge samples or mislabel January games as a new NFL season |
| COMPLETE_SEASON | Just-completed NFL regular season | Completed regular-season and applicable postseason evidence, plus current availability/context until the next league-year transition |

The default early/established boundary is **four completed regular-season team opportunities**. This is an explicit operational sampling default, not an official NFL phase, a claim of statistical sufficiency, or an OVR weight. `deriveSeasonContext` accepts an `establishedAfterGames` option for explicit callers; the production gate consistently uses `DEFAULT_ESTABLISHED_AFTER_GAMES`. Altering the production threshold requires a deliberate code/configuration change and test review, never a model-selected value.

`current_season_games_available` means completed regular-season opportunities for the subject's team; the collector must explicitly reconcile opportunities across trades. `current_season_games_played` is the player's sourced regular-season appearances. Both exclude preseason and postseason. Zero appearances are distinct from zero team opportunities. Counts must satisfy `0 <= played <= available <= scheduled`, with both zero before Week 1. Ambiguous trade/schedule counts block resolution rather than guessing.

## Metadata

Every evaluated Full Audit package receives application-derived `nfl_season`, `season_phase`, `evidence_season`, `sample_size_context`, `current_season_games_available`, `current_season_games_played`, and `prior_season_used_as_primary_baseline`. The researcher cannot select these values independently of the calendar. `sample_size_context` records weighting, the establishment threshold, an individual limited-sample flag, and limitations. It never supplies numerical rating weights. Game counts alone do not prove adequate snaps/attempts; category evidence must document those samples.

## Category contract and gate

All phases require the same 14 core categories: performance summary, applicable postseason context, multi-year trend, current role, roster/depth chart, injury/practice status, age/career trajectory, team/system context, preseason participation relevance, durability/availability, recent trend, locked-control comparisons, outside-control comparisons, and independent evidence for position-specific major traits.

QB additionally requires all seven previously investigated performance categories: passing production/efficiency, advanced passing metrics, pressure performance, depth accuracy, turnover-worthy/mistake evidence, rushing/designed-run value, and scrambling/sack avoidance. Thus offseason/preseason still require **21 QB categories**. Phases with regular-season activity add explicit current-season performance/absence coverage (**22 QB categories**). Other position buckets retain all core requirements; this change does not invent their missing detailed attribute hierarchies.

`requiredEvidenceCategories` defines runtime phase checklists; Zod validates category/source structure. `schemas/evidence-package.schema.json` references `schemas/full-audit-evidence.schema.json` for Full Audit metadata and phase-specific structural constraints. Runtime checks additionally enforce source freshness, official-calendar identity/boundaries/counts, correct performance-season samples, and comparison names drawn from the provided locked controls.

Readiness requires the researcher's affirmative assessment **and** no reported missing evidence **and** all application checks. Required categories must be satisfied with HIGH or MEDIUM evidence confidence, sufficient source-linked claims, correct seasons/periods, and explicit limitations. LOW or partial evidence cannot pass. Missing source URLs/dates, wrong-season substitutes, missing comparisons, missing categories, or future-season claims fail. A multi-year category must include the primary evidence season and an older season.

Only postseason context and preseason participation may be marked not applicable, with source-backed proof and a specific reason. No postseason appearance or not-yet-relevant preseason participation can be documented; unavailable premium data cannot be relabeled not applicable. Current injury/practice evidence remains required even if no current formal injury report exists: find a sufficient sourced assessment or retain the gap.

Normalized items carry `claim`, `source_url`, `retrieved_at`, `season`, and `period`. Public substitutes must state what they measure and what they do not establish in category limitations. A category tag is not independent verification of scientific sufficiency: analyst review and the existing rating validator still have separate responsibilities. This implementation does not claim that the Jalen Hurts package now passes or that missing calibration artifacts have been resolved.

## Verification and boundaries

Synthetic tests cover all phases, exact kickoff boundaries, calendar-year rollover, unavailable/unofficial/stale/future/inconsistent schedules, player versus team sample size, wrong-season evidence, omitted categories, partial/LOW evidence, missing controls, non-applicability abuse, and fake live-source claims. Mock SDK tests verify calendar-first ordering, read-only live-search settings, phase-specific prompts, and early termination when calendar research fails. No live player audit is part of validation.

Protected instructions, baseline ratings, approved cards, roster/workflow state, team rooms and historical records must remain unchanged. The existing unverified Madden editor-order preflight warning is unrelated and must not be suppressed.

## Implementation validation result

- `npm run typecheck`: PASS, now including test TypeScript.
- `npm test`: PASS, 30 tests (20 new phase/gate/integration tests plus 10 existing tests).
- Both evidence JSON schemas compiled successfully with the locally installed JSON Schema validator.
- `npm run preflight`: reports FAIL only for `madden_order_verified`; it retains the existing exit-code-0 behavior for that check. No check was removed or weakened.
- Hash comparison found no protected-file changes; 43 existing instruction/calibration/state/bootstrap/prior-log files were explicitly checked. The full comparison found only the implementation/documentation changes listed below and no deletions.
- No Jalen Hurts research, rating generation, player audit, approval, card persistence or workflow advancement was executed. Research integration tests used an injected mock SDK, so the new two-stage live workflow has not been exercised against a player.

Files changed:

| File | Change |
|---|---|
| `src/season-phase.ts` | New official-calendar contract, six-phase derivation and sample metadata |
| `src/evidence-gate.ts` | New phase/position category requirements and fail-closed application gate |
| `src/codex-research.ts` | Calendar-first Full Audit research, read-only live-search settings, derived instructions, injectable client/clock for tests |
| `src/research.ts` | Typed evidence metadata and provenance fields; legacy packages remain representable |
| `src/player-executor.ts` | Rechecks Full Audit evidence gate before the analyst stage |
| `schemas/evidence-package.schema.json` | Metadata fields and Full Audit schema reference |
| `schemas/full-audit-evidence.schema.json` | New phase-aware structural contract |
| `tests/season-evidence-tests.ts` | New synthetic boundary, gate, schema-parity and mocked integration tests |
| `tests/run-tests.ts` | Runs the new tests alongside existing tests |
| `tsconfig.json` | Includes tests in strict typechecking |
| `config/evidence-policy.md` | Documents the explicitly requested season-phase evidence-selection rules |
| `docs/season-phase-evidence.md` | Design, operational defaults, behavior, validation and change report |
| `docs/qb-calibration-limitations.md` | Inspected QB gaps and safe implementation paths |
