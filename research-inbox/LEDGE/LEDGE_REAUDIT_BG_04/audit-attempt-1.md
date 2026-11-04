# LEDGE_REAUDIT_BG_04 — Maxx Crosby background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "LEDGE_REAUDIT_BG_04_A1",
  "task_id": "LEDGE_REAUDIT_BG_04",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "LEDGE",
  "player_id": "ext_00-0034973",
  "players": [
    "Maxx Crosby"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Maxx Crosby",
    "player_id": "ext_00-0034973",
    "team": "LV",
    "side_assignment": {
      "L25": 221,
      "L26": 275,
      "L": 496,
      "R": 0,
      "teams": [
        "BAL",
        "LV"
      ],
      "assign": "LEDGE"
    },
    "side_rule": "EDGE SIDE CONVENTION (t46u): every edge is assigned to exactly one of LEDGE/REDGE by his majority 2025-26 alignment. LEDGE = defense's left edge (aligned over the offense's right tackle); REDGE = defense's right edge (over the offense's left tackle), matching the repo note 'Right-side edge (offense's left)'. Side evidence = nflverse weekly depth charts 2025 + 2026 (ESPN-sourced): each team-day snapshot counts once; LDE (4-3 or 3-4) or 3-4 WLB (ESPN 3-4 layout slot 4, left of LILB) = left; RDE or 3-4 SLB (slot 7, right of RILB) = right; 4-3 WLB/SLB are off-ball LBs and not counted. The side with more snapshots across both seasons wins; a player appears in only one list. PFF alignment splits (left/right snap counts) are paywalled and NGS publishes no side split, so depth charts are the side source; Madden 27's LEDG/REDG card label is reference only and does not decide side.",
    "pff": {
      "2025": {
        "team": "las-vegas-raiders",
        "ovr": 79.7,
        "snaps": 935,
        "prsh": 515,
        "rdef": 410,
        "cov": 10,
        "status": "A"
      },
      "2026": {
        "team": "las-vegas-raiders",
        "ovr": 85.5,
        "snaps": 471,
        "prsh": 277,
        "rdef": 193,
        "cov": 1,
        "status": "A"
      }
    },
    "pressures": {
      "2025": {
        "tm": "LV",
        "pos": "DE",
        "g": "15",
        "prss": "29",
        "hrry": "8",
        "qbkd": "11",
        "sk": "10",
        "comb": "73",
        "m_tkl": "9"
      },
      "2026": {
        "def_pressures": 25.0,
        "def_times_hurried": 11.0,
        "def_times_hitqb": 11.0,
        "def_sacks": 2.0,
        "def_tackles_combined": 18.0,
        "def_missed_tackles": 2.0,
        "g": 7
      }
    },
    "espn_win_rates": {
      "prwr": {
        "rank": 15,
        "wins": 40,
        "plays": 167,
        "rate": 24
      },
      "rswr": null
    },
    "snaps": {
      "2025": {
        "games": 15,
        "defs": 935
      },
      "2026": {
        "games": 8,
        "defs": 473
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 42.0,
        "def_tackle_assists": 28.0,
        "def_tackles_for_loss": 28.0,
        "def_fumbles_forced": 2.0,
        "def_sacks": 10.0,
        "def_qb_hits": 20.0,
        "def_pass_defended": 6.0
      },
      "2026": {
        "def_tackles_solo": 9.0,
        "def_tackle_assists": 13.0,
        "def_tackles_for_loss": 4.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 3.0,
        "def_qb_hits": 18.0,
        "def_pass_defended": 1.0
      }
    },
    "penalties": {
      "2025": 7,
      "2026": 1
    },
    "injuries": {
      "2025": [
        "wk14 Questionable (Knee)",
        "wk17 Out (Knee)"
      ]
    },
    "summary_lines": [
      "Maxx Crosby (LV) Maxx Crosby 2026: PFF edge 2026 overall 85.5 on 471 snaps (277 pass-rush, 193 run-defense, 1 coverage); PFR 2026 25 pressures (11 hurries, 11 QB hits, 2.0 sacks) in 7 games, 18 tackles, 2 missed; 8 g / 473 def snaps; 3.0 sacks, 18 QB hits, 4 TFL, 1 FF, 1 PD; 1 accepted penalties; ESPN 2026 edge PRWR 24% (#15, 40/167); RSWR outside the published top 10",
      "Maxx Crosby 2025: PFF edge 2025 overall 79.7 on 935 snaps (515 pass-rush, 410 run-defense, 10 coverage); PFR 2025 29 pressures (8 hurries, 11 QB knockdowns, 10 sacks), 73 tackles, 9 missed; 15 g / 935 def snaps; 10.0 sacks, 20 QB hits, 28 TFL, 2 FF, 6 PD; 7 accepted penalties",
      "Maxx Crosby alignment: side snapshots 2025-26 left 496 / right 0 -> LEDGE (EDGE SIDE CONVENTION (t46u): every edge is assigned to exactly one of LEDGE/REDGE by his majority 2025-26 alignment. LED...); roster position DL; Madden card LEDG (reference only)",
      "Maxx Crosby injury reports: wk14 Questionable (Knee); wk17 Out (Knee); roster status ACT"
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
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/ed/2025",
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://www.espn.com/nfl/story/_/id/49742016",
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T11:03:27Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T11:03:27Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
