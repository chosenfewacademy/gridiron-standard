import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { GrokBotFileResearchAdapter, GrokBotFileAuditAdapter, AwaitingGrokBotEvidenceError, AwaitingGrokBotAuditError, inboxDir } from "../src/grok-bot-transport.js";
import { validateGrokBotProvenance } from "../src/grok-bot-provenance.js";
import { selectedTransport } from "../src/adapter-factory.js";

type T = (name: string, fn: () => void | Promise<void>) => void;
const NOW = "2026-11-01T22:00:00-05:00";
const task = { task_id: "LG_PAIR_03", position: "LG" };
const evidence = () => ({ task_id: "LG_PAIR_03", position: "LG", researched_at: "2026-11-01T21:00:00-05:00",
  sources: [{ name: "NFL.com", url: "https://www.nfl.com/x", retrieved_at: "2026-11-01T21:00:00-05:00", published_at: null, authority_tier: 1, claims: ["c"] }],
  normalized: { current_role: { status: "satisfied", confidence: "HIGH", limitations: [],
    items: [{ claim: "c", source_url: "https://www.nfl.com/x", retrieved_at: "2026-11-01T21:00:00-05:00", season: 2026, period: "CURRENT_CONTEXT" }] } },
  conflicts: [], minimum_evidence_met: true, missing_evidence: [], fresh_web_research_observed: true, calendar_web_search_observed: true });
const provenance = () => ({ transport: "GROK_BOT_FILE_TRANSPORT", author: "grok-bot", task_id: "LG_PAIR_03", position: "LG",
  researched_at: "2026-11-01T21:00:00-05:00",
  queries: [{ query: "Steve Avila 2026 snaps PFF grade", executed_at: "2026-11-01T20:59:00-05:00", purpose: "EVIDENCE" }],
  retrievals: [{ url: "https://www.nfl.com/x", retrieved_at: "2026-11-01T21:00:00-05:00", method: "WEB_FETCH" }],
  attestation: "All listed queries and retrievals were performed live for this task; no EA ratings used as evidence." });

function tmpInbox(files: Record<string, unknown>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "inbox-"));
  const dir = inboxDir(task, root); fs.mkdirSync(dir, { recursive: true });
  for (const [n, v] of Object.entries(files)) fs.writeFileSync(path.join(dir, n), typeof v === "string" ? v : JSON.stringify(v));
  return root;
}

export async function runGrokBotTransportTests(test: T) {
  test("grok-bot is the default transport; CODEX selectable by env", () => {
    assert.equal(selectedTransport({}), "GROK_BOT_FILE_TRANSPORT");
    assert.equal(selectedTransport({ GRIDIRON_RESEARCH_TRANSPORT: "codex" }), "CODEX");
    assert.throws(() => selectedTransport({ GRIDIRON_RESEARCH_TRANSPORT: "other" }));
  });
  test("valid declared provenance passes", () => {
    const r = validateGrokBotProvenance(evidence() as any, provenance(), NOW); assert.equal(r.valid, true, r.errors.join());
  });
  test("provenance rejects undeclared source, time mismatch, stale and missing queries", () => {
    const p = provenance(); p.retrievals[0].retrieved_at = "2026-11-01T20:00:00-05:00";
    assert(validateGrokBotProvenance(evidence() as any, p, NOW).errors.some(e => e.startsWith("SOURCE_RETRIEVAL_TIME_MISMATCH")));
    const p2 = provenance(); p2.retrievals[0].url = "https://other.example/";
    const e2 = validateGrokBotProvenance(evidence() as any, p2, NOW).errors;
    assert(e2.some(e => e.startsWith("SOURCE_NOT_DECLARED_RETRIEVED"))); assert(e2.some(e => e.includes("ITEM_SOURCE_NOT_DECLARED_RETRIEVED")));
    assert(!validateGrokBotProvenance(evidence() as any, provenance(), "2027-06-01T00:00:00Z").valid);
    assert(!validateGrokBotProvenance(evidence() as any, { ...provenance(), queries: [] }, NOW).valid);
    assert(!validateGrokBotProvenance(evidence() as any, null, NOW).valid);
  });
  const results: Promise<void>[] = [];
  const asyncTest = (name: string, fn: () => Promise<void>) => results.push(fn().then(() => console.log(`PASS ${name}`), e => { console.error(`FAIL ${name}`); throw e; }));
  asyncTest("missing evidence file stops before any mutation", async () => {
    const root = tmpInbox({});
    await assert.rejects(new GrokBotFileResearchAdapter(root, () => NOW).gather(task), AwaitingGrokBotEvidenceError);
  });
  asyncTest("self-declared flags and minimum_evidence_met are not trusted; gate still runs", async () => {
    const root = tmpInbox({ "evidence.json": evidence() });
    const out = await new GrokBotFileResearchAdapter(root, () => NOW).gather(task);
    assert.equal(out.fresh_web_research_observed, false); assert.equal(out.minimum_evidence_met, false);
    assert(out.missing_evidence.includes("PROVENANCE_INVALID_STRUCTURE"));
    const root2 = tmpInbox({ "evidence.json": evidence(), "provenance.json": provenance() });
    const out2 = await new GrokBotFileResearchAdapter(root2, () => NOW).gather(task);
    assert.equal(out2.fresh_web_research_observed, true);
    assert.equal(out2.minimum_evidence_met, false, "incomplete categories must still fail the unchanged gate");
  });
  asyncTest("analyst adapter reads attempts and writes validator feedback", async () => {
    const root = tmpInbox({ "audit-attempt-1.md": "attempt one" });
    const a = new GrokBotFileAuditAdapter(root); const input: any = { task, evidence: {}, state: {}, locks: {} };
    assert.equal((await a.runAudit(input)).text, "attempt one");
    await assert.rejects(a.runAudit({ ...input, revision_feedback: ["ERR"] }), AwaitingGrokBotAuditError);
    const fb = JSON.parse(fs.readFileSync(path.join(inboxDir(task, root), "feedback-attempt-1.json"), "utf8"));
    assert.deepEqual(fb.errors, ["ERR"]);
  });
  asyncTest("inbox path cannot escape research-inbox", async () => {
    assert.throws(() => inboxDir({ position: "..", task_id: ".." }, "/tmp/inbox-root"));
  });
  await Promise.all(results);
}
