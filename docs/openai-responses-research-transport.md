# OpenAI Responses research transport

`OPENAI_RESPONSES_TRANSPORT` is the preferred research path when `OPENAI_API_KEY` is present. It sends a stateless Responses API request (`store: false`) with only the hosted `web_search` tool and strict JSON Schema output. It does not read Codex login state, `auth.json`, `CODEX_HOME`, or the Codex state database.

The default model is `gpt-6-astra`, verified against the official Responses API reference. Set `GRIDIRON_RESEARCH_MODEL` to select another documented model that supports both web search and Structured Outputs. Authentication comes only from `OPENAI_API_KEY`; keys must never be written to repository files or diagnostics.

Capability detection is explicit. Without an API key, automatic selection reports the transport unavailable. It does not silently launch nested Codex. `SDK_TRANSPORT` and `EPHEMERAL_CLI_TRANSPORT` remain available only when explicitly selected through the collector or `--transport` on the resume command.

Optional integer guards are unset by default and therefore do not change existing behavior:

- `GRIDIRON_RESPONSES_MAX_REQUESTS`
- `GRIDIRON_RESPONSES_MAX_INPUT_TOKENS`
- `GRIDIRON_RESPONSES_MAX_OUTPUT_TOKENS`
- `GRIDIRON_RESPONSES_MAX_TOTAL_TOKENS`
- `GRIDIRON_RESPONSES_MAX_WEB_SEARCH_CALLS`

Diagnostics record the selected model, response ID, input/output/total token counts, web-search call count, elapsed time, outcome, and classified failure. They do not estimate dollar cost.

Run `npm run research:responses-smoke` for capability detection only. It makes no API request. Add `-- --live` only when a paid, non-player web request is explicitly intended and both authentication and model access are configured.

Reference: [OpenAI Responses API create method](https://developers.openai.com/api/reference/typescript/resources/beta/subresources/responses/methods/create)
