# REDGE_REAUDIT_BG_10 — Laiatu Latu background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "REDGE_REAUDIT_BG_10_A1",
  "task_id": "REDGE_REAUDIT_BG_10",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "REDGE",
  "player_id": "ext_00-0039340",
  "players": [
    "Laiatu Latu"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Laiatu Latu",
    "player_id": "ext_00-0039340",
    "team": "IND",
    "side_assignment": {
      "R25": 221,
      "R26": 275,
      "L": 0,
      "R": 496,
      "teams": [
        "IND"
      ],
      "assign": "REDGE"
    },
    "side_rule": "EDGE SIDE CONVENTION (t46u): every edge is assigned to exactly one of LEDGE/REDGE by his majority 2025-26 alignment. LEDGE = defense's left edge (aligned over the offense's right tackle); REDGE = defense's right edge (over the offense's left tackle), matching the repo note 'Right-side edge (offense's left)'. Side evidence = nflverse weekly depth charts 2025 + 2026 (ESPN-sourced): each team-day snapshot counts once; LDE (4-3 or 3-4) or 3-4 WLB (ESPN 3-4 layout slot 4, left of LILB) = left; RDE or 3-4 SLB (slot 7, right of RILB) = right; 4-3 WLB/SLB are off-ball LBs and not counted. The side with more snapshots across both seasons wins; a player appears in only one list. PFF alignment splits (left/right snap counts) are paywalled and NGS publishes no side split, so depth charts are the side source; Madden 27's LEDG/REDG card label is reference only and does not decide side.",
    "pff": {
      "2025": {
        "team": "indianapolis-colts",
        "ovr": 84.1,
        "snaps": 755,
        "prsh": 437,
        "rdef": 253,
        "cov": 65,
        "status": "A"
      },
      "2026": {
        "team": "indianapolis-colts",
        "ovr": 66.6,
        "snaps": 370,
        "prsh": 194,
        "rdef": 145,
        "cov": 31,
        "status": "A"
      }
    },
    "pressures": {
      "2025": {
        "tm": "IND",
        "pos": "DE",
        "g": "16",
        "prss": "26",
        "hrry": "7",
        "qbkd": "9",
        "sk": "8.5",
        "comb": "45",
        "m_tkl": "8"
      },
      "2026": {
        "def_pressures": 9.0,
        "def_times_hurried": 3.0,
        "def_times_hitqb": 4.0,
        "def_sacks": 1.0,
        "def_tackles_combined": 17.0,
        "def_missed_tackles": 0.0,
        "g": 7
      }
    },
    "espn_win_rates": {
      "prwr": null,
      "rswr": null
    },
    "snaps": {
      "2025": {
        "games": 16,
        "defs": 756
      },
      "2026": {
        "games": 8,
        "defs": 370
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 25.0,
        "def_tackle_assists": 18.0,
        "def_tackles_for_loss": 12.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 8.5,
        "def_qb_hits": 20.0,
        "def_pass_defended": 5.0
      },
      "2026": {
        "def_tackles_solo": 11.0,
        "def_tackle_assists": 8.0,
        "def_tackles_for_loss": 1.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 2.0,
        "def_qb_hits": 8.0,
        "def_pass_defended": 2.0
      }
    },
    "penalties": {
      "2025": 2,
      "2026": 1
    },
    "injuries": {
      "2025": [
        "wk2 Questionable (Hamstring)"
      ]
    },
    "summary_lines": [
      "Laiatu Latu (IND) Laiatu Latu 2026: PFF edge 2026 overall 66.6 on 370 snaps (194 pass-rush, 145 run-defense, 31 coverage); PFR 2026 9 pressures (3 hurries, 4 QB hits, 1.0 sacks) in 7 games, 17 tackles, 0 missed; 8 g / 370 def snaps; 2.0 sacks, 8 QB hits, 1 TFL, 0 FF, 2 PD; 1 accepted penalties; ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
      "Laiatu Latu 2025: PFF edge 2025 overall 84.1 on 755 snaps (437 pass-rush, 253 run-defense, 65 coverage); PFR 2025 26 pressures (7 hurries, 9 QB knockdowns, 8.5 sacks), 45 tackles, 8 missed; 16 g / 756 def snaps; 8.5 sacks, 20 QB hits, 12 TFL, 1 FF, 5 PD; 2 accepted penalties",
      "Laiatu Latu alignment: side snapshots 2025-26 left 0 / right 496 -> REDGE (EDGE SIDE CONVENTION (t46u): every edge is assigned to exactly one of LEDGE/REDGE by his majority 2025-26 alignment. LED...); roster position DL; Madden card LEDG (reference only)",
      "Laiatu Latu injury reports: wk2 Questionable (Hamstring); roster status ACT"
    ],
    "availability": {
      "roster_status": "ACT"
    },
    "limitations": [
      "PFF pass-rush and run-defense sub-grades and left/right alignment splits are paywalled; substitutes: PFF edge overall + pass-rush/run-defense snap counts, ESPN PRWR/RSWR (published top 20 / top 10 only), PFR pressures, sacks/QB hits/TFL, penalties, depth-chart side, injury reports"
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
      "PMV",
      "FMV",
      "PUR",
      "INJ",
      "STA",
      "TGH"
    ],
    "provenance": [
      {
        "url": "https://www.pff.com/grades/nfl/ed/2026",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/ed/2025",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://www.espn.com/nfl/story/_/id/49742016",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T04:31:39Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T04:31:39Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
