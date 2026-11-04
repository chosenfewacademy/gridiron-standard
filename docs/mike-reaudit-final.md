# MIKE re-audit — final (pre-lock; approval t46u)

Status: cross-audit approved; `reaudit:lock -- MIKE --dry-run` clean (would write `data/baselines/MIKE.reaudit-20261104.json`, MIKE_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each MIKE_REAUDIT_RATE_* record (`madden_reference.delta_attributes`).

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Fred Warner (SF) | 92 | 98 | -6 |
| 2 | Jack Campbell (DET) | 87 | 86 | +1 |
| 3 | Devin Lloyd (CAR) | 86 | 87 | -1 |
| 4 | Ventrell Miller (JAX) | 83 | 73 | +10 |
| 5 | Nick Bolton (KC) | 82 | 83 | -1 |
| 6 | Carson Schwesinger (CLE) | 81 | 85 | -4 |
| 7 | Trenton Simpson (BAL) | 80 | 79 | +1 |
| 8 | Cedric Gray (TEN) | 79 | 78 | +1 |
| 9 | Dre Greenlaw (SF) | 78 | 85 | -7 |
| 10 | Omar Speights (LA) | 77 | 78 | -1 |
| 11 | Sonny Styles (WAS, first-out) | 76 | 81 | -5 |
| 12 | Jamien Sherwood (NYJ, first-out) | 75 | 77 | -2 |
| 13 | T.J. Edwards (CHI, first-out) | 74 | 81 | -7 |

## LB role convention (MIKE / WILL / SAM)
Each linebacker is assigned to exactly one of MIKE, WILL or SAM by his primary 2025-26 role. nflverse weekly depth-chart slots are mapped per team scheme: base 4-3 MLB→MIKE, WLB→WILL, SLB→SAM; base 3-4 RILB→MIKE, LILB→WILL (3-4 OLB/WLB/SLB are edge and belong to LEDGE/REDGE). Each season's slot shares are weighted by that season's defensive snaps; the largest share wins (ties go to MIKE, then WILL). Players are matched by gsis/PFR ID. Each player appears in one list only; Madden's listed position is reference only (several MIKEs here are WILL/SAM in Madden).

## Evidence
PFF LB overall grades for 2025 and 2026 (with run-defense / coverage / pass-rush snap counts); PFR coverage allowed, tackles and missed tackles, blitzes and pressures; nflverse snaps, tackles, TFL, sacks, INT, PD, FF, accepted penalties, injury reports, roster status and depth-chart role. Paywalled: PFF run-defense / coverage / tackling sub-grades and alignment splits; no public tracking data for LB speed (movement traits LOW confidence).

## Pool
MIKE.reaudit pool approved with 16 candidates. Bobby Wagner is excluded: unsigned free agent with no 2026 team or snaps.

## Head-to-heads and tiebreaks (all approved; order held in every one)
- **H2H_01–06:** Warner>Campbell (CLEAR), Lloyd>Miller, Bolton>Schwesinger, Simpson>Gray, Greenlaw>Speights, Speights>Styles (cut line). Add-only reason corrections for H2H_01–05 are recorded in each task's `reason-correction.md` (verdicts unchanged).
- **TIEBREAK_01–06:** Campbell>Lloyd, Miller>Bolton, Schwesinger>Simpson, Gray>Greenlaw, Styles>Sherwood, Sherwood>Edwards.
- **TIEBREAK_07–24 (league-ceiling flags):** Speights over all 18 flagged MIKEs.

## Variance audit (approved)
20 gaps of 10+ (14 below Madden, 6 above); 19 supported, 1 fixed through `reaudit:revise` with the overall unchanged: Devin Lloyd TAK 80→84 (1 missed tackle on 46 tackles in 2026). OVR gap of 10+: Ventrell Miller +10 (PFF 91.9, #1 LB in 2026).

## Scarcity: PASS
Fred Warner AWR 95 and PRC 95 are the only 95+ traits, both tagged LEAGUE_DEFINING (PFF #1 LB 2025, #3 2026). Overall 90+: Warner 92 alone, 5 points clear of Campbell at 87.

## League ceiling check
72 MIKE-assigned LBs outside the pool were screened (250+ snaps) against refs Speights (77) and Styles (76). Metrics: snap-weighted PFF LB grade; impact plays per game (TFL + sacks + INT + PD + FF); tackle success %; missed tackles + penalties per 1,000 snaps; games/25. The bar is low because Speights' 2025 (PFF 67.1, 0 TFL) and Styles' rookie sample set the minimums, so 18 raw-flagged. All were resolved by approved tiebreaks won by Speights on 2026 form (PFF 79.9, #4 LB). Bobby Wagner and Lavonte David are unsigned free agents (ineligible). No pool or rating change.

## Cross-audit: CONSISTENT
All 30 approved head-to-head/tiebreak verdicts agree with the order; 78 style pairs checked, none too similar.

Locked #10 Omar Speights (77) is the ceiling for every other MIKE.
