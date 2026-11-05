-- Phase 2: replace the empty Phase 1 contract/cap stubs.
-- Those stubs had no rows. Dollars are integer USD. The ledger is derived and rewritten on import.
-- Madden and Gridiron ratings are not inputs here. Locks and baselines are not touched.

DROP TABLE IF EXISTS team_cap_ledger;
DROP TABLE IF EXISTS contracts;
DROP TABLE IF EXISTS salary_cap;

CREATE TABLE salary_cap (
  season INTEGER PRIMARY KEY,
  league_cap INTEGER NOT NULL,
  accounting_rule TEXT NOT NULL CHECK (accounting_rule IN ('in_season', 'top51')),
  source_name TEXT,
  source_url TEXT,
  note TEXT
);

CREATE TABLE contracts (
  contract_id TEXT PRIMARY KEY,
  player_id TEXT NOT NULL REFERENCES players(player_id),
  team_abbr TEXT NOT NULL REFERENCES teams(abbr),
  signing_year INTEGER NOT NULL,
  years INTEGER,
  total_value INTEGER,
  aav INTEGER,
  signing_bonus INTEGER,
  guarantee_signing INTEGER,
  guarantee_roster INTEGER,
  guarantee_injury INTEGER,
  guarantee_other INTEGER,
  fully_guaranteed INTEGER,
  source_name TEXT,
  source_url TEXT,
  source_note TEXT,
  imported_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contracts_team ON contracts(team_abbr);
CREATE INDEX IF NOT EXISTS idx_contracts_player ON contracts(player_id);

CREATE TABLE contract_years (
  contract_id TEXT NOT NULL REFERENCES contracts(contract_id) ON DELETE CASCADE,
  season INTEGER NOT NULL,
  cap_hit INTEGER NOT NULL,
  dead_money INTEGER,
  base_salary INTEGER,
  signing_bonus_proration INTEGER,
  option_bonus_proration INTEGER,
  roster_bonus INTEGER,
  workout_bonus INTEGER,
  other_bonus INTEGER,
  guarantee_signing INTEGER,
  guarantee_roster INTEGER,
  guarantee_injury INTEGER,
  guarantee_other INTEGER,
  team_option INTEGER NOT NULL DEFAULT 0 CHECK (team_option IN (0, 1)),
  player_option INTEGER NOT NULL DEFAULT 0 CHECK (player_option IN (0, 1)),
  void_year INTEGER NOT NULL DEFAULT 0 CHECK (void_year IN (0, 1)),
  PRIMARY KEY (contract_id, season)
);

CREATE INDEX IF NOT EXISTS idx_contract_years_season ON contract_years(season);

CREATE TABLE team_cap_adjustments (
  team_abbr TEXT NOT NULL REFERENCES teams(abbr),
  season INTEGER NOT NULL,
  carryover INTEGER NOT NULL DEFAULT 0,
  adjustments INTEGER NOT NULL DEFAULT 0,
  note TEXT,
  PRIMARY KEY (team_abbr, season)
);

-- Derived snapshot of buildCapSheet for the season's default accounting rule.
CREATE TABLE team_cap_ledger (
  team_abbr TEXT NOT NULL REFERENCES teams(abbr),
  season INTEGER NOT NULL,
  accounting_rule TEXT NOT NULL,
  league_cap INTEGER NOT NULL,
  carryover INTEGER NOT NULL,
  adjustments INTEGER NOT NULL,
  committed INTEGER NOT NULL,
  dead_money INTEGER NOT NULL,
  cap_space INTEGER NOT NULL,
  players_counted INTEGER NOT NULL,
  players_excluded INTEGER NOT NULL,
  note TEXT,
  PRIMARY KEY (team_abbr, season, accounting_rule)
);

-- Handoff for the trade rater: AAV, birth date (age), and our OVR. Not a valuation.
CREATE VIEW IF NOT EXISTS v_contract_trade_inputs AS
SELECT
  c.contract_id,
  c.player_id,
  p.full_name,
  p.birth_date,
  p.team_abbr AS roster_team,
  c.team_abbr AS contract_team,
  c.aav,
  c.signing_year,
  c.years,
  c.total_value,
  c.fully_guaranteed,
  r.ovr,
  r.position AS rating_position
FROM contracts c
JOIN players p ON p.player_id = c.player_id
LEFT JOIN rating_cards r
  ON r.player_id = c.player_id
 AND (p.position_bucket IS NULL OR r.position = p.position_bucket);
