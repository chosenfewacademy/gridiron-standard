# TE_REAUDIT_BG_07 — Darnell Washington background dossier (v1.1.2 stage 2)

Run under commissioner approval t45s377.

```json
{
  "audit_id": "TE_REAUDIT_BG_07_A1",
  "task_id": "TE_REAUDIT_BG_07",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "TE",
  "player_id": "ext_00-0038558",
  "players": [
    "Darnell Washington"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Darnell Washington",
    "player_id": "ext_00-0038558",
    "team": "PIT",
    "age": 25,
    "size": {
      "ht_in": "79",
      "wt_lb": "265"
    },
    "pff": {
      "2026": {
        "grade": 80.3,
        "rank": 2,
        "snaps": {
          "off": "345",
          "routes": "144",
          "pblk": "45",
          "rblk": "156"
        }
      },
      "2025": {
        "grade": 71.0,
        "snaps": {
          "off": "546",
          "routes": "224",
          "pblk": "55",
          "rblk": "267"
        }
      }
    },
    "stats_2026": {
      "team": "PIT",
      "games": 8,
      "tgt": 28,
      "rec": 19,
      "yds": 254,
      "td": 3,
      "epa_tgt": 0.297,
      "rz_tgt": 7,
      "adot": 5.4,
      "sep": 2.7,
      "yac_oe": 3.85,
      "pff": 80.3,
      "pff_rank": 2,
      "off": 345,
      "routes": 144,
      "pblk": 45,
      "rblk": 156,
      "yprr": 1.76,
      "tprr": 0.194,
      "block_share": 0.58
    },
    "stats_2025": {
      "team": "PIT",
      "games": 13,
      "tgt": 44,
      "rec": 31,
      "yds": 364,
      "td": 1,
      "epa_tgt": 0.333,
      "rz_tgt": 9,
      "adot": 5.6,
      "sep": null,
      "yac_oe": null,
      "pff": 71.0,
      "pff_rank": 19,
      "off": 546,
      "routes": 224,
      "pblk": 55,
      "rblk": 267,
      "yprr": 1.62,
      "tprr": 0.196,
      "block_share": 0.59
    },
    "splits_2026": {
      "deep_tgt": 1,
      "deep_catch": 1.0,
      "deep_epa_tgt": 2.54,
      "yac_rec": 8.4,
      "short_catch": 0.76,
      "rz_tgt": 7,
      "third_down_conv": "1/2",
      "fum_lost": 0
    },
    "splits_2025": {
      "deep_tgt": 2,
      "deep_catch": 0.0,
      "deep_epa_tgt": -2.2,
      "yac_rec": 7.4,
      "short_catch": 0.76,
      "rz_tgt": 9,
      "third_down_conv": "5/8",
      "fum_lost": 1
    },
    "usage_2026": {
      "offensive_snaps": 345,
      "games": 8
    },
    "summary_lines": [
      "Darnell Washington (PIT) 2026: 8 g, 28 tgt, 19 rec, 254 yds, 3 TD, EPA/tgt 0.297, aDOT 5.4, NGS separation 2.7, YAC over expected 3.85, YPRR 1.76, TPRR 0.194, routes 144; deep (20+ air yds) 1 tgt catch 1.0 EPA/tgt 2.54, short (<10) catch 0.76, YAC/rec 8.4, red-zone tgt 7, 3rd/4th-down conv 1/2, fumbles lost 0",
      "Darnell Washington (PIT) 2025: 13 g, 44 tgt, 31 rec, 364 yds, 1 TD, EPA/tgt 0.333, aDOT 5.6, NGS separation None, YAC over expected None, YPRR 1.62, TPRR 0.196, routes 224; deep (20+ air yds) 2 tgt catch 0.0 EPA/tgt -2.2, short (<10) catch 0.76, YAC/rec 7.4, red-zone tgt 9, 3rd/4th-down conv 5/8, fumbles lost 1",
      "Darnell Washington PFF TE offense grade 2026 80.3 (rank 2), 2025 71.0; 2026 PFF snaps {'off': '345', 'routes': '144', 'pblk': '45', 'rblk': '156'}",
      "Darnell Washington 2026 usage: 345 offensive snaps in 8 games (nflverse snap_counts); age 25, 79 in, 265 lb; roster status ACT"
    ],
    "availability": {
      "roster_status": "ACT"
    },
    "limitations": [
      "PFF receiving/run-block/pass-block sub-grades are paywalled (PFF+) and inline/slot/wide alignment splits are not public; per commissioner t45s377 blocking traits are judged from PFF overall grade plus PFF run-block/pass-block/route snap counts (block share), with film-consensus style"
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
      "RBK",
      "IBL",
      "PBK",
      "INJ",
      "STA",
      "TGH"
    ],
    "provenance": [
      {
        "url": "https://www.pff.com/grades/nfl/te/2026",
        "retrieved_at": "2026-11-03T21:12:04Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/te/2025",
        "retrieved_at": "2026-11-03T21:12:04Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T21:12:04Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T21:12:04Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T21:12:04Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T21:12:04Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T21:12:04Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
