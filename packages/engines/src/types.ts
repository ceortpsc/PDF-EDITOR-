export type EngineStatus = 'ready' | 'degraded' | 'offline';

export type EngineHealth = {
  name: string;
  version: string;
  status: EngineStatus;
  checkedAt: string;
  latencyMs?: number;
  detail?: string;
};

export type JobState = 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled';

export type Job<TInput = unknown, TOutput = unknown> = {
  id: string;
  type: string;
  state: JobState;
  input: TInput;
  output?: TOutput;
  error?: string;
  attempts: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
};

export type EngineContext = {
  requestId: string;
  tenantId?: string;
  actorId?: string;
  signal?: AbortSignal;
};

export interface Engine<TInput = unknown, TOutput = unknown> {
  readonly name: string;
  readonly version: string;
  health(ctx?: EngineContext): Promise<EngineHealth>;
  execute(input: TInput, ctx: EngineContext): Promise<TOutput>;
}

export type PdfOperation =
  | { op: 'inspect'; documentId: string }
  | { op: 'extract-text'; documentId: string; page?: number }
  | { op: 'merge'; documentIds: string[] }
  | { op: 'split'; documentId: string; pages: number[] }
  | { op: 'rotate'; documentId: string; pages: number[]; degrees: 90 | 180 | 270 }
  | { op: 'redact'; documentId: string; regions: Array<{ page: number; x: number; y: number; width: number; height: number }> }
  | { op: 'watermark'; documentId: string; text: string };

export type OcrInput = {
  documentId: string;
  mimeType: string;
  bytes: Uint8Array;
  languages?: string[];
};

export type OcrOutput = {
  text: string;
  confidence: number;
  pages: Array<{ page: number; text: string; confidence: number }>;
};

export type ConversionInput = {
  documentId: string;
  sourceFormat: string;
  targetFormat: string;
  bytes: Uint8Array;
};

export type ConversionOutput = {
  targetFormat: string;
  bytes: Uint8Array;
  contentType: string;
};
