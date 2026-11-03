# WR_REAUDIT_BG_02 — Puka Nacua background dossier (v1.1.2 stage 2)

Run under commissioner approval t45u.

```json
{
  "audit_id": "WR_REAUDIT_BG_02_A1",
  "task_id": "WR_REAUDIT_BG_02",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "WR",
  "player_id": "puka_nacua",
  "players": [
    "Puka Nacua"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Puka Nacua",
    "player_id": "puka_nacua",
    "team": "LA",
    "age": 25,
    "size": {
      "ht_in": "74",
      "wt_lb": "216"
    },
    "pff": {
      "2026": {
        "grade": 90.3,
        "rank": 5,
        "snaps": {
          "off": "354",
          "routes": "223",
          "rblk": "129"
        }
      },
      "2025": {
        "grade": 96.2,
        "snaps": {
          "off": "904",
          "routes": "599",
          "rblk": "280"
        }
      }
    },
    "stats_2026": {
      "team": "LA",
      "games": 6,
      "tgt": 74,
      "rec": 56,
      "yds": 565,
      "td": 3,
      "epa_tgt": 0.194,
      "epa": 14.4,
      "adot": 7.7,
      "sep": 3.09,
      "yac_oe": 1.68,
      "pff": 90.3,
      "pff_rank": 5,
      "routes": 223,
      "yprr": 2.53,
      "tprr": 0.332
    },
    "stats_2025": {
      "team": "LA",
      "games": 16,
      "tgt": 166,
      "rec": 129,
      "yds": 1715,
      "td": 10,
      "epa_tgt": 0.697,
      "epa": 115.7,
      "adot": 9.4,
      "sep": 2.83,
      "yac_oe": 1.32,
      "pff": 96.2,
      "pff_rank": 1,
      "routes": 599,
      "yprr": 2.86,
      "tprr": 0.277
    },
    "splits_2026": {
      "deep_tgt": 9,
      "deep_catch": 0.22,
      "deep_epa_tgt": -0.51,
      "yac_rec": 5.8,
      "short_catch": 0.9,
      "rz_tgt": 11,
      "third_down_conv": "5/20",
      "fum_lost": 0
    },
    "splits_2025": {
      "deep_tgt": 23,
      "deep_catch": 0.57,
      "deep_epa_tgt": 1.16,
      "yac_rec": 5.2,
      "short_catch": 0.84,
      "rz_tgt": 17,
      "third_down_conv": "28/48",
      "fum_lost": 1
    },
    "usage_2026": {
      "offensive_snaps": 354,
      "games": 6
    },
    "summary_lines": [
      "Puka Nacua (LA) 2026: 6 g, 74 tgt, 56 rec, 565 yds, 3 TD, EPA/tgt 0.194, aDOT 7.7, NGS separation 3.09, YAC over expected 1.68, YPRR 2.53, TPRR 0.332, routes 223; deep (20+ air yds) 9 tgt catch 0.22 EPA/tgt -0.51, short (<10) catch 0.9, YAC/rec 5.8, red-zone tgt 11, 3rd/4th-down conv 5/20, fumbles lost 0",
      "Puka Nacua (LA) 2025: 16 g, 166 tgt, 129 rec, 1715 yds, 10 TD, EPA/tgt 0.697, aDOT 9.4, NGS separation 2.83, YAC over expected 1.32, YPRR 2.86, TPRR 0.277, routes 599; deep (20+ air yds) 23 tgt catch 0.57 EPA/tgt 1.16, short (<10) catch 0.84, YAC/rec 5.2, red-zone tgt 17, 3rd/4th-down conv 28/48, fumbles lost 1",
      "Puka Nacua PFF WR offense grade 2026 90.3 (rank 5), 2025 96.2; 2026 PFF snaps {'off': '354', 'routes': '223', 'rblk': '129'}",
      "Puka Nacua 2026 usage: 354 offensive snaps in 6 games (nflverse snap_counts); age 25, 74 in, 216 lb; roster status ACT"
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
        "retrieved_at": "2026-11-03T14:51:32Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/wr/2025",
        "retrieved_at": "2026-11-03T14:51:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T14:51:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T14:51:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T14:51:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T14:51:32Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T14:51:32Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
