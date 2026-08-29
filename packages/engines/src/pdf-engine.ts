import type { Engine, EngineContext, EngineHealth, PdfOperation } from './types';

export type PdfEngineProvider = {
  inspect: (documentId: string, ctx: EngineContext) => Promise<Record<string, unknown>>;
  extractText: (documentId: string, page: number | undefined, ctx: EngineContext) => Promise<string>;
  merge: (documentIds: string[], ctx: EngineContext) => Promise<Uint8Array>;
  split: (documentId: string, pages: number[], ctx: EngineContext) => Promise<Uint8Array>;
  rotate: (documentId: string, pages: number[], degrees: 90 | 180 | 270, ctx: EngineContext) => Promise<Uint8Array>;
  redact: (documentId: string, regions: Array<{ page: number; x: number; y: number; width: number; height: number }>, ctx: EngineContext) => Promise<Uint8Array>;
  watermark: (documentId: string, text: string, ctx: EngineContext) => Promise<Uint8Array>;
  health?: (ctx: EngineContext) => Promise<EngineHealth>;
};

export class PdfEngine implements Engine<PdfOperation, unknown> {
  readonly name = 'pdf-engine';
  readonly version = '1.0.0';

  constructor(private readonly provider: PdfEngineProvider) {}

  async health(ctx?: EngineContext): Promise<EngineHealth> {
    if (this.provider.health) return this.provider.health(ctx ?? { requestId: crypto.randomUUID() });
    return { name: this.name, version: this.version, status: 'ready', checkedAt: new Date().toISOString(), detail: 'Provider adapter loaded' };
  }

  async execute(input: PdfOperation, ctx: EngineContext): Promise<unknown> {
    switch (input.op) {
      case 'inspect': return this.provider.inspect(input.documentId, ctx);
      case 'extract-text': return this.provider.extractText(input.documentId, input.page, ctx);
      case 'merge': return this.provider.merge(input.documentIds, ctx);
      case 'split': return this.provider.split(input.documentId, input.pages, ctx);
      case 'rotate': return this.provider.rotate(input.documentId, input.pages, input.degrees, ctx);
      case 'redact': return this.provider.redact(input.documentId, input.regions, ctx);
      case 'watermark': return this.provider.watermark(input.documentId, input.text, ctx);
      default: return assertNever(input);
    }
  }
}

function assertNever(value: never): never {
  throw new Error(`Unsupported PDF operation: ${JSON.stringify(value)}`);
}
