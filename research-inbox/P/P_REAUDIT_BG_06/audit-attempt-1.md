# P_REAUDIT_BG_06 — Jack Fox background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "P_REAUDIT_BG_06_A1",
  "task_id": "P_REAUDIT_BG_06",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "P",
  "player_id": "ext_00-0035156",
  "players": [
    "Jack Fox"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Jack Fox",
    "player_id": "ext_00-0035156",
    "team": "DET",
    "role_assignment": "P (punter (punt attempts in nflverse pbp); roster position P)",
    "side_rule": "PUNTER ROLE CONVENTION (t46u): rated as P = any player with 2025-26 punt attempts in nflverse play-by-play; matched by gsis id. Evidence: gross and net average, inside-20 count/rate, touchbacks, fair catches, return yards allowed, blocks, punt EPA (nflverse pbp), PFF P overall (2025-26). THIN DATA: no public punt hang time (not in pbp, PFF free tables or Next Gen Stats); fair catches and return yards are the proxy. Madden position is reference only.",
    "seasons": {
      "2025": {
        "punt": {
          "n": 56,
          "gross": 46.6,
          "net": 42.8,
          "i20": 28,
          "i20_pct": 50.0,
          "tb": 2,
          "fc": 26,
          "ret_yds": 173,
          "returned": 22,
          "blocked": 0,
          "long": 70,
          "epa": -2.7,
          "epa_per": -0.048,
          "games": 16
        },
        "pffp": {
          "ovr": 64,
          "snaps": null,
          "rank": 25
        }
      },
      "2026": {
        "punt": {
          "n": 25,
          "gross": 47.9,
          "net": 43.7,
          "i20": 12,
          "i20_pct": 48.0,
          "tb": 2,
          "fc": 10,
          "ret_yds": 65,
          "returned": 9,
          "blocked": 0,
          "long": 65,
          "epa": 1.1,
          "epa_per": 0.044,
          "games": 7
        },
        "pffp": {
          "ovr": 88.3,
          "snaps": null,
          "rank": 3
        }
      }
    },
    "injuries": null,
    "summary_lines": [
      "Jack Fox (DET) Jack Fox 2026: PFF P 2026 overall 88.3 (P rank 3); 2026 7 games punting; 0 accepted penalties",
      "Jack Fox 2025: PFF P 2025 overall 64 (P rank 25); 2025 16 games punting; 0 accepted penalties",
      "Jack Fox role: punter (punt attempts in nflverse pbp); roster position P (PUNTER ROLE CONVENTION (t46u): rated as P = any player with 2025-26 punt attempts in nflverse play-by-play; matched by g...); roster position P; Madden card P (reference only)",
      "Jack Fox injury reports: no injury designation 2025-26; roster status ACT"
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
        "retrieved_at": "2026-11-04T12:56:19Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/p/2025",
        "retrieved_at": "2026-11-04T12:56:19Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:19Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:19Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:19Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:19Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:56:19Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:19Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:19Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:56:19Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:56:19Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:56:19Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:56:19Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:56:19Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:56:19Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
