# TE_REAUDIT_BG_13 — Michael Mayer background dossier (v1.1.2 stage 2)

Run under commissioner approval t45s377.

```json
{
  "audit_id": "TE_REAUDIT_BG_13_A1",
  "task_id": "TE_REAUDIT_BG_13",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "TE",
  "player_id": "ext_00-0039066",
  "players": [
    "Michael Mayer"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Michael Mayer",
    "player_id": "ext_00-0039066",
    "team": "LV",
    "age": 25,
    "size": {
      "ht_in": "76",
      "wt_lb": "256"
    },
    "pff": {
      "2026": {
        "grade": 75.2,
        "rank": 9,
        "snaps": {
          "off": "440",
          "routes": "245",
          "pblk": "35",
          "rblk": "160"
        }
      },
      "2025": {
        "grade": 64.6,
        "snaps": {
          "off": "465",
          "routes": "238",
          "pblk": "41",
          "rblk": "186"
        }
      }
    },
    "stats_2026": {
      "team": "LV",
      "games": 8,
      "tgt": 43,
      "rec": 36,
      "yds": 351,
      "td": 1,
      "epa_tgt": 0.259,
      "rz_tgt": 3,
      "adot": 5.1,
      "sep": 3.25,
      "yac_oe": 0.06,
      "pff": 75.2,
      "pff_rank": 9,
      "off": 440,
      "routes": 245,
      "pblk": 35,
      "rblk": 160,
      "yprr": 1.43,
      "tprr": 0.176,
      "block_share": 0.44
    },
    "stats_2025": {
      "team": "LV",
      "games": 13,
      "tgt": 50,
      "rec": 35,
      "yds": 328,
      "td": 1,
      "epa_tgt": -0.197,
      "rz_tgt": 6,
      "adot": 4.8,
      "sep": 3.35,
      "yac_oe": 0.32,
      "pff": 64.6,
      "pff_rank": 35,
      "off": 465,
      "routes": 238,
      "pblk": 41,
      "rblk": 186,
      "yprr": 1.38,
      "tprr": 0.21,
      "block_share": 0.49
    },
    "splits_2026": {
      "deep_tgt": 1,
      "deep_catch": 1.0,
      "deep_epa_tgt": 3.53,
      "yac_rec": 5.2,
      "short_catch": 0.89,
      "rz_tgt": 3,
      "third_down_conv": "4/7",
      "fum_lost": 0
    },
    "splits_2025": {
      "deep_tgt": 2,
      "deep_catch": 0.0,
      "deep_epa_tgt": -2.18,
      "yac_rec": 5.6,
      "short_catch": 0.73,
      "rz_tgt": 6,
      "third_down_conv": "6/17",
      "fum_lost": 0
    },
    "usage_2026": {
      "offensive_snaps": 440,
      "games": 8
    },
    "summary_lines": [
      "Michael Mayer (LV) 2026: 8 g, 43 tgt, 36 rec, 351 yds, 1 TD, EPA/tgt 0.259, aDOT 5.1, NGS separation 3.25, YAC over expected 0.06, YPRR 1.43, TPRR 0.176, routes 245; deep (20+ air yds) 1 tgt catch 1.0 EPA/tgt 3.53, short (<10) catch 0.89, YAC/rec 5.2, red-zone tgt 3, 3rd/4th-down conv 4/7, fumbles lost 0",
      "Michael Mayer (LV) 2025: 13 g, 50 tgt, 35 rec, 328 yds, 1 TD, EPA/tgt -0.197, aDOT 4.8, NGS separation 3.35, YAC over expected 0.32, YPRR 1.38, TPRR 0.21, routes 238; deep (20+ air yds) 2 tgt catch 0.0 EPA/tgt -2.18, short (<10) catch 0.73, YAC/rec 5.6, red-zone tgt 6, 3rd/4th-down conv 6/17, fumbles lost 0",
      "Michael Mayer PFF TE offense grade 2026 75.2 (rank 9), 2025 64.6; 2026 PFF snaps {'off': '440', 'routes': '245', 'pblk': '35', 'rblk': '160'}",
      "Michael Mayer 2026 usage: 440 offensive snaps in 8 games (nflverse snap_counts); age 25, 76 in, 256 lb; roster status ACT"
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
        "retrieved_at": "2026-11-03T21:12:11Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/te/2025",
        "retrieved_at": "2026-11-03T21:12:11Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T21:12:11Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T21:12:11Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T21:12:11Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T21:12:11Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T21:12:11Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
