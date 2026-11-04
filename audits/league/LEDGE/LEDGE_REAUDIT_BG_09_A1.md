# LEDGE_REAUDIT_BG_09 — Boye Mafe background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "LEDGE_REAUDIT_BG_09_A1",
  "task_id": "LEDGE_REAUDIT_BG_09",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "LEDGE",
  "player_id": "ext_00-0038133",
  "players": [
    "Boye Mafe"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Boye Mafe",
    "player_id": "ext_00-0038133",
    "team": "CIN",
    "side_assignment": {
      "L25": 36,
      "R25": 167,
      "L26": 275,
      "L": 311,
      "R": 167,
      "teams": [
        "CIN",
        "SEA"
      ],
      "assign": "LEDGE"
    },
    "side_rule": "EDGE SIDE CONVENTION (t46u): every edge is assigned to exactly one of LEDGE/REDGE by his majority 2025-26 alignment. LEDGE = defense's left edge (aligned over the offense's right tackle); REDGE = defense's right edge (over the offense's left tackle), matching the repo note 'Right-side edge (offense's left)'. Side evidence = nflverse weekly depth charts 2025 + 2026 (ESPN-sourced): each team-day snapshot counts once; LDE (4-3 or 3-4) or 3-4 WLB (ESPN 3-4 layout slot 4, left of LILB) = left; RDE or 3-4 SLB (slot 7, right of RILB) = right; 4-3 WLB/SLB are off-ball LBs and not counted. The side with more snapshots across both seasons wins; a player appears in only one list. PFF alignment splits (left/right snap counts) are paywalled and NGS publishes no side split, so depth charts are the side source; Madden 27's LEDG/REDG card label is reference only and does not decide side.",
    "pff": {
      "2025": {
        "team": "seattle-seahawks",
        "ovr": 70.3,
        "snaps": 630,
        "prsh": 383,
        "rdef": 203,
        "cov": 44,
        "status": "A"
      },
      "2026": {
        "team": "cincinnati-bengals",
        "ovr": 85.7,
        "snaps": 353,
        "prsh": 212,
        "rdef": 113,
        "cov": 28,
        "status": "A"
      }
    },
    "pressures": {
      "2025": {
        "tm": "SEA",
        "pos": "LB",
        "g": "17",
        "prss": "17",
        "hrry": "12",
        "qbkd": "3",
        "sk": "2",
        "comb": "31",
        "m_tkl": "2"
      },
      "2026": {
        "def_pressures": 10.0,
        "def_times_hurried": 4.0,
        "def_times_hitqb": 1.0,
        "def_sacks": 4.5,
        "def_tackles_combined": 14.0,
        "def_missed_tackles": 2.0,
        "g": 5
      }
    },
    "espn_win_rates": {
      "prwr": {
        "rank": 10,
        "wins": 31,
        "plays": 123,
        "rate": 25
      },
      "rswr": null
    },
    "snaps": {
      "2025": {
        "games": 17,
        "defs": 561
      },
      "2026": {
        "games": 7,
        "defs": 353
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 11.0,
        "def_tackle_assists": 20.0,
        "def_tackles_for_loss": 4.0,
        "def_fumbles_forced": 1.0,
        "def_sacks": 2.0,
        "def_qb_hits": 4.0,
        "def_pass_defended": 5.0
      },
      "2026": {
        "def_tackles_solo": 12.0,
        "def_tackle_assists": 6.0,
        "def_tackles_for_loss": 7.0,
        "def_fumbles_forced": 2.0,
        "def_sacks": 5.5,
        "def_qb_hits": 8.0,
        "def_pass_defended": 1.0
      }
    },
    "penalties": {
      "2025": 2,
      "2026": 2
    },
    "injuries": {
      "2025": [
        "wk4 Questionable (Toe)"
      ]
    },
    "summary_lines": [
      "Boye Mafe (CIN) Boye Mafe 2026: PFF edge 2026 overall 85.7 on 353 snaps (212 pass-rush, 113 run-defense, 28 coverage); PFR 2026 10 pressures (4 hurries, 1 QB hits, 4.5 sacks) in 5 games, 14 tackles, 2 missed; 7 g / 353 def snaps; 5.5 sacks, 8 QB hits, 7 TFL, 2 FF, 1 PD; 2 accepted penalties; ESPN 2026 edge PRWR 25% (#10, 31/123); RSWR outside the published top 10",
      "Boye Mafe 2025: PFF edge 2025 overall 70.3 on 630 snaps (383 pass-rush, 203 run-defense, 44 coverage); PFR 2025 17 pressures (12 hurries, 3 QB knockdowns, 2 sacks), 31 tackles, 2 missed; 17 g / 561 def snaps; 2.0 sacks, 4 QB hits, 4 TFL, 1 FF, 5 PD; 2 accepted penalties",
      "Boye Mafe alignment: side snapshots 2025-26 left 311 / right 167 -> LEDGE (EDGE SIDE CONVENTION (t46u): every edge is assigned to exactly one of LEDGE/REDGE by his majority 2025-26 alignment. LED...); roster position DL; Madden card REDG (reference only)",
      "Boye Mafe injury reports: wk4 Questionable (Toe); roster status ACT"
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
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/ed/2025",
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://www.espn.com/nfl/story/_/id/49742016",
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T11:03:34Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T11:03:34Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
