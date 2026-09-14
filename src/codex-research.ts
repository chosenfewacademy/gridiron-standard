import { Codex, type Thread, type ThreadOptions, type TurnOptions, type WebSearchItem } from "@openai/codex-sdk";
import type { EvidencePackage, ResearchAdapter } from "./research.js";
import { deriveSeasonContext } from "./season-phase.js";
import { applyFullAuditEvidenceGate, requiredEvidenceCategories } from "./evidence-gate.js";

export interface ResearchClient {
  startThread(options?: ThreadOptions): Pick<Thread, "id" | "run">;
}

export class CodexResearchAdapter implements ResearchAdapter {
  readonly diagnostics: {
    thread_id: string | null;
    web_searches: WebSearchItem[];
    raw_response: string | null;
  } = { thread_id: null, web_searches: [], raw_response: null };

  constructor(
    private readonly threadOptions: ThreadOptions = {},
    private readonly turnOptions: TurnOptions = {},
    private readonly codex: ResearchClient = new Codex({}),
    private readonly now: () => string = () => new Date().toISOString()
  ) {}

  async gather(task: Record<string, unknown>): Promise<EvidencePackage> {
    this.diagnostics.thread_id = null;
    this.diagnostics.web_searches = [];
    this.diagnostics.raw_response = null;

    const fullAudit = task.audit_type === "FULL_AUDIT" || task.type === "player_full_audit";
    let calendar: unknown;
    let phaseInstructions = "";
    let calendarSearchCount = 0;
    const blocked = (reason: string): EvidencePackage => ({
      task_id: String(task.task_id ?? ""), position: String(task.position ?? ""),
      researched_at: this.now(), sources: [], normalized: {}, conflicts: [],
      minimum_evidence_met: false, missing_evidence: [reason], calendar,
      calendar_web_search_observed: calendarSearchCount > 0, fresh_web_research_observed: false
    });
    if (fullAudit) {
      const asOf = this.now();
      try {
        calendar = parseJsonObject(await this.runResearch(`Collect ONLY authoritative NFL calendar/schedule facts and player regular-season appearances.
This is a read-only research stage. Do not assign ratings, run project commands, or write files.
As of: ${asOf}. Player: ${JSON.stringify({ player_id: task.player_id, team: task.team, player_name: task.player_name })}.
Use live web search and open official nfl.com / operations.nfl.com schedule, calendar and player-stat pages.
Derive the active NFL season from the official league-year/calendar, NOT the Gregorian year. January/February games generally retain the preceding NFL season label.
Return a JSON object with nfl_season, player_id, team, valid_from, valid_until, preseason_start, regular_season_start, postseason_start, season_end,
current_season_games_available, current_season_games_played, regular_season_games_scheduled, regular_season_complete, postseason_complete,
sources: [{url, retrieved_at, claims: [specific supported dates/counts]}].
Dates must be sourced ISO timestamps with timezone: valid_from is that NFL league-year start; valid_until is the next league-year start;
preseason_start is the official start of this team's camp/preseason activity; regular_season_start is the first league regular-season kickoff;
postseason_start is the start of the day after the final scheduled regular-season game date; season_end is the start of the day after the final scheduled postseason game date.
Use America/New_York calendar-day boundaries with explicit offsets for these two dates; exact future game-ending times are neither knowable nor required.
Separately verify regular_season_complete and postseason_complete from official final game statuses, never just scheduled dates. They are false before those stages conclude. Account for postponements in the current official calendar.
All boundaries must be strictly chronological. Do not invent unpublished dates or assume a scheduled game has finished.
Games available means completed regular-season opportunities for this player's team (account explicitly for trades); games played means the player's verified regular-season appearances. Exclude preseason/postseason games from both counts.
Before Week 1 these counts must be zero, supported by the official schedule. Keep an injured player's appearances separate from team opportunities.
Only accept https NFL-domain sources with actual current retrieval timestamps; record which dates/counts each source supports.
If any necessary calendar boundaries or counts cannot be established authoritatively, return {"unavailable": true, "reason": "specific missing facts"}. Do not guess or request approval.` , true));
        calendarSearchCount = this.diagnostics.web_searches.length;
      } catch {
        return applyFullAuditEvidenceGate(blocked("CALENDAR_RESEARCH_FAILED"), task, this.now());
      }
      const context = deriveSeasonContext(calendar, this.now(), task);
      if (context.status !== "RESOLVED" || calendarSearchCount === 0) {
        return applyFullAuditEvidenceGate(blocked("CALENDAR_UNAVAILABLE"), task, this.now());
      }
      phaseInstructions = `
APPLICATION-DERIVED SEASON CONTEXT (authoritative for evidence selection):
${JSON.stringify(context.metadata)}
Official calendar evidence: ${JSON.stringify(context.calendar)}
REQUIRED FULL AUDIT CATEGORIES (all must be assessed):
${JSON.stringify(requiredEvidenceCategories(String(task.position), context.metadata.season_phase))}
PRIMARY means performance from the evidence_season regular season, NOT necessarily the current calendar year.
OFFSEASON/PRESEASON: use latest completed regular season, its postseason where applicable, multi-year context, and current role, roster/depth, injury/practice, preseason participation, age/trajectory, team/system and positional controls. Do not demand nonexistent upcoming regular-season production.
EARLY REGULAR SEASON: retain the completed-season primary baseline; incorporate current games explicitly, preserving small-sample uncertainty. Current data must not automatically overwrite that baseline.
ESTABLISHED REGULAR SEASON, POSTSEASON and COMPLETE_SEASON: current NFL season regular-season performance is primary; keep postseason as a distinct sample and prior years as sustainability/trajectory context.
Do not infer sufficient individual sample from league phase. Record snaps, attempts, games and sample limitations in the evidence.
Return every required category under normalized, using:
{status: "satisfied"|"partial"|"missing"|"not_applicable", confidence: "HIGH"|"MEDIUM"|"LOW",
items: [{claim, source_url, retrieved_at: ISO timestamp, season: NFL season number, period: "REGULAR_SEASON"|"POSTSEASON"|"CURRENT_CONTEXT"}],
limitations: [strings], not_applicable_reason?: string, compared_controls?: [player names]}.
Every claim needs a source URL also present in sources and an actual retrieval timestamp. CURRENT categories need current NFL season context;
current_season_performance needs regular-season observations when the player has appeared, or sourced absence/workload explanation when zero games played.
MULTI_YEAR requires at least two seasons including evidence_season. POSTSEASON means postseason of evidence_season.
Only postseason_context and preseason_participation can be not_applicable; even then require source-backed proof and a specific reason. Unavailable data is NOT non-applicability.
For locked_control_comparisons identify all stored Top 10 names in compared_controls and provide real comparable evidence; outside_control_comparisons must identify nearest stored external controls with selection justification. Never reconstruct or alter controls.
position_specific_traits must substantively cover every major gameplay/OVR-driving trait independently using relevant position evidence. Do not invent absent locked architecture.
Premium metric gaps require the strongest public substitute and explicit limitations/confidence. Partial or LOW-confidence required evidence cannot pass.
Do not mark minimum_evidence_met true unless every applicable category is sufficiently supported, exact-trait/sample gaps are resolved, and missing_evidence is empty. No ratings or OVR.\n`;
    }

    const prompt = `
You are the research collector for Gridiron Standard 27.

TASK:
${JSON.stringify(task, null, 2)}

Research requirements:
- Perform fresh current web research if web access is available in the Codex environment.
- Use at least one high-authority source.
- Prefer multiple independent sources.
- Use the application-derived season context for Full Audit primary evidence; otherwise prioritize current-season evidence.
- Preserve conflicting evidence.
- Record publication date and retrieval date where possible.
- Gather position-specific production, efficiency, role/workload, injury/availability,
  and comparison evidence.
- Do NOT assign Madden ratings or OVR.
- Do NOT decide Top 10 membership.
- If fresh web research is unavailable, set minimum_evidence_met=false and list
  "fresh_web_research_unavailable" under missing_evidence rather than inventing data.
${phaseInstructions}

Return ONLY valid JSON matching this shape:
{
  "task_id": "...",
  "position": "...",
  "researched_at": "ISO timestamp",
  "sources": [
    {
      "name": "...",
      "url": "... or null",
      "published_at": "... or null",
      "retrieved_at": "ISO timestamp",
      "authority_tier": 1,
      "claims": ["..."]
    }
  ],
  "normalized": {},
  "conflicts": [],
  "minimum_evidence_met": true,
  "missing_evidence": []
}
`;
    try {
      const parsed = parseJsonObject(await this.runResearch(prompt, fullAudit)) as EvidencePackage;
      if (!fullAudit) return parsed;
      return applyFullAuditEvidenceGate({ ...parsed, calendar,
        calendar_web_search_observed: calendarSearchCount > 0,
        fresh_web_research_observed: this.diagnostics.web_searches.length > calendarSearchCount
      }, task, this.now());
    } catch (error) {
      if (!fullAudit) throw error;
      return applyFullAuditEvidenceGate(blocked("FULL_AUDIT_RESEARCH_FAILED_OR_INVALID_JSON"), task, this.now());
    }
  }

  private async runResearch(prompt: string, fullAudit: boolean): Promise<string> {
    const thread = this.codex.startThread(fullAudit ? {
      ...this.threadOptions, sandboxMode: "read-only", approvalPolicy: "never", webSearchMode: "live",
      workingDirectory: this.threadOptions.workingDirectory ?? process.cwd(), skipGitRepoCheck: true
    } : this.threadOptions);
    let result;
    try {
      result = await thread.run(prompt, this.turnOptions);
    } finally {
      this.diagnostics.thread_id = thread.id;
    }
    this.diagnostics.web_searches.push(...result.items.filter(
      (item): item is WebSearchItem => item.type === "web_search"
    ));
    const text =
      result.finalResponse;
    this.diagnostics.raw_response = text;

    return text;
  }
}

function parseJsonObject(text: string): unknown {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start < 0 || end < 0) throw new Error("Research stage returned no JSON object.");
  return JSON.parse(candidate.slice(start, end + 1));
}
