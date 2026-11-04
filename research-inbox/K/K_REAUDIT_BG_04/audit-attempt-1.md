# K_REAUDIT_BG_04 — Evan McPherson background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "K_REAUDIT_BG_04_A1",
  "task_id": "K_REAUDIT_BG_04",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "K",
  "player_id": "ext_00-0036854",
  "players": [
    "Evan McPherson"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Evan McPherson",
    "player_id": "ext_00-0036854",
    "team": "CIN",
    "role_assignment": "K (placekicker (FG/XP/kickoff attempts in nflverse pbp); roster position K)",
    "side_rule": "KICKER ROLE CONVENTION (t46u): rated as K = any player with 2025-26 field-goal, extra-point or kickoff attempts in nflverse play-by-play (kickoff specialists included); matched by gsis id. Evidence: FG% by distance band (0-39/40-49/50-59/60+), longest FG, FG EPA (nflverse pbp), XP%, kickoff touchback %, return average and out-of-bounds, PFF K overall (2025-26). THIN DATA: no public kickoff hang time (NFL Next Gen Stats does not publish it); kickoff EPA in pbp is noise-dominated by coverage and was not used to rank. Madden position is reference only.",
    "seasons": {
      "2025": {
        "fg": {
          "0-39": [
            10,
            10
          ],
          "40-49": [
            10,
            10
          ],
          "50-59": [
            4,
            6
          ],
          "60+": [
            1,
            2
          ],
          "fgm": 25,
          "fga": 28,
          "long": 63,
          "blocked": 0,
          "fg_epa": 16.4,
          "games": 14
        },
        "xp": [
          41,
          44
        ],
        "xp_epa": -0.0,
        "ko": {
          "n": 88,
          "tb": 11,
          "tb_pct": 12.5,
          "ret_avg": 25.6,
          "oob": 0,
          "epa": -19.8,
          "games": 17
        },
        "pffk": {
          "ovr": 90,
          "snaps": null,
          "rank": 11
        }
      },
      "2026": {
        "fg": {
          "0-39": [
            5,
            5
          ],
          "40-49": [
            0,
            0
          ],
          "50-59": [
            5,
            5
          ],
          "60+": [
            0,
            0
          ],
          "fgm": 10,
          "fga": 10,
          "long": 58,
          "blocked": 0,
          "fg_epa": 11.8,
          "games": 5
        },
        "xp": [
          24,
          24
        ],
        "xp_epa": 1.6,
        "ko": {
          "n": 42,
          "tb": 7,
          "tb_pct": 16.7,
          "ret_avg": 25.5,
          "oob": 0,
          "epa": -7.0,
          "games": 7
        },
        "pffk": {
          "ovr": 84.3,
          "snaps": null,
          "rank": 5
        }
      }
    },
    "injuries": null,
    "summary_lines": [
      "Evan McPherson (CIN) Evan McPherson 2026: PFF K 2026 overall 84.3 (K rank 5); 2026 kickoffs 42, touchback 7 (16.7%), return avg 25.5, 0 out of bounds; 0 accepted penalties",
      "Evan McPherson 2025: PFF K 2025 overall 90 (K rank 11); 2025 kickoffs 88, touchback 11 (12.5%), return avg 25.6, 0 out of bounds; 0 accepted penalties",
      "Evan McPherson role: placekicker (FG/XP/kickoff attempts in nflverse pbp); roster position K (KICKER ROLE CONVENTION (t46u): rated as K = any player with 2025-26 field-goal, extra-point or kickoff attempts in nflve...); roster position K; Madden card K (reference only)",
      "Evan McPherson injury reports: no injury designation 2025-26; roster status ACT"
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
        "retrieved_at": "2026-11-04T12:49:32Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/k/2025",
        "retrieved_at": "2026-11-04T12:49:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:49:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:49:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:49:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:49:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:32Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
