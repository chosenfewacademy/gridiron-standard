# FB — rating inputs (Methodology v1.1 addendum — PROPOSED)

> **Status: ADDENDUM PROPOSED — not enacted.** FB is a supplemental bucket described in docs/amendments/v1.1-addendum-fb-ls.md.
> It is NOT part of the v1.0 20-position sequence (config/position-sequence.json) or state/project-state.json until the commissioner enacts the addendum.
> Inputs add guidance; the v1.0 evidence gate is not relaxed.

## Evidence inputs
| Type | Inputs |
|---|---|
| PFF (cited evidence: URL + retrieved_at; never sole basis) | overall offense grade (player page), run blocking, pass blocking, receiving |
| Position stats | carries, yards, TD; targets, receptions, yards; short-yardage/goal-line touches |
| Usage / snaps | games, starts, offensive/defensive/special-teams snaps and snap share (nflverse snap_counts); offensive snaps and snap share at FB alignment; 21/22-personnel share; lead-block snaps |
| On-field impact | team rush EPA/success rate with FB on field; short-yardage conversion rate |
| Context (all buckets) | injury/availability, age/career trajectory, team/scheme context, multi-year trend |

PFF publishes no public season-grade table for FB; PFF inputs come from player pages or weekly reports and must be cited individually.

## Madden attributes these inputs inform
RBK, PBK, IBL, LBK, STR, IMP, TRK, CAR, CTH, SPD, AWR

No OVR formula or attribute weighting is defined or encoded here (AGENTS.md: OVR is an output of the attribute build). See docs/madden-ratings-reference.md (reference only).

## Process (unchanged v1.0 workflow, once enacted)
architecture → provisional_top_10 → pair_audits → membership_reopen → scarcity_audit → individual_hard_audits → positional_cross_audit → lock.
90+/95+/97+/99 traits require tiered cited evidence (`high_trait_evidence`). EA ratings are controls only.
Candidate pool: data/candidate-pools/FB.proposed.json (approved copy: data/candidate-pools/FB.json).
