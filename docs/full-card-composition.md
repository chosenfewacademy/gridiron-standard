# Full-card composition and adjacent H2H audit (t115u)

Analyst orders and editorial overalls in `data/reaudit-proposals/incoming/` are starting evidence. They are not validated boards and not full-card rebuilds. Locked baselines and the Philadelphia and Dallas card files are not rewritten.

## Attributes

`src/gs-attribute-card.ts` lists the applicable attributes for a position. Skill and line positions use the Madden entry order without overall. Fullback and long snapper use the role lists in `config/position-metrics.json` (lead block and snap traits, not a borrowed skill card). Kicker and punter stay on kick power, kick accuracy, awareness, and the durability fields already on that entry order.

A rated cell needs an integer, a band, a confidence, a claim, and a non-EA source. An unrated cell is null. Zero is not a stand-in for unknown.

## Overall

`deriveOverall` reads the profile and nothing else. A rank or a target overall is rejected. If any applicable attribute is unrated, the summary is null. If every attribute is rated, the summary is the median of those values, labeled uncalibrated and not fit to rank. Estimated Madden weights are not used. A display that steps down with rank is flagged as rank-shaped. That pattern is how the attached rescores were built, so those numbers are not accepted as profile outputs.

Jaylen Warren's editorial display in the RB rescore is 92. The correction recorded here is 91. Kenneth Walker III stays 90. Neither number is an approved card.

## Head-to-head

`src/h2h-audit.ts` checks ten links on every proposed board: nine adjacent ranks and the cut from tenth to the first-out. A link supports the engine only when the blended comparison passes the existing source, sample, and confidence rules. LOW stays recorded and does not publish the board. A missing link or a packet that orders the pair the other way is counted. The audit file is `data/reaudit-proposals/t115u-h2h-audit.json`.

## Completion

The earlier queue treated all 242 players as unrated. That file is superseded by `data/reaudit-proposals/t115u-proposal-pack.json` (see `docs/proposal-pack-integration.md`). The older head-to-head file still describes the first comparison packet, including an LT board whose ten links cleared that packet. The proposal pack does not carry that LT result forward: LT is an audited gap with two medium-or-better links, and a LOW link does not decide a board.
