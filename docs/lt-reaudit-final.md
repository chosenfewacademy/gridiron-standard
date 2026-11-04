# LT re-audit — final (pre-lock, authorized t45s413)

Status: cross-audit approved; `reaudit:lock -- LT --dry-run` only (would write `data/baselines/LT.reaudit-20261104.json`, LT_REAUDIT_LOCK_20261104). **Not locked.** madden_order_verified=false; Madden is reference only.

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Penei Sewell | 95 | 98 | -3 |
| 2 | Trent Williams | 91 | 97 | -6 |
| 3 | Jordan Mailata | 88 | 90 | -2 |
| 4 | Tristan Wirfs | 86 | 94 | -8 |
| 5 | Garett Bolles | 85 | 96 | -11 |
| 6 | Andrew Thomas | 82 | 95 | -13 |
| 7 | Alaric Jackson | 79 | 85 | -6 |
| 8 | Bernhard Raimann | 78 | 86 | -8 |
| 9 | Charles Cross | 77 | 85 | -8 |
| 10 | Dion Dawkins | 76 | 89 | -13 |
| 11 | Paris Johnson Jr. (first-out) | 75 | 86 | -11 |
| 12 | Will Campbell (first-out) | 74 | 81 | -7 |
| 13 | Kolton Miller (first-out) | 73 | 93 | -20 |
| 14 | Laremy Tunsil (first-out) | 72 | 94 | -22 |

## Rating changes applied (t45s413)
Wirfs 86 (PBK 88, PBF 88) · Bolles 85 (AWR 85, PBK 87) · Tunsil 72 (INJ 50, STA 70, AWR 84, TGH 80) · Miller 73 (RBK 69, AWR 85). Style check: 91 pairs, 0 too similar.

## Variance audit (LT_REAUDIT_VARIANCE_AUDIT)
61 gaps of 10+ vs Madden (47 below, 14 above): 55 supported, 6 drafted ADJUST — **PROPOSED_NOT_APPROVED**: Mailata RBF 80→84, Mailata LBK 84→88, Raimann PBK 76→79, Dawkins AWR 70→74, Dawkins PBF 74→80, Miller AWR 85→88. All 6 OVR gaps (Bolles −11, Thomas −13, Dawkins −13, Johnson Jr. −11, Miller −20, Tunsil −22) are backed by the head-to-head chain.

## Scarcity (LT_REAUDIT_SCARCITY): PASS
44 traits at 90+, 10 at 95+; overalls 90+: Sewell 95, Williams 91.

## League ceiling check
Screened 37 LT-side tackles (IR and free agents included; RT-side excluded). Thresholds: {"pff": 74.3, "value": 88, "efficiency": 82, "negative_rate": 9.83, "availability": 0.64}.
Flagged: Cole Van Lanen (JAX), Ronnie Stanley (BAL). TIEBREAK_20–23: both lost to Dawkins (CLEAR) and to Johnson Jr. (Van Lanen NARROW, Stanley CLEAR). No winners, so no amendment. Closest unflagged: Orlando Brown Jr., Jordan Morgan, Rasheed Walker, Tyler Smith, Aireontae Ersery.

## Cross-audit (LT_REAUDIT_CROSS_AUDIT): CONSISTENT
29 approved pair/tiebreak verdicts agree with the order; 0 style failures; 0 ceiling flags after resolution.

Erratum: in TIEBREAK_20–23 the ESPN label contains a literal template fragment (`thru Wk '+os.environ...`). The data is through Week 8 (Nov 3). Sealed artifacts were left unchanged (add-only).
