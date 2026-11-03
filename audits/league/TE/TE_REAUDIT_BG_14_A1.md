# TE_REAUDIT_BG_14 — Dallas Goedert background dossier (v1.1.2 stage 2)

Run under commissioner approval t45s377.

```json
{
  "audit_id": "TE_REAUDIT_BG_14_A1",
  "task_id": "TE_REAUDIT_BG_14",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "TE",
  "player_id": "dallas_goedert",
  "players": [
    "Dallas Goedert"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "dossier": {
    "player": "Dallas Goedert",
    "player_id": "dallas_goedert",
    "team": "PHI",
    "age": 31,
    "size": {
      "ht_in": "77",
      "wt_lb": "256"
    },
    "pff": {
      "2026": {
        "grade": 74.9,
        "rank": 12,
        "snaps": {
          "off": "269",
          "routes": "163",
          "pblk": "16",
          "rblk": "89"
        }
      },
      "2025": {
        "grade": 66.7,
        "snaps": {
          "off": "853",
          "routes": "494",
          "pblk": "21",
          "rblk": "337"
        }
      }
    },
    "stats_2026": {
      "team": "PHI",
      "games": 6,
      "tgt": 35,
      "rec": 26,
      "yds": 258,
      "td": 2,
      "epa_tgt": 0.263,
      "rz_tgt": 3,
      "adot": 5.7,
      "sep": 2.97,
      "yac_oe": 0.28,
      "pff": 74.9,
      "pff_rank": 12,
      "off": 269,
      "routes": 163,
      "pblk": 16,
      "rblk": 89,
      "yprr": 1.58,
      "tprr": 0.215,
      "block_share": 0.39
    },
    "stats_2025": {
      "team": "PHI",
      "games": 15,
      "tgt": 82,
      "rec": 60,
      "yds": 591,
      "td": 11,
      "epa_tgt": 0.441,
      "rz_tgt": 15,
      "adot": 7.1,
      "sep": 3.31,
      "yac_oe": 0.16,
      "pff": 66.7,
      "pff_rank": 28,
      "off": 853,
      "routes": 494,
      "pblk": 21,
      "rblk": 337,
      "yprr": 1.2,
      "tprr": 0.166,
      "block_share": 0.42
    },
    "splits_2026": {
      "deep_tgt": 0,
      "deep_catch": null,
      "deep_epa_tgt": null,
      "yac_rec": 3.6,
      "short_catch": 0.71,
      "rz_tgt": 3,
      "third_down_conv": "6/11",
      "fum_lost": 0
    },
    "splits_2025": {
      "deep_tgt": 6,
      "deep_catch": 0.67,
      "deep_epa_tgt": 1.14,
      "yac_rec": 3.9,
      "short_catch": 0.81,
      "rz_tgt": 15,
      "third_down_conv": "5/16",
      "fum_lost": 0
    },
    "usage_2026": {
      "offensive_snaps": 269,
      "games": 6
    },
    "summary_lines": [
      "Dallas Goedert (PHI) 2026: 6 g, 35 tgt, 26 rec, 258 yds, 2 TD, EPA/tgt 0.263, aDOT 5.7, NGS separation 2.97, YAC over expected 0.28, YPRR 1.58, TPRR 0.215, routes 163; deep (20+ air yds) 0 tgt catch None EPA/tgt None, short (<10) catch 0.71, YAC/rec 3.6, red-zone tgt 3, 3rd/4th-down conv 6/11, fumbles lost 0",
      "Dallas Goedert (PHI) 2025: 15 g, 82 tgt, 60 rec, 591 yds, 11 TD, EPA/tgt 0.441, aDOT 7.1, NGS separation 3.31, YAC over expected 0.16, YPRR 1.2, TPRR 0.166, routes 494; deep (20+ air yds) 6 tgt catch 0.67 EPA/tgt 1.14, short (<10) catch 0.81, YAC/rec 3.9, red-zone tgt 15, 3rd/4th-down conv 5/16, fumbles lost 0",
      "Dallas Goedert PFF TE offense grade 2026 74.9 (rank 12), 2025 66.7; 2026 PFF snaps {'off': '269', 'routes': '163', 'pblk': '16', 'rblk': '89'}",
      "Dallas Goedert 2026 usage: 269 offensive snaps in 6 games (nflverse snap_counts); age 31, 77 in, 256 lb; roster status ACT"
    ],
    "availability": {
      "roster_status": "ACT"
    },
    "limitations": [
      "PFF receiving/run-block/pass-block sub-grades are paywalled (PFF+) and inline/slot/wide alignment splits are not public; per commissioner t45s377 blocking traits are judged from PFF overall grade plus PFF run-block/pass-block/route snap counts (block share), with film-consensus style",
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
        "retrieved_at": "2026-11-03T21:12:12Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/te/2025",
        "retrieved_at": "2026-11-03T21:12:12Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T21:12:12Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T21:12:12Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T21:12:12Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T21:12:12Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T21:12:12Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
