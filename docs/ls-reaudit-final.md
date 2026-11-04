# LS re-audit — final (pre-lock; approval t46u)

Status: cross-audit approved; `reaudit:lock -- LS --dry-run` clean (would write `data/baselines/LS.reaudit-20261104.json`, LS_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each LS_REAUDIT_RATE_* record (`madden_reference.delta_attributes`). Rated attributes (config/madden-entry-order.json): AWR STR RBK PBK SPD TAK INJ STA TGH.

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Ross Matiscik (JAX) | 78 | 72 | +6 |
| 2 | Thomas Hennessy (NYJ) | 76 | 72 | +4 |
| 3 | Chris Stoll (SEA) | 74 | 62 | +12 |
| 4 | William Wagner (CIN) | 73 | 63 | +10 |
| 5 | Austin Brinkman (HOU) | 72 | 65 | +7 |
| 6 | Andrew DePaola (MIN) | 71 | 80 | -9 |
| 7 | Luke Rhodes (IND) | 70 | 77 | -7 |
| 8 | Christian Kuntz (PIT) | 69 | 62 | +7 |
| 9 | Trent Sieg (DAL) | 68 | 78 | -10 |
| 10 | Nick Moore (BAL) | 67 | 70 | -3 |
| 11 | Joe Cardona (LA, first-out) | 66 | 60 | +6 |
| 12 | Mitchell Fraboni (DEN, first-out) | 65 | 68 | -3 |
| 13 | Rex Sunahara (CLE, first-out) | 64 | 58 | +6 |

## Long snapper role convention
Rated as LS = nflverse roster position LS with 2025-26 special-teams snaps, matched by gsis ID. Madden's listed position is reference only.

## Evidence (THIN DATA, documented)
- Bad snaps: "(Aborted)" plays parsed from nflverse pbp descriptions on every punt- and field-goal-formation play. Only three were found league-wide over 2025-26: Thomas Hennessy (2025 wk 14), Rex Sunahara (2026 wk 5) and Tucker Addington (2026 wk 2, not in the pool). Snap accuracy short of an abort (high/low/off-laces) is not public.
- Kicks and punts blocked on his snaps, FG make rate on his snaps (nflverse pbp). Blocks are mostly a unit-protection outcome and were weighted lightly.
- Special-teams coverage tackles (nflverse pbp) and snaps/games (nflverse snap counts).
- FootballKickingStats unit points and rank. These credit the whole FG/punt unit, not the snapper alone.
- PFF publishes no public LS grade, so there is no PFF input. The FootballKickingStats reported-snap-error table is script-loaded and was not read.
- STR/RBK/PBK/SPD are LOW-confidence proxies (no tracking or blocking charting for long snappers).

## Pool
The LS.reaudit pool (23 candidates) was approved. It copies the approved LS pool and adds Thomas Hennessy, Trent Sieg and Joe Cardona from the league-wide screen.

## Head-to-heads and tiebreaks (all approved; all NARROW; order held in every one)
Every stat figure in the reasons was checked against the pbp, snap-count and FootballKickingStats data before it was recorded.
- **H2H_01–06:** Matiscik>Hennessy, Stoll>Wagner, Brinkman>DePaola, Rhodes>Kuntz, Sieg>Moore, Moore>Cardona (cut line).
- **TIEBREAK_01–06:** Hennessy>Stoll, Wagner>Brinkman, DePaola>Rhodes, Kuntz>Sieg, Cardona>Fraboni, Fraboni>Sunahara.

## Variance audit (approved)
- 29 gaps of 10+ (7 below Madden, 22 above). 28 are supported. Most are AWR: ours tracks snap reliability (0 aborted snaps for 11 of the 13), while Madden's LS awareness sits in the 48-70 range for this group.
- 1 was fixed through `reaudit:revise` with the overall unchanged: Andrew DePaola AWR 86→80.
- OVR gaps of 10+: Chris Stoll +12, William Wagner +10 and Trent Sieg -10, all supported by the head-to-head chain.

## Scarcity: PASS
- 0 traits at 95+. The only 90+ traits are INJ availability marks (Luke Rhodes 94, Thomas Hennessy 93, Chris Stoll 92, William Wagner 92, Mitchell Fraboni 91, Austin Brinkman 90, Trent Sieg 90): 17-game 2025 seasons with no injury designation.
- No LS overall at 80+. Ross Matiscik (78) sits 2 clear of Thomas Hennessy (76).

## League ceiling check
- 27 non-pool long snappers were screened against the refs Moore (67) and Cardona (66). Sample = ST snaps over 2025-26; the config minimum of 250 is above any LS's two-year volume (max 221), so no LS is sample-eligible. There is no PFF criterion.
- Metrics: unit points per game (value), FG make rate on his snaps (efficiency), aborted snaps + blocks + penalties per 1,000 ST snaps (negative rate), games share (availability).
- 0 raw flags. There was no pool or rating change.

## Cross-audit: CONSISTENT
All 12 approved head-to-head and tiebreak verdicts agree with the order. 78 style pairs were checked, and none was too similar.

Locked #10 Nick Moore (67) is the ceiling for every other LS.
