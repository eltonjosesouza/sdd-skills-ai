---
name: scrum.feature-lifecycle
description: Complete 6-phase feature lifecycle workflow from discovery to release
---

This workflow orchestrates all 6 phases of a feature using Scrum with SDD+TDD+DDD disciplines.

## Trigger
Product Owner promotes item from backlog to "Ready for Sprint"

## Step 1: Discovery Session
**Agent**: Scrum Master (facilitates) + PO, UX, Data Lead (execute)
**Duration**: 2-4 hours
**Outputs**: 
- User story with acceptance criteria
- Low-fidelity prototype
- Data validation report

## Step 2: Contract Creation  
**Agent**: Tech Lead (lead) + Security Engineer (threat model)
**Duration**: 4-8 hours
**Outputs**:
- Complete SDD contract spec
- Threat model document
- Technical requirements

## Step 3: Sprint Planning
**Agent**: Scrum Master (facilitates) + entire team
**Duration**: 2 hours
**Outputs**:
- Task breakdown with estimates
- Sprint commitment
- Test strategy

## Step 4: Development
**Agent**: Developer (lead) + Tech Lead (review)
**Duration**: Variable (based on complexity)
**Outputs**:
- Working code with TDD compliance
- Unit and integration tests
- Code review approval

## Step 5: Validation
**Agent**: QA Engineer (lead) + UX Designer, Data Lead
**Duration**: 2-4 hours
**Outputs**:
- Validation report
- Security audit results
- Performance test results

## Step 6: Release
**Agent**: DevOps Engineer (lead) + PO (acceptance)
**Duration**: 1-2 hours
**Outputs**:
- Deployed feature
- Release notes
- Monitoring setup

## Handoff Protocol
Each phase ends with a formal handoff meeting where:
1. Deliverables are reviewed and approved
2. Next phase team confirms readiness
3. Any blockers are identified and resolved
4. Progress is updated in project tracking

## Definition of Done Checklist
- [ ] SDD contract fully implemented
- [ ] All tests passing (>90% coverage)
- [ ] Security review completed
- [ ] Performance criteria met
- [ ] Documentation updated
- [ ] Monitoring configured
- [ ] PO acceptance received

Only proceed to next phase when current phase is 100% complete according to DoD.
