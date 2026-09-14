import fs from "node:fs/promises";
import path from "node:path";
import { CALENDAR_MAX_AGE_MS, deriveSeasonContext, resolveAuthoritativeSeasonContext, type CalendarSnapshot } from "./season-phase.js";

export interface CalendarRefreshCheckpoint { audit_id: string; status: "SATISFIED"|"FAILED_RETRYABLE"|"FAILED_TERMINAL";
  attempt_count: number; max_attempts: 3; last_attempt_at: string|null; calendar: CalendarSnapshot|null;
  history: Array<{started_at:string;ended_at:string;elapsed_ms:number;outcome:"SUCCESS"|"FAILURE";reason:string|null}> }
export interface CalendarCollector { collect(task: Record<string,unknown>, signal: AbortSignal): Promise<CalendarSnapshot> }
export interface CalendarStore { load(): Promise<CalendarRefreshCheckpoint|null>; save(value: CalendarRefreshCheckpoint): Promise<void> }
export class FileCalendarStore implements CalendarStore {
  constructor(private readonly file:string) {}
  async load() { try { return JSON.parse(await fs.readFile(this.file,"utf8")) as CalendarRefreshCheckpoint; } catch { return null; } }
  async save(value:CalendarRefreshCheckpoint) { await fs.mkdir(path.dirname(this.file),{recursive:true}); const temp=`${this.file}.${process.pid}.tmp`;
    await fs.writeFile(temp,JSON.stringify(value,null,2)+"\n"); await fs.rename(temp,this.file); }
}

export async function refreshCalendarIfNeeded(input: { evidence: Record<string,any>; task: Record<string,unknown>;
  audit_id:string; as_of:string; collector:CalendarCollector; store:CalendarStore; request_timeout_ms?:number }): Promise<Record<string,any>> {
  if (resolveAuthoritativeSeasonContext({live:input.evidence.calendar,cached:input.evidence.calendar},input.as_of,input.task).status === "RESOLVED") return structuredClone(input.evidence);
  let checkpoint = await input.store.load() ?? {audit_id:input.audit_id,status:"FAILED_RETRYABLE" as const,attempt_count:0,
    max_attempts:3 as const,last_attempt_at:null,calendar:null,history:[]};
  if(checkpoint.status==="SATISFIED") checkpoint={...checkpoint,status:"FAILED_RETRYABLE",attempt_count:0,last_attempt_at:null};
  const expiredRetryCycle=checkpoint.status==="FAILED_TERMINAL" && checkpoint.last_attempt_at &&
    Date.parse(input.as_of)-Date.parse(checkpoint.last_attempt_at)>CALENDAR_MAX_AGE_MS &&
    checkpoint.history.slice(-checkpoint.max_attempts).every(entry=>/timeout|abort/i.test(entry.reason??""));
  if(expiredRetryCycle) checkpoint={...checkpoint,status:"FAILED_RETRYABLE",attempt_count:0,last_attempt_at:null};
  while (checkpoint.attempt_count < checkpoint.max_attempts) {
    const started_at=new Date().toISOString(), start=Date.now(); checkpoint.attempt_count++; checkpoint.last_attempt_at=started_at;
    try {
      const calendar=await input.collector.collect(input.task,AbortSignal.timeout(input.request_timeout_ms ?? 30_000));
      const result=deriveSeasonContext(calendar,input.as_of,input.task); if(result.status!=="RESOLVED") throw new Error(result.errors.join(","));
      checkpoint.calendar=calendar; checkpoint.status="SATISFIED"; checkpoint.history.push({started_at,ended_at:new Date().toISOString(),elapsed_ms:Date.now()-start,outcome:"SUCCESS",reason:null});
      await input.store.save(checkpoint); return {...structuredClone(input.evidence),calendar,calendar_web_search_observed:true};
    } catch(error) {
      checkpoint.status=checkpoint.attempt_count>=checkpoint.max_attempts?"FAILED_TERMINAL":"FAILED_RETRYABLE";
      checkpoint.history.push({started_at,ended_at:new Date().toISOString(),elapsed_ms:Date.now()-start,outcome:"FAILURE",reason:String(error)}); await input.store.save(checkpoint);
    }
  }
  return structuredClone(input.evidence);
}
