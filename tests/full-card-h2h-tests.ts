import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { applicableAttributes, deriveOverall, emptyProfile, isRankShapedDisplay, summarizeProfile, validateProfile, type AttributeCell } from "../src/gs-attribute-card.js";
import { EDITORIAL_CORRECTIONS, readIncomingAudit } from "../src/h2h-audit.js";

function hash(file: string): string {
  return createHash("sha256").update(fs.readFileSync(path.resolve(file))).digest("hex");
}

function rated(attribute: string, value: number): AttributeCell {
  return {
    attribute,
    status: "RATED",
    value,
    band: "starter",
    confidence: "MEDIUM",
    claim: "Sourced trait judgment for this exact attribute, not an overall target.",
    sources: [{ url: "https://www.pff.com/example", retrieved_at: "2026-11-06T00:00:00Z", publisher: "PFF" }]
  };
}

export function runFullCardH2HTests(test: (name: string, fn: () => void) => void): void {
  test("role attributes stay specific and an unrated trait is not zero", () => {
    const kicker = applicableAttributes("K");
    assert.deepEqual(kicker, ["KPW", "KAC", "AWR", "INJ", "STA", "TGH"]);
    assert.equal(kicker.includes("MCV"), false);
    const fb = applicableAttributes("FB");
    assert.ok(fb.includes("RBK") && fb.includes("PBK"));
    assert.equal(fb.includes("DAC"), false);
    const ls = applicableAttributes("LS");
    assert.ok(ls.includes("AWR") && ls.includes("TAK"));
    assert.equal(ls.includes("KPW"), false);
    const shell = emptyProfile("QB");
    assert.ok(shell.every(cell => cell.status === "UNRATED" && cell.value === null));
    assert.ok(validateProfile("QB", shell.map(cell => cell.attribute === "SPD" ? { ...cell, value: 0 } : cell)).includes("UNRATED_DISGUISED_AS_ZERO:SPD"));
    assert.ok(validateProfile("K", [...emptyProfile("K"), rated("MCV", 80)]).includes("IRRELEVANT_ATTRIBUTE:MCV"));
  });

  test("overall comes from a complete profile and rejects a rank or target", () => {
    const applicable = applicableAttributes("K");
    const cells = applicable.map((attribute, index) => rated(attribute, 70 + index));
    const summary = summarizeProfile(cells, applicable);
    assert.equal(summary.status, "UNCALIBRATED_PROFILE_MEDIAN");
    assert.equal(summary.not_a_validated_ovr, true);
    assert.equal(summary.not_fit_to_rank, true);
    const moved = summarizeProfile(cells.map(cell => cell.attribute === "KAC" ? { ...cell, value: 99 } : cell), applicable);
    assert.notEqual(moved.profile_summary, summary.profile_summary);
    assert.equal(summarizeProfile(emptyProfile("K"), applicable).profile_summary, null);
    assert.throws(() => deriveOverall({ cells, applicable, rank: 1 } as { cells: AttributeCell[]; applicable: string[] }), /OVERALL_INPUT_REJECTED:rank/);
    assert.throws(() => deriveOverall({ cells, applicable, targetOverall: 92 } as { cells: AttributeCell[]; applicable: string[] }), /OVERALL_INPUT_REJECTED:targetOverall/);
    const display = [
      { rank: 1, overall: 92 },
      { rank: 2, overall: 90 },
      { rank: 3, overall: 89 }
    ];
    assert.equal(isRankShapedDisplay(display), true);
    assert.notEqual(summary.profile_summary, 92);
  });

  test("attached H2H packet is audited and no full card or locked file is replaced", () => {
    const baseline = hash("data/baselines/QB.reaudit-20261104.json");
    const phi = hash("data/roster/phi-full-ratings-import.json");
    const dal = hash("data/roster/dal-full-ratings-import.json");
    const { h2h, queue } = readIncomingAudit();
    assert.equal(h2h.boards, 22);
    assert.equal(h2h.required_edges, 220);
    assert.equal(h2h.analyst_orders_are, "EDITORIAL_PROPOSAL_NOT_A_VALIDATED_BOARD");
    assert.equal(h2h.replaces_locked_files, false);
    for (const board of h2h.positions) {
      assert.equal(board.required, 10);
      assert.equal(board.supports + board.low_recorded + board.missing + board.contradicts + board.invalid, 10);
      assert.equal(board.accepted_as_validated_board, false);
      assert.equal(board.engine_supportable, board.supports === 10);
    }
    assert.equal(h2h.engine_supportable_boards.includes("LS"), false);
    assert.equal(queue.complete_profiles, 0);
    assert.equal(queue.queued_players, 242);
    assert.equal(queue.overalls_derived, 0);
    const warren = EDITORIAL_CORRECTIONS.find(row => row.player === "Jaylen Warren")!;
    const walker = EDITORIAL_CORRECTIONS.find(row => row.player === "Kenneth Walker III")!;
    assert.equal(warren.source_editorial_display_ovr, 92);
    assert.equal(warren.corrected_editorial_display_ovr, 91);
    assert.equal(warren.accepted_as_full_card, false);
    assert.equal(walker.corrected_editorial_display_ovr, 90);
    assert.equal(walker.accepted_as_full_card, false);
    const rb = queue.positions.find(position => position.position === "RB")!;
    assert.equal(rb.players.find(player => player.player === "Jaylen Warren")?.editorial_display_ovr, 91);
    assert.equal(rb.players.find(player => player.player === "Kenneth Walker III")?.editorial_display_ovr, 90);
    assert.equal(rb.players.every(player => player.overall === null && player.rated === 0), true);
    const savedH2H = JSON.parse(fs.readFileSync(path.resolve("data/reaudit-proposals/t115u-h2h-audit.json"), "utf8"));
    assert.equal(savedH2H.required_edges, h2h.required_edges);
    assert.deepEqual(savedH2H.engine_supportable_boards, h2h.engine_supportable_boards);
    assert.equal(hash("data/baselines/QB.reaudit-20261104.json"), baseline);
    assert.equal(hash("data/roster/phi-full-ratings-import.json"), phi);
    assert.equal(hash("data/roster/dal-full-ratings-import.json"), dal);
  });
}
