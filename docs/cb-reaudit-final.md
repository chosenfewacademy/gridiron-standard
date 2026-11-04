# CB re-audit — final (pre-lock; approval t46u)

Status: cross-audit approved; `reaudit:lock -- CB --dry-run` clean (would write `data/baselines/CB.reaudit-20261104.json`, CB_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each CB_REAUDIT_RATE_* record (`madden_reference.delta_attributes`).

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Devon Witherspoon (SEA) | 91 | 91 | +0 |
| 2 | Trent McDuffie (LA) | 89 | 96 | -7 |
| 3 | Denzel Ward (CLE) | 86 | 94 | -8 |
| 4 | Jamel Dean (PIT) | 83 | 87 | -4 |
| 5 | Isaiah Rodgers (MIN) | 81 | 86 | -5 |
| 6 | Jaylen Watson (LA) | 79 | 81 | -2 |
| 7 | Quinyon Mitchell (PHI) | 78 | 90 | -12 |
| 8 | Mike Jackson (CAR, RES) | 77 | 81 | -4 |
| 9 | Ja'Quan McMillian (DEN) | 76 | 79 | -3 |
| 10 | Jacob Parrish (TB) | 75 | 81 | -6 |
| 11 | James Pierre (MIN, first-out) | 74 | 77 | -3 |
| 12 | DJ Turner II (CIN, first-out) | 73 | 84 | -11 |
| 13 | Josh Wallace (LA, first-out) | 72 | 69 | +3 |

## One CB list
One cornerback list, with no outside/slot or left/right split. A player is CB-eligible if PFF grades him at CB in 2026 (or 2025 if he has no 2026 snaps). Outside and slot corners compete in the same list. Players are matched by gsis/PFR ID, and each appears in one list only. Cooper DeJean (PHI) is graded at safety by PFF in 2026 (S 54.6 on 554 snaps), so he moves to the safety list.

## Evidence
- PFF CB overall grades for 2025 and 2026, with coverage and run-defense snap counts.
- PFR coverage allowed: targets, completions, yards, TD, passer rating and INT; also tackles and missed tackles.
- nflverse: snaps, tackles, TFL, INT, PD, FF, accepted penalties, injury reports and roster status.
- Paywalled: PFF coverage, run-defense and tackling sub-grades, and the slot/outside splits.
- There is no public tracking data, so movement traits and JMP are LOW confidence.

## Pool
- The CB.reaudit pool was approved with 22 candidates. The league-wide screen added Mike Jackson (IR; PFF 83.5 on 1,117 snaps in 2025) and DJ Turner II, and moved Cooper DeJean to the safety list.
- Mike Jackson and Jaycee Horn (both RES) are listed in the injured section.

## Head-to-heads and tiebreaks (all approved; order held in every one)
Every stat figure in the reasons was checked against the PFF, PFR and nflverse data before it was recorded.
- **H2H_01–06:**
  - Witherspoon>McDuffie
  - Ward>Dean
  - Rodgers>Watson
  - Mitchell>Jackson
  - McMillian>Parrish
  - Parrish>Pierre (cut line)
  - All six were NARROW.
- **TIEBREAK_01–06:**
  - McDuffie>Ward
  - Dean>Rodgers
  - Watson>Mitchell
  - Jackson>McMillian
  - Pierre>Turner
  - Turner>Wallace
- **TIEBREAK_07–21 (league-ceiling flags):** Parrish holds #10 over each of these 15 players:
  - Kamari Lassiter
  - Benjamin St-Juste
  - Chidobe Awuzie
  - Carlton Davis III
  - Rasul Douglas
  - Joey Porter Jr.
  - Kool-Aid McKinstry
  - Keisean Nixon
  - Riley Moss
  - Emmanuel Forbes
  - Dee Alford
  - Marlon Humphrey
  - Mansoor Delane
  - Brandon Cisse
  - Will Lee III

## Variance audit (approved)
- 36 gaps of 10+ (23 below Madden, 13 above). 35 are supported.
- 1 was fixed through `reaudit:revise` with the overall unchanged: Denzel Ward TAK 70→62. He had 12 missed tackles on 66 combined across 2025-26, per PFR.
- OVR gaps of 10+: Quinyon Mitchell -12 and DJ Turner II -11. Both are supported by the head-to-head chain and their 2026 grades (67.9 and 74.3).

## Scarcity: PASS
- 37 traits at 90+. Only one is at 95+, Quinyon Mitchell SPD 95, tagged LEAGUE_DEFINING. There are none at 97+ in the top 10; DJ Turner II's SPD 97 is at #12.
- Witherspoon (91) and McDuffie (89) form the star tier.

## League ceiling check
- 243 non-pool CBs were screened (250+ snaps) against the refs Parrish (75) and Pierre (74).
- Metrics:
  - pff: snap-weighted PFF
  - value: INT+PD per game
  - efficiency: % of targets not completed
  - negative rate: missed tackles plus penalties per 1,000 snaps
  - availability
- The reference bars are low (Parrish allowed 66.1% completions across 2025-26; Pierre has a rotational sample), so 15 players raw-flagged.
- All 15 were resolved by approved tiebreaks. There was no pool or rating change.

## Cross-audit: CONSISTENT
All 27 approved head-to-head and tiebreak verdicts agree with the order. 78 style pairs were checked, and none was too similar.

Locked #10 Jacob Parrish (75) is the ceiling for every other CB.
