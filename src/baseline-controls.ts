import fs from "node:fs";
import path from "node:path";

export interface BaselineControls {
  position: string;
  top_10: unknown[];
  last_in: unknown;
  first_out: unknown;
  external_controls: unknown[];
  scarcity: Record<string, unknown>;
  full_cards?: Record<string, unknown>;
}

/**
 * Calibration file for a locked position.
 * `state/locks.json` → `positions.<POS>.baseline_file` is the current lock
 * (for example `data/baselines/CB.reaudit-20261104b.json`).
 * `data/baselines/<POS>.json` is used only when that lock file is missing.
 */
export function resolveLockedBaselineFile(position: string, root = process.cwd()): string | null {
  const locksPath = path.join(root, "state", "locks.json");
  if (fs.existsSync(locksPath)) {
    const locks = JSON.parse(fs.readFileSync(locksPath, "utf8")) as {
      positions?: Record<string, { status?: string; baseline_file?: string }>;
    };
    const entry = locks.positions?.[position];
    const recorded = entry?.status === "LOCKED" ? entry.baseline_file : undefined;
    if (typeof recorded === "string" && isBaselineFile(root, recorded)) {
      return recorded.split("\\").join("/");
    }
  }

  const fallback = `data/baselines/${position}.json`;
  return isBaselineFile(root, fallback) ? fallback : null;
}

function isBaselineFile(root: string, relative: string): boolean {
  if (!relative || relative.includes("\0")) return false;
  const baselinesDir = path.resolve(root, "data", "baselines");
  const abs = path.resolve(root, relative);
  const rel = path.relative(baselinesDir, abs);
  if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) return false;
  if (path.extname(abs) !== ".json") return false;
  return fs.existsSync(abs) && fs.statSync(abs).isFile();
}

export function loadBaselineControls(position: string, root = process.cwd()): BaselineControls {
  const relative = resolveLockedBaselineFile(position, root);
  if (!relative) {
    throw new Error(`No baseline file for ${position}.`);
  }

  const data = JSON.parse(fs.readFileSync(path.resolve(root, relative), "utf8"));
  if (data.status !== "LOCKED") {
    throw new Error(`Baseline ${position} is not locked.`);
  }

  return {
    position,
    top_10: data.top_10 ?? [],
    last_in: data.last_in ?? null,
    first_out: data.first_out ?? null,
    external_controls: data.external_controls ?? [],
    scarcity: data.scarcity ?? {},
    full_cards: data.full_cards
  };
}
