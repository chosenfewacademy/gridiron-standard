# Proposal pack integration (t115u)

Status: draft proposal. Not a lock. Not an accepted full card.

The file `data/reaudit-proposals/t115u-proposal-pack.json` is the attached research pack, byte for byte. `data/reaudit-proposals/t115u-validation.md` is the attached validation note. Neither file replaces `data/baselines/` or a Philadelphia or Dallas card.

## What a trait number is

A cell rating is an expert ordinal judgment tied to the claim and the cited URLs. It is not the output of a PFF formula, a Madden weight table, or a rank target. The source registry stores `id`, `url`, and `kind` only. Cells store `source_ids` plus the same URLs as strings. The card module's richer source object (`publisher`, `retrieved_at`) is not in this pack, so those fields are not invented. Every `source_id` resolves, and every cell URL is in the registry.

An unknown cell keeps `rating: null`. The claim says why it was not inferred. It is not stored as 0.

## Two different numbers

`overall_median_display` is the half-up median of the rated attributes on a complete profile (`floor(raw + 0.5)`). It is uncalibrated. It is not a league overall and not a rank.

`editorial_display_ovr` is the older display number. On the running-back board Kenneth Walker III is proposed #1 with editorial 90, and Jaylen Warren is #2 with editorial 91. That pair is not rewritten so that rank 1 has the higher display, and the medians (Walker 84, Warren 82) are not substituted for those displays. The conflict stays on the board record.

## Head-to-head

Each of the 22 boards has 10 pair records. FB and LS have no proposed order. A LOW link is recorded and does not decide the board. The earlier comparison-packet note that only LT was engine-supportable is not this pack. In this pack LT has two medium-or-better links, two Lower results, and is not an informal solid board. REDGE has one medium link and no Lower result; that thin margin is not treated as a core pass.

## Completion

242 players. 200 structurally complete. 42 partial. 0 queued. 3,756 populated attribute rows and 105 unknown cells, out of 3,861. 391 sources. `global_pass_boolean` is false. Style-similarity flags on complete cohorts are left for triage. No attribute was moved by a point to clear a flag.

`data/reaudit-proposals/t115u-page-manifest.json` is the compact page extract: board order, first-out, medians, editorial displays, style, composition, every cell, and the 10 head-to-head rows, with URLs in one source table. The full pack remains the downloadable source. The earlier all-unrated queue file is superseded by this pack.
