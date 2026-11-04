# DT_REAUDIT_BG_13 — DJ Reader background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "DT_REAUDIT_BG_13_A1",
  "task_id": "DT_REAUDIT_BG_13",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "DT",
  "player_id": "ext_00-0032424",
  "players": [
    "DJ Reader"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "DJ Reader",
    "player_id": "ext_00-0032424",
    "team": "NYG",
    "side_assignment": {
      "DT": 445,
      "DE": 0
    },
    "side_rule": "DT BUCKET (t46u): interior defensive linemen graded by PFF as DI (pff.com/grades/nfl/di), aligned at DT/NT or 3-4 DE (interior) in nflverse 2025-26 depth charts; edge-graded players belong to LEDGE/REDGE. DT has no left/right split.",
    "pff": {
      "2025": {
        "team": "detroit-lions",
        "ovr": 68.9,
        "snaps": 583,
        "rank": 32,
        "status": "A"
      },
      "2026": {
        "team": "new-york-giants",
        "ovr": 90.4,
        "snaps": 251,
        "rank": 1,
        "status": "A"
      }
    },
    "pressures": {
      "2025": {
        "tm": "DET",
        "pos": "DL",
        "g": "17",
        "prss": "8",
        "hrry": "4",
        "qbkd": "4",
        "sk": "0",
        "comb": "28",
        "m_tkl": "1"
      },
      "2026": {
        "def_pressures": 2.0,
        "def_times_hurried": 0.0,
        "def_times_hitqb": 2.0,
        "def_sacks": 0.0,
        "def_tackles_combined": 7.0,
        "def_missed_tackles": 1.0,
        "g": 3
      }
    },
    "espn_win_rates": {
      "prwr": {
        "rank": 5,
        "wins": 16,
        "plays": 71,
        "rate": 23,
        "dt_pct": 73
      },
      "rswr": null
    },
    "snaps": {
      "2025": {
        "games": 17,
        "defs": 583
      },
      "2026": {
        "games": 7,
        "defs": 252
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 11.0,
        "def_tackle_assists": 17.0,
        "def_tackles_for_loss": 0.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.0,
        "def_qb_hits": 4.0,
        "def_pass_defended": 0.0
      },
      "2026": {
        "def_tackles_solo": 13.0,
        "def_tackle_assists": 9.0,
        "def_tackles_for_loss": 1.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.0,
        "def_qb_hits": 2.0,
        "def_pass_defended": 0.0
      }
    },
    "penalties": {
      "2025": 2,
      "2026": 0
    },
    "injuries": {
      "2025": [
        "wk7 Questionable (Back)"
      ]
    },
    "summary_lines": [
      "DJ Reader (NYG) DJ Reader 2026: PFF DI 2026 overall 90.4 on 251 snaps (DI rank 1); PFR 2026 2 pressures (0 hurries, 2 QB hits, 0.0 sacks) in 3 games, 7 tackles, 1 missed; 7 g / 252 def snaps; 0.0 sacks, 2 QB hits, 1 TFL, 0 FF, 0 PD; 0 accepted penalties; ESPN 2026 DT PRWR 23% (#5, 16/71, 73% snaps at DT); RSWR outside the published top 10",
      "DJ Reader 2025: PFF DI 2025 overall 68.9 on 583 snaps (DI rank 32); PFR 2025 8 pressures (4 hurries, 4 QB knockdowns, 0 sacks), 28 tackles, 1 missed; 17 g / 583 def snaps; 0.0 sacks, 4 QB hits, 0 TFL, 0 FF, 0 PD; 2 accepted penalties",
      "DJ Reader alignment: depth-chart interior snapshots 2025-26: 445 at DT/NT, 0 at DE (3-4 DE = interior 4i/5-tech) -> DT bucket (DT BUCKET (t46u): interior defensive linemen graded by PFF as DI (pff.com/grades/nfl/di), aligned at DT/NT or 3-4 DE (in...); roster position DL; Madden card DT (reference only)",
      "DJ Reader injury reports: wk7 Questionable (Back); roster status ACT"
    ],
    "availability": {
      "roster_status": "ACT"
    },
    "limitations": [
      "PFF pass-rush and run-defense sub-grades and alignment splits are paywalled; substitutes: PFF DI overall + snap counts, ESPN DT PRWR/RSWR (published top 20 / top 10 only), PFR pressures, sacks/QB hits/TFL, penalties, depth-chart side, injury reports"
    ],
    "attributes_informed": [
      "SPD",
      "ACC",
      "AGI",
      "COD",
      "STR",
      "AWR",
      "PRC",
      "TAK",
      "POW",
      "BSH",
      "PMV",
      "FMV",
      "PUR",
      "INJ",
      "STA",
      "TGH"
    ],
    "provenance": [
      {
        "url": "https://www.pff.com/grades/nfl/di/2026",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/di/2025",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://www.espn.com/nfl/story/_/id/49742016",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T11:18:54Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T11:18:54Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
