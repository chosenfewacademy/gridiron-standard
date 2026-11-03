# Weekly in-season update (addendum v1.1.2 entry D, card t36u)

Baseline: `data/baselines/QB.reaudit-20261102.json` (QB_REAUDIT_LOCK_20261102). Each week the top 10 QB ratings and rankings get a **proposed** revision. A weekly run never locks. A new lock needs the commissioner's explicit confirmation through the existing `reaudit:lock` flow.

## Evidence (rolling, season-weighted)
- Last 4 weeks 0.35, season-to-date 0.45, prior season 0.20.
- The prior-season weight fades 0.02 per week, down to a floor of 0.05.
- No single week may carry more than 15% of the weight. A week with fewer than 15 dropbacks does not count.
- EA/Madden ratings are not evidence. The Madden delta is reported as a reference only.
- Ratings stay per-player judgment with a written rationale. No percentile-to-rating formulas.

## Stability
- Shrinkage toward the baseline: proposed = baseline + k·(judged − baseline).
- k rises with weeks since the baseline: 0.4 at W1, 0.5 at W2, 0.6 at W3, 0.7 at W4, 0.8 at W6 and 0.9 at W8+.
- Base caps per week: OVR ±1 and each attribute ±2.
- A move in the same direction sustained for 3 or more consecutive weeks allows OVR ±2 and attributes ±4.
- An injury or role change (source URL required) allows OVR ±4 and attributes ±8.
- If OVR drifts more than 5 from the baseline (without an event), trigger a full TOP10_REAUDIT instead.

## Checks kept (all required)
- Style rule
- Madden delta reference
- Variance audit for gaps of 10 or more
- League/FA ceiling check (`src/league-ceiling.ts`)
- A head-to-head for every pair whose order changes

## Weekly run (after Monday night's game, ET)
1. `npm run nflverse:fetch` (or the evidence import) to refresh season data through week N.
2. `npm run weekly:propose -- QB --week N` scaffolds `research-inbox/QB/WEEKLY_2026_WNN/proposal.json` (status PROPOSED).
3. Fill in the proposal:
   - `prior_week_ovr` comes from the last accepted weekly proposal; use the baseline in week 1.
   - Judged ratings use the shrinkage above, with rationale, attribute changes and the direction streak.
   - Add `event` with `source_url` for an injury or role change.
   - Add a head-to-head for every swap.
   - Run the ceiling check against the #10/#11 boundary.
   - Set each `checks` flag to true only after that check runs.
4. `npm run weekly:validate -- QB --week N` must print OK.
5. Run typecheck, test and preflight, then commit the proposal (add-only) and push fast-forward.
6. Report the proposed changes to the commissioner. Lock only on explicit confirmation.
