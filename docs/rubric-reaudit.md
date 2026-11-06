# Rubric re-audit (t115u)

Commissioner order t115u, 2026-11-06, is an explicit current-data top-10 re-audit for every exact bucket. A locked file is no longer a reason to skip the position. It is also not evidence. Historical baselines stay where they are. This pass does not write a new baseline and does not lock anything.

## Rubric

`config/rating-rubric.json` is the checklist. Encoded today: style similarity, PFF as a citation rather than a rank, scarcity tiers, sourced tiebreaks, and EA ratings kept out of our numbers. The established-season window is current performance primary plus completed prior seasons as context. A comparison may declare that blend as 2026 through Week 8 primary and completed 2025 context, with both shares and a sourced rationale. Those shares are not a fitted league coefficient and are not the QB weekly weights. 2025 alone cannot reorder. Still partial or missing: a snap minimum (none is invented here), position weights from traits to overall, uncertainty stored on the baseline rank, and the year split on the locked rank itself.

Estimated Madden weights remain unverified. They are not the rubric.

## Mechanism

`src/top10-rerank.ts` reads the 22 lock pointers and the boards they name. A comparison counts only when it has 2026 alone, or the declared 2026-through-Week-8 plus completed-2025 blend, plus a role, a declared adequate sample with a count, a non-EA source, and confidence above LOW. A blend also needs a rationale. Prior-season context alone, a PFF grade used as the rank, an EA rating, a thin claim, or a 99 without written generational support stays unverified and does not move anyone.

Supported comparisons are read as one relation, whether they arrive as a chain, as adjacent pairs along that order, or with extra forward edges. Every pair in the set has to be ordered. An unresolved pair or a cycle does not get the old rank as a tiebreak. A new top 10 is published only when that strict set contains at least ten players and the board's first-out. The player in eleventh is the evidence first-out. That player does not have to be the historical first-out, and does not need a direct edge from tenth if the order already reaches them. Anything less is a partial note. The other locked names are not copied in to fill the board.

## Coverage of this run

No current-data comparison file was in the tree, and none was fabricated. Independent position research running outside the repo was not copied from memory. The blend is available for a later packet. It does not, by itself, produce a rank.

The request said 210 slots. The locked boards each list 10 players: 220 slots, 22 first-outs, and the external controls already stored on those boards. All 22 positions are `EVIDENCE_GAP`. Zero evidence-supported re-ranks. The audit trail is `data/reaudit-proposals/t115u-coverage.json`.

`npm run rubric:audit` prints the same counts. A later sourced packet can be passed to `buildLeagueReaudit` without editing the locked files.
