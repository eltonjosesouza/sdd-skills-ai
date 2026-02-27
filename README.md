# 🚀 SDD Skills AI: The Universal Agentic IDE Boilerplate 📦

> Turn any project into a high-performance **Agentic IDE** in under 60 seconds. One wizard to rule them all.

[![npm version](https://img.shields.io/npm/v/sdd-skills-ai.svg?style=flat-square)](https://www.npmjs.com/package/sdd-skills-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/eltonjosesouza/sdd-skills-ai/pulls)
[![Downloads](https://img.shields.io/npm/dt/sdd-skills-ai.svg?style=flat-square)](https://www.npmjs.com/package/sdd-skills-ai)

`sdd-skills-ai` is a polyglot CLI orchestrator that prepares your workspace for the next generation of AI development. It bridges the gap between your code and elite AI assistants like **Claude Code, Gemini CLI, Cursor, and Windsurf**.

---

## 🧭 Table of Contents
- [🚀 New Here? Start Here!](#-new-here-start-here)
- [⚡ Quick Start](#-quick-start-1-minute)
- [🔌 Compatibility & Invocation](#-compatibility--invocation)
- [📦 Integrated Ecosystem](#-integrated-ecosystem)
- [🛠 CLI Command Reference](#-cli-command-reference)
- [🔌 Extensibility](#-bring-your-own-tools)
- [⚖️ License](#license)

---

## 🚀 New Here? Start Here!

### 1. 🐣 Context: What is this?
AI Agents are smart, but they are "workspace-blind" by default. They don't know your preferred specs format ([OpenSpec](https://github.com/fission-ai/openspec)) or your advanced agentic workflows.
`sdd-skills-ai` is the **missing link**. It automatically configures and injects the "brain" (skills and workflows) your AI needs to actually *do* the work instead of just talking about it.

### 2. 🎯 The Goal
Standardize your development environment so **any** AI assistant can immediately understand your project architecture, rules, and specialized tools.

---

## ⚡ Quick Start (1 minute)

No installation required. Run the interactive wizard directly:

```bash
npx sdd-skills-ai wizard
```

The wizard will guide you through:
1. 📋 **Workflow Specs** — Setup `spec.md` and feature planning tools.
2. 🧠 **Elite Skills** — Inject 950+ community skills or specialized ag-kit templates.
3. 📝 **Agent Identity** — Create a project-aware `AGENTS.md`.
4. 🔌 **Autonomous Tools** — Enable your AI to add its own skills later.

---

## 🔌 Compatibility & Invocation

`sdd-skills-ai` follows the universal `SKILL.md` standard. Choose your assistant and it just works:

| AI Assistant | Type | Path | Invocation Style |
| :--- | :--- | :--- | :--- |
| **Claude Code** | CLI | `.claude/skills/` | `>> /skill-name help...` |
| **Gemini CLI** | CLI | `.gemini/skills/` | `Use skill-name to...` |
| **Cursor** | IDE | `.cursor/skills/` | `@skill-name` inside Chat |
| **Antigravity** | IDE | `.agent/skills/` | `(Agent Mode) active` |
| **Codex CLI** | CLI | `.codex/skills/` | `(Auto) Loads on-demand` |
| **Kiro IDE** | IDE | `.kiro/skills/` | `/skill-name` in Console |
| **OpenCode** | CLI | `.agents/skills/` | `opencode run @skill` |
| **Windsurf** | IDE | `.agent/skills/` | `(Chat)` context-aware |

---

## 📦 Integrated Ecosystem

We ship with natively supported integrations for the industry's best SDD tools:

- [**OpenSpec**](https://github.com/fission-ai/openspec) — Living specifications for AI-driven features.
- [**spec-kit**](https://github.com/github/spec-kit) — GitHub's official spec-driven implementation workflow.
- [**ag-kit**](https://github.com/vudovn/ag-kit) — Essential agentic primitives for `.agent/` folders.
- [**Antigravity Awesome Skills**](https://github.com/sickn33/antigravity-awesome-skills) — The world's largest collection (950+) of agentic skills.

---

## 🛠 CLI Command Reference

### ✨ Core Commands
```bash
sdd-skills-ai wizard [dir]       # The full interactive experience
sdd-skills-ai init [dir]         # Setup spec-driven architecture base
```

### 🧠 Skills & Context
```bash
sdd-skills-ai apply-skills [dir] # Inject selected skill packs
sdd-skills-ai agent-init [dir]   # Initialize AGENTS.md context
sdd-skills-ai spec-skills-add    # Give your Agent power to add tools
```

---

## 🔌 Bring Your Own Tools

`sdd-skills-ai` is built for extensibility. Mix and match any source:

```bash
# Register a custom GitHub skill repository
sdd-skills-ai add-skill https://github.com/your-org/my-private-skills

# Register a local spec-driven tool
sdd-skills-ai add-spec ./local-tools/my-spec-kit
```

---

## 🤝 Community & Support

- ⭐ **Star this repo** if this tool saves you time.
- 🐛 **Report issues** in the [GitHub Issues](https://github.com/eltonjosesouza/sdd-skills-ai/issues).
- 🤝 **Contribute** by adding new templates or fixing bugs.

---

## License

MIT © [sdd-skills-ai contributors](https://github.com/eltonjosesouza/sdd-skills-ai)
