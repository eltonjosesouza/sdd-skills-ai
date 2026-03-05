---
name: scrum.dod-checklist
description: Definition of Done checklist ensuring quality gates before release
---

A feature is **Done** only when every item below is checked. "Mostly done" is not done. This checklist is verified by the QA Engineer and countersigned by the Tech Lead before any Phase 6 (Release) actions are taken.

## 1. Contract Compliance (SDD)

- [ ] Implementation matches the approved Spec exactly (no undocumented endpoints or fields)
- [ ] All exception flows defined in the Spec have corresponding implementations
- [ ] Contract tests pass (automated: Spec → actual API response)
- [ ] No API response field was added, renamed, or removed from the approved Spec without a formal amendment

## 2. Test Coverage (TDD)

- [ ] All unit tests written **before** implementation (TDD Red phase confirmed in commit history)
- [ ] Unit test coverage ≥ 80% for all domain/service layers
- [ ] Integration tests cover all inter-component boundaries
- [ ] All tests pass in CI (green pipeline)
- [ ] No test was skipped or marked `@Ignore` without documented justification

## 3. Domain Integrity (DDD)

- [ ] Ubiquitous Language from Phase 1 is used consistently in code and documentation
- [ ] Bounded Context boundaries are respected (no cross-context domain leakage)
- [ ] Domain entities maintain invariants (no anemic domain models)
- [ ] Business rules are implemented in domain layer, not infrastructure

## 4. User Experience (UX)

- [ ] Implementation matches approved prototype exactly
- [ ] All user flows documented in prototype are functional
- [ ] Accessibility requirements (WCAG 2.1 AA) are met
- [ ] Responsive design works on all target devices
- [ ] Error states and edge cases have proper UI treatment

## 5. Security Requirements

- [ ] Threat model from Phase 2 has been addressed
- [ ] No OWASP Top 10 vulnerabilities in implementation
- [ ] Authentication and authorization work as specified
- [ ] Input validation and output encoding are implemented
- [ ] SAST scan passes with no high/critical findings
- [ ] Dependencies are free from known vulnerabilities

## 6. Performance & Scalability

- [ ] Performance criteria from Spec are met (response times, throughput)
- [ ] Load testing completed for P1 features
- [ ] Database queries are optimized (no N+1 queries)
- [ ] Caching strategy is implemented where appropriate
- [ ] Resource usage is within acceptable limits

## 7. Infrastructure & DevOps

- [ ] CI/CD pipeline successfully builds and deploys the feature
- [ ] Infrastructure as Code is updated and versioned
- [ ] Monitoring and alerting are configured
- [ ] Log aggregation includes relevant events
- [ ] Health checks are implemented and functional
- [ ] Rollback plan is documented and tested

## 8. Data & Telemetry

- [ ] All telemetry events from Phase 2 are implemented
- [ ] Event schema matches approved design exactly
- [ ] No PII is collected without explicit compliance approval
- [ ] Data retention policies are implemented
- [ ] Analytics dashboards are updated and functional

## 9. Documentation

- [ ] API documentation is updated and accurate
- [ ] Runbooks for operational procedures are created
- [ ] Architecture Decision Records (ADRs) are filed for significant decisions
- [ ] User-facing documentation (help, release notes) is prepared
- [ ] Code comments explain complex business logic

## 10. Compliance & Legal

- [ ] Privacy requirements (GDPR/LGPD) are met
- [ ] Legal review is complete for regulated features
- [ ] Audit trail is maintained where required
- [ ] Data processing agreements are honored
- [ ] User consent mechanisms are implemented correctly

## Sign-off Process

1. **QA Engineer** verifies all checklist items
2. **Tech Lead** reviews and countersigns
3. **Product Owner** confirms business value is delivered
4. **Scrum Master** documents final DoD approval
5. **Release Coordinator** (DevOps) schedules deployment

## Emergency Exceptions

For production emergencies:
1. **Document exception** with justification
2. **Get approval** from Tech Lead and Product Owner
3. **Create follow-up ticket** to address missing items
4. **Schedule fix** before next feature work

A feature that doesn't meet 100% of DoD is not Done. Period.
