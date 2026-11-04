# FB re-audit — final (pre-lock; standing approval t46u)

Status: cross-audit approved; `reaudit:lock -- FB --dry-run` clean (would write `data/baselines/FB.reaudit-20261104.json`, FB_REAUDIT_LOCK_20261104). madden_order_verified=false; Madden 27 is reference only. Full per-attribute side-by-side is in each FB_REAUDIT_RATE_* record (`madden_reference.delta_attributes`).

| # | Player | Ours | Madden | Δ |
|---|---|---|---|---|
| 1 | Kyle Juszczyk (SF) | 90 | 88 | +2 |
| 2 | Patrick Ricard (NYG) | 85 | 84 | +1 |
| 3 | Hunter Luepke (DAL) | 78 | 72 | +6 |
| 4 | Connor Heyward (LV, H-back→FB) | 77 | 74 | +3 |
| 5 | Adam Prentice (DEN) | 75 | 69 | +6 |
| 6 | Michael Burton (CLE) | 74 | 66 | +8 |
| 7 | Reggie Gilliam (NE, IR) | 73 | 83 | -10 |
| 8 | Alec Ingold (LAC, IR) | 72 | 73 | -1 |
| 9 | Andrew Beck (NYJ) | 70 | 68 | +2 |
| 10 | Scott Matlock (LAC; Madden card DT) | 69 | 68 | +1 |
| 11 | Brady Russell (SEA, first-out) | 67 | 65 | +2 |
| 12 | Max Bredeson (MIN, first-out) | 65 | 71 | -6 |
| 13 | DJ Herman (MIA, first-out) | 63 | 66 | -3 |

## FB eligibility rule
A player is FB-eligible if, in 2025 or 2026, he (a) has a PFF FB-alignment grade (pff.com/grades/nfl/fb), or (b) appears at FB on any nflverse weekly depth chart, or (c) carries nflverse roster depth_chart_position FB. TE/H-backs and RBs used as fullbacks enter through (a) or (b): Heyward, Beck, Russell, Herman, Westover, Sims, Myarick, Gurd, Steele, Acker and Brooks. Only FB-alignment usage counts as primary evidence; TE-alignment work is context.

## Evidence
FB-specific evidence: PFF FB grades with run/lead-block, pass-block, route and carry snap counts (2025 and 2026 through Week 8); nflverse snaps; rushing and receiving usage; accepted penalties; FB depth-chart role; injury reports and roster status. Paywalled or unpublished: PFF block sub-grades, lead-block win data, 21/22-personnel share. The pool flag NO_PFF_POSITION_TABLE is outdated, because PFF does publish a public FB table and this audit uses it.

`config/madden-entry-order.json` has no FB key. The file is protected and unverified, so it was left unchanged. FB attributes follow the Madden 27 FB card: SPD ACC AGI COD STR AWR CAR BCV TRK BTK SFA CTH CIT SRR RBK RBP RBF PBK IBL LBK INJ STA TGH.

## Pool and candidate audit (approved)
The re-audit pool is the approved FB.json (17 players) with membership unchanged. Exclusions record the screened players outside the pool:
- C.J. Ham: retired.
- Jakob Johnson: free agent.
- British Brooks: RB on reserve, 73 FB snaps.
- Practice-squad or cut FB-eligibles with 0–8 snaps: Lucas Scott, Lampe, Sims, Myarick, Gurd, Steele and Acker.

Four pool members sit below the first-outs: VanSumeren (5 snaps), Nowakowski (32), Ouzts (IR, no 2026 snaps) and Westover (practice squad).

## Head-to-heads and tiebreaks (all approved, order held in every one)
- **H2H_01–06:** Juszczyk>Ricard (CLEAR), Luepke>Heyward, Prentice>Burton, Gilliam>Ingold, Beck>Matlock, Matlock>Russell (cut line, CLEAR).
- **TIEBREAK_01–06:** Ricard>Luepke (CLEAR), Heyward>Prentice, Burton>Gilliam, Ingold>Beck, Russell>Bredeson, Bredeson>Herman.

## Variance audit (FB_REAUDIT_VARIANCE_AUDIT, approved)
There were 23 gaps of 10+ (7 below Madden, 16 above). 20 are supported. 3 were fixed through `reaudit:revise` (approved), with overalls unchanged:
- Heyward SRR 78→74
- Burton AWR 82→76
- Matlock TRK 50→44

The only OVR gap of 10+ is Gilliam at −10 (reserve/IR).

## Scarcity: PASS
13 traits are 90+ and 1 is 95+: Ricard LBK 96, tagged LEAGUE_DEFINING (2025 All-Pro; 193 run/lead-block snaps in 2025 and the most at FB in 2026). There are no 97+ traits. The only overall at 90+ is Juszczyk (90). Narrative text was verified before the stage ran.

## League ceiling check
18 FB-eligibles outside the pool were screened against refs Matlock (69) and Russell (67), with 0 flags. The closest players all fall below the sample floor or are off a 2026 roster:
- Brooks: 78.2 on 73 snaps
- Ham: 61.5 on 184 (retired)
- J. Johnson: 60.9 on 86 (free agent)
- VanSumeren: 60.0 on 5
- Ouzts: 48.5 (IR)
- Westover: 45.4 (practice squad)

## Cross-audit: CONSISTENT
All 12 verdicts agree with the order. 78 style pairs were checked and none were too similar.

Locked #10 Scott Matlock (69) is the ceiling for every other fullback.
