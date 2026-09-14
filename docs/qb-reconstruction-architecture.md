# QB reconstruction architecture

This is the newly authorized reconstruction framework, not a recovered historical approved QB architecture or a change to the locked hierarchy. Governing Architecture/Methodology remain 1.0.0; the reconstruction contract has its own version 1.0.0. No player attributes have been generated.

The machine-readable definition is `config/qb-reconstruction-architecture.json`, validated by `qbArchitectureSchema` in `src/qb-reconstruction.ts`.

## Engine uncertainty and scope

All 19 requested QB attributes have analytical definitions below. This is the required QB reconstruction set, not a claim to enumerate every field in the Madden editor. Preserve any additional entered attributes in `supplemental_ratings`. The sequence below is analytical grouping, never a verified input order.

Exact Madden 27 engine effects and material OVR contributions are **UNVERIFIED for every attribute**. Gameplay-effect descriptions are intended semantics and empirical test questions, not verified formulas. The gameplay-identity classification describes analytical role only; it does not establish that an attribute has zero OVR impact. EA documents awareness-driven CPU processing and separate decision tendencies for Madden 26; this does not establish Madden 27 weights. [EA gameplay documentation](https://www.ea.com/games/madden-nfl/madden-nfl-26/news/madden-26-gridiron-notes-gameplay-deep-dive).

## Governing principles

- Preserve the locked hierarchy and target OVR; never inflate unrelated traits to match it.
- Use the existing season-phase-aware Full Audit gate without weakening evidence standards.
- Evaluate each trait independently, explain why not higher/lower, and preserve evidenced weaknesses.
- Same-OVR players require distinct supported builds; archetypes describe completed cards.
- Use exact-trait 90/95/97/99 standards; never prescribe a quota or normalize every elite QB upward.
- Explicit user approval is required for every transition beyond PROPOSED in this reconstruction workflow.
- No engine formula, editor order, or historical full-card values are inferred.

## Evidence domains

- **arm_strength:** Evaluate usable velocity/distance separately from downfield placement.
- **short_accuracy:** Chart short placement by difficulty, throw type and sample.
- **intermediate_accuracy:** Chart intermediate windows, anticipation and placement.
- **deep_accuracy:** Chart deep placement with separation, pressure and sample uncertainty.
- **pressure_performance:** Separate execution under pressure from protection and decisions.
- **pocket_movement:** Evaluate footwork, spatial awareness and platform recovery without conflating contact escapes.
- **sack_avoidance:** Separate pressure avoidance, decisions, protection, release and actual sack-contact breaks.
- **processing_decision_making:** Evaluate reads, anticipation, risk and situational decisions; reputation is context only.
- **play_action:** Separate fake execution from scheme-generated production.
- **throws_on_run:** Evaluate passing while moving by direction, platform and depth; rushing is not a substitute.
- **scrambling:** Separate unplanned rushing decisions, space creation, speed and outcomes.
- **designed_rushing:** Separate designed carries and sneaks from scrambles/kneeldowns; control for blocking and opportunities.
- **ball_security:** Separate carrying fumbles, strip sacks and exchange failures from interceptions.
- **durability:** Use sourced injury history and exposure without diagnosing or inventing medical certainty.
- **workload_availability:** Account for snaps, practice, role, missed time, rest and current readiness.
- **consistency:** Track repeatability and trend over meaningful samples; do not duplicate total production.
- **opponent_context_adjustments:** Record opponent quality, coverage, protection, receivers, scheme, game state, weather and sample differences; no invented adjustment coefficients.

## Attribute contracts

### THP

**Football meaning:** Ball velocity and usable distance from repeatable quarterback mechanics.

**Intended gameplay effect (unverified):** Intended to represent throwing power; exact velocity/distance response must be measured.

**Support:** Contextual film of far-hash and deep throws; Measured ball velocity with method and release context.

**Never substitute:** Passing yards or deep completions alone; Arm size, reputation or desired OVR.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** DAC, RUN, STR. Core QB execution/processing dimension in this analytical framework; material OVR impact must be established empirically. OVR materiality: **UNVERIFIED**.

- **90+:** THP: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** THP: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** THP: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** THP: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### SAC

**Football meaning:** Placement and repeatability on short-area throws, separating target difficulty from completion outcome.

**Intended gameplay effect (unverified):** Intended short-pass placement component; engine distance cutoffs remain unverified.

**Support:** Depth-binned on-target placement with attempts; Film separating screens, leverage, drops and throwaways.

**Never substitute:** Raw completion percentage alone; Receiver yards after catch.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** AWR, TUP, RUN. Core QB execution/processing dimension in this analytical framework; material OVR impact must be established empirically. OVR materiality: **UNVERIFIED**.

- **90+:** SAC: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** SAC: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** SAC: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** SAC: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### MAC

**Football meaning:** Placement through intermediate windows with timing, anticipation and coverage context.

**Intended gameplay effect (unverified):** Intended intermediate-pass placement component; no assumed numerical distance boundary.

**Support:** Intermediate placement and catchable-ball charting; Timing/window film with route and coverage context.

**Never substitute:** SAC extrapolation; Unadjusted yards per attempt.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** AWR, THP, TUP. Core QB execution/processing dimension in this analytical framework; material OVR impact must be established empirically. OVR materiality: **UNVERIFIED**.

- **90+:** MAC: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** MAC: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** MAC: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** MAC: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### DAC

**Football meaning:** Downfield placement on appropriately difficult throws over a meaningful sample.

**Intended gameplay effect (unverified):** Intended deep-pass placement component; do not treat arm strength as accuracy.

**Support:** Deep on-target and completion-over-expectation splits with sample; Film of ball location, separation and pressure.

**Never substitute:** Longest completion; Highlight throws or THP alone.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** THP, AWR, TUP. Core QB execution/processing dimension in this analytical framework; material OVR impact must be established empirically. OVR materiality: **UNVERIFIED**.

- **90+:** DAC: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** DAC: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** DAC: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** DAC: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### RUN

**Football meaning:** Passing mechanics and placement while moving, distinct from running ability.

**Intended gameplay effect (unverified):** Intended accuracy while throwing on the move; movement and animation interactions require observation.

**Support:** On-the-move versus set-feet placement splits; Film by direction, platform, depth and difficulty.

**Never substitute:** Rushing yards; Speed or scrambling frequency.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** SAC, MAC, DAC, AGI. Core QB execution/processing dimension in this analytical framework; material OVR impact must be established empirically. OVR materiality: **UNVERIFIED**.

- **90+:** RUN: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** RUN: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** RUN: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** RUN: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### TUP

**Football meaning:** Preserving throwing execution under actual defensive pressure.

**Intended gameplay effect (unverified):** Intended pressure-related throwing execution modifier; exact triggers are unverified.

**Support:** Pressured versus clean placement/efficiency and attempt counts; Film distinguishing pressure, decision errors and disrupted mechanics.

**Never substitute:** Low sack totals; Team pass protection or clean-pocket performance.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** AWR, BSK, SAC, MAC, DAC. Core QB execution/processing dimension in this analytical framework; material OVR impact must be established empirically. OVR materiality: **UNVERIFIED**.

- **90+:** TUP: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** TUP: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** TUP: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** TUP: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### PAC

**Football meaning:** Selling run action and executing the fake-to-pass sequence.

**Intended gameplay effect (unverified):** Intended play-action execution quality; no assumed defender reaction probability.

**Support:** Film of fake execution and timing; Play-action versus non-play-action splits adjusted for design and protection.

**Never substitute:** Play-action EPA alone; Strong running game or coaching scheme.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** AWR, SAC, MAC. Core QB execution/processing dimension in this analytical framework; material OVR impact must be established empirically. OVR materiality: **UNVERIFIED**.

- **90+:** PAC: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** PAC: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** PAC: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** PAC: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### BSK

**Football meaning:** Escaping or breaking contact that would otherwise become a sack.

**Intended gameplay effect (unverified):** Intended resistance to sack contact; distinct from avoiding initial pressure.

**Support:** Charted broken sacks/contact escapes per opportunity; Film of contacted versus untouched escapes.

**Never substitute:** Low sack rate alone; SPD or offensive-line strength.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** STR, AGI, AWR, TUP. Core QB execution/processing dimension in this analytical framework; material OVR impact must be established empirically. OVR materiality: **UNVERIFIED**.

- **90+:** BSK: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** BSK: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** BSK: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** BSK: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### AWR

**Football meaning:** Current processing, anticipation, risk selection and situational decisions.

**Intended gameplay effect (unverified):** Intended CPU processing/decision component; EA documents AWR processing in Madden 26, not verified Madden 27 weights.

**Support:** Progression and coverage-recognition film; Decision/timing and mistake charting adjusted for system/opponent.

**Never substitute:** Age or career starts alone; Wins, reputation, raw intelligence claims or OVR gap.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** TUP, PAC, SAC, MAC. Core QB execution/processing dimension in this analytical framework; material OVR impact must be established empirically. OVR materiality: **UNVERIFIED**.

- **90+:** AWR: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** AWR: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** AWR: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** AWR: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### SPD

**Football meaning:** Sustainable movement speed during relevant football actions.

**Intended gameplay effect (unverified):** Intended locomotion top-speed component; no time-to-rating formula assumed.

**Support:** Recent tracking speed with opportunity context; Film cross-checks and dated timed runs with age/injury limitations.

**Never substitute:** Total rushing yards; An old combine time without current corroboration.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** ACC, AGI, STA. Primarily movement, physical or availability identity in this analytical framework; this is not a claim of zero OVR effect. OVR materiality: **UNVERIFIED**.

- **90+:** SPD: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** SPD: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** SPD: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** SPD: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### ACC

**Football meaning:** How quickly useful running speed is reached from a start or restart.

**Intended gameplay effect (unverified):** Intended acceleration response rather than maximum speed.

**Support:** Short split/tracking acceleration with measurement method; Pocket exit and first-step film.

**Never substitute:** Top speed alone; Forty-yard time without splits.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** SPD, AGI, COD. Primarily movement, physical or availability identity in this analytical framework; this is not a claim of zero OVR effect. OVR materiality: **UNVERIFIED**.

- **90+:** ACC: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** ACC: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** ACC: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** ACC: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### AGI

**Football meaning:** Body control, fluidity and balance during movement.

**Intended gameplay effect (unverified):** Intended movement/body-control quality; exact animation coupling is unverified.

**Support:** Film of controlled movement and recovery of balance; Repeatable movement testing with current context.

**Never substitute:** Speed or rushing volume alone; COD treated as an identical trait.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** ACC, COD, RUN, BSK. Primarily movement, physical or availability identity in this analytical framework; this is not a claim of zero OVR effect. OVR materiality: **UNVERIFIED**.

- **90+:** AGI: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** AGI: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** AGI: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** AGI: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### COD

**Football meaning:** Braking and redirecting efficiently while preserving control.

**Intended gameplay effect (unverified):** Intended direction-change responsiveness; not a duplicate of straight-line speed.

**Support:** Tracking/film of deceleration and redirection; Dated change-direction testing with limitations.

**Never substitute:** Top speed; Generic athletic reputation.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** AGI, ACC, SPD. Primarily movement, physical or availability identity in this analytical framework; this is not a claim of zero OVR effect. OVR materiality: **UNVERIFIED**.

- **90+:** COD: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** COD: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** COD: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** COD: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### STR

**Football meaning:** Functional force and resistance to displacement in quarterback actions.

**Intended gameplay effect (unverified):** Intended physical-strength input in contact interactions; no OVR or animation weights assumed.

**Support:** Contact and leverage film; Relevant measured strength and body context.

**Never substitute:** Throw power alone; Body weight, size or sneak conversion alone.

**Expected confidence:** Often LOW/MEDIUM until direct contemporary evidence is available. Do not invent precision; LOW blocks validation. HIGH exact-trait support is required for 90+.

**Interactions:** BSK, CAR. Primarily movement, physical or availability identity in this analytical framework; this is not a claim of zero OVR effect. OVR materiality: **UNVERIFIED**.

- **90+:** STR: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** STR: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** STR: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** STR: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### CAR

**Football meaning:** Securing the ball through carries, scrambles and contact.

**Intended gameplay effect (unverified):** Intended ball-security component; no fumble probability formula assumed.

**Support:** Fumbles per carry/contact with context; Film separating strip sacks, exchange errors and rushing fumbles.

**Never substitute:** Interceptions; Fumbles lost alone or low-volume zero fumbles.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** AWR, STR, BSK. Primarily movement, physical or availability identity in this analytical framework; this is not a claim of zero OVR effect. OVR materiality: **UNVERIFIED**.

- **90+:** CAR: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** CAR: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** CAR: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** CAR: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### JMP

**Football meaning:** Explosive vertical reach and body control in jumping actions.

**Intended gameplay effect (unverified):** Intended jumping/reach capability; exact QB gameplay sensitivity unverified.

**Support:** Measured jump testing with date and methodology; Current film of vertical actions where available.

**Never substitute:** Jump-pass completion; Height or generic athleticism.

**Expected confidence:** Often LOW/MEDIUM until direct contemporary evidence is available. Do not invent precision; LOW blocks validation. HIGH exact-trait support is required for 90+.

**Interactions:** STR, AGI. Primarily movement, physical or availability identity in this analytical framework; this is not a claim of zero OVR effect. OVR materiality: **UNVERIFIED**.

- **90+:** JMP: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** JMP: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** JMP: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** JMP: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### INJ

**Football meaning:** Current susceptibility to unavailable playing time, with exposure and diagnosis context.

**Intended gameplay effect (unverified):** Intended injury-susceptibility dimension; injury probabilities and recovery mapping unverified.

**Support:** Official injury/practice and availability history; Exposure-adjusted absences separating injury from rest.

**Never substitute:** Age alone; Playing through pain as proof of low injury risk.

**Expected confidence:** Often LOW/MEDIUM until direct contemporary evidence is available. Do not invent precision; LOW blocks validation. HIGH exact-trait support is required for 90+.

**Interactions:** STA, TGH. Primarily movement, physical or availability identity in this analytical framework; this is not a claim of zero OVR effect. OVR materiality: **UNVERIFIED**.

- **90+:** INJ: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** INJ: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** INJ: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** INJ: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### STA

**Football meaning:** Capacity to sustain repeated physical execution under workload.

**Intended gameplay effect (unverified):** Intended fatigue/endurance dimension; exact drain and recovery rates unverified.

**Support:** Snap/workload and late-game mechanics trends; Repeated-effort evidence accounting for heat, pace and role.

**Never substitute:** Games started alone; High INJ or perceived toughness.

**Expected confidence:** Aim for HIGH from independent contextual evidence and sufficient sample. MEDIUM requires explicit review; LOW blocks validation. HIGH is required for 90+.

**Interactions:** SPD, ACC, TGH. Primarily movement, physical or availability identity in this analytical framework; this is not a claim of zero OVR effect. OVR materiality: **UNVERIFIED**.

- **90+:** STA: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** STA: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** STA: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** STA: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

### TGH

**Football meaning:** Documented resilience and recovery context, distinct from injury susceptibility or motivation.

**Intended gameplay effect (unverified):** Intended toughness/recovery-related identity; precise current engine effect remains unverified.

**Support:** Documented recovery/return-to-workload context; Corroborated football availability evidence with medical uncertainty preserved.

**Never substitute:** Moral judgments about playing hurt; Unsupported pain tolerance or injury-risk assumptions.

**Expected confidence:** Often LOW/MEDIUM until direct contemporary evidence is available. Do not invent precision; LOW blocks validation. HIGH exact-trait support is required for 90+.

**Interactions:** INJ, STA. Primarily movement, physical or availability identity in this analytical framework; this is not a claim of zero OVR effect. OVR materiality: **UNVERIFIED**.

- **90+:** TGH: Demonstrably elite exact-trait performance against relevant league peers, supported by a meaningful sample.
- **95+:** TGH: Rare league-defining exact-trait evidence; high confidence and explicit peer separation required.
- **97+:** TGH: Extraordinary league-defining exact-trait evidence with sustained separation; not a reputation award.
- **99+:** TGH: Historically exceptional/generational exact-trait evidence with explicit historical comparison; never an overall-player award.

## Coherence and empirical sensitivity review

Check THP against DAC without forcing correlation; compare RUN to set-feet accuracy at the same depth; separate TUP execution from AWR decisions and BSK contact escape; separate SPD/ACC/AGI/COD movement roles; keep CAR independent of interceptions; distinguish INJ, STA and TGH. An apparent inconsistency requires source review, not an automatic numerical correction. A strong player must retain supported weaknesses. Same-OVR cards with identical full trait builds trigger review rather than invented differences.

No OVR-sensitive attribute hierarchy is asserted yet. Empirical sensitivity experiments must hold the full entered card, game build, platform, mode, roster context and settings constant, and document each observed change. Experiments may identify engine behavior but cannot justify unsupported football ratings. Engine defects belong to gameplay testing/sliders, not artificial attribute edits.

