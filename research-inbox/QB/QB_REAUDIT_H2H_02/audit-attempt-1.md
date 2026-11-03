# QB TOP10_REAUDIT — head-to-head 02: Lamar Jackson vs Brock Purdy (Grok Bot analyst, attempt 1)

EA ratings not used. Evidence: PFF 2026/2025, nflverse stats and play-by-play, FTN charting.

```json
{
  "audit_id": "QB_REAUDIT_H2H_02_A1",
  "task_id": "QB_REAUDIT_H2H_02",
  "task_type": "pair_audit",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "QB",
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "players": [
    "Lamar Jackson",
    "Brock Purdy"
  ],
  "pair_result": {
    "winner": "Brock Purdy",
    "loser": "Lamar Jackson",
    "provisional_order_holds": false,
    "reasoning": "Jackson's 2026 is the best per-play line in the group (PFF 91.3, EPA/dropback +.354) but only 5 games; his 2025 was PFF 74.0 (#20), EPA/dropback +.054. Purdy is top-6 by PFF both seasons (86.1 / 85.4) with +.290 / +.214 EPA/dropback and lower sack rate (3.2%). Weighting both seasons by sample, Purdy is the better QB.",
    "key_evidence_for_winner": [
      "Brock Purdy PFF overall 2026 86.1 (#4), 2025 85.4 (#6)",
      "Brock Purdy 2026: 7 games, EPA/dropback +0.290, EPA/play incl. rush +0.310, CPOE +4.3, 15 TD / 4 INT, sack 3.2%, Y/A 8.28, rush EPA +14.4",
      "Brock Purdy 2025: 9 games, EPA/dropback +0.214, EPA/play incl. rush +0.242, CPOE +7.2, 20 TD / 10 INT",
      "Brock Purdy FTN interception-worthy rate 2.9% (2026), 3.8% (2025)"
    ],
    "key_evidence_for_loser": [
      "Lamar Jackson PFF overall 2026 91.3 (#2), 2025 74.0 (#20)",
      "Lamar Jackson 2026: 5 games, EPA/dropback +0.354, EPA/play incl. rush +0.338, CPOE +7.4, 6 TD / 1 INT, sack 6.7%, Y/A 9.97, rush EPA +4.9",
      "Lamar Jackson 2025: 13 games, EPA/dropback +0.054, EPA/play incl. rush +0.096, CPOE +1.8, 21 TD / 7 INT",
      "Lamar Jackson FTN interception-worthy rate 3.2% (2026), 2.0% (2025)"
    ],
    "margin": "NARROW",
    "proposed_rating_adjustment": "Lamar Jackson 87 -> 85 (RATE_02 revision A2): Purdy's two-season consistency beats Jackson's 5-game 2026 peak plus weak 2025; INJ 70 -> 68 for 7 missed games across 2025-26",
    "adjustment_status": "PENDING_COMMISSIONER_REVIEW (drafted as an add-only revision, not run, not approved)"
  },
  "major_flags": [
    "PENDING_REVIEW: pair result not approved (card t30s8)",
    "RATING_CONTRADICTION: verdict reverses rating order"
  ],
  "locked_control_conflict": false
}
```
