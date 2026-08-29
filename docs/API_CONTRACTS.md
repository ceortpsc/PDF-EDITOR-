# API Contracts

## Authentication
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/signin`
- `POST /api/v1/auth/recover`
- `POST /api/v1/auth/verify`

## Documents
- `POST /api/v1/documents/import`
- `GET /api/v1/documents`
- `GET /api/v1/documents/:id`
- `POST /api/v1/documents/:id/version`
- `POST /api/v1/documents/:id/export`

## Jobs
- `POST /api/v1/jobs/ocr`
- `POST /api/v1/jobs/conversion`
- `POST /api/v1/jobs/batch`
- `GET /api/v1/jobs/:id`

## Forms
- `POST /api/v1/forms`
- `POST /api/v1/forms/:id/fields`
- `PATCH /api/v1/forms/:id/fields/:fieldId`
- `POST /api/v1/forms/:id/validate`

## Review
- `POST /api/v1/reviews/comments`
- `POST /api/v1/reviews/highlights`
- `POST /api/v1/reviews/compare`

## AI
- `POST /api/v1/ai/assist`
- `POST /api/v1/ai/navigate`
- `POST /api/v1/ai/plan`
- `POST /api/v1/ai/execute`

## Billing
- `POST /api/v1/billing/checkout`
- `POST /api/v1/billing/portal`
- `POST /api/v1/billing/webhook`

## Job state contract

```json
{"status":"queued|running|succeeded|failed|cancelled","jobId":"job_...","progress":0}
```

All mutations must be idempotent where practical and return a correlation/request ID. Authentication and authorization are server-side responsibilities.
