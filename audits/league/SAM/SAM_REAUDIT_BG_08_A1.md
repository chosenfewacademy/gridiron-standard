# SAM_REAUDIT_BG_08 — Dennis Gardeck background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "SAM_REAUDIT_BG_08_A1",
  "task_id": "SAM_REAUDIT_BG_08",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "SAM",
  "player_id": "ext_00-0034473",
  "players": [
    "Dennis Gardeck"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "dossier": {
    "player": "Dennis Gardeck",
    "player_id": "ext_00-0034473",
    "team": "JAX",
    "role_assignment": {
      "SAM25": 221,
      "SAM26": 103,
      "MIKE": 0.0,
      "WILL": 0.0,
      "SAM": 601.0,
      "EDGE": 0.0,
      "assign": "SAM"
    },
    "side_rule": "LB ROLE CONVENTION (t46u): every off-ball linebacker is assigned to exactly one of MIKE/WILL/SAM by his primary 2025-26 role = snap-weighted share of nflverse depth-chart snapshots: Base 4-3 MLB -> MIKE, WLB -> WILL, SLB -> SAM; Base 3-4 RILB (strong-side inside LB) -> MIKE, LILB (weak-side inside LB) -> WILL; 3-4 WLB/SLB are edge rushers (LEDGE/REDGE lists). Each season's slot shares are weighted by that season's nflverse defensive snaps; largest share wins (tie -> MIKE, then WILL). Players are matched by gsis/PFR id, not name. Each player appears in one list only.",
    "pff": {
      "2025": {
        "team": "jacksonville-jaguars",
        "ovr": 56.5,
        "snaps": 446,
        "rank": 56,
        "rdef": 165,
        "prsh": 135,
        "cov": 146
      },
      "2026": null
    },
    "pfr": {
      "2025": {
        "tm": "JAX",
        "pos": "OLB",
        "g": "17",
        "tgt": "17",
        "cmp": "14",
        "yds": "136",
        "rat": "100",
        "int": "0",
        "bltz": "20",
        "prss": "12",
        "sk": "2.5",
        "comb": "48",
        "m_tkl": "1"
      },
      "2026": {
        "def_targets": 7.0,
        "def_completions_allowed": 3.0,
        "def_yards_allowed": 52.0,
        "def_ints": 0.0,
        "def_times_blitzed": 2.0,
        "def_pressures": 4.0,
        "def_sacks": 0.0,
        "def_tackles_combined": 12.0,
        "def_missed_tackles": 1.0,
        "g": 5
      }
    },
    "snaps": {
      "2025": {
        "games": 17,
        "defs": 423
      },
      "2026": {
        "games": 7,
        "defs": 178
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 27.0,
        "def_tackle_assists": 20.0,
        "def_tackles_for_loss": 6.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 2.5,
        "def_qb_hits": 9.0,
        "def_pass_defended": 2.0,
        "def_interceptions": 0.0
      },
      "2026": {
        "def_tackles_solo": 10.0,
        "def_tackle_assists": 6.0,
        "def_tackles_for_loss": 1.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.0,
        "def_qb_hits": 5.0,
        "def_pass_defended": 1.0,
        "def_interceptions": 0.0
      }
    },
    "penalties": {
      "2025": 4,
      "2026": 0
    },
    "injuries": {},
    "summary_lines": [
      "Dennis Gardeck (JAX) Dennis Gardeck 2026: no PFF LB grade 2026; PFR 2026 (5 games) coverage 7 targets / 3 completions / 52 yds / 0 INT; 12 tackles, 1 missed; 4 pressures on 2 blitzes; 7 g / 178 def snaps; 10 solo + 6 ast tackles, 1 TFL, 0.0 sacks, 0 INT, 1 PD, 0 FF; 0 accepted penalties",
      "Dennis Gardeck 2025: PFF LB 2025 overall 56.5 on 446 snaps (LB rank 56; 165 run-def / 146 coverage / 135 pass-rush snaps); PFR 2025 coverage 17 targets / 14 completions / 136 yds / passer rating 100 / 0 INT; 48 tackles, 1 missed; 12 pressures on 20 blitzes, 2.5 sacks; 17 g / 423 def snaps; 27 solo + 20 ast tackles, 6 TFL, 2.5 sacks, 0 INT, 2 PD, 1 FF; 4 accepted penalties",
      "Dennis Gardeck role: snap-weighted 2025-26 depth-chart role shares MIKE 0 / WILL 0 / SAM 601 / edge 0 (raw snapshots SAM25 221, SAM26 103) -> SAM (LB ROLE CONVENTION (t46u): every off-ball linebacker is assigned to exactly one of MIKE/WILL/SAM by his primary 2025-26 ...); roster position LB; Madden card SAM (reference only)",
      "Dennis Gardeck injury reports: no injury designation 2025-26; roster status ACT"
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
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/lb/2025",
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T11:53:56Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:53:56Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
