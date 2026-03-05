---
name: scrum.communication
description: Communication Protocol defining artifact-first agent coordination
---

This document defines how agents pass information between phases. Agents communicate **exclusively through written artifacts** — no implicit state, no oral agreements, no assumptions from previous steps.

## Core Rule: Artifact-First Communication

> "If it is not written in the artifact, it did not happen."

Agents MUST read the artifacts of the previous phase before starting their own.
Agents MUST write their outputs as artifacts before triggering the next phase.

## Artifact Ownership Map

| Artifact | Produced by | Consumed by | Location |
|---|---|---|---|
| Tech Stack | Tech Lead | All | `docs/architecture/tech-stack.md` |
| Tooling | DevOps + Tech Lead | Developers | `docs/architecture/tooling.md` |
| ADRs | Tech Lead | All | `docs/architecture/decisions/` |
| User Story | Product Owner | All | `docs/features/{feature}/01-discovery/user-story.md` |
| UX Prototype | UX Designer | Tech Lead, QA | `docs/features/{feature}/01-discovery/prototype.md` |
| Domain Glossary | PO + Tech Lead | All | `scrum/protocol/glossary.md` (shared) |
| Spec (Contract) | Tech Lead | Dev, QA, Data Lead, Frontend | `docs/features/{feature}/02-contract/spec.md` |
| Threat Model | Security Engineer | Tech Lead, Dev | `docs/features/{feature}/02-contract/threat-model.md` |
| Test Strategy | QA Engineer | Dev, Tech Lead | `docs/features/{feature}/03-planning/test-strategy.md` |
| Validation Report | QA Engineer | PO, Tech Lead | `docs/features/{feature}/05-validation/validation-report.md` |
| Security Report | Security Engineer | PO, Tech Lead | `docs/features/{feature}/05-validation/security-report.md` |
| Deploy Log | DevOps Engineer | All | `docs/features/{feature}/06-release/deploy-log.md` |

## Communication Rules

### 1. Reading Protocol
Before starting any phase, agents MUST:
1. Read all artifacts from previous phase
2. Confirm understanding with phase lead
3. Document any ambiguities
4. Request clarification before proceeding

### 2. Writing Protocol
When completing any phase, agents MUST:
1. Write all required artifacts in standard locations
2. Use templates and maintain consistency
3. Include version numbers and timestamps
4. Link to dependent artifacts

### 3. Handoff Meetings
Each phase transition includes:
1. **Producer presents** completed artifacts
2. **Consumers validate** artifact completeness
3. **Group confirms** readiness to proceed
4. **Scrum Master documents** handoff decision

### 4. Conflict Resolution
When artifacts conflict:
1. **Stop work** immediately
2. **Document conflict** in issue tracker
3. **Call emergency meeting** with all involved agents
4. **Resolve conflict** and update artifacts
5. **Resume work** only after resolution

## Artifact Standards

### File Naming
```
{feature-name}-{phase}-{artifact-type}.{ext}

Examples:
- user-auth-01-discovery-user-story.md
- payment-api-02-contract-spec.md
- dashboard-05-validation-report.md
```

### Metadata Header
```markdown
---
feature: {feature-name}
phase: {phase-number}
artifact: {artifact-type}
author: {agent-name}
created: {timestamp}
version: {semantic-version}
status: draft|review|approved|archived
---
```

### Content Structure
1. **Executive Summary** (1-2 sentences)
2. **Detailed Content** (following artifact template)
3. **Dependencies** (links to other artifacts)
4. **Next Steps** (what happens after this artifact)

## Emergency Communication

For production emergencies:
1. **Create incident channel** immediately
2. **Document incident** in `docs/incidents/`
3. **Assign incident commander** (usually DevOps)
4. **Coordinate response** via written updates
5. **Post-mortem** must be written before resuming normal flow

This protocol eliminates ambiguity and ensures every decision is traceable and auditable.
