# Ross PDF Editor — Engine Room

## Purpose

This document defines production boundaries for the application's core processing systems. “Engines” are executable capabilities; “organs” are supporting subsystems; “brain” is the AI decision layer; “heart” is job orchestration and reliable event flow.

## System anatomy

```text
                    ┌─────────────────────────────┐
                    │ ANDREAA CHAN'NEL AI ASSIST │
                    │ reasoning + navigation       │
                    └──────────────┬──────────────┘
                                   │ governed tool call
                                   ▼
┌──────────────┐   ┌──────────────────────────────┐   ┌───────────────┐
│ Authentication│──▶│ Policy / Authorization       │◀──│ Billing/Usage  │
└──────────────┘   └──────────────┬───────────────┘   └───────────────┘
                                   │
                                   ▼
                         ┌──────────────────┐
                         │ Job Orchestrator  │
                         │ queue/retry/state │
                         └───────┬──────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             ▼                   ▼                   ▼
       ┌───────────┐       ┌───────────┐       ┌──────────────┐
       │ PDF Engine│       │ OCR Engine│       │ Conversion   │
       │ inspect   │       │ recognize │       │ Engine       │
       │ edit      │       │ confidence│       │ adapters     │
       │ pages     │       │ review    │       │ format graph │
       └───────────┘       └───────────┘       └──────────────┘
             │                   │                   │
             └───────────────────┼───────────────────┘
                                 ▼
                       ┌────────────────────┐
                       │ Storage + Versions │
                       │ hashes + retention │
                       └─────────┬──────────┘
                                 ▼
                          ┌───────────────┐
                          │ Audit / Events│
                          └───────────────┘
```

## PDF engine

`packages/engines/src/pdf-engine.ts` defines a provider-neutral adapter for document inspection, text extraction, page operations, merge/split, rotation, redaction, and watermarking. Concrete providers are injected rather than hard-coded, so the platform can use browser, server, or managed PDF engines without changing business workflows.

Security requirement: redaction must be implemented as content removal, not merely drawing a rectangle over text. Any production implementation must include regression fixtures that prove the redacted content cannot be extracted from the resulting file.

## OCR engine

`packages/engines/src/ocr-engine.ts` defines OCR execution with page-level results and a normalized confidence score from 0 to 1. The application should preserve source images, recognition text, confidence, language, provider version, and timestamp as separate metadata so OCR results remain reproducible and reviewable.

Production OCR pipeline:

1. Validate MIME type and size.
2. Scan file before processing.
3. Normalize pages/images.
4. Run OCR adapter.
5. Store text + confidence + provider version.
6. Route low-confidence pages to review.
7. Generate searchable output only after validation.
8. Record audit event.

## Conversion engine

`packages/engines/src/conversion-engine.ts` implements capability discovery and adapter selection. Providers advertise supported source/target formats. The engine rejects unsupported combinations and rejects empty output.

Expected format graph:

```text
PDF ─┬─ DOCX
     ├─ XLSX
     ├─ PPTX
     ├─ HTML
     └─ PDF/A

DOCX/XLSX/PPTX/images ──► PDF
```

Production quality gates should measure layout fidelity, font substitution, tables, images, hyperlinks, page count, metadata, and output validity.

## Heart: job orchestration

`packages/engines/src/job-engine.ts` owns deterministic asynchronous state transitions:

```text
queued → running → succeeded
                 ├→ failed → queued (retry)
                 └→ cancelled
```

Invalid transitions are rejected. Attempts and timestamps are recorded. Each job receives a unique ID and request context.

For distributed production, replace the in-memory map with a durable queue and database-backed state while preserving this contract.

## Brain: ANDREAA CHAN'NEL AI Assist

`packages/ai/src/agent.ts` provides deterministic intent classification and action planning. `packages/ai/src/navigation.ts` resolves user language to canonical product routes. `packages/ai/src/guardrails.ts` applies authentication, workspace scope, and confirmation policy before tool execution.

AI execution policy:

- Read-only actions can execute after authorization.
- Write actions require valid workspace scope.
- Destructive or external actions require explicit user confirmation.
- The AI must never fabricate completion, credentials, payment confirmation, or provider availability.
- Private reasoning is not exposed as chain-of-thought; users receive concise decision summaries and actionable next steps.

## Organs: supporting systems

- Identity and session management
- Tenant/organization isolation
- Billing and entitlement state
- Object storage and versioning
- Database persistence
- Audit/event stream
- Malware scanning
- Rate limiting
- Observability and tracing
- Notifications/email
- Accessibility validation
- Feature flags

## Production activation boundary

The repository contains the contracts, orchestration, validation, and routing layers. A capability is only marked `operational` after its concrete provider is installed, configured, exercised against real fixtures, and its health/functional tests pass.

This distinction prevents “seeded” interfaces from being mistaken for production-complete engines.
