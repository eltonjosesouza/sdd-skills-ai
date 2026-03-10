# AGENTS.md

A dedicated place to provide context and instructions to help AI coding agents work on this project appropriately.
Learn more about this convention at: [agents.md](https://agents.md/)

## Context & Architecture
- **Description**: `sdd-skills-ai` is a polyglot CLI application that acts as an "Agentic IDE" boilerplate. It prepares your workspace to be compatible with multiple AI coding assistants (Claude Code, Gemini CLI, Cursor, Copilot, etc.) by bridging them with established SDD (Spec-Driven Development) repositories.
- **Language**: TypeScript / Node.js
- **Build tool**: `tsup` mapping to CommonJS (CJS).
- **Architecture**: Clean Architecture with SOLID principles (v2.0+)
- **Core Architecture Principles**:
  - **Universal Agentic Boilerplate**: The primary purpose of this tool is to scaffold workflows, templates, and contexts that make *any* AI coding assistant more capable within your workspace.
  - **Clean Architecture**: v2.0+ implements SOLID principles with clear layer separation (Application, Domain, Infrastructure, Presentation).
  - **Repurposing Established Repos**: Bootstraps the workspace using well-known repositories like [spec-kit](https://github.com/github/spec-kit), [OpenSpec](https://github.com/fission-ai/openspec), and [Antigravity Awesome Skills](https://github.com/sickn33/antigravity-awesome-skills).
  - **Extensibility**: Provides CLI capabilities to dynamically add Custom Spec Tools and Agent Skills by modifying the user-level configuration (with commands like `add-skill` and `add-spec`).
  - **Agent Templates**: The `spec-skills-add` command injects native templates inside `.agent/skills/` and `.agent/workflows/` so an AI coding assistant can execute these additions automatically via chat prompt commands.
  - **Dependencies**: Uses `commander` (for CLI logic), `prompts` (interactive prompts), `chalk` (styling), and `fs-extra` (filesystem operations).

## Setup commands
- **Install dependencies**: `npm install`
- **Run dev server (watch mode)**: `npm run dev`
- **Build**: `npm run build`
- **Run tests**: `npm run test` (powered by Jest)

## Code style
- Use **Strict TypeScript**. Always define explicit types and interfaces where appropriate.
- Follow the **SDD paradigm**: when adding new features, prefer creating/updating definitions or specifications first. Provide tests mirroring the structure mentioned above.
- Follow **Clean Architecture**: maintain layer separation, dependency inversion, and SOLID principles.
- Ensure CLI outputs remain descriptive and user-friendly, continuing the use of `chalk` to format messages.
- Prefer explicit and clean coding practices, adhering to the project's internal Constitution (if present in `.specify/memory/constitution.md`).

## Architecture Guidelines (v2.0+)

### Layer Structure
```
src/
├── application/     # Application services, use cases
├── domain/          # Domain entities, repositories, services
├── infrastructure/  # File system, process execution, CLI UI
├── presentation/    # CLI command handlers
└── shared/          # Common utilities
```

### SOLID Principles
- **SRP**: Each class has single responsibility
- **OCP**: Open for extension, closed for modification
- **LSP**: Subtypes must be substitutable
- **ISP**: Interface segregation
- **DIP**: Depend on abstractions, not concretions

### Adding New Features
1. **Domain**: Define entities and repositories in `domain/`
2. **Infrastructure**: Implement external services in `infrastructure/`
3. **Application**: Create use case services in `application/`
4. **Presentation**: Add CLI commands in `presentation/commands/`

## AI Assistant Configuration
This project is configured to work with multiple AI coding assistants:
- **Antigravity**: Uses `.agent/` directory for skills and workflows
- **Claude Code**: Uses `.claude/` directory
- **Gemini CLI**: Uses `.gemini/` directory
- **Cursor**: Uses `.cursor/` directory
- **Kiro IDE**: Uses `.kiro/` directory
- **OpenCode**: Uses `.agents/` directory
- **Windsurf**: Uses `.agent/` directory

## Skills & Workflows
The project includes a modular skill and workflow system located in:
- Skills: `.agent/skills/`
- Workflows: `.agent/workflows/`

These can be dynamically extended using the sdd-skills-ai CLI commands.

## Available Commands

### Interactive Setup
- **`wizard`** - Complete interactive setup (recommended)
- **`init`** - Initialize Spec-Driven base configuration

### Configuration
- **`agent-init`** - Create AGENTS.md with AI context (uses new architecture)
- **`configure-tools`** - Configure AI coding assistant tools
- **`setup-scrum-configs`** - Configure Scrum agents

### Skills & Tools
- **`apply-skills`** - Inject Antigravity skill packs
- **`install-scrum`** - Install complete Scrum methodology
- **`spec-skills-add`** - Enable autonomous tool addition

### Utilities
- **`add-skill`** - Register custom skill repository
- **`add-spec`** - Register local spec-driven tool
- **`completion`** - Setup shell autocompletion
- **`stats`** - Show available components statistics

## Testing Strategy
- **Unit Tests**: Test individual services and components
- **Integration Tests**: Test service interactions
- **E2E Tests**: Test complete CLI workflows
- **Security Tests**: Validate file operations and process execution

## Security Considerations
- File operations restricted to project directories
- Process execution in temporary directories
- Input validation at service boundaries
- No direct system calls from business logic

## Performance Considerations
- Lazy loading of services
- Minimal dependencies in core logic
- Efficient file operations through dedicated service
- Parallel execution where appropriate

## Development Workflow
1. **Plan**: Use `@plan-writing` for task breakdown
2. **Design**: Use `@architecture` for design decisions
3. **Implement**: Follow Clean Architecture principles
4. **Test**: Comprehensive testing at all layers
5. **Validate**: Use `@vulnerability-scanner` for security

These can be dynamically extended using the sdd-skills-ai CLI commands.
