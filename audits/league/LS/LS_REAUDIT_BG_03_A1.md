# LS_REAUDIT_BG_03 — Chris Stoll background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "LS_REAUDIT_BG_03_A1",
  "task_id": "LS_REAUDIT_BG_03",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "LS",
  "player_id": "ext_00-0038769",
  "players": [
    "Chris Stoll"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Chris Stoll",
    "player_id": "ext_00-0038769",
    "team": "SEA",
    "role_assignment": "LS (long snapper (nflverse roster LS; snaps from snap counts and pbp); roster position LS)",
    "side_rule": "LONG SNAPPER ROLE CONVENTION (t46u): rated as LS = nflverse roster position LS with 2025-26 special-teams snaps; matched by name/gsis id. THIN DATA, documented: PFF publishes no public LS grade (pff.com/grades/nfl/ls renders no table) and the FootballKickingStats reported-snap-error table is script-loaded; substitutes: aborted/bad snaps parsed from nflverse pbp descriptions on every FG/XP/punt snap, kicks/punts blocked on his snaps, FG make rate on his snaps, FootballKickingStats long-snapper unit points (credits the whole unit), coverage tackles on punts/kickoffs (pbp), accepted penalties, availability. Madden position is reference only.",
    "seasons": {
      "2025": {
        "snaps": {
          "games": 17,
          "st": 150.0
        },
        "ls": {
          "fg": 48,
          "xp": 48,
          "punt": 52,
          "bad": 0,
          "bad_desc": [],
          "blocked": 1,
          "fg_made": 41,
          "other": 1
        },
        "st_tkl": 1,
        "fks": {
          "rank": 14,
          "unit_pts": 4.1,
          "snaps": 148,
          "fg": "41-48",
          "st_tkl": 1
        }
      },
      "2026": {
        "snaps": {
          "games": 8,
          "st": 68.0
        },
        "ls": {
          "fg": 15,
          "xp": 17,
          "punt": 27,
          "bad": 0,
          "bad_desc": [],
          "blocked": 0,
          "fg_made": 14
        },
        "fks": {
          "rank": 1,
          "unit_pts": 15.5,
          "snaps": 67,
          "fg": "15-17",
          "st_tkl": 0
        }
      }
    },
    "injuries": null,
    "summary_lines": [
      "Chris Stoll (SEA) Chris Stoll 2026: no public PFF long-snapper grade 2026 (pff.com/grades/nfl/ls renders no table; THIN DATA); 2026 8 g / 68 ST snaps; 0 coverage tackles (pbp); FootballKickingStats unit points 15.5 (rank 1); 0 accepted penalties",
      "Chris Stoll 2025: no public PFF long-snapper grade 2025 (pff.com/grades/nfl/ls renders no table; THIN DATA); 2025 17 g / 150 ST snaps; 1 coverage tackles (pbp); FootballKickingStats unit points 4.1 (rank 14); 0 accepted penalties",
      "Chris Stoll role: long snapper (nflverse roster LS; snaps from snap counts and pbp); roster position LS (LONG SNAPPER ROLE CONVENTION (t46u): rated as LS = nflverse roster position LS with 2025-26 special-teams snaps; matched...); roster position LS; Madden card LS (reference only)",
      "Chris Stoll injury reports: no injury designation 2025-26; roster status ACT"
    ],
    "availability": {
      "roster_status": "ACT"
    },
    "limitations": [
      "THIN DATA: no public PFF long-snapper grade and no public snap-accuracy charting; substitutes: aborted/bad snaps parsed from nflverse pbp text, blocks on his snaps, FG make rate on his snaps, FootballKickingStats unit points (whole-unit credit), coverage tackles, penalties, availability"
    ],
    "attributes_informed": [
      "AWR",
      "STR",
      "RBK",
      "PBK",
      "SPD",
      "TAK",
      "INJ",
      "STA",
      "TGH"
    ],
    "thin_data": true,
    "provenance": [
      {
        "url": "https://www.pff.com/grades/nfl/ls/2026",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/ls/2025",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://www.footballkickingstats.com/nfl-long-snapper-unit-points/2025",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://www.footballkickingstats.com/nfl-long-snapper-unit-points/2026",
        "retrieved_at": "2026-11-04T13:03:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T13:03:05Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
