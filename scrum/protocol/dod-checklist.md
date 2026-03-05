# Definition of Done (DoD) Checklist

> **Layer**: Protocol | **Type**: Quality Gate

A feature is **Done** only when every item below is checked. "Mostly done" is not done.
This checklist is verified by the QA Engineer and countersigned by the Tech Lead before
any Phase 6 (Release) actions are taken.

---

## 1. Contract Compliance (SDD)

- [ ] Implementation matches the approved Spec exactly (no undocumented endpoints or fields).
- [ ] All exception flows defined in the Spec have corresponding implementations.
- [ ] Contract tests pass (automated: Spec → actual API response).
- [ ] No API response field was added, renamed, or removed from the approved Spec without a formal amendment.

---

## 2. Test Coverage (TDD)

- [ ] All unit tests written **before** implementation (TDD Red phase confirmed in commit history).
- [ ] Unit test coverage ≥ 80% for all domain/service layers.
- [ ] Integration tests cover all inter-component boundaries.
- [ ] All tests pass in CI (green pipeline).
- [ ] No test was skipped or marked `@Ignore` without documented justification.

---

## 3. Domain Integrity (DDD)

- [ ] All entity and service names use the Ubiquitous Language from the Glossary.
- [ ] The feature was implemented within its correct Bounded Context (no cross-context coupling without explicit interface).
- [ ] No new domain terms were introduced without being added to `scrum/protocol/glossary.md`.

---

## 4. UX Validation

- [ ] UI implementation matches the approved prototype (pixel-parity for critical flows).
- [ ] UX Designer has signed off on the user journey.
- [ ] Accessibility requirements met (as defined in the UX spec).
- [ ] Mobile responsiveness validated (if applicable).

---

## 5. Observability & Telemetry (Data Lead)

- [ ] All telemetry events defined in `docs/features/{feature}/02-contract/telemetry.md` are firing in production-equivalent environment.
- [ ] Event payloads match the telemetry schema.
- [ ] Success criteria dashboards are live and showing data.
- [ ] No PII is logged in telemetry events (unless explicitly approved and compliant).

---

## 6. Documentation

- [ ] Handoff artifact for Phase 5 → Phase 6 written to `docs/sprints/sprint-{NN}/handoffs/`.
- [ ] Release notes written at `docs/features/{feature}/06-release/release-notes.md`.
- [ ] Any architectural decisions documented (ADR if applicable).
- [ ] Agent/skill files updated if a new capability was introduced.

---

## 7. Security & Compliance

- [ ] No hardcoded secrets or credentials.
- [ ] Input validation implemented on all Spec endpoints (per threat model).
- [ ] Auth/authorization rules verified (no unauthorized access to endpoints).
- [ ] SAST scan passed: 0 CRITICAL, 0 HIGH unresolved findings.
- [ ] Dependency audit passed: 0 CRITICAL CVEs unresolved.
- [ ] Security report produced and signed (`docs/features/{feature}/05-validation/security-report.md`).
- [ ] LGPD/GDPR requirements met (if data involves personal information).

---

## 8. DevOps & Deployment Readiness

- [ ] CI/CD pipeline configured and all stages pass (build, test, SAST, staging deploy, smoke test).
- [ ] Staging environment healthy before validation phase started.
- [ ] Rollback plan documented and tested.
- [ ] `docs/features/{feature}/06-release/deploy-log.md` template ready.
- [ ] Post-deploy health check thresholds defined (error rate, latency).

---

## Sign-off

| Role | Name | Date | Status |
|---|---|---|---|
| QA Engineer | | | ☐ Approved |
| Security Engineer | | | ☐ Approved |
| DevOps Engineer | | | ☐ Approved |
| Tech Lead | | | ☐ Approved |
| Product Owner | | | ☐ Approved |

> A feature may NOT proceed to Phase 6 without all five sign-offs above.
