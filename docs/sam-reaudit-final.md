# SAM re-audit — final (pre-lock; approval t46u)

Status: cross-audit approved; `reaudit:lock -- SAM --dry-run` clean (would write `data/baselines/SAM.reaudit-20261104.json`, SAM_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each SAM_REAUDIT_RATE_* record (`madden_reference.delta_attributes`).

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Devin Bush (CHI) | 84 | 86 | -2 |
| 2 | Isaiah McDuffie (GB) | 79 | 78 | +1 |
| 3 | Quincy Williams (CLE) | 78 | 83 | -5 |
| 4 | D'Marco Jackson (CHI) | 77 | 71 | +6 |
| 5 | Leo Chenal (WAS, RES) | 76 | 82 | -6 |
| 6 | Derrick Barnes (DET) | 75 | 75 | +0 |
| 7 | Dorian Williams (BUF) | 74 | 74 | +0 |
| 8 | Dennis Gardeck (JAX) | 73 | 74 | -1 |
| 9 | E.J. Speed (HOU, RES) | 72 | 75 | -3 |
| 10 | Malcolm Rodriguez (DET) | 71 | 74 | -3 |
| 11 | Noah Sewell (CHI, first-out) | 70 | 70 | +0 |
| 12 | Jack Sanborn (CHI, first-out) | 69 | 71 | -2 |
| 13 | Devin White (DET, RES, first-out) | 68 | 73 | -5 |

## LB role convention (MIKE / WILL / SAM)
Each linebacker is assigned to exactly one of MIKE, WILL or SAM by his primary 2025-26 role. nflverse weekly depth-chart slots are mapped per team scheme: base 4-3 MLB→MIKE, WLB→WILL, SLB→SAM; base 3-4 RILB→MIKE, LILB→WILL (3-4 OLB/WLB/SLB are edge and belong to LEDGE/REDGE). Each season's slot shares are weighted by that season's defensive snaps; the largest share wins (ties go to MIKE, then WILL). Players are matched by gsis/PFR ID. Each player appears in one list only; Madden's listed position is reference only (several players here carry a different LB position in Madden).

## Evidence
PFF LB overall grades for 2025 and 2026 (with run-defense / coverage / pass-rush snap counts); PFR coverage allowed, tackles and missed tackles, blitzes and pressures; nflverse snaps, tackles, TFL, sacks, INT, PD, FF, accepted penalties, injury reports, roster status and depth-chart role. Paywalled: PFF run-defense / coverage / tackling sub-grades and alignment splits; no public tracking data for LB speed (movement traits LOW confidence).

## Pool
SAM.reaudit pool approved with 13 candidates. E.J. Speed and Devin White (both RES) were added to the pool's injured section to pass the coverage gate; they stay in the pool.

## Head-to-heads and tiebreaks (all approved; order held in every one)
- **H2H_01–06:** Bush>McDuffie (CLEAR), Q.Williams>Jackson, Chenal>Barnes, D.Williams>Gardeck, Speed>Rodriguez, Rodriguez>Sewell (cut line). An add-only reason correction for H2H_03 is in its `reason-correction.md` (verdict unchanged).
- **TIEBREAK_01–06:** McDuffie>Q.Williams, Jackson>Chenal, Barnes>D.Williams, Gardeck>Speed, Sewell>Sanborn, Sanborn>White.
- **TIEBREAK_07 (league-ceiling flag):** Rodriguez over Curtis Robinson (DAL, practice squad).

## Variance audit (approved)
10 gaps of 10+ (5 below Madden, 5 above); 9 supported, 1 fixed through `reaudit:revise` with the overall unchanged: Derrick Barnes PRS 60→66 (7 sacks across 2025-26). No OVR gap of 10+.

## Scarcity: PASS
6 traits at 90+, none at 95+, so no LEAGUE_DEFINING tag is needed. Bush 84 tops the list, 5 points clear of McDuffie at 79.

## League ceiling check
17 SAM-assigned LBs outside the pool were screened (250+ snaps) against refs Rodriguez (71) and Sewell (70), on the same metrics as MIKE. SAM is the thinnest LB role (17 non-pool SAMs met the 250-snap sample), and the low half of the list is small-sample: Rodriguez has 192 snaps across 2025-26 and Sewell 480. One player raw-flagged, Curtis Robinson, resolved by an approved tiebreak. No pool or rating change.

## Cross-audit: CONSISTENT
All 13 approved head-to-head/tiebreak verdicts agree with the order; 78 style pairs checked, none too similar.

Locked #10 Malcolm Rodriguez (71) is the ceiling for every other SAM.
