# CB_REAUDIT_BG_12 — DJ Turner II background dossier (v1.1.2 stage 2)

Run under commissioner approval t46u.

```json
{
  "audit_id": "CB_REAUDIT_BG_12_A1",
  "task_id": "CB_REAUDIT_BG_12",
  "task_type": "background_analysis",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "CB",
  "player_id": "ext_00-0038549",
  "players": [
    "DJ Turner II"
  ],
  "methodology_version": "1.1.0",
  "confidence": "HIGH",
  "dossier": {
    "player": "DJ Turner II",
    "player_id": "ext_00-0038549",
    "team": "CIN",
    "role_assignment": "CB (single list)",
    "side_rule": "CB BUCKET (t46u): one cornerback list, no outside/slot or left/right split. CB-eligible = graded by PFF as CB (pff.com/grades/nfl/cb) in the current 2026 season (2025 if no 2026 snaps); outside and slot corners compete in the same list; a player PFF grades at S in 2026 (e.g. Cooper DeJean) belongs to the safety list. Players are matched by gsis/PFR id, not name. Each player appears in one list only.",
    "pff": {
      "2025": {
        "team": "cincinnati-bengals",
        "ovr": 73.3,
        "snaps": 974,
        "rank": 22,
        "rdef": 394,
        "cov": 580
      },
      "2026": {
        "team": "cincinnati-bengals",
        "ovr": 74.3,
        "snaps": 444,
        "rank": 15,
        "rdef": 158,
        "cov": 286
      }
    },
    "pfr": {
      "2025": {
        "tm": "CIN",
        "pos": "CB",
        "g": "17",
        "tgt": "73",
        "cmp": "35",
        "yds": "468",
        "td": "4",
        "rat": "75.6",
        "int": "2",
        "comb": "40",
        "m_tkl": "6"
      },
      "2026": {
        "def_targets": 24.0,
        "def_completions_allowed": 13.0,
        "def_yards_allowed": 143.0,
        "def_ints": 0.0,
        "def_receiving_td_allowed": 1.0,
        "def_tackles_combined": 14.0,
        "def_missed_tackles": 2.0,
        "g": 6
      }
    },
    "snaps": {
      "2025": {
        "games": 17,
        "defs": 974
      },
      "2026": {
        "games": 7,
        "defs": 444
      }
    },
    "stats": {
      "2025": {
        "def_tackles_solo": 27.0,
        "def_tackle_assists": 12.0,
        "def_tackles_for_loss": 2.0,
        "def_fumbles_forced": 2.0,
        "def_sacks": 0.0,
        "def_qb_hits": 0.0,
        "def_pass_defended": 18.0,
        "def_interceptions": 2.0
      },
      "2026": {
        "def_tackles_solo": 12.0,
        "def_tackle_assists": 5.0,
        "def_tackles_for_loss": 0.0,
        "def_fumbles_forced": 2.0,
        "def_sacks": 0.0,
        "def_qb_hits": 0.0,
        "def_pass_defended": 5.0,
        "def_interceptions": 0.0
      }
    },
    "penalties": {
      "2025": 2,
      "2026": 2
    },
    "injuries": {
      "2025": [
        "wk3 Questionable (Hamstring)",
        "wk16 Questionable (Illness)"
      ]
    },
    "summary_lines": [
      "DJ Turner II (CIN) DJ Turner II 2026: PFF CB 2026 overall 74.3 on 444 snaps (CB rank 15; 286 coverage / 158 run-def snaps); PFR 2026 (6 games) coverage 24 targets / 13 completions / 143 yds / 1 TD / 0 INT; 14 tackles, 2 missed; 7 g / 444 def snaps; 12 solo + 5 ast tackles, 0 TFL, 0 INT, 5 PD, 2 FF; 2 accepted penalties",
      "DJ Turner II 2025: PFF CB 2025 overall 73.3 on 974 snaps (CB rank 22; 580 coverage / 394 run-def snaps); PFR 2025 coverage 73 targets / 35 completions / 468 yds / 4 TD / passer rating 75.6 / 2 INT; 40 tackles, 6 missed; 17 g / 974 def snaps; 27 solo + 12 ast tackles, 2 TFL, 2 INT, 18 PD, 2 FF; 2 accepted penalties",
      "DJ Turner II role: single CB list (no outside/slot split); roster position DB (CB BUCKET (t46u): one cornerback list, no outside/slot or left/right split. CB-eligible = graded by PFF as CB (pff.com/g...); roster position DB; Madden card CB (reference only)",
      "DJ Turner II injury reports: wk3 Questionable (Hamstring); wk16 Questionable (Illness); roster status ACT"
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
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://www.pff.com/grades/nfl/cb/2025",
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_season_def.csv",
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pfr_advstats/advstats_week_def_2026.csv",
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2025.csv",
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2026.csv",
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.csv",
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2026.csv",
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_2025.csv",
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2026.csv.gz",
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv.gz",
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2026.csv",
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2025.csv",
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv",
        "retrieved_at": "2026-11-04T12:05:21Z"
      },
      {
        "url": "https://github.com/nflverse/nflverse-data/releases/download/depth_charts/depth_charts_2026.csv",
        "retrieved_at": "2026-11-04T12:05:21Z"
      }
    ],
    "not_evidence": "No EA/Madden rating used; no rating proposed at this stage."
  },
  "major_flags": [],
  "locked_control_conflict": false
}
```
