# GitHub Actions & CI/CD Learning Summary

> A condensed summary of everything learned throughout the GitHub Actions learning roadmap. This document serves as a quick reference rather than a detailed guide.

---

# Learning Roadmap

```
CI/CD Fundamentals
        │
        ▼
GitHub Actions Basics
        │
        ▼
Workflow Architecture
        │
        ▼
Multiple Jobs
        │
        ▼
Artifacts
        │
        ▼
Variables & Secrets
        │
        ▼
Conditions
        │
        ▼
Matrix Builds
        │
        ▼
Caching
        │
        ▼
Reusable Workflows
        │
        ▼
Production CI Pipeline
        │
        ▼
Debugging
        │
        ▼
Advanced GitHub Actions
        │
        ▼
Docker (Next Step)
```

---

# What is CI/CD?

CI/CD automates repetitive software delivery tasks.

Instead of manually installing dependencies, running tests, and building applications after every change, GitHub Actions performs these tasks automatically.

### CI (Continuous Integration)

- Runs automatically after code changes.
- Installs dependencies.
- Runs tests.
- Builds the application.
- Prevents broken code from being merged.

### CD (Continuous Delivery / Deployment)

- Delivers or deploys validated code.
- Happens after successful CI.

---

# GitHub Actions Fundamentals

GitHub Actions is GitHub's automation platform.

Everything is defined inside YAML files located in:

```text
.github/workflows/
```

Basic architecture:

```text
Workflow
│
├── Job
│   ├── Step
│   ├── Step
│   └── Step
│
└── Job
```

### Core Components

| Component | Purpose |
|-----------|---------|
| Workflow | Entire automation process |
| Event | Trigger that starts a workflow |
| Job | Collection of related steps |
| Step | Individual command or action |
| Action | Reusable automation component |
| Runner | Virtual machine executing the workflow |

---

# Workflow Triggers

Common triggers learned:

```yaml
on:
  push:
```

```yaml
on:
  pull_request:
```

```yaml
on:
  workflow_dispatch:
```

Workflows only execute when their configured events occur.

---

# Git Workflow

Professional workflow:

```text
Create Branch
      │
      ▼
Make Changes
      │
      ▼
Commit
      │
      ▼
Push
      │
      ▼
Pull Request
      │
      ▼
Review
      │
      ▼
Merge
```

### Lesson Learned

CI should validate Pull Requests before code reaches the main branch.

---

# Multiple Jobs

Real workflows split responsibilities into separate jobs.

Example:

```text
Workflow
├── Lint
├── Test
└── Build
```

Benefits:

- Easier maintenance
- Faster execution
- Better debugging

---

# Job Dependencies

Jobs execute in parallel unless explicitly connected.

```yaml
needs: test
```

`needs` creates sequential execution.

---

# Job Isolation

Every job runs on a fresh virtual machine.

This means:

- Files are not shared.
- Dependencies are not shared.
- Environment changes are not shared.

This was one of the biggest concepts learned during the roadmap.

---

# Artifacts

Artifacts allow jobs to share files.

Example:

```text
Build
 │
 ▼
Upload Artifact
 │
 ▼
Deploy
```

Typical artifacts:

- dist/
- Build output
- Coverage reports
- Test reports

---

# Cache vs Artifact

| Cache | Artifact |
|--------|----------|
| Speeds future workflow runs | Shares files between jobs |
| Stores reusable dependencies | Stores generated output |
| Example: npm cache | Example: dist/ |

---

# Variables

Environment variables simplify workflow configuration.

```yaml
env:
  NODE_ENV: production
```

Useful for values reused throughout a workflow.

---

# Repository Variables

Store reusable non-sensitive values such as:

- Node version
- Application name
- Deployment region

---

# Secrets

Sensitive information should never be hardcoded.

Examples:

- API keys
- Database URLs
- Access tokens

Usage:

```yaml
${{ secrets.API_KEY }}
```

GitHub automatically masks secrets in logs.

---

# Conditions

Conditions make workflows smarter.

Example:

```yaml
if: github.ref == 'refs/heads/main'
```

Typical use cases:

- Deploy only from main
- Skip documentation-only changes
- Run deployment only after successful tests

---

# Matrix Strategy

Run the same workflow across multiple environments.

Example:

```text
Node 18
Node 20
Node 22
```

Benefits:

- Better compatibility
- Less duplicated YAML

---

# Caching

Caching speeds up workflows by reusing downloaded dependencies.

Examples:

- npm cache
- Package manager cache

---

# Reusable Workflows

Large organizations avoid duplicating workflows across repositories.

Reusable workflows provide:

- Consistency
- Easier maintenance
- Less duplication

---

# Production CI Pipeline

Typical production pipeline:

```text
Push / Pull Request
        │
        ▼
Checkout
        │
        ▼
Setup Runtime
        │
        ▼
Install Dependencies
        │
        ▼
Lint
        │
        ▼
Run Tests
        │
        ▼
Build
        │
        ▼
Upload Artifact
```

Every step has one responsibility.

---

# Debugging GitHub Actions

Typical debugging process:

```text
Workflow Failed
        │
        ▼
Open Workflow
        │
        ▼
Open Failed Job
        │
        ▼
Read Logs
        │
        ▼
Fix Problem
        │
        ▼
Re-run Workflow
```

Common failures:

- YAML indentation
- Wrong trigger
- Missing secrets
- Missing dependencies
- Branch conditions
- Permission issues

---

# Important Questions Answered

## Why use Pull Requests?

To validate code before merging.

---

## Why use `npm ci`?

Because it provides reproducible installations and is faster for CI.

---

## Why separate lint, test, and build?

For readability, maintainability, and easier debugging.

---

## Why don't jobs share files?

Each job runs on a different runner.

Artifacts solve this problem.

---

## Why isn't cache the same as artifacts?

Artifacts transfer workflow files.

Cache improves future workflow speed.

---

## Why didn't "Compare & Pull Request" appear?

Because Pull Requests compare branches.

Working directly on `main` leaves nothing to compare.

---

# Best Practices

- Keep workflows focused.
- Use meaningful workflow names.
- Prefer official GitHub Actions.
- Store secrets securely.
- Fail fast whenever possible.
- Separate CI and deployment workflows.
- Use caching to improve performance.
- Use artifacts to transfer build output.
- Keep YAML clean and readable.

---

# Challenges Faced

- Understanding GitHub Actions architecture.
- Understanding Pull Request workflow.
- Understanding Compare & Pull Request.
- Distinguishing artifacts from cache.
- Understanding runner isolation.
- Learning when to use variables versus secrets.
- Understanding `npm ci`.
- Visualizing workflow execution.

---

# Biggest Takeaways

- GitHub Actions is event-driven.
- Workflows contain jobs.
- Jobs contain steps.
- Every job runs on a fresh runner.
- Artifacts transfer files.
- Cache improves speed.
- Secrets protect sensitive information.
- CI validates code before merging.
- Professional workflows are modular.
- Reading logs is an essential debugging skill.

---

# What's Next?

The next learning roadmap naturally continues with Docker.

```
Docker Fundamentals
        │
        ▼
Dockerfile
        │
        ▼
Docker Compose
        │
        ▼
Container Registries
        │
        ▼
Deployments
        │
        ▼
Cloud Platforms
```

The biggest realization from this roadmap is that **GitHub Actions concepts remain the same** when moving to Docker—the workflow structure doesn't change, only the commands being executed.