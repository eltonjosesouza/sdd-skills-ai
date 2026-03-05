# Scrum Overview

SDD Skills AI includes a complete implementation of Scrum methodology with SDD+TDD+DDD disciplines. This guide explains how to use Scrum for AI-driven development teams.

---

## 🎯 What is Scrum in SDD Skills AI?

Scrum in SDD Skills AI is a **structured methodology** that combines:
- **Scrum framework** for iterative development
- **SDD (Spec-Driven Development)** for requirements management
- **TDD (Test-Driven Development)** for quality assurance
- **DDD (Domain-Driven Design)** for domain modeling

This combination ensures that AI agents work in a disciplined, predictable, and collaborative way.

---

## 🔄 The Scrum Flow

### Three Interleaved Disciplines

```
DISCOVERY (DDD) ──▶ CONTRACT (SDD) ──▶ EXECUTION (TDD)
      ↑                                        │
      └──────── Feedback Loop (Data) ◀──────────┘
```

| Discipline | Question it answers | Primary focus |
|---|---|---|
| **DDD** | What are we building and for whom? | Domain understanding |
| **SDD** | How will the system behave? | Specification contracts |
| **TDD** | Does it actually behave that way? | Implementation quality |

### Six-Phase Sequence

1. **Phase 1: Discovery & Definition** - Problem framing and domain modeling
2. **Phase 2: Contract Creation** - SDD specification writing
3. **Phase 3: Sprint Planning** - Task breakdown and commitment
4. **Phase 4: Development** - TDD implementation
5. **Phase 5: Validation** - Triple verification (contract, UX, data)
6. **Phase 6: Release** - Deployment and feedback loop

---

## 👥 Scrum Agents

SDD Skills AI provides **9 specialized AI agents** for Scrum roles:

### Core Scrum Roles
- **@scrum.product-owner** - Orchestrator of Discovery and backlog management
- **@scrum.scrum-master** - Facilitator of ceremonies and process guardian
- **@scrum.tech-lead** - Technical authority and SDD contract owner
- **@scrum.developer** - Implementation expert using TDD discipline

### Specialist Roles
- **@scrum.ux-designer** - User experience advocate and prototype validator
- **@scrum.qa-engineer** - Quality orchestration and contract guardian
- **@scrum.security-engineer** - Security orchestration and threat modeling
- **@scrum.devops-engineer** - Infrastructure orchestration and deployment path
- **@scrum.data-lead** - Telemetry design and data-driven decisions

### Agent Participation by Phase

| Phase | Active Agents | Focus |
|---|---|---|
| **Discovery** | PO, UX, Data Lead, Scrum Master | Problem understanding |
| **Contract** | Tech Lead, QA, Security, Data Lead | Specification |
| **Planning** | All agents (facilitated by Scrum Master) | Task breakdown |
| **Development** | Developer, Tech Lead, Security | Implementation |
| **Validation** | QA, UX, Data Lead | Quality verification |
| **Release** | DevOps, PO, Data Lead | Deployment |

---

## 🛠️ Scrum Skills

SDD Skills AI includes **13 Scrum-specific skills**:

### Core Disciplines
- **scrum.sdd-contract** - Spec-driven development discipline
- **scrum.tdd-cycle** - Test-driven development methodology
- **scrum.ddd-modeling** - Domain-driven design principles
- **scrum.telemetry-design** - Event design and analytics

### Protocol Rules
- **scrum.scrum-flow** - Phase sequence and ceremony rules
- **scrum.communication** - Artifact-first coordination
- **scrum.dod-checklist** - Definition of Done validation

### Phase-Specific Skills
- **scrum.01-discovery** - Phase 1 guidance
- **scrum.02-contract** - Phase 2 guidance
- **scrum.03-sprint-planning** - Phase 3 guidance
- **scrum.04-development** - Phase 4 guidance
- **scrum.05-validation** - Phase 5 guidance
- **scrum.06-release** - Phase 6 guidance

---

## 🔄 Scrum Workflows

### Feature Lifecycle Workflow
```bash
/scrum.feature-lifecycle
```

**Complete 6-phase feature development:**
1. Discovery & Definition
2. Contract Creation
3. Sprint Planning
4. Development
5. Validation
6. Release

### Sprint Planning Workflow
```bash
/scrum.sprint-planning
```

**Sprint Planning ceremony:**
- Backlog refinement
- Task breakdown
- Effort estimation
- Commitment

### Agent Setup Workflow
```bash
/scrum.setup-agent-configs
```

**Configure Scrum agents:**
- Update Agents.md with Scrum roles
- Update Claude.md with Scrum integration
- Create agent configurations

---

## 🚀 Getting Started with Scrum

### 1. Install Scrum Methodology
```bash
# Install complete Scrum implementation
sdd-skills-ai install-scrum --agent windsurf

# Configure agent files
sdd-skills-ai setup-scrum-configs --agent windsurf
```

### 2. Start Your First Feature
```bash
# In your AI assistant:
/scrum.feature-lifecycle

# Or work with specific agents:
@scrum.product-owner Help me define a user story for user authentication
@scrum.tech-lead Create the SDD contract for the authentication API
@scrum.developer Implement the authentication endpoints using TDD
```

### 3. Follow the Process
1. **Start with Phase 1**: Use `@scrum.product-owner` and `@scrum.ux-designer`
2. **Move to Phase 2**: Use `@scrum.tech-lead` and `@scrum.qa-engineer`
3. **Plan in Phase 3**: Use `/scrum.sprint-planning`
4. **Develop in Phase 4**: Use `@scrum.developer` with TDD
5. **Validate in Phase 5**: Use `@scrum.qa-engineer` and `@scrum.ux-designer`
6. **Release in Phase 6**: Use `@scrum.devops-engineer`

---

## 📋 Artifact-First Communication

### Core Rule
> "If it is not written in the artifact, it did not happen."

### Communication Protocol
1. **Read artifacts** from previous phase before starting
2. **Write artifacts** before triggering next phase
3. **Use standard templates** for consistency
4. **Link dependencies** between artifacts

### Artifact Types
- **User Story** - Feature requirements and acceptance criteria
- **Spec (Contract)** - Technical specification and behavior
- **Test Strategy** - Testing approach and coverage
- **Validation Report** - Quality verification results
- **Deploy Log** - Release documentation

---

## ✅ Definition of Done

A feature is **Done** only when every item below is checked:

### Contract Compliance (SDD)
- [ ] Implementation matches approved Spec exactly
- [ ] All exception flows have corresponding implementations
- [ ] Contract tests pass (automated: Spec → actual API)

### Test Coverage (TDD)
- [ ] All unit tests written before implementation
- [ ] Unit test coverage ≥ 80% for domain/service layers
- [ ] All tests pass in CI (green pipeline)

### Domain Integrity (DDD)
- [ ] Ubiquitous Language used consistently
- [ ] Bounded Context boundaries are respected
- [ ] Domain entities maintain invariants

### User Experience (UX)
- [ ] Implementation matches approved prototype
- [ ] All user flows are functional
- [ ] Accessibility requirements are met

### Security Requirements
- [ ] Threat model is addressed
- [ ] No OWASP Top 10 vulnerabilities
- [ ] Authentication and authorization work as specified

### Performance & Scalability
- [ ] Performance criteria are met
- [ ] Load testing completed for P1 features
- [ ] Resource usage is within acceptable limits

### Infrastructure & DevOps
- [ ] CI/CD pipeline successfully builds and deploys
- [ ] Monitoring and alerting are configured
- [ ] Rollback plan is documented and tested

### Data & Telemetry
- [ ] All telemetry events are implemented
- [ ] Event schema matches approved design
- [ ] No PII is collected without approval

### Documentation
- [ ] API documentation is updated and accurate
- [ ] Architecture decisions are filed
- [ ] User-facing documentation is prepared

---

## 🎯 Best Practices

### For Individuals
- **Follow the phases strictly** - Don't skip or reorder phases
- **Use the right agents** - Each phase has specific agents
- **Write good artifacts** - Templates and consistency matter
- **Validate continuously** - Don't wait until the end

### For Teams
- **Standardize on Scrum** - All team members follow the same process
- **Assign agent roles** - Clear responsibilities for each phase
- **Review artifacts together** - Collaborative validation
- **Track metrics** - Use telemetry to improve process

### For Organizations
- **Integrate with existing tools** - Scrum works with any AI assistant
- **Customize templates** - Adapt to organizational needs
- **Train teams** - Ensure everyone understands the process
- **Measure success** - Track velocity and quality metrics

---

## 🔗 Related Documentation

- [Scrum Agents](agents.md) - Detailed agent roles and responsibilities
- [Scrum Phases](phases.md) - Complete phase-by-phase guide
- [Scrum Protocol](protocol.md) - Communication and process rules
- [CLI Reference](../cli.md) - Command-line interface documentation

---

*Ready to start using Scrum? Check out the [Scrum Agents](agents.md) guide to learn about each role.*
