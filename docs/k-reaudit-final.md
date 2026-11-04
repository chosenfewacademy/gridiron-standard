# K re-audit — final (pre-lock; approval t46u)

Status: cross-audit approved; `reaudit:lock -- K --dry-run` clean (would write `data/baselines/K.reaudit-20261104.json`, K_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each K_REAUDIT_RATE_* record (`madden_reference.delta_attributes`). Rated attributes (config/madden-entry-order.json): KPW KAC AWR INJ STA TGH.

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Will Reichard (MIN) | 91 | 84 | +7 |
| 2 | Ka'imi Fairbairn (HOU) | 88 | 81 | +7 |
| 3 | Chase McLaughlin (TB) | 86 | 81 | +5 |
| 4 | Evan McPherson (CIN) | 84 | 82 | +2 |
| 5 | Cam Little (JAX) | 82 | 80 | +2 |
| 6 | Brandon Aubrey (DAL) | 80 | 86 | -6 |
| 7 | Jason Myers (SEA) | 78 | 82 | -4 |
| 8 | Joey Slye (TEN) | 76 | 75 | +1 |
| 9 | Cameron Dicker (LAC) | 75 | 80 | -5 |
| 10 | Chris Boswell (PIT) | 74 | 85 | -11 |
| 11 | Eddy Pineiro (SF, first-out) | 72 | 77 | -5 |
| 12 | Spencer Shrader (IND, first-out) | 71 | 84 | -13 |
| 13 | Tyler Bass (BUF, first-out) | 70 | 74 | -4 |

## Kicker role convention
Rated as K = any player with 2025-26 FG, XP or kickoff attempts in nflverse play-by-play (kickoff specialists included), matched by gsis ID. Madden's listed position is reference only.

## Evidence
- FG% by distance band (0-39 / 40-49 / 50-59 / 60+), longest FG, blocked FGs and FG EPA (nflverse pbp, 2025 final and 2026 through week 8).
- XP%, kickoff touchback %, return average and out-of-bounds kickoffs (nflverse pbp).
- PFF K overall grades for 2025 and 2026 (pff.com/grades/nfl/k).
- Injury reports and roster status (nflverse).
- Data gaps: there is no public kickoff hang time (Next Gen Stats does not publish it), and PFF K sub-grades are paywalled. Kickoff EPA in pbp is dominated by coverage and was not used to rank.

## Pool
The K.reaudit pool (21 candidates) was approved. It copies the approved K pool and adds Eddy Pineiro from the league-wide screen of 64 kickers.

## Head-to-heads and tiebreaks (all approved; order held in every one)
Every stat figure in the reasons was checked against the pbp and PFF data before it was recorded.
- **H2H_01–06 (all NARROW):** Reichard>Fairbairn, McLaughlin>McPherson, Little>Aubrey, Myers>Slye, Dicker>Boswell, Boswell>Pineiro (cut line).
- **TIEBREAK_01–06 (all NARROW):** Fairbairn>McLaughlin, McPherson>Little, Aubrey>Myers, Slye>Dicker, Pineiro>Shrader, Shrader>Bass.
- **TIEBREAK_07 (league-ceiling flag, CLEAR):** Chris Boswell holds #10 over Jake Bates (FG EPA +16.1 vs -0.5 over 2025-26; 13 of 18 vs 5 of 10 from 50+).

## Variance audit (approved)
- 15 gaps of 10+ (5 below Madden, 10 above). 14 are supported. Most are AWR: Madden rates kicker awareness in the 56-73 range, while ours tracks PFF K grade and FG EPA.
- 1 was fixed through `reaudit:revise` with the overall unchanged: Ka'imi Fairbairn AWR 94→88.
- OVR gaps of 10+: Chris Boswell -11 (2026 FG EPA -1.2, PFF 62.7) and Spencer Shrader -13 (35 FGA over two seasons), both supported by the head-to-head chain.

## Scarcity: PASS
- 5 traits at 95+: Cam Little KPW 98 and Brandon Aubrey KPW 97 (EXTRAORDINARY), Chase McLaughlin KPW 96, Will Reichard KAC 95 and Joey Slye KPW 95 (LEAGUE_DEFINING).
- Will Reichard (91) is the lone overall 90+, 3 clear of Ka'imi Fairbairn (88).

## League ceiling check
- 51 non-pool kickers were screened against the refs Boswell (74) and Pineiro (72). Sample = FG + XP + kickoff attempts over 2025-26; at the config minimum of 250, only 5 kickers qualify, which is a structural limit of the position.
- Metrics: attempt-weighted PFF (pff), FG EPA per game (value), FG% (efficiency), missed FG+XP per 1,000 attempts (negative rate), games share (availability).
- 1 raw flag (Jake Bates) was resolved by approved TIEBREAK_07. There was no pool or rating change.

## Cross-audit: CONSISTENT
All 13 approved head-to-head and tiebreak verdicts agree with the order. 78 style pairs were checked, and none was too similar.

Locked #10 Chris Boswell (74) is the ceiling for every other K.
