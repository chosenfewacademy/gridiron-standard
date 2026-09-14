# QB reconstruction framework: implementation and boundaries

The framework is implemented without creating player ratings or approved cards. The locked QB hierarchy, all other positional baselines, registry/current-card state, audit history and team-room/project state remain unchanged. This task explicitly authorizes the new QB analytical architecture; it does not retrospectively approve it as recovered history or reopen membership.

## Canonical artifacts

- `docs/qb-reconstruction-architecture.md`: all 19 required QB traits, individual evidence/confidence/substitution/interaction rules, 17 evidence domains, intended gameplay identity and exact-trait scarcity standards.
- `config/qb-reconstruction-architecture.json`: machine-readable definitions, separate reconstruction version, explicit unknown engine sensitivity and unchanged unverified editor order.
- `schemas/qb-reconstruction-architecture.schema.json` and `schemas/qb-full-card.schema.json`: JSON Schema structural exports of the canonical runtime Zod contracts in `src/qb-reconstruction.ts`. Runtime refinements, evidence validation and approval guards remain mandatory; structural JSON validation alone cannot approve a card.
- `docs/qb-full-audit-template.md`: the complete research → evidence → proposal → validation → comparison → explanation → user approval → append-only persistence → next-player procedure.
- `config/qb-reconstruction-queue.json`: initial planning queue, copied only from the authoritative baseline/registry, with the baseline source hash. It is not the active team-room/project workflow state.

The full-card schema requires all 19 requested QB ratings, per-trait confidence and upper/lower bounds, all 17 evidence-domain reviews, sources, control comparisons, coherence/weakness/readiness analysis, scarcity flags, validator findings, approval status, revision history and empirical observations. No blank template filled with arbitrary ratings has been created. Supplemental editor attributes are preserved separately; the complete Madden editor inventory is still unverified.

## Status queue

Every entry is **NOT_STARTED**:

| Order / role | Player ID | Player | Locked target OVR |
|---|---|---|---|
| 1 | matthew_stafford | Matthew Stafford | 91 |
| 2 | joe_burrow | Joe Burrow | 90 |
| 3 | josh_allen | Josh Allen | 90 |
| 4 | drake_maye | Drake Maye | 88 |
| 5 | jordan_love | Jordan Love | 88 |
| 6 | dak_prescott | Dak Prescott | 87 |
| 7 | brock_purdy | Brock Purdy | 85 |
| 8 | justin_herbert | Justin Herbert | 84 |
| 9 | trevor_lawrence | Trevor Lawrence | 84 |
| 10 / last in | sam_darnold | Sam Darnold | 83 |
| First out | patrick_mahomes | Patrick Mahomes | 83 |
| Outside control | lamar_jackson | Lamar Jackson | 83 |
| Outside control | jared_goff | Jared Goff | 82 |

Runtime queue construction resolves exact registry names/positions, verifies ranks/counts/boundary controls, rejects duplicates and never mutates its inputs. The application must supply the authoritative locked baseline, not analyst-selected replacements. `beginReconstruction` permits only the first unfinished entry; neither it nor `nextReconstructionPlayer` invokes research.

## Workflow and approval boundary

Allowed forward transitions are NOT_STARTED → RESEARCH_READY → PROPOSED → VALIDATED → USER_APPROVED → LOCKED. Insufficient evidence diverts RESEARCH_READY or PROPOSED to EVIDENCE_INSUFFICIENT; a new research attempt returns to RESEARCH_READY. LOCKED is terminal.

The existing season-phase evidence gate is called directly by reconstruction validation; calendar failures, incomplete domains/traits, untraceable sources, conflicting controls, unsupported scarcity and mismatched observations cannot be bypassed by `minimum_evidence_met: true` or analyst-written findings. Validation returns a report without changing status. Even a valid HIGH-confidence report has `auto_approve: false`.

PROPOSED requires an application-issued report with sufficient evidence, but may retain outstanding observation/validation errors for review. Advancing beyond PROPOSED requires a valid application-issued report plus explicit user approval bound to the complete proposal fingerprint and every review flag. Approval here is a trusted application input recording actual user consent, not a string the analyst may create. Authentication/UI consent capture remains the application's responsibility. A serialized or edited validator report cannot authorize persistence; changed content requires fresh validation and approval.

For initial reconstructions, unavailable control cards must be identified as HIERARCHY_ONLY with explicit limitations. This produces acknowledgment-required flags; it never fabricates attribute comparisons. Once an approved control card exists, the comparison must use its exact fingerprint and cannot fall back to hierarchy-only. The caller must load `reconstructed_controls` from the application's approved reconstruction catalog, never from analyst claims. A separate later cross-audit may identify inconsistencies but cannot silently revise locked membership or approved cards.

`preparePersistence` produces only an append-new record in the new logical `calibration/reconstructed/QB` namespace, retaining the card, evidence/validation report and approval. `persistApprovedReconstruction` accepts an application-supplied `ReconstructionStore.appendNew` adapter. No filesystem store, route, research execution, general auto-approval routine, or historical/current-card writer is called by this framework. The future adapter must reject duplicate record IDs, append immutably, and return an authentic receipt; LOCKED requires that receipt. This is an infrastructure seam, not an enabled import path. Existing player-current pointers and approved audit directories are explicitly outside the write contract.

## Empirical OVR and revisions

Locked target OVR is an immutable comparison constraint, proposed OVR is nullable analyst output, and observed OVR is a separately recorded manual measurement. There is no EA formula, fitted approximation, lookup calculator, or automatic attribute adjustment. Every observation includes an exact entry snapshot/fingerprint, game/build, platform, mode, roster, settings, observer, timestamp and evidence reference. Any rating or supplemental-attribute change invalidates the old observation. Target or proposal mismatches prevent validation; they cannot be solved by arbitrary trait inflation. Document non-base boosts/settings before interpreting a measurement.

`proposeRevision` preserves the prior full snapshot and audit rationale, requires a reason for every changed trait, rejects changed identity/target OVR or already approved/locked input, clears obsolete measurements/findings and returns a new PROPOSED record. It does not write anything. No automatic revision loop is implemented; future automatic attempts remain limited by AGENTS.md to three failed revisions before RE-AUDIT REQUIRED.

Gameplay effect descriptions are explicit analytical semantics, not verified Madden 27 engine specifications. All 19 material OVR effects remain UNVERIFIED; an honest unknown replaces an invented yes/no answer. Movement/availability traits are marked primarily identity-oriented analytically, without asserting zero OVR contribution. Editor ordering is independent and unchanged.

## Validation and files changed

Tests use fictional players/cards and synthetic calendars only. They cover full-card completeness/ranges, architectural and JSON-schema completeness, hierarchy/queue immutability, transitions/sequencing, lack of auto-approval, explicit successful approval boundaries, forged/edited reports and stale approvals, empirical OVR separation and stale measurements, scarcity source hooks, revision preservation and unverified editor-order preservation. Existing research tests remain mocked; no live player research ran.

| File | Change |
|---|---|
| `config/positions/QB.md` | Replace import-pending placeholder with explicit canonical framework references and boundaries |
| `config/qb-reconstruction-architecture.json` | New machine-readable architecture |
| `config/qb-reconstruction-queue.json` | New 13-player NOT_STARTED planning queue |
| `docs/qb-reconstruction-architecture.md` | New complete analytical architecture |
| `docs/qb-full-audit-template.md` | New gated audit/reconstruction template |
| `docs/qb-reconstruction-framework.md` | New implementation, boundary and change report |
| `schemas/qb-reconstruction-architecture.schema.json` | New structural architecture schema |
| `schemas/qb-full-card.schema.json` | New structural full-card schema |
| `src/qb-reconstruction.ts` | New pure schemas, validator, state guards, queue and empirical observation/persistence interfaces |
| `tests/qb-reconstruction-tests.ts` | New synthetic tests |
| `tests/run-tests.ts` | Register reconstruction tests in the existing suite |
| `logs/qb-reconstruction/validation.json` | Validation command results |
| `logs/qb-reconstruction/integrity.json` | Protected-file before/after checksums |

Recommended first reconstruction: **Matthew Stafford, matthew_stafford, QB, locked comparison OVR 91**, only after a separate explicit user instruction. It must expose the lack of reconstructed peer cards, avoid target-fitting, and stop for missing evidence or contradictory calibration. No Stafford or Hurts research/audit has been executed in this task.
