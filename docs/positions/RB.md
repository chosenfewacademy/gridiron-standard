# RB — rating inputs (PROPOSED Methodology v1.1 extension)

> **Status: PROPOSED — pending commissioner approval. Not in effect.** Methodology v1.0 and the evidence gate are unchanged.
> Current bucket status: **LOCKED** — locked baseline is NOT modified by this document.



## Evidence inputs
| Type | Inputs |
|---|---|
| PFF (cited evidence: URL + retrieved_at; never sole basis) | overall, rushing, receiving, pass blocking, elusive rating, yards after contact/att, missed tackles forced |
| Position stats | carries, yards, YPC, TD; fumbles; targets, receptions, yards |
| Usage / snaps | games, starts, offensive/defensive/special-teams snaps and snap share (nflverse snap_counts); snap share; carry share; route participation; goal-line share |
| On-field impact | rush EPA; rush yards over expected (NGS RYOE); explosive run rate |
| Context (all buckets) | injury/availability, age/career trajectory, team/scheme context, multi-year trend |

## Madden attributes these inputs inform
SPD, ACC, AGI, COD, BCV, CAR, BTK, TRK, ELU, SPM, JKM, SFA, CTH, SRR, PBK, AWR

No OVR formula or attribute weighting is defined or encoded here (AGENTS.md: OVR is an output of the attribute build). See docs/madden-ratings-reference.md (reference only).

## Process (unchanged v1.0 workflow)
architecture → provisional_top_10 → pair_audits → membership_reopen → scarcity_audit → individual_hard_audits → positional_cross_audit → lock.
90+/95+/97+/99 traits require tiered cited evidence (`high_trait_evidence`). EA ratings are controls only.
Research procedure: docs/grok-bot-research.md; query templates: config/grok-bot-query-templates.json.
