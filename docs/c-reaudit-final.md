# C re-audit — final (pre-lock; standing approval t46u, never-locked engine t50s441, PENDING trigger addendum 2026-11-04b)

Status: cross-audit approved; `reaudit:lock -- C --dry-run` clean (would write `data/baselines/C.reaudit-20261104.json`, C_REAUDIT_LOCK_20261104, first_lock). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each C_REAUDIT_RATE_* record (`madden_reference.delta_attributes`).

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Creed Humphrey (KC) | 91 | 96 | -5 |
| 2 | Zach Frazier (PIT) | 87 | 89 | -2 |
| 3 | Aaron Brewer (MIA) | 85 | 90 | -5 |
| 4 | Coleman Shelton (LA) | 82 | 79 | +3 |
| 5 | Tyler Linderbaum (LV) | 81 | 88 | -7 |
| 6 | Erik McCoy (NO) | 80 | 87 | -7 |
| 7 | Luke Wattenberg (DEN) | 78 | 77 | +1 |
| 8 | Ryan Neuzil (ATL) | 77 | 85 | -8 |
| 9 | Juice Scruggs (DET) | 76 | 71 | +5 |
| 10 | Jake Brendel (SF) | 75 | 78 | -3 |
| 11 | Cooper Beebe (DAL, first-out) | 74 | 78 | -4 |
| 12 | Connor McGovern (BUF, first-out) | 73 | 81 | -8 |
| 13 | Tanor Bortolini (IND, first-out) | 72 | 84 | -12 |

## Candidate audit (approved)
Screened every center (PFF C grades 2025/2026, nflverse C depth-chart starters, IR/inactive/FA). Pool member Olaivavega Ioane excluded as guard-side (RG 150 / LG 66 / C 20 snapshots). Compared against the approved candidate pool (never locked).

## Head-to-heads and tiebreaks (all approved, order held in every one)
H2H_01–06: Humphrey>Frazier (MODERATE), Brewer>Shelton, Linderbaum>McCoy, Wattenberg>Neuzil, Scruggs>Brendel, Brendel>Beebe (cut line; all NARROW). TIEBREAK_01–06: Frazier>Brewer, Shelton>Linderbaum, McCoy>Wattenberg, Neuzil>Scruggs, Beebe>McGovern, McGovern>Bortolini. TIEBREAK_07–08 (ceiling precautions): Brendel>Froholdt, Brendel>Jared Wilson. No rating change followed from the results.

## Variance audit (C_REAUDIT_VARIANCE_AUDIT, approved)
34 gaps of 10+ (22 below Madden, 12 above): 28 supported on C evidence (PFF center grades + pass/run-block snaps, ESPN IOL PBWR/RBWR, nflverse penalties, injury reports); 6 fixed via `reaudit:revise` (approved): Brewer ACC 82→72 and COD 68→62, Linderbaum COD 72→64, Scruggs PBF 88→84, Beebe INJ 76→80, Bortolini AWR 70→76 (overalls unchanged). Only OVR gap of 10+: Bortolini −12 (2026 PFF 48.6, 6 penalties).

## Scarcity: PASS — 33 traits 90+, 5 at 95+ (Humphrey AWR 96 / INJ 95 / STA 95, Frazier TGH 95 LEAGUE_DEFINING; Shelton STA 97 EXTRAORDINARY); overall 90+: Humphrey 91 only.

## League ceiling check
35 outside centers screened (incl. 3 reserve/IR, 1 inactive, 4 on no 2026 roster). Refs Brendel/Beebe; 0 flagged. Precautionary tiebreaks vs #10: Hjalte Froholdt (Madden 83) and Jared Wilson (PBWR 94%) — both lost to Brendel.

## Cross-audit: CONSISTENT — 14 verdicts agree with order; 78 style pairs, 0 too similar.

Locked #10 Jake Brendel (75) is the ceiling for every other center.
