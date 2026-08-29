# Engine Runtime Runbook

## Scope

Production runtime for Ross PDF Editor. This runbook covers the engine layer underneath the browser workspace.

## Startup order

1. Load and validate environment configuration.
2. Establish database/storage connectivity.
3. Establish queue/worker connectivity.
4. Register PDF, OCR, and conversion adapters.
5. Register AI model provider and tool policy.
6. Run engine health checks.
7. Accept interactive traffic only when required dependencies are healthy.

## Engine health contract

Every engine exposes:

```json
{
  "name": "string",
  "version": "string",
  "status": "ready | degraded | offline",
  "checkedAt": "ISO-8601",
  "latencyMs": 0,
  "detail": "string"
}
```

The deployment health endpoint should aggregate these checks. `ready` means dependency connectivity and a known-good provider adapter are present; it does not mean every feature has passed all fixture suites.

## PDF runtime

Inputs are untrusted. Validate extension/MIME, size, signature, and scan before dispatch. Create a durable job record for long-running operations. Preserve original object separately from derived versions.

Required metadata:

- document ID
- tenant ID
- actor ID
- source hash
- engine/provider name
- engine/provider version
- operation
- created timestamp
- output hash
- audit event ID

## OCR runtime

OCR must run asynchronously for production-scale workloads. Persist page-level text and confidence. Route confidence below the configured threshold to review instead of silently declaring success.

## Conversion runtime

Select adapter from source/target capability graph. Reject unsupported pairs. Write results atomically: temporary object → validation → final object/version. Never replace a source document in-place during a conversion job.

## AI runtime

AI has two stages:

```text
intent → plan → policy → confirmation (when required) → tool execution → result → audit
```

Model output is advisory until a server-authorized tool executes. User-visible text must distinguish:

- proposed action
- accepted action
- running action
- completed action
- failed action

The assistant must not claim a payment, conversion, deletion, upload, or external action happened before server confirmation.

## Retry policy

Recommended defaults:

- transient network/provider error: retry with exponential backoff
- validation error: fail without retry
- authorization error: fail without retry
- malformed document: fail and preserve diagnostic code
- provider quota: retry only when provider response indicates retryable capacity

Record attempt count and final error class.

## Performance targets

The web shell should remain interactive while heavy processing moves to workers. Keep request handlers short; enqueue large files and expensive conversion/OCR work. Cache immutable derived artifacts by content hash when permitted. Use content-addressed or deterministic cache keys to prevent duplicate work.

## Security controls

- secrets only from environment/secret manager
- no secret values in Git
- no raw document contents in ordinary logs
- tenant authorization before every document operation
- signed webhook verification before billing state mutations
- idempotency keys for externally triggered mutations
- immutable audit events for sensitive operations

## Operational states

```text
designed
implemented
provider-configured
fixture-tested
runtime-verified
operational
degraded
offline
```

Only `operational` should be used for a capability that has completed provider configuration, fixture testing, and runtime verification.

## Vercel topology

Use Vercel for interactive web/application delivery. Use dedicated worker infrastructure for CPU/memory-intensive OCR and document conversions when the workload exceeds the safe limits of request-oriented functions. Keep engine contracts shared with the web application so providers can scale independently.

## Rollback

1. Stop accepting new jobs for affected engine.
2. Allow running jobs to finish or mark them retryable.
3. Repoint feature flag/provider selector to last known-good provider.
4. Restore prior deployment.
5. Re-run health and fixture smoke suite.
6. Preserve failed-job evidence for root-cause analysis.
