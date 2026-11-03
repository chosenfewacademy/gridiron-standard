# QB_REAUDIT_RATE_11 revision A4 — Jordan Love style rework from own evidence (approved on card t33s4)

```json
{
  "audit_id": "QB_REAUDIT_RATE_11_A4",
  "task_id": "QB_REAUDIT_RATE_11",
  "task_type": "player_rating",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "QB",
  "player_id": "jordan_love",
  "players": [
    "Jordan Love"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "ratings": {
    "SPD": 70,
    "ACC": 72,
    "AGI": 70,
    "COD": 69,
    "STR": 70,
    "AWR": 80,
    "THP": 89,
    "SAC": 80,
    "MAC": 85,
    "DAC": 74,
    "RUN": 76,
    "TUP": 83,
    "PAC": 85,
    "BSK": 84,
    "CAR": 82,
    "JMP": 70,
    "INJ": 84,
    "STA": 88,
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
      "basis": "Minimal running: rush share 7.1% of dropbacks, scrambles 12th of 17 [nflverse pbp + FTN charting 2025-2026 REG (games-weighted), NGS passing; QB_REAUDIT_VARIANCE_AUDIT analysis]; revised 72->70 (variance audit, approved t33s4)",
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
      "basis": "Minimal running: rush share 7.1%, scrambles 12th [nflverse pbp + FTN charting 2025-2026 REG (games-weighted), NGS passing; QB_REAUDIT_VARIANCE_AUDIT analysis]; revised 74->72 (variance audit, approved t33s4)",
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
      "basis": "Minimal running; scramble volume 12th of 17 [nflverse pbp + FTN charting 2025-2026 REG (games-weighted), NGS passing; QB_REAUDIT_VARIANCE_AUDIT analysis]; revised 74->70 (variance audit, approved t33s4)",
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
      "basis": "Minimal running; designed-run usage near bottom [nflverse pbp + FTN charting 2025-2026 REG (games-weighted), NGS passing; QB_REAUDIT_VARIANCE_AUDIT analysis]; revised 72->69 (variance audit, approved t33s4)",
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
      "basis": "Listed 76 in, 220 lb; rush TD 1 (2026), 0 (2025)",
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
      "basis": "PFF 74.5 (#15) vs 88.8 (#4); interception-worthy 3.2% (2026, FTN)",
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
      "basis": "Deep share 17.0% (2026) / 14.1% (2025), aDOT 9.2 / 8.8 \u2014 the most vertical passer of the 12",
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
      "basis": "Short-area (<10 air yds) completion 9th of 17 [nflverse pbp + FTN charting 2025-2026 REG (games-weighted), NGS passing; QB_REAUDIT_VARIANCE_AUDIT analysis]; revised 77->80 (variance audit, approved t33s4)",
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
      "basis": "10-19 yds 59.3% EPA +0.61 (2026), 58.5% EPA +0.60 (2025)",
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
      "basis": "Deep (20+) completion 37.4%, EPA +0.53, 13th of 17 despite 1st in deep rate [nflverse pbp + FTN charting 2025-2026 REG (games-weighted), NGS passing; QB_REAUDIT_VARIANCE_AUDIT analysis]; revised 78->74 (variance audit, approved t33s4)",
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
      "basis": "Out-of-pocket EPA +0.05, 12th of 17 (above Prescott -0.19) [nflverse pbp + FTN charting 2025-2026 REG (games-weighted), NGS passing; QB_REAUDIT_VARIANCE_AUDIT analysis]; revised 74->76 (variance audit, approved t33s4)",
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
      "basis": "Hit 53.8% EPA +0.17 (2026, n=39) \u2014 among the best of the 12 \u2014 after 32.7% (2025)",
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
      "basis": "Play-action 16.8% EPA +0.19 (2026), 23.2% EPA +0.40 (2025) (FTN)",
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
      "basis": "Sack rate 4.3% / 4.6%",
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
      "basis": "Fumbles lost 1 (2026), 2 (2025)",
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
      "basis": "523 snaps 2026",
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
      "basis": "Plays through contact: 88 hits on attempts and 35 sacks absorbed; games 8/8, 15/17",
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
  "proposed_ovr": 83,
  "proposed_ovr_basis": "Judgment from the whole attribute build (no formula), per the repo methodology. Season reading: 2025 (PFF 88.8 #4, CPOE +5.5) was near-elite; 2026 (74.5 #15, CPOE -1.1) is a clear dip over 8 games. Reviewer weighting: both full samples count; arm and pressure traits are stable, accuracy and AWR are set between the two years, OVR 83 reflects the current dip without erasing 2025.",
  "input_dossier": "QB_REAUDIT_BG_11_A1",
  "weaknesses": [
    "STR: Listed 76 in, 220 lb; rush TD 1 (2026), 0 (2025)",
    "JMP: Searched FTN charting, nflverse play-by-play and PFF: no jumping / elevated-throw measure exists; neutral 70 at LOW confidence",
    "SPD: Scrambles 1-6 (2026), 24-183 (2025); designed runs 5-18 / 10-28"
  ],
  "madden_reference": [
    {
      "player": "Jordan Love",
      "ovr": 86,
      "reference_only": true,
      "used_as_evidence": false,
      "file": "references/madden/QB_madden27_reference.json"
    }
  ],
  "major_flags": [
    "REVISION_A2_T30S3: per-player judgment replaces formula A1",
    "JMP_NO_EVIDENCE: neutral 70 LOW",
    "SEASON_SPLIT: PFF 88.8 (2025) vs 74.5 (2026)",
    "VARIANCE_ADJUSTMENT:QB_REAUDIT_VARIANCE_AUDIT:SAC",
    "VARIANCE_ADJUSTMENT:QB_REAUDIT_VARIANCE_AUDIT:SPD,ACC,AGI,COD,DAC,RUN"
  ],
  "locked_control_conflict": false,
  "style_profile": "Volume vertical pocket passer: highest deep-shot rate in the group (15.3% of attempts 20+ air yards, 1st of 17; aDOT 8.96) with only middling deep efficiency (37.4% / +0.53 EPA, 13th), stays in the pocket and rarely runs (QB rush share 7.1% of dropbacks, 12th in scrambles), effective when he does leave structure",
  "style_evidence": [
    "Deep rate 15.3% (1st/17) vs Prescott 10.1% (14th); aDOT 8.96 vs 7.93 (nflverse pbp 2025-26 REG)",
    "Deep completion 37.4%, EPA +0.53 on 115 deep attempts (13th/17) vs Prescott 42.9% / +0.77",
    "Rush share 7.1% of dropbacks vs Prescott 7.8%; scrambles 12th vs 8th; out-of-pocket EPA +0.05 (12th) vs Prescott -0.19 (17th)",
    "Play-action rate 20.8% (15th) vs Prescott 24.6% (7th) (FTN)"
  ]
}
```
