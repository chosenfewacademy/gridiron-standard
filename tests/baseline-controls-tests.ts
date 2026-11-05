import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { loadBaselineControls, resolveLockedBaselineFile } from "../src/baseline-controls.js";
import { buildPlayerAuditTask } from "../src/player-audit-task.js";
import { findTeamPlayers, type PlayerIdentity } from "../src/player-resolver.js";

type T = (name: string, fn: () => void) => void;

const LOCKED_WITHOUT_LEGACY = ["CB", "DT", "FS", "SS", "C", "K", "P"] as const;

function readJson(file: string): any {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function player(position: string): PlayerIdentity {
  return {
    player_id: `test-${position}`,
    full_name: "Test Player",
    aliases: [],
    team: "PHI",
    position,
    historical_positions: [],
    current_audit_id: null,
    audit_history: []
  };
}

function writeBaseline(root: string, relative: string, body: Record<string, unknown>): void {
  const abs = path.join(root, relative);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, JSON.stringify(body));
}

export function runBaselineControlsTests(test: T): void {
  test("locked positions load the locks.json baseline, not position.json", () => {
    const locks = readJson("state/locks.json");
    for (const pos of LOCKED_WITHOUT_LEGACY) {
      const entry = locks.positions[pos];
      assert.equal(entry.status, "LOCKED");
      assert.equal(fs.existsSync(path.resolve(`data/baselines/${pos}.json`)), false);
      assert.equal(resolveLockedBaselineFile(pos), entry.baseline_file);
      const expected = readJson(entry.baseline_file);
      const controls = loadBaselineControls(pos);
      assert.deepEqual(controls.top_10, expected.top_10);
      assert.equal(controls.top_10.length > 0, true);
      const task = buildPlayerAuditTask(player(pos));
      assert.equal(task.locked_baseline_file, entry.baseline_file);
      assert.equal(task.position, pos);
    }

    const cbOlder = readJson("data/baselines/CB.reaudit-20261104.json");
    const kOlder = readJson("data/baselines/K.reaudit-20261104.json");
    assert.notDeepEqual(loadBaselineControls("CB").top_10, cbOlder.top_10);
    assert.notDeepEqual(loadBaselineControls("K").top_10, kOlder.top_10);

    const qbLock = locks.positions.QB.baseline_file;
    assert.equal(resolveLockedBaselineFile("QB"), qbLock);
    assert.deepEqual(loadBaselineControls("QB").top_10, readJson(qbLock).top_10);
    assert.notDeepEqual(loadBaselineControls("QB").top_10, readJson("data/baselines/QB.json").top_10);
    assert.equal(buildPlayerAuditTask(player("QB")).locked_baseline_file, qbLock);
  });

  test("PHI players at locked positions are not BASELINE_NOT_AVAILABLE", () => {
    const locks = readJson("state/locks.json");
    const players = findTeamPlayers("PHI").filter(row => row.position);
    assert.equal(players.length > 0, true);
    const seen = new Set<string>();
    for (const row of players) {
      const pos = row.position as string;
      const entry = locks.positions[pos];
      assert.equal(entry?.status, "LOCKED", `${row.full_name} ${pos}`);
      let task;
      try {
        task = buildPlayerAuditTask(row);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        assert.equal(message.includes("BASELINE_NOT_AVAILABLE"), false, `${row.full_name} ${pos}: ${message}`);
        throw error;
      }
      assert.equal(task.locked_baseline_file, entry.baseline_file, row.full_name);
      seen.add(pos);
    }
    for (const pos of ["CB", "DT", "FS", "SS", "C", "K", "P"]) assert.equal(seen.has(pos), true);
  });

  test("missing lock file falls back to position.json and nowhere else", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "baseline-lock-"));
    try {
      const legacy = {
        status: "LOCKED",
        position: "ZZ",
        top_10: [{ rank: 1, player: "Fallback" }],
        last_in: "Fallback",
        first_out: null,
        external_controls: [],
        scarcity: {}
      };
      const locked = {
        ...legacy,
        top_10: [{ rank: 1, player: "Locked" }],
        last_in: "Locked"
      };
      const lockRel = "data/baselines/ZZ.reaudit-20261104.json";
      writeBaseline(root, "data/baselines/ZZ.json", legacy);
      fs.mkdirSync(path.join(root, "state"), { recursive: true });
      fs.writeFileSync(path.join(root, "state", "locks.json"), JSON.stringify({
        positions: { ZZ: { status: "LOCKED", baseline_file: lockRel } }
      }));

      assert.equal(resolveLockedBaselineFile("ZZ", root), "data/baselines/ZZ.json");
      assert.deepEqual(loadBaselineControls("ZZ", root).top_10, legacy.top_10);
      assert.equal(buildPlayerAuditTask(player("ZZ"), root).locked_baseline_file, "data/baselines/ZZ.json");

      writeBaseline(root, lockRel, locked);
      assert.equal(resolveLockedBaselineFile("ZZ", root), lockRel);
      assert.deepEqual(loadBaselineControls("ZZ", root).top_10, locked.top_10);
      assert.equal(buildPlayerAuditTask(player("ZZ"), root).locked_baseline_file, lockRel);

      writeBaseline(root, lockRel, { ...locked, status: "PROPOSED" });
      assert.equal(resolveLockedBaselineFile("ZZ", root), lockRel);
      assert.throws(() => loadBaselineControls("ZZ", root), /Baseline ZZ is not locked/);
      assert.throws(() => buildPlayerAuditTask(player("ZZ"), root), /BASELINE_NOT_LOCKED/);

      fs.rmSync(path.join(root, lockRel));
      fs.rmSync(path.join(root, "data/baselines/ZZ.json"));
      assert.equal(resolveLockedBaselineFile("ZZ", root), null);
      assert.throws(() => loadBaselineControls("ZZ", root), /No baseline file for ZZ/);
      assert.throws(() => buildPlayerAuditTask(player("ZZ"), root), /BASELINE_NOT_AVAILABLE/);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
}
