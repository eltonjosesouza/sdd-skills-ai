# Skill: SDD Contract (Spec-Driven Development)

> **Layer**: Skills | **Used by**: Tech Lead, Developer, QA Engineer

## What is this skill?

SDD Contract defines how to author, read, and validate a Spec contract.
The contract is the **only source of truth** for what a feature does.
This skill covers: writing a Spec, consuming a Spec (as developer or QA),
and validating that an implementation fulfills it.

---

## Writing a Spec (Tech Lead)

A Spec MUST cover every observable behavior of the feature — not the implementation:

```yaml
# Spec structure (Markdown format — use YAML for OpenAPI)
## Endpoint: [METHOD] /path/{param}

**Description**: [What this endpoint does in business language]
**Bounded Context**: [DDD context]

### Input
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `field_name` | string | Yes | max 255 chars |

### Output — 200 OK
```json
{
  "field": "value"
}
```

### Output — 4xx / 5xx
| Status | Scenario | Body |
|--------|----------|------|
| 400 | Invalid input | `{ "error": "VALIDATION_ERROR", "field": "..." }` |
| 404 | Resource not found | `{ "error": "NOT_FOUND" }` |
| 500 | Internal error | `{ "error": "INTERNAL_ERROR" }` |

### Telemetry event triggered
- `feature.action.completed` — on success
- `feature.action.failed` — on 4xx/5xx
```

---

## Reading a Spec (Developer)

Before writing a single line of code or test:

1. Read the full Spec end-to-end.
2. Map each endpoint to a failing test case.
3. Note every exception flow — each one needs a test.
4. Identify which domain entities are involved (check Glossary).
5. If anything is ambiguous → escalate to Tech Lead in writing. Do not assume.

---

## Validating a Spec (QA)

Contract tests validate the **contract**, not the code paths:

1. Take each response schema from the Spec.
2. Write a test that calls the real endpoint and asserts the response matches schema.
3. Write tests for every 4xx/5xx scenario defined in the Spec.
4. Run contract tests independently from unit tests.

---

## Spec Amendment Checklist

Before approving any change to a frozen Spec:

- [ ] Change documented in `docs/features/{feature}/02-contract/amendments/amend-{N}.md`
- [ ] Approved by: Tech Lead + QA + Data Lead
- [ ] Impact on contract tests assessed
- [ ] Impact on Frontend mocks assessed
- [ ] Version bumped in Spec header
