# AGENTS.md

A dedicated place to provide context and instructions to help AI coding agents work on this project appropriately.
Learn more about this convention at: [agents.md](https://agents.md/)

## Context & Architecture
- **Description**: \`sdd-skills-ai\` is a CLI application that acts as a wrapper to scaffold a Spec-Driven Organization boilerplate. It sets up an AI-friendly environment using tools like \`@fission-ai/openspec\`, GitHub's \`spec-kit\`, and custom \`antigravity\` skill packs.
- **Language**: TypeScript / Node.js
- **Build tool**: \`tsup\` mapping to CommonJS (CJS).
- **Core Architecture Principles**:
  - **Agentic IDE Configuration**: The primary purpose of this tool is to scaffold workflows and contexts that make IDEs and coding agents more capable.
  - **Repurposing Established Repos**: Bootstraps the workspace using well-known repositories like [spec-kit](https://github.com/github/spec-kit), [OpenSpec](https://github.com/fission-ai/openspec), and [Antigravity Awesome Skills](https://github.com/sickn33/antigravity-awesome-skills).
  - **Extensibility**: Provides CLI capabilities to dynamically add Custom Spec Tools and Agent Skills by modifying the user-level configuration (with commands like `add-skill` and `add-spec`).
  - **Agent Templates**: The `spec-skills-add` command injects native templates inside `.agent/skills/` and `.agent/workflows/` so an AI coding assistant can execute these additions automatically via chat prompt commands.
  - **Dependencies**: Uses `commander` (for CLI logic), `prompts` (interactive prompts), `chalk` (styling), and `fs-extra` (filesystem operations).

## Setup commands
- **Install dependencies**: \`npm install\`
- **Run dev server (watch mode)**: \`npm run dev\`
- **Build**: \`npm run build\`
- **Run tests**: \`npm run test\` (powered by Jest)

## Code style
- Use **Strict TypeScript**. Always define explicit types and interfaces where appropriate.
- Follow the SDD paradigm: when adding new features, prefer creating/updating definitions or specifications first. Provide tests mirroring the structure mentioned above.
- Ensure CLI outputs remain descriptive and user-friendly, continuing the use of \`chalk\` to format messages.
- Prefer explicit and clean coding practices, adhering to the project's internal Constitution (if present in `.specify/memory/constitution.md`).
