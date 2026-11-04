# P re-audit — final (pre-lock; approval t46u)

Status: cross-audit approved; `reaudit:lock -- P --dry-run` clean (would write `data/baselines/P.reaudit-20261104.json`, P_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each P_REAUDIT_RATE_* record (`madden_reference.delta_attributes`). Rated attributes (config/madden-entry-order.json): KPW KAC AWR INJ STA TGH.

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Michael Dickson (SEA) | 90 | 85 | +5 |
| 2 | Jordan Stout (NYG) | 86 | 76 | +10 |
| 3 | Daniel Whelan (GB) | 85 | 74 | +11 |
| 4 | Logan Cooke (JAX) | 83 | 76 | +7 |
| 5 | Tress Way (WAS) | 81 | 74 | +7 |
| 6 | Jack Fox (DET) | 79 | 79 | +0 |
| 7 | Austin McNamara (NYJ) | 77 | 75 | +2 |
| 8 | Corliss Waitman (SF) | 76 | 77 | -1 |
| 9 | J.K. Scott (LAC) | 75 | 81 | -6 |
| 10 | Braden Mann (PHI) | 74 | 79 | -5 |
| 11 | Bryan Anger (DAL, first-out) | 73 | 79 | -6 |
| 12 | Jeremy Crawshaw (DEN, first-out) | 72 | 82 | -10 |
| 13 | Ryan Wright (NO, first-out) | 71 | 75 | -4 |

## Punter role convention
Rated as P = any player with 2025-26 punts in nflverse play-by-play, matched by gsis ID. Madden's listed position is reference only.

## Evidence
- Gross and net average, longest punt, inside-20 count and rate, touchbacks, fair catches, return yards allowed, blocks and punt EPA (nflverse pbp, 2025 final and 2026 through week 8).
- PFF P overall grades for 2025 and 2026 (pff.com/grades/nfl/p).
- Injury reports and roster status (nflverse).
- Data gaps: there is no public punt hang time (Next Gen Stats does not publish it); fair-catch rate and return yards allowed are the proxy. PFF P sub-grades are paywalled.

## Pool
The P.reaudit pool (22 candidates) was approved. It copies the approved P pool and adds Logan Cooke and Bryan Anger from the league-wide screen.

## Head-to-heads and tiebreaks (all approved; all NARROW; order held in every one)
Every stat figure in the reasons was checked against the pbp and PFF data before it was recorded.
- **H2H_01–06:** Dickson>Stout, Whelan>Cooke, Way>Fox, McNamara>Waitman, Scott>Mann, Mann>Anger (cut line).
- **TIEBREAK_01–06:** Stout>Whelan, Cooke>Way, Fox>McNamara, Waitman>Scott, Anger>Crawshaw, Crawshaw>Wright.

## Variance audit (approved)
- 20 gaps of 10+ (6 below Madden, 14 above). 19 are supported. Most are AWR: ours tracks PFF P grade and punt EPA; Madden's punter awareness sits in the 57-70 range for this group.
- 1 was fixed through `reaudit:revise` with the overall unchanged: Tress Way AWR 89→80 (PFF 44.0/48.2, 2026 EPA -1.0).
- OVR gaps of 10+: Jordan Stout +10, Daniel Whelan +11 and Jeremy Crawshaw -10, all supported by the head-to-head chain and net/EPA results.

## Scarcity: PASS
- 3 traits at 95+, all LEAGUE_DEFINING: Jordan Stout KPW 95, Daniel Whelan KPW 95, Michael Dickson KAC 95.
- Michael Dickson (90) is the lone overall 90+, 4 clear of Jordan Stout (86).

## League ceiling check
- 28 non-pool punters were screened against the refs Mann (74) and Anger (73). Sample = punts over 2025-26; the config minimum of 250 is above any punter's two-year volume (max 116), so no punter is sample-eligible. This is a structural limit of the position.
- Metrics: punt-weighted PFF (pff), punt EPA per 100 punts (value), net average (efficiency), touchbacks + blocks per 1,000 punts (negative rate), games share (availability).
- 0 raw flags. There was no pool or rating change.

## Cross-audit: CONSISTENT
All 12 approved head-to-head and tiebreak verdicts agree with the order. 78 style pairs were checked, and none was too similar.

Locked #10 Braden Mann (74) is the ceiling for every other P.
