# QB TOP10_REAUDIT — provisional Top 10 (Grok Bot analyst, attempt 1, PROPOSAL ONLY)

Not run through the executor (see Blockers). No approval, lock, baseline or card change. EA ratings not used.

```json
{
  "audit_id": "QB_REAUDIT_PROVISIONAL_TOP10_A1",
  "task_id": "QB_REAUDIT_PROVISIONAL_TOP10",
  "task_type": "provisional_top_10",
  "audit_type": "TOP10_REAUDIT",
  "position": "QB",
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "proposed_top10_mutation": true,
  "provisional_top_10": ["Joe Burrow","Josh Allen","Brock Purdy","Lamar Jackson","Dak Prescott","Drake Maye","Jared Goff","Trevor Lawrence","Jordan Love","Patrick Mahomes"],
  "first_out": "Kirk Cousins",
  "removed_from_locked": ["Matthew Stafford","Justin Herbert","Sam Darnold"],
  "added_vs_locked": ["Lamar Jackson","Jared Goff","Patrick Mahomes"],
  "external_controls": ["Kirk Cousins","Caleb Williams","Jayden Daniels","Matthew Stafford"],
  "pair_proposals": [
    {"task_id":"QB_PAIR_01","players":["Joe Burrow","Josh Allen"],"lean":"Joe Burrow","confidence":"MEDIUM"},
    {"task_id":"QB_PAIR_02","players":["Brock Purdy","Lamar Jackson"],"lean":"Brock Purdy","confidence":"LOW"},
    {"task_id":"QB_PAIR_03","players":["Dak Prescott","Drake Maye"],"lean":"Dak Prescott","confidence":"LOW"},
    {"task_id":"QB_PAIR_04","players":["Jared Goff","Trevor Lawrence"],"lean":"Jared Goff","confidence":"LOW"},
    {"task_id":"QB_PAIR_05","players":["Jordan Love","Patrick Mahomes"],"lean":"Jordan Love","confidence":"MEDIUM"},
    {"task_id":"QB_PAIR_06","players":["Patrick Mahomes","Kirk Cousins"],"lean":"Patrick Mahomes","confidence":"LOW"}
  ],
  "major_flags": ["LOCKED_PLAYER_REMOVED: Matthew Stafford (locked #1)", "AVAILABILITY: Lamar Jackson 5 games", "RANK10_CONTESTED"],
  "locked_control_conflict": true
}
```

Method: 45% 2026 PFF overall, 30% 2026 EPA per play (pass+rush, nflverse), 25% 2025 PFF overall as
multi-year context; analyst override at rank 10 (Mahomes over Cousins/C. Williams on two-season stability).
