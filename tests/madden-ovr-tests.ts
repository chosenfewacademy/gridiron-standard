import assert from "node:assert/strict";
import { estimateOvr, backtest, suggestFix, loadWeights } from "../src/madden-ovr-check.js";
import { validateEntry } from "../src/ingame-validation.js";

export async function runMaddenOvrTests() {
  const w = loadWeights();
  assert.equal((w as any).verified, false);
  assert.equal((w as any).madden_order_verified, false);
  for (const [k, a] of Object.entries(w.archetypes)) assert.equal(Object.values(a.weights).reduce((s, x) => s + x, 0), 100, k);
  const bt = backtest();
  assert.ok(bt.length > 0 && bt.every(b => Math.abs(b.estimated - b.madden_ovr) <= 1), "backtest within 1 OVR");
  const flat: Record<string, number> = { THP: 90, SAC: 90, MAC: 90, DAC: 90, AWR: 90, RUN: 90, TUP: 90, PAC: 90, BSK: 90, SPD: 80, ACC: 80, COD: 80, BCV: 70, CAR: 70 };
  const e = estimateOvr("QB", flat, w);
  assert.ok((e.estimated_ovr as number) >= Math.round((90 - 46) * 99 / 50), "max over archetypes");
  const f = suggestFix("QB", flat, (e.estimated_ovr as number) - 3, w)!;
  assert.ok(f && (f.uniform_shift !== null || (f as any).round_robin_changes));
  assert.deepEqual(validateEntry({ player: "x", position: "QB", attributes_entered: {}, our_ovr: 80, in_game_ovr: 78, gap: -2, entered_at: "t", entered_by: "u" }), []);
  assert.ok(validateEntry({ player: "x", position: "QB", attributes_entered: {}, our_ovr: 80, in_game_ovr: 78, gap: 2, entered_at: "t", entered_by: "u" }).length > 0);
  console.log("PASS madden ovr pre-check tests");
}
