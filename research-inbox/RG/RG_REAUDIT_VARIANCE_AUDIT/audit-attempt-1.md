# RG_REAUDIT_VARIANCE_AUDIT (v1.1.2; authorized t46u)

```json
{
  "audit_id": "RG_REAUDIT_VARIANCE_AUDIT_A1",
  "task_id": "RG_REAUDIT_VARIANCE_AUDIT",
  "task_type": "variance_audit",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "RG",
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "players": [
    "Chris Lindstrom",
    "Quinn Meinerz",
    "Jonah Jackson",
    "Tyler Booker",
    "Dalton Risner",
    "Joe Tippmann",
    "Sam Cosmi",
    "Trey Smith",
    "Mason McCormick",
    "Dominick Puni",
    "Mike Onwenu",
    "Kevin Dotson",
    "Ed Ingram"
  ],
  "variance_gaps": [
    {
      "player": "Chris Lindstrom",
      "attr": "PBF",
      "madden": 82,
      "ours": 92,
      "delta": 10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 88.3 (2025) / 88.1 (2026); pass/run-block snaps 2026 258/219",
        "ESPN 2026: IOL PBWR 91%, IOL RBWR 76%",
        "penalties 5 (2025) / 1 (2026); games 17 / 8; injuries {'2025': ['wk10 Questionable (Foot)', 'wk11 Questionable (Foot)', 'wk12 Questionable (Foot)', 'wk13 Questionable (Foot)'], '2026': ['wk2 Questionable (Concussion)']}"
      ],
      "basis": "ESPN PBWR + PFF overall"
    },
    {
      "player": "Quinn Meinerz",
      "attr": "RBF",
      "madden": 99,
      "ours": 82,
      "delta": -17,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF 89 (2025) / 83.4 (2026); pass/run-block snaps 2026 296/194",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 1 (2025) / 1 (2026); games 17 / 8; injuries none"
      ],
      "basis": "ESPN RBWR + run share",
      "proposed_revision": {
        "attr": "RBF",
        "from": 82,
        "to": 88,
        "why": "PFF #1 G in 2025 (89.0) on 442 run-block snaps and 83.4 in 2026: a power-first style, but 82 (-17) under-rates a two-year top-5 run blocker; 88 keeps him power-first (RBP 95)",
        "task_id": "RG_REAUDIT_RATE_02",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Quinn Meinerz",
      "attr": "LBK",
      "madden": 96,
      "ours": 84,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 89 (2025) / 83.4 (2026); pass/run-block snaps 2026 296/194",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 1 (2025) / 1 (2026); games 17 / 8; injuries none"
      ],
      "basis": "run share + RBWR"
    },
    {
      "player": "Dalton Risner",
      "attr": "RBF",
      "madden": 80,
      "ours": 91,
      "delta": 11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 69.4 (2025) / 81.4 (2026); pass/run-block snaps 2026 303/142",
        "ESPN 2026: IOL RBWR 82%",
        "penalties 4 (2025) / 1 (2026); games 14 / 7; injuries {'2025': ['wk9 Questionable (Illness)'], '2026': ['wk4 Questionable (Knee)']}"
      ],
      "basis": "ESPN RBWR + run share"
    },
    {
      "player": "Joe Tippmann",
      "attr": "AWR",
      "madden": 83,
      "ours": 72,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 66 (2025) / 82.4 (2026); pass/run-block snaps 2026 293/201",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 7 (2025) / 3 (2026); games 17 / 8; injuries {'2025': ['wk18 Questionable (Hip)']}"
      ],
      "basis": "penalty count (discipline) and PFF overall"
    },
    {
      "player": "Sam Cosmi",
      "attr": "INJ",
      "madden": 88,
      "ours": 74,
      "delta": -14,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 76.3 (2025) / 76.5 (2026); pass/run-block snaps 2026 211/114",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 1 (2025) / 1 (2026); games None / None; injuries {'2025': ['wk5 Out (Knee)', 'wk6 Doubtful (Knee)', 'wk7 Questionable (Knee)'], '2026': ['wk3 Out (Concussion)', 'wk4 Out (Concussion)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Trey Smith",
      "attr": "OVR",
      "madden": 93,
      "ours": 78,
      "delta": -15,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 68.5 (2025) / 77 (2026); pass/run-block snaps 2026 270/173",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 2 (2025) / 4 (2026); games 12 / 7; injuries {'2025': ['wk8 Doubtful (Back)', 'wk9 Questionable (Back)', 'wk13 Out (Ankle)', 'wk14 Doubtful (Ankle)', 'wk15 Out (Ankle)', 'wk18 Out (Ankle)']}",
        "approved H2H/tiebreak chain (6 head-to-heads + 6 tiebreaks) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Trey Smith",
      "attr": "AWR",
      "madden": 93,
      "ours": 78,
      "delta": -15,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF 68.5 (2025) / 77 (2026); pass/run-block snaps 2026 270/173",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 2 (2025) / 4 (2026); games 12 / 7; injuries {'2025': ['wk8 Doubtful (Back)', 'wk9 Questionable (Back)', 'wk13 Out (Ankle)', 'wk14 Doubtful (Ankle)', 'wk15 Out (Ankle)', 'wk18 Out (Ankle)']}"
      ],
      "basis": "penalty count (discipline) and PFF overall",
      "proposed_revision": {
        "attr": "AWR",
        "from": 78,
        "to": 82,
        "why": "6 accepted penalties over two seasons (2 / 4), the same as Dotson (82); 78 over-weights the 2026 half-season",
        "task_id": "RG_REAUDIT_RATE_08",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Trey Smith",
      "attr": "INJ",
      "madden": 92,
      "ours": 76,
      "delta": -16,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 68.5 (2025) / 77 (2026); pass/run-block snaps 2026 270/173",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 2 (2025) / 4 (2026); games 12 / 7; injuries {'2025': ['wk8 Doubtful (Back)', 'wk9 Questionable (Back)', 'wk13 Out (Ankle)', 'wk14 Doubtful (Ankle)', 'wk15 Out (Ankle)', 'wk18 Out (Ankle)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Trey Smith",
      "attr": "RBK",
      "madden": 94,
      "ours": 84,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 68.5 (2025) / 77 (2026); pass/run-block snaps 2026 270/173",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 2 (2025) / 4 (2026); games 12 / 7; injuries {'2025': ['wk8 Doubtful (Back)', 'wk9 Questionable (Back)', 'wk13 Out (Ankle)', 'wk14 Doubtful (Ankle)', 'wk15 Out (Ankle)', 'wk18 Out (Ankle)']}"
      ],
      "basis": "PFF overall + ESPN RBWR + run share"
    },
    {
      "player": "Trey Smith",
      "attr": "RBF",
      "madden": 95,
      "ours": 80,
      "delta": -15,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 68.5 (2025) / 77 (2026); pass/run-block snaps 2026 270/173",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 2 (2025) / 4 (2026); games 12 / 7; injuries {'2025': ['wk8 Doubtful (Back)', 'wk9 Questionable (Back)', 'wk13 Out (Ankle)', 'wk14 Doubtful (Ankle)', 'wk15 Out (Ankle)', 'wk18 Out (Ankle)']}"
      ],
      "basis": "ESPN RBWR + run share"
    },
    {
      "player": "Mike Onwenu",
      "attr": "OVR",
      "madden": 86,
      "ours": 75,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 77.2 (2025) / 73 (2026); pass/run-block snaps 2026 52/34",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 3 (2025) / 0 (2026); games None / None; injuries {'2025': ['wk4 Questionable (Shoulder)']}",
        "approved H2H/tiebreak chain (6 head-to-heads + 6 tiebreaks) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Mike Onwenu",
      "attr": "INJ",
      "madden": 89,
      "ours": 76,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 77.2 (2025) / 73 (2026); pass/run-block snaps 2026 52/34",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 3 (2025) / 0 (2026); games None / None; injuries {'2025': ['wk4 Questionable (Shoulder)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Mike Onwenu",
      "attr": "RBF",
      "madden": 82,
      "ours": 72,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 77.2 (2025) / 73 (2026); pass/run-block snaps 2026 52/34",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 3 (2025) / 0 (2026); games None / None; injuries {'2025': ['wk4 Questionable (Shoulder)']}"
      ],
      "basis": "ESPN RBWR + run share"
    },
    {
      "player": "Kevin Dotson",
      "attr": "OVR",
      "madden": 90,
      "ours": 74,
      "delta": -16,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 87.3 (2025) / 60.8 (2026); pass/run-block snaps 2026 347/206",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 3 (2025) / 3 (2026); games 15 / 8; injuries {'2025': ['wk17 Out (Ankle)', 'wk18 Out (Ankle)', 'wk19 Out (Ankle)']}",
        "approved H2H/tiebreak chain (6 head-to-heads + 6 tiebreaks) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Kevin Dotson",
      "attr": "AWR",
      "madden": 95,
      "ours": 82,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 87.3 (2025) / 60.8 (2026); pass/run-block snaps 2026 347/206",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 3 (2025) / 3 (2026); games 15 / 8; injuries {'2025': ['wk17 Out (Ankle)', 'wk18 Out (Ankle)', 'wk19 Out (Ankle)']}"
      ],
      "basis": "penalty count (discipline) and PFF overall"
    },
    {
      "player": "Kevin Dotson",
      "attr": "RBF",
      "madden": 92,
      "ours": 82,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 87.3 (2025) / 60.8 (2026); pass/run-block snaps 2026 347/206",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 3 (2025) / 3 (2026); games 15 / 8; injuries {'2025': ['wk17 Out (Ankle)', 'wk18 Out (Ankle)', 'wk19 Out (Ankle)']}"
      ],
      "basis": "ESPN RBWR + run share"
    },
    {
      "player": "Ed Ingram",
      "attr": "INJ",
      "madden": 91,
      "ours": 76,
      "delta": -15,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 73.9 (2025) / 68.5 (2026); pass/run-block snaps 2026 196/121",
        "ESPN 2026: outside ESPN IOL top-20 PBWR / top-10 RBWR",
        "penalties 2 (2025) / 2 (2026); games 14 / 5; injuries {'2025': ['wk1 Questionable (Abdomen)', 'wk10 Out (Knee)', 'wk11 Questionable (Knee)'], '2026': ['wk2 Out (Groin)', 'wk3 Out (Groin)', 'wk4 Questionable (Groin)', 'wk5 Questionable (Illness)']}"
      ],
      "basis": "availability: injury reports and games missed"
    }
  ],
  "madden_used_as_evidence": false,
  "madden_order_verified": false,
  "variance_threshold": 10,
  "metrics_used": [
    "PFF G overall grades 2025-26",
    "PFF pass-block/run-block snap counts (sub-grades, pressures and sacks allowed paywalled)",
    "ESPN IOL PBWR/RBWR 2026 (top-20/top-10 lists)",
    "accepted penalties (nflverse pbp)",
    "games/snaps",
    "injury reports and roster status",
    "depth-chart RG snapshots"
  ],
  "evidence_fixes_applied_before_audit": [],
  "drafted_fixes_pending_review": [
    {
      "player": "Quinn Meinerz",
      "attr": "RBF",
      "from": 82,
      "to": 88,
      "why": "PFF #1 G in 2025 (89.0) on 442 run-block snaps and 83.4 in 2026: a power-first style, but 82 (-17) under-rates a two-year top-5 run blocker; 88 keeps him power-first (RBP 95)",
      "task_id": "RG_REAUDIT_RATE_02",
      "status": "PROPOSED_NOT_APPROVED"
    },
    {
      "player": "Trey Smith",
      "attr": "AWR",
      "from": 78,
      "to": 82,
      "why": "6 accepted penalties over two seasons (2 / 4), the same as Dotson (82); 78 over-weights the 2026 half-season",
      "task_id": "RG_REAUDIT_RATE_08",
      "status": "PROPOSED_NOT_APPROVED"
    }
  ],
  "summary": "Every overall and attribute rating 10+ from Madden 27 audited (t46u): 18 gaps (16 below Madden, 2 above). 16 SUPPORTED on RG evidence; 2 ADJUST with drafted add-only revisions NOT approved or applied: Quinn Meinerz RBF 82->88; Trey Smith AWR 78->82. 3 OVR gaps: Trey Smith -15, Mike Onwenu -11, Kevin Dotson -16. Overalls unchanged by the drafts. Madden is reference only.",
  "major_flags": [
    "VARIANCE_FIXES_DRAFTED_PENDING_COMMISSIONER_REVIEW"
  ],
  "locked_control_conflict": false
}
```
