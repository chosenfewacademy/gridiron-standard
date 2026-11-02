# SAM — rating inputs (Methodology v1.1 — ACTIVE)

> **Status: ACTIVE — approved 2026-11-01 by the commissioner (AGENTS.md A3).** Inputs add guidance; the v1.0 evidence gate is not relaxed.
> Current bucket status: **PENDING**

Strong-side role; edge/on-ball snaps documented separately.

## Evidence inputs
| Type | Inputs |
|---|---|
| PFF (cited evidence: URL + retrieved_at; never sole basis) | overall, run defense, coverage, pass rush, tackling, missed tackle % |
| Position stats | tackles, TFL, sacks; INT, PBU; missed tackles |
| Usage / snaps | games, starts, offensive/defensive/special-teams snaps and snap share (nflverse snap_counts); snaps by role (MIKE/WILL/SAM); coverage snaps; blitz rate; box vs slot alignment |
| On-field impact | run-stop %; yards per coverage snap allowed; passer rating allowed |
| Context (all buckets) | injury/availability, age/career trajectory, team/scheme context, multi-year trend |

## Madden attributes these inputs inform
TAK, HIT, PUR, PRC, BSH, MCV, ZCV, PMV, FMV, SPD, ACC, AWR

No OVR formula or attribute weighting is defined or encoded here (AGENTS.md: OVR is an output of the attribute build). See docs/madden-ratings-reference.md (reference only).

## Process (unchanged v1.0 workflow)
architecture → provisional_top_10 → pair_audits → membership_reopen → scarcity_audit → individual_hard_audits → positional_cross_audit → lock.
90+/95+/97+/99 traits require tiered cited evidence (`high_trait_evidence`). EA ratings are controls only.
Research procedure: docs/grok-bot-research.md; query templates: config/grok-bot-query-templates.json.
