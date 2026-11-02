export declare const PROTECTED: Array<{ re: RegExp; why: string }>;
export declare const QUEUE_EXCEPTION_PATH: string;
export declare function queueOnlyAppend(baseText: string, headText: string): { ok: boolean; reason?: string };
export declare function violations(lines: string[], allowState?: (path: string) => boolean): string[];
