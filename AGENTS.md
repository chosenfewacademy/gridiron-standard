# Gridiron Standard 27

Architecture Version: 1.0.0
Methodology Version: 1.0.0

## Governing Principle

Codex is the analyst. The application is the commissioner.

The application controls:
- workflow order
- lock state
- permissions
- state transitions
- validation
- approvals
- persistence

Codex may analyze evidence and propose ratings. It may not bypass locks or change workflow state directly.

## Core Rating Rules

1. Current-season evidence is primary.
2. Previous seasons provide context for sustainability, injury, development, breakout, and decline.
3. EA ratings are controls only, never authoritative truth.
4. OVR is an output of the attribute build, not a target used to inflate unrelated traits.
5. 99 is reserved for historic/generational exact traits.
6. 97+ requires extraordinary league-defining evidence.
7. 95+ requires rare league-defining exact-trait evidence.
8. 90+ requires demonstrably elite exact-trait evidence.
9. Elite players must retain meaningful weaknesses when supported by evidence.
10. Archetypes describe completed cards. They do not dictate ratings.
11. Madden engine problems are handled through gameplay testing/sliders, not artificial rating distortion.
12. Current ability is separate from future projection.

## Locked Top 10 Rule

A locked positional Top 10 baseline is immutable.

It may be reopened only when the user explicitly orders a current-data Top 10 re-audit for that exact Madden position bucket.

Normal player audits, ratings-only requests, team-room audits, quick rechecks, bulk audits, or workflow continuation may not alter a locked Top 10.

## Individual Player Audit Rule

Every Full Audit must:
- use the locked positional Top 10 as the primary calibration baseline;
- use nearest external controls around the player's expected tier;
- evaluate each major gameplay/OVR-driving attribute independently;
- include why-not-higher and why-not-lower analysis;
- include player identity;
- identify nearest controls;
- document all 90+/95+/97+/99 traits with explicit evidence support.

If a player appears capable of challenging Top 10 membership, issue a CHALLENGER_FLAG. Do not modify the locked Top 10.

## Positional Top 10 Workflow

architecture
-> provisional_top_10
-> pair_audits
-> membership_reopen
-> scarcity_audit
-> individual_hard_audits
-> positional_cross_audit
-> lock

Every stage must complete before the baseline can be locked.

## Team-Room Rule

Team-room audits:
- occur after individual player audits;
- may flag inconsistencies;
- may not directly alter approved individual cards;
- may not alter locked league baselines;
- may identify players requiring separate Full Audits.

## Approval Rules

Default mode: REVIEW_MAJOR

HIGH-confidence validated audits auto-approve unless a major flag is triggered.

Major flags include:
- Top 10 challenger status
- OVR change >= 2
- new or removed 95+ trait
- any 97+ or 99 trait change
- major position change
- conflict with locked positional control

MEDIUM confidence requires review flag.
LOW confidence may not become current without explicit approval.

Quick Recheck:
- max 1 OVR change;
- cannot add/remove 95+ traits;
- larger changes escalate to Full Audit.

## Audit Immutability

Every completed audit is a separate immutable record.
Only APPROVED audits may become the player's current card.
Historical audits are never overwritten.

## Validation

The validator may reject and automatically return an audit for revision.
Maximum automatic revision attempts: 3.
After 3 failed attempts, preserve all attempts and queue RE-AUDIT REQUIRED.

## Exact Position Buckets

QB, RB, WR, TE, LT, LG, C, RG, RT,
REDGE, LEDGE, DT, MIKE, WILL, SAM, CB, FS, SS, K, P

Do not merge these buckets automatically.
