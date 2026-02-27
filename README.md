# SDD Skills AI

This CLI acts as a wrapper to initialize your project with Spec-Driven Development tools: `@fission-ai/openspec`, `spec-kit`, `@vudovn/ag-kit`, and `antigravity-awesome-skills`.

## Concept

Instead of maintaining a massive boilerplate with predefined setups for every framework, `sdd-skills-ai` handles the execution of core SDD utilities. It sets up an AI-friendly environment using tools like `@fission-ai/openspec`, GitHub's `spec-kit`, and custom `antigravity` skill packs for your team.

The goal is to focus on writing specifications (`spec.md`) and letting your AI agents implement them with precision.
In Spec-Driven Development, the specification (test) acts as the living documentation and primary driver for the code. This boilerplate emphasizes this by co-locating the `.spec.ts` files exactly alongside their implementations within focused Use Case directories:

```text
src/
  modules/
    users/
      useCases/
        createUser/
          createUser.dto.ts
          createUser.spec.ts  <-- The Spec
          createUser.ts       <-- The Implementation
```

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

The generated project comes with:

- TypeScript configuration
- Jest configured for Spec tracking (`ts-jest`)
- An example `CreateUser` use case exhibiting the Spec-Driven folder organization
- NPM scripts to immediately start testing (`npm run test`)
- Pre-configured `spec.md` for AI agent context ([OpenSpec](https://openspec.dev/))
- Automatic initialization of [Antigravity Awesome Skills](https://github.com/sickn33/antigravity-awesome-skills)
