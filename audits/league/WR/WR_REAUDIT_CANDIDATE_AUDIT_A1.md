# WR TOP10_REAUDIT — Stage 1 CANDIDATE AUDIT (Addendum v1.1.2) — Grok Bot analyst, attempt 1

Pool: data/candidate-pools/WR.reaudit.json (APPROVED, 24). Commissioner card t44s334: step 1 only (candidate audit), stop before dossiers. Madden 27 OVRs are **reference only**, not evidence. madden_order_verified=false.

```json
{
  "audit_id": "WR_REAUDIT_CANDIDATE_AUDIT_A1",
  "task_id": "WR_REAUDIT_CANDIDATE_AUDIT",
  "task_type": "candidate_audit",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "WR",
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "membership_confirmed": true,
  "missing_top_players": [],
  "coverage_check": "League-wide screen of every WR with 40+ targets in 2026 or PFF 75+ in 2025/2026 across all teams, including IR/reserve/free agents. Every PFF 2026 top-12 WR and every 2025 top-10 WR is in the contention set, is an external control, or is listed in excluded with a reason. Unmatched name in NGS/PFF join: Omar Cooper Jr. (NYJ rookie) has no top-10 case on volume.",
  "contention_set": [
    "Jaxon Smith-Njigba",
    "Puka Nacua",
    "Ja'Marr Chase",
    "Tee Higgins",
    "CeeDee Lamb",
    "Drake London",
    "Amon-Ra St. Brown",
    "Zay Flowers",
    "Chris Olave",
    "George Pickens",
    "Nico Collins",
    "Justin Jefferson",
    "DeVonta Smith",
    "Malik Nabers",
    "Mike Evans"
  ],
  "contention_basis": "Step 1 only per commissioner t44s334: 10 proposed top-10 contenders plus 5 first-outs (Collins, Jefferson, DeVonta Smith, Nabers, Evans). Judgment, not formula. WR evidence: PFF receiving grade, YPRR, targets per route run, NGS separation, EPA per target, volume, availability. 2025 full season plus 2026 through Week 8.",
  "contender_reasons": {
    "Jaxon Smith-Njigba": "Locked #3; PFF 93.2 (#1 2026)/92.9; 1793 yds 2025, 867 yds 8 TD in 7 g; YPRR 3.03; EPA/tgt +.751",
    "Puka Nacua": "Locked #1; PFF 96.2 (#1 2025)/90.3; 1715 yds, YPRR 2.86/2.53; TPRR .332 best of volume WRs",
    "Ja'Marr Chase": "Locked #2; PFF 90.1/84.9; 185 tgt 2025; 2026 6 TD, EPA/tgt +.462; YPRR down to 1.98 - trend test",
    "Tee Higgins": "PFF 92.3 (#3 2026)/80.1; 726 yds in 7 g, EPA/tgt +.836, YPRR 2.72; 2025 TPRR only .179 - one-year spike test",
    "CeeDee Lamb": "PFF 89.7/77.6; 94 tgt (most), TPRR .318, YPRR 2.40, 709 yds 6 TD in 8 g; 2025 was a down year",
    "Drake London": "Locked #6; PFF 88.0/86.0; YPRR 2.57, 624 yds in 8 g; TD-light (1)",
    "Amon-Ra St. Brown": "Locked #4; PFF 90.7/78.9; 1401 yds 11 TD 2025, TPRR .292/.295; 2026 YPRR 2.21 - decline test",
    "Zay Flowers": "PFF 86.4/79.6; YPRR 3.00 (2026), separation 3.52 (2025, top of set); 1211 yds 2025",
    "Chris Olave": "PFF 87.3/78.0; 156 tgt/1163 yds 2025; 2026 EPA/tgt +.528, YPRR 2.24",
    "George Pickens": "Locked #5; 1429 yds 9 TD, EPA/tgt +.643, PFF 85.9 2025; 2026 PFF 78.1, YPRR 1.72 - decline test",
    "Nico Collins": "First-out; locked #7; PFF 85.9 2025, 1117 yds; 2026 only 5 g/35 tgt (PFF 79.6) - limited sample",
    "Justin Jefferson": "First-out; locked #8; PFF 80.5/82.6; 2025 EPA/tgt -.097 on 142 tgt (QB context); 2026 EPA/tgt +.531",
    "DeVonta Smith": "First-out; PFF 90.5 in 4 g (2026)/76.9; 1008 yds 2025; hamstring, out Weeks 7-8",
    "Malik Nabers": "First-out; PFF 83.6, 71 tgt, TPRR .281, separation 2.99 (2026); 2025 lost to injury (4 g)",
    "Mike Evans": "First-out; PFF 92.4 (#2 2026), YPRR 3.28, EPA/tgt +1.02 on 40 tgt; age 33, Achilles tendinitis + ribs, 2025 368 yds"
  },
  "excluded": [
    {
      "player": "A.J. Brown",
      "reason": "Locked #9; 2026 3 g/20 tgt/101 yds, EPA/tgt -.23, inactive; 2025 PFF 80.9, YPRR 1.81 - no top-10 case. Pool BELOW_CUTOFF; locked member outside contention"
    },
    {
      "player": "Stefon Diggs",
      "reason": "Locked #10; 2026 PFF 71.5, 252 yds, TPRR .246; 2025 strong (PFF 82.7, EPA/tgt +.69) but age-33 decline. Pool BELOW_CUTOFF; locked member outside contention"
    },
    {
      "player": "Jaylen Waddle",
      "reason": "External control (85); 2025 PFF 84.0, 910 yds; 2026 EPA/tgt +.081, 315 yds in 8 g (DEN)"
    },
    {
      "player": "Davante Adams",
      "reason": "Reserve list; PFF 84.8 2025 / 75.9 2026; unavailable"
    },
    {
      "player": "Terry McLaurin",
      "reason": "Reserve list; PFF 86.5 in 10 g 2025; 5 g 2026 - unavailable"
    },
    {
      "player": "Jameson Williams",
      "reason": "Big-play profile (separation 3.17, EPA/tgt +.55) but PFF 75.6 and YPRR 1.77 2025; volume short of the top 15"
    },
    {
      "player": "Parker Washington",
      "reason": "PFF 82.1/81.0 - real, but volume and target share trail the set; near-miss"
    },
    {
      "player": "Christian Watson",
      "reason": "PFF 82.7 2025 / 74.8 2026"
    },
    {
      "player": "Garrett Wilson",
      "reason": "PFF 80.6 2026; little else separates him from the set"
    },
    {
      "player": "Luther Burden III",
      "reason": "PFF 81.0 2026; limited role so far"
    },
    {
      "player": "Tetairoa McMillan",
      "reason": "Volume without top-tier efficiency; below the set"
    },
    {
      "player": "Ladd McConkey",
      "reason": "2025 EPA/tgt +.068 on 106 tgt; 286 yds 2026"
    },
    {
      "player": "Emeka Egbuka",
      "reason": "EPA/tgt +.056 (2025) / -.259 (2026); inactive"
    },
    {
      "player": "Courtland Sutton",
      "reason": "PFF 73.8, YPRR 1.36 2025; EPA/tgt -.145 2026"
    },
    {
      "player": "DK Metcalf",
      "reason": "PFF 71.1 2025; EPA/tgt -.033 on 64 tgt 2026"
    },
    {
      "player": "Alec Pierce",
      "reason": "PFF 79.3 / 1003 yds / EPA/tgt +.664 2025; reserve list 2026"
    },
    {
      "player": "Tyreek Hill",
      "reason": "Not on a 2026 roster; 4 g in 2025"
    },
    {
      "player": "DeAndre Hopkins",
      "reason": "Free agent"
    }
  ],
  "flags": {
    "injured": [
      "DeVonta Smith (hamstring, out Weeks 7-8)",
      "Mike Evans (Achilles tendinitis, ribs)",
      "Davante Adams (reserve)",
      "Terry McLaurin (reserve)",
      "Alec Pierce (reserve)",
      "A.J. Brown (inactive)"
    ],
    "free_agents": [
      "DeAndre Hopkins"
    ],
    "limited_sample": [
      "Nico Collins: 5 g 2026",
      "DeVonta Smith: 4 g 2026",
      "Mike Evans: 40 tgt 2026",
      "Malik Nabers: 4 g 2025"
    ],
    "locked_members_outside_contention": [
      "A.J. Brown",
      "Stefon Diggs"
    ],
    "sharp_decline": [
      "Stefon Diggs",
      "George Pickens (2026 YPRR 1.72)",
      "Amon-Ra St. Brown (PFF 90.7 to 78.9)",
      "Ja'Marr Chase (YPRR 1.98)"
    ]
  },
  "madden_reference": [
    {
      "player": "Jaxon Smith-Njigba",
      "ovr": 99,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Puka Nacua",
      "ovr": 98,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Ja'Marr Chase",
      "ovr": 99,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Tee Higgins",
      "ovr": 89,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Drake London",
      "ovr": 93,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "CeeDee Lamb",
      "ovr": 96,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Amon-Ra St. Brown",
      "ovr": 95,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Zay Flowers",
      "ovr": 90,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Chris Olave",
      "ovr": 89,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "George Pickens",
      "ovr": 88,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Nico Collins",
      "ovr": 90,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Justin Jefferson",
      "ovr": 97,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "DeVonta Smith",
      "ovr": 92,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Malik Nabers",
      "ovr": 88,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Mike Evans",
      "ovr": 91,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "A.J. Brown",
      "ovr": 87,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Stefon Diggs",
      "ovr": 86,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Jaylen Waddle",
      "ovr": 85,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Terry McLaurin",
      "ovr": 88,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Davante Adams",
      "ovr": 91,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Jameson Williams",
      "ovr": 85,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Parker Washington",
      "ovr": 84,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Christian Watson",
      "ovr": 85,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Garrett Wilson",
      "ovr": 87,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Tetairoa McMillan",
      "ovr": 87,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    },
    {
      "player": "Luther Burden III",
      "ovr": 82,
      "reference_only": true,
      "used_as_evidence": false,
      "source": "https://www.ea.com/games/madden-nfl/ratings"
    }
  ],
  "madden_order_verified": false,
  "early_inputs": [],
  "external_controls": [
    "Jaylen Waddle"
  ],
  "major_flags": [
    "LOCKED_MEMBER_OUTSIDE_CONTENTION: A.J. Brown, Stefon Diggs",
    "LIMITED_SAMPLE_IN_CONTENTION: Nico Collins, DeVonta Smith, Mike Evans",
    "ONE_YEAR_SPIKE: Tee Higgins, CeeDee Lamb (2025 down years)",
    "MADDEN_GAP_10PLUS: none among contenders vs Madden (reference only)"
  ],
  "locked_control_conflict": true
}
```
