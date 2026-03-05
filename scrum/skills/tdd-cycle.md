# Skill: TDD Cycle (Test-Driven Development)

> **Layer**: Skills | **Used by**: Developer, QA Engineer

## What is this skill?

TDD Cycle defines the **Red → Green → Refactor** loop that all development
work follows. It is not optional. Every unit of behavior must have a failing
test before its implementation exists.

---

## The Three Phases

### 🔴 Red — Write a Failing Test

1. Read the next Spec scenario to implement.
2. Write a test that describes the **expected behavior**.
3. Run the test — it **MUST FAIL**.
4. If it passes without implementation → the test is wrong. Fix it.

```
Commit: test(domain): [RED] {scenario description}
```

**What makes a good test at this stage:**
- It tests behavior, not implementation details.
- It uses the Ubiquitous Language from the Glossary.
- It covers exactly one scenario from the Spec.

---

### 🟢 Green — Write Minimum Code to Pass

1. Write **only the code required** to make the failing test pass.
2. No cleanup. No optimization. No extra features.
3. Run all tests — they MUST pass.

```
Commit: feat(domain): [GREEN] {implementation description}
```

**Rules:**
- Do not skip to "the right solution" — stay minimal.
- Do not write code for the next test yet.

---

### 🔵 Refactor — Improve Without Changing Behavior

1. Clean up the implementation: naming, structure, duplication.
2. Apply SOLID principles where applicable.
3. All tests MUST still pass after refactor.

```
Commit: refactor(domain): [REFACTOR] {what changed}
```

**Rules:**
- No new behavior during refactor.
- Any test that breaks during refactor = a behavior changed (fix the code, not the test).

---

## Coverage Requirements

| Layer | Minimum coverage |
|---|---|
| Domain / Business Logic | 80% |
| Service / Use Case | 80% |
| Repository / Adapter | 60% (integration-tested separately) |
| Controllers / API layer | Contract-tested (separate from unit coverage) |

---

## TDD Anti-Patterns to Avoid

| Anti-pattern | Why it's wrong | Correct approach |
|---|---|---|
| Writing code first, test after | Tests become implementation-confirming, not behavior-defining | Always Red first |
| Testing implementation details | Tests break on refactor; low value | Test observable behavior |
| One giant test per feature | Hard to locate failures | One scenario per test |
| Skipping Refactor phase | Code rot accumulates Sprint over Sprint | Always Refactor after Green |
| Test with mocks that lie | Tests pass but integration fails | Mock only what you own |
