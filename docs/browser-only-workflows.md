# Browser-only Gridiron workflows

The repository provides manual GitHub Actions controls for validation and OpenAI Responses API research. The OpenAI key stays in the GitHub repository secret named `OPENAI_API_KEY`. Do not place it in repository files, workflow inputs, Codex prompts, or GitHub variables. The workflows expose the secret only to the individual Responses API process that needs it.

## First-time browser setup

1. In the OpenAI API Platform, create the project key intended for Gridiron research.
2. In the GitHub repository, open **Settings → Secrets and variables → Actions → Secrets → New repository secret**.
3. Name the secret `OPENAI_API_KEY`, paste the key, and save it.
4. Optional: under the **Variables** tab, create `GRIDIRON_RESEARCH_MODEL` to override the verified repository default.

## Responses smoke test

1. Open the repository’s **Actions** tab.
2. Select **Gridiron Responses Smoke**.
3. Select **Run workflow**.
4. Change `live_confirmation` to `RUN_PAID_RESEARCH`.
5. Run the workflow.

The workflow installs locked dependencies with `npm ci`, runs TypeScript validation, then makes one non-player live web request. Its result is uploaded as an Actions artifact, and model, token, web-search, request, and response-ID diagnostics appear in the workflow summary. Leaving the confirmation at `DO_NOT_RUN` prevents the paid request.

## Stafford evidence resume

1. Open **Actions → Stafford Evidence Resume → Run workflow**.
2. Review the existing audit ID and player ID. The defaults target Stafford’s preserved reconstruction.
3. Keep `OPENAI_RESPONSES_TRANSPORT` unless intentionally testing an explicit compatibility transport.
4. Change `live_confirmation` to `RUN_PAID_RESEARCH`.
5. Run the workflow.

The workflow resumes the existing checkpoint; it cannot create a new Stafford audit. A concurrency lock prevents two runs for the same audit ID from writing simultaneously. Results remain uncommitted and are uploaded as a downloadable artifact. Typecheck, the complete tests, and preflight run afterward. The expected `madden_order_verified=false` result remains visible.

## Manual validation

Open **Actions → Gridiron Validation → Run workflow**. This performs typecheck, all tests, and preflight without an API key or paid request.

## Optional artifact proposal

After a successful Stafford resume, open **Actions → Propose Research Artifact Commit → Run workflow**. Enter the successful source run ID, verify the audit and player IDs, and select `CREATE_DRAFT_PR`. The workflow verifies that the source run succeeded, downloads its artifact, reruns all validation, creates a separate review branch, and opens a draft pull request. It never commits directly to the main branch and does not approve or persist a player card.

