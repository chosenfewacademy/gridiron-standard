# MIKE_REAUDIT_BG_01 — Fred Warner background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "MIKE_REAUDIT_BG_01_A1",
  "task_id": "MIKE_REAUDIT_BG_01",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "MIKE",
  "player_id": "ext_00-0034815",
  "players": [
    "Fred Warner"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Fred Warner",
    "player_id": "ext_00-0034815",
    "team": "SF",
    "role_assignment": {
      "MIKE25": 221,
      "MIKE26": 275,
      "MIKE": 782.0,
      "WILL": 0.0,
      "SAM": 0.0,
      "EDGE": 0.0,
      "assign": "MIKE"
    },
    "side_rule": "LB ROLE CONVENTION (t46u): every off-ball linebacker is assigned to exactly one of MIKE/WILL/SAM by his primary 2025-26 role = snap-weighted share of nflverse depth-chart snapshots: Base 4-3 MLB -> MIKE, WLB -> WILL, SLB -> SAM; Base 3-4 RILB (strong-side inside LB) -> MIKE, LILB (weak-side inside LB) -> WILL; 3-4 WLB/SLB are edge rushers (LEDGE/REDGE lists). Each season's slot shares are weighted by that season's nflverse defensive snaps; largest share wins (tie -> MIKE, then WILL). Players are matched by gsis/PFR id, not name. Each player appears in one list only.",
    "pff": {
      "2025": {
        "team": "san-francisco-49ers",
        "ovr": 93.2,
        "snaps": 330,
        "rank": 1,
        "rdef": 126,
        "prsh": 11,
        "cov": 193
      },
      "2026": {
        "team": "san-francisco-49ers",
        "ovr": 81.3,
        "snaps": 452,
        "rank": 3,
        "rdef": 171,
        "prsh": 35,
        "cov": 246
      }
    },
    "pfr": {
      "2025": {
        "tm": "SF",
        "pos": "LB",
        "g": "6",
        "tgt": "26",
        "cmp": "15",
        "yds": "142",
        "rat": "72.9",
        "int": "0",
        "bltz": "5",
        "prss": "0",
        "sk": "0",
        "comb": "51",
        "m_tkl": "2"
      },
      "2026": {
        "def_targets": 30.0,
        "def_completions_allowed": 22.0,
        "def_yards_allowed": 207.0,
        "def_ints": 0.0,
        "def_times_blitzed": 28.0,
        "def_pressures": 4.0,
        "def_sacks": 0.5,
        "def_tackles_combined": 71.0,
        "def_missed_tackles": 6.0,
        "g": 7
      }
    },
    "snaps": {
      "2025": {
        "games": 6,
        "defs": 330
      },
      "2026": {
        "games": 7,
        "defs": 452
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 27.0,
        "def_tackle_assists": 23.0,
        "def_tackles_for_loss": 2.0,
        "def_fumbles_forced": 2.0,
        "def_sacks": 0.0,
        "def_qb_hits": 0.0,
        "def_pass_defended": 3.0,
        "def_interceptions": 0.0
      },
      "2026": {
        "def_tackles_solo": 33.0,
        "def_tackle_assists": 37.0,
        "def_tackles_for_loss": 3.0,
        "def_fumbles_forced": 3.0,
        "def_sacks": 0.5,
        "def_qb_hits": 3.0,
        "def_pass_defended": 3.0,
        "def_interceptions": 0.0
      }
    },
    "penalties": {
      "2025": 0,
      "2026": 1
    },
    "injuries": {
      "2025": [
        "wk7 Out (Ankle)",
        "wk20 Out (Ankle)"
      ]
    },
    "summary_lines": [
      "Fred Warner (SF) Fred Warner 2026: PFF LB 2026 overall 81.3 on 452 snaps (LB rank 3; 171 run-def / 246 coverage / 35 pass-rush snaps); PFR 2026 (7 games) coverage 30 targets / 22 completions / 207 yds / 0 INT; 71 tackles, 6 missed; 4 pressures on 28 blitzes; 7 g / 452 def snaps; 33 solo + 37 ast tackles, 3 TFL, 0.5 sacks, 0 INT, 3 PD, 3 FF; 1 accepted penalties",
      "Fred Warner 2025: PFF LB 2025 overall 93.2 on 330 snaps (LB rank 1; 126 run-def / 193 coverage / 11 pass-rush snaps); PFR 2025 coverage 26 targets / 15 completions / 142 yds / passer rating 72.9 / 0 INT; 51 tackles, 2 missed; 0 pressures on 5 blitzes, 0 sacks; 6 g / 330 def snaps; 27 solo + 23 ast tackles, 2 TFL, 0.0 sacks, 0 INT, 3 PD, 2 FF; 0 accepted penalties",
      "Fred Warner role: snap-weighted 2025-26 depth-chart role shares MIKE 782 / WILL 0 / SAM 0 / edge 0 (raw snapshots MIKE25 221, MIKE26 275) -> MIKE (LB ROLE CONVENTION (t46u): every off-ball linebacker is assigned to exactly one of MIKE/WILL/SAM by his primary 2025-26 ...); roster position LB; Madden card MIKE (reference only)",
      "Fred Warner injury reports: wk7 Out (Ankle); wk20 Out (Ankle); roster status ACT"
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
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/lb/2025",
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T11:38:31Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:38:31Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
