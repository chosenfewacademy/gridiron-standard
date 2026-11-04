# REDGE_REAUDIT_BG_11 — Al-Quadin Muhammad background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "REDGE_REAUDIT_BG_11_A1",
  "task_id": "REDGE_REAUDIT_BG_11",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "REDGE",
  "player_id": "ext_00-0033964",
  "players": [
    "Al-Quadin Muhammad"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Al-Quadin Muhammad",
    "player_id": "ext_00-0033964",
    "team": "TB",
    "side_assignment": {
      "L25": 51,
      "R25": 168,
      "L26": 110,
      "R26": 164,
      "L": 161,
      "R": 332,
      "teams": [
        "DET",
        "TB"
      ],
      "assign": "REDGE"
    },
    "side_rule": "EDGE SIDE CONVENTION (t46u): every edge is assigned to exactly one of LEDGE/REDGE by his majority 2025-26 alignment. LEDGE = defense's left edge (aligned over the offense's right tackle); REDGE = defense's right edge (over the offense's left tackle), matching the repo note 'Right-side edge (offense's left)'. Side evidence = nflverse weekly depth charts 2025 + 2026 (ESPN-sourced): each team-day snapshot counts once; LDE (4-3 or 3-4) or 3-4 WLB (ESPN 3-4 layout slot 4, left of LILB) = left; RDE or 3-4 SLB (slot 7, right of RILB) = right; 4-3 WLB/SLB are off-ball LBs and not counted. The side with more snapshots across both seasons wins; a player appears in only one list. PFF alignment splits (left/right snap counts) are paywalled and NGS publishes no side split, so depth charts are the side source; Madden 27's LEDG/REDG card label is reference only and does not decide side.",
    "pff": {
      "2025": {
        "team": "detroit-lions",
        "ovr": 74.5,
        "snaps": 457,
        "prsh": 353,
        "rdef": 83,
        "cov": 21,
        "status": "A"
      },
      "2026": {
        "team": "tampa-bay-buccaneers",
        "ovr": 81,
        "snaps": 206,
        "prsh": 119,
        "rdef": 68,
        "cov": 19,
        "status": "A"
      }
    },
    "pressures": {
      "2025": {
        "tm": "DET",
        "pos": "DE",
        "g": "17",
        "prss": "26",
        "hrry": "6",
        "qbkd": "8",
        "sk": "11",
        "comb": "25",
        "m_tkl": "0"
      },
      "2026": {
        "def_pressures": 6.0,
        "def_times_hurried": 2.0,
        "def_times_hitqb": 2.0,
        "def_sacks": 2.0,
        "def_tackles_combined": 5.0,
        "def_missed_tackles": 0.0,
        "g": 5
      }
    },
    "espn_win_rates": {
      "prwr": null,
      "rswr": null
    },
    "snaps": {
      "2025": {
        "games": 17,
        "defs": 457
      },
      "2026": {
        "games": 8,
        "defs": 206
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 15.0,
        "def_tackle_assists": 10.0,
        "def_tackles_for_loss": 9.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 11.0,
        "def_qb_hits": 20.0,
        "def_pass_defended": 0.0
      },
      "2026": {
        "def_tackles_solo": 4.0,
        "def_tackle_assists": 2.0,
        "def_tackles_for_loss": 2.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 2.0,
        "def_qb_hits": 4.0,
        "def_pass_defended": 1.0
      }
    },
    "penalties": {
      "2025": 0,
      "2026": 0
    },
    "injuries": {
      "2025": [
        "wk4 Questionable (Knee)",
        "wk17 Questionable (Knee)"
      ]
    },
    "summary_lines": [
      "Al-Quadin Muhammad (TB) Al-Quadin Muhammad 2026: PFF edge 2026 overall 81 on 206 snaps (119 pass-rush, 68 run-defense, 19 coverage); PFR 2026 6 pressures (2 hurries, 2 QB hits, 2.0 sacks) in 5 games, 5 tackles, 0 missed; 8 g / 206 def snaps; 2.0 sacks, 4 QB hits, 2 TFL, 1 FF, 1 PD; 0 accepted penalties; ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
      "Al-Quadin Muhammad 2025: PFF edge 2025 overall 74.5 on 457 snaps (353 pass-rush, 83 run-defense, 21 coverage); PFR 2025 26 pressures (6 hurries, 8 QB knockdowns, 11 sacks), 25 tackles, 0 missed; 17 g / 457 def snaps; 11.0 sacks, 20 QB hits, 9 TFL, 0 FF, 0 PD; 0 accepted penalties",
      "Al-Quadin Muhammad alignment: side snapshots 2025-26 left 161 / right 332 -> REDGE (EDGE SIDE CONVENTION (t46u): every edge is assigned to exactly one of LEDGE/REDGE by his majority 2025-26 alignment. LED...); roster position LB; Madden card LEDG (reference only)",
      "Al-Quadin Muhammad injury reports: wk4 Questionable (Knee); wk17 Questionable (Knee); roster status ACT"
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
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/ed/2025",
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://www.espn.com/nfl/story/_/id/49742016",
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T04:31:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T04:31:41Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
