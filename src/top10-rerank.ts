import fs from "node:fs";
import path from "node:path";
import { loadRubric } from "./rubric-audit.js";

/**
 * Current-data top-10 re-audit opened by commissioner order t115u.
 * Locked baselines are read and left in place. A locked rank is history.
 * It is not a reason to keep that rank, and it is not evidence for a new one.
 * This module does not invent stats, PFF grades, or attributes.
 */

export const REAUDIT_ORDER_ID = "t115u";

export interface EvidenceSource {
  url: string;
  retrieved_at: string;
  publisher: string;
}

export interface EvidenceWindow {
  /** current_primary is 2026 alone. prior_context cannot reorder. blended_established is 2026 through Week 8 primary plus completed 2025 context. */
  role: "current_primary" | "prior_context" | "blended_established";
  season?: number;
  current?: { season: number; through_week: number; share: number };
  prior?: { season: number; share: number; completed?: boolean };
  /** Required for a blend. Says why these shares still leave 2026 primary. Not an overall weight. */
  rationale?: string;
}

export interface SourcedComparison {
  position: string;
  better: string;
  worse: string;
  claim: string;
  sources: EvidenceSource[];
  evidence_window: EvidenceWindow;
  sample: { snaps_or_plays: number; role: string; adequate: boolean };
  uncertainty: "HIGH" | "MEDIUM" | "LOW";
  pff_used_as_rank?: boolean;
  ea_used_as_rating?: boolean;
  trait_tier?: 90 | 95 | 97 | 99;
  scarcity_support?: string;
}

export interface LockedBoard {
  position: string;
  baseline_file: string;
  locked_at: string | null;
  top_10: string[];
  first_out: string | null;
  challengers: string[];
}

export interface BoardResult {
  position: string;
  status: "EVIDENCE_SUPPORTED" | "PARTIAL" | "EVIDENCE_GAP" | "EVIDENCE_CONFLICT";
  historical_order: string[];
  historical_order_is_current: false;
  proposed_order: string[] | null;
  supported_moves: { better: string; worse: string }[];
  unverified: { better: string; worse: string; errors: string[] }[];
  gaps: string[];
}

const EA_HOST = /(^|\.)ea\.com$|maddenratings|madden-?ratings/i;

/** Established-season blend. Shares are declared on the comparison. They are not a league coefficient and not an overall formula. */
export function windowErrors(window: EvidenceWindow | undefined): string[] {
  if (!window?.role) return ["EVIDENCE_WINDOW_REQUIRED"];
  if (window.role === "prior_context") return ["PRIOR_CONTEXT_CANNOT_REORDER"];
  if (window.role === "current_primary") {
    return window.season === 2026 ? [] : ["PRIOR_CONTEXT_CANNOT_REORDER"];
  }
  if (window.role !== "blended_established") return ["EVIDENCE_WINDOW_REQUIRED"];
  const errors: string[] = [];
  const current = window.current;
  const prior = window.prior;
  if (!current || !prior) errors.push("BLEND_REQUIRES_CURRENT_AND_PRIOR");
  else {
    if (current.season !== 2026 || current.through_week !== 8) errors.push("BLEND_WINDOW_MUST_BE_2026_THROUGH_WEEK_8");
    if (prior.season !== 2025 || prior.completed !== true) errors.push("BLEND_PRIOR_MUST_BE_COMPLETED_2025");
    const sharesDeclared = Number.isFinite(current.share) && Number.isFinite(prior.share)
      && current.share > 0 && prior.share > 0 && Math.abs(current.share + prior.share - 1) < 1e-9;
    if (!sharesDeclared) errors.push("SEASON_SHARES_REQUIRED");
    else if (current.share <= prior.share) errors.push("CURRENT_SEASON_NOT_PRIMARY");
  }
  if (!window.rationale || window.rationale.trim().length < 20) errors.push("BLEND_RATIONALE_REQUIRED");
  return errors;
}

export function comparisonErrors(row: SourcedComparison): string[] {
  const errors: string[] = [];
  if (!row.better?.trim() || !row.worse?.trim() || row.better === row.worse) errors.push("PLAYERS_REQUIRED");
  if (!row.claim || row.claim.trim().length < 20) errors.push("CLAIM_TOO_THIN");
  errors.push(...windowErrors(row.evidence_window));
  if (!row.sample?.role?.trim()) errors.push("ROLE_REQUIRED");
  if (row.sample?.adequate !== true) errors.push("SAMPLE_NOT_ADEQUATE");
  if (!Number.isInteger(row.sample?.snaps_or_plays) || (row.sample?.snaps_or_plays ?? 0) < 1) errors.push("SAMPLE_COUNT_REQUIRED");
  if (row.uncertainty === "LOW") errors.push("LOW_CONFIDENCE_CANNOT_MOVE_A_RANK");
  if (row.pff_used_as_rank) errors.push("PFF_GRADE_IS_NOT_A_RANK");
  if (row.ea_used_as_rating) errors.push("EA_RATING_IS_NOT_OURS");
  if (row.trait_tier === 99 && !row.scarcity_support?.trim()) errors.push("NINETY_NINE_NEEDS_GENERATIONAL_SUPPORT");
  if (!row.sources?.length) errors.push("SOURCE_REQUIRED");
  for (const source of row.sources ?? []) {
    if (!source.publisher?.trim()) errors.push("PUBLISHER_REQUIRED");
    if (!source.retrieved_at?.trim()) errors.push("RETRIEVED_AT_REQUIRED");
    try {
      const host = new URL(source.url).hostname;
      if (EA_HOST.test(host) || EA_HOST.test(source.url)) errors.push("EA_SOURCE_IS_NOT_EVIDENCE");
    } catch {
      errors.push("SOURCE_URL_INVALID");
    }
  }
  return [...new Set(errors)];
}

interface OrderReading {
  order: string[] | null;
  unresolved: [string, string][];
  cycle: boolean;
}

/** Strict order from reachability. Adjacent edges, a single chain, and redundant forward edges are the same relation. An unresolved pair is not broken by who was ready first. */
export function strictOrder(nodes: string[], edges: { better: string; worse: string }[]): OrderReading {
  const index = new Map(nodes.map((name, i) => [name, i]));
  const n = nodes.length;
  const reach = Array.from({ length: n }, () => Array(n).fill(false));
  for (const edge of edges) {
    const from = index.get(edge.better);
    const to = index.get(edge.worse);
    if (from === undefined || to === undefined || from === to) continue;
    reach[from][to] = true;
  }
  for (let mid = 0; mid < n; mid++) {
    for (let from = 0; from < n; from++) {
      if (!reach[from][mid]) continue;
      for (let to = 0; to < n; to++) if (reach[mid][to]) reach[from][to] = true;
    }
  }
  let cycle = false;
  const unresolved: [string, string][] = [];
  for (let i = 0; i < n; i++) {
    if (reach[i][i]) cycle = true;
    for (let j = i + 1; j < n; j++) {
      if (reach[i][j] && reach[j][i]) cycle = true;
      else if (!reach[i][j] && !reach[j][i]) unresolved.push([nodes[i], nodes[j]]);
    }
  }
  if (cycle || unresolved.length) return { order: null, unresolved, cycle };
  const order = nodes
    .map((name, i) => ({ name, beaten: reach[i].filter(Boolean).length }))
    .sort((a, b) => b.beaten - a.beaten)
    .map(row => row.name);
  return { order, unresolved: [], cycle: false };
}

export function rerankBoard(board: LockedBoard, comparisons: SourcedComparison[]): BoardResult {
  const mine = comparisons.filter(row => row.position === board.position);
  const supported: { better: string; worse: string }[] = [];
  const unverified: BoardResult["unverified"] = [];
  for (const row of mine) {
    const errors = comparisonErrors(row);
    if (errors.length) unverified.push({ better: row.better, worse: row.worse, errors });
    else supported.push({ better: row.better, worse: row.worse });
  }
  const base: BoardResult = {
    position: board.position,
    status: "EVIDENCE_GAP",
    historical_order: board.top_10,
    historical_order_is_current: false,
    proposed_order: null,
    supported_moves: supported,
    unverified,
    gaps: []
  };
  if (!supported.length) {
    base.gaps.push("No sourced current or blended comparison. The locked order is history and is not re-affirmed.");
    return base;
  }
  const names = [...new Set(supported.flatMap(edge => [edge.better, edge.worse]))];
  const reading = strictOrder(names, supported);
  if (reading.cycle) {
    return { ...base, status: "EVIDENCE_CONFLICT", gaps: ["Supported comparisons cycle. Locked rank was not used to break it."] };
  }
  if (reading.unresolved.length) {
    const sample = reading.unresolved.slice(0, 6).map(pair => pair.join(" / ")).join("; ");
    return { ...base, status: "EVIDENCE_CONFLICT", gaps: [`Unresolved ties (${reading.unresolved.length}): ${sample}. Locked rank was not used.`] };
  }
  const ordered = reading.order ?? [];
  if (board.first_out && !ordered.includes(board.first_out)) {
    return { ...base, status: "PARTIAL", gaps: ["The sourced players are strictly ordered, but the first-out is not among them, so membership is incomplete. Remaining locked slots are not filled in."] };
  }
  if (ordered.length >= 11 && (!board.first_out || ordered.includes(board.first_out))) {
    return { ...base, status: "EVIDENCE_SUPPORTED", proposed_order: ordered.slice(0, 10), gaps: [] };
  }
  return {
    ...base,
    status: "PARTIAL",
    gaps: [`${supported.length} sourced comparison(s) on ${names.length} player(s). Not a full top 10 plus first-out, so no new order is published. Remaining locked slots are not filled in.`]
  };
}

export function loadLockedBoards(root = process.cwd()): LockedBoard[] {
  const sequence = JSON.parse(fs.readFileSync(path.join(root, "config/position-sequence.json"), "utf8")).sequence as string[];
  const locks = JSON.parse(fs.readFileSync(path.join(root, "state/locks.json"), "utf8")).positions as Record<string, { baseline_file?: string; locked_at?: string }>;
  return sequence.map(position => {
    const entry = locks[position];
    if (!entry?.baseline_file) {
      return { position, baseline_file: "", locked_at: entry?.locked_at ?? null, top_10: [], first_out: null, challengers: [] };
    }
    const baseline = JSON.parse(fs.readFileSync(path.join(root, entry.baseline_file), "utf8")) as {
      top_10?: { player?: string }[];
      first_out?: { player?: string } | null;
      external_controls?: { player?: string }[];
    };
    const top = (baseline.top_10 ?? []).map(row => row.player ?? "").filter(Boolean);
    const first = baseline.first_out?.player ?? null;
    const external = (baseline.external_controls ?? []).map(row => row.player ?? "").filter(Boolean);
    const challengers = [...new Set([...(first ? [first] : []), ...external])];
    return { position, baseline_file: entry.baseline_file, locked_at: entry.locked_at ?? null, top_10: top, first_out: first, challengers };
  });
}

export function buildLeagueReaudit(root = process.cwd(), comparisons: SourcedComparison[] = []) {
  const rubric = loadRubric(root);
  const boards = loadLockedBoards(root);
  const positions = boards.map(board => {
    const result = rerankBoard(board, comparisons);
    return {
      ...result,
      baseline_file: board.baseline_file,
      locked_at: board.locked_at,
      first_out: board.first_out,
      challengers: board.challengers
    };
  });
  return {
    order_id: REAUDIT_ORDER_ID,
    ordered_at: rubric.ordered_at,
    explicit_current_data_reaudit: true,
    replaces_locked_files: false,
    blend_window: "A comparison may declare 2026 through Week 8 as primary and completed 2025 as context, with both shares and a sourced rationale. 2025 alone cannot reorder. Shares are not a fitted league coefficient. This file has no such comparison.",
    requested_slot_note: "The request said 210 slots. Every locked board in this tree has 10 players, which is 220 slots, plus first-outs and external challengers.",
    positions_requested: positions.length,
    top10_slots: positions.reduce((sum, board) => sum + board.historical_order.length, 0),
    first_outs: positions.filter(board => board.first_out).length,
    challengers: positions.reduce((sum, board) => sum + board.challengers.length, 0),
    evidence_supported_orders: positions.filter(board => board.status === "EVIDENCE_SUPPORTED").length,
    evidence_gaps: positions.filter(board => board.status === "EVIDENCE_GAP").length,
    positions
  };
}

function main(): void {
  const report = buildLeagueReaudit();
  const lines = [
    `t115u current-data re-audit: ${report.positions_requested} positions, ${report.top10_slots} historical top-10 slots, ${report.first_outs} first-outs, ${report.challengers} challengers.`,
    report.requested_slot_note,
    `Evidence-supported new orders: ${report.evidence_supported_orders}. Evidence gaps: ${report.evidence_gaps}. Locked files were not replaced.`,
    ...report.positions.map(board => `${board.position} ${board.status} historical=${board.historical_order.length} proposed=${board.proposed_order ? board.proposed_order.length : "none"}`)
  ];
  process.stdout.write(lines.join("\n") + "\n");
  if (process.argv.includes("--write")) {
    const dir = path.join(process.cwd(), "data/reaudit-proposals");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "t115u-coverage.json"), JSON.stringify(report, null, 1) + "\n");
  }
}

if (process.argv[1] && /top10-rerank\.(ts|js)$/.test(process.argv[1])) main();
