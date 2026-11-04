# P_REAUDIT_BG_11 — Bryan Anger background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "P_REAUDIT_BG_11_A1",
  "task_id": "P_REAUDIT_BG_11",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "P",
  "player_id": "ext_00-0029692",
  "players": [
    "Bryan Anger"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Bryan Anger",
    "player_id": "ext_00-0029692",
    "team": "DAL",
    "role_assignment": "P (punter (punt attempts in nflverse pbp); roster position P)",
    "side_rule": "PUNTER ROLE CONVENTION (t46u): rated as P = any player with 2025-26 punt attempts in nflverse play-by-play; matched by gsis id. Evidence: gross and net average, inside-20 count/rate, touchbacks, fair catches, return yards allowed, blocks, punt EPA (nflverse pbp), PFF P overall (2025-26). THIN DATA: no public punt hang time (not in pbp, PFF free tables or Next Gen Stats); fair catches and return yards are the proxy. Madden position is reference only.",
    "seasons": {
      "2025": {
        "punt": {
          "n": 41,
          "gross": 48.6,
          "net": 42.6,
          "i20": 14,
          "i20_pct": 34.1,
          "tb": 0,
          "fc": 13,
          "ret_yds": 246,
          "returned": 26,
          "blocked": 0,
          "long": 65,
          "epa": 3.2,
          "epa_per": 0.078,
          "games": 17
        },
        "pffp": {
          "ovr": 68.7,
          "snaps": null,
          "rank": 19
        }
      },
      "2026": {
        "punt": {
          "n": 19,
          "gross": 47.0,
          "net": 42.5,
          "i20": 11,
          "i20_pct": 57.9,
          "tb": 0,
          "fc": 7,
          "ret_yds": 86,
          "returned": 8,
          "blocked": 0,
          "long": 60,
          "epa": -1.8,
          "epa_per": -0.093,
          "games": 8
        },
        "pffp": {
          "ovr": 67.5,
          "snaps": null,
          "rank": 24
        }
      }
    },
    "injuries": null,
    "summary_lines": [
      "Bryan Anger (DAL) Bryan Anger 2026: PFF P 2026 overall 67.5 (P rank 24); 2026 8 games punting; 0 accepted penalties",
      "Bryan Anger 2025: PFF P 2025 overall 68.7 (P rank 19); 2025 17 games punting; 0 accepted penalties",
      "Bryan Anger role: punter (punt attempts in nflverse pbp); roster position P (PUNTER ROLE CONVENTION (t46u): rated as P = any player with 2025-26 punt attempts in nflverse play-by-play; matched by g...); roster position P; Madden card P (reference only)",
      "Bryan Anger injury reports: no injury designation 2025-26; roster status ACT"
    ],
    "availability": {
      "roster_status": "ACT"
    },
    "limitations": [
      "No public punt hang time; PFF P sub-grades paywalled; substitutes: net/gross, inside-20, touchbacks, fair catches and return yards (hang proxy), punt EPA (nflverse pbp), PFF P overall"
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
        "url": "https://www.pff.com/grades/nfl/p/2026",
        "retrieved_at": "2026-11-04T12:56:25Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/p/2025",
        "retrieved_at": "2026-11-04T12:56:25Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:25Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:25Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:25Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:25Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:56:25Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:25Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:25Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:25Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:25Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:56:25Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:56:25Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:56:25Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:25Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
