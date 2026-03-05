# Scrum Flow Protocol

> **Layer**: Protocol | **Type**: Sequence of Events

This document defines the canonical sequence of activities for any feature
delivered by this team. It is the **single source of truth** for "what happens
in which order." Agents MUST NOT skip phases or reorder steps.

---

## Overview: The Three Disciplines

Every feature passes through three interleaved disciplines:

```
DISCOVERY (DDD) ──▶ CONTRACT (SDD) ──▶ EXECUTION (TDD)
      ↑                                        │
      └──────── Feedback Loop (Data) ◀──────────┘
```

| Discipline | Question it answers | Primary agents |
|---|---|---|
| **DDD** | What are we building and for whom? | PO, UX, Data Lead |
| **SDD** | How will the system behave (contract)? | Tech Lead, QA, Data Lead |
| **TDD** | Does it actually behave that way? | Developer, QA |

---

## Phase Sequence

### Phase 1 — Discovery & Definition
**Trigger**: New item promoted to top of backlog.

1. PO defines the problem using **Ubiquitous Language** (no technical jargon).
2. UX produces a validated prototype.
3. Data Lead validates feasibility from historical data.
4. **Exit gate**: User Story approved + UX prototype signed off.

→ See [`phases/01-discovery.md`](../phases/01-discovery.md)

---

### Phase 2 — Contract Design
**Trigger**: Phase 1 exit gate passed.

1. Tech Lead authors the Spec (OpenAPI YAML or structured Markdown).
2. QA reviews all exception/error flows in the Spec.
3. Data Lead ensures telemetry fields are present.
4. **Exit gate**: Spec approved by QA + Data Lead. Frozen before any code.

→ See [`phases/02-contract.md`](../phases/02-contract.md)

---

### Phase 3 — Sprint Planning
**Trigger**: Approved Spec + UX prototype in hand.

1. Full team estimates effort from Spec and prototype.
2. QA defines test strategy (automated vs. manual split).
3. Developers identify which Bounded Context the feature belongs to.
4. **Exit gate**: Sprint backlog committed. Capacity confirmed.

→ See [`phases/03-sprint-planning.md`](../phases/03-sprint-planning.md)

---

### Phase 4 — Development
**Trigger**: Sprint starts.

1. Frontend begins on Spec mocks (SDD parallel workstream).
2. Backend applies TDD cycle: Red → Green → Refactor.
3. Domain interfaces generated from Spec — not invented.
4. **Exit gate**: Feature branch passes all tests; coverage ≥ 80%.

→ See [`phases/04-development.md`](../phases/04-development.md)

---

### Phase 5 — Validation & Observability
**Trigger**: Development branch ready for review.

1. QA runs contract tests (does API match Spec?).
2. UX validates journey (does UI match prototype?).
3. Data Lead confirms telemetry events are firing correctly.
4. **Exit gate**: All acceptance scenarios pass. Definition of Done met.

→ See [`phases/05-validation.md`](../phases/05-validation.md)

---

### Phase 6 — Release & Monitoring
**Trigger**: Validation exit gate passed.

1. CI/CD deploys to production.
2. Data Lead monitors real usage via dashboards.
3. Sprint Review: feature demonstrated to stakeholders.
4. Feedback loop: Data Lead reports to PO for next cycle.
5. **Exit gate**: Sprint Review complete. Retrospective scheduled.

→ See [`phases/06-release.md`](../phases/06-release.md)

---

## Scrum Ceremonies Mapping

| Ceremony | Phase | Mandatory participants |
|---|---|---|
| Backlog Refinement | Before Phase 1 | PO, UX, Data Lead |
| Sprint Planning | Phase 3 | All |
| Daily Standup | Phases 4–5 | Developers, QA, Scrum Master |
| Sprint Review | Phase 6 | All + Stakeholders |
| Retrospective | After Phase 6 | All |

---

## Rules

1. **No phase may be skipped.** If a phase cannot complete, the item returns to the backlog.
2. **Exit gates are binary.** Passed or not passed — no "mostly done."
3. **The Spec is frozen** after Phase 2 approval. Changes require a new Spec amendment cycle.
4. **Feedback is mandatory.** Data Lead MUST report usage metrics before the next feature begins.
