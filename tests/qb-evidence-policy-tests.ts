import assert from "node:assert/strict";
import { evaluateQbEvidenceCriticality, validateRatingConfidence } from "../src/qb-evidence-policy.js";
import { resolveAuthoritativeSeasonContext } from "../src/season-phase.js";

const item=(claim="verified charting")=>({claim,source_url:"https://www.nfl.com/test",retrieved_at:"2026-09-01T00:00:00Z",season:2025,period:"REGULAR_SEASON"});
const supported=(claim?:string)=>({status:"satisfied",confidence:"HIGH",items:[item(claim)],limitations:[]});
function complete():Record<string,unknown>{
  const categories:Record<string,unknown>={};
  for(const name of ["current_role","roster_depth_chart","injury_practice_status","durability_availability","passing_production_efficiency","pressure_performance","accuracy_by_depth","turnover_worthy_mistakes","scrambling_sack_avoidance","multi_year_trend","locked_control_comparisons","outside_control_comparisons","advanced_passing_metrics","rushing_designed_run_value","postseason_context","recent_performance_trend","performance_summary","age_career_trajectory","team_system_context","preseason_participation"]) categories[name]=supported();
  for(const name of ["arm_strength","short_accuracy","intermediate_accuracy","deep_accuracy","pressure_performance","pocket_movement","sack_avoidance","processing_decision_making","play_action","throws_on_run","scrambling","designed_rushing","ball_security","durability","workload_availability","consistency","opponent_context_adjustments"]) categories[`domain:${name}`]=supported();
  for(const name of ["THP","SAC","MAC","DAC","RUN","TUP","PAC","BSK","AWR","SPD","ACC","AGI","COD","STR","CAR","JMP","INJ","STA","TGH"]) categories[`trait:${name}`]=supported();
  return categories;
}
const calendar=(retrieved_at="2026-09-05T12:00:00Z")=>({nfl_season:2026,player_id:"p",team:"T",valid_from:"2026-03-01T00:00:00Z",valid_until:"2027-03-01T00:00:00Z",preseason_start:"2026-08-01T00:00:00Z",regular_season_start:"2026-09-09T20:20:00-04:00",postseason_start:"2027-01-11T00:00:00-05:00",season_end:"2027-02-15T00:00:00-05:00",current_season_games_available:0,current_season_games_played:0,regular_season_games_scheduled:17,regular_season_complete:false,postseason_complete:false,sources:[{url:"https://www.nfl.com/schedules/2026/by-week/week-1",retrieved_at,claims:["Week 1 begins September 9"]}]});

export function runQbEvidencePolicyTests(test:(name:string,fn:()=>void)=>void){
  test("core blocking evidence missing blocks proposal",()=>{const c=complete();delete c["trait:SAC"];assert(evaluateQbEvidenceCriticality(c).blockers.some(x=>x.includes("trait:SAC")));});
  test("secondary physical direct measurement may use historical substitution",()=>{const c=complete();c["trait:ACC"]={status:"partial",confidence:"LOW",items:[item("historical combine measurement adjusted for age")],limitations:["No current test"]};const r=evaluateQbEvidenceCriticality(c);assert(!r.blockers.some(x=>x.includes("trait:ACC")));assert(r.secondary_low_confidence.some(x=>x.includes("trait:ACC")));});
  test("secondary trait without any evidence path blocks",()=>{const c=complete();delete c["trait:JMP"];assert(evaluateQbEvidenceCriticality(c).blockers.some(x=>x.includes("trait:JMP")));});
  test("low confidence scarcity is prohibited",()=>assert(validateRatingConfidence("ACC",95,"LOW",3,"SUBSTITUTED").includes("LOW_CONFIDENCE_SCARCITY_PROHIBITED:ACC")));
  test("supporting evidence substitution is bounded",()=>{const c=complete();c["trait:RUN"]={status:"partial",confidence:"LOW",items:[item("recent play-level film")],limitations:[]};assert(evaluateQbEvidenceCriticality(c).supporting_weaknesses.some(x=>x.includes("trait:RUN")));delete c["trait:PAC"];assert(evaluateQbEvidenceCriticality(c).blockers.some(x=>x.includes("trait:PAC")));});
  test("provider conflict remains blocking",()=>assert(evaluateQbEvidenceCriticality(complete(),[{category:"pressure"}]).blockers.includes("PROVIDER_CONFLICT_UNRESOLVED")));
  test("cached authoritative immutable calendar survives retrieval aging",()=>{const r=resolveAuthoritativeSeasonContext({cached:calendar("2026-08-01T00:00:00Z")},"2026-09-05T12:00:00-04:00",{player_id:"p",team:"T"});assert.equal(r.status,"RESOLVED");if(r.status==="RESOLVED")assert.equal(r.resolution_level,"CACHED_AUTHORITATIVE");});
  test("live official calendar wins",()=>{const r=resolveAuthoritativeSeasonContext({live:calendar()},"2026-09-05T12:00:00-04:00",{player_id:"p",team:"T"});assert.equal(r.status,"RESOLVED");if(r.status==="RESOLVED")assert.equal(r.resolution_level,"LIVE_OFFICIAL");});
  test("conflicting official boundaries fail closed",()=>{const other=calendar();other.regular_season_start="2026-09-10T20:20:00-04:00";assert.equal(resolveAuthoritativeSeasonContext({cached:calendar(),stored:[other]},"2026-09-05T12:00:00-04:00",{player_id:"p",team:"T"}).status,"UNAVAILABLE");});
  test("malformed or absent authoritative calendar fails closed",()=>{assert.equal(resolveAuthoritativeSeasonContext({cached:{bad:true}},"2026-09-05T12:00:00-04:00",{player_id:"p",team:"T"}).status,"UNAVAILABLE");assert.equal(resolveAuthoritativeSeasonContext({},"2026-09-05T12:00:00-04:00",{player_id:"p",team:"T"}).status,"UNAVAILABLE");});
  test("gate evaluation is read only and cannot approve state",()=>{const c=complete();const before=JSON.stringify(c);const r=evaluateQbEvidenceCriticality(c);assert.equal(JSON.stringify(c),before);assert.equal("approval_status" in r,false);});
}
