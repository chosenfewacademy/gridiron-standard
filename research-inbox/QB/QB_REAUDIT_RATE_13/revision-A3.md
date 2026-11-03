# QB_REAUDIT_RATE_13 revision A3 — Matthew Stafford (head-to-head adjustment from QB_REAUDIT_H2H_06; approved on card t31s1)

Supersedes QB_REAUDIT_RATE_13_A2 only if approved via `npm run reaudit:revise -- QB --task QB_REAUDIT_RATE_13 --revision 3 ...`.

```json
{
  "audit_id": "QB_REAUDIT_RATE_13_A3",
  "task_id": "QB_REAUDIT_RATE_13",
  "task_type": "player_rating",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "QB",
  "player_id": "matthew_stafford",
  "players": [
    "Matthew Stafford"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "ratings": {
    "SPD": 58,
    "ACC": 60,
    "AGI": 60,
    "COD": 58,
    "STR": 68,
    "AWR": 85,
    "THP": 88,
    "SAC": 84,
    "MAC": 82,
    "DAC": 78,
    "RUN": 66,
    "TUP": 80,
    "PAC": 86,
    "BSK": 82,
    "CAR": 82,
    "JMP": 70,
    "INJ": 86,
    "STA": 90,
    "TGH": 88
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
    "STA": "HIGH",
    "TGH": "MEDIUM"
  },
  "trait_notes": {
    "SPD": {
      "basis": "4 scrambles 23 yds (2026); rush EPA -31.8 (2025): no mobility",
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
      "basis": "Scramble yards per attempt 5.8 (2026), 3.1 (2025)",
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
      "basis": "Out-of-pocket share 11.8% / 15.2% (FTN); scrambles 4 / 7",
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
      "basis": "Open-field sample: 11 scrambles, 7 designed runs across 2025-26",
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
      "basis": "Listed 75 in, 214 lb; rush TD 0 (2026), 0 (2025)",
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
      "basis": "PFF 92.0 (#1, 46 TD) in 2025 vs 66.8 (#21) in 2026; interception-worthy 4.0% (2026, FTN)",
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
      "head_to_head_adjustment": "Stafford wins the 82 tie vs Lawrence: 2025 PFF 92.0 (#1), +.243 EPA/dropback, 46 TD / 8 INT over 17 games outweighs the 2026 slump; two-season EPA/dropback ~+.195 vs ~+.128. AWR 84->85."
    },
    "THP": {
      "basis": "aDOT 7.6 / 9.3; deep share 9.9% / 15.1%",
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
      "basis": "<10 yds 76.3% (2026), 72.9% (2025); CPOE +0.6 / +1.5",
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
      "basis": "10-19 yds 57.6% EPA +0.39 (2026), 56.9% EPA +0.57 (2025)",
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
      "basis": "20+ yds 26.7% EPA -0.16 (2026) vs 43.3% EPA +0.78 (2025)",
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
      "basis": "Out-of-pocket EPA +0.00 / +0.04, cmp 51.4% / 57.4% (FTN)",
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
      "basis": "vs blitz EPA +0.36 (2025) but -0.04 (2026) (FTN)",
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
      "basis": "Play-action 34.0% of dropbacks, EPA +0.33 (2025); 24.2%, +0.11 (2026) (FTN)",
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
      "basis": "Sack rate 3.7% / 3.8% \u2014 gets it out",
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
      "basis": "Fumbles lost 0 (2026), 3 (2025)",
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
      "basis": "Games 8/8 (2026), 17/17 (2025)",
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
      "basis": "Every game both seasons (17/17, 8/8) and 549 offensive snaps in 2026, the most of the 17 contention QBs",
      "why_not_higher": "Elite-tier claim capped at the sourced evidence",
      "why_not_lower": "Sourced elite evidence",
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
      "basis": "Plays through contact: 88 hits on attempts and 35 sacks absorbed; games 8/8, 17/17",
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
  "high_trait_evidence": {
    "STA": {
      "tier": "ELITE",
      "claim": "17/17 games 2025, 8/8 games 2026; 549 offensive snaps 2026, most among the 17 contention QBs",
      "source_urls": [
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv"
      ]
    }
  },
  "proposed_ovr": 83,
  "proposed_ovr_basis": "Judgment from the attribute build, adjusted after head-to-head QB_REAUDIT_H2H_06: Stafford wins the 82 tie vs Lawrence: 2025 PFF 92.0 (#1), +.243 EPA/dropback, 46 TD / 8 INT over 17 games outweighs the 2026 slump; two-season EPA/dropback ~+.195 vs ~+.128. AWR 84->85.",
  "season_split_reading": "Biggest split in the group: 2025 PFF 92.0 (#1, 46 TD) vs 2026 66.8 (#21, 8 INT, 26.7% deep). Reviewer weighting: the 2025 season is a full 17-game elite sample and is not discarded; the 2026 slump at 38 is a real decline signal over 8 games. Traits split the difference (THP 88, DAC 78), OVR 82 \u2014 well below Madden 98, above his 2026 grade alone.",
  "style_profile": "Iron-man pocket gunslinger: never misses a snap (549, most of the 17), beats the blitz and sacks with a quick release, drives play-action shots \u2014 but zero mobility and a 2026 deep-ball and turnover slump.",
  "style_evidence": [
    "PFF 92.0 (#1, 46 TD) in 2025 vs 66.8 (#21) in 2026; interception-worthy 4.0% (2026, FTN)",
    "Play-action 34.0% of dropbacks, EPA +0.33 (2025); 24.2%, +0.11 (2026) (FTN)",
    "Out-of-pocket EPA +0.00 / +0.04, cmp 51.4% / 57.4% (FTN)",
    "vs blitz EPA +0.36 (2025) but -0.04 (2026) (FTN)",
    "20+ yds 26.7% EPA -0.16 (2026) vs 43.3% EPA +0.78 (2025)"
  ],
  "input_dossier": "QB_REAUDIT_BG_13_A1",
  "weaknesses": [
    "SPD: 4 scrambles 23 yds (2026); rush EPA -31.8 (2025): no mobility",
    "COD: Open-field sample: 11 scrambles, 7 designed runs across 2025-26",
    "ACC: Scramble yards per attempt 5.8 (2026), 3.1 (2025)"
  ],
  "madden_reference": [
    {
      "player": "Matthew Stafford",
      "ovr": 98,
      "reference_only": true,
      "used_as_evidence": false,
      "file": "references/madden/QB_madden27_reference.json"
    }
  ],
  "major_flags": [
    "REVISION_A2_T30S3: per-player judgment replaces formula A1",
    "JMP_NO_EVIDENCE: neutral 70 LOW",
    "ELITE_TRAIT_PROPOSED: STA 90",
    "SEASON_SPLIT: PFF 92.0 (2025) vs 66.8 (2026)",
    "LARGE_MADDEN_GAP: OVR 82 vs Madden 98 (reference only)",
    "H2H_ADJUSTMENT_PROPOSED:QB_REAUDIT_H2H_06",
    "APPROVED_BY_COMMISSIONER: card t31s1"
  ],
  "locked_control_conflict": false
}
```
