import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  evaluateReadings,
  refuseGameResult,
  shockReadings,
  assertNoOutcomeAnchor,
  UNCALIBRATED_YARDS_PER_RATING_POINT,
  type AttributeReading
} from "../src/matchup-probability.js";
import {
  assertShockContract,
  outcomeIsAnchored,
  scanOutcomeSource,
  validateMechanismProposal
} from "../src/outcome-contract.js";
import {
  profilesTooSimilar,
  summarizeTemplateUse,
  validateTraitAssignment
} from "../src/rating-evidence-rules.js";
import { buildOutcomeReport } from "../src/rating-outcome-report.js";

interface Card {
  player_id: string;
  player_name: string;
  position: string;
  ovr: number;
  attributes: Record<string, number>;
  locked?: boolean;
  card_origin?: string;
  pool_role?: string;
}

const PHI_HASH = "cafa5f498f8b2eebaf7283d2760cfd6b5758db48d0e7924a72b94da771f54135";
const DAL_HASH = "675cc85a3fdd506928779c13d40a62ade86cfa9ba7af1f69e574e8d8253019ee";

function hashFile(file: string): string {
  return createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.resolve(file), "utf8")) as T;
}

function similarCount(cards: Card[]): number {
  const groups = new Map<string, Card[]>();
  for (const card of cards) {
    const list = groups.get(card.position) ?? [];
    list.push(card);
    groups.set(card.position, list);
  }
  let count = 0;
  for (const group of groups.values()) {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const keys = Object.keys(group[i].attributes).filter(key => typeof group[j].attributes[key] === "number");
        if (profilesTooSimilar(group[i].attributes, group[j].attributes, keys)) count++;
      }
    }
  }
  return count;
}

function runReadings(): AttributeReading[] {
  const phi = readJson<{ cards: Card[] }>("data/roster/phi-full-ratings-import.json");
  const dal = readJson<{ cards: Card[] }>("data/roster/dal-full-ratings-import.json");
  const card = (cards: Card[], name: string) => cards.find(row => row.player_name === name)!;
  const barkley = card(phi.cards, "Saquon Barkley");
  const bell = card(phi.cards, "Markel Bell");
  const steen = card(phi.cards, "Tyler Steen");
  const quinnen = card(dal.cards, "Quinnen Williams");
  return [
    { side: "offense", attribute: "RBK", value: bell.attributes.RBK, playerId: bell.player_id },
    { side: "offense", attribute: "RBP", value: bell.attributes.RBP, playerId: bell.player_id },
    { side: "offense", attribute: "RBK", value: steen.attributes.RBK, playerId: steen.player_id },
    { side: "offense", attribute: "RBP", value: steen.attributes.RBP, playerId: steen.player_id },
    { side: "offense", attribute: "BTK", value: barkley.attributes.BTK, playerId: barkley.player_id },
    { side: "offense", attribute: "TRK", value: barkley.attributes.TRK, playerId: barkley.player_id },
    { side: "offense", attribute: "SFA", value: barkley.attributes.SFA, playerId: barkley.player_id },
    { side: "offense", attribute: "BCV", value: barkley.attributes.BCV, playerId: barkley.player_id },
    { side: "defense", attribute: "PMV", value: quinnen.attributes.PMV, playerId: quinnen.player_id },
    { side: "defense", attribute: "BSH", value: quinnen.attributes.BSH, playerId: quinnen.player_id }
  ];
}

const PRE_FIX = `
# Base YPC target ~4.0 for PHI/Barkley (2025: 4.07)
base = 0.40 * A(p, 'RBK') + 0.25 * A(p, 'RBP')
base = base + pff_delta(pff_grade(team, p['player']), 70, 0.12)
if team == 'PHI':
    gap -= 1.00
if qb['player'] == 'Joe Milton III':
    cmp_p -= 0.08
    int_p += 0.02
if qb['player'] == 'Joe Milton III':
    note += 'holds'
`;

export function runRatingOutcomeTests(test: (name: string, fn: () => void) => void): void {
  test("canonical Philadelphia and Dallas cards stay byte-for-byte", () => {
    const phiPath = path.resolve("data/roster/phi-full-ratings-import.json");
    const dalPath = path.resolve("data/roster/dal-full-ratings-import.json");
    assert.equal(hashFile(phiPath), PHI_HASH);
    assert.equal(hashFile(dalPath), DAL_HASH);
    const phi = readJson<{ cards: Card[]; depth: { player_name: string; pos_abb: string; pos_rank: number }[] }>(phiPath);
    const dal = readJson<{ cards: Card[]; depth: { player_name: string }[] }>(dalPath);
    assert.equal(phi.cards.length, 46);
    assert.equal(phi.depth.length, 49);
    assert.equal(dal.cards.length, 51);
    assert.equal(dal.depth.length, 52);
    assert.equal(new Set(dal.depth.map(slot => slot.player_name)).size, 51);
    const qb1 = phi.depth.filter(slot => slot.pos_abb === "QB" && slot.pos_rank === 1);
    assert.deepEqual(qb1.map(slot => slot.player_name), ["Joe Milton III"]);
    const milton = phi.cards.find(card => card.player_name === "Joe Milton III")!;
    assert.equal(milton.position, "QB");
    assert.equal(milton.ovr, 64);
    assert.equal(hashFile(phiPath), PHI_HASH);
    assert.equal(hashFile(dalPath), DAL_HASH);
  });

  test("Dallas template fill and style clones are detected and not rewritten", () => {
    const dal = readJson<{ cards: Card[] }>("data/roster/dal-full-ratings-import.json");
    const phi = readJson<{ cards: Card[] }>("data/roster/phi-full-ratings-import.json");
    const created = dal.cards.filter(card => card.card_origin === "dal_team_audit" && !card.locked);
    const summary = summarizeTemplateUse(created);
    assert.equal(created.length, 40);
    assert.equal(dal.cards.filter(card => card.locked).length, 11);
    assert.equal(summary.template, 436);
    assert.equal(summary.attributes, 721);
    assert.ok(summary.share > 0.5);
    assert.equal(similarCount(created), 7);
    assert.equal(similarCount(phi.cards), 0);
  });

  test("a PFF grade, a template, or a role band cannot be saved as the attribute", () => {
    assert.ok(validateTraitAssignment(
      { PMV: 71 },
      [{ attribute: "PMV", kind: "pff_grade", grade: 70.6, claim: "2026 grade on 406 snaps" }]
    ).includes("PFF_GRADE_COPIED_ONTO_ATTRIBUTE:PMV"));
    assert.deepEqual(validateTraitAssignment(
      { PMV: 64 },
      [{ attribute: "PMV", kind: "cited_trait", claim: "Pass-rush production sits below the team grade." }]
    ), []);
    assert.ok(validateTraitAssignment(
      { RBK: 70 },
      [{ attribute: "RBK", kind: "template_offset", claim: "overall plus offset" }]
    ).includes("TEMPLATE_OFFSET_IS_NOT_EVIDENCE:RBK"));
    assert.ok(validateTraitAssignment(
      { AWR: 62 },
      [{ attribute: "AWR", kind: "role_band", claim: "band around overall" }]
    ).includes("ROLE_BAND_IS_NOT_A_TRAIT:AWR"));
    assert.ok(validateTraitAssignment(
      { THP: 90 },
      [{ attribute: "THP", kind: "estimated_madden_weight", claim: "shift to match estimated overall" }]
    ).includes("ESTIMATED_MADDEN_WEIGHT_IS_NOT_A_RATING_INPUT:THP"));
    assert.ok(validateTraitAssignment(
      { THP: 92 },
      [{ attribute: "THP", kind: "preserved_anchor", claim: "Already on the card." }]
    ).length === 0);
  });

  test("attribute shocks move the matching mechanism and leave the others fixed", () => {
    const before = hashFile(path.resolve("data/roster/phi-full-ratings-import.json"));
    const readings = runReadings();
    const baseline = evaluateReadings("run_yards", readings);
    const phi = readJson<{ cards: Card[] }>("data/roster/phi-full-ratings-import.json");
    const dal = readJson<{ cards: Card[] }>("data/roster/dal-full-ratings-import.json");
    const barkley = phi.cards.find(card => card.player_name === "Saquon Barkley")!;
    const bell = phi.cards.find(card => card.player_name === "Markel Bell")!;
    const steen = phi.cards.find(card => card.player_name === "Tyler Steen")!;
    const quinnen = dal.cards.find(card => card.player_name === "Quinnen Williams")!;
    const contact = evaluateReadings("run_yards", shockReadings(readings, barkley.player_id, ["BTK", "TRK", "SFA"], -15));
    const block = evaluateReadings("run_yards", shockReadings(
      shockReadings(readings, bell.player_id, ["RBK", "RBP"], 12),
      steen.player_id, ["RBK", "RBP"], 12
    ));
    const disrupt = evaluateReadings("run_yards", shockReadings(readings, quinnen.player_id, ["PMV", "BSH"], -20));
    const throwPower = evaluateReadings("run_yards", [
      ...readings,
      { side: "offense", attribute: "THP", value: 77, playerId: barkley.player_id }
    ]);
    assert.equal(baseline.intercept, 0);
    assert.equal(baseline.uncalibrated_expectation, baseline.margin * UNCALIBRATED_YARDS_PER_RATING_POINT);
    assert.equal(baseline.determines_winner, false);
    assert.equal(baseline.determines_final_score, false);
    assert.equal(baseline.primary_paths, 1);
    assert.equal("winner" in baseline, false);
    assert.equal("final_score" in baseline, false);
    assertShockContract([
      { id: "barkley_contact_-15", baseline: baseline.margin, shocked: contact.margin, direction: "down" },
      { id: "phi_right_ol_+12", baseline: baseline.margin, shocked: block.margin, direction: "up" },
      { id: "quinnen_disrupt_-20", baseline: baseline.margin, shocked: disrupt.margin, direction: "up" },
      { id: "throw_power_on_run", baseline: baseline.margin, shocked: throwPower.margin, direction: "flat" }
    ]);
    assert.equal(outcomeIsAnchored(baseline.margin, [contact.margin, block.margin, disrupt.margin]), false);
    assert.equal(hashFile(path.resolve("data/roster/phi-full-ratings-import.json")), before);

    const milton = phi.cards.find(card => card.player_name === "Joe Milton III")!;
    const dak = dal.cards.find(card => card.player_name === "Dak Prescott")!;
    const coverage: AttributeReading[] = [
      { side: "defense", attribute: "MCV", value: 78, playerId: "coverage" },
      { side: "defense", attribute: "ZCV", value: 76, playerId: "coverage" }
    ];
    const passing: AttributeReading[] = [
      { side: "offense", attribute: "SAC", value: milton.attributes.SAC, playerId: milton.player_id },
      { side: "offense", attribute: "MAC", value: milton.attributes.MAC, playerId: milton.player_id },
      { side: "offense", attribute: "DAC", value: milton.attributes.DAC, playerId: milton.player_id },
      { side: "offense", attribute: "AWR", value: milton.attributes.AWR, playerId: milton.player_id },
      ...coverage
    ];
    const passBaseline = evaluateReadings("completion", passing);
    const accurate = evaluateReadings("completion", shockReadings(passing, milton.player_id, ["SAC", "MAC", "DAC"], 10));
    const arm = evaluateReadings("completion", [
      ...passing,
      { side: "offense", attribute: "THP", value: 77, playerId: milton.player_id }
    ]);
    const dakPass: AttributeReading[] = [
      { side: "offense", attribute: "SAC", value: dak.attributes.SAC, playerId: dak.player_id },
      { side: "offense", attribute: "MAC", value: dak.attributes.MAC, playerId: dak.player_id },
      { side: "offense", attribute: "DAC", value: dak.attributes.DAC, playerId: dak.player_id },
      { side: "offense", attribute: "AWR", value: dak.attributes.AWR, playerId: dak.player_id },
      ...coverage
    ];
    const dakBaseline = evaluateReadings("completion", dakPass);
    const dakAware = evaluateReadings("completion", shockReadings(dakPass, dak.player_id, ["AWR"], -15));
    assertShockContract([
      { id: "milton_acc_+10", baseline: passBaseline.success_probability!, shocked: accurate.success_probability!, direction: "up" },
      { id: "milton_thp_77", baseline: passBaseline.success_probability!, shocked: arm.success_probability!, direction: "flat" },
      { id: "dak_awr_-15", baseline: dakBaseline.success_probability!, shocked: dakAware.success_probability!, direction: "down" }
    ]);
    const deep = evaluateReadings("deep_throw", [
      { side: "offense", attribute: "THP", value: milton.attributes.THP, playerId: milton.player_id },
      { side: "offense", attribute: "DAC", value: milton.attributes.DAC, playerId: milton.player_id },
      { side: "defense", attribute: "SPD", value: 90, playerId: "coverage" },
      { side: "defense", attribute: "ZCV", value: 84, playerId: "coverage" }
    ]);
    const deeper = evaluateReadings("deep_throw", [
      { side: "offense", attribute: "THP", value: milton.attributes.THP + 5, playerId: milton.player_id },
      { side: "offense", attribute: "DAC", value: milton.attributes.DAC, playerId: milton.player_id },
      { side: "defense", attribute: "SPD", value: 90, playerId: "coverage" },
      { side: "defense", attribute: "ZCV", value: 84, playerId: "coverage" }
    ]);
    assert.ok(deeper.success_probability! > deep.success_probability!);

    const mailata = phi.cards.find(card => card.player_name === "Jordan Mailata")!;
    const protection: AttributeReading[] = [
      { side: "offense", attribute: "PBK", value: mailata.attributes.PBK, playerId: mailata.player_id },
      { side: "offense", attribute: "PBP", value: mailata.attributes.PBP, playerId: mailata.player_id },
      { side: "offense", attribute: "PBF", value: mailata.attributes.PBF, playerId: mailata.player_id },
      { side: "defense", attribute: "FMV", value: 80, playerId: "rusher" },
      { side: "defense", attribute: "PMV", value: 78, playerId: "rusher" }
    ];
    const held = evaluateReadings("pass_protection", protection);
    const stronger = evaluateReadings("pass_protection", shockReadings(protection, mailata.player_id, ["PBK"], 5));
    const kickerNoise = evaluateReadings("pass_protection", [
      ...protection,
      { side: "offense", attribute: "KPW", value: 99, playerId: mailata.player_id }
    ]);
    assert.ok(stronger.success_probability! > held.success_probability!);
    assert.equal(kickerNoise.success_probability, held.success_probability);

    const scramble = evaluateReadings("scramble", [
      { side: "offense", attribute: "SPD", value: milton.attributes.SPD, playerId: milton.player_id },
      { side: "offense", attribute: "ACC", value: milton.attributes.ACC, playerId: milton.player_id },
      { side: "offense", attribute: "RUN", value: milton.attributes.RUN, playerId: milton.player_id }
    ]);
    const moreAthletic = evaluateReadings("scramble", shockReadings([
      { side: "offense", attribute: "SPD", value: milton.attributes.SPD, playerId: milton.player_id },
      { side: "offense", attribute: "ACC", value: milton.attributes.ACC, playerId: milton.player_id },
      { side: "offense", attribute: "RUN", value: milton.attributes.RUN, playerId: milton.player_id }
    ], milton.player_id, ["SPD", "ACC", "RUN"], 8));
    assert.ok(moreAthletic.success_probability! > scramble.success_probability!);
    assert.equal(JSON.stringify(scramble).includes("Joe Milton"), false);
  });

  test("name, team, PFF, and yardage targets are rejected instead of stacked", () => {
    assert.throws(() => assertNoOutcomeAnchor({ player: "Joe Milton III", targetYpc: 4.07 }), /OUTCOME_ANCHOR_REJECTED/);
    assert.throws(() => assertNoOutcomeAnchor({ team: "PHI" }), /OUTCOME_ANCHOR_REJECTED/);
    assert.throws(() => refuseGameResult(), /MATCHUP_DOES_NOT_DETERMINE_WINNER_OR_FINAL_SCORE/);
    assert.throws(() => evaluateReadings("run_yards", [
      { side: "offense", attribute: "RBK", value: 70, playerId: "ol", source: "pff_grade" as "gs_attribute" }
    ]), /STACKED_SIGNAL/);
    assert.throws(() => evaluateReadings("run_yards", [
      { side: "offense", attribute: "BTK", value: 80, playerId: "runner" },
      { side: "offense", attribute: "BTK", value: 80, playerId: "runner" },
      { side: "defense", attribute: "PMV", value: 80, playerId: "dt" }
    ]), /REPEATED_SIGNAL/);
    const clean = validateMechanismProposal({
      id: "run",
      paths: [{ kind: "gs_attribute", key: "BTK" }, { kind: "gs_attribute", key: "PMV" }]
    });
    assert.deepEqual(clean, []);
    const stacked = validateMechanismProposal({
      id: "run",
      paths: [
        { kind: "gs_attribute", key: "RBK" },
        { kind: "pff_grade", key: "overall" },
        { kind: "player_name", key: "Joe Milton III" },
        { kind: "team", key: "PHI" }
      ],
      targetYards: 4.07
    });
    assert.ok(stacked.includes("REPEATED_PLAYER_OR_TEAM_SIGNAL"));
    assert.ok(stacked.includes("NAME_OR_TEAM_STACK"));
    assert.ok(stacked.includes("FIXED_OUTCOME_TARGET"));
    assert.throws(() => assertShockContract([
      { id: "pinned_ypc", baseline: 4.07, shocked: 4.07, direction: "down" }
    ]), /ANCHORED_OUTCOME/);
    assert.equal(outcomeIsAnchored(4.05, [4.05, 4.05, 4.05]), true);
    const findings = scanOutcomeSource(PRE_FIX);
    assert.ok(findings.some(finding => finding.id === "YARDAGE_TARGET"));
    assert.ok(findings.some(finding => finding.id === "TEAM_GAP_PENALTY"));
    assert.ok(findings.some(finding => finding.id === "NAME_RATE_ADJUSTMENT"));
    assert.ok(findings.some(finding => finding.id === "STACKED_PFF_AND_ATTRIBUTE"));
    const noteOnly = scanOutcomeSource("if qb['player'] == 'Joe Milton III':\n    note += 'holds'\n");
    assert.equal(noteOnly.some(finding => finding.id === "NAME_RATE_ADJUSTMENT"), false);
    for (const file of ["src/matchup-probability.ts", "src/rating-evidence-rules.ts", "src/historical-dal-template.ts"]) {
      const source = fs.readFileSync(path.resolve(file), "utf8");
      assert.deepEqual(scanOutcomeSource(source), []);
      assert.equal(source.includes("4.07"), false);
      assert.equal(source.includes("5.63"), false);
      assert.equal(source.includes("0.826"), false);
      assert.equal(source.includes("1.35"), false);
    }
  });

  test("local 800-game evidence shows the old pin and is not a calibration target", () => {
    const pre = readJson<Record<string, { bark_ypc: number; milton_cmp?: number; dak_cmp?: number; wp: { DAL: number } }>>(
      "tests/fixtures/local-outcome-audit/audit-sensitivity-baseline.json"
    );
    const post = readJson<Record<string, { bark_ypc: number; milton_cmp?: number; dak_cmp?: number; wp: { PHI: number; DAL: number } }>>(
      "tests/fixtures/local-outcome-audit/audit-sensitivity-post.json"
    );
    assert.ok(Math.abs(pre["phi_right_ol_+12"].bark_ypc - pre.baseline.bark_ypc) < 0.02);
    assert.ok(Math.abs(pre["barkley_contact_-15"].bark_ypc - pre.baseline.bark_ypc) < 0.1);
    assert.ok(post["barkley_contact_-15"].bark_ypc < post.baseline.bark_ypc);
    assert.ok(post["phi_right_ol_+12"].bark_ypc > post.baseline.bark_ypc);
    assert.ok(post["quinnen_disrupt_-20"].bark_ypc > post.baseline.bark_ypc);
    assert.ok(post["milton_acc_+10"].milton_cmp! > post.baseline.milton_cmp!);
    assert.ok(Math.abs(post["milton_thp_77"].milton_cmp! - post.baseline.milton_cmp!) < 0.01);
    assert.ok(post["dak_awr_-15"].dak_cmp! < post.baseline.dak_cmp!);
    assert.equal(pre.baseline.wp.DAL, 0.963);
    assert.equal(post.baseline.wp.DAL, 0.826);
    assert.equal(post.baseline.bark_ypc, 5.63);
    const ours = evaluateReadings("run_yards", runReadings());
    assert.equal(ours.success_probability, undefined);
    assert.ok(Math.abs(ours.uncalibrated_expectation! - post.baseline.bark_ypc) > 1);
    assert.notEqual(ours.uncalibrated_expectation, post.baseline.wp.DAL);
    assert.notEqual(ours.uncalibrated_expectation, pre.baseline.wp.DAL);
    const report = buildOutcomeReport();
    assert.equal(report.includes("UNCALIBRATED"), true);
    assert.equal(report.includes("No winner"), true);
    assert.equal(report.includes("0.826"), false);
    assert.equal(report.includes("5.63"), false);
    const weights = readJson<{ verified: boolean; madden_order_verified: boolean }>("config/madden-ovr-weights.estimated.json");
    assert.equal(weights.verified, false);
    assert.equal(weights.madden_order_verified, false);
  });
}
