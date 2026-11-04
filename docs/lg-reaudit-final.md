# LG re-audit — final (pre-lock; standing approval t46u, never-locked engine t50s441)

Status: cross-audit approved; `reaudit:lock -- LG --dry-run` clean (would write `data/baselines/LG.reaudit-20261104.json`, LG_REAUDIT_LOCK_20261104, first_lock). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each LG_REAUDIT_RATE_* record (`madden_reference.delta_attributes`).

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Quenton Nelson | 93 | 95 | -2 |
| 2 | Damien Lewis | 85 | 87 | -2 |
| 3 | Joe Thuney | 84 | 96 | -12 |
| 4 | Steve Avila | 81 | 82 | -1 |
| 5 | Peter Skoronski | 80 | 84 | -4 |
| 6 | Dylan Parham | 79 | 79 | +0 |
| 7 | Christian Mahogany | 77 | 74 | +3 |
| 8 | Tyler Smith | 76 | 89 | -13 |
| 9 | Matthew Bergeron | 75 | 80 | -5 |
| 10 | Ezra Cleveland | 74 | 80 | -6 |
| 11 | Isaac Seumalo (first-out) | 72 | 80 | -8 |
| 12 | David Edwards (first-out) | 71 | 77 | -6 |
| 13 | Alijah Vera-Tucker (first-out) | 70 | 83 | -13 |

## Head-to-heads and tiebreaks (all approved, order held in every one)
H2H_01–06: Nelson>Lewis (CLEAR), Thuney>Avila, Skoronski>Parham (NARROW), Mahogany>Smith (NARROW), Bergeron>Cleveland (NARROW), Cleveland>Seumalo (cut line). TIEBREAK_01–08: Lewis>Thuney, Avila>Skoronski, Parham>Mahogany, Smith>Bergeron, Cleveland>Edwards, Cleveland>Vera-Tucker, Seumalo>Edwards, Edwards>Vera-Tucker. No rating change followed from the results.

## Variance audit (LG_REAUDIT_VARIANCE_AUDIT, approved)
23 gaps of 10+ (21 below Madden, 2 above): 19 supported on LG evidence (PFF guard grades + pass/run-block snaps, ESPN IOL PBWR/RBWR, nflverse penalties, injury reports); 4 fixed via `reaudit:revise` (approved): Skoronski AGI 74→66, Parham AGI 72→66, Smith AWR 68→74, Edwards PBK 71→74 (overalls unchanged). OVR gaps backed by the head-to-head chain: Thuney −12 (2026 PFF 70.7, age 34), Smith −13 (7 penalties 2025, 4 g in 2026), Vera-Tucker −13 (IR).

## Scarcity: PASS — 29 traits 90+, 9 at 95+ (Smith STR 97 and Nelson RBP 97 EXTRAORDINARY); overall 90+: Nelson 93 (8-point gap to #2).

## League ceiling check
46 LG-side guards screened (incl. 5 reserve/IR, 4 inactive, 5 on no 2026 roster). Refs Cleveland/Seumalo; 0 flagged. Limitation: neither ref is on the ESPN IOL lists, so only PFF, penalty rate and availability were scored. Precautionary tiebreaks vs #10: Chris Paul (WAS, PBWR 93%) and Joel Bitonio (FA, 2025 PFF 70.8) — both lost to Cleveland (TIEBREAK_09–10).

## Cross-audit: CONSISTENT — 16 verdicts agree with order; 78 style pairs, 0 too similar.

Erratum: the variance-audit summary text says "SUPPORTED on LT evidence" (template carry-over); the judgments are on LG evidence. Sealed artifact left unchanged (add-only).
