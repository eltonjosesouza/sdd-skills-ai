# CLI Reference

Complete command reference for SDD Skills AI v2.0 with Clean Architecture.

## 🚀 Installation

```bash
npm install -g sdd-skills-ai
```

## 📋 Commands Overview

| Category | Commands | Purpose |
|----------|----------|---------|
| **Interactive Setup** | `wizard`, `init` | Complete project initialization |
| **Configuration** | `agent-init`, `configure-tools`, `setup-scrum-configs` | AI assistant setup |
| **Skills & Tools** | `apply-skills`, `install-scrum`, `spec-skills-add` | Feature enhancement |
| **Utilities** | `add-skill`, `add-spec`, `completion`, `stats` | Management tools |

---

## 🧙‍♂️ Interactive Setup

### `wizard`
**Complete interactive setup (recommended)**

```bash
sdd-skills-ai wizard [project-directory]
```

**What it does:**
- Guides you through complete project setup
- Initializes Spec-Driven base configuration
- Configures AI coding assistant tools
- Injects AI skills and workflows
- Installs complete Scrum methodology
- Sets up shell autocompletion

**Example:**
```bash
sdd-skills-ai wizard my-project
```

### `init`
**Initialize Spec-Driven base configuration**

```bash
sdd-skills-ai init [options] [project-directory]
```

**Options:**
- `-a, --agent <agent>`: Target AI Assistant

**What it does:**
- Sets up Spec-Kit and/or OpenSpec
- Creates base project structure
- Configures spec-driven development

**Example:**
```bash
sdd-skills-ai init . --agent antigravity
```

---

## ⚙️ Configuration

### `agent-init` 🆕
**Create AGENTS.md with AI context (v2.0 Clean Architecture)**

```bash
sdd-skills-ai agent-init [options] [project-directory]
```

**Options:**
- `-a, --agent <agent>`: Target AI Assistant

**What it does:**
- Creates comprehensive AGENTS.md file using Clean Architecture
- Includes project context and architecture details
- Lists supported AI assistants with new structure
- Provides development guidelines following SOLID principles

**Example:**
```bash
sdd-skills-ai agent-init
```

### `configure-tools`
**Configure AI coding assistant tools**

```bash
sdd-skills-ai configure-tools [options] [project-directory]
```

**Options:**
- `-a, --agent <agent>`: Target AI Assistant

**What it does:**
- Creates directory structure for AI assistants
- Sets up skills and workflows directories
- Configures agent-specific settings

**Supported AI Assistants:**
- Antigravity (.agent/)
- Claude Code (.claude/)
- Gemini CLI (.gemini/)
- Cursor (.cursor/)
- Kiro IDE (.kiro/)
- OpenCode (.agents/)
- Windsurf (.agent/)

**Example:**
```bash
sdd-skills-ai configure-tools
```

### `setup-scrum-configs` 🆕
**Configure Scrum agents**

```bash
sdd-skills-ai setup-scrum-configs [options] [project-directory]
```

**Options:**
- `-a, --agent <agent>`: Target AI Assistant

**What it does:**
- Creates Scrum configuration in JSON
- Updates AGENTS.md with Scrum information
- Sets up 9 Scrum agents with roles and responsibilities

**Example:**
```bash
sdd-skills-ai setup-scrum-configs
```

---

## 🛠️ Skills & Tools

### `apply-skills`
**Inject Antigravity skill packs**

```bash
sdd-skills-ai apply-skills [options] [project-directory]
```

**Options:**
- `-a, --agent <agent>`: Target AI Assistant

**What it does:**
- Installs Antigravity Kit (standard workflows)
- Installs Awesome Skills (community skills)
- Creates comprehensive skill library

**Available Skills:**
- 47+ Antigravity skills including:
  - api-patterns, architecture, clean-code
  - frontend-design, mobile-design
  - testing-patterns, vulnerability-scanner
  - And many more

**Example:**
```bash
sdd-skills-ai apply-skills
```

### `install-scrum`
**Install complete Scrum methodology**

```bash
sdd-skills-ai install-scrum [options] [project-directory]
```

**Options:**
- `-a, --agent <agent>`: Target AI Assistant

**What it does:**
- Installs 9 Scrum agents
- Adds 13 Scrum skills
- Creates 8 Scrum workflows
- Sets up SDD+TDD+DDD disciplines

**Scrum Components:**
- **Agents**: Product Owner, Scrum Master, Developer, Tech Lead, UX Designer, QA Engineer, Security Engineer, DevOps Engineer, Data Lead
- **Skills**: SDD Contract, TDD Cycle, DDD Modeling, etc.
- **Workflows**: Feature Lifecycle, Sprint Planning, etc.

**Example:**
```bash
sdd-skills-ai install-scrum
```

### `spec-skills-add` 🆕
**Enable autonomous tool addition**

```bash
sdd-skills-ai spec-skills-add [options] [project-directory]
```

**Options:**
- `-a, --agent <agent>`: Target AI Assistant

**What it does:**
- Creates autonomous tool addition system
- Sets up skill registry
- Creates configuration for custom tools
- Enables CLI integration scripts

**Example:**
```bash
sdd-skills-ai spec-skills-add
```

---

## 🔧 Utilities

### `add-skill`
**Register custom skill repository**

```bash
sdd-skills-ai add-skill <repository-url>
```

**Arguments:**
- `repository-url`: GitHub repository URL

**What it does:**
- Registers custom skill repository
- Makes skills available for injection
- Updates configuration

**Example:**
```bash
sdd-skills-ai add-skill https://github.com/user/custom-skills
```

### `add-spec`
**Register local spec-driven tool**

```bash
sdd-skills-ai add-spec <local-path>
```

**Arguments:**
- `local-path`: Path to local spec-driven tools

**What it does:**
- Registers local spec tools
- Integrates with existing workflow
- Updates tool registry

**Example:**
```bash
sdd-skills-ai add-spec ./my-spec-tools
```

### `completion`
**Setup shell autocompletion**

```bash
sdd-skills-ai completion
```

**What it does:**
- Sets up tab completion for shell
- Configures shell integration
- Enables command suggestions

**Supported Shells:**
- Zsh (~/.zshrc)
- Bash (~/.bashrc)
- Fish (~/.config/fish/config.fish)

**Example:**
```bash
sdd-skills-ai completion
source ~/.zshrc  # Reload shell
```

### `stats`
**Show available components statistics**

```bash
sdd-skills-ai stats
```

**What it does:**
- Displays available AI tools count
- Shows Scrum components statistics
- Lists available skills and workflows

**Example Output:**
```
� SDD Skills AI Statistics:
🔧 Supported AI Tools: 23
🏈 Scrum Components:
   � Agents: 9
   🛠️ Skills: 13
   🔄 Workflows: 8
   📦 Total: 30
```

---

## 🎯 Usage Examples

### Complete Project Setup
```bash
# Create new project
mkdir my-project && cd my-project

# Run complete wizard
sdd-skills-ai wizard

# Start using with AI
@scrum.product-owner Build a user authentication system
```

### Quick Setup
```bash
# Initialize with specific agent
sdd-skills-ai init . --agent antigravity

# Add skills
sdd-skills-ai apply-skills

# Setup Scrum
sdd-skills-ai install-scrum
```

### Custom Configuration
```bash
# Configure specific AI tool
sdd-skills-ai configure-tools --agent cursor

# Add custom skills
sdd-skills-ai add-skill https://github.com/company/skills

# Enable autocompletion
sdd-skills-ai completion
```

---

## 🆚 v2.0 Changes

### New Commands 🆕
- `agent-init` - Clean Architecture implementation
- `setup-scrum-configs` - Scrum configuration
- `spec-skills-add` - Autonomous tool addition

### Improved Commands
- `wizard` - Enhanced with all features
- `apply-skills` - More skills available (47 total)
- `install-scrum` - Complete methodology

### Architecture Changes
- **Clean Architecture** with SOLID principles
- Better separation of concerns
- Improved error handling
- Enhanced testability
- Dependency injection pattern

### Benefits
- **Maintainability**: Clear separation makes code easier to modify
- **Testability**: Each component can be tested in isolation
- **Extensibility**: New features can be added without breaking existing code
- **Scalability**: Architecture supports growth from small to large projects

---

## 🤝 Help & Support

- **Get help**: `sdd-skills-ai --help` or `sdd-skills-ai <command> --help`
- **GitHub Issues**: [Report bugs](https://github.com/eltonjosesouza/sdd-skills-ai/issues)
- **Discussions**: [Ask questions](https://github.com/eltonjosesouza/sdd-skills-ai/discussions)
- **Discord**: [Join community](https://discord.gg/YctCnvvshC)

---

*This reference covers all commands available in SDD Skills AI v2.0. For more detailed examples and use cases, see the [Getting Started](getting-started.md) guide.*
