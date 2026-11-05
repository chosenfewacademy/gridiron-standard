import { normalizeName } from "./names.js";

export type PoolRole = "TOP10" | "FIRST_OUT" | "EXTERNAL_CONTROL" | "RATED";
export type SelectionReason = "locks.json" | "latest_file";
export type CardOrigin = "effective_ratings" | "stage_audit_ids" | "baseline_list";

export interface SeedWarning {
  code: string;
  detail: string;
}

export interface ParsedBaselineName {
  position: string;
  /** YYYYMMDD, or 0 for an undated bootstrap file such as QB.json. */
  date: number;
  /** Same-day suffix. Empty string is earlier than b, c, ... */
  suffix: string;
  fileName: string;
}

export interface LockEntry {
  status?: string;
  baseline_file?: string;
  version?: string;
  lock_audit_id?: string;
  locked_at?: string;
  history?: { baseline_file?: string }[];
}

export interface BaselineSelection {
  relativeFile: string;
  fileName: string;
  reason: SelectionReason;
  newerUnselected: string | null;
}

export interface CardDraft {
  playerName: string;
  ovr: number | null;
  auditId: string | null;
  audit: Record<string, unknown> | null;
  poolRole: PoolRole;
  rank: number | null;
  origin: CardOrigin;
}

const BASELINE_NAME = /^([A-Z]{1,5})(?:\.reaudit-(\d{8})([b-z]?))?\.json$/;

export function basename(file: string): string {
  return file.split(/[/\\]/).pop() ?? file;
}

export function parseBaselineName(file: string): ParsedBaselineName | null {
  const fileName = basename(file);
  const match = BASELINE_NAME.exec(fileName);
  if (!match) return null;
  return {
    position: match[1],
    date: match[2] ? Number(match[2]) : 0,
    suffix: match[3] ?? "",
    fileName
  };
}

/** Higher date, then a later same-day suffix (b after the unsuffixed file). */
export function compareBaselineNames(a: string, b: string): number {
  const left = parseBaselineName(a);
  const right = parseBaselineName(b);
  if (!left || !right) return 0;
  if (left.date !== right.date) return left.date - right.date;
  if (left.suffix === right.suffix) return 0;
  return left.suffix < right.suffix ? -1 : 1;
}

export function pickLatestBaselineFile(position: string, files: string[]): string | null {
  const matches = files.filter(file => parseBaselineName(file)?.position === position);
  if (!matches.length) return null;
  return matches.sort(compareBaselineNames).at(-1) ?? null;
}

/**
 * The commissioner lock pointer wins when it names a file that is on disk.
 * That pointer is already the later same-day file when a relock exists
 * (CB.reaudit-20261104b over CB.reaudit-20261104). If the pointer is missing,
 * fall back to the latest dated file, suffix included.
 */
export function selectBaseline(
  position: string,
  lock: LockEntry | undefined,
  presentFiles: string[]
): BaselineSelection | null {
  const latest = pickLatestBaselineFile(position, presentFiles);
  const lockedName = lock?.status === "LOCKED" && lock.baseline_file ? basename(lock.baseline_file) : null;
  const locked = lockedName ? parseBaselineName(lockedName) : null;
  const lockedPresent = locked
    ? presentFiles.some(file => basename(file) === locked.fileName)
    : false;

  if (locked && locked.position === position && lockedPresent) {
    const newer = latest && basename(latest) !== locked.fileName ? basename(latest) : null;
    return {
      relativeFile: `data/baselines/${locked.fileName}`,
      fileName: locked.fileName,
      reason: "locks.json",
      newerUnselected: newer
    };
  }

  if (!latest) return null;
  return {
    relativeFile: `data/baselines/${basename(latest)}`,
    fileName: basename(latest),
    reason: "latest_file",
    newerUnselected: null
  };
}

export function finiteNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export function effectiveRateAuditIds(ids: unknown): string[] {
  if (!Array.isArray(ids)) return [];
  const best = new Map<string, { id: string; rev: number }>();
  for (const raw of ids) {
    if (typeof raw !== "string") continue;
    const match = /^(.*_RATE_\d+)(?:_A(\d+))?$/.exec(raw);
    if (!match) continue;
    const rev = match[2] ? Number(match[2]) : 0;
    const current = best.get(match[1]);
    if (!current || rev >= current.rev) best.set(match[1], { id: raw, rev });
  }
  return [...best.values()].map(row => row.id);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function effectiveMap(baseline: Record<string, unknown>): Record<string, unknown> | null {
  const scarcity = asRecord(baseline.scarcity);
  const nested = scarcity ? asRecord(scarcity.effective_ratings) : null;
  if (nested) return nested;
  return asRecord(baseline.effective_ratings);
}

function auditPlayerName(audit: Record<string, unknown> | null): string | null {
  if (!audit) return null;
  const players = audit.players;
  if (Array.isArray(players) && typeof players[0] === "string" && players[0].trim()) return players[0];
  if (typeof audit.player === "string" && audit.player.trim()) return audit.player;
  if (typeof audit.player_name === "string" && audit.player_name.trim()) return audit.player_name;
  return null;
}

function listedName(row: unknown): { player: string; ovr: number | null } | null {
  const record = asRecord(row);
  if (!record || typeof record.player !== "string" || !record.player.trim()) return null;
  return { player: record.player, ovr: finiteNumber(record.ovr) };
}

interface MutableDraft {
  playerName: string;
  ovr: number | null;
  auditId: string | null;
  audit: Record<string, unknown> | null;
  poolRole: PoolRole;
  rank: number | null;
  origin: CardOrigin;
}

/**
 * Build the rating cards a locked baseline publishes.
 * effective_ratings (when the lock recorded them) name the superseding audit and OVR.
 * Otherwise the highest _A revision of each _RATE_ task in stage_audit_ids is used.
 * full_cards is ignored: on some locks it is an older import whose OVR disagrees with top_10.
 * top_10 OVR is the published baseline number and overrides a different audit proposal.
 */
export function draftsFromBaseline(
  baseline: Record<string, unknown>,
  loadAudit: (auditId: string) => { audit: Record<string, unknown> | null; missing?: string }
): { drafts: CardDraft[]; warnings: SeedWarning[]; cardSource: string } {
  const warnings: SeedWarning[] = [];
  const byName = new Map<string, MutableDraft>();
  const position = typeof baseline.position === "string" ? baseline.position : "?";
  const ratings = effectiveMap(baseline);
  const cardSource = ratings ? "effective_ratings" : "stage_audit_ids";

  const acceptAudit = (auditId: string): Record<string, unknown> | null => {
    const loaded = loadAudit(auditId);
    if (!loaded.audit) {
      warnings.push({
        code: "AUDIT_MISSING",
        detail: `${position} ${auditId}${loaded.missing ? `: ${loaded.missing}` : ""}`
      });
      return null;
    }
    const audit = loaded.audit;
    if (typeof audit.audit_id === "string" && audit.audit_id !== auditId) {
      warnings.push({
        code: "AUDIT_ID_MISMATCH",
        detail: `${position} baseline cites ${auditId} but file says ${audit.audit_id}`
      });
    }
    if (typeof audit.task_type === "string" && audit.task_type !== "player_rating") {
      warnings.push({ code: "AUDIT_NOT_RATING", detail: `${position} ${auditId} is ${audit.task_type}` });
      return null;
    }
    if (typeof audit.position === "string" && baseline.position && audit.position !== baseline.position) {
      warnings.push({
        code: "AUDIT_POSITION_MISMATCH",
        detail: `${auditId}: ${audit.position} vs baseline ${String(baseline.position)}`
      });
    }
    return audit;
  };

  const put = (draft: MutableDraft): void => {
    const key = normalizeName(draft.playerName);
    if (!key) return;
    const existing = byName.get(key);
    if (existing && existing.origin !== "baseline_list") {
      warnings.push({
        code: "DUPLICATE_CARD",
        detail: `${position} ${draft.playerName} already has ${existing.auditId ?? "a card"}`
      });
      return;
    }
    byName.set(key, draft);
  };

  if (ratings) {
    for (const [playerName, raw] of Object.entries(ratings)) {
      const pair = Array.isArray(raw) ? raw : [];
      const auditId = typeof pair[0] === "string" ? pair[0] : null;
      const listedOvr = finiteNumber(pair[1]);
      const audit = auditId ? acceptAudit(auditId) : null;
      const proposed = finiteNumber(audit?.proposed_ovr);
      if (listedOvr !== null && proposed !== null && listedOvr !== proposed) {
        warnings.push({
          code: "OVR_MISMATCH",
          detail: `${position} ${playerName}: effective_ratings ${listedOvr} vs ${auditId} proposed ${proposed}`
        });
      }
      put({
        playerName,
        ovr: listedOvr ?? proposed,
        auditId,
        audit,
        poolRole: "RATED",
        rank: null,
        origin: "effective_ratings"
      });
    }
  } else {
    for (const auditId of effectiveRateAuditIds(baseline.stage_audit_ids)) {
      const audit = acceptAudit(auditId);
      const playerName = auditPlayerName(audit);
      if (!playerName) {
        warnings.push({ code: "AUDIT_NO_PLAYER", detail: `${position} ${auditId}` });
        continue;
      }
      put({
        playerName,
        ovr: finiteNumber(audit?.proposed_ovr),
        auditId,
        audit,
        poolRole: "RATED",
        rank: null,
        origin: "stage_audit_ids"
      });
    }
  }

  const overlayList = (
    rows: unknown,
    role: PoolRole,
    ranked: boolean
  ): void => {
    if (!Array.isArray(rows) && role !== "FIRST_OUT") return;
    const list = role === "FIRST_OUT"
      ? [baseline.first_out].filter(Boolean)
      : rows as unknown[];
    for (const row of list) {
      const listed = listedName(row);
      if (!listed) continue;
      const key = normalizeName(listed.player);
      const existing = byName.get(key);
      const rank = ranked ? finiteNumber(asRecord(row)?.rank) : null;
      if (!existing) {
        byName.set(key, {
          playerName: listed.player,
          ovr: listed.ovr,
          auditId: null,
          audit: null,
          poolRole: role,
          rank,
          origin: "baseline_list"
        });
        continue;
      }
      if (listed.ovr !== null && existing.ovr !== null && listed.ovr !== existing.ovr && role === "TOP10") {
        warnings.push({
          code: "OVR_MISMATCH",
          detail: `${position} ${listed.player}: top_10 ${listed.ovr} vs card ${existing.ovr}`
        });
      }
      if (role === "TOP10" && listed.ovr !== null) existing.ovr = listed.ovr;
      else if (existing.ovr === null && listed.ovr !== null) existing.ovr = listed.ovr;
      if (existing.poolRole !== "TOP10") existing.poolRole = role;
      if (role === "TOP10") {
        existing.poolRole = "TOP10";
        existing.rank = rank;
        existing.playerName = listed.player;
      }
    }
  };

  overlayList(baseline.top_10, "TOP10", true);
  overlayList(baseline.external_controls, "EXTERNAL_CONTROL", false);
  overlayList(null, "FIRST_OUT", false);

  const drafts = [...byName.values()].sort((a, b) => {
    const ar = a.rank ?? 999;
    const br = b.rank ?? 999;
    if (ar !== br) return ar - br;
    const ao = a.ovr ?? -1;
    const bo = b.ovr ?? -1;
    if (ao !== bo) return bo - ao;
    return a.playerName.localeCompare(b.playerName);
  });

  return { drafts, warnings, cardSource };
}
