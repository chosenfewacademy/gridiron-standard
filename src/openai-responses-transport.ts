import OpenAI from "openai";
import { EvidenceCollectionError, type EvidenceFailureKind } from "./resumable-evidence.js";

export interface ResponsesCapability { available:boolean; transport:"OPENAI_RESPONSES_TRANSPORT"; key_configured:boolean;
  model_configured:boolean; model:string|null; reason:string|null }
export interface ResponsesApiClient { responses:{create(params:Record<string,unknown>,options?:Record<string,unknown>):Promise<any>} }
export interface ResponsesUsage { model:string; response_id:string|null; input_tokens:number; output_tokens:number;
  total_tokens:number; web_search_calls:number; elapsed_ms:number }
export interface ResponsesTransportResult { finalResponse:string; sourceUrls:string[]; usage:ResponsesUsage }
// Verified in the official Responses API reference as supporting Responses web search.
export const VERIFIED_DEFAULT_RESEARCH_MODEL="gpt-6-astra";

export function detectResponsesCapability(env:NodeJS.ProcessEnv=process.env):ResponsesCapability {
  const key=Boolean(env.OPENAI_API_KEY?.trim()); const configured=env.GRIDIRON_RESEARCH_MODEL?.trim();
  const model=configured||VERIFIED_DEFAULT_RESEARCH_MODEL; const reason=!key?"OPENAI_API_KEY is not configured":null;
  return {available:reason===null,transport:"OPENAI_RESPONSES_TRANSPORT",key_configured:key,model_configured:Boolean(configured),model,reason};
}

type LimitName="requests"|"input_tokens"|"output_tokens"|"total_tokens"|"web_search_calls";
const ENV_LIMITS:Record<LimitName,string>={requests:"GRIDIRON_RESPONSES_MAX_REQUESTS",input_tokens:"GRIDIRON_RESPONSES_MAX_INPUT_TOKENS",
  output_tokens:"GRIDIRON_RESPONSES_MAX_OUTPUT_TOKENS",total_tokens:"GRIDIRON_RESPONSES_MAX_TOTAL_TOKENS",
  web_search_calls:"GRIDIRON_RESPONSES_MAX_WEB_SEARCH_CALLS"};
export class ResponsesUsageBudget {
  readonly limits:Partial<Record<LimitName,number>>={}; readonly used:Record<LimitName,number>={requests:0,input_tokens:0,output_tokens:0,total_tokens:0,web_search_calls:0};
  constructor(env:NodeJS.ProcessEnv=process.env){for(const [name,key] of Object.entries(ENV_LIMITS) as Array<[LimitName,string]>) {
    const raw=env[key]; if(raw===undefined||raw==="")continue; const value=Number(raw);
    if(!Number.isSafeInteger(value)||value<0)throw new Error(`${key} must be a non-negative integer`); this.limits[name]=value;
  }}
  assertCanRequest(){this.assert("requests",1)}
  record(usage:Omit<ResponsesUsage,"model"|"response_id"|"elapsed_ms">){this.used.requests++;
    for(const name of ["input_tokens","output_tokens","total_tokens","web_search_calls"] as const)this.used[name]+=usage[name];
    for(const name of Object.keys(this.limits) as LimitName[])if(this.used[name]>(this.limits[name] as number))
      throw new EvidenceCollectionError("BUDGET_EXCEEDED",`${ENV_LIMITS[name]} exceeded (${this.used[name]}/${this.limits[name]})`);
  }
  private assert(name:LimitName,increment:number){const limit=this.limits[name];if(limit!==undefined&&this.used[name]+increment>limit)
    throw new EvidenceCollectionError("BUDGET_EXCEEDED",`${ENV_LIMITS[name]} would be exceeded`);}
}

export class OpenAIResponsesResearchTransport {
  readonly capability:ResponsesCapability; readonly budget:ResponsesUsageBudget;
  private readonly client:ResponsesApiClient;
  constructor(input:{client?:ResponsesApiClient;env?:NodeJS.ProcessEnv;budget?:ResponsesUsageBudget}={}){
    const env=input.env??process.env; this.capability=detectResponsesCapability(env); this.budget=input.budget??new ResponsesUsageBudget(env);
    if(!this.capability.available)throw new EvidenceCollectionError("SOURCE_UNAVAILABLE",this.capability.reason!);
    this.client=input.client??new OpenAI({apiKey:env.OPENAI_API_KEY}) as unknown as ResponsesApiClient;
  }
  async run(prompt:string,outputSchema:unknown,timeoutMs:number,signal?:AbortSignal):Promise<ResponsesTransportResult>{
    this.budget.assertCanRequest(); const started=Date.now();
    try{
      const response=await this.client.responses.create({model:this.capability.model!,store:false,input:prompt,
        tools:[{type:"web_search"}],include:["web_search_call.action.sources"],
        text:{format:{type:"json_schema",name:"gridiron_normalized_evidence",strict:true,schema:outputSchema}}},
        {signal:signal??AbortSignal.timeout(timeoutMs)});
      if(response.status&&response.status!=="completed")throw new Error(`Responses API status ${response.status}`);
      const output=Array.isArray(response.output)?response.output:[];
      const webCalls=output.filter((item:any)=>item?.type==="web_search_call");
      if(!webCalls.length)throw new EvidenceCollectionError("SOURCE_UNAVAILABLE","No Responses API web search call was observed.");
      const sourceUrls=extractResponseSourceUrls(output); if(!sourceUrls.length)
        throw new EvidenceCollectionError("SOURCE_UNAVAILABLE","Web research returned no source metadata.");
      const usage={model:String(response.model??this.capability.model),response_id:typeof response.id==="string"?response.id:null,
        input_tokens:Number(response.usage?.input_tokens??0),output_tokens:Number(response.usage?.output_tokens??0),
        total_tokens:Number(response.usage?.total_tokens??0),web_search_calls:webCalls.length,elapsed_ms:Date.now()-started};
      this.budget.record(usage); return{finalResponse:String(response.output_text??extractOutputText(output)),sourceUrls,usage};
    }catch(error){if(error instanceof EvidenceCollectionError)throw error;throw classifyResponsesError(error);}
  }
}

export function extractResponseSourceUrls(output:any[]):string[]{const urls=new Set<string>();
  const visit=(value:any)=>{if(!value)return;if(Array.isArray(value)){value.forEach(visit);return;}if(typeof value!=="object")return;
    if(typeof value.url==="string"&&/^https?:\/\//i.test(value.url))urls.add(value.url);Object.values(value).forEach(visit);};
  visit(output);return [...urls];}
function extractOutputText(output:any[]):string{return output.flatMap((item:any)=>item?.content??[]).filter((x:any)=>x?.type==="output_text").map((x:any)=>x.text).join("");}
export function classifyResponsesError(error:unknown):EvidenceCollectionError {const anyError=error as any;const status=Number(anyError?.status??anyError?.statusCode);
  const text=String(anyError?.message??error);let kind:EvidenceFailureKind="SOURCE_UNAVAILABLE";
  if(status===429||/rate.?limit/i.test(text))kind="RATE_LIMIT";
  else if(["TimeoutError","AbortError"].includes(anyError?.name)||/timeout|timed out|aborted/i.test(text))kind="NETWORK_TOOL_TIMEOUT";
  else if(/json|schema|parse|structured output/i.test(text))kind="PARSER_SCHEMA_FAILURE";
  return new EvidenceCollectionError(kind,`Responses API ${kind}: ${text}`);
}
