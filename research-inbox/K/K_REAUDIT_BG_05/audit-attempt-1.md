# K_REAUDIT_BG_05 — Cam Little background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "K_REAUDIT_BG_05_A1",
  "task_id": "K_REAUDIT_BG_05",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "K",
  "player_id": "ext_00-0039409",
  "players": [
    "Cam Little"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Cam Little",
    "player_id": "ext_00-0039409",
    "team": "JAX",
    "role_assignment": "K (placekicker (FG/XP/kickoff attempts in nflverse pbp); roster position K)",
    "side_rule": "KICKER ROLE CONVENTION (t46u): rated as K = any player with 2025-26 field-goal, extra-point or kickoff attempts in nflverse play-by-play (kickoff specialists included); matched by gsis id. Evidence: FG% by distance band (0-39/40-49/50-59/60+), longest FG, FG EPA (nflverse pbp), XP%, kickoff touchback %, return average and out-of-bounds, PFF K overall (2025-26). THIN DATA: no public kickoff hang time (NFL Next Gen Stats does not publish it); kickoff EPA in pbp is noise-dominated by coverage and was not used to rank. Madden position is reference only.",
    "seasons": {
      "2025": {
        "fg": {
          "0-39": [
            14,
            14
          ],
          "40-49": [
            8,
            10
          ],
          "50-59": [
            6,
            8
          ],
          "60+": [
            2,
            2
          ],
          "fgm": 30,
          "fga": 34,
          "long": 68,
          "blocked": 0,
          "fg_epa": 12.0,
          "games": 16
        },
        "xp": [
          50,
          51
        ],
        "xp_epa": 2.4,
        "ko": {
          "n": 97,
          "tb": 37,
          "tb_pct": 38.1,
          "ret_avg": 25.4,
          "oob": 2,
          "epa": -22.0,
          "games": 17
        },
        "pen": 3,
        "pffk": {
          "ovr": 92.3,
          "snaps": null,
          "rank": 5
        }
      },
      "2026": {
        "fg": {
          "0-39": [
            3,
            3
          ],
          "40-49": [
            3,
            3
          ],
          "50-59": [
            3,
            4
          ],
          "60+": [
            1,
            2
          ],
          "fgm": 10,
          "fga": 12,
          "long": 60,
          "blocked": 0,
          "fg_epa": 8.6,
          "games": 6
        },
        "xp": [
          22,
          23
        ],
        "xp_epa": 0.6,
        "ko": {
          "n": 39,
          "tb": 5,
          "tb_pct": 12.8,
          "ret_avg": 28.6,
          "oob": 0,
          "epa": -12.1,
          "games": 7
        },
        "pffk": {
          "ovr": 82.2,
          "snaps": null,
          "rank": 6
        }
      }
    },
    "injuries": null,
    "summary_lines": [
      "Cam Little (JAX) Cam Little 2026: PFF K 2026 overall 82.2 (K rank 6); 2026 kickoffs 39, touchback 5 (12.8%), return avg 28.6, 0 out of bounds; 0 accepted penalties",
      "Cam Little 2025: PFF K 2025 overall 92.3 (K rank 5); 2025 kickoffs 97, touchback 37 (38.1%), return avg 25.4, 2 out of bounds; 3 accepted penalties",
      "Cam Little role: placekicker (FG/XP/kickoff attempts in nflverse pbp); roster position K (KICKER ROLE CONVENTION (t46u): rated as K = any player with 2025-26 field-goal, extra-point or kickoff attempts in nflve...); roster position K; Madden card K (reference only)",
      "Cam Little injury reports: no injury designation 2025-26; roster status ACT"
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
        "retrieved_at": "2026-11-04T12:49:33Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/k/2025",
        "retrieved_at": "2026-11-04T12:49:33Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:33Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:33Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:33Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:33Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:49:33Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:33Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:33Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:33Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:33Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:49:33Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:49:33Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:49:33Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:33Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
