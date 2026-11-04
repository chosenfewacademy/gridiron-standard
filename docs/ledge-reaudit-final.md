# LEDGE re-audit — final (pre-lock; approvals t46u, t54s495)

Status: cross-audit approved; `reaudit:lock -- LEDGE --dry-run` clean (would write `data/baselines/LEDGE.reaudit-20261104.json`, LEDGE_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each LEDGE_REAUDIT_RATE_* record (`madden_reference.delta_attributes`).

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Aidan Hutchinson (DET; Madden card LEDG) | 94 | 94 | +0 |
| 2 | Will Anderson Jr. (HOU; Madden card LEDG) | 93 | 95 | -2 |
| 3 | Greg Rousseau (BUF; Madden card LEDG) | 87 | 90 | -3 |
| 4 | Maxx Crosby (LV; Madden card LEDG) | 86 | 97 | -11 |
| 5 | T.J. Watt (PIT; Madden card LEDG) | 84 | 96 | -12 |
| 6 | DeMarcus Lawrence (SEA; Madden card LEDG) | 82 | 87 | -5 |
| 7 | Byron Young (LA; Madden card LEDG) | 81 | 85 | -4 |
| 8 | George Karlaftis (KC; Madden card LEDG) | 80 | 83 | -3 |
| 9 | Boye Mafe (CIN; Madden card REDG) | 79 | 80 | -1 |
| 10 | Brian Burns (NYG, RES; Madden card REDG) | 78 | 89 | -11 |
| 11 | Tuli Tuipulotu (LAC, first-out; Madden card LEDG) | 77 | 79 | -2 |
| 12 | Cameron Thomas (ATL, first-out; Madden card REDG) | 75 | 74 | +1 |
| 13 | Gabe Jacas (NE, first-out; Madden card LEDG) | 74 | 77 | -3 |

## Side convention (same as REDGE)
EDGE SIDE CONVENTION (t46u): every edge is assigned to exactly one of LEDGE/REDGE by his majority 2025-26 alignment. LEDGE = defense's left edge (aligned over the offense's right tackle); REDGE = defense's right edge (over the offense's left tackle), matching the repo note 'Right-side edge (offense's left)'. Side evidence = nflverse weekly depth charts 2025 + 2026 (ESPN-sourced): each team-day snapshot counts once; LDE (4-3 or 3-4) or 3-4 WLB (ESPN 3-4 layout slot 4, left of LILB) = left; RDE or 3-4 SLB (slot 7, right of RILB) = right; 4-3 WLB/SLB are off-ball LBs and not counted. The side with more snapshots across both seasons wins; a player appears in only one list. PFF alignment splits (left/right snap counts) are paywalled and NGS publishes no side split, so depth charts are the side source; Madden 27's LEDG/REDG card label is reference only and does not decide side.

LEDGE = edge on the defense's left (usually over the offense's right tackle). Every player assigned to REDGE (locked REDGE_REAUDIT_LOCK_20261104) is excluded, so no player appears in both lists. Closest side call: Gabe Jacas (left 127 / right 112 snapshots). Madden LEDG/REDG labels are reference only (Mafe, Burns and Cameron Thomas carry REDG cards but lined up mostly on the left).

## Evidence
PFF edge overall grades 2025 and 2026 (through Week 8) with pass-rush / run-defense / coverage snap counts; ESPN pass-rush win rate and run-stop win rate (published leaderboards only); PFR pressures, hurries, QB knockdowns, sacks, tackles and missed tackles; nflverse snaps, sacks, QB hits, TFL, accepted penalties, injury reports and roster status. Paywalled: PFF pass-rush and run-defense sub-grades and side splits.

## Head-to-heads and tiebreaks (all approved; order held in every one)
- **H2H_01–06:** Hutchinson>Anderson, Rousseau>Crosby, Watt>Lawrence, B.Young>Karlaftis, Mafe>Burns, Burns>Tuipulotu (cut line).
- **TIEBREAK_01–04:** Anderson>Rousseau (CLEAR), Crosby>Watt, Lawrence>B.Young, Karlaftis>Mafe.
- **TIEBREAK_05–08 (league-ceiling flags):** Burns over Josh Sweat (NARROW), Montez Sweat, Odafe Oweh, Cameron Jordan.
- Correction: TIEBREAK_02's reasoning says Crosby had "54 pressures" in 2025; PFR shows 29 in 2025 (54 is the 2025+2026 total). The verdict is unaffected (Crosby still leads Watt on grade and workload); the immutable record is left as written.

## Variance audit (approved)
33 gaps of 10+ (29 below Madden, 4 above); 31 supported, 2 fixed through `reaudit:revise` with overalls unchanged: Anderson FMV 84→88, Byron Young PRC 78→82. OVR gaps of 10+: Crosby −11, Watt −12, Burns −11 (reserve).

## Scarcity: PASS
32 traits at 90+, 4 at 95+, all LEAGUE_DEFINING: Hutchinson STA 96 (1,005 snaps in 2025); Crosby PUR 96 (28 TFL in 2025), STA 96 and TGH 96 (935 + 473 snaps). No 97+. Overalls 90+: Hutchinson 94, Anderson 93.

## League ceiling check
109 left-side edges outside the pool were screened against refs Burns (78) and Tuipulotu (77). 4 raw flags (Josh Sweat, Montez Sweat, Oweh, Jordan), all resolved by approved tiebreaks won by Burns. No pool or rating change.

## Cross-audit: CONSISTENT
All 14 approved head-to-head/tiebreak verdicts agree with the order; 78 style pairs checked, none too similar.

Locked #10 Brian Burns (78) is the ceiling for every other left edge.
