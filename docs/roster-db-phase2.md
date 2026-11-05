# Roster database, Phase 2 — contracts and the salary cap

Phase 2 adds deals and cap sheets on top of the Phase 1 roster database. It is still derived. Import files and the league-cap file are the contract inputs. Locked baselines, `state/locks.json`, the player registry, and v1.0 architecture text are not modified.

Dollars are integer USD. A cap hit is whatever the import file says. The sheet does not rebuild a cap number from base salary and bonus columns, because public sources sometimes disagree on workout bonuses and rounding.

The league is not given invented contracts. A fresh seed loads only the files in `data/roster/contracts/`. Checked-in deals are Jalen Hurts and the Philadelphia 2026 Over The Cap team sheet. Every other player has no contract until a file is added. The PHI sheet's accounting, including Lane Johnson's active 2026 charge, is written up in `docs/PHI_CONTRACTS_CAP_2026-11-05.md`.

## League cap

`data/roster/cap/league-cap.json` holds the 2026 cap:

- **$301,200,000** per club.
- Source: [NFL.com, 2026 salary cap announcement](https://www.nfl.com/news/nfl-announces-2026-salary-cap-set-at-301-2-million-per-team). The same page states the 2025 cap was $279.2 million.
- Default accounting rule: `in_season`.

### CBA assumptions

These are the rules the cap sheet implements. They are not a full CBA engine.

- The 2026 league year began on March 11, 2026, and the regular season began on September 9, 2026 (Spotrac's public CBA calendar). This database's default for 2026 is **in-season** accounting: every `active` and `IR` charge counts. `IR` here includes the registry's reserve, inactive, PUP, NFI, and suspended statuses.
- **Top 51** is the offseason rule (`--rule top51` or the cap page toggle). The largest cap hits count, and every player tied with the last included hit counts too, so an equal number is not dropped. Name order only breaks a display sort; it does not decide a tie.
- Practice-squad statuses (`PS`) never count against the club cap. The practice-squad pool itself is not modeled.
- A void year counts as dead money equal to its cap hit.
- A player who is `FA`, `other`, or on a different club than the contract uses the year's `dead_money` when that field is present. If it is absent, the charge is excluded and does not become a guessed dead-money number.
- A season may set `cap_active_while_roster_retired`. That year still counts as an active cap hit when membership is `other` (registry `RET` and the other codes in that bucket). The flag does not change the roster row, and it does not override `FA`, practice squad, or a contract whose player is on another club. It also does not convert the hit into dead money. Lane Johnson's 2026 year uses it: Over The Cap keeps $20,299,000 on the Eagles' active roster while he is retired for playing purposes until a post-June 1 designation.
- When this database has no roster row for the cap season, the player is treated as active. Seeded membership is the current roster season (2026), so a 2023 cap sheet is only as good as the imported year row.
- Cap space = league cap + carryover + adjustments − committed − dead money. Carryover and adjustments default to 0. Incentives, LTBE/NLTBE, and post-June-1 splits are not calculated. Put the already-resolved charge in `cap_hit` or `dead_money`.
- Team-option and player-option flags are stored and shown. Option-bonus proration is a separate column and does not set those flags.

## Import format

Put one JSON file per batch in `data/roster/contracts/`. Files whose names start with `_` are ignored.

```json
{
  "source_name": "Over The Cap",
  "source_url": "https://example.com/player",
  "source_note": "What was included and what was left out.",
  "contracts": [
    {
      "contract_id": "phi-jalen-hurts-2023",
      "player_id": "jalen_hurts",
      "team": "PHI",
      "signing_year": 2023,
      "years": 5,
      "total_value": 255000000,
      "aav": 51000000,
      "fully_guaranteed": 110000000,
      "guarantee_signing": null,
      "guarantee_roster": null,
      "guarantee_injury": null,
      "guarantee_other": null,
      "seasons": [
        {
          "season": 2026,
          "cap_hit": 31971800,
          "dead_money": null,
          "base_salary": 1215000,
          "signing_bonus_proration": 4658800,
          "option_bonus_proration": 26098000,
          "roster_bonus": null,
          "workout_bonus": null,
          "other_bonus": null,
          "team_option": false,
          "player_option": false,
          "void_year": false
        }
      ]
    }
  ],
  "adjustments": [
    { "team": "PHI", "season": 2026, "carryover": 0, "adjustments": 0, "note": "optional" }
  ]
}
```

`player_id` must already be in the roster database (seed the registry first). `player_name` works when exactly one registry row matches. Money fields are non-negative integers. `adjustments` may be negative (an integer cap charge). AAV is stored only when the file includes it. The importer does not divide total value by years.

The checked-in Hurts file uses the Over The Cap year lines for 2023–2027 whose base, signing proration, and option proration add up to the published cap hit. It records the OTC fully-guaranteed figure of $110,000,000 and says so. Spotrac's 2026 cap hit is $31,981,320 because of a workout bonus that is not in the OTC number. Void years and the 2028 line are omitted instead of reconstructed. See the file's `source_note`.

Load the directory:

```bash
npm run roster:seed
npm run roster:import
npm run roster:status
npm run roster:cap -- --team PHI
npm run roster:cap -- --team PHI --rule top51
npm run roster:contract -- --player "Jalen Hurts"
```

`roster:seed` rebuilds the roster and then imports contracts. `roster:import` replaces contracts and the league cap without touching players or ratings. Both read the files. Neither writes them.

`roster:status` adds contract counts, how many teams have a deal, the loaded league cap, and the default accounting rule.

## What the trade rater will read

The next phase, the trade rater, should use `v_contract_trade_inputs` and the player card. It is not built here. The inputs it needs are already columns:

| Input | Where |
| --- | --- |
| AAV | `contracts.aav` (null when the import did not state one) |
| Age | `players.birth_date`, completed years on September 1 of the season (`age` on `roster:contract`) |
| Our OVR | `rating_cards.ovr` for the player's position bucket |

Cap hit, dead money, and guarantees stay on the contract year for context. They are not a trade grade. A missing AAV stays missing.

## Schema

`roster/migrations/002_phase2_contracts.sql` drops the Phase 1 stub tables `contracts`, `salary_cap`, and `team_cap_ledger` and creates the real ones plus `contract_years` and `team_cap_adjustments`. The ledger is a derived snapshot of the default rule, rewritten on every import. Query the live sheet with `roster:cap` or the UI. Do not hand-edit the ledger.

## UI

`npm run roster:ui` serves a read-only browser on `127.0.0.1`. Pages and the cap view are described in `docs/roster-ui.md`.
