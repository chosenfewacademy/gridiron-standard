/**
 * Add-only revision of an already-approved player_rating re-audit (commissioner-approved 2026-11-02, card t30s3).
 * Usage: npm run reaudit:revise -- <POS> --task <TASK_ID> --revision <N> --by <name> --at <iso> --note "..." --confirm TOP10_REAUDIT_REVISE
 *
 * The earlier revision's audit record stays as immutable history. The new record (<TASK>_A<N>) declares `supersedes`
 * and goes through the unchanged evidence gate, validator, stage-output checks (incl. high-trait tiers and the
 * unique playing-style rule against the EFFECTIVE rating of every other player at the position). Its approval is
 * appended (append-only) to the TOP10_REAUDIT item. Never touches locks, baselines, cards, positions or pointers.
 * Input: research-inbox/<POS>/<TASK>/revision-A<N>.md (a ```json audit block).
 */
import fs from "node:fs";
import path from "node:path";
import { stageOutputErrors, styleSimilarity } from "./stage-engine.js";
import { createResearchAdapter, selectedTransport } from "./adapter-factory.js";
import { withTransportChecks } from "./high-trait-evidence.js";
import { parseAuditJson } from "./audit-parser.js";
import { validateAudit } from "./audit-validator.js";
import { saveAuditRecord } from "./persistence.js";
import { findReauditItem, reauditRunTag } from "./reaudit-executor.js";

/** Effective rating per task: the newest approved revision; superseded records are excluded. */
export function effectiveRatings(pos: string, item: any, root = process.cwd()) {
  const approved = new Set((item.approvals ?? []).filter((a: any) => a.decision === "APPROVED").map((a: any) => a.audit_id));
  const dir = path.join(root, "audits/league", pos);
  const recs = fs.readdirSync(dir).filter(f => f.endsWith(".json")).map(f => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")))
    .filter(a => a.task_type === "player_rating" && approved.has(a.audit_id) && a.ratings);
  const superseded = new Set(recs.map(a => a.supersedes).filter(Boolean));
  return recs.filter(a => !superseded.has(a.audit_id));
}

export async function reviseRating(pos: string, o: { task_id: string; revision: number; approved_by: string; approved_at: string; note: string }, deps: { research?: any; root?: string } = {}) {
  const root = deps.root ?? process.cwd();
  const statePath = path.join(root, "state/project-state.json");
  const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  const { index, item } = findReauditItem(state, pos);
  if (!item) throw new Error(`${pos}: no active TOP10_REAUDIT queue item.`);
  if (item.status !== "IN_PROGRESS") throw new Error(`${pos}: revisions only while IN_PROGRESS (not ${item.status}).`);
  if (!(item.completed_tasks ?? []).includes(o.task_id)) throw new Error(`${o.task_id} is not a completed (approved) task.`);
  if (!o.approved_by || !o.approved_at || !o.note) throw new Error("approved_by, approved_at and note are required.");
  if (!(o.revision >= 2)) throw new Error("revision must be >= 2");
  const prior = effectiveRatings(pos, item, root).find(a => a.task_id === o.task_id);
  if (!prior) throw new Error(`${o.task_id}: no approved effective rating to supersede.`);
  const dir = path.join(root, "research-inbox", pos, o.task_id);
  const task = JSON.parse(fs.readFileSync(path.join(dir, "task.json"), "utf8"));
  // Addendum 2026-11-04d: a superseding run reads its fresh run-scoped evidence (evidence-R2.json), never the earlier run's file.
  const run = reauditRunTag(state, pos); if (run) task.inbox_run = run;
  const text = fs.readFileSync(path.join(dir, `revision-A${o.revision}.md`), "utf8");
  const cwd = process.cwd();
  try {
    process.chdir(root);
    const research = deps.research ?? await createResearchAdapter();
    const evidence = await research.gather(task);
    if (!evidence.minimum_evidence_met) throw new Error(`${o.task_id}: evidence gate failed: ${JSON.stringify(evidence.missing_evidence)}`);
    const parsed: any = parseAuditJson(text);
    parsed.audit_id = `${o.task_id}_A${o.revision}`; parsed.task_id = o.task_id; parsed.task_type = "player_rating"; parsed.audit_type = "TOP10_REAUDIT";
    parsed.revision = o.revision; parsed.supersedes = prior.audit_id;
    let v: any = withTransportChecks(validateAudit(parsed), parsed, evidence, selectedTransport());
    const se = stageOutputErrors(task, parsed);
    if (!v.valid || se.length) throw new Error(`${parsed.audit_id} invalid: ${JSON.stringify([...(v.errors ?? []), ...se])}`);
    parsed.style_similarity = effectiveRatings(pos, item, root).filter(a => a.task_id !== o.task_id)
      .map(a => ({ player: (a.players ?? [a.player_id])[0], audit_id: a.audit_id, ...styleSimilarity(parsed.ratings, a.ratings) }));
    const close = parsed.style_similarity.filter((x: any) => x.too_similar);
    if (close.length) throw new Error(`${parsed.audit_id}: STYLE_PROFILE_TOO_SIMILAR ${JSON.stringify(close)}`);
    parsed.major_flags = [...new Set([...(parsed.major_flags ?? []), ...v.flags])];
    parsed.status = "FLAGGED";
    saveAuditRecord(parsed, text);
    item.audit_ids = [...item.audit_ids, parsed.audit_id];
    item.approvals = [...item.approvals, { decision: "APPROVED", task_id: o.task_id, audit_id: parsed.audit_id, supersedes: prior.audit_id, approved_by: o.approved_by, approved_at: o.approved_at, note: o.note }];
    item.last_result = { task_id: o.task_id, status: "REVISION_APPROVED", audit_id: parsed.audit_id, supersedes: prior.audit_id, flags: parsed.major_flags };
    item.updated_at = new Date().toISOString();
    state.pending_reaudit_queue[index] = item; fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n");
    return { audit_id: parsed.audit_id, supersedes: prior.audit_id, proposed_ovr: parsed.proposed_ovr, style_similarity: parsed.style_similarity, flags: parsed.major_flags };
  } finally { process.chdir(cwd); }
}

if (process.argv[1] && /rating-revision\.[tj]s$/.test(process.argv[1])) {
  const argv = process.argv.slice(2); const opt = (k: string) => { const j = argv.indexOf(k); return j >= 0 ? argv[j + 1] : undefined; };
  if (opt("--confirm") !== "TOP10_REAUDIT_REVISE") { console.error("Refusing: pass --confirm TOP10_REAUDIT_REVISE."); process.exit(2); }
  reviseRating(String(argv[0]).toUpperCase(), { task_id: opt("--task")!, revision: Number(opt("--revision")), approved_by: opt("--by")!, approved_at: opt("--at")!, note: opt("--note")! })
    .then(r => console.log(JSON.stringify(r, null, 2))).catch(e => { console.error(String(e?.message ?? e)); process.exitCode = 1; });
}
