# QB calibration discovery and import preview

This is a read-only recovery utility, not an importer, audit runner, or Architecture v1.0 change. The application still owns approval and persistence. No dependencies, package scripts, production sources, or existing tests were changed. New implementation and tests live under `logs/qb-import-preview/` to respect the task's output restriction.

## Design and operation

A repository-integrated importer would unnecessarily touch production wiring; a one-off manual list would not provide repeatable safety checks. This utility separates read-only collection, pure candidate validation, and preview-file writing. It never imports application executors, approval routines, or state writers.

1. `collect.ps1` traverses all repository files, including hidden and ignored logs, and reads the sibling original project ZIP in memory without extracting it. It records source bytes, hashes, exclusions and unsupported formats in `source-inventory.json`. Dependency/VCS internals and this utility's generated workspace are excluded; potential secret files are excluded explicitly. Unsupported archives/formats require manual review, never silent acceptance. The scan does not cover unrelated folders, cloud storage, deleted files, or inaccessible external conversations.
2. `discovery.ts` parses JSON, nested full-card maps, CSV exports, and fenced Markdown JSON. Other relevant text remains in the inventory for manual inspection and cannot be auto-imported. Names resolve by exact registry identity, never by invented slugs. Research statistics are not treated as Madden attributes. Raw sources remain available for exact review.
3. The exported Zod `previewCardSchema` is the canonical preview record contract: position, player identity, OVR, complete rating map, provenance and hash/location, approval classification, baseline rank, control role, architecture version, confidence, missing fields, present/missing attributes, completeness verification, rejection reasons and import safety. Nulls/empty maps preserve missing data; nothing is inferred from OVR. It validates every normalized candidate at runtime.
4. Approval labels alone do not prove provenance. Explicit independent source verification and a verified full-attribute inventory are required for an eligible preview. Provisional/test/mock/ambiguous sources, identity or position mismatches, incorrect locked OVR/rank, incompatible architecture, invalid/incomplete ratings, and conflicting hierarchy containers are rejected. Historical records without independently verified approval are not eligible.
5. Different attribute/OVR/position/architecture versions retain all source locations and differing fields. Independently verified approved sources are identified as stronger than unverified labels, but no conflicting version is selected; all require explicit review. Identical eligible copies produce one logical creation while retaining all candidate provenance.
6. `run-preview.ts` checks the authoritative state-to-baseline pointer and writes only `preview.json` and `artifact-report.md` beside the utility. `would_create` shows exact canonical records at logical design destinations, not existing application persistence paths. No importer or approval operation exists. Eligibility is not authorization to import.

Run from the repository root:

```powershell
& ./logs/qb-import-preview/collect.ps1
npx tsc --noEmit -p logs/qb-import-preview/tsconfig.json
npx tsx logs/qb-import-preview/discovery.test.ts
npx tsx logs/qb-import-preview/read-only.integration.test.ts
npx tsx logs/qb-import-preview/run-preview.ts
npm run typecheck
npm test
npm run preflight
```

The preview tests are deliberately separate from `npm test`: changing package scripts or the production test tree was outside the allowed output directories. All fictional safety fixtures are in memory and never become player state. Tests cover approved discovery, provisional rejection, conflicting versions, incomplete cards, OVR/rank/container conflicts, unknown provenance, mock paths, unverified inventories, identity/position conflicts, existing keyed full-card format, CSV/Markdown handling, and read-only determinism with actual source-file hashes.

## Discovery findings

The complete source-by-source inventory and candidate rejection list are in `logs/qb-import-preview/artifact-report.md`; machine-readable provenance, missing fields and canonical creation preview are in `preview.json`. `source-inventory.json` preserves all inspected text and byte hashes.

The repository plus its sibling `gridiron-standard-architecture-v1.zip` contain **no usable QB full cards and no structured QB card with attributes**. The ZIP is an original bootstrap copy, not a recovered collection of historical full audits. There are no CSV exports, approved historical audit files, or player current-card snapshots in the inspected project files. The only imported complete cards found are LT cards, which cannot substitute for QB cards.

There are 60 structured QB hierarchy/OVR rows across four occurrences of the baseline: the canonical baseline, two copies in the previous dry-run request, and the original ZIP's baseline. These are repeated control records, not 60 distinct full cards. Every row has no attributes and fails faithful full-card completeness. The canonical hierarchy has approved locked provenance; dry-run copies are test-only; archive rows are historical with unverified card-approval provenance. No conflicting attribute-level QB versions were found.

Other discovered material includes the player registry; state lock/project snapshots; bootstrap manifest/import report; baseline and audit schemas; source interfaces/loaders/exporters/validators; tests; previous research-smoke and audit-smoke outputs; global governance/scarcity/evidence policies; prior limitation documentation; and architecture placeholders. All relevant hits, including non-QB full-card/sensitivity references inspected to rule out misplaced artifacts, are listed individually in the generated report. Their source code, research facts, future-section headings and test assertions cannot supply approved full-card data.

## Authoritative hierarchy

`state/locks.json` explicitly points QB to `data/baselines/QB.json`; both that lock and `state/project-state.json` say LOCKED. The canonical file also says LOCKED and retains Architecture/Methodology 1.0.0. All three discovered copies match its hierarchy, last-in, first-out and outside controls. Copies corroborate storage consistency; they are not independent rating approvals.

| Rank | Player | Stored OVR |
|---|---|---|
| 1 | Matthew Stafford | 91 |
| 2 | Joe Burrow | 90 |
| 3 | Josh Allen | 90 |
| 4 | Drake Maye | 88 |
| 5 | Jordan Love | 88 |
| 6 | Dak Prescott | 87 |
| 7 | Brock Purdy | 85 |
| 8 | Justin Herbert | 84 |
| 9 | Trevor Lawrence | 84 |
| 10 | Sam Darnold | 83 |

Last-in: Sam Darnold 83. First-out: Patrick Mahomes 83. Outside controls: Patrick Mahomes 83, Lamar Jackson 83, Jared Goff 82. No ordering or values were changed.

## Architecture artifacts and remaining gaps

| Artifact, including archive counterpart | What exists / authority | Missing / import decision |
|---|---|---|
| `config/positions/QB.md` | Canonical LOCKED/IMPORT_PENDING title, status and future-section checklist; archive copy is byte-identical | No definitions, major/secondary attribute hierarchy, evidence-to-trait mapping, gameplay sensitivity rules, archetype descriptors, verified editor order or QB scarcity detail. Placeholder only; not importable as detailed architecture. |
| `config/madden-entry-order.json` | Explicitly unverified placeholder QB checklist | Not authoritative editor order or full Madden rating inventory. Cannot certify completeness or infer sensitivity/weights. |
| `AGENTS.md`, `config/scarcity-rules.json` | Authoritative global rules: 90+ elite, 95+ rare league-defining, 97+ extraordinary, 99 historic/generational exact trait; archetypes describe completed cards | No QB-specific trait definitions, sensitivity measurements or historical trait distributions. Preserve existing rules; no architecture import proposed. |
| `config/evidence-policy.md`, current evidence schemas, `src/evidence-gate.ts`, `src/season-phase.ts` | Implemented evidence selection/gating and phase metadata | Not recovered original QB architecture, attribute values, weights or scarcity calibration. Archive evidence policy is an older bootstrap version, not a replacement for current gates. |
| `data/baselines/QB.json`, bootstrap report | Authoritative hierarchy and explicit NOT_YET_IMPORTED full-card status; scarcity LOCKED_HISTORICAL_NOT_FULLY_STRUCTURED | All ten approved QB full cards and three outside-control full cards, original approvals/audit references, and exact-trait scarcity inventory remain unavailable. |

Every candidate's provisional missing-attribute checklist is: SPD, ACC, AGI, COD, STR, AWR, THP, SAC, MAC, DAC, RUN, TUP, PAC, BSK, CAR, JMP, INJ, STA, TGH. This is only what the stored unverified list names, **not a claim that these 19 fields constitute a full Madden card**. Recovering an authenticated full attribute inventory remains a separate requirement.

## OVR implementation inspection

| Category | Finding and source |
|---|---|
| Real attribute-to-OVR calculation | Absent from repository and archive source. |
| Lookup/table behavior | Baselines store OVRs. `src/ratings-only.ts`, `src/card-spec.ts`, `src/export-collector.ts` read/display stored OVR. No attribute-to-OVR lookup table found. |
| Approximation | No approximate formula or fitted weights found. |
| Placeholder/input behavior | `src/audit-parser.ts` accepts analyst-supplied `ovr_after`; `src/player-history.ts` copies it into approved snapshots. This is not an independent calculation. |
| Validation | `src/validator.ts`, `src/quick-recheck.ts` and `src/audit-validator.ts` check deltas, approval flags and rating ranges; they do not recompute OVR. |

## Preview and safest next step

The canonical creation preview is **`would_create: []`**. No card or architecture record can be imported faithfully from the available artifacts. No import, Jalen Hurts rerun, rating generation, approval or workflow transition occurred.

Obtain the original approved QB full-card and detailed architecture artifacts, with their approval references and version, from the original project record. Re-run discovery against those supplied artifacts and an independently verified complete attribute inventory. If original architecture cannot be recovered, a separate explicitly authorized architecture-definition task is needed; it must not be misrepresented as recovered v1.0. Independent OVR calculation additionally requires a verified Madden formula or controlled measurement dataset and validation fixtures. Neither weights nor editor order should be invented from current OVRs.

Validation results and source-integrity confirmation are recorded in `logs/qb-import-preview/validation.json` and `integrity-check.json`. The existing editor-order preflight blocker is preserved.

## Files created by this task

No pre-existing file was edited. These are all new files:

| File | Purpose |
|---|---|
| `docs/qb-import-preview.md` | Design, findings, limitations, usage and change manifest |
| `logs/qb-import-preview/collect.ps1` | Read-only file/archive collection |
| `logs/qb-import-preview/discovery.ts` | Pure discovery, canonical Zod schema, rejection and conflict logic |
| `logs/qb-import-preview/discovery.test.ts` | Fourteen in-memory safety tests |
| `logs/qb-import-preview/read-only.integration.test.ts` | Determinism and actual repository/archive hash verification |
| `logs/qb-import-preview/tsconfig.json` | Separate strict typecheck without changing project configuration |
| `logs/qb-import-preview/run-preview.ts` | State-pointer checks and preview/report generation |
| `logs/qb-import-preview/source-inventory.json` | Source text, hashes, scope and exclusions |
| `logs/qb-import-preview/preview.json` | Canonical import preview and candidate decisions |
| `logs/qb-import-preview/artifact-report.md` | Complete artifact/candidate inventory |
| `logs/qb-import-preview/validation.json` | Typecheck, test and preflight results |
| `logs/qb-import-preview/integrity-check.json` | Original-file hash comparison and new-file manifest |
