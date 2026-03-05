# Workflow: Sprint Planning Session

> **Type**: Ceremony orchestration | **Trigger**: Timebox start OR Phase 2 exit gate passed

This workflow orchestrates the Sprint Planning ceremony, producing a committed backlog
from an approved Spec.

---

## Inputs Required Before Starting

- [ ] `docs/features/{feature}/02-contract/spec.md` frozen (Phase 2 gate passed)
- [ ] `docs/features/{feature}/01-discovery/prototype.md` available
- [ ] `docs/features/{feature}/02-contract/telemetry.md` available
- [ ] Team capacity confirmed by Scrum Master

---

## Step 1: Sprint Goal (15 min)
**Facilitator**: Scrum Master
**Participants**: PO + All

- PO proposes a Sprint Goal in one sentence.
- Team agrees or refines.
- **Output**: Sprint Goal written in planning notes.

---

## Step 2: Bounded Context Assignment (10 min)
**Facilitator**: Tech Lead
**Participants**: Developers

- Tech Lead declares which DDD Bounded Context owns this feature.
- Developers confirm no cross-context coupling issues.
- **Output**: Context recorded in the task files header inside `docs/sprints/sprint-{NN}/tasks/`.

---

## Step 3: Task Breakdown (30–45 min)
**Facilitator**: Tech Lead
**Participants**: Developers, QA

For each Spec endpoint/behavior:
1. Identify test task (QA) and implementation tasks (Dev).
2. Write task using the standard format in `docs/sprints/sprint-{NN}/tasks/T-{NNN}.md`.
3. Mark parallelizable tasks with `[P]`.
4. Set dependencies explicitly.

---

## Step 4: Test Strategy (15 min)
**Facilitator**: QA Engineer
**Participants**: Tech Lead, Developers

- QA presents automated vs manual split.
- QA estimates test effort in story points.
- **Output**: `docs/features/{feature}/03-planning/test-strategy.md` finalized.

---

## Step 5: Estimation (20–30 min)
**Facilitator**: Scrum Master
**Participants**: All technical

- Each task estimated in story points.
- Story points based on Spec complexity — not gut feeling.
- Spike tasks flagged if Spec is ambiguous.

---

## Step 6: Capacity Check & Commit
**Facilitator**: Scrum Master
**Participants**: All

- Sum of estimated points ≤ team velocity.
- Any overflow items return to backlog (not squeezed in).
- Team verbally commits to scope.
- **Output**: Sprint backlog finalized.

---

## Exit Criteria

- [ ] Sprint Goal written and agreed
- [ ] All tasks written in standard format
- [ ] Test strategy documented
- [ ] Total points ≤ team velocity
- [ ] No vague or untestable task remains
