import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { evaluateQbEvidenceCriticality, QB_ATTRIBUTE_CRITICALITY, QB_ATTRIBUTE_EVIDENCE_HIERARCHY } from "./qb-evidence-policy.js";
import { resolveAuthoritativeSeasonContext } from "./season-phase.js";

const auditId="6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3";
const dir=path.resolve("logs/qb-reconstruction/matthew_stafford",auditId);
const checkpointPath=path.join(dir,"evidence-progress.json");
const checkpoint=JSON.parse(fs.readFileSync(checkpointPath,"utf8"));
const hash=(file:string)=>createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const protectedFiles=["data/baselines/QB.json","state/project-state.json","state/locks.json",checkpointPath].filter(fs.existsSync);
const before=Object.fromEntries(protectedFiles.map(file=>[file,hash(file)]));
const conflicts=checkpoint.base_evidence?.conflicts ?? [];
const gate=evaluateQbEvidenceCriticality(checkpoint.categories,conflicts);
const calendar=resolveAuthoritativeSeasonContext({cached:checkpoint.base_evidence?.calendar},"2026-09-05T12:00:00-04:00",checkpoint.task);
if(calendar.status!=="RESOLVED") gate.blockers.push("CALENDAR_UNRESOLVED");
const controls=checkpoint.categories.locked_control_comparisons?.normalized_evidence?.compared_controls ?? [];
const expected=checkpoint.task?.baseline_controls?.top_10?.map((x:any)=>x.player) ?? [];
if(!expected.length || !expected.every((name:string)=>controls.includes(name))) gate.blockers.push("POSITIONAL_COMPARISON_INSUFFICIENT");
const attributes=Object.fromEntries(Object.keys(QB_ATTRIBUTE_CRITICALITY).map(attribute=>{
  const subject=gate.subjects.find(x=>x.name===`trait:${attribute}`)!;
  return [attribute,{criticality:QB_ATTRIBUTE_CRITICALITY[attribute as keyof typeof QB_ATTRIBUTE_CRITICALITY],status:subject.status,
    confidence:subject.confidence,evidence_tier:subject.evidence_tier,valid_evidence_path:subject.substitute_approved,
    classification:gate.blockers.some(x=>x.endsWith(`trait:${attribute}`))?"GENUINE_PROPOSAL_BLOCKER":
      gate.secondary_low_confidence.some(x=>x.endsWith(`trait:${attribute}`))?"ACCEPTABLE_LOW_CONFIDENCE_SECONDARY_GAP":
      gate.supporting_weaknesses.some(x=>x.endsWith(`trait:${attribute}`))?"SUPPORTING_WEAKNESS":"SUPPORTED",
    hierarchy:QB_ATTRIBUTE_EVIDENCE_HIERARCHY[attribute as keyof typeof QB_ATTRIBUTE_EVIDENCE_HIERARCHY]}];
}));
const acceptedEvidenceItems=Object.values(checkpoint.categories as Record<string,any>).reduce((sum:number,c:any)=>sum+(c.accepted_evidence?.length??0),0);
const after=Object.fromEntries(protectedFiles.map(file=>[file,hash(file)]));
const report={simulation:"READ_ONLY_STAFFORD_EVIDENCE_GATE",audit_id:auditId,as_of:"2026-09-05T12:00:00-04:00",
  accepted_evidence_items:acceptedEvidenceItems,calendar,minimum_evidence_met:calendar.status==="RESOLVED"&&gate.blockers.length===0,
  proposal_generated:false,research_performed:false,blockers:[...new Set(gate.blockers)],supporting_weaknesses:gate.supporting_weaknesses,
  secondary_low_confidence:gate.secondary_low_confidence,contextual_gaps:gate.contextual_gaps,categories_still_needing_research:[...new Set(gate.blockers.map(x=>x.split(":").slice(1).join(":")))] .filter(Boolean),
  attributes,protected_state_unchanged:JSON.stringify(before)===JSON.stringify(after),protected_hashes:after};
fs.writeFileSync(path.join(dir,"evidence-criticality-gate-simulation.json"),JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify(report,null,2));
