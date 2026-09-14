# QB calibration limitations: inspected state and safe next steps

These are separate from season-phase evidence selection. No locked data or historical record was edited to address them.

## 1. Imported QB full cards

**Exists:** `data/baselines/QB.json` is LOCKED with Architecture/Methodology 1.0.0. It contains ten ranked player names and OVRs, Darnold as last-in, Mahomes as first-out, and outside controls Mahomes, Jackson and Goff. `full_cards_import_status` is `NOT_YET_IMPORTED`; there is no `full_cards` property. Scarcity is recorded only as `LOCKED_HISTORICAL_NOT_FULLY_STRUCTURED`. `bootstrap/import-report.json` explicitly says historical QB full cards were unavailable and were not inferred. `loadBaselineControls` exposes optional full cards but cannot recover absent data. The baseline JSON schema does not currently require full cards for a locked baseline.

**Missing:** Authoritative approved attribute-level cards for all ten QBs, supporting original audit references, and a reproducible exact-trait scarcity inventory. OVR/name lists cannot supply these attributes.

**Safest path:** Locate the original user-approved QB audit/card artifacts. Build a read-only import preview in logs containing exact transcription, original provenance, checksums, player-name matching, rating ranges, and discrepancies against stored hierarchy/OVRs. Reject guesses, missing attributes and inferred values. Have the application validate the preview and obtain explicit authorization for any write to the locked baseline before applying it. Keep the historical source intact; do not regenerate historical cards from current statistics or a target OVR. Reconstruct scarcity counts only from the authenticated full cards, not from assumptions about elite players.

## 2. Detailed QB architecture

**Exists:** `config/positions/QB.md` contains `Status: LOCKED/IMPORT_PENDING` and a list of sections that will eventually contain OVR-sensitive/secondary attributes, evidence package, gameplay sensitivity, archetype descriptors, editor order and analytical hierarchy. It supplies none of those details. Global exact-trait scarcity thresholds and approval rules exist in AGENTS.md and `config/scarcity-rules.json`. `config/madden-entry-order.json` includes a QB attribute list but explicitly marks the entire registry `verified: false` and calls its orders placeholders.

**Missing:** The original approved QB attribute hierarchy, evidence-to-trait definitions and calibration guidance, gameplay sensitivity findings, and verified Madden editor order. The new season-phase checklist is an evidence-selection contract; it is not a substitute for those missing locked decisions.

**Safest path:** Recover and transcribe the original approved QB architecture separately from the cards, preserving version and source provenance. Compare it with global rules and flag ambiguities. If the original cannot be recovered, ask for an explicitly authorized architecture-definition task; do not claim that a newly proposed design is imported Architecture v1.0. Verify editor order against the actual Madden 27 UI with documented observations before changing its verification flag. Do not treat the placeholder order as OVR weights.

## 3. Implemented OVR calculator

**Exists:** Audits accept model-supplied `ovr_before`/`ovr_after`. The validators flag changes and Quick Recheck scope; player-history snapshots copy `ovr_after`, and export/card code displays it. No deterministic attribute-to-OVR function, verified coefficients, rounding rules, or calculator test fixtures were found in `src`, `config`, or `schemas`.

**Missing:** A verified Madden 27 calculation contract for exact position, attribute inputs, any engine/archetype dependency, rounding/clamping, and reproducible fixtures. An analyst-proposed OVR is not an independently calculated OVR.

**Safest path:** First obtain a trustworthy documented engine formula or a user-authorized controlled in-game measurement dataset. Establish the target game/build and exact position behavior. Implement a versioned pure calculator only once the formula is justified, and test it against independently observed cards and rounding boundaries. Until then return `OVR_CALCULATION_UNAVAILABLE` in any future calculator integration rather than guessing or inflating attributes to hit a target. Do not infer coefficients from ten locked OVRs or from editor display order.

## Recommended next task

Create the read-only QB calibration import preview, using user-supplied original approved full cards and architecture artifacts. It should produce a completeness/provenance report under logs without editing locked baselines or historical audits. This is the safest next step before another rating-generation attempt. Verified OVR behavior is a separate prerequisite for claiming an independently calculated resulting OVR.
