# Ross PDF Universal Editor

**Intelligent Document Power** — an enterprise SaaS document workspace designed to exceed the baseline of legacy desktop PDF editors through a web-native, AI-assisted, workflow-first architecture.

> Product goal: surpass common Acrobat-class workflows in usability, automation, collaboration, AI assistance, template-driven production, accessibility, and SaaS operations. Feature parity is not claimed until each capability is independently implemented and validated.

## Architecture

- `apps/web` — public site, access gate, workspace, dashboards
- `packages/core` — document model, commands, history, permissions
- `packages/ui` — enterprise design system
- `packages/ai` — AI routing, navigation, tool policy, prompt contracts
- `packages/pdf` — PDF import/export adapter interfaces
- `packages/forms` — field schemas and validation
- `packages/jobs` — OCR/conversion/batch job contracts
- `packages/security` — redaction, metadata, audit contracts
- `packages/templates` — seeded 150-template catalog
- `docs` — blueprint, runbook, API contracts, QA, security, scaling

## Product surfaces

Home, Pricing, Sign Up, Sign In, Recovery, Onboarding, Workspace, Documents, Forms, OCR, Pages, Review, Accessibility, Security, Conversions, Automations, Templates, Account, Billing, Admin, Developer Console, AI Assist.

## Enterprise design principles

1. Server-authoritative permissions and billing.
2. Explicit asynchronous job states: `queued`, `running`, `succeeded`, `failed`, `cancelled`.
3. No false-success UI.
4. Audit important mutations.
5. Treat uploaded documents as untrusted until validated/scanned.
6. Separate public marketing content from authenticated document data.
7. Use capability adapters so vendors can be replaced without rewriting product workflows.

## Local development

```bash
npm install
npm run dev
npm run build
npm test
```

## Environment

Copy `.env.example` to your deployment secret manager. Never commit production credentials.

## Deployment

Primary target: Vercel. GitHub repository: `ceortpsc/PDF-EDITOR-`.

Recommended environments:

- `main` → production
- `develop` → staging
- `feature/*` → preview

## Branding/IP

Product owner: Ross Tax Pro Software Co. All application branding, original UI, code, documentation, and original assets should be maintained under the company's applicable intellectual-property and copyright policies.

## Safety and authenticity

Government and identity documents are supported as editing/reference workflows but must not be presented as authentic government-issued credentials when the system is creating a transcription, mockup, or reference artifact.
