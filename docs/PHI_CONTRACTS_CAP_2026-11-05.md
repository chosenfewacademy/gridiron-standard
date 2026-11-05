# PHI contracts + 2026 cap

2026-11-05. Commissioner decision: count Lane Johnson's salary the real-life way. His 2026 cap hit stays an active charge. Locks, locked baselines, and Off/Def team OVR files are unchanged.

`audits/` is immutable rating history, so this note lives here instead of `audits/teams/PHI/`.

## Dual treatment

Roster and depth are not the 2026 cap.

- Lane Johnson announced his retirement in October 2026. Playing depth can keep him retired, with Markel Bell as the RT starter. This change does not edit depth charts, team OVR files, locks, or baselines, and it does not edit Johnson's registry row. `data/players/registry.json` still has him as `ext_00-0030561`, team PHI, `roster_status` ACT. Markel Bell stays his own roster row (`ext_00-0041554`, ACT) with his own 2026 cap hit of $1,338,361.
- The Eagles are keeping him on the roster for cap purposes until about June 2, 2027, so the charge is not dead money yet. Over The Cap's PHI team page (fetched 2026-11-05) still lists him on the active roster at **$20,299,000**. [NBC Sports / ProFootballTalk](https://www.nbcsports.com/nfl/profootballtalk/rumor-mill/news/eagles-will-keep-lane-johnson-on-the-roster-until-june-2-for-cap-purposes) reported, via Ian Rapoport, that Philadelphia will keep him on the roster until June 2. [Over The Cap's retirement analysis](https://overthecap.com/looking-at-the-salary-cap-impact-of-lane-johnsons-retirement) (Jason Fitzgerald, October 7, 2026) describes the same post-June 1 timing.
- The 2026 contract year sets `cap_active_while_roster_retired`. Seed and import still map registry `RET` to membership `other`, and `other` normally drops a cap hit when no dead-money figure is stored. The flag counts this year as an active charge anyway. It does not override practice squad, free agency, or a player who is on another club, and it does not write a roster row.

## 2026 cap (in_season)

League cap $301,200,000. Accounting rule `in_season`. OTC dead money, the practice squad, and Jakorian Bennett are inside the net adjustment, so the engine's own dead-money column is $0.

| Line | Before (Johnson omitted) | After (Johnson active) |
|---|---:|---:|
| League cap | 301,200,000 | 301,200,000 |
| Carryover | 0 | 0 |
| Net adjustment | -73,200,759 | -73,200,759 |
| Committed | 198,527,666 | 218,826,666 |
| Dead money (engine column) | 0 | 0 |
| Cap space | 29,471,575 | 9,172,575 |

Committed after = 198,527,666 + 20,299,000 = 218,826,666.

Space after = 301,200,000 − 73,200,759 − 218,826,666 = **9,172,575**.

That is Over The Cap's PHI team cap space on the 2026 page. The same page's total cap liabilities are $306,924,060.

Adjustment, unchanged except that Johnson is no longer the missing piece:

- +14,896,635 cap room above the league cap. OTC liabilities $306,924,060 + space $9,172,575 = $316,096,635, and $316,096,635 − $301,200,000 = $14,896,635. The page does not split carryover from other room, so it stays one number.
- −82,776,143 OTC dead-money table total.
- −4,176,251 OTC practice-squad table total.
- −1,145,000 Jakorian Bennett, OTC Reserve/IR. He has no contract row. The registry lists him `RES`. Adding a contract as well would count the hit twice.

Check: 14,896,635 − 82,776,143 − 4,176,251 − 1,145,000 = −73,200,759.

Check: committed $218,826,666 + dead $82,776,143 + practice $4,176,251 + Bennett $1,145,000 = $306,924,060, the OTC liabilities total.

OTC also publishes a Top 51 figure ($212,998,474 on the same page). This database's 2026 rule is in-season, so that figure is not the cap space used here.

## Johnson's contract

Source: [Over The Cap player page](https://overthecap.com/player/lane-johnson/2185), fetched 2026-11-05, and the PHI team sheet.

- History row: Extension, signed 2025, 1 year, total $25,000,000, APY $25,000,000, guarantees $25,000,000. Guarantee columns are blank because OTC does not split that row.
- OTC's contract notes also say the extension plus two remaining years on the prior deal is $65,000,000, with $40,000,000 now guaranteed of which $25,000,000 is fully guaranteed at signing. Those larger totals are not stored as `total_value`.
- 2026 active cap hit $20,299,000 = base $1,300,000 + signing proration $9,910,000 + option proration $9,089,000. Roster, workout, and other bonuses on that line are $0.
- 2027 is stored because those components add to the OTC cap number $21,090,000 (base $1,345,000 + signing $7,525,000 + option $12,220,000). It is the pre-processing contract line, not dead money, and it does not carry the 2026 flag. Void years are omitted.

## Import

`data/roster/contracts/phi-2026-otc-team-sheet.json` plus `phi-jalen-hurts-2023.json`.

- 59 team-sheet contracts, including Johnson, plus Hurts.
- Hollywood Brown and Marquise Brown are the same player. The deal is stored once, on registry id `hollywood_brown`. OTC's page name is Marquise Brown.
- Three OTC players were not in the registry under the ids on the earlier sheet. Jaydon Blue and Joe Milton III use the ids already on their PHI team-room files (`jaydon_blue`, `joe_milton_iii`). Johnny Wilson uses `ext_00-0039236`, the id already on that sheet, with roster status `RES` because OTC lists him on Reserve/IR. No ratings were added.
- DeVonta Smith and Byron Young point at the registry ids `devonta_smith` and `ext_00-0038978`.

## Caveat: 2026 option-bonus repayment

OTC's live 2026 cap number is still $20,299,000, and this file uses that number. It does not book a repayment credit.

The unpaid portion is not settled. OTC's October 7 analysis says the 2026 option was about $21.7 million, with about half likely already paid and half due in December, and that Johnson's retirement can forfeit most of it. If he kept the bonus in full, OTC's illustrative charges were $18.99 million in 2026 and $42.89 million in 2027. If the option is eliminated, OTC said the 2026 charge stays as published, with a later credit. NBC/PFT says Rapoport reported Johnson will pay back several million of the $21.7 million option, exact amount to be determined, and that keeping him on the roster means the club is not treating the retirement as a forfeitable breach to recover signing-bonus money. Until OTC replaces the $20,299,000 active hit, that published charge is the 2026 number.
