# Ross PDF Documentation Index

## Product
- [README](../README.md)
- [Architecture](./ARCHITECTURE.md)
- [API Contracts](./API_CONTRACTS.md)
- [Runbook](./RUNBOOK.md)
- [Capability Registry](../packages/core/src/capabilities.ts)
- [Template Catalog](../packages/templates/src/catalog.ts)

## Delivery sequence
1. Product blueprint and information architecture.
2. Environment/secret configuration in the deployment secret manager.
3. Core application and UI packages.
4. PDF/form/OCR/conversion adapters.
5. Authentication and billing providers.
6. Worker/queue integration.
7. Automated tests and security scanning.
8. Staging verification.
9. Production deployment and smoke tests.

## Evidence policy
A capability is `implemented` only when code exists, automated tests cover it, and the runtime path has been verified. A capability is `planned` when contracts/docs exist but the provider/runtime implementation is absent. Never mark a planned capability as operational.
