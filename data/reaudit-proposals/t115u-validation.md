# Top-10 full-profile audit — integration validation

**STATUS: DRAFT SNAPSHOT — NOT ACCEPTED LOCK**

Generated: 2026-11-05 23:21:03 America/New_York

Integrator owns only `validation.md` + `final.json`. Live `skill-passing.md` and `box-coverage.md` were **not** edited (research active). Snapshots under `integration/snapshots/` with hashes below.

Median policy: **display = half-up** (`floor(raw+0.5)`), **raw retained** on each complete record. Aligns with repo `summarizeProfile` / `Math.round` mid-average. Do not fake the original raw metric.

**structural_blocking_clean = True**; **global_pass_boolean = False** (PASS only when every position has zero blocking parse/cell/median/source/band errors; style/mechanical/H2H-Lower tensions are nonblocking).

## Absolute audit statistics (this rebuild)

- Snapshot **exact live match**: yes (all 4)
- Structurally complete: **200** / 200 expected (skill 44 + trench 88 + specialists 39 + box 29)
- `structural_blocking_clean`: **True** (thin/invalid/median-blocking = 0)
- `global_pass_boolean`: **False** — reasons: ['intentional_order_holds_FB_LS', 'unresolved_style_flags', 'not_all_boards_solid_informal', 'no_validated_lock_acceptance']
- Unresolved MEDIUM+ Lower contradictions: **0** (box sixth-pass flips applied)
- Informal BOARD_SOLID (not locks): QB, RB, WR, TE, MIKE, K, P — not P-only
- FB/LS `proposed_order`: null (intentional)
- Half-up claim lag (nonblocking): K×3, FS×1 — display half-up retained with raw; claimed trunc not invented away
- Export: `proposal-pack.json` **2827080** bytes; source_registry + full cells; Warren editorial 92→91 correction carried; **no new rank-shaped OVR**
- Style complete-cohort flags remain unresolved (not factual pass)

## Snapshot hashes

| file | bytes | md5 |
|---|---:|---|
| skill-passing.md | 291771 | `ac2b8d4c78239489c8cd6634804dbc07` |
| trench-front.md | 741204 | `5173ddc3bff0a8ec79b9a89bcff5e3e0` |
| box-coverage.md | 466209 | `371ddc0c36d579aa5e19c5a3a7b7870b` |
| specialists.md | 111283 | `6aa2f3e7e944d5dde3538f91c2df0e67` |

## Completion counts (recomputed; not invented)

- Positions: **22** / 22
- Players extracted: **242** / 242 expected
- Structurally complete (all attrs rated + valid + median half-up OK): **200**
- Claimed COMPLETE_* status labels: **200**
- Partial / queued: 42 / 0
- Positions with **blocking** errors: **0**
- Positions BOARD_SOLID informal: **7** (none are locks)
- Mechanical-anchor flag positions: (none)

| POS | players | struct_complete | claimed | partial | h2hs | FO | board_status | pass? | blocking | nonblocking |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|
| QB | 11 | 11 | 11 | 0 | 10 | Patrick Mahomes | `BOARD_SOLID_INFORMAL_PROPOSAL` | True | — | STYLE_TOO_SIMILAR_COMPLETE |
| RB | 11 | 11 | 11 | 0 | 10 | Jonathan Taylor | `BOARD_SOLID_INFORMAL_PROPOSAL` | True | — | — |
| WR | 11 | 11 | 11 | 0 | 10 | Justin Jefferson | `BOARD_SOLID_INFORMAL_PROPOSAL` | True | — | — |
| TE | 11 | 11 | 11 | 0 | 10 | Brenton Strange | `BOARD_SOLID_INFORMAL_PROPOSAL` | True | — | STYLE_TOO_SIMILAR_COMPLETE |
| LT | 11 | 11 | 11 | 0 | 10 | Paris Johnson Jr. | `audited_candidate_gaps` | True | — | STYLE_TOO_SIMILAR_COMPLETE,LOW_LOWER_RECORDED_NO_MOVE,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| LG | 11 | 11 | 11 | 0 | 10 | Isaac Seumalo | `audited_candidate_gaps` | True | — | STYLE_TOO_SIMILAR_COMPLETE,LOW_LOWER_RECORDED_NO_MOVE,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| C | 11 | 11 | 11 | 0 | 10 | Cooper Beebe | `audited_candidate_gaps` | True | — | STYLE_TOO_SIMILAR_COMPLETE,LOW_LOWER_RECORDED_NO_MOVE,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| RG | 11 | 11 | 11 | 0 | 10 | Mike Onwenu | `audited_candidate_gaps` | True | — | STYLE_TOO_SIMILAR_COMPLETE,LOW_LOWER_RECORDED_NO_MOVE,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| RT | 11 | 11 | 11 | 0 | 10 | Zach Bako-Bewele | `audited_candidate_gaps` | True | — | STYLE_TOO_SIMILAR_COMPLETE,LOW_LOWER_RECORDED_NO_MOVE,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| LEDGE | 11 | 11 | 11 | 0 | 10 | Tuli Tuipulotu | `audited_candidate_gaps` | True | — | STYLE_TOO_SIMILAR_COMPLETE,LOW_LOWER_RECORDED_NO_MOVE,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| REDGE | 11 | 11 | 11 | 0 | 10 | Al-Quadin Muhammad | `audited_candidate_gaps` | True | — | STYLE_TOO_SIMILAR_COMPLETE,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| DT | 11 | 11 | 11 | 0 | 10 | Jalen Redmond | `audited_candidate_gaps` | True | — | STYLE_TOO_SIMILAR_COMPLETE,LOW_LOWER_RECORDED_NO_MOVE,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| MIKE | 11 | 9 | 9 | 2 | 10 | Cedric Gray | `BOARD_SOLID_INFORMAL_PROPOSAL` | True | — | LOW_LOWER_RECORDED_NO_MOVE,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| WILL | 11 | 7 | 7 | 4 | 10 | Demario Davis | `audited_candidate_gaps` | True | — | LOW_LOWER_RECORDED_NO_MOVE,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| SAM | 11 | 3 | 3 | 8 | 10 | E.J. Speed | `audited_candidate_gaps` | True | — | LOW_LOWER_RECORDED_NO_MOVE,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| CB | 11 | 6 | 6 | 5 | 10 | Mike Jackson | `audited_candidate_gaps` | True | — | LOW_LOWER_RECORDED_NO_MOVE,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| FS | 11 | 4 | 4 | 7 | 10 | Thomas Harper | `audited_candidate_gaps` | True | — | HALF_UP_CLAIM_LAG,LOW_LOWER_RECORDED_NO_MOVE,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| SS | 11 | 0 | 0 | 11 | 10 | Jaylinn Hawkins | `audited_candidate_gaps` | True | — | LOW_LOWER_RECORDED_NO_MOVE |
| K | 11 | 11 | 11 | 0 | 10 | Eddy Pineiro | `BOARD_SOLID_INFORMAL_PROPOSAL` | True | — | HALF_UP_CLAIM_LAG,STYLE_TOO_SIMILAR_COMPLETE_EXPECTED_LOW_DIM |
| P | 11 | 11 | 11 | 0 | 10 | Bryan Anger | `BOARD_SOLID_INFORMAL_PROPOSAL` | True | — | STYLE_TOO_SIMILAR_COMPLETE_EXPECTED_LOW_DIM,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| FB | 11 | 6 | 6 | 5 | 10 | Brady Russell | `audited_candidate_gaps` | True | — | PROPOSED_ORDER_NULL,STYLE_TOO_SIMILAR_COMPLETE,STYLE_TOO_SIMILAR_PARTIAL,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |
| LS | 11 | 11 | 11 | 0 | 10 | Joe Cardona | `audited_candidate_gaps` | True | — | PROPOSED_ORDER_NULL,STYLE_TOO_SIMILAR_COMPLETE_EXPECTED_LOW_DIM,COMPLETE_BUT_LOW_TRAIT_EVIDENCE |

## Live vs snapshot (research-active files)

| file | snapshot_md5 | live_md5_at_report | match |
|---|---|---|---|
| skill-passing.md | `ac2b8d4c78239489c8cd6634804dbc07` | `ac2b8d4c78239489c8cd6634804dbc07` | True |
| trench-front.md | `5173ddc3bff0a8ec79b9a89bcff5e3e0` | `5173ddc3bff0a8ec79b9a89bcff5e3e0` | True |
| box-coverage.md | `371ddc0c36d579aa5e19c5a3a7b7870b` | `371ddc0c36d579aa5e19c5a3a7b7870b` | True |
| specialists.md | `6aa2f3e7e944d5dde3538f91c2df0e67` | `6aa2f3e7e944d5dde3538f91c2df0e67` | True |

_Box may keep changing under an active research agent; this report validates the frozen start snapshot only and does not edit skill/box._

## Skill method issues (actual from snapshot)

Skill-passing was not edited. Blocking INVALID_CELLS here are almost entirely `thin_rationale` (<20 chars, repo claim floor). Counts are actual extracted, not invented.

- **QB**: no INVALID_CELLS blocker
- **RB**: no INVALID_CELLS blocker
- **WR**: no INVALID_CELLS blocker
- **TE**: no INVALID_CELLS blocker

## DT board chain check

- proposed_order #10: `Alim McNeill`
- first_out: `Jalen Redmond`
- expected current: Alim McNeill #10 / Jalen Redmond FO — match=True
- pair 9v10: Poona Ford vs Alim McNeill → Higher/LOW
- pair 10vFO: Alim McNeill vs Jalen Redmond → Higher/MEDIUM

## Blocking errors (parse / cell / median / source / band)

_No blocking errors._

## Nonblocking issues (method / style / H2H tensions)

### QB — `STYLE_TOO_SIMILAR_COMPLETE`

```json
{
  "code": "STYLE_TOO_SIMILAR_COMPLETE",
  "count": 3,
  "samples": [
    {
      "a": "Drake Maye",
      "b": "Trevor Lawrence",
      "corr": 0.842,
      "mad": 2.4,
      "n_overlap": 19,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "THP",
        "SAC",
        "MAC",
        "DAC",
        "RUN",
        "TUP",
        "PAC",
        "BSK",
        "CAR",
        "JMP",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "QB"
    },
    {
      "a": "Trevor Lawrence",
      "b": "Patrick Mahomes",
      "corr": 0.751,
      "mad": 2.6,
      "n_overlap": 19,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "THP",
        "SAC",
        "MAC",
        "DAC",
        "RUN",
        "TUP",
        "PAC",
        "BSK",
        "CAR",
        "JMP",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "QB"
    },
    {
      "a": "Dak Prescott",
      "b": "C.J. Stroud",
      "corr": 0.847,
      "mad": 2.7,
      "n_overlap": 19,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "THP",
        "SAC",
        "MAC",
        "DAC",
        "RUN",
        "TUP",
        "PAC",
        "BSK",
        "CAR",
        "JMP",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "QB"
    }
  ],
  "expected_low_dim": false
}
```

### TE — `STYLE_TOO_SIMILAR_COMPLETE`

```json
{
  "code": "STYLE_TOO_SIMILAR_COMPLETE",
  "count": 1,
  "samples": [
    {
      "a": "T.J. Hockenson",
      "b": "Hunter Henry",
      "corr": 0.813,
      "mad": 2.9,
      "n_overlap": 22,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "CTH",
        "CIT",
        "SPC",
        "SRR",
        "MRR",
        "DRR",
        "RLS",
        "JMP",
        "CAR",
        "BTK",
        "RBK",
        "IBL",
        "PBK",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "TE"
    }
  ],
  "expected_low_dim": false
}
```

### LT — `STYLE_TOO_SIMILAR_COMPLETE`

```json
{
  "code": "STYLE_TOO_SIMILAR_COMPLETE",
  "count": 3,
  "samples": [
    {
      "a": "Trent Williams",
      "b": "Tristan Wirfs",
      "corr": 0.856,
      "mad": 1.9,
      "n_overlap": 17,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "STR",
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "AWR",
        "PBK",
        "PBP",
        "PBF",
        "RBK",
        "RBP",
        "RBF",
        "IBL",
        "LBK",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "LT"
    },
    {
      "a": "Jordan Mailata",
      "b": "Dion Dawkins",
      "corr": 0.896,
      "mad": 1.9,
      "n_overlap": 17,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "STR",
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "AWR",
        "PBK",
        "PBP",
        "PBF",
        "RBK",
        "RBP",
        "RBF",
        "IBL",
        "LBK",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "LT"
    },
    {
      "a": "Alaric Jackson",
      "b": "Dion Dawkins",
      "corr": 0.88,
      "mad": 2.9,
      "n_overlap": 17,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "STR",
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "AWR",
        "PBK",
        "PBP",
        "PBF",
        "RBK",
        "RBP",
        "RBF",
        "IBL",
        "LBK",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "LT"
    }
  ],
  "expected_low_dim": false
}
```

### LT — `LOW_LOWER_RECORDED_NO_MOVE`

```json
{
  "code": "LOW_LOWER_RECORDED_NO_MOVE",
  "count": 2,
  "pairs": [
    {
      "pair_index": 2,
      "pair": [
        "Jordan Mailata",
        "Tristan Wirfs"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    },
    {
      "pair_index": 8,
      "pair": [
        "Charles Cross",
        "Dion Dawkins"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    }
  ]
}
```

### LT — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Trent Williams",
    "Jordan Mailata",
    "Tristan Wirfs",
    "Garett Bolles",
    "Andrew Thomas",
    "Alaric Jackson",
    "Bernhard Raimann",
    "Charles Cross",
    "Dion Dawkins",
    "Paris Johnson Jr."
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### LG — `STYLE_TOO_SIMILAR_COMPLETE`

```json
{
  "code": "STYLE_TOO_SIMILAR_COMPLETE",
  "count": 1,
  "samples": [
    {
      "a": "Quenton Nelson",
      "b": "Damien Lewis",
      "corr": 0.958,
      "mad": 6.5,
      "n_overlap": 17,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "STR",
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "AWR",
        "PBK",
        "PBP",
        "PBF",
        "RBK",
        "RBP",
        "RBF",
        "IBL",
        "LBK",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "LG"
    }
  ],
  "expected_low_dim": false
}
```

### LG — `LOW_LOWER_RECORDED_NO_MOVE`

```json
{
  "code": "LOW_LOWER_RECORDED_NO_MOVE",
  "count": 1,
  "pairs": [
    {
      "pair_index": 6,
      "pair": [
        "Christian Mahogany",
        "Tyler Smith"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    }
  ]
}
```

### LG — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Quenton Nelson",
    "Damien Lewis",
    "Joe Thuney",
    "Steve Avila",
    "Peter Skoronski",
    "Dylan Parham",
    "Christian Mahogany",
    "Tyler Smith",
    "Matthew Bergeron",
    "Ezra Cleveland",
    "Isaac Seumalo"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### C — `STYLE_TOO_SIMILAR_COMPLETE`

```json
{
  "code": "STYLE_TOO_SIMILAR_COMPLETE",
  "count": 1,
  "samples": [
    {
      "a": "Zach Frazier",
      "b": "Cooper Beebe",
      "corr": 0.828,
      "mad": 2.8,
      "n_overlap": 17,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "STR",
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "AWR",
        "PBK",
        "PBP",
        "PBF",
        "RBK",
        "RBP",
        "RBF",
        "IBL",
        "LBK",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "C"
    }
  ],
  "expected_low_dim": false
}
```

### C — `LOW_LOWER_RECORDED_NO_MOVE`

```json
{
  "code": "LOW_LOWER_RECORDED_NO_MOVE",
  "count": 3,
  "pairs": [
    {
      "pair_index": 1,
      "pair": [
        "Zach Frazier",
        "Aaron Brewer"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    },
    {
      "pair_index": 3,
      "pair": [
        "Coleman Shelton",
        "Tyler Linderbaum"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    },
    {
      "pair_index": 8,
      "pair": [
        "Juice Scruggs",
        "Jake Brendel"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    }
  ]
}
```

### C — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Zach Frazier",
    "Aaron Brewer",
    "Coleman Shelton",
    "Tyler Linderbaum",
    "Erik McCoy",
    "Luke Wattenberg",
    "Ryan Neuzil",
    "Juice Scruggs",
    "Jake Brendel",
    "Cooper Beebe"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### RG — `STYLE_TOO_SIMILAR_COMPLETE`

```json
{
  "code": "STYLE_TOO_SIMILAR_COMPLETE",
  "count": 1,
  "samples": [
    {
      "a": "Trey Smith",
      "b": "Mike Onwenu",
      "corr": 0.946,
      "mad": 2.5,
      "n_overlap": 17,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "STR",
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "AWR",
        "PBK",
        "PBP",
        "PBF",
        "RBK",
        "RBP",
        "RBF",
        "IBL",
        "LBK",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "RG"
    }
  ],
  "expected_low_dim": false
}
```

### RG — `LOW_LOWER_RECORDED_NO_MOVE`

```json
{
  "code": "LOW_LOWER_RECORDED_NO_MOVE",
  "count": 2,
  "pairs": [
    {
      "pair_index": 5,
      "pair": [
        "Joe Tippmann",
        "Sam Cosmi"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    },
    {
      "pair_index": 9,
      "pair": [
        "Dominick Puni",
        "Mike Onwenu"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    }
  ]
}
```

### RG — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Chris Lindstrom",
    "Quinn Meinerz",
    "Jonah Jackson",
    "Tyler Booker",
    "Dalton Risner",
    "Joe Tippmann",
    "Sam Cosmi",
    "Trey Smith",
    "Mason McCormick",
    "Dominick Puni",
    "Mike Onwenu"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### RT — `STYLE_TOO_SIMILAR_COMPLETE`

```json
{
  "code": "STYLE_TOO_SIMILAR_COMPLETE",
  "count": 1,
  "samples": [
    {
      "a": "Armand Membou",
      "b": "Zach Bako-Bewele",
      "corr": 0.69,
      "mad": 2.7,
      "n_overlap": 17,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "STR",
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "AWR",
        "PBK",
        "PBP",
        "PBF",
        "RBK",
        "RBP",
        "RBF",
        "IBL",
        "LBK",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "RT"
    }
  ],
  "expected_low_dim": false
}
```

### RT — `LOW_LOWER_RECORDED_NO_MOVE`

```json
{
  "code": "LOW_LOWER_RECORDED_NO_MOVE",
  "count": 3,
  "pairs": [
    {
      "pair_index": 0,
      "pair": [
        "Darnell Wright",
        "Colton McKivitz"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    },
    {
      "pair_index": 3,
      "pair": [
        "Abraham Lucas",
        "Joe Alt"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    },
    {
      "pair_index": 9,
      "pair": [
        "Jermaine Eluemunor",
        "Zach Bako-Bewele"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    }
  ]
}
```

### RT — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Darnell Wright",
    "Colton McKivitz",
    "Brian O'Neill",
    "Abraham Lucas",
    "Joe Alt",
    "Warren McClendon Jr.",
    "Luke Goedeke",
    "Armand Membou",
    "Spencer Brown",
    "Jermaine Eluemunor",
    "Zach Bako-Bewele"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### LEDGE — `STYLE_TOO_SIMILAR_COMPLETE`

```json
{
  "code": "STYLE_TOO_SIMILAR_COMPLETE",
  "count": 5,
  "samples": [
    {
      "a": "Greg Rousseau",
      "b": "George Karlaftis",
      "corr": 0.513,
      "mad": 3.0,
      "n_overlap": 16,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "PRC",
        "TAK",
        "POW",
        "BSH",
        "PMV",
        "FMV",
        "PUR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "LEDGE"
    },
    {
      "a": "Greg Rousseau",
      "b": "Boye Mafe",
      "corr": 0.352,
      "mad": 2.9,
      "n_overlap": 16,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "PRC",
        "TAK",
        "POW",
        "BSH",
        "PMV",
        "FMV",
        "PUR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "LEDGE"
    },
    {
      "a": "Greg Rousseau",
      "b": "Tuli Tuipulotu",
      "corr": 0.72,
      "mad": 3.0,
      "n_overlap": 16,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "PRC",
        "TAK",
        "POW",
        "BSH",
        "PMV",
        "FMV",
        "PUR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "LEDGE"
    },
    {
      "a": "George Karlaftis",
      "b": "Boye Mafe",
      "corr": 0.361,
      "mad": 2.8,
      "n_overlap": 16,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "PRC",
        "TAK",
        "POW",
        "BSH",
        "PMV",
        "FMV",
        "PUR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "LEDGE"
    },
    {
      "a": "George Karlaftis",
      "b": "Tuli Tuipulotu",
      "corr": 0.86,
      "mad": 2.5,
      "n_overlap": 16,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "PRC",
        "TAK",
        "POW",
        "BSH",
        "PMV",
        "FMV",
        "PUR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "LEDGE"
    }
  ],
  "expected_low_dim": false
}
```

### LEDGE — `LOW_LOWER_RECORDED_NO_MOVE`

```json
{
  "code": "LOW_LOWER_RECORDED_NO_MOVE",
  "count": 1,
  "pairs": [
    {
      "pair_index": 4,
      "pair": [
        "T.J. Watt",
        "DeMarcus Lawrence"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    }
  ]
}
```

### LEDGE — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Aidan Hutchinson",
    "Will Anderson Jr.",
    "Greg Rousseau",
    "Maxx Crosby",
    "T.J. Watt",
    "DeMarcus Lawrence",
    "Byron Young",
    "George Karlaftis",
    "Boye Mafe",
    "Brian Burns",
    "Tuli Tuipulotu"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### REDGE — `STYLE_TOO_SIMILAR_COMPLETE`

```json
{
  "code": "STYLE_TOO_SIMILAR_COMPLETE",
  "count": 4,
  "samples": [
    {
      "a": "Danielle Hunter",
      "b": "Josh Hines-Allen",
      "corr": 0.603,
      "mad": 2.4,
      "n_overlap": 16,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "PRC",
        "TAK",
        "POW",
        "BSH",
        "PMV",
        "FMV",
        "PUR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "REDGE"
    },
    {
      "a": "Danielle Hunter",
      "b": "Chase Young",
      "corr": 0.539,
      "mad": 2.2,
      "n_overlap": 16,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "PRC",
        "TAK",
        "POW",
        "BSH",
        "PMV",
        "FMV",
        "PUR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "REDGE"
    },
    {
      "a": "Josh Hines-Allen",
      "b": "Chase Young",
      "corr": 0.492,
      "mad": 2.5,
      "n_overlap": 16,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "PRC",
        "TAK",
        "POW",
        "BSH",
        "PMV",
        "FMV",
        "PUR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "REDGE"
    },
    {
      "a": "Alex Highsmith",
      "b": "Laiatu Latu",
      "corr": 0.683,
      "mad": 2.9,
      "n_overlap": 16,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "PRC",
        "TAK",
        "POW",
        "BSH",
        "PMV",
        "FMV",
        "PUR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "REDGE"
    }
  ],
  "expected_low_dim": false
}
```

### REDGE — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Myles Garrett",
    "Micah Parsons",
    "Danielle Hunter",
    "Abdul Carter",
    "Josh Hines-Allen",
    "Nik Bonitto",
    "Chase Young",
    "Alex Highsmith",
    "Nick Herbig",
    "Laiatu Latu",
    "Al-Quadin Muhammad"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### DT — `STYLE_TOO_SIMILAR_COMPLETE`

```json
{
  "code": "STYLE_TOO_SIMILAR_COMPLETE",
  "count": 2,
  "samples": [
    {
      "a": "Leonard Williams",
      "b": "Kobie Turner",
      "corr": 0.748,
      "mad": 2.7,
      "n_overlap": 16,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "PRC",
        "TAK",
        "POW",
        "BSH",
        "PMV",
        "FMV",
        "PUR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "DT"
    },
    {
      "a": "Alim McNeill",
      "b": "Jalen Redmond",
      "corr": 0.544,
      "mad": 3.0,
      "n_overlap": 16,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "SPD",
        "ACC",
        "AGI",
        "COD",
        "STR",
        "AWR",
        "PRC",
        "TAK",
        "POW",
        "BSH",
        "PMV",
        "FMV",
        "PUR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "DT"
    }
  ],
  "expected_low_dim": false
}
```

### DT — `LOW_LOWER_RECORDED_NO_MOVE`

```json
{
  "code": "LOW_LOWER_RECORDED_NO_MOVE",
  "count": 3,
  "pairs": [
    {
      "pair_index": 4,
      "pair": [
        "Zach Allen",
        "Leonard Williams"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    },
    {
      "pair_index": 5,
      "pair": [
        "Leonard Williams",
        "Kobie Turner"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    },
    {
      "pair_index": 7,
      "pair": [
        "Derrick Brown",
        "Poona Ford"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    }
  ]
}
```

### DT — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Jeffery Simmons",
    "Cameron Heyward",
    "Quinnen Williams",
    "Dexter Lawrence",
    "Zach Allen",
    "Leonard Williams",
    "Kobie Turner",
    "Derrick Brown",
    "Poona Ford",
    "Alim McNeill",
    "Jalen Redmond"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### MIKE — `LOW_LOWER_RECORDED_NO_MOVE`

```json
{
  "code": "LOW_LOWER_RECORDED_NO_MOVE",
  "count": 2,
  "pairs": [
    {
      "pair_index": 3,
      "pair": [
        "Omar Speights",
        "Trenton Simpson"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    },
    {
      "pair_index": 9,
      "pair": [
        "Jack Campbell",
        "Cedric Gray"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    }
  ]
}
```

### MIKE — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Devin Lloyd",
    "Trenton Simpson",
    "Carson Schwesinger",
    "Cedric Gray"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### WILL — `LOW_LOWER_RECORDED_NO_MOVE`

```json
{
  "code": "LOW_LOWER_RECORDED_NO_MOVE",
  "count": 1,
  "pairs": [
    {
      "pair_index": 7,
      "pair": [
        "Jordyn Brooks",
        "Edgerrin Cooper"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    }
  ]
}
```

### WILL — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Blake Cashman",
    "Roquan Smith",
    "Jordyn Brooks",
    "Edgerrin Cooper",
    "Divine Deablo"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### SAM — `LOW_LOWER_RECORDED_NO_MOVE`

```json
{
  "code": "LOW_LOWER_RECORDED_NO_MOVE",
  "count": 3,
  "pairs": [
    {
      "pair_index": 3,
      "pair": [
        "Derrick Barnes",
        "Dorian Williams"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    },
    {
      "pair_index": 5,
      "pair": [
        "D'Marco Jackson",
        "Malcolm Rodriguez"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    },
    {
      "pair_index": 8,
      "pair": [
        "Noah Sewell",
        "Leo Chenal"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    }
  ]
}
```

### SAM — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Isaiah McDuffie",
    "Derrick Barnes",
    "Dorian Williams"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### CB — `LOW_LOWER_RECORDED_NO_MOVE`

```json
{
  "code": "LOW_LOWER_RECORDED_NO_MOVE",
  "count": 1,
  "pairs": [
    {
      "pair_index": 8,
      "pair": [
        "Ja'Quan McMillian",
        "James Pierre"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    }
  ]
}
```

### CB — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Denzel Ward",
    "Jamel Dean"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### FS — `HALF_UP_CLAIM_LAG`

```json
{
  "code": "HALF_UP_CLAIM_LAG",
  "count": 1,
  "players": [
    {
      "name": "Antonio Johnson",
      "detail": {
        "ok": false,
        "computed_display": 84,
        "computed_raw": 83.5,
        "claimed_display": 83,
        "claimed_raw": null,
        "issue": "median_mismatch",
        "computed": 84,
        "claimed": 83,
        "half_up_policy": "display=floor(raw+0.5); raw retained; matches repo Math.round for +ve"
      }
    }
  ],
  "note": "Claimed display equals trunc(raw); integrator display=half-up. Raw retained. Not invented."
}
```

### FS — `LOW_LOWER_RECORDED_NO_MOVE`

```json
{
  "code": "LOW_LOWER_RECORDED_NO_MOVE",
  "count": 1,
  "pairs": [
    {
      "pair_index": 9,
      "pair": [
        "Bryan Cook",
        "Thomas Harper"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    }
  ]
}
```

### FS — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Tykee Smith",
    "Minkah Fitzpatrick",
    "Julian Love",
    "Antonio Johnson"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### SS — `LOW_LOWER_RECORDED_NO_MOVE`

```json
{
  "code": "LOW_LOWER_RECORDED_NO_MOVE",
  "count": 2,
  "pairs": [
    {
      "pair_index": 5,
      "pair": [
        "Talanoa Hufanga",
        "Brian Branch"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    },
    {
      "pair_index": 7,
      "pair": [
        "Christian Roland-Wallace",
        "Derwin James"
      ],
      "confidence": "LOW",
      "note": "Evidence favors lower-slotted; order not flipped in proposed_order"
    }
  ]
}
```

### K — `HALF_UP_CLAIM_LAG`

```json
{
  "code": "HALF_UP_CLAIM_LAG",
  "count": 3,
  "players": [
    {
      "name": "Chase McLaughlin",
      "detail": {
        "ok": false,
        "computed_display": 93,
        "computed_raw": 92.5,
        "claimed_display": 92,
        "claimed_raw": null,
        "issue": "median_mismatch",
        "computed": 93,
        "claimed": 92,
        "half_up_policy": "display=floor(raw+0.5); raw retained; matches repo Math.round for +ve"
      }
    },
    {
      "name": "Ka'imi Fairbairn",
      "detail": {
        "ok": false,
        "computed_display": 91,
        "computed_raw": 90.5,
        "claimed_display": 90,
        "claimed_raw": null,
        "issue": "median_mismatch",
        "computed": 91,
        "claimed": 90,
        "half_up_policy": "display=floor(raw+0.5); raw retained; matches repo Math.round for +ve"
      }
    },
    {
      "name": "Evan McPherson",
      "detail": {
        "ok": false,
        "computed_display": 90,
        "computed_raw": 89.5,
        "claimed_display": 89,
        "claimed_raw": null,
        "issue": "median_mismatch",
        "computed": 90,
        "claimed": 89,
        "half_up_policy": "display=floor(raw+0.5); raw retained; matches repo Math.round for +ve"
      }
    }
  ],
  "note": "Claimed display equals trunc(raw); integrator display=half-up. Raw retained. Not invented."
}
```

### K — `STYLE_TOO_SIMILAR_COMPLETE_EXPECTED_LOW_DIM`

```json
{
  "code": "STYLE_TOO_SIMILAR_COMPLETE_EXPECTED_LOW_DIM",
  "count": 6,
  "samples": [
    {
      "a": "Chase McLaughlin",
      "b": "Will Reichard",
      "corr": 0.99,
      "mad": 2.0,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "KPW",
        "KAC",
        "AWR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "K"
    },
    {
      "a": "Chase McLaughlin",
      "b": "Evan McPherson",
      "corr": 0.932,
      "mad": 2.5,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "KPW",
        "KAC",
        "AWR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "K"
    },
    {
      "a": "Will Reichard",
      "b": "Ka'imi Fairbairn",
      "corr": 0.829,
      "mad": 2.8,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "KPW",
        "KAC",
        "AWR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "K"
    },
    {
      "a": "Will Reichard",
      "b": "Evan McPherson",
      "corr": 0.944,
      "mad": 1.5,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "KPW",
        "KAC",
        "AWR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "K"
    },
    {
      "a": "Ka'imi Fairbairn",
      "b": "Evan McPherson",
      "corr": 0.857,
      "mad": 3.0,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "KPW",
        "KAC",
        "AWR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "K"
    },
    {
      "a": "Brandon Aubrey",
      "b": "Eddy Pineiro",
      "corr": 0.962,
      "mad": 8.2,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "KPW",
        "KAC",
        "AWR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "K"
    }
  ],
  "expected_low_dim": true
}
```

### P — `STYLE_TOO_SIMILAR_COMPLETE_EXPECTED_LOW_DIM`

```json
{
  "code": "STYLE_TOO_SIMILAR_COMPLETE_EXPECTED_LOW_DIM",
  "count": 11,
  "samples": [
    {
      "a": "Corliss Waitman",
      "b": "Bryan Anger",
      "corr": 0.919,
      "mad": 2.2,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "KPW",
        "KAC",
        "AWR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "P"
    },
    {
      "a": "Jordan Stout",
      "b": "Daniel Whelan",
      "corr": 0.854,
      "mad": 2.5,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "KPW",
        "KAC",
        "AWR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "P"
    },
    {
      "a": "Jordan Stout",
      "b": "Logan Cooke",
      "corr": 0.495,
      "mad": 2.7,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "KPW",
        "KAC",
        "AWR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "P"
    },
    {
      "a": "Daniel Whelan",
      "b": "Logan Cooke",
      "corr": 0.809,
      "mad": 2.2,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "KPW",
        "KAC",
        "AWR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "P"
    },
    {
      "a": "Jack Fox",
      "b": "Logan Cooke",
      "corr": 0.956,
      "mad": 3.7,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "KPW",
        "KAC",
        "AWR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "P"
    },
    {
      "a": "Logan Cooke",
      "b": "Braden Mann",
      "corr": 0.459,
      "mad": 3.0,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "KPW",
        "KAC",
        "AWR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "P"
    },
    {
      "a": "Logan Cooke",
      "b": "Bryan Anger",
      "corr": 0.482,
      "mad": 2.3,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "KPW",
        "KAC",
        "AWR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "P"
    },
    {
      "a": "Braden Mann",
      "b": "Tress Way",
      "corr": 0.764,
      "mad": 3.0,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "KPW",
        "KAC",
        "AWR",
        "INJ",
        "STA",
        "TGH"
      ],
      "expected_low_dim": true,
    
```

### P — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Bryan Anger"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### FB — `PROPOSED_ORDER_NULL`

```json
{
  "code": "PROPOSED_ORDER_NULL",
  "detail": "intentional_gaps_hold"
}
```

### FB — `STYLE_TOO_SIMILAR_COMPLETE`

```json
{
  "code": "STYLE_TOO_SIMILAR_COMPLETE",
  "count": 2,
  "samples": [
    {
      "a": "Connor Heyward",
      "b": "Hunter Luepke",
      "corr": 0.287,
      "mad": 2.9,
      "n_overlap": 11,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "RBK",
        "PBK",
        "IBL",
        "LBK",
        "STR",
        "IMP",
        "TRK",
        "CAR",
        "CTH",
        "SPD",
        "AWR"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "FB"
    },
    {
      "a": "Adam Prentice",
      "b": "Michael Burton",
      "corr": 0.877,
      "mad": 2.4,
      "n_overlap": 11,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "RBK",
        "PBK",
        "IBL",
        "LBK",
        "STR",
        "IMP",
        "TRK",
        "CAR",
        "CTH",
        "SPD",
        "AWR"
      ],
      "expected_low_dim": false,
      "cohort": "complete",
      "position": "FB"
    }
  ],
  "expected_low_dim": false
}
```

### FB — `STYLE_TOO_SIMILAR_PARTIAL`

```json
{
  "code": "STYLE_TOO_SIMILAR_PARTIAL",
  "count": 3,
  "expected_low_dim": false,
  "samples": [
    {
      "a": "Reggie Gilliam",
      "b": "Andrew Beck",
      "corr": 0.997,
      "mad": 2.0,
      "n_overlap": 3,
      "too_similar": true,
      "false_flag_risk": true,
      "shared_attrs": [
        "STR",
        "IMP",
        "AWR"
      ],
      "expected_low_dim": false,
      "cohort": "partial",
      "position": "FB"
    },
    {
      "a": "Alec Ingold",
      "b": "Brady Russell",
      "corr": 0.778,
      "mad": 1.8,
      "n_overlap": 10,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "RBK",
        "PBK",
        "IBL",
        "LBK",
        "STR",
        "IMP",
        "CAR",
        "CTH",
        "SPD",
        "AWR"
      ],
      "expected_low_dim": false,
      "cohort": "partial",
      "position": "FB"
    },
    {
      "a": "Andrew Beck",
      "b": "Brady Russell",
      "corr": 0.786,
      "mad": 2.0,
      "n_overlap": 3,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "STR",
        "IMP",
        "AWR"
      ],
      "expected_low_dim": false,
      "cohort": "partial",
      "position": "FB"
    }
  ]
}
```

### FB — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Connor Heyward",
    "Hunter Luepke",
    "Adam Prentice",
    "Michael Burton"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

### LS — `PROPOSED_ORDER_NULL`

```json
{
  "code": "PROPOSED_ORDER_NULL",
  "detail": "intentional_gaps_hold"
}
```

### LS — `STYLE_TOO_SIMILAR_COMPLETE_EXPECTED_LOW_DIM`

```json
{
  "code": "STYLE_TOO_SIMILAR_COMPLETE_EXPECTED_LOW_DIM",
  "count": 17,
  "samples": [
    {
      "a": "Ross Matiscik",
      "b": "Thomas Hennessy",
      "corr": 0.915,
      "mad": 2.7,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "AWR",
        "STR",
        "RBK",
        "PBK",
        "SPD",
        "TAK"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "LS"
    },
    {
      "a": "Ross Matiscik",
      "b": "Christian Kuntz",
      "corr": 0.985,
      "mad": 3.7,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "AWR",
        "STR",
        "RBK",
        "PBK",
        "SPD",
        "TAK"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "LS"
    },
    {
      "a": "Ross Matiscik",
      "b": "Nick Moore",
      "corr": 0.919,
      "mad": 1.3,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "AWR",
        "STR",
        "RBK",
        "PBK",
        "SPD",
        "TAK"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "LS"
    },
    {
      "a": "Thomas Hennessy",
      "b": "Luke Rhodes",
      "corr": 0.444,
      "mad": 3.0,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "AWR",
        "STR",
        "RBK",
        "PBK",
        "SPD",
        "TAK"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "LS"
    },
    {
      "a": "Thomas Hennessy",
      "b": "Christian Kuntz",
      "corr": 0.918,
      "mad": 3.0,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "AWR",
        "STR",
        "RBK",
        "PBK",
        "SPD",
        "TAK"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "LS"
    },
    {
      "a": "Thomas Hennessy",
      "b": "Trent Sieg",
      "corr": 0.885,
      "mad": 1.3,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "AWR",
        "STR",
        "RBK",
        "PBK",
        "SPD",
        "TAK"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "LS"
    },
    {
      "a": "Thomas Hennessy",
      "b": "Nick Moore",
      "corr": 0.903,
      "mad": 2.7,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "AWR",
        "STR",
        "RBK",
        "PBK",
        "SPD",
        "TAK"
      ],
      "expected_low_dim": true,
      "note": "K/P/LS 6-attr vectors — Pearson/MAD trips are expected overlap flags, not evidence of rating corruption",
      "cohort": "complete",
      "position": "LS"
    },
    {
      "a": "Chris Stoll",
      "b": "William Wagner",
      "corr": 0.851,
      "mad": 3.0,
      "n_overlap": 6,
      "too_similar": true,
      "false_flag_risk": false,
      "shared_attrs": [
        "AWR",
        "STR",
        "RBK",
        "PBK",
        "SPD",
        "TAK"
      ],

```

### LS — `COMPLETE_BUT_LOW_TRAIT_EVIDENCE`

```json
{
  "code": "COMPLETE_BUT_LOW_TRAIT_EVIDENCE",
  "players": [
    "Chris Stoll",
    "Luke Rhodes",
    "Trent Sieg"
  ],
  "note": "Claimed complete cards with ≥50% LOW cells — proposed, not validated lock"
}
```

## Adjacent H2H contradictions (MEDIUM+ Lower unflipped)

Tie and LOW Lower are **verbatim valid** and do not move ranks. Only MEDIUM/HIGH `Lower` against an unflipped proposed order is listed as an adjacent contradiction.

| POS | pair_index | higher | lower | confidence |
|---|---:|---|---|---|
| — | — | — | — | none |

## Style issue list

All 242 vectors scored within position. Complete cohort separate from partial. K/P/LS are 6-attr low-dimensional — overlap flags are **expected**, not rating corruption.

Complete-cohort flags: **58**; partial-cohort flags: **3**.

| POS | cohort | A | B | corr | mad | overlap | false_flag | expected_low_dim |
|---|---|---|---|---:|---:|---:|---|---|
| QB | complete | Drake Maye | Trevor Lawrence | 0.842 | 2.4 | 19 | False | False |
| QB | complete | Trevor Lawrence | Patrick Mahomes | 0.751 | 2.6 | 19 | False | False |
| QB | complete | Dak Prescott | C.J. Stroud | 0.847 | 2.7 | 19 | False | False |
| TE | complete | T.J. Hockenson | Hunter Henry | 0.813 | 2.9 | 22 | False | False |
| LT | complete | Trent Williams | Tristan Wirfs | 0.856 | 1.9 | 17 | False | False |
| LT | complete | Jordan Mailata | Dion Dawkins | 0.896 | 1.9 | 17 | False | False |
| LT | complete | Alaric Jackson | Dion Dawkins | 0.88 | 2.9 | 17 | False | False |
| LG | complete | Quenton Nelson | Damien Lewis | 0.958 | 6.5 | 17 | False | False |
| C | complete | Zach Frazier | Cooper Beebe | 0.828 | 2.8 | 17 | False | False |
| RG | complete | Trey Smith | Mike Onwenu | 0.946 | 2.5 | 17 | False | False |
| RT | complete | Armand Membou | Zach Bako-Bewele | 0.69 | 2.7 | 17 | False | False |
| LEDGE | complete | Greg Rousseau | George Karlaftis | 0.513 | 3.0 | 16 | False | False |
| LEDGE | complete | Greg Rousseau | Boye Mafe | 0.352 | 2.9 | 16 | False | False |
| LEDGE | complete | Greg Rousseau | Tuli Tuipulotu | 0.72 | 3.0 | 16 | False | False |
| LEDGE | complete | George Karlaftis | Boye Mafe | 0.361 | 2.8 | 16 | False | False |
| LEDGE | complete | George Karlaftis | Tuli Tuipulotu | 0.86 | 2.5 | 16 | False | False |
| REDGE | complete | Danielle Hunter | Josh Hines-Allen | 0.603 | 2.4 | 16 | False | False |
| REDGE | complete | Danielle Hunter | Chase Young | 0.539 | 2.2 | 16 | False | False |
| REDGE | complete | Josh Hines-Allen | Chase Young | 0.492 | 2.5 | 16 | False | False |
| REDGE | complete | Alex Highsmith | Laiatu Latu | 0.683 | 2.9 | 16 | False | False |
| DT | complete | Leonard Williams | Kobie Turner | 0.748 | 2.7 | 16 | False | False |
| DT | complete | Alim McNeill | Jalen Redmond | 0.544 | 3.0 | 16 | False | False |
| K | complete | Chase McLaughlin | Will Reichard | 0.99 | 2.0 | 6 | False | True |
| K | complete | Chase McLaughlin | Evan McPherson | 0.932 | 2.5 | 6 | False | True |
| K | complete | Will Reichard | Ka'imi Fairbairn | 0.829 | 2.8 | 6 | False | True |
| K | complete | Will Reichard | Evan McPherson | 0.944 | 1.5 | 6 | False | True |
| K | complete | Ka'imi Fairbairn | Evan McPherson | 0.857 | 3.0 | 6 | False | True |
| K | complete | Brandon Aubrey | Eddy Pineiro | 0.962 | 8.2 | 6 | False | True |
| P | complete | Corliss Waitman | Bryan Anger | 0.919 | 2.2 | 6 | False | True |
| P | complete | Jordan Stout | Daniel Whelan | 0.854 | 2.5 | 6 | False | True |
| P | complete | Jordan Stout | Logan Cooke | 0.495 | 2.7 | 6 | False | True |
| P | complete | Daniel Whelan | Logan Cooke | 0.809 | 2.2 | 6 | False | True |
| P | complete | Jack Fox | Logan Cooke | 0.956 | 3.7 | 6 | False | True |
| P | complete | Logan Cooke | Braden Mann | 0.459 | 3.0 | 6 | False | True |
| P | complete | Logan Cooke | Bryan Anger | 0.482 | 2.3 | 6 | False | True |
| P | complete | Braden Mann | Tress Way | 0.764 | 3.0 | 6 | False | True |
| P | complete | Tress Way | J.K. Scott | 0.961 | 4.3 | 6 | False | True |
| P | complete | Tress Way | Austin McNamara | 0.959 | 4.3 | 6 | False | True |
| P | complete | J.K. Scott | Austin McNamara | 0.947 | 1.3 | 6 | False | True |
| FB | complete | Connor Heyward | Hunter Luepke | 0.287 | 2.9 | 11 | False | False |
| FB | complete | Adam Prentice | Michael Burton | 0.877 | 2.4 | 11 | False | False |
| FB | partial | Reggie Gilliam | Andrew Beck | 0.997 | 2.0 | 3 | True | False |
| FB | partial | Alec Ingold | Brady Russell | 0.778 | 1.8 | 10 | False | False |
| FB | partial | Andrew Beck | Brady Russell | 0.786 | 2.0 | 3 | False | False |
| LS | complete | Ross Matiscik | Thomas Hennessy | 0.915 | 2.7 | 6 | False | True |
| LS | complete | Ross Matiscik | Christian Kuntz | 0.985 | 3.7 | 6 | False | True |
| LS | complete | Ross Matiscik | Nick Moore | 0.919 | 1.3 | 6 | False | True |
| LS | complete | Thomas Hennessy | Luke Rhodes | 0.444 | 3.0 | 6 | False | True |
| LS | complete | Thomas Hennessy | Christian Kuntz | 0.918 | 3.0 | 6 | False | True |
| LS | complete | Thomas Hennessy | Trent Sieg | 0.885 | 1.3 | 6 | False | True |
| LS | complete | Thomas Hennessy | Nick Moore | 0.903 | 2.7 | 6 | False | True |
| LS | complete | Chris Stoll | William Wagner | 0.851 | 3.0 | 6 | False | True |
| LS | complete | Chris Stoll | Luke Rhodes | 0.98 | 2.3 | 6 | False | True |
| LS | complete | Chris Stoll | Trent Sieg | 0.797 | 2.7 | 6 | False | True |
| LS | complete | William Wagner | Austin Brinkman | 0.9 | 2.3 | 6 | False | True |
| LS | complete | Austin Brinkman | Luke Rhodes | 0.813 | 1.7 | 6 | False | True |
| LS | complete | Austin Brinkman | Christian Kuntz | 0.0 | 3.0 | 6 | False | True |
| LS | complete | Luke Rhodes | Christian Kuntz | 0.553 | 2.7 | 6 | False | True |
| LS | complete | Luke Rhodes | Trent Sieg | 0.788 | 2.3 | 6 | False | True |
| LS | complete | Christian Kuntz | Trent Sieg | 0.831 | 3.0 | 6 | False | True |
| LS | complete | Christian Kuntz | Joe Cardona | 0.335 | 2.7 | 6 | False | True |

## Half-up raw median concerns (raw not integer)

| POS | player | raw | display_half_up | prior_trunc | claimed | differs |
|---|---|---:|---:|---:|---:|---|
| TE | Trey McBride | 84.5 | 85 | 84 | 85 | True |
| LEDGE | Maxx Crosby | 84.5 | 85 | 84 | 85 | True |
| LEDGE | Brian Burns | 85.5 | 86 | 85 | 86 | True |
| REDGE | Myles Garrett | 89.5 | 90 | 89 | 90 | True |
| REDGE | Nick Herbig | 82.5 | 83 | 82 | 83 | True |
| REDGE | Laiatu Latu | 83.5 | 84 | 83 | 84 | True |
| DT | Jeffery Simmons | 84.5 | 85 | 84 | 85 | True |
| FS | Antonio Johnson | 83.5 | 84 | 83 | 83 | True |
| K | Chase McLaughlin | 92.5 | 93 | 92 | 92 | True |
| K | Ka'imi Fairbairn | 90.5 | 91 | 90 | 90 | True |
| K | Evan McPherson | 89.5 | 90 | 89 | 89 | True |

## Mechanical band-anchor audit

| POS | flag | anchor_share | unique_values | severe_players |
|---|---|---:|---|---:|
| QB | False | 0.254 | `[48, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 97]` | 0 |
| RB | False | 0.277 | `[44, 46, 48, 50, 52, 55, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97]` | 0 |
| WR | False | 0.273 | `[52, 58, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 97]` | 0 |
| TE | False | 0.24 | `[52, 60, 62, 64, 66, 68, 70, 72, 74, 76, 77, 78, 80, 82, 84, 85, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 97]` | 0 |
| LT | False | 0.235 | `[68, 70, 72, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95]` | 0 |
| LG | False | 0.209 | `[68, 70, 72, 74, 75, 76, 77, 78, 79, 80, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95]` | 0 |
| C | False | 0.246 | `[68, 70, 72, 74, 75, 76, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 92, 93, 94, 95]` | 0 |
| RG | False | 0.246 | `[64, 66, 68, 70, 72, 74, 75, 76, 78, 79, 80, 82, 83, 84, 85, 86, 87, 88, 89, 90, 92, 93, 94]` | 0 |
| RT | False | 0.262 | `[64, 68, 70, 72, 74, 75, 76, 78, 79, 80, 82, 83, 84, 85, 86, 87, 88, 89, 90, 92, 93]` | 0 |
| LEDGE | False | 0.33 | `[72, 75, 76, 77, 78, 79, 80, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 95]` | 0 |
| REDGE | False | 0.318 | `[65, 72, 74, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96]` | 0 |
| DT | False | 0.278 | `[70, 72, 73, 74, 75, 76, 78, 79, 80, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94]` | 0 |
| MIKE | False | 0.544 | `[56, 60, 61, 62, 63, 66, 67, 69, 70, 73, 74, 75, 76, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96]` | 0 |
| WILL | False | 0.471 | `[56, 62, 66, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 97]` | 0 |
| SAM | False | 0.503 | `[56, 58, 65, 66, 67, 68, 70, 72, 73, 75, 76, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 94, 95]` | 0 |
| CB | False | 0.516 | `[61, 62, 64, 66, 67, 70, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96]` | 0 |
| FS | False | 0.418 | `[55, 58, 64, 66, 67, 68, 70, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 94, 97]` | 0 |
| SS | False | 0.489 | `[55, 63, 65, 66, 67, 68, 70, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 97]` | 0 |
| K | False | 0.258 | `[68, 70, 72, 74, 78, 80, 82, 84, 86, 88, 90, 91, 92, 93, 94, 95, 96, 97]` | 0 |
| P | False | 0.303 | `[74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 93, 94, 96, 97]` | 0 |
| FB | False | 0.241 | `[60, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96]` | 0 |
| LS | False | 0.273 | `[70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92]` | 0 |

## URL sample verification (1 fact / workstream group)

### skill-passing — Joe Burrow / SAC

- verification: **URL_REACHABLE_CLAIM_NOT_IN_SNIPPET**
- rating: 97
- claim_substr `73` in rationale: True
- expected URL listed on cell: True
- HTTP: `{"ok": true, "status": 200, "content_type": "text/html; charset=UTF-8", "bytes_read": 8000, "note": null}`
- rationale excerpt: 73.0% leader; Elite short accuracy.

### trench-front — Penei Sewell / SPD

- verification: **URL_REACHABLE_CLAIM_PRESENT**
- rating: 72
- claim_substr `5.13` in rationale: True
- expected URL listed on cell: True
- HTTP: `{"ok": true, "status": 200, "content_type": "application/octet-stream", "bytes_read": 8000, "note": null}`
- rationale excerpt: Measured 40 5.13s (2021 combine/pro day, nflverse); OL-relative band; draft-era, no age penalty Not Starter: no second independent signal at the higher band.

### box-coverage — Fred Warner / PRS

- verification: **URL_UNREACHABLE_OR_BLOCKED_CLAIM_PRESENT_IN_CARD**
- rating: 56
- claim_substr `pass rush` in rationale: True
- expected URL listed on cell: True
- HTTP: `{"ok": false, "status": 403, "content_type": null, "bytes_read": null, "note": "HTTP Error 403: Forbidden"}`
- rationale excerpt: LB pass rush (PRS=pass rush per commissioner). 2025 5 blitzes/0 pressures/0 sk; 2026 28.0 blitzes/4.0 pressures/0.5 sk; PFF rush snaps 25/26 11/35. Judgment vs repo anchor (Cashman 13 pr/42 blitz, 4.5 sk = 72): 4 pressures/33 blitzes, 0.5 s

### specialists — Chase McLaughlin / KAC

- verification: **URL_REACHABLE_CLAIM_NOT_IN_SNIPPET**
- rating: 97
- claim_substr `19/19` in rationale: True
- expected URL listed on cell: True
- HTTP: `{"ok": true, "status": 200, "content_type": "text/html; charset=utf-8", "bytes_read": 8000, "note": null}`
- rationale excerpt: 19/19, MAKE +2.90, XP 17/17.

## Rank changes / proposed boards

### QB

- proposed_order: ['Joe Burrow', 'Josh Allen', 'Brock Purdy', 'Lamar Jackson', 'Jared Goff', 'Drake Maye', 'Trevor Lawrence', 'Dak Prescott', 'C.J. Stroud', 'Jordan Love']
- first_out: Patrick Mahomes
- board_status: `BOARD_SOLID_INFORMAL_PROPOSAL`
- engine_status: GAPS — multiple LOW adjacent links recorded (not forced); not ENGINE_SUPPORTABLE_CANDIDATE
- pass_boolean: True
- slots_changed: [3, 4, 6, 7, 8, 9, 10]
- rank_changes: `[{"player": "Brock Purdy", "historical_rank": 4, "proposed_rank": 3}, {"player": "Lamar Jackson", "historical_rank": 9, "proposed_rank": 4}, {"player": "Drake Maye", "historical_rank": 3, "proposed_rank": 6}, {"player": "Trevor Lawrence", "historical_rank": 10, "proposed_rank": 7}, {"player": "Dak Prescott", "historical_rank": 6, "proposed_rank": 8}, {"player": "C.J. Stroud", "historical_rank": null, "proposed_rank": 9}, {"player": "Jordan Love", "historical_rank": 7, "proposed_rank": 10}]`
- H2Hs: 10

### RB

- proposed_order: ['Kenneth Walker III', 'Jaylen Warren', 'Bijan Robinson', 'Jahmyr Gibbs', 'James Cook', 'Christian McCaffrey', "De'Von Achane", 'Chuba Hubbard', 'Kyren Williams', 'Bhayshul Tuten']
- first_out: Jonathan Taylor
- board_status: `BOARD_SOLID_INFORMAL_PROPOSAL`
- engine_status: GAPS — multiple LOW adjacent links recorded (not forced); not ENGINE_SUPPORTABLE_CANDIDATE
- pass_boolean: True
- slots_changed: [1, 2, 3, 4, 5, 6, 8, 9, 10]
- rank_changes: `[{"player": "Kenneth Walker III", "historical_rank": 2, "proposed_rank": 1}, {"player": "Jaylen Warren", "historical_rank": 4, "proposed_rank": 2}, {"player": "Bijan Robinson", "historical_rank": 1, "proposed_rank": 3}, {"player": "Jahmyr Gibbs", "historical_rank": 3, "proposed_rank": 4}, {"player": "James Cook", "historical_rank": 6, "proposed_rank": 5}, {"player": "Christian McCaffrey", "historical_rank": 5, "proposed_rank": 6}, {"player": "Chuba Hubbard", "historical_rank": null, "proposed_rank": 8}, {"player": "Kyren Williams", "historical_rank": 8, "proposed_rank": 9}, {"player": "Bhayshul Tuten", "historical_rank": 9, "proposed_rank": 10}]`
- H2Hs: 10

### WR

- proposed_order: ['Jaxon Smith-Njigba', 'Tee Higgins', 'CeeDee Lamb', 'Puka Nacua', 'Zay Flowers', 'Christian Watson', 'Chris Olave', 'Drake London', "Ja'Marr Chase", 'Amon-Ra St. Brown']
- first_out: Justin Jefferson
- board_status: `BOARD_SOLID_INFORMAL_PROPOSAL`
- engine_status: GAPS — multiple LOW adjacent links recorded (not forced); not ENGINE_SUPPORTABLE_CANDIDATE
- pass_boolean: True
- slots_changed: [2, 3, 4, 5, 6, 7, 8, 9, 10]
- rank_changes: `[{"player": "Tee Higgins", "historical_rank": 5, "proposed_rank": 2}, {"player": "CeeDee Lamb", "historical_rank": 4, "proposed_rank": 3}, {"player": "Puka Nacua", "historical_rank": 2, "proposed_rank": 4}, {"player": "Zay Flowers", "historical_rank": 7, "proposed_rank": 5}, {"player": "Christian Watson", "historical_rank": null, "proposed_rank": 6}, {"player": "Chris Olave", "historical_rank": 10, "proposed_rank": 7}, {"player": "Drake London", "historical_rank": 6, "proposed_rank": 8}, {"player": "Ja'Marr Chase", "historical_rank": 3, "proposed_rank": 9}, {"player": "Amon-Ra St. Brown", "historical_rank": 8, "proposed_rank": 10}]`
- H2Hs: 10

### TE

- proposed_order: ['Brock Bowers', 'George Kittle', 'Dalton Kincaid', 'Trey McBride', 'Sam LaPorta', 'T.J. Hockenson', 'Darnell Washington', 'Travis Kelce', 'Hunter Henry', 'Tucker Kraft']
- first_out: Brenton Strange
- board_status: `BOARD_SOLID_INFORMAL_PROPOSAL`
- engine_status: GAPS — multiple LOW adjacent links recorded (not forced); not ENGINE_SUPPORTABLE_CANDIDATE
- pass_boolean: True
- H2Hs: 10

### LT

- proposed_order: ['Penei Sewell', 'Trent Williams', 'Jordan Mailata', 'Tristan Wirfs', 'Garett Bolles', 'Andrew Thomas', 'Alaric Jackson', 'Bernhard Raimann', 'Charles Cross', 'Dion Dawkins']
- first_out: Paris Johnson Jr.
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (2/10 MEDIUM+)
- pass_boolean: True
- H2Hs: 10

### LG

- proposed_order: ['Quenton Nelson', 'Damien Lewis', 'Joe Thuney', 'Steve Avila', 'Peter Skoronski', 'Dylan Parham', 'Christian Mahogany', 'Tyler Smith', 'Matthew Bergeron', 'Ezra Cleveland']
- first_out: Isaac Seumalo
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (2/10 MEDIUM+)
- pass_boolean: True
- H2Hs: 10

### C

- proposed_order: ['Creed Humphrey', 'Zach Frazier', 'Aaron Brewer', 'Coleman Shelton', 'Tyler Linderbaum', 'Erik McCoy', 'Luke Wattenberg', 'Ryan Neuzil', 'Juice Scruggs', 'Jake Brendel']
- first_out: Cooper Beebe
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (3/10 MEDIUM+)
- pass_boolean: True
- H2Hs: 10

### RG

- proposed_order: ['Chris Lindstrom', 'Quinn Meinerz', 'Jonah Jackson', 'Tyler Booker', 'Dalton Risner', 'Joe Tippmann', 'Sam Cosmi', 'Trey Smith', 'Mason McCormick', 'Dominick Puni']
- first_out: Mike Onwenu
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (1/10 MEDIUM+)
- pass_boolean: True
- H2Hs: 10

### RT

- proposed_order: ['Darnell Wright', 'Colton McKivitz', "Brian O'Neill", 'Abraham Lucas', 'Joe Alt', 'Warren McClendon Jr.', 'Luke Goedeke', 'Armand Membou', 'Spencer Brown', 'Jermaine Eluemunor']
- first_out: Zach Bako-Bewele
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (1/10 MEDIUM+)
- pass_boolean: True
- H2Hs: 10

### LEDGE

- proposed_order: ['Aidan Hutchinson', 'Will Anderson Jr.', 'Greg Rousseau', 'Maxx Crosby', 'T.J. Watt', 'DeMarcus Lawrence', 'Byron Young', 'George Karlaftis', 'Boye Mafe', 'Brian Burns']
- first_out: Tuli Tuipulotu
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (2/10 MEDIUM+)
- pass_boolean: True
- H2Hs: 10

### REDGE

- proposed_order: ['Myles Garrett', 'Micah Parsons', 'Danielle Hunter', 'Abdul Carter', 'Josh Hines-Allen', 'Nik Bonitto', 'Chase Young', 'Alex Highsmith', 'Nick Herbig', 'Laiatu Latu']
- first_out: Al-Quadin Muhammad
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (1/10 MEDIUM+)
- pass_boolean: True
- H2Hs: 10

### DT

- proposed_order: ['Jeffery Simmons', 'Cameron Heyward', 'Quinnen Williams', 'Dexter Lawrence', 'Zach Allen', 'Leonard Williams', 'Kobie Turner', 'Derrick Brown', 'Poona Ford', 'Alim McNeill']
- first_out: Jalen Redmond
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (2/10 MEDIUM+)
- pass_boolean: True
- H2Hs: 10

### MIKE

- proposed_order: ['Ventrell Miller', 'Fred Warner', 'Devin Lloyd', 'Omar Speights', 'Trenton Simpson', 'Dre Greenlaw', 'Nick Bolton', 'Sonny Styles', 'Carson Schwesinger', 'Jack Campbell']
- first_out: Cedric Gray
- board_status: `BOARD_SOLID_INFORMAL_PROPOSAL`
- engine_status: GAPS (MEDIUM links: 5/10; LOW/Insufficient: 5/10)
- pass_boolean: True
- slots_changed: [1, 2, 4, 5, 6, 7, 8, 9, 10]
- rank_changes: `[{"player": "Ventrell Miller", "historical_rank": 4, "proposed_rank": 1}, {"player": "Fred Warner", "historical_rank": 1, "proposed_rank": 2}, {"player": "Omar Speights", "historical_rank": 10, "proposed_rank": 4}, {"player": "Trenton Simpson", "historical_rank": 7, "proposed_rank": 5}, {"player": "Dre Greenlaw", "historical_rank": 9, "proposed_rank": 6}, {"player": "Nick Bolton", "historical_rank": 5, "proposed_rank": 7}, {"player": "Sonny Styles", "historical_rank": null, "proposed_rank": 8}, {"player": "Carson Schwesinger", "historical_rank": 6, "proposed_rank": 9}, {"player": "Jack Campbell", "historical_rank": 2, "proposed_rank": 10}]`
- H2Hs: 10

### WILL

- proposed_order: ['Blake Cashman', 'Zack Baun', 'Arvell Reese', 'Roquan Smith', 'Alex Singleton', 'Drue Tranquill', 'Foyesade Oluokun', 'Jordyn Brooks', 'Edgerrin Cooper', 'Divine Deablo']
- first_out: Demario Davis
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (MEDIUM links: 3/10; LOW/Insufficient: 7/10)
- pass_boolean: True
- slots_changed: [1, 2, 3, 4, 5, 6, 8, 9, 10]
- rank_changes: `[{"player": "Blake Cashman", "historical_rank": 5, "proposed_rank": 1}, {"player": "Zack Baun", "historical_rank": 1, "proposed_rank": 2}, {"player": "Arvell Reese", "historical_rank": 6, "proposed_rank": 3}, {"player": "Roquan Smith", "historical_rank": 2, "proposed_rank": 4}, {"player": "Alex Singleton", "historical_rank": 8, "proposed_rank": 5}, {"player": "Drue Tranquill", "historical_rank": 3, "proposed_rank": 6}, {"player": "Jordyn Brooks", "historical_rank": 4, "proposed_rank": 8}, {"player": "Edgerrin Cooper", "historical_rank": 10, "proposed_rank": 9}, {"player": "Divine Deablo", "historical_rank": null, "proposed_rank": 10}]`
- H2Hs: 10

### SAM

- proposed_order: ['Quincy Williams', 'Isaiah McDuffie', 'Devin Bush', 'Derrick Barnes', 'Dorian Williams', "D'Marco Jackson", 'Malcolm Rodriguez', 'Dennis Gardeck', 'Noah Sewell', 'Leo Chenal']
- first_out: E.J. Speed
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (MEDIUM links: 2/10; LOW/Insufficient: 8/10)
- pass_boolean: True
- slots_changed: [1, 3, 4, 5, 6, 7, 9, 10]
- rank_changes: `[{"player": "Quincy Williams", "historical_rank": 3, "proposed_rank": 1}, {"player": "Devin Bush", "historical_rank": 1, "proposed_rank": 3}, {"player": "Derrick Barnes", "historical_rank": 6, "proposed_rank": 4}, {"player": "Dorian Williams", "historical_rank": 7, "proposed_rank": 5}, {"player": "D'Marco Jackson", "historical_rank": 4, "proposed_rank": 6}, {"player": "Malcolm Rodriguez", "historical_rank": 10, "proposed_rank": 7}, {"player": "Noah Sewell", "historical_rank": null, "proposed_rank": 9}, {"player": "Leo Chenal", "historical_rank": 5, "proposed_rank": 10}]`
- H2Hs: 10

### CB

- proposed_order: ['Trent McDuffie', 'Denzel Ward', 'Isaiah Rodgers', 'Jamel Dean', 'Jacob Parrish', 'Jaylen Watson', 'Devon Witherspoon', 'Quinyon Mitchell', "Ja'Quan McMillian", 'James Pierre']
- first_out: Mike Jackson
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (MEDIUM links: 3/10; LOW/Insufficient: 7/10)
- pass_boolean: True
- slots_changed: [1, 2, 3, 5, 6, 7, 8, 10]
- rank_changes: `[{"player": "Trent McDuffie", "historical_rank": 2, "proposed_rank": 1}, {"player": "Denzel Ward", "historical_rank": 3, "proposed_rank": 2}, {"player": "Isaiah Rodgers", "historical_rank": 5, "proposed_rank": 3}, {"player": "Jacob Parrish", "historical_rank": 10, "proposed_rank": 5}, {"player": "Jaylen Watson", "historical_rank": 7, "proposed_rank": 6}, {"player": "Devon Witherspoon", "historical_rank": 1, "proposed_rank": 7}, {"player": "Quinyon Mitchell", "historical_rank": 6, "proposed_rank": 8}, {"player": "James Pierre", "historical_rank": null, "proposed_rank": 10}]`
- H2Hs: 10

### FS

- proposed_order: ['Jalen Pitre', 'Quentin Lake', 'Tykee Smith', 'Minkah Fitzpatrick', 'Julian Love', 'Xavier McKinney', 'Antonio Johnson', 'Chuck Clark', 'Kevin Byard', 'Bryan Cook']
- first_out: Thomas Harper
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (MEDIUM links: 3/10; LOW/Insufficient: 7/10)
- pass_boolean: True
- slots_changed: [2, 3, 4, 5, 6, 7, 8, 9, 10]
- rank_changes: `[{"player": "Quentin Lake", "historical_rank": 6, "proposed_rank": 2}, {"player": "Tykee Smith", "historical_rank": 7, "proposed_rank": 3}, {"player": "Minkah Fitzpatrick", "historical_rank": 2, "proposed_rank": 4}, {"player": "Julian Love", "historical_rank": 4, "proposed_rank": 5}, {"player": "Xavier McKinney", "historical_rank": 5, "proposed_rank": 6}, {"player": "Antonio Johnson", "historical_rank": 3, "proposed_rank": 7}, {"player": "Chuck Clark", "historical_rank": null, "proposed_rank": 8}, {"player": "Kevin Byard", "historical_rank": 8, "proposed_rank": 9}, {"player": "Bryan Cook", "historical_rank": 9, "proposed_rank": 10}]`
- H2Hs: 10

### SS

- proposed_order: ['Evan Williams', 'Jessie Bates', 'Kyle Hamilton', 'Antoine Winfield Jr.', 'Tony Jefferson', 'Talanoa Hufanga', 'Brian Branch', 'Christian Roland-Wallace', 'Derwin James', 'Kamren Curl']
- first_out: Jaylinn Hawkins
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (MEDIUM links: 3/10; LOW/Insufficient: 7/10)
- pass_boolean: True
- slots_changed: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
- rank_changes: `[{"player": "Evan Williams", "historical_rank": 2, "proposed_rank": 1}, {"player": "Jessie Bates", "historical_rank": 3, "proposed_rank": 2}, {"player": "Kyle Hamilton", "historical_rank": 1, "proposed_rank": 3}, {"player": "Antoine Winfield Jr.", "historical_rank": 6, "proposed_rank": 4}, {"player": "Tony Jefferson", "historical_rank": 9, "proposed_rank": 5}, {"player": "Talanoa Hufanga", "historical_rank": 8, "proposed_rank": 6}, {"player": "Brian Branch", "historical_rank": 4, "proposed_rank": 7}, {"player": "Christian Roland-Wallace", "historical_rank": null, "proposed_rank": 8}, {"player": "Derwin James", "historical_rank": 5, "proposed_rank": 9}, {"player": "Kamren Curl", "historical_rank": 7, "proposed_rank": 10}]`
- H2Hs: 10

### K

- proposed_order: ['Chase McLaughlin', 'Will Reichard', "Ka'imi Fairbairn", 'Evan McPherson', 'Cam Little', 'Jason Myers', 'Joey Slye', 'Brandon Aubrey', 'Chris Boswell', 'Cameron Dicker']
- first_out: Eddy Pineiro
- board_status: `BOARD_SOLID_INFORMAL_PROPOSAL`
- engine_status: GAPS (MEDIUM/LOW edges; not ENGINE_SUPPORTABLE / not ACCEPTED)
- pass_boolean: True
- slots_changed: [1, 2, 3, 6, 7, 8]
- rank_changes: `[{"player": "Chase McLaughlin", "historical_rank": 3, "proposed_rank": 1}, {"player": "Will Reichard", "historical_rank": 1, "proposed_rank": 2}, {"player": "Ka'imi Fairbairn", "historical_rank": 2, "proposed_rank": 3}, {"player": "Jason Myers", "historical_rank": 7, "proposed_rank": 6}, {"player": "Joey Slye", "historical_rank": 8, "proposed_rank": 7}, {"player": "Brandon Aubrey", "historical_rank": 6, "proposed_rank": 8}]`
- H2Hs: 10

### P

- proposed_order: ['Michael Dickson', 'Corliss Waitman', 'Jordan Stout', 'Daniel Whelan', 'Jack Fox', 'Logan Cooke', 'Braden Mann', 'Tress Way', 'J.K. Scott', 'Austin McNamara']
- first_out: Bryan Anger
- board_status: `BOARD_SOLID_INFORMAL_PROPOSAL`
- engine_status: GAPS
- pass_boolean: True
- slots_changed: [2, 3, 4, 5, 6, 7, 8, 10]
- rank_changes: `[{"player": "Corliss Waitman", "historical_rank": 8, "proposed_rank": 2}, {"player": "Jordan Stout", "historical_rank": 2, "proposed_rank": 3}, {"player": "Daniel Whelan", "historical_rank": 3, "proposed_rank": 4}, {"player": "Jack Fox", "historical_rank": 6, "proposed_rank": 5}, {"player": "Logan Cooke", "historical_rank": 4, "proposed_rank": 6}, {"player": "Braden Mann", "historical_rank": 10, "proposed_rank": 7}, {"player": "Tress Way", "historical_rank": 5, "proposed_rank": 8}, {"player": "Austin McNamara", "historical_rank": 7, "proposed_rank": 10}]`
- H2Hs: 10

### FB

- proposed_order: None
- first_out: Brady Russell
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (matches offense-front `INSUFFICIENT_EVIDENCE_FOR_FINAL_CARD_ORDER`)
- pass_boolean: True
- H2Hs: 10

### LS

- proposed_order: None
- first_out: Joe Cardona
- board_status: `audited_candidate_gaps`
- engine_status: GAPS (every adjacent link would be Insufficient/LOW; not ENGINE_SUPPORTABLE)
- pass_boolean: True
- H2Hs: 10

## Notes

- Missing field extraction = validation issue; values not invented.
- No new acceptance IDs; relative draft only.
- Complete profiles with low trait evidence remain proposed, not validated locks.
- Chemistry / narrative claims were not 'fixed' to make tests pass.

