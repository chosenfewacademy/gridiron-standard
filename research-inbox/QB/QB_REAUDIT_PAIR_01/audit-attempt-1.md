# QB TOP10_REAUDIT — pair 01 (rank 1 vs 2): Joe Burrow vs Josh Allen (Grok Bot analyst, attempt 1)

EA ratings not used. Evidence: 2026 wk1-8 and 2025 PFF grades, nflverse 2026/2025 player stats (retrieved 2026-11-02).

```json
{
  "audit_id": "QB_REAUDIT_PAIR_01_A1",
  "task_id": "QB_REAUDIT_PAIR_01",
  "task_type": "pair_audit",
  "audit_type": "TOP10_REAUDIT",
  "position": "QB",
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "players": ["Joe Burrow", "Josh Allen"],
  "pair_result": {
    "winner": "Joe Burrow",
    "loser": "Josh Allen",
    "provisional_order_holds": true,
    "key_evidence_for_winner": ["2026 PFF overall 93.3 vs 84.4", "2025 PFF overall 91.8 vs 90.6 (edge both seasons)", "2026 CPOE +9.0 vs +4.0", "2026 20 TD / 6 INT vs 11 TD / 5 INT", "Passing EPA total 68.0 vs 59.4"],
    "key_evidence_for_loser": ["2026 EPA/dropback+rush .291 vs .232", "2026 Y/A 8.75 vs 7.92", "+270 rushing yards (designed-run value)"],
    "margin": "MODERATE"
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```

Burrow keeps #1: he leads on PFF grade in both seasons and on accuracy (CPOE), while Allen's edge is
efficiency per play driven partly by rushing. The split between grade-based and EPA-based measures keeps
confidence at MEDIUM. Matches the locked order (Burrow #2 over Allen #3).
