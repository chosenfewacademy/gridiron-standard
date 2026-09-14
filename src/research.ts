export interface EvidenceSource {
  name: string;
  url: string | null;
  published_at: string | null;
  retrieved_at: string;
  authority_tier: 1 | 2 | 3 | 4 | 5;
  claims: string[];
}

type OptionalSeasonMetadata = { [K in keyof SeasonMetadata]?: SeasonMetadata[K] | null };
export interface EvidencePackage extends OptionalSeasonMetadata {
  audit_type?: string;
  task_id: string;
  position: string;
  researched_at: string;
  sources: EvidenceSource[];
  normalized: Record<string, unknown>;
  conflicts: Record<string, unknown>[];
  minimum_evidence_met: boolean;
  missing_evidence: string[];
  calendar?: unknown;
  calendar_fallbacks?: unknown[];
  calendar_resolution_level?: string | null;
  evidence_warnings?: string[];
  gate_reasons?: string[];
  calendar_web_search_observed?: boolean;
  fresh_web_research_observed?: boolean;
}

export interface ResearchAdapter {
  gather(task: Record<string, unknown>): Promise<EvidencePackage>;
}
import type { SeasonMetadata } from "./season-phase.js";
