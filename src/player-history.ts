import fs from "node:fs";
import path from "node:path";
import type { ParsedAudit } from "./audit-parser.js";

export interface ApprovedCurrentCard {
  player_id: string;
  current_audit_id: string;
  position: string;
  ovr: number | null;
  ratings: Record<string, number>;
  approved_at: string;
  methodology_version: string;
}

export function linkApprovedAuditToPlayer(audit: ParsedAudit): void {
  if (!audit.player_id) throw new Error("Approved audit missing player_id.");

  const registryPath = path.resolve("data/players/registry.json");
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const player = registry.players.find((p: any) => p.player_id === audit.player_id);

  if (!player) throw new Error(`Unknown player_id: ${audit.player_id}`);

  player.audit_history ??= [];
  if (!player.audit_history.includes(audit.audit_id)) {
    player.audit_history.push(audit.audit_id);
  }
  player.current_audit_id = audit.audit_id;

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n");

  const dir = path.resolve("data/players", audit.player_id);
  fs.mkdirSync(dir, { recursive: true });

  const snapshot: ApprovedCurrentCard = {
    player_id: audit.player_id,
    current_audit_id: audit.audit_id,
    position: audit.position,
    ovr: audit.ovr_after ?? null,
    ratings: audit.ratings ?? {},
    approved_at: audit.created_at,
    methodology_version: audit.methodology_version
  };

  fs.writeFileSync(
    path.join(dir, "current.json"),
    JSON.stringify(snapshot, null, 2) + "\n"
  );
}

export function getCurrentApprovedCard(playerId: string): ApprovedCurrentCard | null {
  const file = path.resolve("data/players", playerId, "current.json");
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
