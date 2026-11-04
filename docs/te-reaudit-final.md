# TE re-audit — final (t45s389, Nov 3 2026)

Madden is reference only, never evidence. madden_order_verified=false.

## Final order (ours / Madden / Δ)

| # | Player | Ours | Madden | Δ | Audit |
|---|---|---|---|---|---|
| 1 | Brock Bowers | 93 | 95 | -2 | TE_REAUDIT_RATE_01_A1 |
| 2 | George Kittle | 90 | 97 | -7 | TE_REAUDIT_RATE_02_A1 |
| 3 | Dalton Kincaid | 88 | 83 | +5 | TE_REAUDIT_RATE_04_A3 |
| 4 | Trey McBride | 87 | 99 | -12 | TE_REAUDIT_RATE_03_A3 |
| 5 | Sam LaPorta | 85 | 90 | -5 | TE_REAUDIT_RATE_05_A1 |
| 6 | T.J. Hockenson | 84 | 83 | +1 | TE_REAUDIT_RATE_06_A1 |
| 7 | Darnell Washington | 82 | 77 | +5 | TE_REAUDIT_RATE_07_A1 |
| 8 | Travis Kelce | 81 | 93 | -12 | TE_REAUDIT_RATE_08_A2 |
| 9 | Hunter Henry | 80 | 86 | -6 | TE_REAUDIT_RATE_09_A1 |
| 10 | Tucker Kraft | 79 | 85 | -6 | TE_REAUDIT_RATE_11_A2 |
| 11 | Brenton Strange | 78 | 79 | -1 | TE_REAUDIT_RATE_16_A2 |
| 12 | Isaiah Likely | 78 | 82 | -4 | TE_REAUDIT_RATE_10_A2 |
| 13 | Dallas Goedert | 77 | 89 | -12 | TE_REAUDIT_RATE_14_A2 |
| 14 | Colston Loveland | 76 | 82 | -6 | TE_REAUDIT_RATE_12_A2 |
| 15 | Michael Mayer | 75 | 80 | -5 | TE_REAUDIT_RATE_13_A2 |
| 16 | Kyle Pitts | 74 | 81 | -7 | TE_REAUDIT_RATE_15_A2 |

Top 10 = ranks 1-10 (Kraft #10). Strange and Likely tie at 78; Strange first-out per TE_REAUDIT_TIEBREAK_42.

## Variance audit (TE_REAUDIT_VARIANCE_AUDIT, approved)

69 gaps of 10+: 63 SUPPORTED, 6 ADJUST. ADJUST fixes are DRAFTED and NOT approved or applied:

- Sam LaPorta DRR: {"attr": "DRR", "from_": 80, "to": 74, "status": "DRAFTED_NOT_APPROVED", "reason": "Only 1 deep target in 2026 (0 caught, -0.30 EPA) and 2 in 2025; DRR 80 ranks 4th without deep evidence."} — deep (20+ air yd) 1 tgt, catch 0.0, EPA/tgt -0.30 (2026); 2025 EPA/tgt +3.66; Judgment: Only 1 deep target in 2026 (0 caught, -0.30 EPA) and 2 in 2025; DRR 80 ranks 4th without deep evidence.; group r
- Isaiah Likely COD: {"attr": "COD", "from_": 87, "to": 80, "status": "DRAFTED_NOT_APPROVED", "reason": "YAC/rec 2.9 (2026) / 4.3 (2025) is last in the group; COD 87 (1st) is not supported."} — YAC/rec 2.9 (2026) / 4.3 (2025), YAC over expected 0.16; Judgment: YAC/rec 2.9 (2026) / 4.3 (2025) is last in the group; COD 87 (1st) is not supported.; group rank on metric 14/15 vs our rating rank 1
- Dallas Goedert IBL: {"attr": "IBL", "from_": 82, "to": 75, "status": "DRAFTED_NOT_APPROVED", "reason": "Block share .39/.42 and 89 run-block snaps in 2026 rank 10th; IBL 82 (4th) overstates his blocking."} — block share 0.39 (2026) / 0.42 (2025), run-block snaps 89 (2026) / 337 (2025), 256 lb, PFF overall 74.9 (sub-grades paywalled); Judgment: Block share .39/.42 and 89 run-block snaps in 2026 rank 10th; 
- Colston Loveland COD: {"attr": "COD", "from_": 82, "to": 76, "status": "DRAFTED_NOT_APPROVED", "reason": "YAC/rec 4.1/4.3 and YAC over expected -0.03 rank 11th; COD 82 (6th) not supported."} — YAC/rec 4.1 (2026) / 4.3 (2025), YAC over expected -0.03; Judgment: YAC/rec 4.1/4.3 and YAC over expected -0.03 rank 11th; COD 82 (6th) not supported.; group rank on metric 11/15 vs our rating rank 6/
- Kyle Pitts DRR: {"attr": "DRR", "from_": 80, "to": 72, "status": "DRAFTED_NOT_APPROVED", "reason": "Deep EPA/tgt -1.27 (2026, 0/2) and -0.44 (2025, 2/8); DRR 80 (4th) not supported."} — deep (20+ air yd) 2 tgt, catch 0.0, EPA/tgt -1.27 (2026); 2025 EPA/tgt -0.44; Judgment: Deep EPA/tgt -1.27 (2026, 0/2) and -0.44 (2025, 2/8); DRR 80 (4th) not supported.; group rank on metric 14/15 vs
- Kyle Pitts INJ: {"attr": "INJ", "from_": 80, "to": 88, "status": "DRAFTED_NOT_APPROVED", "reason": "Played all 17 games in 2025 and all 8 in 2026 with no injury designation; INJ 80 understates availability."} — 8 g (2026) / 17 g (2025), PFF off snaps 2026 287, age 26, status ACT; Judgment: Played all 17 games in 2025 and all 8 in 2026 with no injury designation; INJ 80 understates availability.; group rank o

Strange (added after the variance audit; assessed in the cross-audit): 9 gaps, 6 SUPPORTED, 3 drafted ADJUST (not approved):

- Brenton Strange COD: {"COD": 76} — YAC/rec 5.4 (2025) / 4.9 (2026): mid-pack separation after catch; same basis as the drafted Loveland COD fix
- Brenton Strange DRR: {"DRR": 64} — aDOT under 8 in both seasons; little deep usage, same basis as the drafted LaPorta/Pitts DRR fixes
- Brenton Strange JMP: {"JMP": 78} — No evidence of a poor catch radius; A2 lowered JMP for style separation only, so restore toward Madden

## Scarcity

PASS (approved): 6 traits at 95+, all LEAGUE_DEFINING (Kittle TGH 96, McBride CTH 95 / STA 95, Washington STR 96 / IBL 95, Kelce AWR 96); Strange adds no 90+ traits.

## League ceiling check

Check (t45s389, refs #10 Kraft 79 / first-out Likely 78) flagged 18 (IR and free agents included). Every flagged TE was tested vs Kraft and vs Likely (TE_REAUDIT_TIEBREAK_16-51, approved under t45s389): all 18 lost to Kraft; 17 lost to Likely; Brenton Strange beat Likely (TIEBREAK_42, NARROW) and lost to Kraft (TIEBREAK_41). Strange was added via TE_POOL_AMEND_01, fully rated (BG_16, RATE_16_A2 78, style-unique) and orders ahead of Likely at 78 per TIEBREAK_42. Rerun after the amendment flags the same 18, all previously tested, so all are commissioner-resolved.

## Cross-audit

CONSISTENT: all 57 approved head-to-head/tiebreak verdicts agree with the final rating order; Strange and Likely tie at 78 in TIEBREAK_42 order; style rule passes for all 120 pairs of 16 rated TEs (0 too similar); league ceiling flags 0 after resolution (18 raw, all tested); Strange's 9 10+ Madden gaps: 6 supported, 3 drafted ADJUST (not approved); Madden reference only.

## Lock

`reaudit:lock -- TE --dry-run` only: would write data/baselines/TE.reaudit-20261104.json as TE_REAUDIT_LOCK_20261104. Not locked.
