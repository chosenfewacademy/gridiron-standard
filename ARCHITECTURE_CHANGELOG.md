# Architecture Changelog

## 1.0.0

Frozen initial architecture.

### Execution layer added
- Codex SDK adapter
- separated research collection and rating judgment
- fresh-research failure handling
- validator/revision loop
- maximum 3 automatic revisions
- immutable audit persistence
- re-audit queue integration
- checkpoint on approved workflow step
- continuous runner with stop conditions

No frozen architectural rule was changed.


### Player identity layer
- canonical player registry
- unique internal IDs
- aliases and disambiguation
- team/position resolution
- historical position preservation
- generic roster refresh adapter
- team/position query support

No frozen architectural rule was changed.


### Live roster source
- nflverse season roster adapter
- daily-updatable current NFL identity feed
- stable external ID ingestion
- roster metadata ingestion
- safe exact Madden position mapping
- unresolved-role queue for ambiguous defensive and generic position labels
- no automatic REDGE/LEDGE/MIKE/WILL/SAM guessing

No frozen architectural rule was changed.


### Named-player execution
- Full Audit task builder
- locked positional baseline control loader
- named-player research and analyst execution
- nearest-control requirements
- why-not-higher / why-not-lower validation
- challenger flag routing
- approved current-card linking
- ratings-only approved-card retrieval

No frozen architectural rule was changed.


### Quick Recheck execution
- existing approved-card prerequisite
- 1-point maximum OVR movement
- 95+ trait change prohibition
- Top 10 challenger escalation
- material attribute redistribution escalation
- automatic Full Audit queueing when scope is exceeded

No frozen architectural rule was changed.


### Bulk team audits
- sequential team/position player processing
- continuation after player-level major flags
- consolidated review report
- unresolved-position collection
- team-room immutable snapshot support

No frozen architectural rule was changed.


### Export system
- player exports
- position exports
- team exports
- full-roster exports
- clean Madden-entry mode
- rich audit mode
- CSV + JSON output
- approved-current-card filtering
- per-position Madden entry-order registry

No frozen architectural rule was changed.


### Input-card and deployment layer
- explicit output-policy config
- explicit graphic-card generation rule
- no-player-photo card standard
- team-branding config
- structured input-card spec generator
- explicit `card` command support
- lightweight HTTP server
- Dockerfile and deployment guide

No frozen architectural rule was changed.


### Deployment hardening
- preflight checks
- health reporting
- state-integrity hashing helper
- automated tests
- TypeScript CI
- GitHub Actions workflow
- Docker Compose durable volumes
- production readiness checklist

No frozen architectural rule was changed.

## 1.1.1 (addendum)

- FB and LS added as exact buckets 21/22 after P (commissioner approval 2026-11-01/02).
- State gains FB/LS as PENDING only, via the add-only addendum state path.

No frozen architectural rule was changed.

## 1.1.2 (addendum)

- Audit stage order: candidate audit -> per-player background analysis -> per-player rating (EA/Madden recorded
  as reference only) -> 6 head-to-heads from the rating order -> scarcity -> cross-audit -> lock
  (commissioner approval 2026-11-02 1:56 PM ET). Applies to new positions and all TOP10_REAUDITs.
- In-progress positions finish under the earlier order; earlier records stay immutable history.

No frozen architectural rule was changed.

- 1.1.2 (2026-11-02 2:32 PM ET, commissioner): unique playing-style rule for all positions — rating stage requires `style_profile` + `style_evidence` and flags STYLE_PROFILE_TOO_SIMILAR against approved ratings at the position.

- 2026-11-02 (t30s3): add-only player_rating revisions (src/rating-revision.ts, `reaudit:revise`); executor style checks skip superseded records.

- 2026-11-02 (card t31s1): add-only tiebreak head-to-heads (`src/tiebreak.ts`, `reaudit:tiebreak`); pending review via the existing awaiting pointer; no guard changes.
- 2026-11-02 (card t31s9): evidence gate treats scarcity_audit and positional_cross_audit as position-wide (same live nfl.com calendar rules).

## 2026-11-02 — Generic pipeline, variance audit stage, re-audit lock command (t31s9/t32u/t33u)
- Engine v1.1.2 order now: candidate → BG → RATE → H2H → **variance_audit** → scarcity → cross-audit → lock. New `config/variance-metrics.json` (all 22 positions); stage output validator; always reviewed.
- New `src/reaudit-lock.ts` (`reaudit:lock`): add-only new baseline, old baseline kept in locks history. Built and tested; not run.
- Pending approvals: variance_audit gate widening; protected-paths exception for lock outputs.
- 2026-11-02 (t33s4): variance_audit gate widening + sixth narrow guard exception (lock outputs) approved and implemented; lock id now <POS>_REAUDIT_LOCK_<YYYYMMDD>.

## v1.1.2 addendum — league-wide ceiling check (card t35u)
- Added `src/league-ceiling.ts`, `config/ceiling-metrics.json` (all positions), planner fields on the cross-audit task and a cross-audit validator; any flag blocks cross-audit approval. Read-only; no rating changes. Tests in `tests/stage-tests.ts`; docs in `docs/stage-engine.md` and AGENTS.md.

## v1.1.2 addendum D — weekly in-season update (card t36u)
- Added `config/weekly-update.json`, `src/weekly-update.ts` (propose scaffold and validator, read-only for state/locks/baselines), `docs/weekly-update.md`, tests in `tests/weekly-update-tests.ts` and the npm scripts `weekly:propose` and `weekly:validate`.
