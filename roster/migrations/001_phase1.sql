-- Gridiron Standard roster database, Phase 1.
-- Applied by src/roster/db.ts (create-if-missing). The database is derived.
-- Locked baselines, state/locks.json, and the player registry are read and never written.
-- Madden columns are reference only. They are not evidence and not formula inputs.
-- Phase 2-5 tables are empty stubs. Do not put cap, draft, or trade logic here yet.

CREATE TABLE IF NOT EXISTS teams (
  abbr TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  nickname TEXT NOT NULL,
  conference TEXT NOT NULL CHECK (conference IN ('AFC', 'NFC')),
  division TEXT NOT NULL CHECK (division IN ('East', 'North', 'South', 'West')),
  primary_color TEXT,
  secondary_color TEXT,
  accent_color TEXT
);

CREATE TABLE IF NOT EXISTS players (
  player_id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  team_abbr TEXT REFERENCES teams(abbr),
  raw_team TEXT,
  position_bucket TEXT,
  source_position TEXT,
  depth_chart_position TEXT,
  roster_status TEXT,
  jersey_number INTEGER,
  birth_date TEXT,
  height_in INTEGER,
  weight_lb INTEGER,
  college TEXT,
  years_exp INTEGER,
  gsis_id TEXT,
  espn_id TEXT,
  pff_id TEXT,
  pfr_id TEXT,
  aliases_json TEXT,
  historical_positions_json TEXT,
  requires_role_resolution INTEGER,
  role_resolution_reason TEXT,
  current_audit_id TEXT
);

CREATE INDEX IF NOT EXISTS idx_players_team_pos ON players(team_abbr, position_bucket);
CREATE INDEX IF NOT EXISTS idx_players_name ON players(full_name);
CREATE INDEX IF NOT EXISTS idx_players_gsis ON players(gsis_id);

-- Which lock file the position's top 10 was read from. Not a second lock.
CREATE TABLE IF NOT EXISTS position_baselines (
  position TEXT PRIMARY KEY,
  baseline_file TEXT NOT NULL,
  version TEXT,
  lock_audit_id TEXT,
  locked_at TEXT,
  lock_status TEXT,
  architecture_version TEXT,
  methodology_version TEXT,
  selection_reason TEXT NOT NULL,
  newer_unselected TEXT,
  card_source TEXT,
  top10_json TEXT,
  first_out_player TEXT,
  first_out_ovr INTEGER,
  last_in_player TEXT,
  last_in_ovr INTEGER,
  prior_files_json TEXT
);

CREATE TABLE IF NOT EXISTS rating_cards (
  card_id TEXT PRIMARY KEY,
  player_id TEXT REFERENCES players(player_id),
  player_name TEXT NOT NULL,
  position TEXT NOT NULL,
  ovr INTEGER,
  audit_proposed_ovr INTEGER,
  ovr_tier TEXT,
  confidence TEXT,
  style_profile TEXT,
  weaknesses_json TEXT,
  source_audit_id TEXT,
  source_task_id TEXT,
  source_baseline_file TEXT NOT NULL,
  card_origin TEXT NOT NULL,
  baseline_rank INTEGER,
  pool_role TEXT NOT NULL CHECK (pool_role IN ('TOP10', 'FIRST_OUT', 'EXTERNAL_CONTROL', 'RATED')),
  madden_ovr INTEGER,
  delta_ovr INTEGER,
  reference_only INTEGER,
  attributes_json TEXT NOT NULL,
  madden_attributes_json TEXT,
  delta_attributes_json TEXT,
  seeded_at TEXT NOT NULL,
  UNIQUE(position, player_name)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_cards_pos_player
  ON rating_cards(position, player_id)
  WHERE player_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_cards_pos_ovr ON rating_cards(position, ovr);
CREATE INDEX IF NOT EXISTS idx_cards_player ON rating_cards(player_id);

CREATE TABLE IF NOT EXISTS rating_attributes (
  card_id TEXT NOT NULL REFERENCES rating_cards(card_id) ON DELETE CASCADE,
  attribute TEXT NOT NULL,
  rating INTEGER NOT NULL,
  madden_rating INTEGER,
  delta INTEGER,
  confidence TEXT,
  tier TEXT,
  PRIMARY KEY (card_id, attribute)
);

CREATE TABLE IF NOT EXISTS roster_membership (
  player_id TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  team_abbr TEXT REFERENCES teams(abbr),
  season INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'IR', 'PS', 'FA', 'other')),
  raw_roster_status TEXT,
  source TEXT NOT NULL,
  PRIMARY KEY (player_id, season)
);

CREATE INDEX IF NOT EXISTS idx_membership_team
  ON roster_membership(team_abbr, season, status);

CREATE TABLE IF NOT EXISTS seed_runs (
  seed_id INTEGER PRIMARY KEY,
  seeded_at TEXT NOT NULL,
  season INTEGER NOT NULL,
  player_count INTEGER NOT NULL,
  card_count INTEGER NOT NULL,
  warning_count INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS seed_warnings (
  warning_id INTEGER PRIMARY KEY,
  seed_id INTEGER NOT NULL REFERENCES seed_runs(seed_id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  detail TEXT NOT NULL
);

-- Phase 2 stub: contracts and the salary cap. No cap math in Phase 1.
CREATE TABLE IF NOT EXISTS contracts (
  contract_id INTEGER PRIMARY KEY,
  player_id TEXT REFERENCES players(player_id),
  team_abbr TEXT REFERENCES teams(abbr),
  note TEXT
);

CREATE TABLE IF NOT EXISTS salary_cap (
  season INTEGER PRIMARY KEY,
  league_cap INTEGER,
  note TEXT
);

CREATE TABLE IF NOT EXISTS team_cap_ledger (
  team_abbr TEXT NOT NULL REFERENCES teams(abbr),
  season INTEGER NOT NULL,
  cap_space INTEGER,
  note TEXT,
  PRIMARY KEY (team_abbr, season)
);

-- Phase 3 stub: free-agent market beyond the FA membership flag.
CREATE TABLE IF NOT EXISTS free_agent_market (
  player_id TEXT PRIMARY KEY REFERENCES players(player_id),
  season INTEGER,
  note TEXT
);

-- Phase 4 stub: draft class builders.
CREATE TABLE IF NOT EXISTS draft_classes (
  class_year INTEGER PRIMARY KEY,
  note TEXT
);

CREATE TABLE IF NOT EXISTS draft_prospects (
  prospect_id INTEGER PRIMARY KEY,
  class_year INTEGER REFERENCES draft_classes(class_year),
  full_name TEXT,
  position TEXT,
  note TEXT
);

-- Phase 5 stub: trade value and team-building suggestions.
CREATE TABLE IF NOT EXISTS trades (
  trade_id INTEGER PRIMARY KEY,
  season INTEGER,
  proposed_at TEXT,
  note TEXT
);

CREATE TABLE IF NOT EXISTS trade_assets (
  asset_id INTEGER PRIMARY KEY,
  trade_id INTEGER REFERENCES trades(trade_id),
  asset_type TEXT,
  note TEXT
);

CREATE TABLE IF NOT EXISTS team_build_profiles (
  team_abbr TEXT PRIMARY KEY REFERENCES teams(abbr),
  outlook TEXT,
  note TEXT
);

CREATE VIEW IF NOT EXISTS v_rating_card AS
SELECT
  c.card_id,
  c.player_id,
  c.player_name,
  c.position,
  c.ovr,
  c.madden_ovr,
  c.delta_ovr,
  c.baseline_rank,
  c.pool_role,
  c.source_audit_id,
  c.source_baseline_file,
  c.style_profile,
  c.reference_only,
  p.team_abbr,
  p.roster_status,
  p.full_name
FROM rating_cards c
LEFT JOIN players p ON p.player_id = c.player_id;
