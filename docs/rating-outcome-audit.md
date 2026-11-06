# Rating-to-outcome audit

Date: 2026-11-06. Canonical cards were not edited. `config/madden-ovr-weights.estimated.json` remains unverified and is not a Madden 27 reproduction.

## What the repository already did

Philadelphia (46 cards, 49 depth slots) and Dallas (51 cards, 52 depth slots) live on the unmerged rating branches. Joe Milton III is Philadelphia QB1. Locked cards are copied, not rewritten. The estimated Madden overall check is a pre-check. `suggestFix` only proposes a shift. There was no matchup engine in the repo, so nothing in git was aiming at a final score.

Philadelphia's filled traits are per-player judgments with a written basis. College PFF grades are described as not copied onto NFL traits. Four low-sample cards (Willie Lampkin, Jake Majors, Micah Morris, Rocco Underwood) are explicit role bands around an overall. No Philadelphia pair trips the style rule (correlation of mean-centred attributes at least 0.95, or mean absolute difference at most 3).

Dallas's 40 new cards are different. Traits that were not given an explicit shape were `clamp(overall + position offset, 40, 89)`. That is 436 of 721 attribute values. Overall is an input there, not an output. Seven new-card pairs at the same position are too similar under the style rule. PFF team-table overalls sit in the basis text. Facet grades were not available and were not invented. A rounded overall sometimes equals an unrelated template trait. That is a collision with the offset, not a facet mapped onto the trait it describes.

The Dallas team figure in the rating audit is an unweighted mean of starter overalls. It is labeled as not a Madden team formula. A mean like that can still swamp a player if a game model uses it as the snap.

## What the local PHI at DAL engine showed

The attached local engine is diagnostic only. Its coefficients are not in this repository. Its 800-game rates are not targets, including the post-correction Dallas win rate of about 83 percent and Barkley's emergent yards per carry of about 5.63.

Before correction, the engine pinned Barkley near 4.05 yards per carry across blocking and contact shocks, and it stacked PFF, attribute formulas, and Philadelphia or player-name penalties. That is why an illustrative Monte Carlo sat near 96 percent Dallas. The attached engine file, after the correction described in the local audit, still has hand-set yardage and completion baselines, a light PFF term on top of attribute formulas, overall inside a defender weight that also uses pass-rush and block-shed, and name-conditioned kicker adjustments. Those are further reasons not to port the engine.

The post-correction sensitivities are the test requirement: a contact drop lowers the run outcome, a right-side block increase raises it, a disrupt drop raises it, accuracy and awareness move the throw, and throw power does not move the short completion. The pre-correction file is the picture of a pin. Neither file is a number the matchup function is supposed to hit.

## What this change adds

A read-only check on the stored cards moves the run margin from -8.5 to -14.125 when Barkley's contact traits drop 15 and the blockers and Quinnen Williams are left as stored. That margin is not yards per carry, and it is not fit to 4.07 or to 5.63.

`src/matchup-probability.ts` evaluates one mechanism at a time. Each listed attribute is read once, per player. PFF, overall, team, player name, and a yardage or win target are rejected. Throw power is a deep-throw mechanism, not a second term on completion. Scramble reads speed, acceleration, and run, not a name. Expected yards are the rating margin times a unit scale, with intercept 0. The scale is a test convention. It is not a league baseline and not yards per carry.

`src/outcome-contract.ts` fails a sample that does not move, moves the wrong way, or moves when the attribute is outside the mechanism. It also flags source text for a yards-per-carry target, a team gap penalty, a name-conditioned rate change, and a PFF term stacked on an attribute call.

`src/rating-evidence-rules.ts` rejects copying a PFF grade onto a trait, a template offset, a role band, or the estimated Madden weights as the source of a number. The Dallas offset table is a detector for the 2026-11-05 fill. It does not rate anyone.

## Limits

Absolute probabilities and the unit yard translation are not calibrated to NFL play-by-play or to the local engine. Equal attributes are defined as an even probability so tests have a fixed point. That is not a league completion rate. Play-calling, drive sequencing, and scoreboard totals are out of scope on purpose: a matchup probability is not a winner and not a final score. Fixing a high or low emergent yards-per-carry number has to be a new evidence argument, not a return of a 4.07 target, and it is not done here. Philadelphia and Dallas card values were not changed to suit any result.
