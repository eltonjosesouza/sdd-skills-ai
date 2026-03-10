---
name: scrum.02-contract
description: Phase 2 Contract Creation focusing on SDD specification
---

**Discipline**: SDD | **Sequence**: Second

## Goal

Create the single source of truth for feature behavior. The Spec is the contract between business and development — it defines exactly what the system will do, not how it will do it.

---

## Active Agents

| Agent | Role in this phase |
|---|---|
| Tech Lead | Writes and owns the Spec |
| QA Engineer | Reviews for testability and completeness |
| Security Engineer | Performs threat modeling |
| Data Lead | Defines telemetry requirements |

---

## Skills Used

- sdd-contract — Spec writing and validation
- ddd-modeling — Domain consistency verification
- telemetry-design — Event schema definition
- tdd-cycle — Test strategy planning

---

## Process

### 1. Spec Writing (Tech Lead)
- Read all Phase 1 artifacts thoroughly
- Write complete Spec following template
- Define all observable behaviors
- Specify all edge cases and exceptions

### 2. Threat Modeling (Security Engineer)
- Identify attack vectors for each endpoint
- Define security requirements
- Document authentication/authorization needs
- Create security test cases

### 3. Test Strategy (QA Engineer)
- Define test coverage requirements
- Plan automated vs manual testing
- Identify integration points
- Create test data requirements

### 4. Telemetry Design (Data Lead)
- Define event schemas for all user actions
- Specify metrics and KPIs
- Plan data validation needs
- Ensure privacy compliance

### 5. Contract Review (All)
- Review Spec for completeness and clarity
- Validate threat model coverage
- Confirm test strategy adequacy
- Approve telemetry design

---

## Deliverables

### Spec (`docs/features/{feature}/02-contract/spec.md`)
```markdown
---
feature: {feature-name}
phase: 02-contract
artifact: spec
author: tech-lead
created: {timestamp}
version: 1.0.0
status: approved
---

## Feature Overview
[Brief description of what this feature does]

## API Endpoints

### POST /api/v1/users
**Purpose**: Create a new user account

**Request**:
```json
{
  "email": "string (required, email format)",
  "name": "string (required, 1-100 chars)",
  "password": "string (required, 8-128 chars)"
}
```

**Responses**:
- 201: User created successfully
```json
{
  "id": "uuid",
  "email": "string",
  "name": "string",
  "createdAt": "datetime"
}
```
- 400: Validation error
```json
{
  "error": "VALIDATION_ERROR",
  "field": "email",
  "message": "Invalid email format"
}
```
- 409: User already exists

**Business Rules**:
- Email must be unique across all users
- Password must meet complexity requirements
- Account is created in "pending" status until email verification

**Edge Cases**:
- Duplicate email registration
- Invalid email format
- Password too weak
- Missing required fields
```

### Threat Model (`docs/features/{feature}/02-contract/threat-model.md`)
```markdown
---
feature: {feature-name}
phase: 02-contract
artifact: threat-model
author: security-engineer
created: {timestamp}
version: 1.0.0
status: approved
---

## Attack Vectors

### 1. Credential Stuffing
**Risk**: High
**Mitigation**: Rate limiting, account lockout
**Detection**: Multiple failed attempts from same IP

### 2. Email Enumeration
**Risk**: Medium
**Mitigation**: Generic error messages
**Detection**: Timing analysis attacks

## Security Requirements
- Password hashing with bcrypt (cost >= 12)
- Rate limiting: 5 attempts per minute per IP
- Account lockout: 15 minutes after 10 failed attempts
- Email verification required within 24 hours

## Security Tests
- [ ] SQL injection attempts
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Rate limiting enforcement
```

### Test Strategy (`docs/features/{feature}/03-planning/test-strategy.md`)
```markdown
---
feature: {feature-name}
phase: 03-planning
artifact: test-strategy
author: qa-engineer
created: {timestamp}
version: 1.0.0
status: approved
---

## Test Coverage Requirements
- Unit tests: ≥ 80% line coverage
- Integration tests: All API endpoints
- Contract tests: Spec compliance
- Security tests: OWASP Top 10
- Performance tests: Load testing for P1 features

## Test Categories
### Unit Tests
- Domain logic validation
- Business rule enforcement
- Input validation

### Integration Tests
- API endpoint functionality
- Database operations
- External service integration

### Contract Tests
- Request/response schema validation
- Error handling verification
- Business rule compliance

## Test Data Strategy
- Fixtures for common scenarios
- Factories for dynamic test data
- Cleanup procedures for isolation
```

---

## Exit Criteria

Phase 2 is complete when:
- [ ] Spec is complete and unambiguous
- [ ] Threat model addresses all identified risks
- [ ] Test strategy ensures comprehensive coverage
- [ ] Telemetry design captures all success metrics
- [ ] All agents approve moving to Phase 3

---

## Common Pitfalls

1. **Implementation details** - Don't specify how, only what
2. **Missing edge cases** - Think about all failure modes
3. **Ambiguous language** - Use precise, testable statements
4. **Incomplete error handling** - Specify all error responses
5. **Forgetting security** - Security is a requirement, not an afterthought

---

## Next Phase

With approved contract, the team moves to Phase 3 (Sprint Planning) where work will be broken down into actionable tasks and estimates provided.
