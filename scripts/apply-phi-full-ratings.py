#!/usr/bin/env python3
"""Fill applicable Gridiron Standard attributes for the 46 PHI depth players.

Existing overalls and every attribute already stored on a card are preserved.
Locked complete cards are not rewritten. The Rams-edge Byron Young LEDGE card
is not the Eagles DT. New traits are judgment bands from the attached 2023-25
packet, repo team-room files, size, and role. They are not tuned to the
estimated Madden OVR formula (docs/addendum-2026-11-03-madden-ovr-validation.md).
"""

from __future__ import annotations

import hashlib
import json
import math
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "roster" / "gridiron.sqlite"
ENTRY = ROOT / "config" / "madden-entry-order.json"
WEIGHTS = ROOT / "config" / "madden-ovr-weights.estimated.json"
METRICS = ROOT / "config" / "position-metrics.json"
ARTIFACT = ROOT / "artifacts" / "phi-full-ratings.json"
AUDIT = ROOT / "artifacts" / "phi-rating-audit.json"

LOCKED_CARD_IDS = {
    "WR:WR_REAUDIT_RATE_13_A2",
    "TE:TE_REAUDIT_RATE_14_A3",
    "LT:LT_REAUDIT_RATE_03_A2",
    "WILL:WILL_REAUDIT_RATE_01_A1",
    "CB:CB_REAUDIT_RATE_07_A2",
    "SS:SS_REAUDIT_RATE_13_A1",
    "P:P_REAUDIT_RATE_10_A1",
    "LEDGE:LEDGE_REAUDIT_RATE_07_A2",
}

# Depth order of the researched 46 (depth-data-fixed.json PHI).
DEPTH = [
    ("Joe Milton III", "QB"),
    ("Tanner McKee", "QB"),
    ("Cole Payton", "QB"),
    ("Saquon Barkley", "RB"),
    ("Jaydon Blue", "RB"),
    ("Will Shipley", "RB"),
    ("DeVonta Smith", "WR"),
    ("Dontayvion Wicks", "WR"),
    ("Makai Lemon", "WR"),
    ("Darius Cooper", "WR"),
    ("Dallas Goedert", "TE"),
    ("Eli Stowers", "TE"),
    ("Johnny Mundt", "TE"),
    ("Grant Calcaterra", "TE"),
    ("Jordan Mailata", "LT"),
    ("Fred Johnson", "LT"),
    ("Markel Bell", "RT"),
    ("Landon Dickerson", "LG"),
    ("Willie Lampkin", "LG"),
    ("Drew Kendall", "C"),
    ("Jake Majors", "C"),
    ("Tyler Steen", "RG"),
    ("Micah Morris", "RG"),
    ("Nolan Smith Jr.", "LEDGE"),
    ("Arnold Ebiketie", "LEDGE"),
    ("Jonathan Greenard", "REDGE"),
    ("Jalyx Hunt", "REDGE"),
    ("A.J. Epenesa", "REDGE"),
    ("Jalen Carter", "DT"),
    ("Jordan Davis", "DT"),
    ("Moro Ojomo", "DT"),
    ("Byron Young", "DT"),
    ("Jihaad Campbell", "MIKE"),
    ("Jeremiah Trotter Jr.", "MIKE"),
    ("Zack Baun", "WILL"),
    ("Smael Mondon Jr.", "WILL"),
    ("Quinyon Mitchell", "CB"),
    ("Riq Woolen", "CB"),
    ("Kenny Moore II", "CB"),
    ("Jonathan Jones", "CB"),
    ("Andrew Mukuba", "FS"),
    ("Cooper DeJean", "SS"),
    ("Marcus Epps", "SS"),
    ("Jake Elliott", "K"),
    ("Braden Mann", "P"),
    ("Rocco Underwood", "LS"),
]

# card lookup name in the DB before this script renames Nolan.
CARD_NAME = {"Nolan Smith Jr.": "Nolan Smith"}


def card(player: str, pos: str, attrs: dict, style: str, weaknesses: list, basis: str, confidence: str = "PROPOSED"):
    return {
        "player": player,
        "position": pos,
        "attributes": attrs,
        "style_profile": style,
        "weaknesses": weaknesses,
        "basis": basis,
        "confidence": confidence,
    }


FILLS = [
    card(
        "Joe Milton III", "QB",
        {"SPD": 82, "ACC": 80, "AGI": 72, "COD": 70, "STR": 74, "AWR": 62, "THP": 92, "SAC": 64,
         "MAC": 66, "DAC": 62, "RUN": 66, "TUP": 60, "PAC": 64, "BSK": 68, "CAR": 66, "JMP": 76,
         "INJ": 84, "STA": 70, "TGH": 78},
        "Gridiron Standard. Cannon-arm developmental starter: throw power is the carried trait, 2025 accuracy and turnovers are not, and the frame can run some.",
        ["accuracy", "turnovers", "processing"],
        "Preserved AWR 62, THP 92, SAC 64. 2025 DAL 15/24, 183 yards, 1 TD, 2 INT, 50 rush yards, PFF 52.7; 2024 NE 22/29, 241 yards, 1 TD, 0 INT. 6-5, 235. Missing traits sit with the low accuracy anchor, not the earlier team-room SAC 74 / THP 97. SPD 82 is the prior team-room band for a 4.6-range athlete, which this card did not override.",
    ),
    card(
        "Tanner McKee", "QB",
        {"SPD": 70, "ACC": 74, "AGI": 66, "COD": 62, "STR": 70, "AWR": 68, "THP": 84, "SAC": 72,
         "MAC": 74, "DAC": 68, "RUN": 62, "TUP": 70, "PAC": 72, "BSK": 58, "CAR": 68, "JMP": 72,
         "INJ": 84, "STA": 74, "TGH": 76},
        "Gridiron Standard. Tall rhythm backup: timing and ball protection ahead of escape, and the card's accuracy sits below the earlier team-room figure.",
        ["mobility", "pressure", "deep ball"],
        "Preserved AWR 68, THP 84, SAC 72 (the current card is stricter than research-inbox/teams/PHI/QB/tanner_mckee.json SAC 80). 2024 PHI 30/45, 4 TD, 0 INT; 2025 PHI 24/43, 1 TD, 1 INT, PFF 61.2. Team-room 2026 note: pressured EPA -1.14 and a 1.3% turnover-worthy rate, so BSK stays poor and TUP does not. 6-6, 230. No new 90.",
    ),
    card(
        "Cole Payton", "QB",
        {"SPD": 84, "ACC": 86, "AGI": 76, "COD": 74, "STR": 76, "AWR": 58, "THP": 80, "SAC": 68,
         "MAC": 70, "DAC": 64, "RUN": 74, "TUP": 66, "PAC": 70, "BSK": 76, "CAR": 70, "JMP": 78,
         "INJ": 82, "STA": 76, "TGH": 80},
        "Gridiron Standard. Rookie dual-threat with no NFL snaps: college production is context, not an NFL grade, and the run traits lead the passing traits.",
        ["processing", "NFL sample", "arm talent"],
        "Rookie shrink. Preserved AWR 58 and THP 80. College PFF 95.9 is an FCS grade and is not copied onto any trait. Repo team-room file cites 2025 NDSU 161/224, 16 TD/4 INT, 136 carries for 777 yards, and a 4.56 forty at 232 pounds, plus a high college sack rate. Athleticism follows that file; accuracy stays under the preserved arm and awareness.",
    ),
    card(
        "Saquon Barkley", "RB",
        {"SPD": 89, "ACC": 88, "AGI": 86, "COD": 86, "STR": 82, "AWR": 84, "CAR": 88, "BCV": 80,
         "BTK": 82, "TRK": 80, "SFA": 82, "SPM": 80, "JKM": 86, "CTH": 72, "CIT": 56, "SRR": 70,
         "MRR": 60, "DRR": 54, "RLS": 58, "JMP": 88, "INJ": 66, "STA": 86, "TGH": 86},
        "Gridiron Standard. Feature back whose speed, burst, and ball security are still on the card, with receiving and availability as the lesser traits.",
        ["availability", "contested catching", "2025 efficiency"],
        "Preserved SPD 89, ACC 88, CAR 88, BCV 80, INJ 66. Missing traits taken from the approved team-room revision research-inbox/teams/PHI/RB/saquon_barkley.revision-A2-t52s464.json, which matches those anchors. That revision set INJ 78; the current card still stores 66, so 66 stays. 2023-25 packet: 2005 yards in 2024, 1140 and PFF 67.9 in 2025. No new 90.",
    ),
    card(
        "Jaydon Blue", "RB",
        {"SPD": 90, "ACC": 90, "AGI": 86, "COD": 84, "STR": 58, "AWR": 58, "CAR": 78, "BCV": 66,
         "BTK": 62, "TRK": 54, "SFA": 56, "SPM": 74, "JKM": 82, "CTH": 74, "CIT": 58, "SRR": 70,
         "MRR": 62, "DRR": 60, "RLS": 62, "JMP": 78, "INJ": 84, "STA": 78, "TGH": 72},
        "Gridiron Standard. Undersized speed back: the carried 90 speed and acceleration are not matched by power or vision.",
        ["power", "vision", "NFL volume"],
        "Preserved SPD 90 and ACC 90. The team-room file had 93/93; those were not copied. Other traits follow research-inbox/teams/PHI/RB/jaydon_blue.json (5-9, 200; 2025 DAL 38 carries, 3.39 yards per carry, stuff rate 39.5%, PFF 56.9). No additional 90.",
    ),
    card(
        "Will Shipley", "RB",
        {"SPD": 88, "ACC": 88, "AGI": 86, "COD": 86, "STR": 66, "AWR": 66, "CAR": 74, "BCV": 70,
         "BTK": 68, "TRK": 62, "SFA": 64, "SPM": 66, "JKM": 76, "CTH": 72, "CIT": 50, "SRR": 62,
         "MRR": 52, "DRR": 44, "RLS": 52, "JMP": 82, "INJ": 72, "STA": 84, "TGH": 82},
        "Gridiron Standard. Change-of-pace and special-teams back: quick feet and check-down hands, not a power runner, with a reserve injury tag.",
        ["rushing production", "contested catches", "availability"],
        "Preserved SPD 88 and CTH 72. The team-room file had SPD 84 and CTH 70; the current card is higher and wins. ACC set level with the preserved speed. Other traits follow research-inbox/teams/PHI/RB/will_shipley.json. Packet: 2024 30 carries, 82 yards; 2025 14 carries, 49 yards; PFF 54.9. Roster status RES.",
    ),
    card(
        "Dontayvion Wicks", "WR",
        {"SPD": 86, "ACC": 86, "AGI": 80, "COD": 78, "STR": 68, "AWR": 74, "CTH": 84, "CIT": 86,
         "SPC": 78, "SRR": 74, "MRR": 76, "DRR": 80, "RLS": 76, "JMP": 88, "CAR": 70, "BTK": 62,
         "SPM": 64, "JKM": 70, "INJ": 78, "STA": 76, "TGH": 74},
        "Gridiron Standard. Contested and jump-ball receiver whose catch traits lead his route traits, on a modest target volume.",
        ["volume", "yards after catch", "separation"],
        "Preserved SPD 86, CTH 84, CIT 86, JMP 88. Packet: 2023 GB 39/581/4, 2024 39/415/5, 2025 30/332/2, PFF 70.2. 6-1, 208. CIT already above CTH, so the profile stays contested rather than separator. No new 90.",
    ),
    card(
        "Makai Lemon", "WR",
        {"SPD": 88, "ACC": 90, "AGI": 88, "COD": 86, "STR": 52, "AWR": 64, "CTH": 78, "CIT": 68,
         "SPC": 70, "SRR": 80, "MRR": 78, "DRR": 74, "RLS": 76, "JMP": 76, "CAR": 72, "BTK": 54,
         "SPM": 68, "JKM": 78, "INJ": 84, "STA": 72, "TGH": 64},
        "Gridiron Standard. Rookie separator with no NFL snaps: burst and agility lead, play strength and awareness do not, and the college grade is not an NFL trait.",
        ["play strength", "NFL sample", "contested catches"],
        "Rookie shrink. Preserved SPD 88, ACC 90, AGI 88, CTH 78. College PFF 90.8 is not copied. 5-11, 192. Routes sit under the athletic traits. ACC 90 was already on the card and is not a new elite trait from the college grade.",
    ),
    card(
        "Darius Cooper", "WR",
        {"SPD": 86, "ACC": 84, "AGI": 78, "COD": 76, "STR": 68, "AWR": 62, "CTH": 74, "CIT": 66,
         "SPC": 64, "SRR": 70, "MRR": 68, "DRR": 66, "RLS": 66, "JMP": 74, "CAR": 70, "BTK": 64,
         "SPM": 62, "JKM": 70, "INJ": 80, "STA": 70, "TGH": 72},
        "Gridiron Standard. Low-volume depth receiver: enough speed to be on the card, without a route or contested-catch specialty yet.",
        ["volume", "route precision", "sample size"],
        "Preserved SPD 86 and CTH 74. Packet: 2025 PHI 6 games, 9 catches, 92 yards, PFF 61.0. 5-11, 210, one NFL season. Traits cluster with that volume. No 90.",
    ),
    card(
        "Eli Stowers", "TE",
        {"SPD": 84, "ACC": 82, "AGI": 74, "COD": 72, "STR": 74, "AWR": 62, "CTH": 76, "CIT": 70,
         "SPC": 68, "SRR": 72, "MRR": 70, "DRR": 66, "RLS": 68, "JMP": 76, "CAR": 68, "BTK": 66,
         "RBK": 64, "IBL": 62, "PBK": 60, "INJ": 82, "STA": 70, "TGH": 74},
        "Gridiron Standard. Rookie receiving tight end: speed and hands lead, blocking is unproven, and the college grade is not an NFL grade.",
        ["blocking", "NFL sample", "play strength"],
        "Rookie shrink. Preserved SPD 84 and CTH 76. College PFF 81.6 is not copied. No NFL regular-season line. 6-4, 239. Blocking traits stay below the receiving traits.",
    ),
    card(
        "Johnny Mundt", "TE",
        {"SPD": 74, "ACC": 72, "AGI": 66, "COD": 62, "STR": 78, "AWR": 74, "CTH": 70, "CIT": 64,
         "SPC": 60, "SRR": 62, "MRR": 58, "DRR": 48, "RLS": 56, "JMP": 70, "CAR": 66, "BTK": 70,
         "RBK": 78, "IBL": 74, "PBK": 70, "INJ": 76, "STA": 78, "TGH": 80},
        "Gridiron Standard. Veteran inline tight end: run blocking and strength are the card, receiving volume is not.",
        ["receiving volume", "deep speed", "separation"],
        "Preserved STR 78, CTH 70, RBK 78. Packet: 2023 MIN 17/172/1, 2024 19/142/2, 2025 JAX 9/111/0, PFF 59.6. 6-4, 245, 9 years. Routes and speed stay under the blocking traits.",
    ),
    card(
        "Grant Calcaterra", "TE",
        {"SPD": 78, "ACC": 78, "AGI": 72, "COD": 68, "STR": 74, "AWR": 66, "CTH": 72, "CIT": 64,
         "SPC": 66, "SRR": 66, "MRR": 64, "DRR": 58, "RLS": 62, "JMP": 74, "CAR": 68, "BTK": 66,
         "RBK": 64, "IBL": 66, "PBK": 62, "INJ": 70, "STA": 72, "TGH": 74},
        "Gridiron Standard. Depth receiving tight end: ordinary hands, light blocking, and a low 2025 grade on a small target count.",
        ["blocking", "volume", "availability"],
        "Preserved CTH 72. Packet: 2024 24/298/1, 2025 9 games, 9/76/1, PFF 50.5. 6-4, 240. Blocking stays under the catch trait. INJ 70 reflects 3 games in 2023 and 9 in 2025, not a named diagnosis.",
    ),
    card(
        "Fred Johnson", "LT",
        {"STR": 84, "SPD": 60, "ACC": 62, "AGI": 56, "COD": 50, "AWR": 76, "PBK": 74, "PBP": 76,
         "PBF": 70, "RBK": 72, "RBP": 74, "RBF": 68, "IBL": 76, "LBK": 70, "INJ": 82, "STA": 84, "TGH": 84},
        "Gridiron Standard. Veteran swing tackle: size and experience ahead of feet, pass protection a shade over run blocking. Also listed at RG and RT on the depth chart; this is the one LT card.",
        ["agility", "finesse", "2025 grade"],
        "Preserved STR 84, PBK 74, RBK 72. Packet: 2025 PFF 58.9, 626 offensive snaps; 2024 481; 2023 35. 6-7, 326, 7 years, 17 games in each of 2023-25. Splits stay next to the preserved blocking grades. No 90.",
    ),
    card(
        "Markel Bell", "RT",
        {"STR": 84, "SPD": 54, "ACC": 56, "AGI": 48, "COD": 48, "AWR": 58, "PBK": 70, "PBP": 70,
         "PBF": 64, "RBK": 72, "RBP": 74, "RBF": 68, "IBL": 80, "LBK": 74, "INJ": 84, "STA": 66, "TGH": 80},
        "Gridiron Standard. Rookie right tackle with no NFL snaps: mass and a slight run lean, not feet or recognition. College grade is not an NFL grade. Also the third left tackle on the depth chart.",
        ["pass-protection feet", "recognition", "NFL sample"],
        "Rookie shrink. Preserved STR 84, PBK 70, RBK 72. College PFF 70.3 is not copied. No NFL snaps. 6-9, 346. Anchor traits sit above the foot traits. No 90.",
    ),
    card(
        "Landon Dickerson", "LG",
        {"STR": 92, "SPD": 62, "ACC": 64, "AGI": 58, "COD": 52, "AWR": 78, "PBK": 76, "PBP": 74,
         "PBF": 72, "RBK": 84, "RBP": 86, "RBF": 80, "IBL": 88, "LBK": 84, "INJ": 78, "STA": 82, "TGH": 86},
        "Gridiron Standard. Power run guard: the carried strength and run-block grades lead the pass-protection grades.",
        ["pass protection", "agility", "snap trend"],
        "Preserved STR 92, AWR 78, PBK 76, RBK 84. Packet: PFF 67.8; offensive snaps 1046, 996, then 836. 6-6, 332. Run splits stay above pass splits. STR 92 was already on the card. No new 90. INJ 78 is the snap trend, not a named injury.",
    ),
    card(
        "Willie Lampkin", "LG",
        {"STR": 74, "SPD": 70, "ACC": 72, "AGI": 78, "COD": 74, "AWR": 58, "PBK": 68, "PBP": 66,
         "PBF": 70, "RBK": 64, "RBP": 62, "RBF": 66, "IBL": 58, "LBK": 66, "INJ": 80, "STA": 68, "TGH": 72},
        "Gridiron Standard. Undersized depth guard: preserved agility and a modest pass-block grade, with no public grade and no NFL stat line. Anchor stays under the feet.",
        ["anchor", "sample", "play strength"],
        "Preserved AGI 78 and PBK 68. No PFF grade and no 2023-25 stat line. 5-11, 290. Other traits are a role band around overall 62, with feet above anchor. LOW sample. No 90.",
        "LOW",
    ),
    card(
        "Drew Kendall", "C",
        {"STR": 80, "SPD": 64, "ACC": 66, "AGI": 62, "COD": 56, "AWR": 74, "PBK": 72, "PBP": 74,
         "PBF": 70, "RBK": 70, "RBP": 72, "RBF": 68, "IBL": 74, "LBK": 72, "INJ": 80, "STA": 70, "TGH": 78},
        "Gridiron Standard. Small-sample center: preserved awareness and a slight pass-protection lean, on 89 offensive snaps.",
        ["sample size", "run blocking", "experience"],
        "Preserved AWR 74, PBK 72, RBK 70. Packet: 2025 7 games, 89 offensive snaps, PFF 61.8. 6-4, 308. Pass splits stay next to PBK 72 and run splits next to RBK 70. STR 80 is a size band, not a measured bench. No 90.",
    ),
    card(
        "Jake Majors", "C",
        {"STR": 76, "SPD": 60, "ACC": 62, "AGI": 58, "COD": 54, "AWR": 56, "PBK": 64, "PBP": 62,
         "PBF": 62, "RBK": 64, "RBP": 62, "RBF": 60, "IBL": 66, "LBK": 64, "INJ": 82, "STA": 64, "TGH": 74},
        "Gridiron Standard. Deep backup center with no public grade and no NFL stat line. The preserved pass-block grade is ordinary, and the rest sits under Drew Kendall.",
        ["sample", "recognition", "leverage"],
        "Preserved PBK 64. No PFF grade and no 2023-25 stat line. 6-3, 306. Other traits are a role band around overall 58, at or under that pass-block grade and under Kendall. LOW sample. No 90.",
        "LOW",
    ),
    card(
        "Tyler Steen", "RG",
        {"STR": 86, "SPD": 64, "ACC": 66, "AGI": 60, "COD": 54, "AWR": 74, "PBK": 76, "PBP": 78,
         "PBF": 74, "RBK": 78, "RBP": 80, "RBF": 76, "IBL": 80, "LBK": 78, "INJ": 86, "STA": 86, "TGH": 84},
        "Gridiron Standard. Full-time right guard whose 2025 snap count and grade lead the interior backups, without an elite trait.",
        ["agility", "elite pass protection"],
        "Preserved STR 86, AWR 74, PBK 76, RBK 78. Packet: 2025 PFF 73.3 and 1009 offensive snaps after 316 and 71 in the prior two years. 6-6, 321. 17 games in 2024 and 2025. Splits stay next to the preserved grades. No 90.",
    ),
    card(
        "Micah Morris", "RG",
        {"STR": 80, "SPD": 56, "ACC": 58, "AGI": 50, "COD": 46, "AWR": 56, "PBK": 60, "PBP": 60,
         "PBF": 56, "RBK": 62, "RBP": 64, "RBF": 58, "IBL": 72, "LBK": 64, "INJ": 84, "STA": 64, "TGH": 80},
        "Gridiron Standard. Rookie heavy guard with no NFL snaps: mass over feet, and the college grade is not an NFL blocking grade.",
        ["feet", "recognition", "NFL sample"],
        "Rookie shrink. Preserved STR 80 only. College PFF 73.1 is not copied onto a blocking grade. PBK 60 and RBK 62 are new role bands under that strength, not prior card values. 6-5, 334. Feet well below the anchor. No 90.",
    ),
    card(
        "Nolan Smith Jr.", "LEDGE",
        {"SPD": 90, "ACC": 92, "AGI": 86, "COD": 84, "STR": 72, "AWR": 74, "PRC": 72, "TAK": 74,
         "POW": 70, "BSH": 68, "PMV": 74, "FMV": 82, "PUR": 84, "INJ": 76, "STA": 80, "TGH": 74},
        "Gridiron Standard. Speed rusher: the carried burst and finesse lead, power and block-shed do not. Card name Nolan Smith is the same player.",
        ["power", "block shed", "availability"],
        "Preserved SPD 90, ACC 92, PMV 74, FMV 82. Packet under Nolan Smith Jr.: 2024 6.5 sacks, 2025 12 games, 31 tackles, 3 sacks, 11 quarterback hits, PFF 70.4. 6-2, 235. Power traits stay under the finesse traits. No new 90. Alias of Nolan Smith.",
    ),
    card(
        "Arnold Ebiketie", "LEDGE",
        {"SPD": 86, "ACC": 84, "AGI": 78, "COD": 74, "STR": 76, "AWR": 76, "PRC": 74, "TAK": 76,
         "POW": 74, "BSH": 74, "PMV": 72, "FMV": 76, "PUR": 78, "INJ": 82, "STA": 80, "TGH": 76},
        "Gridiron Standard. Assignment edge whose grade held up better than his 2025 sack count. Not a power end and not Nolan Smith's athlete.",
        ["sack conversion", "bend"],
        "Preserved SPD 86 and FMV 76. Packet: 6 sacks in 2023, 6 in 2024, 2 sacks and 6 quarterback hits in 2025, PFF 74.9. 6-3, 256. Recognition and tackling sit above the sack line. No 90.",
    ),
    card(
        "Jonathan Greenard", "REDGE",
        {"SPD": 76, "ACC": 78, "AGI": 72, "COD": 68, "STR": 84, "AWR": 78, "PRC": 78, "TAK": 78,
         "POW": 80, "BSH": 78, "PMV": 82, "FMV": 80, "PUR": 76, "INJ": 74, "STA": 80, "TGH": 82},
        "Gridiron Standard. Veteran power-and-technique edge: the preserved pass-rush grades lead, speed does not, and 2025 was a sack drop from the prior two years.",
        ["2025 sack drop", "speed", "availability"],
        "Preserved STR 84, AWR 78, PMV 82, FMV 80. Packet: 12.5 sacks in 2023, 12 in 2024, 2025 12 games, 3 sacks, 10 tackles for loss, 12 quarterback hits, PFF 74.3. 6-3, 263. No new 90. INJ 74 is the 12-game 2025, not a named injury.",
    ),
    card(
        "Jalyx Hunt", "REDGE",
        {"SPD": 86, "ACC": 86, "AGI": 80, "COD": 78, "STR": 72, "AWR": 68, "PRC": 68, "TAK": 72,
         "POW": 70, "BSH": 66, "PMV": 68, "FMV": 74, "PUR": 82, "INJ": 88, "STA": 84, "TGH": 74},
        "Gridiron Standard. Developing speed edge: 2025 pressure volume above the grade, power and recognition behind the pursuit.",
        ["power", "recognition", "grade versus pressures"],
        "Preserved SPD 86 and FMV 74. Packet: 2025 17 games, 51 tackles, 6.5 sacks, 9 tackles for loss, 24 quarterback hits, PFF 67.3. 6-3, 252. Pursuit above power. No 90.",
    ),
    card(
        "A.J. Epenesa", "REDGE",
        {"SPD": 72, "ACC": 74, "AGI": 66, "COD": 62, "STR": 86, "AWR": 72, "PRC": 74, "TAK": 76,
         "POW": 80, "BSH": 78, "PMV": 78, "FMV": 68, "PUR": 70, "INJ": 80, "STA": 78, "TGH": 82},
        "Gridiron Standard. Heavy power end: strength and the preserved power move lead, finesse and speed do not.",
        ["finesse", "2025 grade", "speed"],
        "Preserved STR 86 and PMV 78. Packet: 6.5 and 6 sacks in 2023-24, 2025 2.5 sacks, 2 tackles for loss, 9 quarterback hits, PFF 58.9. 6-6, 280. Finesse stays under the power traits. No 90.",
    ),
    card(
        "Jalen Carter", "DT",
        {"SPD": 72, "ACC": 84, "AGI": 70, "COD": 64, "STR": 90, "AWR": 78, "PRC": 74, "TAK": 78,
         "POW": 82, "BSH": 80, "PMV": 86, "FMV": 74, "PUR": 76, "INJ": 74, "STA": 78, "TGH": 86},
        "Gridiron Standard. Explosive interior penetrator: preserved power move, strength, and acceleration lead a down 2025 grade. Not a nose.",
        ["2025 grade", "availability", "finesse consistency"],
        "Preserved ACC 84, STR 90, AWR 78, PMV 86. Packet: 6 sacks as a rookie, 4.5 in 2024, 2025 12 games, 3 sacks, 5 tackles for loss, PFF 55.1. 6-3, 314. The down grade is why recognition and injury stay under the preserved pass-rush traits. STR 90 and PMV 86 were already on the card. No new 90.",
    ),
    card(
        "Jordan Davis", "DT",
        {"SPD": 64, "ACC": 68, "AGI": 56, "COD": 50, "STR": 96, "AWR": 76, "PRC": 80, "TAK": 82,
         "POW": 84, "BSH": 88, "PMV": 72, "FMV": 58, "PUR": 66, "INJ": 80, "STA": 78, "TGH": 86},
        "Gridiron Standard. Nose: preserved strength and block-shed lead, speed and finesse do not. The 2025 tackle count is the on-field evidence for the run traits.",
        ["speed", "finesse rush", "range"],
        "Preserved STR 96, BSH 88, PMV 72. Packet: 2025 17 games, 70 tackles, 4.5 sacks, 9 tackles for loss, PFF 73.9, after lighter 2023-24 tackle counts. 6-6, 336. STR 96 was already on the card. No new 95 or 90. FMV stays well under PMV.",
    ),
    card(
        "Moro Ojomo", "DT",
        {"SPD": 72, "ACC": 76, "AGI": 66, "COD": 60, "STR": 84, "AWR": 74, "PRC": 74, "TAK": 76,
         "POW": 78, "BSH": 76, "PMV": 78, "FMV": 70, "PUR": 74, "INJ": 88, "STA": 84, "TGH": 80},
        "Gridiron Standard. Interior rusher coming off a 6-sack season: power move leads finesse, and the build is lighter than Jordan Davis.",
        ["block shed versus Davis", "finesse"],
        "Preserved STR 84 and PMV 78. Packet: 2025 17 games, 38 tackles, 6 sacks, 6 tackles for loss, 12 quarterback hits, PFF 70.6, after little 2023-24 production. 6-3, 292. No 90.",
    ),
    card(
        "Byron Young", "DT",
        {"SPD": 66, "ACC": 70, "AGI": 60, "COD": 54, "STR": 84, "AWR": 64, "PRC": 66, "TAK": 70,
         "POW": 72, "BSH": 70, "PMV": 66, "FMV": 62, "PUR": 66, "INJ": 80, "STA": 74, "TGH": 76},
        "Gridiron Standard. Eagles defensive tackle, Alabama, not the Rams edge. Rotational interior with a poor 2025 grade and a modest sack total.",
        ["pass rush", "grade", "leverage versus starters"],
        "New card. There was no PHI DT overall on the depth chart. Judgment overall 61, below Moro Ojomo 70. Packet: 2025 PHI 14 games, 35 tackles, 2.5 sacks, 3 tackles for loss, 4 quarterback hits, PFF 49.5; 2023 LV 3 games, 4 tackles. Repo supplement byron-young-phi-supplement-t46u.json separates gsis 00-0038978 / YounBy00 from the Rams edge 00-0039137. Registry biographical match for this id is 6-3, 292. STR 84 matches that size band and Ojomo's preserved strength, while the rush traits stay lower. No 90. The LEDGE 81 card was not edited.",
        "LOW",
    ),
    card(
        "Jihaad Campbell", "MIKE",
        {"SPD": 88, "ACC": 88, "AGI": 84, "COD": 80, "STR": 74, "AWR": 74, "PRC": 76, "TAK": 78,
         "POW": 72, "BSH": 70, "PUR": 80, "MCV": 68, "ZCV": 74, "PRS": 62, "INJ": 86, "STA": 84, "TGH": 78},
        "Gridiron Standard. Athletic first-year mike: speed and zone tackling lead, pass rush does not.",
        ["pass rush", "man coverage", "play strength"],
        "Preserved SPD 88, ACC 88, TAK 78, ZCV 74. Packet: 2025 16 games, 78 tackles, 0 sacks, 2 tackles for loss, 1 INT, 3 passes defensed, PFF 76.2. 6-3, 235. PRS stays low because the sack line is empty. No new 90.",
    ),
    card(
        "Jeremiah Trotter Jr.", "MIKE",
        {"SPD": 78, "ACC": 76, "AGI": 72, "COD": 70, "STR": 78, "AWR": 74, "PRC": 76, "TAK": 80,
         "POW": 74, "BSH": 76, "PUR": 74, "MCV": 64, "ZCV": 72, "PRS": 58, "INJ": 78, "STA": 72, "TGH": 76},
        "Gridiron Standard. Low-snap thumper: tackling and strength lead athleticism. The 2025 grade is not treated as an 82-overall trait because the counting stats are small.",
        ["snap volume", "coverage speed", "pass rush"],
        "Preserved STR 78 and TAK 80. Packet: 2025 13 games, 31 tackles, 0 sacks, 1 tackle for loss, 0 INT, PFF 82.1; 2024 25 tackles. 6-0, 225. Awareness stays under the grade because the tackle count is a limited sample. No 90.",
    ),
    card(
        "Smael Mondon Jr.", "WILL",
        {"SPD": 86, "ACC": 84, "AGI": 78, "COD": 76, "STR": 72, "AWR": 58, "PRC": 60, "TAK": 74,
         "POW": 68, "BSH": 64, "PUR": 74, "MCV": 62, "ZCV": 64, "PRS": 58, "INJ": 72, "STA": 66, "TGH": 70},
        "Gridiron Standard. Athletic will linebacker whose 2025 grade and production are far below the preserved speed.",
        ["production", "recognition", "sample"],
        "Preserved SPD 86 and TAK 74. Packet: 2025 8 games, 11 tackles, no sacks, tackles for loss, interceptions, or passes defensed, PFF 34.0. 6-2, 225. Skill traits stay near that grade. No new 90.",
    ),
    card(
        "Riq Woolen", "CB",
        {"SPD": 92, "ACC": 88, "AGI": 78, "COD": 74, "STR": 66, "AWR": 70, "PRC": 70, "MCV": 78,
         "ZCV": 72, "PRS": 76, "CTH": 68, "JMP": 90, "TAK": 68, "PUR": 72, "INJ": 78, "STA": 80, "TGH": 74},
        "Gridiron Standard. Long speed corner: preserved speed and jump lead a down 2025 grade. Agility is not the same trait as that speed. Alias Tariq Woolen.",
        ["2025 grade", "agility", "tackling"],
        "Preserved SPD 92, MCV 78, PRS 76, JMP 90. Packet: 2023-25 interceptions 2, 3, 1 and passes defensed 11, 14, 12; 2025 PFF 59.8. 6-4, 210. ACC stays under 90 because there is no separate acceleration cite. No new 90.",
    ),
    card(
        "Kenny Moore II", "CB",
        {"SPD": 84, "ACC": 86, "AGI": 86, "COD": 86, "STR": 62, "AWR": 84, "PRC": 82, "MCV": 78,
         "ZCV": 80, "PRS": 70, "CTH": 72, "JMP": 72, "TAK": 78, "PUR": 80, "INJ": 78, "STA": 80, "TGH": 74},
        "Gridiron Standard. Veteran slot: preserved agility and zone lead, long speed and press do not, and the tackle line is part of the job.",
        ["deep speed", "press", "play strength"],
        "Preserved AGI 86, COD 86, MCV 78, ZCV 80. Packet: 2025 55 tackles, 1.5 sacks, 3 tackles for loss, 1 INT, 6 passes defensed, PFF 66.7, after higher tackle counts in 2023-24. 5-9, 190, 9 years. No 90.",
    ),
    card(
        "Jonathan Jones", "CB",
        {"SPD": 88, "ACC": 86, "AGI": 84, "COD": 82, "STR": 58, "AWR": 84, "PRC": 76, "MCV": 76,
         "ZCV": 72, "PRS": 70, "CTH": 64, "JMP": 78, "TAK": 72, "PUR": 76, "INJ": 74, "STA": 78, "TGH": 72},
        "Gridiron Standard. Veteran outside corner: preserved speed and awareness sit above a poor 2025 grade and ordinary ball production.",
        ["2025 grade", "ball skills", "play strength"],
        "Preserved SPD 88, AWR 84, MCV 76. Packet: 2025 11 games, 41 tackles, 1 sack, 0 INT, 5 passes defensed, PFF 50.9. 5-10, 190, 10 years. Zone and hands stay under the preserved man and awareness grades. No 90.",
    ),
    card(
        "Andrew Mukuba", "FS",
        {"SPD": 88, "ACC": 88, "AGI": 84, "COD": 82, "STR": 62, "AWR": 68, "PRC": 70, "MCV": 70,
         "ZCV": 76, "PRS": 66, "CTH": 74, "JMP": 78, "TAK": 74, "POW": 64, "PUR": 78, "INJ": 72, "STA": 74, "TGH": 70},
        "Gridiron Standard. First-year free safety: preserved speed and a real interception count, with the grade and play strength still modest.",
        ["play strength", "grade", "availability"],
        "Preserved SPD 88, ACC 88, ZCV 76, TAK 74. Packet: 2025 11 games, 43 tackles, 0.5 sacks, 2 tackles for loss, 2 INT, 3 passes defensed, PFF 57.6. 5-11, 186. Ball skills sit above the grade and below an elite trait. No 90.",
    ),
    card(
        "Marcus Epps", "SS",
        {"SPD": 80, "ACC": 80, "AGI": 74, "COD": 72, "STR": 70, "AWR": 82, "PRC": 76, "MCV": 66,
         "ZCV": 76, "PRS": 60, "CTH": 66, "JMP": 72, "TAK": 80, "POW": 72, "PUR": 74, "INJ": 68, "STA": 72, "TGH": 74},
        "Gridiron Standard. Veteran box safety: preserved awareness, zone, and tackling lead speed and man coverage. The 2025 grade is a down year on limited games.",
        ["2025 grade", "availability", "man coverage"],
        "Preserved AWR 82, ZCV 76, TAK 80. Packet: 2024 3 games, 2025 9 games, 21 tackles, 0 INT, PFF 51.8. 6-0, 198, 7 years. New traits do not pretend the down year is an athlete prime. No 90.",
    ),
    card(
        "Jake Elliott", "K",
        {"KPW": 84, "KAC": 88, "AWR": 80, "INJ": 88, "STA": 80, "TGH": 72},
        "Gridiron Standard. Veteran kicker: preserved accuracy and power stay, including through a down 2025 field-goal year. Availability is ordinary for a kicker who played every week, not a new 90.",
        ["2025 field-goal rate", "consistency"],
        "Preserved KPW 84, KAC 88, AWR 80. Packet: 2023 30/32, long 61; 2024 28/36, long 50; 2025 20/27, long 58, XP 41/42, PFF 57.4. 17 games each year. The accuracy trait was already on the card and was not cut to chase the estimated kicker formula. No new 90.",
    ),
    card(
        "Rocco Underwood", "LS",
        {"AWR": 70, "STR": 72, "RBK": 64, "PBK": 62, "SPD": 70, "TAK": 66},
        "Gridiron Standard. Rookie long snapper with no public grade and no NFL stat line. Applicable traits are the long-snapper set, not receiver traits.",
        ["sample", "snap record"],
        "Preserved AWR 70. Applicable LS traits from config/position-metrics.json: AWR, STR, RBK, PBK, SPD, TAK. The prior partial card also had CTH 68, which is not a long-snapper input and is removed from the card; the value is recorded here so it is not lost. No PFF grade and no 2023-25 stat line. 6-3, 231. Other traits are a role band around overall 64. LOW sample. No published LS overall archetype, so the calculator has nothing to check.",
        "LOW",
    ),
]


def js_round(value: float) -> int:
    return int(math.floor(value + 0.5))


def load_json(path: Path):
    return json.loads(path.read_text())


def applicable(positions: dict, metrics: dict, pos: str) -> list[str]:
    if pos == "LS":
        return list(metrics["positions"]["LS"]["madden_attributes_informed"])
    if pos == "FB":
        return list(metrics["positions"]["FB"]["madden_attributes_informed"])
    return [key for key in positions[pos] if key != "OVR"]


def estimate(pos: str, attrs: dict, weights: dict) -> dict:
    group = weights["position_map"].get(pos, pos)
    archetypes = []
    for name, definition in weights["archetypes"].items():
        if group == "EDGE" and (definition["group"] == "DE" or name in ("OLB_PowerRusher", "OLB_SpeedRusher")):
            archetypes.append((name, definition))
        elif definition["group"] == group:
            archetypes.append((name, definition))
    if not archetypes:
        return {"estimated_ovr": None, "best_archetype": None, "per_archetype": {}, "missing": ["NO_ARCHETYPE"]}
    fallbacks = weights["fallbacks"]
    per = {}
    best_name = None
    best_raw = -1e9
    best_missing: list[str] = []
    for name, definition in archetypes:
        total = 0.0
        weight_sum = 0
        missing = []
        for key, weight in definition["weights"].items():
            if key in attrs:
                value = attrs[key]
            elif fallbacks.get(key) in attrs:
                value = attrs[fallbacks[key]]
            else:
                missing.append(key)
                continue
            total += value * weight
            weight_sum += weight
        average = total / weight_sum if weight_sum else 0
        raw = (average - definition["desired_low"]) * 99 / (definition["desired_high"] - definition["desired_low"])
        per[name] = max(12, min(99, js_round(raw)))
        if raw > best_raw:
            best_raw = raw
            best_name = name
            best_missing = missing
    return {
        "estimated_ovr": per[best_name],
        "best_archetype": best_name,
        "per_archetype": per,
        "missing": best_missing,
    }


def mean_center_corr(a: dict, b: dict, keys: list[str]) -> tuple[float, float]:
    av = [a[k] for k in keys]
    bv = [b[k] for k in keys]
    am = sum(av) / len(av)
    bm = sum(bv) / len(bv)
    ax = [v - am for v in av]
    bx = [v - bm for v in bv]
    num = sum(x * y for x, y in zip(ax, bx))
    da = math.sqrt(sum(x * x for x in ax))
    db = math.sqrt(sum(x * x for x in bx))
    corr = num / (da * db) if da and db else 1.0
    mad = sum(abs(x - y) for x, y in zip(av, bv)) / len(keys)
    return corr, mad


def main() -> None:
    positions = load_json(ENTRY)["positions"]
    weights = load_json(WEIGHTS)
    metrics = load_json(METRICS)
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row

    before_cards = con.execute("SELECT COUNT(*) FROM rating_cards").fetchone()[0]
    before_contracts = con.execute("SELECT COUNT(*) FROM contracts").fetchone()[0]
    before_years = con.execute("SELECT COUNT(*) FROM contract_years").fetchone()[0]
    cap_before = con.execute(
        "SELECT season, accounting_rule, league_cap, carryover, adjustments, committed, dead_money, cap_space, players_counted "
        "FROM team_cap_ledger WHERE team_abbr='PHI'"
    ).fetchall()
    hurts_before = con.execute(
        "SELECT ovr, attributes_json FROM rating_cards WHERE player_name='Jalen Hurts'"
    ).fetchone()
    locked_before = {
        row["card_id"]: row["attributes_json"] + "|" + str(row["ovr"]) + "|" + row["player_name"] + "|" + row["position"]
        for row in con.execute(
            f"SELECT card_id, attributes_json, ovr, player_name, position FROM rating_cards WHERE card_id IN ({','.join('?' * len(LOCKED_CARD_IDS))})",
            tuple(LOCKED_CARD_IDS),
        )
    }
    other_teams = con.execute(
        "SELECT COUNT(*) FROM rating_cards c JOIN players p ON p.player_id=c.player_id WHERE p.team_abbr!='PHI'"
    ).fetchone()[0]

    fills = {row["player"]: row for row in FILLS}
    if set(fills) | {name for name, _ in DEPTH if name not in fills} != {name for name, _ in DEPTH}:
        raise SystemExit("fill/depth mismatch")

    audit_rows = []
    export_rows = []
    for player, pos in DEPTH:
        keys = applicable(positions, metrics, pos)
        if player == "Byron Young":
            existing = None
            card_id = "PHI_AUDIT:DT:nfl_00-0038978"
            player_id = "nfl_00-0038978"
            stated = 61
        else:
            lookup = CARD_NAME.get(player, player)
            existing = con.execute(
                "SELECT * FROM rating_cards WHERE player_name=? AND position=?",
                (lookup, pos),
            ).fetchone()
            if existing is None:
                raise SystemExit(f"missing card {player} {pos}")
            card_id = existing["card_id"]
            player_id = existing["player_id"]
            stated = existing["ovr"]
        if card_id in LOCKED_CARD_IDS:
            attrs = json.loads(existing["attributes_json"])
            missing = [key for key in keys if key not in attrs]
            if missing:
                raise SystemExit(f"locked card {card_id} missing {missing}")
            export_rows.append({
                "player": existing["player_name"],
                "team": "PHI",
                "position": pos,
                "overall": stated,
                "attributes": {key: attrs[key] for key in keys},
            })
            check = estimate(pos, attrs, weights)
            audit_rows.append({
                "player": existing["player_name"],
                "team": "PHI",
                "position": pos,
                "overall": stated,
                "card_id": card_id,
                "action": "UNCHANGED_LOCKED_OR_COMPLETE",
                "rating_standard": "Gridiron Standard",
                "estimated_ovr": check["estimated_ovr"],
                "best_archetype": check["best_archetype"],
                "gap": None if check["estimated_ovr"] is None else check["estimated_ovr"] - stated,
                "note": "Complete card left unchanged. Gridiron Standard audit, not an EA rating.",
            })
            continue

        fill = fills[player]
        if fill["position"] != pos:
            raise SystemExit(f"position mismatch {player}")
        proposed = fill["attributes"]
        unknown = [key for key in proposed if key not in keys]
        absent = [key for key in keys if key not in proposed]
        if unknown or absent:
            raise SystemExit(f"{player} key mismatch unknown={unknown} absent={absent}")
        if existing is not None:
            old = json.loads(existing["attributes_json"])
            allowed_drop = {"CTH"} if player == "Rocco Underwood" else set()
            for key, value in old.items():
                if key in allowed_drop:
                    continue
                if key not in proposed or proposed[key] != value:
                    raise SystemExit(f"{player} would change preserved {key}: {value} -> {proposed.get(key)}")
            if existing["ovr"] != stated:
                raise SystemExit("ovr drift")
        for key, value in proposed.items():
            if not isinstance(value, int) or not 0 <= value <= 99:
                raise SystemExit(f"{player} {key}={value}")
        new_90 = [key for key, value in proposed.items() if value >= 90 and (existing is None or key not in json.loads(existing["attributes_json"]))]
        if new_90:
            raise SystemExit(f"{player} new 90+ {new_90}")

        style = fill["style_profile"]
        weaknesses = json.dumps(fill["weaknesses"])
        payload = json.dumps(proposed, separators=(",", ":"), sort_keys=True)
        if player == "Byron Young":
            con.execute(
                """INSERT INTO rating_cards(
                    card_id, player_id, player_name, position, ovr, audit_proposed_ovr, ovr_tier, confidence,
                    style_profile, weaknesses_json, source_audit_id, source_task_id, source_baseline_file,
                    card_origin, baseline_rank, pool_role, madden_ovr, delta_ovr, reference_only,
                    attributes_json, madden_attributes_json, delta_attributes_json, seeded_at
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
                (
                    card_id, player_id, "Byron Young", "DT", 61, 61, None, "LOW",
                    style, weaknesses, "PHI_FULL_RATINGS_2026-11-05", "PHI_DT_BYRON_YOUNG",
                    "audits/teams/PHI/PHI_ROSTER_VS_TOP10_2026-11-05.json",
                    "phi_team_audit", None, "RATED", None, None, 0,
                    payload, None, None, "2026-11-05T22:40:00Z",
                ),
            )
            # Biographical size from the repo registry row that matches this gsis/espn/birth/college/jersey.
            con.execute(
                "UPDATE players SET height_in=COALESCE(height_in, 75), weight_lb=COALESCE(weight_lb, 292), aliases_json=? WHERE player_id=?",
                (json.dumps(["Byron", "Byron Young (PHI DT)"]), player_id),
            )
        else:
            name = "Nolan Smith Jr." if player == "Nolan Smith Jr." else existing["player_name"]
            con.execute(
                "UPDATE rating_cards SET player_name=?, attributes_json=?, style_profile=?, weaknesses_json=?, confidence=? WHERE card_id=?",
                (name, payload, style, weaknesses, fill["confidence"], card_id),
            )
        con.execute("DELETE FROM rating_attributes WHERE card_id=?", (card_id,))
        old_keys = set(json.loads(existing["attributes_json"])) if existing is not None else set()
        if player == "Rocco Underwood":
            old_keys = set(json.loads(existing["attributes_json"]))
        for key, value in proposed.items():
            marker = "audit_key_attr" if key in old_keys else "gs_completion"
            con.execute(
                "INSERT INTO rating_attributes(card_id, attribute, rating, madden_rating, delta, confidence, tier) VALUES (?,?,?,?,?,?,?)",
                (card_id, key, value, None, None, marker, None),
            )
        if player == "Nolan Smith Jr.":
            con.execute(
                "UPDATE players SET aliases_json=? WHERE player_id=?",
                (json.dumps(["Nolan", "Nolan Smith Jr."]), player_id),
            )
        export_name = "Nolan Smith Jr." if player == "Nolan Smith Jr." else ("Byron Young" if player == "Byron Young" else existing["player_name"])
        export_rows.append({
            "player": export_name,
            "team": "PHI",
            "position": pos,
            "overall": stated,
            "attributes": {key: proposed[key] for key in keys},
        })
        check = estimate(pos, proposed, weights)
        gap = None if check["estimated_ovr"] is None else check["estimated_ovr"] - stated
        audit_rows.append({
            "player": export_name,
            "team": "PHI",
            "position": pos,
            "overall": stated,
            "card_id": card_id,
            "action": "INSERTED" if existing is None else "FILLED_MISSING",
            "rating_standard": "Gridiron Standard",
            "confidence": fill["confidence"],
            "style_profile": style,
            "basis": fill["basis"],
            "estimated_ovr": check["estimated_ovr"],
            "best_archetype": check["best_archetype"],
            "gap": gap,
            "calculator_missing": check["missing"],
            "preserved_attributes": sorted(old_keys & set(proposed)),
            "removed_not_applicable": ["CTH"] if player == "Rocco Underwood" else [],
        })

    if con.execute("SELECT COUNT(*) FROM rating_cards").fetchone()[0] != before_cards + 1:
        raise SystemExit("card count changed by more than the Byron Young insert")
    if con.execute("SELECT COUNT(*) FROM contracts").fetchone()[0] != before_contracts:
        raise SystemExit("contracts changed")
    if con.execute("SELECT COUNT(*) FROM contract_years").fetchone()[0] != before_years:
        raise SystemExit("contract years changed")
    cap_after = con.execute(
        "SELECT season, accounting_rule, league_cap, carryover, adjustments, committed, dead_money, cap_space, players_counted "
        "FROM team_cap_ledger WHERE team_abbr='PHI'"
    ).fetchall()
    if [tuple(row) for row in cap_before] != [tuple(row) for row in cap_after]:
        raise SystemExit("PHI cap ledger changed")
    hurts_after = con.execute(
        "SELECT ovr, attributes_json FROM rating_cards WHERE player_name='Jalen Hurts'"
    ).fetchone()
    if tuple(hurts_before) != tuple(hurts_after):
        raise SystemExit("Hurts card changed")
    locked_after = {
        row["card_id"]: row["attributes_json"] + "|" + str(row["ovr"]) + "|" + row["player_name"] + "|" + row["position"]
        for row in con.execute(
            f"SELECT card_id, attributes_json, ovr, player_name, position FROM rating_cards WHERE card_id IN ({','.join('?' * len(LOCKED_CARD_IDS))})",
            tuple(LOCKED_CARD_IDS),
        )
    }
    if locked_before != locked_after:
        raise SystemExit("locked card changed")
    other_after = con.execute(
        "SELECT COUNT(*) FROM rating_cards c JOIN players p ON p.player_id=c.player_id WHERE p.team_abbr!='PHI'"
    ).fetchone()[0]
    if other_after != other_teams:
        raise SystemExit("other-team card count changed")

    # Style similarity among same-position cards that now have full applicable sets.
    flags = []
    by_pos: dict[str, list[dict]] = {}
    for row in export_rows:
        by_pos.setdefault(row["position"], []).append(row)
    for pos, rows in by_pos.items():
        keys = applicable(positions, metrics, pos)
        for i, left in enumerate(rows):
            for right in rows[i + 1:]:
                corr, mad = mean_center_corr(left["attributes"], right["attributes"], keys)
                if corr >= 0.95 or mad <= 3:
                    flags.append({
                        "position": pos,
                        "players": [left["player"], right["player"]],
                        "correlation": round(corr, 3),
                        "mean_absolute_difference": round(mad, 2),
                    })

    con.commit()
    ARTIFACT.parent.mkdir(parents=True, exist_ok=True)
    ARTIFACT.write_text(json.dumps(export_rows, indent=1) + "\n")
    gaps = []
    for row in audit_rows:
        gap = row["gap"]
        if gap is None:
            flag = "NO_ESTIMATE"
        elif abs(gap) <= 1:
            flag = "OK"
        elif abs(gap) <= 3:
            flag = "MINOR_GAP"
        else:
            flag = "MAJOR_GAP"
        row["flag"] = flag
        if flag != "OK":
            gaps.append({
                "player": row["player"],
                "position": row["position"],
                "overall": row["overall"],
                "estimated_ovr": row["estimated_ovr"],
                "gap": gap,
                "flag": flag,
                "best_archetype": row["best_archetype"],
                "resolution": "The unverified estimated formula cannot validate the in-game Madden 27 overall. The stated overall and the attributes were not changed to force a match. This gap does not mean the Madden 27 reproduction requirement has been met.",
            })
    from collections import Counter
    flag_counts = dict(Counter(row["flag"] for row in audit_rows))
    audit = {
        "rating_standard": "Gridiron Standard",
        "not_ea_official": True,
        "coverage": len(export_rows),
        "unique_players": len({row["player"] for row in export_rows}),
        "fb_on_phi_depth": False,
        "ls_player": "Rocco Underwood",
        "byron_young": {
            "phi_card": "PHI_AUDIT:DT:nfl_00-0038978",
            "phi_gsis": "00-0038978",
            "rams_card_unchanged": "LEDGE:LEDGE_REAUDIT_RATE_07_A2",
            "rams_gsis": "00-0039137",
        },
        "nolan_smith_alias": {"card_player_name": "Nolan Smith Jr.", "roster_full_name": "Nolan Smith"},
        "starter_qb": "Joe Milton III",
        "cooper_dejean": {"position": "SS", "overall": 73, "unchanged": True},
        "lane_johnson_on_depth": False,
        "rt1": "Markel Bell",
        "phi_cap_unchanged": True,
        "sqlite_depth_names_outside_researched_46": [
            "Britain Covey",
            "Elijah Moore",
            "Hollywood Brown",
            "Kelee Ringo",
            "Mac McWilliams",
            "Michael Carter II",
            "Ty Robinson"
        ],
        "style_flags": flags,
        "calculator": {
            "source": "config/madden-ovr-weights.estimated.json",
            "verified": False,
            "madden_order_verified": False,
            "in_game_requirement_met": False,
            "policy": "config/madden-ovr-weights.estimated.json is an unverified pre-check. It cannot validate an in-game Madden 27 overall. Traits were not forced.",
            "flag_counts": flag_counts,
            "gaps": gaps,
        },
        "rows": audit_rows,
    }
    AUDIT.write_text(json.dumps(audit, indent=1) + "\n")
    digest = hashlib.sha256(ARTIFACT.read_text().encode()).hexdigest()
    print(f"cards {before_cards} -> {before_cards + 1}")
    print(f"export {len(export_rows)} sha256 {digest}")
    print(f"style flags {len(flags)}")
    for flag in flags:
        print(" STYLE", flag)
    print(f"calculator gaps {len(gaps)}")
    for gap in gaps:
        print(f"  {gap['flag']:10} {gap['player']:22} {gap['position']:6} stated {gap['overall']} est {gap['estimated_ovr']} gap {gap['gap']} {gap['best_archetype']}")


if __name__ == "__main__":
    main()
