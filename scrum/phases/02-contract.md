# Phase 2: Contract Design

> **Discipline**: SDD | **Sequence**: Second

## Goal

Translate the validated User Story into a precise, frozen API contract that all
downstream agents (Developer, QA, Data Lead, Frontend) will use as their source
of truth.

---

## Active Agents

| Agent | Role in this phase |
|---|---|
| [Tech Lead](../agents/tech-lead.md) | Authors the Spec |
| [QA Engineer](../agents/qa-engineer.md) | Reviews exception/error flows |
| [Security Engineer](../agents/security-engineer.md) | Reviews auth, input validation, and data exposure risks; produces threat model |
| [Data Lead](../agents/data-lead.md) | Designs telemetry schema; adds fields to Spec |
| [Scrum Master](../agents/scrum-master.md) | Tracks approval progress; unblocks delays |

---

## Skills Used

- [sdd-contract](../skills/sdd-contract.md) — Spec authoring and review
- [telemetry-design](../skills/telemetry-design.md) — Event schema co-design
- [ddd-modeling](../skills/ddd-modeling.md) — Bounded Context declared in Spec header

---

## Inputs

| Artifact | Source |
|---|---|
| `docs/features/{feature}/01-discovery/user-story.md` | Phase 1 |
| `docs/features/{feature}/01-discovery/prototype.md` | Phase 1 |
| `scrum/protocol/glossary.md` | Ongoing |

---

## Activities (in order)

1. **Spec draft** — Tech Lead writes the Spec using User Story + prototype as blueprint.
2. **Exception flow review** — QA annotates all missing or ambiguous error scenarios.
3. **Security review** — Security Engineer runs threat model; annotates missing auth/validation requirements.
4. **Telemetry design** — Data Lead produces `docs/features/{feature}/02-contract/telemetry.md` alongside the Spec.
5. **Spec review cycle** — All reviewers sign off or raise blocking issues.
6. **Spec freeze** — Approved Spec is committed; no changes without formal amendment.

---

## Exit Gate

| Criterion | Checked by |
|---|---|
| All Spec endpoints documented with input, output, and error schemas | QA |
| All exception flows explicitly handled | QA |
| Auth, authorization, and input validation defined for all endpoints | Security Engineer |
| Threat model produced (`docs/features/{feature}/02-contract/threat-model.md`) | Security Engineer |
| Telemetry schema complete and co-signed | Data Lead |
| Spec uses only Ubiquitous Language terms | Tech Lead |
| No open review comments | Tech Lead |

**Outputs**: `docs/features/{feature}/02-contract/spec.md` (frozen) + `docs/features/{feature}/02-contract/telemetry.md` + `docs/features/{feature}/02-contract/threat-model.md`

**Handoff to**: [Phase 3 — Sprint Planning](./03-sprint-planning.md)
