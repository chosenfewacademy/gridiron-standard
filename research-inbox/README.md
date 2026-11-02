# research-inbox

Grok Bot (GROK_BOT_FILE_TRANSPORT) delivers research here, one folder per task:

    research-inbox/<POS>/<TASK_ID>/
      task.json            optional task fields (baseline_controls etc.)
      evidence.json        EvidencePackage (src/research.ts, src/evidence-gate.ts schema)
      provenance.json      declared queries + retrievals (src/grok-bot-provenance.ts)
      audit-attempt-N.md   analyst output, attempts 1..3 (fenced ```json block + prose)
      feedback-attempt-N.json  written by the app's validator only

Validate offline: `npm run evidence:import -- --position <POS> --task <TASK_ID>`.
See docs/grok-bot-research.md. Never place state, locks, baselines, cards or audits here.
