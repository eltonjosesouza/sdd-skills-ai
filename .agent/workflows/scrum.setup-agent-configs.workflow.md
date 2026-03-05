---
name: scrum.setup-agent-configs
description: Setup Scrum configuration in Agents.md and Claude.md files
---

This workflow ensures Scrum agents are properly configured in both Agents.md and Claude.md files. It creates the files if they don't exist, or updates them if they do.

## Trigger
Run this workflow after installing Scrum agents to ensure proper configuration.

## Step 1: Check and Setup Agents.md

**Check if Agents.md exists:**
- If exists: Read current content and add Scrum section
- If doesn't exist: Create using agent-init template first

**Scrum section to add:**
```markdown
## Scrum Agents

The following Scrum agents are available for SDD+TDD+DDD development:

### Core Scrum Roles
- **@scrum.product-owner** - Orchestrator of Discovery, defines problems and maintains backlog
- **@scrum.scrum-master** - Facilitator of ceremonies and process guardian
- **@scrum.tech-lead** - Technical authority and SDD contract owner
- **@scrum.developer** - Implementation expert using TDD discipline

### Specialist Roles
- **@scrum.ux-designer** - User experience advocate and prototype validator
- **@scrum.qa-engineer** - Quality orchestration and contract guardian
- **@scrum.security-engineer** - Security orchestration and threat modeling
- **@scrum.devops-engineer** - Infrastructure orchestration and deployment path
- **@scrum.data-lead** - Telemetry design and data-driven decisions

### How to Use Scrum Agents

1. **Start with scrum.feature-lifecycle workflow** for complete feature development
2. **Reference agents by name** in your prompts: `@scrum.product-owner`
3. **Use appropriate agent for each phase** of development
4. **Follow SDD+TDD+DDD disciplines** as defined in Scrum skills

### Scrum Skills Available
- **scrum.sdd-contract** - Spec-driven development discipline
- **scrum.tdd-cycle** - Test-driven development methodology
- **scrum.ddd-modeling** - Domain-driven design principles
- **scrum.telemetry-design** - Event design and analytics
- **scrum.scrum-flow** - Phase sequence and ceremony rules
- **scrum.communication** - Artifact-first coordination
- **scrum.dod-checklist** - Definition of Done validation
- **scrum.01-discovery** through **scrum.06-release** - Phase-specific guidance

### Example Usage
```
@scrum.product-owner Help me define the user story for a new authentication feature
@scrum.tech-lead Create the SDD contract for the authentication API
@scrum.developer Implement the authentication endpoints using TDD
@scrum.qa-engineer Validate the implementation against the contract
```
```

## Step 2: Check and Setup Claude.md

**Check if Claude.md exists:**
- If exists: Read current content and add Scrum configuration
- If doesn't exist: Create using claude-md-specialist template first

**Scrum configuration to add:**
```markdown
## Scrum Integration

When working with Scrum methodology, follow these guidelines:

### Phase-Based Work
Always identify which phase you're working in:
- **Phase 1 (Discovery)**: Use @scrum.product-owner, @scrum.ux-designer, @scrum.data-lead
- **Phase 2 (Contract)**: Use @scrum.tech-lead, @scrum.qa-engineer, @scrum.security-engineer
- **Phase 3 (Planning)**: Use @scrum.scrum-master to facilitate, all agents for estimation
- **Phase 4 (Development)**: Use @scrum.developer with @scrum.tech-lead review
- **Phase 5 (Validation)**: Use @scrum.qa-engineer, @scrum.ux-designer, @scrum.data-lead
- **Phase 6 (Release)**: Use @scrum.devops-engineer, @scrum.product-owner, @scrum.data-lead

### Artifact-First Communication
- Always read artifacts from previous phase before starting
- Write all outputs as artifacts before next phase
- Use standard templates for consistency
- Reference scrum.communication skill for detailed rules

### SDD+TDD+DDD Discipline
- **SDD**: Follow scrum.sdd-contract for specifications
- **TDD**: Use scrum.tdd-cycle for implementation
- **DDD**: Apply scrum.ddd-modeling for domain consistency

### Quality Gates
- Verify scrum.dod-checklist before any release
- Ensure all validation criteria are met
- Get approval from all phase participants

### Quick Reference
```
/scrum.feature-lifecycle    - Complete 6-phase feature development
/scrum.sprint-planning      - Sprint planning ceremony
scrum.01-discovery         - Phase 1 guidance
scrum.02-contract          - Phase 2 guidance
scrum.03-sprint-planning   - Phase 3 guidance
scrum.04-development       - Phase 4 guidance
scrum.05-validation        - Phase 5 guidance
scrum.06-release           - Phase 6 guidance
```
```

## Step 3: Verification

**Verify setup completion:**
- [ ] Agents.md exists and contains Scrum section
- [ ] Claude.md exists and contains Scrum configuration
- [ ] All Scrum agents are properly documented
- [ ] Workflow references are correct
- [ ] Skill references are accurate

## Step 4: Usage Instructions

**After setup:**
1. **Restart your AI assistant** to reload configurations
2. **Test with a simple prompt**: `@scrum.product-owner Help me understand my role`
3. **Run a workflow**: `/scrum.feature-lifecycle` to test end-to-end
4. **Verify all agents respond** correctly to their names

## Troubleshooting

**If agents don't respond:**
1. Check file syntax in Agents.md and Claude.md
2. Ensure AI assistant supports custom agent configurations
3. Restart the development environment
4. Verify file permissions and locations

**If workflows don't work:**
1. Check workflow files in .agent/workflows/
2. Verify workflow syntax and triggers
3. Test with individual skills first
4. Check AI assistant workflow support

## Success Criteria

Setup is successful when:
- Both configuration files exist with proper Scrum sections
- All @scrum.* agents respond to mentions
- All /scrum.* workflows execute properly
- All scrum.* skills are accessible
- Team can start using Scrum methodology immediately

## Maintenance

**Keep configurations updated:**
- Add new agents to both files when created
- Update skill references when modified
- Maintain consistent formatting
- Test after each configuration change

This workflow ensures your Scrum setup is immediately usable by the entire team!
