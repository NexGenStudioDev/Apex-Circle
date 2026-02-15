# Contributing to Apex Circle

First off, thank you for considering contributing to **Apex Circle**! Every contribution helps make this project better for the developer community.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Code Style](#code-style)
- [Need Help?](#need-help)

---

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you agree to be respectful, constructive, and collaborative.

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/<your-username>/Apex-Circle.git
   cd Apex-Circle
   ```

3. **Add upstream remote:**

   ```bash
   git remote add upstream https://github.com/NexGenStudioDev/Apex-Circle.git
   ```

4. **Create a branch** for your work:

   ```bash
   git checkout -b feat/your-feature-name
   ```

---

## Development Setup

### Prerequisites

| Tool    | Version       | Install                                                                |
| ------- | ------------- | ---------------------------------------------------------------------- |
| Node.js | 20+           | [nodejs.org](https://nodejs.org/)                                      |
| pnpm    | Latest        | `npm install -g pnpm`                                                  |
| Rust    | Latest stable | [rust-lang.org](https://www.rust-lang.org/tools/install)               |
| MongoDB | 7+            | [mongodb.com](https://www.mongodb.com/try/download/community) or Atlas |

### Frontend (Community Website)

```bash
cd Apex-Circle-Frontend
pnpm install
pnpm dev
```

### Backend API

```bash
cd Apex-Circle-Backend
pnpm install
cp .env.example .env    # Fill in your local config
pnpm dev
```

### Desktop App (Tauri)

```bash
cd Apex-Circle-Dasktop-Application
pnpm install
pnpm tauri dev
```

> Refer to [Tauri v2 Prerequisites](https://v2.tauri.app/start/prerequisites/) for platform-specific system dependencies.

---

## Project Structure

```
Apex-Circle/
├── Apex-Circle-Frontend/              # React community website
├── Apex-Circle-Dasktop-Application/   # Tauri desktop admin app
├── Apex-Circle-Backend/               # Node.js + Express API
├── .github/                           # GitHub templates & workflows
├── CONTRIBUTING.md                    # This file
├── README.md                          # Project overview
└── IMPLEMENTATION_PLAN.md             # Detailed blueprint
```

---

## Branch Naming Convention

Use the following prefixes for branch names:

| Prefix      | Purpose                  | Example                     |
| ----------- | ------------------------ | --------------------------- |
| `feat/`     | New feature              | `feat/event-registration`   |
| `fix/`      | Bug fix                  | `fix/login-redirect-loop`   |
| `docs/`     | Documentation changes    | `docs/update-readme`        |
| `refactor/` | Code refactoring         | `refactor/auth-middleware`  |
| `style/`    | Styling/UI changes       | `style/dashboard-layout`    |
| `test/`     | Adding or updating tests | `test/event-api-tests`      |
| `chore/`    | Maintenance tasks        | `chore/update-dependencies` |
| `ci/`       | CI/CD changes            | `ci/add-lint-workflow`      |
| `hotfix/`   | Urgent production fix    | `hotfix/crash-on-signup`    |

---

## Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This enables automatic changelog generation and semantic versioning.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

| Type       | Description                                                           |
| ---------- | --------------------------------------------------------------------- |
| `feat`     | A new feature                                                         |
| `fix`      | A bug fix                                                             |
| `docs`     | Documentation only changes                                            |
| `style`    | Changes that do not affect the meaning of the code (formatting, etc.) |
| `refactor` | A code change that neither fixes a bug nor adds a feature             |
| `perf`     | A code change that improves performance                               |
| `test`     | Adding or correcting tests                                            |
| `build`    | Changes that affect the build system or external dependencies         |
| `ci`       | Changes to CI configuration files and scripts                         |
| `chore`    | Other changes that don't modify src or test files                     |
| `revert`   | Reverts a previous commit                                             |

### Scopes

| Scope      | Description               |
| ---------- | ------------------------- |
| `frontend` | Community website changes |
| `desktop`  | Desktop admin app changes |
| `backend`  | Backend API changes       |
| `docs`     | Documentation changes     |
| `ci`       | CI/CD pipeline changes    |
| `deps`     | Dependency updates        |

### Examples

```
feat(frontend): add event registration form with validation
fix(backend): resolve JWT token refresh race condition
docs: update contributing guidelines
refactor(desktop): extract sidebar into reusable component
ci: add automated testing workflow for PRs
```

### Breaking Changes

Append `!` after the type/scope for breaking changes:

```
feat(backend)!: change authentication response format
```

---

## Pull Request Process

1. **Sync** your fork with upstream before creating a PR:

   ```bash
   git fetch upstream
   git rebase upstream/master
   ```

2. **Ensure** your code passes all checks:
   - No lint errors
   - All tests pass
   - Builds successfully

3. **Push** your branch and open a PR against `master`:

   ```bash
   git push origin feat/your-feature-name
   ```

4. **Fill out** the PR template completely

5. **Request review** from maintainers

### PR Requirements

- [ ] Follows the branch naming convention
- [ ] Commits follow Conventional Commits
- [ ] No unrelated changes included
- [ ] Tests added/updated for new functionality
- [ ] Documentation updated if needed
- [ ] PR description clearly explains the changes
- [ ] Linked to a relevant issue (if applicable)

### PR Labels

| Label              | Description                      |
| ------------------ | -------------------------------- |
| `frontend`         | Changes to the community website |
| `desktop`          | Changes to the desktop app       |
| `backend`          | Changes to the backend API       |
| `bug`              | Bug fix                          |
| `enhancement`      | New feature or improvement       |
| `documentation`    | Documentation updates            |
| `breaking-change`  | Introduces breaking changes      |
| `good first issue` | Good for newcomers               |
| `help wanted`      | Extra attention needed           |

---

## Issue Guidelines

### Before Opening an Issue

1. **Search** existing issues to avoid duplicates
2. **Check** the [Implementation Plan](IMPLEMENTATION_PLAN.md) for planned features
3. **Use** the appropriate issue template:
   - 🐛 **Bug Report** — for bugs and unexpected behavior
   - ✨ **Feature Request** — for new features and enhancements

### Writing Good Issues

- Use a **clear, descriptive title**
- Provide **steps to reproduce** (for bugs)
- Include **screenshots or recordings** when helpful
- Specify the **affected component** (Frontend, Desktop, Backend)
- Add relevant **labels**

---

## Code Style

### General

- Use **TypeScript** everywhere — no `any` types unless absolutely necessary
- Write **meaningful variable and function names**
- Keep functions **small and focused**
- Add **JSDoc comments** for public APIs and complex logic
- Use **absolute imports** where configured

### Frontend & Desktop

- Use **functional components** with hooks
- Follow **component-per-file** pattern
- Use **Tailwind CSS** for styling — avoid inline styles and CSS modules
- Use **Zod schemas** for form validation
- Use **TanStack Query** for server state management

### Backend

- Follow **controller → service → repository** pattern
- Use **Zod** for request validation middleware
- Use **proper HTTP status codes** and consistent error responses
- Write **unit tests** for services and **integration tests** for routes
- Use **environment variables** for configuration — never hardcode secrets

### File Naming

| Type             | Convention                  | Example            |
| ---------------- | --------------------------- | ------------------ |
| Components       | PascalCase                  | `EventCard.tsx`    |
| Hooks            | camelCase with `use` prefix | `useEvents.ts`     |
| Utilities        | camelCase                   | `formatDate.ts`    |
| Constants        | SCREAMING_SNAKE_CASE        | `API_ENDPOINTS.ts` |
| Types/Interfaces | PascalCase                  | `Event.types.ts`   |
| API Routes       | kebab-case                  | `event-routes.ts`  |

---

## Need Help?

- Open a [Discussion](https://github.com/NexGenStudioDev/Apex-Circle/discussions) for questions
- Check the [Implementation Plan](IMPLEMENTATION_PLAN.md) for architecture details
- Tag `@NexGenStudioDev` in your PR or issue for maintainer attention

---

**Thank you for contributing to Apex Circle!** 🎉
