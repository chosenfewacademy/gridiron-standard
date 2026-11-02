# Generic position stage engine (Methodology v1.1)

`src/stage-engine.ts` derives the next task for `state.current_position` from `state.completed_tasks`
and APPROVED immutable records in `audits/league/<POS>/`. It never mutates state.

| Stage | Task id | Required output fields (enforced as validation errors, counted against the 3-revision ceiling) |
|---|---|---|
| coverage gate (pre-provisional) | `data/candidate-pools/<POS>.json` | `status: APPROVED` + approved_by/at; >=3 sources, >=3 kinds (grades/usage/stats/honors), >=2 publishers; every source top-20 name in the registry AND pooled or excluded with a reason (`npm run coverage:check -- <POS> [--proposed]`) |
| provisional_top_10 | `<POS>_PROVISIONAL_TOP10` | `provisional_top_10` (10 distinct, all from the approved pool), `first_out`, `external_controls` |
| pair_audits | `<POS>_PAIR_01..05` (ranks 1v2..9v10), `<POS>_PAIR_06` (10 vs first_out) | `pair_result` |
| membership_reopen | `<POS>_MEMBERSHIP` | `final_top_10` (10 distinct) |
| scarcity_audit | `<POS>_SCARCITY` | `scarcity` |
| individual_hard_audits | `<POS>_HARD_01..10` | normal Full Audit |
| positional_cross_audit | `<POS>_CROSS_AUDIT` | `cross_audit_result` |
| lock | `<POS>_LOCK` | commissioner only: `npm run position:lock -- <POS> --confirm LOCK_<POS>` |

Every task carries `position`, `stage`, `position_inputs` (config/position-metrics.json) and, after the
provisional stage, `baseline_controls` built from the approved provisional/membership records.

LG keeps its legacy in-progress sequence exactly: LG_PAIR_03 -> 04 -> 05 -> LG_MEMBERSHIP, then the generic
stages. `CONTINUE` returns `AWAITING_COMMISSIONER_LOCK` at the lock stage and does no research.
Lock refuses unless every stage is approved, there are no pending re-audits for the position, and no baseline or
lock exists; it writes the baseline once (`wx`), then advances to the next PENDING position.
Gates, REVIEW_MAJOR approval, immutability and `GRIDIRON_MAX_REVISIONS` (default 3) are unchanged.

## Player status in candidate pools

- Every candidate has a `status` (ACTIVE, IR, IR_DESIGNATED_RETURN, PUP, NFI, INACTIVE, RESERVE_OTHER) and a `status_source`.
- `free_agents[]` lists top-source names who are not on a 2026 roster. Each entry has a status of FREE_AGENT, CUT or RETIRED, plus `status_as_of` and an https `source_url`. FREE_AGENT and CUT players must be in the registry. RETIRED players are listed but are not eligible.
- `injured[]` lists IR, PUP and inactive players, with `in_pool` showing whether they are also candidates. A candidate whose registry `roster_status` is RES or INA must have an entry here.
- The gate rejects exclusions with code `NOT_ON_2026_ROSTER`, so off-roster players can't be left out silently.
- Injured players do not count toward the 20 healthy pool slots.
- To add unsigned players, run `roster:refresh <prior season> --from-file <prior roster> --add-only --free-agent --names "..."`. This clears `team`, keeps `previous_team` and sets `roster_status` to UNSIGNED_FREE_AGENT.
