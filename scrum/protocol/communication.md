# Communication Protocol

> **Layer**: Protocol | **Type**: Agent Coordination Rules

This document defines how agents pass information between phases. Agents
communicate **exclusively through written artifacts** — no implicit state,
no oral agreements, no assumptions from previous steps.

---

## Core Rule: Artifact-First Communication

> "If it is not written in the artifact, it did not happen."

Agents MUST read the artifacts of the previous phase before starting their own.
Agents MUST write their outputs as artifacts before triggering the next phase.

---

## Artifact Ownership Map

| Artifact | Produced by | Consumed by | Location |
|---|---|---|---|
| Tech Stack | Tech Lead | All | `docs/architecture/tech-stack.md` |
| Tooling | DevOps + Tech Lead | Developers | `docs/architecture/tooling.md` |
| ADRs | Tech Lead | All | `docs/architecture/decisions/` |
| User Story | Product Owner | All | `docs/features/{feature}/01-discovery/user-story.md` |
| UX Prototype | UX Designer | Tech Lead, QA | `docs/features/{feature}/01-discovery/prototype.md` |
| Domain Glossary | PO + Tech Lead | All | `scrum/protocol/glossary.md` (shared) |
| Spec (Contract) | Tech Lead | Dev, QA, Data Lead, Frontend | `docs/features/{feature}/02-contract/spec.md` |
| Threat Model | Security Engineer | Dev, QA | `docs/features/{feature}/02-contract/threat-model.md` |
| Test Strategy | QA Engineer | Developers, CI | `docs/features/{feature}/03-planning/test-strategy.md` |
| Task Breakdown | Tech Lead + Devs | Developers | `docs/sprints/sprint-{NN}/tasks/T-NNN.md` |
| Telemetry Schema | Data Lead | Developers, QA | `docs/features/{feature}/02-contract/telemetry.md` |
| Validation Report | QA + UX + Data Lead | PO, Stakeholders | `docs/features/{feature}/05-validation/validation-report.md` |
| Security Report | Security Engineer | Tech Lead, DevOps | `docs/features/{feature}/05-validation/security-report.md` |
| Release Notes | Scrum Master | Stakeholders | `docs/features/{feature}/06-release/release-notes.md` |
| Deploy Log | DevOps Engineer | Tech Lead | `docs/features/{feature}/06-release/deploy-log.md` |

---

## Phase Handoff Protocol

Each phase handoff follows this structure:

```markdown
## Handoff: [Phase N] → [Phase N+1]

**Date**: YYYY-MM-DD
**From**: [Agent/Role]
**To**: [Agent/Role]
**Artifact produced**: [file path]
**Exit gate status**: ✅ PASSED | ❌ BLOCKED
**Blockers (if any)**: [description or N/A]
**Notes**: [optional context for next agent]
```

Handoffs MUST be written to the active sprint directory: `docs/sprints/sprint-{NN}/handoffs/phase-{N}-to-{N+1}.md`.

---

## Escalation Rules

| Situation | Who acts | Action |
|---|---|---|
| Exit gate cannot be met | Scrum Master | Document blocker; return item to backlog |
| Spec ambiguity found during dev | Developer → Tech Lead | Raise amendment; do not interpret alone |
| Test failure on passing Spec | QA → Tech Lead | Spec amendment or bug report |
| Telemetry missing from Spec | Data Lead → Tech Lead | Block Phase 4 until corrected |
| UX deviation from prototype | UX → Dev + PO | Document delta; PO decides |

---

## 5. Artifact Storage Conventions

We use a **Hybrid Feature + Sprint Structure** housed inside the `docs/` folder, crowned by a global **Architecture Hub**.  
A strict separation exists between persistent business knowledge (Features), cross-cutting decisions (Architecture), and temporary timeboxed execution work (Sprints).

### Architecture Domain (`docs/architecture/`)
Global technical and architectural standards that span across all features and sprints.
* `tech-stack.md`: The approved set of programming languages, frameworks, and platform libraries.
* `tooling.md`: Validated local environment configs, CI tools, CLI utilities.
* `data-model.md`: Top-level entities, aggregate relationships, and context maps.
* `decisions/`: Repository for Architecture Decision Records (ADRs). Immutable snapshots of *why* a technical path was chosen.

### Feature Domain (`docs/features/{feature-slug}/`)
Persistent artifacts created across the lifecycle live here, explicitly split by the Phase in which they are finalized.
* `01-discovery/`: Business intent (`user-story.md`), UX (`prototype.md`).
* `02-contract/`: Non-negotiable blueprints (`spec.md`, `telemetry.md`, `threat-model.md`).
* `03-planning/`: Quality architecture (`test-strategy.md`).
* `05-validation/`: Verification proofs (`validation-report.md`, `security-report.md`).
* `06-release/`: Ops tracking (`deploy-log.md`, `release-notes.md`).

### Sprint Execution (`docs/sprints/sprint-{NN}/`)
Temporary planning and execution artifacts. Once a sprint closes, these become historical records.
* Root: Sprint alignment and outcome (`backlog.md`, `sprint-goal.md`, `retrospective.md`).
* `tasks/`: Atomic execution steps mapped from the Spec (`T-NNN.md`). Tasks link back to the feature contract they belong to.

---

## Glossary Updates

When any agent introduces a new domain term during their work, they MUST:

1. Add the term to `scrum/protocol/glossary.md`.
2. Note the phase in which it was introduced.
3. Ensure the term is consistent with all prior artifacts.

The Glossary is the **memory layer** shared across all agents and phases.
