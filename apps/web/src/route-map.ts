export const routes = {
  home: '/', signup: '/signup', signin: '/signin', recover: '/recover', onboarding: '/onboarding',
  workspace: '/workspace', documents: '/documents', forms: '/forms', ocr: '/ocr', pages: '/pages', review: '/review',
  accessibility: '/accessibility', security: '/security', conversions: '/conversions', automations: '/automations',
  templates: '/templates', account: '/account', billing: '/billing', admin: '/admin', developer: '/developer-console'
} as const;
export const ctas = {
  startTrial: {label:'Start Free Trial', href:routes.signup+'?plan=trial'},
  signIn: {label:'Sign In', href:routes.signin},
  upload: {label:'Upload a Document', href:routes.workspace+'?intent=upload'},
  convert: {label:'Convert a File', href:routes.conversions},
  enterprise: {label:'Request Enterprise Access', href:routes.admin+'?intent=enterprise'},
  pricing: {label:'View Plans', href:routes.billing},
  ai: {label:'Ask ANDREAA AI', href:routes.workspace+'?panel=ai'}
} as const;
