# LT_REAUDIT_VARIANCE_AUDIT (v1.1.2; authorized t45s413)

```json
{
  "audit_id": "LT_REAUDIT_VARIANCE_AUDIT_A1",
  "task_id": "LT_REAUDIT_VARIANCE_AUDIT",
  "task_type": "variance_audit",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "LT",
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "players": [
    "Penei Sewell",
    "Trent Williams",
    "Jordan Mailata",
    "Tristan Wirfs",
    "Garett Bolles",
    "Andrew Thomas",
    "Alaric Jackson",
    "Bernhard Raimann",
    "Charles Cross",
    "Dion Dawkins",
    "Paris Johnson Jr.",
    "Will Campbell",
    "Kolton Miller",
    "Laremy Tunsil"
  ],
  "variance_gaps": [
    {
      "player": "Trent Williams",
      "attr": "SPD",
      "madden": 78,
      "ours": 68,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 91.1 (2025) / 86.2 (2026); pass/run-block snaps 2026 233/162",
        "ESPN 2026: PBWR 92%",
        "penalties 4 (2025) / 4 (2026); games 16 / 7; injuries {'2025': ['wk2 Questionable (Knee)', 'wk18 Questionable (Hamstring)', 'wk19 Questionable (Hamstring)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Trent Williams",
      "attr": "COD",
      "madden": 58,
      "ours": 68,
      "delta": 10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 91.1 (2025) / 86.2 (2026); pass/run-block snaps 2026 233/162",
        "ESPN 2026: PBWR 92%",
        "penalties 4 (2025) / 4 (2026); games 16 / 7; injuries {'2025': ['wk2 Questionable (Knee)', 'wk18 Questionable (Hamstring)', 'wk19 Questionable (Hamstring)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Trent Williams",
      "attr": "INJ",
      "madden": 88,
      "ours": 78,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 91.1 (2025) / 86.2 (2026); pass/run-block snaps 2026 233/162",
        "ESPN 2026: PBWR 92%",
        "penalties 4 (2025) / 4 (2026); games 16 / 7; injuries {'2025': ['wk2 Questionable (Knee)', 'wk18 Questionable (Hamstring)', 'wk19 Questionable (Hamstring)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Jordan Mailata",
      "attr": "SPD",
      "madden": 76,
      "ours": 66,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 87.7 (2025) / 84.6 (2026); pass/run-block snaps 2026 328/175",
        "ESPN 2026: PBWR 90%, RBWR 80%",
        "penalties 6 (2025) / 4 (2026); games 16 / 8; injuries none"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Jordan Mailata",
      "attr": "RBF",
      "madden": 91,
      "ours": 80,
      "delta": -11,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF 87.7 (2025) / 84.6 (2026); pass/run-block snaps 2026 328/175",
        "ESPN 2026: PBWR 90%, RBWR 80%",
        "penalties 6 (2025) / 4 (2026); games 16 / 8; injuries none"
      ],
      "basis": "ESPN RBWR + run share",
      "proposed_revision": {
        "attr": "RBF",
        "from": 80,
        "to": 84,
        "why": "ESPN RBWR 80% (#10 OT) shows more run-block finesse than 80",
        "task_id": "LT_REAUDIT_RATE_03",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Jordan Mailata",
      "attr": "LBK",
      "madden": 98,
      "ours": 84,
      "delta": -14,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF 87.7 (2025) / 84.6 (2026); pass/run-block snaps 2026 328/175",
        "ESPN 2026: PBWR 90%, RBWR 80%",
        "penalties 6 (2025) / 4 (2026); games 16 / 8; injuries none"
      ],
      "basis": "run share + RBWR",
      "proposed_revision": {
        "attr": "LBK",
        "from": 84,
        "to": 88,
        "why": "top-10 RBWR and 443 run-block snaps (2025) support a stronger move/lead block",
        "task_id": "LT_REAUDIT_RATE_03",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Tristan Wirfs",
      "attr": "AGI",
      "madden": 65,
      "ours": 80,
      "delta": 15,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 92.7 (2025) / 78.8 (2026); pass/run-block snaps 2026 279/234",
        "ESPN 2026: PBWR 92%",
        "penalties 4 (2025) / 3 (2026); games 12 / 8; injuries {'2025': ['wk1 Out (Knee)', 'wk2 Out (Knee)', 'wk3 Out (Knee)', 'wk4 Questionable (Knee)', 'wk14 Questionable (Oblique)', 'wk17 Out (Toe)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Tristan Wirfs",
      "attr": "COD",
      "madden": 57,
      "ours": 76,
      "delta": 19,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 92.7 (2025) / 78.8 (2026); pass/run-block snaps 2026 279/234",
        "ESPN 2026: PBWR 92%",
        "penalties 4 (2025) / 3 (2026); games 12 / 8; injuries {'2025': ['wk1 Out (Knee)', 'wk2 Out (Knee)', 'wk3 Out (Knee)', 'wk4 Questionable (Knee)', 'wk14 Questionable (Oblique)', 'wk17 Out (Toe)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Tristan Wirfs",
      "attr": "INJ",
      "madden": 95,
      "ours": 72,
      "delta": -23,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 92.7 (2025) / 78.8 (2026); pass/run-block snaps 2026 279/234",
        "ESPN 2026: PBWR 92%",
        "penalties 4 (2025) / 3 (2026); games 12 / 8; injuries {'2025': ['wk1 Out (Knee)', 'wk2 Out (Knee)', 'wk3 Out (Knee)', 'wk4 Questionable (Knee)', 'wk14 Questionable (Oblique)', 'wk17 Out (Toe)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Garett Bolles",
      "attr": "OVR",
      "madden": 96,
      "ours": 85,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 90.3 (2025) / 81.1 (2026); pass/run-block snaps 2026 296/196",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 6 (2025) / 5 (2026); games 17 / 8; injuries {'2026': ['wk8 Questionable (Hip)']}",
        "approved H2H/tiebreak chain (20 LT pairs) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Garett Bolles",
      "attr": "COD",
      "madden": 56,
      "ours": 74,
      "delta": 18,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 90.3 (2025) / 81.1 (2026); pass/run-block snaps 2026 296/196",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 6 (2025) / 5 (2026); games 17 / 8; injuries {'2026': ['wk8 Questionable (Hip)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Garett Bolles",
      "attr": "AWR",
      "madden": 97,
      "ours": 85,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 90.3 (2025) / 81.1 (2026); pass/run-block snaps 2026 296/196",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 6 (2025) / 5 (2026); games 17 / 8; injuries {'2026': ['wk8 Questionable (Hip)']}"
      ],
      "basis": "penalty count (discipline) and PFF overall"
    },
    {
      "player": "Garett Bolles",
      "attr": "PBP",
      "madden": 94,
      "ours": 82,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 90.3 (2025) / 81.1 (2026); pass/run-block snaps 2026 296/196",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 6 (2025) / 5 (2026); games 17 / 8; injuries {'2026': ['wk8 Questionable (Hip)']}"
      ],
      "basis": "PFF overall + ESPN PBWR + pass-pro share"
    },
    {
      "player": "Andrew Thomas",
      "attr": "OVR",
      "madden": 95,
      "ours": 82,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 90.3 (2025) / 74.8 (2026); pass/run-block snaps 2026 266/199",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 2 (2025) / 1 (2026); games 13 / 7; injuries {'2025': ['wk1 Doubtful (Foot)', 'wk2 Doubtful (Foot)', 'wk3 Questionable (Foot)', 'wk17 Out (Hamstring)'], '2026': ['wk6 Questionable (Groin)']}",
        "approved H2H/tiebreak chain (20 LT pairs) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Andrew Thomas",
      "attr": "INJ",
      "madden": 83,
      "ours": 70,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 90.3 (2025) / 74.8 (2026); pass/run-block snaps 2026 266/199",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 2 (2025) / 1 (2026); games 13 / 7; injuries {'2025': ['wk1 Doubtful (Foot)', 'wk2 Doubtful (Foot)', 'wk3 Questionable (Foot)', 'wk17 Out (Hamstring)'], '2026': ['wk6 Questionable (Groin)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Andrew Thomas",
      "attr": "PBP",
      "madden": 97,
      "ours": 84,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 90.3 (2025) / 74.8 (2026); pass/run-block snaps 2026 266/199",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 2 (2025) / 1 (2026); games 13 / 7; injuries {'2025': ['wk1 Doubtful (Foot)', 'wk2 Doubtful (Foot)', 'wk3 Questionable (Foot)', 'wk17 Out (Hamstring)'], '2026': ['wk6 Questionable (Groin)']}"
      ],
      "basis": "PFF overall + ESPN PBWR + pass-pro share"
    },
    {
      "player": "Andrew Thomas",
      "attr": "IBL",
      "madden": 93,
      "ours": 80,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 90.3 (2025) / 74.8 (2026); pass/run-block snaps 2026 266/199",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 2 (2025) / 1 (2026); games 13 / 7; injuries {'2025': ['wk1 Doubtful (Foot)', 'wk2 Doubtful (Foot)', 'wk3 Questionable (Foot)', 'wk17 Out (Hamstring)'], '2026': ['wk6 Questionable (Groin)']}"
      ],
      "basis": "ESPN RBWR + PFF overall"
    },
    {
      "player": "Alaric Jackson",
      "attr": "COD",
      "madden": 50,
      "ours": 60,
      "delta": 10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 84.2 (2025) / 75.4 (2026); pass/run-block snaps 2026 310/188",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 3 (2025) / 4 (2026); games 16 / 7; injuries {'2025': ['wk17 Questionable (Knee)', 'wk18 Questionable (Knee)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Alaric Jackson",
      "attr": "RBF",
      "madden": 92,
      "ours": 78,
      "delta": -14,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 84.2 (2025) / 75.4 (2026); pass/run-block snaps 2026 310/188",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 3 (2025) / 4 (2026); games 16 / 7; injuries {'2025': ['wk17 Questionable (Knee)', 'wk18 Questionable (Knee)']}"
      ],
      "basis": "ESPN RBWR + run share"
    },
    {
      "player": "Bernhard Raimann",
      "attr": "STR",
      "madden": 92,
      "ours": 80,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 82.0 (2025) / 76.5 (2026); pass/run-block snaps 2026 309/208",
        "ESPN 2026: RBWR 81%",
        "penalties 7 (2025) / 1 (2026); games 16 / 8; injuries {'2025': ['wk16 Out (Elbow)']}"
      ],
      "basis": "anchor/power profile from PFF + ESPN"
    },
    {
      "player": "Bernhard Raimann",
      "attr": "AGI",
      "madden": 72,
      "ours": 82,
      "delta": 10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 82.0 (2025) / 76.5 (2026); pass/run-block snaps 2026 309/208",
        "ESPN 2026: RBWR 81%",
        "penalties 7 (2025) / 1 (2026); games 16 / 8; injuries {'2025': ['wk16 Out (Elbow)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Bernhard Raimann",
      "attr": "COD",
      "madden": 59,
      "ours": 74,
      "delta": 15,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 82.0 (2025) / 76.5 (2026); pass/run-block snaps 2026 309/208",
        "ESPN 2026: RBWR 81%",
        "penalties 7 (2025) / 1 (2026); games 16 / 8; injuries {'2025': ['wk16 Out (Elbow)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Bernhard Raimann",
      "attr": "PBK",
      "madden": 88,
      "ours": 76,
      "delta": -12,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF 82.0 (2025) / 76.5 (2026); pass/run-block snaps 2026 309/208",
        "ESPN 2026: RBWR 81%",
        "penalties 7 (2025) / 1 (2026); games 16 / 8; injuries {'2025': ['wk16 Out (Elbow)']}"
      ],
      "basis": "PFF overall + ESPN PBWR",
      "proposed_revision": {
        "attr": "PBK",
        "from": 76,
        "to": 79,
        "why": "309 of 517 2026 snaps in pass pro at PFF 76.5 with 1 penalty; 76 understates it",
        "task_id": "LT_REAUDIT_RATE_08",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Bernhard Raimann",
      "attr": "PBP",
      "madden": 91,
      "ours": 74,
      "delta": -17,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 82.0 (2025) / 76.5 (2026); pass/run-block snaps 2026 309/208",
        "ESPN 2026: RBWR 81%",
        "penalties 7 (2025) / 1 (2026); games 16 / 8; injuries {'2025': ['wk16 Out (Elbow)']}"
      ],
      "basis": "PFF overall + ESPN PBWR + pass-pro share"
    },
    {
      "player": "Bernhard Raimann",
      "attr": "IBL",
      "madden": 91,
      "ours": 80,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 82.0 (2025) / 76.5 (2026); pass/run-block snaps 2026 309/208",
        "ESPN 2026: RBWR 81%",
        "penalties 7 (2025) / 1 (2026); games 16 / 8; injuries {'2025': ['wk16 Out (Elbow)']}"
      ],
      "basis": "ESPN RBWR + PFF overall"
    },
    {
      "player": "Charles Cross",
      "attr": "AGI",
      "madden": 56,
      "ours": 74,
      "delta": 18,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 77.6 (2025) / 78.1 (2026); pass/run-block snaps 2026 261/191",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 5 (2025) / 0 (2026); games 14 / 7; injuries {'2025': ['wk16 Out (Hamstring)', 'wk17 Out (Hamstring)', 'wk18 Out (Hamstring)'], '2026': ['wk8 Out (Ankle)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Charles Cross",
      "attr": "COD",
      "madden": 60,
      "ours": 70,
      "delta": 10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 77.6 (2025) / 78.1 (2026); pass/run-block snaps 2026 261/191",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 5 (2025) / 0 (2026); games 14 / 7; injuries {'2025': ['wk16 Out (Hamstring)', 'wk17 Out (Hamstring)', 'wk18 Out (Hamstring)'], '2026': ['wk8 Out (Ankle)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Charles Cross",
      "attr": "INJ",
      "madden": 91,
      "ours": 74,
      "delta": -17,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 77.6 (2025) / 78.1 (2026); pass/run-block snaps 2026 261/191",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 5 (2025) / 0 (2026); games 14 / 7; injuries {'2025': ['wk16 Out (Hamstring)', 'wk17 Out (Hamstring)', 'wk18 Out (Hamstring)'], '2026': ['wk8 Out (Ankle)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Dion Dawkins",
      "attr": "OVR",
      "madden": 89,
      "ours": 76,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 71.7 (2025) / 80.3 (2026); pass/run-block snaps 2026 265/200",
        "ESPN 2026: PBWR 88%, RBWR 82%",
        "penalties 10 (2025) / 4 (2026); games 15 / 7; injuries {'2025': ['wk13 Out (Concussion)']}",
        "approved H2H/tiebreak chain (20 LT pairs) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Dion Dawkins",
      "attr": "AGI",
      "madden": 78,
      "ours": 64,
      "delta": -14,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 71.7 (2025) / 80.3 (2026); pass/run-block snaps 2026 265/200",
        "ESPN 2026: PBWR 88%, RBWR 82%",
        "penalties 10 (2025) / 4 (2026); games 15 / 7; injuries {'2025': ['wk13 Out (Concussion)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Dion Dawkins",
      "attr": "COD",
      "madden": 52,
      "ours": 62,
      "delta": 10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 71.7 (2025) / 80.3 (2026); pass/run-block snaps 2026 265/200",
        "ESPN 2026: PBWR 88%, RBWR 82%",
        "penalties 10 (2025) / 4 (2026); games 15 / 7; injuries {'2025': ['wk13 Out (Concussion)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Dion Dawkins",
      "attr": "AWR",
      "madden": 97,
      "ours": 70,
      "delta": -27,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF 71.7 (2025) / 80.3 (2026); pass/run-block snaps 2026 265/200",
        "ESPN 2026: PBWR 88%, RBWR 82%",
        "penalties 10 (2025) / 4 (2026); games 15 / 7; injuries {'2025': ['wk13 Out (Concussion)']}"
      ],
      "basis": "penalty count (discipline) and PFF overall",
      "proposed_revision": {
        "attr": "AWR",
        "from": 70,
        "to": 74,
        "why": "penalties fell 10 -> 4 (2026 pace) and PFF rose to 80.3",
        "task_id": "LT_REAUDIT_RATE_10",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Dion Dawkins",
      "attr": "PBF",
      "madden": 87,
      "ours": 74,
      "delta": -13,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF 71.7 (2025) / 80.3 (2026); pass/run-block snaps 2026 265/200",
        "ESPN 2026: PBWR 88%, RBWR 82%",
        "penalties 10 (2025) / 4 (2026); games 15 / 7; injuries {'2025': ['wk13 Out (Concussion)']}"
      ],
      "basis": "ESPN PBWR + PFF overall",
      "proposed_revision": {
        "attr": "PBF",
        "from": 74,
        "to": 80,
        "why": "ESPN PBWR 88% (2026) supports better pass-pro finesse than 74",
        "task_id": "LT_REAUDIT_RATE_10",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Paris Johnson Jr.",
      "attr": "OVR",
      "madden": 86,
      "ours": 75,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 76.6 (2025) / 77.6 (2026); pass/run-block snaps 2026 174/103",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 6 (2025) / 3 (2026); games None / None; injuries {'2025': ['wk3 Questionable (Knee)', 'wk4 Questionable (Knee)', 'wk15 Out (Knee)', 'wk16 Out (Knee)', 'wk17 Out (Knee)']}",
        "approved H2H/tiebreak chain (20 LT pairs) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Paris Johnson Jr.",
      "attr": "INJ",
      "madden": 93,
      "ours": 64,
      "delta": -29,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 76.6 (2025) / 77.6 (2026); pass/run-block snaps 2026 174/103",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 6 (2025) / 3 (2026); games None / None; injuries {'2025': ['wk3 Questionable (Knee)', 'wk4 Questionable (Knee)', 'wk15 Out (Knee)', 'wk16 Out (Knee)', 'wk17 Out (Knee)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Paris Johnson Jr.",
      "attr": "PBK",
      "madden": 90,
      "ours": 80,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 76.6 (2025) / 77.6 (2026); pass/run-block snaps 2026 174/103",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 6 (2025) / 3 (2026); games None / None; injuries {'2025': ['wk3 Questionable (Knee)', 'wk4 Questionable (Knee)', 'wk15 Out (Knee)', 'wk16 Out (Knee)', 'wk17 Out (Knee)']}"
      ],
      "basis": "PFF overall + ESPN PBWR"
    },
    {
      "player": "Paris Johnson Jr.",
      "attr": "RBK",
      "madden": 85,
      "ours": 74,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 76.6 (2025) / 77.6 (2026); pass/run-block snaps 2026 174/103",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 6 (2025) / 3 (2026); games None / None; injuries {'2025': ['wk3 Questionable (Knee)', 'wk4 Questionable (Knee)', 'wk15 Out (Knee)', 'wk16 Out (Knee)', 'wk17 Out (Knee)']}"
      ],
      "basis": "PFF overall + ESPN RBWR + run share"
    },
    {
      "player": "Paris Johnson Jr.",
      "attr": "RBF",
      "madden": 86,
      "ours": 72,
      "delta": -14,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 76.6 (2025) / 77.6 (2026); pass/run-block snaps 2026 174/103",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 6 (2025) / 3 (2026); games None / None; injuries {'2025': ['wk3 Questionable (Knee)', 'wk4 Questionable (Knee)', 'wk15 Out (Knee)', 'wk16 Out (Knee)', 'wk17 Out (Knee)']}"
      ],
      "basis": "ESPN RBWR + run share"
    },
    {
      "player": "Paris Johnson Jr.",
      "attr": "IBL",
      "madden": 90,
      "ours": 74,
      "delta": -16,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 76.6 (2025) / 77.6 (2026); pass/run-block snaps 2026 174/103",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 6 (2025) / 3 (2026); games None / None; injuries {'2025': ['wk3 Questionable (Knee)', 'wk4 Questionable (Knee)', 'wk15 Out (Knee)', 'wk16 Out (Knee)', 'wk17 Out (Knee)']}"
      ],
      "basis": "ESPN RBWR + PFF overall"
    },
    {
      "player": "Paris Johnson Jr.",
      "attr": "LBK",
      "madden": 88,
      "ours": 72,
      "delta": -16,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 76.6 (2025) / 77.6 (2026); pass/run-block snaps 2026 174/103",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 6 (2025) / 3 (2026); games None / None; injuries {'2025': ['wk3 Questionable (Knee)', 'wk4 Questionable (Knee)', 'wk15 Out (Knee)', 'wk16 Out (Knee)', 'wk17 Out (Knee)']}"
      ],
      "basis": "run share + RBWR"
    },
    {
      "player": "Will Campbell",
      "attr": "AGI",
      "madden": 71,
      "ours": 82,
      "delta": 11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 66.7 (2025) / 76.8 (2026); pass/run-block snaps 2026 274/200",
        "ESPN 2026: RBWR 81%",
        "penalties 5 (2025) / 5 (2026); games 13 / 8; injuries {'2025': ['wk1 Questionable (Ankle)'], '2026': ['wk6 Questionable (Knee)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Will Campbell",
      "attr": "COD",
      "madden": 58,
      "ours": 78,
      "delta": 20,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 66.7 (2025) / 76.8 (2026); pass/run-block snaps 2026 274/200",
        "ESPN 2026: RBWR 81%",
        "penalties 5 (2025) / 5 (2026); games 13 / 8; injuries {'2025': ['wk1 Questionable (Ankle)'], '2026': ['wk6 Questionable (Knee)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Will Campbell",
      "attr": "AWR",
      "madden": 87,
      "ours": 72,
      "delta": -15,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 66.7 (2025) / 76.8 (2026); pass/run-block snaps 2026 274/200",
        "ESPN 2026: RBWR 81%",
        "penalties 5 (2025) / 5 (2026); games 13 / 8; injuries {'2025': ['wk1 Questionable (Ankle)'], '2026': ['wk6 Questionable (Knee)']}"
      ],
      "basis": "penalty count (discipline) and PFF overall"
    },
    {
      "player": "Will Campbell",
      "attr": "PBP",
      "madden": 82,
      "ours": 72,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 66.7 (2025) / 76.8 (2026); pass/run-block snaps 2026 274/200",
        "ESPN 2026: RBWR 81%",
        "penalties 5 (2025) / 5 (2026); games 13 / 8; injuries {'2025': ['wk1 Questionable (Ankle)'], '2026': ['wk6 Questionable (Knee)']}"
      ],
      "basis": "PFF overall + ESPN PBWR + pass-pro share"
    },
    {
      "player": "Kolton Miller",
      "attr": "OVR",
      "madden": 93,
      "ours": 73,
      "delta": -20,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF None (2025) / 69.8 (2026); pass/run-block snaps 2026 338/204",
        "ESPN 2026: PBWR 92%",
        "penalties 0 (2025) / 0 (2026); games 4 / 8; injuries {'2025': ['wk15 Out (Ankle)', 'wk16 Out (Ankle)', 'wk17 Out (Ankle)']}",
        "approved H2H/tiebreak chain (20 LT pairs) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Kolton Miller",
      "attr": "COD",
      "madden": 57,
      "ours": 72,
      "delta": 15,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF None (2025) / 69.8 (2026); pass/run-block snaps 2026 338/204",
        "ESPN 2026: PBWR 92%",
        "penalties 0 (2025) / 0 (2026); games 4 / 8; injuries {'2025': ['wk15 Out (Ankle)', 'wk16 Out (Ankle)', 'wk17 Out (Ankle)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Kolton Miller",
      "attr": "AWR",
      "madden": 96,
      "ours": 85,
      "delta": -11,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF None (2025) / 69.8 (2026); pass/run-block snaps 2026 338/204",
        "ESPN 2026: PBWR 92%",
        "penalties 0 (2025) / 0 (2026); games 4 / 8; injuries {'2025': ['wk15 Out (Ankle)', 'wk16 Out (Ankle)', 'wk17 Out (Ankle)']}"
      ],
      "basis": "penalty count (discipline) and PFF overall",
      "proposed_revision": {
        "attr": "AWR",
        "from": 85,
        "to": 88,
        "why": "0 accepted penalties in 2025-26 and PBWR 92% (#5 OT): discipline is a strength",
        "task_id": "LT_REAUDIT_RATE_14",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Kolton Miller",
      "attr": "INJ",
      "madden": 89,
      "ours": 70,
      "delta": -19,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF None (2025) / 69.8 (2026); pass/run-block snaps 2026 338/204",
        "ESPN 2026: PBWR 92%",
        "penalties 0 (2025) / 0 (2026); games 4 / 8; injuries {'2025': ['wk15 Out (Ankle)', 'wk16 Out (Ankle)', 'wk17 Out (Ankle)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Kolton Miller",
      "attr": "PBP",
      "madden": 94,
      "ours": 84,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF None (2025) / 69.8 (2026); pass/run-block snaps 2026 338/204",
        "ESPN 2026: PBWR 92%",
        "penalties 0 (2025) / 0 (2026); games 4 / 8; injuries {'2025': ['wk15 Out (Ankle)', 'wk16 Out (Ankle)', 'wk17 Out (Ankle)']}"
      ],
      "basis": "PFF overall + ESPN PBWR + pass-pro share"
    },
    {
      "player": "Kolton Miller",
      "attr": "RBK",
      "madden": 85,
      "ours": 69,
      "delta": -16,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF None (2025) / 69.8 (2026); pass/run-block snaps 2026 338/204",
        "ESPN 2026: PBWR 92%",
        "penalties 0 (2025) / 0 (2026); games 4 / 8; injuries {'2025': ['wk15 Out (Ankle)', 'wk16 Out (Ankle)', 'wk17 Out (Ankle)']}"
      ],
      "basis": "PFF overall + ESPN RBWR + run share"
    },
    {
      "player": "Kolton Miller",
      "attr": "RBP",
      "madden": 87,
      "ours": 72,
      "delta": -15,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF None (2025) / 69.8 (2026); pass/run-block snaps 2026 338/204",
        "ESPN 2026: PBWR 92%",
        "penalties 0 (2025) / 0 (2026); games 4 / 8; injuries {'2025': ['wk15 Out (Ankle)', 'wk16 Out (Ankle)', 'wk17 Out (Ankle)']}"
      ],
      "basis": "ESPN RBWR + run share"
    },
    {
      "player": "Kolton Miller",
      "attr": "RBF",
      "madden": 83,
      "ours": 70,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF None (2025) / 69.8 (2026); pass/run-block snaps 2026 338/204",
        "ESPN 2026: PBWR 92%",
        "penalties 0 (2025) / 0 (2026); games 4 / 8; injuries {'2025': ['wk15 Out (Ankle)', 'wk16 Out (Ankle)', 'wk17 Out (Ankle)']}"
      ],
      "basis": "ESPN RBWR + run share"
    },
    {
      "player": "Kolton Miller",
      "attr": "IBL",
      "madden": 88,
      "ours": 70,
      "delta": -18,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF None (2025) / 69.8 (2026); pass/run-block snaps 2026 338/204",
        "ESPN 2026: PBWR 92%",
        "penalties 0 (2025) / 0 (2026); games 4 / 8; injuries {'2025': ['wk15 Out (Ankle)', 'wk16 Out (Ankle)', 'wk17 Out (Ankle)']}"
      ],
      "basis": "ESPN RBWR + PFF overall"
    },
    {
      "player": "Kolton Miller",
      "attr": "LBK",
      "madden": 84,
      "ours": 66,
      "delta": -18,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF None (2025) / 69.8 (2026); pass/run-block snaps 2026 338/204",
        "ESPN 2026: PBWR 92%",
        "penalties 0 (2025) / 0 (2026); games 4 / 8; injuries {'2025': ['wk15 Out (Ankle)', 'wk16 Out (Ankle)', 'wk17 Out (Ankle)']}"
      ],
      "basis": "run share + RBWR"
    },
    {
      "player": "Laremy Tunsil",
      "attr": "OVR",
      "madden": 94,
      "ours": 72,
      "delta": -22,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 84.7 (2025) / None (2026); pass/run-block snaps 2026 None/None",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 5 (2025) / 0 (2026); games 14 / None; injuries {'2025': ['wk9 Questionable (Hamstring)', 'wk16 Out (Oblique)', 'wk17 Out (Oblique)', 'wk18 Out (Oblique)']}",
        "approved H2H/tiebreak chain (20 LT pairs) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Laremy Tunsil",
      "attr": "COD",
      "madden": 53,
      "ours": 70,
      "delta": 17,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 84.7 (2025) / None (2026); pass/run-block snaps 2026 None/None",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 5 (2025) / 0 (2026); games 14 / None; injuries {'2025': ['wk9 Questionable (Hamstring)', 'wk16 Out (Oblique)', 'wk17 Out (Oblique)', 'wk18 Out (Oblique)']}"
      ],
      "basis": "movement (no tracking data public); LOW confidence"
    },
    {
      "player": "Laremy Tunsil",
      "attr": "AWR",
      "madden": 95,
      "ours": 84,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 84.7 (2025) / None (2026); pass/run-block snaps 2026 None/None",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 5 (2025) / 0 (2026); games 14 / None; injuries {'2025': ['wk9 Questionable (Hamstring)', 'wk16 Out (Oblique)', 'wk17 Out (Oblique)', 'wk18 Out (Oblique)']}"
      ],
      "basis": "penalty count (discipline) and PFF overall"
    },
    {
      "player": "Laremy Tunsil",
      "attr": "INJ",
      "madden": 92,
      "ours": 50,
      "delta": -42,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 84.7 (2025) / None (2026); pass/run-block snaps 2026 None/None",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 5 (2025) / 0 (2026); games 14 / None; injuries {'2025': ['wk9 Questionable (Hamstring)', 'wk16 Out (Oblique)', 'wk17 Out (Oblique)', 'wk18 Out (Oblique)']}"
      ],
      "basis": "availability: injury reports and games missed"
    },
    {
      "player": "Laremy Tunsil",
      "attr": "STA",
      "madden": 90,
      "ours": 70,
      "delta": -20,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 84.7 (2025) / None (2026); pass/run-block snaps 2026 None/None",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 5 (2025) / 0 (2026); games 14 / None; injuries {'2025': ['wk9 Questionable (Hamstring)', 'wk16 Out (Oblique)', 'wk17 Out (Oblique)', 'wk18 Out (Oblique)']}"
      ],
      "basis": "snaps/games"
    },
    {
      "player": "Laremy Tunsil",
      "attr": "IBL",
      "madden": 94,
      "ours": 80,
      "delta": -14,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 84.7 (2025) / None (2026); pass/run-block snaps 2026 None/None",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 5 (2025) / 0 (2026); games 14 / None; injuries {'2025': ['wk9 Questionable (Hamstring)', 'wk16 Out (Oblique)', 'wk17 Out (Oblique)', 'wk18 Out (Oblique)']}"
      ],
      "basis": "ESPN RBWR + PFF overall"
    },
    {
      "player": "Laremy Tunsil",
      "attr": "LBK",
      "madden": 85,
      "ours": 72,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF 84.7 (2025) / None (2026); pass/run-block snaps 2026 None/None",
        "ESPN 2026: outside ESPN OT top-20 PBWR / top-10 RBWR",
        "penalties 5 (2025) / 0 (2026); games 14 / None; injuries {'2025': ['wk9 Questionable (Hamstring)', 'wk16 Out (Oblique)', 'wk17 Out (Oblique)', 'wk18 Out (Oblique)']}"
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
    "ESPN PBWR/RBWR 2026 (top-20/top-10 lists)",
    "accepted penalties (nflverse pbp)",
    "games/snaps",
    "injury reports and roster status",
    "depth-chart side"
  ],
  "evidence_fixes_applied_before_audit": [],
  "drafted_fixes_pending_review": [
    {
      "player": "Jordan Mailata",
      "attr": "RBF",
      "from": 80,
      "to": 84,
      "why": "ESPN RBWR 80% (#10 OT) shows more run-block finesse than 80",
      "task_id": "LT_REAUDIT_RATE_03",
      "status": "PROPOSED_NOT_APPROVED"
    },
    {
      "player": "Jordan Mailata",
      "attr": "LBK",
      "from": 84,
      "to": 88,
      "why": "top-10 RBWR and 443 run-block snaps (2025) support a stronger move/lead block",
      "task_id": "LT_REAUDIT_RATE_03",
      "status": "PROPOSED_NOT_APPROVED"
    },
    {
      "player": "Bernhard Raimann",
      "attr": "PBK",
      "from": 76,
      "to": 79,
      "why": "309 of 517 2026 snaps in pass pro at PFF 76.5 with 1 penalty; 76 understates it",
      "task_id": "LT_REAUDIT_RATE_08",
      "status": "PROPOSED_NOT_APPROVED"
    },
    {
      "player": "Dion Dawkins",
      "attr": "AWR",
      "from": 70,
      "to": 74,
      "why": "penalties fell 10 -> 4 (2026 pace) and PFF rose to 80.3",
      "task_id": "LT_REAUDIT_RATE_10",
      "status": "PROPOSED_NOT_APPROVED"
    },
    {
      "player": "Dion Dawkins",
      "attr": "PBF",
      "from": 74,
      "to": 80,
      "why": "ESPN PBWR 88% (2026) supports better pass-pro finesse than 74",
      "task_id": "LT_REAUDIT_RATE_10",
      "status": "PROPOSED_NOT_APPROVED"
    },
    {
      "player": "Kolton Miller",
      "attr": "AWR",
      "from": 85,
      "to": 88,
      "why": "0 accepted penalties in 2025-26 and PBWR 92% (#5 OT): discipline is a strength",
      "task_id": "LT_REAUDIT_RATE_14",
      "status": "PROPOSED_NOT_APPROVED"
    }
  ],
  "summary": "Every overall and attribute rating 10+ from Madden 27 audited (t45s413): 61 gaps (47 below Madden, 14 above). 55 SUPPORTED on LT evidence; 6 ADJUST with drafted add-only revisions NOT approved or applied: Jordan Mailata RBF 80->84; Jordan Mailata LBK 84->88; Bernhard Raimann PBK 76->79; Dion Dawkins AWR 70->74; Dion Dawkins PBF 74->80; Kolton Miller AWR 85->88. 6 OVR gaps: Garett Bolles -11, Andrew Thomas -13, Dion Dawkins -13, Paris Johnson Jr. -11, Kolton Miller -20, Laremy Tunsil -22. Overalls unchanged by the drafts. Madden is reference only.",
  "major_flags": [
    "VARIANCE_FIXES_DRAFTED_PENDING_COMMISSIONER_REVIEW"
  ],
  "locked_control_conflict": false
}
```
