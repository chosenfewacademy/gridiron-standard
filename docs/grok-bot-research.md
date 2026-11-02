# Grok Bot research procedure (GROK_BOT_FILE_TRANSPORT)

Default transport (config/research-transport.json). OpenAI/Codex transports remain optional
(`GRIDIRON_RESEARCH_TRANSPORT=CODEX`, paid). Grok Bot authors files; the app stays commissioner.

## 1. How data was pulled for the finished positions (findings)
- **QB, RB, WR, TE, LT baselines were not produced by the research pipeline.** They were imported
  from the prior structured project record (`bootstrap/manifest.json`, `bootstrap/import-report.json`,
  version `bootstrap-2026-08-30`, `IMPORTED_LOCKED`). Top 10 + last-in/first-out + external controls
  + scarcity counts were imported; historical full cards were not present.
- The only live research runs in the repo are the Stafford QB reconstruction
  (`logs/qb-reconstruction/matthew_stafford/6cb4a74b-…`) and an audit smoke (`logs/audit-smoke/`).
  That process is the model reproduced here:
  - Codex micro-batches of ≤2 evidence categories (`QB_EVIDENCE_BATCHES`, `*_TARGET_n`).
  - Live web search; query style: `"<player>" "<season>" <trait terms> PFF`, `site:<team site> "<player>" "<season>" injury/practice`,
    `site:nfl.com …` / `site:operations.nfl.com …` for the season calendar.
  - Sources by count: nfl.com (~140), pff.com (~133), therams.com (~120), pro-football-reference.com (~30),
    operations.nfl.com, apnews.com, espn.com, draftkings network. Authority tiers 1 (24 sources) and 2 (11).
  - Shapes: `sources[] {name,url,retrieved_at,published_at,authority_tier,claims[]}`;
    `normalized.<category> {status,confidence,items[{claim,source_url,retrieved_at,season,period,evidence_tier?,direct_or_inferred?}],limitations[],compared_controls?}`.
  - Provenance: the app recorded observed `web_search` events → `fresh_web_research_observed`,
    `calendar_web_search_observed`; checkpoints in `evidence-progress.json`, diagnostics in `evidence-resume-diagnostics.json`.
  - Gate: `src/evidence-gate.ts` (unchanged), QB policy `src/qb-evidence-policy.ts` (unchanged).

## 2. Delivery layout
`research-inbox/<POS>/<TASK_ID>/` — `task.json` (optional; baseline_controls etc.), `evidence.json`,
`provenance.json`, `audit-attempt-1..3.md`. The app writes only `feedback-attempt-N.json`.

## 3. Fresh-research proof (replaces observed web_search events)
`provenance.json` (schema `src/grok-bot-provenance.ts`) must declare:
- `transport: "GROK_BOT_FILE_TRANSPORT"`, `author: "grok-bot"`, matching `task_id`/`position`;
- `queries[] {query, executed_at, purpose: EVIDENCE|CALENDAR}` (≥1 EVIDENCE query);
- `retrievals[] {url, retrieved_at, method}` — **every** `sources[].url` and every item `source_url`
  must be listed, with identical `retrieved_at`; all timestamps fresh (not future, within the gate's max age);
- the fixed attestation string.
Only then is `fresh_web_research_observed=true` (and `calendar_web_search_observed` only if CALENDAR queries exist).
Self-declared observation flags and `minimum_evidence_met` in evidence.json are discarded; the
unchanged Full Audit gate then decides. Missing evidence.json stops the run with no state mutation.

## 4. Procedure per task
1. Read the task (state/project-state.json `current_task`, baseline controls from data/baselines — read only).
2. Resolve the season calendar (calendar_queries) and record CALENDAR queries.
3. For each required category (`requiredEvidenceCategories` in src/evidence-gate.ts) research in ≤2-category
   batches using config/grok-bot-query-templates.json and the bucket's metrics in config/position-metrics.json
   (PROPOSED v1.1 – use as research guidance only until approved).
4. Prefer tier-1 sources; cite PFF as tier-2 evidence with URL; never EA ratings.
5. Free deterministic data: `npm run nflverse:fetch -- <snap_counts|stats_player_week|stats_player_reg|roster> <season>`
   → `research-inbox/_cache/` (+ `.provenance.json`, method DETERMINISTIC_HELPER). Note: nflverse snap counts use
   `G`/`T`/`DE`/`LB` labels — exact-side buckets (LG vs RG, REDGE vs LEDGE, MIKE/WILL/SAM) need alignment evidence from other sources.
6. Write evidence.json + provenance.json; validate offline: `npm run evidence:import -- --position <POS> --task <ID>`.
7. Analyst output `audit-attempt-N.md`: fenced ```json audit (ParsedAudit) + prose. Every rating ≥90 needs
   `high_trait_evidence.<ATTR> {tier: ELITE(90+)|LEAGUE_DEFINING(95+)|EXTRAORDINARY(97+)|GENERATIONAL(99), claim, source_urls[]}`
   citing sources listed in evidence.json. Validator failures return feedback; max 3 attempts, then RE-AUDIT REQUIRED.
8. Open a PR with only `research-inbox/` files. The user runs `npm run continue`; the app advances state.
Grok Bot never edits state/, locks, baselines, cards, audits, or existing logs (CI path guard enforces this).
