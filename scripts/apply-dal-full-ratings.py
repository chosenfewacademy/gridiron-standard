#!/usr/bin/env python3
"""Dallas Cowboys depth ratings. Locked cards are copied, not edited.

Sources, all retrieved 2026-11-05:
- Official chart: https://www.dallascowboys.com/team/depth-chart
- ESPN chart: https://www.espn.com/nfl/team/depth/_/name/dal
- PFF 2026 overalls: https://www.pff.com/grades/nfl/teams/dallas-cowboys
- PFF 2025 overalls: https://www.pff.com/grades/nfl/teams/dallas-cowboys/2025
Facet grades are paywalled and are not invented. New overalls are Gridiron
Standard judgment bands around the locked Dallas cards. The estimated Madden
formula is not used and does not validate these overalls.
"""

from __future__ import annotations

import hashlib
import json
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "roster" / "gridiron.sqlite"
ENTRY = json.loads((ROOT / "config" / "madden-entry-order.json").read_text())["positions"]
METRICS = json.loads((ROOT / "config" / "position-metrics.json").read_text())["positions"]

LOCKED = {
    "Dak Prescott", "George Pickens", "CeeDee Lamb", "Hunter Luepke", "Tyler Smith",
    "Cooper Beebe", "Tyler Booker", "Quinnen Williams", "Brandon Aubrey", "Bryan Anger", "Trent Sieg",
}

# pos, rank, name. Official chart plus ESPN side labels where the team page is not sided.
DEPTH = [
    ("QB", 1, "Dak Prescott"), ("QB", 2, "Sam Howell"),
    ("RB", 1, "Javonte Williams"), ("RB", 2, "Tyler Goodson"),
    ("FB", 1, "Hunter Luepke"),
    ("WR", 1, "CeeDee Lamb"), ("WR", 2, "George Pickens"), ("WR", 3, "Ryan Flournoy"),
    ("WR", 4, "KaVontae Turpin"), ("WR", 5, "Jonathan Mingo"), ("WR", 6, "Camden Brown"),
    ("TE", 1, "Jake Ferguson"), ("TE", 2, "Brevyn Spann-Ford"), ("TE", 3, "Luke Schoonmaker"),
    ("LT", 1, "Tyler Guyton"), ("LT", 2, "Drew Shelton"),
    ("LG", 1, "Tyler Smith"), ("LG", 2, "TJ Bass"),
    ("C", 1, "Cooper Beebe"), ("C", 2, "TJ Bass"),
    ("RG", 1, "Tyler Booker"), ("RG", 2, "Ajani Cornelius"),
    ("RT", 1, "Terence Steele"), ("RT", 2, "Broderick Jones"),
    ("LEDGE", 1, "Rashan Gary"), ("LEDGE", 2, "Von Miller"), ("LEDGE", 3, "James Houston"),
    ("REDGE", 1, "Donovan Ezeiruaku"), ("REDGE", 2, "Malachi Lawrence"), ("REDGE", 3, "Tyrus Wheat"),
    ("DT", 1, "Quinnen Williams"), ("DT", 2, "Otito Ogbonnia"), ("DT", 3, "Kenny Clark"), ("DT", 4, "Elijah Garcia"),
    ("MIKE", 1, "DeMarvion Overshown"), ("MIKE", 2, "Shemar James"),
    ("WILL", 1, "Dee Winters"), ("WILL", 2, "Jaishawn Barham"),
    ("CB", 1, "Joey Porter Jr."), ("CB", 2, "DaRon Bland"), ("CB", 3, "Caleb Downs"),
    ("CB", 4, "Cobie Durant"), ("CB", 5, "Shavon Revel Jr."), ("CB", 6, "Ameer Speed"),
    ("FS", 1, "Malik Hooker"), ("FS", 2, "Alijah Clark"),
    ("SS", 1, "P.J. Locke"), ("SS", 2, "Markquese Bell"), ("SS", 3, "Juanyeh Thomas"),
    ("K", 1, "Brandon Aubrey"), ("P", 1, "Bryan Anger"), ("LS", 1, "Trent Sieg"),
]

NAMES = {
    "TJ Bass": "TJ Bass",
}

# Absolute traits. Unlisted keys are filled from a position offset and clamped.
NEW = {
    "Sam Howell": dict(pos="QB", ovr=66, conf="LOW",
        style="Gridiron Standard. Backup quarterback with no 2026 grade on the public Cowboys table. The 2023 Washington season is the last full body of work.",
        basis="No row on the 2026 PFF Cowboys table. Athlon Sports (Nov 2026) cites 2023 Washington: 3,946 yards, 21 TD, 21 INT, 65 sacks. ESPN lists him QB2 behind Dak. Overall 66 stays under Dak's locked 84.",
        shape={"SPD": 72, "ACC": 74, "AGI": 70, "THP": 80, "SAC": 70, "MAC": 72, "DAC": 66, "AWR": 66, "BSK": 62, "TUP": 64, "RUN": 68}),
    "Javonte Williams": dict(pos="RB", ovr=74, conf="MEDIUM",
        style="Gridiron Standard. Between-the-tackles lead back. The 2026 grade is solid, not a home-run profile.",
        basis="PFF 2026 HB 70.6 on 406 snaps; 2025 75.3 on 769. Listed RB1 on the Cowboys site and ESPN. Below the locked RB top 10.",
        shape={"SPD": 86, "ACC": 84, "AGI": 80, "COD": 76, "STR": 78, "BCV": 74, "CAR": 80, "BTK": 78, "TRK": 76, "CTH": 70, "AWR": 74}),
    "Tyler Goodson": dict(pos="RB", ovr=62, conf="LOW",
        style="Gridiron Standard. Smaller change-of-pace back on a short 2026 sample.",
        basis="PFF 2026 HB 55.6 on 75 snaps. ESPN RB2. 5-9, 197 on that table.",
        shape={"SPD": 88, "ACC": 86, "AGI": 84, "COD": 82, "STR": 62, "BCV": 64, "CAR": 70, "BTK": 60, "CTH": 68, "AWR": 62}),
    "Ryan Flournoy": dict(pos="WR", ovr=70, conf="MEDIUM",
        style="Gridiron Standard. Starting third receiver whose 2026 grade fell off the 2025 mark.",
        basis="PFF 2026 WR 65.6 on 402 snaps; 2025 80.3 on 479. Current season is the primary year, so he is not rated off the 2025 grade.",
        shape={"SPD": 86, "ACC": 84, "CTH": 74, "CIT": 70, "SRR": 72, "MRR": 74, "DRR": 70, "AWR": 68, "STR": 68}),
    "KaVontae Turpin": dict(pos="WR", ovr=66, conf="LOW",
        style="Gridiron Standard. Small return specialist. The public PFF row has no 40 time, so speed is not a 90.",
        basis="PFF 2026 WR 68.4 on 57 snaps; 2025 61.6 on 380. Listed 5-9, 153 there. Cowboys site lists him as the punt and kick returner.",
        shape={"SPD": 88, "ACC": 88, "AGI": 86, "COD": 84, "STR": 48, "CTH": 70, "SRR": 72, "MRR": 66, "DRR": 64, "AWR": 64, "JKM": 78}),
    "Jonathan Mingo": dict(pos="WR", ovr=64, conf="LOW",
        style="Gridiron Standard. Big reserve receiver with a modest grade and a cited 4.46.",
        basis="PFF 2026 WR 53.7 on 113 snaps; 2025 53.2 on 80. The 2026 table lists a 4.46 forty. ESPN WR backup behind Pickens.",
        shape={"SPD": 84, "ACC": 82, "STR": 74, "CTH": 70, "CIT": 72, "SRR": 64, "MRR": 66, "DRR": 68, "AWR": 62}),
    "Camden Brown": dict(pos="WR", ovr=58, conf="LOW",
        style="Gridiron Standard. Rookie with one counted 2026 snap. The grade is not a season.",
        basis="PFF 2026 WR 57.7 on 1 snap. Cowboys site lists him behind Pickens. No production to support a starter band.",
        shape={"SPD": 84, "ACC": 82, "CTH": 66, "SRR": 62, "MRR": 60, "DRR": 60, "AWR": 54, "STR": 64}),
    "Jake Ferguson": dict(pos="TE", ovr=64, conf="MEDIUM",
        style="Gridiron Standard. Listed starting tight end with a poor 2026 grade on a real snap count.",
        basis="PFF 2026 TE 46.1 on 317 snaps, 71st of 73; 2025 59.4 on 786. He stays the TE1 on the chart, well under Dallas Goedert's locked 77.",
        shape={"SPD": 80, "ACC": 78, "CTH": 72, "CIT": 68, "RBK": 66, "PBK": 62, "STR": 74, "AWR": 68, "SRR": 70}),
    "Brevyn Spann-Ford": dict(pos="TE", ovr=68, conf="MEDIUM",
        style="Gridiron Standard. Larger inline tight end. His 2026 grade is ahead of the listed starter.",
        basis="PFF 2026 TE 65.5 on 250 snaps; 2025 73.0 on 300. Listed 6-7, 270. Cowboys site TE2.",
        shape={"SPD": 76, "ACC": 74, "STR": 82, "CTH": 68, "RBK": 74, "PBK": 70, "IBL": 72, "AWR": 66, "SRR": 62, "DRR": 54}),
    "Luke Schoonmaker": dict(pos="TE", ovr=62, conf="LOW",
        style="Gridiron Standard. Third tight end. The table cites a 4.63 forty and a modest grade.",
        basis="PFF 2026 TE 56.3 on 76 snaps; 2025 55.1 on 392. 4.63 is on the 2026 table.",
        shape={"SPD": 78, "ACC": 76, "CTH": 68, "RBK": 66, "PBK": 64, "STR": 76, "AWR": 64, "SRR": 64}),
    "Tyler Guyton": dict(pos="LT", ovr=70, conf="MEDIUM",
        style="Gridiron Standard. Young left tackle. The 2026 grade improved on 2025 and is still short of a top-10 tackle.",
        basis="PFF 2026 T 67.1 on 537 snaps; 2025 57.4 on 650. Cowboys site and ESPN LT1. Jordan Mailata's locked 88 is the high anchor.",
        shape={"STR": 86, "SPD": 68, "AGI": 64, "AWR": 70, "PBK": 72, "PBP": 74, "PBF": 68, "RBK": 70, "RBP": 72, "RBF": 66, "IBL": 78}),
    "Drew Shelton": dict(pos="LT", ovr=55, conf="LOW",
        style="Gridiron Standard. Rookie tackle on five 2026 snaps. The 39.4 grade is not treated as a full season.",
        basis="PFF 2026 T 39.4 on 5 snaps. Cowboys site LT2. Overall 55 is a camp-backup band, not a translation of a five-snap grade.",
        shape={"STR": 80, "SPD": 66, "AGI": 62, "AWR": 54, "PBK": 58, "RBK": 60, "IBL": 70}),
    "TJ Bass": dict(pos="LG", ovr=66, conf="MEDIUM",
        style="Gridiron Standard. Swing interior lineman. The table cites a 5.48 forty, so he is not a phone-booth-only guard.",
        basis="PFF 2026 G 63.5 on 265 snaps; 2025 67.6 on 352. 5.48 is on the 2026 table. He is LG2 and C2 on the Cowboys site. One card, at LG.",
        shape={"STR": 84, "SPD": 70, "AGI": 66, "AWR": 68, "PBK": 68, "PBP": 68, "PBF": 66, "RBK": 68, "RBP": 70, "RBF": 66, "IBL": 74}),
    "Ajani Cornelius": dict(pos="RG", ovr=60, conf="LOW",
        style="Gridiron Standard. Second right guard with no 2026 row on the public PFF table.",
        basis="Not listed on the 2026 or 2025 PFF Cowboys tables retrieved here. Cowboys site RG2. Overall 60 is a no-grade backup band under Tyler Booker's locked 83.",
        shape={"STR": 82, "SPD": 66, "AGI": 60, "AWR": 58, "PBK": 62, "RBK": 64, "IBL": 72}),
    "Terence Steele": dict(pos="RT", ovr=66, conf="MEDIUM",
        style="Gridiron Standard. Starting right tackle on a down 2026 grade after a fuller snap count.",
        basis="PFF 2026 T 54.7 on 544 snaps; 2025 63.6 on 1,163. Cowboys site RT1. The current grade keeps him out of the 70s.",
        shape={"STR": 86, "SPD": 64, "AGI": 58, "AWR": 72, "PBK": 66, "PBP": 68, "PBF": 62, "RBK": 70, "RBP": 72, "RBF": 66, "IBL": 78}),
    "Broderick Jones": dict(pos="RT", ovr=68, conf="LOW",
        style="Gridiron Standard. Former first-round tackle on a 36-snap 2026 sample. Draft slot is not the rating.",
        basis="PFF 2026 T 62.9 on 36 snaps. Cowboys site RT2. The short sample caps him just above Steele, not in a starter-elite band.",
        shape={"STR": 84, "SPD": 70, "AGI": 66, "AWR": 66, "PBK": 70, "PBP": 72, "PBF": 68, "RBK": 68, "IBL": 74}),
    "Otito Ogbonnia": dict(pos="DT", ovr=72, conf="MEDIUM",
        style="Gridiron Standard. Heavy interior starter. His 2026 grade is ahead of the other non-locked tackles.",
        basis="PFF 2026 DI 68.0 on 247 snaps. ESPN nose, Cowboys site DT. Quinnen Williams stays the locked 87 and is not moved down to match his 2026 grade of 67.2.",
        shape={"STR": 90, "SPD": 64, "ACC": 68, "AGI": 56, "PMV": 72, "BSH": 78, "TAK": 74, "AWR": 70, "FMV": 64}),
    "Kenny Clark": dict(pos="DT", ovr=70, conf="MEDIUM",
        style="Gridiron Standard. Veteran interior tackle whose 2026 grade is ordinary on a full snap load.",
        basis="PFF 2026 DI 60.6 on 367 snaps; 2025 67.6 on 746. Listed 6-3, 314, with a 5.06 forty on the 2026 table.",
        shape={"STR": 88, "SPD": 66, "ACC": 70, "PMV": 72, "BSH": 76, "TAK": 74, "AWR": 76, "FMV": 66}),
    "Elijah Garcia": dict(pos="DT", ovr=60, conf="LOW",
        style="Gridiron Standard. Reserve interior tackle on a short snap count.",
        basis="PFF 2026 DI 52.5 on 83 snaps. Cowboys site lists him behind Ogbonnia.",
        shape={"STR": 84, "SPD": 66, "PMV": 62, "BSH": 66, "TAK": 64, "AWR": 60, "FMV": 58}),
    "Rashan Gary": dict(pos="LEDGE", ovr=70, conf="MEDIUM",
        style="Gridiron Standard. Every-down edge on a down 2026 grade. ESPN lists him at weak-side linebacker; that is the chart side, not a tracked snap study.",
        basis="PFF 2026 EDGE 59.8 on 364 snaps. Cowboys site OLB1 opposite Ezeiruaku. Mapped to LEDGE from the ESPN WLB label.",
        shape={"SPD": 80, "ACC": 82, "STR": 82, "PMV": 74, "FMV": 72, "TAK": 74, "AWR": 72, "BSH": 74, "PUR": 76}),
    "Von Miller": dict(pos="LEDGE", ovr=74, conf="LOW",
        style="Gridiron Standard. Older edge whose 2026 grade is good on 121 snaps. Age and sample keep him out of the 80s.",
        basis="PFF 2026 EDGE 76.5 on 121 snaps. The table lists age 37.7. Cowboys site lists him behind Gary.",
        shape={"SPD": 78, "ACC": 80, "STR": 74, "FMV": 78, "PMV": 72, "TAK": 72, "AWR": 80, "PUR": 76, "BSH": 68}),
    "James Houston": dict(pos="LEDGE", ovr=64, conf="LOW",
        style="Gridiron Standard. Situational rusher. The 2026 sample is 33 snaps.",
        basis="PFF 2026 EDGE 60.8 on 33 snaps; 2025 69.1 on 305. Cowboys site third behind Gary.",
        shape={"SPD": 82, "ACC": 84, "STR": 74, "FMV": 72, "PMV": 64, "AWR": 62, "TAK": 64, "PUR": 74}),
    "Donovan Ezeiruaku": dict(pos="REDGE", ovr=72, conf="MEDIUM",
        style="Gridiron Standard. Young edge starter. 2026 is below his 2025 grade. ESPN strong-side linebacker is the chart side used for REDGE.",
        basis="PFF 2026 EDGE 64.1 on 367 snaps; 2025 73.2 on 603. Cowboys site OLB1 on the other side from Gary.",
        shape={"SPD": 82, "ACC": 84, "STR": 72, "FMV": 76, "PMV": 68, "TAK": 70, "AWR": 68, "PUR": 78, "BSH": 66}),
    "Malachi Lawrence": dict(pos="REDGE", ovr=64, conf="LOW",
        style="Gridiron Standard. Rookie edge with a low grade on 226 snaps. The first-round tag is not the rating.",
        basis="PFF 2026 EDGE 51.3 on 226 snaps. Cowboys site lists him with Ezeiruaku.",
        shape={"SPD": 80, "ACC": 82, "STR": 74, "FMV": 66, "PMV": 64, "AWR": 58, "TAK": 64, "PUR": 72}),
    "Tyrus Wheat": dict(pos="REDGE", ovr=60, conf="LOW",
        style="Gridiron Standard. Edge depth on 21 snaps. A 4.65 forty is on the 2026 table.",
        basis="PFF 2026 EDGE 57.9 on 21 snaps. 4.65 is listed there. Not a season-long grade.",
        shape={"SPD": 78, "ACC": 78, "STR": 78, "FMV": 62, "PMV": 64, "AWR": 60, "TAK": 64}),
    "DeMarvion Overshown": dict(pos="MIKE", ovr=68, conf="MEDIUM",
        style="Gridiron Standard. Listed mike whose 2026 sample is short and graded lower than 2025. A 4.56 forty is on the 2025 table.",
        basis="PFF 2026 LB 50.5 on 153 snaps; 2025 67.4 on 218. 4.56 is on the 2025 table. ESPN LILB1.",
        shape={"SPD": 84, "ACC": 84, "AGI": 80, "TAK": 74, "AWR": 70, "ZCV": 68, "MCV": 64, "PUR": 76, "BSH": 70, "STR": 72}),
    "Shemar James": dict(pos="MIKE", ovr=62, conf="LOW",
        style="Gridiron Standard. Second-level linebacker coming off a poor 2025 grade and an ordinary 2026.",
        basis="PFF 2026 LB 53.3 on 311 snaps; 2025 40.1 on 542. Cowboys site second LB group.",
        shape={"SPD": 80, "ACC": 78, "TAK": 70, "AWR": 62, "ZCV": 62, "MCV": 60, "PUR": 72, "STR": 74}),
    "Dee Winters": dict(pos="WILL", ovr=64, conf="MEDIUM",
        style="Gridiron Standard. Smaller will linebacker. The 2025 table cites a 4.49 forty.",
        basis="PFF 2026 LB 52.0 on 243 snaps. 4.49 is on the 2025 table. ESPN RILB1.",
        shape={"SPD": 86, "ACC": 86, "AGI": 82, "COD": 80, "STR": 66, "TAK": 70, "ZCV": 66, "MCV": 64, "AWR": 64, "PUR": 78}),
    "Jaishawn Barham": dict(pos="WILL", ovr=66, conf="MEDIUM",
        style="Gridiron Standard. Rookie linebacker with more 2026 snaps than the listed mike and a slightly higher grade.",
        basis="PFF 2026 LB 56.3 on 322 snaps. ESPN lists him behind Overshown. The grade does not jump him past a 66.",
        shape={"SPD": 82, "ACC": 82, "STR": 78, "TAK": 74, "AWR": 64, "ZCV": 64, "MCV": 60, "BSH": 72, "PUR": 74}),
    "Joey Porter Jr.": dict(pos="CB", ovr=72, conf="LOW",
        style="Gridiron Standard. Long corner on a partial 2026 snap count. A 4.46 forty is on the table.",
        basis="PFF 2026 CB 68.0 on 148 snaps. 4.46 is listed. ESPN LCB1. The sample is too short for an 80.",
        shape={"SPD": 88, "ACC": 86, "AGI": 80, "COD": 76, "MCV": 74, "ZCV": 70, "PRS": 72, "AWR": 70, "JMP": 82, "CTH": 66, "TAK": 68}),
    "DaRon Bland": dict(pos="CB", ovr=64, conf="MEDIUM",
        style="Gridiron Standard. Listed starter whose 2026 grade collapsed on 539 snaps. Current season leads the prior year.",
        basis="PFF 2026 CB 43.1 on 539 snaps; 2025 65.3 on 743. ESPN RCB1. The overall stays in the mid-60s because of the 2026 grade, not the old ball-production reputation.",
        shape={"SPD": 86, "ACC": 84, "AGI": 82, "MCV": 66, "ZCV": 68, "AWR": 74, "CTH": 72, "TAK": 70, "PRS": 64}),
    "Caleb Downs": dict(pos="CB", ovr=72, conf="MEDIUM",
        style="Gridiron Standard. Rookie safety playing the nickel on the ESPN chart. Rated at CB for that published role, not as a deep safety.",
        basis="PFF 2026 S 63.8 on 509 snaps. ESPN lists him at nickel; the Cowboys site lists him as DB. First-round status is not the rating.",
        shape={"SPD": 86, "ACC": 86, "AGI": 84, "COD": 82, "MCV": 72, "ZCV": 74, "TAK": 74, "AWR": 70, "CTH": 70, "PRS": 66, "PUR": 76}),
    "Cobie Durant": dict(pos="CB", ovr=70, conf="LOW",
        style="Gridiron Standard. Smaller corner on a partial snap count and a middling grade.",
        basis="PFF 2026 CB 62.4 on 163 snaps. ESPN lists him behind Porter. 5-11, 180 on the table.",
        shape={"SPD": 88, "ACC": 88, "AGI": 86, "COD": 84, "STR": 58, "MCV": 72, "ZCV": 70, "AWR": 68, "CTH": 66, "TAK": 64}),
    "Shavon Revel Jr.": dict(pos="CB", ovr=58, conf="MEDIUM",
        style="Gridiron Standard. Tall corner with poor grades in both retrieved seasons.",
        basis="PFF 2026 CB 38.3 on 159 snaps; 2025 35.2 on 334. Two low years keep him under 60.",
        shape={"SPD": 86, "ACC": 84, "AGI": 76, "MCV": 58, "ZCV": 60, "AWR": 56, "CTH": 60, "TAK": 64, "JMP": 80}),
    "Ameer Speed": dict(pos="CB", ovr=60, conf="LOW",
        style="Gridiron Standard. Reserve corner around a 50 grade.",
        basis="PFF 2026 CB 49.9 on 137 snaps. Cowboys site third corner behind Porter.",
        shape={"SPD": 86, "ACC": 84, "AGI": 78, "MCV": 62, "ZCV": 62, "AWR": 60, "TAK": 66, "STR": 70}),
    "Malik Hooker": dict(pos="FS", ovr=72, conf="MEDIUM",
        style="Gridiron Standard. Veteran free safety. The card is FS because ESPN lists him there; the registry bucket was SS.",
        basis="PFF 2026 S 65.9 on 256 snaps; 2025 61.0 on 593. ESPN FS1.",
        shape={"SPD": 86, "ACC": 84, "AGI": 80, "ZCV": 76, "MCV": 70, "TAK": 72, "AWR": 76, "PUR": 78, "CTH": 70, "JMP": 80}),
    "Alijah Clark": dict(pos="FS", ovr=62, conf="LOW",
        style="Gridiron Standard. Young safety on 83 snaps.",
        basis="PFF 2026 S 57.0 on 83 snaps; 2025 33.8 on 40. ESPN FS2.",
        shape={"SPD": 86, "ACC": 84, "ZCV": 64, "MCV": 62, "TAK": 64, "AWR": 58, "PUR": 72}),
    "P.J. Locke": dict(pos="SS", ovr=64, conf="LOW",
        style="Gridiron Standard. Listed strong safety after a poor grade on 99 snaps. The starter tag does not repair the grade.",
        basis="PFF 2026 S 44.4 on 99 snaps. ESPN SS1 as of the Nov. 5 chart, which moved him ahead of Caleb Downs at safety. FantasyTools noted that change the same day.",
        shape={"SPD": 82, "ACC": 80, "TAK": 74, "ZCV": 64, "MCV": 60, "AWR": 70, "POW": 72, "PUR": 74}),
    "Markquese Bell": dict(pos="SS", ovr=66, conf="MEDIUM",
        style="Gridiron Standard. Box safety. 2026 is better than 2025 and still not a starter grade.",
        basis="PFF 2026 S 58.7 on 221 snaps; 2025 46.8 on 356. ESPN SS2.",
        shape={"SPD": 82, "ACC": 80, "STR": 76, "TAK": 76, "ZCV": 66, "MCV": 60, "AWR": 68, "BSH": 72, "POW": 74}),
    "Juanyeh Thomas": dict(pos="SS", ovr=64, conf="LOW",
        style="Gridiron Standard. Third safety. The 2026 grade is 20 snaps.",
        basis="PFF 2026 S 65.2 on 20 snaps; 2025 60.0 on 264. The higher 2026 number is not a season.",
        shape={"SPD": 84, "ACC": 82, "TAK": 72, "ZCV": 68, "MCV": 64, "AWR": 66, "PUR": 74}),
}


def keys_for(pos: str) -> list[str]:
    if pos in ("FB", "LS"):
        return []
    if pos in ENTRY:
        return [k for k in ENTRY[pos] if k != "OVR"]
    return [k for k in METRICS[pos]["madden_attributes_informed"]]


OFFSETS = {
    "QB": {"SPD": -6, "ACC": -4, "AGI": -8, "COD": -10, "STR": -4, "AWR": -2, "THP": 10, "SAC": 2, "MAC": 4, "DAC": -2, "RUN": -4, "TUP": -2, "PAC": 0, "BSK": -4, "CAR": -2, "JMP": -4, "INJ": 10, "STA": 6, "TGH": 4},
    "RB": {"SPD": 12, "ACC": 10, "AGI": 6, "COD": 4, "STR": 0, "AWR": -2, "CAR": 4, "BCV": 0, "BTK": -2, "TRK": -4, "SFA": -2, "SPM": -4, "JKM": 2, "CTH": -6, "CIT": -14, "SRR": -8, "MRR": -14, "DRR": -18, "RLS": -12, "JMP": 4, "INJ": 8, "STA": 4, "TGH": 4},
    "WR": {"SPD": 14, "ACC": 12, "AGI": 8, "COD": 6, "STR": -6, "AWR": -2, "CTH": 2, "CIT": -4, "SPC": -6, "SRR": 2, "MRR": 0, "DRR": -2, "RLS": -4, "JMP": 6, "CAR": -4, "BTK": -12, "SPM": -10, "JKM": -2, "INJ": 8, "STA": 4, "TGH": 2},
    "TE": {"SPD": 8, "ACC": 6, "AGI": 2, "COD": 0, "STR": 8, "AWR": 0, "CTH": 4, "CIT": 0, "SPC": -4, "SRR": 0, "MRR": -4, "DRR": -10, "RLS": -6, "JMP": 4, "CAR": -2, "BTK": 0, "RBK": 2, "IBL": 0, "PBK": -2, "INJ": 8, "STA": 4, "TGH": 6},
    "LT": {"STR": 14, "SPD": -6, "ACC": -4, "AGI": -10, "COD": -14, "AWR": 0, "PBK": 2, "PBP": 2, "PBF": -2, "RBK": 0, "RBP": 0, "RBF": -4, "IBL": 6, "LBK": 2, "INJ": 8, "STA": 6, "TGH": 8},
    "LG": {"STR": 14, "SPD": -4, "ACC": -2, "AGI": -8, "COD": -12, "AWR": 0, "PBK": 2, "PBP": 2, "PBF": 0, "RBK": 2, "RBP": 2, "RBF": 0, "IBL": 6, "LBK": 4, "INJ": 8, "STA": 6, "TGH": 8},
    "C": {"STR": 12, "SPD": -6, "ACC": -4, "AGI": -8, "COD": -12, "AWR": 2, "PBK": 2, "PBP": 2, "PBF": 0, "RBK": 2, "RBP": 2, "RBF": 0, "IBL": 4, "LBK": 2, "INJ": 8, "STA": 6, "TGH": 6},
    "RG": {"STR": 14, "SPD": -4, "ACC": -2, "AGI": -8, "COD": -12, "AWR": 0, "PBK": 2, "PBP": 2, "PBF": 0, "RBK": 2, "RBP": 2, "RBF": 0, "IBL": 6, "LBK": 4, "INJ": 8, "STA": 6, "TGH": 8},
    "RT": {"STR": 14, "SPD": -6, "ACC": -4, "AGI": -10, "COD": -14, "AWR": 0, "PBK": 2, "PBP": 2, "PBF": -2, "RBK": 2, "RBP": 2, "RBF": -2, "IBL": 6, "LBK": 2, "INJ": 8, "STA": 6, "TGH": 8},
    "LEDGE": {"SPD": 8, "ACC": 10, "AGI": 4, "COD": 2, "STR": 6, "AWR": 0, "PRC": -2, "TAK": 2, "POW": 0, "BSH": 0, "PMV": 2, "FMV": 4, "PUR": 4, "INJ": 8, "STA": 6, "TGH": 4},
    "REDGE": {"SPD": 8, "ACC": 10, "AGI": 4, "COD": 2, "STR": 4, "AWR": 0, "PRC": -2, "TAK": 2, "POW": 0, "BSH": -2, "PMV": 0, "FMV": 4, "PUR": 4, "INJ": 8, "STA": 6, "TGH": 4},
    "DT": {"SPD": -6, "ACC": -2, "AGI": -12, "COD": -16, "STR": 16, "AWR": 0, "PRC": 0, "TAK": 2, "POW": 4, "BSH": 6, "PMV": 2, "FMV": -8, "PUR": -2, "INJ": 8, "STA": 4, "TGH": 8},
    "MIKE": {"SPD": 12, "ACC": 12, "AGI": 8, "COD": 6, "STR": 4, "AWR": 0, "PRC": 0, "TAK": 4, "POW": 0, "BSH": 2, "PUR": 6, "MCV": -6, "ZCV": 0, "PRS": -8, "INJ": 8, "STA": 4, "TGH": 4},
    "WILL": {"SPD": 14, "ACC": 14, "AGI": 10, "COD": 8, "STR": 0, "AWR": 0, "PRC": -2, "TAK": 4, "POW": -2, "BSH": 0, "PUR": 8, "MCV": -4, "ZCV": 0, "PRS": -8, "INJ": 8, "STA": 4, "TGH": 2},
    "CB": {"SPD": 16, "ACC": 14, "AGI": 10, "COD": 8, "STR": -8, "AWR": -2, "PRC": -2, "MCV": 2, "ZCV": 0, "PRS": -4, "CTH": -6, "JMP": 8, "TAK": -2, "PUR": 2, "INJ": 8, "STA": 4, "TGH": 2},
    "FS": {"SPD": 14, "ACC": 12, "AGI": 8, "COD": 6, "STR": -4, "AWR": 2, "PRC": 0, "MCV": -2, "ZCV": 4, "PRS": -6, "CTH": -2, "JMP": 6, "TAK": 2, "POW": -4, "PUR": 4, "INJ": 8, "STA": 4, "TGH": 2},
    "SS": {"SPD": 12, "ACC": 10, "AGI": 6, "COD": 4, "STR": 2, "AWR": 2, "PRC": 0, "MCV": -6, "ZCV": 0, "PRS": -8, "CTH": -4, "JMP": 4, "TAK": 6, "POW": 2, "PUR": 4, "INJ": 8, "STA": 4, "TGH": 4},
    "K": {"KPW": 8, "KAC": 6, "AWR": 0, "INJ": 8, "STA": 4, "TGH": 0},
    "P": {"KPW": 10, "KAC": 2, "AWR": 0, "INJ": 8, "STA": 4, "TGH": 0},
}


def build(pos: str, ovr: int, shape: dict) -> dict:
    attrs = {}
    for key in keys_for(pos):
        if key in shape:
            value = shape[key]
        else:
            value = ovr + OFFSETS[pos].get(key, 0)
        attrs[key] = max(40, min(89, int(value)))
    missing = [k for k in keys_for(pos) if k not in attrs]
    if missing:
        raise SystemExit(f"missing {pos} {missing}")
    return attrs


def main() -> None:
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    before_phi = con.execute("SELECT card_id, ovr, attributes_json FROM rating_cards c JOIN players p ON p.player_id=c.player_id WHERE p.team_abbr='PHI'").fetchall()
    phi_hash = hashlib.sha256(repr([(r["card_id"], r["ovr"], r["attributes_json"]) for r in before_phi]).encode()).hexdigest()
    cap_before = con.execute("SELECT cap_space, committed, players_counted FROM team_cap_ledger WHERE team_abbr='PHI'").fetchone()
    locked_before = {
        r["card_id"]: (r["ovr"], r["attributes_json"])
        for r in con.execute("SELECT card_id, ovr, attributes_json FROM rating_cards WHERE pool_role IN ('TOP10','EXTERNAL_CONTROL','FIRST_OUT')")
    }

    export = []
    cards = []
    audit_rows = []
    seen = []
    for _pos, _rank, name in DEPTH:
        if name in seen:
            continue
        seen.append(name)
        player = con.execute("SELECT * FROM players WHERE full_name=?", (name,)).fetchone()
        if not player:
            raise SystemExit(f"no player row {name}")
        if name in LOCKED:
            card = con.execute(
                "SELECT * FROM rating_cards WHERE player_id=? ORDER BY CASE WHEN pool_role='TOP10' THEN 0 WHEN pool_role='EXTERNAL_CONTROL' THEN 1 ELSE 2 END, ovr DESC",
                (player["player_id"],),
            ).fetchone()
            if not card:
                raise SystemExit(f"locked card missing {name}")
            attrs = json.loads(card["attributes_json"])
            export.append({"player": card["player_name"], "team": "DAL", "position": card["position"], "overall": card["ovr"], "attributes": attrs})
            cards.append({
                "card_id": card["card_id"], "player_id": card["player_id"], "player_name": card["player_name"],
                "position": card["position"], "ovr": card["ovr"], "pool_role": card["pool_role"],
                "confidence": card["confidence"], "style_profile": card["style_profile"],
                "weaknesses": json.loads(card["weaknesses_json"]) if card["weaknesses_json"] else None,
                "source_audit_id": card["source_audit_id"], "source_task_id": card["source_task_id"],
                "source_baseline_file": card["source_baseline_file"], "card_origin": card["card_origin"],
                "attributes": attrs, "locked": True,
                "identity": {"player_id": player["player_id"], "full_name": player["full_name"], "team_abbr": "DAL", "position_bucket": card["position"]},
            })
            audit_rows.append({"player": card["player_name"], "position": card["position"], "overall": card["ovr"], "action": "LOCKED_CARD_UNCHANGED", "card_id": card["card_id"], "rating_standard": "Gridiron Standard"})
            continue
        spec = NEW[name]
        attrs = build(spec["pos"], spec["ovr"], spec["shape"])
        if any(v >= 90 for v in attrs.values()):
            raise SystemExit(f"new 90 {name}")
        export.append({"player": player["full_name"], "team": "DAL", "position": spec["pos"], "overall": spec["ovr"], "attributes": attrs})
        # Keep the database full_name so the card matches the player row.
        cards.append({
            "card_id": f"DAL_AUDIT:{spec['pos']}:{player['player_id']}",
            "player_id": player["player_id"],
            "player_name": player["full_name"],
            "position": spec["pos"],
            "ovr": spec["ovr"],
            "pool_role": "RATED",
            "confidence": spec["conf"],
            "style_profile": spec["style"],
            "weaknesses": [],
            "source_audit_id": "DAL_FULL_RATINGS_2026-11-05",
            "source_task_id": f"DAL_{spec['pos']}_{player['player_id']}",
            "source_baseline_file": "artifacts/dal-full-ratings.json",
            "card_origin": "dal_team_audit",
            "attributes": attrs,
            "locked": False,
            "basis": spec["basis"],
            "identity": {"player_id": player["player_id"], "full_name": player["full_name"], "team_abbr": "DAL", "position_bucket": spec["pos"]},
        })
        audit_rows.append({
            "player": player["full_name"], "position": spec["pos"], "overall": spec["ovr"],
            "action": "NEW_GS_CARD", "confidence": spec["conf"], "basis": spec["basis"],
            "style_profile": spec["style"], "rating_standard": "Gridiron Standard",
            "pff_facets": "not used; paywalled on the retrieved team tables",
        })

    con.execute("BEGIN")
    # Write cards that do not already exist. Never update a locked card.
    for card in cards:
        if card["locked"]:
            continue
        existing = con.execute("SELECT card_id, ovr, pool_role FROM rating_cards WHERE player_id=? AND position=?", (card["player_id"], card["position"])).fetchone()
        if existing and existing["pool_role"] in ("TOP10", "EXTERNAL_CONTROL", "FIRST_OUT"):
            raise SystemExit(f"would touch locked {existing['card_id']}")
        if existing:
            raise SystemExit(f"unexpected existing card {existing['card_id']}")
        con.execute(
            """INSERT INTO rating_cards(
                card_id, player_id, player_name, position, ovr, audit_proposed_ovr, confidence,
                style_profile, weaknesses_json, source_audit_id, source_task_id, source_baseline_file,
                card_origin, pool_role, reference_only, attributes_json, seeded_at
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,?,?)""",
            (card["card_id"], card["player_id"], card["player_name"], card["position"], card["ovr"], card["ovr"],
             card["confidence"], card["style_profile"], "[]", card["source_audit_id"], card["source_task_id"],
             card["source_baseline_file"], card["card_origin"], card["pool_role"],
             json.dumps(card["attributes"], sort_keys=True), "2026-11-05T23:50:00Z"),
        )
        con.execute("DELETE FROM rating_attributes WHERE card_id=?", (card["card_id"],))
        for key, value in card["attributes"].items():
            con.execute(
                "INSERT INTO rating_attributes(card_id, attribute, rating, confidence) VALUES (?,?,?,?)",
                (card["card_id"], key, value, "gs_completion"),
            )
        con.execute(
            "UPDATE players SET position_bucket=?, depth_chart_position=? WHERE player_id=? AND team_abbr='DAL'",
            (card["position"], card["position"], card["player_id"]),
        )

    con.execute("DELETE FROM depth_chart WHERE team_abbr='DAL'")
    for pos, rank, name in DEPTH:
        player = con.execute("SELECT player_id, gsis_id FROM players WHERE full_name=?", (name,)).fetchone()
        label = {
            "QB": "Quarterback", "RB": "Running Back", "FB": "Fullback", "WR": "Wide Receiver", "TE": "Tight End",
            "LT": "Left Tackle", "LG": "Left Guard", "C": "Center", "RG": "Right Guard", "RT": "Right Tackle",
            "LEDGE": "Left Edge", "REDGE": "Right Edge", "DT": "Defensive Tackle", "MIKE": "Mike", "WILL": "Will",
            "CB": "Cornerback", "FS": "Free Safety", "SS": "Strong Safety", "K": "Kicker", "P": "Punter", "LS": "Long Snapper",
        }[pos]
        con.execute(
            """INSERT INTO depth_chart(team_abbr, snapshot_dt, player_id, player_name, gsis_id, pos_grp, pos_abb, pos_name, pos_rank, source)
               VALUES ('DAL', ?, ?, ?, ?, 'Madden', ?, ?, ?, ?)""",
            ("2026-11-05", player["player_id"], name,
             player["gsis_id"], pos, label, rank,
             "dallascowboys.com unofficial 2026 chart; ESPN depth 2026-11-05 for side labels"),
        )

    after_phi = hashlib.sha256(repr([(r["card_id"], r["ovr"], r["attributes_json"]) for r in con.execute("SELECT card_id, ovr, attributes_json FROM rating_cards c JOIN players p ON p.player_id=c.player_id WHERE p.team_abbr='PHI'")]).encode()).hexdigest()
    if phi_hash != after_phi:
        raise SystemExit("PHI cards changed")
    cap_after = con.execute("SELECT cap_space, committed, players_counted FROM team_cap_ledger WHERE team_abbr='PHI'").fetchone()
    if tuple(cap_before) != tuple(cap_after):
        raise SystemExit("PHI cap changed")
    locked_after = {
        r["card_id"]: (r["ovr"], r["attributes_json"])
        for r in con.execute("SELECT card_id, ovr, attributes_json FROM rating_cards WHERE pool_role IN ('TOP10','EXTERNAL_CONTROL','FIRST_OUT')")
    }
    if locked_before != locked_after:
        raise SystemExit("locked card changed")
    con.commit()

    starters = {
        "offense": ["Dak Prescott", "Javonte Williams", "CeeDee Lamb", "George Pickens", "Ryan Flournoy", "Jake Ferguson", "Tyler Guyton", "Tyler Smith", "Cooper Beebe", "Tyler Booker", "Terence Steele"],
        "defense": ["Quinnen Williams", "Otito Ogbonnia", "Kenny Clark", "Rashan Gary", "DeMarvion Overshown", "Dee Winters", "Donovan Ezeiruaku", "Joey Porter Jr.", "DaRon Bland", "P.J. Locke", "Malik Hooker"],
    }
    by_name = {row["player"]: row["overall"] for row in export}
    def avg(names):
        vals = [by_name[n] for n in names]
        return round(sum(vals) / len(vals), 2), vals
    off, off_vals = avg(starters["offense"])
    deff, def_vals = avg(starters["defense"])
    team = round((off + deff) / 2, 2)

    artifact = ROOT / "artifacts" / "dal-full-ratings.json"
    artifact.write_text(json.dumps(export, indent=1) + "\n")
    audit = {
        "rating_standard": "Gridiron Standard",
        "not_ea_official": True,
        "in_game_requirement_met": False,
        "ovr_formula": "The unverified weights in config/madden-ovr-weights.estimated.json were not used and do not validate these overalls in Madden 27.",
        "coverage": len(export),
        "unique_players": len({r["player"] for r in export}),
        "depth_slots": len(DEPTH),
        "sources": [
            "https://www.dallascowboys.com/team/depth-chart",
            "https://www.espn.com/nfl/team/depth/_/name/dal",
            "https://www.pff.com/grades/nfl/teams/dallas-cowboys",
            "https://www.pff.com/grades/nfl/teams/dallas-cowboys/2025",
            "https://fantasytools.ai/nfl-depth-charts/cowboys/",
            "https://athlonsports.com/nfl/dallas-cowboys/who-are-cowboys-quarterbacks-now-brian-schottenheimer-said-he-wants-one-on-the-practice-squad",
        ],
        "retrieved": "2026-11-05",
        "team_overall": {
            "method": "Unweighted mean of the listed starters' Gridiron overalls. Not a Madden team formula and not an in-game result.",
            "offense_starters": starters["offense"],
            "defense_starters": starters["defense"],
            "offense_unrounded": off,
            "defense_unrounded": deff,
            "team_unrounded": team,
            "offense": round(off),
            "defense": round(deff),
            "overall": round(team),
        },
        "contracts": "No Dallas cap ledger was written. ESPN lists single salary figures on its roster page; those are not year-by-year cap hits, so they were not imported as contracts.",
        "philadelphia_unchanged": True,
        "locked_cards_unchanged": True,
        "rows": audit_rows,
    }
    (ROOT / "artifacts" / "dal-rating-audit.json").write_text(json.dumps(audit, indent=1) + "\n")
    import_doc = {
        "kind": "dal_full_ratings_import",
        "rating_standard": "Gridiron Standard",
        "ratings_source": "artifacts/dal-full-ratings.json",
        "note": "Canonical Dallas cards and depth. Seed reloads this file and does not overwrite a locked card whose overall differs.",
        "cards": [{k: v for k, v in c.items() if k != "basis"} for c in cards],
        "depth": [{
            "team_abbr": "DAL", "snapshot_dt": "2026-11-05", "player_name": n,
            "player_id": con.execute("SELECT player_id FROM players WHERE full_name=?", (n,)).fetchone()[0],
            "pos_abb": pos, "pos_rank": rank, "pos_grp": "Madden",
            "source": "dallascowboys.com unofficial 2026 chart; ESPN depth 2026-11-05 for side labels",
        } for pos, rank, n in DEPTH],
    }
    # player_name on depth for TJ Bass should match players.full_name
    (ROOT / "data" / "roster" / "dal-full-ratings-import.json").write_text(json.dumps(import_doc, indent=1) + "\n")
    print(f"players {len(seen)} slots {len(DEPTH)} new {sum(1 for c in cards if not c['locked'])} locked {sum(1 for c in cards if c['locked'])}")
    print(f"OFF {off} DEF {deff} OVR {team}")


if __name__ == "__main__":
    main()
