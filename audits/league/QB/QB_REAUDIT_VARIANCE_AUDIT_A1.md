# QB_REAUDIT_VARIANCE_AUDIT (Grok Bot analyst, attempt 1)

EA ratings not used.

```json
{
  "audit_id": "QB_REAUDIT_VARIANCE_AUDIT_A1",
  "task_id": "QB_REAUDIT_VARIANCE_AUDIT",
  "task_type": "variance_audit",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "QB",
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
  "players": [
    "Joe Burrow",
    "Lamar Jackson",
    "Dak Prescott",
    "Brock Purdy",
    "Josh Allen",
    "Jared Goff",
    "Drake Maye",
    "Geno Smith",
    "C.J. Stroud",
    "Patrick Mahomes",
    "Jordan Love",
    "Trevor Lawrence",
    "Matthew Stafford",
    "Kirk Cousins",
    "Caleb Williams",
    "Justin Herbert",
    "Sam Darnold"
  ],
  "variance_gaps": [
    {
      "player": "Joe Burrow",
      "attr": "SPD",
      "madden": 83,
      "ours": 70,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": 14.0,
      "ours_rank": 12.5,
      "metric": 0.197,
      "key_stats": [
        "metric 0.197 rank 14.0/17 vs ours rank 12.5"
      ]
    },
    {
      "player": "Joe Burrow",
      "attr": "ACC",
      "madden": 85,
      "ours": 74,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 14.0,
      "ours_rank": 11.5,
      "metric": 0.197,
      "key_stats": [
        "metric 0.197 rank 14.0/17 vs ours rank 11.5"
      ]
    },
    {
      "player": "Joe Burrow",
      "attr": "DAC",
      "madden": 96,
      "ours": 85,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 6.0,
      "ours_rank": 5.5,
      "metric": 0.429,
      "key_stats": [
        "metric 0.429 rank 6.0/17 vs ours rank 5.5"
      ]
    },
    {
      "player": "Joe Burrow",
      "attr": "RUN",
      "madden": 91,
      "ours": 80,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 5.0,
      "ours_rank": 7.5,
      "metric": 0.233,
      "key_stats": [
        "metric 0.233 rank 5.0/17 vs ours rank 7.5"
      ]
    },
    {
      "player": "Joe Burrow",
      "attr": "TUP",
      "madden": 97,
      "ours": 82,
      "delta": -15,
      "verdict": "SUPPORTED",
      "metric_rank": 8.0,
      "ours_rank": 3.0,
      "metric": -0.702,
      "key_stats": [
        "metric -0.702 rank 8.0/17 vs ours rank 3.0"
      ]
    },
    {
      "player": "Joe Burrow",
      "attr": "BSK",
      "madden": 91,
      "ours": 76,
      "delta": -15,
      "verdict": "SUPPORTED",
      "metric_rank": 7.0,
      "ours_rank": 10.0,
      "metric": -0.053,
      "key_stats": [
        "metric -0.053 rank 7.0/17 vs ours rank 10.0"
      ]
    },
    {
      "player": "Joe Burrow",
      "attr": "CAR",
      "madden": 62,
      "ours": 80,
      "delta": 18,
      "verdict": "SUPPORTED",
      "metric_rank": 4.0,
      "ours_rank": 9.0,
      "metric": -0.002,
      "key_stats": [
        "metric -0.002 rank 4.0/17 vs ours rank 9.0"
      ]
    },
    {
      "player": "Joe Burrow",
      "attr": "INJ",
      "madden": 88,
      "ours": 72,
      "delta": -16,
      "verdict": "SUPPORTED",
      "metric_rank": 16.0,
      "ours_rank": 14.5,
      "metric": 0.735,
      "key_stats": [
        "metric 0.735 rank 16.0/17 vs ours rank 14.5"
      ]
    },
    {
      "player": "Joe Burrow",
      "attr": "STA",
      "madden": 97,
      "ours": 84,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": 16.0,
      "ours_rank": 9.0,
      "metric": 0.735,
      "key_stats": [
        "metric 0.735 rank 16.0/17 vs ours rank 9.0",
        "judgment: stamina=in-game endurance; availability carried by INJ 72 (approved judgment, t33s4 variance record)"
      ]
    },
    {
      "player": "Joe Burrow",
      "attr": "TGH",
      "madden": 97,
      "ours": 82,
      "delta": -15,
      "verdict": "SUPPORTED",
      "metric_rank": 8.0,
      "ours_rank": 9.0,
      "metric": -0.702,
      "key_stats": [
        "metric -0.702 rank 8.0/17 vs ours rank 9.0"
      ]
    },
    {
      "player": "Lamar Jackson",
      "attr": "AWR",
      "madden": 95,
      "ours": 82,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": 5.0,
      "ours_rank": 10.0,
      "metric": 0.308,
      "key_stats": [
        "metric 0.308 rank 5.0/17 vs ours rank 10.0"
      ]
    },
    {
      "player": "Lamar Jackson",
      "attr": "MAC",
      "madden": 94,
      "ours": 82,
      "delta": -12,
      "verdict": "SUPPORTED",
      "metric_rank": 4.0,
      "ours_rank": 10.0,
      "metric": 0.598,
      "key_stats": [
        "metric 0.598 rank 4.0/17 vs ours rank 10.0",
        "judgment: intermediate completion cluster .555-.598 is within noise (Jackson .598 vs 6th .591); 82 sits mid-cluster"
      ]
    },
    {
      "player": "Lamar Jackson",
      "attr": "TUP",
      "madden": 95,
      "ours": 74,
      "delta": -21,
      "verdict": "SUPPORTED",
      "metric_rank": 17.0,
      "ours_rank": 12.0,
      "metric": -1.294,
      "key_stats": [
        "metric -1.294 rank 17.0/17 vs ours rank 12.0"
      ]
    },
    {
      "player": "Lamar Jackson",
      "attr": "PAC",
      "madden": 98,
      "ours": 87,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 1.0,
      "ours_rank": 3.5,
      "metric": 0.468,
      "key_stats": [
        "metric 0.468 rank 1.0/17 vs ours rank 3.5"
      ]
    },
    {
      "player": "Lamar Jackson",
      "attr": "BSK",
      "madden": 96,
      "ours": 78,
      "delta": -18,
      "verdict": "ADJUST",
      "metric_rank": 16.0,
      "ours_rank": 8.0,
      "metric": -0.098,
      "key_stats": [
        "metric -0.098 rank 16.0/17 vs ours rank 8.0",
        "sack rate 9.8% games-weighted, 16th of 17 (10.7% in 2025); approved 78 still 8th of our scale"
      ],
      "proposed_revision": "Lamar Jackson BSK 78->72 (add-only): sack rate 9.8% games-weighted, 16th of 17 (10.7% in 2025); approved 78 still 8th of our scale"
    },
    {
      "player": "Lamar Jackson",
      "attr": "JMP",
      "madden": 91,
      "ours": 80,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": null,
      "ours_rank": null,
      "key_stats": [
        "no public measure (JMP); neutral"
      ]
    },
    {
      "player": "Lamar Jackson",
      "attr": "INJ",
      "madden": 89,
      "ours": 68,
      "delta": -21,
      "verdict": "SUPPORTED",
      "metric_rank": 17.0,
      "ours_rank": 16.5,
      "metric": 0.695,
      "key_stats": [
        "metric 0.695 rank 17.0/17 vs ours rank 16.5"
      ]
    },
    {
      "player": "Lamar Jackson",
      "attr": "STA",
      "madden": 93,
      "ours": 80,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": 17.0,
      "ours_rank": 14.0,
      "metric": 0.695,
      "key_stats": [
        "metric 0.695 rank 17.0/17 vs ours rank 14.0"
      ]
    },
    {
      "player": "Lamar Jackson",
      "attr": "TGH",
      "madden": 96,
      "ours": 82,
      "delta": -14,
      "verdict": "SUPPORTED",
      "metric_rank": 17.0,
      "ours_rank": 9.0,
      "metric": -1.294,
      "key_stats": [
        "metric -1.294 rank 17.0/17 vs ours rank 9.0",
        "judgment: toughness=absorbing contact as a runner; pressured-EPA proxy measures passing"
      ]
    },
    {
      "player": "Lamar Jackson",
      "attr": "OVR",
      "madden": 95,
      "ours": 82,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": 11.0,
      "ours_rank": 9.5,
      "metric": 0.461,
      "key_stats": [
        "metric 0.461 rank 11.0/17 vs ours rank 9.5"
      ]
    },
    {
      "player": "Dak Prescott",
      "attr": "SPD",
      "madden": 84,
      "ours": 72,
      "delta": -12,
      "verdict": "SUPPORTED",
      "metric_rank": 10.0,
      "ours_rank": 11.0,
      "metric": 0.291,
      "key_stats": [
        "metric 0.291 rank 10.0/17 vs ours rank 11.0"
      ]
    },
    {
      "player": "Dak Prescott",
      "attr": "MAC",
      "madden": 90,
      "ours": 79,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 13.0,
      "ours_rank": 14.0,
      "metric": 0.555,
      "key_stats": [
        "metric 0.555 rank 13.0/17 vs ours rank 14.0"
      ]
    },
    {
      "player": "Dak Prescott",
      "attr": "DAC",
      "madden": 92,
      "ours": 80,
      "delta": -12,
      "verdict": "SUPPORTED",
      "metric_rank": 7.0,
      "ours_rank": 10.5,
      "metric": 0.426,
      "key_stats": [
        "metric 0.426 rank 7.0/17 vs ours rank 10.5"
      ]
    },
    {
      "player": "Dak Prescott",
      "attr": "RUN",
      "madden": 94,
      "ours": 74,
      "delta": -20,
      "verdict": "SUPPORTED",
      "metric_rank": 17.0,
      "ours_rank": 13.0,
      "metric": -0.192,
      "key_stats": [
        "metric -0.192 rank 17.0/17 vs ours rank 13.0"
      ]
    },
    {
      "player": "Dak Prescott",
      "attr": "CAR",
      "madden": 68,
      "ours": 82,
      "delta": 14,
      "verdict": "SUPPORTED",
      "metric_rank": 5.0,
      "ours_rank": 5.5,
      "metric": -0.002,
      "key_stats": [
        "metric -0.002 rank 5.0/17 vs ours rank 5.5"
      ]
    },
    {
      "player": "Dak Prescott",
      "attr": "TGH",
      "madden": 97,
      "ours": 87,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 3.0,
      "ours_rank": 3.0,
      "metric": -0.568,
      "key_stats": [
        "metric -0.568 rank 3.0/17 vs ours rank 3.0"
      ]
    },
    {
      "player": "Brock Purdy",
      "attr": "SPD",
      "madden": 86,
      "ours": 76,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 7.0,
      "ours_rank": 8.5,
      "metric": 0.555,
      "key_stats": [
        "metric 0.555 rank 7.0/17 vs ours rank 8.5"
      ]
    },
    {
      "player": "Brock Purdy",
      "attr": "ACC",
      "madden": 89,
      "ours": 78,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 7.0,
      "ours_rank": 8.5,
      "metric": 0.555,
      "key_stats": [
        "metric 0.555 rank 7.0/17 vs ours rank 8.5"
      ]
    },
    {
      "player": "Brock Purdy",
      "attr": "MAC",
      "madden": 96,
      "ours": 86,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 8.0,
      "ours_rank": 4.0,
      "metric": 0.588,
      "key_stats": [
        "metric 0.588 rank 8.0/17 vs ours rank 4.0"
      ]
    },
    {
      "player": "Brock Purdy",
      "attr": "RUN",
      "madden": 93,
      "ours": 83,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 6.0,
      "ours_rank": 5.0,
      "metric": 0.218,
      "key_stats": [
        "metric 0.218 rank 6.0/17 vs ours rank 5.0"
      ]
    },
    {
      "player": "Brock Purdy",
      "attr": "TUP",
      "madden": 92,
      "ours": 80,
      "delta": -12,
      "verdict": "SUPPORTED",
      "metric_rank": 2.0,
      "ours_rank": 6.0,
      "metric": -0.553,
      "key_stats": [
        "metric -0.553 rank 2.0/17 vs ours rank 6.0"
      ]
    },
    {
      "player": "Brock Purdy",
      "attr": "CAR",
      "madden": 64,
      "ours": 79,
      "delta": 15,
      "verdict": "SUPPORTED",
      "metric_rank": 8.0,
      "ours_rank": 11.0,
      "metric": -0.004,
      "key_stats": [
        "metric -0.004 rank 8.0/17 vs ours rank 11.0"
      ]
    },
    {
      "player": "Brock Purdy",
      "attr": "INJ",
      "madden": 89,
      "ours": 68,
      "delta": -21,
      "verdict": "SUPPORTED",
      "metric_rank": 15.0,
      "ours_rank": 16.5,
      "metric": 0.765,
      "key_stats": [
        "metric 0.765 rank 15.0/17 vs ours rank 16.5"
      ]
    },
    {
      "player": "Brock Purdy",
      "attr": "STA",
      "madden": 90,
      "ours": 74,
      "delta": -16,
      "verdict": "SUPPORTED",
      "metric_rank": 15.0,
      "ours_rank": 16.5,
      "metric": 0.765,
      "key_stats": [
        "metric 0.765 rank 15.0/17 vs ours rank 16.5"
      ]
    },
    {
      "player": "Josh Allen",
      "attr": "AWR",
      "madden": 96,
      "ours": 85,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 3.0,
      "ours_rank": 6.0,
      "metric": 0.309,
      "key_stats": [
        "metric 0.309 rank 3.0/17 vs ours rank 6.0"
      ]
    },
    {
      "player": "Josh Allen",
      "attr": "SAC",
      "madden": 97,
      "ours": 85,
      "delta": -12,
      "verdict": "SUPPORTED",
      "metric_rank": 1.0,
      "ours_rank": 6.0,
      "metric": 0.768,
      "key_stats": [
        "metric 0.768 rank 1.0/17 vs ours rank 6.0"
      ]
    },
    {
      "player": "Josh Allen",
      "attr": "DAC",
      "madden": 95,
      "ours": 82,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": 9.0,
      "ours_rank": 8.5,
      "metric": 0.405,
      "key_stats": [
        "metric 0.405 rank 9.0/17 vs ours rank 8.5"
      ]
    },
    {
      "player": "Josh Allen",
      "attr": "RUN",
      "madden": 98,
      "ours": 87,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 1.0,
      "ours_rank": 3.0,
      "metric": 0.292,
      "key_stats": [
        "metric 0.292 rank 1.0/17 vs ours rank 3.0"
      ]
    },
    {
      "player": "Josh Allen",
      "attr": "TUP",
      "madden": 94,
      "ours": 76,
      "delta": -18,
      "verdict": "SUPPORTED",
      "metric_rank": 10.0,
      "ours_rank": 10.5,
      "metric": -0.804,
      "key_stats": [
        "metric -0.804 rank 10.0/17 vs ours rank 10.5"
      ]
    },
    {
      "player": "Josh Allen",
      "attr": "PAC",
      "madden": 97,
      "ours": 87,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 3.0,
      "ours_rank": 3.5,
      "metric": 0.294,
      "key_stats": [
        "metric 0.294 rank 3.0/17 vs ours rank 3.5"
      ]
    },
    {
      "player": "Josh Allen",
      "attr": "BSK",
      "madden": 94,
      "ours": 80,
      "delta": -14,
      "verdict": "ADJUST",
      "metric_rank": 13.0,
      "ours_rank": 5.5,
      "metric": -0.073,
      "key_stats": [
        "metric -0.073 rank 13.0/17 vs ours rank 5.5",
        "sack rate 7.3%, 13th of 17; approved 80 still ~5th of our scale"
      ],
      "proposed_revision": "Josh Allen BSK 80->75 (add-only): sack rate 7.3%, 13th of 17; approved 80 still ~5th of our scale"
    },
    {
      "player": "Josh Allen",
      "attr": "CAR",
      "madden": 63,
      "ours": 78,
      "delta": 15,
      "verdict": "SUPPORTED",
      "metric_rank": 13.0,
      "ours_rank": 13.0,
      "metric": -0.005,
      "key_stats": [
        "metric -0.005 rank 13.0/17 vs ours rank 13.0"
      ]
    },
    {
      "player": "Josh Allen",
      "attr": "JMP",
      "madden": 92,
      "ours": 72,
      "delta": -20,
      "verdict": "SUPPORTED",
      "metric_rank": null,
      "ours_rank": null,
      "key_stats": [
        "no public measure (JMP); neutral"
      ]
    },
    {
      "player": "Josh Allen",
      "attr": "INJ",
      "madden": 99,
      "ours": 84,
      "delta": -15,
      "verdict": "SUPPORTED",
      "metric_rank": 6.5,
      "ours_rank": 7.0,
      "metric": 0.971,
      "key_stats": [
        "metric 0.971 rank 6.5/17 vs ours rank 7.0"
      ]
    },
    {
      "player": "Josh Allen",
      "attr": "STA",
      "madden": 98,
      "ours": 85,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": 6.5,
      "ours_rank": 7.0,
      "metric": 0.971,
      "key_stats": [
        "metric 0.971 rank 6.5/17 vs ours rank 7.0"
      ]
    },
    {
      "player": "Josh Allen",
      "attr": "TGH",
      "madden": 98,
      "ours": 88,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 10.0,
      "ours_rank": 1.5,
      "metric": -0.804,
      "key_stats": [
        "metric -0.804 rank 10.0/17 vs ours rank 1.5",
        "judgment: power runner absorbing contact; proxy does not measure toughness"
      ]
    },
    {
      "player": "Josh Allen",
      "attr": "OVR",
      "madden": 99,
      "ours": 88,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 3.0,
      "ours_rank": 2.0,
      "metric": 0.566,
      "key_stats": [
        "metric 0.566 rank 3.0/17 vs ours rank 2.0"
      ]
    },
    {
      "player": "Jared Goff",
      "attr": "SPD",
      "madden": 74,
      "ours": 60,
      "delta": -14,
      "verdict": "SUPPORTED",
      "metric_rank": 15.0,
      "ours_rank": 15.0,
      "metric": 0.081,
      "key_stats": [
        "metric 0.081 rank 15.0/17 vs ours rank 15.0"
      ]
    },
    {
      "player": "Jared Goff",
      "attr": "ACC",
      "madden": 79,
      "ours": 63,
      "delta": -16,
      "verdict": "SUPPORTED",
      "metric_rank": 15.0,
      "ours_rank": 15.0,
      "metric": 0.081,
      "key_stats": [
        "metric 0.081 rank 15.0/17 vs ours rank 15.0"
      ]
    },
    {
      "player": "Jared Goff",
      "attr": "AGI",
      "madden": 72,
      "ours": 62,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 15.0,
      "ours_rank": 15.0,
      "metric": 0.081,
      "key_stats": [
        "metric 0.081 rank 15.0/17 vs ours rank 15.0"
      ]
    },
    {
      "player": "Jared Goff",
      "attr": "SAC",
      "madden": 95,
      "ours": 85,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 10.0,
      "ours_rank": 6.0,
      "metric": 0.723,
      "key_stats": [
        "metric 0.723 rank 10.0/17 vs ours rank 6.0"
      ]
    },
    {
      "player": "Jared Goff",
      "attr": "RUN",
      "madden": 84,
      "ours": 66,
      "delta": -18,
      "verdict": "SUPPORTED",
      "metric_rank": 16.0,
      "ours_rank": 15.5,
      "metric": -0.136,
      "key_stats": [
        "metric -0.136 rank 16.0/17 vs ours rank 15.5"
      ]
    },
    {
      "player": "Jared Goff",
      "attr": "CAR",
      "madden": 58,
      "ours": 76,
      "delta": 18,
      "verdict": "SUPPORTED",
      "metric_rank": 15.0,
      "ours_rank": 15.5,
      "metric": -0.007,
      "key_stats": [
        "metric -0.007 rank 15.0/17 vs ours rank 15.5"
      ]
    },
    {
      "player": "Jared Goff",
      "attr": "TGH",
      "madden": 93,
      "ours": 82,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 7.0,
      "ours_rank": 9.0,
      "metric": -0.681,
      "key_stats": [
        "metric -0.681 rank 7.0/17 vs ours rank 9.0"
      ]
    },
    {
      "player": "Drake Maye",
      "attr": "STR",
      "madden": 62,
      "ours": 74,
      "delta": 12,
      "verdict": "SUPPORTED",
      "metric_rank": 6.0,
      "ours_rank": 5.0,
      "metric": 225,
      "key_stats": [
        "metric 225 rank 6.0/17 vs ours rank 5.0"
      ]
    },
    {
      "player": "Drake Maye",
      "attr": "TUP",
      "madden": 93,
      "ours": 80,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": 9.0,
      "ours_rank": 6.0,
      "metric": -0.727,
      "key_stats": [
        "metric -0.727 rank 9.0/17 vs ours rank 6.0"
      ]
    },
    {
      "player": "Drake Maye",
      "attr": "CAR",
      "madden": 65,
      "ours": 78,
      "delta": 13,
      "verdict": "SUPPORTED",
      "metric_rank": 14.0,
      "ours_rank": 13.0,
      "metric": -0.006,
      "key_stats": [
        "metric -0.006 rank 14.0/17 vs ours rank 13.0"
      ]
    },
    {
      "player": "Geno Smith",
      "attr": "SPD",
      "madden": 84,
      "ours": 68,
      "delta": -16,
      "verdict": "SUPPORTED",
      "metric_rank": 13.0,
      "ours_rank": 14.0,
      "metric": 0.205,
      "key_stats": [
        "metric 0.205 rank 13.0/17 vs ours rank 14.0"
      ]
    },
    {
      "player": "Geno Smith",
      "attr": "ACC",
      "madden": 82,
      "ours": 70,
      "delta": -12,
      "verdict": "SUPPORTED",
      "metric_rank": 13.0,
      "ours_rank": 14.0,
      "metric": 0.205,
      "key_stats": [
        "metric 0.205 rank 13.0/17 vs ours rank 14.0"
      ]
    },
    {
      "player": "Geno Smith",
      "attr": "AGI",
      "madden": 79,
      "ours": 69,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 13.0,
      "ours_rank": 14.0,
      "metric": 0.205,
      "key_stats": [
        "metric 0.205 rank 13.0/17 vs ours rank 14.0"
      ]
    },
    {
      "player": "Geno Smith",
      "attr": "STR",
      "madden": 58,
      "ours": 70,
      "delta": 12,
      "verdict": "SUPPORTED",
      "metric_rank": 8.0,
      "ours_rank": 9.5,
      "metric": 221,
      "key_stats": [
        "metric 221 rank 8.0/17 vs ours rank 9.5"
      ]
    },
    {
      "player": "Geno Smith",
      "attr": "RUN",
      "madden": 87,
      "ours": 72,
      "delta": -15,
      "verdict": "SUPPORTED",
      "metric_rank": 15.0,
      "ours_rank": 14.0,
      "metric": -0.127,
      "key_stats": [
        "metric -0.127 rank 15.0/17 vs ours rank 14.0"
      ]
    },
    {
      "player": "Geno Smith",
      "attr": "TUP",
      "madden": 81,
      "ours": 68,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": 16.0,
      "ours_rank": 15.0,
      "metric": -1.26,
      "key_stats": [
        "metric -1.26 rank 16.0/17 vs ours rank 15.0"
      ]
    },
    {
      "player": "Geno Smith",
      "attr": "CAR",
      "madden": 59,
      "ours": 80,
      "delta": 21,
      "verdict": "SUPPORTED",
      "metric_rank": 10.0,
      "ours_rank": 9.0,
      "metric": -0.004,
      "key_stats": [
        "metric -0.004 rank 10.0/17 vs ours rank 9.0"
      ]
    },
    {
      "player": "Geno Smith",
      "attr": "JMP",
      "madden": 81,
      "ours": 70,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": null,
      "ours_rank": null,
      "key_stats": [
        "no public measure (JMP); neutral"
      ]
    },
    {
      "player": "Geno Smith",
      "attr": "STA",
      "madden": 93,
      "ours": 82,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 8.5,
      "ours_rank": 11.5,
      "metric": 0.941,
      "key_stats": [
        "metric 0.941 rank 8.5/17 vs ours rank 11.5"
      ]
    },
    {
      "player": "C.J. Stroud",
      "attr": "TUP",
      "madden": 86,
      "ours": 64,
      "delta": -22,
      "verdict": "SUPPORTED",
      "metric_rank": 15.0,
      "ours_rank": 17.0,
      "metric": -1.018,
      "key_stats": [
        "metric -1.018 rank 15.0/17 vs ours rank 17.0"
      ]
    },
    {
      "player": "C.J. Stroud",
      "attr": "CAR",
      "madden": 61,
      "ours": 82,
      "delta": 21,
      "verdict": "SUPPORTED",
      "metric_rank": 6.0,
      "ours_rank": 5.5,
      "metric": -0.003,
      "key_stats": [
        "metric -0.003 rank 6.0/17 vs ours rank 5.5"
      ]
    },
    {
      "player": "C.J. Stroud",
      "attr": "INJ",
      "madden": 88,
      "ours": 78,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 11.5,
      "ours_rank": 11.5,
      "metric": 0.912,
      "key_stats": [
        "metric 0.912 rank 11.5/17 vs ours rank 11.5"
      ]
    },
    {
      "player": "C.J. Stroud",
      "attr": "TGH",
      "madden": 88,
      "ours": 76,
      "delta": -12,
      "verdict": "SUPPORTED",
      "metric_rank": 15.0,
      "ours_rank": 16.0,
      "metric": -1.018,
      "key_stats": [
        "metric -1.018 rank 15.0/17 vs ours rank 16.0"
      ]
    },
    {
      "player": "Patrick Mahomes",
      "attr": "AWR",
      "madden": 94,
      "ours": 84,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 11.0,
      "ours_rank": 8.0,
      "metric": 0.28,
      "key_stats": [
        "metric 0.28 rank 11.0/17 vs ours rank 8.0"
      ]
    },
    {
      "player": "Patrick Mahomes",
      "attr": "THP",
      "madden": 97,
      "ours": 85,
      "delta": -12,
      "verdict": "SUPPORTED",
      "metric_rank": 15.0,
      "ours_rank": 13.0,
      "metric": 7.386,
      "key_stats": [
        "metric 7.386 rank 15.0/17 vs ours rank 13.0"
      ]
    },
    {
      "player": "Patrick Mahomes",
      "attr": "SAC",
      "madden": 94,
      "ours": 83,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 16.0,
      "ours_rank": 12.0,
      "metric": 0.708,
      "key_stats": [
        "metric 0.708 rank 16.0/17 vs ours rank 12.0"
      ]
    },
    {
      "player": "Patrick Mahomes",
      "attr": "DAC",
      "madden": 86,
      "ours": 70,
      "delta": -16,
      "verdict": "SUPPORTED",
      "metric_rank": 17.0,
      "ours_rank": 17.0,
      "metric": 0.31,
      "key_stats": [
        "metric 0.31 rank 17.0/17 vs ours rank 17.0"
      ]
    },
    {
      "player": "Patrick Mahomes",
      "attr": "PAC",
      "madden": 96,
      "ours": 84,
      "delta": -12,
      "verdict": "SUPPORTED",
      "metric_rank": 13.0,
      "ours_rank": 10.0,
      "metric": 0.152,
      "key_stats": [
        "metric 0.152 rank 13.0/17 vs ours rank 10.0"
      ]
    },
    {
      "player": "Patrick Mahomes",
      "attr": "CAR",
      "madden": 66,
      "ours": 88,
      "delta": 22,
      "verdict": "SUPPORTED",
      "metric_rank": 1.0,
      "ours_rank": 1.0,
      "metric": -0.0,
      "key_stats": [
        "metric -0.0 rank 1.0/17 vs ours rank 1.0"
      ]
    },
    {
      "player": "Patrick Mahomes",
      "attr": "INJ",
      "madden": 96,
      "ours": 80,
      "delta": -16,
      "verdict": "SUPPORTED",
      "metric_rank": 11.5,
      "ours_rank": 10.0,
      "metric": 0.912,
      "key_stats": [
        "metric 0.912 rank 11.5/17 vs ours rank 10.0"
      ]
    },
    {
      "player": "Patrick Mahomes",
      "attr": "STA",
      "madden": 98,
      "ours": 82,
      "delta": -16,
      "verdict": "SUPPORTED",
      "metric_rank": 11.5,
      "ours_rank": 11.5,
      "metric": 0.912,
      "key_stats": [
        "metric 0.912 rank 11.5/17 vs ours rank 11.5"
      ]
    },
    {
      "player": "Patrick Mahomes",
      "attr": "TGH",
      "madden": 99,
      "ours": 84,
      "delta": -15,
      "verdict": "SUPPORTED",
      "metric_rank": 1.0,
      "ours_rank": 6.0,
      "metric": -0.433,
      "key_stats": [
        "metric -0.433 rank 1.0/17 vs ours rank 6.0"
      ]
    },
    {
      "player": "Patrick Mahomes",
      "attr": "OVR",
      "madden": 93,
      "ours": 81,
      "delta": -12,
      "verdict": "SUPPORTED",
      "metric_rank": 9.0,
      "ours_rank": 11.5,
      "metric": 0.474,
      "key_stats": [
        "metric 0.474 rank 9.0/17 vs ours rank 11.5"
      ]
    },
    {
      "player": "Jordan Love",
      "attr": "SPD",
      "madden": 85,
      "ours": 70,
      "delta": -15,
      "verdict": "SUPPORTED",
      "metric_rank": 11.0,
      "ours_rank": 12.5,
      "metric": 0.284,
      "key_stats": [
        "metric 0.284 rank 11.0/17 vs ours rank 12.5"
      ]
    },
    {
      "player": "Jordan Love",
      "attr": "ACC",
      "madden": 86,
      "ours": 72,
      "delta": -14,
      "verdict": "SUPPORTED",
      "metric_rank": 11.0,
      "ours_rank": 13.0,
      "metric": 0.284,
      "key_stats": [
        "metric 0.284 rank 11.0/17 vs ours rank 13.0"
      ]
    },
    {
      "player": "Jordan Love",
      "attr": "SAC",
      "madden": 91,
      "ours": 80,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 9.0,
      "ours_rank": 14.0,
      "metric": 0.728,
      "key_stats": [
        "metric 0.728 rank 9.0/17 vs ours rank 14.0"
      ]
    },
    {
      "player": "Jordan Love",
      "attr": "DAC",
      "madden": 86,
      "ours": 74,
      "delta": -12,
      "verdict": "SUPPORTED",
      "metric_rank": 12.0,
      "ours_rank": 15.5,
      "metric": 0.38,
      "key_stats": [
        "metric 0.38 rank 12.0/17 vs ours rank 15.5"
      ]
    },
    {
      "player": "Jordan Love",
      "attr": "RUN",
      "madden": 89,
      "ours": 76,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": 12.0,
      "ours_rank": 12.0,
      "metric": 0.052,
      "key_stats": [
        "metric 0.052 rank 12.0/17 vs ours rank 12.0"
      ]
    },
    {
      "player": "Jordan Love",
      "attr": "CAR",
      "madden": 67,
      "ours": 82,
      "delta": 15,
      "verdict": "SUPPORTED",
      "metric_rank": 9.0,
      "ours_rank": 5.5,
      "metric": -0.004,
      "key_stats": [
        "metric -0.004 rank 9.0/17 vs ours rank 5.5"
      ]
    },
    {
      "player": "Jordan Love",
      "attr": "JMP",
      "madden": 85,
      "ours": 70,
      "delta": -15,
      "verdict": "SUPPORTED",
      "metric_rank": null,
      "ours_rank": null,
      "key_stats": [
        "no public measure (JMP); neutral"
      ]
    },
    {
      "player": "Trevor Lawrence",
      "attr": "AGI",
      "madden": 88,
      "ours": 74,
      "delta": -14,
      "verdict": "SUPPORTED",
      "metric_rank": 8.0,
      "ours_rank": 9.0,
      "metric": 0.503,
      "key_stats": [
        "metric 0.503 rank 8.0/17 vs ours rank 9.0"
      ]
    },
    {
      "player": "Trevor Lawrence",
      "attr": "COD",
      "madden": 83,
      "ours": 72,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 8.0,
      "ours_rank": 9.0,
      "metric": 0.503,
      "key_stats": [
        "metric 0.503 rank 8.0/17 vs ours rank 9.0"
      ]
    },
    {
      "player": "Trevor Lawrence",
      "attr": "SAC",
      "madden": 93,
      "ours": 79,
      "delta": -14,
      "verdict": "SUPPORTED",
      "metric_rank": 17.0,
      "ours_rank": 15.5,
      "metric": 0.688,
      "key_stats": [
        "metric 0.688 rank 17.0/17 vs ours rank 15.5"
      ]
    },
    {
      "player": "Trevor Lawrence",
      "attr": "TUP",
      "madden": 89,
      "ours": 78,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 11.0,
      "ours_rank": 8.5,
      "metric": -0.818,
      "key_stats": [
        "metric -0.818 rank 11.0/17 vs ours rank 8.5"
      ]
    },
    {
      "player": "Trevor Lawrence",
      "attr": "CAR",
      "madden": 66,
      "ours": 78,
      "delta": 12,
      "verdict": "SUPPORTED",
      "metric_rank": 12.0,
      "ours_rank": 13.0,
      "metric": -0.004,
      "key_stats": [
        "metric -0.004 rank 12.0/17 vs ours rank 13.0"
      ]
    },
    {
      "player": "Trevor Lawrence",
      "attr": "JMP",
      "madden": 81,
      "ours": 70,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": null,
      "ours_rank": null,
      "key_stats": [
        "no public measure (JMP); neutral"
      ]
    },
    {
      "player": "Matthew Stafford",
      "attr": "SPD",
      "madden": 77,
      "ours": 58,
      "delta": -19,
      "verdict": "SUPPORTED",
      "metric_rank": 17.0,
      "ours_rank": 16.0,
      "metric": 0.051,
      "key_stats": [
        "metric 0.051 rank 17.0/17 vs ours rank 16.0"
      ]
    },
    {
      "player": "Matthew Stafford",
      "attr": "ACC",
      "madden": 73,
      "ours": 60,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": 17.0,
      "ours_rank": 16.0,
      "metric": 0.051,
      "key_stats": [
        "metric 0.051 rank 17.0/17 vs ours rank 16.0"
      ]
    },
    {
      "player": "Matthew Stafford",
      "attr": "AGI",
      "madden": 70,
      "ours": 60,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 17.0,
      "ours_rank": 16.0,
      "metric": 0.051,
      "key_stats": [
        "metric 0.051 rank 17.0/17 vs ours rank 16.0"
      ]
    },
    {
      "player": "Matthew Stafford",
      "attr": "AWR",
      "madden": 97,
      "ours": 85,
      "delta": -12,
      "verdict": "SUPPORTED",
      "metric_rank": 10.0,
      "ours_rank": 6.0,
      "metric": 0.283,
      "key_stats": [
        "metric 0.283 rank 10.0/17 vs ours rank 6.0"
      ]
    },
    {
      "player": "Matthew Stafford",
      "attr": "SAC",
      "madden": 99,
      "ours": 84,
      "delta": -15,
      "verdict": "SUPPORTED",
      "metric_rank": 6.0,
      "ours_rank": 9.5,
      "metric": 0.74,
      "key_stats": [
        "metric 0.74 rank 6.0/17 vs ours rank 9.5"
      ]
    },
    {
      "player": "Matthew Stafford",
      "attr": "MAC",
      "madden": 97,
      "ours": 82,
      "delta": -15,
      "verdict": "SUPPORTED",
      "metric_rank": 11.0,
      "ours_rank": 10.0,
      "metric": 0.571,
      "key_stats": [
        "metric 0.571 rank 11.0/17 vs ours rank 10.0"
      ]
    },
    {
      "player": "Matthew Stafford",
      "attr": "DAC",
      "madden": 94,
      "ours": 78,
      "delta": -16,
      "verdict": "SUPPORTED",
      "metric_rank": 13.0,
      "ours_rank": 12.0,
      "metric": 0.377,
      "key_stats": [
        "metric 0.377 rank 13.0/17 vs ours rank 12.0"
      ]
    },
    {
      "player": "Matthew Stafford",
      "attr": "RUN",
      "madden": 90,
      "ours": 66,
      "delta": -24,
      "verdict": "SUPPORTED",
      "metric_rank": 13.0,
      "ours_rank": 15.5,
      "metric": 0.028,
      "key_stats": [
        "metric 0.028 rank 13.0/17 vs ours rank 15.5"
      ]
    },
    {
      "player": "Matthew Stafford",
      "attr": "CAR",
      "madden": 62,
      "ours": 82,
      "delta": 20,
      "verdict": "SUPPORTED",
      "metric_rank": 7.0,
      "ours_rank": 5.5,
      "metric": -0.003,
      "key_stats": [
        "metric -0.003 rank 7.0/17 vs ours rank 5.5"
      ]
    },
    {
      "player": "Matthew Stafford",
      "attr": "TGH",
      "madden": 98,
      "ours": 88,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 6.0,
      "ours_rank": 1.5,
      "metric": -0.643,
      "key_stats": [
        "metric -0.643 rank 6.0/17 vs ours rank 1.5"
      ]
    },
    {
      "player": "Matthew Stafford",
      "attr": "OVR",
      "madden": 98,
      "ours": 83,
      "delta": -15,
      "verdict": "SUPPORTED",
      "metric_rank": 8.0,
      "ours_rank": 7.5,
      "metric": 0.487,
      "key_stats": [
        "metric 0.487 rank 8.0/17 vs ours rank 7.5"
      ]
    },
    {
      "player": "Kirk Cousins",
      "attr": "SPD",
      "madden": 69,
      "ours": 55,
      "delta": -14,
      "verdict": "SUPPORTED",
      "metric_rank": 16.0,
      "ours_rank": 17.0,
      "metric": 0.062,
      "key_stats": [
        "metric 0.062 rank 16.0/17 vs ours rank 17.0"
      ]
    },
    {
      "player": "Kirk Cousins",
      "attr": "AGI",
      "madden": 69,
      "ours": 58,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 16.0,
      "ours_rank": 17.0,
      "metric": 0.062,
      "key_stats": [
        "metric 0.062 rank 16.0/17 vs ours rank 17.0"
      ]
    },
    {
      "player": "Kirk Cousins",
      "attr": "COD",
      "madden": 67,
      "ours": 56,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 16.0,
      "ours_rank": 17.0,
      "metric": 0.062,
      "key_stats": [
        "metric 0.062 rank 16.0/17 vs ours rank 17.0"
      ]
    },
    {
      "player": "Kirk Cousins",
      "attr": "STR",
      "madden": 52,
      "ours": 64,
      "delta": 12,
      "verdict": "SUPPORTED",
      "metric_rank": 16.0,
      "ours_rank": 15.0,
      "metric": 209,
      "key_stats": [
        "metric 209 rank 16.0/17 vs ours rank 15.0"
      ]
    },
    {
      "player": "Kirk Cousins",
      "attr": "RUN",
      "madden": 84,
      "ours": 62,
      "delta": -22,
      "verdict": "SUPPORTED",
      "metric_rank": 14.0,
      "ours_rank": 17.0,
      "metric": -0.105,
      "key_stats": [
        "metric -0.105 rank 14.0/17 vs ours rank 17.0"
      ]
    },
    {
      "player": "Kirk Cousins",
      "attr": "BSK",
      "madden": 44,
      "ours": 80,
      "delta": 36,
      "verdict": "SUPPORTED",
      "metric_rank": 3.0,
      "ours_rank": 5.5,
      "metric": -0.041,
      "key_stats": [
        "metric -0.041 rank 3.0/17 vs ours rank 5.5"
      ]
    },
    {
      "player": "Kirk Cousins",
      "attr": "CAR",
      "madden": 58,
      "ours": 84,
      "delta": 26,
      "verdict": "SUPPORTED",
      "metric_rank": 3.0,
      "ours_rank": 2.5,
      "metric": -0.002,
      "key_stats": [
        "metric -0.002 rank 3.0/17 vs ours rank 2.5"
      ]
    },
    {
      "player": "Kirk Cousins",
      "attr": "INJ",
      "madden": 85,
      "ours": 74,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 13.0,
      "ours_rank": 13.0,
      "metric": 0.794,
      "key_stats": [
        "metric 0.794 rank 13.0/17 vs ours rank 13.0"
      ]
    },
    {
      "player": "Kirk Cousins",
      "attr": "TGH",
      "madden": 93,
      "ours": 76,
      "delta": -17,
      "verdict": "SUPPORTED",
      "metric_rank": 5.0,
      "ours_rank": 16.0,
      "metric": -0.588,
      "key_stats": [
        "metric -0.588 rank 5.0/17 vs ours rank 16.0",
        "judgment: low hit volume, 2023 Achilles; proxy does not measure toughness"
      ]
    },
    {
      "player": "Caleb Williams",
      "attr": "SPD",
      "madden": 91,
      "ours": 81,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 5.0,
      "ours_rank": 4.0,
      "metric": 0.648,
      "key_stats": [
        "metric 0.648 rank 5.0/17 vs ours rank 4.0"
      ]
    },
    {
      "player": "Caleb Williams",
      "attr": "ACC",
      "madden": 93,
      "ours": 82,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 5.0,
      "ours_rank": 4.0,
      "metric": 0.648,
      "key_stats": [
        "metric 0.648 rank 5.0/17 vs ours rank 4.0"
      ]
    },
    {
      "player": "Caleb Williams",
      "attr": "AWR",
      "madden": 93,
      "ours": 80,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": 13.0,
      "ours_rank": 13.0,
      "metric": 0.272,
      "key_stats": [
        "metric 0.272 rank 13.0/17 vs ours rank 13.0"
      ]
    },
    {
      "player": "Caleb Williams",
      "attr": "THP",
      "madden": 97,
      "ours": 87,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 7.0,
      "ours_rank": 8.0,
      "metric": 8.306,
      "key_stats": [
        "metric 8.306 rank 7.0/17 vs ours rank 8.0"
      ]
    },
    {
      "player": "Caleb Williams",
      "attr": "MAC",
      "madden": 87,
      "ours": 74,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": 17.0,
      "ours_rank": 17.0,
      "metric": 0.407,
      "key_stats": [
        "metric 0.407 rank 17.0/17 vs ours rank 17.0"
      ]
    },
    {
      "player": "Caleb Williams",
      "attr": "RUN",
      "madden": 97,
      "ours": 80,
      "delta": -17,
      "verdict": "SUPPORTED",
      "metric_rank": 11.0,
      "ours_rank": 7.5,
      "metric": 0.053,
      "key_stats": [
        "metric 0.053 rank 11.0/17 vs ours rank 7.5"
      ]
    },
    {
      "player": "Caleb Williams",
      "attr": "TUP",
      "madden": 88,
      "ours": 70,
      "delta": -18,
      "verdict": "SUPPORTED",
      "metric_rank": 12.0,
      "ours_rank": 13.5,
      "metric": -0.88,
      "key_stats": [
        "metric -0.88 rank 12.0/17 vs ours rank 13.5"
      ]
    },
    {
      "player": "Caleb Williams",
      "attr": "BSK",
      "madden": 95,
      "ours": 76,
      "delta": -19,
      "verdict": "SUPPORTED",
      "metric_rank": 6.0,
      "ours_rank": 10.0,
      "metric": -0.049,
      "key_stats": [
        "metric -0.049 rank 6.0/17 vs ours rank 10.0"
      ]
    },
    {
      "player": "Caleb Williams",
      "attr": "CAR",
      "madden": 61,
      "ours": 84,
      "delta": 23,
      "verdict": "SUPPORTED",
      "metric_rank": 2.0,
      "ours_rank": 2.5,
      "metric": -0.001,
      "key_stats": [
        "metric -0.001 rank 2.0/17 vs ours rank 2.5"
      ]
    },
    {
      "player": "Caleb Williams",
      "attr": "JMP",
      "madden": 83,
      "ours": 70,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": null,
      "ours_rank": null,
      "key_stats": [
        "no public measure (JMP); neutral"
      ]
    },
    {
      "player": "Caleb Williams",
      "attr": "INJ",
      "madden": 95,
      "ours": 72,
      "delta": -23,
      "verdict": "SUPPORTED",
      "metric_rank": 14.0,
      "ours_rank": 14.5,
      "metric": 0.786,
      "key_stats": [
        "metric 0.786 rank 14.0/17 vs ours rank 14.5"
      ]
    },
    {
      "player": "Caleb Williams",
      "attr": "STA",
      "madden": 95,
      "ours": 74,
      "delta": -21,
      "verdict": "SUPPORTED",
      "metric_rank": 14.0,
      "ours_rank": 16.5,
      "metric": 0.786,
      "key_stats": [
        "metric 0.786 rank 14.0/17 vs ours rank 16.5"
      ]
    },
    {
      "player": "Caleb Williams",
      "attr": "TGH",
      "madden": 93,
      "ours": 78,
      "delta": -15,
      "verdict": "SUPPORTED",
      "metric_rank": 12.0,
      "ours_rank": 14.0,
      "metric": -0.88,
      "key_stats": [
        "metric -0.88 rank 12.0/17 vs ours rank 14.0"
      ]
    },
    {
      "player": "Caleb Williams",
      "attr": "OVR",
      "madden": 94,
      "ours": 81,
      "delta": -13,
      "verdict": "SUPPORTED",
      "metric_rank": 12.0,
      "ours_rank": 11.5,
      "metric": 0.419,
      "key_stats": [
        "metric 0.419 rank 12.0/17 vs ours rank 11.5"
      ]
    },
    {
      "player": "Justin Herbert",
      "attr": "SAC",
      "madden": 92,
      "ours": 78,
      "delta": -14,
      "verdict": "SUPPORTED",
      "metric_rank": 11.0,
      "ours_rank": 17.0,
      "metric": 0.718,
      "key_stats": [
        "metric 0.718 rank 11.0/17 vs ours rank 17.0",
        "judgment: short completion .718 ties Cousins .718 / Williams .717; bottom cluster within 0.01; 78 consistent"
      ]
    },
    {
      "player": "Justin Herbert",
      "attr": "RUN",
      "madden": 92,
      "ours": 78,
      "delta": -14,
      "verdict": "SUPPORTED",
      "metric_rank": 9.0,
      "ours_rank": 10.0,
      "metric": 0.117,
      "key_stats": [
        "metric 0.117 rank 9.0/17 vs ours rank 10.0"
      ]
    },
    {
      "player": "Justin Herbert",
      "attr": "TUP",
      "madden": 87,
      "ours": 66,
      "delta": -21,
      "verdict": "SUPPORTED",
      "metric_rank": 13.0,
      "ours_rank": 16.0,
      "metric": -0.949,
      "key_stats": [
        "metric -0.949 rank 13.0/17 vs ours rank 16.0"
      ]
    },
    {
      "player": "Justin Herbert",
      "attr": "PAC",
      "madden": 89,
      "ours": 70,
      "delta": -19,
      "verdict": "SUPPORTED",
      "metric_rank": 16.0,
      "ours_rank": 17.0,
      "metric": 0.029,
      "key_stats": [
        "metric 0.029 rank 16.0/17 vs ours rank 17.0"
      ]
    },
    {
      "player": "Justin Herbert",
      "attr": "BSK",
      "madden": 82,
      "ours": 70,
      "delta": -12,
      "verdict": "SUPPORTED",
      "metric_rank": 15.0,
      "ours_rank": 16.0,
      "metric": -0.096,
      "key_stats": [
        "metric -0.096 rank 15.0/17 vs ours rank 16.0"
      ]
    },
    {
      "player": "Justin Herbert",
      "attr": "CAR",
      "madden": 68,
      "ours": 80,
      "delta": 12,
      "verdict": "SUPPORTED",
      "metric_rank": 11.0,
      "ours_rank": 9.0,
      "metric": -0.004,
      "key_stats": [
        "metric -0.004 rank 11.0/17 vs ours rank 9.0"
      ]
    },
    {
      "player": "Justin Herbert",
      "attr": "JMP",
      "madden": 84,
      "ours": 70,
      "delta": -14,
      "verdict": "SUPPORTED",
      "metric_rank": null,
      "ours_rank": null,
      "key_stats": [
        "no public measure (JMP); neutral"
      ]
    },
    {
      "player": "Justin Herbert",
      "attr": "STA",
      "madden": 94,
      "ours": 84,
      "delta": -10,
      "verdict": "SUPPORTED",
      "metric_rank": 6.5,
      "ours_rank": 9.0,
      "metric": 0.971,
      "key_stats": [
        "metric 0.971 rank 6.5/17 vs ours rank 9.0"
      ]
    },
    {
      "player": "Sam Darnold",
      "attr": "STR",
      "madden": 60,
      "ours": 72,
      "delta": 12,
      "verdict": "SUPPORTED",
      "metric_rank": 6.0,
      "ours_rank": 7.0,
      "metric": 225,
      "key_stats": [
        "metric 225 rank 6.0/17 vs ours rank 7.0"
      ]
    },
    {
      "player": "Sam Darnold",
      "attr": "SAC",
      "madden": 90,
      "ours": 79,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 15.0,
      "ours_rank": 15.5,
      "metric": 0.709,
      "key_stats": [
        "metric 0.709 rank 15.0/17 vs ours rank 15.5"
      ]
    },
    {
      "player": "Sam Darnold",
      "attr": "RUN",
      "madden": 90,
      "ours": 78,
      "delta": -12,
      "verdict": "SUPPORTED",
      "metric_rank": 7.0,
      "ours_rank": 10.0,
      "metric": 0.216,
      "key_stats": [
        "metric 0.216 rank 7.0/17 vs ours rank 10.0"
      ]
    },
    {
      "player": "Sam Darnold",
      "attr": "TUP",
      "madden": 86,
      "ours": 70,
      "delta": -16,
      "verdict": "SUPPORTED",
      "metric_rank": 14.0,
      "ours_rank": 13.5,
      "metric": -1.006,
      "key_stats": [
        "metric -1.006 rank 14.0/17 vs ours rank 13.5"
      ]
    },
    {
      "player": "Sam Darnold",
      "attr": "CAR",
      "madden": 57,
      "ours": 68,
      "delta": 11,
      "verdict": "SUPPORTED",
      "metric_rank": 17.0,
      "ours_rank": 17.0,
      "metric": -0.008,
      "key_stats": [
        "metric -0.008 rank 17.0/17 vs ours rank 17.0"
      ]
    },
    {
      "player": "Sam Darnold",
      "attr": "TGH",
      "madden": 91,
      "ours": 80,
      "delta": -11,
      "verdict": "SUPPORTED",
      "metric_rank": 14.0,
      "ours_rank": 12.0,
      "metric": -1.006,
      "key_stats": [
        "metric -1.006 rank 14.0/17 vs ours rank 12.0"
      ]
    }
  ],
  "madden_used_as_evidence": false,
  "variance_threshold": 10,
  "metrics_used": "config/variance-metrics.json QB (nflverse pbp + FTN charting 2025-26 REG games-weighted, NGS time to throw, PFF grades)",
  "summary": "141 gaps >=10 after the t33s4 fixes: 139 SUPPORTED, 2 ADJUST",
  "major_flags": [
    "VARIANCE_RESIDUAL_ADJUST: Lamar Jackson BSK 78->72 (add-only): sack rate 9.8% games-weighted, 16th of 17 (10.7% in 2025); approved 78 still 8th of our scale; Josh Allen BSK 80->75 (add-only): sack rate 7.3%, 13th of 17; approved 80 still ~5th of our scale"
  ],
  "locked_control_conflict": false
}
```
