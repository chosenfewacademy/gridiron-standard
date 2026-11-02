# TE — rating inputs (PROPOSED Methodology v1.1 extension)

> **Status: PROPOSED — pending commissioner approval. Not in effect.** Methodology v1.0 and the evidence gate are unchanged.
> Current bucket status: **LOCKED** — locked baseline is NOT modified by this document.



## Evidence inputs
| Type | Inputs |
|---|---|
| PFF (cited evidence: URL + retrieved_at; never sole basis) | overall, receiving, run blocking, pass blocking, yards per route run |
| Position stats | targets, receptions, yards, TD; YAC |
| Usage / snaps | games, starts, offensive/defensive/special-teams snaps and snap share (nflverse snap_counts); inline/slot/wide alignment %; route participation; run-block snaps; pass-block snaps |
| On-field impact | EPA/target; run-block win rate (ESPN) |
| Context (all buckets) | injury/availability, age/career trajectory, team/scheme context, multi-year trend |

## Madden attributes these inputs inform
CTH, CIT, SPC, SRR, MRR, RBK, RBP, RBF, PBK, LBK, IBL, STR, SPD, AWR

No OVR formula or attribute weighting is defined or encoded here (AGENTS.md: OVR is an output of the attribute build). See docs/madden-ratings-reference.md (reference only).

## Process (unchanged v1.0 workflow)
architecture → provisional_top_10 → pair_audits → membership_reopen → scarcity_audit → individual_hard_audits → positional_cross_audit → lock.
90+/95+/97+/99 traits require tiered cited evidence (`high_trait_evidence`). EA ratings are controls only.
Research procedure: docs/grok-bot-research.md; query templates: config/grok-bot-query-templates.json.
