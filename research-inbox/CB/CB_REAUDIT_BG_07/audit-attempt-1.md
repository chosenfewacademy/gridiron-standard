# CB_REAUDIT_BG_07 — Quinyon Mitchell background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "CB_REAUDIT_BG_07_A1",
  "task_id": "CB_REAUDIT_BG_07",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "CB",
  "player_id": "ext_00-0039888",
  "players": [
    "Quinyon Mitchell"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Quinyon Mitchell",
    "player_id": "ext_00-0039888",
    "team": "PHI",
    "role_assignment": "CB (single list)",
    "side_rule": "CB BUCKET (t46u): one cornerback list, no outside/slot or left/right split. CB-eligible = graded by PFF as CB (pff.com/grades/nfl/cb) in the current 2026 season (2025 if no 2026 snaps); outside and slot corners compete in the same list; a player PFF grades at S in 2026 (e.g. Cooper DeJean) belongs to the safety list. Players are matched by gsis/PFR id, not name. Each player appears in one list only.",
    "pff": {
      "2025": {
        "team": "philadelphia-eagles",
        "ovr": 80.3,
        "snaps": 1045,
        "rank": 6,
        "rdef": 398,
        "cov": 647
      },
      "2026": {
        "team": "philadelphia-eagles",
        "ovr": 67.9,
        "snaps": 506,
        "rank": 28,
        "rdef": 226,
        "cov": 279
      }
    },
    "pfr": {
      "2025": {
        "tm": "PHI",
        "pos": "CB",
        "g": "16",
        "tgt": "88",
        "cmp": "39",
        "yds": "453",
        "td": "1",
        "rat": "64.3",
        "int": "0",
        "comb": "45",
        "m_tkl": "3"
      },
      "2026": {
        "def_targets": 44.0,
        "def_completions_allowed": 24.0,
        "def_yards_allowed": 249.0,
        "def_ints": 1.0,
        "def_receiving_td_allowed": 1.0,
        "def_tackles_combined": 35.0,
        "def_missed_tackles": 1.0,
        "g": 7
      }
    },
    "snaps": {
      "2025": {
        "games": 16,
        "defs": 986
      },
      "2026": {
        "games": 8,
        "defs": 506
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 35.0,
        "def_tackle_assists": 10.0,
        "def_tackles_for_loss": 0.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.0,
        "def_qb_hits": 0.0,
        "def_pass_defended": 17.0,
        "def_interceptions": 0.0
      },
      "2026": {
        "def_tackles_solo": 30.0,
        "def_tackle_assists": 8.0,
        "def_tackles_for_loss": 2.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.0,
        "def_qb_hits": 0.0,
        "def_pass_defended": 8.0,
        "def_interceptions": 1.0
      }
    },
    "penalties": {
      "2025": 6,
      "2026": 1
    },
    "injuries": {},
    "summary_lines": [
      "Quinyon Mitchell (PHI) Quinyon Mitchell 2026: PFF CB 2026 overall 67.9 on 506 snaps (CB rank 28; 279 coverage / 226 run-def snaps); PFR 2026 (7 games) coverage 44 targets / 24 completions / 249 yds / 1 TD / 1 INT; 35 tackles, 1 missed; 8 g / 506 def snaps; 30 solo + 8 ast tackles, 2 TFL, 1 INT, 8 PD, 0 FF; 1 accepted penalties",
      "Quinyon Mitchell 2025: PFF CB 2025 overall 80.3 on 1045 snaps (CB rank 6; 647 coverage / 398 run-def snaps); PFR 2025 coverage 88 targets / 39 completions / 453 yds / 1 TD / passer rating 64.3 / 0 INT; 45 tackles, 3 missed; 16 g / 986 def snaps; 35 solo + 10 ast tackles, 0 TFL, 0 INT, 17 PD, 0 FF; 6 accepted penalties",
      "Quinyon Mitchell role: single CB list (no outside/slot split); roster position DB (CB BUCKET (t46u): one cornerback list, no outside/slot or left/right split. CB-eligible = graded by PFF as CB (pff.com/g...); roster position DB; Madden card CB (reference only)",
      "Quinyon Mitchell injury reports: no injury designation 2025-26; roster status ACT"
    ],
    "availability": {
      "roster_status": "ACT"
    },
    "limitations": [
      "PFF coverage/run-defense/tackling sub-grades and slot/outside splits are paywalled; no public tracking data for CB speed or separation; substitutes: PFF CB overall + coverage/run-def snap counts, PFR coverage allowed, INT/PD, tackles vs missed tackles, penalties, injury reports"
    ],
    "attributes_informed": [
      "SPD",
      "ACC",
      "AGI",
      "COD",
      "STR",
      "AWR",
      "PRC",
      "MCV",
      "ZCV",
      "PRS",
      "CTH",
      "JMP",
      "TAK",
      "PUR",
      "INJ",
      "STA",
      "TGH"
    ],
    "provenance": [
      {
        "url": "https://www.pff.com/grades/nfl/cb/2026",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/cb/2025",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:05:15Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:05:15Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
