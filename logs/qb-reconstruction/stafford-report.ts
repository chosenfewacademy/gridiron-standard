import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const directory = path.resolve(process.argv[2] ?? '');
const allowed = path.resolve(root, 'logs/qb-reconstruction/matthew_stafford') + path.sep;
if (!directory.startsWith(allowed)) throw new Error('Report must stay in Stafford reconstruction directory');
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8'));
const recovered = fs.existsSync(path.join(directory, 'evidence-recovered.json'));
const partial = fs.existsSync(path.join(directory, 'evidence-manual-partial.json'));
const evidence = json(partial ? 'evidence-manual-partial.json' : recovered ? 'evidence-recovered.json' : 'evidence.json');
const request = json('request.json');
const check = json(partial ? 'manual-partial-check.json' : recovered ? 'recovery-check.json' : 'evidence-check.json');
const integrity = json('integrity-after.json');
if (evidence.minimum_evidence_met) throw new Error('Evidence passed: complete the proposal/validator stage before reporting');
const traits = evidence.normalized.position_specific_traits ?? {};
const table = (map: Record<string, any>) => ['| Category | Status | Confidence | Limitations |', '|---|---|---|---|',
  ...Object.entries(map).map(([key, value]) => `| ${key} | ${value.status ?? 'missing'} | ${value.confidence ?? 'unknown'} | ${(value.limitations ?? []).join('; ').replaceAll('|', '/')} |`)].join('\n');
const categoryCounts: Record<string, number> = {};
for (const c of Object.values(evidence.normalized) as any[]) categoryCounts[c.status ?? 'missing'] = (categoryCounts[c.status ?? 'missing'] ?? 0) + 1;
const manifest = [...fs.readdirSync(directory), 'report.md', 'result-summary.json'].sort();
const report = `# Matthew Stafford — first QB reconstruction evidence audit

**Outcome: EVIDENCE_INSUFFICIENT. minimum_evidence_met = false. No proposed card generated.**

Collection note: the first performance-research turn hit its fixed timeout before returning JSON. Its failed gate output is preserved unchanged. ${recovered ? 'A bounded continuation recovered the previously collected source evidence; this report uses evidence-recovered.json and recovery-check.json, not the initial empty adapter fallback.' : 'No complete performance packet was recovered; this is a collection failure, not proof that all football evidence is unavailable.'} Calendar research completed separately. Public web-event metadata and independent source checks are preserved; no private reasoning/session configuration is included in the recovery artifacts.

${partial ? 'The same-thread recovery also timed out. This report uses evidence-manual-partial.json: a conservative, independently source-checked partial packet covering all 21 categories, 17 domains and 19 trait-assessment slots. It distinguishes unestablished assessments from proven absence of public data and cannot pass the evidence gate.' : ''}

## Identity and season

Resolved registry ID: matthew_stafford. Name: Matthew Stafford. Exact Madden position: QB. Locked control rank: 1. Locked comparison OVR: 91. Registry team was null; official NFL/Rams roster evidence supplied LAR for this research request without changing registry data.

Application-derived NFL season: ${evidence.nfl_season}. Season phase: ${evidence.season_phase}. Primary evidence season: ${evidence.evidence_season}. Current regular-season opportunities/appearances: ${evidence.current_season_games_available}/${evidence.current_season_games_played}. Prior completed season used as primary: ${evidence.prior_season_used_as_primary_baseline}. Postseason remains a separate sample. Calendar facts and source retrieval timestamps are preserved in stage-1-result.json and evidence.json.

## Evidence gate

${JSON.stringify(categoryCounts)}. The parent category statuses are collector assessments; the application gate additionally checks sample/season/source requirements and domain/trait completeness. Partial or low-confidence evidence was not promoted to satisfied.

${table(evidence.normalized)}

### All QB domains

${table(traits.domain_assessments ?? {})}

### All QB trait evidence assessments — not ratings

${table(traits.trait_assessments ?? {})}

### Exact blocking findings

${evidence.missing_evidence.map((s: string) => '- ' + s).join('\n')}

## Ceiling calibration, distinctions and weaknesses

Stafford is the ceiling control because the authoritative stored QB hierarchy places him first at 91. This run did not reopen that hierarchy or establish a new approved attribute ceiling. Strong completed-season production and sourced film can inform an eventual ceiling build, but do not justify inflating all traits or copying the overall result into individual ratings. See performance_summary, the domain/trait assessments, and manual-source-review.json for source-qualified evidence.

Arm talent, accuracy, processing, pressure behavior, mobility and durability remain separate assessments. In particular, favorable arm/clean-pocket evidence cannot erase pressure-performance caveats, low rushing/scramble involvement, mistake trends, or uncertainty about current physical/recovery traits. Because no card was generated, no numerical weaknesses or elite traits were assigned. Missing evidence remains missing rather than becoming a fabricated low rating.

All other QB full cards remain unreconstructed. Comparisons use the locked hierarchy, stored OVRs and sourced football context only. Future pair calibration will strengthen as controls are rebuilt; no attribute-level controls were invented.

## OVR, scarcity and validators

- locked_target_ovr: 91 (unchanged).
- proposed_ovr: null. No legitimate formula or empirical observation exists for a generated card.
- observed_madden_ovr: null. No in-game observation was supplied or invented.
- Proposed 90+/95+/97+/99 traits: none; no ratings were generated.
- Season/evidence gate: executed and failed.
- QB card schema, trait-coherence/scarcity validator and rating revision loop: not entered, as required when minimum evidence is false.
- Rating revision count: ${check.rating_revision_count}. Research collection is not a rating revision.
- Run status: NOT_STARTED → RESEARCH_READY → EVIDENCE_INSUFFICIENT, through the framework's permitted transitions.
- VALIDATED / USER_APPROVED / LOCKED: never entered.

## Provider disagreements

\`\`\`json
${JSON.stringify(evidence.conflicts, null, 2)}
\`\`\`

Unresolved material differences remain blockers or explicit limitations. No conflicting statistics were averaged. PFF grades are third-party scouting metrics, not Madden ratings.

## Sources

${evidence.sources.map((s: any, i: number) => `${i + 1}. [${s.name}](${s.url}) — retrieved ${s.retrieved_at}; authority tier ${s.authority_tier}.`).join('\n')}

## Validation and protected state

Project typecheck and isolated research-runner typecheck passed. All 42 project tests passed. Preflight retains only the expected madden_order_verified blocker. Full command outputs are in validation.json. Protected file hashes unchanged: ${integrity.protected_state_unchanged} (${Object.keys(integrity.before).length} files).

No approved cards/audits, current-card pointers, locked baselines, editor-order verification, team-room/project state or initial planning queue were modified. The initial config queue remains a planning seed; this run's current reconstruction status is recorded in ${recovered ? 'queue-after-recovery.json' : 'queue-after-evidence.json'}. No graphic card, other player audit or approval/persistence operation ran.

## Files created

All output is confined to logs/qb-reconstruction. No existing project source/config/state file was changed.

- logs/qb-reconstruction/stafford-research.ts — isolated evidence-only runner.
- logs/qb-reconstruction/stafford-report.ts — evidence-failure report generator.
- logs/qb-reconstruction/stafford-recover.ts — bounded recovery of the same research thread after timeout.
- logs/qb-reconstruction/stafford-partial-packet.ts — preserve independently checked partial evidence without claiming completeness.
${manifest.map(f => '- ' + path.relative(root, path.join(directory, f)).replaceAll('\\', '/')).join('\n')}
`;
fs.writeFileSync(path.join(directory, 'report.md'), report, { flag: 'wx' });
fs.writeFileSync(path.join(directory, 'result-summary.json'), JSON.stringify({
  player_id: request.player_id, position: 'QB', locked_target_ovr: 91, nfl_season: evidence.nfl_season, season_phase: evidence.season_phase,
  evidence_season: evidence.evidence_season, category_counts: categoryCounts, minimum_evidence_met: false,
  reconstruction_status: 'EVIDENCE_INSUFFICIENT', proposed_card: null, proposed_ovr: null, observed_madden_ovr: null,
  scarcity_traits: [], rating_revision_count: 0, protected_state_unchanged: integrity.protected_state_unchanged,
  missing_evidence: evidence.missing_evidence, files_created: manifest
}, null, 2) + '\n', { flag: 'wx' });
console.log(JSON.stringify({ directory, categoryCounts, sources: evidence.sources.length, status: 'EVIDENCE_INSUFFICIENT' }));
