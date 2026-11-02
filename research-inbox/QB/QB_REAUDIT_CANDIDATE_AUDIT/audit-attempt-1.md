# QB TOP10_REAUDIT — Stage 1 CANDIDATE AUDIT (Addendum v1.1.2) — Grok Bot analyst, attempt 1

Pool: data/candidate-pools/QB.reaudit.json (APPROVED, 20 candidates). EA/Madden values are reference only:
never evidence, never a rating input. Earlier-order records (provisional Top 10, pairs 1-3) cited as early inputs only.

```json
{
  "audit_id": "QB_REAUDIT_CANDIDATE_AUDIT_A1",
  "task_id": "QB_REAUDIT_CANDIDATE_AUDIT",
  "task_type": "candidate_audit",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "QB",
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "membership_confirmed": true,
  "missing_top_players": [],
  "coverage_check": "Every player in the PFF 2026 top 20, PFF 2025 top 15 and nflverse 2026 snap/stat leaders is either in the pool or listed in pool exclusions/injured with a reason.",
  "contention_set": ["Joe Burrow", "Lamar Jackson", "Dak Prescott", "Brock Purdy", "Josh Allen", "Jared Goff", "Drake Maye", "Geno Smith", "C.J. Stroud", "Patrick Mahomes", "Jordan Love", "Trevor Lawrence", "Matthew Stafford", "Kirk Cousins", "Caleb Williams"],
  "contention_basis": "PFF 2026 (wk1-8) top 10 + PFF 2025 top 10 + 2026 EPA/play leaders + every locked-baseline and provisional-proposal member still in the pool.",
  "excluded": [
    {"player": "Bryce Young", "reason": "PFF 2026 #11; 23 sacks on 292 dropbacks; no top-10 case on 2025 or EPA"},
    {"player": "Jayden Daniels", "reason": "5 games 2026 (availability flag); no 2026 grade/EPA in top-12; kept as outside control"},
    {"player": "Cam Ward", "reason": "PFF 2026 #14; rookie-year sample; no top-10 case"},
    {"player": "Jacoby Brissett", "reason": "PFF 2026 #16; no multi-year top-10 case"},
    {"player": "Tyler Shough", "reason": "PFF 2026 #18; limited sample"}
  ],
  "flags": {
    "injured": ["Jalen Hurts (IR, outside pool)", "Jaxson Dart (IR, outside pool)"],
    "free_agents": [],
    "limited_sample": ["Lamar Jackson: 5 games 2026", "Caleb Williams: 4 games 2026", "Jayden Daniels: 5 games 2026"],
    "locked_members_outside_pool": ["Justin Herbert (BELOW_CUTOFF, PFF 2026 43.6)", "Sam Darnold (BELOW_CUTOFF, PFF 2026 66.8)"],
    "sharp_decline": ["Matthew Stafford: locked #1, PFF 92.0 (2025) -> 66.8 (2026)"]
  },
  "caleb_williams_note": "In contention by commissioner direction: 2026 CPOE +9.0 (tied 1st) on 4 games; his rating stage must carry a limited-sample confidence cap.",
  "madden_reference": [{"player": "Caleb Williams", "ovr": 94, "reference_only": true, "used_as_evidence": false, "source": "commissioner-provided Madden reference"}],
  "early_inputs": ["QB_REAUDIT_PROVISIONAL_TOP10_A1", "QB_REAUDIT_PAIR_01_A1", "QB_REAUDIT_PAIR_02_A1", "QB_REAUDIT_PAIR_03_A1"],
  "external_controls": ["Jayden Daniels", "Bryce Young"],
  "major_flags": ["LOCKED_MEMBERS_OUTSIDE_POOL: Herbert, Darnold", "LIMITED_SAMPLE_IN_CONTENTION: Jackson, C. Williams"],
  "locked_control_conflict": true
}
```
