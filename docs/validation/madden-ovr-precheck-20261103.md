# Madden 27 OVR pre-check (ESTIMATED, NOT VERIFIED) — generated 2026-11-04T03:23:33.343Z

Formula/weights: config/madden-ovr-weights.estimated.json. In-game results (data/ingame-validation) are ground truth. madden_order_verified=false.

Backtest vs repo Madden 27 references: n=31, exact=25, within 1=31, max err=1

| Group | Player | Ours | Est. in-game | Gap | Flag | Best archetype | Style-preserving fix (uniform shift on weighted attrs) | Top levers | Source |
|---|---|---|---|---|---|---|---|---|---|
| QB locked top 10 | Joe Burrow | 90 | 84 | -6 | MAJOR_GAP | QB_FieldGeneral | +3 on AWR/DAC/MAC/PAC/RUN/SAC/THP/TUP | THP(25%), MAC(18%), SAC(18%), AWR(16%) | QB_REAUDIT_RATE_01_A2 |
| QB locked top 10 | Josh Allen | 88 | 78 | -10 | MAJOR_GAP | QB_FieldGeneral | +5 on AWR/DAC/MAC/PAC/RUN/SAC/THP/TUP | THP(25%), MAC(18%), SAC(18%), AWR(16%) | QB_REAUDIT_RATE_05_A3 |
| QB locked top 10 | Drake Maye | 87 | 81 | -6 | MAJOR_GAP | QB_FieldGeneral | +3 on AWR/DAC/MAC/PAC/RUN/SAC/THP/TUP | THP(25%), MAC(18%), SAC(18%), AWR(16%) | QB_REAUDIT_RATE_07_A3 |
| QB locked top 10 | Brock Purdy | 86 | 78 | -8 | MAJOR_GAP | QB_FieldGeneral | THP +5, MAC +4, SAC +4, AWR +4, DAC +4, TUP +4, PAC +4, RUN +4 | THP, MAC, SAC, AWR | QB_REAUDIT_RATE_04_A2 |
| QB locked top 10 | Jared Goff | 85 | 76 | -9 | MAJOR_GAP | QB_FieldGeneral | THP +5, MAC +4, SAC +4, AWR +4, DAC +4, TUP +4, PAC +4, RUN +4 | THP, MAC, SAC, AWR | QB_REAUDIT_RATE_06_A2 |
| QB locked top 10 | Dak Prescott | 84 | 74 | -10 | MAJOR_GAP | QB_FieldGeneral | THP +6, MAC +5, SAC +5, AWR +5, DAC +5, TUP +5, PAC +5, RUN +5 | THP, MAC, SAC, AWR | QB_REAUDIT_RATE_03_A3 |
| QB locked top 10 | Jordan Love | 83 | 74 | -9 | MAJOR_GAP | QB_StrongArm | THP +5, MAC +4, DAC +4, AWR +4, TUP +4, BSK +4, PAC +4 | THP, MAC, DAC, AWR | QB_REAUDIT_RATE_11_A4 |
| QB locked top 10 | Matthew Stafford | 83 | 74 | -9 | MAJOR_GAP | QB_StrongArm | THP +5, MAC +4, DAC +4, AWR +4, TUP +4, BSK +4, PAC +4 | THP, MAC, DAC, AWR | QB_REAUDIT_RATE_13_A3 |
| QB locked top 10 | Lamar Jackson | 82 | 77 | -5 | MAJOR_GAP | QB_FieldGeneral | THP +3, MAC +3, SAC +2, AWR +2, DAC +2, TUP +2, PAC +2, RUN +2 | THP, MAC, SAC, AWR | QB_REAUDIT_RATE_02_A6 |
| QB locked top 10 | Trevor Lawrence | 82 | 74 | -8 | MAJOR_GAP | QB_StrongArm | +4 on AWR/BSK/DAC/MAC/PAC/THP/TUP | THP(33%), MAC(22%), DAC(18%), AWR(12%) | QB_REAUDIT_RATE_12_A2 |
| RB locked top 10 | Bijan Robinson | 92 | 93 | 1 | OK | HB_ReceivingBack | - |  | RB_REAUDIT_RATE_01_A1 |
| RB locked top 10 | Kenneth Walker III | 90 | 86 | -4 | MAJOR_GAP | HB_ElusiveBack | COD +2, ACC +2, SPD +2, AWR +2, CAR +1, BCV +1, JKM +1, SPM +1, BTK +1 | COD, ACC, SPD, AWR | RB_REAUDIT_RATE_03_A2 |
| RB locked top 10 | Jahmyr Gibbs | 89 | 86 | -3 | MINOR_GAP | HB_ReceivingBack | +1 on ACC/AWR/BCV/CAR/CIT/COD/CTH/JKM/RLS/SPD/SPM/SRR | COD(14%), CTH(13%), ACC(11%), AWR(11%) | RB_REAUDIT_RATE_02_A3 |
| RB locked top 10 | Jaylen Warren | 84 | 78 | -6 | MAJOR_GAP | HB_ElusiveBack | COD +3, ACC +3, SPD +3, AWR +2, CAR +2, BCV +2, JKM +2, SPM +2, BTK +2 | COD, ACC, SPD, AWR | RB_REAUDIT_RATE_04_A2 |
| RB locked top 10 | Christian McCaffrey | 83 | 87 | 4 | MAJOR_GAP | HB_ReceivingBack | COD -2, CTH -2, ACC -2, AWR -2, SPD -1, SRR -1, CIT -1, CAR -1, BCV -1, JKM -1, SPM -1, RLS -1 | COD, CTH, ACC, AWR | RB_REAUDIT_RATE_09_A2 |
| RB locked top 10 | James Cook | 82 | 79 | -3 | MINOR_GAP | HB_ElusiveBack | COD +2, ACC +1, SPD +1, AWR +1, CAR +1, BCV +1, JKM +1, SPM +1, BTK +1 | COD, ACC, SPD, AWR | RB_REAUDIT_RATE_06_A2 |
| RB locked top 10 | De'Von Achane | 82 | 84 | 2 | MINOR_GAP | HB_ElusiveBack | -1 on ACC/AWR/BCV/BTK/CAR/COD/JKM/SPD/SPM | COD(20%), ACC(13%), SPD(13%), AWR(11%) | RB_REAUDIT_RATE_15_A1 |
| RB locked top 10 | Kyren Williams | 80 | 73 | -7 | MAJOR_GAP | HB_PowerBack | +3 on ACC/AWR/BCV/BTK/CAR/COD/SFA/SPD/STR/TRK | CAR(13%), TRK(13%), BTK(12%), AWR(11%) | RB_REAUDIT_RATE_10_A2 |
| RB locked top 10 | Bhayshul Tuten | 79 | 72 | -7 | MAJOR_GAP | HB_ElusiveBack | +3 on ACC/AWR/BCV/BTK/CAR/COD/JKM/SPD/SPM | COD(20%), ACC(13%), SPD(13%), AWR(11%) | RB_REAUDIT_RATE_05_A2 |
| RB locked top 10 | Jonathan Taylor | 78 | 73 | -5 | MAJOR_GAP | HB_PowerBack | +2 on ACC/AWR/BCV/BTK/CAR/COD/SFA/SPD/STR/TRK | CAR(13%), TRK(13%), BTK(12%), AWR(11%) | RB_REAUDIT_RATE_08_A3 |
| WR locked top 10 | Jaxon Smith-Njigba | 95 | 97 | 2 | MINOR_GAP | WR_RouteRunner | -1 on ACC/AWR/CIT/COD/CTH/DRR/MRR/RLS/SPC/SPD/SRR/STR | MRR(22%), SRR(14%), COD(12%), AWR(11%) | WR_REAUDIT_RATE_01_A2 |
| WR locked top 10 | Puka Nacua | 93 | 91 | -2 | MINOR_GAP | WR_RouteRunner | +1 on ACC/AWR/CIT/COD/CTH/DRR/MRR/RLS/SPC/SPD/SRR/STR | MRR(22%), SRR(14%), COD(12%), AWR(11%) | WR_REAUDIT_RATE_02_A2 |
| WR locked top 10 | Ja'Marr Chase | 90 | 88 | -2 | MINOR_GAP | WR_DeepThreat | +1 on ACC/AWR/CIT/COD/CTH/DRR/JKM/JMP/MRR/RLS/SPC/SPD/SPM | DRR(15%), ACC(12%), CTH(12%), SPD(12%) | WR_REAUDIT_RATE_03_A2 |
| WR locked top 10 | CeeDee Lamb | 88 | 88 | 0 | OK | WR_RouteRunner | - |  | WR_REAUDIT_RATE_05_A3 |
| WR locked top 10 | Tee Higgins | 87 | 81 | -6 | MAJOR_GAP | WR_Physical | CIT +4, SPC +3, RLS +3, CTH +3, JMP +3, SRR +3, ACC +3, AWR +3, SPD +3, STR +3, BTK +3, COD +3, MRR +3 | CIT, SPC, RLS, CTH | WR_REAUDIT_RATE_04_A2 |
| WR locked top 10 | Drake London | 86 | 82 | -4 | MAJOR_GAP | WR_Physical | +2 on ACC/AWR/BTK/CIT/COD/CTH/JMP/MRR/RLS/SPC/SPD/SRR/STR | CIT(16%), SPC(15%), RLS(12%), CTH(10%) | WR_REAUDIT_RATE_06_A2 |
| WR locked top 10 | Zay Flowers | 85 | 84 | -1 | OK | WR_DeepThreat | - |  | WR_REAUDIT_RATE_08_A3 |
| WR locked top 10 | Amon-Ra St. Brown | 84 | 86 | 2 | MINOR_GAP | WR_Slot | -1 on ACC/AWR/BTK/CAR/CIT/COD/CTH/DRR/JKM/MRR/SPD/SPM/SRR | SRR(16%), CIT(14%), CTH(13%), ACC(12%) | WR_REAUDIT_RATE_07_A1 |
| WR locked top 10 | Chris Olave | 83 | 81 | -2 | MINOR_GAP | WR_DeepThreat | +1 on ACC/AWR/CIT/COD/CTH/DRR/JKM/JMP/MRR/RLS/SPC/SPD/SPM | DRR(15%), ACC(12%), CTH(12%), SPD(12%) | WR_REAUDIT_RATE_09_A2 |
| WR locked top 10 | Justin Jefferson | 82 | 86 | 4 | MAJOR_GAP | WR_DeepThreat | -2 on ACC/AWR/CIT/COD/CTH/DRR/JKM/JMP/MRR/RLS/SPC/SPD/SPM | DRR(15%), ACC(12%), CTH(12%), SPD(12%) | WR_REAUDIT_RATE_12_A1 |
| TE locked top 10 | Brock Bowers | 93 | 97 | 4 | MAJOR_GAP | TE_VerticalThreat | -2 on ACC/AWR/BTK/CIT/COD/CTH/DRR/JMP/MRR/PBK/RBK/RLS/SPC/SPD/SRR | CTH(11%), AWR(9%), MRR(9%), CIT(8%) | TE_REAUDIT_RATE_01_A1 |
| TE locked top 10 | George Kittle | 90 | 99 | 9 | MAJOR_GAP | TE_Blocking | RBK -11, AWR -11, IBL -10, PBK -10, STR -10, SRR -10, MRR -10, CIT -10, CTH -10, BTK -10 | RBK, AWR, IBL, PBK | TE_REAUDIT_RATE_02_A1 |
| TE locked top 10 | Dalton Kincaid | 88 | 88 | 0 | OK | TE_VerticalThreat | - |  | TE_REAUDIT_RATE_04_A3 |
| TE locked top 10 | Trey McBride | 87 | 96 | 9 | MAJOR_GAP | TE_Possession | CIT -5, SRR -5, CTH -4, AWR -4, MRR -4, RBK -4, ACC -4, COD -4, IBL -4, PBK -4, SPD -4, STR -4, BTK -4, RLS -4, SPC -4 | CIT, SRR, CTH, AWR | TE_REAUDIT_RATE_03_A3 |
| TE locked top 10 | Sam LaPorta | 85 | 95 | 10 | MAJOR_GAP | TE_Possession | -5 on ACC/AWR/BTK/CIT/COD/CTH/IBL/MRR/PBK/RBK/RLS/SPC/SPD/SRR/STR | CIT(14%), SRR(12%), CTH(10%), AWR(9%) | TE_REAUDIT_RATE_05_A2 |
| TE locked top 10 | T.J. Hockenson | 84 | 96 | 12 | MAJOR_GAP | TE_Blocking | -6 on AWR/BTK/CIT/CTH/IBL/MRR/PBK/RBK/SRR/STR | RBK(10%), AWR(9%), IBL(9%), RBF(9%) | TE_REAUDIT_RATE_06_A1 |
| TE locked top 10 | Darnell Washington | 82 | 99 | 17 | MAJOR_GAP | TE_Blocking | -16 on AWR/BTK/CIT/CTH/IBL/MRR/PBK/RBK/SRR/STR | RBK(10%), AWR(9%), IBL(9%), RBF(9%) | TE_REAUDIT_RATE_07_A1 |
| TE locked top 10 | Travis Kelce | 81 | 90 | 9 | MAJOR_GAP | TE_Possession | CIT -5, SRR -5, CTH -4, AWR -4, MRR -4, RBK -4, ACC -4, COD -4, IBL -4, PBK -4, SPD -4, STR -4, BTK -4, RLS -4, SPC -4 | CIT, SRR, CTH, AWR | TE_REAUDIT_RATE_08_A2 |
| TE locked top 10 | Hunter Henry | 80 | 91 | 11 | MAJOR_GAP | TE_Possession | CIT -6, SRR -5, CTH -5, AWR -5, MRR -5, RBK -5, ACC -5, COD -5, IBL -5, PBK -5, SPD -5, STR -5, BTK -5, RLS -5, SPC -5 | CIT, SRR, CTH, AWR | TE_REAUDIT_RATE_09_A1 |
| TE locked top 10 | Tucker Kraft | 79 | 96 | 17 | MAJOR_GAP | TE_Blocking | -8 on AWR/BTK/CIT/CTH/IBL/MRR/PBK/RBK/SRR/STR | RBK(10%), AWR(9%), IBL(9%), RBF(9%) | TE_REAUDIT_RATE_11_A2 |
| LT locked top 10 | Penei Sewell | 95 | 95 | 0 | OK | OT_Power | - |  | LT_REAUDIT_RATE_01_A1 |
| LT locked top 10 | Trent Williams | 91 | 94 | 3 | MINOR_GAP | OT_Agile | -3 on ACC/AGI/AWR/IBL/LBK/PBF/PBK/RBF/RBK/SPD/STR | PBF(25%), RBF(24%), STR(14%), AWR(10%) | LT_REAUDIT_RATE_02_A1 |
| LT locked top 10 | Jordan Mailata | 88 | 90 | 2 | MINOR_GAP | OT_Power | RBP -2, PBP -1, STR -1, AWR -1, RBK -1, IBL -1, PBK -1, ACC -1, AGI -1, LBK -1, SPD -1 | RBP, PBP, STR, AWR | LT_REAUDIT_RATE_03_A2 |
| LT locked top 10 | Tristan Wirfs | 86 | 88 | 2 | MINOR_GAP | OT_Power | -1 on ACC/AGI/AWR/IBL/LBK/PBK/PBP/RBK/RBP/SPD/STR | RBP(25%), PBP(24%), STR(15%), AWR(10%) | LT_REAUDIT_RATE_05_A2 |
| LT locked top 10 | Garett Bolles | 85 | 85 | 0 | OK | OT_Agile | - |  | LT_REAUDIT_RATE_04_A2 |
| LT locked top 10 | Andrew Thomas | 82 | 85 | 3 | MINOR_GAP | OT_PassProtector | -2 on ACC/AGI/AWR/IBL/PBF/PBK/PBP/SPD/STR | PBF(32%), PBP(32%), AWR(14%), PBK(10%) | LT_REAUDIT_RATE_06_A1 |
| LT locked top 10 | Alaric Jackson | 79 | 81 | 2 | MINOR_GAP | OT_Power | -1 on ACC/AGI/AWR/IBL/LBK/PBK/PBP/RBK/RBP/SPD/STR | RBP(25%), PBP(24%), STR(15%), AWR(10%) | LT_REAUDIT_RATE_07_A1 |
| LT locked top 10 | Bernhard Raimann | 78 | 80 | 2 | MINOR_GAP | OT_Agile | PBF -2, RBF -2, STR -1, AWR -1, RBK -1, PBK -1, AGI -1, IBL -1, SPD -1, ACC -1, LBK -1 | PBF, RBF, STR, AWR | LT_REAUDIT_RATE_08_A2 |
| LT locked top 10 | Charles Cross | 77 | 78 | 1 | OK | OT_PassProtector | - |  | LT_REAUDIT_RATE_09_A1 |
| LT locked top 10 | Dion Dawkins | 76 | 83 | 7 | MAJOR_GAP | OT_Power | RBP -5, PBP -5, STR -4, AWR -4, RBK -4, IBL -4, PBK -4, ACC -4, AGI -4, LBK -4, SPD -4 | RBP, PBP, STR, AWR | LT_REAUDIT_RATE_10_A2 |
| PHI QB room | Cole Payton | 60 | 58 | -2 | MINOR_GAP | QB_Scrambler | +1 on ACC/AWR/BSK/CAR/COD/MAC/RUN/SAC/SPD/THP/TUP | THP(22%), SAC(14%), MAC(13%), BSK(10%) | research-inbox/teams/PHI/QB/cole_payton.json |
| PHI QB room | Jalen Hurts | 78 | 72 | -6 | MAJOR_GAP | QB_Scrambler | +3 on ACC/AWR/BSK/CAR/COD/MAC/RUN/SAC/SPD/THP/TUP | THP(22%), SAC(14%), MAC(13%), BSK(10%) | research-inbox/teams/PHI/QB/jalen_hurts.json |
| PHI QB room | Joe Milton III | 64 | 62 | -2 | MINOR_GAP | QB_StrongArm | +1 on AWR/BSK/DAC/MAC/PAC/THP/TUP | THP(33%), MAC(22%), DAC(18%), AWR(12%) | research-inbox/teams/PHI/QB/joe_milton_iii.json |
| PHI QB room | Tanner McKee | 66 | 57 | -9 | MAJOR_GAP | QB_FieldGeneral | THP +5, MAC +4, SAC +4, AWR +4, DAC +4, TUP +4, PAC +4, RUN +4 | THP, MAC, SAC, AWR | research-inbox/teams/PHI/QB/tanner_mckee.json |
| PHI RB room | Carson Steele | 56 | 48 | -8 | MAJOR_GAP | HB_PowerBack | CAR +4, TRK +4, BTK +3, AWR +3, SFA +3, STR +3, ACC +3, BCV +3, SPD +3, COD +3 | CAR, TRK, BTK, AWR | research-inbox/teams/PHI/RB/carson_steele.json |
| PHI RB room | Dameon Pierce | 64 | 69 | 5 | MAJOR_GAP | HB_PowerBack | -2 on ACC/AWR/BCV/BTK/CAR/COD/SFA/SPD/STR/TRK | CAR(13%), TRK(13%), BTK(12%), AWR(11%) | research-inbox/teams/PHI/RB/dameon_pierce.json |
| PHI RB room | Elijah Mitchell | 63 | 64 | 1 | OK | HB_ElusiveBack | - |  | research-inbox/teams/PHI/RB/elijah_mitchell.json |
| PHI RB room | Jaydon Blue | 62 | 62 | 0 | OK | HB_ReceivingBack | - |  | research-inbox/teams/PHI/RB/jaydon_blue.json |
| PHI RB room | Saquon Barkley | 75 | 76 | 1 | OK | HB_ElusiveBack | - |  | research-inbox/teams/PHI/RB/saquon_barkley.json |
| PHI RB room | Tank Bigsby | 68 | 64 | -4 | MAJOR_GAP | HB_PowerBack | CAR +2, TRK +2, BTK +2, AWR +2, SFA +1, STR +1, ACC +1, BCV +1, SPD +1, COD +1 | CAR, TRK, BTK, AWR | research-inbox/teams/PHI/RB/tank_bigsby.json |
| PHI RB room | Will Shipley | 61 | 57 | -4 | MAJOR_GAP | HB_ElusiveBack | COD +2, ACC +2, SPD +1, AWR +1, CAR +1, BCV +1, JKM +1, SPM +1, BTK +1 | COD, ACC, SPD, AWR | research-inbox/teams/PHI/RB/will_shipley.json |

Backtest detail:

| Pos | Player | Madden 27 | Est. |
|---|---|---|---|
| QB | Joe Burrow | 97 | 97 |
| QB | Lamar Jackson | 95 | 95 |
| QB | Dak Prescott | 91 | 91 |
| QB | Brock Purdy | 92 | 92 |
| QB | Josh Allen | 99 | 99 |
| QB | Jared Goff | 88 | 88 |
| QB | Drake Maye | 90 | 90 |
| QB | Geno Smith | 75 | 75 |
| QB | C.J. Stroud | 81 | 81 |
| QB | Patrick Mahomes | 93 | 93 |
| QB | Jordan Love | 86 | 86 |
| QB | Trevor Lawrence | 87 | 87 |
| QB | Matthew Stafford | 98 | 98 |
| QB | Kirk Cousins | 76 | 76 |
| QB | Caleb Williams | 94 | 93 |
| QB | Justin Herbert | 82 | 82 |
| QB | Sam Darnold | 84 | 84 |
| RB | Bijan Robinson | 98 | 99 |
| RB | Jahmyr Gibbs | 97 | 97 |
| RB | Kenneth Walker III | 95 | 95 |
| RB | Christian McCaffrey | 97 | 96 |
| RB | Jaylen Warren | 87 | 88 |
| RB | James Cook | 92 | 92 |
| RB | Derrick Henry | 94 | 93 |
| RB | Kyren Williams | 90 | 90 |
| RB | Bhayshul Tuten | 81 | 80 |
| RB | Jonathan Taylor | 96 | 96 |
| RB | Josh Jacobs | 88 | 88 |
| RB | Tony Pollard | 85 | 85 |
| RB | Chuba Hubbard | 85 | 85 |
| RB | Braelon Allen | 78 | 78 |
