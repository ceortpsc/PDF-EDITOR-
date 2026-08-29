export type AiIntent = 'navigate' | 'document' | 'ocr' | 'convert' | 'form' | 'review' | 'security' | 'billing' | 'account' | 'template' | 'general';

export type AiDecision = {
  persona: "ANDREAA CHAN'NEL IMITATION";
  intent: AiIntent;
  confidence: number;
  route: string;
  goal: string;
  nextAction: string;
  requiresConfirmation: boolean;
  destructive: boolean;
};

const routes: Record<AiIntent, string> = {
  navigate: '/workspace',
  document: '/workspace/documents',
  ocr: '/workspace/ocr',
  convert: '/workspace/conversions',
  form: '/workspace/forms',
  review: '/workspace/review',
  security: '/workspace/security',
  billing: '/workspace/billing',
  account: '/workspace/account',
  template: '/workspace/templates',
  general: '/workspace',
};

const keywordMap: Array<[AiIntent, string[]]> = [
  ['ocr', ['ocr', 'scan', 'recognize text', 'text recognition']],
  ['convert', ['convert', 'export', 'docx', 'word', 'excel', 'powerpoint', 'ppt', 'pdf/a']],
  ['form', ['form', 'fillable', 'field', 'checkbox', 'signature']],
  ['review', ['comment', 'review', 'compare', 'highlight', 'markup']],
  ['security', ['redact', 'password protect', 'encrypt', 'permission', 'security']],
  ['billing', ['billing', 'subscription', 'invoice', 'trial', 'plan', 'checkout']],
  ['account', ['sign in', 'log in', 'password', 'account', 'profile']],
  ['template', ['template', 'starting point', 'document template']],
  ['document', ['document', 'pdf', 'edit', 'page', 'merge', 'split', 'rotate']],
  ['navigate', ['where', 'take me', 'open', 'go to', 'navigate']],
];

export function classifyIntent(message: string): AiIntent {
  const value = message.toLowerCase();
  for (const [intent, terms] of keywordMap) if (terms.some(term => value.includes(term))) return intent;
  return 'general';
}

export function decide(message: string): AiDecision {
  const intent = classifyIntent(message);
  const destructive = /delete|remove|redact|overwrite|archive|discard|cancel/i.test(message);
  return {
    persona: "ANDREAA CHAN'NEL IMITATION",
    intent,
    confidence: intent === 'general' ? 0.45 : 0.92,
    route: routes[intent],
    goal: message.trim(),
    nextAction: destructive ? 'Review proposed change and obtain explicit confirmation before execution.' : `Open ${routes[intent]} and present available actions.`,
    requiresConfirmation: destructive,
    destructive,
  };
}
