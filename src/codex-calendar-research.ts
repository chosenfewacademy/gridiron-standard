import { Codex } from "@openai/codex-sdk";
import { calendarSnapshotSchema, type CalendarSnapshot } from "./season-phase.js";
import { extractFirstJsonObject } from "./codex-batch-research.js";
import type { CalendarCollector } from "./calendar-refresh.js";
import { OpenAIResponsesResearchTransport, type ResponsesApiClient, type ResponsesUsage, type ResponsesUsageBudget } from "./openai-responses-transport.js";

export class CodexCalendarCollector implements CalendarCollector {
  async collect(task:Record<string,unknown>,signal:AbortSignal):Promise<CalendarSnapshot> {
    const thread=new Codex({}).startThread({sandboxMode:"read-only",approvalPolicy:"never",webSearchMode:"live",workingDirectory:process.cwd(),skipGitRepoCheck:true});
    const subject={player_id:task.player_id??(task.original_registry_player as any)?.player_id,
      team:task.team??(task.original_registry_player as any)?.team,as_of:task.as_of};
    const result=await thread.run(`Use official NFL-domain live web sources to refresh only calendar/schedule context for ${JSON.stringify(subject)}. No player evaluation, ratings, commands, or prose. Return JSON with nfl_season, player_id, team, valid_from, valid_until, preseason_start, regular_season_start, postseason_start, season_end, current_season_games_available, current_season_games_played, regular_season_games_scheduled, regular_season_complete, postseason_complete, and sources [{url,retrieved_at,claims}]. Use ISO timestamps with offsets; do not guess unpublished facts.`,{signal});
    if(!result.items.some(x=>x.type==="web_search")) throw new Error("No calendar web search observed");
    return calendarSnapshotSchema.parse(JSON.parse(extractFirstJsonObject(result.finalResponse)));
  }
}

const calendarOutputSchema={type:"object",additionalProperties:false,
  required:["nfl_season","player_id","team","valid_from","valid_until","preseason_start","regular_season_start","postseason_start","season_end","current_season_games_available","current_season_games_played","regular_season_games_scheduled","regular_season_complete","postseason_complete","sources"],
  properties:{nfl_season:{type:"integer",minimum:1920},player_id:{type:"string"},team:{type:"string"},valid_from:{type:"string"},valid_until:{type:"string"},preseason_start:{type:"string"},regular_season_start:{type:"string"},postseason_start:{type:"string"},season_end:{type:"string"},current_season_games_available:{type:"integer",minimum:0},current_season_games_played:{type:"integer",minimum:0},regular_season_games_scheduled:{type:"integer",minimum:1},regular_season_complete:{type:"boolean"},postseason_complete:{type:"boolean"},sources:{type:"array",minItems:1,items:{type:"object",additionalProperties:false,required:["url","retrieved_at","claims"],properties:{url:{type:"string",format:"uri"},retrieved_at:{type:"string"},claims:{type:"array",minItems:1,items:{type:"string"}}}}}}};

export class ResponsesCalendarCollector implements CalendarCollector {
  private readonly transport:OpenAIResponsesResearchTransport;
  readonly diagnostics:Array<ResponsesUsage&{micro_batch_id:string;outcome:"SUCCESS";transport:"OPENAI_RESPONSES_TRANSPORT"}>=[];
  constructor(input:{client?:ResponsesApiClient;env?:NodeJS.ProcessEnv;budget?:ResponsesUsageBudget}={}){this.transport=new OpenAIResponsesResearchTransport(input);}
  async collect(task:Record<string,unknown>,signal:AbortSignal):Promise<CalendarSnapshot>{
    const subject={player_id:task.player_id??(task.original_registry_player as any)?.player_id,
      team:task.team??(task.original_registry_player as any)?.team,as_of:task.as_of};
    const result=await this.transport.run(`Use current official NFL-domain web sources to return only authoritative calendar and team schedule context for ${JSON.stringify(subject)}. Do not evaluate the player, generate ratings, run commands, or write files. Do not guess unpublished facts.`,calendarOutputSchema,30_000,signal);
    this.diagnostics.push({...result.usage,micro_batch_id:"CALENDAR_REFRESH",outcome:"SUCCESS",transport:"OPENAI_RESPONSES_TRANSPORT"});
    const parsed=calendarSnapshotSchema.parse(JSON.parse(extractFirstJsonObject(result.finalResponse)));
    const observed=new Set(result.sourceUrls);for(const source of parsed.sources)if(!observed.has(source.url))
      throw new Error(`Calendar source absent from Responses API source metadata: ${source.url}`);
    return parsed;
  }
}
