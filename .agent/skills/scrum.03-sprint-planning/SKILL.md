---
name: scrum.03-sprint-planning
description: Phase 3 Sprint Planning focusing on task breakdown and commitment
---

**Discipline**: Scrum | **Sequence**: Third

## Goal

Break the approved Spec into actionable tasks, provide realistic estimates, and commit to delivery. This phase transforms the contract into a concrete execution plan.

---

## Active Agents

| Agent | Role in this phase |
|---|---|
| Scrum Master | Facilitates planning ceremony |
| Product Owner | Clarifies business requirements |
| Tech Lead | Provides technical guidance |
| Developer | Provides effort estimates |
| QA Engineer | Plans testing approach |
| Security Engineer | Identifies security tasks |
| DevOps Engineer | Plans infrastructure needs |
| Data Lead | Plans data and analytics work |

---

## Skills Used

- tdd-cycle — Task breakdown for implementation
- sdd-contract — Understanding requirements for estimation
- ddd-modeling — Domain context for task organization

---

## Process

### 1. Backlog Refinement (Product Owner)
- Review approved Spec from Phase 2
- Break into user-visible components
- Prioritize by business value
- Define acceptance criteria for each component

### 2. Technical Breakdown (Tech Lead + Developers)
- Decompose components into technical tasks
- Identify dependencies between tasks
- Plan implementation sequence
- Define technical spikes for unknown areas

### 3. Effort Estimation (Developers)
- Estimate each task using story points
- Consider complexity, uncertainty, and effort
- Identify risks and assumptions
- Buffer for unexpected issues

### 4. Resource Planning (All Specialists)
- QA: Test preparation and execution time
- Security: Security review and testing
- DevOps: Infrastructure and deployment work
- Data: Analytics setup and validation

### 5. Sprint Commitment (All)
- Review total estimated work against capacity
- Adjust scope if necessary
- Make formal commitment to delivery
- Define sprint goal and success criteria

---

## Deliverables

### Sprint Backlog (`docs/sprints/sprint-{number}/backlog.md`)
```markdown
---
sprint: {sprint-number}
phase: 03-sprint-planning
artifact: backlog
author: scrum-master
created: {timestamp}
version: 1.0.0
status: approved
---

## Sprint Goal
{Measurable business outcome for this sprint}

## Capacity Planning
- Total team velocity: {points} points
- Available capacity: {points} points
- Committed work: {points} points
- Buffer capacity: {points} points

## Sprint Backlog

### Feature: User Registration (8 points)
#### User Story: Create new account (5 points)
- [ ] Setup project structure (1 point)
- [ ] Implement user model (1 point)
- [ ] Create registration endpoint (2 points)
- [ ] Add input validation (1 point)

#### User Story: Email verification (3 points)
- [ ] Implement email service (1 point)
- [ ] Create verification endpoint (1 point)
- [ ] Add verification logic (1 point)

### Technical Tasks (3 points)
- [ ] Setup database schema (1 point)
- [ ] Configure authentication middleware (1 point)
- [ ] Add logging and monitoring (1 point)

### QA Tasks (2 points)
- [ ] Write unit tests (1 point)
- [ ] Setup integration tests (1 point)

### Security Tasks (1 point)
- [ ] Security review and testing (1 point)

## Dependencies
- Email service configuration required before registration endpoint
- Database schema must be approved by DBA

## Risks
- Third-party email service reliability
- Database performance under load

## Definition of Done for Sprint
- [ ] All user stories completed and tested
- [ ] Security review passed
- [ ] Documentation updated
- [ ] Deployed to staging environment
```

### Task Breakdown (`docs/features/{feature}/03-planning/tasks.md`)
```markdown
---
feature: {feature-name}
phase: 03-sprint-planning
artifact: tasks
author: tech-lead
created: {timestamp}
version: 1.0.0
status: approved
---

## Technical Tasks

### 1. Backend Implementation (4 points)
#### 1.1 Domain Model (1 point)
- Create User entity with invariants
- Implement UserRepository interface
- Add domain service for user creation

#### 1.2 API Layer (2 points)
- POST /api/v1/users endpoint
- Input validation middleware
- Error handling and response formatting

#### 1.3 Infrastructure (1 point)
- Database table creation
- Index optimization for email lookup
- Connection pooling configuration

### 2. Testing (2 points)
#### 2.1 Unit Tests (1 point)
- User domain logic tests
- Repository implementation tests
- Service layer tests

#### 2.2 Integration Tests (1 point)
- API endpoint tests
- Database integration tests
- Error scenario tests

### 3. Security (1 point)
- Password hashing implementation
- Input sanitization
- Rate limiting setup

## Implementation Order
1. Domain model and repository
2. Database schema and infrastructure
3. API endpoints and validation
4. Security implementation
5. Testing and documentation

## Acceptance Criteria
Each task must meet:
- Code review approved
- Tests passing
- Security scan clean
- Documentation updated
```

---

## Exit Criteria

Phase 3 is complete when:
- [ ] All work is broken down into tasks ≤ 3 points
- [ ] Total estimated work fits within team capacity
- [ ] Dependencies are identified and planned
- [ ] Risks are documented with mitigation plans
- [ ] Sprint goal is defined and achievable
- [ ] All team members commit to the plan

---

## Common Pitfalls

1. **Too large tasks** - Break down anything > 3 points
2. **Forgotten dependencies** - Map all task relationships
3. **Optimistic estimates** - Add buffer for uncertainty
4. **Missing specialist work** - Include QA, Security, DevOps tasks
5. **Unclear acceptance criteria** - Define what "done" means for each task

---

## Next Phase

With approved sprint plan, the team moves to Phase 4 (Development) where tasks will be implemented following TDD discipline.
