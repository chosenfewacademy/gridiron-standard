import fs from "node:fs";
import path from "node:path";

type Check = { name: string; ok: boolean; detail?: string };

function exists(rel: string): boolean {
  return fs.existsSync(path.resolve(rel));
}

function readJson(rel: string): any {
  return JSON.parse(fs.readFileSync(path.resolve(rel), "utf8"));
}

const checks: Check[] = [];

for (const rel of [
  "AGENTS.md",
  "state/project-state.json",
  "state/locks.json",
  "data/players/registry.json",
  "config/output-policy.json",
  "config/team-branding.json",
  "config/madden-entry-order.json"
]) {
  checks.push({
    name: `file:${rel}`,
    ok: exists(rel),
    detail: exists(rel) ? undefined : "missing"
  });
}

try {
  const state = readJson("state/project-state.json");
  checks.push({
    name: "architecture_version",
    ok: state.architecture_version === "1.0.0",
    detail: String(state.architecture_version)
  });
  checks.push({
    name: "review_mode",
    ok: state.review_mode === "REVIEW_MAJOR",
    detail: String(state.review_mode)
  });
  const methodology = readJson("config/methodology.json");
  checks.push({
    name: "methodology_amendment",
    ok: methodology.base_version === state.architecture_version && methodology.methodology_version === "1.1.0",
    detail: `base ${methodology.base_version} + amendment ${methodology.methodology_version}`
  });
} catch (error) {
  checks.push({
    name: "project_state_parse",
    ok: false,
    detail: error instanceof Error ? error.message : String(error)
  });
}

try {
  const policy = readJson("config/output-policy.json");
  checks.push({
    name: "card_photo_disabled",
    ok: policy.graphic_input_card?.include_player_photo === false
  });
  checks.push({
    name: "card_requires_explicit_request",
    ok: policy.graphic_input_card?.generate_only_on_explicit_request === true
  });
} catch (error) {
  checks.push({
    name: "output_policy_parse",
    ok: false,
    detail: error instanceof Error ? error.message : String(error)
  });
}

try {
  const order = readJson("config/madden-entry-order.json");
  checks.push({
    name: "madden_order_registry_present",
    ok: Boolean(order.positions)
  });
  checks.push({
    name: "madden_order_verified",
    ok: order.verified === true,
    detail: order.verified === true
      ? "verified"
      : "NOT VERIFIED: deployment may serve ratings, but production graphic card generation should remain gated."
  });
} catch (error) {
  checks.push({
    name: "madden_order_parse",
    ok: false,
    detail: error instanceof Error ? error.message : String(error)
  });
}

const failed = checks.filter(x => !x.ok);
const realFailures = failed.filter(x => x.name !== "madden_order_verified");
// The Madden editor order is intentionally unverified; report it as an expected gate, not a failure.
console.log(JSON.stringify({
  status: realFailures.length ? "FAIL" : failed.length ? "PASS_WITH_EXPECTED_GATE" : "PASS",
  real_failures: realFailures.map(x => x.name),
  expected_gates: failed.filter(x => x.name === "madden_order_verified").map(x => x.name),
  checks
}, null, 2));

if (failed.some(x => x.name !== "madden_order_verified")) {
  process.exitCode = 1;
}
