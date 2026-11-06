import fs from "node:fs";
import path from "node:path";

/**
 * Reads the t115u proposal pack without rewriting traits or inventing overalls.
 * Cells keep their rating, claim, band, confidence, source_ids, and URL strings.
 * The source registry keeps id, url, and kind. Nothing here is a lock.
 */

export interface PackCell {
  attribute: string;
  rating: number | null;
  confidence: string | null;
  band: string | null;
  claim: string | null;
  source_ids: string[];
  sources: string[];
}

export interface PackPlayer {
  name: string;
  position: string;
  meta: string;
  style: string | null;
  composition: string | null;
  profile_status: string;
  overall_median_display: number | null;
  overall_median_raw: number | null;
  overall_median_claimed: number | null;
  overall_is_uncalibrated_profile_median: boolean;
  overall_is_not_ranked_ovr: boolean;
  editorial_display_ovr: number | null;
  structurally_complete: boolean;
  cells: PackCell[];
}

export interface PackH2H {
  label: string;
  higher_name: string;
  lower_name: string;
  verdict: string | null;
  confidence: string | null;
  uncertainty: string | null;
  source_ids: string[];
}

export interface PackBoard {
  proposed_order: string[] | null;
  first_out: string | null;
  engine_status: string;
  board_status: { status?: string; board_solid?: boolean; medium_plus_links?: number | null; reason?: string; not_a_lock?: boolean };
  editorial_vs_proposed_rank_conflict: {
    applicable?: boolean;
    is_nonincreasing_on_known?: boolean;
    violations_if_forced_as_rank_ovr?: unknown[];
    policy?: string;
  };
  h2hs: PackH2H[];
  players: PackPlayer[];
  completion: { complete: number; partial: number; queued: number; total: number; structurally_complete: number };
  blocking: unknown[];
  nonblocking: { code?: string; count?: number }[];
  style_complete_flag_count: number;
  style_partial_flag_count: number;
}

export interface ProposalPack {
  document: string;
  status: string;
  new_acceptance: boolean;
  approval: null;
  global_pass_boolean: boolean;
  global_pass_false_reasons: string[];
  structural_blocking_clean: boolean;
  totals: Record<string, unknown>;
  warren_correction: { player: string; corrected_editorial_display_ovr: number; source_editorial_display_ovr: number; walker_stays: number };
  source_registry: Record<string, { id: string; url: string; kind: string }>;
  boards: Record<string, PackBoard>;
}

export const PROPOSAL_PACK_PATH = "data/reaudit-proposals/t115u-proposal-pack.json";

export function loadProposalPack(root = process.cwd()): ProposalPack {
  return JSON.parse(fs.readFileSync(path.join(root, PROPOSAL_PACK_PATH), "utf8")) as ProposalPack;
}

export interface PackAudit {
  players: number;
  complete: number;
  partial: number;
  queued: number;
  cells: number;
  populated_cells: number;
  unknown_cells: number;
  sources: number;
  boards: number;
  h2h_records: number;
  unresolved_source_ids: number;
  cell_urls_missing_from_registry: number;
  id_url_mismatches: number;
  median_mismatches: number;
  low_h2h: number;
  low_treated_as_board_deciding: false;
  schema: {
    cell_value_field: "rating";
    card_module_value_field: "value";
    cell_sources: "string_urls";
    registry_fields: ["id", "url", "kind"];
    registry_omits_publisher_and_retrieved_at: true;
    formulas_applied: false;
    garbled: false;
  };
}

function halfUp(raw: number): number {
  return Math.floor(raw + 0.5);
}

export function auditProposalPack(pack: ProposalPack): PackAudit {
  const registry = pack.source_registry;
  const urls = new Set(Object.values(registry).map(row => row.url));
  let players = 0;
  let complete = 0;
  let partial = 0;
  let queued = 0;
  let cells = 0;
  let populated = 0;
  let unknown = 0;
  let unresolved = 0;
  let missingUrl = 0;
  let mismatches = 0;
  let medianMismatches = 0;
  let h2h = 0;
  let low = 0;
  for (const board of Object.values(pack.boards)) {
    h2h += board.h2hs.length;
    for (const link of board.h2hs) if (link.confidence === "LOW") low += 1;
    for (const player of board.players) {
      players += 1;
      if (player.structurally_complete) complete += 1;
      else if (player.profile_status === "PARTIAL") partial += 1;
      else queued += 1;
      const ratings: number[] = [];
      for (const cell of player.cells) {
        cells += 1;
        if (cell.rating === null || cell.confidence === null) unknown += 1;
        else {
          populated += 1;
          ratings.push(cell.rating);
        }
        for (const id of cell.source_ids ?? []) if (!registry[id]) unresolved += 1;
        for (const url of cell.sources ?? []) if (!urls.has(url)) missingUrl += 1;
        for (const id of cell.source_ids ?? []) {
          const row = registry[id];
          if (row && cell.sources?.length && !cell.sources.includes(row.url)) mismatches += 1;
        }
      }
      if (player.structurally_complete && player.overall_median_raw !== null) {
        const sorted = [...ratings].sort((a, b) => a - b);
        const mid = sorted.length % 2 === 1
          ? sorted[(sorted.length - 1) / 2]
          : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
        if (Math.abs(mid - player.overall_median_raw) > 1e-6) medianMismatches += 1;
        if (player.overall_median_display !== halfUp(player.overall_median_raw)) medianMismatches += 1;
      }
    }
  }
  return {
    players,
    complete,
    partial,
    queued,
    cells,
    populated_cells: populated,
    unknown_cells: unknown,
    sources: Object.keys(registry).length,
    boards: Object.keys(pack.boards).length,
    h2h_records: h2h,
    unresolved_source_ids: unresolved,
    cell_urls_missing_from_registry: missingUrl,
    id_url_mismatches: mismatches,
    median_mismatches: medianMismatches,
    low_h2h: low,
    low_treated_as_board_deciding: false,
    schema: {
      cell_value_field: "rating",
      card_module_value_field: "value",
      cell_sources: "string_urls",
      registry_fields: ["id", "url", "kind"],
      registry_omits_publisher_and_retrieved_at: true,
      formulas_applied: false,
      garbled: false
    }
  };
}

export interface PageManifest {
  status: string;
  accepted_as_full_card: false;
  accepted_as_lock: false;
  formulas_applied: false;
  totals: Record<string, unknown>;
  gaps: {
    incomplete_players: number;
    unknown_cells: number;
    order_hold: string[];
    style_flag_positions: string[];
    global_pass: false;
    reasons: string[];
    low_h2h_not_board_deciding: number;
  };
  schema: PackAudit["schema"];
  sources: Record<string, string>;
  boards: {
    pos: string;
    order: string[] | null;
    fo: string | null;
    engine_status: string;
    board_status: string | null;
    solid: boolean;
    med_plus: number | null;
    completion: PackBoard["completion"];
    blocking: number;
    nonblocking: string[];
    style_complete_flags: number;
    style_partial_flags: number;
    editorial_conflict: PackBoard["editorial_vs_proposed_rank_conflict"];
    h2h: { label: string; higher: string; lower: string; verdict: string | null; confidence: string | null; source_ids: string[] }[];
    players: {
      name: string;
      meta: string;
      style: string | null;
      composition: string | null;
      status: string;
      complete: boolean;
      median: number | null;
      median_raw: number | null;
      editorial_display_ovr: number | null;
      cells: [string, number | null, string | null, string | null, string | null, string[]][];
    }[];
  }[];
}

export function pageManifest(pack: ProposalPack, audit: PackAudit): PageManifest {
  const totals = pack.totals;
  return {
    status: pack.status,
    accepted_as_full_card: false,
    accepted_as_lock: false,
    formulas_applied: false,
    totals,
    gaps: {
      incomplete_players: audit.partial,
      unknown_cells: audit.unknown_cells,
      order_hold: (totals.intentional_order_hold_positions as string[]) ?? [],
      style_flag_positions: (totals.style_flag_positions as string[]) ?? [],
      global_pass: false,
      reasons: pack.global_pass_false_reasons,
      low_h2h_not_board_deciding: audit.low_h2h
    },
    schema: audit.schema,
    sources: Object.fromEntries(Object.values(pack.source_registry).map(row => [row.id, row.url])),
    boards: Object.entries(pack.boards).map(([pos, board]) => ({
      pos,
      order: board.proposed_order,
      fo: board.first_out,
      engine_status: board.engine_status,
      board_status: board.board_status?.status ?? null,
      solid: board.board_status?.board_solid === true,
      med_plus: board.board_status?.medium_plus_links ?? null,
      completion: board.completion,
      blocking: board.blocking.length,
      nonblocking: board.nonblocking.map(row => row.code ?? "").filter(Boolean),
      style_complete_flags: board.style_complete_flag_count,
      style_partial_flags: board.style_partial_flag_count,
      editorial_conflict: board.editorial_vs_proposed_rank_conflict,
      h2h: board.h2hs.map(link => ({
        label: link.label,
        higher: link.higher_name,
        lower: link.lower_name,
        verdict: link.verdict,
        confidence: link.confidence,
        source_ids: link.source_ids ?? []
      })),
      players: board.players.map(player => ({
        name: player.name,
        meta: player.meta,
        style: player.style,
        composition: player.composition,
        status: player.profile_status,
        complete: player.structurally_complete,
        median: player.overall_median_display,
        median_raw: player.overall_median_raw,
        editorial_display_ovr: player.editorial_display_ovr,
        cells: player.cells.map(cell => [cell.attribute, cell.rating, cell.confidence, cell.band, cell.claim, cell.source_ids ?? []])
      }))
    }))
  };
}

function main(): void {
  const pack = loadProposalPack();
  const audit = auditProposalPack(pack);
  process.stdout.write(JSON.stringify(audit, null, 1) + "\n");
  if (process.argv.includes("--write-manifest")) {
    const manifest = pageManifest(pack, audit);
    const file = path.join(process.cwd(), "data/reaudit-proposals/t115u-page-manifest.json");
    fs.writeFileSync(file, JSON.stringify(manifest));
    const queue = {
      status: "SUPERSEDED_BY_PROPOSAL_PACK",
      superseded_by: PROPOSAL_PACK_PATH,
      accepted_as_full_card: false,
      accepted_as_lock: false,
      complete_uncalibrated_profiles: audit.complete,
      partial: audit.partial,
      queued: audit.queued,
      unknown_cells: audit.unknown_cells,
      note: "The all-unrated queue is closed. Profile medians are uncalibrated. Editorial display overalls are a separate field. Nothing here is an approved card or a baseline lock."
    };
    fs.writeFileSync(path.join(process.cwd(), "data/reaudit-proposals/t115u-card-queue.json"), JSON.stringify(queue, null, 1) + "\n");
    fs.mkdirSync("/workspace", { recursive: true });
    fs.writeFileSync("/workspace/t115u-page-manifest.json", JSON.stringify(manifest));
    fs.copyFileSync(path.join(process.cwd(), PROPOSAL_PACK_PATH), "/workspace/t115u-proposal-pack.json");
    fs.copyFileSync(path.join(process.cwd(), "data/reaudit-proposals/t115u-validation.md"), "/workspace/t115u-validation.md");
  }
}

if (process.argv[1] && /proposal-pack\.(ts|js)$/.test(process.argv[1])) main();
