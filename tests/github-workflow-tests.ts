import assert from "node:assert/strict";
import fs from "node:fs";

export function runGithubWorkflowTests(test:(name:string,fn:()=>void)=>void){
  const read=(name:string)=>fs.readFileSync(`.github/workflows/${name}`,"utf8");
  test("Responses smoke is manual, confirmed, and secret is step scoped",()=>{const yaml=read("responses-smoke.yml");
    assert.match(yaml,/workflow_dispatch:/);assert.match(yaml,/RUN_PAID_RESEARCH/);assert.match(yaml,/OPENAI_API_KEY: \$\{\{ secrets\.OPENAI_API_KEY \}\}/);
    assert(!/^env:/m.test(yaml));assert.match(yaml,/research:responses-smoke -- --live/);});
  test("Stafford resume targets existing checkpoint with concurrency and no commit",()=>{const yaml=read("stafford-evidence-resume.yml");
    assert.match(yaml,/6cb4a74b-2218-4ff9-843c-de8a1c8ae1a3/);assert.match(yaml,/matthew_stafford/);assert.match(yaml,/concurrency:/);
    assert.match(yaml,/evidence:resume/);assert.match(yaml,/actions\/upload-artifact@v4/);assert(!/git (commit|push)/.test(yaml));});
  test("manual validation keeps preflight visible",()=>{const yaml=read("validation.yml");assert.match(yaml,/workflow_dispatch:/);
    assert.match(yaml,/npm run typecheck/);assert.match(yaml,/npm test/);assert.match(yaml,/npm run --silent preflight \| tee/);});
  test("artifact proposal requires confirmation, successful source run, validation, and draft PR",()=>{const yaml=read("propose-research-artifact.yml");
    assert.match(yaml,/CREATE_DRAFT_PR/);assert.match(yaml,/test "\$conclusion" = "success"/);assert.match(yaml,/npm test/);
    assert.match(yaml,/gh pr create --draft/);assert.match(yaml,/git switch -c/);assert(!yaml.includes("branch=\"gridiron/research-${{ inputs.source_run_id }}\""));});
}
