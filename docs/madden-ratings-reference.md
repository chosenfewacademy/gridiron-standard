# Madden ratings — REFERENCE ONLY

> **Not evidence. Not encoded.** Per AGENTS.md, EA ratings are controls only and OVR is an output of the
> attribute build. Nothing here is used by the rating engine, validator or gate, and no Madden OVR formula
> or attribute weighting is reconstructed or implemented in code. Use only to understand which attributes
> a position's evidence (config/position-metrics.json) informs.

## How EA sets ratings (public reporting)
- 0–99 scale; an Overall (OVR) plus dozens of attributes; set by EA's ratings team using film, production
  and tracking stats, scouting reports and human judgment. [League Station](https://www.leaguestation.com/guides/madden-ratings)
- EA adjusters have cited PFF, Next Gen Stats and Dane Brugler's draft guide as inputs; injury-driven drops are
  applied cautiously. [Boardroom](https://boardroom.tv/madden-nfl-ratings-explained/)
- Weekly adjuster notes feed rating moves; adjusters are expected to know what e.g. 94 vs 90 speed looks like.
  [ESPN](https://www.espn.co.uk/nfl/story/_/id/25527115/best-job-world-life-madden-nfl-ratings-adjuster)
- Ratings adjuster role (Chad Johnson) emphasizes production against comparable/elite opponents; individual
  adjustment influence ~1–2 points. [FOX Sports](https://www.foxsports.com/stories/nfl/qa-chad-ochocino-johnson-madden-ratings-world-cup-more),
  [NBC Sports](https://www.nbcsportsbayarea.com/nfl/chad-ochocinco-madden-ratings-adjuster/1953052/)

## OVR structure (as publicly described)
- OVR is position-specific: only certain attributes count for each position, with different weights.
  [Polygon, 2015 (EA's Donny Moore)](https://www.polygon.com/2015/2/24/8103603/madden-ratings-how-to-perfect-qb/)
- Community regressions (e.g. Madden 25 QB: throw power and awareness weighted most, then short/medium accuracy;
  kicker: awareness, kick power, kick accuracy only) and legacy editor documentation exist:
  [Madden School QB](https://www.madden-school.com/true-quarterback-ratings-madden-25/),
  [Madden School K](https://www.madden-school.com/how-a-kickers-overall-ratings-in-madden-25-is-determined/),
  [MaddenAmp legacy OVR notes](http://svn.code.sf.net/p/maddenamp/code/trunk/MaddenEditor/Docs/OVR_Ratings.txt),
  [r/Madden weightings guide](https://www.reddit.com/r/Madden/comments/9e6qlb/guide_overall_rating_attribute_weightings_for/).
  These are unofficial, edition-specific and deliberately **not** reproduced here.

## How this informs the project
- Qualitatively confirms the attribute families per bucket listed in docs/positions/*.md
  (passing accuracy/power for QB; blocking families for OL; coverage/pursuit for DB/LB; kick power/accuracy for K/P).
- Rule 4 (OVR is not a target) and Rule 11 (engine issues via sliders) stand: never tune attributes to hit an OVR.
