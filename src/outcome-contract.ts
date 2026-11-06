/**
 * Checks that would have failed the pre-correction PHI@DAL engine:
 * a yards-per-carry target, a team or name penalty stacked on attributes,
 * and a rating that does not belong to the mechanism.
 *
 * The attached 800-game win rates and yards-per-carry figures are not inputs.
 */

export interface ShockSample {
  id: string;
  baseline: number;
  shocked: number;
  direction: "up" | "down" | "flat";
}

export function assertShockSample(sample: ShockSample): void {
  const delta = sample.shocked - sample.baseline;
  if (sample.direction === "flat") {
    if (delta !== 0) throw new Error(`IRRELEVANT_RATING_MOVED:${sample.id}:${delta}`);
    return;
  }
  if (delta === 0) throw new Error(`ANCHORED_OUTCOME:${sample.id}`);
  if (sample.direction === "up" && delta <= 0) throw new Error(`SHOCK_WRONG_SIGN:${sample.id}`);
  if (sample.direction === "down" && delta >= 0) throw new Error(`SHOCK_WRONG_SIGN:${sample.id}`);
}

export function assertShockContract(samples: ShockSample[]): void {
  for (const sample of samples) assertShockSample(sample);
}

/** True when every shock leaves the outcome on the baseline. That is a target, not a matchup. */
export function outcomeIsAnchored(baseline: number, shocked: number[]): boolean {
  return shocked.every(value => value === baseline);
}

export interface MechanismProposal {
  id: string;
  paths: { kind: "gs_attribute" | "pff_grade" | "overall" | "player_name" | "team" | "unit_average"; key: string }[];
  targetYards?: number;
  targetScore?: number;
  targetWinProbability?: number;
}

export function validateMechanismProposal(proposal: MechanismProposal): string[] {
  const errors: string[] = [];
  const attributePaths = proposal.paths.filter(path => path.kind === "gs_attribute");
  if (attributePaths.length < 1) errors.push("MECHANISM_NEEDS_AN_ATTRIBUTE_PATH");
  const kinds = new Set(proposal.paths.map(path => path.kind));
  if (kinds.has("gs_attribute") && (kinds.has("pff_grade") || kinds.has("overall") || kinds.has("unit_average"))) {
    errors.push("REPEATED_PLAYER_OR_TEAM_SIGNAL");
  }
  if (kinds.has("player_name") || kinds.has("team")) errors.push("NAME_OR_TEAM_STACK");
  const seen = new Set<string>();
  for (const path of attributePaths) {
    if (seen.has(path.key)) errors.push(`REPEATED_ATTRIBUTE:${path.key}`);
    seen.add(path.key);
  }
  if (proposal.targetYards !== undefined || proposal.targetScore !== undefined || proposal.targetWinProbability !== undefined) {
    errors.push("FIXED_OUTCOME_TARGET");
  }
  return errors;
}

export interface SourceFinding {
  id: "YARDAGE_TARGET" | "NAME_RATE_ADJUSTMENT" | "TEAM_GAP_PENALTY" | "STACKED_PFF_AND_ATTRIBUTE";
  index: number;
}

/**
 * Flags source text that steers a result. Log lines that mention a player
 * without changing a rate are not flagged.
 */
export function scanOutcomeSource(source: string): SourceFinding[] {
  const rules: { id: SourceFinding["id"]; pattern: RegExp }[] = [
    { id: "YARDAGE_TARGET", pattern: /ypc target|target\s*~\s*4\.0|targetYpc\s*[:=]|target_ypc\s*[:=]|targetYards\s*[:=]\s*4\.07/i },
    { id: "NAME_RATE_ADJUSTMENT", pattern: /if\s+\w+\[[^\]]+\]\s*==\s*['"][^'"]+['"][\s\S]{0,180}?\b(?:cmp_p|int_p|gap|base|mu|stuff_p|scramble_p|max_c)\s*(?:\+=|-=)/ },
    { id: "TEAM_GAP_PENALTY", pattern: /if\s+team\s*==\s*['"]PHI['"][\s\S]{0,80}?gap\s*-=/ },
    { id: "STACKED_PFF_AND_ATTRIBUTE", pattern: /pff_delta\([\s\S]{0,400}?A\(|A\([\s\S]{0,400}?pff_delta\(/ }
  ];
  const findings: SourceFinding[] = [];
  for (const rule of rules) {
    const match = rule.pattern.exec(source);
    if (match && match.index !== undefined) findings.push({ id: rule.id, index: match.index });
  }
  return findings;
}
