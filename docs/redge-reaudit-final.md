# REDGE re-audit — final (pre-lock; standing approval t46u)

Status: cross-audit approved; `reaudit:lock -- REDGE --dry-run` clean (would write `data/baselines/REDGE.reaudit-20261104.json`, REDGE_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each REDGE_REAUDIT_RATE_* record (`madden_reference.delta_attributes`).

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Myles Garrett (LA, RES; Madden card REDG) | 95 | 99 | -4 |
| 2 | Micah Parsons (GB, RES; Madden card REDG) | 91 | 98 | -7 |
| 3 | Danielle Hunter (HOU; Madden card REDG) | 87 | 92 | -5 |
| 4 | Abdul Carter (NYG; Madden card LEDG) | 86 | 84 | +2 |
| 5 | Josh Hines-Allen (JAX; Madden card REDG) | 85 | 89 | -4 |
| 6 | Nik Bonitto (DEN; Madden card REDG) | 84 | 91 | -7 |
| 7 | Chase Young (NO; Madden card LEDG) | 82 | 88 | -6 |
| 8 | Alex Highsmith (PIT; Madden card REDG) | 80 | 87 | -7 |
| 9 | Nick Herbig (PIT; Madden card REDG) | 79 | 78 | +1 |
| 10 | Laiatu Latu (IND; Madden card LEDG) | 78 | 80 | -2 |
| 11 | Al-Quadin Muhammad (TB, first-out; Madden card LEDG) | 76 | 76 | +0 |
| 12 | Khalil Mack (LAC, first-out; Madden card REDG) | 75 | 86 | -11 |
| 13 | Trey Hendrickson (BAL, first-out; Madden card REDG) | 74 | 88 | -14 |

## Side convention (LEDGE vs REDGE)
EDGE SIDE CONVENTION (t46u): every edge is assigned to exactly one of LEDGE/REDGE by his majority 2025-26 alignment. LEDGE = defense's left edge (aligned over the offense's right tackle); REDGE = defense's right edge (over the offense's left tackle), matching the repo note 'Right-side edge (offense's left)'. Side evidence = nflverse weekly depth charts 2025 + 2026 (ESPN-sourced): each team-day snapshot counts once; LDE (4-3 or 3-4) or 3-4 WLB (ESPN 3-4 layout slot 4, left of LILB) = left; RDE or 3-4 SLB (slot 7, right of RILB) = right; 4-3 WLB/SLB are off-ball LBs and not counted. The side with more snapshots across both seasons wins; a player appears in only one list. PFF alignment splits (left/right snap counts) are paywalled and NGS publishes no side split, so depth charts are the side source; Madden 27's LEDG/REDG card label is reference only and does not decide side.

REDGE = edge on the defense's right (usually over the offense's left tackle); LEDGE = defense's left. Each player is assigned to exactly one list by his majority 2025–26 depth-chart side; PFF and NGS left/right alignment splits are paywalled or unpublished, so nflverse weekly depth charts are the side source. The Madden LEDG/REDG label is reference only (Carter, Chase Young, Latu and Muhammad carry LEDG cards but lined up mostly on the right).

## Evidence
PFF edge overall grades 2025 and 2026 (through Week 8) with pass-rush / run-defense / coverage snap counts; ESPN pass-rush win rate and run-stop win rate (published leaderboards only); PFR pressures, hurries, QB knockdowns, sacks, tackles and missed tackles; nflverse snaps, sacks, QB hits, TFL, accepted penalties, injury reports and roster status. Paywalled: PFF pass-rush and run-defense sub-grades and side splits.

## Head-to-heads and tiebreaks (all approved; order held in every one)
- **H2H_01–06:** Garrett>Parsons (CLEAR), Hunter>Carter, Hines-Allen>Bonitto, C.Young>Highsmith (CLEAR), Herbig>Latu, Latu>Muhammad (cut line).
- **TIEBREAK_01–04:** Parsons>Hunter, Carter>Hines-Allen, Bonitto>C.Young, Highsmith>Herbig.
- **TIEBREAK_05–11 (league-ceiling flags):** Latu over Dallas Turner (NARROW), Jaelan Phillips, Donovan Ezeiruaku, Jalyx Hunt, Arden Key, Jacob Martin and Bradley Chubb.

## Variance audit (approved)
49 gaps of 10+ (47 below Madden, 2 above); 47 supported, 2 fixed through `reaudit:revise` with overalls unchanged: Parsons STR 74→78, Chase Young TAK 76→80. OVR gaps of 10+: Mack −11 and Hendrickson −14 (first-outs; age/availability).

## Scarcity: PASS
19 traits at 90+, 1 at 95+: Garrett FMV 96 (LEAGUE_DEFINING; 23.0 sacks, 53 pressures, PFF 92.7 in 2025). No 97+. Overalls 90+: Garrett 95, Parsons 91 (Parsons on reserve in 2026; carried in INJ).

## League ceiling check
102 right-side edges outside the pool were screened against refs Latu (78) and Muhammad (76). 7 raw flags on pressure-volume/availability metrics, none at the 76.5 PFF threshold; all resolved by approved tiebreaks (Latu wins all; Turner closest). No pool or rating change.

## Cross-audit: CONSISTENT
All 17 approved head-to-head/tiebreak verdicts agree with the order (see `research-inbox/REDGE/REDGE_REAUDIT_CROSS_AUDIT/pair-consistency-addendum-t46u.json`; the A1 record's pair scan used a broken path and listed 0, corrected add-only). 78 style pairs checked, none too similar.

Locked #10 Laiatu Latu (78) is the ceiling for every other right edge.
