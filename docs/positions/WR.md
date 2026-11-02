# WR — rating inputs (Methodology v1.1 — ACTIVE)

> **Status: ACTIVE — approved 2026-11-01 by the commissioner (AGENTS.md A3).** Inputs add guidance; the v1.0 evidence gate is not relaxed.
> Current bucket status: **LOCKED** — locked baseline is NOT modified by this document.



## Evidence inputs
| Type | Inputs |
|---|---|
| PFF (cited evidence: URL + retrieved_at; never sole basis) | overall, receiving, drop rate, contested catch rate, yards per route run, grade vs man/zone |
| Position stats | targets, receptions, yards, TD; catch %; YAC |
| Usage / snaps | games, starts, offensive/defensive/special-teams snaps and snap share (nflverse snap_counts); route participation; slot/wide alignment %; aDOT; target share; air-yard share |
| On-field impact | EPA/target; separation (NGS avg separation); YAC over expected |
| Context (all buckets) | injury/availability, age/career trajectory, team/scheme context, multi-year trend |

## Madden attributes these inputs inform
SPD, ACC, AGI, COD, CTH, CIT, SPC, SRR, MRR, DRR, RLS, JMP, RBK, AWR

No OVR formula or attribute weighting is defined or encoded here (AGENTS.md: OVR is an output of the attribute build). See docs/madden-ratings-reference.md (reference only).

## Process (unchanged v1.0 workflow)
architecture → provisional_top_10 → pair_audits → membership_reopen → scarcity_audit → individual_hard_audits → positional_cross_audit → lock.
90+/95+/97+/99 traits require tiered cited evidence (`high_trait_evidence`). EA ratings are controls only.
Research procedure: docs/grok-bot-research.md; query templates: config/grok-bot-query-templates.json.
