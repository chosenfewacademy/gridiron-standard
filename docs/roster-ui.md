# Roster UI

A local read-only browser for the SQLite roster. It does not edit locks, baselines, the registry, or contracts.

## Start

```bash
npm run roster:ui
```

Open http://127.0.0.1:4173. The server listens on `127.0.0.1` only.

- If `data/roster/gridiron.sqlite` is missing, the command seeds it (registry, locked ratings, and the contract files) and then serves.
- If a Phase 1 database is already there, pending migrations run. When the league-cap table is empty, the cap and contract files are loaded without rebuilding player rows.
- After you add or change a file in `data/roster/contracts/`, run `npm run roster:import` and refresh the page. Starting the UI does not reload contracts once a cap season is already stored.
- `ROSTER_UI_PORT` changes the port. `ROSTER_DB` changes the database file, same as the other roster commands.

`npm run server` is still the audit API on port 3000. The roster UI is separate so those routes stay as they are.

The UI only accepts GET. There is no button that writes the database.

## Pages

The address bar hash is the page:

| Hash | What it shows |
| --- | --- |
| `#/` | All 32 clubs. |
| `#/team/PHI` | That club's active, IR, and practice-squad players, with our OVR, the Madden reference, and the delta when a card exists. |
| `#/team/PHI/WR` | The same list filtered to one position bucket. |
| `#/top/WR` | The locked top 10 for that bucket, in lock order. |
| `#/player/<player_id>` | The card: our OVR, Madden OVR, deltas, attributes, style line, and any imported contract. |
| `#/cap/PHI` | The team cap sheet for the seeded season. A link switches between in-season and top 51. |
| `#/search/<text>` | Name search. The header box goes here. |

Players without a Gridiron card still appear on a team list, with a blank OVR. Players without an imported contract show an empty contract section. The cap sheet only adds deals that were imported, so an empty league stays empty instead of filling in guessed salaries.
