import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { auditProposalPack, loadProposalPack, pageManifest } from "../src/proposal-pack.js";

function hash(file: string): string {
  return createHash("sha256").update(fs.readFileSync(path.resolve(file))).digest("hex");
}

export function runProposalPackTests(test: (name: string, fn: () => void) => void): void {
  test("proposal pack counts match the raw file and stay unapproved", () => {
    const baseline = hash("data/baselines/QB.reaudit-20261104.json");
    const phi = hash("data/roster/phi-full-ratings-import.json");
    const dal = hash("data/roster/dal-full-ratings-import.json");
    const pack = loadProposalPack();
    const audit = auditProposalPack(pack);
    assert.equal(pack.new_acceptance, false);
    assert.equal(pack.approval, null);
    assert.equal(pack.global_pass_boolean, false);
    assert.equal(pack.structural_blocking_clean, true);
    assert.equal(audit.players, 242);
    assert.equal(audit.boards, 22);
    assert.equal(audit.complete, 200);
    assert.equal(audit.partial, 42);
    assert.equal(audit.queued, 0);
    assert.equal(audit.cells, 3861);
    assert.equal(audit.populated_cells, 3756);
    assert.equal(audit.unknown_cells, 105);
    assert.equal(audit.sources, 391);
    assert.equal(audit.h2h_records, 220);
    assert.equal(audit.unresolved_source_ids, 0);
    assert.equal(audit.cell_urls_missing_from_registry, 0);
    assert.equal(audit.id_url_mismatches, 0);
    assert.equal(audit.median_mismatches, 0);
    assert.equal(audit.schema.formulas_applied, false);
    assert.equal(audit.schema.garbled, false);
    assert.equal(audit.schema.cell_sources, "string_urls");
    assert.equal(pack.totals.complete, 200);
    assert.equal(pack.warren_correction.corrected_editorial_display_ovr, 91);
    assert.equal(pack.warren_correction.walker_stays, 90);
    for (const board of Object.values(pack.boards)) assert.equal(board.h2hs.length, 10);
    assert.equal(pack.boards.FB.proposed_order, null);
    assert.equal(pack.boards.LS.proposed_order, null);
    const walker = pack.boards.RB.players.find(player => player.name === "Kenneth Walker III")!;
    const warren = pack.boards.RB.players.find(player => player.name === "Jaylen Warren")!;
    assert.deepEqual(pack.boards.RB.proposed_order?.slice(0, 2), ["Kenneth Walker III", "Jaylen Warren"]);
    assert.equal(walker.editorial_display_ovr, 90);
    assert.equal(warren.editorial_display_ovr, 91);
    assert.equal(walker.overall_median_display, 84);
    assert.equal(warren.overall_median_display, 82);
    assert.equal(walker.overall_is_not_ranked_ovr, true);
    assert.equal(pack.boards.RB.editorial_vs_proposed_rank_conflict.is_nonincreasing_on_known, false);
    assert.equal(pack.boards.LT.board_status.board_solid, false);
    assert.equal(pack.boards.LT.board_status.medium_plus_links, 2);
    assert.equal(pack.boards.REDGE.board_status.medium_plus_links, 1);
    assert.equal(pack.boards.REDGE.h2hs.some(link => link.verdict === "Lower"), false);
    assert.ok(audit.low_h2h > 0);
    assert.equal(audit.low_treated_as_board_deciding, false);
    const manifest = pageManifest(pack, audit);
    assert.equal(manifest.accepted_as_lock, false);
    assert.equal(manifest.gaps.incomplete_players, 42);
    assert.equal(manifest.gaps.unknown_cells, 105);
    assert.equal(manifest.boards.length, 22);
    assert.equal(manifest.boards.reduce((sum, board) => sum + board.players.reduce((inner, player) => inner + player.cells.length, 0), 0), 3861);
    assert.equal(Object.keys(manifest.sources).length, 391);
    assert.equal(hash("data/baselines/QB.reaudit-20261104.json"), baseline);
    assert.equal(hash("data/roster/phi-full-ratings-import.json"), phi);
    assert.equal(hash("data/roster/dal-full-ratings-import.json"), dal);
  });
}