import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "./quiet-sqlite.js";
import { DatabaseSync } from "node:sqlite";

export { DatabaseSync };

const MIGRATIONS_DIR = fileURLToPath(new URL("../../roster/migrations/", import.meta.url));

export const DEFAULT_DB_RELATIVE = path.join("data", "roster", "gridiron.sqlite");
export const DEFAULT_SEASON = 2026;

export function defaultDbPath(root = process.cwd()): string {
  return process.env.ROSTER_DB?.trim() || path.join(root, DEFAULT_DB_RELATIVE);
}

export function openRosterDb(file: string): DatabaseSync {
  if (file !== ":memory:") {
    fs.mkdirSync(path.dirname(file), { recursive: true });
  }
  const db = new DatabaseSync(file, { enableForeignKeyConstraints: true });
  db.exec("PRAGMA foreign_keys = ON");
  if (file !== ":memory:") db.exec("PRAGMA journal_mode = DELETE");
  return db;
}

export function resetDbFile(file: string): void {
  if (file === ":memory:") return;
  for (const suffix of ["", "-wal", "-shm"]) {
    const candidate = file + suffix;
    if (fs.existsSync(candidate)) fs.unlinkSync(candidate);
  }
}

/** Apply roster/migrations/*.sql that are not yet in schema_migrations. Idempotent DDL. */
export function migrate(db: DatabaseSync, migrationsDir = MIGRATIONS_DIR): string[] {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL
    )
  `);
  const applied = new Set(
    (db.prepare("SELECT version FROM schema_migrations").all() as { version: number }[])
      .map(row => Number(row.version))
  );
  const files = fs.readdirSync(migrationsDir)
    .filter(name => /^\d+_.+\.sql$/.test(name))
    .sort();
  const ran: string[] = [];
  for (const name of files) {
    const version = Number(name.split("_")[0]);
    if (applied.has(version)) continue;
    const sql = fs.readFileSync(path.join(migrationsDir, name), "utf8");
    db.exec(sql);
    db.prepare(
      "INSERT INTO schema_migrations(version, name, applied_at) VALUES (?, ?, ?)"
    ).run(version, name, new Date().toISOString());
    ran.push(name);
  }
  return ran;
}

export function clearDerived(db: DatabaseSync): void {
  const tables = [
    "rating_attributes",
    "rating_cards",
    "roster_membership",
    "free_agent_market",
    "contracts",
    "team_cap_ledger",
    "salary_cap",
    "trade_assets",
    "trades",
    "draft_prospects",
    "draft_classes",
    "team_build_profiles",
    "seed_warnings",
    "seed_runs",
    "players",
    "position_baselines",
    "teams"
  ];
  for (const table of tables) db.exec(`DELETE FROM ${table}`);
}
