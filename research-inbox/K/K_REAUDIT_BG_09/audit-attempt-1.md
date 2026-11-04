# K_REAUDIT_BG_09 — Cameron Dicker background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "K_REAUDIT_BG_09_A1",
  "task_id": "K_REAUDIT_BG_09",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "K",
  "player_id": "ext_00-0037224",
  "players": [
    "Cameron Dicker"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Cameron Dicker",
    "player_id": "ext_00-0037224",
    "team": "LAC",
    "role_assignment": "K (placekicker (FG/XP/kickoff attempts in nflverse pbp); roster position K)",
    "side_rule": "KICKER ROLE CONVENTION (t46u): rated as K = any player with 2025-26 field-goal, extra-point or kickoff attempts in nflverse play-by-play (kickoff specialists included); matched by gsis id. Evidence: FG% by distance band (0-39/40-49/50-59/60+), longest FG, FG EPA (nflverse pbp), XP%, kickoff touchback %, return average and out-of-bounds, PFF K overall (2025-26). THIN DATA: no public kickoff hang time (NFL Next Gen Stats does not publish it); kickoff EPA in pbp is noise-dominated by coverage and was not used to rank. Madden position is reference only.",
    "seasons": {
      "2025": {
        "fg": {
          "0-39": [
            21,
            22
          ],
          "40-49": [
            12,
            13
          ],
          "50-59": [
            5,
            6
          ],
          "60+": [
            0,
            0
          ],
          "fgm": 38,
          "fga": 41,
          "long": 59,
          "blocked": 0,
          "fg_epa": 17.0,
          "games": 17
        },
        "xp": [
          34,
          35
        ],
        "xp_epa": 1.1,
        "ko": {
          "n": 90,
          "tb": 16,
          "tb_pct": 17.8,
          "ret_avg": 26.6,
          "oob": 2,
          "epa": -24.3,
          "games": 17
        },
        "pen": 3,
        "pffk": {
          "ovr": 91,
          "snaps": null,
          "rank": 8
        }
      },
      "2026": {
        "fg": {
          "0-39": [
            8,
            8
          ],
          "40-49": [
            4,
            5
          ],
          "50-59": [
            0,
            1
          ],
          "60+": [
            0,
            0
          ],
          "fgm": 12,
          "fga": 14,
          "long": 46,
          "blocked": 0,
          "fg_epa": -1.3,
          "games": 6
        },
        "xp": [
          9,
          9
        ],
        "xp_epa": 0.6,
        "ko": {
          "n": 27,
          "tb": 5,
          "tb_pct": 18.5,
          "ret_avg": 23.2,
          "oob": 0,
          "epa": -8.6,
          "games": 7
        },
        "pffk": {
          "ovr": 62.3,
          "snaps": null,
          "rank": 21
        }
      }
    },
    "injuries": null,
    "summary_lines": [
      "Cameron Dicker (LAC) Cameron Dicker 2026: PFF K 2026 overall 62.3 (K rank 21); 2026 kickoffs 27, touchback 5 (18.5%), return avg 23.2, 0 out of bounds; 0 accepted penalties",
      "Cameron Dicker 2025: PFF K 2025 overall 91 (K rank 8); 2025 kickoffs 90, touchback 16 (17.8%), return avg 26.6, 2 out of bounds; 3 accepted penalties",
      "Cameron Dicker role: placekicker (FG/XP/kickoff attempts in nflverse pbp); roster position K (KICKER ROLE CONVENTION (t46u): rated as K = any player with 2025-26 field-goal, extra-point or kickoff attempts in nflve...); roster position K; Madden card K (reference only)",
      "Cameron Dicker injury reports: no injury designation 2025-26; roster status ACT"
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
        "retrieved_at": "2026-11-04T12:49:38Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/k/2025",
        "retrieved_at": "2026-11-04T12:49:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:49:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:49:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:49:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:49:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:38Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
