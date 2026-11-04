# FS_REAUDIT_BG_06 — Quentin Lake background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "FS_REAUDIT_BG_06_A1",
  "task_id": "FS_REAUDIT_BG_06",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "FS",
  "player_id": "ext_00-0037841",
  "players": [
    "Quentin Lake"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Quentin Lake",
    "player_id": "ext_00-0037841",
    "team": "LA",
    "role_assignment": "FS (snap-weighted 2025-26 depth-chart FS/SS shares FS 634 / SS 0 -> FS)",
    "side_rule": "SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one of FS or SS by primary 2025-26 alignment = nflverse weekly depth-chart FS/SS slot counts per season weighted by that season's defensive snaps; larger share wins (ties to FS). No FS/SS depth-chart slot -> nflverse roster depth_chart_position. Matched by gsis/PFR id. Each player appears in one list only; Madden position is reference only. Cooper DeJean (2026 FS 103 / SS 108 slot-weeks, CB in 2025) -> SS.",
    "pff": {
      "2025": {
        "team": "los-angeles-rams",
        "ovr": 69.4,
        "snaps": 849,
        "rank": 31,
        "rdef": 314,
        "cov": 503
      },
      "2026": {
        "team": "los-angeles-rams",
        "ovr": 77,
        "snaps": 515,
        "rank": 12,
        "rdef": 207,
        "cov": 286
      }
    },
    "pfr": {
      "2025": {
        "tm": "LA",
        "pos": "S",
        "g": "10",
        "tgt": "47",
        "cmp": "29",
        "yds": "353",
        "td": "1",
        "rat": "83",
        "int": "1",
        "comb": "61",
        "m_tkl": "2"
      },
      "2026": {
        "def_targets": 41.0,
        "def_completions_allowed": 25.0,
        "def_yards_allowed": 261.0,
        "def_ints": 2.0,
        "def_receiving_td_allowed": 2.0,
        "def_tackles_combined": 49.0,
        "def_missed_tackles": 5.0,
        "g": 7
      }
    },
    "snaps": {
      "2025": {
        "games": 10,
        "defs": 634
      },
      "2026": {
        "games": 8,
        "defs": 516
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 35.0,
        "def_tackle_assists": 24.0,
        "def_tackles_for_loss": 2.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 1.0,
        "def_qb_hits": 2.0,
        "def_pass_defended": 10.0,
        "def_interceptions": 1.0
      },
      "2026": {
        "def_tackles_solo": 34.0,
        "def_tackle_assists": 22.0,
        "def_tackles_for_loss": 0.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 0.0,
        "def_qb_hits": 0.0,
        "def_pass_defended": 11.0,
        "def_interceptions": 3.0
      }
    },
    "penalties": {
      "2025": 3,
      "2026": 5
    },
    "injuries": {
      "2025": [
        "wk18 Out (Elbow)"
      ],
      "2026": [
        "wk5 Questionable (Hip)"
      ]
    },
    "summary_lines": [
      "Quentin Lake (LA) Quentin Lake 2026: PFF S 2026 overall 77 on 515 snaps (S rank 12; 286 coverage / 207 run-def snaps); PFR 2026 (7 games) coverage 41 targets / 25 completions / 261 yds / 2 TD / 2 INT; 49 tackles, 5 missed; 8 g / 516 def snaps; 34 solo + 22 ast tackles, 0 TFL, 3 INT, 11 PD, 1 FF; 5 accepted penalties",
      "Quentin Lake 2025: PFF S 2025 overall 69.4 on 849 snaps (S rank 31; 503 coverage / 314 run-def snaps); PFR 2025 coverage 47 targets / 29 completions / 353 yds / 1 TD / passer rating 83 / 1 INT; 61 tackles, 2 missed; 10 g / 634 def snaps; 35 solo + 24 ast tackles, 2 TFL, 1 INT, 10 PD, 1 FF; 3 accepted penalties",
      "Quentin Lake role: snap-weighted 2025-26 depth-chart FS/SS shares FS 634 / SS 0 -> FS (SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one o...); roster position DB; Madden card SS (reference only)",
      "Quentin Lake injury reports: wk18 Out (Elbow); wk5 Questionable (Hip); roster status ACT"
    ],
    "availability": {
      "roster_status": "ACT"
    },
    "limitations": [
      "PFF coverage/run-defense/tackling sub-grades and box/slot/deep alignment splits are paywalled; no public tracking data for safety speed or range; substitutes: PFF S overall + coverage/run-def snap counts, PFR coverage allowed, INT/PD, tackles vs missed tackles, penalties, injury reports"
    ],
    "attributes_informed": [
      "SPD",
      "ACC",
      "AGI",
      "COD",
      "STR",
      "AWR",
      "PRC",
      "MCV",
      "ZCV",
      "PRS",
      "CTH",
      "JMP",
      "TAK",
      "POW",
      "PUR",
      "INJ",
      "STA",
      "TGH"
    ],
    "provenance": [
      {
        "url": "https://www.pff.com/grades/nfl/s/2026",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/s/2025",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:21:40Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:40Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
