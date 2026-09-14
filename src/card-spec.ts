import fs from "node:fs";
import path from "node:path";
import { resolvePlayer } from "./player-resolver.js";
import { getCurrentApprovedCard } from "./player-history.js";

interface OrderedRating {
  attribute: string;
  rating: number;
  order: number;
}

function readJson(rel: string): any {
  return JSON.parse(fs.readFileSync(path.resolve(rel), "utf8"));
}

function getTeamBranding(team: string | null): any {
  const config = readJson("config/team-branding.json");
  if (!team) return config.fallback;
  return config.teams?.[team.toUpperCase()] ?? config.fallback;
}

function getMaddenOrder(position: string): string[] {
  const orderConfig = readJson("config/madden-entry-order.json");
  return orderConfig.positions?.[position] ?? [];
}

export function buildInputCardSpec(query: string): Record<string, unknown> {
  const resolution = resolvePlayer(query);

  if (resolution.status !== "RESOLVED" || !resolution.player) {
    return { ...resolution };
  }

  const player = resolution.player;
  const current = getCurrentApprovedCard(player.player_id);

  if (!current) {
    return {
      status: "FULL_AUDIT_REQUIRED",
      player_id: player.player_id,
      player: player.full_name,
      reason: "No approved current card exists."
    };
  }

  const outputPolicy = readJson("config/output-policy.json");
  const position = String(current.position ?? player.position ?? "");
  const order = getMaddenOrder(position);
  const ratings = current.ratings ?? {};

  const orderedRatings: OrderedRating[] = order
    .filter((attribute: string) => attribute !== "OVR")
    .filter((attribute: string) => typeof ratings[attribute] === "number")
    .map((attribute: string, index: number) => ({
      attribute,
      rating: Number(ratings[attribute]),
      order: index + 1
    }));

  for (const attribute of Object.keys(ratings)) {
    if (!order.includes(attribute)) {
      orderedRatings.push({
        attribute,
        rating: Number(ratings[attribute]),
        order: orderedRatings.length + 1
      });
    }
  }

  const branding = getTeamBranding(player.team ?? null);

  const spec = {
    status: "OK",
    player_id: player.player_id,
    player_name: player.full_name,
    team: player.team ?? null,
    team_name: branding.display_name ?? player.team ?? "NFL Team",
    position,
    ovr: Number(current.ovr),
    ordered_ratings: orderedRatings,
    branding,
    include_player_photo: false,
    output_policy_version: outputPolicy.version,
    card_style: outputPolicy.graphic_input_card.style,
    explicit_request_required: outputPolicy.graphic_input_card.generate_only_on_explicit_request
  };

  saveCardSpec(spec);
  return spec;
}

function saveCardSpec(spec: Record<string, unknown>): void {
  const dir = path.resolve("exports/cards");
  fs.mkdirSync(dir, { recursive: true });
  const playerId = String(spec.player_id);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const file = path.join(dir, `${playerId}_${stamp}.json`);
  fs.writeFileSync(file, JSON.stringify(spec, null, 2) + "\n");
}
