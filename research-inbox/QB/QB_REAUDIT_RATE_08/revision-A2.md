# QB_REAUDIT_RATE_08 revision A2 — Geno Smith (per-player judgment, t30s3; supersedes formula A1)

```json
{
  "audit_id": "QB_REAUDIT_RATE_08_A2",
  "task_id": "QB_REAUDIT_RATE_08",
  "task_type": "player_rating",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "QB",
  "player_id": "geno_smith",
  "players": [
    "Geno Smith"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "ratings": {
    "SPD": 68,
    "ACC": 70,
    "AGI": 69,
    "COD": 67,
    "STR": 70,
    "AWR": 77,
    "THP": 83,
    "SAC": 85,
    "MAC": 80,
    "DAC": 84,
    "RUN": 72,
    "TUP": 68,
    "PAC": 78,
    "BSK": 64,
    "CAR": 80,
    "JMP": 70,
    "INJ": 78,
    "STA": 82,
    "TGH": 80
  },
  "trait_confidence": {
    "SPD": "MEDIUM",
    "ACC": "MEDIUM",
    "AGI": "MEDIUM",
    "COD": "MEDIUM",
    "STR": "MEDIUM",
    "AWR": "MEDIUM",
    "THP": "MEDIUM",
    "SAC": "MEDIUM",
    "MAC": "MEDIUM",
    "DAC": "MEDIUM",
    "RUN": "MEDIUM",
    "TUP": "MEDIUM",
    "PAC": "MEDIUM",
    "BSK": "MEDIUM",
    "CAR": "MEDIUM",
    "JMP": "LOW",
    "INJ": "MEDIUM",
    "STA": "MEDIUM",
    "TGH": "MEDIUM"
  },
  "trait_notes": {
    "SPD": {
      "basis": "11 scrambles 49 yds (2026); 17 designed runs 6 yds (2025)",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "ACC": {
      "basis": "Scramble yards per attempt 4.5 (2026), 6.1 (2025)",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "AGI": {
      "basis": "Out-of-pocket share 9.5% / 12.3% (FTN); scrambles 11 / 18",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "COD": {
      "basis": "Open-field sample: 29 scrambles, 22 designed runs across 2025-26",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "STR": {
      "basis": "Listed 75 in, 221 lb; rush TD 0 (2026), 0 (2025)",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "AWR": {
      "basis": "17 INT 2025 vs 3 INT 2026; PFF 60.9 (#34) / 80.9 (#9)",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "THP": {
      "basis": "aDOT 7.9 / 6.2; deep share 11.7% / 9.8%",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "SAC": {
      "basis": "<10 yds 72.8% (2026), 75.7% (2025); CPOE +6.0 / +0.7",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "MAC": {
      "basis": "10-19 yds 61.9% EPA +0.61 (2026), 49.3% EPA +0.17 (2025)",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "DAC": {
      "basis": "20+ yds 57.1% EPA +1.42 (2026) vs 34.1% EPA +0.13 (2025)",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "RUN": {
      "basis": "Out-of-pocket EPA +0.10 / -0.40, cmp 52.0% / 51.6% (FTN)",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "TUP": {
      "basis": "Hit: 34.8% (2026), 43.2% EPA -0.78 (2025); vs blitz EPA -0.20 (2025)",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "PAC": {
      "basis": "Play-action 18.6% EPA +0.24 (2026), 24.3% EPA -0.06 (2025) (FTN)",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "BSK": {
      "basis": "Sack rate 10.9% (2025, 55 sacks, 23 QB-fault per FTN) and 8.7% (2026): the most sack-prone of the 12",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "CAR": {
      "basis": "Fumbles lost 2 (2026), 1 (2025)",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "JMP": {
      "basis": "Searched FTN charting, nflverse play-by-play and PFF: no jumping / elevated-throw measure exists; neutral 70 at LOW confidence",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "INJ": {
      "basis": "Games 8/8 (2026), 15/17 (2025)",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "STA": {
      "basis": "494 offensive snaps 2026; games 8/8 and 15/17",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    },
    "TGH": {
      "basis": "Plays through contact: 67 hits on attempts and 78 sacks absorbed; games 8/8, 15/17",
      "why_not_higher": "Evidence does not support a higher tier; see season split",
      "why_not_lower": "Two-season evidence floors it",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/ftn_charting/ftn_charting_2025.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025",
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
      ]
    }
  },
  "high_trait_evidence": {},
  "proposed_ovr": 78,
  "proposed_ovr_basis": "Judgment from the whole attribute build (no formula), per the repo methodology. Season reading: Reviewer reading: 2025 (EPA -0.146, 17 INT, 55 sacks) was a collapse and 2026 (EPA +0.136, CPOE +6.0) a genuine rebound on 8 games; neither is treated as the true level alone. Accuracy traits credit 2026 (current, fresh evidence) while pressure/sack traits keep the two-season record because 2026 still shows 8.7% sacks.",
  "season_split_reading": "Reviewer reading: 2025 (EPA -0.146, 17 INT, 55 sacks) was a collapse and 2026 (EPA +0.136, CPOE +6.0) a genuine rebound on 8 games; neither is treated as the true level alone. Accuracy traits credit 2026 (current, fresh evidence) while pressure/sack traits keep the two-season record because 2026 still shows 8.7% sacks.",
  "style_profile": "Rhythm short-to-deep shot passer who wins on clean-pocket throws (2026 deep 57%, CPOE +6.0) but is the most sack-prone and pressure-fragile passer of the group (10.9% sack rate 2025) \u2014 clean-pocket dependent, little creation.",
  "style_evidence": [
    "17 INT 2025 vs 3 INT 2026; PFF 60.9 (#34) / 80.9 (#9)",
    "Play-action 18.6% EPA +0.24 (2026), 24.3% EPA -0.06 (2025) (FTN)",
    "Out-of-pocket EPA +0.10 / -0.40, cmp 52.0% / 51.6% (FTN)",
    "Hit: 34.8% (2026), 43.2% EPA -0.78 (2025); vs blitz EPA -0.20 (2025)",
    "20+ yds 57.1% EPA +1.42 (2026) vs 34.1% EPA +0.13 (2025)"
  ],
  "input_dossier": "QB_REAUDIT_BG_08_A1",
  "weaknesses": [
    "BSK: Sack rate 10.9% (2025, 55 sacks, 23 QB-fault per FTN) and 8.7% (2026): the most sack-prone of the 12",
    "COD: Open-field sample: 29 scrambles, 22 designed runs across 2025-26",
    "SPD: 11 scrambles 49 yds (2026); 17 designed runs 6 yds (2025)"
  ],
  "madden_reference": [
    {
      "player": "Geno Smith",
      "ovr": 75,
      "reference_only": true,
      "used_as_evidence": false,
      "file": "references/madden/QB_madden27_reference.json"
    }
  ],
  "major_flags": [
    "REVISION_A2_T30S3: per-player judgment replaces formula A1",
    "JMP_NO_EVIDENCE: neutral 70 LOW",
    "SEASON_SPLIT: PFF 60.9 (2025) vs 80.9 (2026)",
    "SACK_PRONE: 78 sacks in two seasons"
  ],
  "locked_control_conflict": false
}
```
