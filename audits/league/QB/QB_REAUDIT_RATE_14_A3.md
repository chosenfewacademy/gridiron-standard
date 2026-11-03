# QB_REAUDIT_RATE_14 revision A3 — Kirk Cousins variance fix (approved on card t33s4)

```json
{
  "audit_id": "QB_REAUDIT_RATE_14_A3",
  "task_id": "QB_REAUDIT_RATE_14",
  "task_type": "player_rating",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "QB",
  "player_id": "kirk_cousins",
  "players": [
    "Kirk Cousins"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "ratings": {
    "SPD": 55,
    "ACC": 58,
    "AGI": 58,
    "COD": 56,
    "STR": 64,
    "AWR": 82,
    "THP": 79,
    "SAC": 82,
    "MAC": 78,
    "DAC": 76,
    "RUN": 62,
    "TUP": 76,
    "PAC": 86,
    "BSK": 80,
    "CAR": 84,
    "JMP": 70,
    "INJ": 74,
    "STA": 84,
    "TGH": 76
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
      "basis": "Scrambles 5-16 (2026), 2-8 (2025); designed runs 5-4 / 6-9",
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
      "basis": "Scramble yards per attempt 3.2 (2026), 4.0 (2025)",
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
      "basis": "Out-of-pocket share 8.4% / 5.0% (FTN); scrambles 5 / 2",
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
      "basis": "Open-field sample: 7 scrambles, 11 designed runs across 2025-26",
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
      "basis": "Listed 75 in, 209 lb; rush TD 1 (2026), 1 (2025)",
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
      "basis": "PFF 78.0 (#12) / 76.0 (#16); 19 TD / 5 INT 2026",
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
      "basis": "aDOT 8.0 / 7.0; deep share 9.9% / 9.3%",
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
      "basis": "<10 yds 70.7% (2026), 72.9% (2025); CPOE -0.4 / -2.8",
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
      "basis": "10-19 yds 52.7% EPA +0.40 (2026), 47.6% EPA +0.26 (2025)",
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
      "basis": "20+ yds 46.4% (2026) vs 16.0% (2025)",
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
      "basis": "Out-of-pocket only 8.4% / 5.0% of dropbacks (FTN); 2025 is the lowest of the 17",
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
      "basis": "EPA/play under pressure -0.59, 5th of 17 [nflverse pbp + FTN charting 2025-2026 REG (games-weighted), NGS passing; QB_REAUDIT_VARIANCE_AUDIT analysis]; revised 70->76 (variance audit, approved t33s4)",
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
      "basis": "PA EPA +0.28 (2026) and +0.28 (2025) vs non-PA +0.14 / -0.11 (FTN)",
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
      "basis": "Sack rate 3.7% (2026), 4.6% (2025)",
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
      "basis": "0 fumbles lost 2026, 1 in 2025",
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
      "basis": "10/17 games 2025",
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
      "basis": "532 offensive snaps 2026; games 8/8 and 10/17",
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
      "basis": "Plays through contact: 69 hits on attempts and 24 sacks absorbed; games 8/8, 10/17",
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
  "proposed_ovr_basis": "Judgment from the whole attribute build (no formula), per the repo methodology. Season reading: 2025 (10 games, CPOE -2.8, 16% deep) was poor and partly injury/role-affected; 2026 (PFF #12, 19 TD) is clearly better on 8 games. Traits credit 2026 for accuracy; availability and deep traits carry the 2025 record.",
  "input_dossier": "QB_REAUDIT_BG_14_A1",
  "weaknesses": [
    "SPD: Scrambles 5-16 (2026), 2-8 (2025); designed runs 5-4 / 6-9",
    "COD: Open-field sample: 7 scrambles, 11 designed runs across 2025-26",
    "ACC: Scramble yards per attempt 3.2 (2026), 4.0 (2025)"
  ],
  "madden_reference": [
    {
      "player": "Kirk Cousins",
      "ovr": 76,
      "reference_only": true,
      "used_as_evidence": false,
      "file": "references/madden/QB_madden27_reference.json"
    }
  ],
  "major_flags": [
    "REVISION_A2_T30S3: per-player judgment replaces formula A1",
    "JMP_NO_EVIDENCE: neutral 70 LOW",
    "AVAILABILITY_2025: 10/17 games",
    "VARIANCE_ADJUSTMENT:QB_REAUDIT_VARIANCE_AUDIT:TUP"
  ],
  "locked_control_conflict": false,
  "style_profile": "Structure-only play-action distributor: one of the least out-of-pocket QBs of the group (5-8% of dropbacks), protects the ball and avoids sacks, gains most of his value on play-action timing; no mobility and limited creation.",
  "style_evidence": [
    "PFF 78.0 (#12) / 76.0 (#16); 19 TD / 5 INT 2026",
    "PA EPA +0.28 (2026) and +0.28 (2025) vs non-PA +0.14 / -0.11 (FTN)",
    "Out-of-pocket only 8.4% / 5.0% of dropbacks (FTN); 2025 is the lowest of the 17",
    "Hit 31.6% EPA -0.34 (n=38) 2026, 35.5% EPA -0.16 (n=31) 2025; vs blitz EPA +0.05 / +0.06 (FTN)",
    "20+ yds 46.4% (2026) vs 16.0% (2025)"
  ]
}
```
