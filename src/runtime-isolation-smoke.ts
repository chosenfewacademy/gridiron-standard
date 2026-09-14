import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { EphemeralCliResearchTransport, RUNTIME_ROOT, TransportExecutionError } from "./research-transport.js";

const schema={type:"object",additionalProperties:false,required:["query","answer","sources","retrieved_at"],properties:{
  query:{type:"string"},answer:{type:"string"},retrieved_at:{type:"string"},sources:{type:"array",minItems:1,items:{type:"object",additionalProperties:false,required:["title","url"],properties:{title:{type:"string"},url:{type:"string",format:"uri"}}}}}};
const codexHome=process.env.CODEX_HOME||(process.env.USERPROFILE?path.join(process.env.USERPROFILE,".codex"):"");
async function metadata(){const sqlite:string[]=[];const sessions:string[]=[];async function walk(dir:string){for(const entry of await fs.readdir(dir,{withFileTypes:true}).catch(()=>[])){const full=path.join(dir,entry.name);if(entry.isDirectory()){if(entry.name==="sessions"||sessions.length){};await walk(full);}else if(/\.sqlite(?:-wal|-shm)?$/i.test(entry.name)){const s=await fs.stat(full);sqlite.push(`${path.relative(codexHome,full)}:${s.mtimeMs}`);}else if(full.includes(`${path.sep}sessions${path.sep}`))sessions.push(path.relative(codexHome,full));}}if(codexHome)await walk(codexHome);return{sqlite:sqlite.sort(),session_rollout_count:sessions.length};}
const protectedFiles=["data/baselines/QB.json","state/project-state.json","state/locks.json","logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/evidence-progress.json"];
const hash=async(file:string)=>createHash("sha256").update(await fs.readFile(file)).digest("hex");
const protectedBefore=Object.fromEntries(await Promise.all(protectedFiles.map(async file=>[file,await hash(file)])));
const before=await metadata();const transport=new EphemeralCliResearchTransport();const runs=[];
const prompts=["Find the official date of the first 2026 NFL regular-season game.","Find one current official NFL schedule fact for Week 1 of the 2026 season.","Find the Los Angeles Rams' first scheduled regular-season opponent in 2026."];
for(let i=0;i<prompts.length;i++){
  try{const result=await transport.run(`Use live web research. Answer this harmless NFL calendar question: ${prompts[i]} Return only schema-compliant JSON with at least one source and the current retrieval timestamp.`,schema,`smoke-${i+1}`);
    const parsed=JSON.parse(result.finalResponse);runs.push({run:i+1,initialization_success:true,structured_parse_success:Array.isArray(parsed.sources),source_count:parsed.sources?.length??0,
      sources:parsed.sources??[],runtime_files:result.runtimeFiles,runtime_cleaned:result.runtimeCleaned,transport:result.transport});
  }catch(error){const runtimeFiles=error instanceof TransportExecutionError?error.runtimeFiles:[];const job=path.join(RUNTIME_ROOT,`smoke-${i+1}`);
    runs.push({run:i+1,initialization_success:false,structured_parse_success:false,source_count:0,repository_sqlite_initialized:runtimeFiles.some(x=>x.endsWith(".sqlite")),
      runtime_files:runtimeFiles,runtime_cleaned:!await fs.stat(job).then(()=>true).catch(()=>false),error:String(error).replace(/[A-Za-z0-9_-]{20,}/g,"[REDACTED]")});}
}
const after=await metadata();const protectedAfter=Object.fromEntries(await Promise.all(protectedFiles.map(async file=>[file,await hash(file)])));
const report={architecture:"PER_JOB_EPHEMERAL_CLI",runtime_root:RUNTIME_ROOT,codex_home_rewritten:false,code_home_metadata_unchanged:JSON.stringify(before)===JSON.stringify(after),
  before,after,runs,initialization_success_rate:`${runs.filter(x=>x.initialization_success).length}/3`,structured_output_success_rate:`${runs.filter(x=>x.structured_parse_success).length}/3`,
  source_capture_success_rate:`${runs.filter(x=>x.source_count>0).length}/3`,protected_state_unchanged:JSON.stringify(protectedBefore)===JSON.stringify(protectedAfter),protected_hashes:protectedAfter};
await fs.mkdir("logs/runtime-isolation",{recursive:true});await fs.writeFile("logs/runtime-isolation/smoke-result.json",JSON.stringify(report,null,2)+"\n");console.log(JSON.stringify(report,null,2));
