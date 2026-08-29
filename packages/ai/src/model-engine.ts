export type ModelMessage = { role: 'system' | 'user' | 'assistant' | 'tool'; content: string };

export type ModelRequest = {
  messages: readonly ModelMessage[];
  model: string;
  temperature?: number;
  maxTokens?: number;
};

export type ModelResponse = {
  text: string;
  model: string;
  usage?: { inputTokens?: number; outputTokens?: number };
  finishReason?: string;
};

export type ModelProvider = {
  name: string;
  complete(request: ModelRequest): Promise<ModelResponse>;
  stream?: (request: ModelRequest, onToken: (token: string) => void) => Promise<void>;
  health?: () => Promise<{ status: 'ready' | 'degraded' | 'offline'; detail?: string }>;
};

export class ModelEngine {
  constructor(private readonly providers: readonly ModelProvider[]) {}

  select(preferred?: string): ModelProvider {
    if (preferred) {
      const exact = this.providers.find(provider => provider.name === preferred);
      if (exact) return exact;
    }
    const provider = this.providers[0];
    if (!provider) throw new Error('No AI model provider configured');
    return provider;
  }

  async complete(request: ModelRequest, preferred?: string): Promise<ModelResponse> {
    return this.select(preferred).complete(request);
  }

  async stream(request: ModelRequest, onToken: (token: string) => void, preferred?: string): Promise<void> {
    const provider = this.select(preferred);
    if (!provider.stream) {
      const result = await provider.complete(request);
      onToken(result.text);
      return;
    }
    await provider.stream(request, onToken);
  }

  async health(): Promise<Array<{ provider: string; status: string; detail?: string }>> {
    return Promise.all(this.providers.map(async provider => ({
      provider: provider.name,
      ...(await provider.health?.() ?? { status: 'ready', detail: 'Provider registered' }),
    })));
  }
}
