# LS — rating inputs (Methodology v1.1 addendum — PROPOSED)

> **Status: ADDENDUM PROPOSED — not enacted.** LS is a supplemental bucket described in docs/amendments/v1.1-addendum-fb-ls.md.
> It is NOT part of the v1.0 20-position sequence (config/position-sequence.json) or state/project-state.json until the commissioner enacts the addendum.
> Inputs add guidance; the v1.0 evidence gate is not relaxed.

## Evidence inputs
| Type | Inputs |
|---|---|
| PFF (cited evidence: URL + retrieved_at; never sole basis) | PFF long snapper grade (weekly special teams reports) |
| Position stats | punt/FG/XP snaps; bad or inaccurate snaps; coverage tackles |
| Usage / snaps | games, starts, offensive/defensive/special-teams snaps and snap share (nflverse snap_counts); special-teams snaps (nflverse st_snaps); games, seasons as starter |
| On-field impact | unit points on snaps delivered (FG/XP/punt; credits whole unit); blocked kicks/punts on his snaps |
| Context (all buckets) | injury/availability, age/career trajectory, team/scheme context, multi-year trend |

PFF publishes no public season-grade table for LS; PFF inputs come from player pages or weekly reports and must be cited individually.

## Madden attributes these inputs inform
AWR, STR, RBK, PBK, SPD, TAK

No OVR formula or attribute weighting is defined or encoded here (AGENTS.md: OVR is an output of the attribute build). See docs/madden-ratings-reference.md (reference only).

## Process (unchanged v1.0 workflow, once enacted)
architecture → provisional_top_10 → pair_audits → membership_reopen → scarcity_audit → individual_hard_audits → positional_cross_audit → lock.
90+/95+/97+/99 traits require tiered cited evidence (`high_trait_evidence`). EA ratings are controls only.
Candidate pool: data/candidate-pools/LS.proposed.json (approved copy: data/candidate-pools/LS.json).
