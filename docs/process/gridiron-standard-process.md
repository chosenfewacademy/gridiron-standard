# Gridiron Standard — Locked Process (add-only)

Recorded 2026-11-03 (ET) at the commissioner's request (PhiXCrypto, card t50u: "Make sure everything we are locking in process wise is in the GitHub").
This file is **add-only**. Corrections and new rules go in a new dated addendum at the bottom. Nothing here edits v1.0 text, `docs/amendments/*`, or any locked baseline. Where this file and the code disagree, the code and the locked addenda win, and the gap is listed under "Known discrepancies".

## A. Position top-10 re-audit pathway (all positions: offense, defense, K/P/LS, FB)
Commands: `reaudit:trigger` (src/top10-reaudit.ts), `pool:approve`, `reaudit:run` / `reaudit:approve` (src/reaudit-executor.ts), `reaudit:revise` (src/rating-revision.ts), `reaudit:tiebreak` (src/tiebreak.ts), `reaudit:lock` (src/reaudit-lock.ts). Position docs live in `docs/positions/<POS>.md`; FB/LS in `docs/amendments/v1.1-addendum-fb-ls.md`.

1. **League screen.** Screen ALL active players at the position, plus IR and free agents, each with team and status. Run a candidate audit of the top 10 plus a few first-outs. The user approves the pool. **Standing approval was given on Nov 3, 2026.**
2. **Dossiers.** Write a background dossier for each player.
3. **Ratings.** Rate one player at a time (auto-approved). Judge each attribute from that player's own evidence. Never use percentile or fixed formulas, and never rebuild Madden formulas. Madden is a reference only, never evidence. Use the repo's methodology, position metrics, attribute list, tiers and card format.
4. **Unique playing style** (every position). Profiles must reflect each player's real-life style and create real mismatches. The style check fails at Pearson correlation >= 0.95 (mean-centred) or mean absolute difference <= 3 (`STYLE_SIMILARITY_LIMITS = { max_corr: 0.95, min_mad: 3 }` in src/stage-engine.ts). Fixes go through `reaudit:revise` (add-only).
5. **Stratification.** Leave a big gap so true stars stand out.
6. **Madden side-by-side.** Show the overall and every attribute next to Madden, with delta = ours minus Madden. `madden_order_verified=false` stays visible (config/madden-entry-order.json is protected).
7. **Head-to-heads.** The runner generates 6: 1v2, 3v4, 5v6, 7v8, 9v10, and #10 vs the best first-out. Add tiebreaks (`reaudit:tiebreak`) for untested ties and adjacent pairs, and for pairs created by flips. Rating changes that follow from results go through `reaudit:revise`.
8. **Variance audit.** Every gap of 10 or more vs Madden (overall or any attribute) must be justified with position-specific deep stats. Fix unsupported gaps with evidence.
   - QB: PFF grades, usage, EPA in/out of pocket, on the run, clean vs pressured, time to throw, turnovers, team value, scheme/system-QB analysis.
   - RB: rushing EPA/success rate, yards after contact, missed tackles forced, explosive-run rate, target share/receiving, pass-block snaps.
   - WR: targets/route share, YPRR, separation/target-earning, contested catches, drops, aDOT, YAC.
   - TE: inline/slot/wide alignment split, YPRR, run- and pass-block snaps, target share.
   - LT: pass-block snaps, pressures/sacks allowed, ESPN pass/run-block win rates, penalties, run blocking.
   - **Paywalled substitutes** (note them per position): PFF sub-grades are replaced by PFF overall plus block share/snaps; ESPN win rates; penalties from play-by-play (nflverse, `nflverse:fetch`).
9. **Scarcity audit.** Any trait rated 95+ needs a league-defining tag.
10. **League-wide ceiling check** (src/league-ceiling.ts, config/ceiling-metrics.json), including IR and FA. A player is flagged when they match or beat the weaker of #10 and the first-out on 3 of 5 metrics (`min_hits: 3`). The code also requires a minimum sample and at least one production-metric hit. Flagged players get tiebreaks vs #10 and the first-out. Any winner is fully rated and tested. Previously tested players count as resolved.
11. **Lock.** Run the cross-audit, then `npm run reaudit:lock -- --dry-run`, then the real lock. Use one lock ID per push (staged pushes). The locked #10 sets the ceiling for every other player at that position, league-wide and in free agency.

## B. Team-by-team position rooms
- Rate each team's full room: active roster, practice squad and IR (`team:audit`; state in data/teams/, protected).
- Show every attribute next to Madden, with delta = ours minus Madden.
- Calibrate against that position's locked top 10. Each dossier names the top-10 players used for calibration.
- Nobody outside the top 10 exceeds the locked #10.

## C. In-season updates
- Cadence: **every other Tuesday around 10 AM ET, starting Nov 17, 2026**, for all locked positions.
- Commands: `npm run weekly:propose -- <POS> --week N` and `npm run weekly:validate -- <POS> --week N`, following docs/weekly-update.md (addendum v1.1.2 entry D).
- Weight the full season and never overreact to one week. Pull toward the baseline (shrinkage k) and respect the movement caps (OVR ±1 / attributes ±2 base).
- OVR drift greater than 5 flags a full TOP10_REAUDIT.
- Runs produce proposals only. Nothing locks without the user's OK (through `reaudit:lock`).

## D. Guardrails
- Never inspect, print, copy or persist secrets, including OPENAI_API_KEY. Make no paid OpenAI calls without the user's explicit OK.
- Records are add-only. Do not edit v1.0 text or locked baselines except through approved lock paths. Protected paths are listed in scripts/protected-paths-check.mjs: state/, data/baselines/, data/players/*/, data/teams/, audits/, exports/cards/, config/madden-entry-order.json, bootstrap/. logs/qb-reconstruction/ is append-only.
- Before every push run: `npm ci`, `npm run typecheck`, `npm test`, `npm run preflight`, and `node scripts/protected-paths-check.mjs`.
- Push with push.sh, using token env `GRIDIRON_GITHUB_TOKEN` (never printed). Fetch and rebase first, push fast-forward only, never force.
- Never commit `research-inbox/QB/QB_REAUDIT_SCARCITY/audit-attempt-1.md`.

## E. Lock log (as of 2026-11-03, origin/main 5e3a957)
| Position | Lock ID | Date | Commit | Baseline |
|---|---|---|---|---|
| QB | QB_REAUDIT_LOCK_20261102 | 2026-11-02 | b1c14e0 | data/baselines/QB.reaudit-20261102.json |
| RB | RB_REAUDIT_LOCK_20261103 | 2026-11-03 | a8d081d | data/baselines/RB.reaudit-20261103.json |
| WR | WR_REAUDIT_LOCK_20261103 | 2026-11-03 | bfe361b | data/baselines/WR.reaudit-20261103.json |
| TE | TE_REAUDIT_LOCK_20261104 | 2026-11-03 ET (ID dated UTC 11-04) | 524b960 | data/baselines/TE.reaudit-20261104.json |
| LT | LT_REAUDIT_LOCK_20261104 | 2026-11-03 ET (ID dated UTC 11-04) | 6dcb4bc | data/baselines/LT.reaudit-20261104.json |
Audit history is in audits/league/{QB,RB,WR,TE,LT}. The original v1.0 baselines (data/baselines/<POS>.json) remain unchanged.

## Known discrepancies (repo vs this process, at time of writing)
- docs/weekly-update.md describes a **weekly** run after Monday night's game and covers **QB only**. The commissioner's cadence is every other Tuesday around 10 AM ET for all locked positions. That doc was left unedited (add-only); this file records the intended cadence.
- The ceiling-check code adds a min-sample and production-hit requirement beyond the plain "3 of 5" rule.
- push.sh (/workspace/push.sh, outside the repo) hard-codes `cd /workspace/gridiron-standard`, so pushes from a worktree must use an equivalent fast-forward-only push.
- README "Current bootstrap state" still lists LG / Pair Audit 3 as the current workflow.
- The TE and LT lock IDs carry UTC dates (20261104) for locks made on the evening of Nov 3 ET.

## Addendum 2026-11-03 (ET), card t47u / t50u
- Discrepancy 1 (cadence/scope) is **RESOLVED**. docs/weekly-update.md now has a 2026-11-03 addendum: every other Tuesday at about 10 AM ET from Nov 17, 2026, all locked positions, covering both weeks since the last run, proposals only.
- Discrepancy 4 (stale README) is **RESOLVED**. README "Current bootstrap state" now lists the five re-audit locks and says LG runs the full re-audit through the never-locked-position engine change.
