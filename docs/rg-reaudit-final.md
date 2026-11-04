# RG re-audit — final (pre-lock; standing approval t46u)

Status: cross-audit approved; `reaudit:lock -- RG --dry-run` clean (would write `data/baselines/RG.reaudit-20261104.json`, RG_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each RG_REAUDIT_RATE_* record (`madden_reference.delta_attributes`).

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Chris Lindstrom (ATL) | 92 | 94 | -2 |
| 2 | Quinn Meinerz (DEN) | 89 | 96 | -7 |
| 3 | Jonah Jackson (CHI) | 84 | 84 | 0 |
| 4 | Tyler Booker (DAL) | 83 | 85 | -2 |
| 5 | Dalton Risner (CIN) | 81 | 76 | +5 |
| 6 | Joe Tippmann (NYJ) | 80 | 83 | -3 |
| 7 | Sam Cosmi (WAS) | 79 | 88 | -9 |
| 8 | Trey Smith (KC) | 78 | 93 | -15 |
| 9 | Mason McCormick (PIT) | 77 | 81 | -4 |
| 10 | Dominick Puni (SF) | 76 | 82 | -6 |
| 11 | Mike Onwenu (NE, first-out, IR) | 75 | 86 | -11 |
| 12 | Kevin Dotson (LA, first-out) | 74 | 90 | -16 |
| 13 | Ed Ingram (HOU, first-out) | 73 | 77 | -4 |

## Candidate audit (approved)
Screened every right guard (all 138/123 PFF guard grades 2025/2026, nflverse RG depth-chart starters, IR/inactive/FA). Olaivavega Ioane added to the screen per commissioner instruction: one partial rookie season (403 snaps, PFF 67.9), knee injury, now inactive — not a contender. 7 pool members are LG-side and 1 C-side (excluded).

## Head-to-heads and tiebreaks (all approved, order held in every one)
H2H_01–06: Lindstrom>Meinerz (MODERATE), Jackson>Booker, Risner>Tippmann, Cosmi>Smith, McCormick>Puni, Puni>Onwenu (cut line). TIEBREAK_01–06: Meinerz>Jackson, Booker>Risner, Tippmann>Cosmi, Smith>McCormick, Onwenu>Dotson, Dotson>Ingram. TIEBREAK_07–08 (ceiling precautions): Puni>Teven Jenkins, Puni>Ezra Cleveland.

## Variance audit (RG_REAUDIT_VARIANCE_AUDIT, approved)
18 gaps of 10+ (16 below Madden, 2 above): 16 supported; 2 fixed via `reaudit:revise` (approved): Meinerz RBF 82→88, Trey Smith AWR 78→82 (overalls unchanged). OVR gaps of 10+: Smith −15, Onwenu −11 (IR), Dotson −16 — all supported by 2025-26 PFF grades/penalties.

## Scarcity: PASS — 42 traits 90+, 5 at 95+ (Lindstrom RBK 95 / RBF 96; Meinerz STR 96 / STA 95 / RBP 95; all LEAGUE_DEFINING); overall 90+: Lindstrom 92 only.

## League ceiling check
50 outside right guards screened (incl. reserve/IR, inactive, no-2026-roster, Ioane). Refs Puni/Onwenu; 0 flagged. Precautionary tiebreaks vs #10: Teven Jenkins (PFF 77.8 on 323 snaps, IR) and Ezra Cleveland (PFF 70.1) — both lost to Puni.

## Cross-audit: CONSISTENT — 14 verdicts agree with order; 78 style pairs, 0 too similar (max corr 0.944 Meinerz–Booker).

Locked #10 Dominick Puni (76) is the ceiling for every other right guard.
