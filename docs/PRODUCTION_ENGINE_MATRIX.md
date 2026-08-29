# Production Engine Matrix

| Domain | Engine | Contract | Provider binding | Durable state | Acceptance gate |
|---|---|---|---|---|---|
| PDF | `pdf-engine` | inspect/extract/merge/split/rotate/redact/watermark | required | job + version | output opens; page/content assertions; redaction extraction test |
| OCR | `ocr-engine` | page text + confidence | required | job + OCR result | fixture accuracy + confidence bounds |
| Conversion | `conversion-engine` | format graph | required | job + artifact | target MIME/format valid; fidelity fixtures |
| Jobs | `job-engine` | queued/running/succeeded/failed/cancelled | queue adapter | required | invalid transition rejection; retry accounting |
| AI | `ModelEngine` | completion/stream/health | required | conversation + audit | provider health; policy gate; no false-success |
| AI reasoning | `decide` | intent/route/next action | internal | audit | deterministic classification fixtures |
| Navigation | `resolveNavigation` | query → canonical route | internal | none | route resolution fixtures |
| Tool policy | `authorizeTool` | identity/scope/approval → allow/deny | internal | audit | destructive/external approval required |

## Operational status model

`designed` → `implemented` → `provider-configured` → `fixture-tested` → `runtime-verified` → `operational`

No UI should display `operational` until all required gates pass.

## PDF engine production gates

1. Parser/load succeeds for supported PDF versions and malformed-file failures are controlled.
2. Text extraction matches fixture baselines.
3. Page count and geometry remain stable after page operations.
4. Merge/split produce valid PDFs.
5. Redaction removes underlying content and metadata where applicable.
6. Output hashes are recorded for reproducibility.
7. Engine health exposes provider and version.

## OCR production gates

1. File validated and malware-scanned before OCR.
2. Page images normalized to supported resolution/color mode.
3. OCR output includes page boundaries and confidence.
4. Low-confidence pages routed to human review.
5. Searchable PDF generation occurs only after successful result validation.
6. Provider/model/language metadata recorded.

## Conversion production gates

1. Source/target pair supported by an installed adapter.
2. Conversion runs asynchronously for expensive jobs.
3. Output is non-empty and format-valid.
4. Fidelity fixtures cover tables, images, fonts, links, page breaks, headers/footers, and long documents.
5. Failed conversions retain actionable diagnostics without exposing source content in logs.

## AI production gates

1. Model provider configured through secret manager.
2. Tool list is capability-based and server-authorized.
3. Destructive/external actions require explicit confirmation.
4. User-facing responses distinguish plan from completed execution.
5. Sensitive data is not written to telemetry by default.
6. Model/version/latency/token usage are observable without capturing raw document content unless explicitly permitted.

## Deployment rule

Vercel can build and deploy the web shell from Git. Provider-backed engines may require dedicated worker/runtime infrastructure because CPU-heavy OCR and document conversion workloads should not be treated as ordinary interactive page requests. Use durable queues and isolated workers for long-running jobs. Vercel's monorepo model supports separate apps/projects and independent environments; keep heavy processing services separately deployable while sharing contracts. See the repository runbook for the final topology.
