# K_REAUDIT_BG_08 — Joey Slye background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "K_REAUDIT_BG_08_A1",
  "task_id": "K_REAUDIT_BG_08",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "K",
  "player_id": "ext_00-0035192",
  "players": [
    "Joey Slye"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Joey Slye",
    "player_id": "ext_00-0035192",
    "team": "TEN",
    "role_assignment": "K (placekicker (FG/XP/kickoff attempts in nflverse pbp); roster position K)",
    "side_rule": "KICKER ROLE CONVENTION (t46u): rated as K = any player with 2025-26 field-goal, extra-point or kickoff attempts in nflverse play-by-play (kickoff specialists included); matched by gsis id. Evidence: FG% by distance band (0-39/40-49/50-59/60+), longest FG, FG EPA (nflverse pbp), XP%, kickoff touchback %, return average and out-of-bounds, PFF K overall (2025-26). THIN DATA: no public kickoff hang time (NFL Next Gen Stats does not publish it); kickoff EPA in pbp is noise-dominated by coverage and was not used to rank. Madden position is reference only.",
    "seasons": {
      "2025": {
        "fg": {
          "0-39": [
            12,
            12
          ],
          "40-49": [
            7,
            9
          ],
          "50-59": [
            9,
            12
          ],
          "60+": [
            0,
            2
          ],
          "fgm": 28,
          "fga": 35,
          "long": 58,
          "blocked": 1,
          "fg_epa": 16.0,
          "games": 16
        },
        "xp": [
          26,
          27
        ],
        "xp_epa": 0.8,
        "ko": {
          "n": 67,
          "tb": 17,
          "tb_pct": 25.4,
          "ret_avg": 22.8,
          "oob": 4,
          "epa": -13.7,
          "games": 16
        },
        "pen": 4,
        "pffk": {
          "ovr": 84.3,
          "snaps": null,
          "rank": 15
        }
      },
      "2026": {
        "fg": {
          "0-39": [
            7,
            7
          ],
          "40-49": [
            4,
            4
          ],
          "50-59": [
            1,
            2
          ],
          "60+": [
            0,
            0
          ],
          "fgm": 12,
          "fga": 13,
          "long": 56,
          "blocked": 0,
          "fg_epa": 5.6,
          "games": 8
        },
        "xp": [
          12,
          12
        ],
        "xp_epa": 1.0,
        "ko": {
          "n": 36,
          "tb": 8,
          "tb_pct": 22.2,
          "ret_avg": 19.0,
          "oob": 1,
          "epa": -11.5,
          "games": 8
        },
        "punt": {
          "n": 1,
          "gross": 42.0,
          "net": 42.0,
          "i20": 1,
          "i20_pct": 100.0,
          "tb": 0,
          "fc": 0,
          "ret_yds": 0,
          "returned": 0,
          "blocked": 0,
          "long": 42,
          "epa": 0.2,
          "epa_per": 0.218,
          "games": 1
        },
        "pen": 3,
        "pffk": {
          "ovr": 85,
          "snaps": null,
          "rank": 4
        }
      }
    },
    "injuries": {
      "2025": [
        "wk6 Out (Calf)"
      ]
    },
    "summary_lines": [
      "Joey Slye (TEN) Joey Slye 2026: PFF K 2026 overall 85 (K rank 4); 2026 kickoffs 36, touchback 8 (22.2%), return avg 19.0, 1 out of bounds; 3 accepted penalties",
      "Joey Slye 2025: PFF K 2025 overall 84.3 (K rank 15); 2025 kickoffs 67, touchback 17 (25.4%), return avg 22.8, 4 out of bounds; 4 accepted penalties",
      "Joey Slye role: placekicker (FG/XP/kickoff attempts in nflverse pbp); roster position K (KICKER ROLE CONVENTION (t46u): rated as K = any player with 2025-26 field-goal, extra-point or kickoff attempts in nflve...); roster position K; Madden card K (reference only)",
      "Joey Slye injury reports: wk6 Out (Calf); roster status ACT"
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
        "retrieved_at": "2026-11-04T12:49:36Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/k/2025",
        "retrieved_at": "2026-11-04T12:49:36Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:36Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:36Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:36Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:36Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:49:36Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:36Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:36Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:36Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:36Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:49:36Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:49:36Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:49:36Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:36Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
