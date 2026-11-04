# LG_REAUDIT_VARIANCE_AUDIT (v1.1.2; authorized t46u/t50s441)

```json
{
  "audit_id": "LG_REAUDIT_VARIANCE_AUDIT_A1",
  "task_id": "LG_REAUDIT_VARIANCE_AUDIT",
  "task_type": "variance_audit",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "LG",
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "players": [
    "Quenton Nelson",
    "Damien Lewis",
    "Joe Thuney",
    "Steve Avila",
    "Peter Skoronski",
    "Dylan Parham",
    "Christian Mahogany",
    "Tyler Smith",
    "Matthew Bergeron",
    "Ezra Cleveland",
    "Isaac Seumalo",
    "David Edwards",
    "Alijah Vera-Tucker"
  ],
  "variance_gaps": [
    {
      "player": "Damien Lewis",
      "attr": "INJ",
      "madden": 91,
      "ours": 74,
      "delta": -17,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 77.3 (2025) / 80.7 (2026); pass/run-block snaps 2026 202/107",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 5 (2025) / 0 (2026); games 16 / 5; injuries {'2025': ['wk7 Questionable (Shoulder)', 'wk9 Questionable (Oblique)'], '2026': ['wk4 Out (Elbow)', 'wk6 Questionable (Elbow)', 'wk8 Out (Knee)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Joe Thuney",
      "attr": "OVR",
      "madden": 96,
      "ours": 84,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 77.8 (2025) / 70.7 (2026); pass/run-block snaps 2026 335/265",
        "ESPN 2026: IOL PBWR 93%",
        "penalties 2 (2025) / 0 (2026); games 17 / 8; injuries none",
        "approved H2H/tiebreak chain (6 head-to-heads + 8 tiebreaks) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Joe Thuney",
      "attr": "IBL",
      "madden": 90,
      "ours": 78,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 77.8 (2025) / 70.7 (2026); pass/run-block snaps 2026 335/265",
        "ESPN 2026: IOL PBWR 93%",
        "penalties 2 (2025) / 0 (2026); games 17 / 8; injuries none"
      ],
      "basis": "ESPN RBWR + PFF overall"
    },
    {
      "player": "Peter Skoronski",
      "attr": "AGI",
      "madden": 58,
      "ours": 74,
      "delta": 16,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF 79.0 (2025) / 66.3 (2026); pass/run-block snaps 2026 283/175",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 3 (2025) / 0 (2026); games 17 / 8; injuries none"
      ],
      "basis": "movement (no tracking data public); LOW confidence",
      "proposed_revision": {
        "attr": "AGI",
        "from": 74,
        "to": 66,
        "why": "no public tracking data; LOW-confidence movement trait cannot carry a +16 gap - pass-heavy 694-snap 2025 supports above-average feet, not 74",
        "task_id": "LG_REAUDIT_RATE_05",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Peter Skoronski",
      "attr": "RBP",
      "madden": 86,
      "ours": 76,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 79.0 (2025) / 66.3 (2026); pass/run-block snaps 2026 283/175",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 3 (2025) / 0 (2026); games 17 / 8; injuries none"
      ],
      "basis": "ESPN RBWR + run share"
    },
    {
      "player": "Peter Skoronski",
      "attr": "IBL",
      "madden": 88,
      "ours": 78,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 79.0 (2025) / 66.3 (2026); pass/run-block snaps 2026 283/175",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 3 (2025) / 0 (2026); games 17 / 8; injuries none"
      ],
      "basis": "ESPN RBWR + PFF overall"
    },
    {
      "player": "Dylan Parham",
      "attr": "AGI",
      "madden": 58,
      "ours": 72,
      "delta": 14,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF 63.5 (2025) / 87.9 (2026); pass/run-block snaps 2026 143/100",
        "ESPN 2026: IOL RBWR 77%",
        "penalties 5 (2025) / 1 (2026); games 15 / 4; injuries {'2025': ['wk14 Questionable (Back)', 'wk18 Out (Illness)'], '2026': ['wk4 Out (Knee)', 'wk5 Out (Knee)', 'wk6 Out (Knee)', 'wk7 Questionable (Knee)', 'wk8 Questionable (Knee)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence",
      "proposed_revision": {
        "attr": "AGI",
        "from": 72,
        "to": 66,
        "why": "ESPN IOL RBWR 77% supports a mobile puller, but no tracking data and 243 2026 snaps cannot carry a +14 movement gap",
        "task_id": "LG_REAUDIT_RATE_06",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Dylan Parham",
      "attr": "INJ",
      "madden": 92,
      "ours": 70,
      "delta": -22,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 63.5 (2025) / 87.9 (2026); pass/run-block snaps 2026 143/100",
        "ESPN 2026: IOL RBWR 77%",
        "penalties 5 (2025) / 1 (2026); games 15 / 4; injuries {'2025': ['wk14 Questionable (Back)', 'wk18 Out (Illness)'], '2026': ['wk4 Out (Knee)', 'wk5 Out (Knee)', 'wk6 Out (Knee)', 'wk7 Questionable (Knee)', 'wk8 Questionable (Knee)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Christian Mahogany",
      "attr": "INJ",
      "madden": 87,
      "ours": 76,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 59.1 (2025) / 79.6 (2026); pass/run-block snaps 2026 197/156",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 2 (2025) / 1 (2026); games 11 / 6; injuries {'2025': ['wk15 Out (Fibula)', 'wk16 Questionable (Fibula)', 'wk17 Questionable (Fibula)', 'wk18 Questionable (Illness)'], '2026': ['wk2 Out (Hip)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Tyler Smith",
      "attr": "OVR",
      "madden": 89,
      "ours": 76,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 73.4 (2025) / 71.9 (2026); pass/run-block snaps 2026 177/102",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 7 (2025) / 0 (2026); games 16 / 4; injuries {'2025': ['wk5 Questionable (Knee)', 'wk6 Questionable (Knee)'], '2026': ['wk5 Questionable (Thumb)']}",
        "approved H2H/tiebreak chain (6 head-to-heads + 8 tiebreaks) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Tyler Smith",
      "attr": "AWR",
      "madden": 89,
      "ours": 68,
      "delta": -21,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF 73.4 (2025) / 71.9 (2026); pass/run-block snaps 2026 177/102",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 7 (2025) / 0 (2026); games 16 / 4; injuries {'2025': ['wk5 Questionable (Knee)', 'wk6 Questionable (Knee)'], '2026': ['wk5 Questionable (Thumb)']}"
      ],
      "basis": "penalty count (discipline) and PFF overall",
      "proposed_revision": {
        "attr": "AWR",
        "from": 68,
        "to": 74,
        "why": "7 accepted penalties in 2025 but 0 in 2026 (280 snaps); 68 over-weights one season",
        "task_id": "LG_REAUDIT_RATE_08",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Tyler Smith",
      "attr": "INJ",
      "madden": 94,
      "ours": 82,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 73.4 (2025) / 71.9 (2026); pass/run-block snaps 2026 177/102",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 7 (2025) / 0 (2026); games 16 / 4; injuries {'2025': ['wk5 Questionable (Knee)', 'wk6 Questionable (Knee)'], '2026': ['wk5 Questionable (Thumb)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Tyler Smith",
      "attr": "PBF",
      "madden": 83,
      "ours": 72,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 73.4 (2025) / 71.9 (2026); pass/run-block snaps 2026 177/102",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 7 (2025) / 0 (2026); games 16 / 4; injuries {'2025': ['wk5 Questionable (Knee)', 'wk6 Questionable (Knee)'], '2026': ['wk5 Questionable (Thumb)']}"
      ],
      "basis": "ESPN PBWR + PFF overall"
    },
    {
      "player": "Tyler Smith",
      "attr": "RBF",
      "madden": 90,
      "ours": 79,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 73.4 (2025) / 71.9 (2026); pass/run-block snaps 2026 177/102",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 7 (2025) / 0 (2026); games 16 / 4; injuries {'2025': ['wk5 Questionable (Knee)', 'wk6 Questionable (Knee)'], '2026': ['wk5 Questionable (Thumb)']}"
      ],
      "basis": "ESPN RBWR + run share"
    },
    {
      "player": "Isaac Seumalo",
      "attr": "AWR",
      "madden": 87,
      "ours": 76,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 73.3 (2025) / 63.2 (2026); pass/run-block snaps 2026 381/199",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 0 (2025) / 5 (2026); games 14 / 8; injuries {'2025': ['wk10 Out (Pectoral)', 'wk11 Questionable (Pectoral)', 'wk16 Out (Triceps)', 'wk17 Questionable (Triceps)'], '2026': ['wk2 Questionable (Shoulder)']}"
      ],
      "basis": "penalty count (discipline) and PFF overall"
    },
    {
      "player": "Isaac Seumalo",
      "attr": "INJ",
      "madden": 84,
      "ours": 74,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 73.3 (2025) / 63.2 (2026); pass/run-block snaps 2026 381/199",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 0 (2025) / 5 (2026); games 14 / 8; injuries {'2025': ['wk10 Out (Pectoral)', 'wk11 Questionable (Pectoral)', 'wk16 Out (Triceps)', 'wk17 Questionable (Triceps)'], '2026': ['wk2 Questionable (Shoulder)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "David Edwards",
      "attr": "PBK",
      "madden": 83,
      "ours": 71,
      "delta": -12,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF 70.3 (2025) / 59.6 (2026); pass/run-block snaps 2026 316/164",
        "ESPN 2026: IOL RBWR 77%",
        "penalties 2 (2025) / 1 (2026); games 16 / 7; injuries none"
      ],
      "basis": "PFF overall + ESPN PBWR",
      "proposed_revision": {
        "attr": "PBK",
        "from": 71,
        "to": 74,
        "why": "2026 PFF 59.6 on 316 pass-block snaps, but 2025 PFF 70.3 on 679 pass-block snaps and 0-1 holding calls; 71 over-weights 2026",
        "task_id": "LG_REAUDIT_RATE_12",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "David Edwards",
      "attr": "PBF",
      "madden": 84,
      "ours": 74,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 70.3 (2025) / 59.6 (2026); pass/run-block snaps 2026 316/164",
        "ESPN 2026: IOL RBWR 77%",
        "penalties 2 (2025) / 1 (2026); games 16 / 7; injuries none"
      ],
      "basis": "ESPN PBWR + PFF overall"
    },
    {
      "player": "Alijah Vera-Tucker",
      "attr": "OVR",
      "madden": 83,
      "ours": 70,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF None (2025) / 68.2 (2026); pass/run-block snaps 2026 213/149",
        "ESPN 2026: IOL PBWR 92%",
        "penalties 0 (2025) / 2 (2026); games None / 6; injuries {'2025': ['wk1 Out (Triceps)'], '2026': ['wk7 Out (Hamstring)']}",
        "approved H2H/tiebreak chain (6 head-to-heads + 8 tiebreaks) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Alijah Vera-Tucker",
      "attr": "INJ",
      "madden": 77,
      "ours": 58,
      "delta": -19,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF None (2025) / 68.2 (2026); pass/run-block snaps 2026 213/149",
        "ESPN 2026: IOL PBWR 92%",
        "penalties 0 (2025) / 2 (2026); games None / 6; injuries {'2025': ['wk1 Out (Triceps)'], '2026': ['wk7 Out (Hamstring)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Alijah Vera-Tucker",
      "attr": "RBF",
      "madden": 88,
      "ours": 76,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF None (2025) / 68.2 (2026); pass/run-block snaps 2026 213/149",
        "ESPN 2026: IOL PBWR 92%",
        "penalties 0 (2025) / 2 (2026); games None / 6; injuries {'2025': ['wk1 Out (Triceps)'], '2026': ['wk7 Out (Hamstring)']}"
      ],
      "basis": "ESPN RBWR + run share"
    },
    {
      "player": "Alijah Vera-Tucker",
      "attr": "IBL",
      "madden": 93,
      "ours": 82,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF None (2025) / 68.2 (2026); pass/run-block snaps 2026 213/149",
        "ESPN 2026: IOL PBWR 92%",
        "penalties 0 (2025) / 2 (2026); games None / 6; injuries {'2025': ['wk1 Out (Triceps)'], '2026': ['wk7 Out (Hamstring)']}"
      ],
      "basis": "ESPN RBWR + PFF overall"
    },
    {
      "player": "Alijah Vera-Tucker",
      "attr": "LBK",
      "madden": 91,
      "ours": 80,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF None (2025) / 68.2 (2026); pass/run-block snaps 2026 213/149",
        "ESPN 2026: IOL PBWR 92%",
        "penalties 0 (2025) / 2 (2026); games None / 6; injuries {'2025': ['wk1 Out (Triceps)'], '2026': ['wk7 Out (Hamstring)']}"
      ],
      "basis": "run share + RBWR"
    }
  ],
  "madden_used_as_evidence": false,
  "madden_order_verified": false,
  "variance_threshold": 10,
  "metrics_used": [
    "PFF T overall grades 2025-26",
    "PFF pass-block/run-block snap counts (sub-grades, pressures and sacks allowed paywalled)",
    "ESPN IOL PBWR/RBWR 2026 (top-20/top-10 lists)",
    "accepted penalties (nflverse pbp)",
    "games/snaps",
    "injury reports and roster status",
    "depth-chart side"
  ],
  "evidence_fixes_applied_before_audit": [],
  "drafted_fixes_pending_review": [
    {
      "player": "Peter Skoronski",
      "attr": "AGI",
      "from": 74,
      "to": 66,
      "why": "no public tracking data; LOW-confidence movement trait cannot carry a +16 gap - pass-heavy 694-snap 2025 supports above-average feet, not 74",
      "task_id": "LG_REAUDIT_RATE_05",
      "status": "PROPOSED_NOT_APPROVED"
    },
    {
      "player": "Dylan Parham",
      "attr": "AGI",
      "from": 72,
      "to": 66,
      "why": "ESPN IOL RBWR 77% supports a mobile puller, but no tracking data and 243 2026 snaps cannot carry a +14 movement gap",
      "task_id": "LG_REAUDIT_RATE_06",
      "status": "PROPOSED_NOT_APPROVED"
    },
    {
      "player": "Tyler Smith",
      "attr": "AWR",
      "from": 68,
      "to": 74,
      "why": "7 accepted penalties in 2025 but 0 in 2026 (280 snaps); 68 over-weights one season",
      "task_id": "LG_REAUDIT_RATE_08",
      "status": "PROPOSED_NOT_APPROVED"
    },
    {
      "player": "David Edwards",
      "attr": "PBK",
      "from": 71,
      "to": 74,
      "why": "2026 PFF 59.6 on 316 pass-block snaps, but 2025 PFF 70.3 on 679 pass-block snaps and 0-1 holding calls; 71 over-weights 2026",
      "task_id": "LG_REAUDIT_RATE_12",
      "status": "PROPOSED_NOT_APPROVED"
    }
  ],
  "summary": "Every overall and attribute rating 10+ from Madden 27 audited (t46u/t50s441): 23 gaps (21 below Madden, 2 above). 19 SUPPORTED on LT evidence; 4 ADJUST with drafted add-only revisions NOT approved or applied: Peter Skoronski AGI 74->66; Dylan Parham AGI 72->66; Tyler Smith AWR 68->74; David Edwards PBK 71->74. 3 OVR gaps: Joe Thuney -12, Tyler Smith -13, Alijah Vera-Tucker -13. Overalls unchanged by the drafts. Madden is reference only.",
  "major_flags": [
    "VARIANCE_FIXES_DRAFTED_PENDING_COMMISSIONER_REVIEW"
  ],
  "locked_control_conflict": false
}
```
