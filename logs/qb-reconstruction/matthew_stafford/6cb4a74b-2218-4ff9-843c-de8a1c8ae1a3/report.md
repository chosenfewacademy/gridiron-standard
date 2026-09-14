# Matthew Stafford — first QB reconstruction evidence audit

**Outcome: EVIDENCE_INSUFFICIENT. minimum_evidence_met = false. No proposed card generated.**

Collection note: the first performance-research turn hit its fixed timeout before returning JSON. Its failed gate output is preserved unchanged. No complete performance packet was recovered; this is a collection failure, not proof that all football evidence is unavailable. Calendar research completed separately. Public web-event metadata and independent source checks are preserved; no private reasoning/session configuration is included in the recovery artifacts.

The same-thread recovery also timed out. This report uses evidence-manual-partial.json: a conservative, independently source-checked partial packet covering all 21 categories, 17 domains and 19 trait-assessment slots. It distinguishes unestablished assessments from proven absence of public data and cannot pass the evidence gate.

## Identity and season

Resolved registry ID: matthew_stafford. Name: Matthew Stafford. Exact Madden position: QB. Locked control rank: 1. Locked comparison OVR: 91. Registry team was null; official NFL/Rams roster evidence supplied LAR for this research request without changing registry data.

Application-derived NFL season: 2026. Season phase: PRESEASON. Primary evidence season: 2025. Current regular-season opportunities/appearances: 0/0. Prior completed season used as primary: true. Postseason remains a separate sample. Calendar facts and source retrieval timestamps are preserved in stage-1-result.json and evidence.json.

## Evidence gate

{"satisfied":2,"partial":15,"missing":4}. The parent category statuses are collector assessments; the application gate additionally checks sample/season/source requirements and domain/trait completeness. Partial or low-confidence evidence was not promoted to satisfied.

| Category | Status | Confidence | Limitations |
|---|---|---|---|
| performance_summary | satisfied | HIGH |  |
| postseason_context | partial | MEDIUM | Complete postseason production/game samples were not normalized. |
| multi_year_trend | missing | LOW | Prior-year source context exists, but a reconciled multi-year normalized assessment was not completed. |
| current_role | satisfied | HIGH |  |
| roster_depth_chart | partial | MEDIUM | Full current depth-chart allocation was not reconciled. |
| injury_practice_status | partial | MEDIUM | These dated reports do not establish a current full injury/practice designation or medical clearance. |
| age_career_trajectory | missing | LOW | No completed, sufficiently specific assessment was established in the bounded collection. |
| team_system_context | partial | MEDIUM | No complete scheme/supporting-cast adjustment analysis. |
| preseason_participation | partial | MEDIUM | Full preseason game participation and workload not verified in this retained packet. |
| durability_availability | partial | MEDIUM | Historical injury/exposure and completed-season availability not fully reconciled; no medical inference. |
| recent_performance_trend | partial | MEDIUM | Recent mixed/postseason observations are not a reconciled full regular-season mistake package. |
| locked_control_comparisons | partial | MEDIUM | All ten locked controls lack a complete matched comparison packet; their full cards remain absent. |
| outside_control_comparisons | missing | LOW | Mahomes/Jackson/Goff comparison collection did not return a complete structured packet; no attributes inferred. |
| position_specific_traits | partial | MEDIUM | All 19 traits are not sufficiently established. |
| passing_production_efficiency | partial | MEDIUM | The independently retained packet lacks a complete reconciled efficiency table. |
| advanced_passing_metrics | partial | MEDIUM | Do not relabel mixed samples as a final regular-season advanced package. |
| pressure_performance | partial | MEDIUM | Full regular-season pressure denominator and scope not reconciled. |
| accuracy_by_depth | partial | MEDIUM | No complete short/intermediate/deep full-season placement splits or matched samples. |
| turnover_worthy_mistakes | partial | MEDIUM | Recent mixed/postseason observations are not a reconciled full regular-season mistake package. |
| rushing_designed_run_value | missing | LOW | No completed, sufficiently specific assessment was established in the bounded collection. |
| scrambling_sack_avoidance | partial | MEDIUM | Do not infer broken sacks, speed or contact escape from low scramble frequency. |

### All QB domains

| Category | Status | Confidence | Limitations |
|---|---|---|---|
| arm_strength | partial | MEDIUM | Qualitative film only; no complete current arm-strength calibration package. |
| short_accuracy | missing | LOW | Specific short_accuracy evidence remains unestablished after bounded collection and recovery failure. |
| intermediate_accuracy | missing | LOW | Specific intermediate_accuracy evidence remains unestablished after bounded collection and recovery failure. |
| deep_accuracy | partial | MEDIUM | No complete short/intermediate/deep full-season placement splits or matched samples. |
| pressure_performance | partial | MEDIUM | Full regular-season pressure denominator and scope not reconciled. |
| pocket_movement | missing | LOW | Specific pocket_movement evidence remains unestablished after bounded collection and recovery failure. |
| sack_avoidance | missing | LOW | Specific sack_avoidance evidence remains unestablished after bounded collection and recovery failure. |
| processing_decision_making | partial | MEDIUM | One film example is not a complete processing/decision sample. |
| play_action | partial | MEDIUM | Scheme, fake execution and sample differences remain unresolved. |
| throws_on_run | missing | LOW | Specific throws_on_run evidence remains unestablished after bounded collection and recovery failure. |
| scrambling | partial | MEDIUM | Do not infer broken sacks, speed or contact escape from low scramble frequency. |
| designed_rushing | missing | LOW | Specific designed_rushing evidence remains unestablished after bounded collection and recovery failure. |
| ball_security | missing | LOW | Specific ball_security evidence remains unestablished after bounded collection and recovery failure. |
| durability | partial | MEDIUM | Historical injury/exposure and completed-season availability not fully reconciled; no medical inference. |
| workload_availability | partial | MEDIUM | These dated reports do not establish a current full injury/practice designation or medical clearance. |
| consistency | partial | MEDIUM | Recent mixed/postseason observations are not a reconciled full regular-season mistake package. |
| opponent_context_adjustments | partial | MEDIUM | No full opponent/supporting-cast adjustment or independent coefficients established. |

### All QB trait evidence assessments — not ratings

| Category | Status | Confidence | Limitations |
|---|---|---|---|
| THP | partial | MEDIUM | Qualitative film only; no complete current arm-strength calibration package. |
| SAC | missing | LOW | No sufficiently specific SAC trait package; no numeric rating inferred. |
| MAC | missing | LOW | No sufficiently specific MAC trait package; no numeric rating inferred. |
| DAC | partial | MEDIUM | No complete short/intermediate/deep full-season placement splits or matched samples. |
| RUN | missing | LOW | No sufficiently specific RUN trait package; no numeric rating inferred. |
| TUP | partial | MEDIUM | Full regular-season pressure denominator and scope not reconciled. |
| PAC | partial | MEDIUM | Scheme, fake execution and sample differences remain unresolved. |
| BSK | missing | LOW | No sufficiently specific BSK trait package; no numeric rating inferred. |
| AWR | partial | MEDIUM | One film example is not a complete processing/decision sample. |
| SPD | missing | LOW | No sufficiently specific SPD trait package; no numeric rating inferred. |
| ACC | missing | LOW | No sufficiently specific ACC trait package; no numeric rating inferred. |
| AGI | missing | LOW | No sufficiently specific AGI trait package; no numeric rating inferred. |
| COD | missing | LOW | No sufficiently specific COD trait package; no numeric rating inferred. |
| STR | missing | LOW | No sufficiently specific STR trait package; no numeric rating inferred. |
| CAR | missing | LOW | No sufficiently specific CAR trait package; no numeric rating inferred. |
| JMP | missing | LOW | No sufficiently specific JMP trait package; no numeric rating inferred. |
| INJ | partial | MEDIUM | Historical injury/exposure and completed-season availability not fully reconciled; no medical inference. |
| STA | missing | LOW | No sufficiently specific STA trait package; no numeric rating inferred. |
| TGH | missing | LOW | No sufficiently specific TGH trait package; no numeric rating inferred. |

### Exact blocking findings

- PERFORMANCE_COLLECTION_TIMEOUT
- BOUNDED_RECOVERY_TIMEOUT
- MANUAL_PARTIAL_PACKET_NOT_FULL_AUDIT_READY
- domain_assessments.arm_strength: PARTIAL_OR_MISSING
- domain_assessments.short_accuracy: PARTIAL_OR_MISSING
- domain_assessments.intermediate_accuracy: PARTIAL_OR_MISSING
- domain_assessments.deep_accuracy: PARTIAL_OR_MISSING
- domain_assessments.pressure_performance: PARTIAL_OR_MISSING
- domain_assessments.pocket_movement: PARTIAL_OR_MISSING
- domain_assessments.sack_avoidance: PARTIAL_OR_MISSING
- domain_assessments.processing_decision_making: PARTIAL_OR_MISSING
- domain_assessments.play_action: PARTIAL_OR_MISSING
- domain_assessments.throws_on_run: PARTIAL_OR_MISSING
- domain_assessments.scrambling: PARTIAL_OR_MISSING
- domain_assessments.designed_rushing: PARTIAL_OR_MISSING
- domain_assessments.ball_security: PARTIAL_OR_MISSING
- domain_assessments.durability: PARTIAL_OR_MISSING
- domain_assessments.workload_availability: PARTIAL_OR_MISSING
- domain_assessments.consistency: PARTIAL_OR_MISSING
- domain_assessments.opponent_context_adjustments: PARTIAL_OR_MISSING
- trait_assessments.THP: PARTIAL_OR_MISSING
- trait_assessments.SAC: PARTIAL_OR_MISSING
- trait_assessments.MAC: PARTIAL_OR_MISSING
- trait_assessments.DAC: PARTIAL_OR_MISSING
- trait_assessments.RUN: PARTIAL_OR_MISSING
- trait_assessments.TUP: PARTIAL_OR_MISSING
- trait_assessments.PAC: PARTIAL_OR_MISSING
- trait_assessments.BSK: PARTIAL_OR_MISSING
- trait_assessments.AWR: PARTIAL_OR_MISSING
- trait_assessments.SPD: PARTIAL_OR_MISSING
- trait_assessments.ACC: PARTIAL_OR_MISSING
- trait_assessments.AGI: PARTIAL_OR_MISSING
- trait_assessments.COD: PARTIAL_OR_MISSING
- trait_assessments.STR: PARTIAL_OR_MISSING
- trait_assessments.CAR: PARTIAL_OR_MISSING
- trait_assessments.JMP: PARTIAL_OR_MISSING
- trait_assessments.INJ: PARTIAL_OR_MISSING
- trait_assessments.STA: PARTIAL_OR_MISSING
- trait_assessments.TGH: PARTIAL_OR_MISSING
- RESEARCHER_MINIMUM_EVIDENCE_NOT_MET
- postseason_context: CATEGORY_NOT_SATISFIED
- multi_year_trend: MISSING_OR_INVALID_CATEGORY
- roster_depth_chart: CATEGORY_NOT_SATISFIED
- injury_practice_status: CATEGORY_NOT_SATISFIED
- age_career_trajectory: MISSING_OR_INVALID_CATEGORY
- team_system_context: CATEGORY_NOT_SATISFIED
- preseason_participation: CATEGORY_NOT_SATISFIED
- durability_availability: CATEGORY_NOT_SATISFIED
- durability_availability: REQUIRED_SEASON_NOT_COVERED
- durability_availability: PRIMARY_REGULAR_SEASON_SAMPLE_MISSING
- recent_performance_trend: CATEGORY_NOT_SATISFIED
- recent_performance_trend: PRIMARY_REGULAR_SEASON_SAMPLE_MISSING
- locked_control_comparisons: CATEGORY_NOT_SATISFIED
- locked_control_comparisons: LOCKED_CONTROL_COVERAGE_MISSING
- outside_control_comparisons: MISSING_OR_INVALID_CATEGORY
- position_specific_traits: CATEGORY_NOT_SATISFIED
- passing_production_efficiency: CATEGORY_NOT_SATISFIED
- advanced_passing_metrics: CATEGORY_NOT_SATISFIED
- pressure_performance: CATEGORY_NOT_SATISFIED
- accuracy_by_depth: CATEGORY_NOT_SATISFIED
- turnover_worthy_mistakes: CATEGORY_NOT_SATISFIED
- turnover_worthy_mistakes: PRIMARY_REGULAR_SEASON_SAMPLE_MISSING
- rushing_designed_run_value: MISSING_OR_INVALID_CATEGORY
- scrambling_sack_avoidance: CATEGORY_NOT_SATISFIED

## Ceiling calibration, distinctions and weaknesses

Stafford is the ceiling control because the authoritative stored QB hierarchy places him first at 91. This run did not reopen that hierarchy or establish a new approved attribute ceiling. Strong completed-season production and sourced film can inform an eventual ceiling build, but do not justify inflating all traits or copying the overall result into individual ratings. See performance_summary, the domain/trait assessments, and manual-source-review.json for source-qualified evidence.

Arm talent, accuracy, processing, pressure behavior, mobility and durability remain separate assessments. In particular, favorable arm/clean-pocket evidence cannot erase pressure-performance caveats, low rushing/scramble involvement, mistake trends, or uncertainty about current physical/recovery traits. Because no card was generated, no numerical weaknesses or elite traits were assigned. Missing evidence remains missing rather than becoming a fabricated low rating.

All other QB full cards remain unreconstructed. Comparisons use the locked hierarchy, stored OVRs and sourced football context only. Future pair calibration will strengthen as controls are rebuilt; no attribute-level controls were invented.

## OVR, scarcity and validators

- locked_target_ovr: 91 (unchanged).
- proposed_ovr: null. No legitimate formula or empirical observation exists for a generated card.
- observed_madden_ovr: null. No in-game observation was supplied or invented.
- Proposed 90+/95+/97+/99 traits: none; no ratings were generated.
- Season/evidence gate: executed and failed.
- QB card schema, trait-coherence/scarcity validator and rating revision loop: not entered, as required when minimum evidence is false.
- Rating revision count: 0. Research collection is not a rating revision.
- Run status: NOT_STARTED → RESEARCH_READY → EVIDENCE_INSUFFICIENT, through the framework's permitted transitions.
- VALIDATED / USER_APPROVED / LOCKED: never entered.

## Provider disagreements

```json
[
  {
    "issue": "Incompatible statistical scopes",
    "resolution": "Regular season, in-season snapshots and playoff-inclusive previews remain separate; no averages or scope conversions."
  }
]
```

Unresolved material differences remain blockers or explicit limitations. No conflicting statistics were averaged. PFF grades are third-party scouting metrics, not Madden ratings.

## Sources

1. [NFL Rams roster](https://www.nfl.com/teams/los-angeles-rams/roster) — retrieved 2026-08-31T01:26:46.684Z; authority tier 1.
2. [Rams Stafford career statistics](https://www.therams.com/team/players-roster/matthew-stafford/career) — retrieved 2026-08-31T01:26:46.696Z; authority tier 1.
3. [PFF Week 9 Stafford film review](https://www.pff.com/news/nfl-qb-film-review-matthew-stafford-is-on-track-for-the-best-season-of-his-outstanding-career) — retrieved 2026-08-31T01:26:46.696Z; authority tier 2.
4. [PFF pre-NFC-Championship Stafford/Darnold comparison](https://www.pff.com/news/nfl-sam-darnold-matthew-stafford-breakdown-nfc-championship-game-preview) — retrieved 2026-08-31T01:26:46.696Z; authority tier 2.
5. [Rams managed camp workload report](https://www.therams.com/news/matthew-stafford-and-davante-adams-rapport-benefitting-from-training-camp-practices-this-year-that-they-didn-t-have-together-in-2025) — retrieved 2026-08-31T01:31:28.638Z; authority tier 1.
6. [Rams Saints joint-practice report](https://www.therams.com/news/10-observations-from-rams-joint-practice-with-saints-matthew-stafford-davante-adams-terrance-ferguson-nate-landman-kobie-turner) — retrieved 2026-08-31T01:31:28.639Z; authority tier 1.

## Validation and protected state

Project typecheck and isolated research-runner typecheck passed. All 42 project tests passed. Preflight retains only the expected madden_order_verified blocker. Full command outputs are in validation.json. Protected file hashes unchanged: true (14 files).

No approved cards/audits, current-card pointers, locked baselines, editor-order verification, team-room/project state or initial planning queue were modified. The initial config queue remains a planning seed; this run's current reconstruction status is recorded in queue-after-evidence.json. No graphic card, other player audit or approval/persistence operation ran.

## Files created

All output is confined to logs/qb-reconstruction. No existing project source/config/state file was changed.

- logs/qb-reconstruction/stafford-research.ts — isolated evidence-only runner.
- logs/qb-reconstruction/stafford-report.ts — evidence-failure report generator.
- logs/qb-reconstruction/stafford-recover.ts — bounded recovery of the same research thread after timeout.
- logs/qb-reconstruction/stafford-partial-packet.ts — preserve independently checked partial evidence without claiming completeness.
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/evidence-adapter.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/evidence-check.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/evidence-manual-partial.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/evidence.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/integrity-after.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/integrity-before.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/manual-current-context.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/manual-partial-check.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/manual-source-review.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/queue-after-evidence.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/queue-after-recovery.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/queue-recovery-ready.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/queue-research-ready.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/recovered-web-events.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/recovery-error.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/recovery-prompt.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/report.md
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/request.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/research-diagnostics.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/result-summary.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/stage-1-prompt.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/stage-1-result.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/stage-2-error.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/stage-2-prompt.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/validation.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/validation-final.json
- logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/integrity-final.json

Final verification after the recovery/partial-packet helpers: project and all four isolated helper typechecks passed; 42 project tests passed; preflight still reports only unverified editor order. All 14 protected file hashes remain unchanged. The final recovery queue snapshot also remains EVIDENCE_INSUFFICIENT.
