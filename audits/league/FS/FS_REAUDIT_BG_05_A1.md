# FS_REAUDIT_BG_05 — Xavier McKinney background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "FS_REAUDIT_BG_05_A1",
  "task_id": "FS_REAUDIT_BG_05",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "FS",
  "player_id": "ext_00-0036388",
  "players": [
    "Xavier McKinney"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Xavier McKinney",
    "player_id": "ext_00-0036388",
    "team": "GB",
    "role_assignment": "FS (snap-weighted 2025-26 depth-chart FS/SS shares FS 1606 / SS 0 -> FS)",
    "side_rule": "SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one of FS or SS by primary 2025-26 alignment = nflverse weekly depth-chart FS/SS slot counts per season weighted by that season's defensive snaps; larger share wins (ties to FS). No FS/SS depth-chart slot -> nflverse roster depth_chart_position. Matched by gsis/PFR id. Each player appears in one list only; Madden position is reference only. Cooper DeJean (2026 FS 103 / SS 108 slot-weeks, CB in 2025) -> SS.",
    "pff": {
      "2025": {
        "team": "green-bay-packers",
        "ovr": 79.3,
        "snaps": 1131,
        "rank": 7,
        "rdef": 451,
        "cov": 665
      },
      "2026": {
        "team": "green-bay-packers",
        "ovr": 71.8,
        "snaps": 552,
        "rank": 20,
        "rdef": 212,
        "cov": 334
      }
    },
    "pfr": {
      "2025": {
        "tm": "GB",
        "pos": "S",
        "g": "16",
        "tgt": "40",
        "cmp": "23",
        "yds": "304",
        "td": "1",
        "rat": "69.2",
        "int": "2",
        "comb": "107",
        "m_tkl": "6"
      },
      "2026": {
        "def_targets": 22.0,
        "def_completions_allowed": 11.0,
        "def_yards_allowed": 172.0,
        "def_ints": 3.0,
        "def_receiving_td_allowed": 1.0,
        "def_tackles_combined": 34.0,
        "def_missed_tackles": 2.0,
        "g": 8
      }
    },
    "snaps": {
      "2025": {
        "games": 16,
        "defs": 1053
      },
      "2026": {
        "games": 8,
        "defs": 553
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 52.0,
        "def_tackle_assists": 53.0,
        "def_tackles_for_loss": 0.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 1.0,
        "def_qb_hits": 2.0,
        "def_pass_defended": 10.0,
        "def_interceptions": 2.0
      },
      "2026": {
        "def_tackles_solo": 20.0,
        "def_tackle_assists": 14.0,
        "def_tackles_for_loss": 1.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 1.0,
        "def_qb_hits": 2.0,
        "def_pass_defended": 4.0,
        "def_interceptions": 3.0
      }
    },
    "penalties": {
      "2025": 2,
      "2026": 1
    },
    "injuries": {},
    "summary_lines": [
      "Xavier McKinney (GB) Xavier McKinney 2026: PFF S 2026 overall 71.8 on 552 snaps (S rank 20; 334 coverage / 212 run-def snaps); PFR 2026 (8 games) coverage 22 targets / 11 completions / 172 yds / 1 TD / 3 INT; 34 tackles, 2 missed; 8 g / 553 def snaps; 20 solo + 14 ast tackles, 1 TFL, 3 INT, 4 PD, 0 FF; 1 accepted penalties",
      "Xavier McKinney 2025: PFF S 2025 overall 79.3 on 1131 snaps (S rank 7; 665 coverage / 451 run-def snaps); PFR 2025 coverage 40 targets / 23 completions / 304 yds / 1 TD / passer rating 69.2 / 2 INT; 107 tackles, 6 missed; 16 g / 1053 def snaps; 52 solo + 53 ast tackles, 0 TFL, 2 INT, 10 PD, 1 FF; 2 accepted penalties",
      "Xavier McKinney role: snap-weighted 2025-26 depth-chart FS/SS shares FS 1606 / SS 0 -> FS (SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one o...); roster position DB; Madden card SS (reference only)",
      "Xavier McKinney injury reports: no injury designation 2025-26; roster status ACT"
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
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/s/2025",
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:21:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:39Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
