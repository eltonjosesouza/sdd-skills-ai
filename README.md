<p align="center">
  <a href="https://github.com/eltonjosesouza/sdd-skills-ai">
    <picture>
      <source srcset="assets/sdd-skills-ai-logo.png">
      <img src="assets/sdd-skills-ai-logo.png" alt="SDD Skills AI logo">
    </picture>
  </a>
</p>

<p align="center">
  <a href="https://github.com/eltonjosesouza/sdd-skills-ai/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/eltonjosesouza/sdd-skills-ai/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/sdd-skills-ai"><img alt="npm version" src="https://img.shields.io/npm/v/sdd-skills-ai?style=flat-square" /></a>
  <a href="./LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" /></a>
  <a href="https://discord.gg/YctCnvvshC"><img alt="Discord" src="https://img.shields.io/discord/1411657095639601154?style=flat-square&logo=discord&logoColor=white&label=Discord&suffix=%20online" /></a>
</p>

<details>
<summary><strong>The universal agentic IDE boilerplate with Clean Architecture.</strong></summary>

[![Stars](https://img.shields.io/github/stars/eltonjosesouza/sdd-skills-ai?style=flat-square&label=Stars)](https://github.com/eltonjosesouza/sdd-skills-ai/stargazers)
[![Downloads](https://img.shields.io/npm/dm/sdd-skills-ai?style=flat-square&label=Downloads/mo)](https://www.npmjs.com/package/sdd-skills-ai)
[![Contributors](https://img.shields.io/github/contributors/eltonjosesouza/sdd-skills-ai?style=flat-square&label=Contributors)](https://github.com/eltonjosesouza/sdd-skills-ai/graphs/contributors)

</details>
<p></p>
Our philosophy:

```text
→ wizard-driven not command-heavy
→ complete not partial
→ Scrum-first not ad-hoc
→ built for teams not just individuals
→ scalable from solo to enterprise
→ Clean Architecture not technical debt
```

> [!TIP]
> **Complete Scrum methodology now built-in!** We've integrated full SDD+TDD+DDD Scrum with 9 specialized AI agents.
> **New Clean Architecture!** Refactored with SOLID principles for maximum maintainability.
>
> Run `sdd-skills-ai wizard` to get started. → [Learn more here](docs/scrum/overview.md)

<p align="center">
  Follow <a href="https://github.com/eltonjosesouza">eltonjosesouza on GitHub</a> for updates · Join the <a href="https://github.com/eltonjosesouza/sdd-skills-ai/discussions">GitHub Discussions</a> for help and questions.
</p>

## See it in action

```text
You: sdd-skills-ai wizard
AI:  🧙‍♂️ Welcome to the SDD Skills AI Wizard!
     ✓ Clean Architecture initialized
     ✓ Spec-Kit initialized (default)
     ✓ 23 AI tools configured
     ✓ 47 community skills added
     ✓ Complete Scrum methodology installed
     ✓ 9 specialized agents ready
     Your AI-driven development environment is ready!

You: @scrum.product-owner Help me define user authentication
AI:  I'll help you create a complete user story:
     ✓ User story with acceptance criteria
     ✓ Business constraints and success metrics
     ✓ Technical requirements overview
     Ready for contract phase!

You: /scrum.feature-lifecycle
AI:  Starting complete 6-phase development:
     ✓ Phase 1: Discovery & Definition
     ✓ Phase 2: Contract Creation
     ✓ Phase 3: Sprint Planning
     ✓ Phase 4: Development (TDD)
     ✓ Phase 5: Validation
     ✓ Phase 6: Release & Feedback
     Feature complete and deployed!
```

<details>
<summary><strong>Complete Development Environment</strong></summary>

<p align="center">
  <img src="assets/sdd-skills-ai-dashboard.png" alt="SDD Skills AI environment preview" width="90%">
</p>

</details>

## Quick Start

**Requires Node.js 18.0.0 or higher.**

Install SDD Skills AI globally:

```bash
npm install -g sdd-skills-ai
```

Then navigate to your project directory and run the wizard:

```bash
cd your-project
sdd-skills-ai wizard
```

Now tell your AI: `@scrum.product-owner <what-you-want-to-build>`

> [!NOTE]
> Not sure if your AI tool is supported? [View the full list](docs/supported-tools.md) – we support 23+ tools and growing.
>
> Also works with pnpm, yarn, and bun. [See installation options](docs/installation.md).

## 🏗️ Architecture

**v2.0 introduces Clean Architecture with SOLID principles:**

```
src/
├── application/           # Application Layer (Use Cases)
│   ├── services/         # Application services
│   └── use-cases/        # Specific use case implementations
├── domain/               # Domain Layer (Business Logic)
│   ├── entities/         # Domain entities
│   ├── repositories/    # Repository interfaces
│   └── services/         # Domain services
├── infrastructure/       # Infrastructure Layer
│   ├── filesystem/      # File system operations
│   ├── process/         # Process execution
│   └── ui/              # CLI interactions
├── presentation/         # Presentation Layer (CLI)
│   └── commands/        # CLI command handlers
└── shared/              # Shared utilities
```

### Key Benefits

- **Single Responsibility**: Each class has one clear purpose
- **Dependency Inversion**: Services depend on interfaces, not concretions
- **Testability**: Easy to mock and test individual components
- **Maintainability**: Clear separation makes code easier to modify
- **Extensibility**: New features can be added without breaking existing code

## 🚀 Commands

### Interactive Setup
- **`wizard`** - Complete interactive setup (recommended)
- **`init`** - Initialize Spec-Driven base configuration

### Configuration
- **`agent-init`** - Create AGENTS.md with AI context
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

## Docs

→ **[Getting Started](docs/getting-started.md)**: first steps<br>
→ **[Quick Start](docs/quick-start.md)**: 5-minute tutorial<br>
→ **[CLI Reference](docs/cli.md)**: complete command reference<br>
→ **[Architecture Guide](docs/architecture/overview.md)**: Clean Architecture details<br>
→ **[Scrum Overview](docs/scrum/overview.md)**: complete methodology<br>
→ **[Supported Tools](docs/supported-tools.md)**: 23 AI assistants<br>
→ **[Installation](docs/installation.md)**: detailed setup guide<br>
→ **[FAQ](docs/faq.md)**: frequently asked questions<br>
→ **[Troubleshooting](docs/troubleshooting.md)**: common issues

## Why SDD Skills AI?

AI coding assistants are powerful but lack structure and methodology. SDD Skills AI adds a complete development layer so you can build with discipline, quality, and team collaboration.

- **Build with discipline** — SDD+TDD+DDD methodology ensures quality before code gets written
- **Clean Architecture** — SOLID principles for maintainable, scalable code
- **Collaborate effectively** — 9 specialized Scrum agents with clear roles and responsibilities
- **Stay organized** — complete 6-phase development from discovery to release
- **Use your tools** — works with 23+ AI assistants via agent configurations
- **Scale infinitely** — from personal projects to enterprise teams

## Teams

Using SDD Skills AI in a team? [Join our GitHub Discussions](https://github.com/eltonjosesouza/sdd-skills-ai/discussions) for collaboration tips and best practices.

---

## License

MIT © [sdd-skills-ai contributors](https://github.com/eltonjosesouza/sdd-skills-ai)
