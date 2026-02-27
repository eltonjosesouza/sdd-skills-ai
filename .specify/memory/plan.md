# Implementation Plan: Spec & Skills AI Agent Commands

**Branch**: `feature/spec-skills-add-templates` | **Date**: 2026-02-27
**Input**: User request: "crie um workflow e uma skill para adicionar via agent, tem q ser template para isso pq vai ser instalado ao executar o comando spec-skills-add... crie um workflow para cada, um para add-skill e um add-spec"

## Summary
To allow users to use AI agents to dynamically add new spec and skill options to their global config directly from a GitHub repository or local path, we will create two new agent skills and two matching workflows. These will be embedded as template strings in `src/templates.ts`.

We will then introduce a new CLI command `spec-skills-add` to deploy these templates into the user's project (`.agent/skills` and `.agent/workflows`), from where they can be executed by the developer directly via their AI coding assistant.

## Proposed Changes

### `src/templates.ts` (MODIFY)
Add four new string constants for the agent templates:
- `ADD_SKILL_SKILL_TEMPLATE`: A `.md` file with instructions for an AI agent to read a GitHub repo/local path and execute `sdd-skills-ai add-skill`.
- `ADD_SKILL_WORKFLOW_TEMPLATE`: A workflow that instructs the agent to run the skill above step-by-step.
- `ADD_SPEC_SKILL_TEMPLATE`: A `.md` file instructing an AI agent to read a GitHub repo/local path and execute `sdd-skills-ai add-spec`.
- `ADD_SPEC_WORKFLOW_TEMPLATE`: Document outlining the `add-spec` flow.

### `src/index.ts` (MODIFY)
Add a new command: `.command("spec-skills-add")`.
- When invoked in a project directory, it ensures `.agent/skills/sdd-skills-ai.add-skill`, `.agent/skills/sdd-skills-ai.add-spec`, and `.agent/workflows/` directories exist.
- Writes the respective strings from `src/templates.ts` into these files.
- Prints success messages with instructions on how to use them (e.g., `/sdd-skills-ai.add-skill <repo-url>`).

## Verification Plan

1. **Build the CLI**: Run `npm run build` to check for syntax/type errors.
2. **Setup Directories**:
   - Create a test directory or run the command right in the `sdd-skills-ai` project.
   - Run `node dist/index.js spec-skills-add ./`.
3. **Verify Files**:
   - Check if `.agent/skills/sdd-skills-ai.add-skill/SKILL.md` exists and contains correct markdown.
   - Check if `.agent/skills/sdd-skills-ai.add-spec/SKILL.md` exists.
   - Check if the workflows were created correctly in `.agent/workflows/`.
4. **Agent Testing (Manual user test)**: Wait and prompt the user to use the newly copied skills and workflows with their AI assistant to ensure the instructions translate well to AI actions.
