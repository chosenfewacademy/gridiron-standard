import { isDalTemplateAttribute } from "./historical-dal-template.js";

/**
 * Rules for turning evidence into a Gridiron Standard attribute.
 * They do not assign ratings and they do not read the local PHI@DAL engine.
 */

export const EVIDENCE_TO_RATING_RULES = [
  {
    id: "PFF_GRADE_IS_EVIDENCE_NOT_AN_ATTRIBUTE",
    text: "A PFF grade may be cited with season, facet, snap count, and source. It is not a Madden attribute. Do not copy the grade, raw or rounded, onto a trait."
  },
  {
    id: "OVR_IS_AN_OUTPUT",
    text: "Overall comes out of an evidence-built attribute profile. Do not pick an overall and expand it into traits with a position offset."
  },
  {
    id: "TEMPLATE_OFFSET_IS_NOT_EVIDENCE",
    text: "attribute = clamp(overall + position offset) is a template. It is not a measured trait and cannot support a rating assignment."
  },
  {
    id: "ESTIMATED_MADDEN_WEIGHTS_ARE_NOT_MADDEN_27",
    text: "config/madden-ovr-weights.estimated.json is unverified. It must not set attributes, overalls, or matchup probabilities, and it is not a validated Madden 27 reproduction."
  },
  {
    id: "HIGH_TRAIT_NEEDS_ITS_OWN_CITATION",
    text: "A trait at 90 or above needs cited evidence for that trait. A team grade, a college grade, or an overall does not establish it."
  },
  {
    id: "ONE_SIGNAL_ON_THE_SNAP",
    text: "On a matchup, each mechanism reads each contributing attribute once. Do not add the same player's PFF grade, overall, name, or team on top of those attributes."
  },
  {
    id: "NO_YARDAGE_OR_SCORE_TARGET",
    text: "Do not pin expected yards, a score, or a win probability to a historical figure or to a desired result."
  }
] as const;

export type EvidenceKind =
  | "cited_trait"
  | "preserved_anchor"
  | "pff_grade"
  | "template_offset"
  | "role_band"
  | "estimated_madden_weight";

export interface TraitEvidence {
  attribute: string;
  kind: EvidenceKind;
  /** Published PFF grade when kind is pff_grade. Never stored as the attribute. */
  grade?: number;
  claim?: string;
}

export function gradeCopiedOntoAttribute(attributeValue: number, grade: number): boolean {
  return attributeValue === grade || attributeValue === Math.round(grade);
}

/** Reject a proposed assignment. Does not rewrite an existing card. */
export function validateTraitAssignment(attributes: Record<string, number>, evidence: TraitEvidence[]): string[] {
  const errors: string[] = [];
  const byAttr = new Map<string, TraitEvidence[]>();
  for (const row of evidence) {
    const list = byAttr.get(row.attribute) ?? [];
    list.push(row);
    byAttr.set(row.attribute, list);
  }
  for (const [attribute, value] of Object.entries(attributes)) {
    const rows = byAttr.get(attribute) ?? [];
    if (!rows.length) errors.push(`MISSING_TRAIT_EVIDENCE:${attribute}`);
    for (const row of rows) {
      if (row.kind === "template_offset") errors.push(`TEMPLATE_OFFSET_IS_NOT_EVIDENCE:${attribute}`);
      if (row.kind === "role_band") errors.push(`ROLE_BAND_IS_NOT_A_TRAIT:${attribute}`);
      if (row.kind === "estimated_madden_weight") errors.push(`ESTIMATED_MADDEN_WEIGHT_IS_NOT_A_RATING_INPUT:${attribute}`);
      if (row.kind === "pff_grade") {
        if (typeof row.grade !== "number") errors.push(`PFF_GRADE_MISSING:${attribute}`);
        else if (gradeCopiedOntoAttribute(value, row.grade)) errors.push(`PFF_GRADE_COPIED_ONTO_ATTRIBUTE:${attribute}`);
        if (!row.claim?.trim()) errors.push(`PFF_GRADE_NEEDS_A_CLAIM:${attribute}`);
      }
      if ((row.kind === "cited_trait" || row.kind === "preserved_anchor") && !row.claim?.trim()) {
        errors.push(`CITED_TRAIT_NEEDS_A_CLAIM:${attribute}`);
      }
      if (value >= 90 && row.kind !== "cited_trait" && row.kind !== "preserved_anchor") {
        errors.push(`HIGH_TRAIT_WITHOUT_ITS_OWN_CITATION:${attribute}`);
      }
    }
  }
  return errors;
}

export interface TemplateCard {
  position: string;
  ovr: number;
  attributes: Record<string, number>;
}

export function templateAttributeKeys(card: TemplateCard): string[] {
  return Object.entries(card.attributes)
    .filter(([attribute, value]) => isDalTemplateAttribute(card.position, card.ovr, attribute, value))
    .map(([attribute]) => attribute);
}

export function summarizeTemplateUse(cards: TemplateCard[]): { attributes: number; template: number; other: number; share: number } {
  let attributes = 0;
  let template = 0;
  for (const card of cards) {
    const keys = Object.keys(card.attributes);
    attributes += keys.length;
    template += templateAttributeKeys(card).length;
  }
  const other = attributes - template;
  return { attributes, template, other, share: attributes ? template / attributes : 0 };
}

export function meanCenteredCorrelation(a: Record<string, number>, b: Record<string, number>, keys: string[]): number | null {
  if (keys.length < 2) return null;
  const xs = keys.map(key => a[key]);
  const ys = keys.map(key => b[key]);
  const mx = xs.reduce((s, v) => s + v, 0) / xs.length;
  const my = ys.reduce((s, v) => s + v, 0) / ys.length;
  let num = 0;
  let dx = 0;
  let dy = 0;
  for (let i = 0; i < xs.length; i++) {
    const xv = xs[i] - mx;
    const yv = ys[i] - my;
    num += xv * yv;
    dx += xv * xv;
    dy += yv * yv;
  }
  if (dx === 0 || dy === 0) return null;
  return num / Math.sqrt(dx * dy);
}

export function meanAbsoluteDifference(a: Record<string, number>, b: Record<string, number>, keys: string[]): number {
  return keys.reduce((s, key) => s + Math.abs(a[key] - b[key]), 0) / keys.length;
}

/** AGENTS.md unique playing-style flag: correlation >= 0.95 or mean absolute difference <= 3. */
export function profilesTooSimilar(a: Record<string, number>, b: Record<string, number>, keys: string[]): boolean {
  const correlation = meanCenteredCorrelation(a, b, keys);
  const mad = meanAbsoluteDifference(a, b, keys);
  return (correlation !== null && correlation >= 0.95) || mad <= 3;
}
