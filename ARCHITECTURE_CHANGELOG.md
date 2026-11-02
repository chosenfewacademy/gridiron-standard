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
