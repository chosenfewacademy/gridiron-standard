import { buildBatchOutputSchema, validateBatchResponse } from "./codex-batch-research.js";
import { detectResponsesCapability, OpenAIResponsesResearchTransport } from "./openai-responses-transport.js";

const live=process.argv.includes("--live"); const capability=detectResponsesCapability();
const report:any={live_requested:live,paid_request_executed:false,capability};
if(live){
  if(!capability.available)throw new Error(capability.reason!);
  const transport=new OpenAIResponsesResearchTransport(); const category="league_calendar";
  const result=await transport.run("Use current public NFL sources to identify one current NFL calendar fact. Evidence only; no ratings, player audit, file writes, commands, or state changes. Return the requested structured category and sources.",buildBatchOutputSchema([category]),30_000);
  report.paid_request_executed=true;report.usage=result.usage;report.source_count=result.sourceUrls.length;
  report.structured_json_parsed=Boolean(validateBatchResponse(result.finalResponse,[category],result.sourceUrls));
}
console.log(JSON.stringify(report,null,2));
