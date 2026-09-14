import assert from "node:assert/strict";
import { deriveSeasonContext } from "../src/season-phase.js";
import { applyFullAuditEvidenceGate, requiredEvidenceCategories } from "../src/evidence-gate.js";
import { CodexResearchAdapter, type ResearchClient } from "../src/codex-research.js";
import type { ThreadOptions } from "@openai/codex-sdk";
import fs from "node:fs";

// Synthetic calendar fixtures, not actual NFL dates or player data.
function calendar(asOf: string, games = 0, played = games) {
  return {
    nfl_season: 2030, player_id: "fixture_qb", team: "TST",
    valid_from: "2030-03-01T00:00:00Z", valid_until: "2031-03-01T00:00:00Z",
    preseason_start: "2030-08-01T00:00:00Z", regular_season_start: "2030-09-01T00:00:00Z",
    postseason_start: "2031-01-01T00:00:00Z", season_end: "2031-02-01T00:00:00Z",
    current_season_games_available: games, current_season_games_played: played,
    regular_season_games_scheduled: 17,
    regular_season_complete: Date.parse(asOf) >= Date.parse("2031-01-01T00:00:00Z"),
    postseason_complete: Date.parse(asOf) >= Date.parse("2031-02-01T00:00:00Z"),
    sources: [{ url: "https://www.nfl.com/schedules/fixture", retrieved_at: asOf,
      claims: ["Synthetic official calendar and schedule counts"] }]
  };
}
const task = { task_id: "fixture", player_id: "fixture_qb", team: "TST", position: "QB",
  baseline_controls: { top_10: [{ player: "Control A" }], external_controls: [{ player: "Control B" }] } };
const preseason = "2030-08-20T12:00:00Z";
function fixture(asOf = preseason, games = 0, played = games): any {
  const snapshot = calendar(asOf, games, played);
  const context = deriveSeasonContext(snapshot, asOf, task);
  assert.equal(context.status, "RESOLVED");
  if (context.status !== "RESOLVED") throw new Error("Invalid test fixture");
  const source = { name: "Fixture statistics", url: "https://www.nfl.com/stats/fixture",
    published_at: null, retrieved_at: asOf, authority_tier: 1, claims: ["Fixture facts"] };
  const normalized: any = {};
  for (const requirement of requiredEvidenceCategories("QB", context.metadata.season_phase)) {
    const season = requirement.layer === "CURRENT" ? 2030 : context.metadata.evidence_season;
    const item = { claim: "Synthetic sourced evidence", source_url: source.url, retrieved_at: asOf,
      season, period: requirement.layer === "CURRENT" ? "CURRENT_CONTEXT" : "REGULAR_SEASON" };
    normalized[requirement.name] = { status: "satisfied", confidence: "HIGH", items: [item],
      limitations: [], compared_controls: ["Control A", "Control B"] };
    if (requirement.name === "multi_year_trend") normalized[requirement.name].items.push({ ...item, season: season - 1 });
    if (requirement.name === "postseason_context") item.period = "POSTSEASON";
    if (requirement.name === "current_season_performance") item.period = "REGULAR_SEASON";
  }
  return { task_id: "fixture", position: "QB", researched_at: asOf, sources: [source], normalized,
    conflicts: [], missing_evidence: [], minimum_evidence_met: true, calendar: snapshot,
    calendar_web_search_observed: true, fresh_web_research_observed: true };
}

export function runSeasonEvidenceTests(test: (name: string, fn: () => void) => void): void {
  test("preseason before Week 1 uses completed season without upcoming production", () => {
    const result = applyFullAuditEvidenceGate(fixture(), task, preseason);
    assert.equal(result.minimum_evidence_met, true);
    assert.equal(result.season_phase, "PRESEASON");
    assert.equal(result.evidence_season, 2029);
    assert.equal(result.prior_season_used_as_primary_baseline, true);
    assert.equal(result.current_season_games_available, 0);
    assert(!("current_season_performance" in result.normalized));
  });
  test("offseason uses completed season and all current-context categories", () => {
    const now = "2030-05-01T12:00:00Z";
    const result = applyFullAuditEvidenceGate(fixture(now), task, now);
    assert.equal(result.season_phase, "OFFSEASON");
    assert.equal(result.minimum_evidence_met, true);
    assert(requiredEvidenceCategories("QB", "OFFSEASON").some(x => x.name === "injury_practice_status"));
  });
  test("early season incorporates small sample without replacing completed baseline", () => {
    const now = "2030-09-20T12:00:00Z";
    const result = applyFullAuditEvidenceGate(fixture(now, 2, 1), task, now);
    assert.equal(result.minimum_evidence_met, true);
    assert.equal(result.season_phase, "REGULAR_SEASON_EARLY");
    assert.equal(result.evidence_season, 2029);
    assert.equal(result.current_season_games_played, 1);
    assert.equal(result.sample_size_context?.player_sample_limited, true);
    assert.match(result.sample_size_context?.weighting ?? "", /COMPLETED_SEASON_PRIMARY/);
  });
  test("established season uses current performance but retains individual sample warning", () => {
    const now = "2030-10-20T12:00:00Z";
    const result = applyFullAuditEvidenceGate(fixture(now, 6, 1), task, now);
    assert.equal(result.minimum_evidence_met, true);
    assert.equal(result.season_phase, "REGULAR_SEASON_ESTABLISHED");
    assert.equal(result.evidence_season, 2030);
    assert.equal(result.prior_season_used_as_primary_baseline, false);
    assert.equal(result.sample_size_context?.player_sample_limited, true);
  });
  test("postseason and completed season retain NFL season across calendar years", () => {
    for (const [now, phase] of [["2031-01-15T12:00:00Z", "POSTSEASON"], ["2031-02-15T12:00:00Z", "COMPLETE_SEASON"]]) {
      const result = applyFullAuditEvidenceGate(fixture(now, 17), task, now);
      assert.equal(result.minimum_evidence_met, true);
      assert.equal(result.season_phase, phase);
      assert.equal(result.nfl_season, 2030);
      assert.equal(result.evidence_season, 2030);
    }
  });
  test("exact phase boundaries and configurable establishment threshold", () => {
    const now = "2030-09-01T00:00:00Z";
    const start = deriveSeasonContext(calendar(now), now, task);
    assert.equal(start.status === "RESOLVED" && start.metadata.season_phase, "REGULAR_SEASON_EARLY");
    const later = "2030-10-01T00:00:00Z";
    const phase = deriveSeasonContext(calendar(later, 4), later, task, { establishedAfterGames: 5 });
    assert.equal(phase.status === "RESOLVED" && phase.metadata.season_phase, "REGULAR_SEASON_EARLY");
  });
  test("scheduled season end without final status does not establish completion", () => {
    const now = "2031-02-15T12:00:00Z";
    const evidence = fixture(now, 17);
    evidence.calendar.postseason_complete = false;
    assert.equal(applyFullAuditEvidenceGate(evidence, task, now).minimum_evidence_met, false);
  });
  test("unavailable schedule fails closed even when researcher claims true", () => {
    const evidence = fixture(); delete evidence.calendar;
    const result = applyFullAuditEvidenceGate(evidence, task, preseason);
    assert.equal(result.minimum_evidence_met, false);
    assert.equal(result.season_phase, null);
    assert(result.missing_evidence.some(x => x.includes("CALENDAR")));
  });
  test("nonofficial, future, wrong-player and inconsistent calendars rejected", () => {
    const variants = [
      (c: any) => { c.sources[0].url = "https://nfl.com.evil.example/schedule"; },
      (c: any) => { c.sources[0].retrieved_at = "2030-08-21T00:00:00Z"; },
      (c: any) => { c.player_id = "other"; },
      (c: any) => { c.current_season_games_available = 1; },
      (c: any) => { c.postseason_start = c.preseason_start; }
    ];
    for (const change of variants) {
      const evidence = fixture(); change(evidence.calendar);
      assert.equal(applyFullAuditEvidenceGate(evidence, task, preseason).minimum_evidence_met, false);
    }
  });
  test("fewer categories and partial premium substitutes cannot pass", () => {
    for (const name of ["accuracy_by_depth", "current_role", "age_career_trajectory", "locked_control_comparisons"]) {
      const evidence = fixture(); delete evidence.normalized[name];
      assert.equal(applyFullAuditEvidenceGate(evidence, task, preseason).minimum_evidence_met, false);
    }
    const evidence = fixture(); evidence.normalized.pressure_performance.status = "partial";
    assert.equal(applyFullAuditEvidenceGate(evidence, task, preseason).minimum_evidence_met, false);
  });
  test("wrong performance season cannot substitute for phase primary season", () => {
    const evidence = fixture(); evidence.normalized.passing_production_efficiency.items[0].season = 2030;
    assert.equal(applyFullAuditEvidenceGate(evidence, task, preseason).minimum_evidence_met, false);
  });
  test("derived metadata replaces model-selected seasons without mutating input", () => {
    const evidence = fixture(); evidence.nfl_season = 9999; evidence.season_phase = "REGULAR_SEASON_ESTABLISHED";
    const before = structuredClone(evidence);
    const result = applyFullAuditEvidenceGate(evidence, task, preseason);
    assert.equal(result.minimum_evidence_met, true);
    assert.equal(result.nfl_season, 2030);
    assert.equal(result.season_phase, "PRESEASON");
    assert.deepEqual(evidence, before);
  });
  test("upcoming regular-season claims and unchecked extra categories are rejected", () => {
    const evidence = fixture(); evidence.normalized.current_role.items[0].period = "REGULAR_SEASON";
    assert.equal(applyFullAuditEvidenceGate(evidence, task, preseason).minimum_evidence_met, false);
    const extra = fixture(); extra.normalized.unchecked = { status: "satisfied" };
    assert.equal(applyFullAuditEvidenceGate(extra, task, preseason).minimum_evidence_met, false);
  });
  test("published phase schema and runtime category lists agree", () => {
    const schema = JSON.parse(fs.readFileSync("schemas/full-audit-evidence.schema.json", "utf8"));
    const ready = schema.allOf[0].then;
    const qb = ready.allOf[0].then.properties.normalized.required;
    for (const branch of ready.allOf.slice(1)) {
      const phase = branch.if.properties.season_phase.const;
      assert.deepEqual(
        [...new Set([...branch.then.properties.normalized.required, ...qb])].sort(),
        requiredEvidenceCategories("QB", phase).map(x => x.name).sort()
      );
    }
  });
  test("untraceable claims, missing controls, weak evidence and unresolved gaps fail", () => {
    const changes = [
      (e: any) => { e.normalized.accuracy_by_depth.items[0].source_url = "https://unknown.example/"; },
      (e: any) => { e.normalized.locked_control_comparisons.compared_controls = []; },
      (e: any) => { e.normalized.accuracy_by_depth.confidence = "LOW"; },
      (e: any) => { e.missing_evidence = ["unresolved pressure evidence"]; },
      (e: any) => { e.fresh_web_research_observed = false; }
    ];
    for (const change of changes) {
      const evidence = fixture(); change(evidence);
      assert.equal(applyFullAuditEvidenceGate(evidence, task, preseason).minimum_evidence_met, false);
    }
  });
  test("non-applicability needs sourced explanation and cannot exempt core traits", () => {
    const evidence = fixture();
    evidence.normalized.postseason_context.status = "not_applicable";
    assert.equal(applyFullAuditEvidenceGate(evidence, task, preseason).minimum_evidence_met, false);
    evidence.normalized.postseason_context.not_applicable_reason = "Official record confirms no postseason appearances";
    assert.equal(applyFullAuditEvidenceGate(evidence, task, preseason).minimum_evidence_met, true);
    evidence.normalized.accuracy_by_depth.status = "not_applicable";
    evidence.normalized.accuracy_by_depth.not_applicable_reason = "No public table";
    assert.equal(applyFullAuditEvidenceGate(evidence, task, preseason).minimum_evidence_met, false);
  });
}

export async function runResearchPhaseTests(): Promise<void> {
  async function run(name: string, body: () => Promise<void>) {
    try { await body(); console.log(`PASS ${name}`); }
    catch (error) { console.error(`FAIL ${name}`); throw error; }
  }
  function client(responses: unknown[], web = true) {
    const prompts: string[] = [];
    const options: (ThreadOptions | undefined)[] = [];
    const fake: ResearchClient = { startThread(settings) {
      options.push(settings);
      return { id: "fake-research-thread", async run(input) {
        prompts.push(String(input));
        return { finalResponse: JSON.stringify(responses[prompts.length - 1]), usage: null,
          items: web ? [{ id: `search-${prompts.length}`, type: "web_search", query: "fixture search" }] : [] };
      } };
    } };
    return { fake, prompts, options };
  }
  await run("Full Audit research resolves calendar before collecting phase-specific evidence", async () => {
    const mock = client([calendar(preseason), fixture()]);
    const adapter = new CodexResearchAdapter({}, {}, mock.fake, () => preseason);
    const evidence = await adapter.gather({ ...task, audit_type: "FULL_AUDIT" });
    assert.equal(evidence.minimum_evidence_met, true);
    assert.equal(mock.prompts.length, 2);
    assert.match(mock.prompts[0], /authoritative NFL calendar/);
    assert.match(mock.prompts[1], /COMPLETED_SEASON_PRIMARY_WITH_CURRENT_CONTEXT/);
    assert.match(mock.prompts[1], /accuracy_by_depth/);
    assert.equal(evidence.season_phase, "PRESEASON");
    for (const options of mock.options) {
      assert.equal(options?.sandboxMode, "read-only");
      assert.equal(options?.webSearchMode, "live");
      assert.equal(options?.approvalPolicy, "never");
    }
  });
  await run("calendar unavailable stops Full Audit before performance research", async () => {
    const mock = client([{ unavailable: true }]);
    const adapter = new CodexResearchAdapter({}, {}, mock.fake, () => preseason);
    const evidence = await adapter.gather({ ...task, type: "player_full_audit" });
    assert.equal(mock.prompts.length, 1);
    assert.equal(evidence.minimum_evidence_met, false);
    assert.equal(evidence.season_phase, null);
  });
  await run("calendar URLs without observed live search cannot establish phase", async () => {
    const mock = client([calendar(preseason)], false);
    const adapter = new CodexResearchAdapter({}, {}, mock.fake, () => preseason);
    const evidence = await adapter.gather({ ...task, audit_type: "FULL_AUDIT" });
    assert.equal(mock.prompts.length, 1);
    assert.equal(evidence.minimum_evidence_met, false);
  });
  await run("legacy research smoke and Quick Recheck are not silently converted to Full Audits", async () => {
    for (const kind of ["research_smoke_test", "quick_recheck"]) {
      const mock = client([{ task_id: "legacy", minimum_evidence_met: false }]);
      const adapter = new CodexResearchAdapter({}, {}, mock.fake, () => preseason);
      await adapter.gather({ type: kind });
      assert.equal(mock.prompts.length, 1);
    }
  });
}
