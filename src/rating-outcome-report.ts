import fs from "node:fs";
import path from "node:path";
import { evaluateReadings, shockReadings, type AttributeReading } from "./matchup-probability.js";
import { EVIDENCE_TO_RATING_RULES, profilesTooSimilar, summarizeTemplateUse } from "./rating-evidence-rules.js";

/**
 * Read-only audit summary. Does not write cards, does not sample a game,
 * and does not treat the local PHI@DAL win rate as a result.
 */

interface CanonCard {
  player_name: string;
  player_id: string;
  position: string;
  ovr: number;
  attributes: Record<string, number>;
  locked?: boolean;
  card_origin?: string;
}

function load(root: string, file: string): string {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function similarPairs(cards: CanonCard[]): number {
  const groups = new Map<string, CanonCard[]>();
  for (const card of cards) {
    const list = groups.get(card.position) ?? [];
    list.push(card);
    groups.set(card.position, list);
  }
  let count = 0;
  for (const group of groups.values()) {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const keys = Object.keys(group[i].attributes).filter(key => key in group[j].attributes);
        if (profilesTooSimilar(group[i].attributes, group[j].attributes, keys)) count++;
      }
    }
  }
  return count;
}

export function buildOutcomeReport(root = process.cwd()): string {
  const phi = JSON.parse(load(root, "data/roster/phi-full-ratings-import.json")) as { cards: CanonCard[]; depth: { player_name: string; pos_abb: string; pos_rank: number }[] };
  const dal = JSON.parse(load(root, "data/roster/dal-full-ratings-import.json")) as { cards: CanonCard[]; depth: unknown[] };
  const weights = JSON.parse(load(root, "config/madden-ovr-weights.estimated.json")) as { verified: boolean; madden_order_verified: boolean };
  const qb1 = phi.depth.find(slot => slot.pos_abb === "QB" && slot.pos_rank === 1);
  const newDal = dal.cards.filter(card => card.card_origin === "dal_team_audit" && !card.locked);
  const template = summarizeTemplateUse(newDal);
  const barkley = phi.cards.find(card => card.player_name === "Saquon Barkley");
  const bell = phi.cards.find(card => card.player_name === "Markel Bell");
  const steen = phi.cards.find(card => card.player_name === "Tyler Steen");
  const quinnen = dal.cards.find(card => card.player_name === "Quinnen Williams");
  if (!barkley || !bell || !steen || !quinnen || !qb1) throw new Error("CANONICAL_CARD_MISSING");
  const run: AttributeReading[] = [
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
  const baseline = evaluateReadings("run_yards", run);
  const contact = evaluateReadings("run_yards", shockReadings(run, barkley.player_id, ["BTK", "TRK", "SFA"], -15));
  const lines = [
    "Gridiron Standard rating-to-outcome audit",
    "Calibration: UNCALIBRATED. No winner. No final score. Local PHI@DAL win rates are not a target.",
    `Estimated Madden weights verified=${weights.verified} madden_order_verified=${weights.madden_order_verified}. Not a Madden 27 reproduction.`,
    `PHI cards ${phi.cards.length}, depth slots ${phi.depth.length}. QB1 ${qb1.player_name}.`,
    `DAL cards ${dal.cards.length}, depth slots ${dal.depth.length}.`,
    `DAL template-offset attributes ${template.template} of ${template.attributes} on new cards. PHI similar pairs ${similarPairs(phi.cards)}. DAL new-card similar pairs ${similarPairs(newDal)}.`,
    `Stored-card run margin ${baseline.margin} and contact-15 margin ${contact.margin}. The unit translation is not yards per carry.`,
    "Rules:",
    ...EVIDENCE_TO_RATING_RULES.map(rule => `- ${rule.id}: ${rule.text}`)
  ];
  return lines.join("\n") + "\n";
}

function main(): void {
  process.stdout.write(buildOutcomeReport());
}

if (process.argv[1] && /rating-outcome-report\.(ts|js)$/.test(process.argv[1])) main();
