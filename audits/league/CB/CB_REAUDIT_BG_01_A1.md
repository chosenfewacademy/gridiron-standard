# CB_REAUDIT_BG_01 — Devon Witherspoon background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "CB_REAUDIT_BG_01_A1",
  "task_id": "CB_REAUDIT_BG_01",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "CB",
  "player_id": "ext_00-0039169",
  "players": [
    "Devon Witherspoon"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "Devon Witherspoon",
    "player_id": "ext_00-0039169",
    "team": "SEA",
    "role_assignment": "CB (single list)",
    "side_rule": "CB BUCKET (t46u): one cornerback list, no outside/slot or left/right split. CB-eligible = graded by PFF as CB (pff.com/grades/nfl/cb) in the current 2026 season (2025 if no 2026 snaps); outside and slot corners compete in the same list; a player PFF grades at S in 2026 (e.g. Cooper DeJean) belongs to the safety list. Players are matched by gsis/PFR id, not name. Each player appears in one list only.",
    "pff": {
      "2025": {
        "team": "seattle-seahawks",
        "ovr": 90.1,
        "snaps": 902,
        "rank": 1,
        "rdef": 305,
        "cov": 569
      },
      "2026": {
        "team": "seattle-seahawks",
        "ovr": 75.5,
        "snaps": 500,
        "rank": 13,
        "rdef": 196,
        "cov": 287
      }
    },
    "pfr": {
      "2025": {
        "tm": "SEA",
        "pos": "CB",
        "g": "12",
        "tgt": "59",
        "cmp": "41",
        "yds": "375",
        "td": "2",
        "rat": "90.7",
        "int": "1",
        "comb": "72",
        "m_tkl": "3"
      },
      "2026": {
        "def_targets": 41.0,
        "def_completions_allowed": 26.0,
        "def_yards_allowed": 175.0,
        "def_ints": 0.0,
        "def_receiving_td_allowed": 0.0,
        "def_tackles_combined": 41.0,
        "def_missed_tackles": 2.0,
        "g": 7
      }
    },
    "snaps": {
      "2025": {
        "games": 12,
        "defs": 721
      },
      "2026": {
        "games": 8,
        "defs": 499
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 48.0,
        "def_tackle_assists": 24.0,
        "def_tackles_for_loss": 2.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.5,
        "def_qb_hits": 4.0,
        "def_pass_defended": 7.0,
        "def_interceptions": 1.0
      },
      "2026": {
        "def_tackles_solo": 24.0,
        "def_tackle_assists": 17.0,
        "def_tackles_for_loss": 3.0,
        "def_fumbles_forced": 0.0,
        "def_sacks": 0.0,
        "def_qb_hits": 1.0,
        "def_pass_defended": 3.0,
        "def_interceptions": 0.0
      }
    },
    "penalties": {
      "2025": 2,
      "2026": 2
    },
    "injuries": {
      "2025": [
        "wk2 Doubtful (Knee)",
        "wk3 Doubtful (Knee)",
        "wk5 Out (Knee)",
        "wk6 Doubtful (Knee)",
        "wk7 Questionable (Knee)"
      ]
    },
    "summary_lines": [
      "Devon Witherspoon (SEA) Devon Witherspoon 2026: PFF CB 2026 overall 75.5 on 500 snaps (CB rank 13; 287 coverage / 196 run-def snaps); PFR 2026 (7 games) coverage 41 targets / 26 completions / 175 yds / 0 TD / 0 INT; 41 tackles, 2 missed; 8 g / 499 def snaps; 24 solo + 17 ast tackles, 3 TFL, 0 INT, 3 PD, 0 FF; 2 accepted penalties",
      "Devon Witherspoon 2025: PFF CB 2025 overall 90.1 on 902 snaps (CB rank 1; 569 coverage / 305 run-def snaps); PFR 2025 coverage 59 targets / 41 completions / 375 yds / 2 TD / passer rating 90.7 / 1 INT; 72 tackles, 3 missed; 12 g / 721 def snaps; 48 solo + 24 ast tackles, 2 TFL, 1 INT, 7 PD, 0 FF; 2 accepted penalties",
      "Devon Witherspoon role: single CB list (no outside/slot split); roster position DB (CB BUCKET (t46u): one cornerback list, no outside/slot or left/right split. CB-eligible = graded by PFF as CB (pff.com/g...); roster position DB; Madden card CB (reference only)",
      "Devon Witherspoon injury reports: wk5 Out (Knee); wk6 Doubtful (Knee); wk7 Questionable (Knee); roster status ACT"
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
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/cb/2025",
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:05:08Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:05:08Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
