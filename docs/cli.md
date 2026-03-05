# CLI Reference

The SDD Skills AI CLI (`sdd-skills-ai`) provides terminal commands for project setup, configuration, and management. These commands complement the AI slash commands and workflows documented in [Commands](commands.md).

---

## 📋 Command Summary

### 🧙‍♂️ Setup Commands
- [`wizard`](#wizard) - Interactive setup wizard (recommended)
- [`init`](#init) - Initialize spec-driven architecture
- [`agent-init`](#agent-init) - Create AGENTS.md configuration

### 🔧 Configuration Commands
- [`configure-tools`](#configure-tools) - Configure AI coding assistants
- [`apply-skills`](#apply-skills) - Inject skill packs
- [`spec-skills-add`](#spec-skills-add) - Enable autonomous tool addition

### 🏈 Scrum Commands
- [`install-scrum`](#install-scrum) - Install complete Scrum methodology
- [`setup-scrum-configs`](#setup-scrum-configs) - Configure Scrum agents

### 🔌 Extension Commands
- [`add-skill`](#add-skill) - Register custom skill repository
- [`add-spec`](#add-spec) - Register local spec-driven tool

### 🔧 Utility Commands
- [`completion`](#completion) - Setup shell autocompletion

---

## 🧙‍♂️ Setup Commands

### `wizard`
**Interactive setup wizard with guided configuration**

```bash
sdd-skills-ai wizard [project-directory]
```

**Description**: The complete interactive experience that guides you through all setup phases. This is the recommended way to get started.

**Options**:
- `project-directory` (optional) - Directory to set up (defaults to current)

**Wizard Flow**:
1. **Specs** - Choose Spec-Kit (default) or OpenSpec
2. **Tools** - Select AI coding assistants (23 options available)
3. **Skills** - Add community skills and templates
4. **Agents** - Create AGENTS.md and Claude.md
5. **Scrum** - Optional complete Scrum methodology
6. **Autonomous** - Enable AI to add its own tools

**Example**:
```bash
# Start wizard in current directory
sdd-skills-ai wizard

# Start wizard in new project
sdd-skills-ai wizard my-new-project
```

---

### `init`
**Initialize spec-driven architecture base**

```bash
sdd-skills-ai init [project-directory]
```

**Description**: Sets up the base SDD architecture with spec-driven development tools.

**Options**:
- `project-directory` (optional) - Directory to initialize

**What it creates**:
- Spec-driven configuration files
- Documentation structure
- Base templates and workflows

**Example**:
```bash
# Initialize current directory
sdd-skills-ai init

# Initialize new project
sdd-skills-ai init my-project
```

---

### `agent-init`
**Initialize AGENTS.md context**

```bash
sdd-skills-ai agent-init [project-directory] [--agent <agent>]
```

**Description**: Creates AGENTS.md file with AI agent context and role definitions.

**Options**:
- `project-directory` (optional) - Directory to initialize
- `--agent <agent>` (optional) - Target AI assistant

**Supported Agents**:
- `windsurf`, `claude`, `cursor`, `gemini`, `antigravity`, and more

**Example**:
```bash
# Initialize with default agent
sdd-skills-ai agent-init

# Initialize for specific agent
sdd-skills-ai agent-init --agent windsurf
```

---

## 🔧 Configuration Commands

### `configure-tools`
**Configure AI coding assistant tools**

```bash
sdd-skills-ai configure-tools [project-directory] [--agent <agent>]
```

**Description**: Interactive selection and configuration of AI coding assistants with their specific directory structures.

**Options**:
- `project-directory` (optional) - Directory to configure
- `--agent <agent>` (optional) - Target AI assistant

**Supported Tools** (23 total):
- Claude Code, Cursor, Windsurf, Gemini CLI
- Antigravity, Cline, Codex, Continue
- GitHub Copilot, Kiro, OpenCode
- And 13 more specialized tools

**What it creates**:
- Tool-specific directories (`.claude/skills/`, `.cursor/workflows/`, etc.)
- Configuration files for each selected tool
- Path mappings for skills and workflows

**Example**:
```bash
# Configure tools interactively
sdd-skills-ai configure-tools

# Configure for specific agent
sdd-skills-ai configure-tools --agent windsurf
```

---

### `apply-skills`
**Inject selected skill packs**

```bash
sdd-skills-ai apply-skills [project-directory] [--agent <agent>]
```

**Description**: Select and install community skill packs and templates.

**Options**:
- `project-directory` (optional) - Directory to apply skills to
- `--agent <agent>` (optional) - Target AI assistant

**Available Skill Packs**:
- Antigravity Kit - Standard workflow skills
- Awesome Skills - 950+ community curated skills
- Custom registered skills

**Example**:
```bash
# Apply skills interactively
sdd-skills-ai apply-skills

# Apply skills for specific agent
sdd-skills-ai apply-skills --agent claude
```

---

### `spec-skills-add`
**Enable autonomous tool addition**

```bash
sdd-skills-ai spec-skills-add [project-directory] [--agent <agent>]
```

**Description**: Give your AI agent the ability to dynamically add new specs and skills.

**Options**:
- `project-directory` (optional) - Directory to enable
- `--agent <agent>` (optional) - Target AI assistant

**What it enables**:
- AI can add new spec templates
- AI can create custom skills
- AI can register new workflows
- Autonomous capability expansion

**Example**:
```bash
# Enable autonomous skills
sdd-skills-ai spec-skills-add

# Enable for specific agent
sdd-skills-ai spec-skills-add --agent cursor
```

---

## 🏈 Scrum Commands

### `install-scrum`
**Install complete Scrum methodology**

```bash
sdd-skills-ai install-scrum [project-directory] [--agent <agent>]
```

**Description**: Installs the complete Scrum implementation with SDD+TDD+DDD disciplines.

**Options**:
- `project-directory` (optional) - Directory to install Scrum in
- `--agent <agent>` (optional) - Target AI assistant

**What it installs**:
- **9 Scrum Agents**: Product Owner, Scrum Master, Developer, Tech Lead, UX Designer, QA Engineer, Security Engineer, DevOps Engineer, Data Lead
- **13 Scrum Skills**: Core disciplines, protocols, and phase-specific skills
- **3 Scrum Workflows**: Feature lifecycle, sprint planning, agent setup

**Example**:
```bash
# Install Scrum methodology
sdd-skills-ai install-scrum

# Install for specific agent
sdd-skills-ai install-scrum --agent windsurf
```

---

### `setup-scrum-configs`
**Configure Scrum agents in configuration files**

```bash
sdd-skills-ai setup-scrum-configs [project-directory] [--agent <agent>]
```

**Description**: Updates Agents.md and Claude.md with Scrum agent configurations.

**Options**:
- `project-directory` (optional) - Directory to configure
- `--agent <agent>` (optional) - Target AI assistant

**What it does**:
- Creates AGENTS.md if it doesn't exist
- Adds Scrum agents section with all 9 roles
- Updates Claude.md with Scrum integration guidelines
- Preserves existing content

**Example**:
```bash
# Setup Scrum configurations
sdd-skills-ai setup-scrum-configs

# Setup for specific agent
sdd-skills-ai setup-scrum-configs --agent claude
```

---

## 🔌 Extension Commands

### `add-skill`
**Register custom skill repository**

```bash
sdd-skills-ai add-skill <repository-url>
```

**Description**: Register a custom GitHub repository containing skill templates.

**Arguments**:
- `repository-url` - GitHub repository URL

**Example**:
```bash
# Add custom skills
sdd-skills-ai add-skill https://github.com/your-org/custom-skills
```

---

### `completion`
**Setup shell autocompletion for sdd-skills-ai commands**

```bash
sdd-skills-ai completion
```

**Description**: Interactive setup of shell autocompletion for all sdd-skills-ai commands. Supports Bash, Zsh, and Windows PowerShell.

**What it does**:
- Detects your shell type automatically
- Provides interactive shell selection
- Adds completion scripts to appropriate config files
- Supports all 10 sdd-skills-ai commands

**Supported Shells**:
- **Bash** - Adds completion to `~/.bashrc`
- **Zsh** - Adds completion to `~/.zshrc`
- **Windows PowerShell** - Adds completion to PowerShell profile
- **Other** - Provides generic completion script

**Interactive Setup**:
```bash
sdd-skills-ai completion

? Which shell are you using? (Use arrow keys)
❯ Bash (~/.bashrc)
  Zsh (~/.zshrc)
  Windows PowerShell
  Other/Custom

? Add autocompletion to ~/.bashrc? (Y/n)
✅ Autocompletion added to ~/.bashrc

🔄 To activate autocompletion, run:
   source ~/.bashrc

Or restart your terminal.

💡 Test it out:
   sdd-skills-ai <TAB>
   sdd-skills-ai w<TAB>
```

**Completion Commands**:
- `wizard` - Full interactive experience (RECOMMENDED)
- `init` - Setup spec-driven architecture base
- `configure-tools` - Configure AI coding assistant tools
- `apply-skills` - Inject selected skill packs
- `agent-init` - Initialize AGENTS.md context
- `install-scrum` - Install complete Scrum methodology
- `setup-scrum-configs` - Configure Scrum agents
- `add-skill` - Register custom skill repository
- `add-spec` - Register local spec-driven tool
- `spec-skills-add` - Enable autonomous tool addition

**Manual Installation**:
If you prefer manual setup, you can add the completion script directly:

**Bash (~/.bashrc)**:
```bash
# SDD Skills AI Bash completion
_sdd_skills_ai_completion() {
  local cur prev commands
  COMPREPLY=()
  cur="${COMP_WORDS[COMP_CWORD]}"
  prev="${COMP_WORDS[COMP_CWORD-1]}"

  commands="wizard init configure-tools apply-skills agent-init install-scrum setup-scrum-configs add-skill add-spec spec-skills-add"

  if [[ ${cur} == * ]]; then
    COMPREPLY=( $(compgen -W "${commands}" -- ${cur}) )
  fi

  return 0
}

complete -F _sdd_skills_ai_completion sdd-skills-ai
```

**Zsh (~/.zshrc)**:
```bash
# SDD Skills AI ZSH completion
_sdd_skills_ai_completion() {
  local -a commands
  commands=(
    'wizard:Full interactive experience (RECOMMENDED)'
    'init:Setup spec-driven architecture base'
    'configure-tools:Configure AI coding assistant tools'
    'apply-skills:Inject selected skill packs'
    'agent-init:Initialize AGENTS.md context'
    'install-scrum:Install complete Scrum methodology'
    'setup-scrum-configs:Configure Scrum agents'
    'add-skill:Register custom skill repository'
    'add-spec:Register local spec-driven tool'
    'spec-skills-add:Enable autonomous tool addition'
  )

  _describe 'command' commands
}

compdef _sdd_skills_ai_completion sdd-skills-ai
```

**Windows PowerShell**:
```powershell
# SDD Skills AI PowerShell completion
Register-ArgumentCompleter -Native -CommandName sdd-skills-ai -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)

    $commands = @('wizard', 'init', 'configure-tools', 'apply-skills', 'agent-init', 'install-scrum', 'setup-scrum-configs', 'add-skill', 'add-spec', 'spec-skills-add')

    if ($wordToComplete -eq '') {
        return $commands
    }

    return $commands | Where-Object { $_ -like "$wordToComplete*" }
}
```

**Example**:
```bash
# Setup autocompletion interactively
sdd-skills-ai completion

# Test autocompletion
sdd-skills-ai <TAB>
# wizard init configure-tools apply-skills agent-init install-scrum setup-scrum-configs add-skill add-spec spec-skills-add

sdd-skills-ai w<TAB>
# wizard
```

---

### `add-spec`
**Register local spec-driven tool**

```bash
sdd-skills-ai add-spec <local-path>
```

**Description**: Register a local spec-driven tool or template collection.

**Arguments**:
- `local-path` - Path to local spec-driven tools

**Example**:
```bash
# Add local spec tools
sdd-skills-ai add-spec ./local-tools/my-spec-kit
```

---

## 🌐 Global Options

All commands support these global options:

### `--help`
Show help information for the command.

```bash
sdd-skills-ai --help
sdd-skills-ai wizard --help
```

### `--version`
Show version information.

```bash
sdd-skills-ai --version
```

---

## 📊 Exit Codes

- `0` - Success
- `1` - General error or command failed

---

## 🌍 Environment Variables

### `SDD_SKILLS_AI_CONFIG_DIR`
Override default configuration directory.

```bash
export SDD_SKILLS_AI_CONFIG_DIR=~/.my-sdd-config
sdd-skills-ai wizard
```

### `SDD_SKILLS_AI_DEBUG`
Enable debug logging.

```bash
export SDD_SKILLS_AI_DEBUG=1
sdd-skills-ai wizard
```

---

## 🔗 Related Documentation

- [Commands](commands.md) - AI slash commands and workflows
- [Configuration](configuration.md) - Configuration options and customization
- [Supported Tools](supported-tools.md) - All 23 supported AI assistants
- [Scrum Overview](scrum/overview.md) - Complete Scrum methodology guide

---

*Need help with a specific command? Run `sdd-skills-ai <command> --help` for detailed usage information.*
