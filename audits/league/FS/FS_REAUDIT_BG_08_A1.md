# FS_REAUDIT_BG_08 — Kevin Byard background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "FS_REAUDIT_BG_08_A1",
  "task_id": "FS_REAUDIT_BG_08",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "FS",
  "player_id": "ext_00-0033132",
  "players": [
    "Kevin Byard"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Kevin Byard",
    "player_id": "ext_00-0033132",
    "team": "NE",
    "role_assignment": "FS (snap-weighted 2025-26 depth-chart FS/SS shares FS 1551 / SS 0 -> FS)",
    "side_rule": "SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one of FS or SS by primary 2025-26 alignment = nflverse weekly depth-chart FS/SS slot counts per season weighted by that season's defensive snaps; larger share wins (ties to FS). No FS/SS depth-chart slot -> nflverse roster depth_chart_position. Matched by gsis/PFR id. Each player appears in one list only; Madden position is reference only. Cooper DeJean (2026 FS 103 / SS 108 slot-weeks, CB in 2025) -> SS.",
    "pff": {
      "2025": {
        "team": "chicago-bears",
        "ovr": 75.4,
        "snaps": 1219,
        "rank": 14,
        "rdef": 487,
        "cov": 720
      },
      "2026": {
        "team": "new-england-patriots",
        "ovr": 55.2,
        "snaps": 480,
        "rank": 71,
        "rdef": 182,
        "cov": 286
      }
    },
    "pfr": {
      "2025": {
        "tm": "CHI",
        "pos": "DB",
        "g": "17",
        "tgt": "52",
        "cmp": "33",
        "yds": "545",
        "td": "7",
        "rat": "98.6",
        "int": "7",
        "comb": "93",
        "m_tkl": "7"
      },
      "2026": {
        "def_targets": 19.0,
        "def_completions_allowed": 12.0,
        "def_yards_allowed": 179.0,
        "def_ints": 0.0,
        "def_receiving_td_allowed": 1.0,
        "def_tackles_combined": 33.0,
        "def_missed_tackles": 3.0,
        "g": 7
      }
    },
    "snaps": {
      "2025": {
        "games": 17,
        "defs": 1071
      },
      "2026": {
        "games": 8,
        "defs": 480
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 58.0,
        "def_tackle_assists": 32.0,
        "def_tackles_for_loss": 4.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.0,
        "def_qb_hits": 0.0,
        "def_pass_defended": 8.0,
        "def_interceptions": 7.0
      },
      "2026": {
        "def_tackles_solo": 20.0,
        "def_tackle_assists": 20.0,
        "def_tackles_for_loss": 0.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.0,
        "def_qb_hits": 1.0,
        "def_pass_defended": 3.0,
        "def_interceptions": 1.0
      }
    },
    "penalties": {
      "2025": 0,
      "2026": 4
    },
    "injuries": {
      "2026": [
        "wk7 Questionable (Chest)"
      ]
    },
    "summary_lines": [
      "Kevin Byard (NE) Kevin Byard 2026: PFF S 2026 overall 55.2 on 480 snaps (S rank 71; 286 coverage / 182 run-def snaps); PFR 2026 (7 games) coverage 19 targets / 12 completions / 179 yds / 1 TD / 0 INT; 33 tackles, 3 missed; 8 g / 480 def snaps; 20 solo + 20 ast tackles, 0 TFL, 1 INT, 3 PD, 0 FF; 4 accepted penalties",
      "Kevin Byard 2025: PFF S 2025 overall 75.4 on 1219 snaps (S rank 14; 720 coverage / 487 run-def snaps); PFR 2025 coverage 52 targets / 33 completions / 545 yds / 7 TD / passer rating 98.6 / 7 INT; 93 tackles, 7 missed; 17 g / 1071 def snaps; 58 solo + 32 ast tackles, 4 TFL, 7 INT, 8 PD, 0 FF; 0 accepted penalties",
      "Kevin Byard role: snap-weighted 2025-26 depth-chart FS/SS shares FS 1551 / SS 0 -> FS (SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one o...); roster position DB; Madden card FS (reference only)",
      "Kevin Byard injury reports: wk7 Questionable (Chest); roster status ACT"
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
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/s/2025",
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:21:42Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:42Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
