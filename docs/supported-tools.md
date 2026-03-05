# Supported Tools

SDD Skills AI works with 23 AI coding assistants. When you run `sdd-skills-ai configure-tools`, you can select which tools to configure for your project.

---

## 🎯 How It Works

For each selected tool, SDD Skills AI can configure:

1. **Skills** - Template files in tool-specific directories
2. **Workflows** - End-to-end process files
3. **Configuration** - Tool-specific setup and context

By default, SDD Skills AI uses the **core profile**, which includes all basic functionality. You can enable expanded profiles via configuration.

---

## 📋 Tool Directory Reference

| Tool (ID) | Skills Path | Workflows Path | Config Path | Description |
|-----------|-------------|----------------|-------------|-------------|
| **Claude Code** (`claude`) | `.claude/skills/` | `.claude/commands/` | `.claude/` | Anthropic's Claude Code CLI assistant |
| **Cursor** (`cursor`) | `.cursor/skills/` | `.cursor/commands/` | `.cursor/` | AI-powered IDE with advanced code completion |
| **Windsurf** (`windsurf`) | `.windsurf/skills/` | `.windsurf/workflows/` | `.windsurf/` | AI coding assistant with context-aware capabilities |
| **Gemini CLI** (`gemini`) | `.gemini/skills/` | `.gemini/commands/` | `.gemini/` | Google's Gemini AI coding assistant |
| **Antigravity** (`antigravity`) | `.agent/skills/` | `.agent/workflows/` | `.agent/` | Advanced agentic development environment |
| **Cline** (`cline`) | `.cline/skills/` | `.clinerules/workflows/` | `.cline/` | AI assistant for VS Code and other editors |
| **Codex** (`codex`) | `.codex/skills/` | `$CODEX_HOME/prompts/` | `.codex/` | OpenAI's Codex programming assistant |
| **Continue** (`continue`) | `.continue/skills/` | `.continue/prompts/` | `.continue/` | AI coding assistant with multi-file context |
| **GitHub Copilot** (`github-copilot`) | `.github/skills/` | `.github/prompts/` | `.github/` | Microsoft's AI pair programming assistant |
| **Kiro** (`kiro`) | `.kiro/skills/` | `.kiro/prompts/` | `.kiro/` | AI-powered development environment |
| **OpenCode** (`opencode`) | `.opencode/skills/` | `.opencode/commands/` | `.opencode/` | Open-source AI coding assistant |
| **Amazon Q Developer** (`amazon-q`) | `.amazonq/skills/` | `.amazonq/prompts/` | `.amazonq/` | Amazon's AI-powered development assistant |
| **Auggie** (`auggie`) | `.augment/skills/` | `.augment/commands/` | `.augment/` | AI development assistant with augmented capabilities |
| **CodeBuddy** (`codebuddy`) | `.codebuddy/skills/` | `.codebuddy/commands/` | `.codebuddy/` | AI coding companion for development tasks |
| **CoStrict** (`costrict`) | `.cospec/skills/` | `.cospec/openspec/commands/` | `.cospec/` | Strict coding assistant with type safety |
| **Crush** (`crush`) | `.crush/skills/` | `.crush/commands/` | `.crush/` | AI assistant for code optimization |
| **Factory Droid** (`factory`) | `.factory/skills/` | `.factory/commands/` | `.factory/` | Android development AI assistant |
| **iFlow** (`iflow`) | `.iflow/skills/` | `.iflow/commands/` | `.iflow/` | Intelligent workflow automation assistant |
| **Kilo Code** (`kilocode`) | `.kilocode/skills/` | `.kilocode/workflows/` | `.kilocode/` | AI assistant for large codebases |
| **Kiro** (`kiro`) | `.kiro/skills/` | `.kiro/prompts/` | `.kiro/` | AI-powered development environment |
| **OpenCode** (`opencode`) | `.opencode/skills/` | `.opencode/commands/` | `.opencode/` | Open-source AI coding assistant |
| **Pi** (`pi`) | `.pi/skills/` | `.pi/prompts/` | `.pi/` | Mathematical AI coding assistant |
| **Qoder** (`qoder`) | `.qoder/skills/` | `.qoder/commands/` | `.qoder/` | AI assistant for quantum computing |
| **Qwen Code** (`qwen`) | `.qwen/skills/` | `.qwen/commands/` | `.qwen/` | Alibaba's Qwen AI coding assistant |
| **RooCode** (`roocode`) | `.roo/skills/` | `.roo/commands/` | `.roo/` | AI assistant with Roo architecture |
| **Trae** (`trae`) | `.trae/skills/` | *(none)* | `.trae/` | AI assistant with trace capabilities |

\* Codex commands are installed in the global Codex home (`$CODEX_HOME/prompts/` if set, otherwise `~/.codex/prompts/`), not your project directory.

\*\* GitHub Copilot prompt files are recognized as custom slash commands in IDE extensions (VS Code, JetBrains, Visual Studio). Copilot CLI does not currently consume `.github/prompts/*.prompt.md` directly.

---

## 🔧 Non-Interactive Setup

For CI/CD or scripted setup, you can configure tools programmatically:

```bash
# Configure specific tools
sdd-skills-ai configure-tools --tools claude,cursor,windsurf

# Configure all supported tools
sdd-skills-ai configure-tools --tools all

# Skip tool configuration
sdd-skills-ai configure-tools --tools none
```

**Available tool IDs:** `claude`, `cursor`, `windsurf`, `gemini`, `antigravity`, `cline`, `codex`, `continue`, `github-copilot`, `kiro`, `opencode`, `amazon-q`, `auggie`, `codebuddy`, `costrict`, `crush`, `factory`, `iflow`, `kilocode`, `pi`, `qoder`, `qwen`, `roocode`, `trae`

---

## 🎨 Tool-Specific Features

### Claude Code
- **Skills**: `.claude/skills/openspec-*/SKILL.md`
- **Commands**: `.claude/commands/opsx-<id>.md`
- **Integration**: Native slash command support
- **Best for**: CLI-based development with advanced AI

### Cursor
- **Skills**: `.cursor/skills/openspec-*/SKILL.md`
- **Commands**: `.cursor/commands/opsx-<id>.md`
- **Integration**: IDE-native chat interface
- **Best for**: IDE-based development with context awareness

### Windsurf
- **Skills**: `.windsurf/skills/openspec-*/SKILL.md`
- **Commands**: `.windsurf/workflows/opsx-<id>.md`
- **Integration**: Context-aware AI assistant
- **Best for**: Modern AI development with multi-file context

### Gemini CLI
- **Skills**: `.gemini/skills/openspec-*/SKILL.md`
- **Commands**: `.gemini/commands/opsx/<id>.toml`
- **Integration**: Google's AI model
- **Best for**: Google ecosystem integration

### Antigravity
- **Skills**: `.agent/skills/openspec-*/SKILL.md`
- **Commands**: `.agent/workflows/opsx-<id>.md`
- **Integration**: Advanced agentic environment
- **Best for**: Complex agent-based workflows

---

## 🔄 Multi-Tool Setup

You can configure multiple tools for the same project:

```bash
# Interactive multi-tool selection
sdd-skills-ai configure-tools

# Select multiple tools:
# ❯ [x] Claude Code
#   [x] Cursor
#   [x] Windsurf
#   [ ] Gemini CLI
#   [x] Antigravity
```

**Benefits of multi-tool setup:**
- **Flexibility**: Use different tools for different tasks
- **Collaboration**: Team members can use their preferred tools
- **Compatibility**: All tools share the same skills and workflows
- **Future-proof**: Easy to add or change tools

---

## 📁 Generated Directory Structure

When you configure multiple tools, you'll get:

```
your-project/
├── .claude/
│   ├── skills/
│   │   ├── scrum.product-owner/
│   │   ├── scrum.tech-lead/
│   │   └── ...
│   └── commands/
│       ├── opsx-propose.md
│       └── ...
├── .cursor/
│   ├── skills/
│   │   └── (same skills)
│   └── commands/
│       └── (same commands)
├── .windsurf/
│   ├── skills/
│   │   └── (same skills)
│   └── workflows/
│       └── (same workflows)
└── .agent/
    ├── skills/
    │   └── (same skills)
    └── workflows/
        └── (same workflows)
```

---

## 🎯 Tool Selection Guide

### For Individual Developers
- **Claude Code**: Best for CLI-first developers
- **Cursor**: Ideal for IDE-based development
- **Windsurf**: Great for modern AI workflows

### For Teams
- **Multiple tools**: Let team members choose their preference
- **Standardized skills**: Ensure consistency across tools
- **Shared workflows**: Maintain process alignment

### For Organizations
- **All tools**: Maximum compatibility and flexibility
- **Custom configurations**: Tailor to organizational needs
- **Integration**: Connect with existing development tools

---

## 🔗 Related Documentation

- [Tool Configuration](tool-configuration.md) - Detailed setup instructions
- [Multi-Tool Setup](multi-tool.md) - Using multiple AI assistants
- [CLI Reference](cli.md) - Complete command documentation
- [Getting Started](getting-started.md) - Learn the basics

---

*Need help with a specific tool? Check the [Tool Configuration](tool-configuration.md) guide for detailed setup instructions.*
