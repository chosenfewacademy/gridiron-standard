# K_REAUDIT_BG_11 — Eddy Pineiro background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "K_REAUDIT_BG_11_A1",
  "task_id": "K_REAUDIT_BG_11",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "K",
  "player_id": "ext_00-0034173",
  "players": [
    "Eddy Pineiro"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Eddy Pineiro",
    "player_id": "ext_00-0034173",
    "team": "SF",
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
            10,
            10
          ],
          "50-59": [
            6,
            6
          ],
          "60+": [
            0,
            1
          ],
          "fgm": 28,
          "fga": 29,
          "long": 59,
          "blocked": 0,
          "fg_epa": 22.3,
          "games": 11
        },
        "xp": [
          34,
          38
        ],
        "xp_epa": -1.5,
        "ko": {
          "n": 79,
          "tb": 16,
          "tb_pct": 20.3,
          "ret_avg": 25.5,
          "oob": 1,
          "epa": -19.9,
          "games": 14
        },
        "pen": 1,
        "pffk": {
          "ovr": 88.7,
          "snaps": null,
          "rank": 12
        }
      },
      "2026": {
        "fg": {
          "0-39": [
            3,
            3
          ],
          "40-49": [
            1,
            1
          ],
          "50-59": [
            2,
            5
          ],
          "60+": [
            0,
            0
          ],
          "fgm": 6,
          "fga": 9,
          "long": 57,
          "blocked": 1,
          "fg_epa": -4.1,
          "games": 5
        },
        "xp": [
          21,
          25
        ],
        "xp_epa": -2.4,
        "ko": {
          "n": 38,
          "tb": 7,
          "tb_pct": 18.4,
          "ret_avg": 26.9,
          "oob": 0,
          "epa": -13.1,
          "games": 7
        },
        "pffk": {
          "ovr": 42.9,
          "snaps": null,
          "rank": 31
        }
      }
    },
    "injuries": {
      "2025": [
        "wk12 Out (Hamstring)",
        "wk13 Out (Hamstring)"
      ],
      "2026": [
        "wk2 Questionable (Illness)"
      ]
    },
    "summary_lines": [
      "Eddy Pineiro (SF) Eddy Pineiro 2026: PFF K 2026 overall 42.9 (K rank 31); 2026 kickoffs 38, touchback 7 (18.4%), return avg 26.9, 0 out of bounds; 0 accepted penalties",
      "Eddy Pineiro 2025: PFF K 2025 overall 88.7 (K rank 12); 2025 kickoffs 79, touchback 16 (20.3%), return avg 25.5, 1 out of bounds; 1 accepted penalties",
      "Eddy Pineiro role: placekicker (FG/XP/kickoff attempts in nflverse pbp); roster position K (KICKER ROLE CONVENTION (t46u): rated as K = any player with 2025-26 field-goal, extra-point or kickoff attempts in nflve...); roster position K; Madden card K (reference only)",
      "Eddy Pineiro injury reports: wk12 Out (Hamstring); wk13 Out (Hamstring); wk2 Questionable (Illness); roster status ACT"
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
        "retrieved_at": "2026-11-04T12:49:40Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/k/2025",
        "retrieved_at": "2026-11-04T12:49:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:49:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:49:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:49:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:49:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:40Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
