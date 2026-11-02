# QB — rating inputs (PROPOSED Methodology v1.1 extension)

> **Status: PROPOSED — pending commissioner approval. Not in effect.** Methodology v1.0 and the evidence gate are unchanged.
> Current bucket status: **LOCKED** — locked baseline is NOT modified by this document.

Existing QB evidence categories and QB evidence policy are UNCHANGED (src/evidence-gate.ts, src/qb-evidence-policy.ts).

## Evidence inputs
| Type | Inputs |
|---|---|
| PFF (cited evidence: URL + retrieved_at; never sole basis) | overall, passing, rushing, grade under pressure, grade from clean pocket, big-time throw %, turnover-worthy play % |
| Position stats | completion %, yards, TD, INT; EPA/play, CPOE; ANY/A, passer rating; sacks, sack %, pressure-to-sack %; rush attempts, yards, scrambles |
| Usage / snaps | games, starts, offensive/defensive/special-teams snaps and snap share (nflverse snap_counts); dropbacks; play-action rate; aDOT; time to throw (NGS) |
| On-field impact | EPA/dropback; success rate; 4th-quarter/2-minute performance |
| Context (all buckets) | injury/availability, age/career trajectory, team/scheme context, multi-year trend |

## Madden attributes these inputs inform
THP, SAC, MAC, DAC, TUP, TOR, PAC, BSK, AWR, CAR, SPD, ACC, AGI

No OVR formula or attribute weighting is defined or encoded here (AGENTS.md: OVR is an output of the attribute build). See docs/madden-ratings-reference.md (reference only).

## Process (unchanged v1.0 workflow)
architecture → provisional_top_10 → pair_audits → membership_reopen → scarcity_audit → individual_hard_audits → positional_cross_audit → lock.
90+/95+/97+/99 traits require tiered cited evidence (`high_trait_evidence`). EA ratings are controls only.
Research procedure: docs/grok-bot-research.md; query templates: config/grok-bot-query-templates.json.
