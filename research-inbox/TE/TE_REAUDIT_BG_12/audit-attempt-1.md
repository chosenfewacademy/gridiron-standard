# TE_REAUDIT_BG_12 — Colston Loveland background dossier (v1.1.2 stage 2)

Run under commissioner approval t45s377.

```json
{
  "audit_id": "TE_REAUDIT_BG_12_A1",
  "task_id": "TE_REAUDIT_BG_12",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "TE",
  "player_id": "colston_loveland",
  "players": [
    "Colston Loveland"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Colston Loveland",
    "player_id": "colston_loveland",
    "team": "CHI",
    "age": 22,
    "size": {
      "ht_in": "78",
      "wt_lb": "241"
    },
    "pff": {
      "2026": {
        "grade": 65.8,
        "rank": 29,
        "snaps": {
          "off": "519",
          "routes": "263",
          "pblk": "33",
          "rblk": "223"
        }
      },
      "2025": {
        "grade": 84.0,
        "snaps": {
          "off": "818",
          "routes": "484",
          "pblk": "29",
          "rblk": "304"
        }
      }
    },
    "stats_2026": {
      "team": "CHI",
      "games": 7,
      "tgt": 42,
      "rec": 26,
      "yds": 244,
      "td": 2,
      "epa_tgt": -0.041,
      "rz_tgt": 10,
      "adot": 6.9,
      "sep": 3.0,
      "yac_oe": -0.03,
      "pff": 65.8,
      "pff_rank": 29,
      "off": 519,
      "routes": 263,
      "pblk": 33,
      "rblk": 223,
      "yprr": 0.93,
      "tprr": 0.16,
      "block_share": 0.49
    },
    "stats_2025": {
      "team": "CHI",
      "games": 16,
      "tgt": 83,
      "rec": 58,
      "yds": 713,
      "td": 6,
      "epa_tgt": 0.572,
      "rz_tgt": 15,
      "adot": 9.1,
      "sep": 3.67,
      "yac_oe": 0.81,
      "pff": 84.0,
      "pff_rank": 3,
      "off": 818,
      "routes": 484,
      "pblk": 29,
      "rblk": 304,
      "yprr": 1.47,
      "tprr": 0.171,
      "block_share": 0.41
    },
    "splits_2026": {
      "deep_tgt": 2,
      "deep_catch": 0.5,
      "deep_epa_tgt": 0.53,
      "yac_rec": 4.1,
      "short_catch": 0.76,
      "rz_tgt": 10,
      "third_down_conv": "4/12",
      "fum_lost": 0
    },
    "splits_2025": {
      "deep_tgt": 9,
      "deep_catch": 0.44,
      "deep_epa_tgt": 1.25,
      "yac_rec": 4.3,
      "short_catch": 0.79,
      "rz_tgt": 15,
      "third_down_conv": "15/26",
      "fum_lost": 0
    },
    "usage_2026": {
      "offensive_snaps": 453,
      "games": 7
    },
    "summary_lines": [
      "Colston Loveland (CHI) 2026: 7 g, 42 tgt, 26 rec, 244 yds, 2 TD, EPA/tgt -0.041, aDOT 6.9, NGS separation 3.0, YAC over expected -0.03, YPRR 0.93, TPRR 0.16, routes 263; deep (20+ air yds) 2 tgt catch 0.5 EPA/tgt 0.53, short (<10) catch 0.76, YAC/rec 4.1, red-zone tgt 10, 3rd/4th-down conv 4/12, fumbles lost 0",
      "Colston Loveland (CHI) 2025: 16 g, 83 tgt, 58 rec, 713 yds, 6 TD, EPA/tgt 0.572, aDOT 9.1, NGS separation 3.67, YAC over expected 0.81, YPRR 1.47, TPRR 0.171, routes 484; deep (20+ air yds) 9 tgt catch 0.44 EPA/tgt 1.25, short (<10) catch 0.79, YAC/rec 4.3, red-zone tgt 15, 3rd/4th-down conv 15/26, fumbles lost 0",
      "Colston Loveland PFF TE offense grade 2026 65.8 (rank 29), 2025 84.0; 2026 PFF snaps {'off': '519', 'routes': '263', 'pblk': '33', 'rblk': '223'}",
      "Colston Loveland 2026 usage: 453 offensive snaps in 7 games (nflverse snap_counts); age 22, 78 in, 241 lb; roster status ACT"
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
        "retrieved_at": "2026-11-03T21:12:09Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/te/2025",
        "retrieved_at": "2026-11-03T21:12:09Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T21:12:09Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T21:12:09Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T21:12:09Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T21:12:09Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T21:12:09Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
