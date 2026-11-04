# Addendum 2026-11-04e (ET) — approved tiebreaks order tied players (user decision t56s540)

Engine change only. Add-only; v1.0 text and locked baselines are untouched. Builds on addenda 2026-11-04c/d.

## Why
The TE superseding cross-audit (run R2) failed its pair-consistency check: approved tiebreak `TE_REAUDIT_TIEBREAK_43_A1`
says Brenton Strange beats Isaiah Likely (both OVR 78), but `ratingOrder` broke OVR ties purely by contention order
(Likely 10, Strange 16), so Likely ranked ahead. User decision t56s540: "Change the engine so approved tiebreaks order tied players".

## What changed
- `src/stage-engine.ts`: `ratingOrder(set, overall, tiebreaks)` — order is still approved `proposed_ovr` descending. Within a
  group of equal OVR, approved tiebreak results decide relative order; a player is placed once no remaining tied player has
  beaten them in an approved tiebreak, and among those eligible the earliest contention position goes first. Players with no
  tiebreak between them, or caught in a tiebreak cycle, fall back to contention order.
- Tiebreaks between players with different OVR never move anyone (OVR still governs). A later approved tiebreak on the same
  pair overrides an earlier one.
- `approvedTiebreaks(pos, done, opts)`: only completed `<POS>_REAUDIT_TIEBREAK_nn` tasks whose record is approved
  (status APPROVED or in the item's approved audit ids, carried approvals included) count. Standard `_H2H_nn` pairs are
  unchanged and do not feed tie ordering.
- The v1.1.2 planner uses this order for the variance / scarcity / cross-audit task controls and for the lock's `final_order`.
- Tests: `tests/stage-tests.ts` ("addendum 2026-11-04e ...").

## Locked positions
Existing locks are not re-locked by this change. Any locked position whose order would differ under the new rule is reported
to the commissioner only; a re-lock needs a separate decision. `madden_order_verified` stays false.
