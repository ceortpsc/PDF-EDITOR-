import type { ConversionInput, ConversionOutput, Engine, EngineContext, EngineHealth } from './types';

export type ConversionProvider = {
  supports: (sourceFormat: string, targetFormat: string) => boolean;
  convert: (input: ConversionInput, ctx: EngineContext) => Promise<ConversionOutput>;
  health?: (ctx: EngineContext) => Promise<EngineHealth>;
};

export class ConversionEngine implements Engine<ConversionInput, ConversionOutput> {
  readonly name = 'conversion-engine';
  readonly version = '1.0.0';

  constructor(private readonly providers: readonly ConversionProvider[]) {}

  async health(ctx?: EngineContext): Promise<EngineHealth> {
    const context = ctx ?? { requestId: crypto.randomUUID() };
    const checks = await Promise.all(this.providers.map(p =>
      p.health?.(context) ?? Promise.resolve({
        name: this.name,
        version: this.version,
        status: 'ready' as const,
        checkedAt: new Date().toISOString(),
      }),
    ));
    const failed = checks.find(c => c.status !== 'ready');
    return failed ?? { name: this.name, version: this.version, status: 'ready', checkedAt: new Date().toISOString(), detail: `${this.providers.length} adapter(s) available` };
  }

  async execute(input: ConversionInput, ctx: EngineContext): Promise<ConversionOutput> {
    const provider = this.providers.find(p => p.supports(input.sourceFormat, input.targetFormat));
    if (!provider) throw new Error(`Unsupported conversion: ${input.sourceFormat} -> ${input.targetFormat}`);
    const result = await provider.convert(input, ctx);
    if (result.bytes.byteLength === 0) throw new Error('Conversion provider returned empty output');
    return result;
  }
}
