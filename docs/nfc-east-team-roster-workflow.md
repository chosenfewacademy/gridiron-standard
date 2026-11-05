# NFC East Team Roster Workflow — Philadelphia Completed Example

Recorded 2026-11-05. This is the repeatable team-roster template for the NFC East. Philadelphia (PHI) is the completed example. Dallas (DAL), the New York Giants (NYG), and Washington (WAS) are planned and are not started. Nothing in this file changes a rating, a lock, a baseline, a registry row, or a contract.

The application remains the commissioner. An analyst may propose depth, ratings, and cap notes. Locked positional Top 10 baselines stay immutable unless the commissioner explicitly orders a current-data Top 10 re-audit for that exact Madden bucket.

## Goal and rules

Produce, for one club at a time:

1. A current depth chart in Madden position groups, using current starters.
2. A rating for every rostered player, calibrated to the locked positional Top 10 and held at or under that position's #10 ceiling when the player is not already in the Top 10.
3. A league-scale placement and a within-team stratification of each group.
4. A deep audit of anyone who might challenge a locked Top 10, recorded as a challenger flag. The flag does not edit the Top 10.
5. A team overall from the weighted current starters on that depth chart.
6. A sourced contract and cap sheet. Dollars come from the published page. Future years and guarantee splits that the page does not print stay blank.

Rules that already govern the work:

- Current-season evidence is primary. EA / Madden ratings are a reference beside the card. They are not evidence and they are not an input.
- A player already inside a locked Top 10 keeps that locked card. PHI examples that are already locked: Jordan Mailata LT #3 at 88 (`data/baselines/LT.reaudit-20261104.json`), Zack Baun WILL #1 at 90 (`data/baselines/WILL.reaudit-20261104.json`), Quinyon Mitchell CB #6 at 80 (`data/baselines/CB.reaudit-20261104b.json`, lock `CB_REAUDIT_LOCK_20261104B`), Braden Mann P #10 at 74 (`data/baselines/P.reaudit-20261104.json`).
- Anyone outside the locked Top 10 stays at or under that bucket's #10. A challenger who clears the ceiling is flagged and left out until a commissioner-ordered re-audit of that bucket. Team-room work does not rewrite `state/locks.json` or `data/baselines/`.
- Team-room audits may flag inconsistencies. They do not directly alter an approved individual card or a locked league baseline (`AGENTS.md` Team-Room Rule; `docs/process/gridiron-standard-process.md` section B).
- Display depth only in the 22 exact buckets, in this order: QB, RB, FB, WR, TE, LT, LG, C, RG, RT, LEDGE, REDGE, DT, MIKE, WILL, SAM, CB, FS, SS, K, P, LS. Do not merge buckets. An empty group stays empty.
- Playing depth and the salary cap are different lists. A player can be retired on the depth chart and still carry an active cap charge when the club is keeping him for cap timing.
- One person, one contract row. Hollywood Brown and Marquise Brown are the same player.
- Store only season rows and guarantee figures the source page actually prints.

## Ordered process

Run the steps in this order. Finish the checklist for one club before opening the next. DAL, NYG, and WAS each get their own pass. Do not copy PHI's starter names, PHI's 3-4 label map, or PHI's cap figures onto another club.

### 1. Read the locked ceilings

For every exact bucket, read `state/locks.json` and open the `baseline_file` it points at. Record #1, #10 (`last_in`), and `first_out`. Those overalls are the calibration ceiling.

On `main` as of 2026-11-05, `npm run team:audit` and player Full Audit still open `data/baselines/<POS>.json`. Several locked positions have no such file, so the command fails with `BASELINE_NOT_AVAILABLE`. The PHI roster pass read the lock pointers directly. Pull request [#3](https://github.com/chosenfewacademy/gridiron-standard/pull/3) (`cursor/locked-baseline-loader-1667`) teaches the loaders to follow the lock pointer. That pull request is open. It is not merged. Until it is merged, read the lock files. Do not fall back to an older unsuffixed baseline when the lock points at a reaudit file (CB and K use the `b` file).

### 2. Audit the depth chart and fix stale membership

Pull the club's own depth chart and a second source (ESPN, and nflverse `depth_charts` / `roster` for the season). Write down the retrieval date. Reconcile trades, retirements, injured reserve, practice squad, and who is actually starting this week.

The playing depth lists current starters and the backups who would play. Players on injured reserve and players who have retired stay off that chart. Their ratings can still exist for a healthy-starter note or a cap charge.

PHI corrections applied on the 2026-11-05 pass:

- Andy Dalton is no longer on the Eagles. The official roster page treats him as Atlanta.
- A.J. Brown was traded to New England on 2026-06-01. He is off the PHI depth chart.
- Lane Johnson retired on 2026-10-06. He is off the playing depth. Right tackle is Markel Bell, then Fred Johnson.
- Jalen Hurts is on injured reserve (placed 2026-10-17, pulmonary emboli / blood clots) and is off the depth chart. His approved overall remains 78 for a healthy-starter note.
- Joe Milton III was named the starter on 2026-11-04 for the Week 9 game against the Giants. Tanner McKee is QB2. Cole Payton is QB3. The Nov 2–3 QB room files still call McKee the starter. The Nov 5 depth wins for who is starting. The approved overalls (Milton 64, McKee 66, Payton 60, Hurts 78) were not changed by that starter swap.

### 3. Rate the roster against the locked Top 10

Rate every rostered player in his exact Madden bucket: active, injured reserve, and practice squad. Use the locked Top 10 as the primary calibration baseline and the nearest external controls around the expected tier.

For each group, record both views:

- League scale: the player's overall against #1 and against the #10 ceiling, and whether he is already a locked member.
- Within-team stratification: active players in overall order. Flag a compression when two adjacent active players differ by 2 or less and the higher overall is at least 65. Flag a rating that sits above the #10 ceiling.

A player who looks able to challenge Top 10 membership gets a `CHALLENGER_FLAG` and a deep audit (step 4). The flag does not edit the lock.

PHI QB and RB rooms that already exist as approved team-room files:

- QB approval: `research-inbox/teams/PHI/QB/approval-t50s449.json` (PhiXCrypto, 2026-11-03 10:14 PM ET). Ratings in `research-inbox/teams/PHI/QB/`.
- RB approval: `research-inbox/teams/PHI/RB/approval-t50s449.json`, with Barkley superseded by `research-inbox/teams/PHI/RB/approval-t52s464.json` and `research-inbox/teams/PHI/RB/saquon_barkley.revision-A2-t52s464.json` (overall 76). The earlier `saquon_barkley.json` overall of 75 and the "OVR 75" line in `research-inbox/teams/PHI/RB/README.md` are history. The approved Barkley overall used on the depth chart and in the team overall is 76.

`docs/process/gridiron-standard-process.md` section B says team-room state lives in `data/teams/`. That directory is not in the repository. The completed PHI QB and RB rooms are in `research-inbox/teams/PHI/`. Later clubs should follow whatever path the commissioner names, and should not invent a second copy of a locked card.

### 4. Deep-audit challengers

Run the individual-audit checks: identity, nearest controls, why-not-higher, why-not-lower, style profile, and an explicit ceiling test against #10 and the first player out. A failed challenger stays out. If the player already has a locked league card in a different bucket, that card is the official roster rating and the depth slot follows the resolved bucket.

PHI result for Cooper DeJean (gsis `00-0039841`, player id `ext_00-0039841`):

- The official roster rating is SS overall 73. Depth slot is SS1 only.
- The number in git is `proposed_ovr` 73 on `audits/league/SS/SS_REAUDIT_RATE_13_A1.json` (and the matching `.md`). The locked SS baseline lists him under `external_controls` at 73, below #10 Jaylinn Hawkins at 76 and below first-out Christian Roland-Wallace at 75 (`data/baselines/SS.reaudit-20261104.json`, lock `SS_REAUDIT_LOCK_20261104` on 2026-11-04). That positional lock was not edited on 2026-11-05.
- A CB-view overall of 77 was a challenger. It is OUT. It lost the ceiling test against Jacob Parrish (CB #10, 75) and the head-to-head against first-out James Pierre (74) on `data/baselines/CB.reaudit-20261104b.json`. The CB 77 figure is documentary. It is not the official card, and it is not what the depth chart or the team overall uses.
- The Nov 5 canvases describe a team-card lock at 3:15 PM America/New_York by owner pt85u, with the CB-view addendum attributed to owner pt84u. See "Where the PHI artifacts actually are" before treating that ceremony as a file in git.

### 5. Remap depth into Madden groups

Rewrite the published depth so every row is one of the 22 buckets. Drop ESPN labels that are not buckets (returner, holder, nickel as its own group). Document the club's scheme map in the team note. PHI plays a 3-4, and this map is the PHI example only:

| ESPN / team label | Madden bucket |
| --- | --- |
| WLB | LEDGE |
| SLB | REDGE |
| LILB | WILL |
| RILB | MIKE |
| LDE, NT, RDE | DT |
| LCB, RCB | CB |
| NB | dissolved; the player keeps one real bucket (DeJean is SS only) |
| PK | K |

FB and SAM are empty on the PHI chart. K, P, and LS stay on the depth chart. They are left out of the team overall (step 6).

A 4-3 club needs its own label map. Do not paste the PHI 3-4 map onto Dallas, the Giants, or Washington without reading their depth chart.

If the next club has a starter at FB or SAM, stop before the team overall. The PHI weights have no FB or SAM term, because those groups were empty. Do not invent a weight, and do not drop that starter silently.

### 6. Team overall

Use current starters on the remapped depth. Weighted average, then round to the nearest integer. No curve. Special teams are excluded: K, P, and LS have ratings and depth slots, and they do not enter the weights. The commissioner asked for that exclusion on PHI and was given an overall built from offense and defense only.

Offense weights (sum 100): QB 30, RB 6, WR 9 / 7 / 5, TE 7 / 2, LT 8, LG 6, C 7, RG 6, RT 7.

Defense weights (sum 100): LEDGE 10, REDGE 10, DT 10 / 7, MIKE 10, WILL 9, CB 12 / 10 / 6, FS 8, SS 8.

PHI current-starter inputs and products:

| Side | Unrounded | Rounded |
| --- | ---: | ---: |
| Offense, Joe Milton III (64) at QB | 70.78 | 71 |
| Offense if Hurts (78) were the starter | 74.98 | 75 |
| Defense, DeJean SS 73 at SS | 75.57 | 76 |

The published current-starter team overall is 73, described as the average of offense 71 and defense 76, with special teams left out. The healthy-Hurts 75 is a note. It is not the current offense. See the caveats for the 73 versus 73.5 arithmetic.

Starter slots that entered the PHI weights:

- Offense: Milton 64, Barkley 76, Smith 77, Wicks 72, Lemon 70, Goedert 77, Stowers 64, Mailata 88, Dickerson 71, Kendall 68, Steen 70, Bell 66.
- Defense: Nolan Smith Jr. 74, Greenard 74, Carter 76, Davis 73, Jihaad Campbell 72, Baun 90, Mitchell 80, Woolen 74, Kenny Moore II 72, Mukuba 70, DeJean 73.

### 7. Contracts and cap

Source is Over The Cap, team page plus the player page when a year is itemized. Import files live in `data/roster/contracts/`. The league cap file is `data/roster/cap/league-cap.json` ($301,200,000, in-season accounting). Method: `docs/roster-db-phase2.md`.

PHI rules that transfer:

- Count a contract once. Hollywood Brown is stored on registry id `hollywood_brown`. Do not also store Marquise Brown.
- Do not invent a future year, a void year, or a guarantee split the page does not print.
- A retired player whose club is still carrying the charge stays on the cap. PHI models Lane Johnson's 2026 year with `cap_active_while_roster_retired`. The flag does not put him back on the depth chart, and it does not replace Markel Bell's own hit.
- Leave an unsettled option-bonus repayment unbooked until the published cap hit changes.
- Net adjustments (dead money, practice squad, a reserve player with no contract row) are written as one sourced adjustment with the arithmetic shown, so a later reader can see why cap space matches the page.

The newest PHI cap note is on open pull request [#4](https://github.com/chosenfewacademy/gridiron-standard/pull/4), branch `cursor/phi-johnson-2026-cap-3974`: `docs/PHI_CONTRACTS_CAP_2026-11-05.md` and `data/roster/contracts/phi-2026-otc-team-sheet.json`. That pull request is not merged. `main` still has only `data/roster/contracts/phi-jalen-hurts-2023.json`.

### 8. Publish a checklist, then stop

Fill the club section the way the PHI section below is filled. Leave the next club's boxes empty. This document does not start DAL, NYG, or WAS.

## Data sources

### In the git repository on `main`

| What | Path |
| --- | --- |
| Locked ceilings and pointers | `state/locks.json`, `data/baselines/<POS>.reaudit-*.json` |
| DeJean SS 73 league card | `audits/league/SS/SS_REAUDIT_RATE_13_A1.json`, `audits/league/SS/SS_REAUDIT_RATE_13_A1.md` |
| DeJean on the locked SS baseline | `external_controls` in `data/baselines/SS.reaudit-20261104.json` |
| PHI QB room (approved 2026-11-03; starter labels are the Nov 2–3 snapshot) | `research-inbox/teams/PHI/QB/` |
| PHI RB room (Barkley approved revision is 76) | `research-inbox/teams/PHI/RB/` |
| Hurts contract years 2023–2027 | `data/roster/contracts/phi-jalen-hurts-2023.json` |
| League cap | `data/roster/cap/league-cap.json` |
| How the roster database is seeded | `docs/roster-db-phase1.md`, `docs/roster-db-phase2.md`, `docs/roster-ui.md` |
| Team-room rule | `docs/process/gridiron-standard-process.md` section B |
| Registry rows that still disagree with the Nov 5 depth (see caveats) | `data/players/registry.json` |

`research-inbox/teams/` contains PHI only. There is no `DAL`, `NYG`, or `WAS` directory.

### Canvases (not repository files)

| What | Canvas |
| --- | --- |
| Official roster page, PHI depth, ratings, team overall, cap summary | [Gridiron Standard — OFFICIAL Roster Database (2026)](https://cursor.com/canvas/store-6f41bb29-7411-478b-9441-ba013a2427e5/a74d0752-4e2e-4d50-b782-8a4dec0336b2) |
| DeJean SS 73 lock writeup and the CB 77 OUT dossier | [Cooper DeJean — OFFICIAL SS 73 LOCKED (PHI)](https://cursor.com/canvas/store-6f41bb29-7411-478b-9441-ba013a2427e5/4d5e2fc6-e08a-4207-af9e-d43b6c729611) |
| Earlier roster-versus-top-10 pass and within-room stratification | [Eagles roster audit — vs locked top 10](https://cursor.com/canvas/store-6f41bb29-7411-478b-9441-ba013a2427e5/76c14d19-afde-4a39-abba-f8a9c0433c32) |

The official page says it was generated from a rebuilt `data/roster/gridiron.sqlite` on 2026-11-05. That database is gitignored (`data/roster/*.sqlite`). A fresh `npm run roster:seed` on `main` rebuilds locked baseline cards only. It does not restore the 88 PHI audit cards the page describes.

### Open pull requests (not merged)

| PR | Branch | What it holds |
| --- | --- | --- |
| [#3](https://github.com/chosenfewacademy/gridiron-standard/pull/3) | `cursor/locked-baseline-loader-1667` | Locked-baseline loader for `team:audit` and player Full Audits |
| [#4](https://github.com/chosenfewacademy/gridiron-standard/pull/4) | `cursor/phi-johnson-2026-cap-3974` | `docs/PHI_CONTRACTS_CAP_2026-11-05.md`, the OTC team sheet, the `cap_active_while_roster_retired` flag, and registry stubs for Jaydon Blue, Joe Milton III, and Johnny Wilson |

Pull requests #1 and #2 are merged. They are the Phase 1 roster database and the Phase 2 contract / cap / UI work.

### Pages the PHI pass cited

- Philadelphia depth chart: the official page names `philadelphiaeagles.com/team/depth-chart` plus ESPN, retrieved for the 2026-11-05 audit.
- Milton named starter: the official page names NFL.com, AP, and CBS Sports for the 2026-11-04 announcement. Those writeups are not stored as files in the repo.
- League cap: [NFL.com, 2026 salary cap](https://www.nfl.com/news/nfl-announces-2026-salary-cap-set-at-301-2-million-per-team), via `data/roster/cap/league-cap.json`.
- PHI cap, on the unmerged Johnson branch: [Over The Cap team page](https://overthecap.com/salary-cap/philadelphia-eagles), [Lane Johnson](https://overthecap.com/player/lane-johnson/2185), [OTC retirement note](https://overthecap.com/looking-at-the-salary-cap-impact-of-lane-johnsons-retirement), [NBC Sports / ProFootballTalk](https://www.nbcsports.com/nfl/profootballtalk/rumor-mill/news/eagles-will-keep-lane-johnson-on-the-roster-until-june-2-for-cap-purposes).

## Where the PHI artifacts actually are

The canvases name team files that are not in the repository. Do not link them as if they were committed.

Absent on `main` and on both open pull-request branches:

- `audits/teams/PHI/PHI_ROSTER_VS_TOP10_2026-11-05.md` and `.json` (named by the roster-versus-top-10 canvas)
- `audits/teams/PHI/PHI_CB_DEJEAN_DEEP_AUDIT_2026-11-05.md` (named by the DeJean canvas)
- `audits/teams/PHI/PHI_SS_DEJEAN_OFFICIAL_LOCK_20261105_A1` (named by both later canvases)
- `audits/teams/PHI/PHI_DEPTH_MADDEN_REMAP_20261105_A1` (named by the official page)
- `audits/teams/PHI/PHI_TEAM_OVR_2026-11-05.md` (named by the official page)
- `data/players/ext_00-0039841/current.json`
- `data/teams/PHI/players/ext_00-0039841/current.json`
- `audits/teams/` as a directory

`data/players/<id>/` and `data/teams/` are protected paths. `audits/` is immutable history. Those writes did not land in git. The DeJean registry row on `main` is still position CB, `depth_chart_position` CB, `current_audit_id` null (`data/players/registry.json`, id `ext_00-0039841`).

Use this split:

- Official SS overall 73: the league audit and the locked SS baseline.
- CB 77 challenger OUT, depth SS1, Madden remap, and the team-overall arithmetic: the canvases, checked against the weights and starter list in this file.
- Cap sheet with Johnson included: pull request #4 only, until it merges.

## PHI final results

Status: depth, roster-versus-ceiling, DeJean resolution, Madden remap, and team overall are recorded on the canvases and, where noted, in git. The Johnson cap sheet is on an open pull request. Locked Top 10 cards and baselines were not changed.

### Depth chart (Madden groups)

Current playing depth from the official page source, overalls in parentheses. Injured reserve and retired players are omitted on that page except where a later inconsistency is called out in the caveats. FB and SAM are empty.

| Bucket | Chart |
| --- | --- |
| QB | Joe Milton III (64), Tanner McKee (66), Cole Payton (60) |
| RB | Saquon Barkley (76), Jaydon Blue (62), Will Shipley (61) |
| FB | empty |
| WR | DeVonta Smith (77), Dontayvion Wicks (72), Makai Lemon (70), Darius Cooper (64), Hollywood Brown (71), Elijah Moore (68), Britain Covey (62) |
| TE | Dallas Goedert (77), Eli Stowers (64), Johnny Mundt (62), Grant Calcaterra (60) |
| LT | Jordan Mailata (88), Fred Johnson (68), Markel Bell (66) |
| LG | Landon Dickerson (71), Willie Lampkin (62) |
| C | Drew Kendall (68), Jake Majors (58) |
| RG | Tyler Steen (70), Fred Johnson (68), Micah Morris (55) |
| RT | Markel Bell (66), Fred Johnson (68) |
| LEDGE | Nolan Smith Jr. (74), Arnold Ebiketie (68) |
| REDGE | Jonathan Greenard (74), Jalyx Hunt (67), A.J. Epenesa (70) |
| DT | Jalen Carter (76), Jordan Davis (73), Moro Ojomo (70), Byron Young (no overall on this chart), Ty Robinson (64) |
| MIKE | Jihaad Campbell (72), Jeremiah Trotter Jr. (68) |
| WILL | Zack Baun (90), Smael Mondon Jr. (64) |
| SAM | empty |
| CB | Quinyon Mitchell (80), Riq Woolen (74), Kenny Moore II (72), Jonathan Jones (70), Kelee Ringo (68), Mac McWilliams (64), Michael Carter II (66) |
| FS | Andrew Mukuba (70) |
| SS | Cooper DeJean (73), Marcus Epps (71) |
| K | Jake Elliott (73) |
| P | Braden Mann (74) |
| LS | Rocco Underwood (64) |

Hurts (78, IR), Lane Johnson (74 on the ratings list, retired), and Dalton (62, Atlanta on the ratings list) are on the official page's ratings table and are not current PHI starters.

### Ceiling check

Locked PHI members stay on their locked cards: Mailata 88, Baun 90, Mitchell 80, Mann 74.

DeJean's official SS 73 is under Hawkins 76. The CB 77 challenger is OUT.

The earlier roster-versus-top-10 canvas (2026-11-05, about 19:02 UTC, before the DeJean deep audit was finished) reported zero challenger flags and cited Carter 76 under DT #10 Alim McNeill 79, Dickerson 71 under LG #10 Ezra Cleveland 74, Lane Johnson 74 under RT #10 Jermaine Eluemunor 76, and Woolen 74 under CB #10 Parrish 75. That canvas is a proposal snapshot. It is not the DeJean result. Byron Young, the PHI defensive tackle, was proposed there at 66 with the locked LAR LEDGE Byron Young card (81) marked a wrong join and ignored. The official depth chart leaves PHI Byron Young without an overall.

### Team overall

Offense 71 (70.78). Defense 76 (75.57). Overall 73 from those rounded sides. Special teams left out. Healthy-Hurts offense would be 75 (74.98) and is not the current figure.

### Contracts and cap

Figures below match `docs/PHI_CONTRACTS_CAP_2026-11-05.md` on the Johnson branch and the official page. They are not on `main` until pull request #4 merges.

| Line | Amount |
| --- | ---: |
| League cap | 301,200,000 |
| Carryover | 0 |
| Net adjustment | −73,200,759 |
| Committed, Johnson included | 218,826,666 |
| Engine dead-money column | 0 |
| Cap space | 9,172,575 |

Committed is 198,527,666 without Johnson, plus his 20,299,000. Space is 301,200,000 − 73,200,759 − 218,826,666 = 9,172,575, matching Over The Cap.

The adjustment is +14,896,635 cap room above the league cap, minus 82,776,143 dead money, minus 4,176,251 practice squad, minus 1,145,000 for Jakorian Bennett (OTC reserve / IR, no contract row). Those four terms sum to −73,200,759. Bennett stays in the adjustment only. Adding a contract row for him as well would count the hit twice.

Johnson's 2026 hit is base 1,300,000 + signing proration 9,910,000 + option proration 9,089,000. The Eagles plan to process the retirement around 2027-06-02. The 2027 line stored on the sheet (21,090,000) is the pre-processing contract line, not dead money. The option-bonus repayment is not booked.

Markel Bell stays the active right tackle with his own 2026 cap hit of 1,338,361.

Contract count the page states: 60 PHI contracts after Johnson is included, and 73 season rows. The files on the branch are 59 contracts and 69 season rows in `phi-2026-otc-team-sheet.json`, plus the Hurts file's 1 contract and 5 season rows (2023–2027). That is 60 contracts and 74 season rows. See the caveats.

### PHI checklist

- [x] Depth chart checked against the team site and a second source (2026-11-05).
- [x] Stale membership corrected: Dalton off PHI, A.J. Brown traded to NE, Lane Johnson retired for depth, Hurts on IR, Milton the current starter.
- [x] Roster measured against locked Top 10 ceilings. Locks and baselines unchanged.
- [x] League-scale placement and within-team stratification recorded (canvas; the markdown it names is not in git).
- [x] DeJean deep CB audit: challenger OUT. Official rating used on the roster is SS 73. Depth is SS1 only.
- [x] Depth remapped to Madden groups. PHI 3-4 map written down. FB and SAM empty.
- [x] Team overall from weighted current starters: offense 71, defense 76, overall 73. Special teams excluded.
- [x] Cap note written for Johnson as cap-active while roster-retired. Pull request #4 is open, not merged.
- [ ] Registry, `current.json`, and `audits/teams/PHI/` updated to match the Nov 5 depth and the SS card. Not done in git.
- [ ] `team:audit` can load locked reaudit baselines. Pull request #3 is open, not merged.

## Caveats and open items

These are the places a later pass will overclaim if it treats every PHI sentence as stored the same way.

1. **DAL, NYG, and WAS are not started.** No team-room directory, no team cap sheet, and no team depth remap exists for them. Players from those clubs who appear in `data/baselines/` are there because a positional Top 10 locked them. That is league work, not this team workflow.
2. **Pull requests #3 and #4 are open.** Do not describe the Johnson cap sheet or the baseline loader as merged.
3. **Team audit files the canvases name are missing.** The SS 73 rating is in the league audit. The Nov 5 "official lock" paths and the player `current.json` paths are not in the repo. The registry still has DeJean at CB with no current audit id.
4. **CB 77 is not official.** It is the failed challenger on the DeJean canvas. The depth chart and the defensive overall use SS 73.
5. **Overall 73 versus the average of 71 and 76.** The commissioner was told the team overall is 73, the average of the rounded sides, with special teams left out. The average of 71 and 76 is 73.5. The average of the unrounded sides is (70.78 + 75.57) / 2 = 73.175, which rounds to 73. The official page prints offense 71 and defense 76 and does not print the integer 73. The next club should publish the unrounded sides, the rounded sides, and the overall rule in the same note.
6. **Season rows: page says 73, files sum to 74.** 69 on the OTC team sheet plus 5 on the Hurts file. The contract count of 60 (59 + Hurts) matches. Do not cite 73 as a count of those JSON season arrays until the imported database is what gets counted.
7. **Starter labels in the QB room are older than the depth chart.** `research-inbox/teams/PHI/QB/roster.json` (`as_of` 2026-11-02) and `approval-t50s449.json` list McKee as the starter and Milton as QB2/QB3. The Nov 5 depth lists Milton, McKee, Payton. Overalls match across those files and the official page.
8. **Barkley's README line is stale.** `research-inbox/teams/PHI/RB/README.md` still says overall 75. The approved revision is 76, and 76 is what the team overall uses.
9. **Will Shipley is IR in the rating files and RB3 on the official depth string.** `will_shipley.json` says Reserve/Injured (foot, Week 6), overall 61. The official page's ratings blob also marks him IR, while its depth string lists him third at running back, and the page says IR players are omitted. He is not the RB starter, so the team overall still uses Barkley. The next edit of the depth chart should pick one status.
10. **Registry membership lags the Nov 5 depth.** Andy Dalton's registry team is still PHI. A.J. Brown's registry team is null, not NE. Lane Johnson's `roster_status` is still `ACT`, and his position is unresolved generic OL. Hurts's registry stub has no IR status. Joe Milton III and Jaydon Blue are absent from the registry on `main`; pull request #4 adds stubs with `current_audit_id` null and does not add ratings.
11. **Byron Young.** The PHI defensive tackle is on the depth chart without an overall. The roster-versus-top-10 canvas proposed 66 and told readers to ignore a join to the locked Rams edge card at 81. Do not publish 81 for the Eagles tackle.
12. **DeJean 2026 coverage lines disagree between the canvas dossier and the league audit.** The locked audit's style evidence says 37 targets, 22 completions, 237 yards. The canvas dossier table says 38 targets, 21 completions, 218 yards, and it also disagrees with the audit on games (8 versus 7). Rate from `audits/league/SS/SS_REAUDIT_RATE_13_A1`, not from the canvas table.
13. **The rebuilt sqlite with 88 new PHI cards is not in git.** Page counts (3,073 players, 390 rating cards, 95 Eagles ratings imported) describe that database. Seeding `main` will not reproduce them.
14. **Option-bonus repayment for Lane Johnson is unresolved** and is intentionally not in the 20,299,000 hit. OTC's live 2026 number was still 20,299,000 when the sheet was fetched.
15. **`team:audit` on `main` cannot see locked reaudit baselines** until pull request #3 merges. The PHI pass worked around that by reading `state/locks.json`.

## Per-team checklist

Copy this block when a club actually starts. Leave it unchecked until that work exists. Dallas, the Giants, and Washington have not started.

### Dallas Cowboys (DAL) — planned, not started

- [ ] Depth chart against the team site and a second source, with the retrieval date.
- [ ] Stale membership fixed (trades, retirements, IR, current starter). No PHI names copied in.
- [ ] Own scheme map into the 22 Madden buckets. Empty groups left empty.
- [ ] Every rostered player against the locked Top 10. Locks and baselines untouched.
- [ ] League-scale placement and within-team stratification.
- [ ] Challengers deep-audited and left out of the Top 10 unless the commissioner reopens that bucket.
- [ ] Team overall from the published weights, current starters, rounded, no curve, special teams excluded. Stop and ask if a FB or SAM starter has no weight.
- [ ] OTC contracts and cap. One row per person. No invented years. Cap space arithmetic shown.
- [ ] Checklist filled in a team note. This PHI document stays the template.

### New York Giants (NYG) — planned, not started

- [ ] Depth chart against the team site and a second source, with the retrieval date.
- [ ] Stale membership fixed (trades, retirements, IR, current starter). No PHI names copied in.
- [ ] Own scheme map into the 22 Madden buckets. Empty groups left empty.
- [ ] Every rostered player against the locked Top 10. Locks and baselines untouched.
- [ ] League-scale placement and within-team stratification.
- [ ] Challengers deep-audited and left out of the Top 10 unless the commissioner reopens that bucket.
- [ ] Team overall from the published weights, current starters, rounded, no curve, special teams excluded. Stop and ask if a FB or SAM starter has no weight.
- [ ] OTC contracts and cap. One row per person. No invented years. Cap space arithmetic shown.
- [ ] Checklist filled in a team note. This PHI document stays the template.

### Washington Commanders (WAS) — planned, not started

- [ ] Depth chart against the team site and a second source, with the retrieval date.
- [ ] Stale membership fixed (trades, retirements, IR, current starter). No PHI names copied in.
- [ ] Own scheme map into the 22 Madden buckets. Empty groups left empty.
- [ ] Every rostered player against the locked Top 10. Locks and baselines untouched.
- [ ] League-scale placement and within-team stratification.
- [ ] Challengers deep-audited and left out of the Top 10 unless the commissioner reopens that bucket.
- [ ] Team overall from the published weights, current starters, rounded, no curve, special teams excluded. Stop and ask if a FB or SAM starter has no weight.
- [ ] OTC contracts and cap. One row per person. No invented years. Cap space arithmetic shown.
- [ ] Checklist filled in a team note. This PHI document stays the template.
