import { Codex, type WebSearchItem } from "@openai/codex-sdk";
import { z } from "zod";
import { EvidenceCollectionError, type BatchCollector, type BatchRequest, type BatchResult,
  type EvidenceExecutionDiagnostic, type EvidenceFailureKind } from "./resumable-evidence.js";
import { EphemeralCliResearchTransport } from "./research-transport.js";
import { OpenAIResponsesResearchTransport, ResponsesUsageBudget, detectResponsesCapability, type ResponsesApiClient } from "./openai-responses-transport.js";

const itemSchema = z.object({ claim: z.string().trim().min(1), source_url: z.string().url(),
  retrieved_at: z.string().datetime({offset:true}), season: z.number().int(),
  period: z.enum(["REGULAR_SEASON", "POSTSEASON", "CURRENT_CONTEXT"]), evidence_tier:z.number().int().min(1).max(5).optional(),
  direct_or_inferred:z.enum(["DIRECT","SUBSTITUTED","INFERRED"]).optional() });
const assessmentSchema = z.object({ status: z.enum(["satisfied", "partial", "missing"]),
  confidence: z.enum(["HIGH", "MEDIUM", "LOW"]), items: z.array(itemSchema), limitations: z.array(z.string()),
  compared_controls: z.array(z.string()).optional() });
const sourceSchema = z.object({ name: z.string().min(1), url: z.string().url(),
  retrieved_at: z.string().datetime({offset:true}), published_at: z.string().nullable().optional(),
  authority_tier: z.number().int().min(1).max(5), claims: z.array(z.string()) });
const resultSchema = z.object({ categories: z.record(assessmentSchema), sources: z.array(sourceSchema),
  conflicts: z.array(z.object({category:z.string()}).passthrough()).optional(),
  missing_fields: z.record(z.array(z.string())).optional(), failure_kind: z.string().nullable().optional(),
  failure_reason: z.string().nullable().optional() });

export interface CodexBatchOptions { requestTimeoutMs?: number; totalBudgetMs?: number;
  transport?:"AUTO"|"OPENAI_RESPONSES_TRANSPORT"|"SDK_TRANSPORT"|"EPHEMERAL_CLI_TRANSPORT"; responsesClient?:ResponsesApiClient; responsesBudget?:ResponsesUsageBudget; env?:NodeJS.ProcessEnv }
export interface MicroResearchClient { startThread(options: Record<string,unknown>): {id:string|null;run(input:string,options:Record<string,unknown>):Promise<any>} }
export class CodexBatchEvidenceCollector implements BatchCollector {
  readonly diagnostics: EvidenceExecutionDiagnostic[] = [];
  private readonly started = Date.now();
  private readonly requestTimeoutMs: number; private readonly totalBudgetMs: number;
  private readonly transportMode:"OPENAI_RESPONSES_TRANSPORT"|"SDK_TRANSPORT"|"EPHEMERAL_CLI_TRANSPORT";
  private readonly cli=new EphemeralCliResearchTransport();
  private readonly responses:OpenAIResponsesResearchTransport|null;
  private readonly codex:MicroResearchClient|null;
  constructor(options: number|CodexBatchOptions = {}, private readonly now = () => new Date().toISOString(),
    codex?: MicroResearchClient) {
    this.requestTimeoutMs = typeof options === "number" ? options : options.requestTimeoutMs ?? 45_000;
    this.totalBudgetMs = typeof options === "number" ? 15 * 60_000 : options.totalBudgetMs ?? 15 * 60_000;
    const configured=typeof options==="number"?{}:options; const requested=configured.transport??"AUTO";
    if(requested==="AUTO"){
      const capability=detectResponsesCapability(configured.env); if(!capability.available)
        throw new EvidenceCollectionError("SOURCE_UNAVAILABLE",`${capability.reason}. Select SDK_TRANSPORT or EPHEMERAL_CLI_TRANSPORT explicitly for compatibility mode.`);
      this.transportMode="OPENAI_RESPONSES_TRANSPORT";
    } else this.transportMode=requested;
    this.responses=this.transportMode==="OPENAI_RESPONSES_TRANSPORT"?
      new OpenAIResponsesResearchTransport({client:configured.responsesClient,env:configured.env,budget:configured.responsesBudget}):null;
    this.codex=this.transportMode==="SDK_TRANSPORT"?(codex??new Codex({}) as MicroResearchClient):null;
  }
  async collect(request: BatchRequest): Promise<BatchResult> {
    if (Date.now() - this.started >= this.totalBudgetMs) throw new EvidenceCollectionError("NETWORK_TOOL_TIMEOUT", "Total audit research budget exhausted.",
      diagnostic(request, this.now(), this.now(), 0, null, "THREAD_START", "FAILURE", "NETWORK_TOOL_TIMEOUT"));
    const startedAt = this.now(); const startedMs = Date.now();
    const thread = this.transportMode==="SDK_TRANSPORT"?this.codex!.startThread({ sandboxMode: "read-only", approvalPolicy: "never", webSearchMode: "live",
      workingDirectory: process.cwd(), skipGitRepoCheck: true }):null;
    try {
      if(this.responses){const result=await this.responses.run(buildPrompt(request),buildBatchOutputSchema(request.categories),this.requestTimeoutMs);
        const parsed=validateBatchResponse(result.finalResponse,request.categories,result.sourceUrls);
        const diag=diagnostic(request,startedAt,this.now(),result.usage.elapsed_ms,result.usage.response_id,null,"SUCCESS",null,"OPENAI_RESPONSES_TRANSPORT",result.usage);
        this.diagnostics.push(diag);return{...parsed,diagnostic:diag};}
      if(!thread){const result=await this.cli.run(buildPrompt(request),buildBatchOutputSchema(request.categories),`${request.audit_id}-${request.batch_id}-${request.attempt_number}`);
        const parsed=validateBatchResponse(result.finalResponse,request.categories);const diag=diagnostic(request,startedAt,this.now(),Date.now()-startedMs,null,null,"SUCCESS",null,"EPHEMERAL_CLI_TRANSPORT");
        this.diagnostics.push(diag);return{...parsed,diagnostic:diag};}
      const result = await thread.run(buildPrompt(request), { signal: AbortSignal.timeout(this.requestTimeoutMs) });
      const web = result.items.filter((x: any): x is WebSearchItem => x.type === "web_search");
      if (!web.length) throw new EvidenceCollectionError("SOURCE_UNAVAILABLE", "No live web search event was observed.");
      const parsed = validateBatchResponse(result.finalResponse, request.categories);
      const diag = diagnostic(request, startedAt, this.now(), Date.now()-startedMs, thread.id, null, "SUCCESS", null,"SDK_TRANSPORT");
      this.diagnostics.push(diag); return { ...parsed, diagnostic: diag };
    } catch (error) {
      const kind: EvidenceFailureKind = error instanceof EvidenceCollectionError ? error.kind :
        (error instanceof DOMException && ["TimeoutError", "AbortError"].includes(error.name) || /timeout|aborterror|aborted/i.test(String(error))) ? "NETWORK_TOOL_TIMEOUT" : "SOURCE_UNAVAILABLE";
      const stage = kind === "PARSER_SCHEMA_FAILURE" ? "NORMALIZATION" : "THREAD_RUN";
      const diag = diagnostic(request, startedAt, this.now(), Date.now()-startedMs, thread?.id??null, stage, "FAILURE", kind,this.transportMode);
      this.diagnostics.push(diag);
      throw new EvidenceCollectionError(kind, kind === "NETWORK_TOOL_TIMEOUT" ? `Micro-batch ${request.batch_id} exceeded ${this.requestTimeoutMs}ms` : String(error), diag);
    }
  }
}

const batchOutputSchema={type:"object",additionalProperties:false,required:["categories","sources","conflicts","missing_fields","failure_kind","failure_reason"],properties:{
  categories:{type:"object",additionalProperties:{type:"object",additionalProperties:false,required:["status","confidence","items","limitations","compared_controls"],properties:{status:{enum:["satisfied","partial","missing"]},confidence:{enum:["HIGH","MEDIUM","LOW"]},items:{type:"array",items:{type:"object",additionalProperties:false,required:["claim","source_url","retrieved_at","season","period","evidence_tier","direct_or_inferred"],properties:{claim:{type:"string"},source_url:{type:"string",format:"uri"},retrieved_at:{type:"string"},season:{type:"integer"},period:{enum:["REGULAR_SEASON","POSTSEASON","CURRENT_CONTEXT"]},evidence_tier:{type:"integer",minimum:1,maximum:5},direct_or_inferred:{enum:["DIRECT","SUBSTITUTED","INFERRED"]}}}},limitations:{type:"array",items:{type:"string"}},compared_controls:{type:"array",items:{type:"string"}}}}},
  sources:{type:"array",items:{type:"object",additionalProperties:false,required:["name","url","retrieved_at","published_at","authority_tier","claims"],properties:{name:{type:"string"},url:{type:"string",format:"uri"},retrieved_at:{type:"string"},published_at:{type:["string","null"]},authority_tier:{type:"integer",minimum:1,maximum:5},claims:{type:"array",items:{type:"string"}}}}},
  conflicts:{type:"array",items:{type:"object",additionalProperties:false,required:["category","detail","source_urls"],properties:{category:{type:"string"},detail:{type:"string"},source_urls:{type:"array",items:{type:"string",format:"uri"}}}}},missing_fields:{type:"object",additionalProperties:{type:"array",items:{type:"string"}}},failure_kind:{type:["string","null"]},failure_reason:{type:["string","null"]}}};
export function buildBatchOutputSchema(requested:string[]):Record<string,unknown>{const schema=structuredClone(batchOutputSchema) as any;
  const assessment=schema.properties.categories.additionalProperties;schema.properties.categories={type:"object",additionalProperties:false,
    required:requested,properties:Object.fromEntries(requested.map(name=>[name,assessment]))};
  const missing={type:"array",items:{type:"string"}};schema.properties.missing_fields={type:"object",additionalProperties:false,
    required:requested,properties:Object.fromEntries(requested.map(name=>[name,missing]))};return schema;}

function buildPrompt(request: BatchRequest): string {
  const comparison = request.batch_id.includes("CONTROL"); const task = request.task as Record<string, any>;
  const context = { as_of: task.as_of, team: task.team ?? task.original_registry_player?.team,
    nfl_season: task.nfl_season, season_phase: task.season_phase, evidence_season: task.evidence_season,
    baseline_controls: comparison ? task.baseline_controls : undefined };
  return `Collect a small, read-only NFL evidence micro-batch. Evidence only: no ratings, OVR, narrative audit reasoning, file writes, commands, approvals, or state changes.
Subject: ${JSON.stringify({id:request.player_id,name:request.player_name,position:request.position})}
Context: ${JSON.stringify(context)}
Micro-batch ${request.batch_id}, attempt ${request.attempt_number}. Return ONLY these 1-3 keys: ${JSON.stringify(request.categories)}.
Prior accepted findings: ${JSON.stringify(request.prior_evidence)}
Avoid these URLs unless freshness/conflict resolution requires reuse: ${JSON.stringify(request.avoid_source_urls)}
Use fresh web search and primary NFL/team sources or reputable advanced data. Preserve conflicts. Unsupported evidence stays partial/missing. Return no prose.
For every item, classify evidence_tier 1-5 under the supplied QB architecture and direct_or_inferred as DIRECT, SUBSTITUTED, or INFERRED. Never use EA ratings or OVR as evidence.
JSON shape: {"categories":{"exact-key":{"status":"satisfied|partial|missing","confidence":"HIGH|MEDIUM|LOW","items":[{"claim":"fact","source_url":"https://...","retrieved_at":"ISO timestamp with offset","season":2025,"period":"REGULAR_SEASON|POSTSEASON|CURRENT_CONTEXT","evidence_tier":1,"direct_or_inferred":"DIRECT"}],"limitations":["missing information"]}},"sources":[{"name":"source","url":"https://...","retrieved_at":"ISO timestamp with offset","published_at":null,"authority_tier":1,"claims":["fact"]}],"conflicts":[],"missing_fields":{"exact-key":[]}}`;
}

export function validateBatchResponse(text: string, requested: string[], researchedSourceUrls?:string[]): BatchResult {
  let raw: unknown; try { raw = JSON.parse(extractFirstJsonObject(text)); }
  catch (error) { throw new EvidenceCollectionError("PARSER_SCHEMA_FAILURE", String(error)); }
  const parsed = resultSchema.safeParse(raw);
  if (!parsed.success) throw new EvidenceCollectionError("PARSER_SCHEMA_FAILURE", parsed.error.message);
  const keys = Object.keys(parsed.data.categories);
  if (keys.some(key => !requested.includes(key)) || requested.some(key => !keys.includes(key)))
    throw new EvidenceCollectionError("PARSER_SCHEMA_FAILURE", "Response category keys do not exactly match the micro-batch request.");
  const sourceUrls = new Set(parsed.data.sources.map(source => source.url));
  for (const category of Object.values(parsed.data.categories)) for (const item of category.items)
    if (!sourceUrls.has(item.source_url)) throw new EvidenceCollectionError("PARSER_SCHEMA_FAILURE", `Unlisted source URL: ${item.source_url}`);
  if(researchedSourceUrls){const observed=new Set(researchedSourceUrls);for(const source of parsed.data.sources)
    if(!observed.has(source.url))throw new EvidenceCollectionError("PARSER_SCHEMA_FAILURE",`Normalized source URL was absent from Responses API source metadata: ${source.url}`);}
  return parsed.data as BatchResult;
}

export function extractFirstJsonObject(text: string): string {
  const start = text.indexOf("{"); if (start < 0) throw new Error("No JSON object returned");
  let depth=0, quoted=false, escaped=false;
  for (let i=start;i<text.length;i++) { const c=text[i];
    if (quoted) { if (escaped) escaped=false; else if (c==="\\") escaped=true; else if (c==='"') quoted=false; continue; }
    if (c==='"') quoted=true; else if (c==="{") depth++; else if (c==="}" && --depth===0) return text.slice(start,i+1);
  }
  throw new Error("JSON object was incomplete");
}
function diagnostic(request: BatchRequest, started_at:string, ended_at:string, elapsed_ms:number, thread_id:string|null,
  timeout_stage: EvidenceExecutionDiagnostic["timeout_stage"], outcome:EvidenceExecutionDiagnostic["outcome"], failure_kind:EvidenceFailureKind|null,
  transport:EvidenceExecutionDiagnostic["transport"]="SDK_TRANSPORT", usage?:{model:string;response_id:string|null;input_tokens:number;output_tokens:number;total_tokens:number;web_search_calls:number}): EvidenceExecutionDiagnostic {
  return {micro_batch_id:request.batch_id,attempt_number:request.attempt_number,started_at,ended_at,elapsed_ms,thread_id,timeout_stage,outcome,failure_kind,transport,...usage};
}
