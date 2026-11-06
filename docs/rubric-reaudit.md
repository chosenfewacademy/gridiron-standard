# Rubric re-audit (t115u)

Commissioner order t115u, 2026-11-06, is an explicit current-data top-10 re-audit for every exact bucket. A locked file is no longer a reason to skip the position. It is also not evidence. Historical baselines stay where they are. This pass does not write a new baseline and does not lock anything.

## Rubric

`config/rating-rubric.json` is the checklist. Encoded today: style similarity, PFF as a citation rather than a rank, scarcity tiers, sourced tiebreaks, and EA ratings kept out of our numbers. Partial or missing: a league-wide evidence window (the numeric blend is QB weekly only), a recorded year split on each rank, a snap minimum (none is invented here), position weights from traits to overall, and uncertainty stored on the baseline rank.

Estimated Madden weights remain unverified. They are not the rubric.

## Mechanism

`src/top10-rerank.ts` reads the 22 lock pointers and the boards they name. A comparison counts only when it has a current-season window, a role, a declared adequate sample with a count, a non-EA source, and confidence above LOW. Prior-season context, a PFF grade used as the rank, an EA rating, a thin claim, or a 99 without written generational support stays unverified and does not move anyone.

Supported comparisons have to form one strict order. A tie or a cycle stays unresolved. Locked rank is not the tiebreak. A new top 10 is published only when that order covers ten players and the tenth is sourced ahead of the first player out. Anything less is a partial note. The other locked names are not copied in to fill the board.

## Coverage of this run

No current-data comparison file was in the tree, and none was fabricated. Independent position research running outside the repo was not copied from memory.

The request said 210 slots. The locked boards each list 10 players: 220 slots, 22 first-outs, and the external controls already stored on those boards. All 22 positions are `EVIDENCE_GAP`. Zero evidence-supported re-ranks. The audit trail is `data/reaudit-proposals/t115u-coverage.json`.

`npm run rubric:audit` prints the same counts. A later sourced packet can be passed to `buildLeagueReaudit` without editing the locked files.
