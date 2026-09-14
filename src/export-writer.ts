import fs from "node:fs";
import path from "node:path";
import type { ExportRecord, ExportMode } from "./export-types.js";

function csvEscape(value: unknown): string {
  const text = value == null ? "" : String(value);
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function loadOrder(): any {
  return JSON.parse(fs.readFileSync(path.resolve("config/madden-entry-order.json"), "utf8"));
}

export function writeExport(
  records: ExportRecord[],
  mode: ExportMode,
  label: string
): { csv: string; json: string } {
  const dir = path.resolve("exports");
  fs.mkdirSync(dir, { recursive: true });

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const safeLabel = label.replace(/[^a-zA-Z0-9._-]+/g, "_");
  const base = `${safeLabel}_${mode}_${stamp}`;

  const jsonPath = path.join(dir, `${base}.json`);
  const csvPath = path.join(dir, `${base}.csv`);

  fs.writeFileSync(jsonPath, JSON.stringify(records, null, 2) + "\n");

  const csv = mode === "MADDEN_ENTRY"
    ? renderMaddenEntryCsv(records)
    : renderRichCsv(records);

  fs.writeFileSync(csvPath, csv);

  return { csv: csvPath, json: jsonPath };
}

function renderMaddenEntryCsv(records: ExportRecord[]): string {
  const orderConfig = loadOrder();
  const allAttrs = new Set<string>();

  for (const record of records) {
    const posOrder = orderConfig.positions?.[record.position ?? ""] ?? [];
    for (const attr of posOrder) {
      if (attr !== "OVR") allAttrs.add(attr);
    }
    for (const attr of Object.keys(record.ratings ?? {})) allAttrs.add(attr);
  }

  const attrs = [...allAttrs];
  const headers = ["Player","Team","Position","OVR",...attrs];

  const rows = records.map(record => {
    const values: unknown[] = [
      record.player,
      record.team ?? "",
      record.position ?? "",
      record.ovr ?? ""
    ];
    for (const attr of attrs) {
      values.push(record.ratings?.[attr] ?? "");
    }
    return values.map(csvEscape).join(",");
  });

  return [headers.join(","), ...rows].join("\n") + "\n";
}

function renderRichCsv(records: ExportRecord[]): string {
  const allAttrs = new Set<string>();
  for (const record of records) {
    for (const attr of Object.keys(record.ratings ?? {})) allAttrs.add(attr);
  }
  const attrs = [...allAttrs].sort();

  const headers = [
    "Player","Player ID","Team","Position","OVR",
    "Audit ID","Audit Status","Confidence","Methodology Version",
    "Audit Date","Archetype/Identity","Flags",
    ...attrs
  ];

  const rows = records.map(record => {
    const values: unknown[] = [
      record.player,
      record.player_id,
      record.team ?? "",
      record.position ?? "",
      record.ovr ?? "",
      record.audit_id ?? "",
      record.status ?? "",
      record.confidence ?? "",
      record.methodology_version ?? "",
      record.audit_date ?? "",
      record.archetype ?? "",
      (record.flags ?? []).join("|")
    ];
    for (const attr of attrs) values.push(record.ratings?.[attr] ?? "");
    return values.map(csvEscape).join(",");
  });

  return [headers.join(","), ...rows].join("\n") + "\n";
}
