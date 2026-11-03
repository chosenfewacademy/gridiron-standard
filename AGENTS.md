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

---

## Amendment v1.1 (ENACTED)

Architecture Version: 1.1.0
Methodology Version: 1.1.0
Approved: 2026-11-01 by the commissioner (project owner).
Supersedes only the items below; all v1.0.0 text above remains in force and is preserved as history.
Locked baselines, approved cards and audit records created under v1.0.0 keep their recorded version.

### A1. Analyst (amends Governing Principle wording)
Grok Bot is the analyst. The application is the commissioner.
Codex/OpenAI transports remain optional (GRIDIRON_RESEARCH_TRANSPORT=CODEX) and must never be run
for paid research without explicit authorization. Analyst limits are unchanged: Grok Bot may analyze
evidence and propose ratings; it may not bypass locks or change workflow state directly.

### A2. Fresh-research proof for GROK_BOT_FILE_TRANSPORT
Freshness is proven by declared provenance (research-inbox/<POS>/<TASK>/provenance.json):
every query with execution time, every retrieved URL with retrieval time, exact match with every
evidence source and item, all timestamps fresh, fixed attestation. Self-declared observation flags
and minimum_evidence_met are ignored. The Full Audit evidence gate is otherwise unchanged.
Every 90+/95+/97+/99 trait in a Grok Bot audit must carry tiered cited evidence (high_trait_evidence).

### A3. Methodology v1.1 per-position rating inputs
config/position-metrics.json and docs/positions/*.md define, for every exact bucket, the rating
inputs: PFF grades (overall + relevant facets) as cited evidence only, position stats, usage/snap
metrics, on-field impact metrics, and the Madden attributes they inform. They are attached to every
task as research/analysis inputs. They add guidance; they do not remove or relax any evidence
category, gate, threshold, scarcity rule or retry ceiling. EA ratings remain controls only; no
Madden OVR formula is encoded.

## Addendum v1.1.1 — FB and LS exact buckets (ENACTED)

Architecture Version: 1.1.1
Methodology Version: 1.1.0
Approved: 2026-11-01/2026-11-02 by the commissioner (user approval).
Adds fullback (FB) and long snapper (LS) as exact buckets 21 and 22, appended after P in
config/position-sequence.json. All v1.0.0 text and Amendment v1.1 above remain in force unchanged.
FB/LS use the A3 per-position inputs in config/position-metrics.json and docs/positions/FB.md, LS.md.
Details: docs/amendments/v1.1-addendum-fb-ls.md.

## Addendum v1.1.2 — Audit stage order (ENACTED)

Architecture Version: 1.1.2
Methodology Version: 1.1.0
Approved: 2026-11-02 1:56 PM ET by the commissioner (user PhiXCrypto).
Every positional audit that starts after enactment (a position with no completed tasks yet, and every
TOP10_REAUDIT, including restarts) runs in this order:

1. CANDIDATE AUDIT of the approved candidate pool: confirm membership (no top player missing), flag
   injured / free-agent / limited-sample players, and name the top-10 contention set.
2. BACKGROUND ANALYSIS per contention player: a sourced evidence dossier (PFF grades, position stats and
   usage, on-field impact, multi-year trend, availability) with declared provenance.
3. RATING per contention player on our standard: strict and data-driven; overall plus attributes; the
   high-trait tiers and evidence gate apply. The EA/Madden rating is recorded alongside as REFERENCE ONLY:
   never evidence, never an input to the formula. Our ratings are expected to be stricter, lower and more
   stratified than Madden's.
4. HEAD-TO-HEADS: 6 pairs (1v2, 3v4, 5v6, 7v8, 9v10, rank 10 vs first out) taken from the approved
   rating order, used to audit and stratify the ratings.
5. Then the existing scarcity audit, positional cross-audit and lock / baseline-replacement checkpoints.

Each stage keeps its REVIEW_MAJOR approval checkpoint, the evidence gates, the 3-revision ceiling and the
protected-path guard. Candidate audits and ratings never auto-approve. A position already in progress under
the earlier order (provisional_top_10 -> pairs -> membership -> scarcity -> hard audits -> cross-audit) finishes
under that order. Records made under the earlier order (for example the QB re-audit provisional Top 10 and
pairs 1-3) remain immutable history and may be cited as early inputs; they are never deleted.
Background dossiers are reviewed by the commissioner too (no approvals without the commissioner).

Unique playing-style rule (commissioner, 2026-11-02 2:32 PM ET; every position): each player's distinct playing
style must show clearly in his attribute profile; players are not rated alike. Every rating builds the profile
from sourced style evidence (usage, splits, role; e.g. a QB's designed runs/scrambles, rushing EPA, throwing on
the run and deep-vs-short splits versus pocket precision) and records a one-line `style_profile` plus
`style_evidence`. The rating stage compares each new profile's attribute shape with every already-approved
rating at the position (correlation of mean-centred ratings >= 0.95, or mean absolute difference <= 3) and
flags STYLE_PROFILE_TOO_SIMILAR for review. Approved ratings are not edited for style; style adjustments to
them happen in the head-to-heads.
Rating revisions (commissioner card t30s3, 2026-11-02): an approved player_rating may be superseded only by an add-only revision record `<TASK>_A<N>` (`npm run reaudit:revise`). The earlier record stays as immutable history; the revision passes the same evidence gate, validator, high-trait tiers and unique playing-style rule against the effective rating of every other player at the position, and its approval is appended with `supersedes`. Superseded records are excluded from later style checks.

Tiebreak head-to-heads (commissioner card t31s1, 2026-11-02): players tied on overall whose order the standard v1.1.2 pairs did not test may get add-only extra pair_audit tasks `<POS>_REAUDIT_TIEBREAK_nn` (`npm run reaudit:tiebreak`). They pass the same evidence gate, validator and pair_audit checks, are saved FLAGGED and stay pending commissioner review on the awaiting pointer; any rating change they imply is proposed as a rating revision.

All v1.0.0 text, Amendment v1.1 and Addendum v1.1.1 above remain in force unchanged.

## Addendum v1.1.2 entry B — Generic position pipeline + variance audit + re-audit lock (code/docs, commissioner t31s9/t32u/t33u, 2026-11-02)
Every position (new run or TOP10_REAUDIT) follows the same engine path; only the evidence metrics differ:
1. candidate_audit → 2. background dossiers (one per player, always reviewed) → 3. per-player judgment ratings (no formulas;
style rule: style_profile + style_evidence, flag corr ≥ 0.95 or mad ≤ 3) with the Madden reference + deltas (reference only, never evidence) →
4. head-to-heads from the rating order (H2H_01..06 incl. rank 10 vs first out) + `reaudit:tiebreak` for every untested tie (pending until approved) →
5. **variance_audit** (`<POS>_VARIANCE_AUDIT`): every OVR/attribute with |ours − Madden| ≥ 10 gets a verdict SUPPORTED (key stats) or ADJUST
(proposed add-only revision via `reaudit:revise`, style rule rechecked). Metrics per position: `config/variance-metrics.json`
(QB: EPA in/out of pocket, on the run, clean vs pressured, time to throw, turnovers, value over average, scheme/system-QB). Always commissioner review. →
6. scarcity_audit → 7. positional_cross_audit (left pending while tiebreaks/variance adjustments are pending) →
8. lock: `npm run reaudit:lock -- <POS> --confirm REAUDIT_REPLACE_BASELINE_<POS> --by <name> --at <iso> [--dry-run]` writes a NEW
`data/baselines/<POS>.reaudit-<YYYYMMDD>.json`, keeps the old baseline file and appends it to `state/locks.json` history, writes an add-only lock record.
OPEN (needs commissioner approval, not applied): (a) `variance_audit` in POSITION_WIDE_TASK_TYPES so the evidence gate accepts it;
(b) a protected-paths exception for the lock outputs (new data/baselines file, locks.json pointer + append-only history, queue item → COMPLETED).
APPROVED (card t33s4, 2026-11-02): (a) `variance_audit` is position-wide in the evidence gate; (b) SIXTH NARROW EXCEPTION in
scripts/protected-paths-check.mjs admits only the lock outputs: new `data/baselines/<POS>.reaudit-<YYYYMMDD>.json` (must be the file
locks.json points at, LOCKED, madden_order_verified false), the single-position `state/locks.json` pointer change + one appended history
entry, and queue item IN_PROGRESS → COMPLETED with the appended lock audit id `<POS>_REAUDIT_LOCK_<YYYYMMDD>`. Real lock still needs
the commissioner's separate confirmation.

### Addendum v1.1.2 entry C — league-wide ceiling check (card t35u)
Before any positional cross-audit is approved, run the league-wide ceiling check (`docs/stage-engine.md`): screen every rostered or free-agent player outside the audited pool with meaningful 2025-26 snaps against #10 and first-out. Any flag means the cross-audit is NOT approved; stop and report to the commissioner. Read-only; never changes a rating.

### Addendum v1.1.2 entry D — weekly in-season update (card t36u, 2026-11-02)
Weekly QB top-10 updates against `data/baselines/QB.reaudit-20261102.json` follow `config/weekly-update.json` and `docs/weekly-update.md`:
- Evidence is rolling and season-weighted.
- Shrinkage pulls ratings toward the baseline.
- Caps per week: OVR ±1 and attributes ±2. They widen to ±2/±4 when a move is sustained for 3+ weeks, or to ±4/±8 on an injury or role change with a source.
- Head-to-heads are required on every rank swap. All existing checks still apply.
- Output is PROPOSED only (`npm run weekly:propose|weekly:validate`). There is no lock without the commissioner's confirmation. v1.0 is unchanged.
