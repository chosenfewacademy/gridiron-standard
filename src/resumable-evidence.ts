import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { CALENDAR_MAX_AGE_MS } from "./season-phase.js";

export const EVIDENCE_CATEGORY_STATES = ["NOT_ATTEMPTED", "IN_PROGRESS", "SATISFIED", "PARTIAL", "MISSING", "FAILED_RETRYABLE", "FAILED_TERMINAL"] as const;
export type EvidenceCategoryState = typeof EVIDENCE_CATEGORY_STATES[number];
export const EVIDENCE_FAILURE_KINDS = ["NETWORK_TOOL_TIMEOUT", "RATE_LIMIT", "BUDGET_EXCEEDED", "SOURCE_UNAVAILABLE", "SOURCE_INSUFFICIENT",
  "PARSER_SCHEMA_FAILURE", "PROVIDER_CONFLICT", "GENUINE_EVIDENCE_UNAVAILABLE"] as const;
export type EvidenceFailureKind = typeof EVIDENCE_FAILURE_KINDS[number];

const evidenceItemSchema = z.object({ claim: z.string().min(1), source_url: z.string().url(),
  retrieved_at: z.string().datetime({ offset: true }), season: z.number().int(),
  period: z.enum(["REGULAR_SEASON", "POSTSEASON", "CURRENT_CONTEXT"]), evidence_tier:z.number().int().min(1).max(5).optional(),
  direct_or_inferred:z.enum(["DIRECT","SUBSTITUTED","INFERRED"]).optional() });
export type AcceptedEvidence = z.infer<typeof evidenceItemSchema>;
const assessmentSchema = z.object({ status: z.enum(["satisfied", "partial", "missing"]),
  confidence: z.enum(["HIGH", "MEDIUM", "LOW"]), items: z.array(evidenceItemSchema), limitations: z.array(z.string()),
  compared_controls: z.array(z.string()).optional() });
export type BatchAssessment = z.infer<typeof assessmentSchema>;

export interface CategoryCheckpoint {
  player_id: string; audit_id: string; evidence_category: string; status: EvidenceCategoryState;
  attempt_count: number; last_attempt_timestamp: string | null; source_urls: string[];
  accepted_evidence: AcceptedEvidence[]; normalized_evidence: BatchAssessment | null;
  unresolved_conflicts: unknown[]; missing_fields: string[]; retry_eligible: boolean; failure_reason: string | null;
  legacy_attempt_count?: number;
}
export interface RetryHistoryEntry { batch_id: string; categories: string[]; attempted_at: string;
  outcome: "SUCCESS"|"FAILURE"; failure_kind: EvidenceFailureKind | null; reason: string | null }
export interface EvidenceExecutionDiagnostic { micro_batch_id: string; attempt_number: number; started_at: string;
  ended_at: string; elapsed_ms: number; thread_id: string | null; timeout_stage: "THREAD_START"|"THREAD_RUN"|"NORMALIZATION"|null;
  outcome: "SUCCESS"|"FAILURE"; failure_kind: EvidenceFailureKind|null;
  transport?:"OPENAI_RESPONSES_TRANSPORT"|"SDK_TRANSPORT"|"EPHEMERAL_CLI_TRANSPORT";
  model?: string; response_id?: string|null; input_tokens?:number; output_tokens?:number; total_tokens?:number;
  web_search_calls?:number }
export interface EvidenceCheckpoint {
  schema_version: "1.0.0"; audit_id: string; player_id: string; player_name: string; position: string;
  task: Record<string, unknown>; created_at: string; updated_at: string; max_attempts: number;
  categories: Record<string, CategoryCheckpoint>; retry_history: RetryHistoryEntry[];
  execution_diagnostics: EvidenceExecutionDiagnostic[];
  source_provenance: Array<Record<string, unknown>>; minimum_evidence_met: boolean;
  source_artifact?: string; base_evidence?: Record<string, unknown>;
  micro_batch_migration_version?: "1.0.0";
  migration_history?: Array<{migrated_at:string;from:string;to:string;categories:string[]}>;
}
export interface EvidenceCheckpointStore { load(auditId: string): Promise<EvidenceCheckpoint>; save(value: EvidenceCheckpoint): Promise<void> }
export interface EvidenceBatch { id: string; categories: string[] }
export interface BatchRequest { audit_id: string; player_id: string; player_name: string; position: string;
  batch_id: string; categories: string[]; prior_evidence: Record<string, BatchAssessment | null>; avoid_source_urls: string[];
  attempt_number: number; task: Record<string, unknown> }
export interface BatchResult { categories: Record<string, BatchAssessment>; sources: Array<Record<string, unknown>>;
  conflicts?: Array<{category: string; [key: string]: unknown}>; missing_fields?: Record<string, string[]>;
  failure_kind?: EvidenceFailureKind; failure_reason?: string; diagnostic?: EvidenceExecutionDiagnostic }
export interface BatchCollector { collect(request: BatchRequest): Promise<BatchResult> }

export const QB_EVIDENCE_BATCHES: EvidenceBatch[] = [
  { id: "A1_PASSING_PRODUCTION_EFFICIENCY", categories: ["performance_summary", "passing_production_efficiency", "domain:consistency"] },
  { id: "A2_ADVANCED_PASSING", categories: ["advanced_passing_metrics", "domain:workload_availability"] },
  { id: "A3_PRESSURE", categories: ["pressure_performance", "domain:pressure_performance", "trait:TUP"] },
  { id: "A4_ACCURACY_DEPTH", categories: ["accuracy_by_depth", "domain:deep_accuracy", "trait:DAC"] },
  { id: "A5_SHORT_ACCURACY", categories: ["domain:short_accuracy", "trait:SAC"] },
  { id: "A6_INTERMEDIATE_ACCURACY", categories: ["domain:intermediate_accuracy", "trait:MAC"] },
  { id: "B1_PROCESSING", categories: ["domain:processing_decision_making", "domain:play_action", "trait:AWR"] },
  { id: "B2_TURNOVERS", categories: ["turnover_worthy_mistakes"] },
  { id: "B3_SACK_AVOIDANCE", categories: ["scrambling_sack_avoidance", "domain:sack_avoidance", "trait:BSK"] },
  { id: "B4_BALL_SECURITY", categories: ["domain:ball_security", "trait:CAR"] },
  { id: "B5_MOVING_THROWS", categories: ["domain:pocket_movement", "domain:throws_on_run", "trait:RUN"] },
  { id: "C1_SCRAMBLING", categories: ["domain:scrambling", "trait:AGI", "trait:COD"] },
  { id: "C2_DESIGNED_RUSHING", categories: ["rushing_designed_run_value", "domain:designed_rushing"] },
  { id: "C3_MOVEMENT", categories: ["trait:SPD", "trait:ACC"] },
  { id: "D1_DURABILITY_AVAILABILITY", categories: ["durability_availability", "domain:durability", "trait:INJ"] },
  { id: "D2_INJURY_PRACTICE", categories: ["injury_practice_status", "trait:TGH"] },
  { id: "D3_ROLE_DEPTH", categories: ["current_role", "roster_depth_chart", "trait:STA"] },
  { id: "D4_PRESEASON", categories: ["preseason_participation"] },
  { id: "D5_PHYSICAL_CONTEXT", categories: ["trait:STR", "trait:JMP"] },
  { id: "E1_MULTI_YEAR", categories: ["multi_year_trend", "recent_performance_trend"] },
  { id: "E2_AGE_TRAJECTORY", categories: ["age_career_trajectory", "domain:arm_strength", "trait:THP"] },
  { id: "E3_TEAM_SYSTEM", categories: ["team_system_context", "trait:PAC"] },
  { id: "E4_POSTSEASON", categories: ["postseason_context"] },
  { id: "F1_LOCKED_CONTROLS", categories: ["locked_control_comparisons"] },
  { id: "F2_OUTSIDE_CONTROLS", categories: ["outside_control_comparisons"] },
  { id: "F3_CONTEXT_ADJUSTMENT", categories: ["domain:opponent_context_adjustments"] }
];
export const QB_CURRENT_SEASON_BATCH: EvidenceBatch = { id: "A0_CURRENT_SEASON", categories: ["current_season_performance"] };

export function ensureCheckpointCategories(checkpoint: EvidenceCheckpoint, names: string[]): EvidenceCheckpoint {
  const next = structuredClone(checkpoint);
  for (const name of names) if (!next.categories[name]) next.categories[name] = emptyCategory(next.player_id, next.audit_id, name);
  return next;
}

export function checkpointFromEvidence(input: { audit_id: string; player_id: string; player_name: string; position: string;
  task: Record<string, unknown>; evidence: Record<string, any>; source_artifact: string; now: string }): EvidenceCheckpoint {
  const names = [...QB_EVIDENCE_BATCHES.flatMap(batch => batch.categories), "position_specific_traits"];
  const checkpoint = createCheckpoint({ ...input, category_names: [...new Set(names)] });
  checkpoint.source_artifact = input.source_artifact; checkpoint.base_evidence = structuredClone(input.evidence);
  checkpoint.source_provenance = Array.isArray(input.evidence.sources) ? structuredClone(input.evidence.sources) : [];
  for (const name of Object.keys(checkpoint.categories)) {
    let raw: unknown;
    if (name.startsWith("domain:")) raw = input.evidence.normalized?.position_specific_traits?.domain_assessments?.[name.slice(7)];
    else if (name.startsWith("trait:")) raw = input.evidence.normalized?.position_specific_traits?.trait_assessments?.[name.slice(6)];
    else raw = input.evidence.normalized?.[name];
    const parsed = assessmentSchema.safeParse(raw); if (!parsed.success) continue;
    const category = checkpoint.categories[name]; category.normalized_evidence = parsed.data;
    category.accepted_evidence = parsed.data.items; category.source_urls = [...new Set(parsed.data.items.map(x => x.source_url))];
    category.missing_fields = parsed.data.limitations; category.status = parsed.data.status.toUpperCase() as EvidenceCategoryState;
    category.retry_eligible = category.status !== "SATISFIED";
  }
  const nested = Object.keys(checkpoint.categories).filter(x => x.startsWith("domain:") || x.startsWith("trait:"));
  checkpoint.categories.position_specific_traits.status = nested.every(x => checkpoint.categories[x].status === "SATISFIED") ? "SATISFIED" : "PARTIAL";
  checkpoint.categories.position_specific_traits.retry_eligible = false;
  checkpoint.minimum_evidence_met = false; return checkpoint;
}

// One-time compatibility migration for attempts exhausted by the retired broad
// batches. Genuine evidence-unavailable outcomes remain terminal.
export function migrateLegacyBroadBatchFailures(checkpoint: EvidenceCheckpoint, now: string): EvidenceCheckpoint {
  const next=structuredClone(checkpoint); if(next.micro_batch_migration_version==="1.0.0") return next;
  const legacyIds=new Set(["A_PRODUCTION_EFFICIENCY_WORKLOAD","B_ACCURACY_DEPTH_PRESSURE","C_PROCESSING_SACKS_SECURITY",
    "D_RUSHING_SCRAMBLING","E_DURABILITY_INJURY_ROLE","F_MULTI_YEAR_AGE","G_CONTROL_COMPARISONS"]);
  const hasLegacy=next.retry_history.some(entry=>legacyIds.has(entry.batch_id)); if(!hasLegacy) {next.micro_batch_migration_version="1.0.0";return next;}
  const migrated:string[]=[];
  for(const category of Object.values(next.categories)) {
    if(category.status!=="FAILED_TERMINAL" || category.failure_reason?.includes("GENUINE_EVIDENCE_UNAVAILABLE")) continue;
    category.legacy_attempt_count=category.attempt_count; category.attempt_count=0;
    category.status=category.normalized_evidence?.status==="missing"?"MISSING":"PARTIAL";
    category.retry_eligible=true; category.failure_reason="MIGRATED_FROM_RETIRED_BROAD_BATCH_INFRASTRUCTURE"; migrated.push(category.evidence_category);
  }
  next.micro_batch_migration_version="1.0.0"; next.migration_history??=[];
  next.migration_history.push({migrated_at:now,from:"BROAD_BATCH_V1",to:"MICRO_BATCH_V1",categories:migrated}); next.updated_at=now;
  return next;
}

export function assembleEvidencePackage(checkpoint: EvidenceCheckpoint): Record<string, any> {
  const evidence = structuredClone(checkpoint.base_evidence ?? {}) as Record<string, any>; evidence.normalized ??= {};
  for (const [name, category] of Object.entries(checkpoint.categories)) {
    if (name === "position_specific_traits" || name.startsWith("domain:") || name.startsWith("trait:")) continue;
    if (category.normalized_evidence) evidence.normalized[name] = category.normalized_evidence;
  }
  const parent = evidence.normalized.position_specific_traits ?? { status: "partial", confidence: "MEDIUM", items: [], limitations: [] };
  parent.domain_assessments ??= {}; parent.trait_assessments ??= {};
  for (const [name, category] of Object.entries(checkpoint.categories)) {
    if (!category.normalized_evidence) continue;
    if (name.startsWith("domain:")) parent.domain_assessments[name.slice(7)] = category.normalized_evidence;
    if (name.startsWith("trait:")) parent.trait_assessments[name.slice(6)] = category.normalized_evidence;
  }
  const nested = Object.keys(checkpoint.categories).filter(x => x.startsWith("domain:") || x.startsWith("trait:"));
  const allNested = nested.every(x => checkpoint.categories[x].status === "SATISFIED");
  parent.status = allNested ? "satisfied" : "partial"; parent.confidence = allNested ? "HIGH" : "MEDIUM";
  parent.limitations = allNested ? [] : nested.filter(x => checkpoint.categories[x].status !== "SATISFIED").map(x => `${x} unresolved`);
  evidence.normalized.position_specific_traits = parent; evidence.sources = dedupeSources(checkpoint.source_provenance);
  evidence.researched_at = checkpoint.updated_at; evidence.minimum_evidence_met = false;
  evidence.missing_evidence = Object.values(checkpoint.categories).filter(x => x.status !== "SATISFIED" && x.evidence_category !== "position_specific_traits")
    .map(x => `${x.evidence_category}: ${x.status}`); return evidence;
}

export class EvidenceCollectionError extends Error {
  constructor(readonly kind: EvidenceFailureKind, message: string, readonly diagnostic?: EvidenceExecutionDiagnostic) { super(message); this.name = "EvidenceCollectionError"; }
}

export function createCheckpoint(input: { audit_id: string; player_id: string; player_name: string; position: string;
  task: Record<string, unknown>; category_names: string[]; now: string; max_attempts?: number }): EvidenceCheckpoint {
  const categories = Object.fromEntries(input.category_names.map(name => [name, emptyCategory(input.player_id, input.audit_id, name)]));
  return { schema_version: "1.0.0", audit_id: input.audit_id, player_id: input.player_id, player_name: input.player_name,
    position: input.position, task: structuredClone(input.task), created_at: input.now, updated_at: input.now,
    max_attempts: input.max_attempts ?? 3, categories, retry_history: [], execution_diagnostics: [], source_provenance: [], minimum_evidence_met: false };
}
function emptyCategory(playerId: string, auditId: string, name: string): CategoryCheckpoint {
  return { player_id: playerId, audit_id: auditId, evidence_category: name, status: "NOT_ATTEMPTED", attempt_count: 0,
    last_attempt_timestamp: null, source_urls: [], accepted_evidence: [], normalized_evidence: null,
    unresolved_conflicts: [], missing_fields: [], retry_eligible: true, failure_reason: null };
}

export class MemoryEvidenceCheckpointStore implements EvidenceCheckpointStore {
  constructor(private value: EvidenceCheckpoint) {}
  async load(auditId: string) { if (this.value.audit_id !== auditId) throw new Error(`Audit ${auditId} not found`); return structuredClone(this.value); }
  async save(value: EvidenceCheckpoint) { this.value = structuredClone(value); }
}
export class FileEvidenceCheckpointStore implements EvidenceCheckpointStore {
  constructor(readonly root: string) {}
  private file(auditId: string) {
    if (!/^[A-Za-z0-9_.-]+$/.test(auditId)) throw new Error("Unsafe audit_id");
    return path.join(this.root, auditId, "evidence-progress.json");
  }
  async load(auditId: string) { return JSON.parse(await fs.readFile(this.file(auditId), "utf8")) as EvidenceCheckpoint; }
  async save(value: EvidenceCheckpoint) {
    const file = this.file(value.audit_id); await fs.mkdir(path.dirname(file), { recursive: true });
    const temporary = `${file}.${process.pid}.tmp`; await fs.writeFile(temporary, JSON.stringify(value, null, 2) + "\n");
    await fs.rename(temporary, file);
  }
}

export async function resumeEvidence(store: EvidenceCheckpointStore, collector: BatchCollector, options: {
  audit_id: string; now?: () => string; batches: EvidenceBatch[];
  stale?: (category: CategoryCheckpoint) => boolean;
  minimumGate?: (checkpoint: EvidenceCheckpoint) => boolean;
}): Promise<EvidenceCheckpoint> {
  const now = options.now ?? (() => new Date().toISOString());
  let checkpoint = await store.load(options.audit_id);
  checkpoint.execution_diagnostics ??= [];
  checkpoint=recoverInterruptedCategories(checkpoint);
  for (const batch of options.batches) {
    const eligible = batch.categories.filter(name => {
      const category = checkpoint.categories[name]; if (!category) throw new Error(`Unknown evidence category: ${name}`);
      if (category.attempt_count >= checkpoint.max_attempts || category.status === "FAILED_TERMINAL") return false;
      if (category.status === "SATISFIED" && !(options.stale?.(category) || category.unresolved_conflicts.length)) return false;
      return ["NOT_ATTEMPTED", "PARTIAL", "MISSING", "FAILED_RETRYABLE", "SATISFIED"].includes(category.status);
    });
    if (!eligible.length) continue;
    const attemptedAt = now();
    for (const name of eligible) { const category = checkpoint.categories[name]; category.status = "IN_PROGRESS";
      category.attempt_count++; category.last_attempt_timestamp = attemptedAt; category.retry_eligible = false; }
    checkpoint.updated_at = attemptedAt; checkpoint.minimum_evidence_met = false; await store.save(checkpoint);
    const avoid = [...new Set(eligible.flatMap(name => checkpoint.categories[name].source_urls))];
    try {
      const result = await collector.collect({ audit_id: checkpoint.audit_id, player_id: checkpoint.player_id,
        player_name: checkpoint.player_name, position: checkpoint.position, batch_id: batch.id, categories: eligible,
        attempt_number: Math.max(...eligible.map(name => checkpoint.categories[name].attempt_count)),
        prior_evidence: Object.fromEntries(eligible.map(name => [name, checkpoint.categories[name].normalized_evidence])),
        avoid_source_urls: avoid, task: checkpoint.task });
      for (const name of eligible) {
        const category = checkpoint.categories[name]; const parsed = assessmentSchema.safeParse(result.categories[name]);
        if (!parsed.success) throw new EvidenceCollectionError("PARSER_SCHEMA_FAILURE", `${name}: ${parsed.error.message}`);
        const incoming = parsed.data;
        category.accepted_evidence = dedupeAccepted([...category.accepted_evidence, ...incoming.items]);
        category.source_urls = [...new Set(category.accepted_evidence.map(e => e.source_url))];
        const activePrior=category.normalized_evidence?.items.filter(item=>Date.parse(attemptedAt)-Date.parse(item.retrieved_at)<=CALENDAR_MAX_AGE_MS)??[];
        category.normalized_evidence = { ...incoming, items: dedupeItems([...incoming.items,...activePrior]) };
        category.missing_fields = result.missing_fields?.[name] ?? incoming.limitations;
        const conflicts = (result.conflicts ?? []).filter(c => c.category === name);
        category.unresolved_conflicts.push(...conflicts);
        category.failure_reason = result.failure_reason ?? null;
        category.status = conflicts.length ? "PARTIAL" : incoming.status.toUpperCase() as EvidenceCategoryState;
        category.retry_eligible = category.status !== "SATISFIED" && category.attempt_count < checkpoint.max_attempts;
      }
      checkpoint.source_provenance.push(...result.sources);
      if (result.diagnostic) checkpoint.execution_diagnostics.push(result.diagnostic);
      checkpoint.retry_history.push({ batch_id: batch.id, categories: eligible, attempted_at: attemptedAt,
        outcome: "SUCCESS", failure_kind: result.failure_kind ?? null, reason: result.failure_reason ?? null });
    } catch (error) {
      const failure = error instanceof EvidenceCollectionError ? error : new EvidenceCollectionError("SOURCE_UNAVAILABLE", String(error));
      if (failure.diagnostic) checkpoint.execution_diagnostics.push(failure.diagnostic);
      for (const name of eligible) { const category = checkpoint.categories[name]; const terminal =
        failure.kind === "GENUINE_EVIDENCE_UNAVAILABLE" || category.attempt_count >= checkpoint.max_attempts;
        category.status = terminal ? "FAILED_TERMINAL" : "FAILED_RETRYABLE"; category.retry_eligible = !terminal; category.failure_reason = failure.message; }
      checkpoint.retry_history.push({ batch_id: batch.id, categories: eligible, attempted_at: attemptedAt,
        outcome: "FAILURE", failure_kind: failure.kind, reason: failure.message });
    }
    checkpoint.updated_at = now(); checkpoint.minimum_evidence_met = strictMinimum(checkpoint, options.minimumGate); await store.save(checkpoint);
  }
  checkpoint.minimum_evidence_met = strictMinimum(checkpoint, options.minimumGate); await store.save(checkpoint); return checkpoint;
}
export function recoverInterruptedCategories(checkpoint:EvidenceCheckpoint):EvidenceCheckpoint{
  const next=structuredClone(checkpoint);
  for(const category of Object.values(next.categories))if(category.status==="IN_PROGRESS"){
    const terminal=category.attempt_count>=next.max_attempts;category.status=terminal?"FAILED_TERMINAL":"FAILED_RETRYABLE";
    category.retry_eligible=!terminal;category.failure_reason="INTERRUPTED_PROCESS";
  }
  return next;
}
function strictMinimum(checkpoint: EvidenceCheckpoint, gate?: (checkpoint: EvidenceCheckpoint) => boolean): boolean {
  const independentlyChecked = Object.values(checkpoint.categories).filter(c => c.evidence_category !== "position_specific_traits");
  return independentlyChecked.length > 0 && independentlyChecked.every(c => c.status === "SATISFIED") && (gate?.(checkpoint) ?? true);
}
function dedupeItems(items: AcceptedEvidence[]): AcceptedEvidence[] {
  const seen = new Set<string>(); return items.filter(item => { const key = `${item.source_url}|${item.claim}|${item.season}|${item.period}`;
    if (seen.has(key)) return false; seen.add(key); return true; });
}
function dedupeAccepted(items:AcceptedEvidence[]):AcceptedEvidence[]{const seen=new Set<string>();return items.filter(item=>{
  const key=`${item.source_url}|${item.claim}|${item.season}|${item.period}|${item.retrieved_at}`;if(seen.has(key))return false;seen.add(key);return true;});}
function dedupeSources(sources: Array<Record<string, unknown>>) {
  const sorted=[...sources].sort((a,b)=>Date.parse(String(b.retrieved_at??0))-Date.parse(String(a.retrieved_at??0)));
  const seen = new Set<string>(); return sorted.filter(source => { const key = String(source.url ?? JSON.stringify(source));
    if (seen.has(key)) return false; seen.add(key); return true; });
}
