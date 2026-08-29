import type { Engine, EngineContext, EngineHealth } from './types';

export class EngineRegistry {
  private readonly engines = new Map<string, Engine<any, any>>();

  register(engine: Engine<any, any>): this {
    if (this.engines.has(engine.name)) throw new Error(`Engine already registered: ${engine.name}`);
    this.engines.set(engine.name, engine);
    return this;
  }

  get<TInput = unknown, TOutput = unknown>(name: string): Engine<TInput, TOutput> {
    const engine = this.engines.get(name);
    if (!engine) throw new Error(`Engine not registered: ${name}`);
    return engine;
  }

  list(): string[] {
    return [...this.engines.keys()].sort();
  }

  async health(ctx?: EngineContext): Promise<EngineHealth[]> {
    return Promise.all([...this.engines.values()].map(engine => engine.health(ctx)));
  }

  async ready(ctx?: EngineContext): Promise<boolean> {
    const checks = await this.health(ctx);
    return checks.length > 0 && checks.every(item => item.status === 'ready');
  }
}
