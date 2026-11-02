# RG — rating inputs (Methodology v1.1 — ACTIVE)

> **Status: ACTIVE — approved 2026-11-01 by the commissioner (AGENTS.md A3).** Inputs add guidance; the v1.0 evidence gate is not relaxed.
> Current bucket status: **PENDING**

Exact-side bucket: only snaps at this alignment count as primary evidence; snaps elsewhere are context.

## Evidence inputs
| Type | Inputs |
|---|---|
| PFF (cited evidence: URL + retrieved_at; never sole basis) | overall, pass blocking, run blocking, zone/gap run-block grades, pressures allowed, sacks allowed, penalties |
| Position stats | games/snaps started at the exact bucket; penalties (holding, false start) |
| Usage / snaps | games, starts, offensive/defensive/special-teams snaps and snap share (nflverse snap_counts); snaps by exact alignment (LT/LG/C/RG/RT); pass-block vs run-block snap split; true pass sets |
| On-field impact | pass-block win rate (ESPN); run-block win rate (ESPN); pressure rate allowed |
| Context (all buckets) | injury/availability, age/career trajectory, team/scheme context, multi-year trend |

## Madden attributes these inputs inform
PBK, PBP, PBF, RBK, RBP, RBF, IBL, LBK, STR, AWR, AGI, ACC

No OVR formula or attribute weighting is defined or encoded here (AGENTS.md: OVR is an output of the attribute build). See docs/madden-ratings-reference.md (reference only).

## Process (unchanged v1.0 workflow)
architecture → provisional_top_10 → pair_audits → membership_reopen → scarcity_audit → individual_hard_audits → positional_cross_audit → lock.
90+/95+/97+/99 traits require tiered cited evidence (`high_trait_evidence`). EA ratings are controls only.
Research procedure: docs/grok-bot-research.md; query templates: config/grok-bot-query-templates.json.
