# REDGE — rating inputs (Methodology v1.1 — ACTIVE)

> **Status: ACTIVE — approved 2026-11-01 by the commissioner (AGENTS.md A3).** Inputs add guidance; the v1.0 evidence gate is not relaxed.
> Current bucket status: **PENDING**

Right-side edge (offense's left): only right-edge alignment snaps are primary.

## Evidence inputs
| Type | Inputs |
|---|---|
| PFF (cited evidence: URL + retrieved_at; never sole basis) | overall, pass rush, run defense, tackling, pass-rush win rate, pressures, total pressures, sacks, hits, hurries |
| Position stats | tackles, TFL, sacks, QB hits; forced fumbles; batted passes |
| Usage / snaps | games, starts, offensive/defensive/special-teams snaps and snap share (nflverse snap_counts); snaps by alignment (edge side / interior technique); pass-rush snaps vs run snaps |
| On-field impact | pass-rush win rate (ESPN); run-stop win rate (ESPN); pressure rate; run-stop % |
| Context (all buckets) | injury/availability, age/career trajectory, team/scheme context, multi-year trend |

## Madden attributes these inputs inform
PMV, FMV, BSH, PUR, PRC, TAK, POW, STR, SPD, ACC, AWR

No OVR formula or attribute weighting is defined or encoded here (AGENTS.md: OVR is an output of the attribute build). See docs/madden-ratings-reference.md (reference only).

## Process (unchanged v1.0 workflow)
architecture → provisional_top_10 → pair_audits → membership_reopen → scarcity_audit → individual_hard_audits → positional_cross_audit → lock.
90+/95+/97+/99 traits require tiered cited evidence (`high_trait_evidence`). EA ratings are controls only.
Research procedure: docs/grok-bot-research.md; query templates: config/grok-bot-query-templates.json.
