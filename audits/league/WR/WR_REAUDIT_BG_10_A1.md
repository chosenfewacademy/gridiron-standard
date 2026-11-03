# WR_REAUDIT_BG_10 — George Pickens background dossier (v1.1.2 stage 2)

Run under commissioner approval t45u.

```json
{
  "audit_id": "WR_REAUDIT_BG_10_A1",
  "task_id": "WR_REAUDIT_BG_10",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "WR",
  "player_id": "george_pickens",
  "players": [
    "George Pickens"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "George Pickens",
    "player_id": "george_pickens",
    "team": "DAL",
    "age": 25,
    "size": {
      "ht_in": "75",
      "wt_lb": "205"
    },
    "pff": {
      "2026": {
        "grade": 78.1,
        "rank": 20,
        "snaps": {
          "off": "426",
          "routes": "310",
          "rblk": "116"
        }
      },
      "2025": {
        "grade": 85.9,
        "snaps": {
          "off": "968",
          "routes": "661",
          "rblk": "307"
        }
      }
    },
    "stats_2026": {
      "team": "DAL",
      "games": 8,
      "tgt": 62,
      "rec": 39,
      "yds": 533,
      "td": 2,
      "epa_tgt": 0.409,
      "epa": 25.4,
      "adot": 11.6,
      "sep": 2.4,
      "yac_oe": 0.26,
      "pff": 78.1,
      "pff_rank": 20,
      "routes": 310,
      "yprr": 1.72,
      "tprr": 0.2
    },
    "stats_2025": {
      "team": "DAL",
      "games": 17,
      "tgt": 138,
      "rec": 93,
      "yds": 1429,
      "td": 9,
      "epa_tgt": 0.643,
      "epa": 88.7,
      "adot": 11.3,
      "sep": 2.24,
      "yac_oe": 2.15,
      "pff": 85.9,
      "pff_rank": 7,
      "routes": 661,
      "yprr": 2.16,
      "tprr": 0.209
    },
    "splits_2026": {
      "deep_tgt": 9,
      "deep_catch": 0.33,
      "deep_epa_tgt": 0.29,
      "yac_rec": 3.3,
      "short_catch": 0.69,
      "rz_tgt": 7,
      "third_down_conv": "10/23",
      "fum_lost": 0
    },
    "splits_2025": {
      "deep_tgt": 22,
      "deep_catch": 0.45,
      "deep_epa_tgt": 0.8,
      "yac_rec": 5.2,
      "short_catch": 0.72,
      "rz_tgt": 24,
      "third_down_conv": "27/43",
      "fum_lost": 0
    },
    "usage_2026": {
      "offensive_snaps": 426,
      "games": 8
    },
    "summary_lines": [
      "George Pickens (DAL) 2026: 8 g, 62 tgt, 39 rec, 533 yds, 2 TD, EPA/tgt 0.409, aDOT 11.6, NGS separation 2.4, YAC over expected 0.26, YPRR 1.72, TPRR 0.2, routes 310; deep (20+ air yds) 9 tgt catch 0.33 EPA/tgt 0.29, short (<10) catch 0.69, YAC/rec 3.3, red-zone tgt 7, 3rd/4th-down conv 10/23, fumbles lost 0",
      "George Pickens (DAL) 2025: 17 g, 138 tgt, 93 rec, 1429 yds, 9 TD, EPA/tgt 0.643, aDOT 11.3, NGS separation 2.24, YAC over expected 2.15, YPRR 2.16, TPRR 0.209, routes 661; deep (20+ air yds) 22 tgt catch 0.45 EPA/tgt 0.8, short (<10) catch 0.72, YAC/rec 5.2, red-zone tgt 24, 3rd/4th-down conv 27/43, fumbles lost 0",
      "George Pickens PFF WR offense grade 2026 78.1 (rank 20), 2025 85.9; 2026 PFF snaps {'off': '426', 'routes': '310', 'rblk': '116'}",
      "George Pickens 2026 usage: 426 offensive snaps in 8 games (nflverse snap_counts); age 25, 75 in, 205 lb; roster status ACT"
    ],
    "availability": {
      "roster_status": "ACT"
    },
    "limitations": [
      "PFF drop rate, contested-catch rate and man/zone splits are paywalled; hands/contested traits judged from catch rates by depth, red-zone results and film-consensus style"
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
        "retrieved_at": "2026-11-03T14:51:41Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/wr/2025",
        "retrieved_at": "2026-11-03T14:51:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-03T14:51:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-03T14:51:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_receiving.csv.gz",
        "retrieved_at": "2026-11-03T14:51:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-03T14:51:41Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-03T14:51:41Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
