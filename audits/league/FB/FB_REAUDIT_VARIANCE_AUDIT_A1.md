# FB_REAUDIT_VARIANCE_AUDIT (v1.1.2; authorized t46u)

```json
{
  "audit_id": "FB_REAUDIT_VARIANCE_AUDIT_A1",
  "task_id": "FB_REAUDIT_VARIANCE_AUDIT",
  "task_type": "variance_audit",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "FB",
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "players": [
    "Kyle Juszczyk",
    "Patrick Ricard",
    "Hunter Luepke",
    "Connor Heyward",
    "Adam Prentice",
    "Michael Burton",
    "Reggie Gilliam",
    "Alec Ingold",
    "Andrew Beck",
    "Scott Matlock",
    "Brady Russell",
    "Max Bredeson",
    "DJ Herman"
  ],
  "variance_gaps": [
    {
      "player": "Kyle Juszczyk",
      "attr": "RBF",
      "madden": 58,
      "ours": 70,
      "delta": 12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 64.7 (2025) / 65.8 (2026); run/pass-block snaps 2025 291/21, 2026 99/7; routes 253/74",
        "touches 2025: 2 car / 24 rec 213 yds; 2026: 0 car / 8 rec 76 yds",
        "penalties 0 (2025) / 0 (2026); games 17 / 6; injuries {'2026': ['wk5 Out (Knee)']}; roster ACT"
      ],
      "basis": "PFF FB grade + run-block snaps"
    },
    {
      "player": "Patrick Ricard",
      "attr": "RBK",
      "madden": 73,
      "ours": 84,
      "delta": 11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 68.5 (2025) / 52.6 (2026); run/pass-block snaps 2025 193/48, 2026 137/27; routes 31/18",
        "touches 2025: 1 car / 1 rec 8 yds; 2026: 0 car / 1 rec 1 yds",
        "penalties 1 (2025) / 0 (2026); games 11 / 7; injuries {'2025': ['wk1 Out (Calf)', 'wk2 Out (Calf)', 'wk3 Out (Calf)', 'wk4 Out (Calf)', 'wk5 Out (Calf)', 'wk6 Out (Calf)']}; roster ACT"
      ],
      "basis": "PFF FB grade + run-block snaps"
    },
    {
      "player": "Patrick Ricard",
      "attr": "RBP",
      "madden": 63,
      "ours": 92,
      "delta": 29,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 68.5 (2025) / 52.6 (2026); run/pass-block snaps 2025 193/48, 2026 137/27; routes 31/18",
        "touches 2025: 1 car / 1 rec 8 yds; 2026: 0 car / 1 rec 1 yds",
        "penalties 1 (2025) / 0 (2026); games 11 / 7; injuries {'2025': ['wk1 Out (Calf)', 'wk2 Out (Calf)', 'wk3 Out (Calf)', 'wk4 Out (Calf)', 'wk5 Out (Calf)', 'wk6 Out (Calf)']}; roster ACT"
      ],
      "basis": "PFF FB grade + run-block snaps (lead/iso volume)"
    },
    {
      "player": "Patrick Ricard",
      "attr": "PBK",
      "madden": 70,
      "ours": 82,
      "delta": 12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 68.5 (2025) / 52.6 (2026); run/pass-block snaps 2025 193/48, 2026 137/27; routes 31/18",
        "touches 2025: 1 car / 1 rec 8 yds; 2026: 0 car / 1 rec 1 yds",
        "penalties 1 (2025) / 0 (2026); games 11 / 7; injuries {'2025': ['wk1 Out (Calf)', 'wk2 Out (Calf)', 'wk3 Out (Calf)', 'wk4 Out (Calf)', 'wk5 Out (Calf)', 'wk6 Out (Calf)']}; roster ACT"
      ],
      "basis": "pass-block snaps + PFF FB grade"
    },
    {
      "player": "Patrick Ricard",
      "attr": "IBL",
      "madden": 80,
      "ours": 92,
      "delta": 12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 68.5 (2025) / 52.6 (2026); run/pass-block snaps 2025 193/48, 2026 137/27; routes 31/18",
        "touches 2025: 1 car / 1 rec 8 yds; 2026: 0 car / 1 rec 1 yds",
        "penalties 1 (2025) / 0 (2026); games 11 / 7; injuries {'2025': ['wk1 Out (Calf)', 'wk2 Out (Calf)', 'wk3 Out (Calf)', 'wk4 Out (Calf)', 'wk5 Out (Calf)', 'wk6 Out (Calf)']}; roster ACT"
      ],
      "basis": "PFF FB grade + run-block snaps"
    },
    {
      "player": "Connor Heyward",
      "attr": "SRR",
      "madden": 65,
      "ours": 78,
      "delta": 13,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF FB None (2025) / 60.6 (2026); run/pass-block snaps 2025 None/None, 2026 85/18; routes None/34",
        "touches 2025: 15 car / 3 rec 21 yds; 2026: 5 car / 2 rec 22 yds",
        "penalties 1 (2025) / 2 (2026); games 16 / 8; injuries none; roster ACT"
      ],
      "basis": "routes (PFF) + receptions",
      "proposed_revision": {
        "attr": "SRR",
        "from": 78,
        "to": 74,
        "why": "3-21 (2025) and 2-22 (2026) receiving on 34 FB routes in 2026: SRR 78 (+13) leans on his TE background more than his FB usage supports; 74 keeps him the best route runner among H-backs after Juszczyk",
        "task_id": "FB_REAUDIT_RATE_04",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Connor Heyward",
      "attr": "RBF",
      "madden": 54,
      "ours": 66,
      "delta": 12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB None (2025) / 60.6 (2026); run/pass-block snaps 2025 None/None, 2026 85/18; routes None/34",
        "touches 2025: 15 car / 3 rec 21 yds; 2026: 5 car / 2 rec 22 yds",
        "penalties 1 (2025) / 2 (2026); games 16 / 8; injuries none; roster ACT"
      ],
      "basis": "PFF FB grade + run-block snaps"
    },
    {
      "player": "Adam Prentice",
      "attr": "RBP",
      "madden": 58,
      "ours": 76,
      "delta": 18,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 50 (2025) / 59.9 (2026); run/pass-block snaps 2025 130/25, 2026 30/7; routes 65/21",
        "touches 2025: 10 car / 6 rec 53 yds; 2026: 1 car / 2 rec 12 yds",
        "penalties 0 (2025) / 0 (2026); games 17 / 8; injuries none; roster ACT"
      ],
      "basis": "PFF FB grade + run-block snaps (lead/iso volume)"
    },
    {
      "player": "Adam Prentice",
      "attr": "RBF",
      "madden": 52,
      "ours": 66,
      "delta": 14,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 50 (2025) / 59.9 (2026); run/pass-block snaps 2025 130/25, 2026 30/7; routes 65/21",
        "touches 2025: 10 car / 6 rec 53 yds; 2026: 1 car / 2 rec 12 yds",
        "penalties 0 (2025) / 0 (2026); games 17 / 8; injuries none; roster ACT"
      ],
      "basis": "PFF FB grade + run-block snaps"
    },
    {
      "player": "Michael Burton",
      "attr": "AWR",
      "madden": 66,
      "ours": 82,
      "delta": 16,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF FB None (2025) / 63.2 (2026); run/pass-block snaps 2025 None/None, 2026 47/11; routes None/12",
        "touches 2025: 0 car / 0 rec 0 yds; 2026: 1 car / 0 rec 0 yds",
        "penalties 0 (2025) / 0 (2026); games None / 8; injuries none; roster ACT"
      ],
      "basis": "penalties + PFF FB grade",
      "proposed_revision": {
        "attr": "AWR",
        "from": 82,
        "to": 76,
        "why": "0 penalties and a 63.2 PFF grade, but on only 71 FB snaps in 2026 after a backup year with no PFF FB grade: 82 (+16 over Madden) over-credits a small sample; 76 keeps him a clean, assignment-sound blocker",
        "task_id": "FB_REAUDIT_RATE_06",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Michael Burton",
      "attr": "RBP",
      "madden": 59,
      "ours": 80,
      "delta": 21,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB None (2025) / 63.2 (2026); run/pass-block snaps 2025 None/None, 2026 47/11; routes None/12",
        "touches 2025: 0 car / 0 rec 0 yds; 2026: 1 car / 0 rec 0 yds",
        "penalties 0 (2025) / 0 (2026); games None / 8; injuries none; roster ACT"
      ],
      "basis": "PFF FB grade + run-block snaps (lead/iso volume)"
    },
    {
      "player": "Michael Burton",
      "attr": "IBL",
      "madden": 70,
      "ours": 80,
      "delta": 10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB None (2025) / 63.2 (2026); run/pass-block snaps 2025 None/None, 2026 47/11; routes None/12",
        "touches 2025: 0 car / 0 rec 0 yds; 2026: 1 car / 0 rec 0 yds",
        "penalties 0 (2025) / 0 (2026); games None / 8; injuries none; roster ACT"
      ],
      "basis": "PFF FB grade + run-block snaps"
    },
    {
      "player": "Reggie Gilliam",
      "attr": "OVR",
      "madden": 83,
      "ours": 73,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 72.2 (2025) / 52.3 (2026); run/pass-block snaps 2025 189/28, 2026 41/4; routes 40/13",
        "touches 2025: 2 car / 2 rec 24 yds; 2026: 0 car / 1 rec 4 yds",
        "penalties 0 (2025) / 0 (2026); games 17 / 4; injuries {'2026': ['wk4 Questionable (Knee)', 'wk5 Out (Ankle)']}; roster RES",
        "approved H2H/tiebreak chain (6 head-to-heads + 6 tiebreaks) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Reggie Gilliam",
      "attr": "RBP",
      "madden": 62,
      "ours": 80,
      "delta": 18,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 72.2 (2025) / 52.3 (2026); run/pass-block snaps 2025 189/28, 2026 41/4; routes 40/13",
        "touches 2025: 2 car / 2 rec 24 yds; 2026: 0 car / 1 rec 4 yds",
        "penalties 0 (2025) / 0 (2026); games 17 / 4; injuries {'2026': ['wk4 Questionable (Knee)', 'wk5 Out (Ankle)']}; roster RES"
      ],
      "basis": "PFF FB grade + run-block snaps (lead/iso volume)"
    },
    {
      "player": "Reggie Gilliam",
      "attr": "INJ",
      "madden": 89,
      "ours": 76,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 72.2 (2025) / 52.3 (2026); run/pass-block snaps 2025 189/28, 2026 41/4; routes 40/13",
        "touches 2025: 2 car / 2 rec 24 yds; 2026: 0 car / 1 rec 4 yds",
        "penalties 0 (2025) / 0 (2026); games 17 / 4; injuries {'2026': ['wk4 Questionable (Knee)', 'wk5 Out (Ankle)']}; roster RES"
      ],
      "basis": "availability: injury reports, reserve/IR"
    },
    {
      "player": "Alec Ingold",
      "attr": "RBP",
      "madden": 55,
      "ours": 66,
      "delta": 11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 50.1 (2025) / 50 (2026); run/pass-block snaps 2025 190/44, 2026 73/18; routes 126/27",
        "touches 2025: 2 car / 8 rec 52 yds; 2026: 0 car / 3 rec 35 yds",
        "penalties 1 (2025) / 0 (2026); games 17 / 5; injuries none; roster RES"
      ],
      "basis": "PFF FB grade + run-block snaps (lead/iso volume)"
    },
    {
      "player": "Scott Matlock",
      "attr": "CAR",
      "madden": 70,
      "ours": 40,
      "delta": -30,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 50.5 (2025) / 45.9 (2026); run/pass-block snaps 2025 237/68, 2026 28/14; routes 42/8",
        "touches 2025: 0 car / 4 rec 12 yds; 2026: 0 car / 0 rec 0 yds",
        "penalties 0 (2025) / 1 (2026); games 16 / 3; injuries {'2025': ['wk6 Questionable (Ankle)', 'wk11 Questionable (Chest)'], '2026': ['wk5 Questionable (Foot)']}; roster ACT"
      ],
      "basis": "carries and fumbles 2025-26 (nflverse)"
    },
    {
      "player": "Scott Matlock",
      "attr": "TRK",
      "madden": 40,
      "ours": 50,
      "delta": 10,
      "verdict": "ADJUST",
      "key_stats": [
        "PFF FB 50.5 (2025) / 45.9 (2026); run/pass-block snaps 2025 237/68, 2026 28/14; routes 42/8",
        "touches 2025: 0 car / 4 rec 12 yds; 2026: 0 car / 0 rec 0 yds",
        "penalties 0 (2025) / 1 (2026); games 16 / 3; injuries {'2025': ['wk6 Questionable (Ankle)', 'wk11 Questionable (Chest)'], '2026': ['wk5 Questionable (Foot)']}; roster ACT"
      ],
      "basis": "carries/yards + size",
      "proposed_revision": {
        "attr": "TRK",
        "from": 50,
        "to": 44,
        "why": "0 carries in 2025-26: TRK 50 (+10) credits his 296-lb mass with no ball-carrier evidence; 44 is consistent with CAR 40 / BTK 30",
        "task_id": "FB_REAUDIT_RATE_10",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Scott Matlock",
      "attr": "CTH",
      "madden": 68,
      "ours": 58,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 50.5 (2025) / 45.9 (2026); run/pass-block snaps 2025 237/68, 2026 28/14; routes 42/8",
        "touches 2025: 0 car / 4 rec 12 yds; 2026: 0 car / 0 rec 0 yds",
        "penalties 0 (2025) / 1 (2026); games 16 / 3; injuries {'2025': ['wk6 Questionable (Ankle)', 'wk11 Questionable (Chest)'], '2026': ['wk5 Questionable (Foot)']}; roster ACT"
      ],
      "basis": "receptions/targets"
    },
    {
      "player": "Scott Matlock",
      "attr": "SRR",
      "madden": 58,
      "ours": 46,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 50.5 (2025) / 45.9 (2026); run/pass-block snaps 2025 237/68, 2026 28/14; routes 42/8",
        "touches 2025: 0 car / 4 rec 12 yds; 2026: 0 car / 0 rec 0 yds",
        "penalties 0 (2025) / 1 (2026); games 16 / 3; injuries {'2025': ['wk6 Questionable (Ankle)', 'wk11 Questionable (Chest)'], '2026': ['wk5 Questionable (Foot)']}; roster ACT"
      ],
      "basis": "routes (PFF) + receptions"
    },
    {
      "player": "Scott Matlock",
      "attr": "RBP",
      "madden": 61,
      "ours": 84,
      "delta": 23,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 50.5 (2025) / 45.9 (2026); run/pass-block snaps 2025 237/68, 2026 28/14; routes 42/8",
        "touches 2025: 0 car / 4 rec 12 yds; 2026: 0 car / 0 rec 0 yds",
        "penalties 0 (2025) / 1 (2026); games 16 / 3; injuries {'2025': ['wk6 Questionable (Ankle)', 'wk11 Questionable (Chest)'], '2026': ['wk5 Questionable (Foot)']}; roster ACT"
      ],
      "basis": "PFF FB grade + run-block snaps (lead/iso volume)"
    },
    {
      "player": "Brady Russell",
      "attr": "CAR",
      "madden": 74,
      "ours": 64,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB 40.7 (2025) / 45.1 (2026); run/pass-block snaps 2025 53/8, 2026 81/9; routes 5/23",
        "touches 2025: 0 car / 0 rec 0 yds; 2026: 0 car / 3 rec 40 yds",
        "penalties 1 (2025) / 1 (2026); games 12 / 8; injuries none; roster ACT"
      ],
      "basis": "carries and fumbles 2025-26 (nflverse)"
    },
    {
      "player": "Max Bredeson",
      "attr": "CAR",
      "madden": 72,
      "ours": 62,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "PFF FB None (2025) / 39.4 (2026); run/pass-block snaps 2025 None/None, 2026 68/19; routes None/16",
        "touches 2025: 0 car / 0 rec 0 yds; 2026: 0 car / 0 rec 0 yds",
        "penalties 0 (2025) / 0 (2026); games None / 7; injuries none; roster ACT"
      ],
      "basis": "carries and fumbles 2025-26 (nflverse)"
    }
  ],
  "madden_used_as_evidence": false,
  "madden_order_verified": false,
  "variance_threshold": 10,
  "metrics_used": [
    "PFF FB-alignment grades 2025-26",
    "PFF run-block/pass-block/route/carry snap counts (sub-grades paywalled)",
    "rushing/receiving usage (nflverse player stats)",
    "accepted penalties (nflverse pbp)",
    "games/snaps",
    "injury reports and roster status",
    "FB depth-chart snapshots"
  ],
  "evidence_fixes_applied_before_audit": [],
  "drafted_fixes_pending_review": [
    {
      "player": "Connor Heyward",
      "attr": "SRR",
      "from": 78,
      "to": 74,
      "why": "3-21 (2025) and 2-22 (2026) receiving on 34 FB routes in 2026: SRR 78 (+13) leans on his TE background more than his FB usage supports; 74 keeps him the best route runner among H-backs after Juszczyk",
      "task_id": "FB_REAUDIT_RATE_04",
      "status": "PROPOSED_NOT_APPROVED"
    },
    {
      "player": "Michael Burton",
      "attr": "AWR",
      "from": 82,
      "to": 76,
      "why": "0 penalties and a 63.2 PFF grade, but on only 71 FB snaps in 2026 after a backup year with no PFF FB grade: 82 (+16 over Madden) over-credits a small sample; 76 keeps him a clean, assignment-sound blocker",
      "task_id": "FB_REAUDIT_RATE_06",
      "status": "PROPOSED_NOT_APPROVED"
    },
    {
      "player": "Scott Matlock",
      "attr": "TRK",
      "from": 50,
      "to": 44,
      "why": "0 carries in 2025-26: TRK 50 (+10) credits his 296-lb mass with no ball-carrier evidence; 44 is consistent with CAR 40 / BTK 30",
      "task_id": "FB_REAUDIT_RATE_10",
      "status": "PROPOSED_NOT_APPROVED"
    }
  ],
  "summary": "Every overall and attribute rating 10+ from Madden 27 audited (t46u): 23 gaps (7 below Madden, 16 above). 20 SUPPORTED on FB evidence; 3 ADJUST with drafted add-only revisions NOT approved or applied: Connor Heyward SRR 78->74; Michael Burton AWR 82->76; Scott Matlock TRK 50->44. 1 OVR gaps: Reggie Gilliam -10. Overalls unchanged by the drafts. Madden is reference only.",
  "major_flags": [
    "VARIANCE_FIXES_DRAFTED_PENDING_COMMISSIONER_REVIEW"
  ],
  "locked_control_conflict": false
}
```
