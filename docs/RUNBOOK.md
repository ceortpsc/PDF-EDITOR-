# Production Runbook

## 0. Release gates
- Build succeeds.
- Unit/component tests pass.
- Security scan has no blocking findings.
- Auth routes tested.
- Upload quarantine and file validation tested.
- PDF rendering/export adapter tested against fixtures.
- OCR/conversion workers tested with representative documents.
- Stripe webhook signature verification tested in test mode.
- Accessibility smoke test completed.
- Rollback target identified.

## 1. Deploy
1. Merge approved release branch into `main`.
2. Vercel builds production deployment.
3. Verify health endpoint.
4. Verify homepage HTTP 200.
5. Verify static assets and favicon.
6. Verify API routes.

## 2. Operational health
Monitor error rate, p95 latency, function duration, queue depth, worker failures, object-storage failures, database saturation, AI latency and billing webhook lag.

## 3. Incident response
- P0: authentication outage, cross-tenant data exposure, payment corruption, destructive document corruption.
- P1: major conversion/OCR outage or widespread editor failure.
- P2: degraded non-critical feature.

For P0/P1: freeze releases, capture correlation IDs, inspect logs, identify last good deployment, rollback, then investigate root cause.

## 4. Rollback
Use the last known-good Vercel deployment. Preserve the failed deployment for forensic review. Do not delete evidence before the incident record is complete.

## 5. Database changes
Use forward-only migrations for production. Never run destructive schema changes without backup and rollback planning.

## 6. Billing incidents
Never infer entitlement from frontend state. Reconcile from verified Stripe events and the authoritative subscription record.

## 7. Security incidents
Rotate compromised credentials, invalidate affected sessions, isolate affected objects, preserve audit events, and document the incident.

## 8. Performance target
Fast path: static shell at edge, route-level code splitting, aggressive immutable-asset caching, async workers for CPU-heavy operations, and streaming status for long-running jobs.
