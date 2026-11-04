# SAM_REAUDIT_BG_09 — E.J. Speed background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "SAM_REAUDIT_BG_09_A1",
  "task_id": "SAM_REAUDIT_BG_09",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "SAM",
  "player_id": "ext_00-0034987",
  "players": [
    "E.J. Speed"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "dossier": {
    "player": "E.J. Speed",
    "player_id": "ext_00-0034987",
    "team": "HOU",
    "role_assignment": {
      "SAM25": 221,
      "WILL25": 1,
      "WILL26": 31,
      "SAM26": 244,
      "MIKE": 0.0,
      "WILL": 2.0,
      "SAM": 428.0,
      "EDGE": 0.0,
      "assign": "SAM"
    },
    "side_rule": "LB ROLE CONVENTION (t46u): every off-ball linebacker is assigned to exactly one of MIKE/WILL/SAM by his primary 2025-26 role = snap-weighted share of nflverse depth-chart snapshots: Base 4-3 MLB -> MIKE, WLB -> WILL, SLB -> SAM; Base 3-4 RILB (strong-side inside LB) -> MIKE, LILB (weak-side inside LB) -> WILL; 3-4 WLB/SLB are edge rushers (LEDGE/REDGE lists). Each season's slot shares are weighted by that season's nflverse defensive snaps; largest share wins (tie -> MIKE, then WILL). Players are matched by gsis/PFR id, not name. Each player appears in one list only.",
    "pff": {
      "2025": {
        "team": "houston-texans",
        "ovr": 55.6,
        "snaps": 444,
        "rank": 59,
        "rdef": 171,
        "prsh": 32,
        "cov": 241
      },
      "2026": null
    },
    "pfr": {
      "2025": {
        "tm": "HOU",
        "pos": "LB",
        "g": "16",
        "tgt": "27",
        "cmp": "16",
        "yds": "141",
        "rat": "85.6",
        "int": "0",
        "bltz": "24",
        "prss": "3",
        "sk": "0",
        "comb": "62",
        "m_tkl": "6"
      },
      "2026": null
    },
    "snaps": {
      "2025": {
        "games": 16,
        "defs": 429
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 31.0,
        "def_tackle_assists": 29.0,
        "def_tackles_for_loss": 3.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.0,
        "def_qb_hits": 2.0,
        "def_pass_defended": 1.0,
        "def_interceptions": 0.0
      }
    },
    "penalties": {
      "2025": 4,
      "2026": 0
    },
    "injuries": {
      "2025": [
        "wk15 Questionable (Knee)"
      ]
    },
    "summary_lines": [
      "E.J. Speed (HOU) E.J. Speed 2026: no PFF LB grade 2026; no PFR 2026 line; no snaps; no stats; 0 accepted penalties",
      "E.J. Speed 2025: PFF LB 2025 overall 55.6 on 444 snaps (LB rank 59; 171 run-def / 241 coverage / 32 pass-rush snaps); PFR 2025 coverage 27 targets / 16 completions / 141 yds / passer rating 85.6 / 0 INT; 62 tackles, 6 missed; 3 pressures on 24 blitzes, 0 sacks; 16 g / 429 def snaps; 31 solo + 29 ast tackles, 3 TFL, 0.0 sacks, 0 INT, 1 PD, 0 FF; 4 accepted penalties",
      "E.J. Speed role: snap-weighted 2025-26 depth-chart role shares MIKE 0 / WILL 2 / SAM 428 / edge 0 (raw snapshots SAM25 221, WILL25 1, WILL26 31, SAM26 244) -> SAM (LB ROLE CONVENTION (t46u): every off-ball linebacker is assigned to exactly one of MIKE/WILL/SAM by his primary 2025-26 ...); roster position LB; Madden card SAM (reference only)",
      "E.J. Speed injury reports: wk15 Questionable (Knee); roster status RES"
    ],
    "availability": {
      "roster_status": "RES"
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
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/lb/2025",
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T11:53:57Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:53:57Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
