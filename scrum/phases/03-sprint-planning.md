# Phase 3: Sprint Planning

> **Discipline**: Scrum | **Sequence**: Third

## Goal

Transform the approved Spec and prototype into a committed Sprint backlog.
Establish clear tasks, test strategy, and team capacity before any development begins.

---

## Active Agents

| Agent | Role in this phase |
|---|---|
| [Product Owner](../agents/product-owner.md) | Clarifies acceptance criteria; prioritizes |
| [Scrum Master](../agents/scrum-master.md) | Facilitates; captures Sprint goal |
| [Tech Lead](../agents/tech-lead.md) | Assigns Bounded Context; guides task breakdown |
| [Developer](../agents/developer.md) | Estimates; identifies technical risks |
| [QA Engineer](../agents/qa-engineer.md) | Defines test strategy; estimates QA effort |
| [Security Engineer](../agents/security-engineer.md) | Adds security tasks (SAST, pentest) to backlog if applicable |
| [DevOps Engineer](../agents/devops-engineer.md) | Identifies infra changes required; adds deployment tasks |
| [UX Designer](../agents/ux-designer.md) | Clarifies prototype details |

---

## Skills Used

- [ddd-modeling](../skills/ddd-modeling.md) — Bounded Context assignment
- [tdd-cycle](../skills/tdd-cycle.md) — Understanding test effort for estimation

---

## Inputs

| Artifact | Source |
|---|---|
| `docs/features/{feature}/02-contract/spec.md` (frozen) | Phase 2 |
| `docs/features/{feature}/01-discovery/prototype.md` | Phase 1 |
| `docs/features/{feature}/02-contract/telemetry.md` | Phase 2 |
| Team capacity | Scrum Master |

---

## Activities (in order)

1. **Sprint Goal** — Scrum Master + PO define a single Sprint Goal sentence.
2. **Bounded Context assignment** — Tech Lead declares which DDD context this feature belongs to.
3. **Task breakdown** — Tech Lead + Developers decompose Spec into atomic implementation tasks.
4. **Test strategy** — QA defines automated vs manual testing split; estimates test tasks.
5. **Estimation** — Full team estimates story points using Spec (not vague intuition).
6. **Commitment** — Team commits to scope they can complete within the Sprint.

---

## Output: Sprint Task Format

All tasks MUST follow this format in `docs/sprints/sprint-{NN}/tasks/T-{NNN}.md`:

```markdown
## T-{NNN} [PARALLELIZABLE?] {Task title}

**Phase**: Sprint Phase
**Agent**: [Developer / QA / UX]
**Depends on**: T-{NNN} | None
**Output**: [what artifact/file/test this task produces]

### Definition of Done for this task
- [ ] [Specific, verifiable criterion]
```

---

## Exit Gate

| Criterion | Checked by |
|---|---|
| Sprint Goal written and agreed upon | PO + SM |
| All Spec endpoints have corresponding tasks | Tech Lead |
| Test strategy documented | QA |
| Security tasks added (SAST, dependency audit, secure review) | Security Engineer |
| Infrastructure tasks added if Spec requires new infra | DevOps Engineer |
| Team has confirmed capacity | SM |
| No task is vague or unverifiable | Tech Lead |

**Output**: Tasks stored in `docs/sprints/sprint-{NN}/tasks/` + Sprint backlog updated

**Handoff to**: [Phase 4 — Development](./04-development.md)
