# K_REAUDIT_BG_01 — Will Reichard background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "K_REAUDIT_BG_01_A1",
  "task_id": "K_REAUDIT_BG_01",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "K",
  "player_id": "ext_00-0039404",
  "players": [
    "Will Reichard"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Will Reichard",
    "player_id": "ext_00-0039404",
    "team": "MIN",
    "role_assignment": "K (placekicker (FG/XP/kickoff attempts in nflverse pbp); roster position K)",
    "side_rule": "KICKER ROLE CONVENTION (t46u): rated as K = any player with 2025-26 field-goal, extra-point or kickoff attempts in nflverse play-by-play (kickoff specialists included); matched by gsis id. Evidence: FG% by distance band (0-39/40-49/50-59/60+), longest FG, FG EPA (nflverse pbp), XP%, kickoff touchback %, return average and out-of-bounds, PFF K overall (2025-26). THIN DATA: no public kickoff hang time (NFL Next Gen Stats does not publish it); kickoff EPA in pbp is noise-dominated by coverage and was not used to rank. Madden position is reference only.",
    "seasons": {
      "2025": {
        "fg": {
          "0-39": [
            15,
            15
          ],
          "40-49": [
            7,
            7
          ],
          "50-59": [
            10,
            12
          ],
          "60+": [
            1,
            1
          ],
          "fgm": 33,
          "fga": 35,
          "long": 62,
          "blocked": 0,
          "fg_epa": 24.1,
          "games": 16
        },
        "xp": [
          31,
          31
        ],
        "xp_epa": 1.8,
        "ko": {
          "n": 83,
          "tb": 15,
          "tb_pct": 18.1,
          "ret_avg": 25.3,
          "oob": 1,
          "epa": -21.5,
          "games": 17
        },
        "pen": 2,
        "pffk": {
          "ovr": 93.8,
          "snaps": null,
          "rank": 2
        }
      },
      "2026": {
        "fg": {
          "0-39": [
            6,
            6
          ],
          "40-49": [
            6,
            6
          ],
          "50-59": [
            6,
            8
          ],
          "60+": [
            0,
            0
          ],
          "fgm": 18,
          "fga": 20,
          "long": 56,
          "blocked": 1,
          "fg_epa": 11.4,
          "games": 7
        },
        "xp": [
          10,
          10
        ],
        "xp_epa": 0.8,
        "ko": {
          "n": 35,
          "tb": 2,
          "tb_pct": 5.7,
          "ret_avg": 25.1,
          "oob": 0,
          "epa": -1.9,
          "games": 7
        },
        "pffk": {
          "ovr": 85.1,
          "snaps": null,
          "rank": 3
        }
      }
    },
    "injuries": null,
    "summary_lines": [
      "Will Reichard (MIN) Will Reichard 2026: PFF K 2026 overall 85.1 (K rank 3); 2026 kickoffs 35, touchback 2 (5.7%), return avg 25.1, 0 out of bounds; 0 accepted penalties",
      "Will Reichard 2025: PFF K 2025 overall 93.8 (K rank 2); 2025 kickoffs 83, touchback 15 (18.1%), return avg 25.3, 1 out of bounds; 2 accepted penalties",
      "Will Reichard role: placekicker (FG/XP/kickoff attempts in nflverse pbp); roster position K (KICKER ROLE CONVENTION (t46u): rated as K = any player with 2025-26 field-goal, extra-point or kickoff attempts in nflve...); roster position K; Madden card K (reference only)",
      "Will Reichard injury reports: no injury designation 2025-26; roster status ACT"
    ],
    "availability": {
      "roster_status": "ACT"
    },
    "limitations": [
      "No public kickoff hang time; PFF K sub-grades paywalled; substitutes: FG% by distance band, longest FG, FG EPA, XP%, kickoff touchback %/return average (nflverse pbp), PFF K overall"
    ],
    "attributes_informed": [
      "KPW",
      "KAC",
      "AWR",
      "INJ",
      "STA",
      "TGH"
    ],
    "thin_data": false,
    "provenance": [
      {
        "url": "https://www.pff.com/grades/nfl/k/2026",
        "retrieved_at": "2026-11-04T12:49:28Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/k/2025",
        "retrieved_at": "2026-11-04T12:49:28Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:28Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:28Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:28Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:28Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:49:28Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:28Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:28Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:28Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:28Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:49:28Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:49:28Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:49:28Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:28Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
