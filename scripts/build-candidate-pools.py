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
 "QB": ["Matthew Stafford", "Drake Maye"], "RB": ["Bijan Robinson", "James Cook", "Christian McCaffrey", "Jonathan Taylor"],
 "WR": ["Puka Nacua", "Jaxon Smith-Njigba", "Ja'Marr Chase", "George Pickens", "Chris Olave", "Amon-Ra St. Brown"], "TE": ["Trey McBride", "Kyle Pitts"],
 "LT": ["Garett Bolles", "Trent Williams", "Penei Sewell"], "LG": ["Joe Thuney", "Quenton Nelson", "Quinn Meinerz"],
 "K": ["Will Reichard", "Brandon Aubrey", "Cameron Dicker"], "P": ["Jordan Stout", "Tress Way", "Michael Dickson"]}
FAM = {  # pff key, roster depth labels for usage, stats family, honors key, nflverse stats positions
 "C": ("c", {"C"}, None, "C", set()), "RG": ("g", {"G"}, None, "RG", set()), "RT": ("t", {"T"}, None, "RT", set()),
 "REDGE": ("ed", {"DE", "OLB"}, "rush", "EDGE", {"DE", "OLB", "LB"}), "LEDGE": ("ed", {"DE", "OLB"}, "rush", "EDGE", {"DE", "OLB", "LB"}),
 "DT": ("di", {"DT", "NT"}, "rush", "DT", {"DT", "NT", "DL", "DE"}),
 "MIKE": ("lb", {"ILB", "MLB"}, "tackle", "LB", {"LB", "ILB", "MLB", "OLB"}), "WILL": ("lb", {"ILB", "MLB", "OLB"}, "tackle", "LB", {"LB", "ILB", "MLB", "OLB"}),
 "SAM": ("lb", {"ILB", "MLB", "OLB"}, "tackle", "LB", {"LB", "ILB", "MLB", "OLB"}),
 "CB": ("cb", {"CB"}, "cover", "CB", {"CB", "DB"}), "FS": ("s", {"FS", "SS"}, "cover", "S", {"SAF", "FS", "SS", "S", "DB"}),
 "SS": ("s", {"FS", "SS"}, "cover", "S", {"SAF", "FS", "SS", "S", "DB"}),
 "QB": ("qb", {"QB"}, "qbpass", "QB", {"QB"}), "RB": ("hb", {"RB"}, "scrim", "RB", {"RB", "FB"}), "WR": ("wr", {"WR"}, "recv", "WR", {"WR"}),
 "TE": ("te", {"TE"}, "recv", "TE", {"TE"}), "LT": ("t", {"T"}, None, "LT", set()), "LG": ("g", {"G"}, None, "LG", set()), "K": ("k", set(), "kick", "K", {"K"}), "P": ("p", set(), "punt", "P", {"P"})}
def nf(x):
    try: return float(x or 0)
    except ValueError: return 0.0
def stat_score(r, kind):
    if kind == "rush": return nf(r["def_sacks"]) + 0.5 * nf(r["def_qb_hits"]) + 0.25 * nf(r["def_tackles_for_loss"])
    if kind == "tackle": return nf(r["def_tackles_solo"]) + 0.5 * nf(r["def_tackle_assists"]) + 2 * nf(r["def_tackles_for_loss"]) + 3 * nf(r["def_interceptions"]) + nf(r["def_pass_defended"])
    if kind == "cover": return 3 * nf(r["def_interceptions"]) + nf(r["def_pass_defended"])
    if kind == "qbpass": return nf(r["passing_epa"]) + nf(r["rushing_epa"])
    if kind == "scrim": return (nf(r["rushing_yards"]) + nf(r["receiving_yards"])) / 10 + 6 * (nf(r["rushing_tds"]) + nf(r["receiving_tds"]))
    if kind == "recv": return nf(r["receiving_yards"]) / 10 + 6 * nf(r["receiving_tds"])
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
STAT_LABEL = {"qbpass": "passing EPA + rushing EPA", "scrim": "scrimmage yds/10 + 6*TD", "recv": "receiving yds/10 + 6*TD", "rush": "sacks + 0.5*QB hits + 0.25*TFL", "tackle": "solo + 0.5*assists + 2*TFL + 3*INT + PD", "cover": "3*INT + PD", "kick": "FGM + 2*50-59 + 3*60+ - 2*missed", "punt": "net yards per punt (>=10 punts)"}

ROSTER_URL = "https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_2026.csv"
# Off-roster statuses verified by hand from free public sources (retrieved 2026-11-01). Any off-roster top name not here
# and not explicitly CUT/RET in roster_2026 makes the build fail, so nothing is silently dropped.
VERIFIED = {
 "bobbywagner": dict(status="FREE_AGENT", last_team="WAS", status_as_of="2026-10-31", source_url="https://www.profootballrumors.com/2026/02/bobby-wagner-plans-to-play-in-2026",
     note="Unsigned after 2025 with WAS; said he plans to play in 2026 and has not retired (still unsigned per Oct 2026 reports)."),
 "joelbitonio": dict(status="RETIRED", last_team="CLE", status_as_of="2026-06-09", source_url="https://www.nfl.com/news/browns-guard-joel-bitonio-retires-12-seasons",
     note="Retired June 9, 2026 after 12 seasons (also clevelandbrowns.com/news/a-cleveland-brown-for-life). Ineligible."),
 "drewdalman": dict(status="RETIRED", last_team="CHI", status_as_of="2026-03-03", source_url="https://www.nfl.com/news/bears-pro-bowl-center-drew-dalman-expected-to-retire-after-five-nfl-seasons",
     note="Retired March 2026 after five seasons. Ineligible."),
 "harrisonmevis": dict(status="CUT", last_team="LA", status_as_of="2026-10-14", source_url="https://www.nfl.com/news/rams-releasing-kicker-harrison-mevis-signing-k-blake-grupe-off-jets-practice-squad",
     note="Released by the Rams Oct 2026 (therams.com/team/transactions); unsigned free agent."),
 "deandrehopkins": dict(status="FREE_AGENT", last_team="BAL", status_as_of="2026-08-01", source_url="https://www.nbcsports.com/nfl/profootballtalk/rumor-mill/news/after-taking-coaching-job-at-georgia-tech-deandre-hopkins-says-he-isnt-retired",
     note="Unsigned since his BAL deal expired; Georgia Tech assistant WR coach since Jul 31, 2026 but says he has not retired."),
 "matthaack": dict(status="FREE_AGENT", last_team="ARI", status_as_of="2026-08-30", source_url="https://en.wikipedia.org/wiki/Matt_Haack",
     note="Released by New England Aug 30, 2026 (final cuts); unsigned."),
}
UNV = []  # off-roster names with no verified status -> build fails at the end
TEAM_TX = {"LA": "https://www.therams.com/team/transactions/"}
def inj_status(ro):
    if ro["status"] == "INA": return "INACTIVE"
    return {"R01": "IR", "R48": "IR_DESIGNATED_RETURN", "R04": "PUP", "R05": "NFI"}.get(ro["status_description_abbr"], "RESERVE_OTHER")
STATUS_LABEL = {"IR": "IR", "IR_DESIGNATED_RETURN": "IR (designated to return)", "PUP": "PUP", "NFI": "NFI", "INACTIVE": "Inactive/out", "RESERVE_OTHER": "Reserve (other)"}
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
    excl, cand, fas, inj = [], [], [], []
    healthy = 0
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
            v = VERIFIED.get(k)
            if not v and ro and ro["status"] in ("CUT", "RET"):
                v = dict(status="RETIRED" if ro["status"] == "RET" else "CUT", last_team=ro["team"], status_as_of=RET[:10], source_url=ROSTER_URL, note=f"nflverse roster_2026 (week 8) status {ro['status']}/{ro['status_description_abbr']}.")
            if not v: UNV.append(f"{pos}: {n}"); continue
            fid = REG.get(k) or (rid if rid in REG.values() else None)
            if v["status"] != "RETIRED" and not fid: sys.exit(f"{pos}: eligible free agent {n} missing from registry; add with roster:refresh --add-only --free-agent --names")
            g25 = G25.get(k); fas.append(dict(player=n, player_id=fid if v["status"] != "RETIRED" else (fid or None), **v,
                reason_listed=f"composite {score[k]:.2f}; sources {', '.join(cites[k])}" + (f"; PFF 2025 overall {g25['grade']} (#{g25['rank']})" if g25 else ""))); continue
        hurt = ro["status"] in ("RES", "INA")
        ie = None
        if hurt:
            ie = dict(player=ro["full_name"], **({"aliases": [n]} if norm(n) != norm(ro["full_name"]) else {}), player_id=rid, team=ro["team"], status=inj_status(ro), in_pool=healthy < 20,
                      status_as_of=RET[:10], source_url=ROSTER_URL, note=f"nflverse roster_2026 (week 8) {ro['status']}/{ro['status_description_abbr']}" + (f"; see also {TEAM_TX[ro['team']]}" if ro["team"] in TEAM_TX else "") + f"; composite {score[k]:.2f}, sources {', '.join(cites[k])}")
            inj.append(ie)
            if not ie["in_pool"]: continue
        elif healthy >= 20:
            g = G26.get(k); excl.append(dict(player=n, **idal(n, ro), reason=f"Below pool cutoff (composite {score[k]:.2f}; PFF 2026 grade {g['grade'] if g else 'n/a'}; sources {', '.join(cites[k])}). Re-include on request.", code="BELOW_CUTOFF")); continue
        else: healthy += 1
        flags = []
        if ro["status"] == "RES": flags.append("INJURED_RESERVE")
        elif ro["status"] != "ACT": flags.append(f"ROSTER_STATUS_{ro['status']}")
        if pos in ("LT", "LG"): flags.append("SIDE_UNVERIFIED (nflverse labels G/T only; re-audit pool)")
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
        st = ie["status"] if ie else "ACTIVE"
        cand.append(dict(player=canon, **({"aliases": [n]} if norm(n) != norm(canon) else {}), player_id=rid, team=ro["team"], status=st,
                         status_source=dict(url=ROSTER_URL, retrieved_at=RET, note=f"nflverse roster_2026 week 8 {ro['status']}/{ro['status_description_abbr']}"), flags=flags, composite=round(score[k], 3), reasoning="; ".join(bits), citations=cites[k]))
    return dict(position=pos, status="PROPOSED", generated_at=RET, generator="scripts/build-candidate-pools.py",
                note="PROPOSED for commissioner approval. Composite is a triage order for auditing, not a rating. Side/role flags must be resolved before provisional_top_10.",
                candidates=cand, exclusions=excl, free_agents=fas, injured=inj, coverage_sources=src)
LOCKED = {"QB", "RB", "WR", "TE", "LT"}
LG_PROVISIONAL_KNOWN = ["Steve Avila", "Tyler Smith", "Isaac Seumalo", "Landon Dickerson", "Matthew Bergeron", "Ezra Cleveland"]
def compare(out, pos):
    if pos in LOCKED:
        b = json.load(open(f"data/baselines/{pos}.json")); ref = [x["player"] for x in b["top_10"]]; ref_src = f"data/baselines/{pos}.json (locked top_10, read-only)"
    else:
        ref = LG_PROVISIONAL_KNOWN; ref_src = "LG provisional list as recorded in src/stage-engine.ts LG pairs 03-05 (pairs 01-02 ran before the engine and are not recorded in the repo)"
    cand = {norm(c["player"]): (i + 1, c) for i, c in enumerate(out["candidates"])}
    for c in out["candidates"]:
        for a in c.get("aliases", []): cand.setdefault(norm(a), (out["candidates"].index(c) + 1, c))
    fa = {norm(f["player"]): f for f in out["free_agents"]}; inj = {norm(i["player"]): i for i in out["injured"]}
    flags = []
    for n in ref:
        k = norm(n)
        if k in fa: flags.append(dict(player=n, flag=f"LOCKED_PLAYER_{fa[k]['status']}", detail=fa[k]["note"], source=fa[k]["source_url"]))
        elif k in cand and cand[k][1]["status"] != "ACTIVE": flags.append(dict(player=n, flag=f"LOCKED_PLAYER_{cand[k][1]['status']}", detail=f"pool rank {cand[k][0]}; {cand[k][1]['reasoning']}", source=ROSTER_URL))
        elif k in inj: flags.append(dict(player=n, flag=f"LOCKED_PLAYER_{inj[k]['status']}_BELOW_CUTOFF", detail=inj[k]["note"], source=ROSTER_URL))
        elif k not in cand:
            ro = lookup(n); ex = next((e for e in out["exclusions"] if norm(e["player"]) == k), None)
            st = (inj_status(ro) if ro and ro["status"] in ("RES", "INA") else ({"ACT": "ACTIVE"}.get(ro["status"], ro["status"]) if ro else "NOT_ON_ROSTER"))
            g26 = next((x for x in PFF[2026][FAM[pos][0]] if norm(x["player"]) == k), None)
            why = (ex["reason"] if ex else "not in any 2026/2025 source top-20") + (f"; PFF 2026 overall {g26['grade']} (#{g26['rank']})" if g26 and g26["grade"] is not None else "; no qualifying PFF 2026 grade")
            flags.append(dict(player=n, flag=("LOCKED_PLAYER_DECLINED" if st == "ACTIVE" else f"LOCKED_PLAYER_{st}"), detail=f"roster_2026 wk8 {ro['team'] + ' ' if ro else ''}{st}; {why}", source=ROSTER_URL))
        elif cand[k][0] > 15: flags.append(dict(player=n, flag="LOCKED_PLAYER_DECLINED", detail=f"pool rank {cand[k][0]}; {cand[k][1]['reasoning']}", source="coverage_sources"))
    refk = {norm(n) for n in ref}
    for i, c in enumerate(out["candidates"][:12]):
        if norm(c["player"]) not in refk and not any(norm(a) in refk for a in c.get("aliases", [])):
            flags.append(dict(player=c["player"], flag="STRONG_CANDIDATE_NOT_IN_TOP10", detail=f"pool rank {i+1} ({c['status']}); {c['reasoning']}", source="coverage_sources"))
    out["reaudit"] = dict(target_position_state="LOCKED" if pos in LOCKED else "IN_PROGRESS", requires_trigger="TOP10_REAUDIT",
        note="Proposed re-audit pool only. Does not modify baselines, locks, state, LG progress or audit history. An actual re-audit needs the commissioner's explicit TOP10_REAUDIT trigger.",
        compared_against=ref_src, compared_list=ref, flags=flags)
for pos in sys.argv[1:] or list(FAM):
    out = build(pos)
    fn = f"data/candidate-pools/{pos}.proposed.json"
    if pos in LOCKED or pos == "LG": compare(out, pos); fn = f"data/candidate-pools/{pos}.reaudit.proposed.json"
    if UNV: continue
    json.dump(out, open(fn, "w"), indent=2); open(fn, "a").write("\n")
    print(pos, len(out["candidates"]), "cand", len(out["exclusions"]), "excl", len(out["free_agents"]), "fa", len(out["injured"]), "inj")
if UNV: sys.exit("off-roster names with no verified status (add VERIFIED entries with public sources): " + "; ".join(UNV))
