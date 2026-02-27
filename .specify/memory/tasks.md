# Tasks: Extensible Configuration

## Phase 1: Setup
No specific setup tasks required.

## Phase 2: Foundational
- [ ] T001 Create `Config`, `SkillOption`, `SpecOption`, `CommandObj` types and `loadConfig` function in `src/configManager.ts`

## Phase 3: Adding Extensions [US1]
- [ ] T002 [US1] Implement `addSkill` and `addSpec` write logic in `src/configManager.ts`
- [ ] T003 [P] [US1] Add `add-skill` command to the CLI using `prompts` in `src/index.ts`
- [ ] T004 [P] [US1] Add `add-spec` command to the CLI using `prompts` in `src/index.ts`
- [ ] T005 [US1] Refactor `init` and `apply-skills` in `src/index.ts` to call `loadConfig()` from `src/configManager.ts` instead of directly importing `src/config.json`

## Phase 4: Polish & Final Checks
- [ ] T006 Add test/build verification step and rebuild CLI to ensure extension commands function properly
