# SS re-audit — final (pre-lock; approval t46u)

Status: cross-audit approved; `reaudit:lock -- SS --dry-run` clean (would write `data/baselines/SS.reaudit-20261104.json`, SS_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each SS_REAUDIT_RATE_* record (`madden_reference.delta_attributes`).

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Kyle Hamilton (BAL) | 94 | 94 | +0 |
| 2 | Evan Williams (GB) | 88 | 83 | +5 |
| 3 | Jessie Bates III (ATL) | 87 | 95 | -8 |
| 4 | Brian Branch (DET) | 85 | 91 | -6 |
| 5 | Derwin James Jr. (LAC, RES) | 84 | 93 | -9 |
| 6 | Antoine Winfield Jr. (TB) | 82 | 93 | -11 |
| 7 | Kamren Curl (LA) | 80 | 83 | -3 |
| 8 | Talanoa Hufanga (DEN, INA) | 79 | 89 | -10 |
| 9 | Tony Jefferson (LAC) | 77 | 82 | -5 |
| 10 | Jaylinn Hawkins (BAL, INA) | 76 | 77 | -1 |
| 11 | Christian Roland-Wallace (KC, first-out) | 75 | 67 | +8 |
| 12 | Coby Bryant (CHI, RES, first-out) | 74 | 77 | -3 |
| 13 | Cooper DeJean (PHI, first-out) | 73 | 84 | -11 |

## FS/SS role convention
Every PFF-graded safety (2025 or 2026) is assigned to exactly one of FS or SS by primary 2025-26 alignment: nflverse weekly depth-chart FS/SS slot counts per season, weighted by that season's defensive snaps. The larger share wins, and ties go to FS. A player with no FS/SS depth-chart slot falls back to his nflverse roster depth_chart_position (Christian Roland-Wallace -> SS). Players are matched by gsis/PFR ID, and each appears in one list only. Madden's listed position is reference only. Cooper DeJean (2026 FS 103 / SS 108 slot-weeks; CB in 2025) is SS.

## Evidence
- PFF S overall grades for 2025 and 2026, with coverage and run-defense snap counts.
- PFR coverage allowed: targets, completions, yards, TD, passer rating and INT; also tackles and missed tackles.
- nflverse: depth charts, snaps, tackles, TFL, INT, PD, FF, accepted penalties, injury reports and roster status.
- Paywalled: PFF coverage, run-defense and tackling sub-grades, and box/slot/deep alignment splits.
- There is no public tracking data, so movement traits and JMP are LOW confidence.

## Pool
- The SS.reaudit pool (17 candidates) was approved. It copies the shared approved safety pool, moves FS-aligned safeties to the FS list (OTHER_POSITION), and adds Brian Branch, Antoine Winfield Jr., Kamren Curl, Tony Jefferson, Jaylinn Hawkins, Coby Bryant and Cooper DeJean from the league-wide screen.
- Reserve/inactive players are listed in the injured section, including Derwin James Jr., Talanoa Hufanga, Jaylinn Hawkins and Coby Bryant.

## Head-to-heads and tiebreaks (all approved; order held in every one)
Every stat figure in the reasons was checked against the PFF, PFR and nflverse data before it was recorded.
- **H2H_01–06:** Hamilton>Williams (CLEAR), Bates>Branch, James>Winfield, Curl>Hufanga, Jefferson>Hawkins, Hawkins>Roland-Wallace (cut line). The last five were NARROW.
- **TIEBREAK_01–06:** Williams>Bates, Branch>James, Winfield>Curl, Hufanga>Jefferson, Roland-Wallace>Bryant, Bryant>DeJean.
- **TIEBREAK_07–22 (league-ceiling flags):** Hawkins holds #10 over each of these 16 players: Avonte Maddox, Ty Okada, Calen Bullock, Grant Delpit, Javon Bullard, Jaquan Brisker, Tony Adams, Ji'Ayir Brown, Dane Belton, Eric Murray, Dadrion Taylor-Demerson, Josh Metellus, Kyle Dugger, Reed Blankenship, Dillon Thieneman, Michael Carter II.

## Variance audit (approved)
- 35 gaps of 10+ (20 below Madden, 15 above). 34 are supported.
- 1 was fixed through `reaudit:revise` with the overall unchanged: Christian Roland-Wallace TAK 88→82. His 0 missed tackles on 47 (PFR) came on a part-time sample of 190 and 155 snaps.
- OVR gaps of 10+: Antoine Winfield Jr. -11, Talanoa Hufanga -10 and Cooper DeJean -11, all supported by the head-to-head chain and their grades (Winfield 74.4 in 2025; Hufanga 70.9 / 70.5; DeJean 54.6 at safety in 2026).

## Scarcity: PASS
- 25 traits at 90+, none at 95+ (the highest is Hamilton at 92).
- Kyle Hamilton (94) is the lone star: 6 points clear of Evan Williams (88) and 18 points above #10.

## League ceiling check
- 93 non-pool SSs were screened (250+ snaps) against the refs Hawkins (76) and Roland-Wallace (75).
- Metrics: snap-weighted PFF (pff), INT+PD per game (value), % of targets not completed (efficiency), missed tackles plus penalties per 1,000 snaps (negative rate), games share (availability).
- Roland-Wallace's 345-snap sample (8 of 9 targets completed in 2026) sets a very low efficiency bar, so 16 players raw-flagged. All 16 were resolved by approved tiebreaks. There was no pool or rating change.

## Cross-audit: CONSISTENT
All 28 approved head-to-head and tiebreak verdicts agree with the order. 78 style pairs were checked, and none was too similar.

Locked #10 Jaylinn Hawkins (76) is the ceiling for every other SS.
