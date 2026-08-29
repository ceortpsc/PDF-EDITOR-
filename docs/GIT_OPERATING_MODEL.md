# Git Operating Model

## Purpose

This document defines the repository workflow for controlled development, preview deployment, staging validation, production promotion, rollback, and evidence capture.

## Repository

- Repository: `ceortpsc/PDF-EDITOR-`
- Primary feature branch: `feature/acrobat-surpass-foundation`
- Production branch: `main`
- Staging branch: `develop`

## Branch taxonomy

```text
main                    Production
│
├── develop              Staging integration
│
├── feature/*            Product features
├── fix/*                Defect repair
├── chore/*              Maintenance/tooling
└── release/*            Release preparation
```

## Commit standards

Use imperative commit titles with a focused scope:

```text
feat: add document comparison workflow
fix: correct upload validation state
refactor: isolate conversion adapter contract
docs: expand production runbook
test: add OCR regression fixtures
chore: update build tooling
```

A commit should be small enough to review and specific enough to revert.

## Pull request requirements

Every PR should include:

1. Problem statement.
2. Scope and non-scope.
3. Files/modules changed.
4. Data/API changes.
5. Security implications.
6. Test evidence.
7. Deployment impact.
8. Rollback plan.
9. Known limitations.
10. Evidence links where available.

## CI gate

The baseline CI pipeline is expected to run installation, build, and tests. Expanded gates should add type validation, linting, accessibility checks, contract checks, and production smoke tests.

## Vercel mapping

```text
feature/* → Preview Deployment
     ↓
PR review + CI
     ↓
develop → Staging
     ↓
release gate
     ↓
main → Production
```

## Commit evidence

For each release candidate record:

```text
commit SHA
branch
PR number
build result
test result
deployment ID
deployment URL
environment
timestamp
operator/reviewer
rollback target
```

## Deployment rule

A green build is not by itself proof of runtime correctness. Production claims require runtime verification of the deployed application and the connected provider services.

## Rollback

Prefer a reversible deployment strategy. Keep the last known-good production deployment identified in the release record. Roll back when the incident is materially safer to contain than to repair forward.

## Secret policy

Production credentials do not belong in Git. Use Vercel Environment Variables or an approved secret manager. Do not paste credentials into issues, PRs, logs, documentation, screenshots, or source code.
