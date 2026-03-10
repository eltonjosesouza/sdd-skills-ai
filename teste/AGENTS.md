# AGENTS.md

A dedicated place to provide context and instructions to help AI coding agents work on this project appropriately.
Learn more about this convention at: [agents.md](https://agents.md/)

## Context & Architecture
- **Description**: Project initialized with sdd-skills-ai CLI tool
- **Language**: TypeScript / Node.js
- **Build tool**: `tsup` mapping to CommonJS (CJS)
- **Core Architecture Principles**:
  - **Spec-Driven Development**: Following SDD paradigm for development
  - **AI Agent Compatibility**: Configured for multiple AI coding assistants
  - **Extensibility**: Modular skill and workflow system

## Setup commands
- **Install dependencies**: `npm install`
- **Run dev server (watch mode)**: `npm run dev`
- **Build**: `npm run build`
- **Run tests**: `npm run test`

## Code style
- Use **Strict TypeScript**. Always define explicit types and interfaces where appropriate.
- Follow the SDD paradigm: when adding new features, prefer creating/updating definitions or specifications first.
- Ensure CLI outputs remain descriptive and user-friendly, continuing the use of `chalk` to format messages.
- Prefer explicit and clean coding practices.

## AI Assistant Configuration
This project is configured to work with multiple AI coding assistants:
- **Antigravity**: Uses `.agent/` directory for skills and workflows
- **Claude Code**: Uses `.claude/` directory
- **Gemini CLI**: Uses `.gemini/` directory
- **Cursor**: Uses `.cursor/` directory
- **Windsurf**: Uses `.agent/` directory

## Skills & Workflows
The project includes a modular skill and workflow system located in:
- Skills: `.agent/skills/`
- Workflows: `.agent/workflows/`

These can be dynamically extended using the sdd-skills-ai CLI commands.
