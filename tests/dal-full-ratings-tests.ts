import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { migrate, openRosterDb } from "../src/roster/db.js";
import { seedRoster } from "../src/roster/seed.js";

type Row = { player: string; team: string; position: string; overall: number; attributes: Record<string, number> };

const LOCKED: Record<string, [string, number]> = {
  "Dak Prescott": ["QB", 84],
  "George Pickens": ["WR", 81],
  "CeeDee Lamb": ["WR", 88],
  "Hunter Luepke": ["FB", 78],
  "Tyler Smith": ["LG", 76],
  "Cooper Beebe": ["C", 74],
  "Tyler Booker": ["RG", 83],
  "Quinnen Williams": ["DT", 87],
  "Brandon Aubrey": ["K", 80],
  "Bryan Anger": ["P", 73],
  "Trent Sieg": ["LS", 68]
};

function applicable(position: string): string[] | null {
  const order = JSON.parse(fs.readFileSync(path.resolve("config/madden-entry-order.json"), "utf8"));
  const keys = order.positions[position] as string[] | undefined;
  return keys ? keys.filter(key => key !== "OVR") : null;
}

export function runDalFullRatingsTests(test: (name: string, fn: () => void) => void): void {
  test("Dallas depth ratings cover every unique chart player and leave locked overalls", () => {
    const rows = JSON.parse(fs.readFileSync(path.resolve("artifacts/dal-full-ratings.json"), "utf8")) as Row[];
    const audit = JSON.parse(fs.readFileSync(path.resolve("artifacts/dal-rating-audit.json"), "utf8"));
    assert.equal(rows.length, 51);
    assert.equal(new Set(rows.map(row => row.player)).size, 51);
    assert.equal(audit.in_game_requirement_met, false);
    assert.equal(audit.coverage, 51);
    for (const row of rows) {
      assert.equal(row.team, "DAL");
      const keys = applicable(row.position);
      if (keys) assert.deepEqual(Object.keys(row.attributes).sort(), [...keys].sort());
      else assert.ok(Object.keys(row.attributes).length > 0);
      for (const value of Object.values(row.attributes)) {
        assert.equal(Number.isInteger(value), true);
        assert.ok(value >= 0 && value <= 99);
      }
      const locked = LOCKED[row.player];
      if (locked) {
        assert.equal(row.position, locked[0]);
        assert.equal(row.overall, locked[1]);
      } else {
        assert.ok(Object.values(row.attributes).every(value => value < 90), row.player);
      }
    }
    const db = new DatabaseSync(path.resolve("data/roster/gridiron.sqlite"), { readOnly: true });
    const depth = db.prepare(
      "SELECT COUNT(*) AS rows, COUNT(DISTINCT player_name) AS names FROM depth_chart WHERE team_abbr='DAL'"
    ).get() as { rows: number; names: number };
    assert.equal(depth.rows, 52);
    assert.equal(depth.names, 51);
    const dak = db.prepare("SELECT ovr, attributes_json FROM rating_cards WHERE card_id='QB:QB_REAUDIT_RATE_03_A3'").get() as {
      ovr: number; attributes_json: string;
    };
    assert.equal(dak.ovr, 84);
    assert.deepEqual(JSON.parse(dak.attributes_json), rows.find(row => row.player === "Dak Prescott")!.attributes);
    const howell = db.prepare("SELECT ovr FROM rating_cards WHERE player_name='Sam Howell' AND position='QB'").get() as { ovr: number };
    assert.equal(howell.ovr, 66);
    const cap = db.prepare(
      "SELECT cap_space, committed FROM team_cap_ledger WHERE team_abbr='PHI' AND season=2026"
    ).get() as { cap_space: number; committed: number };
    assert.equal(cap.cap_space, 29471575);
    assert.equal(cap.committed, 198527666);
    db.close();
  });

  test("seed reloads Dallas cards without moving Dak's locked overall", () => {
    const dbFile = path.join(os.tmpdir(), `dal-canonical-${process.pid}.sqlite`);
    const db = openRosterDb(dbFile);
    try {
      migrate(db);
      seedRoster(db, { root: process.cwd(), season: 2026 });
      const dak = db.prepare("SELECT ovr FROM rating_cards WHERE player_name='Dak Prescott' AND position='QB'").get() as { ovr: number };
      assert.equal(dak.ovr, 84);
      const flour = db.prepare(
        "SELECT ovr, attributes_json FROM rating_cards WHERE player_name='Ryan Flournoy' AND position='WR'"
      ).get() as { ovr: number; attributes_json: string };
      assert.equal(flour.ovr, 70);
      const canonical = JSON.parse(fs.readFileSync(path.resolve("artifacts/dal-full-ratings.json"), "utf8")) as Row[];
      assert.deepEqual(JSON.parse(flour.attributes_json), canonical.find(row => row.player === "Ryan Flournoy")!.attributes);
      const depth = db.prepare("SELECT COUNT(DISTINCT player_name) AS n FROM depth_chart WHERE team_abbr='DAL'").get() as { n: number };
      assert.equal(depth.n, 51);
      const phi = db.prepare("SELECT COUNT(DISTINCT player_name) AS n FROM depth_chart WHERE team_abbr='PHI'").get() as { n: number };
      assert.equal(phi.n, 46);
    } finally {
      db.close();
      for (const suffix of ["", "-wal", "-shm"]) {
        const file = dbFile + suffix;
        if (fs.existsSync(file)) fs.unlinkSync(file);
      }
    }
  });
}
