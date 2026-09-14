const QB_ATTRIBUTES = ['THP','SAC','MAC','DAC','RUN','TUP','PAC','BSK','AWR','SPD','ACC','AGI','COD','STR','CAR','JMP','INJ','STA','TGH'] as const;
const QB_DOMAINS = ['arm_strength','short_accuracy','intermediate_accuracy','deep_accuracy','pressure_performance','pocket_movement','sack_avoidance','processing_decision_making','play_action','throws_on_run','scrambling','designed_rushing','ball_security','durability','workload_availability','consistency','opponent_context_adjustments'] as const;

export const EVIDENCE_CRITICALITIES = ["CORE_BLOCKING", "CORE_SUPPORTING", "SECONDARY_TRAIT", "CONTEXTUAL"] as const;
export type EvidenceCriticality = typeof EVIDENCE_CRITICALITIES[number];
export type EvidenceConfidence = "HIGH" | "MEDIUM" | "LOW";
export type EvidenceTier = 1 | 2 | 3 | 4 | 5;

export const QB_ATTRIBUTE_CRITICALITY: Record<typeof QB_ATTRIBUTES[number], EvidenceCriticality> = {
  THP:"CORE_BLOCKING", SAC:"CORE_BLOCKING", MAC:"CORE_BLOCKING", DAC:"CORE_BLOCKING", TUP:"CORE_BLOCKING",
  BSK:"CORE_BLOCKING", AWR:"CORE_BLOCKING", INJ:"CORE_BLOCKING", RUN:"CORE_SUPPORTING", PAC:"CORE_SUPPORTING",
  CAR:"CORE_SUPPORTING", SPD:"SECONDARY_TRAIT", ACC:"SECONDARY_TRAIT", AGI:"SECONDARY_TRAIT", COD:"SECONDARY_TRAIT",
  STR:"SECONDARY_TRAIT", JMP:"SECONDARY_TRAIT", STA:"SECONDARY_TRAIT", TGH:"SECONDARY_TRAIT"
};

export const QB_DOMAIN_CRITICALITY: Record<typeof QB_DOMAINS[number], EvidenceCriticality> = {
  arm_strength:"CORE_BLOCKING", short_accuracy:"CORE_BLOCKING", intermediate_accuracy:"CORE_BLOCKING",
  deep_accuracy:"CORE_BLOCKING", pressure_performance:"CORE_BLOCKING", pocket_movement:"CORE_BLOCKING",
  sack_avoidance:"CORE_BLOCKING", processing_decision_making:"CORE_BLOCKING", workload_availability:"CORE_BLOCKING",
  durability:"CORE_BLOCKING", play_action:"CORE_SUPPORTING", throws_on_run:"CORE_SUPPORTING", scrambling:"CORE_SUPPORTING",
  designed_rushing:"CORE_SUPPORTING", ball_security:"CORE_SUPPORTING", opponent_context_adjustments:"CORE_SUPPORTING",
  consistency:"CONTEXTUAL"
};

export const QB_ATTRIBUTE_EVIDENCE_HIERARCHY: Record<typeof QB_ATTRIBUTES[number], readonly string[]> = Object.fromEntries(
  QB_ATTRIBUTES.map(attribute => [attribute, [
    attribute === "SPD" || attribute === "ACC" || attribute === "AGI" || attribute === "COD" || attribute === "STR" || attribute === "JMP"
      ? "Tier 1: current NFL tracking, GPS, or directly measured current data" : "Tier 1: current direct NFL play-level, tracking, or charted exact-trait evidence",
    attribute === "INJ" || attribute === "STA" || attribute === "TGH"
      ? "Tier 2: current official participation, injury, practice, snap, and availability records" : "Tier 2: recent verified measurement or reputable advanced charting",
    "Tier 3: historical verified measurement or completed-season exact-trait evidence, adjusted cautiously for age, injury, and role",
    "Tier 4: recent play-level evidence and credible film/charting tied directly to the trait",
    "Tier 5: conservative bounded inference from established career profile when no better public evidence exists"
  ]])
) as unknown as Record<typeof QB_ATTRIBUTES[number], readonly string[]>;

const categoryCriticality: Record<string, EvidenceCriticality> = {
  current_role:"CORE_BLOCKING", roster_depth_chart:"CORE_BLOCKING", injury_practice_status:"CORE_BLOCKING",
  durability_availability:"CORE_BLOCKING", passing_production_efficiency:"CORE_BLOCKING", pressure_performance:"CORE_BLOCKING",
  accuracy_by_depth:"CORE_BLOCKING", turnover_worthy_mistakes:"CORE_BLOCKING", scrambling_sack_avoidance:"CORE_BLOCKING",
  multi_year_trend:"CORE_BLOCKING", locked_control_comparisons:"CORE_BLOCKING", outside_control_comparisons:"CORE_BLOCKING",
  advanced_passing_metrics:"CORE_SUPPORTING", rushing_designed_run_value:"CORE_SUPPORTING", postseason_context:"CORE_SUPPORTING",
  recent_performance_trend:"CORE_SUPPORTING", performance_summary:"CONTEXTUAL", age_career_trajectory:"CONTEXTUAL",
  team_system_context:"CONTEXTUAL", preseason_participation:"CONTEXTUAL"
};

export interface GateSubject { name: string; criticality: EvidenceCriticality; status: string; confidence: EvidenceConfidence | null;
  evidence_tier: EvidenceTier | null; substitute_approved: boolean }
export interface QbGateResult { minimum_evidence_met: boolean; reasons: string[]; blockers: string[];
  supporting_weaknesses: string[]; secondary_low_confidence: string[]; contextual_gaps: string[]; subjects: GateSubject[] }

function assessment(raw: any): { status:string; confidence:EvidenceConfidence|null; items:any[]; limitations:string[] } {
  const value = raw?.normalized_evidence ?? raw;
  return { status: String(value?.status ?? raw?.status ?? "missing").toLowerCase(), confidence: value?.confidence ?? null,
    items: Array.isArray(value?.items) ? value.items : [], limitations: Array.isArray(value?.limitations) ? value.limitations : [] };
}
function inferredTier(value: ReturnType<typeof assessment>): EvidenceTier | null {
  if (!value.items.length) return null;
  const text = JSON.stringify(value).toLowerCase();
  if (text.includes("tracking") || text.includes("next gen") || text.includes("gps")) return 1;
  if (text.includes("verified") || text.includes("charting") || text.includes("advanced")) return 2;
  if (text.includes("combine") || text.includes("pro day") || value.items.some(i => i.period === "REGULAR_SEASON")) return 3;
  if (text.includes("film") || text.includes("play-level")) return 4;
  return 5;
}

export function evaluateQbEvidenceCriticality(categories: Record<string, unknown>, providerConflicts: unknown[] = []): QbGateResult {
  const subjects: GateSubject[] = [];
  const add = (name:string, criticality:EvidenceCriticality, raw:any) => {
    const value=assessment(raw); const tier=inferredTier(value);
    const substituteApproved = value.items.length > 0 && tier !== null &&
      (criticality === "SECONDARY_TRAIT" ? tier <= 5 : criticality === "CORE_SUPPORTING" ? tier <= 4 : tier <= 3);
    subjects.push({ name, criticality, status:value.status, confidence:value.confidence, evidence_tier:tier, substitute_approved:substituteApproved });
  };
  for (const [name, criticality] of Object.entries(categoryCriticality)) add(name, criticality, categories[name]);
  for (const [name, criticality] of Object.entries(QB_DOMAIN_CRITICALITY)) add(`domain:${name}`, criticality, categories[`domain:${name}`]);
  const secondarySubstitutes:Record<string,string[]>={
    SPD:["domain:scrambling"], ACC:["domain:scrambling","domain:pocket_movement"], AGI:["domain:pocket_movement","domain:scrambling"],
    COD:["domain:pocket_movement","domain:scrambling"], STR:[], JMP:[],
    STA:["domain:workload_availability","durability_availability"], TGH:["domain:durability","injury_practice_status"]
  };
  for (const [name, criticality] of Object.entries(QB_ATTRIBUTE_CRITICALITY)) {
    let raw=categories[`trait:${name}`]; const value=assessment(raw);
    if (criticality === "SECONDARY_TRAIT" && !value.items.length) {
      const substitute=(secondarySubstitutes[name]??[]).map(key=>categories[key]).find(candidate=>assessment(candidate).items.length);
      if (substitute) raw={...assessment(substitute),status:"partial",confidence:"LOW",limitations:["Approved cross-domain conservative substitute; direct current measurement unavailable."]};
    }
    add(`trait:${name}`, criticality, raw);
  }
  const blockers:string[]=[]; const supporting_weaknesses:string[]=[]; const secondary_low_confidence:string[]=[]; const contextual_gaps:string[]=[];
  for (const s of subjects) {
    const supported=s.status === "satisfied" && s.confidence !== "LOW";
    if (s.criticality === "CORE_BLOCKING" && (!supported || s.evidence_tier === null || s.evidence_tier > 3)) blockers.push(`BLOCKING_CORE_EVIDENCE_MISSING:${s.name}`);
    else if (s.criticality === "CORE_SUPPORTING" && !supported) {
      if (s.substitute_approved) supporting_weaknesses.push(`SUPPORTING_EVIDENCE_WEAK:${s.name}`);
      else blockers.push(`INVALID_SUPPORTING_SUBSTITUTE:${s.name}`);
    } else if (s.criticality === "SECONDARY_TRAIT" && !supported) {
      if (s.substitute_approved) secondary_low_confidence.push(`SECONDARY_TRAIT_LOW_CONFIDENCE:${s.name}`);
      else blockers.push(`SECONDARY_TRAIT_NO_VALID_EVIDENCE_PATH:${s.name}`);
    } else if (s.criticality === "CONTEXTUAL" && !supported) contextual_gaps.push(`CONTEXTUAL_EVIDENCE_GAP:${s.name}`);
  }
  if (providerConflicts.some((conflict:any)=>!String(conflict?.resolution??"").trim())) blockers.push("PROVIDER_CONFLICT_UNRESOLVED");
  const reasons=[...blockers,...supporting_weaknesses,...secondary_low_confidence,...contextual_gaps];
  return { minimum_evidence_met:blockers.length===0, reasons, blockers, supporting_weaknesses, secondary_low_confidence, contextual_gaps, subjects };
}

export function validateRatingConfidence(attribute: typeof QB_ATTRIBUTES[number], rating:number, confidence:EvidenceConfidence,
  tier:EvidenceTier, directOrInferred:"DIRECT"|"SUBSTITUTED"|"INFERRED"): string[] {
  const errors:string[]=[]; const criticality=QB_ATTRIBUTE_CRITICALITY[attribute];
  if (criticality === "CORE_BLOCKING" && confidence === "LOW") errors.push(`LOW_CORE_BLOCKING_CONFIDENCE:${attribute}`);
  if (criticality === "CORE_SUPPORTING" && confidence === "LOW" && (tier > 4 || directOrInferred === "INFERRED")) errors.push(`INVALID_LOW_SUPPORTING_SUBSTITUTE:${attribute}`);
  if (confidence === "LOW" && rating >= 90) errors.push(`LOW_CONFIDENCE_SCARCITY_PROHIBITED:${attribute}`);
  if (criticality === "SECONDARY_TRAIT" && confidence === "LOW" && directOrInferred === "DIRECT") errors.push(`LOW_CONFIDENCE_DIRECTNESS_CONFLICT:${attribute}`);
  return errors;
}
