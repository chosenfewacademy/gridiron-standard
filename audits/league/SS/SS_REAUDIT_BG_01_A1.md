# SS_REAUDIT_BG_01 — Kyle Hamilton background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "SS_REAUDIT_BG_01_A1",
  "task_id": "SS_REAUDIT_BG_01",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "SS",
  "player_id": "ext_00-0038038",
  "players": [
    "Kyle Hamilton"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Kyle Hamilton",
    "player_id": "ext_00-0038038",
    "team": "BAL",
    "role_assignment": "SS (snap-weighted 2025-26 depth-chart FS/SS shares FS 0 / SS 1506 -> SS)",
    "side_rule": "SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one of FS or SS by primary 2025-26 alignment = nflverse weekly depth-chart FS/SS slot counts per season weighted by that season's defensive snaps; larger share wins (ties to FS). No FS/SS depth-chart slot -> nflverse roster depth_chart_position. Matched by gsis/PFR id. Each player appears in one list only; Madden position is reference only. Cooper DeJean (2026 FS 103 / SS 108 slot-weeks, CB in 2025) -> SS.",
    "pff": {
      "2025": {
        "team": "baltimore-ravens",
        "ovr": 86.3,
        "snaps": 1003,
        "rank": 2,
        "rdef": 344,
        "cov": 590
      },
      "2026": {
        "team": "baltimore-ravens",
        "ovr": 77.3,
        "snaps": 502,
        "rank": 11,
        "rdef": 189,
        "cov": 263
      }
    },
    "pfr": {
      "2025": {
        "tm": "BAL",
        "pos": "S",
        "g": "16",
        "tgt": "57",
        "cmp": "35",
        "yds": "301",
        "td": "4",
        "rat": "98.6",
        "int": "0",
        "comb": "105",
        "m_tkl": "9"
      },
      "2026": {
        "def_targets": 28.0,
        "def_completions_allowed": 19.0,
        "def_yards_allowed": 208.0,
        "def_ints": 1.0,
        "def_receiving_td_allowed": 1.0,
        "def_tackles_combined": 50.0,
        "def_missed_tackles": 5.0,
        "g": 7
      }
    },
    "snaps": {
      "2025": {
        "games": 16,
        "defs": 1003
      },
      "2026": {
        "games": 8,
        "defs": 503
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 59.0,
        "def_tackle_assists": 46.0,
        "def_tackles_for_loss": 7.0,
        "def_fumbles_forced": 2.0,
        "def_sacks": 1.0,
        "def_qb_hits": 4.0,
        "def_pass_defended": 9.0,
        "def_interceptions": 0.0
      },
      "2026": {
        "def_tackles_solo": 38.0,
        "def_tackle_assists": 17.0,
        "def_tackles_for_loss": 8.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 0.0,
        "def_qb_hits": 1.0,
        "def_pass_defended": 4.0,
        "def_interceptions": 1.0
      }
    },
    "penalties": {
      "2025": 4,
      "2026": 3
    },
    "injuries": {
      "2025": [
        "wk5 Questionable (Groin)",
        "wk16 Questionable (Ankle)"
      ]
    },
    "summary_lines": [
      "Kyle Hamilton (BAL) Kyle Hamilton 2026: PFF S 2026 overall 77.3 on 502 snaps (S rank 11; 263 coverage / 189 run-def snaps); PFR 2026 (7 games) coverage 28 targets / 19 completions / 208 yds / 1 TD / 1 INT; 50 tackles, 5 missed; 8 g / 503 def snaps; 38 solo + 17 ast tackles, 8 TFL, 1 INT, 4 PD, 1 FF; 3 accepted penalties",
      "Kyle Hamilton 2025: PFF S 2025 overall 86.3 on 1003 snaps (S rank 2; 590 coverage / 344 run-def snaps); PFR 2025 coverage 57 targets / 35 completions / 301 yds / 4 TD / passer rating 98.6 / 0 INT; 105 tackles, 9 missed; 16 g / 1003 def snaps; 59 solo + 46 ast tackles, 7 TFL, 0 INT, 9 PD, 2 FF; 4 accepted penalties",
      "Kyle Hamilton role: snap-weighted 2025-26 depth-chart FS/SS shares FS 0 / SS 1506 -> SS (SAFETY ROLE CONVENTION (t46u): every PFF-graded safety (pff.com/grades/nfl/s, 2025 or 2026) is assigned to exactly one o...); roster position DB; Madden card SS (reference only)",
      "Kyle Hamilton injury reports: wk5 Questionable (Groin); wk16 Questionable (Ankle); roster status ACT"
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
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/s/2025",
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:28:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:28:57Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
