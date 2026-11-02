# QB TOP10_REAUDIT — pair 02 (rank 3 vs 4): Brock Purdy vs Lamar Jackson (Grok Bot analyst, attempt 1)

EA ratings not used. Evidence: 2026 wk1-8 and 2025 PFF grades, nflverse 2026/2025 player stats (retrieved 2026-11-02).

```json
{
  "audit_id": "QB_REAUDIT_PAIR_02_A1",
  "task_id": "QB_REAUDIT_PAIR_02",
  "task_type": "pair_audit",
  "audit_type": "TOP10_REAUDIT",
  "position": "QB",
  "methodology_version": "1.1.0",
  "confidence": "LOW",
  "players": ["Brock Purdy", "Lamar Jackson"],
  "pair_result": {
    "winner": "Brock Purdy",
    "loser": "Lamar Jackson",
    "provisional_order_holds": true,
    "key_evidence_for_winner": ["2025 PFF overall 85.4 vs 74.0 (two-season stability)", "Availability 2026: 7 games vs 5", "Sack rate 2026 7/218 (3.2%) vs 7/104 (6.7%)", "Rushing EPA 2026 14.4 vs 4.9", "1748 yds 15 TD / 4 INT"],
    "key_evidence_for_loser": ["2026 PFF overall 91.3 vs 86.1", "2026 EPA/dropback+rush .338 vs .310", "2026 Y/A 9.97 vs 8.28", "CPOE +7.4 vs +4.3", "1 INT in 5 games"],
    "margin": "NARROW"
  },
  "major_flags": ["AVAILABILITY: Lamar Jackson 5 games", "PAIR_NEAR_TIE"],
  "locked_control_conflict": false
}
```

Near tie on the weighted method (45% 2026 PFF, 30% 2026 EPA, 25% 2025 PFF). Jackson is better per play in 2026,
but on a 5-game sample after a weak 2025; Purdy's two-season level and availability keep him #3 at LOW confidence.
