# Jalen Hurts — Full Player Audit dry run

Outcome: **INSUFFICIENT_EVIDENCE — stopped before rating generation.**

Resolved through the existing registry: `jalen_hurts`, Jalen Hurts, PHI, exact Madden position **QB**. The existing position mapper returned QB without role-resolution ambiguity. Registry current_audit_id is null and audit_history is empty. No approved card was created or changed.

## Authoritative calibration

Read directly from `data/baselines/QB.json`, status LOCKED, version `bootstrap-2026-08-30`, Architecture and Methodology 1.0.0. A full unmodified copy is included in request.json.

SHA-256: `a0fbd566dc23af2feb93decb276fd0fdd1643b73b1714bd92d919a67e4d5c78c`.

| Rank | Stored player | Stored OVR |
|---|---|---|
| 1 | Matthew Stafford | 91 |
| 2 | Joe Burrow | 90 |
| 3 | Josh Allen | 90 |
| 4 | Drake Maye | 88 |
| 5 | Jordan Love | 88 |
| 6 | Dak Prescott | 87 |
| 7 | Brock Purdy | 85 |
| 8 | Justin Herbert | 84 |
| 9 | Trevor Lawrence | 84 |
| 10 | Sam Darnold | 83 |

Stored first-out: Patrick Mahomes 83. Stored external controls: Patrick Mahomes 83, Lamar Jackson 83, Jared Goff 82. These are the repository-supplied outside comparison candidates; no new expected tier or nearest-by-attribute ordering was invented. Common prior-season peer comparisons were collected for all ten locked players and all three outside controls, with sample and methodology caveats.

## Evidence result

Fresh research completed through a read-only Codex thread, with 14 recorded web-search events. Structured JSON parsed successfully and passed the runner's structure and per-item source-provenance checks. The package lists 19 sources. Every normalized evidence item includes source_url, retrieved_at and season_or_period. These checks validate structure and source linkage, not the truth of every retrieved claim. The full package preserves provider discrepancies and retrieval limitations.

`minimum_evidence_met`: **false**. Three categories are marked satisfied within their stated scope; twelve remain partial. Satisfied prior-season coverage is not current-season evidence. No complete current regular-season sample was available. No evidence requirement was relaxed.

| Category | Coverage | Confidence | Remaining limitations / unavailable evidence |
|---|---|---|---|
| current season performance | partial | HIGH | 2026 regular-season sample; Verified complete 2026 preseason passing and snap totals |
| passing production efficiency | satisfied | HIGH | 2026 regular-season production |
| advanced passing metrics | partial | MEDIUM | Extractable official NGS CPOE; Independent reproduction of public EPA/CPOE filters and denominators |
| pressure performance | partial | MEDIUM | Verified complete pressured-versus-clean passing splits; Pressure-subset attempt counts, completion percentage, EPA, and passing grade |
| accuracy by depth | partial | LOW | Short/intermediate/deep attempts and completions; Depth-specific adjusted completion, on-target percentage, or CPOE; Corroborated full-season deep-ball charting |
| turnover worthy mistakes | satisfied | MEDIUM | PFF play-level classifications and precise published rate denominator |
| rushing designed run value | partial | MEDIUM | Full-season designed-run versus scramble counts and yards; Sneak-separated conversion rates; Designed-run EPA and success rate |
| scrambling sack avoidance | partial | MEDIUM | Full-season scramble EPA and conversion rate; Quarterback-attributed sack charting; Reconciled pressure sample across providers |
| durability availability | partial | MEDIUM | Complete injury-versus-rest absence reconciliation; Comprehensive recent injury and practice chronology |
| current injury practice status | partial | LOW | Contemporaneous explicit Hurts injury assessment; Current full/limited/nonparticipation designation |
| role workload | partial | HIGH | Verified 2026 snap distribution; Quantified current designed-run and under-center workload |
| recent performance trend | partial | MEDIUM | Complete charted 2026 camp/preseason progression; Opponent-adjusted recent-game efficiency |
| prior season context | satisfied | HIGH | Historical playoff success and multi-season consistency provide context, not proof of unchanged current ability or any Madden attribute. |
| locked top10 peer comparisons | partial | MEDIUM | 2026 regular-season peer comparisons; Matched pressure/depth/rushing splits across all ten controls; Imported locked full cards and structured scarcity rules |
| outside control comparisons | partial | MEDIUM | Fully reconciled conventional production comparison for all three external controls; Matched exact-trait pressure, depth, and rushing comparisons; 2026 regular-season comparisons |

## Public substitutes and access limits

- **current season performance:** Dated camp observations and explicitly labeled 2025 historical statistics. Camp observations cannot establish regular-season efficiency or justify projecting a new performance level.
- **advanced passing metrics:** Public nflverse-derived EPA/CPOE table, alongside independently charted PFF measures. The common table contains discrepancies from conventional official statistics. Its model outputs are provisional comparisons, not interchangeable with NGS or independently recomputed results.
- **pressure performance:** Pressure-to-sack rate directly measures sack conversion under charted pressure. On-the-move charting adds movement evidence. Movement is not synonymous with pressure. Searches also returned generic season totals under pressure-query titles and an uncorroborated community claim; neither was accepted as a verified pressure passing split.
- **accuracy by depth:** Aggregate CPOE and average target depth provide separate contextual measures, not a replacement depth-accuracy matrix. Targeted deep-ball searches and public PFF/NGS/PFR checks did not yield a verified complete Hurts depth table. NGS returned no extractable content; direct PFR access failed. Exact-trait accuracy calibration remains unsupported.
- **turnover worthy mistakes:** Official interceptions and total fumbles provide outcome-based corroboration. Turnover outcomes include recovery and interception luck; PFF charting is judgment-based. The article's season scope and rounding should be reconciled before deriving rates from its separate player table.
- **rushing designed run value:** Official aggregate rushing plus explicitly limited single-game scramble charting. Aggregate rushing combines different play types and kneeldowns. Practice usage does not establish future workload; no full-season split was extrapolated from Week 1.
- **scrambling sack avoidance:** Conventional sack rate, charted pressure-to-sack rate, and limited scramble evidence. Neither sack measure isolates responsibility from protection, route timing, or defensive pressure quality.
- **durability availability:** Official appearances and game logs plus dated historical injury reporting. Games without statistics are not automatically injury absences. Historical concussion evidence does not establish current impairment.
- **current injury practice status:** Current roster inclusion and dated practice participation. Active-roster inclusion and prior practice participation do not certify full health. Searches through the cutoff did not resolve a current designation; this volatile category requires rechecking.
- **role workload:** Previous-season starts and workload, current roster, and first-offense practice reporting. Current numerical roster order is not a depth chart. Future scheme and workload are not treated as established performance.
- **recent performance trend:** Official game-by-game outcomes plus separately labeled recent practice observations. Small and heterogeneous samples cannot establish sustained improvement or decline; opponent, game state, and practice rules differ.
- **locked top10 peer comparisons:** Common prior-season production and advanced tables cover all ten stored names without adopting source rankings. Same season does not mean equal sample or opportunity. Advanced-table filtering and conventional-stat discrepancies remain unresolved. Stored ordering is unchanged; these comparisons do not decide membership.
- **outside control comparisons:** One common public table provides same-season efficiency comparisons against every supplied external control. Mahomes, Jackson, and Goff remain the supplied external controls. Differing models and samples prevent treating these numbers as a complete calibration or a membership decision.

Public PFF pages supplied some advanced and turnover-worthy metrics; this does not establish access to its complete premium depth/pressure charting or play-level labels. Those unretrieved details remain unavailable, not zero. Next Gen Stats returned no extractable table; direct PFR opening returned HTTP 403, so accepted search-exposed conventional totals were cross-checked against official team totals. Public aggregate CPOE, target depth, sack rates and rushing totals are not equivalent substitutes for missing exact-trait splits.

## Sources returned

1. [NFL: 2026 Week 1 schedule](https://www.nfl.com/schedules/2026/by-week/week-1) — retrieved 2026-08-30T23:53:19Z.
2. [Philadelphia Eagles: Initial roster announcement](https://www.philadelphiaeagles.com/news/eagles-announce-initial-53-man-roster-2026-season) — retrieved 2026-08-30T23:54:26Z.
3. [Philadelphia Eagles: Hurts career statistics](https://www.philadelphiaeagles.com/team/players-roster/jalen-hurts/career) — retrieved 2026-08-30T23:53:57Z.
4. [Philadelphia Eagles: Hurts game logs](https://www.philadelphiaeagles.com/team/players-roster/jalen-hurts/logs/) — retrieved 2026-08-30T23:54:18Z.
5. [Philadelphia Eagles: Hurts situational statistics](https://www.philadelphiaeagles.com/team/players-roster/jalen-hurts/situational/) — retrieved 2026-08-30T23:54:18Z.
6. [ESPN: 2025 regular-season passing table](https://www.espn.com/nfl/stats/player/_/season/2025/seasontype/2) — retrieved 2026-08-30T23:53:57Z.
7. [Pro Football Reference: 2025 passing](https://www.pro-football-reference.com/years/2025/passing.htm) — retrieved 2026-08-30T23:54:38Z.
8. [Yards Per Pass: 2025 quarterback leaderboard](https://www.yardsperpass.com/qb-leaderboard) — retrieved 2026-08-30T23:54:18Z.
9. [PFF: Jalen Hurts public player statistics](https://www.pff.com/nfl/players/jalenhurts/40291) — retrieved 2026-08-30T23:53:57Z.
10. [PFF: Quarterbacks entering the 2026 season](https://www.pff.com/news/nfl-quarterback-rankings-all-32-starters-2026) — retrieved 2026-08-30T23:53:57Z.
11. [PFF: Takeaways from the 2026 QB Annual](https://www.pff.com/news/nfl-10-takeaways-from-the-2026-pff-qb-annual) — retrieved 2026-08-30T23:53:57Z.
12. [Opta Analyst: 2025 NFL Superlative All-Stars](https://theanalyst.com/articles/nfl-superlatives-2025-season-all-pro-best-players-skills-statistics) — retrieved 2026-08-30T23:54:18Z.
13. [Philadelphia Eagles: August 11 camp notes](https://www.philadelphiaeagles.com/news/eagles-training-camp-notes-highlights-ahead-of-the-first-preseason-game) — retrieved 2026-08-30T23:53:57Z.
14. [Philadelphia Inquirer: Eagles-Patriots joint practice](https://www.inquirer.com/eagles/2026-joint-practices-patriots-jalen-hurts-riq-woolen-20260820.html) — retrieved 2026-08-30T23:53:57Z.
15. [Philadelphia Eagles: Injury report index](https://www.philadelphiaeagles.com/team/injury-report/) — retrieved 2026-08-30T23:54:26Z.
16. [NFL Next Gen Stats: 2025 passing](https://nextgenstats.nfl.com/stats/passing/2025/REG/all) — retrieved 2026-08-30T23:53:57Z.
17. [CBS Sports: 2025 Week 1 observations](https://www.cbssports.com/nfl/news/nfl-week-1-five-things-we-liked-and-didnt-like-including-j-j-mccarthys-poise-unlikely-heroes-bad-vibes/) — retrieved 2026-08-30T23:53:57Z.
18. [Philadelphia Eagles: 2025 quarterback preview](https://www.philadelphiaeagles.com/news/eagles-2025-training-camp-position-preview-quarterback-jalen-hurts) — retrieved 2026-08-30T23:53:57Z.
19. [Axios Philadelphia: Hurts concussion return](https://www.axios.com/local/philadelphia/2025/01/10/eagles-packers-playoffs-jalen-hurts-concussion) — retrieved 2026-08-30T23:53:57Z.

Source details, accepted claims, conflicts, and confidence limitations are retained in evidence.json. Some attempted sources contributed availability/access findings rather than usable numerical evidence.

## Rating and validation outcome

- Proposed OVR: **not generated**.
- Proposed attributes or attribute changes: **not generated**.
- 90+/95+/97+/99 scarcity checks: **not run**, because no rating proposal exists. No elite-trait claim was made.
- Existing rating validator and revision loop: **not invoked** due to the evidence gate; **0 revisions**.
- No auto-approval, current-card linking, re-audit queue write, historical audit write, or workflow advancement occurred.

Additional pre-existing calibration limitations: stored QB full cards are NOT_YET_IMPORTED, stored QB scarcity is LOCKED_HISTORICAL_NOT_FULLY_STRUCTURED, and the QB architecture file is LOCKED/IMPORT_PENDING. No implemented OVR calculator was found in the inspected source. The dry run did not reconstruct missing locked attributes, scarcity distributions, minimum-package details, or OVR weights.

## Files and verification

Only new files under logs/audit-smoke/ were written:

- research-stage.ts — isolated evidence-stage runner; no approval or audit-executor imports.
- e4e57d97-7dcd-4a05-997b-af9d0779903b/request.json — resolved identity, mapping, exact stored baseline, hash, and research requirements.
- e4e57d97-7dcd-4a05-997b-af9d0779903b/evidence.json — all research evidence and gaps.
- e4e57d97-7dcd-4a05-997b-af9d0779903b/evidence-check.json — JSON/provenance checks and stop decision.
- e4e57d97-7dcd-4a05-997b-af9d0779903b/research-diagnostics.json — thread ID, raw response, web-search events, and timing.
- e4e57d97-7dcd-4a05-997b-af9d0779903b/integrity-check.json — before/after file hashes.
- report.md — this report.

Project TypeScript typecheck passed. An explicit strict TypeScript check of the isolated logs runner also passed. All 10 automated tests passed. The outer Windows sandbox prevented tsx from reading user information; the approved retry ran successfully while the SDK research thread retained its read-only sandbox.

Hash comparison of all 100 pre-existing project files outside logs and dependency/Git directories found zero changed, added, or deleted files. Governing instructions, locked methodology and baselines, roster/state files, and existing approved state remained untouched. No player card was approved or persisted.

