# TE_REAUDIT_BG_04 — Dalton Kincaid background dossier (v1.1.2 stage 2)

Run under commissioner approval t45s377.

```json
{
  "audit_id": "TE_REAUDIT_BG_04_A1",
  "task_id": "TE_REAUDIT_BG_04",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "TE",
  "player_id": "dalton_kincaid",
  "players": [
    "Dalton Kincaid"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Dalton Kincaid",
    "player_id": "dalton_kincaid",
    "team": "BUF",
    "age": 27,
    "size": {
      "ht_in": "75",
      "wt_lb": "246"
    },
    "pff": {
      "2026": {
        "grade": 77.0,
        "rank": 7,
        "snaps": {
          "off": "310",
          "routes": "175",
          "pblk": "8",
          "rblk": "127"
        }
      },
      "2025": {
        "grade": 86.7,
        "snaps": {
          "off": "368",
          "routes": "269",
          "pblk": "3",
          "rblk": "96"
        }
      }
    },
    "stats_2026": {
      "team": "BUF",
      "games": 7,
      "tgt": 36,
      "rec": 27,
      "yds": 401,
      "td": 2,
      "epa_tgt": 0.481,
      "rz_tgt": 7,
      "adot": 10.1,
      "sep": 3.16,
      "yac_oe": 1.28,
      "pff": 77.0,
      "pff_rank": 7,
      "off": 310,
      "routes": 175,
      "pblk": 8,
      "rblk": 127,
      "yprr": 2.29,
      "tprr": 0.206,
      "block_share": 0.44
    },
    "stats_2025": {
      "team": "BUF",
      "games": 12,
      "tgt": 50,
      "rec": 39,
      "yds": 571,
      "td": 5,
      "epa_tgt": 0.788,
      "rz_tgt": 9,
      "adot": 9.5,
      "sep": 3.42,
      "yac_oe": 1.03,
      "pff": 86.7,
      "pff_rank": 2,
      "off": 368,
      "routes": 269,
      "pblk": 3,
      "rblk": 96,
      "yprr": 2.12,
      "tprr": 0.186,
      "block_share": 0.27
    },
    "splits_2026": {
      "deep_tgt": 5,
      "deep_catch": 0.8,
      "deep_epa_tgt": 2.08,
      "yac_rec": 5.6,
      "short_catch": 0.79,
      "rz_tgt": 7,
      "third_down_conv": "2/6",
      "fum_lost": 1
    },
    "splits_2025": {
      "deep_tgt": 6,
      "deep_catch": 0.5,
      "deep_epa_tgt": 0.85,
      "yac_rec": 6.6,
      "short_catch": 0.91,
      "rz_tgt": 9,
      "third_down_conv": "7/14",
      "fum_lost": 0
    },
    "usage_2026": {
      "offensive_snaps": 311,
      "games": 7
    },
    "summary_lines": [
      "Dalton Kincaid (BUF) 2026: 7 g, 36 tgt, 27 rec, 401 yds, 2 TD, EPA/tgt 0.481, aDOT 10.1, NGS separation 3.16, YAC over expected 1.28, YPRR 2.29, TPRR 0.206, routes 175; deep (20+ air yds) 5 tgt catch 0.8 EPA/tgt 2.08, short (<10) catch 0.79, YAC/rec 5.6, red-zone tgt 7, 3rd/4th-down conv 2/6, fumbles lost 1",
      "Dalton Kincaid (BUF) 2025: 12 g, 50 tgt, 39 rec, 571 yds, 5 TD, EPA/tgt 0.788, aDOT 9.5, NGS separation 3.42, YAC over expected 1.03, YPRR 2.12, TPRR 0.186, routes 269; deep (20+ air yds) 6 tgt catch 0.5 EPA/tgt 0.85, short (<10) catch 0.91, YAC/rec 6.6, red-zone tgt 9, 3rd/4th-down conv 7/14, fumbles lost 0",
      "Dalton Kincaid PFF TE offense grade 2026 77.0 (rank 7), 2025 86.7; 2026 PFF snaps {'off': '310', 'routes': '175', 'pblk': '8', 'rblk': '127'}",
      "Dalton Kincaid 2026 usage: 311 offensive snaps in 7 games (nflverse snap_counts); age 27, 75 in, 246 lb; roster status ACT"
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
        "retrieved_at": "2026-11-03T21:12:00Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/te/2025",
        "retrieved_at": "2026-11-03T21:12:00Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T21:12:00Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T21:12:00Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T21:12:00Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T21:12:00Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T21:12:00Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
