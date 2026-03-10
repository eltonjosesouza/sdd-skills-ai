---
name: scrum.05-validation
description: Phase 5 Validation focusing on triple verification
---

**Discipline**: Triple Validation | **Sequence**: Fifth

## Goal

Perform comprehensive validation that the implementation meets all requirements: Contract compliance (SDD), User Experience (UX), and Data Analytics (Telemetry). This is the final quality gate before release.

---

## Active Agents

| Agent | Role in this phase |
|---|---|
| QA Engineer | Leads validation and testing |
| UX Designer | Validates user experience |
| Data Lead | Validates telemetry and analytics |
| Tech Lead | Resolves technical issues |
| Security Engineer | Final security validation |

---

## Skills Used

- sdd-contract — Contract compliance verification
- tdd-cycle — Test execution and validation
- ddd-modeling — Domain consistency checking
- telemetry-design — Analytics validation

---

## Process

### 1. Contract Validation (QA Engineer)
- Verify implementation matches approved Spec exactly
- Run contract tests (Spec vs actual API)
- Test all error scenarios and edge cases
- Validate business rules implementation

### 2. User Experience Validation (UX Designer)
- Compare implementation with approved prototype
- Test user flows and interactions
- Verify accessibility compliance
- Check responsive design on target devices

### 3. Data & Analytics Validation (Data Lead)
- Verify all telemetry events are implemented
- Test event schemas match approved design
- Validate data collection accuracy
- Check analytics dashboards functionality

### 4. Security Validation (Security Engineer)
- Run final security tests and scans
- Verify threat model mitigations
- Check for new vulnerabilities
- Validate compliance requirements

### 5. Performance Validation (QA Engineer)
- Test performance against Spec requirements
- Run load tests for P1 features
- Validate scalability requirements
- Check resource usage limits

### 6. Integration Testing (QA Engineer)
- Test end-to-end user journeys
- Verify inter-component interactions
- Test external service integrations
- Validate error handling across boundaries

---

## Validation Types

### Contract Validation Checklist
```markdown
## API Contract Compliance
- [ ] All endpoints from Spec are implemented
- [ ] Request/response schemas match exactly
- [ ] Error responses match Spec definitions
- [ ] Business rules are enforced correctly
- [ ] Authentication/authorization works as specified

## Business Logic Validation
- [ ] User story acceptance criteria met
- [ ] Domain invariants are maintained
- [ ] Edge cases are handled properly
- [ ] Error scenarios are covered
- [ ] Data validation rules are enforced
```

### UX Validation Checklist
```markdown
## Visual Validation
- [ ] UI matches approved prototype
- [ ] Brand guidelines are followed
- [ ] Responsive design works on all viewports
- [ ] Loading states and transitions are smooth

## Interaction Validation
- [ ] User flows work as designed
- [ ] Navigation is intuitive
- [ ] Forms have proper validation feedback
- [ ] Error states are user-friendly

## Accessibility Validation
- [ ] WCAG 2.1 AA compliance met
- [ ] Screen reader support functional
- [ ] Keyboard navigation works
- [ ] Color contrast meets standards
```

### Data Validation Checklist
```markdown
## Event Validation
- [ ] All required events are implemented
- [ ] Event schemas match approved design
- [ ] Event properties are populated correctly
- [ ] No PII is collected without approval

## Analytics Validation
- [ ] Metrics are calculated correctly
- [ ] Dashboards display accurate data
- [ ] Real-time data flows work
- [ ] Historical data is preserved

## Privacy Validation
- [ ] Data retention policies are enforced
- [ ] User consent mechanisms work
- [ ] Data anonymization is applied
- [ ] Compliance requirements are met
```

---

## Deliverables

### Validation Report (`docs/features/{feature}/05-validation/validation-report.md`)
```markdown
---
feature: {feature-name}
phase: 05-validation
artifact: validation-report
author: qa-engineer
created: {timestamp}
version: 1.0.0
status: approved
---

## Executive Summary
✅ **Feature Status**: PASSED
The User Registration feature has successfully passed all validation criteria and is ready for release.

## Detailed Results

### Contract Validation ✅ PASSED
- **API Compliance**: 100% - All endpoints match Spec
- **Business Logic**: 100% - All rules enforced correctly
- **Error Handling**: 100% - All error scenarios covered
- **Performance**: ✅ Meets all requirements (< 200ms response time)

### User Experience Validation ✅ PASSED
- **Visual Compliance**: 100% - Matches prototype exactly
- **Interaction Design**: 100% - All user flows functional
- **Accessibility**: ✅ WCAG 2.1 AA compliant
- **Responsive Design**: ✅ Works on all target devices

### Data Validation ✅ PASSED
- **Event Implementation**: 100% - All events firing correctly
- **Schema Compliance**: 100% - Matches approved design
- **Analytics Accuracy**: ✅ Metrics calculated correctly
- **Privacy Compliance**: ✅ No PII violations

### Security Validation ✅ PASSED
- **SAST Scan**: ✅ No high/critical findings
- **Dependency Scan**: ✅ No known vulnerabilities
- **Authentication**: ✅ Works as specified
- **Authorization**: ✅ Proper access controls

## Test Coverage
- **Unit Tests**: 89.2% coverage
- **Integration Tests**: 100% endpoint coverage
- **E2E Tests**: 100% user journey coverage
- **Security Tests**: 100% threat model coverage

## Issues Found and Resolved
1. **Minor**: Email validation regex was too permissive - FIXED
2. **Minor**: Password strength feedback unclear - FIXED
3. **Info**: Performance optimization opportunity - DOCUMENTED

## Recommendations
1. Monitor email delivery rates post-launch
2. Consider adding password strength meter
3. Plan performance testing at higher loads

## Final Approval
✅ **QA Engineer**: Approved for release
✅ **UX Designer**: Approved for release
✅ **Data Lead**: Approved for release
✅ **Security Engineer**: Approved for release
✅ **Tech Lead**: Approved for release
```

### Security Report (`docs/features/{feature}/05-validation/security-report.md`)
```markdown
---
feature: {feature-name}
phase: 05-validation
artifact: security-report
author: security-engineer
created: {timestamp}
version: 1.0.0
status: approved
---

## Security Assessment Summary
✅ **Overall Security Posture**: ACCEPTABLE
No critical or high-severity vulnerabilities found. All mitigations from threat model are implemented.

## Vulnerability Assessment
### Static Analysis (SAST)
- **Critical**: 0 findings
- **High**: 0 findings
- **Medium**: 1 finding (information disclosure) - MITIGATED
- **Low**: 3 findings - ACCEPTED

### Dependency Scanning
- **Critical**: 0 findings
- **High**: 0 findings
- **Medium**: 0 findings
- **Low**: 2 findings (outdated dependencies) - SCHEDULED

### Dynamic Analysis (DAST)
- **Authentication Bypass**: ✅ PROTECTED
- **SQL Injection**: ✅ PROTECTED
- **XSS**: ✅ PROTECTED
- **CSRF**: ✅ PROTECTED

## Threat Model Validation
### Credential Stuffing ✅ MITIGATED
- Rate limiting enforced (5 attempts/minute)
- Account lockout implemented (15 minutes)
- Monitoring alerts configured

### Email Enumeration ✅ MITIGATED
- Generic error messages implemented
- Timing attacks mitigated
- Rate limiting on email check endpoint

## Compliance Check
- **GDPR**: ✅ Compliant
- **Data Protection**: ✅ Policies enforced
- **Audit Trail**: ✅ Implemented
- **Access Controls**: ✅ Properly configured

## Security Recommendations
1. Implement account recovery feature
2. Add security headers (CSP, HSTS)
3. Plan regular penetration testing

## Final Security Approval
✅ **Approved for production deployment**
```

---

## Exit Criteria

Phase 5 is complete when:
- [ ] All validation checklists are 100% complete
- [ ] No critical or high-severity issues remain
- [ ] All stakeholders approve validation reports
- [ ] Feature meets Definition of Done criteria
- [ ] Release readiness is confirmed

---

## Common Pitfalls

1. **Incomplete testing** - Test all scenarios, not just happy paths
2. **Ignoring accessibility** - Accessibility is a requirement, not a nice-to-have
3. **Skipping security validation** - Security must be validated before release
4. **Poor documentation** - Document all findings and resolutions
5. **Rushing validation** - Thorough validation prevents production issues

---

## Next Phase

With successful validation, the feature moves to Phase 6 (Release) where it will be deployed to production and the feedback loop will be closed.
