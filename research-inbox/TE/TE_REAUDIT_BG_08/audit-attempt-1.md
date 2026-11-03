# TE_REAUDIT_BG_08 — Travis Kelce background dossier (v1.1.2 stage 2)

Run under commissioner approval t45s377.

```json
{
  "audit_id": "TE_REAUDIT_BG_08_A1",
  "task_id": "TE_REAUDIT_BG_08",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "TE",
  "player_id": "travis_kelce",
  "players": [
    "Travis Kelce"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Travis Kelce",
    "player_id": "travis_kelce",
    "team": "KC",
    "age": 37,
    "size": {
      "ht_in": "77",
      "wt_lb": "250"
    },
    "pff": {
      "2026": {
        "grade": 75.0,
        "rank": 11,
        "snaps": {
          "off": "345",
          "routes": "216",
          "pblk": "13",
          "rblk": "116"
        }
      },
      "2025": {
        "grade": 72.0,
        "snaps": {
          "off": "902",
          "routes": "613",
          "pblk": "29",
          "rblk": "259"
        }
      }
    },
    "stats_2026": {
      "team": "KC",
      "games": 7,
      "tgt": 42,
      "rec": 29,
      "yds": 410,
      "td": 2,
      "epa_tgt": 0.515,
      "rz_tgt": 3,
      "adot": 6.4,
      "sep": 3.94,
      "yac_oe": 1.84,
      "pff": 75.0,
      "pff_rank": 11,
      "off": 345,
      "routes": 216,
      "pblk": 13,
      "rblk": 116,
      "yprr": 1.9,
      "tprr": 0.194,
      "block_share": 0.37
    },
    "stats_2025": {
      "team": "KC",
      "games": 17,
      "tgt": 109,
      "rec": 76,
      "yds": 851,
      "td": 5,
      "epa_tgt": 0.371,
      "rz_tgt": 13,
      "adot": 6.8,
      "sep": 3.18,
      "yac_oe": 0.44,
      "pff": 72.0,
      "pff_rank": 18,
      "off": 902,
      "routes": 613,
      "pblk": 29,
      "rblk": 259,
      "yprr": 1.39,
      "tprr": 0.178,
      "block_share": 0.32
    },
    "splits_2026": {
      "deep_tgt": 4,
      "deep_catch": 0.25,
      "deep_epa_tgt": -0.25,
      "yac_rec": 9.4,
      "short_catch": 0.76,
      "rz_tgt": 3,
      "third_down_conv": "7/12",
      "fum_lost": 0
    },
    "splits_2025": {
      "deep_tgt": 10,
      "deep_catch": 0.2,
      "deep_epa_tgt": 0.0,
      "yac_rec": 5.6,
      "short_catch": 0.73,
      "rz_tgt": 13,
      "third_down_conv": "15/23",
      "fum_lost": 0
    },
    "usage_2026": {
      "offensive_snaps": 346,
      "games": 7
    },
    "summary_lines": [
      "Travis Kelce (KC) 2026: 7 g, 42 tgt, 29 rec, 410 yds, 2 TD, EPA/tgt 0.515, aDOT 6.4, NGS separation 3.94, YAC over expected 1.84, YPRR 1.9, TPRR 0.194, routes 216; deep (20+ air yds) 4 tgt catch 0.25 EPA/tgt -0.25, short (<10) catch 0.76, YAC/rec 9.4, red-zone tgt 3, 3rd/4th-down conv 7/12, fumbles lost 0",
      "Travis Kelce (KC) 2025: 17 g, 109 tgt, 76 rec, 851 yds, 5 TD, EPA/tgt 0.371, aDOT 6.8, NGS separation 3.18, YAC over expected 0.44, YPRR 1.39, TPRR 0.178, routes 613; deep (20+ air yds) 10 tgt catch 0.2 EPA/tgt 0.0, short (<10) catch 0.73, YAC/rec 5.6, red-zone tgt 13, 3rd/4th-down conv 15/23, fumbles lost 0",
      "Travis Kelce PFF TE offense grade 2026 75.0 (rank 11), 2025 72.0; 2026 PFF snaps {'off': '345', 'routes': '216', 'pblk': '13', 'rblk': '116'}",
      "Travis Kelce 2026 usage: 346 offensive snaps in 7 games (nflverse snap_counts); age 37, 77 in, 250 lb; roster status ACT"
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
        "retrieved_at": "2026-11-03T21:12:05Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/te/2025",
        "retrieved_at": "2026-11-03T21:12:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T21:12:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T21:12:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T21:12:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T21:12:05Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T21:12:05Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
