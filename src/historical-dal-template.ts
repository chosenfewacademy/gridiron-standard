/**
 * Diagnostic copy of the 2026-11-05 Dallas fill offsets in scripts/apply-dal-full-ratings.py.
 * Attribute = clamp(overall + offset, 40, 89) is how that script filled traits it did not
 * cite individually. This table detects that pattern. It must not be used to assign ratings.
 */

export const DAL_TEMPLATE_CLAMP = { min: 40, max: 89 } as const;

export const DAL_TEMPLATE_OFFSETS_2026_11_05: Record<string, Record<string, number>> = {
  QB: { SPD: -6, ACC: -4, AGI: -8, COD: -10, STR: -4, AWR: -2, THP: 10, SAC: 2, MAC: 4, DAC: -2, RUN: -4, TUP: -2, PAC: 0, BSK: -4, CAR: -2, JMP: -4, INJ: 10, STA: 6, TGH: 4 },
  RB: { SPD: 12, ACC: 10, AGI: 6, COD: 4, STR: 0, AWR: -2, CAR: 4, BCV: 0, BTK: -2, TRK: -4, SFA: -2, SPM: -4, JKM: 2, CTH: -6, CIT: -14, SRR: -8, MRR: -14, DRR: -18, RLS: -12, JMP: 4, INJ: 8, STA: 4, TGH: 4 },
  WR: { SPD: 14, ACC: 12, AGI: 8, COD: 6, STR: -6, AWR: -2, CTH: 2, CIT: -4, SPC: -6, SRR: 2, MRR: 0, DRR: -2, RLS: -4, JMP: 6, CAR: -4, BTK: -12, SPM: -10, JKM: -2, INJ: 8, STA: 4, TGH: 2 },
  TE: { SPD: 8, ACC: 6, AGI: 2, COD: 0, STR: 8, AWR: 0, CTH: 4, CIT: 0, SPC: -4, SRR: 0, MRR: -4, DRR: -10, RLS: -6, JMP: 4, CAR: -2, BTK: 0, RBK: 2, IBL: 0, PBK: -2, INJ: 8, STA: 4, TGH: 6 },
  LT: { STR: 14, SPD: -6, ACC: -4, AGI: -10, COD: -14, AWR: 0, PBK: 2, PBP: 2, PBF: -2, RBK: 0, RBP: 0, RBF: -4, IBL: 6, LBK: 2, INJ: 8, STA: 6, TGH: 8 },
  LG: { STR: 14, SPD: -4, ACC: -2, AGI: -8, COD: -12, AWR: 0, PBK: 2, PBP: 2, PBF: 0, RBK: 2, RBP: 2, RBF: 0, IBL: 6, LBK: 4, INJ: 8, STA: 6, TGH: 8 },
  C: { STR: 12, SPD: -6, ACC: -4, AGI: -8, COD: -12, AWR: 2, PBK: 2, PBP: 2, PBF: 0, RBK: 2, RBP: 2, RBF: 0, IBL: 4, LBK: 2, INJ: 8, STA: 6, TGH: 6 },
  RG: { STR: 14, SPD: -4, ACC: -2, AGI: -8, COD: -12, AWR: 0, PBK: 2, PBP: 2, PBF: 0, RBK: 2, RBP: 2, RBF: 0, IBL: 6, LBK: 4, INJ: 8, STA: 6, TGH: 8 },
  RT: { STR: 14, SPD: -6, ACC: -4, AGI: -10, COD: -14, AWR: 0, PBK: 2, PBP: 2, PBF: -2, RBK: 2, RBP: 2, RBF: -2, IBL: 6, LBK: 2, INJ: 8, STA: 6, TGH: 8 },
  LEDGE: { SPD: 8, ACC: 10, AGI: 4, COD: 2, STR: 6, AWR: 0, PRC: -2, TAK: 2, POW: 0, BSH: 0, PMV: 2, FMV: 4, PUR: 4, INJ: 8, STA: 6, TGH: 4 },
  REDGE: { SPD: 8, ACC: 10, AGI: 4, COD: 2, STR: 4, AWR: 0, PRC: -2, TAK: 2, POW: 0, BSH: -2, PMV: 0, FMV: 4, PUR: 4, INJ: 8, STA: 6, TGH: 4 },
  DT: { SPD: -6, ACC: -2, AGI: -12, COD: -16, STR: 16, AWR: 0, PRC: 0, TAK: 2, POW: 4, BSH: 6, PMV: 2, FMV: -8, PUR: -2, INJ: 8, STA: 4, TGH: 8 },
  MIKE: { SPD: 12, ACC: 12, AGI: 8, COD: 6, STR: 4, AWR: 0, PRC: 0, TAK: 4, POW: 0, BSH: 2, PUR: 6, MCV: -6, ZCV: 0, PRS: -8, INJ: 8, STA: 4, TGH: 4 },
  WILL: { SPD: 14, ACC: 14, AGI: 10, COD: 8, STR: 0, AWR: 0, PRC: -2, TAK: 4, POW: -2, BSH: 0, PUR: 8, MCV: -4, ZCV: 0, PRS: -8, INJ: 8, STA: 4, TGH: 2 },
  CB: { SPD: 16, ACC: 14, AGI: 10, COD: 8, STR: -8, AWR: -2, PRC: -2, MCV: 2, ZCV: 0, PRS: -4, CTH: -6, JMP: 8, TAK: -2, PUR: 2, INJ: 8, STA: 4, TGH: 2 },
  FS: { SPD: 14, ACC: 12, AGI: 8, COD: 6, STR: -4, AWR: 2, PRC: 0, MCV: -2, ZCV: 4, PRS: -6, CTH: -2, JMP: 6, TAK: 2, POW: -4, PUR: 4, INJ: 8, STA: 4, TGH: 2 },
  SS: { SPD: 12, ACC: 10, AGI: 6, COD: 4, STR: 2, AWR: 2, PRC: 0, MCV: -6, ZCV: 0, PRS: -8, CTH: -4, JMP: 4, TAK: 6, POW: 2, PUR: 4, INJ: 8, STA: 4, TGH: 4 },
  K: { KPW: 8, KAC: 6, AWR: 0, INJ: 8, STA: 4, TGH: 0 },
  P: { KPW: 10, KAC: 2, AWR: 0, INJ: 8, STA: 4, TGH: 0 }
};

export function clampDalTemplate(value: number): number {
  return Math.max(DAL_TEMPLATE_CLAMP.min, Math.min(DAL_TEMPLATE_CLAMP.max, Math.trunc(value)));
}

export function isDalTemplateAttribute(position: string, overall: number, attribute: string, value: number): boolean {
  const offset = DAL_TEMPLATE_OFFSETS_2026_11_05[position]?.[attribute];
  if (offset === undefined) return false;
  return value === clampDalTemplate(overall + offset);
}
