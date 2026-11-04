# K_REAUDIT_BG_06 — Brandon Aubrey background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "K_REAUDIT_BG_06_A1",
  "task_id": "K_REAUDIT_BG_06",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "K",
  "player_id": "ext_00-0037692",
  "players": [
    "Brandon Aubrey"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Brandon Aubrey",
    "player_id": "ext_00-0037692",
    "team": "DAL",
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
            10,
            10
          ],
          "50-59": [
            8,
            13
          ],
          "60+": [
            3,
            4
          ],
          "fgm": 36,
          "fga": 42,
          "long": 64,
          "blocked": 0,
          "fg_epa": 14.8,
          "games": 17
        },
        "xp": [
          47,
          48
        ],
        "xp_epa": 2.7,
        "ko": {
          "n": 101,
          "tb": 17,
          "tb_pct": 16.8,
          "ret_avg": 24.1,
          "oob": 2,
          "epa": -27.6,
          "games": 17
        },
        "pen": 4,
        "pffk": {
          "ovr": 94,
          "snaps": null,
          "rank": 1
        }
      },
      "2026": {
        "fg": {
          "0-39": [
            9,
            9
          ],
          "40-49": [
            3,
            3
          ],
          "50-59": [
            2,
            3
          ],
          "60+": [
            1,
            4
          ],
          "fgm": 15,
          "fga": 19,
          "long": 60,
          "blocked": 2,
          "fg_epa": 0.8,
          "games": 6
        },
        "xp": [
          20,
          21
        ],
        "xp_epa": 0.7,
        "ko": {
          "n": 48,
          "tb": 8,
          "tb_pct": 16.7,
          "ret_avg": 17.2,
          "oob": 3,
          "epa": -1.4,
          "games": 8
        },
        "pen": 4,
        "pffk": {
          "ovr": 80,
          "snaps": null,
          "rank": 7
        }
      }
    },
    "injuries": null,
    "summary_lines": [
      "Brandon Aubrey (DAL) Brandon Aubrey 2026: PFF K 2026 overall 80 (K rank 7); 2026 kickoffs 48, touchback 8 (16.7%), return avg 17.2, 3 out of bounds; 4 accepted penalties",
      "Brandon Aubrey 2025: PFF K 2025 overall 94 (K rank 1); 2025 kickoffs 101, touchback 17 (16.8%), return avg 24.1, 2 out of bounds; 4 accepted penalties",
      "Brandon Aubrey role: placekicker (FG/XP/kickoff attempts in nflverse pbp); roster position K (KICKER ROLE CONVENTION (t46u): rated as K = any player with 2025-26 field-goal, extra-point or kickoff attempts in nflve...); roster position K; Madden card K (reference only)",
      "Brandon Aubrey injury reports: no injury designation 2025-26; roster status ACT"
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
        "retrieved_at": "2026-11-04T12:49:34Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/k/2025",
        "retrieved_at": "2026-11-04T12:49:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:49:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:49:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:49:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:49:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:49:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:49:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:49:34Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
