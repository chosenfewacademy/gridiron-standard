# P_REAUDIT_BG_09 — J.K. Scott background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "P_REAUDIT_BG_09_A1",
  "task_id": "P_REAUDIT_BG_09",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "P",
  "player_id": "ext_00-0034162",
  "players": [
    "J.K. Scott"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "J.K. Scott",
    "player_id": "ext_00-0034162",
    "team": "LAC",
    "role_assignment": "P (punter (punt attempts in nflverse pbp); roster position P)",
    "side_rule": "PUNTER ROLE CONVENTION (t46u): rated as P = any player with 2025-26 punt attempts in nflverse play-by-play; matched by gsis id. Evidence: gross and net average, inside-20 count/rate, touchbacks, fair catches, return yards allowed, blocks, punt EPA (nflverse pbp), PFF P overall (2025-26). THIN DATA: no public punt hang time (not in pbp, PFF free tables or Next Gen Stats); fair catches and return yards are the proxy. Madden position is reference only.",
    "seasons": {
      "2025": {
        "punt": {
          "n": 60,
          "gross": 47.8,
          "net": 41.4,
          "i20": 23,
          "i20_pct": 38.3,
          "tb": 4,
          "fc": 23,
          "ret_yds": 305,
          "returned": 21,
          "blocked": 0,
          "long": 60,
          "epa": -6.6,
          "epa_per": -0.111,
          "games": 16
        },
        "pffp": {
          "ovr": 88.1,
          "snaps": null,
          "rank": 4
        }
      },
      "2026": {
        "ko": {
          "n": 1,
          "tb": 0,
          "tb_pct": 0.0,
          "ret_avg": 0.0,
          "oob": 0,
          "epa": -1.1,
          "games": 1
        },
        "punt": {
          "n": 30,
          "gross": 46.3,
          "net": 41.4,
          "i20": 10,
          "i20_pct": 33.3,
          "tb": 3,
          "fc": 12,
          "ret_yds": 88,
          "returned": 12,
          "blocked": 1,
          "long": 60,
          "epa": -4.8,
          "epa_per": -0.16,
          "games": 7
        },
        "pffp": {
          "ovr": 89.4,
          "snaps": null,
          "rank": 1
        }
      }
    },
    "injuries": null,
    "summary_lines": [
      "J.K. Scott (LAC) J.K. Scott 2026: PFF P 2026 overall 89.4 (P rank 1); 2026 7 games punting; 0 accepted penalties",
      "J.K. Scott 2025: PFF P 2025 overall 88.1 (P rank 4); 2025 16 games punting; 0 accepted penalties",
      "J.K. Scott role: punter (punt attempts in nflverse pbp); roster position P (PUNTER ROLE CONVENTION (t46u): rated as P = any player with 2025-26 punt attempts in nflverse play-by-play; matched by g...); roster position P; Madden card P (reference only)",
      "J.K. Scott injury reports: no injury designation 2025-26; roster status ACT"
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
        "retrieved_at": "2026-11-04T12:56:23Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/p/2025",
        "retrieved_at": "2026-11-04T12:56:23Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:23Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:23Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:23Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:23Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:56:23Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:23Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:23Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:23Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:23Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:56:23Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:56:23Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:56:23Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:23Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
