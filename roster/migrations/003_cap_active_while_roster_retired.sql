-- A contract year can stay an active cap charge after a roster retirement that
-- has not been processed as dead money. The flag does not change roster membership.
-- Existing years default to 0 and keep the previous rule.

ALTER TABLE contract_years
  ADD COLUMN cap_active_while_roster_retired INTEGER NOT NULL DEFAULT 0
  CHECK (cap_active_while_roster_retired IN (0, 1));
