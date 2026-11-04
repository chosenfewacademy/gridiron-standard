# FS_REAUDIT_BG_07 — Tykee Smith background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "FS_REAUDIT_BG_07_A1",
  "task_id": "FS_REAUDIT_BG_07",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "FS",
  "player_id": "ext_00-0039846",
  "players": [
    "Tykee Smith"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Tykee Smith",
    "player_id": "ext_00-0039846",
    "team": "TB",
    "role_assignment": "FS (snap-weighted 2025-26 depth-chart FS/SS shares FS 881 / SS 478 -> FS)",
    "side_rule": "SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one of FS or SS by primary 2025-26 alignment = nflverse weekly depth-chart FS/SS slot counts per season weighted by that season's defensive snaps; larger share wins (ties to FS). No FS/SS depth-chart slot -> nflverse roster depth_chart_position. Matched by gsis/PFR id. Each player appears in one list only; Madden position is reference only. Cooper DeJean (2026 FS 103 / SS 108 slot-weeks, CB in 2025) -> SS.",
    "pff": {
      "2025": {
        "team": "tampa-bay-buccaneers",
        "ovr": 65.8,
        "snaps": 892,
        "rank": 42,
        "rdef": 278,
        "cov": 580
      },
      "2026": {
        "team": "tampa-bay-buccaneers",
        "ovr": 77.9,
        "snaps": 466,
        "rank": 10,
        "rdef": 159,
        "cov": 287
      }
    },
    "pfr": {
      "2025": {
        "tm": "TB",
        "pos": "S",
        "g": "16",
        "tgt": "53",
        "cmp": "35",
        "yds": "480",
        "td": "3",
        "rat": "105.9",
        "int": "1",
        "comb": "100",
        "m_tkl": "9"
      },
      "2026": {
        "def_targets": 36.0,
        "def_completions_allowed": 17.0,
        "def_yards_allowed": 233.0,
        "def_ints": 1.0,
        "def_receiving_td_allowed": 3.0,
        "def_tackles_combined": 41.0,
        "def_missed_tackles": 2.0,
        "g": 7
      }
    },
    "snaps": {
      "2025": {
        "games": 16,
        "defs": 893
      },
      "2026": {
        "games": 8,
        "defs": 466
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 60.0,
        "def_tackle_assists": 39.0,
        "def_tackles_for_loss": 6.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 2.0,
        "def_qb_hits": 5.0,
        "def_pass_defended": 13.0,
        "def_interceptions": 1.0
      },
      "2026": {
        "def_tackles_solo": 21.0,
        "def_tackle_assists": 21.0,
        "def_tackles_for_loss": 3.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 0.0,
        "def_qb_hits": 4.0,
        "def_pass_defended": 2.0,
        "def_interceptions": 1.0
      }
    },
    "penalties": {
      "2025": 0,
      "2026": 1
    },
    "injuries": {
      "2025": [
        "wk15 Doubtful (Neck)"
      ]
    },
    "summary_lines": [
      "Tykee Smith (TB) Tykee Smith 2026: PFF S 2026 overall 77.9 on 466 snaps (S rank 10; 287 coverage / 159 run-def snaps); PFR 2026 (7 games) coverage 36 targets / 17 completions / 233 yds / 3 TD / 1 INT; 41 tackles, 2 missed; 8 g / 466 def snaps; 21 solo + 21 ast tackles, 3 TFL, 1 INT, 2 PD, 1 FF; 1 accepted penalties",
      "Tykee Smith 2025: PFF S 2025 overall 65.8 on 892 snaps (S rank 42; 580 coverage / 278 run-def snaps); PFR 2025 coverage 53 targets / 35 completions / 480 yds / 3 TD / passer rating 105.9 / 1 INT; 100 tackles, 9 missed; 16 g / 893 def snaps; 60 solo + 39 ast tackles, 6 TFL, 1 INT, 13 PD, 0 FF; 0 accepted penalties",
      "Tykee Smith role: snap-weighted 2025-26 depth-chart FS/SS shares FS 881 / SS 478 -> FS (SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one o...); roster position DB; Madden card SS (reference only)",
      "Tykee Smith injury reports: wk15 Doubtful (Neck); roster status ACT"
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
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/s/2025",
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:21:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:41Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
