# WR_REAUDIT_BG_05 — CeeDee Lamb background dossier (v1.1.2 stage 2)

Run under commissioner approval t45u.

```json
{
  "audit_id": "WR_REAUDIT_BG_05_A1",
  "task_id": "WR_REAUDIT_BG_05",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "WR",
  "player_id": "ext_00-0036358",
  "players": [
    "CeeDee Lamb"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "CeeDee Lamb",
    "player_id": "ext_00-0036358",
    "team": "DAL",
    "age": 27,
    "size": {
      "ht_in": "74",
      "wt_lb": "200"
    },
    "pff": {
      "2026": {
        "grade": 89.7,
        "rank": 6,
        "snaps": {
          "off": "430",
          "routes": "296",
          "rblk": "132"
        }
      },
      "2025": {
        "grade": 77.6,
        "snaps": {
          "off": "732",
          "routes": "498",
          "rblk": "231"
        }
      }
    },
    "stats_2026": {
      "team": "DAL",
      "games": 8,
      "tgt": 94,
      "rec": 60,
      "yds": 709,
      "td": 6,
      "epa_tgt": 0.345,
      "epa": 32.4,
      "adot": 9.9,
      "sep": 2.86,
      "yac_oe": 0.2,
      "pff": 89.7,
      "pff_rank": 6,
      "routes": 296,
      "yprr": 2.4,
      "tprr": 0.318
    },
    "stats_2025": {
      "team": "DAL",
      "games": 13,
      "tgt": 117,
      "rec": 75,
      "yds": 1077,
      "td": 3,
      "epa_tgt": 0.248,
      "epa": 29.0,
      "adot": 12.0,
      "sep": 2.77,
      "yac_oe": 0.42,
      "pff": 77.6,
      "pff_rank": 23,
      "routes": 498,
      "yprr": 2.16,
      "tprr": 0.235
    },
    "splits_2026": {
      "deep_tgt": 10,
      "deep_catch": 0.6,
      "deep_epa_tgt": 1.16,
      "yac_rec": 3.5,
      "short_catch": 0.72,
      "rz_tgt": 18,
      "third_down_conv": "16/29",
      "fum_lost": 0
    },
    "splits_2025": {
      "deep_tgt": 21,
      "deep_catch": 0.57,
      "deep_epa_tgt": 1.28,
      "yac_rec": 4.3,
      "short_catch": 0.75,
      "rz_tgt": 17,
      "third_down_conv": "18/34",
      "fum_lost": 0
    },
    "usage_2026": {
      "offensive_snaps": 430,
      "games": 8
    },
    "summary_lines": [
      "CeeDee Lamb (DAL) 2026: 8 g, 94 tgt, 60 rec, 709 yds, 6 TD, EPA/tgt 0.345, aDOT 9.9, NGS separation 2.86, YAC over expected 0.2, YPRR 2.4, TPRR 0.318, routes 296; deep (20+ air yds) 10 tgt catch 0.6 EPA/tgt 1.16, short (<10) catch 0.72, YAC/rec 3.5, red-zone tgt 18, 3rd/4th-down conv 16/29, fumbles lost 0",
      "CeeDee Lamb (DAL) 2025: 13 g, 117 tgt, 75 rec, 1077 yds, 3 TD, EPA/tgt 0.248, aDOT 12.0, NGS separation 2.77, YAC over expected 0.42, YPRR 2.16, TPRR 0.235, routes 498; deep (20+ air yds) 21 tgt catch 0.57 EPA/tgt 1.28, short (<10) catch 0.75, YAC/rec 4.3, red-zone tgt 17, 3rd/4th-down conv 18/34, fumbles lost 0",
      "CeeDee Lamb PFF WR offense grade 2026 89.7 (rank 6), 2025 77.6; 2026 PFF snaps {'off': '430', 'routes': '296', 'rblk': '132'}",
      "CeeDee Lamb 2026 usage: 430 offensive snaps in 8 games (nflverse snap_counts); age 27, 74 in, 200 lb; roster status ACT"
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
        "retrieved_at": "2026-11-03T14:51:35Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/wr/2025",
        "retrieved_at": "2026-11-03T14:51:35Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T14:51:35Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T14:51:35Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T14:51:35Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T14:51:35Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T14:51:35Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
