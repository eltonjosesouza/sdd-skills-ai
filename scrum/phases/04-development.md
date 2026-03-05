# Phase 4: Development

> **Discipline**: TDD | **Sequence**: Fourth

## Goal

Implement the feature exactly as defined in the frozen Spec, using TDD as the
construction method. Frontend and Backend work in parallel using the Spec as
the shared contract.

---

## Active Agents

| Agent | Role in this phase |
|---|---|
| [Developer (Backend)](../agents/developer.md) | TDD cycle: Red → Green → Refactor |
| [Developer (Frontend)](../agents/developer.md) | Implements UI from prototype using Spec mocks |
| [Security Engineer](../agents/security-engineer.md) | Secure code review during PR; flags new dependency vulnerabilities |
| [DevOps Engineer](../agents/devops-engineer.md) | Configures CI/CD pipeline; prepares staging environment |
| [Tech Lead](../agents/tech-lead.md) | Reviews code; resolves Spec ambiguities |
| [Scrum Master](../agents/scrum-master.md) | Runs Daily Standups; clears blockers |

---

## Skills Used

- [sdd-contract](../skills/sdd-contract.md) — Reading Spec to derive test cases
- [tdd-cycle](../skills/tdd-cycle.md) — Red → Green → Refactor loop
- [ddd-modeling](../skills/ddd-modeling.md) — Naming entities using Ubiquitous Language

---

## Inputs

| Artifact | Source |
|---|---|
| `docs/features/{feature}/02-contract/spec.md` (frozen) | Phase 2 |
| `docs/sprints/sprint-{NN}/tasks/` | Phase 3 |
| `docs/features/{feature}/03-planning/test-strategy.md` | Phase 3 |
| `docs/features/{feature}/02-contract/telemetry.md` | Phase 2 |

---

## Parallel Workstreams

```
Backend Developer          Frontend Developer
     │                           │
     ▼                           ▼
[Red: write failing test]   [Generate mock from Spec]
[Green: implement]          [Implement UI from prototype]
[Refactor: clean code]      [Integration: swap mock → real API]
     │                           │
     └─────────── Merge ─────────┘
```

---

## Daily Standup Format

Each developer answers:

1. Which task (T-NNN) did I work on?
2. What is its current Red/Green/Refactor status?
3. Any blocker that prevents progress?

---

## Exit Gate

| Criterion | Checked by |
|---|---|
| All tasks in `docs/sprints/sprint-{NN}/tasks/` have status: Done | Developer |
| Unit test coverage ≥ 80% (domain + service) | Developer |
| All tests pass in CI pipeline | CI |
| Commit history shows [RED] → [GREEN] → [REFACTOR] pattern | Tech Lead |
| No endpoint added beyond what the Spec defines | Tech Lead |
| Telemetry instrumentation implemented | Developer |
| Security code review completed for all PRs | Security Engineer |
| CI/CD pipeline configured and staging environment healthy | DevOps Engineer |

**Output**: Feature branch with passing tests, ready for validation

**Handoff to**: [Phase 5 — Validation](./05-validation.md)
