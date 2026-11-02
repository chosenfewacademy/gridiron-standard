export type Intent =
  | { type: "CONTINUE" }
  | { type: "STATUS" }
  | { type: "FULL_PLAYER_AUDIT"; query: string }
  | { type: "RATINGS_ONLY"; query: string }
  | { type: "QUICK_RECHECK"; query: string }
  | { type: "TOP10_REAUDIT"; position: string }
  | { type: "TEAM_AUDIT"; team: string; position?: string }
  | { type: "TEAM_ROOM_LOCK"; team: string; position: string }
  | { type: "EXPORT_PLAYER"; query: string; mode: "MADDEN_ENTRY" | "AUDIT_RICH" }
  | { type: "EXPORT_POSITION"; position: string; mode: "MADDEN_ENTRY" | "AUDIT_RICH" }
  | { type: "EXPORT_TEAM"; team: string; position?: string; mode: "MADDEN_ENTRY" | "AUDIT_RICH" }
  | { type: "EXPORT_FULL"; mode: "MADDEN_ENTRY" | "AUDIT_RICH" }
  | { type: "CARD_PLAYER"; query: string }
  | { type: "UNKNOWN"; raw: string };

export function route(input: string): Intent {
  const value = input.trim();
  const lower = value.toLowerCase();

  if (["go", "continue", "next"].includes(lower)) return { type: "CONTINUE" };
  if (lower === "status") return { type: "STATUS" };

  const ratings = value.match(/^ratings?\s+(.+)$/i);
  if (ratings) return { type: "RATINGS_ONLY", query: ratings[1].trim() };

  const recheck = value.match(/^(?:recheck|quick recheck)\s+(.+)$/i);
  if (recheck) return { type: "QUICK_RECHECK", query: recheck[1].trim() };



  const inputCard = value.match(/^(?:card|input\s+card|madden\s+card)\s+(.+)$/i);
  if (inputCard) return {
    type: "CARD_PLAYER",
    query: inputCard[1].trim()
  };

  const exportFull = value.match(/^export\s+full(?:\s+roster)?\s+(madden|rich)$/i);
  if (exportFull) return {
    type: "EXPORT_FULL",
    mode: exportFull[1].toLowerCase() === "rich" ? "AUDIT_RICH" : "MADDEN_ENTRY"
  };

  const exportTeam = value.match(/^export\s+team\s+([A-Za-z]{2,4})(?:\s+(QB|RB|WR|TE|LT|LG|C|RG|RT|REDGE|LEDGE|DT|MIKE|WILL|SAM|CB|FS|SS|K|P|FB|LS))?\s+(madden|rich)$/i);
  if (exportTeam) return {
    type: "EXPORT_TEAM",
    team: exportTeam[1].toUpperCase(),
    position: exportTeam[2]?.toUpperCase(),
    mode: exportTeam[3].toLowerCase() === "rich" ? "AUDIT_RICH" : "MADDEN_ENTRY"
  };

  const exportPosition = value.match(/^export\s+position\s+(QB|RB|WR|TE|LT|LG|C|RG|RT|REDGE|LEDGE|DT|MIKE|WILL|SAM|CB|FS|SS|K|P|FB|LS)\s+(madden|rich)$/i);
  if (exportPosition) return {
    type: "EXPORT_POSITION",
    position: exportPosition[1].toUpperCase(),
    mode: exportPosition[2].toLowerCase() === "rich" ? "AUDIT_RICH" : "MADDEN_ENTRY"
  };

  const exportPlayer = value.match(/^export\s+player\s+(.+?)\s+(madden|rich)$/i);
  if (exportPlayer) return {
    type: "EXPORT_PLAYER",
    query: exportPlayer[1].trim(),
    mode: exportPlayer[2].toLowerCase() === "rich" ? "AUDIT_RICH" : "MADDEN_ENTRY"
  };

  const teamLock = value.match(/^lock\s+team\s+([A-Za-z]{2,4})\s+(QB|RB|WR|TE|LT|LG|C|RG|RT|REDGE|LEDGE|DT|MIKE|WILL|SAM|CB|FS|SS|K|P|FB|LS)$/i);
  if (teamLock) return {
    type: "TEAM_ROOM_LOCK",
    team: teamLock[1].toUpperCase(),
    position: teamLock[2].toUpperCase()
  };

  const teamAudit = value.match(/^audit\s+team\s+([A-Za-z]{2,4})(?:\s+(QB|RB|WR|TE|LT|LG|C|RG|RT|REDGE|LEDGE|DT|MIKE|WILL|SAM|CB|FS|SS|K|P|FB|LS))?$/i);
  if (teamAudit) return {
    type: "TEAM_AUDIT",
    team: teamAudit[1].toUpperCase(),
    position: teamAudit[2]?.toUpperCase()
  };

  const audit = value.match(/^audit\s+(.+)$/i);
  if (audit) return { type: "FULL_PLAYER_AUDIT", query: audit[1].trim() };

  const top10 = value.match(/^re-audit\s+(\w+)\s+top\s*10$/i);
  if (top10) return { type: "TOP10_REAUDIT", position: top10[1].toUpperCase() };

  return { type: "UNKNOWN", raw: value };
}
