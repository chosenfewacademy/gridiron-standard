import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { estimateOvr, loadWeights } from "../src/madden-ovr-check.js";
import { exclusivePlayerProfile } from "../src/roster/phi-canonical.js";
import { migrate, openRosterDb } from "../src/roster/db.js";
import { seedRoster } from "../src/roster/seed.js";
import { handleRosterRequest } from "../src/roster/ui-server.js";

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
    assert.equal(audit.input_database.kind, "pre_pr4_attached_sqlite");
    assert.equal(audit.input_database.not_current_page, true);
    assert.equal(audit.cap_changed, false);
    assert.equal(audit.contracts_changed, false);
    assert.equal(audit.team_overalls_changed, false);
    assert.equal(audit.ovr_validation.in_game_requirement_met, false);
    assert.equal(audit.calculator.in_game_requirement_met, false);
    assert.equal(audit.official_page_cap_not_applied.cap_space, 9172575);
    assert.equal(audit.official_page_cap_not_applied.committed, 218826666);
    assert.equal(audit.official_page_cap_not_applied.players_counted, 60);
    const cap = db.prepare(
      "SELECT cap_space, committed, dead_money, players_counted FROM team_cap_ledger WHERE team_abbr='PHI' AND season=2026 AND accounting_rule='in_season'"
    ).get() as { cap_space: number; committed: number; dead_money: number; players_counted: number };
    assert.equal(cap.cap_space, 29471575);
    assert.equal(cap.committed, 198527666);
    assert.equal(cap.dead_money, 0);
    assert.equal(cap.players_counted, 59);
    const depth = db.prepare(
      "SELECT pos_abb, pos_rank, player_name FROM depth_chart WHERE team_abbr='PHI'"
    ).all() as { pos_abb: string; pos_rank: number; player_name: string }[];
    const expectedDepth = [
      ["QB", 1, "Joe Milton III"], ["QB", 2, "Tanner McKee"], ["QB", 3, "Cole Payton"],
      ["RB", 1, "Saquon Barkley"], ["RB", 2, "Jaydon Blue"], ["RB", 3, "Will Shipley"],
      ["WR", 1, "DeVonta Smith"], ["WR", 2, "Dontayvion Wicks"], ["WR", 3, "Makai Lemon"], ["WR", 4, "Darius Cooper"],
      ["TE", 1, "Dallas Goedert"], ["TE", 2, "Eli Stowers"], ["TE", 3, "Johnny Mundt"], ["TE", 4, "Grant Calcaterra"],
      ["LT", 1, "Jordan Mailata"], ["LT", 2, "Fred Johnson"], ["LT", 3, "Markel Bell"],
      ["LG", 1, "Landon Dickerson"], ["LG", 2, "Willie Lampkin"],
      ["C", 1, "Drew Kendall"], ["C", 2, "Jake Majors"],
      ["RG", 1, "Tyler Steen"], ["RG", 2, "Fred Johnson"], ["RG", 3, "Micah Morris"],
      ["RT", 1, "Markel Bell"], ["RT", 2, "Fred Johnson"],
      ["LEDGE", 1, "Nolan Smith Jr."], ["LEDGE", 2, "Arnold Ebiketie"],
      ["REDGE", 1, "Jonathan Greenard"], ["REDGE", 2, "Jalyx Hunt"], ["REDGE", 3, "A.J. Epenesa"],
      ["DT", 1, "Jalen Carter"], ["DT", 2, "Jordan Davis"], ["DT", 3, "Moro Ojomo"], ["DT", 4, "Byron Young"],
      ["MIKE", 1, "Jihaad Campbell"], ["MIKE", 2, "Jeremiah Trotter Jr."],
      ["WILL", 1, "Zack Baun"], ["WILL", 2, "Smael Mondon Jr."],
      ["CB", 1, "Quinyon Mitchell"], ["CB", 2, "Riq Woolen"], ["CB", 3, "Kenny Moore II"], ["CB", 4, "Jonathan Jones"],
      ["FS", 1, "Andrew Mukuba"],
      ["SS", 1, "Cooper DeJean"], ["SS", 2, "Marcus Epps"],
      ["K", 1, "Jake Elliott"], ["P", 1, "Braden Mann"], ["LS", 1, "Rocco Underwood"]
    ];
    assert.equal(depth.length, 49);
    assert.deepEqual(
      depth.map(row => [row.pos_abb, row.pos_rank, row.player_name]).sort(),
      expectedDepth.map(row => [row[0], row[1], row[2]]).sort()
    );
    for (const name of ["Kelee Ringo", "Mac McWilliams", "Michael Carter II", "Ty Robinson", "Hollywood Brown", "Elijah Moore", "Britain Covey", "Lane Johnson"]) {
      const slot = db.prepare("SELECT COUNT(*) AS n FROM depth_chart WHERE team_abbr='PHI' AND player_name=?").get(name) as { n: number };
      assert.equal(slot.n, 0, name);
    }
    for (const [name, ovr] of [["Kelee Ringo", 68], ["Ty Robinson", 64], ["Elijah Moore", 68], ["Britain Covey", 62]] as const) {
      const card = db.prepare("SELECT ovr FROM rating_cards WHERE player_name=?").get(name) as { ovr: number };
      assert.equal(card.ovr, ovr);
    }
    const otherDepth = db.prepare("SELECT COUNT(*) AS n FROM depth_chart WHERE team_abbr!='PHI' AND team_abbr!='DAL'").get() as { n: number };
    assert.equal(otherDepth.n, 2185);
    const milton = db.prepare(
      "SELECT pos_rank FROM depth_chart WHERE team_abbr='PHI' AND pos_abb='QB' AND player_name='Joe Milton III'"
    ).get() as { pos_rank: number };
    assert.equal(milton.pos_rank, 1);
    const nolan = db.prepare("SELECT aliases_json FROM players WHERE player_id='ext_00-0039013'").get() as { aliases_json: string };
    assert.ok(JSON.parse(nolan.aliases_json).includes("Nolan Smith Jr."));
    const depthApi = JSON.parse(handleRosterRequest(db, "GET", "/api/depth", new URLSearchParams("team=PHI")).body) as {
      player_name: string; position: string; rank: number; ovr: number | null;
    }[];
    assert.equal(depthApi.length, 49);
    assert.equal(depthApi.find(slot => slot.position === "QB" && slot.rank === 1)?.player_name, "Joe Milton III");
    assert.equal(depthApi.find(slot => slot.position === "RT" && slot.rank === 1)?.player_name, "Markel Bell");
    assert.equal(depthApi.find(slot => slot.player_name === "Cooper DeJean")?.ovr, 73);
    assert.equal(depthApi.find(slot => slot.player_name === "Byron Young")?.ovr, 61);
    const page = handleRosterRequest(db, "GET", "/app.js", new URLSearchParams()).body;
    assert.match(page, /profile-open/);
    assert.match(page, /team-cap/);
    assert.match(page, /team-depth/);
    assert.match(page, /team-ratings/);
    assert.deepEqual(exclusivePlayerProfile("#/team/PHI/player/ext_00-0039398"), { id: "ext_00-0039398", team: "PHI" });
    assert.equal(exclusivePlayerProfile("#/team/PHI"), null);
    db.close();
  });

  test("seed reloads the canonical PHI ratings and does not invent Lane Johnson's cap hit", () => {
    const dbFile = path.join(os.tmpdir(), `phi-canonical-${process.pid}.sqlite`);
    const db = openRosterDb(dbFile);
    try {
      migrate(db);
      seedRoster(db, { root: process.cwd(), season: 2026 });
      const milton = db.prepare(
        "SELECT ovr, attributes_json FROM rating_cards WHERE player_name='Joe Milton III' AND position='QB'"
      ).get() as { ovr: number; attributes_json: string };
      const canonical = JSON.parse(fs.readFileSync(path.resolve("artifacts/phi-full-ratings.json"), "utf8")) as Row[];
      const expected = canonical.find(row => row.player === "Joe Milton III")!;
      assert.equal(milton.ovr, 64);
      assert.deepEqual(JSON.parse(milton.attributes_json), expected.attributes);
      const dejean = db.prepare("SELECT position, ovr FROM rating_cards WHERE player_name='Cooper DeJean'").get() as { position: string; ovr: number };
      assert.equal(dejean.position, "SS");
      assert.equal(dejean.ovr, 73);
      const byron = db.prepare(
        "SELECT player_id, position, ovr FROM rating_cards WHERE player_name='Byron Young' AND position='DT'"
      ).get() as { player_id: string; position: string; ovr: number };
      assert.equal(byron.player_id, "nfl_00-0038978");
      assert.equal(byron.ovr, 61);
      const edge = db.prepare(
        "SELECT ovr FROM rating_cards WHERE card_id='LEDGE:LEDGE_REAUDIT_RATE_07_A2'"
      ).get() as { ovr: number } | undefined;
      if (edge) assert.equal(edge.ovr, 81);
      const depth = db.prepare(
        "SELECT COUNT(*) AS rows, COUNT(DISTINCT player_name) AS names FROM depth_chart WHERE team_abbr='PHI'"
      ).get() as { rows: number; names: number };
      assert.equal(depth.rows, 49);
      assert.equal(depth.names, 46);
      const bell = db.prepare(
        "SELECT pos_rank FROM depth_chart WHERE team_abbr='PHI' AND pos_abb='RT' AND player_name='Markel Bell'"
      ).get() as { pos_rank: number };
      assert.equal(bell.pos_rank, 1);
      const hurts = db.prepare(`
        SELECT cy.cap_hit FROM contract_years cy
        JOIN contracts c ON c.contract_id = cy.contract_id
        WHERE c.player_id = 'jalen_hurts' AND cy.season = 2026
      `).get() as { cap_hit: number };
      assert.equal(hurts.cap_hit, 31971800);
      const lane = db.prepare(
        "SELECT COUNT(*) AS n FROM contracts c JOIN players p ON p.player_id = c.player_id WHERE p.full_name = 'Lane Johnson'"
      ).get() as { n: number };
      assert.equal(lane.n, 0);
    } finally {
      db.close();
      for (const suffix of ["", "-wal", "-shm"]) {
        const file = dbFile + suffix;
        if (fs.existsSync(file)) fs.unlinkSync(file);
      }
    }
  });
}
