# WR_REAUDIT_BG_14 — Malik Nabers background dossier (v1.1.2 stage 2)

Run under commissioner approval t45u.

```json
{
  "audit_id": "WR_REAUDIT_BG_14_A1",
  "task_id": "WR_REAUDIT_BG_14",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "WR",
  "player_id": "ext_00-0039337",
  "players": [
    "Malik Nabers"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "dossier": {
    "player": "Malik Nabers",
    "player_id": "ext_00-0039337",
    "team": "NYG",
    "age": 23,
    "size": {
      "ht_in": "72",
      "wt_lb": "200"
    },
    "pff": {
      "2026": {
        "grade": 83.6,
        "rank": 11,
        "snaps": {
          "off": "373",
          "routes": "253",
          "rblk": "120"
        }
      },
      "2025": {
        "grade": null,
        "snaps": null
      }
    },
    "stats_2026": {
      "team": "NYG",
      "games": 7,
      "tgt": 71,
      "rec": 48,
      "yds": 605,
      "td": 2,
      "epa_tgt": 0.231,
      "epa": 16.4,
      "adot": 11.6,
      "sep": 2.99,
      "yac_oe": -0.43,
      "pff": 83.6,
      "pff_rank": 11,
      "routes": 253,
      "yprr": 2.39,
      "tprr": 0.281
    },
    "stats_2025": {
      "team": "NYG",
      "games": 4,
      "tgt": 35,
      "rec": 18,
      "yds": 271,
      "td": 2,
      "epa_tgt": 0.066,
      "epa": 2.3,
      "adot": 15.9,
      "sep": null,
      "yac_oe": null,
      "pff": null,
      "pff_rank": null,
      "routes": null,
      "yprr": null,
      "tprr": null
    },
    "splits_2026": {
      "deep_tgt": 15,
      "deep_catch": 0.6,
      "deep_epa_tgt": 1.23,
      "yac_rec": 3.3,
      "short_catch": 0.79,
      "rz_tgt": 9,
      "third_down_conv": "5/15",
      "fum_lost": 0
    },
    "splits_2025": {
      "deep_tgt": 11,
      "deep_catch": 0.27,
      "deep_epa_tgt": -0.04,
      "yac_rec": 2.9,
      "short_catch": 0.69,
      "rz_tgt": 4,
      "third_down_conv": "1/6",
      "fum_lost": 0
    },
    "usage_2026": {
      "offensive_snaps": 374,
      "games": 7
    },
    "summary_lines": [
      "Malik Nabers (NYG) 2026: 7 g, 71 tgt, 48 rec, 605 yds, 2 TD, EPA/tgt 0.231, aDOT 11.6, NGS separation 2.99, YAC over expected -0.43, YPRR 2.39, TPRR 0.281, routes 253; deep (20+ air yds) 15 tgt catch 0.6 EPA/tgt 1.23, short (<10) catch 0.79, YAC/rec 3.3, red-zone tgt 9, 3rd/4th-down conv 5/15, fumbles lost 0",
      "Malik Nabers (NYG) 2025: 4 g, 35 tgt, 18 rec, 271 yds, 2 TD, EPA/tgt 0.066, aDOT 15.9, NGS separation None, YAC over expected None, YPRR None, TPRR None, routes None; deep (20+ air yds) 11 tgt catch 0.27 EPA/tgt -0.04, short (<10) catch 0.69, YAC/rec 2.9, red-zone tgt 4, 3rd/4th-down conv 1/6, fumbles lost 0",
      "Malik Nabers PFF WR offense grade 2026 83.6 (rank 11), 2025 None; 2026 PFF snaps {'off': '373', 'routes': '253', 'rblk': '120'}",
      "Malik Nabers 2026 usage: 374 offensive snaps in 7 games (nflverse snap_counts); age 23, 72 in, 200 lb; roster status ACT"
    ],
    "availability": {
      "roster_status": "ACT"
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
        "retrieved_at": "2026-11-03T14:51:45Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/wr/2025",
        "retrieved_at": "2026-11-03T14:51:45Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T14:51:45Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T14:51:45Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T14:51:45Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T14:51:45Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T14:51:45Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
