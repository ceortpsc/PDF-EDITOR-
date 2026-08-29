import type { Engine, EngineContext, EngineHealth, OcrInput, OcrOutput } from './types';

export type OcrProvider = {
  recognize: (input: OcrInput, ctx: EngineContext) => Promise<OcrOutput>;
  health?: (ctx: EngineContext) => Promise<EngineHealth>;
};

export class OcrEngine implements Engine<OcrInput, OcrOutput> {
  readonly name = 'ocr-engine';
  readonly version = '1.0.0';

  constructor(private readonly provider: OcrProvider) {}

  async health(ctx?: EngineContext): Promise<EngineHealth> {
    if (this.provider.health) return this.provider.health(ctx ?? { requestId: crypto.randomUUID() });
    return { name: this.name, version: this.version, status: 'ready', checkedAt: new Date().toISOString(), detail: 'OCR provider adapter loaded' };
  }

  async execute(input: OcrInput, ctx: EngineContext): Promise<OcrOutput> {
    if (!input.bytes.byteLength) throw new Error('OCR input is empty');
    const result = await this.provider.recognize(input, ctx);
    if (result.confidence < 0 || result.confidence > 1) throw new Error('OCR provider returned invalid confidence');
    return result;
  }
}
