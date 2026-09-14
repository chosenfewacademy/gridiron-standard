import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const [source, emitted, ...forwarded] = process.argv.slice(2);
if (!source || !emitted) throw new Error("Expected TypeScript source and emitted JavaScript path.");
const tsx = path.resolve("node_modules/tsx/dist/cli.mjs");
const childEnvironment = { ...process.env, HOME: process.env.HOME || process.env.USERPROFILE,
  CODEX_HOME: process.env.CODEX_HOME || (process.env.USERPROFILE ? path.join(process.env.USERPROFILE,".codex") : undefined) };
const simulated = process.env.GRIDIRON_SIMULATE_TSX_ENOMEM === "1";
const normal = simulated ? {status:1,stdout:"",stderr:"uv_os_get_passwd returned ENOMEM"} :
  spawnSync(process.execPath,[tsx,source,...forwarded],{encoding:"utf8",env:childEnvironment});
if (normal.stdout) process.stdout.write(normal.stdout); if (normal.stderr) process.stderr.write(normal.stderr);
if (normal.status === 0) process.exit(0);
const output = `${normal.stdout ?? ""}\n${normal.stderr ?? ""}`;
if (!/uv_os_get_passwd[\s\S]*ENOMEM/i.test(output)) process.exit(normal.status ?? 1);

const outDir=path.resolve(`.runtime-dist-${process.pid}`);
console.error("GRIDIRON_RUNTIME_FALLBACK_USED: recognized uv_os_get_passwd/ENOMEM; compiling with project tsconfig.");
try {
  const compile=spawnSync(process.execPath,[path.resolve("node_modules/typescript/bin/tsc"),"--outDir",outDir],{stdio:"inherit"});
  if(compile.status!==0) process.exit(compile.status ?? 1);
  const run=spawnSync(process.execPath,[path.join(outDir,emitted),...forwarded],{stdio:"inherit",env:childEnvironment}); process.exitCode=run.status ?? 1;
} finally {
  const resolved=path.resolve(outDir),root=path.resolve(".");
  if(resolved.startsWith(root+path.sep) && fs.existsSync(resolved)) fs.rmSync(resolved,{recursive:true,force:true});
}
