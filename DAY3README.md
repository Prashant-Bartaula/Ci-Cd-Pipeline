# Day 3 - Production CI Pipelines & Transition to Docker

> **Learning Goal:** Learn how production-ready GitHub Actions workflows are designed, how to debug them, and understand why Docker is the natural next step after CI.

---

# Topics Covered

- Workflow Architecture
- Building a Production CI Pipeline
- Debugging GitHub Actions
- Common Workflow Failures
- Advanced GitHub Actions (Awareness)
- Best Practices
- Transition to Docker

---

# Learning Objectives

By the end of Day 3, I should be able to:

- Understand how companies organize CI workflows.
- Read and debug failed workflow runs.
- Build a production-style Node.js CI pipeline.
- Recognize advanced GitHub Actions features.
- Understand why Docker comes after learning GitHub Actions.

---

# 1. Workflow Architecture

As projects grow, keeping everything inside one workflow becomes difficult.

Instead of one large workflow, projects are usually separated by responsibility.

Example:

```text
.github/workflows/

├── ci.yml
├── deploy.yml
├── release.yml
└── nightly.yml
```

### Why?

- Easier maintenance
- Faster debugging
- Clear separation of responsibilities
- Better scalability

---

# 2. Building a Production CI Pipeline

Throughout the roadmap, the workflow evolved from a simple Node.js example into something closer to what companies use.

Typical production flow:

```text
Push / Pull Request
        │
        ▼
Checkout Repository
        │
        ▼
Setup Node.js
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
Build Project
        │
        ▼
Upload Build Artifact
```

This became the mental model for a complete CI pipeline.

### Key Lesson

Every step has one responsibility.

If any validation step fails, the pipeline stops before deployment.

---

# 3. Debugging GitHub Actions

A workflow failing is normal.

Learning to read workflow logs is an essential skill.

Typical debugging process:

```text
Workflow Failed
       │
       ▼
Open Workflow Run
       │
       ▼
Open Failed Job
       │
       ▼
Read Logs
       │
       ▼
Identify Error
       │
       ▼
Fix Code
       │
       ▼
Re-run Workflow
```

---

# Common Failures

### YAML Syntax Errors

Incorrect indentation is one of the most common mistakes.

---

### Missing Dependencies

Forgetting to install project dependencies before running tests.

---

### Incorrect Triggers

Workflow never starts because the configured event doesn't match the action performed.

---

### Missing Secrets

Deployment fails because required secrets were never added to the repository.

---

### Wrong Branch

Conditions prevent jobs from running because the workflow is executing on a different branch.

---

# 4. Lessons from Earlier Challenges

Several questions came up repeatedly while learning GitHub Actions.

## Why use `npm ci` instead of `npm install`?

### Lesson Learned

`npm ci`

- Faster
- Uses `package-lock.json`
- Produces reproducible builds
- Recommended for CI environments

`npm install`

- Installs packages normally
- Can update the lock file
- Better suited for local development

---

## Should Build, Test and Lint Be Separate?

Initially it seemed unnecessary.

Later it became clear that separating responsibilities makes pipelines easier to understand and debug.

---

## Does Deployment Need the Build Output?

Yes.

Deployment usually requires the built application rather than the project source.

This is why artifacts become important.

---

## Do Tests Need the Build?

Not always.

Many projects execute tests before building.

The exact order depends on project requirements.

---

# 5. Advanced GitHub Actions (Awareness)

These topics were introduced for awareness rather than implementation.

### Self-hosted Runners

Run workflows on your own machines instead of GitHub-hosted runners.

---

### Environment Protection

Protect production deployments by requiring manual approval.

---

### Concurrency

Prevent multiple deployments from running simultaneously.

---

### Scheduled Workflows

Run workflows automatically at scheduled times.

Examples:

- Nightly tests
- Backups
- Dependency updates

---

### Release Workflows

Automatically build and publish releases whenever a new version is created.

---

### Monorepo Strategies

Large repositories often contain multiple applications.

Advanced workflows allow each application to build independently.

---

# 6. Best Practices Learned

- Keep workflows modular.
- Fail fast whenever possible.
- Read workflow logs carefully before making changes.
- Never expose secrets in workflow files.
- Use official GitHub Actions whenever available.
- Separate CI and deployment workflows.
- Keep workflow names meaningful.

---

# 7. Interview Notes

Topics I should now be comfortable explaining:

- What is CI/CD?
- Difference between CI and CD.
- What is GitHub Actions?
- Workflow vs Job vs Step.
- What is a Runner?
- What are Artifacts?
- Cache vs Artifact.
- What are Secrets?
- Why use `npm ci`?
- Why are Pull Requests important?
- Why are jobs isolated?

---

# 8. Biggest Takeaways from the GitHub Actions Roadmap

Looking back, the roadmap gradually introduced concepts instead of jumping directly into production workflows.

Progression:

```text
Understanding CI/CD
        │
        ▼
GitHub Actions Basics
        │
        ▼
Triggers
        │
        ▼
Multiple Jobs
        │
        ▼
Artifacts
        │
        ▼
Secrets & Variables
        │
        ▼
Conditions
        │
        ▼
Caching
        │
        ▼
Production Pipeline
```

Each topic built upon the previous one, making later concepts easier to understand.

---

# 9. Transition to Docker

One of the final discussions was why Docker naturally comes after GitHub Actions.

The interesting realization was that **GitHub Actions concepts remain the same**.

Only the commands change.

Current pipeline:

```text
Checkout
      │
      ▼
Install Dependencies
      │
      ▼
Run Tests
      │
      ▼
Build Project
```

Docker-based pipeline:

```text
Checkout
      │
      ▼
Build Docker Image
      │
      ▼
Run Container Tests
      │
      ▼
Push Docker Image
      │
      ▼
Deploy
```

### Key Lesson

Learning GitHub Actions first makes Docker CI pipelines much easier to understand because the workflow structure remains almost identical.

---

# What Comes Next

After completing GitHub Actions, the next learning roadmap is:

```text
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
Deploying Containers
        │
        ▼
Cloud Deployment
```

GitHub Actions provides the automation layer, while Docker provides a consistent runtime environment.

---

# Lessons Learned Today

- Production workflows are divided by responsibility.
- Debugging workflow logs is an essential skill.
- CI should fail early when problems are detected.
- `npm ci` is preferred in CI environments.
- Advanced GitHub Actions features become important as projects scale.
- Docker is the logical next step because it integrates naturally with GitHub Actions.

---

# Challenges Faced

- Understanding when to use `npm ci` versus `npm install`.
- Deciding whether lint, test, and build should be separate jobs.
- Understanding how deployment workflows use build artifacts.
- Connecting everything learned into a complete production pipeline.

---

# Final Summary

Over these three days, I progressed from understanding **what CI/CD is** to designing **production-ready GitHub Actions workflows**.

The roadmap followed a practical learning path:

- Build a strong foundation.
- Learn how workflows are structured.
- Understand how jobs communicate.
- Secure workflows with variables and secrets.
- Optimize workflows with caching.
- Learn debugging techniques.
- Understand how GitHub Actions is used in real-world projects.

The next step is **Docker**, where these same workflow concepts will be applied to containerized applications before moving on to deployment and cloud infrastructure.