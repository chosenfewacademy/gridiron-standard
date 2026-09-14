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

export function loadBaselineControls(position: string): BaselineControls {
  const file = path.resolve(`data/baselines/${position}.json`);
  if (!fs.existsSync(file)) {
    throw new Error(`No baseline file for ${position}.`);
  }

  const data = JSON.parse(fs.readFileSync(file, "utf8"));
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
