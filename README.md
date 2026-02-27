# SDD Skills AI

This CLI acts as a wrapper to initialize your project with Spec-Driven Development tools: `@fission-ai/openspec`, `spec-kit`, `@vudovn/ag-kit`, and `antigravity-awesome-skills`.

## Concept

The primary goal of `sdd-skills-ai` is to act as a **boilerplate that configures your IDE skills and workflows, making them truly "agentic."** Instead of maintaining complex manual setups, this CLI injects pre-configured prompts, context instructions, and AI tools into your workspace.

By orchestrating established AI-focused repositories, `sdd-skills-ai` automatically sets up the optimal environment for your AI coding assistants to thrive.

### Supported Integrations (Out of the Box)
We currently ship with integrations for some of the most recognized tools for Agentic IDEs:
- [**OpenSpec**](https://github.com/fission-ai/openspec): Standardized feature specification for AI agents.
- [**spec-kit**](https://github.com/github/spec-kit): GitHub's workflow for spec-driven engineering.
- [**ag-kit**](https://github.com/vudovn/ag-kit): Essential agentic templates for structured workflows.
- [**Antigravity Awesome Skills**](https://github.com/sickn33/antigravity-awesome-skills): A community-curated collection of advanced agent skills.

## Compatibility & Invocation

`sdd-skills-ai` outputs universal `SKILL.md` files and workspace configurations that play nicely with any AI coding assistant supporting local agentic skills or context reading.

| Tool            | Type | Setup Result Location |
| :-------------- | :--- | :------------------------------------------------ |
| **Claude Code** | CLI  | `.claude/skills/` (if mapped) or standard config  |
| **Gemini CLI**  | CLI  | `.gemini/skills/` (if mapped)                     |
| **Cursor**      | IDE  | Reads `.cursorrules` / `.cursor/skills/`          |
| **Kiro IDE**    | IDE  | Workspace: `.kiro/skills/`                        |
| **Antigravity** | IDE  | Workspace: `.agent/skills/` and `.agent/workflows`|
| **OpenCode**    | CLI  | `.agents/skills/`                                 |

### Bring Your Own Tools
`sdd-skills-ai` is fully extensible. You are not limited to the default tools—you can easily **register and add new integrations** to your global configuration directly from other GitHub repositories or local folders using our interactive CLI commands.

## Usage

The easiest way to initialize all features at once is using the interactive **wizard**:

```bash
npx sdd-skills-ai wizard my-new-project
```

Or just type \`npx sdd-skills-ai wizard\` and follow the prompts.

### 1. `npx` (No Global Install)

You can immediately scaffold a new project directory using `npx` (which avoids a global install):

```bash
npx sdd-skills-ai init my-new-project
```

Or omit the project name to enter interactive mode:

```bash
npx sdd-skills-ai init
```

### 2. Global Install (Extensible Mode)

If you prefer to install it globally for frequent use:

```bash
npm install -g sdd-skills-ai
sdd-skills-ai init my-new-project
```

#### Modifying the Global Configuration
When installed globally, you can dynamically add new spec and skill tools:
- **`sdd-skills-ai add-skill`**: Adds a new interactive AI skill into your global `apply-skills` list.
- **`sdd-skills-ai add-spec`**: Adds a new interactive spec tool into your global `init` list.

### 3. Applying AI Skills

You can selectively inject AI agent skills to any project folder (like `antigravity` configuration templates) using:

```bash
npx sdd-skills-ai apply-skills
```
This will allow you to pick from:

- **Antigravity Kit**: Provides standard AI workflows via `@vudovn/ag-kit init`.
- **Awesome Skills**: Community curated tools via `antigravity-awesome-skills`.

### 4. Agent Configuration & Templates

- **`npx sdd-skills-ai agent-init`**: Analyzes your code and automatically creates an `AGENTS.md` context file for your AI agents to read.
- **`npx sdd-skills-ai spec-skills-add`**: Generates AI Agent templates (`.agent/skills/` and `.agent/workflows`) into your current directory. Once added, you can ask your AI Code assistant to automatically absorb GitHub repos and add them to your global config directly from your chat prompt!

## What's Included?

When you initialize a project using `sdd-skills-ai`, you can automatically select and apply:

- Pre-configured `spec.md` structures for AI agent context.
- Native installation of `.agent/skills` and `.agent/workflows` into your project.
- Ready-to-use workflows to orchestrate different agents (planning, architectural reviews, TDD execution).
- A unified wizard to manage the lifecycle of your Agentic setups.
