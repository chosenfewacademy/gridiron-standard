import fs from "node:fs";
import path from "node:path";
import { comparisonErrors, type SourcedComparison } from "./top10-rerank.js";
import { applicableAttributes, emptyProfile, summarizeProfile } from "./gs-attribute-card.js";

/**
 * Adjacent head-to-head audit for order t115u.
 * Analyst proposed orders are read. They are not baseline replacements.
 * A LOW edge is recorded and does not make the board engine-supportable.
 */

export interface H2HEdgeResult {
  higher: string;
  lower: string;
  kind: "adjacent" | "cut_line";
  disposition: "SUPPORTS" | "LOW_RECORDED" | "MISSING" | "CONTRADICTS" | "INVALID";
  uncertainty: string | null;
  errors: string[];
}

export interface BoardH2H {
  position: string;
  proposal_status: string | null;
  proposed_order: string[];
  first_out: string | null;
  required: number;
  supports: number;
  low_recorded: number;
  missing: number;
  contradicts: number;
  invalid: number;
  engine_supportable: false | true;
  analyst_proposal_only: true;
  accepted_as_validated_board: false;
  edges: H2HEdgeResult[];
}

interface ReviewBoard {
  status?: string;
  proposed_top10?: { player?: string }[];
  first_out?: { player?: string } | string | null;
}

export function adjacentCut(order: string[], firstOut: string | null): { higher: string; lower: string; kind: "adjacent" | "cut_line" }[] {
  const pairs: { higher: string; lower: string; kind: "adjacent" | "cut_line" }[] = [];
  for (let i = 0; i < order.length - 1; i++) pairs.push({ higher: order[i], lower: order[i + 1], kind: "adjacent" });
  if (order.length && firstOut) pairs.push({ higher: order[order.length - 1], lower: firstOut, kind: "cut_line" });
  return pairs;
}

export function auditBoard(position: string, order: string[], firstOut: string | null, comparisons: SourcedComparison[], proposalStatus: string | null = null): BoardH2H {
  const mine = comparisons.filter(row => row.position === position);
  const edges = adjacentCut(order, firstOut).map(pair => {
    const forward = mine.find(row => row.better === pair.higher && row.worse === pair.lower);
    const reverse = mine.find(row => row.better === pair.lower && row.worse === pair.higher);
    if (!forward && reverse) {
      return { ...pair, disposition: "CONTRADICTS" as const, uncertainty: reverse.uncertainty, errors: ["PACKET_ORDERS_THE_OTHER_WAY"] };
    }
    if (!forward) return { ...pair, disposition: "MISSING" as const, uncertainty: null, errors: ["ADJACENT_COMPARISON_MISSING"] };
    const errors = comparisonErrors(forward);
    if (forward.uncertainty === "LOW") return { ...pair, disposition: "LOW_RECORDED" as const, uncertainty: forward.uncertainty, errors };
    if (errors.length) return { ...pair, disposition: "INVALID" as const, uncertainty: forward.uncertainty, errors };
    return { ...pair, disposition: "SUPPORTS" as const, uncertainty: forward.uncertainty, errors: [] };
  });
  const count = (disposition: H2HEdgeResult["disposition"]) => edges.filter(edge => edge.disposition === disposition).length;
  const supports = count("SUPPORTS");
  return {
    position,
    proposal_status: proposalStatus,
    proposed_order: order,
    first_out: firstOut,
    required: edges.length,
    supports,
    low_recorded: count("LOW_RECORDED"),
    missing: count("MISSING"),
    contradicts: count("CONTRADICTS"),
    invalid: count("INVALID"),
    engine_supportable: edges.length === 10 && supports === 10,
    analyst_proposal_only: true,
    accepted_as_validated_board: false,
    edges
  };
}

export function auditProposal(review: { boards: Record<string, ReviewBoard> }, comparisons: SourcedComparison[], sequence: string[]) {
  const boards = sequence.map(position => {
    const board = review.boards[position];
    const order = (board?.proposed_top10 ?? []).map(row => row.player ?? "").filter(Boolean);
    const first = typeof board?.first_out === "string" ? board.first_out : board?.first_out?.player ?? null;
    return auditBoard(position, order, first, comparisons, board?.status ?? null);
  });
  return {
    order_id: "t115u",
    analyst_orders_are: "EDITORIAL_PROPOSAL_NOT_A_VALIDATED_BOARD",
    replaces_locked_files: false,
    phi_dal_cards_untouched: true,
    boards: boards.length,
    required_edges: boards.reduce((sum, board) => sum + board.required, 0),
    supporting_edges: boards.reduce((sum, board) => sum + board.supports, 0),
    low_edges: boards.reduce((sum, board) => sum + board.low_recorded, 0),
    missing_edges: boards.reduce((sum, board) => sum + board.missing, 0),
    contradicting_edges: boards.reduce((sum, board) => sum + board.contradicts, 0),
    invalid_edges: boards.reduce((sum, board) => sum + board.invalid, 0),
    engine_supportable_boards: boards.filter(board => board.engine_supportable).map(board => board.position),
    positions: boards
  };
}

export interface QueuePlayer {
  player: string;
  slot: "top10" | "first_out";
  rank: number | null;
  profile_status: "QUEUED_UNRATED";
  rated: 0;
  unrated: number;
  overall: null;
  accepted_as_full_card: false;
  editorial_display_ovr: number | null;
  editorial_display_accepted: false;
}

export const EDITORIAL_CORRECTIONS = [
  {
    player: "Jaylen Warren",
    position: "RB",
    source_editorial_display_ovr: 92,
    corrected_editorial_display_ovr: 91,
    accepted_as_full_card: false,
    note: "User correction. 91 replaces the editorial 92. It is still not an approved full-card rebuild."
  },
  {
    player: "Kenneth Walker III",
    position: "RB",
    source_editorial_display_ovr: 90,
    corrected_editorial_display_ovr: 90,
    accepted_as_full_card: false,
    note: "Editorial display stays 90. It is not an approved full-card rebuild."
  }
] as const;

export function cardQueue(review: { boards: Record<string, ReviewBoard> }, sequence: string[], root = process.cwd()) {
  const correction = new Map(EDITORIAL_CORRECTIONS.map(row => [`${row.position}:${row.player}`, row]));
  const positions = sequence.map(position => {
    const board = review.boards[position];
    const applicable = applicableAttributes(position, root);
    const players: QueuePlayer[] = (board?.proposed_top10 ?? []).map((row, index) => ({
      player: row.player ?? "",
      slot: "top10" as const,
      rank: index + 1,
      profile_status: "QUEUED_UNRATED" as const,
      rated: 0 as const,
      unrated: applicable.length,
      overall: null,
      accepted_as_full_card: false as const,
      editorial_display_ovr: correction.get(`${position}:${row.player}`)?.corrected_editorial_display_ovr ?? null,
      editorial_display_accepted: false as const
    })).filter(row => row.player);
    const first = typeof board?.first_out === "string" ? board.first_out : board?.first_out?.player ?? null;
    if (first) {
      players.push({
        player: first,
        slot: "first_out",
        rank: null,
        profile_status: "QUEUED_UNRATED",
        rated: 0,
        unrated: applicable.length,
        overall: null,
        accepted_as_full_card: false,
        editorial_display_ovr: correction.get(`${position}:${first}`)?.corrected_editorial_display_ovr ?? null,
        editorial_display_accepted: false
      });
    }
    const shell = emptyProfile(position, root);
    return {
      position,
      applicable_attributes: applicable,
      profile_summary_of_empty_shell: summarizeProfile(shell, applicable).profile_summary,
      players
    };
  });
  const queued = positions.reduce((sum, position) => sum + position.players.length, 0);
  return {
    order_id: "t115u",
    complete_profiles: 0,
    queued_players: queued,
    overalls_derived: 0,
    editorial_ovrs_accepted_as_cards: 0,
    corrections: EDITORIAL_CORRECTIONS,
    note: "Attached rescores assign display overalls by rank. Those numbers are not profile outputs. Every applicable attribute stays unrated until a sourced cell exists. Historical attribute blobs in the research files are not copied in as a 2026 rebuild.",
    positions
  };
}

export function readIncomingAudit(root = process.cwd()) {
  const dir = path.join(root, "data/reaudit-proposals/incoming");
  const review = JSON.parse(fs.readFileSync(path.join(dir, "top10-rerank-final-review.json"), "utf8"));
  const packet = JSON.parse(fs.readFileSync(path.join(dir, "top10-blended-comparison-packet.json"), "utf8"));
  const sequence = JSON.parse(fs.readFileSync(path.join(root, "config/position-sequence.json"), "utf8")).sequence as string[];
  return {
    h2h: auditProposal(review, packet.comparisons as SourcedComparison[], sequence),
    queue: cardQueue(review, sequence, root)
  };
}

function main(): void {
  const { h2h, queue } = readIncomingAudit();
  const lines = [
    `H2H boards ${h2h.boards}. Required edges ${h2h.required_edges}. Supporting ${h2h.supporting_edges}. LOW recorded ${h2h.low_edges}. Missing ${h2h.missing_edges}. Contradictions ${h2h.contradicting_edges}. Invalid ${h2h.invalid_edges}.`,
    `Engine-supportable boards: ${h2h.engine_supportable_boards.join(", ") || "none"}. Analyst orders are not validated boards.`,
    `Full profiles complete: ${queue.complete_profiles}. Queued players: ${queue.queued_players}. Derived overalls: ${queue.overalls_derived}.`
  ];
  process.stdout.write(lines.join("\n") + "\n");
  if (process.argv.includes("--write")) {
    const dir = path.join(process.cwd(), "data/reaudit-proposals");
    fs.writeFileSync(path.join(dir, "t115u-h2h-audit.json"), JSON.stringify(h2h, null, 1) + "\n");
    fs.writeFileSync(path.join(dir, "t115u-card-queue.json"), JSON.stringify(queue, null, 1) + "\n");
  }
}

if (process.argv[1] && /h2h-audit\.(ts|js)$/.test(process.argv[1])) main();
