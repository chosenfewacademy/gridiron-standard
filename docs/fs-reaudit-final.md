# FS re-audit — final (pre-lock; approval t46u)

Status: cross-audit approved; `reaudit:lock -- FS --dry-run` clean (would write `data/baselines/FS.reaudit-20261104.json`, FS_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each FS_REAUDIT_RATE_* record (`madden_reference.delta_attributes`).

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Jalen Pitre (HOU, INA) | 88 | 86 | +2 |
| 2 | Minkah Fitzpatrick (NYJ) | 86 | 90 | -4 |
| 3 | Antonio Johnson (JAX, INA) | 84 | 81 | +3 |
| 4 | Julian Love (SEA) | 83 | 86 | -3 |
| 5 | Xavier McKinney (GB) | 82 | 92 | -10 |
| 6 | Quentin Lake (LA) | 80 | 84 | -4 |
| 7 | Tykee Smith (TB) | 78 | 79 | -1 |
| 8 | Kevin Byard (NE) | 77 | 85 | -8 |
| 9 | Bryan Cook (CIN) | 76 | 80 | -4 |
| 10 | Thomas Harper (DET, RES) | 75 | 70 | +5 |
| 11 | Chuck Clark (DET, first-out) | 74 | 78 | -4 |
| 12 | Jevon Holland (NYG, INA, first-out) | 73 | 85 | -12 |
| 13 | Kamren Kinchens (LA, first-out) | 72 | 79 | -7 |

## FS/SS role convention
Every PFF-graded safety (2025 or 2026) is assigned to exactly one of FS or SS by primary 2025-26 alignment: nflverse weekly depth-chart FS/SS slot counts per season, weighted by that season's defensive snaps. The larger share wins, and ties go to FS. A player with no FS/SS depth-chart slot falls back to his nflverse roster depth_chart_position. Players are matched by gsis/PFR ID, and each appears in one list only. Madden's listed position is reference only (Pitre's Madden card is CB; Fitzpatrick, Johnson, McKinney, Lake and Smith carry SS cards). Cooper DeJean (2026 FS 103 / SS 108 slot-weeks; CB in 2025) goes to SS.

## Evidence
- PFF S overall grades for 2025 and 2026, with coverage and run-defense snap counts.
- PFR coverage allowed: targets, completions, yards, TD, passer rating and INT; also tackles and missed tackles.
- nflverse: depth charts, snaps, tackles, TFL, INT, PD, FF, accepted penalties, injury reports and roster status.
- Paywalled: PFF coverage, run-defense and tackling sub-grades, and box/slot/deep alignment splits.
- There is no public tracking data, so movement traits and JMP are LOW confidence.

## Pool
- The FS.reaudit pool (18 candidates) was approved. It copies the shared approved safety pool, moves 10 SS-aligned safeties to the SS list (OTHER_POSITION), and adds Tykee Smith, Thomas Harper (RES), Chuck Clark and Kamren Kinchens from the league-wide screen.
- Reserve/inactive players are listed in the injured section: Jalen Pitre, Antonio Johnson, Jevon Holland (INA), Thomas Harper (RES).

## Head-to-heads and tiebreaks (all approved; order held in every one)
Every stat figure in the reasons was checked against the PFF, PFR and nflverse data before it was recorded.
- **H2H_01–06:** Pitre>Fitzpatrick, Johnson>Love, McKinney>Lake, Smith>Byard, Cook>Harper, Harper>Clark (cut line). All NARROW.
- **TIEBREAK_01–06:** Fitzpatrick>Johnson, Love>McKinney, Lake>Smith, Byard>Cook, Clark>Holland, Holland>Kinchens (CLEAR).
- **TIEBREAK_07–11 (league-ceiling flags):** Harper holds #10 over Camryn Bynum, Alohi Gilman, Brandon Jones, Malik Mustapha and Andrew Wingard.

## Variance audit (approved)
- 38 gaps of 10+ (23 below Madden, 15 above). 36 are supported.
- 2 were fixed through `reaudit:revise` with overalls unchanged: Jalen Pitre TAK 84→80 (11 missed tackles on 74 in 2025) and Quentin Lake AGI 92→86 (LOW-confidence movement trait).
- OVR gaps of 10+: Xavier McKinney -10 and Jevon Holland -12, both supported by the head-to-head chain and their grades (McKinney 71.8 in 2026; Holland 58.4 in 2025).

## Scarcity: PASS
- 14 traits at 90+, none at 95+, and no overall 90+. Pitre (88) leads a flat FS class: no free safety has a PFF season grade of 88+ on 500+ snaps in 2025-26.

## League ceiling check
- 101 non-pool FSs were screened (250+ snaps) against the refs Harper (75) and Clark (74).
- Metrics: snap-weighted PFF (pff), INT+PD per game (value), % of targets not completed (efficiency), missed tackles plus penalties per 1,000 snaps (negative rate), games share (availability).
- Harper's reserve-shortened sample (12 games, 569 PFF snaps) sets low value/availability bars, so 5 players raw-flagged. All 5 were resolved by approved tiebreaks. There was no pool or rating change.

## Cross-audit: CONSISTENT
All 17 approved head-to-head and tiebreak verdicts agree with the order. 78 style pairs were checked, and none was too similar.

Locked #10 Thomas Harper (75) is the ceiling for every other FS.
