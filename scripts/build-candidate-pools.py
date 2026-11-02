#!/usr/bin/env python3
"""Build PROPOSED candidate pools (stdlib only, free sources, no paid calls).

Inputs (research-inbox/_cache, gitignored): nflverse roster/snap_counts/stats_player_reg 2026+2025,
pff2026.json / pff2025.json (PFF public season-overall grade tables, parsed from
https://www.pff.com/grades/nfl/<pos>/<season>), and the 2025 All-Pro lists embedded below
(https://en.wikipedia.org/wiki/2025_All-Pro_Team -> AP/PFWA/TSN).
Output: data/candidate-pools/<POS>.proposed.json (status PROPOSED; commissioner must approve).
Ranks are evidence of who to audit, never ratings. No EA/Madden ratings are used.
"""
import csv, json, os, re, sys, unicodedata
C = "research-inbox/_cache"
RET = open(os.environ.get("RETRIEVED_AT_FILE", "/workspace/pools/retrieved_at")).read().strip() if os.path.exists(os.environ.get("RETRIEVED_AT_FILE", "/workspace/pools/retrieved_at")) else "2026-11-01T22:55:00-05:00"
def norm(n):
    n = unicodedata.normalize("NFD", n.lower()); n = "".join(c for c in n if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]+", "", re.sub(r"\b(jr|sr|ii|iii|iv|v)\b\.?", "", n))
rows = lambda f: list(csv.DictReader(open(f"{C}/{f}")))
roster = rows("roster_2026.csv")
R = {}
for r in roster:  # index full name + legal first/last + football name; prefer active rows
    for nm in {r["full_name"], f'{r["first_name"]} {r["last_name"]}', f'{r["football_name"]} {r["last_name"]}'}:
        k = norm(nm)
        if k and (k not in R or (R[k]["status"] != "ACT" and r["status"] == "ACT")): R[k] = r
by_pfr = {r["pfr_id"]: r for r in roster if r["pfr_id"]}
reg = json.load(open("data/players/registry.json"))["players"]
REG = {}  # norm name -> player_id
for p in reg:
    for n in [p["full_name"], *p.get("aliases", [])]: REG.setdefault(norm(n), p["player_id"])
def lookup(name, team=None):
    ro = R.get(norm(name))
    if ro or not team: return ro
    last = norm(name.split()[-1]); hits = [r for r in roster if norm(r["last_name"]) == last and r["team"] == team and r["status"] == "ACT"]
    return hits[0] if len(hits) == 1 else None
PFF = {2026: json.load(open(f"{C}/pff2026.json")), 2025: json.load(open(f"{C}/pff2025.json"))}
LT = json.load(open("data/baselines/LT.json"))
LT_NAMES = {norm(x["player"]) for x in LT["top_10"] + LT["external_controls"]} | {norm(LT["first_out"]["player"])}
LG_KNOWN = {norm(n) for n in ["Steve Avila", "Tyler Smith", "Isaac Seumalo", "Landon Dickerson", "Matthew Bergeron", "Ezra Cleveland", "Joe Thuney", "Quenton Nelson"]}
ALLPRO = "https://en.wikipedia.org/wiki/2025_All-Pro_Team"
HON = {  # 2025 season All-Pro (AP 1st/2nd, PFWA, TSN), transcribed from ALLPRO
 "C": ["Creed Humphrey", "Aaron Brewer"], "RG": ["Quinn Meinerz", "Chris Lindstrom", "Joe Thuney", "Quenton Nelson"],
 "RT": ["Penei Sewell", "Darnell Wright", "Garett Bolles", "Trent Williams"],
 "EDGE": ["Myles Garrett", "Micah Parsons", "Will Anderson Jr.", "Aidan Hutchinson", "Danielle Hunter", "Brian Burns", "Nik Bonitto"],
 "DT": ["Jeffery Simmons", "Zach Allen", "Leonard Williams", "Quinnen Williams", "Cameron Heyward"],
 "LB": ["Jordyn Brooks", "Jack Campbell", "Ernest Jones IV", "Devin Lloyd"],
 "CB": ["Derek Stingley Jr.", "Quinyon Mitchell", "Patrick Surtain II", "Jaycee Horn", "Devon Witherspoon", "Cooper DeJean"],
 "S": ["Kyle Hamilton", "Kevin Byard", "Jessie Bates", "Talanoa Hufanga", "Xavier McKinney", "Derwin James"],
 "K": ["Will Reichard", "Brandon Aubrey", "Cameron Dicker"], "P": ["Jordan Stout", "Tress Way", "Michael Dickson"]}
FAM = {  # pff key, roster depth labels for usage, stats family, honors key, nflverse stats positions
 "C": ("c", {"C"}, None, "C", set()), "RG": ("g", {"G"}, None, "RG", set()), "RT": ("t", {"T"}, None, "RT", set()),
 "REDGE": ("ed", {"DE", "OLB"}, "rush", "EDGE", {"DE", "OLB", "LB"}), "LEDGE": ("ed", {"DE", "OLB"}, "rush", "EDGE", {"DE", "OLB", "LB"}),
 "DT": ("di", {"DT", "NT"}, "rush", "DT", {"DT", "NT", "DL", "DE"}),
 "MIKE": ("lb", {"ILB", "MLB"}, "tackle", "LB", {"LB", "ILB", "MLB", "OLB"}), "WILL": ("lb", {"ILB", "MLB", "OLB"}, "tackle", "LB", {"LB", "ILB", "MLB", "OLB"}),
 "SAM": ("lb", {"ILB", "MLB", "OLB"}, "tackle", "LB", {"LB", "ILB", "MLB", "OLB"}),
 "CB": ("cb", {"CB"}, "cover", "CB", {"CB", "DB"}), "FS": ("s", {"FS", "SS"}, "cover", "S", {"SAF", "FS", "SS", "S", "DB"}),
 "SS": ("s", {"FS", "SS"}, "cover", "S", {"SAF", "FS", "SS", "S", "DB"}), "K": ("k", set(), "kick", "K", {"K"}), "P": ("p", set(), "punt", "P", {"P"})}
def nf(x):
    try: return float(x or 0)
    except ValueError: return 0.0
def stat_score(r, kind):
    if kind == "rush": return nf(r["def_sacks"]) + 0.5 * nf(r["def_qb_hits"]) + 0.25 * nf(r["def_tackles_for_loss"])
    if kind == "tackle": return nf(r["def_tackles_solo"]) + 0.5 * nf(r["def_tackle_assists"]) + 2 * nf(r["def_tackles_for_loss"]) + 3 * nf(r["def_interceptions"]) + nf(r["def_pass_defended"])
    if kind == "cover": return 3 * nf(r["def_interceptions"]) + nf(r["def_pass_defended"])
    if kind == "kick": return nf(r["fg_made"]) + 2 * nf(r["fg_made_50_59"]) + 3 * nf(r["fg_made_60_"]) - 2 * nf(r["fg_missed"])
    if kind == "punt": return (nf(r["pt_net_yards"]) / nf(r["pt_att"])) if nf(r["pt_att"]) >= 10 else 0
STATS = {s: rows(f"stats_player_reg_{s}.csv") for s in (2026, 2025)}
SNAPS = {s: rows(f"snap_counts_{s}.csv") for s in (2026, 2025)}
def snap_top(labels, season):
    tot = {}
    for r in SNAPS[season]:
        ro = by_pfr.get(r["pfr_player_id"])
        lab = r["position"] if labels <= {"C", "G", "T"} else (ro["depth_chart_position"] if ro else None)  # OL: snap file's own G/T/C label
        if lab not in labels: continue
        k = ro["full_name"] if ro else r["player"]; tot.setdefault(k, [0, 0]); tot[k][0] += int(nf(r["offense_snaps"]) + nf(r["defense_snaps"])); tot[k][1] += 1
    return sorted(tot.items(), key=lambda kv: -kv[1][0])
def stat_top(kind, positions, season):
    xs = [(r["player_display_name"], stat_score(r, kind)) for r in STATS[season] if r["position"] in positions and r["season_type"] == "REG"]
    return sorted([x for x in xs if x[1] > 0], key=lambda x: -x[1])
nfl = lambda ds, s: f"https://github.com/nflverse/nflverse-data/releases/download/{ds}/{ds}_{s}.csv" if ds != "stats_player" else f"https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_{s}.csv"
STAT_LABEL = {"rush": "sacks + 0.5*QB hits + 0.25*TFL", "tackle": "solo + 0.5*assists + 2*TFL + 3*INT + PD", "cover": "3*INT + PD", "kick": "FGM + 2*50-59 + 3*60+ - 2*missed", "punt": "net yards per punt (>=10 punts)"}

def idal(n, ro):
    if not ro: return {}
    rid = f'ext_{ro["gsis_id"]}' if f'ext_{ro["gsis_id"]}' in REG.values() else REG.get(norm(ro["full_name"]))
    out = {"player_id": rid} if rid else {}
    if norm(ro["full_name"]) != norm(n): out["aliases"] = [ro["full_name"]]
    return out
def build(pos):
    pk, labels, skind, hk, spos = FAM[pos]
    p26 = [x for x in PFF[2026][pk] if x["grade"] is not None]; p25 = [x for x in PFF[2025][pk] if x["grade"] is not None]
    src = [dict(id="pff_2026", name=f"PFF 2026 season overall grades ({pk})", publisher="PFF", kind="grades", season=2026, url=f"https://www.pff.com/grades/nfl/{pk}/2026", retrieved_at=RET, top=[x["player"] for x in p26[:20]]),
           dict(id="pff_2025", name=f"PFF 2025 season overall grades ({pk})", publisher="PFF", kind="grades", season=2025, url=f"https://www.pff.com/grades/nfl/{pk}/2025", retrieved_at=RET, top=[x["player"] for x in p25[:20]]),
           dict(id="allpro_2025", name="2025 All-Pro (AP, PFWA, TSN)", publisher="AP/PFWA/TSN via Wikipedia", kind="honors", season=2025, url=ALLPRO, retrieved_at=RET, top=HON[hk])]
    snaps = snap_top(labels, 2026) if labels else []
    if labels: src.append(dict(id="nflverse_snaps_2026", name=f"nflverse 2026 total snaps, roster depth {sorted(labels)} (weeks 1-8)", publisher="nflverse", kind="usage", season=2026, url=nfl("snap_counts", 2026), retrieved_at=RET, top=[k for k, _ in snaps[:20]]))
    st26 = stat_top(skind, spos, 2026) if skind else []
    if skind: src.append(dict(id="nflverse_stats_2026", name=f"nflverse 2026 regular-season stats: {STAT_LABEL[skind]}", publisher="nflverse", kind="stats", season=2026, url=nfl("stats_player", 2026), retrieved_at=RET, top=[k for k, _ in st26[:20]]))
    W = {"pff_2026": 1.0, "allpro_2025": 0.9, "pff_2025": 0.6, "nflverse_stats_2026": 0.6, "nflverse_snaps_2026": 0.25}
    score, cites = {}, {}
    G26 = {norm(x["player"]): x for x in p26}; G25 = {norm(x["player"]): x for x in p25}; SN = {norm(k): v for k, v in snaps}; ST = {norm(k): v for k, v in st26}
    PT = {"BLT": "BAL", "ARZ": "ARI", "CLV": "CLE", "HST": "HOU"}
    disp = {}; team = {norm(x["player"]): PT.get(x["team"], x["team"]) for x in p25 + p26}
    for s in src:
        for i, n in enumerate(s["top"][:20]):
            k = norm(n); disp.setdefault(k, n); score[k] = score.get(k, 0) + W[s["id"]] * (20 - i) / 20; cites.setdefault(k, []).append(f'{s["id"]}#{i+1}')
    excl, cand = [], []
    def other_pos(k):
        if pos == "RT" and k in LT_NAMES: return "In locked LT baseline/controls (data/baselines/LT.json); LT is locked, not an RT candidate."
        if pos == "RG" and k in LG_KNOWN: return "Left guard (LG in-progress pairs or AP 2025 left guard); belongs to LG, not RG."
        g = lambda key: {norm(x["player"]) for yr in (2025, 2026) for x in PFF[yr][key]}
        if pos == "DT" and k in g("ed") and k not in g("di"): return "PFF grades this player as an edge defender (not interior DL) in 2025/2026; belongs to REDGE/LEDGE."
        if pos in ("REDGE", "LEDGE") and k in g("di") and k not in g("ed"): return "PFF grades this player as interior DL (not edge) in 2025/2026; belongs to DT."
        return None
    for k in sorted(score, key=lambda k: -score[k]):
        n = disp[k]; ro = lookup(n, team.get(k)); op = other_pos(k)
        if op: excl.append(dict(player=n, **idal(n, ro), reason=op, code="OTHER_POSITION")); continue
        rid = f'ext_{ro["gsis_id"]}' if ro and ro["gsis_id"] else None
        if ro and rid not in REG.values(): rid = REG.get(norm(ro["full_name"]))
        if ro and ro["status"] not in ("CUT", "RET") and not rid:
            sys.exit(f"{pos}: {n} ({ro['full_name']}, {ro['team']}, {ro['status']}) is a real top-20 name missing from the registry; add it with roster:refresh --add-only --names")
        if not ro or ro["status"] in ("CUT", "RET") or not rid:
            excl.append(dict(player=n, reason=(f"nflverse roster_2026 (week 8) status {ro['status']} ({ro['team']}); not on an active roster, so not a 2026 Top 10 candidate unless re-signed." if ro else "Absent from nflverse roster_2026 (week 8) under any name variant; likely retired/unsigned. Verify before approval."), code="NOT_ON_2026_ROSTER")); continue
        if len(cand) >= 20:
            g = G26.get(k); excl.append(dict(player=n, **idal(n, ro), reason=f"Below pool cutoff (composite {score[k]:.2f}; PFF 2026 grade {g['grade'] if g else 'n/a'}; sources {', '.join(cites[k])}). Re-include on request.", code="BELOW_CUTOFF")); continue
        flags = []
        if ro["status"] == "RES": flags.append("INJURED_RESERVE")
        elif ro["status"] != "ACT": flags.append(f"ROSTER_STATUS_{ro['status']}")
        if pos in ("RG", "RT"): flags.append("SIDE_UNVERIFIED (nflverse labels G/T only)")
        if pos in ("REDGE", "LEDGE"): flags.append("EDGE_SIDE_UNVERIFIED (shared REDGE/LEDGE pool; assign one side before provisional)")
        if pos in ("MIKE", "WILL", "SAM"): flags.append(f"LB_ROLE_UNVERIFIED (roster depth {ro['depth_chart_position']}; shared MIKE/WILL/SAM pool)")
        if pos in ("FS", "SS"): flags.append(f"SAFETY_ROLE_HINT_{ro['depth_chart_position']} (shared FS/SS pool)")
        if ro["depth_chart_position"] not in labels and labels: flags.append(f"ROSTER_LABEL_{ro['depth_chart_position']} (two-way/position change; confirm bucket)")
        if pos == "DT" and ro["depth_chart_position"] == "DE": flags.append("DE_LABEL_INTERIOR_ROLE_UNVERIFIED")
        if pos in ("REDGE", "LEDGE") and ro["depth_chart_position"] == "OLB": flags.append("OLB_LABEL (confirm edge vs off-ball)")
        if k not in G26: flags.append("NO_QUALIFYING_PFF_2026_GRADE (low snaps / injury?)")
        sn = SN.get(k)
        bits = []
        if k in G26: bits.append(f"PFF 2026 overall {G26[k]['grade']} (#{G26[k]['rank']})")
        if k in G25: bits.append(f"PFF 2025 overall {G25[k]['grade']} (#{G25[k]['rank']})")
        if n in HON[hk] or k in {norm(h) for h in HON[hk]}: bits.append("2025 All-Pro selection")
        if sn: bits.append(f"{sn[0]} snaps in {sn[1]} games (2026)")
        if k in ST: bits.append(f"2026 stat score {ST[k]:.1f} ({STAT_LABEL[skind]})")
        canon = ro["full_name"]
        cand.append(dict(player=canon, **({"aliases": [n]} if norm(n) != norm(canon) else {}), player_id=rid, team=ro["team"], flags=flags, composite=round(score[k], 3), reasoning="; ".join(bits), citations=cites[k]))
    return dict(position=pos, status="PROPOSED", generated_at=RET, generator="scripts/build-candidate-pools.py",
                note="PROPOSED for commissioner approval. Composite is a triage order for auditing, not a rating. Side/role flags must be resolved before provisional_top_10.",
                candidates=cand, exclusions=excl, coverage_sources=src)
for pos in sys.argv[1:] or list(FAM):
    out = build(pos); json.dump(out, open(f"data/candidate-pools/{pos}.proposed.json", "w"), indent=2); open(f"data/candidate-pools/{pos}.proposed.json", "a").write("\n")
    print(pos, len(out["candidates"]), "cand", len(out["exclusions"]), "excl")
