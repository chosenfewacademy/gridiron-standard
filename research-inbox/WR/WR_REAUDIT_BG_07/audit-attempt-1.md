# WR_REAUDIT_BG_07 — Amon-Ra St. Brown background dossier (v1.1.2 stage 2)

Run under commissioner approval t45u.

```json
{
  "audit_id": "WR_REAUDIT_BG_07_A1",
  "task_id": "WR_REAUDIT_BG_07",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "WR",
  "player_id": "amon_ra_st_brown",
  "players": [
    "Amon-Ra St. Brown"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Amon-Ra St. Brown",
    "player_id": "amon_ra_st_brown",
    "team": "DET",
    "age": 27,
    "size": {
      "ht_in": "72",
      "wt_lb": "202"
    },
    "pff": {
      "2026": {
        "grade": 78.9,
        "rank": 19,
        "snaps": {
          "off": "409",
          "routes": "258",
          "rblk": "150"
        }
      },
      "2025": {
        "grade": 90.7,
        "snaps": {
          "off": "940",
          "routes": "589",
          "rblk": "343"
        }
      }
    },
    "stats_2026": {
      "team": "DET",
      "games": 7,
      "tgt": 76,
      "rec": 53,
      "yds": 571,
      "td": 5,
      "epa_tgt": 0.313,
      "epa": 23.8,
      "adot": 8.4,
      "sep": 2.88,
      "yac_oe": -0.34,
      "pff": 78.9,
      "pff_rank": 19,
      "routes": 258,
      "yprr": 2.21,
      "tprr": 0.295
    },
    "stats_2025": {
      "team": "DET",
      "games": 17,
      "tgt": 172,
      "rec": 117,
      "yds": 1401,
      "td": 11,
      "epa_tgt": 0.323,
      "epa": 55.6,
      "adot": 8.1,
      "sep": 2.94,
      "yac_oe": 0.3,
      "pff": 90.7,
      "pff_rank": 3,
      "routes": 589,
      "yprr": 2.38,
      "tprr": 0.292
    },
    "splits_2026": {
      "deep_tgt": 5,
      "deep_catch": 0.4,
      "deep_epa_tgt": 0.48,
      "yac_rec": 3.9,
      "short_catch": 0.79,
      "rz_tgt": 16,
      "third_down_conv": "10/25",
      "fum_lost": 0
    },
    "splits_2025": {
      "deep_tgt": 8,
      "deep_catch": 0.38,
      "deep_epa_tgt": 0.1,
      "yac_rec": 4.9,
      "short_catch": 0.74,
      "rz_tgt": 35,
      "third_down_conv": "28/63",
      "fum_lost": 0
    },
    "usage_2026": {
      "offensive_snaps": 409,
      "games": 7
    },
    "summary_lines": [
      "Amon-Ra St. Brown (DET) 2026: 7 g, 76 tgt, 53 rec, 571 yds, 5 TD, EPA/tgt 0.313, aDOT 8.4, NGS separation 2.88, YAC over expected -0.34, YPRR 2.21, TPRR 0.295, routes 258; deep (20+ air yds) 5 tgt catch 0.4 EPA/tgt 0.48, short (<10) catch 0.79, YAC/rec 3.9, red-zone tgt 16, 3rd/4th-down conv 10/25, fumbles lost 0",
      "Amon-Ra St. Brown (DET) 2025: 17 g, 172 tgt, 117 rec, 1401 yds, 11 TD, EPA/tgt 0.323, aDOT 8.1, NGS separation 2.94, YAC over expected 0.3, YPRR 2.38, TPRR 0.292, routes 589; deep (20+ air yds) 8 tgt catch 0.38 EPA/tgt 0.1, short (<10) catch 0.74, YAC/rec 4.9, red-zone tgt 35, 3rd/4th-down conv 28/63, fumbles lost 0",
      "Amon-Ra St. Brown PFF WR offense grade 2026 78.9 (rank 19), 2025 90.7; 2026 PFF snaps {'off': '409', 'routes': '258', 'rblk': '150'}",
      "Amon-Ra St. Brown 2026 usage: 409 offensive snaps in 7 games (nflverse snap_counts); age 27, 72 in, 202 lb; roster status ACT"
    ],
    "availability": {
      "roster_status": "ACT"
    },
    "limitations": [
      "PFF drop rate, contested-catch rate and man/zone splits are paywalled; hands/contested traits judged from catch rates by depth, red-zone results and film-consensus style"
    ],
    "attributes_informed": [
      "SPD",
      "ACC",
      "AGI",
      "COD",
      "STR",
      "AWR",
      "CTH",
      "CIT",
      "SPC",
      "SRR",
      "MRR",
      "DRR",
      "RLS",
      "JMP",
      "CAR",
      "BTK",
      "SPM",
      "JKM",
      "INJ",
      "STA",
      "TGH"
    ],
    "provenance": [
      {
        "url": "https://www.pff.com/grades/nfl/wr/2026",
        "retrieved_at": "2026-11-03T14:51:37Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/wr/2025",
        "retrieved_at": "2026-11-03T14:51:37Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T14:51:37Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T14:51:37Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T14:51:37Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T14:51:37Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T14:51:37Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
