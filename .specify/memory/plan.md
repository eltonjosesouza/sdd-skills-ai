# Implementation Plan: Wizard Command

**Branch**: `feature/wizard-command` | **Date**: 2026-02-27
**Input**: User request: "agora crie um comando chamado wizard, ele ira chamar a instalaco do specs depois a instalacao das skills depois a instalagendo do agentsmd e por fim a instalacao do de add skills e specs, todos as etapas sera perguntado se ele deseja instaalar aquekle passo ou nao"

## Summary
To provide a smooth onboarding experience, we will create a `wizard` command. This command will sequentially ask the user if they want to execute each of the four main setup steps:
1. `init` (Specs initialization)
2. `apply-skills` (Skills injection)
3. `agent-init` (AGENTS.md setup)
4. `spec-skills-add` (Templates for dynamic spec/skill addition)

If the user answers "yes" to a step, the wizard will immediately invoke the corresponding logic for that step.

## Proposed Changes

### `src/index.ts` (MODIFY)
1. **Refactor Action Handlers**: Extract the inline `.action(...)` callbacks for `init`, `apply-skills`, `agent-init`, and `spec-skills-add` into named `async` functions (e.g., `initAction`, `applySkillsAction`, `agentInitAction`, `specSkillsAddAction`).
2. **Wire Handlers to Existing Commands**: Pass these named functions back to their respective `.command(...).action(...)` definitions.
3. **Add `wizard` Command**:
   - Create `.command("wizard")`.
   - Take an optional `[project-directory]` argument.
   - Use `prompts` to ask 4 consecutive `confirm` questions:
     - "Do you want to initialize Spec-Driven base configuration (specs)?"
     - "Do you want to inject AI Skills?"
     - "Do you want to setup AGENTS.md (agent-init)?"
     - "Do you want to install AI agent templates for adding new skills/specs?"
   - For each "yes", await the corresponding action handler.
   - Print a final summary when the wizard completes.

## Verification Plan

1. **Build**: `npm run build`
2. **Test Command**: Run `node dist/index.js wizard ./`
3. **Verify Interactive Flow**:
   - Answer "yes" to the first question -> observe `init` prompts appearing.
   - Answer "no" to the second question -> observe it skips `apply-skills`.
   - Answer "yes" to the third -> observe `AGENTS.md` and workflows generated.
   - Answer "yes" to the fourth -> observe `spec-skills-add` templates generated.
