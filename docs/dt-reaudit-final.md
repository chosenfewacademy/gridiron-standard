# DT re-audit — final (pre-lock; approval t46u)

Status: cross-audit approved; `reaudit:lock -- DT --dry-run` clean (would write `data/baselines/DT.reaudit-20261104.json`, DT_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each DT_REAUDIT_RATE_* record (`madden_reference.delta_attributes`).

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Jeffery Simmons (CHI) | 93 | 96 | -3 |
| 2 | Cameron Heyward (PIT) | 88 | 95 | -7 |
| 3 | Quinnen Williams (DAL) | 87 | 91 | -4 |
| 4 | Zach Allen (DEN) | 86 | 89 | -3 |
| 5 | Dexter Lawrence (CIN) | 85 | 93 | -8 |
| 6 | Leonard Williams (SEA) | 84 | 90 | -6 |
| 7 | Kobie Turner (LA, RES) | 82 | 85 | -3 |
| 8 | Derrick Brown (CAR) | 81 | 96 | -15 |
| 9 | Poona Ford (LA, RES) | 80 | 83 | -3 |
| 10 | Alim McNeill (DET) | 79 | 87 | -8 |
| 11 | Jalen Redmond (MIN, first-out) | 78 | 84 | -6 |
| 12 | Travis Jones (BAL, first-out) | 77 | 79 | -2 |
| 13 | DJ Reader (NYG, first-out) | 76 | 84 | -8 |

## Bucket
DT BUCKET (t46u): interior defensive linemen graded by PFF as DI (pff.com/grades/nfl/di), aligned at DT/NT or 3-4 DE (interior) in nflverse 2025-26 depth charts; edge-graded players belong to LEDGE/REDGE. DT has no left/right split. The 2026 approved DT pool already held every contender found by the league-wide screen, so the re-audit pool is a copy with no additions.

## Evidence
PFF DI overall grades for 2025 (225 graded) and 2026 through Week 8 (195 graded); ESPN DT pass-rush and run-stop win rates (published leaderboards only, top 20 / top 10); PFR pressures, hurries, QB knockdowns, sacks, tackles and missed tackles; nflverse snaps, sacks, QB hits, TFL, accepted penalties, injury reports, roster status and depth-chart alignment. Paywalled: PFF pass-rush and run-defense sub-grades and alignment splits.

## Head-to-heads and tiebreaks (all approved; order held in every one)
- **H2H_01–06:** Simmons>Heyward (CLEAR), Q.Williams>Allen, Lawrence>L.Williams, Turner>Brown, Ford>McNeill, McNeill>Redmond (cut line).
- **TIEBREAK_01–06:** Heyward>Q.Williams, Allen>Lawrence, L.Williams>Turner, Brown>Ford, Redmond>T.Jones, T.Jones>Reader.
- **TIEBREAK_07–51 (league-ceiling flags):** McNeill over all 45 flagged DTs; NARROW calls: Chris Jones, DeForest Buckner, Osa Odighizuwa, Maliek Collins, Nnamdi Madubuike, Calais Campbell.

## Variance audit (approved)
18 gaps of 10+ (all below Madden); 16 supported, 2 fixed through `reaudit:revise` with overalls unchanged: Derrick Brown AWR 82→86, Alim McNeill AWR 80→84. OVR gap of 10+: Derrick Brown −15 (Madden 96 vs PFF 72.9 / 76.5 and 15 + 5 pressures).

## Scarcity: PASS
31 traits at 90+, none at 95+, so no LEAGUE_DEFINING tag is needed. Overall 90+: Simmons 93 alone, with a 5-point gap to Heyward at 88.

## League ceiling check
249 DTs outside the pool were screened against refs McNeill (79) and Redmond (78). The bar is low: McNeill's ACL-hit 2025 (PFF 52.2, 10 games) and Redmond's 4 pressures in 2026 set the minimums, so 45 players raw-flagged. All were resolved by approved tiebreaks won by McNeill on 2026 form (PFF 79.0, ESPN PRWR 27% #1 DT). Byron Young is excluded from the screen as a name collision with the LA edge (merged PFR/nflverse lines). Efficiency = pressures per 100 nflverse defensive snaps (PFF DI pass-rush snap split not in the free table). No pool or rating change.

## Cross-audit: CONSISTENT
All 57 approved head-to-head/tiebreak verdicts agree with the order; 78 style pairs checked, none too similar.

Locked #10 Alim McNeill (79) is the ceiling for every other DT.
