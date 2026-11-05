export interface NflTeam {
  abbr: string;
  city: string;
  nickname: string;
  conference: "AFC" | "NFC";
  division: "East" | "North" | "South" | "West";
}

/** nflverse still labels the Los Angeles Rams as LA. Branding and this database use LAR. */
export const TEAM_ALIASES: Record<string, string> = {
  LA: "LAR"
};

export const NFL_TEAMS: NflTeam[] = [
  { abbr: "BUF", city: "Buffalo", nickname: "Bills", conference: "AFC", division: "East" },
  { abbr: "MIA", city: "Miami", nickname: "Dolphins", conference: "AFC", division: "East" },
  { abbr: "NE", city: "New England", nickname: "Patriots", conference: "AFC", division: "East" },
  { abbr: "NYJ", city: "New York", nickname: "Jets", conference: "AFC", division: "East" },
  { abbr: "BAL", city: "Baltimore", nickname: "Ravens", conference: "AFC", division: "North" },
  { abbr: "CIN", city: "Cincinnati", nickname: "Bengals", conference: "AFC", division: "North" },
  { abbr: "CLE", city: "Cleveland", nickname: "Browns", conference: "AFC", division: "North" },
  { abbr: "PIT", city: "Pittsburgh", nickname: "Steelers", conference: "AFC", division: "North" },
  { abbr: "HOU", city: "Houston", nickname: "Texans", conference: "AFC", division: "South" },
  { abbr: "IND", city: "Indianapolis", nickname: "Colts", conference: "AFC", division: "South" },
  { abbr: "JAX", city: "Jacksonville", nickname: "Jaguars", conference: "AFC", division: "South" },
  { abbr: "TEN", city: "Tennessee", nickname: "Titans", conference: "AFC", division: "South" },
  { abbr: "DEN", city: "Denver", nickname: "Broncos", conference: "AFC", division: "West" },
  { abbr: "KC", city: "Kansas City", nickname: "Chiefs", conference: "AFC", division: "West" },
  { abbr: "LV", city: "Las Vegas", nickname: "Raiders", conference: "AFC", division: "West" },
  { abbr: "LAC", city: "Los Angeles", nickname: "Chargers", conference: "AFC", division: "West" },
  { abbr: "DAL", city: "Dallas", nickname: "Cowboys", conference: "NFC", division: "East" },
  { abbr: "NYG", city: "New York", nickname: "Giants", conference: "NFC", division: "East" },
  { abbr: "PHI", city: "Philadelphia", nickname: "Eagles", conference: "NFC", division: "East" },
  { abbr: "WAS", city: "Washington", nickname: "Commanders", conference: "NFC", division: "East" },
  { abbr: "CHI", city: "Chicago", nickname: "Bears", conference: "NFC", division: "North" },
  { abbr: "DET", city: "Detroit", nickname: "Lions", conference: "NFC", division: "North" },
  { abbr: "GB", city: "Green Bay", nickname: "Packers", conference: "NFC", division: "North" },
  { abbr: "MIN", city: "Minnesota", nickname: "Vikings", conference: "NFC", division: "North" },
  { abbr: "ATL", city: "Atlanta", nickname: "Falcons", conference: "NFC", division: "South" },
  { abbr: "CAR", city: "Carolina", nickname: "Panthers", conference: "NFC", division: "South" },
  { abbr: "NO", city: "New Orleans", nickname: "Saints", conference: "NFC", division: "South" },
  { abbr: "TB", city: "Tampa Bay", nickname: "Buccaneers", conference: "NFC", division: "South" },
  { abbr: "ARI", city: "Arizona", nickname: "Cardinals", conference: "NFC", division: "West" },
  { abbr: "LAR", city: "Los Angeles", nickname: "Rams", conference: "NFC", division: "West" },
  { abbr: "SF", city: "San Francisco", nickname: "49ers", conference: "NFC", division: "West" },
  { abbr: "SEA", city: "Seattle", nickname: "Seahawks", conference: "NFC", division: "West" }
];

const BY_ABBR = new Map(NFL_TEAMS.map(team => [team.abbr, team]));

export function canonicalTeam(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const upper = raw.trim().toUpperCase();
  const mapped = TEAM_ALIASES[upper] ?? upper;
  return BY_ABBR.has(mapped) ? mapped : null;
}

export function teamByAbbr(abbr: string): NflTeam | undefined {
  return BY_ABBR.get(abbr);
}
