# Implementation Plan: Extensible Configuration

**Branch**: `feature/extensible-config` | **Date**: 2026-02-27
**Input**: User request: "agora preciso que ao instalar globalmente o projeto esse config.json eu posso adicionar novas skills nas lista com add-skills, ou novas regras spec em init"

## Summary
To allow users to dynamically add new spec tools (to `init`) and new skills (to `apply-skills`) when the CLI is installed globally, we need a persistent user-level configuration file.
1. We will establish a configuration resolution strategy that merges the default configuration (`src/config.json`) with a user-specific configuration (e.g., `~/.sdd-skills-ai/config.json`).
2. We will add a new `add-skill` command to append new skills to the user's configuration.
3. We will add a new `add-spec` command to append new spec tools to the user's configuration.
4. The `init` and `apply-skills` commands will use the merged configuration to display options.

## Technical Context
**Language/Version**: TypeScript / Node.js
**Target Platform**: CLI (Linux/macOS/Windows)
**Project Type**: CLI using Spec-Driven Development
**Key Libraries**: `commander`, `fs-extra`, `os` (for home directory)

## Constitution Check
- **I. Wrap and Simplify**: We are wrapping the configuration process so users don't have to manually edit JSON files in global NPM directories.
- **III. AI-Friendly Environment Setup**: By allowing dynamic extensibility, teams can inject their own specific AI context tools seamlessly.

## Project Structure

```text
src/
├── config.json       # Default fallback config
├── configManager.ts  # [NEW] Handles loading/saving from/to ~/.sdd-skills-ai/config.json
├── index.ts          # Integrates the manager and adds new commands
```

## Proposed Changes

### `src/configManager.ts` (NEW)
- Define types for `CommandObj`, `SpecOption`, `SkillOption`, and `Config`.
- Implement a `loadConfig()` function:
  - Reads `src/config.json` as the base.
  - Checks if `~/.sdd-skills-ai/config.json` exists. If so, reads and merges the arrays.
  - Returns the merged object.
- Implement an `addSkill(skill: SkillOption)` function:
  - Loads the user-local config (or creates an empty structural base if not exists).
  - Pushes the new skill into the `skills` array.
  - Saves back to `~/.sdd-skills-ai/config.json`.
- Implement an `addSpec(spec: SpecOption)` function:
  - Similar to `addSkill`, but for the `specs` array.

### `src/index.ts` (MODIFY)
- Replace direct `import config from "./config.json";` with `const config = loadConfig();` from `configManager.ts`.
- **Add Command**: `.command("add-skill")`
  - Allow interactive prompts (via `prompts`) to ask the user for title, value, description, and the bash command to run.
  - Call `configManager.addSkill()`.
- **Add Command**: `.command("add-spec")`
  - Same interactive prompt logic as `add-skill`, asking for spec details.
  - Call `configManager.addSpec()`.
- Ensure `init` and `apply-skills` commands continue to use the merged configuration.

## Verification Plan

1. **Build the CLI**: Run `npm run build`.
2. **Test Adding a Skill**:
   - Run `node dist/index.js add-skill`.
   - Follow prompts to add a fake skill (e.g., "Mock AI Skill", command: "echo test").
   - Run `node dist/index.js apply-skills` and verify the new "Mock AI Skill" appears as an option and can be executed.
3. **Test Adding a Spec**:
   - Run `node dist/index.js add-spec`.
   - Follow prompts.
   - Run `node dist/index.js init` and verify the new spec tool appears.
4. **File Check**: Verify that `~/.sdd-skills-ai/config.json` was created correctly.
