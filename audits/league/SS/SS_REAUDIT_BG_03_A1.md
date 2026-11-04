# SS_REAUDIT_BG_03 — Jessie Bates background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "SS_REAUDIT_BG_03_A1",
  "task_id": "SS_REAUDIT_BG_03",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "SS",
  "player_id": "ext_00-0034675",
  "players": [
    "Jessie Bates"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Jessie Bates",
    "player_id": "ext_00-0034675",
    "team": "ATL",
    "role_assignment": "SS (snap-weighted 2025-26 depth-chart FS/SS shares FS 0 / SS 1624 -> SS)",
    "side_rule": "SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one of FS or SS by primary 2025-26 alignment = nflverse weekly depth-chart FS/SS slot counts per season weighted by that season's defensive snaps; larger share wins (ties to FS). No FS/SS depth-chart slot -> nflverse roster depth_chart_position. Matched by gsis/PFR id. Each player appears in one list only; Madden position is reference only. Cooper DeJean (2026 FS 103 / SS 108 slot-weeks, CB in 2025) -> SS.",
    "pff": {
      "2025": {
        "team": "atlanta-falcons",
        "ovr": 64.5,
        "snaps": 1091,
        "rank": 47,
        "rdef": 424,
        "cov": 656
      },
      "2026": {
        "team": "atlanta-falcons",
        "ovr": 84.1,
        "snaps": 532,
        "rank": 4,
        "rdef": 206,
        "cov": 320
      }
    },
    "pfr": {
      "2025": {
        "tm": "ATL",
        "pos": "S",
        "g": "17",
        "tgt": "48",
        "cmp": "27",
        "yds": "345",
        "td": "3",
        "rat": "73.7",
        "int": "3",
        "comb": "98",
        "m_tkl": "8"
      },
      "2026": {
        "def_targets": 26.0,
        "def_completions_allowed": 16.0,
        "def_yards_allowed": 215.0,
        "def_ints": 1.0,
        "def_receiving_td_allowed": 5.0,
        "def_tackles_combined": 39.0,
        "def_missed_tackles": 1.0,
        "g": 7
      }
    },
    "snaps": {
      "2025": {
        "games": 17,
        "defs": 1092
      },
      "2026": {
        "games": 8,
        "defs": 532
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 56.0,
        "def_tackle_assists": 41.0,
        "def_tackles_for_loss": 1.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 0.0,
        "def_qb_hits": 2.0,
        "def_pass_defended": 6.0,
        "def_interceptions": 3.0
      },
      "2026": {
        "def_tackles_solo": 24.0,
        "def_tackle_assists": 21.0,
        "def_tackles_for_loss": 0.0,
        "def_fumbles_forced": 3.0,
        "def_sacks": 0.0,
        "def_qb_hits": 0.0,
        "def_pass_defended": 4.0,
        "def_interceptions": 1.0
      }
    },
    "penalties": {
      "2025": 1,
      "2026": 0
    },
    "injuries": {
      "2025": [
        "wk9 Questionable (Knee)"
      ]
    },
    "summary_lines": [
      "Jessie Bates (ATL) Jessie Bates 2026: PFF S 2026 overall 84.1 on 532 snaps (S rank 4; 320 coverage / 206 run-def snaps); PFR 2026 (7 games) coverage 26 targets / 16 completions / 215 yds / 5 TD / 1 INT; 39 tackles, 1 missed; 8 g / 532 def snaps; 24 solo + 21 ast tackles, 0 TFL, 1 INT, 4 PD, 3 FF; 0 accepted penalties",
      "Jessie Bates 2025: PFF S 2025 overall 64.5 on 1091 snaps (S rank 47; 656 coverage / 424 run-def snaps); PFR 2025 coverage 48 targets / 27 completions / 345 yds / 3 TD / passer rating 73.7 / 3 INT; 98 tackles, 8 missed; 17 g / 1092 def snaps; 56 solo + 41 ast tackles, 1 TFL, 3 INT, 6 PD, 1 FF; 1 accepted penalties",
      "Jessie Bates role: snap-weighted 2025-26 depth-chart FS/SS shares FS 0 / SS 1624 -> SS (SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one o...); roster position DB; Madden card FS (reference only)",
      "Jessie Bates injury reports: wk9 Questionable (Knee); roster status ACT"
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
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/s/2025",
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:28:59Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:28:59Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
