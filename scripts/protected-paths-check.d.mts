export declare const PROTECTED: Array<{ re: RegExp; why: string }>;
export declare const QUEUE_EXCEPTION_PATH: string;
export declare function queueOnlyAppend(baseText: string, headText: string): { ok: boolean; reason?: string };
export declare function violations(lines: string[], allowState?: (path: string) => boolean): string[];
export declare function positionsOnlyAddPending(a: any, b: any): { ok: boolean; reason?: string; added?: string[] };
export declare function stateChangeAllowed(baseText: string, headText: string): { ok: boolean; reason?: string };
