import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { validateAudit } from "../src/audit-validator.js";
import { validateHighTraitEvidence, withTransportChecks, requiredTier } from "../src/high-trait-evidence.js";
import { applyFullAuditEvidenceGate } from "../src/evidence-gate.js";
import { GrokBotFileResearchAdapter, inboxDir } from "../src/grok-bot-transport.js";
import { saveAuditRecord } from "../src/persistence.js";
import { violations, queueOnlyAppend, stateChangeAllowed } from "../scripts/protected-paths-check.mjs";

type T = (name: string, fn: () => void | Promise<void>) => void;
const SRC = "https://www.pff.com/nfl/players/x/1";
const ev = (met = true): any => ({ task_id: "T", position: "LG", researched_at: "2026-11-01T21:00:00-05:00", conflicts: [],
  sources: [{ name: "PFF", url: SRC, retrieved_at: "2026-11-01T21:00:00-05:00", published_at: null, authority_tier: 1, claims: ["c"] }],
  normalized: {}, minimum_evidence_met: met, missing_evidence: [] });
const audit = (extra: Record<string, unknown> = {}): any => ({ audit_id: "A", audit_type: "FULL_AUDIT", status: "PROPOSED", position: "LG",
  confidence: "HIGH", methodology_version: "1.0.0", created_at: "2026-11-01T21:00:00-05:00", ratings: { RBK: 88 }, ...extra });

export async function runStrictnessTests(test: T) {
  test("tier thresholds mirror AGENTS.md rules 5-8", () => {
    assert.equal(requiredTier(89), null); assert.equal(requiredTier(90), "ELITE"); assert.equal(requiredTier(95), "LEAGUE_DEFINING");
    assert.equal(requiredTier(97), "EXTRAORDINARY"); assert.equal(requiredTier(99), "GENERATIONAL");
  });
  test("90+/95+/97+/99 ratings without cited evidence are rejected", () => {
    for (const r of [90, 95, 97, 99]) assert(validateHighTraitEvidence(audit({ ratings: { RBK: r } }), ev()).some(e => e.startsWith("HIGH_TRAIT_EVIDENCE_MISSING")));
  });
  test("high trait tier must match rating band, cite listed sources, and never EA", () => {
    const a = audit({ ratings: { RBK: 99 }, high_trait_evidence: { RBK: { tier: "ELITE", claim: "x", source_urls: [SRC] } } });
    assert(validateHighTraitEvidence(a, ev()).some(e => e.startsWith("HIGH_TRAIT_TIER_MISMATCH")));
    const b = audit({ ratings: { RBK: 95 }, high_trait_evidence: { RBK: { tier: "LEAGUE_DEFINING", claim: "x", source_urls: ["https://other.example/"] } } });
    assert(validateHighTraitEvidence(b, ev()).some(e => e.startsWith("HIGH_TRAIT_SOURCE_NOT_IN_EVIDENCE")));
    const eaEv = ev(); eaEv.sources.push({ ...eaEv.sources[0], url: "https://www.ea.com/games/madden-nfl/ratings" });
    const c = audit({ ratings: { RBK: 92 }, high_trait_evidence: { RBK: { tier: "ELITE", claim: "x", source_urls: ["https://www.ea.com/games/madden-nfl/ratings"] } } });
    assert(validateHighTraitEvidence(c, eaEv).some(e => e.startsWith("EA_RATING_USED_AS_EVIDENCE")));
    const ok = audit({ ratings: { RBK: 95 }, high_trait_evidence: { RBK: { tier: "LEAGUE_DEFINING", claim: "x", source_urls: [SRC] } } });
    assert.deepEqual(validateHighTraitEvidence(ok, ev()), []);
  });
  test("ratings without gated stat/performance evidence are rejected", () => {
    assert(validateHighTraitEvidence(audit(), ev(false)).includes("RATINGS_WITHOUT_GATED_EVIDENCE"));
    const none = ev(); none.sources = [];
    assert(validateHighTraitEvidence(audit(), none).includes("RATINGS_WITHOUT_STAT_OR_PERFORMANCE_SOURCES"));
  });
  test("grok transport keeps base validator flags and approval rules; Codex path unchanged", () => {
    const a = audit({ added_95_plus: true, ratings: { RBK: 95 }, high_trait_evidence: { RBK: { tier: "LEAGUE_DEFINING", claim: "x", source_urls: [SRC] } } });
    const base = validateAudit(a); const g = withTransportChecks(base, a, ev(), "GROK_BOT_FILE_TRANSPORT");
    assert(g.flags.includes("95_PLUS_CHANGE")); assert.equal(g.auto_approve, false); assert.deepEqual(g.flags, base.flags);
    const bad = audit({ ratings: { RBK: 96 } });
    assert.equal(withTransportChecks(validateAudit(bad), bad, ev(), "CODEX").valid, validateAudit(bad).valid);
    assert.equal(withTransportChecks(validateAudit(bad), bad, ev(), "GROK_BOT_FILE_TRANSPORT").valid, false);
  });
  test("quick recheck limits and scarcity-related major flags still apply", () => {
    const q = validateAudit(audit({ audit_type: "QUICK_RECHECK", ovr_before: 80, ovr_after: 82, removed_95_plus: true }));
    assert(q.flags.includes("QUICK_RECHECK_EXCEEDS_OVR_LIMIT")); assert(q.flags.includes("QUICK_RECHECK_95_PLUS_PROHIBITED"));
    assert(validateAudit(audit({ changed_97_plus_or_99: true })).flags.includes("97_PLUS_OR_99_CHANGE"));
    assert.equal(validateAudit(audit({ confidence: "MEDIUM" })).auto_approve, false);
  });
  test("locked Top 10 mutation is still rejected for normal audits", () => {
    const r = validateAudit(audit({ position: "QB", proposed_top10_mutation: true }));
    assert(r.errors.some(e => e.startsWith("LOCK VIOLATION")));
  });
  test("3-revision ceiling is unchanged in every executor", () => {
    for (const f of ["src/executor.ts", "src/player-executor.ts", "src/quick-recheck.ts"]) {
      const s = fs.readFileSync(f, "utf8");
      assert.match(s, /GRIDIRON_MAX_REVISIONS \?\? "3"/); assert.match(s, /attempt <= MAX_REVISIONS/);
      assert.match(s, /withTransportChecks\(validateAudit\(parsed\)/);
    }
  });
  test("immutable audit history: existing audit cannot be overwritten", () => {
    const cwd = process.cwd(); const dir = fs.mkdtempSync(path.join(os.tmpdir(), "imm-"));
    try { process.chdir(dir); saveAuditRecord(audit(), "# A"); assert.throws(() => saveAuditRecord(audit(), "# A"), /Immutable audit/); }
    finally { process.chdir(cwd); }
  });
  test("protected path guard blocks state, locks, baselines, cards, audits and log edits", () => {
    const v = violations(["M\tstate/locks.json", "M\tstate/project-state.json", "M\tdata/baselines/QB.json", "A\tdata/players/x/current.json",
      "A\taudits/league/LG/a.json", "M\tlogs/qb-reconstruction/p/a/evidence.json", "A\tlogs/qb-reconstruction/p/a/new.json",
      "M\tsrc/x.ts", "M\tdata/players/registry.json", "M\tconfig/madden-entry-order.json"]);
    assert.equal(v.length, 7, v.join("\n"));
  });
  test("protected guard: narrow add-PENDING-positions exception (combinable with queue append)", () => {
    const base = { positions: { QB: "LOCKED", LG: "IN_PROGRESS", C: "PENDING" }, current_position: "LG", pending_reaudit_queue: [] as any[] };
    const J = (o: any) => JSON.stringify(o, null, 2);
    const ok = (h: any) => stateChangeAllowed(J(base), J(h)).ok;
    const item = { type: "TOP10_REAUDIT", position: "QB", status: "QUEUED_NOT_STARTED" };
    assert(ok({ ...base, positions: { ...base.positions, FB: "PENDING", LS: "PENDING" } }));
    assert(ok({ ...base, positions: { ...base.positions, FB: "PENDING" }, pending_reaudit_queue: [item] }));
    assert(ok({ ...base, pending_reaudit_queue: [item] })); // queue rule alone still works
    assert(!ok({ ...base, positions: { ...base.positions, FB: "IN_PROGRESS" } }));
    assert(!ok({ ...base, positions: { ...base.positions, FB: "LOCKED" } }));
    assert(!ok({ ...base, positions: { ...base.positions, LG: "LOCKED", FB: "PENDING" } }));
    assert(!ok({ ...base, positions: { QB: "LOCKED", LG: "IN_PROGRESS", FB: "PENDING" } })); // removed C
    assert(!ok({ ...base, current_position: "FB", positions: { ...base.positions, FB: "PENDING" } }));
    assert(!ok({ ...base, positions: { ...base.positions, FB: "PENDING" }, pending_reaudit_queue: [{ ...item, status: "IN_PROGRESS" }] }));
    assert(!ok({ ...base, positions: { ...base.positions, FB: "PENDING" }, locks: {} }));
    assert(!ok(base)); assert(!stateChangeAllowed("{", J(base)).ok);
    assert.equal(violations(["M\tstate/locks.json"], () => true).length, 1);
  });
  test("protected guard: narrow queue-append exception for state/project-state.json only", () => {
    const base = { positions: { QB: "LOCKED", LG: "IN_PROGRESS" }, current_position: "LG", pending_reaudit_queue: [] as any[] };
    const item = (pos: string, extra: any = {}) => ({ type: "TOP10_REAUDIT", position: pos, status: "QUEUED_NOT_STARTED", ...extra });
    const J = (o: any) => JSON.stringify(o, null, 2);
    const head = { ...base, pending_reaudit_queue: [item("QB"), item("LG")] };
    assert.equal(queueOnlyAppend(J(base), J(head)).ok, true, "append of queued items allowed");
    const two = { ...head, pending_reaudit_queue: [...head.pending_reaudit_queue, item("RB")] };
    assert.equal(queueOnlyAppend(J(head), J(two)).ok, true, "append after existing items allowed");
    assert.equal(queueOnlyAppend(J(base), J({ ...head, positions: { ...base.positions, QB: "IN_PROGRESS" } })).ok, false, "unlock rejected");
    assert.equal(queueOnlyAppend(J(base), J({ ...head, current_position: "C" })).ok, false, "other key rejected");
    assert.equal(queueOnlyAppend(J(base), J({ ...base, pending_reaudit_queue: [item("QB", { status: "IN_PROGRESS" })] })).ok, false, "started item rejected");
    assert.equal(queueOnlyAppend(J(base), J({ ...base, pending_reaudit_queue: [{ ...item("QB"), type: "OTHER" }] })).ok, false, "non-TOP10 item rejected");
    assert.equal(queueOnlyAppend(J(head), J({ ...head, pending_reaudit_queue: [item("RB"), item("LG"), item("TE")] })).ok, false, "rewriting existing item rejected");
    assert.equal(queueOnlyAppend(J(head), J(base)).ok, false, "removal rejected");
    assert.equal(queueOnlyAppend(J(base), J(base)).ok, false, "no-op is not an append");
    assert.equal(queueOnlyAppend("{", J(head)).ok, false);
    const ok = () => true;
    assert.deepEqual(violations(["M\tstate/project-state.json"], ok), [], "allowed when verified");
    assert.equal(violations(["M\tstate/project-state.json"]).length, 1, "default still strict");
    assert.equal(violations(["M\tstate/locks.json", "D\tstate/project-state.json", "M\tdata/baselines/QB.json"], ok).length, 3, "exception never covers other paths or deletes");
  });
  const NOW = "2026-11-01T22:00:00-05:00";
  const p = (async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "gate-")); const task = { task_id: "T", position: "LG" };
    const dir = inboxDir(task, root); fs.mkdirSync(dir, { recursive: true });
    const e = ev(false); fs.writeFileSync(path.join(dir, "evidence.json"), JSON.stringify(e));
    fs.writeFileSync(path.join(dir, "provenance.json"), JSON.stringify({ transport: "GROK_BOT_FILE_TRANSPORT", author: "grok-bot", task_id: "T", position: "LG",
      researched_at: e.researched_at, queries: [{ query: "LG PFF pass block grade 2026", executed_at: e.researched_at, purpose: "EVIDENCE" }],
      retrievals: [{ url: SRC, retrieved_at: e.researched_at, method: "WEB_FETCH" }],
      attestation: "All listed queries and retrievals were performed live for this task; no EA ratings used as evidence." }));
    const viaGrok = await new GrokBotFileResearchAdapter(root, () => NOW).gather(task);
    const direct = applyFullAuditEvidenceGate({ ...e, minimum_evidence_met: false, fresh_web_research_observed: true, calendar_web_search_observed: false }, task, NOW);
    assert.deepEqual(viaGrok.missing_evidence, direct.missing_evidence); assert.equal(viaGrok.minimum_evidence_met, false);
    console.log("PASS grok transport output is exactly the unchanged Full Audit evidence gate result");
  })();
  await p;
}

export function runPositionArchitectureTests(test: (n: string, f: () => void) => void) {
  test("position metrics cover all 20 buckets plus enacted FB/LS addendum buckets, are active v1.1, and never cite EA", () => {
    const cfg = JSON.parse(fs.readFileSync("config/position-metrics.json", "utf8"));
    const order = "QB RB WR TE LT LG C RG RT REDGE LEDGE DT MIKE WILL SAM CB FS SS K P".split(" ");
    assert.deepEqual(Object.keys(cfg.positions), [...order, "FB", "LS"]);
    assert.deepEqual(JSON.parse(fs.readFileSync("config/position-sequence.json", "utf8")).sequence, [...order, "FB", "LS"]); // addendum enacted
    for (const b of ["FB", "LS"]) { assert.equal(cfg.positions[b].current_status, "PENDING"); assert(fs.existsSync(`docs/positions/${b}.md`)); } assert.equal(cfg.status, "ACTIVE_METHODOLOGY_V1_1"); assert.equal(cfg.effective, true);
    assert(!/ea\.com/i.test(JSON.stringify(cfg)));
    for (const b of order) assert(fs.existsSync(`docs/positions/${b}.md`));
  });
  test("AGENTS.md keeps v1.0 text intact and records enacted v1.1 amendment", () => {
    const s = fs.readFileSync("AGENTS.md", "utf8");
    assert.match(s, /^# Gridiron Standard 27\n\nArchitecture Version: 1\.0\.0\nMethodology Version: 1\.0\.0/);
    assert.match(s, /Codex is the analyst\. The application is the commissioner\./);
    assert.match(s, /## Amendment v1\.1 \(ENACTED\)\n\nArchitecture Version: 1\.1\.0\nMethodology Version: 1\.1\.0\nApproved: 2026-11-01 by the commissioner/);
    assert.match(s, /Grok Bot is the analyst\. The application is the commissioner\./);
    assert(!/PENDING AMENDMENT/.test(s));
    for (const rule of ["Maximum automatic revision attempts: 3.", "Default mode: REVIEW_MAJOR", "A locked positional Top 10 baseline is immutable.",
      "EA ratings are controls only, never authoritative truth."]) assert(s.includes(rule), rule);
    assert.match(s, /## Addendum v1\.1\.1 — FB and LS exact buckets \(ENACTED\)/);
    const st = JSON.parse(fs.readFileSync("state/project-state.json", "utf8")); assert.equal(st.positions.FB, "PENDING"); assert.equal(st.positions.LS, "PENDING");
    const m = JSON.parse(fs.readFileSync("config/methodology.json", "utf8")); assert.equal(m.methodology_version, "1.1.0");
  });
}
