# Quick Start

Get up and running with SDD Skills AI in 5 minutes. This guide walks you through your first project setup.

---

## 🎯 What You'll Accomplish

In this quick start, you will:
- ✅ Install SDD Skills AI
- ✅ Set up your first project
- ✅ Configure AI coding assistants
- ✅ Install Scrum methodology
- ✅ Create your first feature

---

## 🚀 Step 1: Installation

### Option A: Quick Install (Recommended)
```bash
npx sdd-skills-ai wizard
```

### Option B: Global Install
```bash
npm install -g sdd-skills-ai
sdd-skills-ai wizard
```

---

## 🧙‍♂️ Step 2: Run the Wizard

The wizard will guide you through setup. Here's what to expect:

### Prompt 1: Initialize Specs?
```
? Do you want to initialize Spec-Driven base configuration (specs)? (Y/n)
```
**Answer**: `Y` (Yes)
- This sets up Spec-Kit by default (recommended)
- Creates the base SDD architecture

### Prompt 2: Configure Tools?
```
? Do you want to configure AI coding assistant tools? (Y/n)
```
**Answer**: `Y` (Yes)
- Select your preferred AI assistants
- For this tutorial, select: `Claude Code`, `Cursor`, `Windsurf`

### Prompt 3: Add Skills?
```
? Do you want to inject AI Skills? (Y/n)
```
**Answer**: `Y` (Yes)
- Select: `Antigravity Kit` (standard workflows)
- Select: `Awesome Skills` (community curated)

### Prompt 4: Setup Agents?
```
? Do you want to setup AGENTS.md (agent-init)? (Y/n)
```
**Answer**: `Y` (Yes)
- Creates AI agent context files
- Enables agent-specific configurations

### Prompt 5: Install Scrum?
```
? Do you want to install Scrum agents with SDD+TDD+DDD disciplines? (y/N)
```
**Answer**: `Y` (Yes)
- **This is optional but highly recommended**
- Installs complete Scrum methodology

### Prompt 6: Setup Autocompletion?
```
? Do you want to setup shell autocompletion for sdd-skills-ai commands? (Y/n)
```
**Answer**: `Y` (Yes)
- Select your shell: Bash, Zsh, or Windows PowerShell
- Adds completion scripts to your shell config
- Enables TAB completion for all commands

---

## 📁 Step 3: Verify Installation

After the wizard completes, check your project structure:

```bash
# Check created directories
ls -la .agent/skills/
ls -la docs/

# Check configuration files
cat Agents.md
cat Claude.md

# Check Scrum agents
ls .agent/skills/ | grep scrum
```

**Expected output:**
```
.agent/skills/
├── scrum.product-owner/
├── scrum.scrum-master/
├── scrum.developer/
├── scrum.tech-lead/
├── scrum.ux-designer/
├── scrum.qa-engineer/
├── scrum.security-engineer/
├── scrum.devops-engineer/
├── scrum.data-lead/
└── ...

docs/
├── architecture/
├── features/
└── sprints/
```

---

## 🎯 Step 4: Your First Feature

Now let's create your first feature using Scrum methodology.

### Start the Feature Lifecycle
In your AI assistant (Claude, Cursor, Windsurf, etc.), run:

```bash
/scrum.feature-lifecycle
```

### Phase 1: Discovery & Definition
Work with the Product Owner:
```
@scrum.product-owner I want to add user authentication to my web application. Help me define the user story and acceptance criteria.
```

**Expected response**: The Product Owner will help you create:
- User story with format: "As a [user], I want [action] so that [benefit]"
- Acceptance criteria
- Business constraints
- Success metrics

### Phase 2: Contract Creation
Work with the Tech Lead:
```
@scrum.tech-lead Based on the user story, create the SDD contract for the authentication API. Include all endpoints, request/response schemas, and error handling.
```

**Expected response**: The Tech Lead will create:
- Complete API specification
- Request/response schemas
- Error handling definitions
- Security requirements

### Phase 3: Sprint Planning
Use the sprint planning workflow:
```bash
/scrum.sprint-planning
```

**Expected response**: The workflow will help you:
- Break down the feature into tasks
- Estimate effort
- Plan the sprint

### Phase 4: Development
Work with the Developer:
```
@scrum.developer Implement the authentication endpoints using TDD. Start with the user registration endpoint.
```

**Expected response**: The Developer will:
- Write failing tests first (Red phase)
- Implement minimal code to pass (Green phase)
- Refactor and improve (Refactor phase)

### Phase 5: Validation
Work with QA and UX:
```
@scrum.qa-engineer Validate the authentication implementation against the SDD contract.
@scrum.ux-designer Review the user interface for the authentication flow.
```

**Expected response**: QA and UX will:
- Verify contract compliance
- Test user experience
- Check security requirements

### Phase 6: Release
Work with DevOps:
```
@scrum.devops-engineer Deploy the authentication feature to staging environment and prepare for production release.
```

**Expected response**: DevOps will:
- Set up deployment pipeline
- Configure monitoring
- Plan release strategy

---

## 🎉 Step 5: Celebrate Your Success!

You've just completed your first feature using SDD Skills AI with Scrum methodology!

### What You Accomplished
- ✅ **Structured development** following Scrum phases
- ✅ **AI-driven collaboration** with specialized agents
- ✅ **Quality assurance** with SDD+TDD+DDD disciplines
- ✅ **Complete documentation** and artifacts
- ✅ **Reusable skills** and workflows

### Key Files Created
- `docs/features/authentication/01-discovery/user-story.md`
- `docs/features/authentication/02-contract/spec.md`
- `docs/features/authentication/03-planning/tasks.md`
- `docs/features/authentication/05-validation/validation-report.md`
- `docs/features/authentication/06-release/deploy-log.md`
## 🔄 Next Steps

After successful installation:

1. **Read [Getting Started](getting-started.md)** - Learn the basics
2. **Explore [Scrum Overview](scrum/overview.md)** - Team methodology
3. **Configure [AI Tools](supported-tools.md)** - Your specific assistants

---

## 💡 Pro Tips

### For Daily Development
- Start each day with `/scrum.feature-lifecycle` for new features
- Use `@scrum.product-owner` to clarify requirements
- Use `@scrum.tech-lead` for technical decisions
- Use `@scrum.developer` for implementation guidance

### For Team Collaboration
- Ensure all team members use the same Scrum phases
- Review artifacts together at phase boundaries
- Use the Definition of Done checklist consistently
- Track metrics and velocity over time

### For Quality Assurance
- Never skip the validation phase
- Always run the full Definition of Done checklist
- Use telemetry to measure feature success
- Document lessons learned for future improvements

---

## 📋 Complete Feature Checklist

### ✅ **What You Just Used**
- [ ] **Interactive Wizard** - Complete guided setup
- [ ] **Spec-Kit Integration** - Default spec-driven development
- [ ] **AI Tool Configuration** - Selected your preferred assistants
- [ ] **Community Skills** - Added Antigravity Kit and Awesome Skills
- [ ] **Agent Setup** - Created AGENTS.md and Claude.md
- [ ] **Scrum Installation** - Complete methodology with 9 agents
- [ ] **Feature Lifecycle** - Completed 6-phase development

### 🔄 **Available Commands You Can Use**
```bash
# Complete setup (you already used this)
npx sdd-skills-ai wizard

# Individual setup commands
sdd-skills-ai init                    # Specs only
sdd-skills-ai configure-tools         # AI tools only
sdd-skills-ai apply-skills            # Skills only
sdd-skills-ai agent-init              # Agent files only
sdd-skills-ai install-scrum           # Scrum only
sdd-skills-ai setup-scrum-configs     # Scrum configs only

# Extension commands
sdd-skills-ai add-skill <repo>        # Custom skills
sdd-skills-ai add-spec <path>         # Custom specs
sdd-skills-ai spec-skills-add         # Autonomous tools
```

### 🎯 **Available Scrum Features**
- **9 Agents**: @scrum.product-owner, @scrum.scrum-master, @scrum.tech-lead, @scrum.developer, @scrum.ux-designer, @scrum.qa-engineer, @scrum.security-engineer, @scrum.devops-engineer, @scrum.data-lead
- **13 Skills**: scrum.sdd-contract, scrum.tdd-cycle, scrum.ddd-modeling, scrum.telemetry-design, scrum.scrum-flow, scrum.communication, scrum.dod-checklist, scrum.01-discovery through scrum.06-release
- **3 Workflows**: /scrum.feature-lifecycle, /scrum.sprint-planning, /scrum.setup-agent-configs

---

*Want to dive deeper? Check out the [CLI Reference](cli.md) for all available commands.*

---

## 🎉 Step 5: Celebrate Your Success!

You've just completed your first feature using SDD Skills AI with Scrum methodology!

### What You Accomplished
- ✅ **Structured development** following Scrum phases
- ✅ **AI-driven collaboration** with specialized agents
- ✅ **Quality assurance** with SDD+TDD+DDD disciplines
- ✅ **Complete documentation** and artifacts
- ✅ **Reusable skills** and workflows

### Key Files Created
- `docs/features/authentication/01-discovery/user-story.md`
- `docs/features/authentication/02-contract/spec.md`
- `docs/features/authentication/03-planning/tasks.md`
- `docs/features/authentication/05-validation/validation-report.md`
- `docs/features/authentication/06-release/deploy-log.md`

---

## 🆘 Need Help?

### Common Issues
- **Wizard fails**: Check Node.js version (needs 18+)
- **Agents don't respond**: Restart your AI assistant
- **Files not created**: Check permissions and disk space

### Get Support
- **GitHub Issues**: [Report bugs](https://github.com/eltonjosesouza/sdd-skills-ai/issues)
- **Discussions**: [Ask questions](https://github.com/eltonjosesouza/sdd-skills-ai/discussions)
- **Documentation**: Browse complete [docs/](.) index

---

## 🎯 You're Ready!

You now have:
- ✅ **Working SDD Skills AI installation**
- ✅ **Configured AI assistants**
- ✅ **Scrum methodology setup**
- ✅ **First feature completed**
- ✅ **Understanding of the workflow**

**Happy coding with AI-driven Scrum!** 🚀

---

*Want to dive deeper? Check out the [Scrum Agents](scrum/agents.md) guide to learn about each specialized role.*
