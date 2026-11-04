# SS_REAUDIT_BG_07 — Kamren Curl background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "SS_REAUDIT_BG_07_A1",
  "task_id": "SS_REAUDIT_BG_07",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "SS",
  "player_id": "ext_00-0036349",
  "players": [
    "Kamren Curl"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Kamren Curl",
    "player_id": "ext_00-0036349",
    "team": "LA",
    "role_assignment": "SS (snap-weighted 2025-26 depth-chart FS/SS shares FS 312 / SS 1279 -> SS)",
    "side_rule": "SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one of FS or SS by primary 2025-26 alignment = nflverse weekly depth-chart FS/SS slot counts per season weighted by that season's defensive snaps; larger share wins (ties to FS). No FS/SS depth-chart slot -> nflverse roster depth_chart_position. Matched by gsis/PFR id. Each player appears in one list only; Madden position is reference only. Cooper DeJean (2026 FS 103 / SS 108 slot-weeks, CB in 2025) -> SS.",
    "pff": {
      "2025": {
        "team": "los-angeles-rams",
        "ovr": 78.3,
        "snaps": 1324,
        "rank": 10,
        "rdef": 487,
        "cov": 804
      },
      "2026": {
        "team": "los-angeles-rams",
        "ovr": 55.9,
        "snaps": 478,
        "rank": 70,
        "rdef": 188,
        "cov": 271
      }
    },
    "pfr": {
      "2025": {
        "tm": "LA",
        "pos": "S",
        "g": "17",
        "tgt": "64",
        "cmp": "47",
        "yds": "522",
        "td": "1",
        "rat": "89.5",
        "int": "2",
        "comb": "122",
        "m_tkl": "7"
      },
      "2026": {
        "def_targets": 16.0,
        "def_completions_allowed": 12.0,
        "def_yards_allowed": 124.0,
        "def_ints": 0.0,
        "def_receiving_td_allowed": 1.0,
        "def_tackles_combined": 34.0,
        "def_missed_tackles": 7.0,
        "g": 7
      }
    },
    "snaps": {
      "2025": {
        "games": 17,
        "defs": 1112
      },
      "2026": {
        "games": 8,
        "defs": 479
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 75.0,
        "def_tackle_assists": 43.0,
        "def_tackles_for_loss": 2.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 2.0,
        "def_qb_hits": 2.0,
        "def_pass_defended": 5.0,
        "def_interceptions": 2.0
      },
      "2026": {
        "def_tackles_solo": 22.0,
        "def_tackle_assists": 15.0,
        "def_tackles_for_loss": 3.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.0,
        "def_qb_hits": 0.0,
        "def_pass_defended": 2.0,
        "def_interceptions": 0.0
      }
    },
    "penalties": {
      "2025": 1,
      "2026": 0
    },
    "injuries": {
      "2026": [
        "wk6 Questionable (Ankle)"
      ]
    },
    "summary_lines": [
      "Kamren Curl (LA) Kamren Curl 2026: PFF S 2026 overall 55.9 on 478 snaps (S rank 70; 271 coverage / 188 run-def snaps); PFR 2026 (7 games) coverage 16 targets / 12 completions / 124 yds / 1 TD / 0 INT; 34 tackles, 7 missed; 8 g / 479 def snaps; 22 solo + 15 ast tackles, 3 TFL, 0 INT, 2 PD, 0 FF; 0 accepted penalties",
      "Kamren Curl 2025: PFF S 2025 overall 78.3 on 1324 snaps (S rank 10; 804 coverage / 487 run-def snaps); PFR 2025 coverage 64 targets / 47 completions / 522 yds / 1 TD / passer rating 89.5 / 2 INT; 122 tackles, 7 missed; 17 g / 1112 def snaps; 75 solo + 43 ast tackles, 2 TFL, 2 INT, 5 PD, 1 FF; 1 accepted penalties",
      "Kamren Curl role: snap-weighted 2025-26 depth-chart FS/SS shares FS 312 / SS 1279 -> SS (SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one o...); roster position DB; Madden card SS (reference only)",
      "Kamren Curl injury reports: wk6 Questionable (Ankle); roster status ACT"
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
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/s/2025",
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:29:03Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:29:03Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
