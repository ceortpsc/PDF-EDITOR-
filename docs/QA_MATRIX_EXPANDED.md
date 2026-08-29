# QA and Verification Matrix — Ross PDF Universal Editor

## Status vocabulary

- **Planned** — defined but not implemented.
- **Implemented** — code exists.
- **Validated** — automated/manual test passes.
- **Verified** — runtime behavior and evidence confirmed.
- **Operational** — verified and approved for the intended environment.

## Core matrix

| Area | Acceptance criteria | Evidence |
|---|---|---|
| Homepage | `/` returns successful HTML and renders primary CTA | deployment smoke test |
| Branding | Logo loads, is keyboard reachable, and links to `/` | browser test |
| Navigation | Module navigation opens expected state/route | e2e test |
| Upload | Local file selection and drag/drop are handled without false success | e2e test |
| Documents | Create/import/version/share/archive transitions are deterministic | integration tests |
| Forms | Field schema validates and tab order is deterministic | unit + e2e |
| OCR | Job moves through queued/running/succeeded/failed and output is validated | worker + fixture tests |
| Pages | Insert/delete/reorder/rotate/split/merge preserve expected page ordering | fixture tests |
| Review | Comments/highlights/compare produce persistent review state | integration tests |
| Accessibility | Keyboard focus, labels, structure checks and reading-order workflows are testable | accessibility suite |
| Security | Redaction/metadata/security operations are permissioned and auditable | security tests |
| Conversion | Supported adapters produce validated outputs or explicit failures | conversion fixtures |
| Automation | Retries/idempotency prevent duplicate work | worker tests |
| Templates | Catalog loads and selected template has expected schema/metadata | seed + e2e |
| Authentication | Supported sign-in/sign-up/recovery provider behavior works in target environment | identity integration tests |
| Billing | Checkout/webhook/subscription state is reconciled against Stripe | integration + webhook evidence |
| AI Assist | Intent/navigation/reasoning output stays inside declared capability boundaries | contract + e2e |
| Admin | RBAC prevents unauthorized operations and records sensitive mutations | authorization tests |
| Performance | Initial shell remains responsive while heavy work is asynchronous | performance evidence |
| Deployment | CI green, Vercel deployment healthy, health endpoint returns success | CI/deployment record |

## Regression policy

Any production defect should gain a deterministic regression test before the fix is promoted, unless the defect is configuration-only and the operational evidence is retained.

## Evidence record schema

```json
{
  "commitSha": "",
  "branch": "",
  "deploymentId": "",
  "environment": "",
  "timestamp": "",
  "ci": "",
  "smoke": "",
  "providerChecks": [],
  "reviewer": ""
}
```

## Release decision

Do not infer operational readiness from a documentation page or a green build alone. The final decision requires implementation status, passing tests, runtime verification, and retained evidence for the target environment.
