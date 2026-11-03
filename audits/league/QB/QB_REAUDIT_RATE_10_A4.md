# QB_REAUDIT_RATE_10 revision A4 — Patrick Mahomes variance fix (approved on card t33s4)

```json
{
  "audit_id": "QB_REAUDIT_RATE_10_A4",
  "task_id": "QB_REAUDIT_RATE_10",
  "task_type": "player_rating",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "QB",
  "player_id": "patrick_mahomes",
  "players": [
    "Patrick Mahomes"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "ratings": {
    "SPD": 76,
    "ACC": 78,
    "AGI": 82,
    "COD": 80,
    "STR": 72,
    "AWR": 84,
    "THP": 85,
    "SAC": 83,
    "MAC": 85,
    "DAC": 70,
    "RUN": 88,
    "TUP": 82,
    "PAC": 84,
    "BSK": 85,
    "CAR": 88,
    "JMP": 70,
    "INJ": 80,
    "STA": 82,
    "TGH": 84
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
      "basis": "Scrambles 13-71 (2026), 52-420 (2025); designed runs 2-14 / 4-9",
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
      "basis": "Scramble yards per attempt 5.5 (2026), 8.1 (2025)",
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
      "basis": "Out-of-pocket share 22.7% / 19.6% (FTN); scrambles 13 / 52",
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
      "basis": "Open-field sample: 65 scrambles, 6 designed runs across 2025-26",
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
      "basis": "Listed 74 in, 225 lb; rush TD 1 (2026), 5 (2025)",
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
      "basis": "PFF 76.2 (#13) / 76.0 (#16); 11 INT 2025",
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
      "basis": "aDOT 5.8 in 2026 (lowest of the 12) after 8.1 in 2025 \u2014 arm is not the constraint, the deep game is",
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
      "basis": "<10 yds 72.4% (2026), 70.1% (2025); CPOE +1.6 / +0.3",
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
      "basis": "10-19 yds 61.8% EPA +0.68 (2026)",
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
      "basis": "20+ yds 29.2% EPA -0.03 (2026), 31.8% (2025): among the weakest deep completion of the 12",
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
      ],
      "head_to_head_adjustment": "Lawrence wins the 82 tie: 2026 EPA/dropback +.282 vs +.138, 2025 PFF 83.7 vs 76.0. DAC 72->70: 29% deep completion in 2026."
    },
    "RUN": {
      "basis": "Out-of-pocket on 22.7% (2026) / 19.6% (2025) of dropbacks, 60.0% completions OOP 2026 (FTN); 52 scrambles 420 yds 2025",
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
      "basis": "EPA/play under pressure -0.43, 1st of 17 [nflverse pbp + FTN charting 2025-2026 REG (games-weighted), NGS passing; QB_REAUDIT_VARIANCE_AUDIT analysis]; revised 74->82 (variance audit, approved t33s4)",
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
      "basis": "PA EPA +0.33 (2026, FTN)",
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
      "basis": "Sack rate 3.7% (2026)",
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
      "basis": "0 fumbles lost in either season",
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
      "basis": "14/17 games 2025, 7/7 2026",
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
      "basis": "444 offensive snaps 2026; games 7/7 and 14/17",
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
      "basis": "Plays through contact: 100 hits on attempts and 43 sacks absorbed; games 7/7, 14/17",
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
  "proposed_ovr": 81,
  "proposed_ovr_basis": "Judgment from the attribute build, adjusted after head-to-head QB_REAUDIT_H2H_05: Lawrence wins the 82 tie: 2026 EPA/dropback +.282 vs +.138, 2025 PFF 83.7 vs 76.0. DAC 72->70: 29% deep completion in 2026.",
  "input_dossier": "QB_REAUDIT_BG_10_A1",
  "weaknesses": [
    "JMP: Searched FTN charting, nflverse play-by-play and PFF: no jumping / elevated-throw measure exists; neutral 70 at LOW confidence",
    "STR: Listed 74 in, 225 lb; rush TD 1 (2026), 5 (2025)",
    "DAC: 20+ yds 29.2% EPA -0.03 (2026), 31.8% (2025): among the weakest deep completion of the 12"
  ],
  "madden_reference": [
    {
      "player": "Patrick Mahomes",
      "ovr": 93,
      "reference_only": true,
      "used_as_evidence": false,
      "file": "references/madden/QB_madden27_reference.json"
    }
  ],
  "major_flags": [
    "REVISION_A2_T30S3: per-player judgment replaces formula A1",
    "JMP_NO_EVIDENCE: neutral 70 LOW",
    "LARGE_MADDEN_GAP: OVR 82 vs Madden 93 (reference only)",
    "DEEP_GAME_COLLAPSE: 29% deep completion 2026",
    "H2H_ADJUSTMENT_PROPOSED:QB_REAUDIT_H2H_05",
    "APPROVED_BY_COMMISSIONER: card t31s1",
    "VARIANCE_ADJUSTMENT:QB_REAUDIT_VARIANCE_AUDIT:TUP"
  ],
  "locked_control_conflict": false,
  "style_profile": "Off-script improviser in a short-area offense: lives on out-of-pocket creation (22.7% of dropbacks, 60% OOP completions), zero fumbles and rare sacks, but the deep game has vanished (29% deep, aDOT 5.8) \u2014 creator-and-protector rather than vertical star.",
  "style_evidence": [
    "PFF 76.2 (#13) / 76.0 (#16); 11 INT 2025",
    "PA EPA +0.33 (2026, FTN)",
    "Out-of-pocket on 22.7% (2026) / 19.6% (2025) of dropbacks, 60.0% completions OOP 2026 (FTN); 52 scrambles 420 yds 2025",
    "Hit 31.2% EPA -0.16 (n=32) 2026, 32.4% EPA -0.03 (n=68) 2025; vs blitz EPA +0.25 / +0.03 (FTN)",
    "20+ yds 29.2% EPA -0.03 (2026), 31.8% (2025): among the weakest deep completion of the 12"
  ]
}
```
