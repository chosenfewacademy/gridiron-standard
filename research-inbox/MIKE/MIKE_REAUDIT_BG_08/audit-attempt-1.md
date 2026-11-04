# MIKE_REAUDIT_BG_08 — Cedric Gray background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "MIKE_REAUDIT_BG_08_A1",
  "task_id": "MIKE_REAUDIT_BG_08",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "MIKE",
  "player_id": "ext_00-0039858",
  "players": [
    "Cedric Gray"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Cedric Gray",
    "player_id": "ext_00-0039858",
    "team": "TEN",
    "role_assignment": {
      "WILL25": 40,
      "MIKE25": 181,
      "WILL26": 275,
      "MIKE": 755.1,
      "WILL": 394.9,
      "SAM": 0.0,
      "EDGE": 0.0,
      "assign": "MIKE"
    },
    "side_rule": "LB ROLE CONVENTION (t46u): every off-ball linebacker is assigned to exactly one of MIKE/WILL/SAM by his primary 2025-26 role = snap-weighted share of nflverse depth-chart snapshots: Base 4-3 MLB -> MIKE, WLB -> WILL, SLB -> SAM; Base 3-4 RILB (strong-side inside LB) -> MIKE, LILB (weak-side inside LB) -> WILL; 3-4 WLB/SLB are edge rushers (LEDGE/REDGE lists). Each season's slot shares are weighted by that season's nflverse defensive snaps; largest share wins (tie -> MIKE, then WILL). Players are matched by gsis/PFR id, not name. Each player appears in one list only.",
    "pff": {
      "2025": {
        "team": "tennessee-titans",
        "ovr": 78.9,
        "snaps": 921,
        "rank": 7,
        "rdef": 389,
        "prsh": 60,
        "cov": 472
      },
      "2026": {
        "team": "tennessee-titans",
        "ovr": 57.1,
        "snaps": 228,
        "rank": 52,
        "rdef": 127,
        "prsh": 5,
        "cov": 96
      }
    },
    "pfr": {
      "2025": {
        "tm": "TEN",
        "pos": "LB",
        "g": "16",
        "tgt": "59",
        "cmp": "48",
        "yds": "424",
        "rat": "102.3",
        "int": "0",
        "bltz": "34",
        "prss": "7",
        "sk": "1",
        "comb": "164",
        "m_tkl": "7"
      },
      "2026": {
        "def_targets": 12.0,
        "def_completions_allowed": 9.0,
        "def_yards_allowed": 53.0,
        "def_ints": 0.0,
        "def_times_blitzed": 1.0,
        "def_pressures": 1.0,
        "def_sacks": 0.5,
        "def_tackles_combined": 34.0,
        "def_missed_tackles": 1.0,
        "g": 6
      }
    },
    "snaps": {
      "2025": {
        "games": 16,
        "defs": 922
      },
      "2026": {
        "games": 7,
        "defs": 228
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 94.0,
        "def_tackle_assists": 67.0,
        "def_tackles_for_loss": 7.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 1.0,
        "def_qb_hits": 3.0,
        "def_pass_defended": 4.0,
        "def_interceptions": 0.0
      },
      "2026": {
        "def_tackles_solo": 16.0,
        "def_tackle_assists": 19.0,
        "def_tackles_for_loss": 2.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.5,
        "def_qb_hits": 0.0,
        "def_pass_defended": 0.0,
        "def_interceptions": 0.0
      }
    },
    "penalties": {
      "2025": 5,
      "2026": 2
    },
    "injuries": {
      "2025": [
        "wk16 Out (Concussion)"
      ],
      "2026": [
        "wk1 Out (Concussion)",
        "wk2 Questionable (Concussion)"
      ]
    },
    "summary_lines": [
      "Cedric Gray (TEN) Cedric Gray 2026: PFF LB 2026 overall 57.1 on 228 snaps (LB rank 52; 127 run-def / 96 coverage / 5 pass-rush snaps); PFR 2026 (6 games) coverage 12 targets / 9 completions / 53 yds / 0 INT; 34 tackles, 1 missed; 1 pressures on 1 blitzes; 7 g / 228 def snaps; 16 solo + 19 ast tackles, 2 TFL, 0.5 sacks, 0 INT, 0 PD, 0 FF; 2 accepted penalties",
      "Cedric Gray 2025: PFF LB 2025 overall 78.9 on 921 snaps (LB rank 7; 389 run-def / 472 coverage / 60 pass-rush snaps); PFR 2025 coverage 59 targets / 48 completions / 424 yds / passer rating 102.3 / 0 INT; 164 tackles, 7 missed; 7 pressures on 34 blitzes, 1 sacks; 16 g / 922 def snaps; 94 solo + 67 ast tackles, 7 TFL, 1.0 sacks, 0 INT, 4 PD, 0 FF; 5 accepted penalties",
      "Cedric Gray role: snap-weighted 2025-26 depth-chart role shares MIKE 755 / WILL 395 / SAM 0 / edge 0 (raw snapshots WILL25 40, MIKE25 181, WILL26 275) -> MIKE (LB ROLE CONVENTION (t46u): every off-ball linebacker is assigned to exactly one of MIKE/WILL/SAM by his primary 2025-26 ...); roster position LB; Madden card WILL (reference only)",
      "Cedric Gray injury reports: wk16 Out (Concussion); wk1 Out (Concussion); wk2 Questionable (Concussion); roster status ACT"
    ],
    "availability": {
      "roster_status": "ACT"
    },
    "limitations": [
      "PFF run-defense/coverage/tackling sub-grades and alignment splits are paywalled; no public tracking data for LB speed; substitutes: PFF LB overall + run/coverage/pass-rush snap counts, PFR coverage allowed, tackles vs missed tackles, blitz pressures, TFL/INT/PD, penalties, depth-chart role, injury reports"
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
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/lb/2025",
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T11:38:38Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:38:38Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
