# Workflow: Project Initialization

This skill describes the exact protocol that ANY agent starting a new project MUST follow. It establishes a repeatable, version-controlled foundation using the Scrum Protocol structure.

## Overview
When assigned to start or initialize a new project/repository, follow these instructions perfectly to create the file structure, git repository, and base documentation tree BEFORE opening any feature planning tasks.

## Step 1: Create the Workspace

1. Create the project root directory.
2. Initialize Git (`git init`).
3. Create a `.gitignore` file that excludes environment, IDE, and dependency files (e.g. `node_modules/`, `.env`, `.DS_Store`).
4. Commit the initial `.gitignore` as the initial genesis commit.

## Step 2: Scaffold the `docs/` Hybrid Structure

Every project utilizing this toolkit requires the Hybrid Feature-Sprint documentation structure. Create the following exact folder and file tree:

```
docs/
├── architecture/
│   ├── tech-stack.md
│   ├── tooling.md
│   ├── data-model.md
│   └── decisions/
├── features/
├── bugs/
├── releases/
└── sprints/
```

### Add the default architecture placeholders
1. Under `docs/architecture/tech-stack.md`, create a minimal markdown template for identifying Front-end, Back-end, Database, and Infrastructure choices.
2. Under `docs/architecture/tooling.md`, create a template for specifying CLI tools, CI tools, and deployment pipelines.
3. Under `docs/architecture/decisions/`, add an `_ADR-TEMPLATE.md` with the standard ADR layout.

## Step 3: Scaffold the First Sprint

1. Create `docs/sprints/sprint-01/`.
2. Inside `sprint-01`, create `backlog.md`, `sprint-goal.md`, `retrospective.md`, and a `tasks/` directory.

## Step 4: Maintenance & Synchronization

- As the project develops, ANY creation of an ADR, a User Story (`features/<slug>/01-discovery/`), a Spec (`02-contract/`), or a Bug (`sprints/sprint-{NN}/bugs/`) MUST follow this tree architecture strictly.
- If you alter a global architecture decision or technical stack constraint, YOU MUST add it to `docs/architecture/decisions/` and update `tech-stack.md` or `tooling.md` immediately. No exceptions.
- You must ALWAYS commit these changes to git so the single source of truth is synced across all agents collaborating on this repository.
