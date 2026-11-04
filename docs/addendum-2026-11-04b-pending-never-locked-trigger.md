# Addendum 2026-11-04b — TOP10_REAUDIT pathway for never-locked PENDING positions (commissioner t46u / t50s441)

Extends addendum 2026-11-04 (never-locked re-audit, first lock) from IN_PROGRESS (LG) to PENDING positions
(C, RG, RT, FB, LEDGE/REDGE, DT, MIKE/WILL/SAM, CB, FS, SS, K, P, LS) so every remaining position runs the same pathway.

1. `src/top10-reaudit.ts`: `reaudit:trigger` also admits a position whose state is `PENDING` **and** that has no
   `state/locks.json` entry. LOCKED / IN_PROGRESS behave as before; a PENDING position with a locks entry is refused.
2. Re-audit pool: `data/candidate-pools/<POS>.reaudit.proposed.json` is a verbatim copy of the approved `<POS>.json`
   candidates/exclusions/FA/injured with `reaudit.never_locked = true`, `compared_list` = first 10 approved candidates,
   `flags = []`, approved through `pool:approve`. The approved `<POS>.json` is untouched.
3. Everything else (candidate-audit controls from the approved pool, first lock, guard exception) is addendum 2026-11-04.
   `state.positions.<POS>` stays `PENDING`; the lock record + locks entry are the lock of record. Main-run pointer unchanged.

Test: `tests/reaudit-tests.ts` "addendum 2026-11-04b".
