---
name: scrum.install-scrum-agents
description: Install complete Scrum agents kit with skills and workflows
---

This workflow installs the complete Scrum agents kit including all agents, skills, and workflows for SDD+TDD+DDD implementation.

## Step 1: Verify Prerequisites
**Check**: Project has sdd-skills-ai initialized
**Check**: .agent directory exists
**Check**: Git repository is initialized

## Step 2: Install Scrum Agents
Install all 9 Scrum role agents:
- Product Owner (scrum.product-owner)
- Scrum Master (scrum.scrum-master)  
- UX Designer (scrum.ux-designer)
- Developer (scrum.developer)
- QA Engineer (scrum.qa-engineer)
- Security Engineer (scrum.security-engineer)
- DevOps Engineer (scrum.devops-engineer)
- Data Lead (scrum.data-lead)
- Tech Lead (scrum.tech-lead)

## Step 3: Install Core Skills
Install essential Scrum skills:
- SDD Contract (scrum.sdd-contract)
- TDD Cycle (scrum.tdd-cycle)
- DDD Modeling (scrum.ddd-modeling)
- Telemetry Design (scrum.telemetry-design)

## Step 4: Install Workflows
Install Scrum workflows:
- Feature Lifecycle (scrum.feature-lifecycle)
- Sprint Planning (scrum.sprint-planning)
- Bug Fix (scrum.bug-fix)
- Project Init (scrum.project-init)

## Step 5: Create Documentation Structure
Create project documentation structure:
```
docs/
├── architecture/
├── features/
│   └── {feature-slug}/
│       ├── 01-discovery/
│       ├── 02-contract/
│       ├── 03-planning/
│       ├── 05-validation/
│       └── 06-release/
└── sprints/
    └── sprint-01/
```

## Step 6: Configure Project
Update project configuration:
- Add Scrum agents to .agent/skills/
- Add workflows to .agent/workflows/
- Create .specify/memory/constitution.md
- Set up project README with Scrum overview

## Step 7: Verification
Verify installation:
- [ ] All agents installed and accessible
- [ ] All skills available in agent context
- [ ] Workflows functional with proper triggers
- [ ] Documentation structure created
- [ ] Project configuration updated

## Usage Instructions
After installation:
1. Start with `/scrum-feature-lifecycle` for new features
2. Use `/scrum-sprint-planning` for sprint ceremonies
3. Reference agents by role: `@product-owner`, `@tech-lead`, etc.
4. Follow SDD+TDD+DDD disciplines in all phases

## Support
For issues with installation:
1. Check .agent/ directory permissions
2. Verify sdd-skills-ai version compatibility
3. Review installation logs
4. Consult scrum/README.md for detailed documentation
