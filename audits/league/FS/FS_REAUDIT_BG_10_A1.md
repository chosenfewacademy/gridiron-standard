# FS_REAUDIT_BG_10 — Thomas Harper background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "FS_REAUDIT_BG_10_A1",
  "task_id": "FS_REAUDIT_BG_10",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "FS",
  "player_id": "ext_00-0039660",
  "players": [
    "Thomas Harper"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "dossier": {
    "player": "Thomas Harper",
    "player_id": "ext_00-0039660",
    "team": "DET",
    "role_assignment": "FS (snap-weighted 2025-26 depth-chart FS/SS shares FS 348 / SS 222 -> FS)",
    "side_rule": "SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one of FS or SS by primary 2025-26 alignment = nflverse weekly depth-chart FS/SS slot counts per season weighted by that season's defensive snaps; larger share wins (ties to FS). No FS/SS depth-chart slot -> nflverse roster depth_chart_position. Matched by gsis/PFR id. Each player appears in one list only; Madden position is reference only. Cooper DeJean (2026 FS 103 / SS 108 slot-weeks, CB in 2025) -> SS.",
    "pff": {
      "2025": {
        "team": "detroit-lions",
        "ovr": 78,
        "snaps": 482,
        "rank": 11,
        "rdef": 195,
        "cov": 285
      },
      "2026": {
        "team": "detroit-lions",
        "ovr": 55.2,
        "snaps": 87,
        "rank": null,
        "rdef": 22,
        "cov": 61
      }
    },
    "pfr": {
      "2025": {
        "tm": "DET",
        "pos": "S",
        "g": "12",
        "tgt": "18",
        "cmp": "11",
        "yds": "194",
        "td": "2",
        "rat": "111.8",
        "int": "1",
        "comb": "37",
        "m_tkl": "5"
      },
      "2026": {
        "def_targets": 8.0,
        "def_completions_allowed": 5.0,
        "def_yards_allowed": 128.0,
        "def_ints": 0.0,
        "def_receiving_td_allowed": 1.0,
        "def_tackles_combined": 5.0,
        "def_missed_tackles": 0.0,
        "g": 2
      }
    },
    "snaps": {
      "2025": {
        "games": 10,
        "defs": 483
      },
      "2026": {
        "games": 2,
        "defs": 87
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 26.0,
        "def_tackle_assists": 11.0,
        "def_tackles_for_loss": 1.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 0.0,
        "def_qb_hits": 0.0,
        "def_pass_defended": 5.0,
        "def_interceptions": 1.0
      },
      "2026": {
        "def_tackles_solo": 5.0,
        "def_tackle_assists": 0.0,
        "def_tackles_for_loss": 0.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.0,
        "def_qb_hits": 0.0,
        "def_pass_defended": 2.0,
        "def_interceptions": 0.0
      }
    },
    "penalties": {
      "2025": 0,
      "2026": 0
    },
    "injuries": {
      "2025": [
        "wk15 Out (Concussion)",
        "wk18 Out (Concussion)"
      ],
      "2026": [
        "wk3 Out (Ankle)"
      ]
    },
    "summary_lines": [
      "Thomas Harper (DET) Thomas Harper 2026: PFF S 2026 overall 55.2 on 87 snaps (S rank None; 61 coverage / 22 run-def snaps); PFR 2026 (2 games) coverage 8 targets / 5 completions / 128 yds / 1 TD / 0 INT; 5 tackles, 0 missed; 2 g / 87 def snaps; 5 solo + 0 ast tackles, 0 TFL, 0 INT, 2 PD, 0 FF; 0 accepted penalties",
      "Thomas Harper 2025: PFF S 2025 overall 78 on 482 snaps (S rank 11; 285 coverage / 195 run-def snaps); PFR 2025 coverage 18 targets / 11 completions / 194 yds / 2 TD / passer rating 111.8 / 1 INT; 37 tackles, 5 missed; 10 g / 483 def snaps; 26 solo + 11 ast tackles, 1 TFL, 1 INT, 5 PD, 1 FF; 0 accepted penalties",
      "Thomas Harper role: snap-weighted 2025-26 depth-chart FS/SS shares FS 348 / SS 222 -> FS (SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one o...); roster position DB; Madden card FS (reference only)",
      "Thomas Harper injury reports: wk15 Out (Concussion); wk18 Out (Concussion); wk3 Out (Ankle); roster status RES"
    ],
    "availability": {
      "roster_status": "RES"
    },
    "limitations": [
      "PFF coverage/run-defense/tackling sub-grades and box/slot/deep alignment splits are paywalled; no public tracking data for safety speed or range; substitutes: PFF S overall + coverage/run-def snap counts, PFR coverage allowed, INT/PD, tackles vs missed tackles, penalties, injury reports",
      "limited 2026 sample (reserve/IR/PUP)"
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
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/s/2025",
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:21:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:44Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
