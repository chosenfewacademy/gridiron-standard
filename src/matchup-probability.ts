/**
 * Matchup probabilities from one attribute path per mechanism.
 *
 * The scales below are unit conventions so a test can see that an attribute
 * change moves the mechanism. They are not league baselines, not a fit to any
 * game, and not the coefficients of the local PHI@DAL engine. Equal attributes
 * are an even probability. Expected yards are the rating margin times the unit
 * scale, with no intercept, so they are not a yards-per-carry target.
 *
 * This module does not read player names, teams, PFF grades, overalls, or
 * config/madden-ovr-weights.estimated.json. It does not return a winner or a
 * final score.
 */

export const UNCALIBRATED_PROBABILITY_SCALE = 8;
export const UNCALIBRATED_YARDS_PER_RATING_POINT = 1 / 20;
export const RATING_SCALE_MIDPOINT = 49.5;

export const CALIBRATION = {
  status: "UNCALIBRATED",
  fit_to_nfl: false,
  fit_to_local_engine: false,
  fit_to_score: false,
  intercept: 0,
  estimated_madden_weights_used: false
} as const;

export type MechanismId = "completion" | "deep_throw" | "run_yards" | "scramble" | "pass_protection";

export interface MechanismSpec {
  id: MechanismId;
  output: "success_probability" | "expected_yards";
  offense: readonly string[];
  defense: readonly string[];
}

/** Each attribute is listed once. PFF, overall, name, and team are not inputs. */
export const MECHANISMS: Record<MechanismId, MechanismSpec> = {
  completion: { id: "completion", output: "success_probability", offense: ["SAC", "MAC", "DAC", "AWR"], defense: ["MCV", "ZCV"] },
  deep_throw: { id: "deep_throw", output: "success_probability", offense: ["THP", "DAC"], defense: ["SPD", "ZCV"] },
  run_yards: { id: "run_yards", output: "expected_yards", offense: ["RBK", "RBP", "BTK", "TRK", "SFA", "BCV"], defense: ["PMV", "BSH"] },
  scramble: { id: "scramble", output: "success_probability", offense: ["SPD", "ACC", "RUN"], defense: [] },
  pass_protection: { id: "pass_protection", output: "success_probability", offense: ["PBK", "PBP", "PBF"], defense: ["FMV", "PMV"] }
};

export type ReadingSource = "gs_attribute";

export interface AttributeReading {
  side: "offense" | "defense";
  attribute: string;
  value: number;
  /** Distinguishes two players with the same trait. It is not a bonus. */
  playerId: string;
  source?: ReadingSource;
}

export interface MechanismResult {
  mechanism: MechanismId;
  primary_paths: 1;
  margin: number;
  success_probability?: number;
  uncalibrated_expectation?: number;
  intercept: 0;
  readings_used: number;
  determines_winner: false;
  determines_final_score: false;
  calibration: "UNCALIBRATED";
  nfl_yards: false;
}

const FORBIDDEN_INPUT_KEYS = new Set([
  "team", "teamOvr", "team_ovr", "offenseOvr", "defenseOvr", "player", "playerName",
  "pff", "pffGrade", "winner", "homeScore", "awayScore", "finalScore", "targetScore",
  "targetYards", "targetYpc", "targetWinProbability", "winProbability"
]);

export function assertNoOutcomeAnchor(input: object): void {
  for (const key of Object.keys(input)) {
    if (FORBIDDEN_INPUT_KEYS.has(key)) throw new Error(`OUTCOME_ANCHOR_REJECTED:${key}`);
  }
}

export function refuseGameResult(): never {
  throw new Error("MATCHUP_DOES_NOT_DETERMINE_WINNER_OR_FINAL_SCORE");
}

function mean(values: number[]): number {
  if (!values.length) throw new Error("MISSING_RELEVANT_ATTRIBUTES");
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function evaluateReadings(mechanismId: MechanismId, readings: AttributeReading[]): MechanismResult {
  const spec = MECHANISMS[mechanismId];
  const allowed = new Set([
    ...spec.offense.map(attribute => `offense:${attribute}`),
    ...spec.defense.map(attribute => `defense:${attribute}`)
  ]);
  const seen = new Set<string>();
  const offense: number[] = [];
  const defense: number[] = [];
  for (const reading of readings) {
    if (reading.source && reading.source !== "gs_attribute") {
      throw new Error(`STACKED_SIGNAL:${reading.source}`);
    }
    if (!Number.isFinite(reading.value)) throw new Error(`ATTRIBUTE_NOT_FINITE:${reading.attribute}`);
    const slot = `${reading.side}:${reading.attribute}`;
    if (!allowed.has(slot)) continue;
    const identity = `${reading.playerId}:${slot}`;
    if (seen.has(identity)) throw new Error(`REPEATED_SIGNAL:${identity}`);
    seen.add(identity);
    (reading.side === "offense" ? offense : defense).push(reading.value);
  }
  if (!offense.length) throw new Error("MISSING_RELEVANT_ATTRIBUTES");
  if (spec.defense.length && !defense.length) throw new Error("MISSING_RELEVANT_ATTRIBUTES");
  const offenseMean = mean(offense);
  const defenseMean = spec.defense.length ? mean(defense) : RATING_SCALE_MIDPOINT;
  const margin = offenseMean - defenseMean;
  const result: MechanismResult = {
    mechanism: mechanismId,
    primary_paths: 1,
    margin,
    intercept: 0,
    readings_used: offense.length + defense.length,
    determines_winner: false,
    determines_final_score: false,
    calibration: "UNCALIBRATED",
    nfl_yards: false
  };
  if (spec.output === "success_probability") {
    result.success_probability = 1 / (1 + Math.exp(-margin / UNCALIBRATED_PROBABILITY_SCALE));
  } else {
    result.uncalibrated_expectation = margin * UNCALIBRATED_YARDS_PER_RATING_POINT;
  }
  return result;
}

export function shockReadings(readings: AttributeReading[], playerId: string, attributes: string[], delta: number): AttributeReading[] {
  const keys = new Set(attributes);
  return readings.map(reading => {
    if (reading.playerId !== playerId || !keys.has(reading.attribute)) return reading;
    return { ...reading, value: reading.value + delta };
  });
}
