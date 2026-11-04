# DT_REAUDIT_BG_04 — Zach Allen background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "DT_REAUDIT_BG_04_A1",
  "task_id": "DT_REAUDIT_BG_04",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "DT",
  "player_id": "ext_00-0035248",
  "players": [
    "Zach Allen"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Zach Allen",
    "player_id": "ext_00-0035248",
    "team": "DEN",
    "side_assignment": {
      "DT": 0,
      "DE": 495
    },
    "side_rule": "DT BUCKET (t46u): interior defensive linemen graded by PFF as DI (pff.com/grades/nfl/di), aligned at DT/NT or 3-4 DE (interior) in nflverse 2025-26 depth charts; edge-graded players belong to LEDGE/REDGE. DT has no left/right split.",
    "pff": {
      "2025": {
        "team": "denver-broncos",
        "ovr": 63.1,
        "snaps": 888,
        "rank": 47,
        "status": "A"
      },
      "2026": {
        "team": "denver-broncos",
        "ovr": 79.2,
        "snaps": 392,
        "rank": 5,
        "status": "A"
      }
    },
    "pressures": {
      "2025": {
        "tm": "DEN",
        "pos": "DL",
        "g": "17",
        "prss": "50",
        "hrry": "7",
        "qbkd": "32",
        "sk": "7",
        "comb": "38",
        "m_tkl": "5"
      },
      "2026": {
        "def_pressures": 18.0,
        "def_times_hurried": 1.0,
        "def_times_hitqb": 12.0,
        "def_sacks": 4.5,
        "def_tackles_combined": 24.0,
        "def_missed_tackles": 0.0,
        "g": 7
      }
    },
    "espn_win_rates": {
      "prwr": {
        "rank": 7,
        "wins": 33,
        "plays": 155,
        "rate": 21,
        "dt_pct": 80
      },
      "rswr": null
    },
    "snaps": {
      "2025": {
        "games": 17,
        "defs": 797
      },
      "2026": {
        "games": 8,
        "defs": 392
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 13.0,
        "def_tackle_assists": 24.0,
        "def_tackles_for_loss": 4.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 7.0,
        "def_qb_hits": 47.0,
        "def_pass_defended": 6.0
      },
      "2026": {
        "def_tackles_solo": 10.0,
        "def_tackle_assists": 15.0,
        "def_tackles_for_loss": 4.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 4.5,
        "def_qb_hits": 20.0,
        "def_pass_defended": 3.0
      }
    },
    "penalties": {
      "2025": 2,
      "2026": 2
    },
    "injuries": {
      "2026": [
        "wk8 Questionable (Hamstring)"
      ]
    },
    "summary_lines": [
      "Zach Allen (DEN) Zach Allen 2026: PFF DI 2026 overall 79.2 on 392 snaps (DI rank 5); PFR 2026 18 pressures (1 hurries, 12 QB hits, 4.5 sacks) in 7 games, 24 tackles, 0 missed; 8 g / 392 def snaps; 4.5 sacks, 20 QB hits, 4 TFL, 1 FF, 3 PD; 2 accepted penalties; ESPN 2026 DT PRWR 21% (#7, 33/155, 80% snaps at DT); RSWR outside the published top 10",
      "Zach Allen 2025: PFF DI 2025 overall 63.1 on 888 snaps (DI rank 47); PFR 2025 50 pressures (7 hurries, 32 QB knockdowns, 7 sacks), 38 tackles, 5 missed; 17 g / 797 def snaps; 7.0 sacks, 47 QB hits, 4 TFL, 0 FF, 6 PD; 2 accepted penalties",
      "Zach Allen alignment: depth-chart interior snapshots 2025-26: 0 at DT/NT, 495 at DE (3-4 DE = interior 4i/5-tech) -> DT bucket (DT BUCKET (t46u): interior defensive linemen graded by PFF as DI (pff.com/grades/nfl/di), aligned at DT/NT or 3-4 DE (in...); roster position DL; Madden card DT (reference only)",
      "Zach Allen injury reports: wk8 Questionable (Hamstring); roster status ACT"
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
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/di/2025",
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://www.espn.com/nfl/story/_/id/49742016",
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T11:18:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T11:18:44Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
