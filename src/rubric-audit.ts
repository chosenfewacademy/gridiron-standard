import fs from "node:fs";
import path from "node:path";

export interface RubricFactor {
  id: string;
  status: "ENCODED" | "PROSE" | "PARTIAL" | "MISSING";
  source: string;
  rule: string;
  gap: string;
}

export interface RubricFile {
  id: string;
  version: string;
  ordered_at: string;
  explicit_current_data_reaudit: boolean;
  factors: RubricFactor[];
}

export function loadRubric(root = process.cwd()): RubricFile {
  return JSON.parse(fs.readFileSync(path.join(root, "config/rating-rubric.json"), "utf8")) as RubricFile;
}

/** Re-reads the cited configs so a rubric gap is a property of this tree, not a slogan. */
export function auditRubric(root = process.cwd()): { factors: RubricFactor[]; open_gaps: string[]; checks: string[] } {
  const rubric = loadRubric(root);
  const checks: string[] = [];
  const weekly = JSON.parse(fs.readFileSync(path.join(root, "config/weekly-update.json"), "utf8"));
  if (JSON.stringify(weekly.applies_to) !== JSON.stringify(["QB"])) checks.push("weekly evidence window is not league-wide");
  if (weekly.ea_ratings_as_evidence !== false) checks.push("weekly config allows EA ratings as evidence");
  const metrics = JSON.parse(fs.readFileSync(path.join(root, "config/position-metrics.json"), "utf8"));
  const notes = (metrics.notes ?? []).join(" ");
  if (!/no Madden OVR formula/i.test(notes)) checks.push("position metrics no longer disclaim an OVR formula");
  const weights = JSON.parse(fs.readFileSync(path.join(root, "config/madden-ovr-weights.estimated.json"), "utf8"));
  if (weights.verified !== false || weights.madden_order_verified !== false) checks.push("estimated Madden weights are marked verified");
  const scarcity = JSON.parse(fs.readFileSync(path.join(root, "config/scarcity-rules.json"), "utf8"));
  if (!/historic or generational/i.test(String(scarcity["99"]))) checks.push("99 scarcity text changed");
  const sequence = JSON.parse(fs.readFileSync(path.join(root, "config/position-sequence.json"), "utf8")).sequence as string[];
  if (sequence.length !== 22) checks.push(`position sequence has ${sequence.length} buckets, not 22`);
  const open = [...rubric.factors.filter(factor => factor.status !== "ENCODED").map(factor => factor.id), ...checks];
  return { factors: rubric.factors, open_gaps: open, checks };
}
