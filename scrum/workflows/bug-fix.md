# Workflow: Bug Fix

> **Type**: Corrective flow | **Trigger**: Bug reported in production or staging

A bug fix is a **mini feature lifecycle** — it still requires a Spec, a test, and validation.
The difference is the timebox is shorter and the Spec amendment process may apply.

---

## Step 1: Bug Triage (< 1h)
**Agent**: QA Engineer + Tech Lead
**Do**:
1. Reproduce the bug in a controlled environment.
2. Identify which Spec endpoint or behavior is violated.
3. Classify severity:
   - **P1 Critical**: System down, data corruption, security breach → fix now
   - **P2 High**: Major feature broken → fix this Sprint
   - **P3 Medium**: Minor deviation → schedule for next Sprint

**Write**: Bug report at `docs/sprints/sprint-{NN}/bugs/BUG-{NNN}.md`

---

## Bug Report Template

```markdown
## BUG-{NNN}: {Short description}

**Date**: YYYY-MM-DD | **Reported by**: [Agent/User] | **Severity**: P[1-3]
**Environment**: Production | Staging | Development

### Reproduction Steps
1. [Step 1]
2. [Step 2]

### Expected Behavior (per Spec)
[What the Spec says should happen — cite spec endpoint]

### Actual Behavior
[What is actually happening]

### Spec reference
`docs/features/{feature}/02-contract/spec.md` — section [endpoint/behavior]

### Root cause hypothesis
[Initial hypothesis — to be confirmed]
```

---

## Step 2: Spec Verification
**Agent**: Tech Lead
**Do**:
- Question: Is the bug a **deviation from the Spec** (implementation error)?
  → Fix the code; Spec is correct.
- Question: Is the behavior **not covered by the Spec** (Spec gap)?
  → Write a Spec amendment before touching code.
- Question: Is the Spec itself **wrong** (Spec error)?
  → Full Spec amendment + PO approval required.

---

## Step 3: Write Failing Test (TDD Red)
**Agent**: Developer
**Do**:
1. Write a test that reproduces the bug (it MUST FAIL).
2. Confirm test fails.

```
Commit: test(domain): [RED] reproduce BUG-{NNN} - {description}
```

---

## Step 4: Fix (TDD Green + Refactor)
**Agent**: Developer
**Do**:
1. Implement the minimal fix to make the test pass.
2. Run full test suite — no regressions.
3. Refactor if cleanup needed.

```
Commit: fix(domain): [GREEN] resolve BUG-{NNN} - {description}
Commit: refactor(domain): [REFACTOR] clean up after BUG-{NNN}
```

---

## Step 5: Validation
**Agent**: QA Engineer
**Do**:
1. Verify contract tests still pass.
2. Verify the bug scenario is now handled correctly.
3. Run regression suite for the affected Bounded Context.

---

## Step 6: Release
**Agent**: Tech Lead + Developer
**Do**:
- P1: Hotfix deploy immediately; notify stakeholders.
- P2/P3: Include in next regular Sprint release.

**Write**: Update `docs/sprints/sprint-{NN}/bugs/BUG-{NNN}.md` with resolution.

---

## Exit Gate

- [ ] Failing test existed before fix (commit history proves TDD)
- [ ] All tests pass post-fix
- [ ] No regression in related Bounded Context
- [ ] Bug report updated with resolution
- [ ] Root cause documented to prevent recurrence
