# QB reconstruction Full Audit template

This template is not a request to run research. Complete it for one explicitly authorized player only. No default ratings or prefilled numeric proposals are supplied.

## A. Identity and immutable comparison constraints

- Exact registry player_id, name, team, Madden position QB.
- Canonical baseline file/hash, locked rank or outside-control role, locked target OVR.
- Reconstruction contract version; unique audit/task reference.
- State which locked controls have approved reconstructed cards and which remain hierarchy-only. Do not invent their missing attributes.

## B. Season-aware evidence packet

Use the existing Full Audit research adapter and `applyFullAuditEvidenceGate`. Preserve the NFL calendar provenance, observed live-search indicators, source URLs/retrieval timestamps, nfl_season, season_phase, evidence_season, sample_size_context, current_season_games_available, current_season_games_played and prior_season_used_as_primary_baseline. No calendar-year shortcut is permitted.

Offseason/preseason: the most recently completed regular season is primary, with applicable postseason, multi-year trend and current role/roster/injury/practice/system/age context. Early season: retain the completed baseline and explicitly limited current sample. Established season: current performance is primary; previous seasons contextualize sustainability. Postseason/completed season retain the correct NFL season and postseason context. Unavailable calendar or insufficient evidence stops proposal generation.

Cover all existing gate categories and all 17 QB domains in the architecture. Each domain needs an assessment, source IDs, sample/context caveats, and unavailable premium metrics with strongest public substitutes clearly distinguished. This adds domain-level analysis; it does not remove or replace existing evidence requirements.

## C. Proposed full card

Only after evidence passes, fill every required QB attribute from its own evidence. Preserve other explicitly entered Madden ratings separately as supplemental attributes. Supply trait confidence, source IDs, sample-size context, limitations, why-not-higher and why-not-lower for all 19 traits. Do not backsolve from the locked target OVR.

Keep locked_target_ovr, proposed_ovr (nullable before empirical assessment), and observed in-game OVR distinct. Add meaningful supported weaknesses and current-readiness-versus-reputation analysis. Describe an archetype only after completing the independent trait build.

## D. Validator and scarcity review

Run `validateReconstruction`; never trust analyst-supplied validator findings or approval fields. Every crossed 90/95/97/99 threshold requires separate exact-trait rationale, traceable sources and HIGH confidence. Document internal coherence (THP/accuracy; RUN/depth accuracy; TUP/AWR/BSK; movement; CAR; INJ/STA/TGH), limitations and contradictions. No automatic trait correction is allowed.

## E. Locked-control comparisons

Compare against every other locked Top 10 QB and all three outside controls. For a reconstructed control, bind the exact approved card fingerprint and discuss trait-level differences. For hierarchy-only controls, label the limitation explicitly and compare only known hierarchy and sourced football evidence. This bootstrap limitation requires explicit acknowledgment; it is not a claim that full-card calibration already exists.

Identify differences from every same-OVR reconstructed control. Unsupported identical builds trigger review; do not invent weaknesses or trait differences just to make cards look different. If evidence challenges locked hierarchy, stop with a conflict and request a separately authorized hierarchy review, not a silent mutation.

## F. Empirical OVR observation and revision

Manually enter the complete proposed card in Madden. Record the exact entry snapshot, observed OVR, card fingerprint, game/build, platform, mode, roster context, settings/boosts, observer, timestamp and observation evidence reference. Editor order remains unverified. A measurement establishes only the result for that entered card/context, never a general formula or verified attribute order.

Flag target-versus-observed and proposed-versus-observed mismatches. A mismatch prevents validation/locking; it does not authorize fitting unrelated ratings. Any trait change requires explicit audit logic and evidence in `proposeRevision`; preserve the prior full snapshot, invalidate previous observations and approval, then measure again. The framework has no automatic revision loop. Any future automatic analyst revision loop must obey the governing maximum of three failed automatic attempts, preserve every attempt and queue RE-AUDIT REQUIRED.

## G–I. Explicit approval, persistence and next player

Report all findings and await explicit user approval bound to the exact proposal fingerprint and every review flag. Even VALIDATED requires explicit approval in this reconstruction workflow; validation can run and produce findings while status remains PROPOSED. Do not use the general HIGH-confidence auto-approval policy here.

After explicit approval, move through VALIDATED and USER_APPROVED. `preparePersistence` creates an append-only reconstruction record; an application-provided store must persist it immutably and return a receipt before LOCKED. It must not update existing current-card pointers, approved audit history, locked baselines or team-room state. Existing approval/persistence paths are intentionally not invoked. After LOCKED, the application may select the next pending queue item for a separately authorized audit; do not research the next player automatically.
