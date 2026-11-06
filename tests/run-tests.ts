import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { route } from "../src/router.js";
import { majorFlags, mayAutoApprove } from "../src/validator.js";
import { mapToMaddenBucket } from "../src/position-mapper.js";
import { runSeasonEvidenceTests, runResearchPhaseTests } from "./season-evidence-tests.js";
import { runQbReconstructionTests } from "./qb-reconstruction-tests.js";
import { runResumableEvidenceTests } from "./resumable-evidence-tests.js";
import { runQbEvidencePolicyTests } from "./qb-evidence-policy-tests.js";
import { runResearchTransportTests } from "./research-transport-tests.js";
import { runOpenAIResponsesTransportTests } from "./openai-responses-transport-tests.js";
import { runGithubWorkflowTests } from "./github-workflow-tests.js";
import { runGrokBotTransportTests } from "./grok-bot-transport-tests.js";
import { runRosterRefreshTests, runStageEngineTests, runCoverageGateTests } from "./stage-tests.js";
import { runReauditTests } from "./reaudit-tests.js";
import { runMaddenOvrTests } from "./madden-ovr-tests.js";
import { runRosterDbTests } from "./roster-db-tests.js";
import { runPhiFullRatingsTests } from "./phi-full-ratings-tests.js";
import { runDalFullRatingsTests } from "./dal-full-ratings-tests.js";
import { runRosterCapTests } from "./roster-cap-tests.js";
import { runWeeklyUpdateTests } from "./weekly-update-tests.js";
import { runStrictnessTests, runPositionArchitectureTests } from "./strictness-tests.js";

function test(name: string, fn: () => void): void {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runSeasonEvidenceTests(test);
runQbReconstructionTests(test);
runQbEvidencePolicyTests(test);
runResearchTransportTests(test);
runGithubWorkflowTests(test);
await runGrokBotTransportTests(test);
await runStrictnessTests(test);
await runReauditTests(test);
runWeeklyUpdateTests(test);
const atest = async (name: string, fn: () => void | Promise<void>) => {
  try { await fn(); console.log(`PASS ${name}`); } catch (error) { console.error(`FAIL ${name}`); throw error; }
};
await runRosterRefreshTests(atest as any);
runStageEngineTests(test);
runCoverageGateTests(test);
runPositionArchitectureTests(test);

test("route continue alias", () => {
  assert.deepEqual(route("go"), { type: "CONTINUE" });
});

test("route team audit before generic player audit", () => {
  assert.deepEqual(route("audit team PHI WR"), {
    type: "TEAM_AUDIT", team: "PHI", position: "WR"
  });
  assert.deepEqual(route("AUDIT TEAM phi"), {
    type: "TEAM_AUDIT", team: "PHI", position: undefined
  });
});

test("route named player audit remains unchanged", () => {
  assert.deepEqual(route("audit Jalen Hurts"), {
    type: "FULL_PLAYER_AUDIT", query: "Jalen Hurts"
  });
});

test("route card command", () => {
  assert.deepEqual(route("card Jalen Hurts"), {
    type: "CARD_PLAYER",
    query: "Jalen Hurts"
  });
});

test("quick recheck 2-point change flags", () => {
  const flags = majorFlags({
    audit_type: "QUICK_RECHECK",
    confidence: "HIGH",
    ovr_before: 82,
    ovr_after: 84
  });
  assert(flags.includes("OVR_CHANGE_2_PLUS"));
  assert(flags.includes("QUICK_RECHECK_EXCEEDS_OVR_LIMIT"));
});

test("high-confidence clean audit auto-approves", () => {
  assert.equal(mayAutoApprove({
    audit_type: "FULL_AUDIT",
    confidence: "HIGH",
    ovr_before: 82,
    ovr_after: 83
  }), true);
});

test("generic OLB is not guessed", () => {
  const mapped = mapToMaddenBucket("OLB", "OLB");
  assert.equal(mapped.exact_position, null);
  assert.equal(mapped.requires_role_resolution, true);
});

test("LT maps exactly", () => {
  const mapped = mapToMaddenBucket("T", "LT");
  assert.equal(mapped.exact_position, "LT");
  assert.equal(mapped.requires_role_resolution, false);
});

test("output policy forbids player photo", () => {
  const policy = JSON.parse(
    fs.readFileSync(path.resolve("config/output-policy.json"), "utf8")
  );
  assert.equal(policy.graphic_input_card.include_player_photo, false);
});

test("locked baseline files exist", () => {
  for (const pos of ["QB","RB","WR","TE","LT"]) {
    assert.equal(fs.existsSync(path.resolve(`data/baselines/${pos}.json`)), true);
  }
});

await runResearchPhaseTests();
await runResumableEvidenceTests();
await runOpenAIResponsesTransportTests();
await runMaddenOvrTests();
runRosterDbTests(test);
runRosterCapTests(test);
runPhiFullRatingsTests(test);
runDalFullRatingsTests(test);
