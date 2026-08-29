# Production Runbook — Ross PDF Universal Editor

## Objective

Provide repeatable procedures for deploying, validating, operating, recovering, and evidencing the SaaS platform.

## Environments

| Environment | Branch | Purpose |
|---|---|---|
| Local | developer branch | Development and fixture testing |
| Preview | `feature/*` / PR | Review and pre-merge validation |
| Staging | `develop` | Provider-backed integration testing |
| Production | `main` | Customer traffic |

## Release sequence

```text
Requirement
  ↓
Feature branch
  ↓
Code + tests
  ↓
Preview deployment
  ↓
CI
  ↓
Review
  ↓
Staging
  ↓
Release candidate
  ↓
Production
  ↓
Health verification
  ↓
Evidence record
```

## Preflight

Confirm:

- commit SHA is known
- working tree is clean for the release commit
- CI is green
- required environment variables exist in the correct environment
- database migrations are reviewed
- storage buckets/containers exist
- Stripe endpoints are configured for the intended environment
- authentication callback URLs match the environment
- OCR/conversion providers are healthy
- monitoring and alerting are active
- rollback target is documented

## Production smoke test

1. Load homepage.
2. Confirm HTTPS and static assets.
3. Click the logo and confirm `/` navigation.
4. Open sign-in.
5. Verify signup route and onboarding contract.
6. Open workspace.
7. Test local file selection.
8. Test drag-and-drop intake.
9. Open each major module.
10. Open AI Assist.
11. Verify health endpoint.
12. Test billing only in the correct Stripe mode.

## Health endpoint

Expected response shape:

```json
{
  "ok": true,
  "service": "ross-pdf-universal-editor",
  "environment": "production"
}
```

## Incident triage

### Frontend 404

Check deployment URL, deployment status, build output, Vercel routing, static output configuration, and whether `index.html` exists in the deployed artifact.

### API 5xx

Capture endpoint, timestamp, deployment ID, request correlation data, and provider response. Confirm required environment variables before making code changes.

### Authentication failure

Verify provider status, callback/redirect URIs, cookie/session configuration, and environment-specific secrets. Never disable security controls to bypass an authentication incident.

### Stripe incident

Verify webhook delivery, signature validation, idempotency state, Stripe event ID, application subscription state, and entitlement records. Reconcile against Stripe as the billing source of truth.

### OCR/conversion incident

Track the job ID, source object ID, adapter/provider, job state, retry count, and output validation. Do not mark a failed or unverified conversion as successful.

## Rollback

1. Identify last known-good deployment.
2. Confirm it corresponds to a known-good commit.
3. Stop further promotion.
4. Roll back through the deployment platform.
5. Verify homepage, health endpoint, authentication, and critical workflows.
6. Record incident and rollback evidence.

## Post-incident

Document:

- impact
- timeline
- root cause
- triggering change
- containment
- rollback/repair
- customer impact
- preventive action
- test added to prevent recurrence

## Evidence record

Every production release should produce a durable record containing commit SHA, deployment ID, URL, environment, CI result, smoke-test result, timestamp, and operator/reviewer information.
