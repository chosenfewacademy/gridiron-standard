# Addendum 2026-11-04c (ET) — same-day re-lock and superseding re-audit (user t56s525)

Engine change only (option A). No position was re-triggered and no rating changed by this addendum; CB re-trigger and the Mitchell card wait for the batch after the drop audit.

## What changed
- `src/reaudit-lock.ts`: the first lock of a day keeps the unsuffixed names (`<POS>_REAUDIT_LOCK_<YYYYMMDD>`, `data/baselines/<POS>.reaudit-<YYYYMMDD>.json`). If either already exists, the next lock that day takes the next free letter B..Z: e.g. `CB_REAUDIT_LOCK_20261104B` -> `data/baselines/CB.reaudit-20261104b.json`. The new baseline's `supersedes` points at the prior baseline file/version; the prior baseline is never touched and is appended to the locks entry `history`. A suffix is only allowed when there is an existing locks entry to supersede. Existing locks and files are unaffected.
- `scripts/protected-paths-check.mjs`: lock baseline paths and lock IDs accept the optional suffix (lowercase in the file, uppercase in the ID, must match). First locks must be unsuffixed.
- `src/top10-reaudit.ts`: a position that is PENDING in state but whose locks entry is a re-audit lock (`LOCKED`, `lock_audit_id` = `<POS>_REAUDIT_LOCK_<date>[B-Z]`) can be re-triggered for a superseding re-audit. The new queue item carries `baseline_file` from the locks entry and `supersedes_lock_audit_id`. Positions with a non-re-audit locks entry are still refused.
- `src/reaudit-executor.ts`: locked-baseline controls fall back to the locks entry's `baseline_file` when `data/baselines/<POS>.json` is absent.

## How to use (later, e.g. CB)
1. `npm run reaudit:trigger -- CB` (approval cited) — creates a new IN_PROGRESS item; earlier COMPLETED items stay.
2. Run stages as usual. Box stage builders must use the next free `_A#` audit IDs (saveAuditRecord never overwrites; old `_A1` files exist). Only records APPROVED or listed in the new item's approvals count, so the old run's records do not leak in.
3. `reaudit:revise` / tiebreak work again because the item is IN_PROGRESS.
4. `reaudit:lock` writes `CB_REAUDIT_LOCK_20261104B` / `CB.reaudit-20261104b.json` if done the same day, else a new unsuffixed date.
5. `madden_order_verified` stays false.
