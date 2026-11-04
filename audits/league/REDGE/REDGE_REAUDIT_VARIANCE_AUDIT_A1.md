# REDGE_REAUDIT_VARIANCE_AUDIT (v1.1.2; authorized t46u)

```json
{
  "audit_id": "REDGE_REAUDIT_VARIANCE_AUDIT_A1",
  "task_id": "REDGE_REAUDIT_VARIANCE_AUDIT",
  "task_type": "variance_audit",
  "audit_type": "TOP10_REAUDIT",
  "audit_order": "1.1.2",
  "position": "REDGE",
  "methodology_version": "1.1.0",
  "confidence": "MEDIUM",
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
    "Al-Quadin Muhammad",
    "Khalil Mack",
    "Trey Hendrickson"
  ],
  "variance_gaps": [
    {
      "player": "Myles Garrett",
      "attr": "BSH",
      "madden": 96,
      "ours": 86,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Myles Garrett 2025: PFF edge 2025 overall 92.7 on 869 snaps (507 pass-rush, 362 run-defense, 0 coverage); PFR 2025 53 pressures (14 hurries, 14 QB knockdowns, 23 sacks), 60 tackles, 2 missed; 17 g / 868 def snaps; 23.0 sacks, 39 QB hits, 33 TFL, 3 FF, 1 PD; 6 accepted penalties",
        "Myles Garrett 2026: PFF edge 2026 overall 64.7 on 40 snaps (28 pass-rush, 12 run-defense, 0 coverage); PFR 2026 1 pressures (1 hurries, 0 QB hits, 0.0 sacks) in 1 games, 0 tackles, 0 missed; 1 g / 40 def snaps; no stats; 0 accepted penalties",
        "PFR 2025 53 pressures (14 hurries, 14 QB knockdowns, 23 sacks), 60 tackles, 2 missed; PFR 2026 1 pressures (1 hurries, 0 QB hits, 0.0 sacks) in 1 games, 0 tackles, 0 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 126 / right 370 -> REDGE; injuries no injury designation 2025-26; roster RES"
      ],
      "basis": "run-defense snaps, TFL, ESPN RSWR, PFF overall"
    },
    {
      "player": "Micah Parsons",
      "attr": "STR",
      "madden": 91,
      "ours": 74,
      "delta": -17,
      "verdict": "ADJUST",
      "key_stats": [
        "Micah Parsons 2025: PFF edge 2025 overall 91.9 on 707 snaps (436 pass-rush, 264 run-defense, 7 coverage); PFR 2025 48 pressures (22 hurries, 12 QB knockdowns, 12.5 sacks), 41 tackles, 3 missed; 14 g / 707 def snaps; 12.5 sacks, 27 QB hits, 12 TFL, 2 FF, 1 PD; 6 accepted penalties",
        "Micah Parsons 2026: no PFF edge grade 2026; no PFR 2026 pressure line; no snaps; no stats; 0 accepted penalties",
        "PFR 2025 48 pressures (22 hurries, 12 QB knockdowns, 12.5 sacks), 41 tackles, 3 missed; no PFR 2026 pressure line",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 496 -> REDGE; injuries wk1 Questionable (Back); wk2 Questionable (Back); roster RES"
      ],
      "basis": "power-rush and point-of-attack profile: PFF overall, run-defense snap volume, QB knockdowns",
      "proposed_revision": {
        "attr": "STR",
        "from": 74,
        "to": 78,
        "why": "12.5 sacks, 12 QB knockdowns and 264 run-defense snaps in 2025 show more functional power than 74 (-17 vs Madden) credits; 78 still keeps him a speed-first rusher below Garrett/Hunter in STR",
        "task_id": "REDGE_REAUDIT_RATE_02",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Micah Parsons",
      "attr": "AWR",
      "madden": 98,
      "ours": 86,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Micah Parsons 2025: PFF edge 2025 overall 91.9 on 707 snaps (436 pass-rush, 264 run-defense, 7 coverage); PFR 2025 48 pressures (22 hurries, 12 QB knockdowns, 12.5 sacks), 41 tackles, 3 missed; 14 g / 707 def snaps; 12.5 sacks, 27 QB hits, 12 TFL, 2 FF, 1 PD; 6 accepted penalties",
        "Micah Parsons 2026: no PFF edge grade 2026; no PFR 2026 pressure line; no snaps; no stats; 0 accepted penalties",
        "PFR 2025 48 pressures (22 hurries, 12 QB knockdowns, 12.5 sacks), 41 tackles, 3 missed; no PFR 2026 pressure line",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 496 -> REDGE; injuries wk1 Questionable (Back); wk2 Questionable (Back); roster RES"
      ],
      "basis": "PFF overall + penalties + missed tackles"
    },
    {
      "player": "Micah Parsons",
      "attr": "PRC",
      "madden": 96,
      "ours": 86,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Micah Parsons 2025: PFF edge 2025 overall 91.9 on 707 snaps (436 pass-rush, 264 run-defense, 7 coverage); PFR 2025 48 pressures (22 hurries, 12 QB knockdowns, 12.5 sacks), 41 tackles, 3 missed; 14 g / 707 def snaps; 12.5 sacks, 27 QB hits, 12 TFL, 2 FF, 1 PD; 6 accepted penalties",
        "Micah Parsons 2026: no PFF edge grade 2026; no PFR 2026 pressure line; no snaps; no stats; 0 accepted penalties",
        "PFR 2025 48 pressures (22 hurries, 12 QB knockdowns, 12.5 sacks), 41 tackles, 3 missed; no PFR 2026 pressure line",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 496 -> REDGE; injuries wk1 Questionable (Back); wk2 Questionable (Back); roster RES"
      ],
      "basis": "run-defense snaps, TFL, ESPN RSWR"
    },
    {
      "player": "Micah Parsons",
      "attr": "PMV",
      "madden": 92,
      "ours": 80,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Micah Parsons 2025: PFF edge 2025 overall 91.9 on 707 snaps (436 pass-rush, 264 run-defense, 7 coverage); PFR 2025 48 pressures (22 hurries, 12 QB knockdowns, 12.5 sacks), 41 tackles, 3 missed; 14 g / 707 def snaps; 12.5 sacks, 27 QB hits, 12 TFL, 2 FF, 1 PD; 6 accepted penalties",
        "Micah Parsons 2026: no PFF edge grade 2026; no PFR 2026 pressure line; no snaps; no stats; 0 accepted penalties",
        "PFR 2025 48 pressures (22 hurries, 12 QB knockdowns, 12.5 sacks), 41 tackles, 3 missed; no PFR 2026 pressure line",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 496 -> REDGE; injuries wk1 Questionable (Back); wk2 Questionable (Back); roster RES"
      ],
      "basis": "pressures, QB knockdowns, sacks, PRWR"
    },
    {
      "player": "Micah Parsons",
      "attr": "INJ",
      "madden": 92,
      "ours": 72,
      "delta": -20,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Micah Parsons 2025: PFF edge 2025 overall 91.9 on 707 snaps (436 pass-rush, 264 run-defense, 7 coverage); PFR 2025 48 pressures (22 hurries, 12 QB knockdowns, 12.5 sacks), 41 tackles, 3 missed; 14 g / 707 def snaps; 12.5 sacks, 27 QB hits, 12 TFL, 2 FF, 1 PD; 6 accepted penalties",
        "Micah Parsons 2026: no PFF edge grade 2026; no PFR 2026 pressure line; no snaps; no stats; 0 accepted penalties",
        "PFR 2025 48 pressures (22 hurries, 12 QB knockdowns, 12.5 sacks), 41 tackles, 3 missed; no PFR 2026 pressure line",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 496 -> REDGE; injuries wk1 Questionable (Back); wk2 Questionable (Back); roster RES"
      ],
      "basis": "availability: injury reports, reserve/IR, games"
    },
    {
      "player": "Danielle Hunter",
      "attr": "AGI",
      "madden": 82,
      "ours": 72,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Danielle Hunter 2025: PFF edge 2025 overall 89.9 on 819 snaps (563 pass-rush, 253 run-defense, 3 coverage); PFR 2025 34 pressures (9 hurries, 9 QB knockdowns, 15 sacks), 54 tackles, 4 missed; 17 g / 728 def snaps; 15.0 sacks, 22 QB hits, 15 TFL, 3 FF, 3 PD; 1 accepted penalties",
        "Danielle Hunter 2026: PFF edge 2026 overall 80.5 on 358 snaps (228 pass-rush, 127 run-defense, 3 coverage); PFR 2026 17 pressures (8 hurries, 4 QB hits, 4.0 sacks) in 7 games, 17 tackles, 1 missed; 7 g / 360 def snaps; 4.0 sacks, 9 QB hits, 3 TFL, 1 FF, 4 PD; 0 accepted penalties",
        "PFR 2025 34 pressures (9 hurries, 9 QB knockdowns, 15 sacks), 54 tackles, 4 missed; PFR 2026 17 pressures (8 hurries, 4 QB hits, 4.0 sacks) in 7 games, 17 tackles, 1 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 59 / right 437 -> REDGE; injuries no injury designation 2025-26; roster ACT"
      ],
      "basis": "movement (no public tracking data); LOW confidence"
    },
    {
      "player": "Danielle Hunter",
      "attr": "FMV",
      "madden": 95,
      "ours": 82,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Danielle Hunter 2025: PFF edge 2025 overall 89.9 on 819 snaps (563 pass-rush, 253 run-defense, 3 coverage); PFR 2025 34 pressures (9 hurries, 9 QB knockdowns, 15 sacks), 54 tackles, 4 missed; 17 g / 728 def snaps; 15.0 sacks, 22 QB hits, 15 TFL, 3 FF, 3 PD; 1 accepted penalties",
        "Danielle Hunter 2026: PFF edge 2026 overall 80.5 on 358 snaps (228 pass-rush, 127 run-defense, 3 coverage); PFR 2026 17 pressures (8 hurries, 4 QB hits, 4.0 sacks) in 7 games, 17 tackles, 1 missed; 7 g / 360 def snaps; 4.0 sacks, 9 QB hits, 3 TFL, 1 FF, 4 PD; 0 accepted penalties",
        "PFR 2025 34 pressures (9 hurries, 9 QB knockdowns, 15 sacks), 54 tackles, 4 missed; PFR 2026 17 pressures (8 hurries, 4 QB hits, 4.0 sacks) in 7 games, 17 tackles, 1 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 59 / right 437 -> REDGE; injuries no injury designation 2025-26; roster ACT"
      ],
      "basis": "pressures, hurries, sacks, ESPN PRWR"
    },
    {
      "player": "Danielle Hunter",
      "attr": "PUR",
      "madden": 91,
      "ours": 80,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Danielle Hunter 2025: PFF edge 2025 overall 89.9 on 819 snaps (563 pass-rush, 253 run-defense, 3 coverage); PFR 2025 34 pressures (9 hurries, 9 QB knockdowns, 15 sacks), 54 tackles, 4 missed; 17 g / 728 def snaps; 15.0 sacks, 22 QB hits, 15 TFL, 3 FF, 3 PD; 1 accepted penalties",
        "Danielle Hunter 2026: PFF edge 2026 overall 80.5 on 358 snaps (228 pass-rush, 127 run-defense, 3 coverage); PFR 2026 17 pressures (8 hurries, 4 QB hits, 4.0 sacks) in 7 games, 17 tackles, 1 missed; 7 g / 360 def snaps; 4.0 sacks, 9 QB hits, 3 TFL, 1 FF, 4 PD; 0 accepted penalties",
        "PFR 2025 34 pressures (9 hurries, 9 QB knockdowns, 15 sacks), 54 tackles, 4 missed; PFR 2026 17 pressures (8 hurries, 4 QB hits, 4.0 sacks) in 7 games, 17 tackles, 1 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 59 / right 437 -> REDGE; injuries no injury designation 2025-26; roster ACT"
      ],
      "basis": "tackles, TFL, run-defense snaps"
    },
    {
      "player": "Josh Hines-Allen",
      "attr": "AWR",
      "madden": 94,
      "ours": 82,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Josh Hines-Allen 2025: PFF edge 2025 overall 87.4 on 903 snaps (591 pass-rush, 271 run-defense, 41 coverage); PFR 2025 46 pressures (20 hurries, 17 QB knockdowns, 8 sacks), 49 tackles, 9 missed; 17 g / 845 def snaps; 8.0 sacks, 28 QB hits, 12 TFL, 0 FF, 3 PD; 4 accepted penalties",
        "Josh Hines-Allen 2026: PFF edge 2026 overall 79.4 on 332 snaps (211 pass-rush, 96 run-defense, 25 coverage); PFR 2026 12 pressures (4 hurries, 6 QB hits, 1.5 sacks) in 5 games, 17 tackles, 2 missed; 7 g / 332 def snaps; 2.0 sacks, 9 QB hits, 4 TFL, 1 FF, 1 PD; 0 accepted penalties",
        "PFR 2025 46 pressures (20 hurries, 17 QB knockdowns, 8 sacks), 49 tackles, 9 missed; PFR 2026 12 pressures (4 hurries, 6 QB hits, 1.5 sacks) in 5 games, 17 tackles, 2 missed",
        "ESPN 2026 edge PRWR 24% (#16, 27/113); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 221 / right 275 -> REDGE; injuries no injury designation 2025-26; roster ACT"
      ],
      "basis": "PFF overall + penalties + missed tackles"
    },
    {
      "player": "Josh Hines-Allen",
      "attr": "PRC",
      "madden": 92,
      "ours": 82,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Josh Hines-Allen 2025: PFF edge 2025 overall 87.4 on 903 snaps (591 pass-rush, 271 run-defense, 41 coverage); PFR 2025 46 pressures (20 hurries, 17 QB knockdowns, 8 sacks), 49 tackles, 9 missed; 17 g / 845 def snaps; 8.0 sacks, 28 QB hits, 12 TFL, 0 FF, 3 PD; 4 accepted penalties",
        "Josh Hines-Allen 2026: PFF edge 2026 overall 79.4 on 332 snaps (211 pass-rush, 96 run-defense, 25 coverage); PFR 2026 12 pressures (4 hurries, 6 QB hits, 1.5 sacks) in 5 games, 17 tackles, 2 missed; 7 g / 332 def snaps; 2.0 sacks, 9 QB hits, 4 TFL, 1 FF, 1 PD; 0 accepted penalties",
        "PFR 2025 46 pressures (20 hurries, 17 QB knockdowns, 8 sacks), 49 tackles, 9 missed; PFR 2026 12 pressures (4 hurries, 6 QB hits, 1.5 sacks) in 5 games, 17 tackles, 2 missed",
        "ESPN 2026 edge PRWR 24% (#16, 27/113); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 221 / right 275 -> REDGE; injuries no injury designation 2025-26; roster ACT"
      ],
      "basis": "run-defense snaps, TFL, ESPN RSWR"
    },
    {
      "player": "Josh Hines-Allen",
      "attr": "FMV",
      "madden": 90,
      "ours": 78,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Josh Hines-Allen 2025: PFF edge 2025 overall 87.4 on 903 snaps (591 pass-rush, 271 run-defense, 41 coverage); PFR 2025 46 pressures (20 hurries, 17 QB knockdowns, 8 sacks), 49 tackles, 9 missed; 17 g / 845 def snaps; 8.0 sacks, 28 QB hits, 12 TFL, 0 FF, 3 PD; 4 accepted penalties",
        "Josh Hines-Allen 2026: PFF edge 2026 overall 79.4 on 332 snaps (211 pass-rush, 96 run-defense, 25 coverage); PFR 2026 12 pressures (4 hurries, 6 QB hits, 1.5 sacks) in 5 games, 17 tackles, 2 missed; 7 g / 332 def snaps; 2.0 sacks, 9 QB hits, 4 TFL, 1 FF, 1 PD; 0 accepted penalties",
        "PFR 2025 46 pressures (20 hurries, 17 QB knockdowns, 8 sacks), 49 tackles, 9 missed; PFR 2026 12 pressures (4 hurries, 6 QB hits, 1.5 sacks) in 5 games, 17 tackles, 2 missed",
        "ESPN 2026 edge PRWR 24% (#16, 27/113); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 221 / right 275 -> REDGE; injuries no injury designation 2025-26; roster ACT"
      ],
      "basis": "pressures, hurries, sacks, ESPN PRWR"
    },
    {
      "player": "Nik Bonitto",
      "attr": "STR",
      "madden": 82,
      "ours": 64,
      "delta": -18,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Nik Bonitto 2025: PFF edge 2025 overall 78.9 on 760 snaps (460 pass-rush, 227 run-defense, 73 coverage); PFR 2025 39 pressures (12 hurries, 10 QB knockdowns, 14 sacks), 46 tackles, 4 missed; 17 g / 684 def snaps; 14.0 sacks, 28 QB hits, 14 TFL, 2 FF, 1 PD; 8 accepted penalties",
        "Nik Bonitto 2026: PFF edge 2026 overall 84.3 on 347 snaps (202 pass-rush, 114 run-defense, 31 coverage); PFR 2026 12 pressures (3 hurries, 5 QB hits, 3.5 sacks) in 7 games, 16 tackles, 1 missed; 8 g / 347 def snaps; 3.5 sacks, 10 QB hits, 4 TFL, 1 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 39 pressures (12 hurries, 10 QB knockdowns, 14 sacks), 46 tackles, 4 missed; PFR 2026 12 pressures (3 hurries, 5 QB hits, 3.5 sacks) in 7 games, 16 tackles, 1 missed",
        "ESPN 2026 edge PRWR 26% (#6, 31/117); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 1 / right 494 -> REDGE; injuries no injury designation 2025-26; roster ACT"
      ],
      "basis": "power-rush and point-of-attack profile: PFF overall, run-defense snap volume, QB knockdowns"
    },
    {
      "player": "Nik Bonitto",
      "attr": "AWR",
      "madden": 96,
      "ours": 78,
      "delta": -18,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Nik Bonitto 2025: PFF edge 2025 overall 78.9 on 760 snaps (460 pass-rush, 227 run-defense, 73 coverage); PFR 2025 39 pressures (12 hurries, 10 QB knockdowns, 14 sacks), 46 tackles, 4 missed; 17 g / 684 def snaps; 14.0 sacks, 28 QB hits, 14 TFL, 2 FF, 1 PD; 8 accepted penalties",
        "Nik Bonitto 2026: PFF edge 2026 overall 84.3 on 347 snaps (202 pass-rush, 114 run-defense, 31 coverage); PFR 2026 12 pressures (3 hurries, 5 QB hits, 3.5 sacks) in 7 games, 16 tackles, 1 missed; 8 g / 347 def snaps; 3.5 sacks, 10 QB hits, 4 TFL, 1 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 39 pressures (12 hurries, 10 QB knockdowns, 14 sacks), 46 tackles, 4 missed; PFR 2026 12 pressures (3 hurries, 5 QB hits, 3.5 sacks) in 7 games, 16 tackles, 1 missed",
        "ESPN 2026 edge PRWR 26% (#6, 31/117); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 1 / right 494 -> REDGE; injuries no injury designation 2025-26; roster ACT"
      ],
      "basis": "PFF overall + penalties + missed tackles"
    },
    {
      "player": "Nik Bonitto",
      "attr": "PRC",
      "madden": 94,
      "ours": 76,
      "delta": -18,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Nik Bonitto 2025: PFF edge 2025 overall 78.9 on 760 snaps (460 pass-rush, 227 run-defense, 73 coverage); PFR 2025 39 pressures (12 hurries, 10 QB knockdowns, 14 sacks), 46 tackles, 4 missed; 17 g / 684 def snaps; 14.0 sacks, 28 QB hits, 14 TFL, 2 FF, 1 PD; 8 accepted penalties",
        "Nik Bonitto 2026: PFF edge 2026 overall 84.3 on 347 snaps (202 pass-rush, 114 run-defense, 31 coverage); PFR 2026 12 pressures (3 hurries, 5 QB hits, 3.5 sacks) in 7 games, 16 tackles, 1 missed; 8 g / 347 def snaps; 3.5 sacks, 10 QB hits, 4 TFL, 1 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 39 pressures (12 hurries, 10 QB knockdowns, 14 sacks), 46 tackles, 4 missed; PFR 2026 12 pressures (3 hurries, 5 QB hits, 3.5 sacks) in 7 games, 16 tackles, 1 missed",
        "ESPN 2026 edge PRWR 26% (#6, 31/117); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 1 / right 494 -> REDGE; injuries no injury designation 2025-26; roster ACT"
      ],
      "basis": "run-defense snaps, TFL, ESPN RSWR"
    },
    {
      "player": "Nik Bonitto",
      "attr": "TAK",
      "madden": 85,
      "ours": 74,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Nik Bonitto 2025: PFF edge 2025 overall 78.9 on 760 snaps (460 pass-rush, 227 run-defense, 73 coverage); PFR 2025 39 pressures (12 hurries, 10 QB knockdowns, 14 sacks), 46 tackles, 4 missed; 17 g / 684 def snaps; 14.0 sacks, 28 QB hits, 14 TFL, 2 FF, 1 PD; 8 accepted penalties",
        "Nik Bonitto 2026: PFF edge 2026 overall 84.3 on 347 snaps (202 pass-rush, 114 run-defense, 31 coverage); PFR 2026 12 pressures (3 hurries, 5 QB hits, 3.5 sacks) in 7 games, 16 tackles, 1 missed; 8 g / 347 def snaps; 3.5 sacks, 10 QB hits, 4 TFL, 1 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 39 pressures (12 hurries, 10 QB knockdowns, 14 sacks), 46 tackles, 4 missed; PFR 2026 12 pressures (3 hurries, 5 QB hits, 3.5 sacks) in 7 games, 16 tackles, 1 missed",
        "ESPN 2026 edge PRWR 26% (#6, 31/117); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 1 / right 494 -> REDGE; injuries no injury designation 2025-26; roster ACT"
      ],
      "basis": "tackles vs missed tackles (PFR)"
    },
    {
      "player": "Nik Bonitto",
      "attr": "BSH",
      "madden": 78,
      "ours": 66,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Nik Bonitto 2025: PFF edge 2025 overall 78.9 on 760 snaps (460 pass-rush, 227 run-defense, 73 coverage); PFR 2025 39 pressures (12 hurries, 10 QB knockdowns, 14 sacks), 46 tackles, 4 missed; 17 g / 684 def snaps; 14.0 sacks, 28 QB hits, 14 TFL, 2 FF, 1 PD; 8 accepted penalties",
        "Nik Bonitto 2026: PFF edge 2026 overall 84.3 on 347 snaps (202 pass-rush, 114 run-defense, 31 coverage); PFR 2026 12 pressures (3 hurries, 5 QB hits, 3.5 sacks) in 7 games, 16 tackles, 1 missed; 8 g / 347 def snaps; 3.5 sacks, 10 QB hits, 4 TFL, 1 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 39 pressures (12 hurries, 10 QB knockdowns, 14 sacks), 46 tackles, 4 missed; PFR 2026 12 pressures (3 hurries, 5 QB hits, 3.5 sacks) in 7 games, 16 tackles, 1 missed",
        "ESPN 2026 edge PRWR 26% (#6, 31/117); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 1 / right 494 -> REDGE; injuries no injury designation 2025-26; roster ACT"
      ],
      "basis": "run-defense snaps, TFL, ESPN RSWR, PFF overall"
    },
    {
      "player": "Nik Bonitto",
      "attr": "PMV",
      "madden": 85,
      "ours": 68,
      "delta": -17,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Nik Bonitto 2025: PFF edge 2025 overall 78.9 on 760 snaps (460 pass-rush, 227 run-defense, 73 coverage); PFR 2025 39 pressures (12 hurries, 10 QB knockdowns, 14 sacks), 46 tackles, 4 missed; 17 g / 684 def snaps; 14.0 sacks, 28 QB hits, 14 TFL, 2 FF, 1 PD; 8 accepted penalties",
        "Nik Bonitto 2026: PFF edge 2026 overall 84.3 on 347 snaps (202 pass-rush, 114 run-defense, 31 coverage); PFR 2026 12 pressures (3 hurries, 5 QB hits, 3.5 sacks) in 7 games, 16 tackles, 1 missed; 8 g / 347 def snaps; 3.5 sacks, 10 QB hits, 4 TFL, 1 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 39 pressures (12 hurries, 10 QB knockdowns, 14 sacks), 46 tackles, 4 missed; PFR 2026 12 pressures (3 hurries, 5 QB hits, 3.5 sacks) in 7 games, 16 tackles, 1 missed",
        "ESPN 2026 edge PRWR 26% (#6, 31/117); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 1 / right 494 -> REDGE; injuries no injury designation 2025-26; roster ACT"
      ],
      "basis": "pressures, QB knockdowns, sacks, PRWR"
    },
    {
      "player": "Nik Bonitto",
      "attr": "STA",
      "madden": 72,
      "ours": 84,
      "delta": 12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Nik Bonitto 2025: PFF edge 2025 overall 78.9 on 760 snaps (460 pass-rush, 227 run-defense, 73 coverage); PFR 2025 39 pressures (12 hurries, 10 QB knockdowns, 14 sacks), 46 tackles, 4 missed; 17 g / 684 def snaps; 14.0 sacks, 28 QB hits, 14 TFL, 2 FF, 1 PD; 8 accepted penalties",
        "Nik Bonitto 2026: PFF edge 2026 overall 84.3 on 347 snaps (202 pass-rush, 114 run-defense, 31 coverage); PFR 2026 12 pressures (3 hurries, 5 QB hits, 3.5 sacks) in 7 games, 16 tackles, 1 missed; 8 g / 347 def snaps; 3.5 sacks, 10 QB hits, 4 TFL, 1 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 39 pressures (12 hurries, 10 QB knockdowns, 14 sacks), 46 tackles, 4 missed; PFR 2026 12 pressures (3 hurries, 5 QB hits, 3.5 sacks) in 7 games, 16 tackles, 1 missed",
        "ESPN 2026 edge PRWR 26% (#6, 31/117); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 1 / right 494 -> REDGE; injuries no injury designation 2025-26; roster ACT"
      ],
      "basis": "snaps per game"
    },
    {
      "player": "Chase Young",
      "attr": "AWR",
      "madden": 88,
      "ours": 76,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Chase Young 2025: PFF edge 2025 overall 78 on 542 snaps (285 pass-rush, 224 run-defense, 33 coverage); PFR 2025 30 pressures (15 hurries, 3 QB knockdowns, 10 sacks), 38 tackles, 3 missed; 12 g / 544 def snaps; 10.0 sacks, 15 QB hits, 11 TFL, 2 FF, 4 PD; 2 accepted penalties",
        "Chase Young 2026: PFF edge 2026 overall 81.3 on 340 snaps (197 pass-rush, 128 run-defense, 15 coverage); PFR 2026 14 pressures (3 hurries, 2 QB hits, 7.0 sacks) in 6 games, 10 tackles, 0 missed; 7 g / 340 def snaps; 7.0 sacks, 11 QB hits, 4 TFL, 1 FF, 3 PD; 1 accepted penalties",
        "PFR 2025 30 pressures (15 hurries, 3 QB knockdowns, 10 sacks), 38 tackles, 3 missed; PFR 2026 14 pressures (3 hurries, 2 QB hits, 7.0 sacks) in 6 games, 10 tackles, 0 missed",
        "ESPN 2026 edge PRWR 24% (#18, 25/106); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk3 Out (Calf); wk4 Out (Calf); wk5 Out (Calf); wk2 Questionable (Calf); roster ACT"
      ],
      "basis": "PFF overall + penalties + missed tackles"
    },
    {
      "player": "Chase Young",
      "attr": "PRC",
      "madden": 86,
      "ours": 74,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Chase Young 2025: PFF edge 2025 overall 78 on 542 snaps (285 pass-rush, 224 run-defense, 33 coverage); PFR 2025 30 pressures (15 hurries, 3 QB knockdowns, 10 sacks), 38 tackles, 3 missed; 12 g / 544 def snaps; 10.0 sacks, 15 QB hits, 11 TFL, 2 FF, 4 PD; 2 accepted penalties",
        "Chase Young 2026: PFF edge 2026 overall 81.3 on 340 snaps (197 pass-rush, 128 run-defense, 15 coverage); PFR 2026 14 pressures (3 hurries, 2 QB hits, 7.0 sacks) in 6 games, 10 tackles, 0 missed; 7 g / 340 def snaps; 7.0 sacks, 11 QB hits, 4 TFL, 1 FF, 3 PD; 1 accepted penalties",
        "PFR 2025 30 pressures (15 hurries, 3 QB knockdowns, 10 sacks), 38 tackles, 3 missed; PFR 2026 14 pressures (3 hurries, 2 QB hits, 7.0 sacks) in 6 games, 10 tackles, 0 missed",
        "ESPN 2026 edge PRWR 24% (#18, 25/106); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk3 Out (Calf); wk4 Out (Calf); wk5 Out (Calf); wk2 Questionable (Calf); roster ACT"
      ],
      "basis": "run-defense snaps, TFL, ESPN RSWR"
    },
    {
      "player": "Chase Young",
      "attr": "TAK",
      "madden": 88,
      "ours": 76,
      "delta": -12,
      "verdict": "ADJUST",
      "key_stats": [
        "Chase Young 2025: PFF edge 2025 overall 78 on 542 snaps (285 pass-rush, 224 run-defense, 33 coverage); PFR 2025 30 pressures (15 hurries, 3 QB knockdowns, 10 sacks), 38 tackles, 3 missed; 12 g / 544 def snaps; 10.0 sacks, 15 QB hits, 11 TFL, 2 FF, 4 PD; 2 accepted penalties",
        "Chase Young 2026: PFF edge 2026 overall 81.3 on 340 snaps (197 pass-rush, 128 run-defense, 15 coverage); PFR 2026 14 pressures (3 hurries, 2 QB hits, 7.0 sacks) in 6 games, 10 tackles, 0 missed; 7 g / 340 def snaps; 7.0 sacks, 11 QB hits, 4 TFL, 1 FF, 3 PD; 1 accepted penalties",
        "PFR 2025 30 pressures (15 hurries, 3 QB knockdowns, 10 sacks), 38 tackles, 3 missed; PFR 2026 14 pressures (3 hurries, 2 QB hits, 7.0 sacks) in 6 games, 10 tackles, 0 missed",
        "ESPN 2026 edge PRWR 24% (#18, 25/106); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk3 Out (Calf); wk4 Out (Calf); wk5 Out (Calf); wk2 Questionable (Calf); roster ACT"
      ],
      "basis": "tackles vs missed tackles (PFR)",
      "proposed_revision": {
        "attr": "TAK",
        "from": 76,
        "to": 80,
        "why": "0 missed tackles in 2026 and 3 in 2025 (38 tackles): TAK 76 (-12) under-credits his finishing; 80 fits the sure-tackling evidence",
        "task_id": "REDGE_REAUDIT_RATE_07",
        "status": "PROPOSED_NOT_APPROVED"
      }
    },
    {
      "player": "Chase Young",
      "attr": "FMV",
      "madden": 90,
      "ours": 80,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Chase Young 2025: PFF edge 2025 overall 78 on 542 snaps (285 pass-rush, 224 run-defense, 33 coverage); PFR 2025 30 pressures (15 hurries, 3 QB knockdowns, 10 sacks), 38 tackles, 3 missed; 12 g / 544 def snaps; 10.0 sacks, 15 QB hits, 11 TFL, 2 FF, 4 PD; 2 accepted penalties",
        "Chase Young 2026: PFF edge 2026 overall 81.3 on 340 snaps (197 pass-rush, 128 run-defense, 15 coverage); PFR 2026 14 pressures (3 hurries, 2 QB hits, 7.0 sacks) in 6 games, 10 tackles, 0 missed; 7 g / 340 def snaps; 7.0 sacks, 11 QB hits, 4 TFL, 1 FF, 3 PD; 1 accepted penalties",
        "PFR 2025 30 pressures (15 hurries, 3 QB knockdowns, 10 sacks), 38 tackles, 3 missed; PFR 2026 14 pressures (3 hurries, 2 QB hits, 7.0 sacks) in 6 games, 10 tackles, 0 missed",
        "ESPN 2026 edge PRWR 24% (#18, 25/106); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk3 Out (Calf); wk4 Out (Calf); wk5 Out (Calf); wk2 Questionable (Calf); roster ACT"
      ],
      "basis": "pressures, hurries, sacks, ESPN PRWR"
    },
    {
      "player": "Alex Highsmith",
      "attr": "STR",
      "madden": 85,
      "ours": 72,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Alex Highsmith 2025: PFF edge 2025 overall 82.2 on 685 snaps (351 pass-rush, 261 run-defense, 73 coverage); PFR 2025 23 pressures (4 hurries, 9 QB knockdowns, 9.5 sacks), 50 tackles, 2 missed; 13 g / 634 def snaps; 9.5 sacks, 19 QB hits, 15 TFL, 1 FF, 3 PD; 3 accepted penalties",
        "Alex Highsmith 2026: PFF edge 2026 overall 75.1 on 333 snaps (210 pass-rush, 104 run-defense, 19 coverage); PFR 2026 7 pressures (1 hurries, 3 QB hits, 3.0 sacks) in 6 games, 13 tackles, 1 missed; 8 g / 332 def snaps; 3.5 sacks, 9 QB hits, 5 TFL, 0 FF, 1 PD; 3 accepted penalties",
        "PFR 2025 23 pressures (4 hurries, 9 QB knockdowns, 9.5 sacks), 50 tackles, 2 missed; PFR 2026 7 pressures (1 hurries, 3 QB hits, 3.0 sacks) in 6 games, 13 tackles, 1 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 496 -> REDGE; injuries wk4 Out (Ankle); wk11 Out (Pectoral); wk12 Doubtful (Pectoral); roster ACT"
      ],
      "basis": "power-rush and point-of-attack profile: PFF overall, run-defense snap volume, QB knockdowns"
    },
    {
      "player": "Alex Highsmith",
      "attr": "INJ",
      "madden": 92,
      "ours": 80,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Alex Highsmith 2025: PFF edge 2025 overall 82.2 on 685 snaps (351 pass-rush, 261 run-defense, 73 coverage); PFR 2025 23 pressures (4 hurries, 9 QB knockdowns, 9.5 sacks), 50 tackles, 2 missed; 13 g / 634 def snaps; 9.5 sacks, 19 QB hits, 15 TFL, 1 FF, 3 PD; 3 accepted penalties",
        "Alex Highsmith 2026: PFF edge 2026 overall 75.1 on 333 snaps (210 pass-rush, 104 run-defense, 19 coverage); PFR 2026 7 pressures (1 hurries, 3 QB hits, 3.0 sacks) in 6 games, 13 tackles, 1 missed; 8 g / 332 def snaps; 3.5 sacks, 9 QB hits, 5 TFL, 0 FF, 1 PD; 3 accepted penalties",
        "PFR 2025 23 pressures (4 hurries, 9 QB knockdowns, 9.5 sacks), 50 tackles, 2 missed; PFR 2026 7 pressures (1 hurries, 3 QB hits, 3.0 sacks) in 6 games, 13 tackles, 1 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 496 -> REDGE; injuries wk4 Out (Ankle); wk11 Out (Pectoral); wk12 Doubtful (Pectoral); roster ACT"
      ],
      "basis": "availability: injury reports, reserve/IR, games"
    },
    {
      "player": "Nick Herbig",
      "attr": "TAK",
      "madden": 80,
      "ours": 66,
      "delta": -14,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Nick Herbig 2025: PFF edge 2025 overall 87.4 on 636 snaps (360 pass-rush, 222 run-defense, 54 coverage); PFR 2025 29 pressures (11 hurries, 10 QB knockdowns, 7.5 sacks), 30 tackles, 6 missed; 15 g / 610 def snaps; 7.5 sacks, 18 QB hits, 13 TFL, 3 FF, 3 PD; 4 accepted penalties",
        "Nick Herbig 2026: PFF edge 2026 overall 66.8 on 274 snaps (136 pass-rush, 102 run-defense, 36 coverage); PFR 2026 5 pressures (1 hurries, 2 QB hits, 2.0 sacks) in 7 games, 20 tackles, 6 missed; 8 g / 273 def snaps; 3.0 sacks, 5 QB hits, 7 TFL, 1 FF, 0 PD; 0 accepted penalties",
        "PFR 2025 29 pressures (11 hurries, 10 QB knockdowns, 7.5 sacks), 30 tackles, 6 missed; PFR 2026 5 pressures (1 hurries, 2 QB hits, 2.0 sacks) in 7 games, 20 tackles, 6 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 138 / right 358 -> REDGE; injuries wk1 Questionable (Hamstring); wk16 Doubtful (Hamstring); roster ACT"
      ],
      "basis": "tackles vs missed tackles (PFR)"
    },
    {
      "player": "Nick Herbig",
      "attr": "PMV",
      "madden": 84,
      "ours": 74,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Nick Herbig 2025: PFF edge 2025 overall 87.4 on 636 snaps (360 pass-rush, 222 run-defense, 54 coverage); PFR 2025 29 pressures (11 hurries, 10 QB knockdowns, 7.5 sacks), 30 tackles, 6 missed; 15 g / 610 def snaps; 7.5 sacks, 18 QB hits, 13 TFL, 3 FF, 3 PD; 4 accepted penalties",
        "Nick Herbig 2026: PFF edge 2026 overall 66.8 on 274 snaps (136 pass-rush, 102 run-defense, 36 coverage); PFR 2026 5 pressures (1 hurries, 2 QB hits, 2.0 sacks) in 7 games, 20 tackles, 6 missed; 8 g / 273 def snaps; 3.0 sacks, 5 QB hits, 7 TFL, 1 FF, 0 PD; 0 accepted penalties",
        "PFR 2025 29 pressures (11 hurries, 10 QB knockdowns, 7.5 sacks), 30 tackles, 6 missed; PFR 2026 5 pressures (1 hurries, 2 QB hits, 2.0 sacks) in 7 games, 20 tackles, 6 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 138 / right 358 -> REDGE; injuries wk1 Questionable (Hamstring); wk16 Doubtful (Hamstring); roster ACT"
      ],
      "basis": "pressures, QB knockdowns, sacks, PRWR"
    },
    {
      "player": "Nick Herbig",
      "attr": "INJ",
      "madden": 92,
      "ours": 82,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Nick Herbig 2025: PFF edge 2025 overall 87.4 on 636 snaps (360 pass-rush, 222 run-defense, 54 coverage); PFR 2025 29 pressures (11 hurries, 10 QB knockdowns, 7.5 sacks), 30 tackles, 6 missed; 15 g / 610 def snaps; 7.5 sacks, 18 QB hits, 13 TFL, 3 FF, 3 PD; 4 accepted penalties",
        "Nick Herbig 2026: PFF edge 2026 overall 66.8 on 274 snaps (136 pass-rush, 102 run-defense, 36 coverage); PFR 2026 5 pressures (1 hurries, 2 QB hits, 2.0 sacks) in 7 games, 20 tackles, 6 missed; 8 g / 273 def snaps; 3.0 sacks, 5 QB hits, 7 TFL, 1 FF, 0 PD; 0 accepted penalties",
        "PFR 2025 29 pressures (11 hurries, 10 QB knockdowns, 7.5 sacks), 30 tackles, 6 missed; PFR 2026 5 pressures (1 hurries, 2 QB hits, 2.0 sacks) in 7 games, 20 tackles, 6 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 138 / right 358 -> REDGE; injuries wk1 Questionable (Hamstring); wk16 Doubtful (Hamstring); roster ACT"
      ],
      "basis": "availability: injury reports, reserve/IR, games"
    },
    {
      "player": "Laiatu Latu",
      "attr": "ACC",
      "madden": 88,
      "ours": 78,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Laiatu Latu 2025: PFF edge 2025 overall 84.1 on 755 snaps (437 pass-rush, 253 run-defense, 65 coverage); PFR 2025 26 pressures (7 hurries, 9 QB knockdowns, 8.5 sacks), 45 tackles, 8 missed; 16 g / 756 def snaps; 8.5 sacks, 20 QB hits, 12 TFL, 1 FF, 5 PD; 2 accepted penalties",
        "Laiatu Latu 2026: PFF edge 2026 overall 66.6 on 370 snaps (194 pass-rush, 145 run-defense, 31 coverage); PFR 2026 9 pressures (3 hurries, 4 QB hits, 1.0 sacks) in 7 games, 17 tackles, 0 missed; 8 g / 370 def snaps; 2.0 sacks, 8 QB hits, 1 TFL, 0 FF, 2 PD; 1 accepted penalties",
        "PFR 2025 26 pressures (7 hurries, 9 QB knockdowns, 8.5 sacks), 45 tackles, 8 missed; PFR 2026 9 pressures (3 hurries, 4 QB hits, 1.0 sacks) in 7 games, 17 tackles, 0 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 496 -> REDGE; injuries wk2 Questionable (Hamstring); roster ACT"
      ],
      "basis": "movement (no public tracking data); LOW confidence"
    },
    {
      "player": "Laiatu Latu",
      "attr": "COD",
      "madden": 72,
      "ours": 82,
      "delta": 10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Laiatu Latu 2025: PFF edge 2025 overall 84.1 on 755 snaps (437 pass-rush, 253 run-defense, 65 coverage); PFR 2025 26 pressures (7 hurries, 9 QB knockdowns, 8.5 sacks), 45 tackles, 8 missed; 16 g / 756 def snaps; 8.5 sacks, 20 QB hits, 12 TFL, 1 FF, 5 PD; 2 accepted penalties",
        "Laiatu Latu 2026: PFF edge 2026 overall 66.6 on 370 snaps (194 pass-rush, 145 run-defense, 31 coverage); PFR 2026 9 pressures (3 hurries, 4 QB hits, 1.0 sacks) in 7 games, 17 tackles, 0 missed; 8 g / 370 def snaps; 2.0 sacks, 8 QB hits, 1 TFL, 0 FF, 2 PD; 1 accepted penalties",
        "PFR 2025 26 pressures (7 hurries, 9 QB knockdowns, 8.5 sacks), 45 tackles, 8 missed; PFR 2026 9 pressures (3 hurries, 4 QB hits, 1.0 sacks) in 7 games, 17 tackles, 0 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 496 -> REDGE; injuries wk2 Questionable (Hamstring); roster ACT"
      ],
      "basis": "movement (no public tracking data); LOW confidence"
    },
    {
      "player": "Al-Quadin Muhammad",
      "attr": "PUR",
      "madden": 83,
      "ours": 72,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Al-Quadin Muhammad 2025: PFF edge 2025 overall 74.5 on 457 snaps (353 pass-rush, 83 run-defense, 21 coverage); PFR 2025 26 pressures (6 hurries, 8 QB knockdowns, 11 sacks), 25 tackles, 0 missed; 17 g / 457 def snaps; 11.0 sacks, 20 QB hits, 9 TFL, 0 FF, 0 PD; 0 accepted penalties",
        "Al-Quadin Muhammad 2026: PFF edge 2026 overall 81 on 206 snaps (119 pass-rush, 68 run-defense, 19 coverage); PFR 2026 6 pressures (2 hurries, 2 QB hits, 2.0 sacks) in 5 games, 5 tackles, 0 missed; 8 g / 206 def snaps; 2.0 sacks, 4 QB hits, 2 TFL, 1 FF, 1 PD; 0 accepted penalties",
        "PFR 2025 26 pressures (6 hurries, 8 QB knockdowns, 11 sacks), 25 tackles, 0 missed; PFR 2026 6 pressures (2 hurries, 2 QB hits, 2.0 sacks) in 5 games, 5 tackles, 0 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 161 / right 332 -> REDGE; injuries wk4 Questionable (Knee); wk17 Questionable (Knee); roster ACT"
      ],
      "basis": "tackles, TFL, run-defense snaps"
    },
    {
      "player": "Khalil Mack",
      "attr": "OVR",
      "madden": 86,
      "ours": 75,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Khalil Mack 2025: PFF edge 2025 overall 79.3 on 478 snaps (296 pass-rush, 167 run-defense, 15 coverage); PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; 12 g / 424 def snaps; 5.5 sacks, 11 QB hits, 6 TFL, 4 FF, 0 PD; 0 accepted penalties",
        "Khalil Mack 2026: PFF edge 2026 overall 74.2 on 311 snaps (167 pass-rush, 139 run-defense, 5 coverage); PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed; 7 g / 311 def snaps; 3.0 sacks, 6 QB hits, 5 TFL, 0 FF, 0 PD; 0 accepted penalties",
        "PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk7 Questionable (Elbow); roster ACT",
        "approved H2H/tiebreak chain (6 head-to-heads + 6 tiebreaks) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Khalil Mack",
      "attr": "SPD",
      "madden": 84,
      "ours": 72,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Khalil Mack 2025: PFF edge 2025 overall 79.3 on 478 snaps (296 pass-rush, 167 run-defense, 15 coverage); PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; 12 g / 424 def snaps; 5.5 sacks, 11 QB hits, 6 TFL, 4 FF, 0 PD; 0 accepted penalties",
        "Khalil Mack 2026: PFF edge 2026 overall 74.2 on 311 snaps (167 pass-rush, 139 run-defense, 5 coverage); PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed; 7 g / 311 def snaps; 3.0 sacks, 6 QB hits, 5 TFL, 0 FF, 0 PD; 0 accepted penalties",
        "PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk7 Questionable (Elbow); roster ACT"
      ],
      "basis": "movement (no public tracking data); LOW confidence"
    },
    {
      "player": "Khalil Mack",
      "attr": "ACC",
      "madden": 85,
      "ours": 74,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Khalil Mack 2025: PFF edge 2025 overall 79.3 on 478 snaps (296 pass-rush, 167 run-defense, 15 coverage); PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; 12 g / 424 def snaps; 5.5 sacks, 11 QB hits, 6 TFL, 4 FF, 0 PD; 0 accepted penalties",
        "Khalil Mack 2026: PFF edge 2026 overall 74.2 on 311 snaps (167 pass-rush, 139 run-defense, 5 coverage); PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed; 7 g / 311 def snaps; 3.0 sacks, 6 QB hits, 5 TFL, 0 FF, 0 PD; 0 accepted penalties",
        "PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk7 Questionable (Elbow); roster ACT"
      ],
      "basis": "movement (no public tracking data); LOW confidence"
    },
    {
      "player": "Khalil Mack",
      "attr": "AGI",
      "madden": 84,
      "ours": 70,
      "delta": -14,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Khalil Mack 2025: PFF edge 2025 overall 79.3 on 478 snaps (296 pass-rush, 167 run-defense, 15 coverage); PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; 12 g / 424 def snaps; 5.5 sacks, 11 QB hits, 6 TFL, 4 FF, 0 PD; 0 accepted penalties",
        "Khalil Mack 2026: PFF edge 2026 overall 74.2 on 311 snaps (167 pass-rush, 139 run-defense, 5 coverage); PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed; 7 g / 311 def snaps; 3.0 sacks, 6 QB hits, 5 TFL, 0 FF, 0 PD; 0 accepted penalties",
        "PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk7 Questionable (Elbow); roster ACT"
      ],
      "basis": "movement (no public tracking data); LOW confidence"
    },
    {
      "player": "Khalil Mack",
      "attr": "FMV",
      "madden": 84,
      "ours": 72,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Khalil Mack 2025: PFF edge 2025 overall 79.3 on 478 snaps (296 pass-rush, 167 run-defense, 15 coverage); PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; 12 g / 424 def snaps; 5.5 sacks, 11 QB hits, 6 TFL, 4 FF, 0 PD; 0 accepted penalties",
        "Khalil Mack 2026: PFF edge 2026 overall 74.2 on 311 snaps (167 pass-rush, 139 run-defense, 5 coverage); PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed; 7 g / 311 def snaps; 3.0 sacks, 6 QB hits, 5 TFL, 0 FF, 0 PD; 0 accepted penalties",
        "PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk7 Questionable (Elbow); roster ACT"
      ],
      "basis": "pressures, hurries, sacks, ESPN PRWR"
    },
    {
      "player": "Khalil Mack",
      "attr": "PUR",
      "madden": 86,
      "ours": 74,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Khalil Mack 2025: PFF edge 2025 overall 79.3 on 478 snaps (296 pass-rush, 167 run-defense, 15 coverage); PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; 12 g / 424 def snaps; 5.5 sacks, 11 QB hits, 6 TFL, 4 FF, 0 PD; 0 accepted penalties",
        "Khalil Mack 2026: PFF edge 2026 overall 74.2 on 311 snaps (167 pass-rush, 139 run-defense, 5 coverage); PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed; 7 g / 311 def snaps; 3.0 sacks, 6 QB hits, 5 TFL, 0 FF, 0 PD; 0 accepted penalties",
        "PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk7 Questionable (Elbow); roster ACT"
      ],
      "basis": "tackles, TFL, run-defense snaps"
    },
    {
      "player": "Khalil Mack",
      "attr": "INJ",
      "madden": 92,
      "ours": 80,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Khalil Mack 2025: PFF edge 2025 overall 79.3 on 478 snaps (296 pass-rush, 167 run-defense, 15 coverage); PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; 12 g / 424 def snaps; 5.5 sacks, 11 QB hits, 6 TFL, 4 FF, 0 PD; 0 accepted penalties",
        "Khalil Mack 2026: PFF edge 2026 overall 74.2 on 311 snaps (167 pass-rush, 139 run-defense, 5 coverage); PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed; 7 g / 311 def snaps; 3.0 sacks, 6 QB hits, 5 TFL, 0 FF, 0 PD; 0 accepted penalties",
        "PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk7 Questionable (Elbow); roster ACT"
      ],
      "basis": "availability: injury reports, reserve/IR, games"
    },
    {
      "player": "Khalil Mack",
      "attr": "STA",
      "madden": 87,
      "ours": 76,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Khalil Mack 2025: PFF edge 2025 overall 79.3 on 478 snaps (296 pass-rush, 167 run-defense, 15 coverage); PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; 12 g / 424 def snaps; 5.5 sacks, 11 QB hits, 6 TFL, 4 FF, 0 PD; 0 accepted penalties",
        "Khalil Mack 2026: PFF edge 2026 overall 74.2 on 311 snaps (167 pass-rush, 139 run-defense, 5 coverage); PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed; 7 g / 311 def snaps; 3.0 sacks, 6 QB hits, 5 TFL, 0 FF, 0 PD; 0 accepted penalties",
        "PFR 2025 23 pressures (11 hurries, 6 QB knockdowns, 5.5 sacks), 32 tackles, 4 missed; PFR 2026 11 pressures (5 hurries, 3 QB hits, 3.0 sacks) in 5 games, 18 tackles, 1 missed",
        "ESPN 2026 edge PRWR outside the published top 20; RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk7 Questionable (Elbow); roster ACT"
      ],
      "basis": "snaps per game"
    },
    {
      "player": "Trey Hendrickson",
      "attr": "OVR",
      "madden": 88,
      "ours": 74,
      "delta": -14,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Trey Hendrickson 2025: PFF edge 2025 overall 82.8 on 285 snaps (177 pass-rush, 95 run-defense, 13 coverage); PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; 7 g / 285 def snaps; 4.0 sacks, 8 QB hits, 3 TFL, 1 FF, 1 PD; 2 accepted penalties",
        "Trey Hendrickson 2026: PFF edge 2026 overall 67.5 on 240 snaps (164 pass-rush, 64 run-defense, 12 coverage); PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed; 6 g / 240 def snaps; 2.0 sacks, 7 QB hits, 2 TFL, 0 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed",
        "ESPN 2026 edge PRWR 27% (#4, 27/99); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk12 Out (Hip); wk13 Out (Hip); wk14 Out (Hip); wk2 Questionable (Finger); wk4 Out (Finger); wk5 Out (Finger); roster ACT",
        "approved H2H/tiebreak chain (6 head-to-heads + 6 tiebreaks) sets the order"
      ],
      "basis": "OVR follows the approved head-to-head chain"
    },
    {
      "player": "Trey Hendrickson",
      "attr": "STR",
      "madden": 83,
      "ours": 72,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Trey Hendrickson 2025: PFF edge 2025 overall 82.8 on 285 snaps (177 pass-rush, 95 run-defense, 13 coverage); PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; 7 g / 285 def snaps; 4.0 sacks, 8 QB hits, 3 TFL, 1 FF, 1 PD; 2 accepted penalties",
        "Trey Hendrickson 2026: PFF edge 2026 overall 67.5 on 240 snaps (164 pass-rush, 64 run-defense, 12 coverage); PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed; 6 g / 240 def snaps; 2.0 sacks, 7 QB hits, 2 TFL, 0 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed",
        "ESPN 2026 edge PRWR 27% (#4, 27/99); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk12 Out (Hip); wk13 Out (Hip); wk14 Out (Hip); wk2 Questionable (Finger); wk4 Out (Finger); wk5 Out (Finger); roster ACT"
      ],
      "basis": "power-rush and point-of-attack profile: PFF overall, run-defense snap volume, QB knockdowns"
    },
    {
      "player": "Trey Hendrickson",
      "attr": "AWR",
      "madden": 90,
      "ours": 80,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Trey Hendrickson 2025: PFF edge 2025 overall 82.8 on 285 snaps (177 pass-rush, 95 run-defense, 13 coverage); PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; 7 g / 285 def snaps; 4.0 sacks, 8 QB hits, 3 TFL, 1 FF, 1 PD; 2 accepted penalties",
        "Trey Hendrickson 2026: PFF edge 2026 overall 67.5 on 240 snaps (164 pass-rush, 64 run-defense, 12 coverage); PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed; 6 g / 240 def snaps; 2.0 sacks, 7 QB hits, 2 TFL, 0 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed",
        "ESPN 2026 edge PRWR 27% (#4, 27/99); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk12 Out (Hip); wk13 Out (Hip); wk14 Out (Hip); wk2 Questionable (Finger); wk4 Out (Finger); wk5 Out (Finger); roster ACT"
      ],
      "basis": "PFF overall + penalties + missed tackles"
    },
    {
      "player": "Trey Hendrickson",
      "attr": "PRC",
      "madden": 89,
      "ours": 78,
      "delta": -11,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Trey Hendrickson 2025: PFF edge 2025 overall 82.8 on 285 snaps (177 pass-rush, 95 run-defense, 13 coverage); PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; 7 g / 285 def snaps; 4.0 sacks, 8 QB hits, 3 TFL, 1 FF, 1 PD; 2 accepted penalties",
        "Trey Hendrickson 2026: PFF edge 2026 overall 67.5 on 240 snaps (164 pass-rush, 64 run-defense, 12 coverage); PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed; 6 g / 240 def snaps; 2.0 sacks, 7 QB hits, 2 TFL, 0 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed",
        "ESPN 2026 edge PRWR 27% (#4, 27/99); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk12 Out (Hip); wk13 Out (Hip); wk14 Out (Hip); wk2 Questionable (Finger); wk4 Out (Finger); wk5 Out (Finger); roster ACT"
      ],
      "basis": "run-defense snaps, TFL, ESPN RSWR"
    },
    {
      "player": "Trey Hendrickson",
      "attr": "TAK",
      "madden": 87,
      "ours": 74,
      "delta": -13,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Trey Hendrickson 2025: PFF edge 2025 overall 82.8 on 285 snaps (177 pass-rush, 95 run-defense, 13 coverage); PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; 7 g / 285 def snaps; 4.0 sacks, 8 QB hits, 3 TFL, 1 FF, 1 PD; 2 accepted penalties",
        "Trey Hendrickson 2026: PFF edge 2026 overall 67.5 on 240 snaps (164 pass-rush, 64 run-defense, 12 coverage); PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed; 6 g / 240 def snaps; 2.0 sacks, 7 QB hits, 2 TFL, 0 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed",
        "ESPN 2026 edge PRWR 27% (#4, 27/99); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk12 Out (Hip); wk13 Out (Hip); wk14 Out (Hip); wk2 Questionable (Finger); wk4 Out (Finger); wk5 Out (Finger); roster ACT"
      ],
      "basis": "tackles vs missed tackles (PFR)"
    },
    {
      "player": "Trey Hendrickson",
      "attr": "POW",
      "madden": 84,
      "ours": 72,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Trey Hendrickson 2025: PFF edge 2025 overall 82.8 on 285 snaps (177 pass-rush, 95 run-defense, 13 coverage); PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; 7 g / 285 def snaps; 4.0 sacks, 8 QB hits, 3 TFL, 1 FF, 1 PD; 2 accepted penalties",
        "Trey Hendrickson 2026: PFF edge 2026 overall 67.5 on 240 snaps (164 pass-rush, 64 run-defense, 12 coverage); PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed; 6 g / 240 def snaps; 2.0 sacks, 7 QB hits, 2 TFL, 0 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed",
        "ESPN 2026 edge PRWR 27% (#4, 27/99); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk12 Out (Hip); wk13 Out (Hip); wk14 Out (Hip); wk2 Questionable (Finger); wk4 Out (Finger); wk5 Out (Finger); roster ACT"
      ],
      "basis": "QB knockdowns/hits, forced fumbles"
    },
    {
      "player": "Trey Hendrickson",
      "attr": "FMV",
      "madden": 92,
      "ours": 82,
      "delta": -10,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Trey Hendrickson 2025: PFF edge 2025 overall 82.8 on 285 snaps (177 pass-rush, 95 run-defense, 13 coverage); PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; 7 g / 285 def snaps; 4.0 sacks, 8 QB hits, 3 TFL, 1 FF, 1 PD; 2 accepted penalties",
        "Trey Hendrickson 2026: PFF edge 2026 overall 67.5 on 240 snaps (164 pass-rush, 64 run-defense, 12 coverage); PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed; 6 g / 240 def snaps; 2.0 sacks, 7 QB hits, 2 TFL, 0 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed",
        "ESPN 2026 edge PRWR 27% (#4, 27/99); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk12 Out (Hip); wk13 Out (Hip); wk14 Out (Hip); wk2 Questionable (Finger); wk4 Out (Finger); wk5 Out (Finger); roster ACT"
      ],
      "basis": "pressures, hurries, sacks, ESPN PRWR"
    },
    {
      "player": "Trey Hendrickson",
      "attr": "PUR",
      "madden": 92,
      "ours": 74,
      "delta": -18,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Trey Hendrickson 2025: PFF edge 2025 overall 82.8 on 285 snaps (177 pass-rush, 95 run-defense, 13 coverage); PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; 7 g / 285 def snaps; 4.0 sacks, 8 QB hits, 3 TFL, 1 FF, 1 PD; 2 accepted penalties",
        "Trey Hendrickson 2026: PFF edge 2026 overall 67.5 on 240 snaps (164 pass-rush, 64 run-defense, 12 coverage); PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed; 6 g / 240 def snaps; 2.0 sacks, 7 QB hits, 2 TFL, 0 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed",
        "ESPN 2026 edge PRWR 27% (#4, 27/99); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk12 Out (Hip); wk13 Out (Hip); wk14 Out (Hip); wk2 Questionable (Finger); wk4 Out (Finger); wk5 Out (Finger); roster ACT"
      ],
      "basis": "tackles, TFL, run-defense snaps"
    },
    {
      "player": "Trey Hendrickson",
      "attr": "INJ",
      "madden": 92,
      "ours": 62,
      "delta": -30,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Trey Hendrickson 2025: PFF edge 2025 overall 82.8 on 285 snaps (177 pass-rush, 95 run-defense, 13 coverage); PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; 7 g / 285 def snaps; 4.0 sacks, 8 QB hits, 3 TFL, 1 FF, 1 PD; 2 accepted penalties",
        "Trey Hendrickson 2026: PFF edge 2026 overall 67.5 on 240 snaps (164 pass-rush, 64 run-defense, 12 coverage); PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed; 6 g / 240 def snaps; 2.0 sacks, 7 QB hits, 2 TFL, 0 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed",
        "ESPN 2026 edge PRWR 27% (#4, 27/99); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk12 Out (Hip); wk13 Out (Hip); wk14 Out (Hip); wk2 Questionable (Finger); wk4 Out (Finger); wk5 Out (Finger); roster ACT"
      ],
      "basis": "availability: injury reports, reserve/IR, games"
    },
    {
      "player": "Trey Hendrickson",
      "attr": "STA",
      "madden": 88,
      "ours": 76,
      "delta": -12,
      "verdict": "SUPPORTED",
      "key_stats": [
        "Trey Hendrickson 2025: PFF edge 2025 overall 82.8 on 285 snaps (177 pass-rush, 95 run-defense, 13 coverage); PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; 7 g / 285 def snaps; 4.0 sacks, 8 QB hits, 3 TFL, 1 FF, 1 PD; 2 accepted penalties",
        "Trey Hendrickson 2026: PFF edge 2026 overall 67.5 on 240 snaps (164 pass-rush, 64 run-defense, 12 coverage); PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed; 6 g / 240 def snaps; 2.0 sacks, 7 QB hits, 2 TFL, 0 FF, 0 PD; 1 accepted penalties",
        "PFR 2025 12 pressures (3 hurries, 5 QB knockdowns, 4 sacks), 16 tackles, 2 missed; PFR 2026 6 pressures (1 hurries, 3 QB hits, 2.0 sacks) in 4 games, 4 tackles, 1 missed",
        "ESPN 2026 edge PRWR 27% (#4, 27/99); RSWR outside the published top 10",
        "alignment side snapshots 2025-26 left 0 / right 495 -> REDGE; injuries wk12 Out (Hip); wk13 Out (Hip); wk14 Out (Hip); wk2 Questionable (Finger); wk4 Out (Finger); wk5 Out (Finger); roster ACT"
      ],
      "basis": "snaps per game"
    }
  ],
  "madden_used_as_evidence": false,
  "madden_order_verified": false,
  "variance_threshold": 10,
  "metrics_used": [
    "PFF edge overall grades 2025-26",
    "PFF pass-rush/run-defense snap counts (sub-grades paywalled)",
    "ESPN pass-rush win rate and run-stop win rate",
    "PFR pressures/hurries/QB knockdowns/sacks/missed tackles",
    "nflverse sacks/QB hits/TFL",
    "accepted penalties",
    "games/snaps",
    "injury reports and roster status",
    "depth-chart side"
  ],
  "evidence_fixes_applied_before_audit": [],
  "drafted_fixes_pending_review": [
    {
      "player": "Micah Parsons",
      "attr": "STR",
      "from": 74,
      "to": 78,
      "why": "12.5 sacks, 12 QB knockdowns and 264 run-defense snaps in 2025 show more functional power than 74 (-17 vs Madden) credits; 78 still keeps him a speed-first rusher below Garrett/Hunter in STR",
      "task_id": "REDGE_REAUDIT_RATE_02",
      "status": "PROPOSED_NOT_APPROVED"
    },
    {
      "player": "Chase Young",
      "attr": "TAK",
      "from": 76,
      "to": 80,
      "why": "0 missed tackles in 2026 and 3 in 2025 (38 tackles): TAK 76 (-12) under-credits his finishing; 80 fits the sure-tackling evidence",
      "task_id": "REDGE_REAUDIT_RATE_07",
      "status": "PROPOSED_NOT_APPROVED"
    }
  ],
  "summary": "Every overall and attribute rating 10+ from Madden 27 audited (t46u): 49 gaps (47 below Madden, 2 above). 47 SUPPORTED on edge evidence; 2 ADJUST with drafted add-only revisions NOT approved or applied: Micah Parsons STR 74->78; Chase Young TAK 76->80. 2 OVR gaps: Khalil Mack -11, Trey Hendrickson -14. Overalls unchanged by the drafts. Madden is reference only.",
  "major_flags": [
    "VARIANCE_FIXES_DRAFTED_PENDING_COMMISSIONER_REVIEW"
  ],
  "locked_control_conflict": false
}
```
