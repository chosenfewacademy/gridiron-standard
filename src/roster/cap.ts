export const TOP_51 = 51;
export type AccountingRule = "in_season" | "top51";

export interface CapPlayerCharge {
  playerId: string;
  playerName: string;
  capHit: number;
  deadMoney: number | null;
  voidYear: boolean;
  /**
   * active and IR count on the in-season roster.
   * PS is practice squad and does not count on the club cap.
   * FA, other, and off_roster use dead money when the importer stored it.
   * null means this season has no roster row; the charge is treated as active.
   */
  membershipStatus: string | null;
}

export interface CapLine {
  playerId: string;
  playerName: string;
  amount: number;
  reason: string;
}

export interface CapSheet {
  rule: AccountingRule;
  leagueCap: number;
  carryover: number;
  adjustments: number;
  committed: number;
  deadMoney: number;
  capSpace: number;
  counted: CapLine[];
  excluded: CapLine[];
  dead: CapLine[];
}

export interface CapSheetInput {
  leagueCap: number;
  carryover?: number;
  adjustments?: number;
  rule: AccountingRule;
  charges: CapPlayerCharge[];
  /** Defaults to 51. Tests can pass a smaller cutoff. */
  top51Limit?: number;
}

function byCapThenName(a: CapPlayerCharge, b: CapPlayerCharge): number {
  if (b.capHit !== a.capHit) return b.capHit - a.capHit;
  const name = a.playerName.localeCompare(b.playerName);
  if (name !== 0) return name;
  return a.playerId.localeCompare(b.playerId);
}

/**
 * Club cap sheet.
 * cap space = league cap + carryover + adjustments - committed roster charges - dead money.
 * In-season counts every active and IR charge. Top-51 keeps the largest charges and every
 * player tied with the last one, so an equal cap number is not dropped. Void years always
 * count as dead money at their cap hit. Practice squad charges never count.
 * Bonus columns are not re-added; cap_hit and dead_money are the imported charges.
 */
export function buildCapSheet(input: CapSheetInput): CapSheet {
  const carryover = input.carryover ?? 0;
  const adjustments = input.adjustments ?? 0;
  const limit = input.top51Limit ?? TOP_51;
  const counted: CapLine[] = [];
  const excluded: CapLine[] = [];
  const dead: CapLine[] = [];
  const pool: CapPlayerCharge[] = [];

  for (const charge of input.charges) {
    if (charge.voidYear) {
      dead.push({
        playerId: charge.playerId,
        playerName: charge.playerName,
        amount: charge.capHit,
        reason: "void_year"
      });
      continue;
    }
    const status = charge.membershipStatus;
    if (status === "PS") {
      excluded.push({
        playerId: charge.playerId,
        playerName: charge.playerName,
        amount: charge.capHit,
        reason: "practice_squad"
      });
      continue;
    }
    if (status === "FA" || status === "other" || status === "off_roster") {
      if (charge.deadMoney !== null) {
        dead.push({
          playerId: charge.playerId,
          playerName: charge.playerName,
          amount: charge.deadMoney,
          reason: "off_roster"
        });
      } else {
        excluded.push({
          playerId: charge.playerId,
          playerName: charge.playerName,
          amount: charge.capHit,
          reason: "off_roster_no_dead_money"
        });
      }
      continue;
    }
    pool.push(charge);
  }

  const sorted = [...pool].sort(byCapThenName);
  let keep = sorted;
  if (input.rule === "top51" && sorted.length > limit) {
    const cutoff = sorted[limit - 1]?.capHit ?? 0;
    keep = sorted.filter(charge => charge.capHit >= cutoff);
    for (const charge of sorted) {
      if (charge.capHit < cutoff) {
        excluded.push({
          playerId: charge.playerId,
          playerName: charge.playerName,
          amount: charge.capHit,
          reason: "below_top_51"
        });
      }
    }
  }

  for (const charge of keep) {
    counted.push({
      playerId: charge.playerId,
      playerName: charge.playerName,
      amount: charge.capHit,
      reason: input.rule === "top51" ? "top_51" : "roster"
    });
  }

  const committed = counted.reduce((sum, line) => sum + line.amount, 0);
  const deadMoney = dead.reduce((sum, line) => sum + line.amount, 0);
  return {
    rule: input.rule,
    leagueCap: input.leagueCap,
    carryover,
    adjustments,
    committed,
    deadMoney,
    capSpace: input.leagueCap + carryover + adjustments - committed - deadMoney,
    counted,
    excluded,
    dead
  };
}

/** Completed years of age on September 1 of the cap season. */
export function ageOnSeptember1(birthDate: string | null, season: number): number | null {
  if (!birthDate) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  let age = season - year;
  if (month > 9 || (month === 9 && day > 1)) age -= 1;
  return age;
}
