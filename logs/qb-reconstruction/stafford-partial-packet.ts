import fs from 'node:fs';
import path from 'node:path';
import { applyFullAuditEvidenceGate, requiredEvidenceCategories } from '../../src/evidence-gate.js';
import { QB_ATTRIBUTES, QB_DOMAINS } from '../../src/qb-reconstruction.js';
const directory = path.resolve('logs/qb-reconstruction/matthew_stafford/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3');
const read = (file: string) => JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8'));
const save = (file: string, value: unknown) => fs.writeFileSync(path.join(directory, file), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const original = read('evidence.json'); const request = read('request.json');
const notes = [...read('manual-source-review.json').items, ...read('manual-current-context.json').items];
const sources = notes.map((n: any, index: number) => ({ name: ['NFL Rams roster', 'Rams Stafford career statistics', 'PFF Week 9 Stafford film review',
  'PFF pre-NFC-Championship Stafford/Darnold comparison', 'Rams managed camp workload report', 'Rams Saints joint-practice report'][index],
  url: n.source_url, retrieved_at: n.retrieved_at, published_at: null, authority_tier: n.source_url.includes('pff.com') ? 2 as const : 1 as const, claims: [n.claim] }));
const item = (i: number, claim: string, season: number, period = 'REGULAR_SEASON') => ({ claim, source_url: sources[i].url,
  retrieved_at: sources[i].retrieved_at, season, period });
const assessment = (items: any[] = [], limitations = ['No completed, sufficiently specific assessment was established in the bounded collection.'], status = 'missing', confidence = 'LOW') => ({ status, confidence, items, limitations });
const normalized: Record<string, any> = Object.fromEntries(requiredEvidenceCategories('QB', 'PRESEASON').map(r => [r.name, assessment()]));
normalized.performance_summary = assessment([item(1, 'Completed regular season: 4,707 passing yards and 46 passing touchdowns.', 2025)], [], 'satisfied', 'HIGH');
normalized.current_role = assessment([item(0, 'Listed as an active Rams quarterback.', 2026, 'CURRENT_CONTEXT'), item(5, 'Participated in joint-practice passing work.', 2026, 'CURRENT_CONTEXT')], [], 'satisfied', 'HIGH');
normalized.roster_depth_chart = assessment([item(0, 'Official roster establishes Rams QB identity.', 2026, 'CURRENT_CONTEXT')], ['Full current depth-chart allocation was not reconciled.'], 'partial', 'MEDIUM');
normalized.injury_practice_status = assessment([item(4, 'Managed camp schedule: two practice days on, two off.', 2026, 'CURRENT_CONTEXT'), item(5, 'Observed joint-practice participation.', 2026, 'CURRENT_CONTEXT')], ['These dated reports do not establish a current full injury/practice designation or medical clearance.'], 'partial', 'MEDIUM');
normalized.preseason_participation = assessment([item(5, 'Short and deep completions observed in joint practice.', 2026, 'CURRENT_CONTEXT')], ['Full preseason game participation and workload not verified in this retained packet.'], 'partial', 'MEDIUM');
normalized.team_system_context = assessment([item(4, 'Camp repetitions with Adams support continuity and timing work.', 2026, 'CURRENT_CONTEXT')], ['No complete scheme/supporting-cast adjustment analysis.'], 'partial', 'MEDIUM');
normalized.passing_production_efficiency = assessment([item(1, 'Passing production totals are established.', 2025)], ['The independently retained packet lacks a complete reconciled efficiency table.'], 'partial', 'MEDIUM');
normalized.advanced_passing_metrics = assessment([item(3, 'Public comparison supplies pressure/play-action splits with mixed regular-season/playoff context.', 2025)], ['Do not relabel mixed samples as a final regular-season advanced package.'], 'partial', 'MEDIUM');
normalized.accuracy_by_depth = assessment([item(2, 'Week 9 film review supports difficult downfield placement.', 2025)], ['No complete short/intermediate/deep full-season placement splits or matched samples.'], 'partial', 'MEDIUM');
normalized.pressure_performance = assessment([item(3, 'Pressured passing was weaker than clean-pocket execution in the preview sample.', 2025)], ['Full regular-season pressure denominator and scope not reconciled.'], 'partial', 'MEDIUM');
normalized.turnover_worthy_mistakes = assessment([item(3, 'Preview flags a late increase in risky decisions.', 2025, 'POSTSEASON')], ['Recent mixed/postseason observations are not a reconciled full regular-season mistake package.'], 'partial', 'MEDIUM');
normalized.recent_performance_trend = structuredClone(normalized.turnover_worthy_mistakes);
normalized.scrambling_sack_avoidance = assessment([item(3, 'Scramble involvement was very low in the preview comparison.', 2025)], ['Do not infer broken sacks, speed or contact escape from low scramble frequency.'], 'partial', 'MEDIUM');
normalized.locked_control_comparisons = assessment([item(3, 'Public Stafford/Darnold comparison distinguishes their passing profiles.', 2025)], ['All ten locked controls lack a complete matched comparison packet; their full cards remain absent.'], 'partial', 'MEDIUM');
normalized.locked_control_comparisons.compared_controls = ['Matthew Stafford', 'Sam Darnold'];
normalized.outside_control_comparisons.limitations = ['Mahomes/Jackson/Goff comparison collection did not return a complete structured packet; no attributes inferred.'];
normalized.multi_year_trend.limitations = ['Prior-year source context exists, but a reconciled multi-year normalized assessment was not completed.'];
normalized.postseason_context = assessment([item(3, 'The pre-conference-championship preview explicitly includes playoff observations.', 2025, 'POSTSEASON')], ['Complete postseason production/game samples were not normalized.'], 'partial', 'MEDIUM');
normalized.durability_availability = assessment([item(4, 'Current camp participation differs from the prior back-injury absence.', 2026, 'CURRENT_CONTEXT')], ['Historical injury/exposure and completed-season availability not fully reconciled; no medical inference.'], 'partial', 'MEDIUM');
const domains: Record<string, any> = Object.fromEntries(QB_DOMAINS.map(key => [key, assessment([], [`Specific ${key} evidence remains unestablished after bounded collection and recovery failure.`])]));
domains.arm_strength = assessment([item(2, 'Film describes a far-hash Cover-2 throw.', 2025)], ['Qualitative film only; no complete current arm-strength calibration package.'], 'partial', 'MEDIUM');
domains.deep_accuracy = structuredClone(normalized.accuracy_by_depth);
domains.pressure_performance = structuredClone(normalized.pressure_performance);
domains.processing_decision_making = assessment([item(2, 'Film describes coverage identification before delivery.', 2025)], ['One film example is not a complete processing/decision sample.'], 'partial', 'MEDIUM');
domains.play_action = assessment([item(3, 'Public preview describes strong play-action execution.', 2025)], ['Scheme, fake execution and sample differences remain unresolved.'], 'partial', 'MEDIUM');
domains.scrambling = structuredClone(normalized.scrambling_sack_avoidance);
domains.workload_availability = structuredClone(normalized.injury_practice_status);
domains.durability = structuredClone(normalized.durability_availability);
domains.consistency = structuredClone(normalized.recent_performance_trend);
domains.opponent_context_adjustments = assessment([item(2, 'Film identifies the coverage and specific opponent context.', 2025)], ['No full opponent/supporting-cast adjustment or independent coefficients established.'], 'partial', 'MEDIUM');
const traits: Record<string, any> = Object.fromEntries(QB_ATTRIBUTES.map(key => [key, assessment([], [`No sufficiently specific ${key} trait package; no numeric rating inferred.`])]));
for (const [trait, domain] of Object.entries({ THP: 'arm_strength', DAC: 'deep_accuracy', TUP: 'pressure_performance', AWR: 'processing_decision_making', PAC: 'play_action', INJ: 'durability' })) traits[trait] = structuredClone(domains[domain]);
normalized.position_specific_traits = assessment([item(2, 'Arm execution and recognition have qualitative film support.', 2025)], ['All 19 traits are not sufficiently established.'], 'partial', 'MEDIUM');
normalized.position_specific_traits.domain_assessments = domains;
normalized.position_specific_traits.trait_assessments = traits;
const missing = ['PERFORMANCE_COLLECTION_TIMEOUT', 'BOUNDED_RECOVERY_TIMEOUT', 'MANUAL_PARTIAL_PACKET_NOT_FULL_AUDIT_READY',
  ...Object.entries(domains).map(([key]) => `domain_assessments.${key}: PARTIAL_OR_MISSING`),
  ...Object.entries(traits).map(([key]) => `trait_assessments.${key}: PARTIAL_OR_MISSING`)];
const evidence = applyFullAuditEvidenceGate({ task_id: request.task_id, position: 'QB', researched_at: new Date().toISOString(), sources, normalized,
  conflicts: [{ issue: 'Incompatible statistical scopes', resolution: 'Regular season, in-season snapshots and playoff-inclusive previews remain separate; no averages or scope conversions.' }],
  minimum_evidence_met: false, missing_evidence: missing, calendar: original.calendar, calendar_web_search_observed: true, fresh_web_research_observed: true }, request, new Date().toISOString());
save('evidence-manual-partial.json', evidence);
save('manual-partial-check.json', { minimum_evidence_met: false, missing_evidence: evidence.missing_evidence, status: 'EVIDENCE_INSUFFICIENT',
  rating_generation_executed: false, rating_revision_count: 0, proposed_ovr: null, observed_madden_ovr: null });
console.log(JSON.stringify({ minimum_evidence_met: false, sources: sources.length, categories: Object.keys(normalized).length, domains: Object.keys(domains).length, traits: Object.keys(traits).length }));
