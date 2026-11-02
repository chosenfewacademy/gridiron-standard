/** Offline dry run: validates a Grok Bot inbox submission with the unchanged evidence gate.
 * Usage: npm run evidence:import -- --position LG --task LG_PAIR_03 [--as-of ISO]
 * Optional research-inbox/<POS>/<TASK>/task.json supplies task fields (e.g. baseline_controls).
 * Writes NOTHING; prints a JSON report; exit 1 if the gate fails. No network, no API keys. */
import fs from "node:fs";
import path from "node:path";
import { GrokBotFileResearchAdapter, inboxDir } from "./grok-bot-transport.js";

const arg = (n: string) => { const i = process.argv.indexOf(n); return i >= 0 ? process.argv[i + 1] : undefined; };
const position = arg("--position")?.toUpperCase(); const taskId = arg("--task"); const asOf = arg("--as-of");
if (!position || !taskId) { console.error("Usage: evidence:import -- --position <POS> --task <TASK_ID> [--as-of ISO]"); process.exit(2); }
let task: Record<string, unknown> = { task_id: taskId, position };
const taskFile = path.join(inboxDir(task), "task.json");
if (fs.existsSync(taskFile)) task = { ...JSON.parse(fs.readFileSync(taskFile, "utf8")), task_id: taskId, position };
try {
  const out = await new GrokBotFileResearchAdapter(undefined, asOf ? () => asOf : undefined).gather(task);
  console.log(JSON.stringify({ task_id: taskId, position, transport: "GROK_BOT_FILE_TRANSPORT",
    fresh_web_research_observed: out.fresh_web_research_observed, minimum_evidence_met: out.minimum_evidence_met,
    missing_evidence: out.missing_evidence, evidence_warnings: out.evidence_warnings ?? [] }, null, 2));
  if (!out.minimum_evidence_met) process.exitCode = 1;
} catch (e) { console.error(e instanceof Error ? e.message : String(e)); process.exitCode = 1; }
