# Day 1 - GitHub Actions Fundamentals

> **Learning Goal:** Build a solid understanding of CI/CD, GitHub Actions architecture, workflows, triggers, and the Git workflow before creating professional CI pipelines.

---

# Topics Covered

- Introduction to CI/CD
- Continuous Integration vs Continuous Delivery
- Why CI/CD exists
- Introduction to GitHub Actions
- GitHub Actions Architecture
- Workflow, Jobs, Steps, Actions and Runners
- Writing the first GitHub Actions workflow
- Workflow triggers
- Git & GitHub workflow
- Branches and Pull Requests
- Compare & Pull Request
- Best Practices

---

# Learning Objectives

By the end of Day 1, I should be able to:

- Explain what CI/CD is and why it exists.
- Understand the basic architecture of GitHub Actions.
- Create a simple workflow using YAML.
- Know when GitHub Actions workflows run.
- Understand the purpose of Pull Requests in a CI workflow.

---

# 1. Why CI/CD Exists

Before CI/CD, developers manually performed repetitive tasks whenever code changed:

- Install dependencies
- Run tests
- Build the project
- Deploy the application

As projects grew larger, these manual steps became slow and error-prone.

CI/CD automates these repetitive tasks, ensuring every code change is validated consistently before reaching production.

### Key Takeaway

> CI/CD is not about replacing developers—it automates repetitive validation and deployment tasks so developers can focus on writing code.

---

# 2. CI vs CD

| CI (Continuous Integration) | CD (Continuous Delivery/Deployment) |
|-----------------------------|--------------------------------------|
| Validates code automatically | Delivers or deploys validated code |
| Runs tests and builds | Publishes the application |
| Happens frequently | Happens after successful CI |

For this learning roadmap, the primary focus is **Continuous Integration (CI)** using GitHub Actions.

---

# 3. Introduction to GitHub Actions

GitHub Actions is GitHub's built-in automation platform.

Instead of manually running commands after every push, GitHub can execute them automatically whenever specified events occur.

Examples:

- Install dependencies
- Run ESLint
- Execute tests
- Build the project
- Deploy the application

Everything is described using YAML files stored inside the repository.

---

# 4. GitHub Actions Architecture

The core building blocks are:

```

Workflow
│
├── Job
│ ├── Step
│ ├── Step
│ └── Step
│
└── Job
├── Step
└── Step

```

### Workflow

A workflow is the complete automation process.

Example:

- Build project
- Run tests
- Deploy

Each workflow is stored inside:

```

.github/workflows/

```

---

### Jobs

A workflow contains one or more jobs.

Each job performs a specific task.

Examples:

- Lint
- Test
- Build

---

### Steps

A job consists of ordered steps.

Example:

1. Checkout repository
2. Setup Node.js
3. Install dependencies
4. Run tests

---

### Actions

Actions are reusable building blocks created by GitHub or the community.

Example:

```yaml
uses: actions/checkout@v4
```

Instead of writing Git commands manually, this action clones the repository automatically.

---

### Runner

A runner is the machine that executes the workflow.

GitHub provides hosted runners for:

- Ubuntu
- Windows
- macOS

During Day 1, it was important to understand that workflows do **not** run on GitHub's web interface—they run on temporary virtual machines called runners.

---

# 5. My First Workflow

Example workflow:

```yaml
name: Node CI

on:
  push:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - run: npm install

      - run: npm test
```

### What I learned

- `name` gives the workflow a readable name.
- `on` defines the trigger.
- `jobs` contains all jobs.
- `runs-on` selects the runner.
- `steps` execute commands sequentially.
- `uses` executes reusable actions.
- `run` executes shell commands.

---

# 6. Workflow Triggers

GitHub Actions starts workflows based on events.

The triggers covered were:

```yaml
on:
  push:
```

Runs whenever code is pushed.

---

```yaml
on:
  pull_request:
```

Runs whenever a Pull Request is created or updated.

---

```yaml
on:
  workflow_dispatch:
```

Allows manual execution from GitHub.

---

### Key Lesson

The workflow does **nothing** until one of its configured events occurs.

---

# 7. Git Workflow Refresher

Before understanding Pull Requests, it was important to understand the normal Git workflow.

```

Create Branch

↓

Make Changes

↓

Commit

↓

Push

↓

Open Pull Request

↓

Review

↓

Merge

```

This workflow is the foundation of professional collaboration.

---

# 8. Understanding Pull Requests

One of the biggest discussions during Day 1 was **why Pull Requests are so important**.

A Pull Request allows changes from one branch to be reviewed before merging into another branch.

This enables:

- Code review
- Automated testing
- Team collaboration
- Safer merges

---

# Challenge Faced: Compare & Pull Request

### Problem

After pushing code, I expected GitHub to always display the **Compare & Pull Request** button.

Sometimes it didn't appear.

### What I learned

- The button only appears when GitHub detects changes between branches.
- If I'm working directly on `main`, there is nothing to compare.
- Pull Requests are created **between branches**, not commits.

This cleared up one of my biggest confusions about GitHub's workflow.

---

# 9. Best Practices Learned

- Keep workflow files inside `.github/workflows/`.
- Give workflows meaningful names.
- Use official GitHub Actions whenever possible.
- Keep workflows focused on a single responsibility.
- Test workflows using small changes before expanding them.

---

# Lessons Learned Today

- CI/CD automates repetitive development tasks.
- GitHub Actions is event-driven.
- Workflows contain jobs.
- Jobs contain steps.
- Actions are reusable components.
- Runners execute workflows.
- Pull Requests are an essential part of CI.
- Understanding the Git workflow is necessary before learning advanced GitHub Actions.

---

# Challenges Faced

- Understanding the difference between Git and GitHub.
- Understanding why Compare & Pull Request sometimes didn't appear.
- Learning how GitHub Actions is structured internally.
- Becoming comfortable reading YAML syntax.

---

# Summary

Day 1 established the foundation required for the rest of the roadmap.

Rather than focusing on advanced pipeline features, the emphasis was on understanding **how GitHub Actions works**, **when workflows execute**, and **how GitHub integrates with a professional Git workflow**.

These concepts are essential before moving on to topics such as multiple jobs, artifacts, caching, secrets, and production-ready CI pipelines.

---

# Next Up

**Day 2 – Building Professional CI Pipelines**

Topics:

- Multiple Jobs
- `needs`
- Parallel vs Sequential Jobs
- Job Isolation
- Artifacts
- Environment Variables
- Secrets
- Conditions
- Matrix Strategy
- Caching
- Reusable Workflows