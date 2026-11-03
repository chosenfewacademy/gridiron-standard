# TE_REAUDIT_BG_06 — T.J. Hockenson background dossier (v1.1.2 stage 2)

Run under commissioner approval t45s377.

```json
{
  "audit_id": "TE_REAUDIT_BG_06_A1",
  "task_id": "TE_REAUDIT_BG_06",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "TE",
  "player_id": "ext_00-0035229",
  "players": [
    "T.J. Hockenson"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "T.J. Hockenson",
    "player_id": "ext_00-0035229",
    "team": "MIN",
    "age": 29,
    "size": {
      "ht_in": "77",
      "wt_lb": "248"
    },
    "pff": {
      "2026": {
        "grade": 79.5,
        "rank": 3,
        "snaps": {
          "off": "285",
          "routes": "158",
          "pblk": "24",
          "rblk": "103"
        }
      },
      "2025": {
        "grade": 61.2,
        "snaps": {
          "off": "691",
          "routes": "445",
          "pblk": "35",
          "rblk": "210"
        }
      }
    },
    "stats_2026": {
      "team": "MIN",
      "games": 7,
      "tgt": 37,
      "rec": 31,
      "yds": 295,
      "td": 3,
      "epa_tgt": 0.674,
      "rz_tgt": 8,
      "adot": 7.4,
      "sep": 3.03,
      "yac_oe": -1.17,
      "pff": 79.5,
      "pff_rank": 3,
      "off": 285,
      "routes": 158,
      "pblk": 24,
      "rblk": 103,
      "yprr": 1.87,
      "tprr": 0.234,
      "block_share": 0.45
    },
    "stats_2025": {
      "team": "MIN",
      "games": 15,
      "tgt": 66,
      "rec": 51,
      "yds": 438,
      "td": 3,
      "epa_tgt": 0.214,
      "rz_tgt": 11,
      "adot": 5.0,
      "sep": 3.76,
      "yac_oe": -0.12,
      "pff": 61.2,
      "pff_rank": 44,
      "off": 691,
      "routes": 445,
      "pblk": 35,
      "rblk": 210,
      "yprr": 0.98,
      "tprr": 0.148,
      "block_share": 0.35
    },
    "splits_2026": {
      "deep_tgt": 2,
      "deep_catch": 0.5,
      "deep_epa_tgt": 0.57,
      "yac_rec": 2.9,
      "short_catch": 0.92,
      "rz_tgt": 8,
      "third_down_conv": "10/15",
      "fum_lost": 0
    },
    "splits_2025": {
      "deep_tgt": 2,
      "deep_catch": 1.0,
      "deep_epa_tgt": 2.16,
      "yac_rec": 4.3,
      "short_catch": 0.82,
      "rz_tgt": 11,
      "third_down_conv": "3/14",
      "fum_lost": 0
    },
    "usage_2026": {
      "offensive_snaps": 285,
      "games": 7
    },
    "summary_lines": [
      "T.J. Hockenson (MIN) 2026: 7 g, 37 tgt, 31 rec, 295 yds, 3 TD, EPA/tgt 0.674, aDOT 7.4, NGS separation 3.03, YAC over expected -1.17, YPRR 1.87, TPRR 0.234, routes 158; deep (20+ air yds) 2 tgt catch 0.5 EPA/tgt 0.57, short (<10) catch 0.92, YAC/rec 2.9, red-zone tgt 8, 3rd/4th-down conv 10/15, fumbles lost 0",
      "T.J. Hockenson (MIN) 2025: 15 g, 66 tgt, 51 rec, 438 yds, 3 TD, EPA/tgt 0.214, aDOT 5.0, NGS separation 3.76, YAC over expected -0.12, YPRR 0.98, TPRR 0.148, routes 445; deep (20+ air yds) 2 tgt catch 1.0 EPA/tgt 2.16, short (<10) catch 0.82, YAC/rec 4.3, red-zone tgt 11, 3rd/4th-down conv 3/14, fumbles lost 0",
      "T.J. Hockenson PFF TE offense grade 2026 79.5 (rank 3), 2025 61.2; 2026 PFF snaps {'off': '285', 'routes': '158', 'pblk': '24', 'rblk': '103'}",
      "T.J. Hockenson 2026 usage: 285 offensive snaps in 7 games (nflverse snap_counts); age 29, 77 in, 248 lb; roster status ACT"
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
        "retrieved_at": "2026-11-03T21:12:02Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/te/2025",
        "retrieved_at": "2026-11-03T21:12:02Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T21:12:02Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T21:12:02Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T21:12:02Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T21:12:02Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T21:12:02Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
