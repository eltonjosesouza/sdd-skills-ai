---
name: scrum.01-discovery
description: Phase 1 Discovery & Definition focusing on problem understanding
---

**Discipline**: DDD | **Sequence**: First

## Goal

Understand the problem before proposing any solution. Define the domain language that will be used throughout all subsequent phases.

---

## Active Agents

| Agent | Role in this phase |
|---|---|
| Product Owner | Defines the problem and writes the User Story |
| UX Designer | Validates prototype with users |
| Data Lead | Validates feasibility from historical data |
| Scrum Master | Facilitates the discovery session |

---

## Skills Used

- ddd-modeling — Ubiquitous Language definition, context mapping
- telemetry-design — Early metric identification

---

## Process

### 1. Problem Framing (Product Owner)
- Write User Story following template:
```
As a [user type], I want [action] so that [benefit].
```
- Define acceptance criteria
- Identify business constraints
- Set success metrics

### 2. Domain Modeling (Product Owner + Tech Lead)
- Define Ubiquitous Language
- Identify Bounded Contexts
- Map domain entities and relationships
- Document business rules

### 3. User Research (UX Designer)
- Create low-fidelity prototype
- Validate with real users
- Document user journey flows
- Identify edge cases

### 4. Data Validation (Data Lead)
- Analyze historical data for hypothesis validation
- Identify data availability and quality issues
- Propose early telemetry events
- Estimate data-driven success probability

### 5. Discovery Review (All)
- Review all artifacts for completeness
- Confirm shared understanding
- Identify risks and dependencies
- Approve moving to Contract phase

---

## Deliverables

### User Story (`docs/features/{feature}/01-discovery/user-story.md`)
```markdown
---
feature: {feature-name}
phase: 01-discovery
artifact: user-story
author: product-owner
created: {timestamp}
version: 1.0.0
status: approved
---

## User Story
As a [user type], I want [action] so that [benefit].

## Acceptance Criteria
- [ ] Given [context], when [action], then [outcome]
- [ ] [Additional criteria...]

## Business Constraints
- [ ] Performance: < 2s response time
- [ ] Scale: 10,000 concurrent users
- [ ] Compliance: GDPR compliant

## Success Metrics
- Conversion rate increase: 15%
- User satisfaction: > 4.5/5
- Task completion time: < 30s

## Domain Glossary
- **Term**: Definition
- **Term**: Definition
```

### Prototype (`docs/features/{feature}/01-discovery/prototype.md`)
```markdown
---
feature: {feature-name}
phase: 01-discovery
artifact: prototype
author: ux-designer
created: {timestamp}
version: 1.0.0
status: approved
---

## User Flow
1. User navigates to [page]
2. User performs [action]
3. System responds with [outcome]

## Screens
- Screen 1: [Description]
- Screen 2: [Description]

## Interaction Design
- [Interaction details]

## Accessibility Notes
- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation
```

### Data Validation (`docs/features/{feature}/01-discovery/data-validation.md`)
```markdown
---
feature: {feature-name}
phase: 01-discovery
artifact: data-validation
author: data-lead
created: {timestamp}
version: 1.0.0
status: approved
---

## Hypothesis Validation
- **Hypothesis**: [Statement]
- **Historical Data**: [Analysis]
- **Confidence**: [High/Medium/Low]

## Data Availability
- **Required Data**: [List]
- **Current Availability**: [Status]
- **Quality Assessment**: [Good/Fair/Poor]

## Proposed Telemetry
- **Event**: user.action.completed
- **Properties**: action_type, user_segment, timestamp
- **Purpose**: Measure conversion funnel
```

---

## Exit Criteria

Phase 1 is complete when:
- [ ] User Story is written and approved
- [ ] Prototype is created and user-validated
- [ ] Domain language is defined and documented
- [ ] Data validation confirms feasibility
- [ ] All agents approve moving to Phase 2

---

## Common Pitfalls

1. **Solution jumping** - Don't discuss implementation in Discovery
2. **Vague requirements** - Use specific, measurable acceptance criteria
3. **Skipping user validation** - Always validate with real users
4. **Ignoring constraints** - Document all business and technical constraints
5. **Poor domain language** - Invest time in Ubiquitous Language

---

## Next Phase

With completed Discovery artifacts, the team moves to Phase 2 (Contract) where the Tech Lead will create the technical specification based on the user story and prototype.
