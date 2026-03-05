# Getting Started

This guide explains how SDD Skills AI works after you've installed and initialized it. For installation instructions, see the [Installation](installation.md) guide.

## 🎯 What You'll Learn

- How SDD Skills AI transforms your development workflow
- What gets created when you initialize a project
- How to use the wizard vs individual commands
- Understanding the core components

---

## 🔄 How It Works

SDD Skills AI operates on three core principles:

### 1. **Spec-Driven Development (SDD)**
- Write specifications before implementation
- Use AI to validate and review specs
- Maintain contracts between business and development

### 2. **Test-Driven Development (TDD)**
- Write tests before code (Red phase)
- Implement minimal code to pass tests (Green phase)
- Refactor and improve (Refactor phase)

### 3. **Domain-Driven Design (DDD)**
- Define ubiquitous language
- Model business domains accurately
- Maintain bounded contexts

---

## 📁 What SDD Skills AI Creates

When you run the wizard or individual commands, SDD Skills AI creates:

### Project Structure
```
your-project/
├── .agent/                 # AI assistant configuration
│   ├── skills/            # Reusable skill templates
│   └── workflows/         # End-to-end workflows
├── docs/                  # Project documentation
│   ├── architecture/     # Architecture decisions
│   ├── features/         # Feature specifications
│   └── sprints/          # Sprint documentation
├── Agents.md              # AI agent context and roles
├── Claude.md              # Claude-specific configuration
└── spec.md               # Project specifications (if using OpenSpec)
```

### Core Components

#### Skills (`.agent/skills/`)
- **Reusable templates** for common tasks
- **Discipline-specific** (SDD, TDD, DDD)
- **Tool-specific** configurations

#### Workflows (`.agent/workflows/`)
- **End-to-end processes** for complex tasks
- **Phase-based** development flows
- **Multi-agent** coordination

#### Documentation (`docs/`)
- **Living specifications** that evolve with the project
- **Architecture decisions** (ADRs)
- **Feature tracking** and sprint planning

---

## 🧙‍♂️ Wizard vs Individual Commands

### Using the Wizard (Recommended)
```bash
npx sdd-skills-ai wizard
```

**Benefits:**
- Guided setup with explanations
- All components configured together
- Context-aware recommendations
- Scrum methodology integration

**Wizard Flow:**
1. **Specs** - Choose Spec-Kit (default) or OpenSpec
2. **Tools** - Select AI coding assistants (23 options)
3. **Skills** - Add community skills and templates
4. **Agents** - Create AGENTS.md and Claude.md
5. **Scrum** - Optional complete Scrum methodology
6. **Autocompletion** - Setup shell completion for all commands

### Individual Commands
```bash
# Initialize specs only
sdd-skills-ai init

# Configure AI tools
sdd-skills-ai configure-tools

# Add skills
sdd-skills-ai apply-skills

# Setup agents
sdd-skills-ai agent-init

# Install Scrum
sdd-skills-ai install-scrum

# Setup Scrum configurations
sdd-skills-ai setup-scrum-configs

# Setup autocompletion
sdd-skills-ai completion
```

**Benefits:**
- Fine-grained control
- Scriptable and automatable
- Incremental setup
- CI/CD integration

---

## 🎨 Example: Your First Project

### 1. Initialize with Wizard
```bash
npx sdd-skills-ai wizard
```

**Answer the prompts:**
- ✅ Initialize specs? **Yes** (uses Spec-Kit by default)
- ✅ Configure tools? **Yes** (select your AI assistants)
- ✅ Add skills? **Yes** (community templates)
- ✅ Setup agents? **Yes** (creates AGENTS.md)
- ✅ Install Scrum? **Yes** (complete methodology)

### 2. What Gets Created
```bash
# Check the structure
ls -la .agent/skills/
ls -la docs/
cat Agents.md
```

### 3. Start Using AI Assistants
```bash
# In your AI assistant chat:
@scrum.product-owner Help me define a user story for user authentication
/scrum.feature-lifecycle Start a new feature development
```

---

## 🔍 Understanding Artifacts

### Skills
Skills are **reusable templates** that AI assistants can invoke:
- **Discipline skills**: `sdd-contract`, `tdd-cycle`, `ddd-modeling`
- **Phase skills**: `scrum.01-discovery`, `scrum.02-contract`
- **Agent skills**: `scrum.product-owner`, `scrum.developer`

### Workflows
Workflows are **orchestrated processes**:
- **Feature lifecycle**: Complete 6-phase development
- **Sprint planning**: Task breakdown and estimation
- **Agent setup**: Configuration workflows

### Documentation
Documentation is **living and versioned**:
- **Specs**: Feature specifications and requirements
- **Architecture**: Design decisions and patterns
- **Sprints**: Iteration planning and tracking

---

## 🚀 Next Steps

1. **Read the [Installation Guide](installation.md)** if you haven't installed yet
2. **Try the [Quick Start Tutorial](quick-start.md)** for hands-on experience
3. **Explore [Scrum Methodology](scrum/overview.md)** for team collaboration
4. **Configure [AI Tools](supported-tools.md)** for your specific assistants

---

## 💡 Tips for Success

### For Individuals
- Start with the wizard for complete setup
- Focus on one discipline at a time (SDD → TDD → DDD)
- Use Scrum methodology for structured development

### For Teams
- Standardize on the same tools and workflows
- Use Scrum roles for clear responsibilities
- Maintain documentation as team knowledge base

### For Organizations
- Create custom skills for organizational patterns
- Integrate with existing CI/CD pipelines
- Use SDD Skills AI for onboarding new developers

---

## 🎯 Current Available Features

### ✅ **Implemented and Ready**
- **Interactive Wizard** with complete guided setup
- **Spec-Kit Integration** (default) and **OpenSpec** (optional)
- **23 AI Coding Assistants** configuration
- **Complete Scrum Methodology** with 9 agents, 13 skills, 3 workflows
- **Multi-Tool Setup** with automatic directory creation
- **Agent Configuration** (AGENTS.md, Claude.md)
- **Community Skills** (Antigravity Kit, Awesome Skills)
- **Custom Skill/Spec Registration**
- **Autonomous Tool Addition** capability

### 🔄 **How to Use Each Feature**
```bash
# Complete setup (recommended)
npx sdd-skills-ai wizard

# Individual components
sdd-skills-ai init                    # Specs setup
sdd-skills-ai configure-tools         # AI tools
sdd-skills-ai apply-skills            # Community skills
sdd-skills-ai agent-init              # Agent files
sdd-skills-ai install-scrum           # Scrum methodology
sdd-skills-ai setup-scrum-configs     # Scrum configurations
sdd-skills-ai add-skill <repo>        # Custom skills
sdd-skills-ai add-spec <path>         # Custom specs
sdd-skills-ai spec-skills-add         # Autonomous tools
```

---

*Ready to dive deeper? Check out the [CLI Reference](cli.md) or [Scrum Overview](scrum/overview.md).*
