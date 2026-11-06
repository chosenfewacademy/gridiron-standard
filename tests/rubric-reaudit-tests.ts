import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { auditRubric } from "../src/rubric-audit.js";
import { buildLeagueReaudit, comparisonErrors, loadLockedBoards, rerankBoard, type EvidenceWindow, type SourcedComparison } from "../src/top10-rerank.js";

function hash(file: string): string {
  return createHash("sha256").update(fs.readFileSync(path.resolve(file))).digest("hex");
}

function blend(share2026 = 0.62, share2025 = 0.38): EvidenceWindow {
  return {
    role: "blended_established",
    current: { season: 2026, through_week: 8, share: share2026 },
    prior: { season: 2025, share: share2025, completed: true },
    rationale: "2026 through Week 8 is the larger share; completed 2025 is context for sustainability only."
  };
}

function comparison(over: Partial<SourcedComparison> = {}): SourcedComparison {
  return {
    position: "QB",
    better: "Player B",
    worse: "Player A",
    claim: "Current-season primary evidence puts B ahead of A at this trait.",
    sources: [{ url: "https://www.pff.com/example", retrieved_at: "2026-11-06T00:00:00Z", publisher: "PFF" }],
    evidence_window: { season: 2026, role: "current_primary" },
    sample: { snaps_or_plays: 400, role: "starter", adequate: true },
    uncertainty: "MEDIUM",
    ...over
  };
}

export function runRubricReauditTests(test: (name: string, fn: () => void) => void): void {
  test("rubric audit records the open gaps and does not treat Madden weights as ours", () => {
    const audit = auditRubric();
    assert.ok(audit.open_gaps.includes("evidence_window"));
    assert.ok(audit.open_gaps.includes("position_weights"));
    assert.ok(audit.open_gaps.includes("sample_size_role"));
    assert.equal(audit.checks.includes("estimated Madden weights are marked verified"), false);
    assert.equal(fs.readFileSync(path.resolve("src/top10-rerank.ts"), "utf8").includes("madden-ovr-weights"), false);
  });

  test("a locked order is not re-affirmed or used as a tiebreak without sourced evidence", () => {
    const board = loadLockedBoards().find(row => row.position === "QB")!;
    assert.equal(board.top_10.length, 10);
    assert.ok(board.first_out);
    const before = hash(board.baseline_file);
    const empty = rerankBoard(board, []);
    assert.equal(empty.status, "EVIDENCE_GAP");
    assert.equal(empty.proposed_order, null);
    assert.equal(empty.historical_order_is_current, false);
    assert.deepEqual(empty.historical_order, board.top_10);
    const unverified = rerankBoard(board, [comparison({
      better: board.top_10[1],
      worse: board.top_10[0],
      evidence_window: { season: 2025, role: "prior_context" },
      uncertainty: "LOW",
      ea_used_as_rating: true,
      sources: [{ url: "https://www.ea.com/games/madden-nfl/ratings", retrieved_at: "2026-11-06", publisher: "EA" }]
    })]);
    assert.equal(unverified.proposed_order, null);
    assert.equal(unverified.supported_moves.length, 0);
    assert.ok(unverified.unverified[0].errors.includes("PRIOR_CONTEXT_CANNOT_REORDER"));
    assert.ok(unverified.unverified[0].errors.includes("EA_RATING_IS_NOT_OURS"));
    assert.ok(unverified.unverified[0].errors.includes("EA_SOURCE_IS_NOT_EVIDENCE"));
    assert.ok(unverified.unverified[0].errors.includes("LOW_CONFIDENCE_CANNOT_MOVE_A_RANK"));
    const pair = rerankBoard(board, [comparison({ better: board.top_10[9], worse: board.top_10[0] })]);
    assert.equal(pair.status, "PARTIAL");
    assert.equal(pair.proposed_order, null);
    assert.deepEqual(pair.supported_moves, [{ better: board.top_10[9], worse: board.top_10[0] }]);
    const conflict = rerankBoard(board, [
      comparison({ better: "A", worse: "B" }),
      comparison({ better: "B", worse: "A" })
    ]);
    assert.equal(conflict.status, "EVIDENCE_CONFLICT");
    assert.equal(conflict.proposed_order, null);
    assert.equal(hash(board.baseline_file), before);
  });

  test("sourced comparisons can replace a locked order and still reject a PFF grade used as the rank", () => {
    const names = Array.from({ length: 10 }, (_, i) => `P${i + 1}`);
    const board = { position: "RB", baseline_file: "unused", locked_at: null, top_10: [...names].reverse(), first_out: "OUT", challengers: ["OUT"] };
    const rows: SourcedComparison[] = [];
    for (let i = 0; i < 9; i++) rows.push(comparison({ position: "RB", better: names[i], worse: names[i + 1] }));
    rows.push(comparison({ position: "RB", better: names[9], worse: "OUT" }));
    const ranked = rerankBoard(board, rows);
    assert.equal(ranked.status, "EVIDENCE_SUPPORTED");
    assert.deepEqual(ranked.proposed_order, names);
    assert.notDeepEqual(ranked.proposed_order, board.top_10);
    assert.ok(comparisonErrors(comparison({ pff_used_as_rank: true })).includes("PFF_GRADE_IS_NOT_A_RANK"));
    assert.ok(comparisonErrors(comparison({ trait_tier: 99 })).includes("NINETY_NINE_NEEDS_GENERATIONAL_SUPPORT"));
    assert.deepEqual(comparisonErrors(comparison({ trait_tier: 99, scarcity_support: "Historic season, cited below." })), []);
    assert.ok(comparisonErrors(comparison({ sample: { snaps_or_plays: 12, role: "reserve", adequate: false } })).includes("SAMPLE_NOT_ADEQUATE"));
    const blended = rows.map(row => comparison({ ...row, evidence_window: blend() }));
    assert.equal(rerankBoard(board, blended).status, "EVIDENCE_SUPPORTED");
    assert.deepEqual(rerankBoard(board, blended).proposed_order, names);
  });

  test("a declared 2026-through-week-8 blend can reorder, and 2025 alone cannot", () => {
    assert.deepEqual(comparisonErrors(comparison({ evidence_window: blend() })), []);
    assert.ok(comparisonErrors(comparison({ evidence_window: { season: 2025, role: "current_primary" } })).includes("PRIOR_CONTEXT_CANNOT_REORDER"));
    assert.ok(comparisonErrors(comparison({ evidence_window: { ...blend(), rationale: "too short" } })).includes("BLEND_RATIONALE_REQUIRED"));
    assert.ok(comparisonErrors(comparison({ evidence_window: blend(0.4, 0.6) })).includes("CURRENT_SEASON_NOT_PRIMARY"));
    assert.ok(comparisonErrors(comparison({
      evidence_window: { role: "blended_established", prior: { season: 2025, share: 1, completed: true }, rationale: "Completed 2025 is the whole window and current season is absent." }
    })).includes("BLEND_REQUIRES_CURRENT_AND_PRIOR"));
    const low = comparisonErrors(comparison({ evidence_window: blend(), uncertainty: "LOW", sources: [] }));
    assert.ok(low.includes("LOW_CONFIDENCE_CANNOT_MOVE_A_RANK"));
    assert.ok(low.includes("SOURCE_REQUIRED"));
  });

  test("adjacent pairs count when they strictly order ten plus the first-out, and disjoint pairs stay unresolved", () => {
    const names = Array.from({ length: 10 }, (_, i) => `P${i + 1}`);
    const board = { position: "WR", baseline_file: "unused", locked_at: null, top_10: [...names].reverse(), first_out: "OUT", challengers: ["OUT"] };
    const adjacent = names.slice(0, -1).map((name, i) => comparison({ position: "WR", better: name, worse: names[i + 1] }));
    adjacent.push(comparison({ position: "WR", better: "P10", worse: "BETWEEN" }));
    adjacent.push(comparison({ position: "WR", better: "BETWEEN", worse: "OUT" }));
    const ranked = rerankBoard(board, adjacent);
    assert.equal(ranked.status, "EVIDENCE_SUPPORTED");
    assert.deepEqual(ranked.proposed_order, names);
    const disjoint: SourcedComparison[] = [];
    for (let i = 0; i < 10; i += 2) disjoint.push(comparison({ position: "WR", better: names[i], worse: names[i + 1] }));
    disjoint.push(comparison({ position: "WR", better: "P10", worse: "OUT" }));
    const broken = rerankBoard(board, disjoint);
    assert.equal(broken.status, "EVIDENCE_CONFLICT");
    assert.equal(broken.proposed_order, null);
    assert.ok(broken.gaps.some(gap => gap.startsWith("Unresolved ties")));
  });

  test("league coverage is 22 boards and 220 historical slots, with no invented re-rank", () => {
    const hashes = new Map(loadLockedBoards().map(board => [board.baseline_file, hash(board.baseline_file)]));
    const report = buildLeagueReaudit();
    assert.equal(report.explicit_current_data_reaudit, true);
    assert.equal(report.replaces_locked_files, false);
    assert.equal(report.positions_requested, 22);
    assert.equal(report.top10_slots, 220);
    assert.equal(report.first_outs, 22);
    assert.ok(report.challengers > 22);
    assert.equal(report.evidence_supported_orders, 0);
    assert.equal(report.evidence_gaps, 22);
    for (const board of report.positions) {
      assert.equal(board.status, "EVIDENCE_GAP");
      assert.equal(board.proposed_order, null);
      assert.equal(board.historical_order.length, 10);
      assert.equal(board.historical_order_is_current, false);
    }
    const saved = JSON.parse(fs.readFileSync(path.resolve("data/reaudit-proposals/t115u-coverage.json"), "utf8"));
    assert.equal(saved.top10_slots, 220);
    assert.equal(saved.evidence_gaps, 22);
    assert.deepEqual(saved.positions.map((board: { position: string }) => board.position), report.positions.map(board => board.position));
    for (const [file, digest] of hashes) assert.equal(hash(file), digest);
  });
}
