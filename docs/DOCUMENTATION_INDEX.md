# Master Documentation Index

## Product

- `README.md` — canonical product, architecture, operating model, environment, release, security, branding, and readiness reference.
- `docs/ARCHITECTURE_EXPANDED.md` — detailed logical layers, source-of-truth rules, API discipline, workers, scaling, security, and release evidence.
- `docs/QA_MATRIX_EXPANDED.md` — acceptance criteria, evidence schema, regression policy, and release decision model.
- `docs/PRODUCTION_RUNBOOK.md` — preflight, deployment, smoke tests, incident triage, rollback, and evidence capture.
- `docs/GIT_OPERATING_MODEL.md` — branching, commit standards, PR requirements, CI, deployment mapping, rollback, and secret policy.

## Branding

- `docs/BRANDING_ASSET_SPEC.md` — product asset requirements and global brand navigation rules.
- `docs/ROSS_GROUP_BRAND_SYSTEM.md` — corporate-family branding system.
- `apps/web/public/assets/` — product visual assets.

## Engineering surfaces

```text
apps/web               browser experience
packages/core          document/domain primitives
packages/ui            shared UI system
packages/ai            AI routing and tool policy
packages/pdf           PDF capability adapters
packages/forms         form schemas/validation
packages/jobs          asynchronous processing contracts
packages/security      security and audit primitives
packages/templates     seeded document template catalog
```

## Status discipline

Documentation describes intended behavior unless corresponding implementation and evidence exist. Use the repository's status vocabulary: Planned, Implemented, Validated, Verified, Operational.

## Change control

When a significant platform behavior changes, update the relevant documentation in the same feature branch and include the documentation change in the PR acceptance criteria.
