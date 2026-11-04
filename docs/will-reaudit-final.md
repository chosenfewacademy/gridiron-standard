# WILL re-audit — final (pre-lock; approval t46u)

Status: cross-audit approved; `reaudit:lock -- WILL --dry-run` clean (would write `data/baselines/WILL.reaudit-20261104.json`, WILL_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each WILL_REAUDIT_RATE_* record (`madden_reference.delta_attributes`).

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Zack Baun (PHI) | 90 | 93 | -3 |
| 2 | Roquan Smith (BAL) | 86 | 93 | -7 |
| 3 | Drue Tranquill (KC) | 85 | 89 | -4 |
| 4 | Jordyn Brooks (MIA) | 84 | 88 | -4 |
| 5 | Blake Cashman (MIN) | 83 | 88 | -5 |
| 6 | Arvell Reese (NYG) | 82 | 82 | +0 |
| 7 | Foyesade Oluokun (JAX) | 81 | 87 | -6 |
| 8 | Alex Singleton (DEN) | 80 | 87 | -7 |
| 9 | Demario Davis (NYJ) | 79 | 90 | -11 |
| 10 | Edgerrin Cooper (GB, RES) | 78 | 80 | -2 |
| 11 | Divine Deablo (ATL, INA, first-out) | 77 | 81 | -4 |
| 12 | Drake Thomas (SEA, first-out) | 76 | 76 | +0 |
| 13 | Kaden Elliss (NO, first-out) | 75 | 83 | -8 |

## LB role convention (MIKE / WILL / SAM)
Each linebacker is assigned to exactly one of MIKE, WILL or SAM by his primary 2025-26 role. nflverse weekly depth-chart slots are mapped per team scheme: base 4-3 MLB→MIKE, WLB→WILL, SLB→SAM; base 3-4 RILB→MIKE, LILB→WILL (3-4 OLB/WLB/SLB are edge and belong to LEDGE/REDGE). Each season's slot shares are weighted by that season's defensive snaps; the largest share wins (ties go to MIKE, then WILL). Players are matched by gsis/PFR ID. Each player appears in one list only; Madden's listed position is reference only (several players here carry a different LB position in Madden).

## Evidence
PFF LB overall grades for 2025 and 2026 (with run-defense / coverage / pass-rush snap counts); PFR coverage allowed, tackles and missed tackles, blitzes and pressures; nflverse snaps, tackles, TFL, sacks, INT, PD, FF, accepted penalties, injury reports, roster status and depth-chart role. Paywalled: PFF run-defense / coverage / tackling sub-grades and alignment splits; no public tracking data for LB speed (movement traits LOW confidence).

## Pool
WILL.reaudit pool approved with 14 candidates.

## Head-to-heads and tiebreaks (all approved; order held in every one)
- **H2H_01–06:** Baun>Smith (CLEAR), Tranquill>Brooks, Cashman>Reese, Oluokun>Singleton, Davis>Cooper, Cooper>Deablo (cut line).
- **TIEBREAK_01–06:** Smith>Tranquill, Brooks>Cashman, Reese>Oluokun, Singleton>Davis, Deablo>Thomas, Thomas>Elliss.
- **TIEBREAK_07–15 (league-ceiling flags):** Cooper over all 9 flagged WILLs (Robert Spillane, Nate Landman, Alex Anzalone, Tremaine Edmunds, Germaine Pratt, Daiyan Henley, Bobby Okereke, Cody Barton, Josiah Trotter).

## Variance audit (approved)
19 gaps of 10+ (12 below Madden, 7 above); 18 supported, 1 fixed through `reaudit:revise` with the overall unchanged: Blake Cashman PRS 68→72 (13 pressures on 42 blitzes, 4.5 sacks in 2026). OVR gap of 10+: Demario Davis −11 (PFF 81.7 in 2025 but 50.6, #64, in 2026).

## Scarcity: PASS
Alex Singleton STA 96 and TGH 96 are the only 95+ traits, both tagged LEAGUE_DEFINING (1,610 defensive snaps in 24 games across 2025-26). Overall 90+: Baun 90 alone, 4 points clear of Smith at 86.

## League ceiling check
79 WILL-assigned LBs outside the pool were screened (250+ snaps) against refs Cooper (78) and Deablo (77), on the same metrics as MIKE. The bar is low because Cooper's 2026 is injury-shortened (4 games, RES) and Deablo's 2026 PFF is 60.9, so 9 raw-flagged. All were resolved by approved tiebreaks won by Cooper on his two-season body of work (PFF 75.8 on 1,089 snaps in 2025; 6 TFL / 3 sacks in 4 games of 2026). Closest NARROW call: rookie Josiah Trotter (PFF 68.1 on 393 snaps in 2026). No pool or rating change.

## Cross-audit: CONSISTENT
All 21 approved head-to-head/tiebreak verdicts agree with the order; 78 style pairs checked, none too similar.

Locked #10 Edgerrin Cooper (78) is the ceiling for every other WILL.
