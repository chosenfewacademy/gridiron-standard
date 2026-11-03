import assert from "node:assert/strict";
import { loadWeeklyConfig, validateWeeklyProposal, capsFor, shrinkK, swappedPairs } from "../src/weekly-update.js";
export function runWeeklyUpdateTests(test: (n: string, f: () => void) => void): void {
  const cfg = loadWeeklyConfig();
  const keep = Object.fromEntries(cfg.keep_checks.map((k: string) => [k, true]));
  const p = (o: any) => ({ player: "A", baseline_ovr: 85, prior_week_ovr: 85, proposed_ovr: 85, rationale: "r", ...o });
  const W = (players: any[], extra: any = {}) => ({ position: "QB", season: 2026, week: 10, status: "PROPOSED", prior_order: ["A", "B"], proposed_order: ["A", "B"], players, checks: keep, ...extra });
  test("weekly: base cap ±1 OVR / ±2 attr blocks one-week overreaction", () => {
    assert.deepEqual(validateWeeklyProposal(cfg, W([p({ proposed_ovr: 86 })])), []);
    assert.ok(validateWeeklyProposal(cfg, W([p({ proposed_ovr: 87 })])).some(e => /exceeds base cap/.test(e)));
    assert.ok(validateWeeklyProposal(cfg, W([p({ attribute_changes: { THP: { from: 90, to: 93 } } })])).length === 1);
  });
  test("weekly: sustained 3+ weeks and injury/role events widen caps", () => {
    assert.equal(capsFor(cfg, p({ direction_streak_weeks: 3 })).ovr, 2);
    assert.equal(capsFor(cfg, p({ event: { reason: "injury", source_url: "x" } })).mode, "event");
    assert.ok(validateWeeklyProposal(cfg, W([p({ proposed_ovr: 81, event: { reason: "injury" } })])).some(e => /source_url/.test(e)));
  });
  test("weekly: rank swaps need H2H, checks required, never LOCKED, shrinkage grows", () => {
    assert.deepEqual(swappedPairs(["A", "B"], ["B", "A"]), [["A", "B"]]);
    assert.ok(validateWeeklyProposal(cfg, W([], { proposed_order: ["B", "A"] })).some(e => /head-to-head/.test(e)));
    assert.ok(validateWeeklyProposal(cfg, W([], { status: "LOCKED" })).some(e => /PROPOSED/.test(e)));
    assert.ok(validateWeeklyProposal(cfg, W([], { checks: {} })).length === cfg.keep_checks.length);
    assert.ok(shrinkK(cfg, 1) < shrinkK(cfg, 8));
  });
}
