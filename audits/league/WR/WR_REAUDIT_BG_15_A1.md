# WR_REAUDIT_BG_15 — Mike Evans background dossier (v1.1.2 stage 2)

Run under commissioner approval t45u.

```json
{
  "audit_id": "WR_REAUDIT_BG_15_A1",
  "task_id": "WR_REAUDIT_BG_15",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "WR",
  "player_id": "ext_00-0031408",
  "players": [
    "Mike Evans"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "dossier": {
    "player": "Mike Evans",
    "player_id": "ext_00-0031408",
    "team": "SF",
    "age": 33,
    "size": {
      "ht_in": "77",
      "wt_lb": "231"
    },
    "pff": {
      "2026": {
        "grade": 92.4,
        "rank": 2,
        "snaps": {
          "off": "197",
          "routes": "128",
          "rblk": "69"
        }
      },
      "2025": {
        "grade": null,
        "snaps": null
      }
    },
    "stats_2026": {
      "team": "SF",
      "games": 6,
      "tgt": 40,
      "rec": 27,
      "yds": 420,
      "td": 3,
      "epa_tgt": 1.023,
      "epa": 40.9,
      "adot": 14.6,
      "sep": 1.77,
      "yac_oe": 0.11,
      "pff": 92.4,
      "pff_rank": 2,
      "routes": 128,
      "yprr": 3.28,
      "tprr": 0.312
    },
    "stats_2025": {
      "team": "TB",
      "games": 8,
      "tgt": 62,
      "rec": 30,
      "yds": 368,
      "td": 3,
      "epa_tgt": 0.085,
      "epa": 5.3,
      "adot": 13.3,
      "sep": 1.92,
      "yac_oe": -0.51,
      "pff": null,
      "pff_rank": null,
      "routes": null,
      "yprr": null,
      "tprr": null
    },
    "splits_2026": {
      "deep_tgt": 9,
      "deep_catch": 0.67,
      "deep_epa_tgt": 1.15,
      "yac_rec": 2.7,
      "short_catch": 0.85,
      "rz_tgt": 7,
      "third_down_conv": "12/19",
      "fum_lost": 0
    },
    "splits_2025": {
      "deep_tgt": 14,
      "deep_catch": 0.21,
      "deep_epa_tgt": -0.12,
      "yac_rec": 1.2,
      "short_catch": 0.57,
      "rz_tgt": 9,
      "third_down_conv": "5/14",
      "fum_lost": 0
    },
    "usage_2026": {
      "offensive_snaps": 197,
      "games": 6
    },
    "summary_lines": [
      "Mike Evans (SF) 2026: 6 g, 40 tgt, 27 rec, 420 yds, 3 TD, EPA/tgt 1.023, aDOT 14.6, NGS separation 1.77, YAC over expected 0.11, YPRR 3.28, TPRR 0.312, routes 128; deep (20+ air yds) 9 tgt catch 0.67 EPA/tgt 1.15, short (<10) catch 0.85, YAC/rec 2.7, red-zone tgt 7, 3rd/4th-down conv 12/19, fumbles lost 0",
      "Mike Evans (TB) 2025: 8 g, 62 tgt, 30 rec, 368 yds, 3 TD, EPA/tgt 0.085, aDOT 13.3, NGS separation 1.92, YAC over expected -0.51, YPRR None, TPRR None, routes None; deep (20+ air yds) 14 tgt catch 0.21 EPA/tgt -0.12, short (<10) catch 0.57, YAC/rec 1.2, red-zone tgt 9, 3rd/4th-down conv 5/14, fumbles lost 0",
      "Mike Evans PFF WR offense grade 2026 92.4 (rank 2), 2025 None; 2026 PFF snaps {'off': '197', 'routes': '128', 'rblk': '69'}",
      "Mike Evans 2026 usage: 197 offensive snaps in 6 games (nflverse snap_counts); age 33, 77 in, 231 lb; roster status INA"
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
        "retrieved_at": "2026-11-03T14:51:46Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/wr/2025",
        "retrieved_at": "2026-11-03T14:51:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T14:51:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T14:51:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T14:51:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T14:51:46Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T14:51:46Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
