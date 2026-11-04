# P_REAUDIT_BG_04 — Logan Cooke background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "P_REAUDIT_BG_04_A1",
  "task_id": "P_REAUDIT_BG_04",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "P",
  "player_id": "ext_00-0034437",
  "players": [
    "Logan Cooke"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Logan Cooke",
    "player_id": "ext_00-0034437",
    "team": "JAX",
    "role_assignment": "P (punter (punt attempts in nflverse pbp); roster position P)",
    "side_rule": "PUNTER ROLE CONVENTION (t46u): rated as P = any player with 2025-26 punt attempts in nflverse play-by-play; matched by gsis id. Evidence: gross and net average, inside-20 count/rate, touchbacks, fair catches, return yards allowed, blocks, punt EPA (nflverse pbp), PFF P overall (2025-26). THIN DATA: no public punt hang time (not in pbp, PFF free tables or Next Gen Stats); fair catches and return yards are the proxy. Madden position is reference only.",
    "seasons": {
      "2025": {
        "punt": {
          "n": 60,
          "gross": 48.0,
          "net": 43.0,
          "i20": 22,
          "i20_pct": 36.7,
          "tb": 6,
          "fc": 9,
          "ret_yds": 178,
          "returned": 27,
          "blocked": 0,
          "long": 66,
          "epa": 4.0,
          "epa_per": 0.066,
          "games": 16
        },
        "pffp": {
          "ovr": 70.3,
          "snaps": null,
          "rank": 17
        }
      },
      "2026": {
        "punt": {
          "n": 25,
          "gross": 47.8,
          "net": 42.9,
          "i20": 10,
          "i20_pct": 40.0,
          "tb": 1,
          "fc": 6,
          "ret_yds": 104,
          "returned": 13,
          "blocked": 0,
          "long": 60,
          "epa": 3.4,
          "epa_per": 0.137,
          "games": 7
        },
        "pffp": {
          "ovr": 66.3,
          "snaps": null,
          "rank": 26
        }
      }
    },
    "injuries": null,
    "summary_lines": [
      "Logan Cooke (JAX) Logan Cooke 2026: PFF P 2026 overall 66.3 (P rank 26); 2026 7 games punting; 0 accepted penalties",
      "Logan Cooke 2025: PFF P 2025 overall 70.3 (P rank 17); 2025 16 games punting; 0 accepted penalties",
      "Logan Cooke role: punter (punt attempts in nflverse pbp); roster position P (PUNTER ROLE CONVENTION (t46u): rated as P = any player with 2025-26 punt attempts in nflverse play-by-play; matched by g...); roster position P; Madden card P (reference only)",
      "Logan Cooke injury reports: no injury designation 2025-26; roster status ACT"
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
        "retrieved_at": "2026-11-04T12:56:17Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/p/2025",
        "retrieved_at": "2026-11-04T12:56:17Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:17Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:17Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:17Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:17Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:56:17Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:17Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:17Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:17Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:17Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:56:17Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:56:17Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:56:17Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:17Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
