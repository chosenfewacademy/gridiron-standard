export type MembershipStatus = "active" | "IR" | "PS" | "FA" | "other";

const PRACTICE = new Set(["DEV", "PRA", "PS", "PRACTICE"]);
const RESERVE = new Set(["RES", "INA", "PUP", "NFI", "SUS", "IR", "PUPR"]);
const FREE_AGENT = new Set(["CUT", "UNSIGNED_FREE_AGENT", "FA", "UFA"]);
const OTHER = new Set(["RET", "TRT", "TRD", "EXE", "TRC"]);

/**
 * Map a registry roster_status onto the Phase 1 membership set.
 * A player listed on a club with no status is treated as active: baseline identity
 * rows often have a team and no nflverse status. CUT and unsigned players are FA
 * even when the registry still names their last club.
 */
export function mapRosterStatus(raw: string | null | undefined, teamAbbr: string | null): MembershipStatus {
  const status = (raw ?? "").trim().toUpperCase();
  if (OTHER.has(status)) return "other";
  if (FREE_AGENT.has(status)) return "FA";
  if (!teamAbbr) return "FA";
  if (PRACTICE.has(status)) return "PS";
  if (RESERVE.has(status)) return "IR";
  if (status === "ACT" || status === "") return "active";
  return "other";
}
