# WR_REAUDIT_BG_13 — DeVonta Smith background dossier (v1.1.2 stage 2)

Run under commissioner approval t45u.

```json
{
  "audit_id": "WR_REAUDIT_BG_13_A1",
  "task_id": "WR_REAUDIT_BG_13",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "WR",
  "player_id": "devonta_smith",
  "players": [
    "DeVonta Smith"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "dossier": {
    "player": "DeVonta Smith",
    "player_id": "devonta_smith",
    "team": "PHI",
    "age": 27,
    "size": {
      "ht_in": "72",
      "wt_lb": "170"
    },
    "pff": {
      "2026": {
        "grade": 90.5,
        "rank": 4,
        "snaps": {
          "off": "211",
          "routes": "146",
          "rblk": "65"
        }
      },
      "2025": {
        "grade": 76.9,
        "snaps": {
          "off": "954",
          "routes": "592",
          "rblk": "362"
        }
      }
    },
    "stats_2026": {
      "team": "PHI",
      "games": 4,
      "tgt": 41,
      "rec": 26,
      "yds": 310,
      "td": 2,
      "epa_tgt": 0.02,
      "epa": 0.8,
      "adot": 12.2,
      "sep": 2.35,
      "yac_oe": 0.06,
      "pff": 90.5,
      "pff_rank": 4,
      "routes": 146,
      "yprr": 2.12,
      "tprr": 0.281
    },
    "stats_2025": {
      "team": "PHI",
      "games": 17,
      "tgt": 114,
      "rec": 77,
      "yds": 1008,
      "td": 4,
      "epa_tgt": 0.477,
      "epa": 54.4,
      "adot": 12.0,
      "sep": 2.83,
      "yac_oe": -0.08,
      "pff": 76.9,
      "pff_rank": 26,
      "routes": 592,
      "yprr": 1.7,
      "tprr": 0.193
    },
    "splits_2026": {
      "deep_tgt": 8,
      "deep_catch": 0.38,
      "deep_epa_tgt": 0.43,
      "yac_rec": 1.8,
      "short_catch": 0.76,
      "rz_tgt": 3,
      "third_down_conv": "6/17",
      "fum_lost": 0
    },
    "splits_2025": {
      "deep_tgt": 21,
      "deep_catch": 0.38,
      "deep_epa_tgt": 1.04,
      "yac_rec": 3.8,
      "short_catch": 0.82,
      "rz_tgt": 12,
      "third_down_conv": "21/43",
      "fum_lost": 0
    },
    "usage_2026": {
      "offensive_snaps": 211,
      "games": 4
    },
    "summary_lines": [
      "DeVonta Smith (PHI) 2026: 4 g, 41 tgt, 26 rec, 310 yds, 2 TD, EPA/tgt 0.02, aDOT 12.2, NGS separation 2.35, YAC over expected 0.06, YPRR 2.12, TPRR 0.281, routes 146; deep (20+ air yds) 8 tgt catch 0.38 EPA/tgt 0.43, short (<10) catch 0.76, YAC/rec 1.8, red-zone tgt 3, 3rd/4th-down conv 6/17, fumbles lost 0",
      "DeVonta Smith (PHI) 2025: 17 g, 114 tgt, 77 rec, 1008 yds, 4 TD, EPA/tgt 0.477, aDOT 12.0, NGS separation 2.83, YAC over expected -0.08, YPRR 1.7, TPRR 0.193, routes 592; deep (20+ air yds) 21 tgt catch 0.38 EPA/tgt 1.04, short (<10) catch 0.82, YAC/rec 3.8, red-zone tgt 12, 3rd/4th-down conv 21/43, fumbles lost 0",
      "DeVonta Smith PFF WR offense grade 2026 90.5 (rank 4), 2025 76.9; 2026 PFF snaps {'off': '211', 'routes': '146', 'rblk': '65'}",
      "DeVonta Smith 2026 usage: 211 offensive snaps in 4 games (nflverse snap_counts); age 27, 72 in, 170 lb; roster status INA"
    ],
    "availability": {
      "roster_status": "INA"
    },
    "limitations": [
      "PFF drop rate, contested-catch rate and man/zone splits are paywalled; hands/contested traits judged from catch rates by depth, red-zone results and film-consensus style",
      "small 2026 sample / injury"
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
        "retrieved_at": "2026-11-03T14:51:44Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/wr/2025",
        "retrieved_at": "2026-11-03T14:51:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T14:51:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T14:51:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T14:51:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T14:51:44Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T14:51:44Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
