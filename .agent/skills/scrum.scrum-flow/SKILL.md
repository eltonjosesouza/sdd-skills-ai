---
name: scrum.scrum-flow
description: Scrum Flow Protocol defining the canonical sequence of activities
---

This document defines the canonical sequence of activities for any feature delivered by this team. It is the **single source of truth** for "what happens in which order." Agents MUST NOT skip phases or reorder steps.

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

## Phase Sequence

### Phase 1: Discovery & Definition (DDD)
**Goal**: Understand the problem before proposing solutions
**Duration**: 2-4 hours
**Active Agents**: Product Owner, UX Designer, Data Lead, Scrum Master
**Outputs**: User Story, Prototype, Data Validation Report

### Phase 2: Contract Creation (SDD)
**Goal**: Create the single source of truth for feature behavior
**Duration**: 4-8 hours
**Active Agents**: Tech Lead, QA Engineer, Security Engineer, Data Lead
**Outputs**: Complete Spec, Threat Model, Telemetry Schema

### Phase 3: Sprint Planning (Scrum)
**Goal**: Break work into tasks and commit to delivery
**Duration**: 2 hours
**Active Agents**: Entire team facilitated by Scrum Master
**Outputs**: Sprint Backlog, Task Estimates, Commitment

### Phase 4: Development (TDD)
**Goal**: Implement the feature with disciplined testing
**Duration**: Variable (based on complexity)
**Active Agents**: Developer, Tech Lead (review), Security Engineer
**Outputs**: Working Code, Tests, Security Review

### Phase 5: Validation (Triple Validation)
**Goal**: Verify implementation matches all contracts
**Duration**: 2-4 hours
**Active Agents**: QA Engineer, UX Designer, Data Lead
**Outputs**: Validation Report, Security Audit, Performance Results

### Phase 6: Release & Feedback
**Goal**: Deploy feature and close the feedback loop
**Duration**: 1-2 hours
**Active Agents**: DevOps Engineer, Product Owner, Data Lead
**Outputs**: Deployed Feature, Release Notes, Usage Data

## Handoff Rules

1. **No phase starts until previous phase is 100% complete**
2. **Each handoff includes a formal review meeting**
3. **All deliverables must be documented and versioned**
4. **Any blocker stops the entire flow until resolved**

## Acceleration Rules

- **Parallel work**: Only within phases, never across phases
- **Fast feedback**: Daily standups during Phase 4
- **Early validation**: Continuous testing in Phase 4
- **Automated checks**: CI/CD pipeline validates contracts continuously

This flow is non-negotiable. Skipping phases creates technical debt and reduces predictability.
