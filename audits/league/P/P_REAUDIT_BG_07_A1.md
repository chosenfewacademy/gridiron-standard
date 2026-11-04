# P_REAUDIT_BG_07 — Austin McNamara background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "P_REAUDIT_BG_07_A1",
  "task_id": "P_REAUDIT_BG_07",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "P",
  "player_id": "ext_00-0039634",
  "players": [
    "Austin McNamara"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Austin McNamara",
    "player_id": "ext_00-0039634",
    "team": "NYJ",
    "role_assignment": "P (punter (punt attempts in nflverse pbp); roster position P)",
    "side_rule": "PUNTER ROLE CONVENTION (t46u): rated as P = any player with 2025-26 punt attempts in nflverse play-by-play; matched by gsis id. Evidence: gross and net average, inside-20 count/rate, touchbacks, fair catches, return yards allowed, blocks, punt EPA (nflverse pbp), PFF P overall (2025-26). THIN DATA: no public punt hang time (not in pbp, PFF free tables or Next Gen Stats); fair catches and return yards are the proxy. Madden position is reference only.",
    "seasons": {
      "2025": {
        "ko": {
          "n": 43,
          "tb": 4,
          "tb_pct": 9.3,
          "ret_avg": 23.9,
          "oob": 1,
          "epa": -11.1,
          "games": 11
        },
        "punt": {
          "n": 71,
          "gross": 46.7,
          "net": 43.2,
          "i20": 32,
          "i20_pct": 45.1,
          "tb": 6,
          "fc": 25,
          "ret_yds": 133,
          "returned": 21,
          "blocked": 0,
          "long": 72,
          "epa": 6.8,
          "epa_per": 0.096,
          "games": 17
        },
        "pen": 2,
        "pffp": {
          "ovr": 90.3,
          "snaps": null,
          "rank": 2
        }
      },
      "2026": {
        "ko": {
          "n": 8,
          "tb": 0,
          "tb_pct": 0.0,
          "ret_avg": 31.1,
          "oob": 1,
          "epa": -7.4,
          "games": 2
        },
        "punt": {
          "n": 31,
          "gross": 47.3,
          "net": 41.2,
          "i20": 11,
          "i20_pct": 35.5,
          "tb": 2,
          "fc": 10,
          "ret_yds": 150,
          "returned": 11,
          "blocked": 0,
          "long": 62,
          "epa": -5.8,
          "epa_per": -0.187,
          "games": 8
        },
        "pen": 1,
        "pffp": {
          "ovr": 70.7,
          "snaps": null,
          "rank": 16
        }
      }
    },
    "injuries": null,
    "summary_lines": [
      "Austin McNamara (NYJ) Austin McNamara 2026: PFF P 2026 overall 70.7 (P rank 16); 2026 8 games punting; 1 accepted penalties",
      "Austin McNamara 2025: PFF P 2025 overall 90.3 (P rank 2); 2025 17 games punting; 2 accepted penalties",
      "Austin McNamara role: punter (punt attempts in nflverse pbp); roster position P (PUNTER ROLE CONVENTION (t46u): rated as P = any player with 2025-26 punt attempts in nflverse play-by-play; matched by g...); roster position P; Madden card P (reference only)",
      "Austin McNamara injury reports: no injury designation 2025-26; roster status ACT"
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
        "retrieved_at": "2026-11-04T12:56:20Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/p/2025",
        "retrieved_at": "2026-11-04T12:56:20Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:20Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:20Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:20Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:20Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:56:20Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:20Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:20Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:20Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:20Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:56:20Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:56:20Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:56:20Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:20Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
