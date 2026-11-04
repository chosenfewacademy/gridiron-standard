# RB_REAUDIT_RATE_09 revision A4 — Christian McCaffrey 84 (authorized t56s532)

Note fix to A3 (values unchanged): injury context is the 2024 season shortened to 4 games, not '2023-24'. Christian McCaffrey INJ 72->82, STA 84->90, OVR 83->84 (stays #5 behind Jaylen Warren). Durability marked down without missed games: played all 17 games in 2025 (week 14 bye) and all 7 San Francisco games in 2026.

```json
{
  "audit_id": "RB_REAUDIT_RATE_09_A4",
  "task_id": "RB_REAUDIT_RATE_09",
  "task_type": "player_rating",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "RB",
  "player_id": "christian_mccaffrey",
  "players": [
    "Christian McCaffrey"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "ratings": {
    "SPD": 83,
    "ACC": 84,
    "AGI": 88,
    "COD": 86,
    "STR": 70,
    "AWR": 94,
    "CAR": 90,
    "BCV": 94,
    "BTK": 82,
    "TRK": 66,
    "SFA": 74,
    "SPM": 76,
    "JKM": 84,
    "CTH": 86,
    "CIT": 78,
    "SRR": 86,
    "MRR": 80,
    "DRR": 72,
    "RLS": 80,
    "JMP": 84,
    "INJ": 82,
    "STA": 90,
    "TGH": 86
  },
  "trait_confidence": {
    "SPD": "MEDIUM",
    "ACC": "MEDIUM",
    "AGI": "MEDIUM",
    "COD": "MEDIUM",
    "STR": "MEDIUM",
    "AWR": "MEDIUM",
    "CAR": "MEDIUM",
    "BCV": "MEDIUM",
    "BTK": "MEDIUM",
    "TRK": "MEDIUM",
    "SFA": "MEDIUM",
    "SPM": "LOW",
    "JKM": "MEDIUM",
    "CTH": "MEDIUM",
    "CIT": "LOW",
    "SRR": "MEDIUM",
    "MRR": "MEDIUM",
    "DRR": "LOW",
    "RLS": "LOW",
    "JMP": "LOW",
    "INJ": "LOW",
    "STA": "MEDIUM",
    "TGH": "MEDIUM"
  },
  "trait_notes": {
    "SPD": {
      "basis": "Judgment (breakaway/explosive): 10+ run rate / 20+ runs / RYOE: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026). Revised 84->83: TIEBREAK_02 McCaffrey loses to Warren (0 runs of 20+, 2025 RYOE -0.54)",
      "why_not_higher": "Listed weakness area: long speed, breakaway runs, durability/age",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "ACC": {
      "basis": "Judgment (breakaway/explosive): 10+ run rate / 20+ runs / RYOE: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026). Revised 86->84: TIEBREAK_02 McCaffrey loses to Warren (0 runs of 20+, 2025 RYOE -0.54)",
      "why_not_higher": "Listed weakness area: long speed, breakaway runs, durability/age",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "AGI": {
      "basis": "Judgment (elusive): stuff rate, RYOE and success: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "COD": {
      "basis": "Judgment (elusive): stuff rate, RYOE and success: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "STR": {
      "basis": "Judgment (power): short-yardage conv and size (210 lb): 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "AWR": {
      "basis": "Judgment (vision): success, RYOE, EPA: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "CAR": {
      "basis": "Judgment (ball security): fumbles lost 2026 0, 2025 0. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "BCV": {
      "basis": "Judgment (vision): success, RYOE, EPA: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "BTK": {
      "basis": "Judgment (contact): RYOE/stuff rate: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "TRK": {
      "basis": "Judgment (power): short-yardage conv and size (210 lb): 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "SFA": {
      "basis": "Judgment (power): short-yardage conv and size (210 lb): 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "SPM": {
      "basis": "Judgment (elusive): stuff rate, RYOE and success: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "JKM": {
      "basis": "Judgment (elusive): stuff rate, RYOE and success: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "CTH": {
      "basis": "Judgment (receiving): targets/rec yds/YAC/routes: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5; routes 169. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "CIT": {
      "basis": "Judgment (receiving): targets/rec yds/YAC/routes: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5; routes 169. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "SRR": {
      "basis": "Judgment (receiving): targets/rec yds/YAC/routes: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5; routes 169. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "MRR": {
      "basis": "Judgment (receiving): targets/rec yds/YAC/routes: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5; routes 169. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "DRR": {
      "basis": "Judgment (receiving): targets/rec yds/YAC/routes: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5; routes 169. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "RLS": {
      "basis": "Judgment (receiving): targets/rec yds/YAC/routes: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5; routes 169. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "JMP": {
      "basis": "Judgment (athletic): size/age 210 lb age 30; explosive plays: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "INJ": {
      "basis": "Played all 17 games in 2025 (weeks 1-13, 15-18; week 14 bye) and all 7 San Francisco games in 2026 (weeks 1-7) per nflverse snap counts; roster status ACT; age 30 and the 2024 season shortened to 4 games keep him short of the top tier",
      "why_not_higher": "Age 30 and the injury-shortened 2024 season; heavy-contact role",
      "why_not_lower": "No missed games across 24 straight team games in 2025-26",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "STA": {
      "basis": "932 offensive snaps in 17 games 2025 (311 carries + 129 targets, 440 carries+targets, the most of any NFL running back in 2025) and 293 offensive snaps in 7 of 7 games 2026 (87 runs, 169 routes per PFF) per nflverse snap counts",
      "why_not_higher": "2026 snap share below his 2025 workhorse load",
      "why_not_lower": "Every-down workload across both seasons",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "TGH": {
      "basis": "Judgment (usage): Christian McCaffrey 2026 usage: 293 offensive snaps in 7 games (nflverse snap_counts); age 30, 71 in, 210 lb; roster status ACT; PFF snaps {'off': '293', 'run': '87', 'route': '169', 'pblk': '19'}. Style: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
      "why_not_higher": "Evidence does not separate him from higher-rated backs in this group on this trait",
      "why_not_lower": "Evidence keeps him above lower-rated backs in this group on this trait",
      "sources": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    }
  },
  "high_trait_evidence": {
    "AWR": {
      "tier": "ELITE",
      "claim": "vision: success, RYOE, EPA: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5",
      "source_urls": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "CAR": {
      "tier": "ELITE",
      "claim": "ball security: fumbles lost 2026 0, 2025 0",
      "source_urls": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "BCV": {
      "tier": "ELITE",
      "claim": "vision: success, RYOE, EPA: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5",
      "source_urls": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ]
    },
    "STA": {
      "claim": "932 offensive snaps in 17 games 2025 (311 carries + 129 targets, 440 carries+targets, the most of any NFL running back in 2025) and 293 offensive snaps in 7 of 7 games 2026 (87 runs, 169 routes per PFF) per nflverse snap counts",
      "source_urls": [
        "https://www.pff.com/grades/nfl/hb/2026",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/nextgen_stats/ngs_rushing.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv"
      ],
      "tier": "ELITE"
    }
  },
  "proposed_ovr": 84,
  "proposed_ovr_basis": "Judgment, attribute by attribute (no formula, no percentile); stricter than Madden. Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026). Revision A2: TIEBREAK_02 McCaffrey loses to Warren (0 runs of 20+, 2025 RYOE -0.54) Revision A3 (t56s532): Christian McCaffrey INJ 72->82, STA 84->90, OVR 83->84 (stays #5 behind Jaylen Warren). Durability marked down without missed games: played all 17 games in 2025 (week 14 bye) and all 7 San Francisco games in 2026. Revision A4 (t56s532): Note fix to A3 (values unchanged): injury context is the 2024 season shortened to 4 games, not '2023-24'. Christian McCaffrey INJ 72->82, STA 84->90, OVR 83->84 (stays #5 behind Jaylen Warren). Durability marked down without missed games: played all 17 games in 2025 (week 14 bye) and all 7 San Francisco games in 2026.",
  "style_profile": "Christian McCaffrey: Age-30 receiving-first chess piece: best route runner and processor in the group (904 rec yds 2025, 169 routes on 87 runs 2026), success rate 54% and EPA +.144 on vision; top-end speed and burst have faded (0 runs of 20+ in 2026).",
  "style_evidence": [
    "Christian McCaffrey (SF) 2026: 84 car 389 yds 4.63 ypc 8 TD, EPA/rush +0.144, success 54%, 10+ run rate 13%, RYOE/att 0.363628911385265, fumbles lost 0, 42 tgt 34 rec 251 rec yds, rec YAC/rec 5.53, 20+ runs 0, stuff rate 10.7%, 3rd/4th-and-<=2 conv 4/5",
    "Christian McCaffrey (SF) 2025: 311 car 1202 yds 3.86 ypc 10 TD, EPA/rush -0.068, success 39%, 10+ run rate 9%, RYOE/att -0.54120338670271, fumbles lost 0, 129 tgt 102 rec 904 rec yds, rec YAC/rec 6.86, 20+ runs 3, stuff rate 18.6%, 3rd/4th-and-<=2 conv 12/18",
    "Christian McCaffrey PFF HB overall 2026 73.0 (rank 19), 2025 77.2; 2026 PFF snaps off 293, run 87, routes 169, pass-block 19",
    "Christian McCaffrey 2026 usage: 293 offensive snaps in 7 games (nflverse snap_counts); age 30, 71 in, 210 lb; roster status ACT"
  ],
  "input_dossier": "RB_REAUDIT_BG_09_A1",
  "weaknesses": [
    "long speed",
    "breakaway runs",
    "durability/age"
  ],
  "madden_reference": [
    {
      "player": "Christian McCaffrey",
      "ovr": 97,
      "attributes": {
        "SPD": 90,
        "ACC": 92,
        "AGI": 93,
        "COD": 92,
        "STR": 74,
        "AWR": 99,
        "CAR": 96,
        "BCV": 98,
        "BTK": 93,
        "TRK": 67,
        "SFA": 80,
        "SPM": 84,
        "JKM": 92,
        "CTH": 83,
        "CIT": 72,
        "SRR": 82,
        "MRR": 78,
        "DRR": 69,
        "RLS": 76,
        "JMP": 90,
        "INJ": 83,
        "STA": 97,
        "TGH": 94
      },
      "reference_only": true,
      "used_as_evidence": false,
      "delta_ovr": -13,
      "delta_attributes": {
        "SPD": -7,
        "ACC": -8,
        "AGI": -5,
        "COD": -6,
        "STR": -4,
        "AWR": -5,
        "CAR": -6,
        "BCV": -4,
        "BTK": -11,
        "TRK": -1,
        "SFA": -6,
        "SPM": -8,
        "JKM": -8,
        "CTH": 3,
        "CIT": 6,
        "SRR": 4,
        "MRR": 2,
        "DRR": 3,
        "RLS": 4,
        "JMP": -6,
        "INJ": -1,
        "STA": -7,
        "TGH": -8
      },
      "source": "https://www.ea.com/games/madden-nfl/ratings (Madden 27 RB, retrieved 2026-11-02 ET)"
    }
  ],
  "variance_check": {
    "ovr_gap": 13,
    "attribute_gaps_10plus": {
      "BTK": -11
    },
    "threshold": 10,
    "result": "FLAG_FOR_VARIANCE_AUDIT"
  },
  "major_flags": [],
  "locked_control_conflict": false,
  "judgment_rating": true,
  "authorized_by": "t56s532"
}
```
