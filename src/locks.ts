export function assertTop10MutationAllowed(
  baselineStatus: string,
  intent: string
): void {
  if (baselineStatus === "LOCKED" && intent !== "TOP10_REAUDIT") {
    throw new Error(
      "LOCK VIOLATION: Locked Top 10 baseline may only be changed by explicit TOP10_REAUDIT."
    );
  }
}
