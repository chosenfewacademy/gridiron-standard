# QB_REAUDIT_RATE_03 revision A3 — tiebreak adjustment authorized by t35s273

```json
{
  "audit_id": "QB_REAUDIT_RATE_03_A3",
  "task_id": "QB_REAUDIT_RATE_03",
  "task_type": "player_rating",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "QB",
  "player_id": "dak_prescott",
  "players": [
    "Dak Prescott"
  ],
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "ratings": {
    "SPD": 72,
    "ACC": 74,
    "AGI": 72,
    "COD": 71,
    "STR": 76,
    "AWR": 87,
    "THP": 86,
    "SAC": 84,
    "MAC": 79,
    "DAC": 80,
    "RUN": 74,
    "TUP": 82,
    "PAC": 83,
    "BSK": 80,
    "CAR": 82,
    "JMP": 70,
    "INJ": 86,
    "STA": 90,
    "TGH": 87
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
    "JMP": "MEDIUM",
    "INJ": "MEDIUM",
    "STA": "HIGH",
    "TGH": "MEDIUM"
  },
  "trait_notes": {
    "SPD": {
      "basis": "Pocket mover; 17 scrambles 93 yds (5.5 YPC) 2026; designed runs negligible",
      "why_not_higher": "No designed-run speed",
      "why_not_lower": "Functional scrambler",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "ACC": {
      "basis": "Short-area escapes; scramble YPC 5.5 (2026), 6.8 (2025)",
      "why_not_higher": "Not a burst runner",
      "why_not_lower": "Escapes when lanes open",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "AGI": {
      "basis": "In-pocket movement",
      "why_not_higher": "No open-field creation",
      "why_not_lower": "Avoids sacks",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "COD": {
      "basis": "Limited open-field sample",
      "why_not_higher": "No open-field evidence",
      "why_not_lower": "Pocket slides",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "STR": {
      "basis": "Sturdy 6'2\" 238; absorbs hits",
      "why_not_higher": "Not a power runner",
      "why_not_lower": "Heaviest frame of the three rated",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "AWR": {
      "basis": "PFF 86.2 (#3) 2026 and 86.9 (#5) 2025 \u2014 the most stable grade of the three rated; 14 TD / 5 INT",
      "why_not_higher": "Not 90: CPOE +0.2 and EPA/play #9 of 17",
      "why_not_lower": "Two consistent top-5 PFF seasons",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "THP": {
      "basis": "4552 yds 2025; drives ball outside",
      "why_not_higher": "Deep share only 8.2% (2026)",
      "why_not_lower": "Makes all throws at volume",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "SAC": {
      "basis": "<10 air yds 72.1% (2026), 74.7% (2025)",
      "why_not_higher": "Below Burrow/Jackson short accuracy; CPOE +0.2",
      "why_not_lower": "Reliable short-area completion rate",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "MAC": {
      "basis": "10-19 air yds 53.6% EPA .30 (2026), 56.5% (2025)",
      "why_not_higher": "Intermediate accuracy is a clear weakness",
      "why_not_lower": "Positive EPA intermediate",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "DAC": {
      "basis": "20+ air yds 40.0% EPA .58 (2026), 43.9% EPA .84 (2025)",
      "why_not_higher": "Moderate deep completion rate",
      "why_not_lower": "Positive deep EPA both seasons",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "RUN": {
      "basis": "Out-of-pocket EPA/play -0.19, 17th of 17; OOP completion 52.7% (13th) [nflverse pbp + FTN charting 2025-2026 REG (games-weighted), NGS passing; QB_REAUDIT_VARIANCE_AUDIT analysis]; revised 80->74 (variance audit, approved t33s4)",
      "why_not_higher": "No on-the-run split",
      "why_not_lower": "Extends some plays",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "TUP": {
      "basis": "Sack rate 3.5% (2026); 43.8% cmp when hit vs 67.0% clean",
      "why_not_higher": "Accuracy drops sharply when hit (EPA -.45)",
      "why_not_lower": "Gets the ball out; very low sack rate",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "PAC": {
      "basis": "Rhythm/timing offense; PFF #3",
      "why_not_higher": "No PA split",
      "why_not_lower": "Efficient structure passing",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "BSK": {
      "basis": "Sack rate 3.5% (2026), 4.9% (2025)",
      "why_not_higher": "Avoids sacks by release, not escapes",
      "why_not_lower": "Low sack totals",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "CAR": {
      "basis": "0 fumbles lost 2026; 2 in 2025 on 650+ touches",
      "why_not_higher": "Not a ball carrier",
      "why_not_lower": "Elite ball security for volume",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "JMP": {
      "basis": "No relevant evidence; neutral",
      "why_not_higher": "No evidence",
      "why_not_lower": "Neutral",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "INJ": {
      "basis": "17/17 games 2025, 8/8 2026",
      "why_not_higher": "Prior-season major injury not in our 2-season window; capped below 90",
      "why_not_lower": "Two seasons fully available",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "STA": {
      "basis": "Every game and 545 offensive snaps in 2026 (2nd-most of the 17) after 17/17 games and 600 attempts in 2025",
      "why_not_higher": "Not 95: two-season window",
      "why_not_lower": "Elite workload durability",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    },
    "TGH": {
      "basis": "Plays every snap through contact; 32 hits absorbed on 305 att 2026",
      "why_not_higher": "Accuracy drops when hit",
      "why_not_lower": "Never misses time in window",
      "sources": [
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "https://www.pff.com/grades/nfl/qb/2026",
        "https://www.pff.com/grades/nfl/qb/2025"
      ]
    }
  },
  "high_trait_evidence": {
    "STA": {
      "tier": "ELITE",
      "claim": "Every game and 545 offensive snaps in 2026 (2nd-most of the 17) after 17/17 games and 600 attempts in 2025",
      "source_urls": [
        "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv"
      ]
    }
  },
  "proposed_ovr": 84,
  "proposed_ovr_basis": "Output of the attribute build: stable top-5 PFF grade, high-volume durable distributor with elite ball security and sack avoidance; held below Burrow (90) and Jackson (87) by average accuracy over expectation (CPOE +0.2), weak intermediate (MAC 79) and deep (DAC 80) accuracy, and EPA/play #9 of 17. | Tiebreak adjustment 85->84: TIEBREAK_07 (approved t34s264): Goff beat Prescott on EPA/dropback, EPA/play, 2026 form, TWP.",
  "input_dossier": "QB_REAUDIT_BG_03_A1",
  "weaknesses": [
    "Intermediate accuracy (53.6%)",
    "CPOE +0.2 / EPA rank 9 of 17",
    "Accuracy collapses when hit"
  ],
  "madden_reference": [
    {
      "player": "Dak Prescott",
      "ovr": 91,
      "reference_only": true,
      "used_as_evidence": false,
      "file": "references/madden/QB_madden27_reference.json"
    }
  ],
  "major_flags": [
    "GRADE_VS_EFFICIENCY_SPLIT: PFF #3 vs EPA/play #9",
    "ELITE_TRAIT_PROPOSED: STA 90",
    "VARIANCE_ADJUSTMENT:QB_REAUDIT_VARIANCE_AUDIT:RUN",
    "TIEBREAK_ADJUSTMENT_PROPOSED: OVR 85->84 (authorized by t35s273)"
  ],
  "locked_control_conflict": false,
  "style_profile": "Durable high-volume rhythm distributor: wins with timing, quick release and ball security from the pocket (3.5% sack rate, 0 fumbles), short-area heavy (aDOT 7.8, 8.2% deep); limited intermediate/deep accuracy and little legs value \u2014 distinct from Burrow's precision and Jackson's improvisation.",
  "style_evidence": [
    "Depth splits 2026: short 72.1% / intermediate 53.6% / deep 40.0% (nflverse pbp)",
    "aDOT 7.8, deep share 8.2% (2026); 600 att, 17/17 games (2025)",
    "Sack rate 3.5% (2026); 0 fumbles lost 2026",
    "When hit: 43.8% cmp EPA -.45 vs 67.0% clean (2026)",
    "Scrambles 17-93 (2026); designed runs 7-10 (2026), 27-1 (2025)"
  ]
}
```
