# Workflow: Feature Lifecycle

> **Type**: End-to-end orchestration | **Trigger**: New backlog item reaches top of prioritized backlog

This workflow orchestrates all 6 phases for a single feature, coordinating agents
sequentially with explicit handoffs.

---

## Trigger

```
Product Owner promotes item from backlog to "Ready for Sprint"
→ Feature Lifecycle workflow begins
```

---

## Step 1: Open Discovery Session
**Agent**: Scrum Master (facilitates) + PO, UX, Data Lead (execute)
**Read**: Backlog item description
**Do**:
1. PO frames the problem in Ubiquitous Language.
2. UX creates prototype.
3. Data Lead validates with data.
**Write**: `docs/features/{feature}/01-discovery/user-story.md`, `docs/features/{feature}/01-discovery/prototype.md`
**Gate**: All reviewers sign Phase 1 exit gate → proceed.

---

## Step 2: Author and Freeze Spec
**Agent**: Tech Lead (leads) + QA, Security Engineer, Data Lead (review)
**Read**: `docs/features/{feature}/01-discovery/user-story.md`, `docs/features/{feature}/01-discovery/prototype.md`
**Do**:
1. Tech Lead drafts Spec.
2. QA annotates exception flows.
3. Security Engineer produces threat model; annotates missing auth/validation.
4. Data Lead adds telemetry fields.
5. Spec committed as frozen.
**Write**: `docs/features/{feature}/02-contract/spec.md`, `docs/features/{feature}/02-contract/telemetry.md`, `docs/features/{feature}/02-contract/threat-model.md`
**Gate**: Phase 2 exit gate signed → proceed.

---

## Step 3: Sprint Planning Session
**Agent**: All
**Read**: `docs/features/{feature}/02-contract/spec.md`, team capacity
**Do**: Estimate, task breakdown, test strategy, security tasks, infrastructure tasks defined.
**Write**: Tasks to `docs/sprints/sprint-{NN}/tasks/`, `docs/features/{feature}/03-planning/test-strategy.md`
**Gate**: Sprint backlog committed → proceed.

---

## Step 4: Development Sprint
**Agent**: Developer (BE + FE) + Security Engineer (code review) + DevOps (CI/CD + staging) + Tech Lead (review)
**Read**: `docs/features/{feature}/02-contract/spec.md`, `docs/sprints/sprint-{NN}/tasks/`
**Do**: TDD cycle per task. Parallel BE + FE workstreams. Security reviews PRs. DevOps builds pipeline and staging.
**Write**: Feature branch with passing tests; staging environment ready.
**Gate**: Phase 4 exit gate → proceed.

---

## Step 5: Validation
**Agent**: QA + Security Engineer + UX + Data Lead (parallel tracks)
**Read**: Feature on staging, Spec, prototype, telemetry schema, threat model
**Do**: 4 parallel validation tracks (contract, security, UX, telemetry).
**Write**: `docs/features/{feature}/05-validation/validation-report.md`, `docs/features/{feature}/05-validation/security-report.md`
**Gate**: DoD checklist fully signed → proceed.

---

## Step 6: Release & Monitor
**Agent**: DevOps (deploy) + Tech Lead (oversight) + SM (review) + Data Lead (monitor)
**Do**: DevOps deploys via CI/CD → Health check → Sprint Review → Monitor 48h → Feedback to PO.
**Write**: `docs/features/{feature}/06-release/release-notes.md`, `docs/features/{feature}/06-release/deploy-log.md`
**Gate**: Sprint closure criteria met → workflow ends.

---

## Rollback Path

If any gate fails:

```
Gate fails → Scrum Master logs blocker
           → Item returns to Phase [N-1] or backlog
           → Tech Lead documents in docs/sprints/sprint-{NN}/handoffs/
```
