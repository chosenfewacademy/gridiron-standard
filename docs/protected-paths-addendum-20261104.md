# Protected-paths guard addendum — 2026-11-04 (commissioner approval t54s495)

`REAUDIT_AUDIT_RE` in `scripts/protected-paths-check.mjs` matched position codes of 1–4 letters (`[A-Z]{1,4}`), so the FOURTH NARROW EXCEPTION (add-only TOP10_REAUDIT audit records) never applied to the 5-letter positions LEDGE and REDGE. Every new `audits/league/REDGE/REDGE_REAUDIT_*` file therefore failed the Protected state guard in CI (REDGE pushes of 2026-11-03, 11:39–11:42 PM ET), even though the files were pure additions.

Change (approved by the commissioner, t54s495): `[A-Z]{1,4}` → `[A-Z]{1,5}`. Nothing else changes: files must still be status "A" (added), match `<POS>/<POS>_REAUDIT_*.{json,md}`, and declare audit_type TOP10_REAUDIT; existing audit files still can never be modified, renamed or deleted.
