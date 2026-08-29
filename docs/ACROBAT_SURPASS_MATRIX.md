# Acrobat-Class Benchmark Matrix

This matrix defines the acceptance bar. It is a roadmap and test specification, not a claim that every capability is already implemented.

| Area | Ross PDF target | Acceptance evidence |
|---|---|---|
| PDF editing | Direct text/object editing | fixture-based visual/text diff |
| Forms | Rich field model + tab order + validation | round-trip form tests |
| OCR | searchable text + confidence review | corpus accuracy benchmark |
| Page operations | insert/delete/reorder/split/merge | deterministic fixture tests |
| Compare | visual + textual diff | pairwise regression suite |
| Review | comments/highlights/mentions | collaboration integration tests |
| Accessibility | tags/reading order/alt text | automated + manual WCAG review |
| Security | redaction/sanitization/audit | negative tests + security review |
| Conversion | office + HTML + PDF/A | fidelity corpus |
| Automation | batch/action graph/retries | idempotency + recovery tests |
| AI | intent, planning, navigation, tool routing | task benchmark + safety evals |
| Voice | voice-to-command workflow | transcription/command accuracy |
| SaaS | accounts, RBAC, billing, tenant isolation | auth/billing integration suite |
| UX | web-native responsive editor | task-completion and latency benchmark |

## Differentiators

- AI navigation and document-workflow planning embedded into every surface.
- Voice-driven document commands.
- 150 seeded templates.
- Multi-tenant SaaS administration.
- Explicit job observability and failure recovery.
- Vendor-neutral adapters for OCR/conversion/storage/identity.

A release may claim measured superiority only when the benchmark includes reproducible fixtures, comparable configurations, and recorded results.
