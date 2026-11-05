const FLAG = Symbol.for("gridiron.quietSqliteWarning");
const g = globalThis as { [FLAG]?: boolean };

function isSqliteExperiment(warning: Error): boolean {
  return warning.name === "ExperimentalWarning" && /SQLite/i.test(String(warning.message));
}

if (!g[FLAG]) {
  g[FLAG] = true;
  const existing = process.listeners("warning") as ((warning: Error) => void)[];
  process.removeAllListeners("warning");
  process.on("warning", (warning: Error) => {
    if (isSqliteExperiment(warning)) return;
    if (existing.length === 0) {
      console.warn(warning.stack || warning.toString());
      return;
    }
    for (const listener of existing) listener.call(process, warning);
  });
}
