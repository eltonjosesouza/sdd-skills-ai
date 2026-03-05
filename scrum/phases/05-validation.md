# Phase 5: Validation & Observability

> **Discipline**: Contract + UX + Data | **Sequence**: Fifth

## Goal

Verify that what was built matches all three contracts simultaneously:
the **API Spec** (QA), the **UX prototype** (UX Designer), and the
**telemetry schema** (Data Lead). All three must pass before release.

---

## Active Agents

| Agent | Role in this phase |
|---|---|
| [QA Engineer](../agents/qa-engineer.md) | Executes contract tests and integration tests |
| [Security Engineer](../agents/security-engineer.md) | Runs SAST, dependency audit, and produces security report |
| [UX Designer](../agents/ux-designer.md) | Validates UI against prototype |
| [Data Lead](../agents/data-lead.md) | Verifies telemetry events are firing correctly |
| [Tech Lead](../agents/tech-lead.md) | Addresses Spec deviations found during validation |
| [Scrum Master](../agents/scrum-master.md) | Tracks DoD completion; escalates blockers |

---

## Skills Used

- [sdd-contract](../skills/sdd-contract.md) — Contract test execution
- [telemetry-design](../skills/telemetry-design.md) — Event payload verification

---

## Inputs

| Artifact | Source |
|---|---|
| `docs/features/{feature}/02-contract/spec.md` | Phase 2 |
| `docs/features/{feature}/01-discovery/prototype.md` | Phase 1 |
| `docs/features/{feature}/02-contract/telemetry.md` | Phase 2 |
| `docs/features/{feature}/03-planning/test-strategy.md` | Phase 3 |
| Feature branch (staging environment) | Phase 4 |

---

## Validation Tracks (run in parallel)

### Track A — QA Contract Validation
1. Run automated contract tests against staging.
2. Run integration tests.
3. Execute all manual test scenarios from test strategy.
4. Document results in validation report.

### Track B — Security Validation
1. Run SAST scan on feature branch.
2. Run dependency vulnerability audit.
3. Verify all auth/validation requirements from threat model are implemented.
4. Produce `docs/features/{feature}/05-validation/security-report.md`.

### Track C — UX Validation
1. Load staging environment.
2. Walk through all flows defined in prototype.
3. Verify error states, empty states, loading states.
4. Sign off or raise deviations.

### Track D — Telemetry Validation
1. Trigger each user flow in staging.
2. Verify events appear in the analytics pipeline with correct payload.
3. Confirm no PII is transmitted.
4. Mark each telemetry.md event as ✅ verified or ❌ failed.

---

## Exit Gate

All of the following MUST be ✅ before Phase 6:

| Criterion | Checked by |
|---|---|
| All contract tests pass | QA |
| All manual test scenarios pass | QA |
| SAST scan passed: 0 CRITICAL, 0 HIGH unresolved | Security Engineer |
| Dependency audit passed: 0 CRITICAL CVEs unresolved | Security Engineer |
| No UI flow deviates from prototype (or deviation is PO-approved) | UX |
| All telemetry events fire with correct payload | Data Lead |
| Definition of Done checklist complete | QA + Tech Lead + PO |

**Output**: `docs/features/{feature}/05-validation/validation-report.md` + `docs/features/{feature}/05-validation/security-report.md`

**Handoff to**: [Phase 6 — Release](./06-release.md)
