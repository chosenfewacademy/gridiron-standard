import type { ParsedAudit } from "./audit-parser.js";
import type { EvidencePackage } from "./research.js";
import type { ValidationResult } from "./audit-validator.js";

/**
 * Structural enforcement of AGENTS.md Core Rating Rules 5-8 for file-delivered (Grok Bot) audits:
 * "document all 90+/95+/97+/99 traits with explicit evidence support".
 * It does not compute, cap or reconstruct ratings; it only rejects unsupported claims so the
 * existing revision loop (max 3) returns them to the analyst.
 *
 * Required audit field: high_trait_evidence: { [ATTR]: { tier, claim, source_urls[] } } for every rating >= 90.
 */
export const HIGH_TIERS = [
  { min: 99, tier: "GENERATIONAL" },   // Rule 5: historic/generational exact traits
  { min: 97, tier: "EXTRAORDINARY" },  // Rule 6: extraordinary league-defining evidence
  { min: 95, tier: "LEAGUE_DEFINING" },// Rule 7: rare league-defining exact-trait evidence
  { min: 90, tier: "ELITE" }           // Rule 8: demonstrably elite exact-trait evidence
] as const;
const EA = /(^|\.)ea\.com$|maddenratings|madden-?ratings/i;

export function requiredTier(rating: number): string | null {
  return HIGH_TIERS.find(t => rating >= t.min)?.tier ?? null;
}

export function validateHighTraitEvidence(audit: ParsedAudit, evidence: EvidencePackage): string[] {
  const errors: string[] = [];
  const ratings = audit.ratings ?? {};
  const listed = new Map((evidence.sources ?? []).filter(s => s.url).map(s => [s.url as string, s]));
  if (Object.keys(ratings).length && !evidence.minimum_evidence_met) errors.push("RATINGS_WITHOUT_GATED_EVIDENCE");
  if (Object.keys(ratings).length && !listed.size) errors.push("RATINGS_WITHOUT_STAT_OR_PERFORMANCE_SOURCES");
  const support = (audit as any).high_trait_evidence as Record<string, { tier?: string; claim?: string; source_urls?: string[] }> | undefined;
  for (const [attr, value] of Object.entries(ratings)) {
    const tier = typeof value === "number" ? requiredTier(value) : null;
    if (!tier) continue;
    const entry = support?.[attr];
    if (!entry) { errors.push(`HIGH_TRAIT_EVIDENCE_MISSING:${attr}=${value} requires ${tier}`); continue; }
    if (entry.tier !== tier) errors.push(`HIGH_TRAIT_TIER_MISMATCH:${attr}=${value} requires ${tier}, got ${entry.tier}`);
    if (!entry.claim?.trim()) errors.push(`HIGH_TRAIT_CLAIM_MISSING:${attr}`);
    const urls = entry.source_urls ?? [];
    if (!urls.length) errors.push(`HIGH_TRAIT_SOURCES_MISSING:${attr}`);
    for (const url of urls) {
      if (!listed.has(url)) errors.push(`HIGH_TRAIT_SOURCE_NOT_IN_EVIDENCE:${attr}:${url}`);
      try { if (EA.test(new URL(url).hostname) || EA.test(url)) errors.push(`EA_RATING_USED_AS_EVIDENCE:${attr}`); } catch { errors.push(`HIGH_TRAIT_SOURCE_INVALID_URL:${attr}`); }
    }
  }
  return [...new Set(errors)];
}

/** Applies the extra structural checks only for the Grok Bot transport; Codex path is unchanged. */
export function withTransportChecks(result: ValidationResult, audit: ParsedAudit, evidence: EvidencePackage, transport: string): ValidationResult {
  if (transport !== "GROK_BOT_FILE_TRANSPORT") return result;
  const extra = validateHighTraitEvidence(audit, evidence);
  if (!extra.length) return result;
  return { ...result, valid: false, auto_approve: false, errors: [...result.errors, ...extra] };
}
