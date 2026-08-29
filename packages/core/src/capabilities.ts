export const capabilities = {
  workspace: ['canvas','selection','snapGrid','smartGuides','undoRedo','compare','splitView','overlayView','printExport'],
  documents: ['import','versioning','folders','metadata','sharing','retention'],
  forms: ['text','checkbox','radio','dropdown','date','signature','validation','tabOrder','mapping'],
  ocr: ['jobQueue','textLayer','confidenceReview','searchablePdf'],
  pages: ['insert','delete','reorder','rotate','extract','split','merge'],
  review: ['comments','mentions','highlight','stamp','draw','compare','resolve'],
  accessibility: ['tags','readingOrder','altText','contrast','validation'],
  security: ['redaction','metadataScrub','permissions','audit','encryptionHooks'],
  conversions: ['pdfWord','pdfExcel','pdfPpt','pdfHtml','pdfA','docxPdf','imagePdf'],
  automations: ['batch','schedules','retries','webhooks','actionChains'],
  account: ['signup','signin','recovery','verification','mfa','sessions','organizations','rbac'],
  billing: ['trial','subscriptions','checkout','invoices','portal','cancellation'],
  ai: ['navigation','intentClassification','workflowPlanning','toolRouting','decisionSummaries','voiceInput']
} as const;

export type CapabilityKey = keyof typeof capabilities;
