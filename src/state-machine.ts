import type { ProjectState } from "./types.js";

const LG_PAIR_SEQUENCE = [
  { task_id: "LG_PAIR_03", players: ["Steve Avila", "Tyler Smith"] },
  { task_id: "LG_PAIR_04", players: ["Isaac Seumalo", "Landon Dickerson"] },
  { task_id: "LG_PAIR_05", players: ["Matthew Bergeron", "Ezra Cleveland"] }
];

export function getNextTask(state: ProjectState): Record<string, unknown> {
  if (state.current_position === "LG" && state.current_stage === "pair_audits") {
    const next = LG_PAIR_SEQUENCE.find(x => !state.completed_tasks.includes(x.task_id));
    if (next) return { type: "pair_audit", ...next };

    return {
      task_id: "LG_MEMBERSHIP",
      type: "membership_reopen",
      position: "LG"
    };
  }

  return state.current_task;
}
