import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ageOnSeptember1, buildCapSheet } from "../src/roster/cap.js";
import { importContractSnapshot, loadCapSheet } from "../src/roster/contracts.js";
import { migrate, openRosterDb } from "../src/roster/db.js";
import { handleRosterRequest } from "../src/roster/ui-server.js";

type T = (name: string, fn: () => void) => void;

function charge(name: string, capHit: number, status: string | null, extra: Record<string, unknown> = {}) {
  return {
    playerId: name.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
    playerName: name,
    capHit,
    deadMoney: null as number | null,
    voidYear: false,
    membershipStatus: status,
    ...extra
  };
}

export function runRosterCapTests(test: T): void {
  test("in-season cap sheet counts roster charges and keeps practice squad off the cap", () => {
    const sheet = buildCapSheet({
      leagueCap: 1000,
      carryover: 100,
      adjustments: -50,
      rule: "in_season",
      charges: [
        charge("Alpha", 400, "active"),
        charge("Bravo", 300, "IR"),
        charge("Practice", 50, "PS"),
        charge("Released", 200, "FA", { deadMoney: 80 }),
        charge("Voided", 25, null, { voidYear: true })
      ]
    });
    assert.equal(sheet.committed, 700);
    assert.equal(sheet.deadMoney, 105);
    assert.equal(sheet.capSpace, 245);
    assert.deepEqual(sheet.excluded.map(line => line.playerName), ["Practice"]);
    assert.equal(sheet.dead.find(line => line.playerName === "Voided")?.reason, "void_year");
  });

  test("top 51 keeps every player tied with the cutoff", () => {
    const sheet = buildCapSheet({
      leagueCap: 1000,
      rule: "top51",
      top51Limit: 2,
      charges: [
        charge("Alpha", 100, "active"),
        charge("Bravo", 50, "active"),
        charge("Charlie", 50, "active"),
        charge("Delta", 50, "active"),
        charge("Echo", 10, "active"),
        charge("Voided", 15, null, { voidYear: true })
      ]
    });
    assert.equal(sheet.committed, 250);
    assert.equal(sheet.deadMoney, 15);
    assert.deepEqual(sheet.excluded.map(line => line.reason), ["below_top_51"]);
    assert.equal(sheet.capSpace, 735);
  });

  test("a roster retirement still counts when the year is flagged cap-active", () => {
    const retired = buildCapSheet({
      leagueCap: 301200000,
      adjustments: -73200759,
      rule: "in_season",
      charges: [
        charge("Lane Johnson", 20299000, "other", { capActiveWhileRosterRetired: true, deadMoney: 20299000 }),
        charge("Other Retiree", 100, "other"),
        charge("Released", 50, "FA", { capActiveWhileRosterRetired: true, deadMoney: 40 }),
        charge("Moved", 70, "off_roster", { capActiveWhileRosterRetired: true })
      ]
    });
    assert.equal(retired.committed, 20299000);
    assert.equal(retired.deadMoney, 40);
    assert.equal(retired.counted[0]?.reason, "cap_active_while_roster_retired");
    assert.equal(retired.capSpace, 301200000 - 73200759 - 20299000 - 40);
    assert.deepEqual(
      retired.excluded.map(line => line.playerName).sort(),
      ["Moved", "Other Retiree"]
    );
    const active = buildCapSheet({
      leagueCap: 100,
      rule: "in_season",
      charges: [charge("Lane Johnson", 20, "active", { capActiveWhileRosterRetired: true })]
    });
    assert.equal(active.committed, 20);
    assert.equal(active.counted[0]?.reason, "cap_active_while_roster_retired");
  });

  test("off-roster charge without dead money is not invented", () => {
    const sheet = buildCapSheet({
      leagueCap: 500,
      rule: "in_season",
      charges: [charge("Gone", 125, "off_roster")]
    });
    assert.equal(sheet.committed, 0);
    assert.equal(sheet.deadMoney, 0);
    assert.equal(sheet.excluded[0]?.reason, "off_roster_no_dead_money");
    assert.equal(sheet.capSpace, 500);
  });

  test("September 1 age uses the cap season", () => {
    assert.equal(ageOnSeptember1("2001-08-07", 2026), 25);
    assert.equal(ageOnSeptember1("2001-09-02", 2026), 24);
    assert.equal(ageOnSeptember1(null, 2026), null);
  });

  test("import and cap query use only the contract file", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "roster-cap-"));
    const contractsDir = path.join(root, "contracts");
    fs.mkdirSync(contractsDir);
    const capFile = path.join(root, "league-cap.json");
    fs.writeFileSync(capFile, JSON.stringify({
      seasons: [{
        season: 2026,
        league_cap: 1000,
        accounting_rule: "in_season",
        source_name: "fixture",
        source_url: "fixture://cap",
        note: "not a real cap"
      }]
    }));
    fs.writeFileSync(path.join(contractsDir, "phi.json"), JSON.stringify({
      source_name: "fixture",
      contracts: [
        {
          contract_id: "phi-star",
          player_id: "star",
          team: "PHI",
          signing_year: 2024,
          years: 2,
          total_value: 400,
          aav: 200,
          fully_guaranteed: 100,
          guarantee_signing: 40,
          guarantee_roster: 30,
          guarantee_injury: 20,
          guarantee_other: 10,
          seasons: [
            { season: 2026, cap_hit: 120, base_salary: 80, dead_money: 90 },
            { season: 2027, cap_hit: 140, void_year: true }
          ]
        },
        {
          contract_id: "phi-squad",
          player_name: "Squad Player",
          team: "PHI",
          signing_year: 2026,
          years: 1,
          aav: 15,
          seasons: [{ season: 2026, cap_hit: 15, team_option: true }]
        }
      ],
      adjustments: [{ team: "PHI", season: 2026, carryover: 50, adjustments: -10, note: "fixture" }]
    }));

    const db = openRosterDb(":memory:");
    try {
      migrate(db);
      const columns = (db.prepare("PRAGMA table_info(contracts)").all() as { name: string }[]).map(row => row.name);
      for (const name of ["aav", "total_value", "guarantee_signing", "guarantee_roster", "guarantee_injury", "guarantee_other", "fully_guaranteed"]) {
        assert.ok(columns.includes(name), name);
      }
      const yearColumns = (db.prepare("PRAGMA table_info(contract_years)").all() as { name: string }[]).map(row => row.name);
      for (const name of ["cap_hit", "dead_money", "void_year", "team_option", "player_option"]) {
        assert.ok(yearColumns.includes(name), name);
      }
      db.prepare(`
        INSERT INTO teams(abbr, name, city, nickname, conference, division)
        VALUES ('PHI', 'Philadelphia Eagles', 'Philadelphia', 'Eagles', 'NFC', 'East')
      `).run();
      db.prepare("INSERT INTO players(player_id, full_name, team_abbr, position_bucket) VALUES ('star', 'Star Player', 'PHI', 'QB')").run();
      db.prepare("INSERT INTO players(player_id, full_name, team_abbr, position_bucket) VALUES ('squad', 'Squad Player', 'PHI', 'WR')").run();
      db.prepare("INSERT INTO roster_membership(player_id, team_abbr, season, status, source) VALUES ('star', 'PHI', 2026, 'active', 'fixture')").run();
      db.prepare("INSERT INTO roster_membership(player_id, team_abbr, season, status, source) VALUES ('squad', 'PHI', 2026, 'PS', 'fixture')").run();

      const imported = importContractSnapshot(db, { root, contractsDir, capFile });
      assert.equal(imported.contracts, 2);
      assert.equal(imported.contractYears, 3);
      const before = fs.readFileSync(path.join(contractsDir, "phi.json"), "utf8");
      const sheet = loadCapSheet(db, "PHI", 2026, "in_season");
      assert.equal(sheet.committed, 120);
      assert.equal(sheet.deadMoney, 0);
      assert.equal(sheet.carryover, 50);
      assert.equal(sheet.adjustments, -10);
      assert.equal(sheet.capSpace, 920);
      assert.deepEqual(sheet.excluded.map(line => line.playerName), ["Squad Player"]);
      assert.equal(fs.readFileSync(path.join(contractsDir, "phi.json"), "utf8"), before);

      const page = handleRosterRequest(db, "GET", "/", new URLSearchParams(), { root });
      assert.equal(page.status, 200);
      assert.match(page.body, /Search players/);
      const cap = JSON.parse(handleRosterRequest(db, "GET", "/api/cap", new URLSearchParams("team=PHI"), { root }).body);
      assert.equal(cap.committed, 120);
      assert.equal(cap.capSpace, 920);
      const player = JSON.parse(handleRosterRequest(db, "GET", "/api/player", new URLSearchParams("id=star"), { root }).body);
      assert.equal(player.contracts[0].aav, 200);
      assert.equal(player.contracts[0].seasons[0].cap_hit, 120);
      const denied = handleRosterRequest(db, "POST", "/api/cap", new URLSearchParams("team=PHI"), { root });
      assert.equal(denied.status, 405);
    } finally {
      db.close();
    }

    const badDir = fs.mkdtempSync(path.join(os.tmpdir(), "roster-cap-bad-"));
    fs.writeFileSync(path.join(badDir, "bad.json"), JSON.stringify({
      contracts: [{
        contract_id: "bad",
        player_id: "star",
        team: "PHI",
        signing_year: 2026,
        seasons: [{ season: 2026, cap_hit: 1.5 }]
      }]
    }));
    const db2 = openRosterDb(":memory:");
    try {
      migrate(db2);
      db2.prepare(`
        INSERT INTO teams(abbr, name, city, nickname, conference, division)
        VALUES ('PHI', 'Philadelphia Eagles', 'Philadelphia', 'Eagles', 'NFC', 'East')
      `).run();
      db2.prepare("INSERT INTO players(player_id, full_name) VALUES ('star', 'Star Player')").run();
      assert.throws(
        () => importContractSnapshot(db2, { root: badDir, contractsDir: badDir, capFile: path.join(badDir, "nope.json") }),
        /integer number of dollars/
      );
    } finally {
      db2.close();
    }
  });

  test("checked-in 2026 cap and Hurts year are the sourced figures", () => {
    const cap = JSON.parse(fs.readFileSync("data/roster/cap/league-cap.json", "utf8"));
    assert.equal(cap.seasons[0].league_cap, 301200000);
    assert.equal(cap.seasons[0].accounting_rule, "in_season");
    assert.match(cap.seasons[0].source_url, /^https:\/\/www\.nfl\.com\//);
    const deal = JSON.parse(fs.readFileSync("data/roster/contracts/phi-jalen-hurts-2023.json", "utf8"));
    assert.equal(deal.contracts.length, 1);
    const year = deal.contracts[0].seasons.find((row: { season: number }) => row.season === 2026);
    assert.equal(
      year.base_salary + year.signing_bonus_proration + year.option_bonus_proration,
      year.cap_hit
    );
    assert.equal(year.cap_hit, 31971800);
    const files = fs.readdirSync("data/roster/contracts").filter(name => name.endsWith(".json")).sort();
    assert.deepEqual(files, ["phi-2026-otc-team-sheet.json", "phi-jalen-hurts-2023.json"]);
  });

  test("PHI 2026 cap counts Lane Johnson and matches the Over The Cap space", () => {
    const sheet = JSON.parse(fs.readFileSync("data/roster/contracts/phi-2026-otc-team-sheet.json", "utf8"));
    const hurts = JSON.parse(fs.readFileSync("data/roster/contracts/phi-jalen-hurts-2023.json", "utf8"));
    const registry = JSON.parse(fs.readFileSync("data/players/registry.json", "utf8"));
    const ids = new Set(registry.players.map((player: { player_id: string }) => player.player_id));
    const johnson = sheet.contracts.find((deal: { player_name: string }) => deal.player_name === "Lane Johnson");
    const year = johnson.seasons.find((row: { season: number }) => row.season === 2026);
    assert.equal(johnson.player_id, "ext_00-0030561");
    assert.equal(year.cap_hit, 20299000);
    assert.equal(year.cap_active_while_roster_retired, true);
    assert.equal(
      year.base_salary + year.signing_bonus_proration + year.option_bonus_proration
        + year.roster_bonus + year.workout_bonus + year.other_bonus,
      year.cap_hit
    );
    const next = johnson.seasons.find((row: { season: number }) => row.season === 2027);
    assert.equal(
      next.base_salary + next.signing_bonus_proration + next.option_bonus_proration,
      next.cap_hit
    );
    assert.equal(next.cap_active_while_roster_retired, undefined);
    const brown = sheet.contracts.filter((deal: { player_name: string; player_id: string }) =>
      /brown/i.test(deal.player_name) || deal.player_id === "hollywood_brown");
    assert.equal(brown.length, 1);
    assert.equal(brown[0].player_id, "hollywood_brown");
    for (const deal of sheet.contracts) assert.ok(ids.has(deal.player_id), deal.player_id);
    let committed = hurts.contracts[0].seasons.find((row: { season: number }) => row.season === 2026).cap_hit;
    for (const deal of sheet.contracts) {
      for (const row of deal.seasons) if (row.season === 2026) committed += row.cap_hit;
    }
    assert.equal(committed, 218826666);
    assert.equal(sheet.adjustments[0].adjustments, -73200759);
    assert.equal(sheet.adjustments[0].carryover, 0);
    const league = 301200000;
    assert.equal(league + sheet.adjustments[0].adjustments - committed, 9172575);
    assert.equal(198527666 + 20299000, committed);
    assert.equal(29471575 - 20299000, 9172575);
    const dead = 82776143;
    const practice = 4176251;
    const bennett = 1145000;
    const room = 14896635;
    assert.equal(room - dead - practice - bennett, sheet.adjustments[0].adjustments);
    assert.equal(committed + dead + practice + bennett, 306924060);
    assert.equal(league + room - (committed + dead + practice + bennett), 9172575);
  });

  test("import keeps a retired player's flagged cap hit on the active sheet", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "roster-cap-retired-"));
    const contractsDir = path.join(root, "contracts");
    fs.mkdirSync(contractsDir);
    const capFile = path.join(root, "league-cap.json");
    fs.writeFileSync(capFile, JSON.stringify({
      seasons: [{ season: 2026, league_cap: 301200000, accounting_rule: "in_season", source_name: "fixture", source_url: "fixture://cap" }]
    }));
    fs.writeFileSync(path.join(contractsDir, "phi.json"), JSON.stringify({
      source_name: "fixture",
      contracts: [{
        contract_id: "phi-lane",
        player_id: "lane",
        team: "PHI",
        signing_year: 2025,
        seasons: [{
          season: 2026,
          cap_hit: 20299000,
          cap_active_while_roster_retired: true
        }]
      }],
      adjustments: [{ team: "PHI", season: 2026, carryover: 0, adjustments: -73200759 }]
    }));
    const db = openRosterDb(":memory:");
    try {
      migrate(db);
      db.prepare(`
        INSERT INTO teams(abbr, name, city, nickname, conference, division)
        VALUES ('PHI', 'Philadelphia Eagles', 'Philadelphia', 'Eagles', 'NFC', 'East')
      `).run();
      db.prepare("INSERT INTO players(player_id, full_name, team_abbr) VALUES ('lane', 'Lane Johnson', 'PHI')").run();
      db.prepare(`
        INSERT INTO roster_membership(player_id, team_abbr, season, status, raw_roster_status, source)
        VALUES ('lane', 'PHI', 2026, 'other', 'RET', 'fixture')
      `).run();
      importContractSnapshot(db, { root, contractsDir, capFile });
      const sheet = loadCapSheet(db, "PHI", 2026, "in_season");
      assert.equal(sheet.committed, 20299000);
      assert.equal(sheet.deadMoney, 0);
      assert.equal(sheet.capSpace, 301200000 - 73200759 - 20299000);
      assert.equal(sheet.counted[0]?.reason, "cap_active_while_roster_retired");
      const stored = db.prepare(
        "SELECT cap_active_while_roster_retired AS flag FROM contract_years WHERE contract_id = 'phi-lane'"
      ).get() as { flag: number };
      assert.equal(stored.flag, 1);
    } finally {
      db.close();
    }
  });
}
