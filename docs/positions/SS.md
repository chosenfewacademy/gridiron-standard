# SS — rating inputs (PROPOSED Methodology v1.1 extension)

> **Status: PROPOSED — pending commissioner approval. Not in effect.** Methodology v1.0 and the evidence gate are unchanged.
> Current bucket status: **PENDING**

Box/slot/deep split documented.

## Evidence inputs
| Type | Inputs |
|---|---|
| PFF (cited evidence: URL + retrieved_at; never sole basis) | overall, coverage, run defense, tackling, grade vs man/zone, forced incompletion rate |
| Position stats | INT, PBU; targets, receptions allowed, yards allowed, TD allowed; tackles, missed tackles |
| Usage / snaps | games, starts, offensive/defensive/special-teams snaps and snap share (nflverse snap_counts); snaps by alignment (outside/slot/box/deep); man vs zone snap share; coverage snaps |
| On-field impact | passer rating allowed; yards per coverage snap; EPA allowed per target |
| Context (all buckets) | injury/availability, age/career trajectory, team/scheme context, multi-year trend |

## Madden attributes these inputs inform
MCV, ZCV, PRS, SPD, ACC, AGI, COD, PRC, TAK, HIT, PUR, CTH, JMP, AWR

No OVR formula or attribute weighting is defined or encoded here (AGENTS.md: OVR is an output of the attribute build). See docs/madden-ratings-reference.md (reference only).

## Process (unchanged v1.0 workflow)
architecture → provisional_top_10 → pair_audits → membership_reopen → scarcity_audit → individual_hard_audits → positional_cross_audit → lock.
90+/95+/97+/99 traits require tiered cited evidence (`high_trait_evidence`). EA ratings are controls only.
Research procedure: docs/grok-bot-research.md; query templates: config/grok-bot-query-templates.json.
