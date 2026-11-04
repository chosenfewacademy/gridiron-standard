# SS_REAUDIT_BG_13 — Cooper DeJean background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "SS_REAUDIT_BG_13_A1",
  "task_id": "SS_REAUDIT_BG_13",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "SS",
  "player_id": "ext_00-0039841",
  "players": [
    "Cooper DeJean"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Cooper DeJean",
    "player_id": "ext_00-0039841",
    "team": "PHI",
    "role_assignment": "SS (snap-weighted 2025-26 depth-chart FS/SS shares FS 270 / SS 284 -> SS)",
    "side_rule": "SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one of FS or SS by primary 2025-26 alignment = nflverse weekly depth-chart FS/SS slot counts per season weighted by that season's defensive snaps; larger share wins (ties to FS). No FS/SS depth-chart slot -> nflverse roster depth_chart_position. Matched by gsis/PFR id. Each player appears in one list only; Madden position is reference only. Cooper DeJean (2026 FS 103 / SS 108 slot-weeks, CB in 2025) -> SS.",
    "pff": {
      "2025": null,
      "2026": {
        "team": "philadelphia-eagles",
        "ovr": 54.6,
        "snaps": 554,
        "rank": 73,
        "rdef": 237,
        "cov": 300
      }
    },
    "pfr": {
      "2025": {
        "tm": "PHI",
        "pos": "DB",
        "g": "16",
        "tgt": "81",
        "cmp": "49",
        "yds": "586",
        "td": "1",
        "rat": "76.5",
        "int": "2",
        "comb": "93",
        "m_tkl": "6"
      },
      "2026": {
        "def_targets": 37.0,
        "def_completions_allowed": 22.0,
        "def_yards_allowed": 237.0,
        "def_ints": 1.0,
        "def_receiving_td_allowed": 4.0,
        "def_tackles_combined": 46.0,
        "def_missed_tackles": 7.0,
        "g": 7
      }
    },
    "snaps": {
      "2025": {
        "games": 16,
        "defs": 1037
      },
      "2026": {
        "games": 8,
        "defs": 554
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 63.0,
        "def_tackle_assists": 29.0,
        "def_tackles_for_loss": 4.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 0.0,
        "def_qb_hits": 1.0,
        "def_pass_defended": 16.0,
        "def_interceptions": 2.0
      },
      "2026": {
        "def_tackles_solo": 25.0,
        "def_tackle_assists": 22.0,
        "def_tackles_for_loss": 4.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.0,
        "def_qb_hits": 1.0,
        "def_pass_defended": 5.0,
        "def_interceptions": 1.0
      }
    },
    "penalties": {
      "2025": 2,
      "2026": 4
    },
    "injuries": {},
    "summary_lines": [
      "Cooper DeJean (PHI) Cooper DeJean 2026: PFF S 2026 overall 54.6 on 554 snaps (S rank 73; 300 coverage / 237 run-def snaps); PFR 2026 (7 games) coverage 37 targets / 22 completions / 237 yds / 4 TD / 1 INT; 46 tackles, 7 missed; 8 g / 554 def snaps; 25 solo + 22 ast tackles, 4 TFL, 1 INT, 5 PD, 0 FF; 4 accepted penalties",
      "Cooper DeJean 2025: no PFF S grade 2025; PFR 2025 coverage 81 targets / 49 completions / 586 yds / 1 TD / passer rating 76.5 / 2 INT; 93 tackles, 6 missed; 16 g / 1037 def snaps; 63 solo + 29 ast tackles, 4 TFL, 2 INT, 16 PD, 1 FF; 2 accepted penalties",
      "Cooper DeJean role: snap-weighted 2025-26 depth-chart FS/SS shares FS 270 / SS 284 -> SS (SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one o...); roster position DB; Madden card CB (reference only)",
      "Cooper DeJean injury reports: no injury designation 2025-26; roster status ACT"
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
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/s/2025",
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:29:10Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:29:10Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
