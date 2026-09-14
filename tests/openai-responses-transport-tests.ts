import assert from "node:assert/strict";
import { buildBatchOutputSchema, validateBatchResponse } from "../src/codex-batch-research.js";
import { classifyResponsesError, detectResponsesCapability, OpenAIResponsesResearchTransport, ResponsesUsageBudget } from "../src/openai-responses-transport.js";
import { ResponsesCalendarCollector } from "../src/codex-calendar-research.js";

const url="https://www.nfl.com/test"; const now="2030-08-20T12:00:00.000Z";
const payload=()=>({categories:{one:{status:"satisfied",confidence:"HIGH",items:[{claim:"fact",source_url:url,retrieved_at:now,season:2030,period:"CURRENT_CONTEXT",evidence_tier:1,direct_or_inferred:"DIRECT"}],limitations:[],compared_controls:[]}},
  sources:[{name:"NFL",url,retrieved_at:now,published_at:null,authority_tier:1,claims:["fact"]}],conflicts:[],missing_fields:{one:[]},failure_kind:null,failure_reason:null});
function response(overrides:any={}){return{id:"resp_test",model:"documented-model",status:"completed",output_text:JSON.stringify(payload()),usage:{input_tokens:10,output_tokens:20,total_tokens:30},
  output:[{type:"web_search_call",action:{sources:[{url,title:"NFL"}]}},{type:"message",content:[{type:"output_text",text:JSON.stringify(payload()),annotations:[{type:"url_citation",url,title:"NFL"}]}]}],...overrides};}

export async function runOpenAIResponsesTransportTests(){async function test(name:string,fn:()=>Promise<void>|void){try{await fn();console.log(`PASS ${name}`)}catch(e){console.error(`FAIL ${name}`);throw e}}
  await test("Responses capability is explicit when API key is missing and uses a verified default model",()=>{assert.equal(detectResponsesCapability({} as any).available,false);
    assert.equal(detectResponsesCapability({OPENAI_API_KEY:"secret"} as any).model,"gpt-6-astra");assert(detectResponsesCapability({OPENAI_API_KEY:"secret",GRIDIRON_RESEARCH_MODEL:"documented-model"} as any).available);});
  await test("Responses request is stateless, web-only, and strict-schema constrained",async()=>{let request:any;const client:any={responses:{async create(value:any){request=value;return response()}}};
    const transport=new OpenAIResponsesResearchTransport({client,env:{OPENAI_API_KEY:"secret",GRIDIRON_RESEARCH_MODEL:"documented-model"} as any});
    const result=await transport.run("fixture",buildBatchOutputSchema(["one"]),1000);assert.equal(request.store,false);assert.deepEqual(request.tools,[{type:"web_search"}]);
    assert.equal(request.text.format.strict,true);assert.equal(request.text.format.schema.properties.categories.required[0],"one");assert.equal(result.usage.web_search_calls,1);
    assert(!JSON.stringify(request).includes("shell"));assert(!JSON.stringify(request).includes("computer"));});
  await test("Responses evidence maps with source provenance and parses",async()=>{const client:any={responses:{async create(){return response()}}};
    const result=await new OpenAIResponsesResearchTransport({client,env:{OPENAI_API_KEY:"secret",GRIDIRON_RESEARCH_MODEL:"documented-model"} as any}).run("fixture",buildBatchOutputSchema(["one"]),1000);
    assert.equal(validateBatchResponse(result.finalResponse,["one"],result.sourceUrls).categories.one.status,"satisfied");assert.deepEqual(result.sourceUrls,[url]);});
  await test("source URL mismatch is rejected",()=>{assert.throws(()=>validateBatchResponse(JSON.stringify(payload()),["one"],["https://example.com/other"]),/absent from Responses API/);});
  await test("conflicts and missing fields survive normalization",()=>{const value:any=payload();value.conflicts=[{category:"one",detail:"providers disagree",source_urls:[url]}];value.missing_fields.one=["advanced split"];
    const parsed=validateBatchResponse(JSON.stringify(value),["one"],[url]);assert.equal(parsed.conflicts?.length,1);assert.deepEqual(parsed.missing_fields?.one,["advanced split"]);});
  await test("malformed JSON, timeout, and rate limit are classified",()=>{assert.throws(()=>validateBatchResponse("bad",["one"]),/PARSER_SCHEMA_FAILURE|No JSON/);
    assert.equal(classifyResponsesError(Object.assign(new Error("timed out"),{name:"AbortError"})).kind,"NETWORK_TOOL_TIMEOUT");assert.equal(classifyResponsesError({status:429,message:"rate limit"}).kind,"RATE_LIMIT");});
  await test("usage budgets have no defaults and enforce configured limits",()=>{const unlimited=new ResponsesUsageBudget({} as any);assert.deepEqual(unlimited.limits,{});
    const guarded=new ResponsesUsageBudget({GRIDIRON_RESPONSES_MAX_REQUESTS:"0"} as any);assert.throws(()=>guarded.assertCanRequest(),(error:any)=>error.kind==="BUDGET_EXCEEDED");});
  await test("Responses transport has no CODEX_HOME dependency",async()=>{const before=process.env.CODEX_HOME;let seen=false;const client:any={responses:{async create(){seen=true;return response()}}};
    await new OpenAIResponsesResearchTransport({client,env:{OPENAI_API_KEY:"secret",GRIDIRON_RESEARCH_MODEL:"documented-model",CODEX_HOME:"unusable"} as any}).run("fixture",buildBatchOutputSchema(["one"]),1000);
    assert(seen);assert.equal(process.env.CODEX_HOME,before);});
  await test("calendar refresh uses Responses source metadata without Codex state",async()=>{const calendarUrl="https://www.nfl.com/schedules/2030/REG1/";
    const calendar={nfl_season:2030,player_id:"fixture",team:"TST",valid_from:"2030-03-01T00:00:00Z",valid_until:"2031-03-01T00:00:00Z",preseason_start:"2030-08-01T00:00:00Z",regular_season_start:"2030-09-01T00:00:00Z",postseason_start:"2031-01-01T00:00:00Z",season_end:"2031-02-01T00:00:00Z",current_season_games_available:0,current_season_games_played:0,regular_season_games_scheduled:17,regular_season_complete:false,postseason_complete:false,sources:[{url:calendarUrl,retrieved_at:now,claims:["schedule"]}]};
    const client:any={responses:{async create(){return response({output_text:JSON.stringify(calendar),output:[{type:"web_search_call",action:{sources:[{url:calendarUrl,title:"NFL"}]}}]})}}};
    const collector=new ResponsesCalendarCollector({client,env:{OPENAI_API_KEY:"secret",GRIDIRON_RESEARCH_MODEL:"documented-model"} as any});
    assert.equal((await collector.collect({player_id:"fixture",team:"TST",as_of:now},AbortSignal.timeout(1000))).nfl_season,2030);assert.equal(collector.diagnostics.length,1);});
}
