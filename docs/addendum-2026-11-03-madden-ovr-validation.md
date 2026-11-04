# Addendum 2026-11-03 (ET) — Madden 27 OVR validation scope (user t53u / t54u)

Status: ENACTED for validation only. Authorized by the user's request t53u ("validate all ratings when put into Madden 27 actually produce the given result without forcing the overall but maintaining distribution ... deep research on what weighs heavily for each position group and how ratings are calculated") and t54u (in-game validation log + one-sheets).

## Scope (what this changes and what it does not)
- The rule "never rebuild Madden formulas" (process doc A.3, AGENTS.md A3) still governs **rating**. Ratings stay per-attribute judgment from evidence. This addendum adds a narrow exception: estimated Madden OVR weights may be stored and used **only** to pre-check whether an approved build would reproduce our stated overall in Madden 27.
- The estimate is never an input to a rating, gate, validator, head-to-head or lock. It never changes a rating. Fixes are proposals for the normal add-only revision path (`reaudit:revise`) and need the commissioner.
- No v1.0 text, amendment, locked baseline, state file or audit record is edited. `madden_order_verified=false` stays (config/madden-entry-order.json untouched).
- Ground truth is the in-game result logged in `data/ingame-validation/<POS>.json`. The estimated weights are recalibrated from those logs later.

## How Madden computes OVR (best public understanding, ESTIMATED)
1. OVR is position- and archetype-specific. Each archetype has a weight table summing to 100 over a handful of attributes; all other attributes count 0 [MRE][NATE18][POLY15].
2. Weighted average → linear rescale: `ovr = clamp(12, 99, round((wavg − DesiredLow) × 99 / (DesiredHigh − DesiredLow)))`. Low/high anchors are per archetype (e.g. QB 46/96) [MRE src/mrepAPI.py]. Each attribute point in a 20%-weight attribute is worth ≈0.4 OVR for a QB.
3. The displayed OVR behaves like the **best** archetype OVR. Backtest on the repo's Madden 27 references (17 QBs, 14 RBs): 25/31 exact, 31/31 within ±1 [REPO_M27].
4. Older regression studies (Madden 17–25) agree on direction: AWR and the core position skill dominate, SPD matters less than players assume, kickers/punters are AWR+KPW+KAC only [OLSON17][REDDIT18][MS25QB][MS25K].
5. Madden 25+ split blocking (PBP/PBF, RBP/RBF, LBK) and route running (SRR/MRR/DRR). Our TE cards carry only PBK/RBK and WR/TE carry no LBK; the tool substitutes PBK→PBP/PBF, RBK→RBP/RBF/LBK and flags it. TE_Blocking estimates are therefore least reliable.
6. LS: no published OVR archetype — unknown. Defensive/ST tables are not yet backtested against Madden 27 data (confidence LOW-MEDIUM).

## Sources
- [MRE] kn1meR/MaddenRosterEditor, `config/archetype_breakdown.xlsx` (Weights sheet) and `src/mrepAPI.py` OVR calculator (commit 2025-09-29) — https://github.com/kn1meR/MaddenRosterEditor
- [OLSON17] Randal Olson, "Machine Learning Madden NFL: How Madden player ratings are actually calculated" (Madden 17) — https://www.randalolson.com/2017/01/10/machine-learning-madden-nfl-how-madden-player-ratings-are-actually-calculated/
- [REDDIT18] r/MaddenUltimateTeam, "Statistical Analysis To Find What Attributes Contribute To The Overall" — https://www.reddit.com/r/MaddenUltimateTeam/comments/6xaod1/statistical_analysis_to_find_what_attributes/
- [NATE18] r/Madden, "Guide: Overall Rating Attribute Weightings for Different Positions/Archetypes" (Madden 19 XML) — https://www.reddit.com/r/Madden/comments/9e6qlb/guide_overall_rating_attribute_weightings_for/
- [MS25QB] Madden School, "The True Ratings Of Every Quarterback In Madden 25" — https://www.madden-school.com/true-quarterback-ratings-madden-25/
- [MS25K] Madden School, "How A Kicker's Overall Rating in Madden 25 Is Determined" — https://www.madden-school.com/how-a-kickers-overall-ratings-in-madden-25-is-determined/
- [POLY15] Polygon, "The secret to Madden's player ratings, revealed at last" (Donny Moore chart) — https://www.polygon.com/2015/2/24/8103603/madden-ratings-how-to-perfect-qb/
- [REPO_M27] references/madden/QB_madden27_reference.json, RB_madden27_reference.json (EA ratings site, reference only) — https://www.ea.com/games/madden-nfl/ratings
- EA has not published Madden 27 OVR weights; none of the above is EA-verified for Madden 27.

## Per-position attribute weights (ESTIMATED, NOT VERIFIED; source [MRE])
Machine-readable: config/madden-ovr-weights.estimated.json.

### QB — confidence: MEDIUM-HIGH (backtested on M27 refs), status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| QB_FieldGeneral | THP 25, MAC 18, SAC 18, AWR 16, DAC 12, TUP 5, PAC 3, RUN 3 | 46/96 |
| QB_Improviser | THP 17, AWR 15, DAC 15, TUP 15, RUN 12, BSK 8, SAC 8, MAC 4, COD 3, SPD 2, ACC 1 | 46/95 |
| QB_Scrambler | THP 22, SAC 14, MAC 13, BSK 10, RUN 10, AWR 7, TUP 7, SPD 6, ACC 3, BCV 3, COD 3, CAR 2 | 46/96 |
| QB_StrongArm | THP 33, MAC 22, DAC 18, AWR 12, TUP 10, BSK 3, PAC 2 | 46/96 |

### RB/HB — confidence: MEDIUM-HIGH (backtested on M27 refs), status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| HB_ElusiveBack | COD 20, ACC 13, SPD 13, AWR 11, CAR 11, BCV 10, JKM 9, SPM 8, BTK 5 | 54/94 |
| HB_PowerBack | CAR 13, TRK 13, BTK 12, AWR 11, SFA 10, STR 10, ACC 9, BCV 9, SPD 9, COD 4 | 52/94 |
| HB_ReceivingBack | COD 14, CTH 13, ACC 11, AWR 11, SPD 11, SRR 10, CIT 8, CAR 6, BCV 5, JKM 5, SPM 5, RLS 1 | 53/90 |

### FB — confidence: LOW-MEDIUM, status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| FB_Blocking | LBK 18, AWR 10, RBK 10, STR 9, IBL 7, TRK 7, BTK 6, CAR 5, RBP 5, SRR 5, PBK 4, RBF 3, ACC 2, CIT 2, COD 2, CTH 2, PBF 1, PBP 1, SPD 1 | 33/84 |
| FB_Utility | IBL 11, AWR 10, SRR 9, COD 8, CTH 8, CAR 7, BCV 6, STR 6, ACC 5, LBK 5, SPD 5, TRK 5, BTK 4, SFA 4, RBK 3, CIT 2, PBK 2 | 33/85 |

### WR — confidence: MEDIUM, status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| WR_DeepThreat | DRR 15, ACC 12, CTH 12, SPD 12, COD 10, AWR 9, RLS 9, CIT 8, MRR 6, SPC 4, JKM 1, JMP 1, SPM 1 | 41/96 |
| WR_Physical | CIT 16, SPC 15, RLS 12, CTH 10, JMP 9, SRR 7, ACC 6, AWR 5, SPD 4, STR 4, BTK 3, COD 3, MRR 3, SFA 2, TRK 1 | 41/96 |
| WR_RouteRunner | MRR 22, SRR 14, COD 12, AWR 11, CTH 9, DRR 8, ACC 7, SPD 6, CIT 4, RLS 4, SPC 2, STR 1 | 41/96 |
| WR_Slot | SRR 16, CIT 14, CTH 13, ACC 12, AWR 10, SPD 10, COD 9, MRR 9, DRR 3, BTK 1, CAR 1, JKM 1, SPM 1 | 40/97 |

### TE — confidence: MEDIUM, status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| TE_Blocking | RBK 10, AWR 9, IBL 9, RBF 9, RBP 9, LBK 8, PBK 8, PBF 6, PBP 6, STR 6, SRR 5, MRR 4, CIT 3, CTH 3, BTK 2, SFA 2, TRK 1 | 37/80 |
| TE_Possession | CIT 14, SRR 12, CTH 10, AWR 9, MRR 6, RBK 5, ACC 4, COD 4, IBL 4, RBF 4, RBP 4, PBK 3, SPD 3, STR 3, BTK 2, LBK 2, PBF 2, PBP 2, RLS 2, SFA 2, BCV 1, SPC 1, TRK 1 | 37/84 |
| TE_VerticalThreat | CTH 11, AWR 9, MRR 9, CIT 8, ACC 7, SPD 7, SRR 7, COD 6, DRR 5, SPC 4, BTK 3, JMP 3, RBF 3, RBK 3, RBP 3, RLS 3, BCV 2, PBK 2, SFA 2, PBF 1, PBP 1, TRK 1 | 38/86 |

### LT/RT — confidence: MEDIUM, status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| OT_Agile | PBF 25, RBF 24, STR 14, AWR 10, RBK 8, PBK 6, AGI 3, IBL 3, SPD 3, ACC 2, LBK 2 | 29/96 |
| OT_PassProtector | PBF 32, PBP 32, AWR 14, PBK 10, STR 4, ACC 2, AGI 2, IBL 2, SPD 2 | 31/96 |
| OT_Power | RBP 25, PBP 24, STR 15, AWR 10, RBK 10, IBL 4, PBK 4, ACC 2, AGI 2, LBK 2, SPD 2 | 29/96 |

### LG/RG — confidence: MEDIUM, status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| G_Agile | PBF 23, RBF 20, STR 14, AWR 10, LBK 8, RBK 8, IBL 6, PBK 4, AGI 3, ACC 2, SPD 2 | 31/95 |
| G_PassProtector | PBF 30, PBP 30, AWR 15, PBK 10, IBL 5, STR 4, ACC 2, AGI 2, SPD 2 | 31/95 |
| G_Power | PBP 22, RBP 19, STR 15, AWR 11, RBK 10, LBK 8, IBL 7, ACC 2, AGI 2, PBK 2, SPD 2 | 31/95 |

### C — confidence: MEDIUM, status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| C_Agile | RBF 21, PBF 20, AWR 15, STR 13, RBK 8, LBK 6, IBL 5, PBK 4, AGI 3, SPD 3, ACC 2 | 33/95 |
| C_PassProtector | PBF 29, PBP 29, AWR 21, PBK 10, IBL 4, STR 3, ACC 2, AGI 2 | 33/95 |
| C_Power | RBP 21, PBP 20, AWR 15, STR 14, RBK 10, IBL 6, LBK 6, ACC 2, AGI 2, PBK 2, SPD 2 | 33/95 |

### LEDGE/REDGE (with OLB rusher archetypes) — confidence: LOW-MEDIUM, status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| DE_PowerRusher | PMV 23, STR 15, TAK 15, AWR 12, ACC 10, PUR 7, SPD 7, AGI 6, POW 2, PRC 2, FMV 1 | 35/94 |
| DE_RunStopper | BSH 18, TAK 18, PRC 12, STR 12, PUR 9, ACC 8, AWR 6, AGI 5, SPD 5, POW 3, FMV 2, PMV 2 | 35/94 |
| DE_SmallerSpeedRusher | FMV 23, TAK 15, ACC 14, AWR 12, SPD 10, AGI 9, PUR 7, STR 5, POW 2, PRC 2, PMV 1 | 35/94 |

### DT — confidence: LOW-MEDIUM, status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| DT_PowerRusher | PMV 22, STR 19, TAK 13, AWR 12, ACC 6, BSH 6, PRC 6, PUR 5, SPD 5, POW 3, AGI 2, FMV 1 | 36/94 |
| DT_RunStopper | BSH 22, STR 21, TAK 17, PRC 12, PUR 8, ACC 6, AWR 4, SPD 4, AGI 3, POW 3 | 36/94 |
| DT_SpeedRusher | FMV 22, STR 17, AWR 13, TAK 13, ACC 8, PUR 7, SPD 6, AGI 4, BSH 4, PRC 3, POW 2, PMV 1 | 36/94 |

### WILL/SAM (rusher archetypes also feed EDGE) — confidence: LOW-MEDIUM, status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| OLB_PassCoverage | ZCV 17, AWR 15, TAK 14, ACC 11, PUR 11, SPD 9, MCV 7, PRC 7, COD 4, AGI 3, STR 2 | 38/92 |
| OLB_PowerRusher | PMV 25, TAK 15, AWR 12, PUR 12, ACC 10, STR 8, SPD 5, ZCV 4, PRC 3, AGI 2, POW 2, FMV 1, MCV 1 | 36/92 |
| OLB_RunStopper | BSH 16, PUR 16, TAK 16, STR 10, ACC 9, PRC 9, SPD 6, ZCV 5, AWR 4, POW 3, AGI 2, COD 2, MCV 2 | 38/92 |
| OLB_SpeedRusher | FMV 25, ACC 14, AWR 11, PUR 10, TAK 10, SPD 9, AGI 6, STR 6, ZCV 4, PRC 2, COD 1, MCV 1, PMV 1 | 36/92 |

### MIKE — confidence: LOW-MEDIUM, status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| MLB_FieldGeneral | TAK 18, PUR 14, ZCV 10, ACC 9, AWR 9, PRC 9, STR 8, BSH 7, SPD 5, AGI 4, MCV 4, COD 3 | 40/91 |
| MLB_PassCoverage | ZCV 19, TAK 15, PUR 12, ACC 10, AWR 10, MCV 9, SPD 7, AGI 6, COD 4, PRC 4, STR 4 | 40/91 |
| MLB_RunStopper | TAK 20, PUR 15, PRC 12, STR 11, BSH 10, ACC 8, AWR 5, ZCV 5, AGI 4, SPD 4, COD 2, MCV 2, POW 2 | 40/92 |

### CB — confidence: LOW-MEDIUM, status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| CB_MantoMan | MCV 22, SPD 20, ACC 18, AWR 11, PRS 7, COD 5, PRC 5, AGI 3, TAK 3, CTH 2, JMP 2, ZCV 2 | 40/95 |
| CB_Slot | ACC 14, MCV 14, SPD 12, TAK 12, PRC 9, AWR 8, COD 8, AGI 5, ZCV 5, PUR 4, PRS 3, BSH 2, CTH 2, JMP 2 | 39/92 |
| CB_Zone | ACC 20, ZCV 20, SPD 18, AWR 11, PRC 7, TAK 5, COD 4, MCV 4, PRS 4, AGI 3, CTH 2, JMP 2 | 40/95 |

### FS/SS — confidence: LOW-MEDIUM, status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| S_Hybrid | AWR 14, MCV 14, SPD 14, ACC 11, TAK 11, AGI 7, ZCV 7, PRC 6, COD 4, PUR 4, JMP 3, PRS 3, STR 2 | 38/92 |
| S_RunSupport | PRC 16, TAK 15, PUR 9, SPD 9, ACC 8, AWR 8, ZCV 8, AGI 6, MCV 5, POW 5, COD 3, JMP 3, BSH 2, STR 2, PRS 1 | 37/91 |
| S_Zone | ZCV 22, AWR 20, SPD 14, ACC 10, TAK 9, PUR 7, AGI 6, COD 4, JMP 3, PRC 3, STR 2 | 37/93 |

### K/P — confidence: MEDIUM, status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| KP_Accurate | KAC 49, AWR 35, KPW 16 | 12/99 |
| KP_Power | AWR 41, KPW 38, KAC 21 | 12/99 |

### SP — confidence: LOW-MEDIUM, status ESTIMATED_NOT_VERIFIED

| Archetype | Weights (% of OVR) | Low/High anchors |
|---|---|---|
| KR_Balanced | RET 80, SPD 12, COD 8 | 12/99 |
| PR_Balanced | RET 75, ACC 12, SPD 8, CTH 5 | 12/99 |

## Tools
- `npm run madden:ovr-check [-- --write]` (src/madden-ovr-check.ts): estimates in-game OVR for every locked top-10 (QB, RB, WR, TE, LT) and the PHI QB/RB rooms, flags OK (±1) / MINOR_GAP (±2–3) / MAJOR_GAP (≥4), and proposes a style-preserving fix (a uniform shift on the best archetype's weighted attributes, which keeps the mean-centred shape; or a weight-ordered ±1 round-robin when rounding skips the target). Output: docs/validation/madden-ovr-precheck-<date>.md/.json.
- `npm run ingame:scaffold` (src/ingame-validation.ts): creates the add-only logs data/ingame-validation/<POS>.json (only if missing) and one-sheets docs/ingame-onesheets/<POS>.md. Entry template: data/ingame-validation/TEMPLATE.json.
