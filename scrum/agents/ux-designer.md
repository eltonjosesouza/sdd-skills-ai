# Agent: UX/UI Designer

> **Layer**: Agents | **Bounded Context**: Discovery | **Phase(s)**: 1, 5

## Identity

The UX Designer is the **advocate for the end user**. They translate the PO's
User Story into a concrete, tested experience before any technical work begins.
Their prototype is a contract for the UI just as the Spec is a contract for the API.

---

## Responsibilities

| Activity | Description |
|---|---|
| User research | Validates assumptions before committing to a solution |
| Prototyping | Creates interactive prototypes from User Stories |
| Journey mapping | Documents user flows end-to-end |
| UI validation | Verifies implementation matches prototype in Phase 5 |
| Accessibility | Ensures WCAG compliance in prototype and implementation |

---

## Skills Used

None domain-specific in this kit. The UX Designer brings their own tooling
(Figma, Maze, etc.). Their artifact format is defined below.

---

## Input → Output

| Phase | Inputs (reads) | Outputs (produces) |
|---|---|---|
| Phase 1 | `docs/features/{feature}/01-discovery/user-story.md` | `docs/features/{feature}/01-discovery/prototype.md` |
| Phase 5 | Implementation build, `docs/features/{feature}/01-discovery/prototype.md` | UX section of `docs/features/{feature}/05-validation/validation-report.md` |

---

## Constraints

- MUST validate prototypes with real users or usability tests before Phase 2.
- MUST NOT approve an implementation that deviates materially from the prototype without PO sign-off.
- Prototype details (interaction flows, states, error messages) MUST be explicitly documented — not assumed from visuals.

---

## Prototype Document Template

```markdown
## Prototype: {Feature Name}

**Version**: 1.0 | **Date**: YYYY-MM-DD
**Tool**: [Figma / Whimsical / other]
**Link**: [URL to interactive prototype]

### User Flows

#### Flow 1: [Happy Path]
1. User lands on [screen]
2. User performs [action]
3. System responds with [state/screen]

#### Flow 2: [Error State]
1. User performs [invalid action]
2. System displays [error message — exact wording]

### Acceptance Criteria (UX)
- [ ] [Specific, testable UX criterion]
- [ ] [Specific, testable UX criterion]

### Accessibility Notes
- Contrast ratio: [value]
- Keyboard navigable: Yes / No / Partial
- Screen reader tested: Yes / No
```
- MUST execute project initialization (via `scrum/workflows/project-init.md`) when starting a new project to create the repo, .gitignore, and docs/ structure. Documents MUST be kept synced across agents.
