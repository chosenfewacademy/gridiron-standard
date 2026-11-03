# QB TOP10_REAUDIT — tiebreak 01: Lamar Jackson vs Dak Prescott (Grok Bot analyst, attempt 1)

EA ratings not used. Evidence: PFF 2026/2025, nflverse stats and play-by-play, FTN charting.

```json
{
  "audit_id": "QB_REAUDIT_TIEBREAK_01_A1",
  "task_id": "QB_REAUDIT_TIEBREAK_01",
  "task_type": "pair_audit",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "QB",
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "players": [
    "Lamar Jackson",
    "Dak Prescott"
  ],
  "pair_result": {
    "winner": "Dak Prescott",
    "loser": "Lamar Jackson",
    "provisional_order_holds": false,
    "reasoning": "Tied at 85 (Jackson ahead only by contention order). Jackson's 2026 is the best per-play line in the group (PFF 91.3, +.354 EPA/dropback) but 5 games; 2025 was PFF 74.0 (#20), +.054 in 13 games. Prescott is PFF 86.7 / 86.9 (top 5 both seasons) at +.167 / +.181 over 8 and 17 games. Sample-weighted two-season EPA/dropback: Prescott ~+.177 vs Jackson ~+.137; PFF ~86.8 vs ~79. Prescott wins.",
    "key_evidence_for_winner": [
      "Dak Prescott PFF overall 2026 86.7 (#3), 2025 86.9 (#5)",
      "Dak Prescott 2026: 8 games, EPA/dropback +0.167, EPA/play incl. rush +0.167, CPOE +0.2, 14 TD / 5 INT, sack 3.5%, Y/A 6.77, rush EPA +3.7",
      "Dak Prescott 2025: 17 games, EPA/dropback +0.181, EPA/play incl. rush +0.153, CPOE +2.2, 30 TD / 10 INT",
      "Dak Prescott FTN interception-worthy rate 2.3% (2026), 2.7% (2025)"
    ],
    "key_evidence_for_loser": [
      "Lamar Jackson PFF overall 2026 91.3 (#2), 2025 74.0 (#20)",
      "Lamar Jackson 2026: 5 games, EPA/dropback +0.354, EPA/play incl. rush +0.338, CPOE +7.4, 6 TD / 1 INT, sack 6.7%, Y/A 9.97, rush EPA +4.9",
      "Lamar Jackson 2025: 13 games, EPA/dropback +0.054, EPA/play incl. rush +0.096, CPOE +1.8, 21 TD / 7 INT",
      "Lamar Jackson FTN interception-worthy rate 3.2% (2026), 2.0% (2025)"
    ],
    "margin": "NARROW",
    "proposed_rating_adjustment": "Lamar Jackson 85 -> 84 (RATE_02 revision A3): Prescott wins the 85 tie on the two-season body of work; AWR 84 -> 83",
    "adjustment_status": "PENDING_COMMISSIONER_REVIEW (drafted as an add-only revision, not run, not approved)"
  },
  "major_flags": [
    "PENDING_REVIEW: tiebreak result not approved (card t31s1)",
    "RATING_CONTRADICTION: verdict reverses rating order",
    "TIE_BREAK: tied overall broken by contention order; pair verdict decides"
  ],
  "locked_control_conflict": false
}
```
