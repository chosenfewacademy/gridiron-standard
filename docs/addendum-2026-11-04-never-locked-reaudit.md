# Addendum 2026-11-04 — re-audit of never-locked positions (commissioner t50s441, under t46u)

Scope: positions with **no** entry in `state/locks.json` and no baseline (e.g. LG). Locked positions behave exactly as before.

1. **Candidate-audit controls** (`src/stage-engine.ts`, planV112): when a TOP10_REAUDIT has no locked baseline, the
   candidate_audit task carries `baseline_controls` = `{ control_source: "APPROVED_CANDIDATE_POOL", never_locked: true,
   top_10: first 10 approved pool candidates, external_controls: remaining approved candidates (first-outs) }`. The
   evidence gate's locked-control / nearest-outside-control checks run against these. Later stages already use the
   approved candidate audit's contention set (unchanged).
2. **First lock** (`src/reaudit-lock.ts`): with no locks entry, `reaudit:lock` writes only a new dated baseline
   `data/baselines/<POS>.reaudit-<YYYYMMDD>.json` (`first_lock: true`, `supersedes: null`) and adds one locks entry
   (`status LOCKED`, `first_lock: true`, `history: []`). No previous baseline is fabricated.
3. **Guard** (`scripts/protected-paths-check.mjs`, SEVENTH NARROW EXCEPTION): admits adding exactly one locks position key
   that is such a first lock (all existing entries identical), and the matching first-lock baseline add.
4. **Legacy LG pathway**: `state.positions.LG = IN_PROGRESS` and LG_PAIR_01–02 stay as history (not deleted). The LG
   re-audit lock supersedes that pathway; the lock record and baseline note it. The main-run pointer is not edited.

Tests: `tests/reaudit-tests.ts` "addendum 2026-11-04 (t50s441)".
