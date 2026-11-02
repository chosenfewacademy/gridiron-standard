# QB TOP10_REAUDIT — pair 03 (rank 5 vs 6): Dak Prescott vs Drake Maye (Grok Bot analyst, attempt 1)

EA ratings not used. Evidence: 2026 wk1-8 and 2025 PFF grades, nflverse 2026/2025 player stats (retrieved 2026-11-02).

```json
{
  "audit_id": "QB_REAUDIT_PAIR_03_A1",
  "task_id": "QB_REAUDIT_PAIR_03",
  "task_type": "pair_audit",
  "audit_type": "TOP10_REAUDIT",
  "position": "QB",
  "methodology_version": "1.1.0",
  "confidence": "LOW",
  "players": ["Dak Prescott", "Drake Maye"],
  "pair_result": {
    "winner": "Dak Prescott",
    "loser": "Drake Maye",
    "provisional_order_holds": true,
    "key_evidence_for_winner": ["2026 PFF overall 86.2 vs 81.3", "2025 PFF overall 86.9 vs 80.7 (grade edge both seasons)", "2026 INT 5 vs 8", "Both 8 games (no availability gap)"],
    "key_evidence_for_loser": ["2026 EPA/dropback+rush .231 vs .167", "2025 EPA/play .276 vs .153", "2026 CPOE +7.3 vs +0.2", "2026 Y/A 8.47 vs 6.77", "2026 rushing EPA 16.0; age 24.1 vs 33.2"],
    "margin": "NARROW"
  },
  "major_flags": ["GRADE_VS_EFFICIENCY_SPLIT"],
  "locked_control_conflict": false
}
```

On the weighted method (45% 2026 PFF, 30% 2026 EPA, 25% 2025 PFF) Prescott's two-season grade edge narrowly
outweighs Maye's clear efficiency lead (EPA, CPOE, Y/A in both seasons). The measures disagree, so confidence is LOW.
Note: the locked baseline had Maye #4 over Prescott #6; this provisional order reverses that.
