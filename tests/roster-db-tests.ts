import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  draftsFromBaseline,
  pickLatestBaselineFile,
  selectBaseline
} from "../src/roster/baselines.js";
import { main } from "../src/roster/cli.js";
import { migrate, openRosterDb } from "../src/roster/db.js";
import { mapRosterStatus } from "../src/roster/membership.js";
import { loadAttributes, queryRoster, rosterStatus } from "../src/roster/query.js";
import { seedRoster } from "../src/roster/seed.js";
import { canonicalTeam } from "../src/roster/teams.js";

type T = (name: string, fn: () => void) => void;

function writeJson(root: string, rel: string, value: unknown): void {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
}

function stamp(file: string): string {
  const stat = fs.statSync(file);
  return `${stat.mtimeMs}:${stat.size}`;
}

function count(db: ReturnType<typeof openRosterDb>, table: string): number {
  const row = db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number };
  return Number(row.n);
}

export function runRosterDbTests(test: T): void {
  test("later same-day baseline file outranks the unsuffixed reaudit", () => {
    const files = [
      "CB.json",
      "CB.reaudit-20261102.json",
      "CB.reaudit-20261104.json",
      "CB.reaudit-20261104b.json",
      "C.reaudit-20261104b.json"
    ];
    assert.equal(pickLatestBaselineFile("CB", files), "CB.reaudit-20261104b.json");
    assert.equal(pickLatestBaselineFile("C", files), "C.reaudit-20261104b.json");
    assert.equal(pickLatestBaselineFile("QB", files), null);
  });

  test("a locked pointer wins when a newer baseline file is also on disk", () => {
    const files = ["WR.json", "WR.reaudit-20261104b.json"];
    const selected = selectBaseline("WR", {
      status: "LOCKED",
      baseline_file: "data/baselines/WR.json"
    }, files);
    assert.equal(selected?.fileName, "WR.json");
    assert.equal(selected?.reason, "locks.json");
    assert.equal(selected?.newerUnselected, "WR.reaudit-20261104b.json");
  });

  test("with no lock, the later baseline file is selected", () => {
    const files = ["WR.reaudit-20261104.json", "WR.reaudit-20261104b.json", "WR.json"];
    const selected = selectBaseline("WR", undefined, files);
    assert.equal(selected?.fileName, "WR.reaudit-20261104b.json");
    assert.equal(selected?.reason, "latest_file");
    assert.equal(selected?.newerUnselected, null);
  });

  test("roster status and team aliases", () => {
    assert.equal(mapRosterStatus("ACT", "PHI"), "active");
    assert.equal(mapRosterStatus(null, "PHI"), "active");
    assert.equal(mapRosterStatus("DEV", "PHI"), "PS");
    assert.equal(mapRosterStatus("RES", "PHI"), "IR");
    assert.equal(mapRosterStatus("CUT", "PHI"), "FA");
    assert.equal(mapRosterStatus("UNSIGNED_FREE_AGENT", null), "FA");
    assert.equal(mapRosterStatus("ACT", null), "FA");
    assert.equal(mapRosterStatus("RET", "PHI"), "other");
    assert.equal(canonicalTeam("LA"), "LAR");
    assert.equal(canonicalTeam("phi"), "PHI");
    assert.equal(canonicalTeam("XYZ"), null);
  });

  test("rating drafts use the latest rate revision and ignore stale full_cards", () => {
    const baseline = {
      position: "C",
      top_10: [{ rank: 1, player: "Creed Humphrey", ovr: 91 }],
      external_controls: [{ player: "Other Center", ovr: 70 }],
      first_out: { player: "Other Center", ovr: 70 },
      full_cards: { "Creed Humphrey": { ovr: 50, ratings: { STR: 1 } } },
      stage_audit_ids: ["C_REAUDIT_RATE_01_A1", "C_REAUDIT_RATE_01_A2", "C_REAUDIT_H2H_01_A1"]
    };
    const audits: Record<string, Record<string, unknown>> = {
      C_REAUDIT_RATE_01_A1: {
        players: ["Creed Humphrey"],
        proposed_ovr: 80,
        ratings: { STR: 10 },
        task_type: "player_rating"
      },
      C_REAUDIT_RATE_01_A2: {
        players: ["Creed Humphrey"],
        proposed_ovr: 88,
        ratings: { STR: 90 },
        task_type: "player_rating",
        madden_reference: [{
          ovr: 97,
          attributes: { STR: 95 },
          delta_ovr: -6,
          delta_attributes: { STR: -5 },
          reference_only: true
        }]
      }
    };
    const { drafts, warnings, cardSource } = draftsFromBaseline(baseline, id => (
      audits[id] ? { audit: audits[id] } : { audit: null, missing: "not found" }
    ));
    assert.equal(cardSource, "stage_audit_ids");
    const creed = drafts.find(row => row.playerName === "Creed Humphrey");
    assert.equal(creed?.auditId, "C_REAUDIT_RATE_01_A2");
    assert.equal(creed?.ovr, 91);
    assert.equal(creed?.poolRole, "TOP10");
    assert.equal((creed?.audit?.ratings as { STR: number }).STR, 90);
    assert.ok(warnings.some(warning => warning.code === "OVR_MISMATCH"));
    const other = drafts.find(row => row.playerName === "Other Center");
    assert.equal(other?.poolRole, "FIRST_OUT");
    assert.equal(other?.ovr, 70);
  });

  test("fixture seed follows the lock, queries ratings, and does not touch sources", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "roster-fixture-"));
    const dbFile = path.join(root, "gridiron.sqlite");
    writeJson(root, "data/players/registry.json", {
      players: [
        { player_id: "devonta_smith", full_name: "DeVonta Smith", team: "PHI", position: "WR", aliases: [], historical_positions: ["WR"] },
        { player_id: "ext_ps", full_name: "Practice Guy", team: "PHI", position: "WR", roster_status: "DEV", aliases: [], historical_positions: ["WR"] },
        { player_id: "ext_cut", full_name: "Cut Guy", team: "PHI", position: "WR", roster_status: "CUT", aliases: [], historical_positions: ["WR"] },
        { player_id: "ext_rams", full_name: "Rams Guy", team: "LA", position: "WR", roster_status: "ACT", aliases: [], historical_positions: ["WR"] }
      ]
    });
    writeJson(root, "state/locks.json", {
      positions: {
        WR: {
          status: "LOCKED",
          baseline_file: "data/baselines/WR.json",
          version: "fixture",
          lock_audit_id: "WR_LOCK_FIXTURE",
          locked_at: "2026-11-01T00:00:00Z",
          history: []
        }
      }
    });
    writeJson(root, "data/baselines/WR.json", {
      position: "WR",
      version: "fixture",
      status: "LOCKED",
      architecture_version: "1.1.3",
      top_10: [{ rank: 1, player: "DeVonta Smith", ovr: 77 }],
      scarcity: { effective_ratings: { "DeVonta Smith": ["WR_REAUDIT_RATE_01_A1", 77] } }
    });
    writeJson(root, "data/baselines/WR.reaudit-20261104b.json", {
      position: "WR",
      top_10: [{ rank: 1, player: "Not The Lock", ovr: 99 }]
    });
    writeJson(root, "audits/league/WR/WR_REAUDIT_RATE_01_A1.json", {
      audit_id: "WR_REAUDIT_RATE_01_A1",
      task_id: "WR_REAUDIT_RATE_01",
      task_type: "player_rating",
      position: "WR",
      player_id: "devonta_smith",
      players: ["DeVonta Smith"],
      proposed_ovr: 77,
      confidence: "MEDIUM",
      style_profile: "Separator",
      ratings: { SPD: 93, CTH: 90 },
      trait_confidence: { SPD: "MEDIUM", CTH: "LOW" },
      high_trait_evidence: { SPD: { tier: "ELITE" } },
      madden_reference: [{
        ovr: 88,
        attributes: { SPD: 96, CTH: 91 },
        delta_ovr: -11,
        delta_attributes: { SPD: -3, CTH: -1 },
        reference_only: true,
        used_as_evidence: false
      }]
    });

    const watched = [
      "data/baselines/WR.json",
      "data/baselines/WR.reaudit-20261104b.json",
      "state/locks.json",
      "data/players/registry.json"
    ].map(rel => path.join(root, rel));
    const before = watched.map(stamp);

    const db = openRosterDb(dbFile);
    try {
      migrate(db);
      const seeded = seedRoster(db, { root, season: 2026 });
      assert.deepEqual(watched.map(stamp), before);
      assert.equal(seeded.teams, 32);
      assert.equal(seeded.players, 4);
      assert.equal(seeded.rating_cards, 1);
      assert.ok(seeded.warnings.some(warning => warning.code === "NEWER_BASELINE_NOT_LOCKED"));
      assert.equal(count(db, "contracts"), 0);
      assert.equal(count(db, "salary_cap"), 0);
      assert.equal(count(db, "free_agent_market"), 0);
      assert.equal(count(db, "draft_classes"), 0);
      assert.equal(count(db, "draft_prospects"), 0);
      assert.equal(count(db, "trades"), 0);
      assert.equal(count(db, "trade_assets"), 0);
      assert.equal(count(db, "team_build_profiles"), 0);

      const phi = db.prepare("SELECT name, conference, division FROM teams WHERE abbr = 'PHI'").get() as {
        name: string; conference: string; division: string;
      };
      assert.equal(phi.name, "Philadelphia Eagles");
      assert.equal(phi.conference, "NFC");
      assert.equal(phi.division, "East");

      const club = queryRoster(db, { team: "PHI", position: "WR" });
      assert.deepEqual(club.map(row => row.full_name), ["DeVonta Smith", "Practice Guy"]);
      const devonta = club[0];
      assert.equal(devonta.ovr, 77);
      assert.equal(devonta.madden_ovr, 88);
      assert.equal(devonta.delta_ovr, -11);
      assert.equal(devonta.membership_status, "active");
      assert.equal(devonta.baseline_rank, 1);
      assert.equal(club[1].ovr, null);
      assert.equal(club[1].membership_status, "PS");

      const freeAgents = queryRoster(db, { team: "PHI", position: "WR", status: "FA" });
      assert.equal(freeAgents.length, 1);
      assert.equal(freeAgents[0].full_name, "Cut Guy");

      const rams = queryRoster(db, { team: "LAR", position: "WR" });
      assert.equal(rams[0]?.full_name, "Rams Guy");
      const raw = db.prepare("SELECT raw_team, team_abbr FROM players WHERE player_id = 'ext_rams'").get() as {
        raw_team: string; team_abbr: string;
      };
      assert.equal(raw.raw_team, "LA");
      assert.equal(raw.team_abbr, "LAR");

      const top = queryRoster(db, { position: "WR", top10: true });
      assert.equal(top.length, 1);
      assert.equal(top[0].full_name, "DeVonta Smith");
      assert.notEqual(top[0].full_name, "Not The Lock");
      const attrs = loadAttributes(db, [devonta.card_id!]).get(devonta.card_id!) ?? [];
      const speed = attrs.find(row => row.attribute === "SPD");
      assert.equal(speed?.rating, 93);
      assert.equal(speed?.madden_rating, 96);
      assert.equal(speed?.delta, -3);
      assert.equal(speed?.tier, "ELITE");

      const again = seedRoster(db, { root, season: 2026 });
      assert.equal(again.players, 4);
      assert.equal(again.rating_cards, 1);
      assert.equal(count(db, "players"), 4);
      assert.equal(count(db, "rating_cards"), 1);
    } finally {
      db.close();
    }

    const seededLog = capture(() => main(["seed", "--root", root, "--db", dbFile, "--season", "2026"]));
    assert.equal(seededLog.code, 0);
    assert.match(seededLog.out, /rating_cards 1/);
    const queried = capture(() => main([
      "query", "--root", root, "--db", dbFile, "--team", "PHI", "--position", "WR", "--json"
    ]));
    assert.equal(queried.code, 0);
    const rows = JSON.parse(queried.out) as { full_name: string; ovr: number | null }[];
    assert.equal(rows[0].full_name, "DeVonta Smith");
    assert.equal(rows[0].ovr, 77);
    assert.throws(
      () => main(["query", "--root", root, "--db", dbFile, "--top10"]),
      /--top10 requires --position/
    );
  });

  test("repo seed reads locked baselines and returns PHI WR plus WR top 10", () => {
    const root = process.cwd();
    const watched = [
      "state/locks.json",
      "data/players/registry.json",
      "data/baselines/WR.reaudit-20261104.json",
      "data/baselines/CB.reaudit-20261104b.json",
      "data/baselines/LT.reaudit-20261104.json",
      "AGENTS.md"
    ].map(rel => path.join(root, rel));
    const before = watched.map(stamp);
    const dbFile = path.join(os.tmpdir(), `gridiron-roster-${process.pid}.sqlite`);
    const db = openRosterDb(dbFile);
    try {
      migrate(db);
      const seeded = seedRoster(db, { root, season: 2026 });
      assert.deepEqual(watched.map(stamp), before, "seed must not write locks, baselines, registry, or AGENTS.md");
      const registry = JSON.parse(fs.readFileSync(path.join(root, "data/players/registry.json"), "utf8"));
      assert.equal(seeded.players, registry.players.length);
      assert.equal(seeded.teams, 32);
      assert.equal(seeded.positions, 22);
      assert.ok(seeded.rating_cards > 100);

      const locks = JSON.parse(fs.readFileSync(path.join(root, "state/locks.json"), "utf8")) as {
        positions: Record<string, { baseline_file: string; status: string }>;
      };
      const status = rosterStatus(db);
      assert.equal(status.schema_version, 1);
      assert.equal(status.warning_counts.NEWER_BASELINE_NOT_LOCKED, undefined);
      for (const [position, entry] of Object.entries(locks.positions)) {
        const row = status.baselines.find(baseline => baseline.position === position);
        assert.ok(row, position);
        assert.equal(row?.baseline_file, entry.baseline_file);
        assert.equal(row?.selection_reason, "locks.json");
        assert.equal(row?.newer_unselected, null);
      }
      const corner = status.baselines.find(baseline => baseline.position === "CB");
      assert.equal(corner?.baseline_file, "data/baselines/CB.reaudit-20261104b.json");

      const wrFile = path.join(root, "data/baselines/WR.reaudit-20261104.json");
      const wr = JSON.parse(fs.readFileSync(wrFile, "utf8"));
      const top = queryRoster(db, { position: "WR", top10: true, limit: 20 });
      assert.equal(top.length, 10);
      assert.equal(top[0].full_name, wr.top_10[0].player);
      assert.equal(top[0].ovr, wr.top_10[0].ovr);
      assert.equal(top[0].source_baseline_file, "data/baselines/WR.reaudit-20261104.json");
      const [auditId] = wr.scarcity.effective_ratings[top[0].full_name] as [string, number];
      assert.equal(top[0].source_audit_id, auditId);
      const audit = JSON.parse(fs.readFileSync(path.join(root, "audits/league/WR", `${auditId}.json`), "utf8"));
      const attrs = loadAttributes(db, [top[0].card_id!]).get(top[0].card_id!) ?? [];
      const route = attrs.find(row => row.attribute === "SRR");
      assert.equal(route?.rating, audit.ratings.SRR);
      assert.equal(top[0].madden_ovr, audit.madden_reference[0].ovr);
      assert.equal(top[0].delta_ovr, audit.madden_reference[0].delta_ovr);
      const refOnly = db.prepare(
        "SELECT reference_only FROM rating_cards WHERE card_id = ?"
      ).get(top[0].card_id) as { reference_only: number };
      assert.equal(refOnly.reference_only, 1);

      const phi = queryRoster(db, { team: "PHI", position: "WR", limit: 100 });
      const devonta = phi.find(row => row.full_name === "DeVonta Smith");
      assert.ok(devonta, `PHI WR rows: ${phi.map(row => row.full_name).join(", ")}`);
      assert.equal(devonta?.ovr, wr.scarcity.effective_ratings["DeVonta Smith"][1]);
      assert.equal(devonta?.team_abbr, "PHI");

      const centerFile = path.join(root, "data/baselines/C.reaudit-20261104.json");
      const center = JSON.parse(fs.readFileSync(centerFile, "utf8"));
      const centers = queryRoster(db, { position: "C", top10: true });
      assert.equal(centers[0].full_name, center.top_10[0].player);
      assert.equal(centers[0].ovr, center.top_10[0].ovr);
      assert.equal(
        (db.prepare("SELECT card_source FROM position_baselines WHERE position = 'C'").get() as { card_source: string }).card_source,
        "stage_audit_ids"
      );
      assert.equal(
        (db.prepare("SELECT card_source FROM position_baselines WHERE position = 'WR'").get() as { card_source: string }).card_source,
        "effective_ratings"
      );

      const tackle = JSON.parse(fs.readFileSync(path.join(root, "data/baselines/LT.reaudit-20261104.json"), "utf8"));
      const wirfs = queryRoster(db, { position: "LT", name: "Tristan Wirfs" });
      const listed = tackle.top_10.find((row: { player: string }) => row.player === "Tristan Wirfs");
      assert.equal(wirfs[0]?.ovr, listed.ovr);
      assert.notEqual(wirfs[0]?.ovr, tackle.full_cards["Tristan Wirfs"].ovr);

      assert.equal(count(db, "contracts"), 0);
      assert.equal(count(db, "trades"), 0);
      assert.equal(count(db, "draft_prospects"), 0);
    } finally {
      db.close();
      for (const suffix of ["", "-wal", "-shm"]) {
        const file = dbFile + suffix;
        if (fs.existsSync(file)) fs.unlinkSync(file);
      }
    }
  });
}

function capture(fn: () => number): { code: number; out: string } {
  const lines: string[] = [];
  const log = console.log;
  console.log = (...args: unknown[]) => {
    lines.push(args.map(item => String(item)).join(" "));
  };
  try {
    return { code: fn(), out: lines.join("\n") };
  } finally {
    console.log = log;
  }
}
