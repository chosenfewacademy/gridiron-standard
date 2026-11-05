# Roster database, Phase 1

The roster database is a derived SQLite snapshot of the league: 32 clubs, the player registry, and Gridiron Standard rating cards taken from the current locked baselines. It is a read model for roster questions. It is not a second lock.

Locked Top 10 baselines (`data/baselines/*.json`), `state/locks.json`, audit history, and `data/players/registry.json` stay authoritative. `npm run roster:seed` only reads them. It never edits v1.0 architecture text, never rewrites a baseline, and never changes a lock pointer. Madden overalls and attributes copied onto a card are the reference block already stored on the rating audit (`reference_only`, not evidence, not a formula input).

The generated database is gitignored. A fresh clone rebuilds it from those sources.

## Build and query

Node 22 (the CI runtime) includes `node:sqlite`. No extra database package is required.

```bash
npm install
npm run roster:seed
npm run roster:status
npm run roster:query -- --team PHI --position WR
npm run roster:query -- --position WR --top10 --attrs
npm run roster:query -- --min-ovr 90
npm run roster:query -- --name "DeVonta Smith" --json
```

`roster:seed` deletes `data/roster/gridiron.sqlite` and rebuilds it. Override the path with `--db` or `ROSTER_DB`. Override the season with `--season` (default 2026). One seed replaces the whole snapshot for that season; it does not keep prior seasons.

Team queries default to players on the club: `active`, `IR`, and `PS`. `CUT` and unsigned players are `FA` and stay hidden unless you pass `--status FA` or `--status all`. A locked top 10 (`--position WR --top10`) lists the published order, including baseline identity rows the registry never gave a club.

`--json` prints the rows. `--attrs` adds each attribute with the Madden reference value and the delta (ours minus Madden) when the audit recorded them.

## Where rows come from

| Table | Source |
| --- | --- |
| `teams` | The 32 clubs (conference and division in `src/roster/teams.ts`). Colors come from `config/team-branding.json` when that file is present. nflverse `LA` is stored as `LAR`; `raw_team` keeps `LA`. |
| `players` | `data/players/registry.json`. Exact Madden bucket only. Unresolved positions stay null. |
| `roster_membership` | Same registry row, one season. See the status map below. |
| `position_baselines` | The baseline file selected for that bucket, plus the lock id and version. |
| `rating_cards` / `rating_attributes` | The published card for that baseline. |
| `seed_runs` / `seed_warnings` | This seed only. |

Baseline selection, per position:

1. If `state/locks.json` says the position is `LOCKED` and that `baseline_file` is on disk, use it. That is the current lock. Same-day relocks already point here, so `CB.reaudit-20261104b.json` is chosen over `CB.reaudit-20261104.json`.
2. If the pointer is missing, use the latest file in `data/baselines/`: higher `YYYYMMDD`, then a later suffix (`b` after the unsuffixed file). An undated `QB.json` loses to any reaudit file.
3. If a newer file exists and the lock does not point at it, the seed still follows the lock and records `NEWER_BASELINE_NOT_LOCKED`. A file on disk is not a lock.

Card contents:

- When the baseline has `scarcity.effective_ratings`, that map is the card list. Each entry is the superseding audit id and the locked overall.
- Otherwise the highest `_A` revision of each `<POS>_REAUDIT_RATE_nn` id in `stage_audit_ids` is loaded from `audits/league/<POS>/`. Head-to-heads and tiebreaks are not cards.
- `top_10` sets rank, the `TOP10` role, and the published overall. If that overall differs from the audit's `proposed_ovr`, the baseline number is stored and the seed warns `OVR_MISMATCH`.
- `first_out` and `external_controls` label the rest of the rated pool.
- `full_cards` inside a baseline is not read. On some locks it is an older import whose overall disagrees with `top_10`.
- Attributes, style, confidence, high-trait tier, and the Madden reference block come from the cited rating audit. Trait prose is not copied.

A card links to `players.player_id` when the audit id, the name slug, or a unique normalized name matches the registry. Some locked stars exist only as baseline identity rows with `team: null` because the registry never merged an nflverse row. Their membership is `FA`. Use `--top10` to see them. Team queries return whoever the registry assigns to that club (for example DeVonta Smith on PHI at WR).

### Membership status

| Registry `roster_status` | Membership |
| --- | --- |
| `ACT`, or blank while a club is set | `active` |
| `DEV`, `PRA`, `PS` | `PS` |
| `RES`, `INA`, `PUP`, `NFI`, `SUS`, `IR` | `IR` |
| `CUT`, `UNSIGNED_FREE_AGENT`, `FA`, or no club | `FA` |
| `RET`, `TRD`, `TRT`, `EXE`, `TRC`, anything else | `other` |

`FA` keeps the last registry club on the membership row so `--team PHI --status FA` still works.

## Schema and migrations

`roster/migrations/001_phase1.sql` is migration 1. `src/roster/db.ts` records it in `schema_migrations` and skips it once applied. Statements use `IF NOT EXISTS`, so a partially applied file can be retried. `roster:seed` normally deletes the sqlite file first, so a clone always gets a clean migration 1.

Phase 2–5 tables are created empty. Nothing writes them yet.

| Later phase | Empty tables | Not in Phase 1 |
| --- | --- | --- |
| 2. Contracts and salary cap | `contracts`, `salary_cap`, `team_cap_ledger` | Years, AAV, guarantees, cap hits, dead money |
| 3. Free agency | `free_agent_market` (the `FA` flag already exists) | Bidding, visits, offer sheets |
| 4. Draft class builders | `draft_classes`, `draft_prospects` | Class generation, pick ownership |
| 5. Trades and team building | `trades`, `trade_assets`, `team_build_profiles` | Fairness / value rater, rebuild vs contender, buy-low / sell-high |

`v_rating_card` joins a card to the registry club for ad-hoc SQL. Open the file with any SQLite client after seeding. Do not point a client at `state/` or `data/baselines/` and write.

## Tests

`tests/roster-db-tests.ts` covers baseline ranking, the lock-over-newer-file rule, status mapping, draft selection (latest rate revision, `full_cards` ignored), a fixture seed plus the CLI, and a seed of this repo. The repo seed checks that PHI WR and the WR top 10 match the locked files, that CB uses `CB.reaudit-20261104b.json`, and that locks, baselines, the registry, and `AGENTS.md` are unchanged.
