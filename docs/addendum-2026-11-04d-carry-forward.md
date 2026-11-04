# Addendum 2026-11-04d (ET) — superseding re-audit carry-forward and run-scoped inbox files (t56s525 tooling, t56s532 batch)

Engine change only. Builds on addendum 2026-11-04c (same-day suffixed re-locks, re-trigger of re-audit-locked positions).

## Why
A superseding re-audit re-plans the same task ids (`<POS>_REAUDIT_CANDIDATE_AUDIT`, `_BG_nn`, `_RATE_nn`, ...). The file
transport read the earlier run's committed `audit-attempt-1.md` and hit "Immutable audit already exists", and nothing let the
new item take in the earlier run's approved cards. Rewriting those files would break add-only history.

## What changed
- `npm run reaudit:carry -- <POS> --by <name> --at <iso> --note "..." --confirm TOP10_REAUDIT_CARRY` (`src/reaudit-carry.ts`).
  Only into a freshly triggered item that has `supersedes_lock_audit_id` and nothing recorded. It appends to the new item every
  APPROVED approval of the superseded run (the COMPLETED item whose last audit id is that lock): candidate audit, dossiers,
  ratings incl. revisions, head-to-heads, tiebreaks. Each is a new approval record with `carried_from` and `original_approval`.
  Variance, scarcity, cross-audit and lock are never carried; they re-run. No file is copied or rewritten.
- Run tag: `reauditRunTag` gives "R2", "R3", ... for a superseding item (count of that position's TOP10_REAUDIT items).
  `planReaudit` sets `task.inbox_run`; `reaudit:revise` sets it too.
- Run-scoped inbox files (`src/grok-bot-transport.ts runScoped`): `evidence-R2.json`, `provenance-R2.json`,
  `audit-attempt-R2-<n>.md`, `feedback-attempt-R2-<n>.json`. The earlier run's files are never read or written. Audit ids of
  re-run stages use the next free `_A#` (e.g. `<POS>_REAUDIT_VARIANCE_AUDIT_A2`).
- `reaudit:lock` now takes the scarcity summary from this run's approved scarcity record (previously it looked in a
  non-existent directory and fell back to the old baseline's summary).
- Guard (`scripts/protected-paths-check.mjs`): EIGHTH NARROW EXCEPTION — carried approvals must name the item's
  `supersedes_lock_audit_id` and re-record an APPROVED (task, audit) of that lock's COMPLETED item; position-wide tasks cannot be
  carried. Authored inbox texts (`audit-attempt-*.md`, `revision-A*.md`) and run-scoped files are add-only (edits/deletes fail);
  first-run evidence refreshes are unchanged.

## How to use
1. `npm run reaudit:trigger -- <POS> --by PhiXCrypto --confirm TOP10_REAUDIT` (push alone: the guard admits only a QUEUED append).
2. `npm run reaudit:carry -- <POS> ...` — item goes IN_PROGRESS with the earlier run's player stages approved.
3. `reaudit:revise` changed cards (revision file `revision-A<N>.md`, fresh `evidence-R2.json` in the RATE dir); run new
   tiebreaks with new `TIEBREAK_nn` ids.
4. `reaudit:run` variance, scarcity, cross-audit with run-scoped files; approve each.
5. `reaudit:lock --dry-run`, then lock (push the lock alone). `madden_order_verified` stays false.
