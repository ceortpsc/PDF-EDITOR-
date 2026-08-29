export type ToolRisk = 'read' | 'write' | 'destructive' | 'external';

export type ToolRequest = {
  name: string;
  risk: ToolRisk;
  authenticated: boolean;
  hasDocumentScope: boolean;
  approved: boolean;
};

export type ToolDecision = { allowed: boolean; reason: string };

export function authorizeTool(request: ToolRequest): ToolDecision {
  if (!request.authenticated) return { allowed: false, reason: 'Authentication required' };
  if (!request.hasDocumentScope) return { allowed: false, reason: 'Document/workspace scope required' };
  if ((request.risk === 'destructive' || request.risk === 'external') && !request.approved) {
    return { allowed: false, reason: 'Explicit user confirmation required' };
  }
  return { allowed: true, reason: 'Policy checks passed' };
}

export function shouldConfirmAction(action: string): boolean {
  return /delete|remove|redact|overwrite|archive|cancel|send|publish|charge|purchase/i.test(action);
}
