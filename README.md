# 🚀 SDD Skills AI

> A CLI wizard that turns any project into an **Agentic IDE** — in under 2 minutes.

[![npm version](https://img.shields.io/npm/v/sdd-skills-ai.svg)](https://www.npmjs.com/package/sdd-skills-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## What is this?

`sdd-skills-ai` orchestrates the best open-source tools for AI-powered development into a single, interactive setup. Instead of configuring each tool manually, run one command and your workspace is ready to work with **Claude Code, Gemini CLI, Cursor, Copilot, Kiro, OpenCode** and more.

---

## ⚡ Quick Start (1 minute)

```bash
npx sdd-skills-ai wizard my-project
```

The wizard walks you through each step and asks before running anything:

1. 📋 **Spec tools** — Initialize [OpenSpec](https://github.com/fission-ai/openspec) and/or [spec-kit](https://github.com/github/spec-kit)
2. 🧠 **AI Skills** — Inject [ag-kit](https://github.com/vudovn/ag-kit) and/or [Antigravity Awesome Skills](https://github.com/sickn33/antigravity-awesome-skills)
3. 📝 **AGENTS.md** — Auto-generate context file for your AI assistant
4. 🔌 **Agent Templates** — Add skills so your AI can register new tools itself

---

## 🤖 Compatibility & Invocation

Skills and workflows are installed as universal `SKILL.md` files, readable by any modern AI coding assistant:

| Tool            | Type | Invocation                        | Skills Path                       |
| :-------------- | :--- | :-------------------------------- | :-------------------------------- |
| **Antigravity** | IDE  | `(Agent Mode) Use skill...`       | `.agent/skills/`                  |
| **Claude Code** | CLI  | `>> /skill-name help me...`       | `.claude/skills/`                 |
| **Gemini CLI**  | CLI  | `Use skill-name...`               | `.gemini/skills/`                 |
| **Cursor**      | IDE  | `@skill-name (in Chat)`           | `.cursor/skills/`                 |
| **Kiro IDE**    | IDE  | `/skill-name or (Auto)`           | `.kiro/skills/`                   |
| **OpenCode**    | CLI  | `opencode run @skill-name`        | `.agents/skills/`                 |
| **Windsurf**    | IDE  | `(Chat) Use skill...`             | `.agent/skills/`                  |

---

## 📦 Integrated Tools

| Tool | What it does |
| :--- | :--- |
| [**OpenSpec**](https://github.com/fission-ai/openspec) | Creates living `spec.md` specs for AI-driven features |
| [**spec-kit**](https://github.com/github/spec-kit) | GitHub's spec-driven workflow (speckit.plan, speckit.tasks, etc.) |
| [**ag-kit**](https://github.com/vudovn/ag-kit) | Essential agentic workflow templates for your `.agent/` folder |
| [**Antigravity Awesome Skills**](https://github.com/sickn33/antigravity-awesome-skills) | 950+ community AI skills for Claude Code, Gemini, Cursor and more |

---

## 🛠 All Commands

```bash
# Full interactive setup wizard
npx sdd-skills-ai wizard [project-directory]

# Individual steps
npx sdd-skills-ai init [project-directory]        # Setup spec tools
npx sdd-skills-ai apply-skills [dir]              # Inject AI skill packs
npx sdd-skills-ai agent-init [dir]                # Create AGENTS.md
npx sdd-skills-ai spec-skills-add [dir]           # Add agent templates

# Extend your global config
npx sdd-skills-ai add-skill                       # Register a new skill pack
npx sdd-skills-ai add-spec                        # Register a new spec tool
```

---

## 🔌 Bring Your Own Tools

`sdd-skills-ai` is fully extensible. Add any GitHub repo or local folder as a new integration:

```bash
# Via CLI
sdd-skills-ai add-skill
sdd-skills-ai add-spec

# Via AI Agent (after running spec-skills-add)
/sdd-skills-ai.add-skill https://github.com/org/my-skills
/sdd-skills-ai.add-spec  https://github.com/org/my-spec-tool
```

---

## Global Install

```bash
npm install -g sdd-skills-ai
sdd-skills-ai wizard
```

---

## License

MIT © [sdd-skills-ai contributors](https://github.com/eltonjosesouza/sdd-skills-ai)
