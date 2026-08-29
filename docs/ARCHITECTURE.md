# Enterprise Architecture

## System map

```text
Browser/PWA
  -> CDN / Edge
  -> Web application
  -> Auth + RBAC
  -> API
     -> PostgreSQL (transactional state)
     -> Object storage (originals/versions/exports)
     -> Queue
        -> OCR workers
        -> Conversion workers
        -> Batch workers
     -> AI orchestration
     -> Stripe billing/webhooks
     -> Audit event stream
  -> Observability
```

## Performance

- Ship a small HTML shell and progressively load workspace modules.
- Use route-level code splitting for heavy editor/conversion features.
- Keep document processing asynchronous and stream job status.
- Cache immutable assets at the edge.
- Avoid blocking page load on OCR, conversion or AI services.
- Use idempotency keys for writes.
- Autoscale workers independently from the web tier.

## Document security

Treat every upload as untrusted input. Validate MIME/type, file size, page count, content signatures, archive nesting and malware state before persistence or processing. Keep original and derived artifacts separated.

## AI orchestration

`user intent -> context retrieval -> authorization -> tool plan -> confirmation for destructive actions -> execution -> result -> audit`.

The AI system exposes decision summaries rather than private chain-of-thought.

## Vendor-neutral adapters

PDF parsing/rendering, OCR, conversion, speech recognition, storage and identity are adapter interfaces. Provider-specific implementations live behind these interfaces to prevent lock-in.

## Acrobat-surpass strategy

Use Acrobat as a feature benchmark, not an implementation dependency. Differentiators are web-native collaborative editing, AI navigation/reasoning, voice-to-workflow, 150+ seeded templates, programmable automations, explicit job observability, multi-tenant controls and audit-first operations. Any claim of superiority requires measured benchmark evidence.
