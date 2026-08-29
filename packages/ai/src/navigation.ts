export type NavigationNode = {
  id: string;
  label: string;
  path: string;
  keywords: readonly string[];
};

export const NAVIGATION: readonly NavigationNode[] = [
  { id: 'home', label: 'Home', path: '/', keywords: ['home', 'landing', 'start'] },
  { id: 'workspace', label: 'Workspace', path: '/workspace', keywords: ['workspace', 'editor', 'document'] },
  { id: 'documents', label: 'Documents', path: '/workspace/documents', keywords: ['documents', 'files', 'library'] },
  { id: 'forms', label: 'Forms', path: '/workspace/forms', keywords: ['forms', 'fillable', 'fields'] },
  { id: 'ocr', label: 'OCR', path: '/workspace/ocr', keywords: ['ocr', 'scan', 'recognize'] },
  { id: 'pages', label: 'Pages', path: '/workspace/pages', keywords: ['pages', 'merge', 'split', 'rotate'] },
  { id: 'review', label: 'Review', path: '/workspace/review', keywords: ['review', 'comment', 'compare', 'markup'] },
  { id: 'accessibility', label: 'Accessibility', path: '/workspace/accessibility', keywords: ['accessibility', 'tags', 'alt text', 'reading order'] },
  { id: 'security', label: 'Security', path: '/workspace/security', keywords: ['security', 'redact', 'permissions', 'metadata'] },
  { id: 'conversions', label: 'Conversions', path: '/workspace/conversions', keywords: ['convert', 'word', 'excel', 'ppt', 'pdf/a'] },
  { id: 'automations', label: 'Automations', path: '/workspace/automations', keywords: ['automations', 'batch', 'workflow', 'schedule'] },
  { id: 'templates', label: 'Templates', path: '/workspace/templates', keywords: ['template', 'templates'] },
  { id: 'account', label: 'Account', path: '/workspace/account', keywords: ['account', 'profile', 'sessions'] },
  { id: 'billing', label: 'Billing', path: '/workspace/billing', keywords: ['billing', 'subscription', 'trial', 'invoice'] },
  { id: 'admin', label: 'Admin', path: '/admin', keywords: ['admin', 'administrator', 'tenant', 'users', 'health'] },
  { id: 'ai', label: "ANDREAA CHAN'NEL AI Assist", path: '/workspace/ai', keywords: ['ai', 'assistant', 'reasoning', 'navigate', 'help'] },
];

export function resolveNavigation(query: string): NavigationNode {
  const value = query.toLowerCase().trim();
  const exact = NAVIGATION.find(node => node.id === value || node.label.toLowerCase() === value || node.path === value);
  if (exact) return exact;
  return NAVIGATION.find(node => node.keywords.some(keyword => value.includes(keyword))) ?? NAVIGATION[1];
}
