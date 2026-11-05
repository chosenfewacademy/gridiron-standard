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
    const files = fs.readdirSync("data/roster/contracts").filter(name => name.endsWith(".json"));
    assert.deepEqual(files, ["phi-jalen-hurts-2023.json"]);
  });
}
