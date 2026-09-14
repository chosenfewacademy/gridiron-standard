# Resumable Full-Audit Evidence Collection

Full Player Audits and QB reconstruction can store evidence progress by audit ID without changing player, baseline, approval, or workflow state. The checkpoint is an operational research artifact, not an audit record.

Each category uses one of `NOT_ATTEMPTED`, `IN_PROGRESS`, `SATISFIED`, `PARTIAL`, `MISSING`, `FAILED_RETRYABLE`, or `FAILED_TERMINAL`. Its record retains attempt count, last attempt time, accepted normalized evidence, source URLs, unresolved conflicts, missing fields, retry eligibility, and failure reason. Retry history is append-only within the checkpoint. File saves use a temporary file and rename so a stopped process cannot replace a valid checkpoint with a partial write.

QB research is split into 26 micro-batches of one to three related categories spanning production, accuracy, pressure, processing, mistakes, sacks, ball security, mobility, durability, current context, trends, and controls. The preferred Responses API transport sends each request statelessly with `store: false`; explicit compatibility transports retain their isolated behavior. This avoids accumulated conversation context; provenance remains in the file checkpoint. A resume skips fresh satisfied categories. It retries partial, missing, retryable-failure, or explicitly stale categories up to three total attempts per micro-batch. Existing URLs are passed to the collector as an avoidance list, and duplicate evidence items are removed when normalized results merge.

Failure kinds distinguish network/tool timeout, source unavailable, insufficient source data, parser/schema failure, provider conflict, and genuinely unavailable evidence. Accepted evidence survives all failures. Provider conflicts remain unresolved and force `PARTIAL`; timeout never becomes satisfied. An orphaned `IN_PROGRESS` checkpoint is recovered as a retryable or terminal interrupted attempt on the next invocation.

The default limits are 45 seconds per player-evidence request, three attempts per micro-batch, and 15 minutes for one audit execution. Calendar refresh is separate: a stale calendar triggers only a lightweight official NFL calendar request, with a 30-second request limit and its own three-attempt checkpoint. Accepted player evidence is not rerun because calendar data expired.

On Windows, `npm test`, `npm run preflight`, and the reliability harness first use `tsx`. If and only if the launcher output contains the recognized `uv_os_get_passwd` plus `ENOMEM` signature, `scripts/run-with-fallback.mjs` compiles with the project TypeScript configuration and runs the emitted JavaScript with Node. It prints `GRIDIRON_RUNTIME_FALLBACK_USED`; unrelated launcher or test failures are returned unchanged.

Resume an existing reconstruction by UUID or registry player ID:

```text
npm run evidence:resume -- --audit-id <existing-run-uuid>
npm run evidence:resume -- --player <registry-player-id>
```

The command only matches an existing reconstruction directory containing preserved evidence. It does not create an independent audit. Output stays in that run directory as `evidence-progress.json`, `evidence-resumed.json`, `evidence-resume-diagnostics.json`, and `evidence-resume-summary.json`. The existing season-phase Full Audit gate remains the final authority; all independently checked categories must first be satisfied, and the full gate must also pass.
