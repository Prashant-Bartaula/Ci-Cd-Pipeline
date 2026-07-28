# Day 2 - Building Professional CI Pipelines

> **Learning Goal:** Learn how real-world CI pipelines are structured using multiple jobs, artifacts, variables, conditions, and reusable workflows.

---

# Topics Covered

- Multiple Jobs
- Job Dependencies (`needs`)
- Parallel vs Sequential Execution
- Job Isolation
- Artifacts
- Cache vs Artifacts
- Environment Variables
- Repository Variables
- Secrets
- Conditions & Expressions
- Matrix Strategy
- Caching
- Reusable Workflows (Overview)

---

# Learning Objectives

By the end of Day 2, I should be able to:

- Split a workflow into multiple jobs.
- Control job execution order.
- Understand why jobs don't share data.
- Share files using artifacts.
- Store sensitive data securely using secrets.
- Run workflows conditionally.
- Test across multiple environments with matrix builds.
- Improve workflow performance using caching.

---

# 1. Multiple Jobs

In Day 1, workflows contained only a single job.

Professional projects split work into multiple independent jobs.

Example:

```text
Workflow
├── Lint
├── Test
└── Build
```

Each job has a single responsibility, making workflows easier to understand and maintain.

---

# 2. Job Dependencies (`needs`)

Jobs run **in parallel by default**.

When one job depends on another, GitHub Actions provides the `needs` keyword.

Example:

```yaml
jobs:
  test:
    ...

  build:
    needs: test
```

### What I learned

- Without `needs`, jobs execute independently.
- `needs` forces GitHub to wait until another job completes successfully.
- If the required job fails, dependent jobs are skipped.

---

# 3. Parallel vs Sequential Execution

### Parallel Execution

```text
Workflow

├── Lint
├── Test
└── Build
```

All jobs start at the same time.

Best when jobs are independent.

---

### Sequential Execution

```text
Lint
 │
 ▼
Test
 │
 ▼
Build
```

Each job waits for the previous one.

Useful when later jobs require successful results from earlier jobs.

---

# Challenge Faced: Why Doesn't Everything Stay in One Job?

Initially, it seemed easier to place every command inside one job.

### Lesson Learned

Splitting jobs provides:

- Better readability
- Faster execution
- Easier debugging
- Clear separation of responsibilities

---

# 4. Job Isolation

One of the biggest concepts learned today.

Every job runs on a **fresh runner**.

This means:

- Files are not shared.
- Installed packages are not shared.
- Environment changes are not shared.

Each job starts with a clean virtual machine.

### Why?

Isolation guarantees consistent and reproducible builds.

---

# Challenge Faced: Why Can't Another Job See My Build?

This was confusing at first.

Even though two jobs belong to the same workflow, they execute on different runners.

Anything created in one job disappears unless explicitly shared.

This naturally introduced artifacts.

---

# 5. Artifacts

Artifacts allow files to be transferred between jobs.

Example flow:

```text
Build Job
    │
    ▼
Upload Artifact
    │
    ▼
Test / Deploy Job
    │
    ▼
Download Artifact
```

Common artifact examples:

- Production build (`dist/`)
- Test reports
- Coverage reports
- Logs

---

# Challenge Faced: Artifact vs Cache

Initially these seemed identical.

### Artifact

- Used to share generated files.
- Exists only for the workflow.

Examples:

- `dist/`
- Test reports
- Build output

---

### Cache

- Used to speed up future workflow runs.
- Stores reusable dependencies.

Examples:

- `node_modules`
- npm cache

### Key Difference

Artifacts transfer files **between jobs**.

Caches speed up **future workflow executions**.

---

# 6. Environment Variables

Instead of hardcoding repeated values, workflows can use environment variables.

Example:

```yaml
env:
  NODE_ENV: production
```

Benefits:

- Easier maintenance
- Cleaner workflows
- Less duplication

---

# 7. Repository Variables

Repository Variables store values shared across workflows.

Useful for:

- Node version
- Application name
- Region
- Deployment configuration

Unlike secrets, repository variables are **not sensitive**.

---

# 8. Secrets

Sensitive values should never be hardcoded.

GitHub Secrets securely store information such as:

- API keys
- Database URLs
- Tokens
- Passwords

Example:

```yaml
${{ secrets.API_KEY }}
```

### Key Lesson

GitHub automatically masks secrets in workflow logs to prevent accidental exposure.

---

# 9. Conditions

Not every job should run every time.

Conditions allow workflows to become smarter.

Example:

```yaml
if: github.ref == 'refs/heads/main'
```

Possible use cases:

- Deploy only from `main`
- Skip jobs for documentation changes
- Run deployment only if tests succeed

---

# 10. Matrix Strategy

Instead of writing multiple similar jobs, GitHub can generate them automatically.

Example:

```text
Node 18
Node 20
Node 22
```

The same workflow runs against multiple environments.

### Benefits

- Better compatibility testing
- Less duplicated YAML
- Easier maintenance

---

# 11. Caching

Installing dependencies every workflow run is slow.

Caching stores reusable dependencies.

Typical examples:

- npm cache
- Package manager cache

### Benefits

- Faster builds
- Reduced download time
- Lower CI execution time

---

# 12. Reusable Workflows (Overview)

Large projects often have many repositories.

Instead of copying the same workflow everywhere, workflows can be reused.

Benefits:

- Less duplication
- Easier updates
- Consistent CI across projects

This was introduced as an awareness topic and will be explored further when building production-grade pipelines.

---

# Best Practices Learned

- Split workflows into focused jobs.
- Use `needs` only when required.
- Never assume jobs share files.
- Use artifacts for build outputs.
- Use cache only for reusable dependencies.
- Store secrets securely.
- Keep workflows readable and modular.

---

# Lessons Learned Today

- Jobs are independent by default.
- `needs` controls execution order.
- Every job starts with a fresh runner.
- Artifacts solve file-sharing between jobs.
- Cache improves workflow speed.
- Secrets protect sensitive information.
- Conditions make workflows intelligent.
- Matrix builds reduce duplication.

---

# Challenges Faced

- Understanding why jobs couldn't access each other's files.
- Distinguishing artifacts from cache.
- Understanding why multiple jobs are preferred over one large job.
- Learning when to use variables versus secrets.

---

# Summary

Day 2 focused on moving from a basic workflow to a professional CI pipeline.

The biggest mindset shift was understanding that workflows are composed of **independent jobs**, each running in isolation. Features such as artifacts, caching, conditions, and secrets solve practical problems that arise when workflows become more complex.

These concepts form the foundation of production-ready CI pipelines and prepare the workflow for deployment automation.

---

# Next Up

**Day 3 – Production CI Pipelines**

Topics:

- Building a Production-Ready Node.js Pipeline
- Debugging GitHub Actions
- Workflow Architecture
- Advanced GitHub Actions
- Transition to Docker