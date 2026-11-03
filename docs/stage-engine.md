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

## Re-audit pools for locked positions

- QB, RB, WR, TE and LT are locked, and LG is in progress. `planNext` refuses locked positions, so their proposed pools are stored separately as `data/candidate-pools/<POS>.reaudit.proposed.json`. `requireApprovedPool` never reads these files.
- Check one with `npm run coverage:check -- <POS> --reaudit`. This runs `checkReauditPool`: the normal coverage gate, plus these rules:
  - the pool must stay PROPOSED;
  - it must declare `reaudit.requires_trigger = "TOP10_REAUDIT"`;
  - it must record `compared_list` and `flags`.
- `reaudit.flags` compares the pool with the locked baseline `top_10`. For LG it uses the provisional names recorded in the engine; pairs 01–02 predate the engine and are not recorded. The flags are:
  - LOCKED_PLAYER_IR, PUP, NFI, INACTIVE, FREE_AGENT or RETIRED;
  - LOCKED_PLAYER_DECLINED (pool rank above 15, or outside the pool);
  - STRONG_CANDIDATE_NOT_IN_TOP10 (pool top 12).
- Nothing here changes baselines, locks, state or audit history. An actual re-audit needs the commissioner's explicit TOP10_REAUDIT trigger.

## Commissioner pool approval (sanctioned path)
`npm run pool:approve -- <POS[,POS] | --all> --by "<commissioner>" --confirm APPROVE_POOLS`
- Re-runs the coverage gate (or the re-audit gate) on each `<POS>.proposed.json` / `<POS>.reaudit.proposed.json`.
- On pass, writes a separate immutable `<POS>.json` / `<POS>.reaudit.json` with `status: APPROVED`, `approved_by`, `approved_at`, `approved_from`.
- Proposed files are left as-is. Baselines, locks, state, cards and audit history are never touched.
- `requireApprovedPool` reads only `<POS>.json`; an approved re-audit pool never becomes the active pool.

## Commissioner TOP10_REAUDIT trigger (sanctioned path)
`npm run reaudit:trigger -- <POS[,POS]> --by "<commissioner>" --confirm TOP10_REAUDIT`
- Requires an approved `<POS>.reaudit.json` and a LOCKED or IN_PROGRESS position. Duplicate triggers are refused.
- Appends a `TOP10_REAUDIT` item (`status: QUEUED_NOT_STARTED`) to `state.pending_reaudit_queue` via `queueReaudit`.
- Starts no audit or research. Lock status, baselines, lock pointers, cards and audit history are unchanged.
- While a position has a queued item, `position:lock` refuses to lock it (existing rule).

## FB / LS (v1.1 addendum, proposed)
FB and LS have rating inputs and candidate pools but are not in the v1.0 sequence or state; see docs/amendments/v1.1-addendum-fb-ls.md.
`roster:refresh --id-only` (with `--add-only`) adds by source id without exact-name merging (needed for LS Aaron Brewer vs C Aaron Brewer).

### Variance audit and lock (2026-11-02)
`<POS>_VARIANCE_AUDIT` runs after head-to-heads and before scarcity. Output: `variance_gaps[]` (player, attr, madden, ours, verdict SUPPORTED|ADJUST, key_stats, proposed_revision for ADJUST) and `madden_used_as_evidence: false`. Metrics: `config/variance-metrics.json`. Lock task carries `final_order`; `reaudit:lock` consumes `REAUDIT_REPLACE_BASELINE_<POS>`.

## League-wide ceiling check (v1.1.2 addendum, card t35u)

Before the positional cross-audit can be approved, every rostered or free-agent player at the position
**outside** the audited pool with meaningful 2025-26 snaps (starters, recent starters, notable backups,
rookies) is screened against the #10 and first-out (#11) players. Read-only and add-only: it never changes
a rating, and Madden is never an input.

- Config: `config/ceiling-metrics.json` (all positions; QB screens PFF grade, EPA/dropback, CPOE,
  turnover-worthy rate, sack rate, games).
- Rule: FLAG when the sample is at least `min_sample` and the player matches or beats the weaker of the two
  references on at least `min_hits` (3) metrics, including at least one production metric (PFF or value/EPA).
- Code: `src/league-ceiling.ts` (`evaluateLeagueCeiling`, `ceilingCheckErrors`). The planner adds
  `league_ceiling_check_required` and `ceiling_references` to the cross-audit task; the validator requires
  `league_ceiling_check { flagged, closest }` and rejects the cross-audit while anyone is flagged.
- The next 5 closest non-flagged players are always reported.
