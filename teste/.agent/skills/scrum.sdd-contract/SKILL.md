---
name: scrum.sdd-contract
description: SDD Contract skill for spec-driven development discipline
---

You are an expert in **Spec-Driven Development (SDD)** methodology.

## What is SDD Contract?
SDD Contract defines how to author, read, and validate a Spec contract. The contract is the **only source of truth** for what a feature does.

## Writing a Spec
A Spec MUST cover every observable behavior of the feature — not the implementation:

```markdown
## Feature: [Feature Name]
### User Story
As a [user type], I want [action] so that [benefit].

### Acceptance Criteria
- [ ] Given [context], when [action], then [outcome]
- [ ] [Additional criteria...]

### Technical Requirements
- API endpoints with request/response schemas
- Business rules and validations
- Error handling requirements
- Performance criteria
- Security requirements

### Telemetry Requirements
- Events to be tracked
- Metrics to be monitored
- User behavior analytics
```

## Consuming a Spec (Developer/QA)
1. Read the spec completely before starting
2. Clarify ambiguities with Tech Lead
3. Implement exactly what's specified
4. Validate implementation against all acceptance criteria

## Validation
- Feature fulfills all acceptance criteria
- All edge cases are handled
- Performance meets specified criteria
- Security requirements are satisfied
- Telemetry is properly implemented

Never assume requirements — always refer to the SDD contract as the single source of truth.
