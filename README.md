# Gridiron Standard 27 Audit Engine

Architecture: v1.0.0

This repository implements the frozen Gridiron Standard architecture.

## Current bootstrap state

Locked existing positions:
- QB
- RB
- WR
- TE
- LT

Current workflow:
- LG
- Pair Audit 3
- Steve Avila vs Tyler Smith

Remaining sequence:
LG -> C -> RG -> RT -> REDGE -> LEDGE -> DT -> MIKE -> WILL -> SAM -> CB -> FS -> SS -> K -> P

## Commands

```bash
npm install
npm run status
npm run continue
npm run dev -- "audit Jalen Carter"
npm run dev -- "ratings Jalen Carter"
npm run dev -- "recheck Jalen Carter"
npm run dev -- "re-audit LT top 10"
```

## Important

The current scaffold does not yet execute web research or Codex calls. Those adapters are the next implementation layer.

Locked Top 10 files must never be mutated by normal player workflows.


## Execution Layer

The repository now includes:
- `src/codex-research.ts` — evidence collection only; no ratings judgment
- `src/codex-adapter.ts` — Codex analyst
- `src/audit-validator.ts` — independent validation
- `src/executor.ts` — research -> analyze -> revise -> validate -> persist
- `src/continuous.ts` — multi-step runner

Current safety behavior:
- If fresh web research is unavailable, the task is saved as `INSUFFICIENT_EVIDENCE`.
- Validation may return an audit for up to 3 automatic revisions.
- Major flags do not auto-approve.
- Approved steps checkpoint project state.
- Locked Top 10 mutation remains prohibited outside explicit Top 10 re-audit.

The named-player resolver and current NFL roster identity database remain to be wired.


## Player Identity & Resolver Layer

The repository now includes:
- one canonical internal player ID per player
- aliases
- current team and exact Madden position bucket
- historical position tracking
- player-name disambiguation
- team/position lookup
- roster-source interface for future authoritative roster refresh
- merge logic that preserves prior player audit history across trades and position changes

Examples:

```bash
npm run dev -- "audit Jalen Hurts"
npm run dev -- "ratings Jordan Mailata"
npm run dev -- "audit team PHI WR"
```

If a player is not in the local registry, the resolver returns `NEEDS_ROSTER_REFRESH`
instead of guessing an identity.


## Live NFL Roster Source

The primary live roster adapter is nflverse's season roster release.

Source pattern:

`https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_<SEASON>.csv`

Refresh:

```bash
npm run roster:refresh -- 2026
```

The adapter imports stable player IDs, team, NFL position, depth-chart position,
status, jersey number, birth date, height, weight, college, and experience when available.

### Exact Madden Position Safety

The source is not allowed to guess exact Gridiron Standard buckets.

Safe direct mappings include QB/RB/WR/TE/LT/LG/C/RG/RT/DT/CB/FS/SS/K/P.

Generic labels such as LB, OLB, DE, OL, T, G, S, or DB are placed into an
`unresolved-positions.json` queue when they cannot safely establish:
- REDGE vs LEDGE
- MIKE vs WILL vs SAM
- exact OL side/interior spot
- FS vs SS

Those players require current role/depth-chart evidence before the exact bucket
is committed.


## Named-Player Full Audit Execution

A resolved named player can now run through:

identity resolution
-> exact Madden position check
-> locked positional baseline load
-> nearest-control package
-> fresh research stage
-> Codex analyst
-> independent validation
-> up to 3 automatic revisions
-> immutable audit save
-> HIGH-confidence auto-approval when no major flag
-> current-card pointer update

Example:

```bash
npm run dev -- "audit Jalen Hurts"
```

A player audit cannot mutate the locked Top 10. If the player is close enough to
challenge the baseline, the audit must produce a challenger flag and route the
case to the re-audit queue.

Ratings-only:

```bash
npm run dev -- "ratings Jalen Hurts"
```

Ratings-only reads the latest APPROVED current card. If none exists, it returns
`FULL_AUDIT_REQUIRED` and does not generate ratings on the fly.


## Quick Recheck

Quick Recheck is now executable.

```bash
npm run dev -- "recheck Jalen Hurts"
```

Rules:
- requires an existing APPROVED current card;
- maximum OVR movement is 1 point;
- may not add or remove any 95+ trait;
- may not alter a locked Top 10 baseline;
- may not approve a Top 10 challenger;
- material attribute redistribution escalates to Full Audit;
- any failed scope/validation check returns `FULL_AUDIT_REQUIRED` and queues the player.

HIGH-confidence, in-scope Quick Rechecks can auto-approve when no major flag exists.


## Bulk Team Audits

Bulk team audits are now executable.

Examples:

```bash
npm run dev -- "audit team PHI WR"
npm run dev -- "audit team PHI"
```

Behavior:
- players are processed sequentially;
- each player still receives an independent Full Audit against the locked positional baseline;
- one player's major flag does not stop the rest of the batch;
- unresolved positions are collected rather than guessed;
- all flagged, failed, unresolved, and insufficient-evidence cases are summarized in one review report.

### Team-Room Lock

After every player in a team/position room has an approved current card:

```bash
npm run dev -- "lock team PHI WR"
```

creates a versioned immutable team-room snapshot.

Team-room snapshots do not modify player cards. A future team-room re-audit may only
identify players that need separate Full Audits.


## Export System

Two export modes are available.

### Madden Entry

Contains only approved current cards by default and is optimized for manual roster editing.

```bash
npm run dev -- "export player Jalen Hurts madden"
npm run dev -- "export position LT madden"
npm run dev -- "export team PHI WR madden"
npm run dev -- "export full roster madden"
```

### Rich Audit

Includes player ID, audit ID, status, confidence, methodology version,
audit date, identity/archetype, flags, OVR, and ratings.

```bash
npm run dev -- "export player Jalen Hurts rich"
npm run dev -- "export position LT rich"
npm run dev -- "export team PHI rich"
npm run dev -- "export full roster rich"
```

Each export creates both CSV and JSON files under `exports/`.

Only APPROVED current cards are exported by default. Drafts, flagged audits, and
insufficient-evidence records are excluded unless a future explicit override is added.

### Madden Attribute Order

`config/madden-entry-order.json` contains per-position entry order.
The current values are marked `verified: false` until the exact Madden 27 edit-player
interface order is empirically verified. The system therefore preserves ratings safely
without falsely claiming the current placeholder order is authoritative.


## Input Card Standard

The system now has an explicit output policy.

Default behavior:
- audits and ratings stay as text or JSON

Explicit request behavior:
- `card Jalen Hurts`
- `input card Jalen Hurts`
- `madden card Jalen Hurts`

Those commands return a structured input-card spec using:
- player name
- exact Madden position
- NFL team name
- team branding
- OVR
- ratings in Madden editor order
- no player photo
- no methodology text

The card-spec JSON is saved under `exports/cards/`.

## Deployment Layer

A lightweight server is now included.

```bash
npm run server
```

Endpoints:
- `GET /health`
- `GET /status`
- `GET /player/ratings?name=Jalen%20Hurts`
- `GET /player/card?name=Jalen%20Hurts`

A Dockerfile is also included for container deployment.


## Deployment Hardening

Added:
- `npm run typecheck`
- `npm run test`
- `npm run preflight`
- CI workflow under `.github/workflows/ci.yml`
- durable-volume Docker Compose config
- deployment readiness checklist
- health reporting
- state-integrity helper

Before production graphic-card deployment, the Madden 27 editor order must be verified.
The service can still operate for text/JSON audits and approved-card storage while that
verification remains pending.

### Offline / add-only roster refresh (free, no network at refresh time)

```bash
npm run nflverse:fetch -- roster 2026            # caches research-inbox/_cache/roster_2026.csv (gitignored)
npm run roster:refresh -- 2026 --from-file research-inbox/_cache/roster_2026.csv --add-only --dry-run --positions C,RG
```

`--add-only` never modifies existing registry entries (no team/position/ID rewrites), so it is safe while
positions are locked. `--dry-run` writes nothing. Commit registry changes only when they purely add players.

## Process

Locked operating process (add-only): [docs/process/gridiron-standard-process.md](docs/process/gridiron-standard-process.md)
