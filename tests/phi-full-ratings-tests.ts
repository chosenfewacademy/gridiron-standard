import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { estimateOvr, loadWeights } from "../src/madden-ovr-check.js";

type Row = { player: string; team: string; position: string; overall: number; attributes: Record<string, number> };

const OVERALLS: Record<string, [string, number]> = {
  "Joe Milton III": ["QB", 64],
  "Tanner McKee": ["QB", 66],
  "Cole Payton": ["QB", 60],
  "Saquon Barkley": ["RB", 76],
  "Jaydon Blue": ["RB", 62],
  "Will Shipley": ["RB", 61],
  "DeVonta Smith": ["WR", 77],
  "Dontayvion Wicks": ["WR", 72],
  "Makai Lemon": ["WR", 70],
  "Darius Cooper": ["WR", 64],
  "Dallas Goedert": ["TE", 77],
  "Eli Stowers": ["TE", 64],
  "Johnny Mundt": ["TE", 62],
  "Grant Calcaterra": ["TE", 60],
  "Jordan Mailata": ["LT", 88],
  "Fred Johnson": ["LT", 68],
  "Markel Bell": ["RT", 66],
  "Landon Dickerson": ["LG", 71],
  "Willie Lampkin": ["LG", 62],
  "Drew Kendall": ["C", 68],
  "Jake Majors": ["C", 58],
  "Tyler Steen": ["RG", 70],
  "Micah Morris": ["RG", 55],
  "Nolan Smith Jr.": ["LEDGE", 74],
  "Arnold Ebiketie": ["LEDGE", 68],
  "Jonathan Greenard": ["REDGE", 74],
  "Jalyx Hunt": ["REDGE", 67],
  "A.J. Epenesa": ["REDGE", 70],
  "Jalen Carter": ["DT", 76],
  "Jordan Davis": ["DT", 73],
  "Moro Ojomo": ["DT", 70],
  "Byron Young": ["DT", 61],
  "Jihaad Campbell": ["MIKE", 72],
  "Jeremiah Trotter Jr.": ["MIKE", 68],
  "Zack Baun": ["WILL", 90],
  "Smael Mondon Jr.": ["WILL", 64],
  "Quinyon Mitchell": ["CB", 80],
  "Riq Woolen": ["CB", 74],
  "Kenny Moore II": ["CB", 72],
  "Jonathan Jones": ["CB", 70],
  "Andrew Mukuba": ["FS", 70],
  "Cooper DeJean": ["SS", 73],
  "Marcus Epps": ["SS", 71],
  "Jake Elliott": ["K", 73],
  "Braden Mann": ["P", 74],
  "Rocco Underwood": ["LS", 64]
};

function applicable(position: string): string[] {
  if (position === "LS") {
    const metrics = JSON.parse(fs.readFileSync(path.resolve("config/position-metrics.json"), "utf8"));
    return metrics.positions.LS.madden_attributes_informed;
  }
  const order = JSON.parse(fs.readFileSync(path.resolve("config/madden-entry-order.json"), "utf8"));
  return order.positions[position].filter((key: string) => key !== "OVR");
}

export function runPhiFullRatingsTests(test: (name: string, fn: () => void) => void): void {
  const artifactPath = path.resolve("artifacts/phi-full-ratings.json");
  const auditPath = path.resolve("artifacts/phi-rating-audit.json");
  const dbPath = path.resolve("data/roster/gridiron.sqlite");

  test("PHI full ratings cover the researched 46 with applicable attributes", () => {
    const rows = JSON.parse(fs.readFileSync(artifactPath, "utf8")) as Row[];
    assert.equal(rows.length, 46);
    assert.equal(new Set(rows.map(row => row.player)).size, 46);
    assert.deepEqual(rows.map(row => row.player).sort(), Object.keys(OVERALLS).sort());
    for (const row of rows) {
      assert.equal(row.team, "PHI");
      const [position, overall] = OVERALLS[row.player];
      assert.equal(row.position, position);
      assert.equal(row.overall, overall);
      const keys = applicable(position);
      assert.deepEqual(Object.keys(row.attributes).sort(), [...keys].sort());
      for (const [key, value] of Object.entries(row.attributes)) {
        assert.equal(typeof value, "number");
        assert.equal(Number.isInteger(value), true);
        assert.ok(value >= 0 && value <= 99, `${row.player} ${key}`);
        assert.notEqual(value as unknown, "Not rated");
      }
    }
    const underwood = rows.find(row => row.player === "Rocco Underwood")!;
    assert.equal("CTH" in underwood.attributes, false);
    assert.equal(rows.some(row => row.position === "FB"), false);
    const dejean = rows.find(row => row.player === "Cooper DeJean")!;
    assert.equal(dejean.position, "SS");
    assert.equal(dejean.overall, 73);
    const byron = rows.find(row => row.player === "Byron Young")!;
    assert.equal(byron.position, "DT");
    assert.equal(rows.some(row => row.player === "Jalen Hurts"), false);
  });

  test("PHI full ratings match the roster cards and leave locks, cap, and Hurts alone", () => {
    assert.equal(fs.existsSync(dbPath), true);
    const rows = JSON.parse(fs.readFileSync(artifactPath, "utf8")) as Row[];
    const audit = JSON.parse(fs.readFileSync(auditPath, "utf8"));
    assert.equal(audit.rating_standard, "Gridiron Standard");
    assert.equal(audit.not_ea_official, true);
    const db = new DatabaseSync(dbPath, { readOnly: true });
    for (const row of rows) {
      const card = db.prepare(
        "SELECT ovr, attributes_json, position, player_id FROM rating_cards WHERE player_name=? AND position=?"
      ).get(row.player, row.position) as { ovr: number; attributes_json: string; position: string; player_id: string } | undefined;
      assert.ok(card, row.player);
      assert.equal(card!.ovr, row.overall);
      const stored = JSON.parse(card!.attributes_json) as Record<string, number>;
      assert.deepEqual(stored, row.attributes);
      const auditRow = audit.rows.find((item: { player: string; position: string }) => item.player === row.player && item.position === row.position);
      const estimate = estimateOvr(row.position, row.attributes, loadWeights());
      assert.equal(auditRow.estimated_ovr, estimate.estimated_ovr);
      assert.equal(auditRow.best_archetype ?? null, estimate.best_archetype || null);
      assert.equal(auditRow.rating_standard, "Gridiron Standard");
    }
    const byron = db.prepare(
      "SELECT player_id, position, ovr FROM rating_cards WHERE card_id='PHI_AUDIT:DT:nfl_00-0038978'"
    ).get() as { player_id: string; position: string; ovr: number };
    assert.equal(byron.player_id, "nfl_00-0038978");
    assert.equal(byron.position, "DT");
    assert.equal(byron.ovr, 61);
    const rams = db.prepare(
      "SELECT ovr, position, attributes_json FROM rating_cards WHERE card_id='LEDGE:LEDGE_REAUDIT_RATE_07_A2'"
    ).get() as { ovr: number; position: string; attributes_json: string };
    assert.equal(rams.ovr, 81);
    assert.equal(rams.position, "LEDGE");
    assert.equal(JSON.parse(rams.attributes_json).FMV, 84);
    const hurts = db.prepare("SELECT ovr, position FROM rating_cards WHERE player_name='Jalen Hurts'").get() as { ovr: number; position: string };
    assert.equal(hurts.ovr, 78);
    assert.equal(hurts.position, "QB");
    const cap = db.prepare(
      "SELECT cap_space, committed, dead_money, players_counted FROM team_cap_ledger WHERE team_abbr='PHI' AND season=2026 AND accounting_rule='in_season'"
    ).get() as { cap_space: number; committed: number; dead_money: number; players_counted: number };
    assert.equal(cap.cap_space, 29471575);
    assert.equal(cap.committed, 198527666);
    assert.equal(cap.dead_money, 0);
    assert.equal(cap.players_counted, 59);
    const milton = db.prepare(
      "SELECT pos_rank FROM depth_chart WHERE team_abbr='PHI' AND pos_abb='QB' AND player_name='Joe Milton III'"
    ).get() as { pos_rank: number };
    assert.equal(milton.pos_rank, 1);
    const lane = db.prepare("SELECT COUNT(*) AS n FROM depth_chart WHERE team_abbr='PHI' AND player_name='Lane Johnson'").get() as { n: number };
    assert.equal(lane.n, 0);
    const nolan = db.prepare("SELECT aliases_json FROM players WHERE player_id='ext_00-0039013'").get() as { aliases_json: string };
    assert.ok(JSON.parse(nolan.aliases_json).includes("Nolan Smith Jr."));
    db.close();
  });
}
