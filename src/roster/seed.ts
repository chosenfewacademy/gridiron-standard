import fs from "node:fs";
import path from "node:path";
import {
  basename,
  draftsFromBaseline,
  finiteNumber,
  selectBaseline,
  type CardDraft,
  type LockEntry,
  type SeedWarning
} from "./baselines.js";
import { clearDerived, DEFAULT_SEASON, type DatabaseSync } from "./db.js";
import { mapRosterStatus } from "./membership.js";
import { nameSlug, normalizeName } from "./names.js";
import { canonicalTeam, NFL_TEAMS } from "./teams.js";

export interface SeedOptions {
  root?: string;
  season?: number;
  registryPath?: string;
  locksPath?: string;
  baselinesDir?: string;
  auditsDir?: string;
  brandingPath?: string;
  positionSequencePath?: string;
}

export interface SeedBaselineSummary {
  position: string;
  file: string;
  reason: string;
  cards: number;
}

export interface SeedResult {
  season: number;
  seeded_at: string;
  teams: number;
  players: number;
  memberships: number;
  rating_cards: number;
  attribute_rows: number;
  positions: number;
  warnings: SeedWarning[];
  baselines: SeedBaselineSummary[];
}

interface RegistryPlayer {
  player_id: string;
  full_name: string;
  aliases: string[];
  team: string | null;
  position: string | null;
  historical_positions: string[];
  current_audit_id: string | null;
  external_ids: Record<string, string | null>;
  jersey_number: number | null;
  roster_status: string | null;
  birth_date: string | null;
  height: number | null;
  weight: number | null;
  college: string | null;
  years_exp: number | null;
  source_position: string | null;
  depth_chart_position: string | null;
  requires_role_resolution: number | null;
  role_resolution_reason: string | null;
}

function readJson(file: string): unknown {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function intOrNull(value: unknown): number | null {
  return finiteNumber(value);
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function numericAttrs(value: unknown): Record<string, number> {
  const record = asRecord(value);
  if (!record) return {};
  const out: Record<string, number> = {};
  for (const [key, raw] of Object.entries(record)) {
    if (typeof raw === "number" && Number.isFinite(raw)) out[key] = raw;
  }
  return out;
}

function maddenRef(audit: Record<string, unknown> | null): Record<string, unknown> | null {
  if (!audit) return null;
  const raw = audit.madden_reference;
  if (Array.isArray(raw)) return asRecord(raw[0]);
  return asRecord(raw);
}

function loadRegistry(file: string, warnings: SeedWarning[]): RegistryPlayer[] {
  const parsed = asRecord(readJson(file));
  const rows = parsed && Array.isArray(parsed.players) ? parsed.players : null;
  if (!rows) throw new Error(`Player registry has no players array: ${file}`);
  const seen = new Set<string>();
  const players: RegistryPlayer[] = [];
  for (const raw of rows) {
    const row = asRecord(raw);
    const playerId = text(row?.player_id);
    const fullName = text(row?.full_name);
    if (!row || !playerId || !fullName) {
      warnings.push({ code: "REGISTRY_ROW_SKIPPED", detail: "row missing player_id or full_name" });
      continue;
    }
    if (seen.has(playerId)) {
      warnings.push({ code: "DUPLICATE_PLAYER_ID", detail: playerId });
      continue;
    }
    seen.add(playerId);
    const ids = asRecord(row.external_ids) ?? {};
    players.push({
      player_id: playerId,
      full_name: fullName,
      aliases: stringList(row.aliases),
      team: text(row.team),
      position: text(row.position),
      historical_positions: stringList(row.historical_positions),
      current_audit_id: text(row.current_audit_id),
      external_ids: {
        gsis: text(ids.gsis),
        espn: text(ids.espn),
        pff: text(ids.pff),
        pfr: text(ids.pfr)
      },
      jersey_number: intOrNull(row.jersey_number),
      roster_status: text(row.roster_status),
      birth_date: text(row.birth_date),
      height: intOrNull(row.height),
      weight: intOrNull(row.weight),
      college: text(row.college),
      years_exp: intOrNull(row.years_exp),
      source_position: text(row.source_position),
      depth_chart_position: text(row.depth_chart_position),
      requires_role_resolution: typeof row.requires_role_resolution === "boolean"
        ? (row.requires_role_resolution ? 1 : 0)
        : null,
      role_resolution_reason: text(row.role_resolution_reason)
    });
  }
  return players;
}

function linkPlayer(
  byId: Map<string, RegistryPlayer>,
  byName: Map<string, RegistryPlayer[]>,
  draft: CardDraft,
  position: string,
  warnings: SeedWarning[]
): RegistryPlayer | null {
  const auditId = text(draft.audit?.player_id);
  if (auditId && byId.has(auditId)) return byId.get(auditId) ?? null;
  const slug = nameSlug(draft.playerName);
  if (byId.has(slug)) return byId.get(slug) ?? null;
  const hits = byName.get(normalizeName(draft.playerName)) ?? [];
  if (hits.length === 1) return hits[0];
  const samePosition = hits.filter(player => player.position === position);
  if (samePosition.length === 1) return samePosition[0];
  if (hits.length > 1) {
    warnings.push({
      code: "PLAYER_AMBIGUOUS",
      detail: `${position} ${draft.playerName} matches ${hits.map(player => player.player_id).join(", ")}`
    });
  } else {
    warnings.push({ code: "PLAYER_UNLINKED", detail: `${position} ${draft.playerName}` });
  }
  return null;
}

function traitTier(
  audit: Record<string, unknown> | null,
  playerName: string,
  attribute: string,
  scarcity: Map<string, string>
): string | null {
  const evidence = asRecord(audit?.high_trait_evidence);
  const row = evidence ? asRecord(evidence[attribute]) : null;
  if (row && typeof row.tier === "string") return row.tier;
  return scarcity.get(`${normalizeName(playerName)}|${attribute}`) ?? null;
}

function scarcityTiers(baseline: Record<string, unknown>): Map<string, string> {
  const scarcity = asRecord(baseline.scarcity);
  const traits = scarcity && Array.isArray(scarcity.traits_90_plus) ? scarcity.traits_90_plus : [];
  const index = new Map<string, string>();
  for (const raw of traits) {
    const row = asRecord(raw);
    if (!row || typeof row.player !== "string" || typeof row.attr !== "string" || typeof row.tier !== "string") continue;
    index.set(`${normalizeName(row.player)}|${row.attr}`, row.tier);
  }
  return index;
}

function readSequence(file: string): string[] {
  if (!fs.existsSync(file)) return [];
  const parsed = asRecord(readJson(file));
  return Array.isArray(parsed?.sequence)
    ? parsed.sequence.filter((item): item is string => typeof item === "string")
    : [];
}

/**
 * Rebuild derived roster tables from the registry and locked baselines.
 * Reads sources only. Callers own the database file.
 */
export function seedRoster(db: DatabaseSync, options: SeedOptions = {}): SeedResult {
  const root = options.root ?? process.cwd();
  const season = options.season ?? DEFAULT_SEASON;
  const registryPath = options.registryPath ?? path.join(root, "data", "players", "registry.json");
  const locksPath = options.locksPath ?? path.join(root, "state", "locks.json");
  const baselinesDir = options.baselinesDir ?? path.join(root, "data", "baselines");
  const auditsDir = options.auditsDir ?? path.join(root, "audits", "league");
  const brandingPath = options.brandingPath ?? path.join(root, "config", "team-branding.json");
  const sequencePath = options.positionSequencePath ?? path.join(root, "config", "position-sequence.json");
  const warnings: SeedWarning[] = [];
  const seededAt = new Date().toISOString();

  const players = loadRegistry(registryPath, warnings);
  const byId = new Map(players.map(player => [player.player_id, player]));
  const byName = new Map<string, RegistryPlayer[]>();
  for (const player of players) {
    const key = normalizeName(player.full_name);
    const list = byName.get(key);
    if (list) list.push(player);
    else byName.set(key, [player]);
  }

  let locks: Record<string, LockEntry> = {};
  if (fs.existsSync(locksPath)) {
    const parsed = asRecord(readJson(locksPath));
    const positions = parsed ? asRecord(parsed.positions) : null;
    if (positions) locks = positions as Record<string, LockEntry>;
    else warnings.push({ code: "LOCKS_UNREADABLE", detail: locksPath });
  } else {
    warnings.push({ code: "LOCKS_MISSING", detail: locksPath });
  }

  const baselineFiles = fs.existsSync(baselinesDir)
    ? fs.readdirSync(baselinesDir).filter(name => name.endsWith(".json"))
    : [];
  if (!baselineFiles.length) warnings.push({ code: "NO_BASELINE_DIR", detail: baselinesDir });

  const sequence = readSequence(sequencePath);
  const positions: string[] = [...sequence];
  const extras = new Set<string>([...Object.keys(locks)]);
  for (const file of baselineFiles) {
    const parsedName = basename(file).match(/^([A-Z]{1,5})(?:\.reaudit-\d{8}[b-z]?)?\.json$/);
    if (parsedName) extras.add(parsedName[1]);
  }
  for (const position of [...extras].sort()) {
    if (!positions.includes(position)) positions.push(position);
  }

  let brandingTeams: Record<string, Record<string, unknown>> = {};
  if (fs.existsSync(brandingPath)) {
    const branding = asRecord(readJson(brandingPath));
    const teams = branding ? asRecord(branding.teams) : null;
    if (teams) brandingTeams = teams as Record<string, Record<string, unknown>>;
  }

  const unknownTeams = new Map<string, number>();
  const baselines: SeedBaselineSummary[] = [];
  let cardCount = 0;
  let attributeCount = 0;

  const insertTeam = db.prepare(`
    INSERT INTO teams(
      abbr, name, city, nickname, conference, division, primary_color, secondary_color, accent_color
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertPlayer = db.prepare(`
    INSERT INTO players(
      player_id, full_name, team_abbr, raw_team, position_bucket, source_position, depth_chart_position,
      roster_status, jersey_number, birth_date, height_in, weight_lb, college, years_exp,
      gsis_id, espn_id, pff_id, pfr_id, aliases_json, historical_positions_json,
      requires_role_resolution, role_resolution_reason, current_audit_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertMembership = db.prepare(`
    INSERT INTO roster_membership(player_id, team_abbr, season, status, raw_roster_status, source)
    VALUES (?, ?, ?, ?, ?, 'registry')
  `);
  const insertBaseline = db.prepare(`
    INSERT INTO position_baselines(
      position, baseline_file, version, lock_audit_id, locked_at, lock_status,
      architecture_version, methodology_version, selection_reason, newer_unselected, card_source,
      top10_json, first_out_player, first_out_ovr, last_in_player, last_in_ovr, prior_files_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertCard = db.prepare(`
    INSERT INTO rating_cards(
      card_id, player_id, player_name, position, ovr, audit_proposed_ovr, ovr_tier, confidence,
      style_profile, weaknesses_json, source_audit_id, source_task_id, source_baseline_file,
      card_origin, baseline_rank, pool_role, madden_ovr, delta_ovr, reference_only,
      attributes_json, madden_attributes_json, delta_attributes_json, seeded_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertAttr = db.prepare(`
    INSERT INTO rating_attributes(card_id, attribute, rating, madden_rating, delta, confidence, tier)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  db.exec("BEGIN IMMEDIATE");
  try {
    clearDerived(db);
    for (const team of NFL_TEAMS) {
      const brand = brandingTeams[team.abbr] ?? {};
      const display = text(brand.display_name) ?? `${team.city} ${team.nickname}`;
      insertTeam.run(
        team.abbr,
        display,
        team.city,
        team.nickname,
        team.conference,
        team.division,
        text(brand.primary_color),
        text(brand.secondary_color),
        text(brand.accent_color)
      );
    }

    for (const player of players) {
      const teamAbbr = canonicalTeam(player.team);
      if (player.team && !teamAbbr) {
        unknownTeams.set(player.team, (unknownTeams.get(player.team) ?? 0) + 1);
      }
      insertPlayer.run(
        player.player_id,
        player.full_name,
        teamAbbr,
        player.team,
        player.position,
        player.source_position,
        player.depth_chart_position,
        player.roster_status,
        player.jersey_number,
        player.birth_date,
        player.height,
        player.weight,
        player.college,
        player.years_exp,
        player.external_ids.gsis,
        player.external_ids.espn,
        player.external_ids.pff,
        player.external_ids.pfr,
        JSON.stringify(player.aliases),
        JSON.stringify(player.historical_positions),
        player.requires_role_resolution,
        player.role_resolution_reason,
        player.current_audit_id
      );
      insertMembership.run(
        player.player_id,
        teamAbbr,
        season,
        mapRosterStatus(player.roster_status, teamAbbr),
        player.roster_status
      );
    }

    for (const [raw, count] of unknownTeams) {
      warnings.push({ code: "UNKNOWN_TEAM", detail: `${raw} (${count} players) left without a club` });
    }

    for (const position of positions) {
      const lock = locks[position];
      const selection = selectBaseline(position, lock, baselineFiles);
      if (!selection) {
        warnings.push({ code: "NO_BASELINE", detail: position });
        continue;
      }
      if (lock?.status === "LOCKED" && lock.baseline_file && selection.reason === "latest_file") {
        warnings.push({
          code: "LOCK_FILE_MISSING",
          detail: `${position}: ${lock.baseline_file} missing; used ${selection.fileName}`
        });
      }
      if (selection.newerUnselected) {
        warnings.push({
          code: "NEWER_BASELINE_NOT_LOCKED",
          detail: `${position}: lock uses ${selection.fileName}; newer file ${selection.newerUnselected} was not selected`
        });
      }

      const baselinePath = path.join(baselinesDir, selection.fileName);
      let baseline: Record<string, unknown>;
      try {
        const parsed = asRecord(readJson(baselinePath));
        if (!parsed) throw new Error("baseline JSON was not an object");
        baseline = parsed;
      } catch (error) {
        warnings.push({
          code: "BASELINE_UNREADABLE",
          detail: `${baselinePath}: ${error instanceof Error ? error.message : String(error)}`
        });
        continue;
      }
      if (typeof baseline.position === "string" && baseline.position !== position) {
        warnings.push({
          code: "BASELINE_POSITION_MISMATCH",
          detail: `${selection.fileName} says ${baseline.position}, lock bucket is ${position}`
        });
      }

      const labeled = { ...baseline, position };
      const loaded = draftsFromBaseline(labeled, auditId => {
        const file = path.join(auditsDir, position, `${auditId}.json`);
        if (!fs.existsSync(file)) return { audit: null, missing: "not found" };
        try {
          const audit = asRecord(readJson(file));
          if (!audit) return { audit: null, missing: "not an object" };
          return { audit };
        } catch (error) {
          return { audit: null, missing: error instanceof Error ? error.message : String(error) };
        }
      });
      warnings.push(...loaded.warnings);

      const tiers = scarcityTiers(baseline);
      const firstOut = asRecord(baseline.first_out);
      const lastIn = asRecord(baseline.last_in);
      const prior = Array.isArray(lock?.history)
        ? lock.history.map(entry => text(entry?.baseline_file)).filter((file): file is string => Boolean(file))
        : [];
      insertBaseline.run(
        position,
        selection.relativeFile,
        text(baseline.version) ?? text(lock?.version),
        text(lock?.lock_audit_id),
        text(baseline.locked_at) ?? text(lock?.locked_at),
        text(lock?.status) ?? text(baseline.status),
        text(baseline.architecture_version),
        text(baseline.methodology_version),
        selection.reason,
        selection.newerUnselected,
        loaded.cardSource,
        JSON.stringify(baseline.top_10 ?? []),
        text(firstOut?.player),
        finiteNumber(firstOut?.ovr),
        text(lastIn?.player),
        finiteNumber(lastIn?.ovr),
        JSON.stringify(prior)
      );

      const seenPlayer = new Set<string>();
      let positionCards = 0;
      for (const draft of loaded.drafts) {
        const linked = linkPlayer(byId, byName, draft, position, warnings);
        if (linked) {
          const key = `${position}|${linked.player_id}`;
          if (seenPlayer.has(key)) {
            warnings.push({
              code: "DUPLICATE_PLAYER_CARD",
              detail: `${position} ${draft.playerName} -> ${linked.player_id}`
            });
            continue;
          }
          seenPlayer.add(key);
        }

        const audit = draft.audit;
        const ref = maddenRef(audit);
        const ourAttrs = numericAttrs(audit?.ratings);
        const maddenAttrs = numericAttrs(ref?.attributes);
        const statedDeltas = numericAttrs(ref?.delta_attributes);
        const deltas: Record<string, number> = {};
        for (const [attribute, rating] of Object.entries(ourAttrs)) {
          if (attribute in statedDeltas) deltas[attribute] = statedDeltas[attribute];
          else if (attribute in maddenAttrs) deltas[attribute] = rating - maddenAttrs[attribute];
        }
        const maddenOvr = finiteNumber(ref?.ovr);
        const proposed = finiteNumber(audit?.proposed_ovr);
        const statedDelta = finiteNumber(ref?.delta_ovr);
        const deltaOvr = statedDelta !== null && (proposed === null || proposed === draft.ovr)
          ? statedDelta
          : (draft.ovr !== null && maddenOvr !== null ? draft.ovr - maddenOvr : null);
        const cardId = draft.auditId
          ? `${position}:${draft.auditId}`
          : `${position}:baseline:${nameSlug(draft.playerName)}`;
        const confidenceMap = asRecord(audit?.trait_confidence);

        insertCard.run(
          cardId,
          linked?.player_id ?? null,
          draft.playerName,
          position,
          draft.ovr,
          proposed,
          text(audit?.ovr_tier),
          text(audit?.confidence),
          text(audit?.style_profile),
          Array.isArray(audit?.weaknesses) ? JSON.stringify(audit.weaknesses) : null,
          draft.auditId,
          text(audit?.task_id),
          selection.relativeFile,
          draft.origin,
          draft.rank,
          draft.poolRole,
          maddenOvr,
          deltaOvr,
          ref ? (ref.reference_only === true ? 1 : 0) : null,
          JSON.stringify(ourAttrs),
          ref ? JSON.stringify(maddenAttrs) : null,
          Object.keys(deltas).length ? JSON.stringify(deltas) : null,
          seededAt
        );
        for (const [attribute, rating] of Object.entries(ourAttrs)) {
          const confidence = confidenceMap && typeof confidenceMap[attribute] === "string"
            ? confidenceMap[attribute] as string
            : null;
          insertAttr.run(
            cardId,
            attribute,
            rating,
            attribute in maddenAttrs ? maddenAttrs[attribute] : null,
            attribute in deltas ? deltas[attribute] : null,
            confidence,
            traitTier(audit, draft.playerName, attribute, tiers)
          );
          attributeCount++;
        }
        cardCount++;
        positionCards++;
      }
      baselines.push({
        position,
        file: selection.relativeFile,
        reason: selection.reason,
        cards: positionCards
      });
    }

    const info = db.prepare(`
      INSERT INTO seed_runs(seeded_at, season, player_count, card_count, warning_count)
      VALUES (?, ?, ?, ?, ?)
    `).run(seededAt, season, players.length, cardCount, warnings.length);
    const seedId = Number(info.lastInsertRowid);
    const insertWarning = db.prepare(
      "INSERT INTO seed_warnings(seed_id, code, detail) VALUES (?, ?, ?)"
    );
    for (const warning of warnings) insertWarning.run(seedId, warning.code, warning.detail);
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }

  return {
    season,
    seeded_at: seededAt,
    teams: NFL_TEAMS.length,
    players: players.length,
    memberships: players.length,
    rating_cards: cardCount,
    attribute_rows: attributeCount,
    positions: baselines.length,
    warnings,
    baselines
  };
}
