# DT_REAUDIT_BG_02 — Cameron Heyward background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "DT_REAUDIT_BG_02_A1",
  "task_id": "DT_REAUDIT_BG_02",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "DT",
  "player_id": "ext_00-0027969",
  "players": [
    "Cameron Heyward"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Cameron Heyward",
    "player_id": "ext_00-0027969",
    "team": "PIT",
    "side_assignment": {
      "DT": 0,
      "DE": 496
    },
    "side_rule": "DT BUCKET (t46u): interior defensive linemen graded by PFF as DI (pff.com/grades/nfl/di), aligned at DT/NT or 3-4 DE (interior) in nflverse 2025-26 depth charts; edge-graded players belong to LEDGE/REDGE. DT has no left/right split.",
    "pff": {
      "2025": {
        "team": "pittsburgh-steelers",
        "ovr": 90.4,
        "snaps": 873,
        "rank": 1,
        "status": "A"
      },
      "2026": {
        "team": "pittsburgh-steelers",
        "ovr": 79.2,
        "snaps": 319,
        "rank": 5,
        "status": "A"
      }
    },
    "pressures": {
      "2025": {
        "tm": "PIT",
        "pos": "DT",
        "g": "17",
        "prss": "12",
        "hrry": "5",
        "qbkd": "3",
        "sk": "3.5",
        "comb": "78",
        "m_tkl": "3"
      },
      "2026": {
        "def_pressures": 8.0,
        "def_times_hurried": 2.0,
        "def_times_hitqb": 5.0,
        "def_sacks": 1.0,
        "def_tackles_combined": 19.0,
        "def_missed_tackles": 1.0,
        "g": 6
      }
    },
    "espn_win_rates": {
      "prwr": null,
      "rswr": null
    },
    "snaps": {
      "2025": {
        "games": 17,
        "defs": 823
      },
      "2026": {
        "games": 8,
        "defs": 318
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 36.0,
        "def_tackle_assists": 40.0,
        "def_tackles_for_loss": 9.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 3.5,
        "def_qb_hits": 9.0,
        "def_pass_defended": 6.0
      },
      "2026": {
        "def_tackles_solo": 12.0,
        "def_tackle_assists": 16.0,
        "def_tackles_for_loss": 3.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 2.5,
        "def_qb_hits": 8.0,
        "def_pass_defended": 6.0
      }
    },
    "penalties": {
      "2025": 4,
      "2026": 0
    },
    "injuries": {
      "2025": [
        "wk12 Questionable (Not injury related - resting player)"
      ]
    },
    "summary_lines": [
      "Cameron Heyward (PIT) Cameron Heyward 2026: PFF DI 2026 overall 79.2 on 319 snaps (DI rank 5); PFR 2026 8 pressures (2 hurries, 5 QB hits, 1.0 sacks) in 6 games, 19 tackles, 1 missed; 8 g / 318 def snaps; 2.5 sacks, 8 QB hits, 3 TFL, 1 FF, 6 PD; 0 accepted penalties; ESPN 2026 DT PRWR outside the published top 20; RSWR outside the published top 10",
      "Cameron Heyward 2025: PFF DI 2025 overall 90.4 on 873 snaps (DI rank 1); PFR 2025 12 pressures (5 hurries, 3 QB knockdowns, 3.5 sacks), 78 tackles, 3 missed; 17 g / 823 def snaps; 3.5 sacks, 9 QB hits, 9 TFL, 1 FF, 6 PD; 4 accepted penalties",
      "Cameron Heyward alignment: depth-chart interior snapshots 2025-26: 0 at DT/NT, 496 at DE (3-4 DE = interior 4i/5-tech) -> DT bucket (DT BUCKET (t46u): interior defensive linemen graded by PFF as DI (pff.com/grades/nfl/di), aligned at DT/NT or 3-4 DE (in...); roster position DL; Madden card DT (reference only)",
      "Cameron Heyward injury reports: wk12 Questionable (Not injury related - resting player); roster status ACT"
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
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/di/2025",
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://www.espn.com/nfl/story/_/id/49742016",
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T11:18:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T11:18:42Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
