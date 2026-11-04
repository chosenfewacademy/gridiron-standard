# SAM_REAUDIT_BG_10 — Malcolm Rodriguez background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "SAM_REAUDIT_BG_10_A1",
  "task_id": "SAM_REAUDIT_BG_10",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "SAM",
  "player_id": "ext_00-0037289",
  "players": [
    "Malcolm Rodriguez"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "dossier": {
    "player": "Malcolm Rodriguez",
    "player_id": "ext_00-0037289",
    "team": "DET",
    "role_assignment": {
      "WILL25": 221,
      "SAM26": 275,
      "MIKE": 0.0,
      "WILL": 72.0,
      "SAM": 120.0,
      "EDGE": 0.0,
      "assign": "SAM"
    },
    "side_rule": "LB ROLE CONVENTION (t46u): every off-ball linebacker is assigned to exactly one of MIKE/WILL/SAM by his primary 2025-26 role = snap-weighted share of nflverse depth-chart snapshots: Base 4-3 MLB -> MIKE, WLB -> WILL, SLB -> SAM; Base 3-4 RILB (strong-side inside LB) -> MIKE, LILB (weak-side inside LB) -> WILL; 3-4 WLB/SLB are edge rushers (LEDGE/REDGE lists). Each season's slot shares are weighted by that season's nflverse defensive snaps; largest share wins (tie -> MIKE, then WILL). Players are matched by gsis/PFR id, not name. Each player appears in one list only.",
    "pff": {
      "2025": {
        "team": "detroit-lions",
        "ovr": 28.4,
        "snaps": 72,
        "rank": null,
        "rdef": 32,
        "prsh": 3,
        "cov": 37
      },
      "2026": {
        "team": "detroit-lions",
        "ovr": 82.7,
        "snaps": 120,
        "rank": null,
        "rdef": 59,
        "prsh": 3,
        "cov": 58
      }
    },
    "pfr": {
      "2025": {
        "tm": "DET",
        "pos": "LB",
        "g": "7",
        "tgt": "8",
        "cmp": "8",
        "yds": "84",
        "rat": "110.4",
        "int": "0",
        "bltz": "2",
        "prss": "0",
        "sk": "0",
        "comb": "12",
        "m_tkl": "3"
      },
      "2026": {
        "def_targets": 5.0,
        "def_completions_allowed": 5.0,
        "def_yards_allowed": 18.0,
        "def_ints": 0.0,
        "def_times_blitzed": 1.0,
        "def_pressures": 2.0,
        "def_sacks": 0.5,
        "def_tackles_combined": 13.0,
        "def_missed_tackles": 0.0,
        "g": 4
      }
    },
    "snaps": {
      "2025": {
        "games": 6,
        "defs": 72
      },
      "2026": {
        "games": 6,
        "defs": 120
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 9.0,
        "def_tackle_assists": 3.0,
        "def_tackles_for_loss": 1.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.0,
        "def_qb_hits": 0.0,
        "def_pass_defended": 0.0,
        "def_interceptions": 0.0
      },
      "2026": {
        "def_tackles_solo": 8.0,
        "def_tackle_assists": 10.0,
        "def_tackles_for_loss": 0.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.5,
        "def_qb_hits": 2.0,
        "def_pass_defended": 0.0,
        "def_interceptions": 0.0
      }
    },
    "penalties": {
      "2025": 0,
      "2026": 1
    },
    "injuries": {
      "2025": [
        "wk9 Out (Knee)",
        "wk10 Out (Knee)",
        "wk11 Out (Knee)"
      ]
    },
    "summary_lines": [
      "Malcolm Rodriguez (DET) Malcolm Rodriguez 2026: PFF LB 2026 overall 82.7 on 120 snaps (LB rank None; 59 run-def / 58 coverage / 3 pass-rush snaps); PFR 2026 (4 games) coverage 5 targets / 5 completions / 18 yds / 0 INT; 13 tackles, 0 missed; 2 pressures on 1 blitzes; 6 g / 120 def snaps; 8 solo + 10 ast tackles, 0 TFL, 0.5 sacks, 0 INT, 0 PD, 0 FF; 1 accepted penalties",
      "Malcolm Rodriguez 2025: PFF LB 2025 overall 28.4 on 72 snaps (LB rank None; 32 run-def / 37 coverage / 3 pass-rush snaps); PFR 2025 coverage 8 targets / 8 completions / 84 yds / passer rating 110.4 / 0 INT; 12 tackles, 3 missed; 0 pressures on 2 blitzes, 0 sacks; 6 g / 72 def snaps; 9 solo + 3 ast tackles, 1 TFL, 0.0 sacks, 0 INT, 0 PD, 0 FF; 0 accepted penalties",
      "Malcolm Rodriguez role: snap-weighted 2025-26 depth-chart role shares MIKE 0 / WILL 72 / SAM 120 / edge 0 (raw snapshots WILL25 221, SAM26 275) -> SAM (LB ROLE CONVENTION (t46u): every off-ball linebacker is assigned to exactly one of MIKE/WILL/SAM by his primary 2025-26 ...); roster position LB; Madden card SAM (reference only)",
      "Malcolm Rodriguez injury reports: wk9 Out (Knee); wk10 Out (Knee); wk11 Out (Knee); roster status ACT"
    ],
    "availability": {
      "roster_status": "ACT"
    },
    "limitations": [
      "PFF run-defense/coverage/tackling sub-grades and alignment splits are paywalled; no public tracking data for LB speed; substitutes: PFF LB overall + run/coverage/pass-rush snap counts, PFR coverage allowed, tackles vs missed tackles, blitz pressures, TFL/INT/PD, penalties, depth-chart role, injury reports",
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
      "TAK",
      "POW",
      "BSH",
      "PUR",
      "MCV",
      "ZCV",
      "PRS",
      "INJ",
      "STA",
      "TGH"
    ],
    "provenance": [
      {
        "url": "https://www.pff.com/grades/nfl/lb/2026",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/lb/2025",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T11:53:58Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:53:58Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
