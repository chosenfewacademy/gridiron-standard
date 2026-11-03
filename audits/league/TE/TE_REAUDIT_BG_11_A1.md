# TE_REAUDIT_BG_11 — Tucker Kraft background dossier (v1.1.2 stage 2)

Run under commissioner approval t45s377.

```json
{
  "audit_id": "TE_REAUDIT_BG_11_A1",
  "task_id": "TE_REAUDIT_BG_11",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "TE",
  "player_id": "tucker_kraft",
  "players": [
    "Tucker Kraft"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "dossier": {
    "player": "Tucker Kraft",
    "player_id": "tucker_kraft",
    "team": "GB",
    "age": 26,
    "size": {
      "ht_in": "77",
      "wt_lb": "259"
    },
    "pff": {
      "2026": {
        "grade": 64.5,
        "rank": 36,
        "snaps": {
          "off": "434",
          "routes": "255",
          "pblk": "40",
          "rblk": "137"
        }
      },
      "2025": {
        "grade": 78.1,
        "snaps": {
          "off": "440",
          "routes": "222",
          "pblk": "33",
          "rblk": "184"
        }
      }
    },
    "stats_2026": {
      "team": "GB",
      "games": 8,
      "tgt": 49,
      "rec": 35,
      "yds": 350,
      "td": 3,
      "epa_tgt": 0.442,
      "rz_tgt": 9,
      "adot": 5.7,
      "sep": 3.38,
      "yac_oe": 0.56,
      "pff": 64.5,
      "pff_rank": 36,
      "off": 434,
      "routes": 255,
      "pblk": 40,
      "rblk": 137,
      "yprr": 1.37,
      "tprr": 0.192,
      "block_share": 0.41
    },
    "stats_2025": {
      "team": "GB",
      "games": 8,
      "tgt": 44,
      "rec": 32,
      "yds": 489,
      "td": 6,
      "epa_tgt": 0.889,
      "rz_tgt": 12,
      "adot": 4.6,
      "sep": null,
      "yac_oe": null,
      "pff": 78.1,
      "pff_rank": 8,
      "off": 440,
      "routes": 222,
      "pblk": 33,
      "rblk": 184,
      "yprr": 2.2,
      "tprr": 0.198,
      "block_share": 0.49
    },
    "splits_2026": {
      "deep_tgt": 5,
      "deep_catch": 0.4,
      "deep_epa_tgt": 0.47,
      "yac_rec": 5.3,
      "short_catch": 0.76,
      "rz_tgt": 9,
      "third_down_conv": "8/12",
      "fum_lost": 0
    },
    "splits_2025": {
      "deep_tgt": 2,
      "deep_catch": 0.5,
      "deep_epa_tgt": 0.22,
      "yac_rec": 10.8,
      "short_catch": 0.71,
      "rz_tgt": 12,
      "third_down_conv": "11/15",
      "fum_lost": 0
    },
    "usage_2026": {
      "offensive_snaps": 433,
      "games": 8
    },
    "summary_lines": [
      "Tucker Kraft (GB) 2026: 8 g, 49 tgt, 35 rec, 350 yds, 3 TD, EPA/tgt 0.442, aDOT 5.7, NGS separation 3.38, YAC over expected 0.56, YPRR 1.37, TPRR 0.192, routes 255; deep (20+ air yds) 5 tgt catch 0.4 EPA/tgt 0.47, short (<10) catch 0.76, YAC/rec 5.3, red-zone tgt 9, 3rd/4th-down conv 8/12, fumbles lost 0",
      "Tucker Kraft (GB) 2025: 8 g, 44 tgt, 32 rec, 489 yds, 6 TD, EPA/tgt 0.889, aDOT 4.6, NGS separation None, YAC over expected None, YPRR 2.2, TPRR 0.198, routes 222; deep (20+ air yds) 2 tgt catch 0.5 EPA/tgt 0.22, short (<10) catch 0.71, YAC/rec 10.8, red-zone tgt 12, 3rd/4th-down conv 11/15, fumbles lost 0",
      "Tucker Kraft PFF TE offense grade 2026 64.5 (rank 36), 2025 78.1; 2026 PFF snaps {'off': '434', 'routes': '255', 'pblk': '40', 'rblk': '137'}",
      "Tucker Kraft 2026 usage: 433 offensive snaps in 8 games (nflverse snap_counts); age 26, 77 in, 259 lb; roster status ACT"
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
        "retrieved_at": "2026-11-03T21:12:08Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/te/2025",
        "retrieved_at": "2026-11-03T21:12:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T21:12:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T21:12:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T21:12:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T21:12:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T21:12:08Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
