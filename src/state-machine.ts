import type { ProjectState } from "./types.js";
import { planNext } from "./stage-engine.js";

/**
 * Next task for the current position. Delegates to the generic stage engine; LG keeps its
 * legacy in-progress sequence (LG_PAIR_03 -> 04 -> 05 -> LG_MEMBERSHIP) exactly.
 */
export function getNextTask(state: ProjectState): Record<string, unknown> {
  try {
    return planNext(state).task;
  } catch {
    return state.current_task;
  }
}
