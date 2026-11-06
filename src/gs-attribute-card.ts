import fs from "node:fs";
import path from "node:path";

/**
 * Full-card composition for a Gridiron Standard profile.
 * An unrated trait is null. It is never stored as 0.
 * Overall is refused unless every applicable attribute is sourced, and even then
 * the number is an uncalibrated median of that profile. Rank and a target overall
 * are not inputs. Estimated Madden weights are not inputs.
 */

export type Confidence = "HIGH" | "MEDIUM" | "LOW";

export interface AttributeSource {
  url: string;
  retrieved_at: string;
  publisher: string;
}

export interface AttributeCell {
  attribute: string;
  status: "RATED" | "UNRATED";
  value: number | null;
  band?: string;
  confidence?: Confidence;
  sources?: AttributeSource[];
  claim?: string;
}

export interface ProfileSummary {
  status: "INCOMPLETE" | "UNCALIBRATED_PROFILE_MEDIAN";
  profile_summary: number | null;
  unrated: string[];
  not_a_validated_ovr: true;
  not_fit_to_rank: true;
}

const EA_HOST = /(^|\.)ea\.com$|maddenratings|madden-?ratings/i;
const ROLE_SPECIFIC = new Set(["FB", "LS"]);

export function applicableAttributes(position: string, root = process.cwd()): string[] {
  if (ROLE_SPECIFIC.has(position)) {
    const metrics = JSON.parse(fs.readFileSync(path.join(root, "config/position-metrics.json"), "utf8"));
    const list = metrics.positions?.[position]?.madden_attributes_informed as string[] | undefined;
    if (!list?.length) throw new Error(`NO_ROLE_ATTRIBUTES:${position}`);
    return list.filter(attribute => attribute !== "OVR");
  }
  const order = JSON.parse(fs.readFileSync(path.join(root, "config/madden-entry-order.json"), "utf8"));
  const list = order.positions?.[position] as string[] | undefined;
  if (!list?.length) throw new Error(`NO_ENTRY_ORDER:${position}`);
  return list.filter(attribute => attribute !== "OVR");
}

export function emptyProfile(position: string, root = process.cwd()): AttributeCell[] {
  return applicableAttributes(position, root).map(attribute => ({ attribute, status: "UNRATED", value: null }));
}

export function validateProfile(position: string, cells: AttributeCell[], root = process.cwd()): string[] {
  const errors: string[] = [];
  const applicable = applicableAttributes(position, root);
  const seen = new Map<string, AttributeCell>();
  for (const cell of cells) {
    if (seen.has(cell.attribute)) errors.push(`DUPLICATE_ATTRIBUTE:${cell.attribute}`);
    seen.set(cell.attribute, cell);
    if (!applicable.includes(cell.attribute)) errors.push(`IRRELEVANT_ATTRIBUTE:${cell.attribute}`);
    if (cell.status === "UNRATED") {
      if (cell.value !== null) errors.push(cell.value === 0 ? `UNRATED_DISGUISED_AS_ZERO:${cell.attribute}` : `UNRATED_HAS_VALUE:${cell.attribute}`);
      continue;
    }
    if (!Number.isInteger(cell.value) || (cell.value ?? 0) < 1 || (cell.value ?? 0) > 99) errors.push(`RATED_VALUE_REQUIRED:${cell.attribute}`);
    if (!cell.band?.trim()) errors.push(`BAND_REQUIRED:${cell.attribute}`);
    if (cell.confidence !== "HIGH" && cell.confidence !== "MEDIUM" && cell.confidence !== "LOW") errors.push(`CONFIDENCE_REQUIRED:${cell.attribute}`);
    if (!cell.claim || cell.claim.trim().length < 20) errors.push(`CLAIM_REQUIRED:${cell.attribute}`);
    if (!cell.sources?.length) errors.push(`SOURCE_REQUIRED:${cell.attribute}`);
    for (const source of cell.sources ?? []) {
      try {
        const host = new URL(source.url).hostname;
        if (EA_HOST.test(host) || EA_HOST.test(source.url)) errors.push(`EA_SOURCE_IS_NOT_A_TRAIT:${cell.attribute}`);
      } catch {
        errors.push(`SOURCE_URL_INVALID:${cell.attribute}`);
      }
      if (!source.publisher?.trim() || !source.retrieved_at?.trim()) errors.push(`SOURCE_PROVENANCE_REQUIRED:${cell.attribute}`);
    }
  }
  for (const attribute of applicable) if (!seen.has(attribute)) errors.push(`ATTRIBUTE_GAP:${attribute}`);
  return [...new Set(errors)];
}

export function summarizeProfile(cells: AttributeCell[], applicable: string[]): ProfileSummary {
  const by = new Map(cells.map(cell => [cell.attribute, cell]));
  const unrated = applicable.filter(attribute => by.get(attribute)?.status !== "RATED" || !Number.isInteger(by.get(attribute)?.value));
  if (unrated.length) return { status: "INCOMPLETE", profile_summary: null, unrated, not_a_validated_ovr: true, not_fit_to_rank: true };
  const values = applicable.map(attribute => by.get(attribute)!.value as number).sort((a, b) => a - b);
  const mid = values.length % 2 === 1 ? values[(values.length - 1) / 2] : Math.round((values[values.length / 2 - 1] + values[values.length / 2]) / 2);
  return { status: "UNCALIBRATED_PROFILE_MEDIAN", profile_summary: mid, unrated: [], not_a_validated_ovr: true, not_fit_to_rank: true };
}

const OVERALL_KEYS = new Set(["cells", "applicable"]);

/** Rank, a target overall, and any other field are rejected. The profile is the only input. */
export function deriveOverall(input: { cells: AttributeCell[]; applicable: string[] }): ProfileSummary {
  for (const key of Object.keys(input)) {
    if (!OVERALL_KEYS.has(key)) throw new Error(`OVERALL_INPUT_REJECTED:${key}`);
  }
  return summarizeProfile(input.cells, input.applicable);
}

/** True when display overalls step down with rank. That shape is not evidence the numbers came from attribute profiles. */
export function isRankShapedDisplay(rows: { rank: number; overall: number }[]): boolean {
  const ordered = [...rows].sort((a, b) => a.rank - b.rank);
  if (ordered.length < 3) return false;
  return ordered.every((row, index) => index === 0 || row.overall <= ordered[index - 1].overall);
}
