# FS_REAUDIT_BG_11 — Chuck Clark background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "FS_REAUDIT_BG_11_A1",
  "task_id": "FS_REAUDIT_BG_11",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "FS",
  "player_id": "ext_00-0033294",
  "players": [
    "Chuck Clark"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Chuck Clark",
    "player_id": "ext_00-0033294",
    "team": "DET",
    "role_assignment": "FS (snap-weighted 2025-26 depth-chart FS/SS shares FS 610 / SS 253 -> FS)",
    "side_rule": "SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one of FS or SS by primary 2025-26 alignment = nflverse weekly depth-chart FS/SS slot counts per season weighted by that season's defensive snaps; larger share wins (ties to FS). No FS/SS depth-chart slot -> nflverse roster depth_chart_position. Matched by gsis/PFR id. Each player appears in one list only; Madden position is reference only. Cooper DeJean (2026 FS 103 / SS 108 slot-weeks, CB in 2025) -> SS.",
    "pff": {
      "2025": {
        "team": "pittsburgh-steelers",
        "ovr": 74.6,
        "snaps": 470,
        "rank": 16,
        "rdef": 174,
        "cov": 292
      },
      "2026": {
        "team": "detroit-lions",
        "ovr": 68.8,
        "snaps": 426,
        "rank": 29,
        "rdef": 140,
        "cov": 279
      }
    },
    "pfr": {
      "2025": {
        "tm": "PIT",
        "pos": "S",
        "g": "15",
        "tgt": "31",
        "cmp": "23",
        "yds": "356",
        "td": "4",
        "rat": "151.3",
        "int": "0",
        "comb": "51",
        "m_tkl": "4"
      },
      "2026": {
        "def_targets": 26.0,
        "def_completions_allowed": 12.0,
        "def_yards_allowed": 159.0,
        "def_ints": 1.0,
        "def_receiving_td_allowed": 0.0,
        "def_tackles_combined": 40.0,
        "def_missed_tackles": 2.0,
        "g": 6
      }
    },
    "snaps": {
      "2025": {
        "games": 12,
        "defs": 437
      },
      "2026": {
        "games": 7,
        "defs": 426
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 29.0,
        "def_tackle_assists": 20.0,
        "def_tackles_for_loss": 2.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 0.0,
        "def_qb_hits": 1.0,
        "def_pass_defended": 3.0,
        "def_interceptions": 0.0
      },
      "2026": {
        "def_tackles_solo": 24.0,
        "def_tackle_assists": 19.0,
        "def_tackles_for_loss": 1.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 1.0,
        "def_qb_hits": 2.0,
        "def_pass_defended": 2.0,
        "def_interceptions": 1.0
      }
    },
    "penalties": {
      "2025": 0,
      "2026": 0
    },
    "injuries": {
      "2025": [
        "wk9 Questionable (Illness)"
      ]
    },
    "summary_lines": [
      "Chuck Clark (DET) Chuck Clark 2026: PFF S 2026 overall 68.8 on 426 snaps (S rank 29; 279 coverage / 140 run-def snaps); PFR 2026 (6 games) coverage 26 targets / 12 completions / 159 yds / 0 TD / 1 INT; 40 tackles, 2 missed; 7 g / 426 def snaps; 24 solo + 19 ast tackles, 1 TFL, 1 INT, 2 PD, 1 FF; 0 accepted penalties",
      "Chuck Clark 2025: PFF S 2025 overall 74.6 on 470 snaps (S rank 16; 292 coverage / 174 run-def snaps); PFR 2025 coverage 31 targets / 23 completions / 356 yds / 4 TD / passer rating 151.3 / 0 INT; 51 tackles, 4 missed; 12 g / 437 def snaps; 29 solo + 20 ast tackles, 2 TFL, 0 INT, 3 PD, 1 FF; 0 accepted penalties",
      "Chuck Clark role: snap-weighted 2025-26 depth-chart FS/SS shares FS 610 / SS 253 -> FS (SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one o...); roster position DB; Madden card FS (reference only)",
      "Chuck Clark injury reports: wk9 Questionable (Illness); roster status ACT"
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
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/s/2025",
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:21:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:21:46Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
