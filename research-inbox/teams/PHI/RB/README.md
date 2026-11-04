# PHI RB room — ratings (card t48u, 2026-11-03 ET)

Madden 27 = reference only (never evidence). Ratings are per-attribute judgment; no formulas or percentiles.

Anchor: locked RB top 10 `data/baselines/RB.reaudit-20261103.json` (madden_order_verified=false). #10 Jonathan Taylor 78 is the ceiling for every non-top-10 RB; no Eagles RB is in the locked top 10 (Hubbard 77 first out, Henry 76 external control). Saquon Barkley appears only in RB_REAUDIT_BG_01 (PFF 71.6) and the league ceiling screen (not flagged), consistent with him rating below Taylor.

No FB on the roster; Carson Steele (RB/FB hybrid) is listed as RB by the team.

Deep-stat caveat: PFF MTF/YCO, YPRR and pass-pro grades are paywalled (same limitation recorded in RB_REAUDIT_VARIANCE_AUDIT); variance audits use nflverse pbp (EPA/rush, success, stuff, 10+/20+ rates, short yardage, receiving EPA/YAC), NGS RYOE, snap counts, public PFF grades and injury reports.

## Saquon Barkley — OVR 75 (Madden 99) — Active (#26; stinger, hamstring and back injuries in 2026, missed 2 games; played Week 8 vs WAS)

Style: Aging big-play feature back: hurdle/jump-cut creator with power and long speed still there in flashes, but 2025 efficiency fell off (stuff 24%) and a 2026 injury run keeps him off the field

Top-10 calibration (Jonathan Taylor, Derrick Henry, Braelon Allen): Below Jonathan Taylor (#10, 78) and in line with external controls Derrick Henry 76 / Braelon Allen 75: Barkley's 2026 sample (56 car, 123 snaps) is too small and his 2025 (4.06 ypc, EPA/rush -.086, success 38%, stuff 24%) is below Taylor's workload-backed profile; his SPD/JKM/JMP sit near Taylor (90/76/80) while BCV 80 trails Taylor 82 and INJ 66 is far below Taylor 86

| Attr | Ours | Madden | Δ |
|---|---|---|---|
| OVR | 75 | 99 | -24 |
| SPD | 89 | 95 | -6 |
| ACC | 88 | 94 | -6 |
| AGI | 86 | 95 | -9 |
| COD | 84 | 94 | -10 |
| STR | 82 | 81 | +1 |
| AWR | 84 | 99 | -15 |
| CAR | 88 | 97 | -9 |
| BCV | 80 | 87 | -7 |
| BTK | 82 | 90 | -8 |
| TRK | 80 | 84 | -4 |
| SFA | 82 | 88 | -6 |
| SPM | 80 | 95 | -15 |
| JKM | 84 | 96 | -12 |
| CTH | 72 | 74 | -2 |
| CIT | 56 | 62 | -6 |
| SRR | 70 | 75 | -5 |
| MRR | 60 | 67 | -7 |
| DRR | 54 | 65 | -11 |
| RLS | 58 | 69 | -11 |
| JMP | 88 | 96 | -8 |
| INJ | 66 | 91 | -25 |
| STA | 80 | 94 | -14 |
| TGH | 86 | 90 | -4 |

Key stats:
- 2024 PHI: 348 car, 2011 yds, 5.78 ypc, 13 TD, EPA/rush +.107, success 45%, 17 runs of 20+, 3rd/4th-and-<=2 8/15 (nflverse pbp)
- 2025 PHI: 281 car, 1142 yds, 4.06 ypc, 7 TD, EPA/rush -.086, success 38%, stuff 24.2%, 10+ rate 10%, 4 runs of 20+, SY 5/6; 37/51 rec 273 yds, 8.0 YAC/rec, rec EPA -5.0; 1 fumble lost; 773 off snaps
- 2026 (6 g, 123 off snaps): 56 car, 274 yds, 4.89 ypc, 2 TD, EPA/rush +.018, success 39%, stuff 19.6%, RYOE/att +1.01, 2 runs of 20+; 7/10 rec 41 yds; 0 fumbles lost
- PFF HB 2026 71.6 (repo RB_REAUDIT_BG_01); league ceiling screen snap-weighted PFF 68.5, availability .88, not flagged above Taylor (RB_REAUDIT_LEAGUE_CEILING_CHECK)
- Injuries 2026: stinger, hamstring (missed 2 games), back locked up after 10 snaps vs DAL (NBC Sports Philadelphia); age 29

Variance (10+):
- OVR: -24 vs Madden 99: Madden 99 is a reputation/2024 rating; 2025 4.06 ypc, EPA/rush -.086, stuff 24%; 2026 only 123 snaps with 3 injuries; locked ceiling forces <=78 and the league ceiling screen did not flag him above Taylor - SUPPORTED
- COD: -10 vs Madden 94: age 29 with hamstring/back injuries in 2026; 10+ run rate fell from 13% (2024) to 10% (2025) - SUPPORTED
- AWR: -15 vs Madden 99: success 38% (2025) and 39% (2026), BCV-type reads lag 2024; 99 is unsupported - SUPPORTED
- SPM: -15 vs Madden 95: spin is not a defining move in his tape-era stats; 2025 stuff 24% shows fewer evasions - SUPPORTED
- JKM: -12 vs Madden 96: jump-cut remains signature (RYOE +1.01 small 2026 sample) but 2025 10+ rate 10% vs 13% 2024 - SUPPORTED
- DRR: -11 vs Madden 65: deep route usage minimal (51 tgt 2025, 8.0 YAC/rec mostly screens) - SUPPORTED
- RLS: -11 vs Madden 69: 51 tgt in 2025 mostly screens/checkdowns (8.0 YAC/rec, rec EPA -5.0); release vs press rarely tested - SUPPORTED
- INJ: -25 vs Madden 91: stinger, hamstring (2 games missed) and back injury in 2026, age 29 - SUPPORTED
- STA: -14 vs Madden 94: 123 off snaps in 6 games 2026, left DAL after 10 snaps - SUPPORTED

Style check: PASS (max corr Elijah Mitchell 0.933, min MAD Jonathan Taylor 4.3); ceiling check PASS

## Tank Bigsby — OVR 68 (Madden 78) — Reserve/Injured (injured Week 4 vs LAR)

Style: Contact-first one-cut power slasher: breaks tackles and finishes runs, explosive on limited 2025 volume, but little receiving value and ball-security lapses

Top-10 calibration (Jonathan Taylor, Braelon Allen): Well below the top 10; nearest top-10 analogue by attributes is Jonathan Taylor (78) for the power-slash build but every component trails (BCV 74 vs 82, CAR 80 vs 78 aside); calibrated under external control Braelon Allen 75 (similar TRK/BTK profile, more proven RYOE)

| Attr | Ours | Madden | Δ |
|---|---|---|---|
| OVR | 68 | 78 | -10 |
| SPD | 88 | 92 | -4 |
| ACC | 88 | 92 | -4 |
| AGI | 80 | 84 | -4 |
| COD | 80 | 86 | -6 |
| STR | 80 | 75 | +5 |
| AWR | 66 | 80 | -14 |
| CAR | 74 | 88 | -14 |
| BCV | 72 | 85 | -13 |
| BTK | 86 | 84 | +2 |
| TRK | 82 | 85 | -3 |
| SFA | 78 | 78 | +0 |
| SPM | 70 | 72 | -2 |
| JKM | 76 | 84 | -8 |
| CTH | 56 | 62 | -6 |
| CIT | 42 | 51 | -9 |
| SRR | 50 | 56 | -6 |
| MRR | 42 | 48 | -6 |
| DRR | 36 | 40 | -4 |
| RLS | 42 | 51 | -9 |
| JMP | 72 | 81 | -9 |
| INJ | 72 | 92 | -20 |
| STA | 82 | 86 | -4 |
| TGH | 88 | 88 | +0 |

Key stats:
- 2024 JAX: 168 car, 766 yds, 4.56 ypc, 7 TD, EPA/rush -.005, success 38%, SY 13/21; 7 rec 54 yds; 1 fumble lost
- 2025 JAX/PHI: 63 car, 356 yds, 5.65 ypc, 2 TD, EPA/rush +.115, success 48%, stuff 12.7%, 10+ rate 20.6%; 139 off / 50 ST snaps
- 2026 PHI (4 g): 28 car, 91 yds, 3.25 ypc, 1 TD, EPA/rush -.171, 10+ rate 3.6%, 3 rec 10 yds, 1 fumble lost; IR after Week 4 injury
- Receiving: 14 career-window targets 2024-26; pass-pro/YPRR not public (PFF premium) - LOW-MEDIUM confidence on route attrs

Variance (10+):
- OVR: -10 vs Madden 78: 2026 3.25 ypc, EPA/rush -.171 on 28 car before IR; strong 2025 (5.65 ypc) came on 63 car; ceiling is Taylor 78 and he sits under Allen 75 - SUPPORTED
- AWR: -14 vs Madden 80: success 38% (2024), 36% (2026); limited pass-game role (14 tgt in 3 seasons) - SUPPORTED
- CAR: -14 vs Madden 88: fumble lost 2024 and on 28 carries in 2026; Madden 88 overstates - SUPPORTED
- BCV: -13 vs Madden 85: 2026 10+ rate 3.6%, stuff 17.9%; 2024 success 38% - power runner, not a vision back - SUPPORTED
- INJ: -20 vs Madden 92: on IR from Week 4 2026 injury - SUPPORTED

Style check: PASS (max corr Kenneth Walker III 0.941, min MAD Braelon Allen 6.13); ceiling check PASS

## Dameon Pierce — OVR 64 (Madden 75) — Reserve/Injured (placed 2026-10-28; injured vs DAL)

Style: Downhill short-yardage grinder: low-pad power finisher who converted goal-line and short-yardage work, but frequently stuffed and nearly no receiving value

Top-10 calibration (Derrick Henry, Josh Jacobs): Far below the top 10; power profile mirrors Josh Jacobs/Derrick Henry shape (TRK/STR) at a much lower level; kept under Bigsby on 2026 efficiency (2.59 ypc, stuff 35%)

| Attr | Ours | Madden | Δ |
|---|---|---|---|
| OVR | 64 | 75 | -11 |
| SPD | 82 | 90 | -8 |
| ACC | 88 | 89 | -1 |
| AGI | 76 | 82 | -6 |
| COD | 74 | 81 | -7 |
| STR | 86 | 84 | +2 |
| AWR | 70 | 68 | +2 |
| CAR | 88 | 89 | -1 |
| BCV | 64 | 80 | -16 |
| BTK | 78 | 85 | -7 |
| TRK | 88 | 89 | -1 |
| SFA | 86 | 82 | +4 |
| SPM | 56 | 72 | -16 |
| JKM | 66 | 82 | -16 |
| CTH | 50 | 67 | -17 |
| CIT | 50 | 54 | -4 |
| SRR | 46 | 60 | -14 |
| MRR | 38 | 52 | -14 |
| DRR | 30 | 44 | -14 |
| RLS | 38 | 49 | -11 |
| JMP | 80 | 82 | -2 |
| INJ | 74 | 96 | -22 |
| STA | 72 | 86 | -14 |
| TGH | 90 | 91 | -1 |

Key stats:
- 2022 rookie HOU: 939 yds in 13 g; 2024 HOU: 40 car, 293 yds, 7.32 ypc (philadelphiaeagles.com / nflverse)
- 2025 HOU/KC: 14 car, 36 yds, 2.57 ypc; 28 off snaps
- 2026 PHI (3 g, 151 off snaps): 37 car, 96 yds, 2.59 ypc, 2 TD, EPA/rush -.159, success 38%, stuff 35.1%, 10+ rate 2.7%, SY 2/2; 7/11 rec 14 yds, 3.57 YAC/rec, rec EPA -7.6
- IR 2026-10-28 after injury vs DAL

Variance (10+):
- OVR: -11 vs Madden 75: 2026 2.59 ypc, EPA/rush -.159, stuff 35.1% on 37 car; 2025 28 snaps - SUPPORTED
- BCV: -16 vs Madden 80: stuff 35.1%, 10+ rate 2.7% (2026) - SUPPORTED
- SPM: -16 vs Madden 72: no evasion evidence; 35% stuffed - SUPPORTED
- JKM: -16 vs Madden 82: 10+ rate 2.7% (2026); one-speed downhill runner - SUPPORTED
- CTH: -17 vs Madden 67: 7/11 for 14 yds 2026, 2/4 in 2024 - SUPPORTED
- SRR: -14 vs Madden 60: 7 rec at 3.57 YAC/rec, rec EPA -7.6 (2026) - SUPPORTED
- MRR: -14 vs Madden 52: no intermediate route targets in 2024-26 pbp - SUPPORTED
- DRR: -14 vs Madden 44: no deep targets 2024-26 - SUPPORTED
- RLS: -11 vs Madden 49: backfield-only usage - SUPPORTED
- INJ: -22 vs Madden 96: IR 2026-10-28 plus 2025 HOU/KC limited availability - SUPPORTED
- STA: -14 vs Madden 86: 151 off snaps across 3 games as a rotational/short-yardage back - SUPPORTED

Style check: PASS (max corr Braelon Allen 0.945, min MAD Braelon Allen 6.39); ceiling check PASS

## Elijah Mitchell — OVR 63 (Madden 74) — Practice squad (elevated for Week 8 vs WAS)

Style: One-cut zone runner with real burst whose career has been swallowed by injuries; now a check-down/space back on a short leash

Top-10 calibration (Tony Pollard, James Cook): Far below the top 10; zone one-cut shape closest to Tony Pollard (external control 74) and James Cook at a much lower level; INJ held lowest in the room for his medical history

| Attr | Ours | Madden | Δ |
|---|---|---|---|
| OVR | 63 | 74 | -11 |
| SPD | 88 | 88 | +0 |
| ACC | 88 | 91 | -3 |
| AGI | 82 | 86 | -4 |
| COD | 80 | 86 | -6 |
| STR | 70 | 71 | -1 |
| AWR | 66 | 67 | -1 |
| CAR | 86 | 93 | -7 |
| BCV | 76 | 82 | -6 |
| BTK | 72 | 80 | -8 |
| TRK | 66 | 79 | -13 |
| SFA | 66 | 74 | -8 |
| SPM | 74 | 77 | -3 |
| JKM | 78 | 83 | -5 |
| CTH | 66 | 69 | -3 |
| CIT | 52 | 57 | -5 |
| SRR | 60 | 64 | -4 |
| MRR | 52 | 57 | -5 |
| DRR | 44 | 50 | -6 |
| RLS | 50 | 54 | -4 |
| JMP | 84 | 88 | -4 |
| INJ | 58 | 84 | -26 |
| STA | 74 | 90 | -16 |
| TGH | 76 | 81 | -5 |

Key stats:
- 2021 SF rookie: 963 rush yds (career high); multiple injury-shortened seasons since (missed all of 2024 per reports)
- 2025: 7 off snaps, 0 carries (nflverse snap counts)
- 2026 PHI (2 g, 53 off snaps): 14 car, 45 yds, 3.21 ypc, EPA/rush -.231, success 43%, stuff 28.6%, SY 1/1; 7/10 rec 26 yds, 8.1 YAC/rec
- Signed to PS 2026-10-20, elevated 2026-10-31 (philadelphiaeagles.com)

Variance (10+):
- OVR: -11 vs Madden 74: 14 car 3.21 ypc, EPA/rush -.231 (2026); 0 car 2025; practice squad - SUPPORTED
- TRK: -13 vs Madden 79: 200 lb, 2026 stuff 28.6%; never a power back - SUPPORTED
- INJ: -26 vs Madden 84: repeated multi-month injuries since 2021 incl. lost 2024 season; 7 off snaps in 2025 - SUPPORTED
- STA: -16 vs Madden 90: 53 off snaps in 2 games 2026; no workload since 2021 - SUPPORTED

Style check: PASS (max corr Saquon Barkley 0.933, min MAD Will Shipley 4.35); ceiling check PASS

## Jaydon Blue — OVR 62 (Madden 72) — Active (#30; re-signed from PS 2026-10-28)

Style: Undersized 4.38 scatback: home-run speed and pass-catching upside out of the backfield, but gets stuffed inside and has little power or NFL processing yet

Top-10 calibration (James Cook, De'Von Achane, Jahmyr Gibbs): Far below the top 10; speed/receiving template of Jahmyr Gibbs, James Cook and De'Von Achane but with none of their production (stuff 39.5% on 38 NFL carries), so only SPD/ACC approach their tier

| Attr | Ours | Madden | Δ |
|---|---|---|---|
| OVR | 62 | 72 | -10 |
| SPD | 93 | 93 | +0 |
| ACC | 93 | 95 | -2 |
| AGI | 86 | 89 | -3 |
| COD | 84 | 88 | -4 |
| STR | 58 | 65 | -7 |
| AWR | 58 | 61 | -3 |
| CAR | 78 | 84 | -6 |
| BCV | 66 | 82 | -16 |
| BTK | 62 | 78 | -16 |
| TRK | 54 | 79 | -25 |
| SFA | 56 | 76 | -20 |
| SPM | 74 | 72 | +2 |
| JKM | 82 | 80 | +2 |
| CTH | 74 | 71 | +3 |
| CIT | 58 | 59 | -1 |
| SRR | 70 | 68 | +2 |
| MRR | 62 | 64 | -2 |
| DRR | 60 | 59 | +1 |
| RLS | 62 | 60 | +2 |
| JMP | 78 | 77 | +1 |
| INJ | 84 | 86 | -2 |
| STA | 78 | 81 | -3 |
| TGH | 72 | 86 | -14 |

Key stats:
- 4.38 40 at NFL Combine; Texas final year 730 yds, 5.4 ypc, 8 rush TD, 6 rec TD (philadelphiaeagles.com)
- 2025 DAL (5 g, 78 off snaps): 38 car, 129 yds, 3.39 ypc, 1 TD, EPA/rush -.197, success 29%, stuff 39.5%, 10+ rate 13.2%
- 2026 PHI: 8 off snaps, 1 rec 9 yds; no carries

Variance (10+):
- OVR: -10 vs Madden 72: 38 NFL car, 3.39 ypc, EPA/rush -.197, success 29% (2025); 8 off snaps 2026 - SUPPORTED
- BCV: -16 vs Madden 82: stuff 39.5% on 38 car (2025) - SUPPORTED
- BTK: -16 vs Madden 78: stuff 39.5%, 198 lb - SUPPORTED
- TRK: -25 vs Madden 79: 198 lb scatback, success 29% - SUPPORTED
- SFA: -20 vs Madden 76: 198 lb, no contact-finishing evidence - SUPPORTED
- TGH: -14 vs Madden 86: lightweight back, limited NFL contact sample - SUPPORTED

Style check: PASS (max corr Jahmyr Gibbs 0.887, min MAD Tony Pollard 5.61); ceiling check PASS

## Will Shipley — OVR 61 (Madden 72) — Reserve/Injured (foot, placed Week 6)

Style: Special-teams-first change-of-pace back: shifty and quick in space with check-down hands, but has not produced as a runner (sub-3.5 ypc every NFL season)

Top-10 calibration (James Cook, Tony Pollard): Far below the top 10; light space-back shape like James Cook/Tony Pollard but without their rushing efficiency; ranks just under Blue on speed

| Attr | Ours | Madden | Δ |
|---|---|---|---|
| OVR | 61 | 72 | -11 |
| SPD | 84 | 91 | -7 |
| ACC | 86 | 91 | -5 |
| AGI | 86 | 87 | -1 |
| COD | 86 | 89 | -3 |
| STR | 66 | 68 | -2 |
| AWR | 66 | 71 | -5 |
| CAR | 74 | 83 | -9 |
| BCV | 70 | 80 | -10 |
| BTK | 68 | 74 | -6 |
| TRK | 62 | 76 | -14 |
| SFA | 64 | 73 | -9 |
| SPM | 66 | 74 | -8 |
| JKM | 76 | 83 | -7 |
| CTH | 70 | 64 | +6 |
| CIT | 50 | 52 | -2 |
| SRR | 62 | 67 | -5 |
| MRR | 52 | 62 | -10 |
| DRR | 44 | 55 | -11 |
| RLS | 52 | 58 | -6 |
| JMP | 82 | 90 | -8 |
| INJ | 72 | 83 | -11 |
| STA | 84 | 90 | -6 |
| TGH | 82 | 83 | -1 |

Key stats:
- 2024 PHI: 30 car, 82 yds, 2.73 ypc; 4 rec 35 yds
- 2025 PHI: 14 car, 49 yds, 3.50 ypc, 1 fumble lost; 9/12 rec 56 yds; 116 off / 245 ST snaps
- 2026 PHI (5 g): 20 car, 57 yds, 2.85 ypc, 1 TD, EPA/rush -.297, success 25%; 5/8 rec 31 yds; foot injury in Week 5, IR

Variance (10+):
- OVR: -11 vs Madden 72: 2.73/3.50/2.85 ypc in 2024/25/26; 2026 EPA/rush -.297, success 25% - SUPPORTED
- BCV: -10 vs Madden 80: success 20%/29%/25% across 2024-26 - SUPPORTED
- TRK: -14 vs Madden 76: 209 lb, 0 SY conversions - SUPPORTED
- MRR: -10 vs Madden 62: targets are checkdowns (9/12, 56 yds 2025) - SUPPORTED
- DRR: -11 vs Madden 55: no deep targets 2024-26 - SUPPORTED
- INJ: -11 vs Madden 83: partial foot injury, IR Week 6 2026 - SUPPORTED

Style check: PASS (max corr Bhayshul Tuten 0.943, min MAD Elijah Mitchell 4.35); ceiling check PASS

## Carson Steele — OVR 56 (Madden n/a) — Reserve/Injured (waived/injured, reverted to IR after injury vs CAR)

Style: Bruising FB/RB hybrid and special-teamer: north-south short-yardage pusher with no wiggle and a fumble problem

Top-10 calibration (Derrick Henry, Braelon Allen): Far below the top 10; power-only shape compared with Derrick Henry/Braelon Allen on TRK/STR but with no evidence of creation

| Attr | Ours | Madden | Δ |
|---|---|---|---|
| OVR | 56 | n/a | n/a |
| SPD | 78 | n/a | n/a |
| ACC | 78 | n/a | n/a |
| AGI | 66 | n/a | n/a |
| COD | 64 | n/a | n/a |
| STR | 84 | n/a | n/a |
| AWR | 64 | n/a | n/a |
| CAR | 66 | n/a | n/a |
| BCV | 64 | n/a | n/a |
| BTK | 70 | n/a | n/a |
| TRK | 80 | n/a | n/a |
| SFA | 72 | n/a | n/a |
| SPM | 54 | n/a | n/a |
| JKM | 58 | n/a | n/a |
| CTH | 62 | n/a | n/a |
| CIT | 56 | n/a | n/a |
| SRR | 50 | n/a | n/a |
| MRR | 40 | n/a | n/a |
| DRR | 32 | n/a | n/a |
| RLS | 46 | n/a | n/a |
| JMP | 70 | n/a | n/a |
| INJ | 74 | n/a | n/a |
| STA | 72 | n/a | n/a |
| TGH | 84 | n/a | n/a |

Key stats:
- 2024 KC: 56 car, 183 yds, 3.27 ypc, success 46%, SY 6/8, 2 fumbles lost; 7 rec 26 yds
- 2026 PHI: 3 off / 29 ST snaps; 1 rec 4 yds
- No Madden 27 entry found in EA ratings API on 2026-11-03 (released/IR) - Madden comparison N/A

Style check: PASS (max corr Dameon Pierce 0.927, min MAD Dameon Pierce 6.7); ceiling check PASS

