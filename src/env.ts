export function environmentSummary(): Record<string, unknown> {
  return {
    node_env: process.env.NODE_ENV ?? "development",
    port: Number(process.env.PORT ?? "3000"),
    research_mode: process.env.GRIDIRON_RESEARCH_MODE ?? "codex",
    max_revisions: Number(process.env.GRIDIRON_MAX_REVISIONS ?? "3"),
    max_steps: Number(process.env.GRIDIRON_MAX_STEPS ?? "100"),
    stop_on_major_flag:
      (process.env.GRIDIRON_STOP_ON_MAJOR_FLAG ?? "true") === "true"
  };
}
