import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

export type ResearchTransportName="OPENAI_RESPONSES_TRANSPORT"|"SDK_TRANSPORT"|"EPHEMERAL_CLI_TRANSPORT";
export interface TransportResult { finalResponse:string; items:Array<{type:string;[key:string]:unknown}>; transport:ResearchTransportName;
  runtimeFiles:string[]; runtimeCleaned:boolean }
export class TransportExecutionError extends Error { constructor(message:string,readonly runtimeFiles:string[]){super(message);this.name="TransportExecutionError";} }
const ROOT=path.resolve(".");
export const RUNTIME_ROOT=path.resolve(".gridiron-runtime/codex-sqlite");

export function assertRuntimePath(candidate:string):string {
  const resolved=path.resolve(candidate);
  if(resolved!==RUNTIME_ROOT&&!resolved.startsWith(RUNTIME_ROOT+path.sep))throw new Error("Codex SQLite runtime must remain inside the repository runtime root");
  if(!resolved.startsWith(ROOT+path.sep))throw new Error("Codex SQLite runtime escaped workspace");
  return resolved;
}
export function isRuntimeStateWriteFailure(error:unknown):boolean {
  const text=String(error);
  return /(failed to (open|initialize).*state|state (db|database)|readonly database|runtime-state).*(access is denied|permission denied|readonly|code: 8)|attempt to write a readonly database/i.test(text);
}
export function redactEnvironment(input:Record<string,string|undefined>):Record<string,string>{
  const sensitive=/(key|token|secret|password|credential|auth|cookie)/i; const out:Record<string,string>={};
  for(const [key,value] of Object.entries(input))out[key]=sensitive.test(key)?"[REDACTED]":String(value??""); return out;
}
export function buildEphemeralCliArgs(input:{runtimeDir:string;schemaFile:string;workingDirectory:string;prompt:string}):string[]{
  const runtime=assertRuntimePath(input.runtimeDir);
  return ["exec","--ephemeral","--json","--strict-config","--output-schema",path.resolve(input.schemaFile),
    "--config",`sqlite_home=${JSON.stringify(runtime)}`,"--config",'web_search="live"',"--config",'approval_policy="never"',
    "--sandbox","read-only","--cd",path.resolve(input.workingDirectory),"--skip-git-repo-check",input.prompt];
}
function inheritedEnvironment():NodeJS.ProcessEnv {
  return {...process.env,CODEX_HOME:process.env.CODEX_HOME||(process.env.USERPROFILE?path.join(process.env.USERPROFILE,".codex"):undefined)};
}
export class EphemeralCliResearchTransport {
  async run(prompt:string,outputSchema:unknown,jobId:string):Promise<TransportResult>{
    const safeJob=jobId.replace(/[^a-zA-Z0-9_-]/g,"_"); const runtime=assertRuntimePath(path.join(RUNTIME_ROOT,safeJob));
    await fs.mkdir(runtime,{recursive:true}); const schemaFile=path.join(runtime,"output-schema.json");
    await fs.writeFile(schemaFile,JSON.stringify(outputSchema));
    const nativeCli=path.resolve("node_modules/@openai/codex-win32-x64/vendor/x86_64-pc-windows-msvc/bin/codex.exe");
    const nodeCli=path.resolve("node_modules/@openai/codex/bin/codex.js");
    const executable=process.platform==="win32"?nativeCli:process.execPath;
    const args=[...(process.platform==="win32"?[]:[nodeCli]),...buildEphemeralCliArgs({runtimeDir:runtime,schemaFile,workingDirectory:ROOT,prompt})];
    let stdout="",stderr="",runtimeFiles:string[]=[];
    try{
      const code=await new Promise<number|null>((resolve,reject)=>{const child=spawn(executable,args,{cwd:ROOT,env:inheritedEnvironment(),stdio:["ignore","pipe","pipe"]});
        child.stdout.on("data",chunk=>stdout+=chunk);child.stderr.on("data",chunk=>stderr+=chunk);child.on("error",reject);child.on("close",resolve);});
      runtimeFiles=await listFiles(runtime);
      if(code!==0)throw new TransportExecutionError(`Ephemeral Codex CLI failed (${code}): ${stderr.slice(-4000)}`,runtimeFiles);
      const events=stdout.split(/\r?\n/).filter(Boolean).map(line=>JSON.parse(line));
      const messages=events.filter(e=>e.type==="item.completed"&&e.item?.type==="agent_message");
      const finalResponse=String(messages.at(-1)?.item?.text??""); if(!finalResponse)throw new Error("Ephemeral Codex CLI returned no final message");
      const web=events.filter(e=>e.type==="item.completed"&&e.item?.type==="web_search").map(e=>e.item);
      return{finalResponse,items:web,transport:"EPHEMERAL_CLI_TRANSPORT",runtimeFiles,runtimeCleaned:true};
    } finally { await fs.rm(runtime,{recursive:true,force:true}); }
  }
}
async function listFiles(dir:string):Promise<string[]>{const out:string[]=[];for(const entry of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())out.push(...await listFiles(file));else out.push(path.relative(dir,file));}return out;}
async function exists(file:string){try{await fs.stat(file);return true}catch{return false}}
