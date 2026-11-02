import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NflverseRosterSource } from "../src/nflverse-roster-source.js";
import { refreshRoster } from "../src/roster-refresh.js";

type T = (name: string, fn: () => void | Promise<void>) => void;

const CSV = "full_name,team,position,depth_chart_position,gsis_id\nOld Guy,NYG,C,C,00-1\nNew Guy,DAL,C,C,00-2\nKick Er,DAL,K,K,00-3\n";
function tmpRegistry(): { dir: string; reg: string; csv: string } {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "roster-"));
  const reg = path.join(dir, "registry.json"); const csv = path.join(dir, "roster.csv");
  fs.writeFileSync(reg, JSON.stringify({ players: [{ player_id: "ext_00-1", full_name: "Old Guy", team: "PHI", position: "C", current_audit_id: "KEEP" }] }));
  fs.writeFileSync(csv, CSV);
  return { dir, reg, csv };
}

export async function runRosterRefreshTests(test: T) {
  await test("roster:refresh offline --add-only never modifies existing players", async () => {
    const { reg, csv } = tmpRegistry();
    const r = await refreshRoster(new NflverseRosterSource(2026, csv), { addOnly: true, registryPath: reg });
    const players = JSON.parse(fs.readFileSync(reg, "utf8")).players;
    const old = players.find((p: any) => p.full_name === "Old Guy");
    assert.equal(old.team, "PHI"); assert.equal(old.current_audit_id, "KEEP");
    assert.equal(r.added, 2); assert.equal(r.updated, 0); assert.equal(r.skipped_existing, 1);
  });
  await test("roster:refresh --dry-run writes nothing; --positions filters additions", async () => {
    const { reg, csv } = tmpRegistry(); const before = fs.readFileSync(reg, "utf8");
    const r = await refreshRoster(new NflverseRosterSource(2026, csv), { addOnly: true, dryRun: true, positions: ["K"], registryPath: reg });
    assert.equal(fs.readFileSync(reg, "utf8"), before); assert.equal(r.added, 1);
  });
}
