# RT re-audit — final (pre-lock; standing approval t46u)

Status: cross-audit approved; `reaudit:lock -- RT --dry-run` clean (would write `data/baselines/RT.reaudit-20261104.json`, RT_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each RT_REAUDIT_RATE_* record (`madden_reference.delta_attributes`).

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Darnell Wright (CHI) | 89 | 91 | -2 |
| 2 | Colton McKivitz (SF) | 87 | 84 | +3 |
| 3 | Brian O'Neill (MIN) | 83 | 88 | -5 |
| 4 | Abraham Lucas (SEA) | 82 | 83 | -1 |
| 5 | Joe Alt (LAC) | 81 | 86 | -5 |
| 6 | Warren McClendon Jr. (LA) | 80 | 73 | +7 |
| 7 | Luke Goedeke (TB) | 79 | 84 | -5 |
| 8 | Armand Membou (NYJ) | 78 | 83 | -5 |
| 9 | Spencer Brown (BUF) | 77 | 85 | -8 |
| 10 | Jermaine Eluemunor (NYG) | 76 | 83 | -7 |
| 11 | Zach Bako-Bewele (GB, formerly Zach Tom; IR; first-out) | 75 | 87 | -12 |
| 12 | Taylor Moton (CAR, IR; first-out) | 74 | 84 | -10 |
| 13 | Mike McGlinchey (DEN, first-out) | 73 | 82 | -9 |

## Pool and candidate audit (approved)
Re-audit pool = approved RT.json plus 4 full-time RT starters found by the league-wide screen (Membou, Spencer Brown, Eluemunor; McGlinchey moved from BELOW_CUTOFF). Screened all 134/107 PFF tackle grades 2025/2026 and every RT depth-chart starter (58 RT-side players), including IR, inactive and free agents. Penei Sewell is excluded because he is in the locked LT baseline (LT in 2026). Lane Johnson is excluded: inactive, age 36, 630 snaps in two seasons, no Madden 27 card. 8 pool members are LT-side.

## Head-to-heads and tiebreaks (all approved, order held in every one)
H2H_01–06: Wright>McKivitz (MODERATE), O'Neill>Lucas, Alt>McClendon, Goedeke>Membou, Brown>Eluemunor, Eluemunor>Bako-Bewele (cut line). TIEBREAK_01–06: McKivitz>O'Neill (MODERATE), Lucas>Alt, McClendon>Goedeke, Membou>Brown, Bako-Bewele>Moton, Moton>McGlinchey. TIEBREAK_07–15 (league-ceiling flags): Eluemunor beat Mims, Moses, Lane Johnson, Fautanu, Van Lanen, Rosengarten, Cook, Travis and Harrison.

## Variance audit (RT_REAUDIT_VARIANCE_AUDIT, approved)
25 gaps of 10+ (21 below Madden, 4 above): 22 supported; 3 fixed via `reaudit:revise` (approved): McClendon STR 78→82, Bako-Bewele PBF 80→86, Moton STA 82→88 (overalls unchanged). OVR gaps of 10+: Bako-Bewele −12, Moton −10 (both on reserve/IR).

## Scarcity: PASS — 31 traits 90+, 1 at 95+ (McKivitz STA 95, LEAGUE_DEFINING); no overall 90+.
Erratum: the RT_REAUDIT_SCARCITY_A1 record's narrative fields (league_defining_basis, overall_spread, note) were carried over from the RG script and name RG players. Its counts, tiers and PASS result are correct. The corrected text is in RT_REAUDIT_CROSS_AUDIT_A1 `scarcity_note`.

## League ceiling check
38 outside right tackles screened. Refs Eluemunor/Bako-Bewele; 9 raw flags (loose thresholds), all tested vs #10 and all lost. 0 flags after resolution.

## Cross-audit: CONSISTENT — 21 verdicts agree with order; 78 style pairs, 0 too similar.

Locked #10 Jermaine Eluemunor (76) is the ceiling for every other right tackle.
