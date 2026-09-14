import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { assertRuntimePath,buildEphemeralCliArgs,isRuntimeStateWriteFailure,redactEnvironment,RUNTIME_ROOT } from "../src/research-transport.js";

export function runResearchTransportTests(test:(name:string,fn:()=>void)=>void){
  test("nested Codex runtime remains in workspace and is gitignored",()=>{assert(assertRuntimePath(path.join(RUNTIME_ROOT,"job")).startsWith(RUNTIME_ROOT));assert.throws(()=>assertRuntimePath(path.resolve("..","escape")));assert(fs.readFileSync(".gitignore","utf8").includes(".gridiron-runtime/"));});
  test("ephemeral CLI arguments include sqlite and structured output",()=>{const args=buildEphemeralCliArgs({runtimeDir:path.join(RUNTIME_ROOT,"job"),schemaFile:"schema.json",workingDirectory:".",prompt:"fixture"});assert(args.includes("--ephemeral"));assert(args.includes("--json"));assert(args.includes("--output-schema"));assert(args.some(x=>x.startsWith("sqlite_home=")));assert(!args.includes("--dangerously-bypass-approvals-and-sandbox"));});
  test("CODEX_HOME is not rewritten by CLI argument generation",()=>{const before=process.env.CODEX_HOME;buildEphemeralCliArgs({runtimeDir:path.join(RUNTIME_ROOT,"job"),schemaFile:"schema.json",workingDirectory:".",prompt:"fixture"});assert.equal(process.env.CODEX_HOME,before);});
  test("only recognized state database failures trigger fallback",()=>{assert(isRuntimeStateWriteFailure("failed to open state DB: attempt to write a readonly database"));assert(!isRuntimeStateWriteFailure("authentication failed"));assert(!isRuntimeStateWriteFailure("ordinary request timeout"));assert(!isRuntimeStateWriteFailure("model unavailable"));});
  test("environment diagnostics redact secrets",()=>{const value=redactEnvironment({PATH:"safe",OPENAI_API_KEY:"secret",AUTH_TOKEN:"secret"});assert.equal(value.PATH,"safe");assert.equal(value.OPENAI_API_KEY,"[REDACTED]");assert.equal(value.AUTH_TOKEN,"[REDACTED]");});
  test("runtime cleanup target cannot escape repository",()=>{const job=assertRuntimePath(path.join(RUNTIME_ROOT,"cleanup-test"));fs.mkdirSync(job,{recursive:true});fs.rmSync(job,{recursive:true,force:true});assert.equal(fs.existsSync(job),false);});
}
