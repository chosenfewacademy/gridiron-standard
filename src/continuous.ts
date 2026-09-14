import { executeNext } from "./executor.js";
import { loadState } from "./state.js";

const maxSteps = Number(process.env.GRIDIRON_MAX_STEPS ?? "100");
const stopOnMajorFlag = (process.env.GRIDIRON_STOP_ON_MAJOR_FLAG ?? "true") === "true";

for (let step = 1; step <= maxSteps; step++) {
  const before = loadState();
  console.log(`[${step}/${maxSteps}] ${before.current_position} :: ${before.current_stage}`);

  try {
    const result: any = await executeNext();
    console.log(JSON.stringify({
      audit_id: result.audit_id,
      status: result.status,
      position: result.position,
      ovr_after: result.ovr_after ?? null,
      major_flags: result.major_flags ?? []
    }, null, 2));

    if (result.status === "INSUFFICIENT_EVIDENCE") {
      console.error("Stopping: required evidence unavailable.");
      process.exitCode = 3;
      break;
    }

    if (stopOnMajorFlag && result.status === "FLAGGED") {
      console.error("Stopping: major review flag requires user decision.");
      process.exitCode = 4;
      break;
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
    break;
  }
}
