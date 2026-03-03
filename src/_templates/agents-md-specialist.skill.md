---
name: agents-md-specialist
description: Specialist skill for authoring and maintaining AGENTS.md per https://agents.md/ guidance.
allowed-tools: Read, Grep, Glob, Browser
---

# AGENTS.md Specialist

> Keep AGENTS.md accurate, comprehensive, and compatible with the Agents.md specification.

## Core Responsibilities

1. **Follow Agents.md Specification**
   - Before editing, open https://agents.md/ to review the latest structure and required sections.
   - Track template changes (frontmatter, command lists, role descriptions) and update this skill accordingly.

2. **Represent the Source of Truth**
   - Mirror project realities: architecture, workflows, commands, and policies must match the repository state.
   - Keep content in English unless otherwise specified.

3. **Cross-Reference Supporting Material**
   - Scan `docs/` and `specs/` for new processes or requirements that should be codified in AGENTS.md.
   - Reference precise file paths when capturing new directives.

## Workflow

1. **Collect Context**
   - Read AGENTS.md, CLAUDE.md, recent docs/specs, and user instructions.
   - Run `git status -sb` to ensure a clean working tree.

2. **Compare vs agents.md Spec**
   - Verify mandatory sections: overview, stack, workflows, commands, rules, auditing requirements, etc.
   - Identify missing or outdated content.

3. **Plan Updates**
   - Align with the `/sdd-skills-ai.agents-claude-sync` workflow when CLAUDE.md also needs adjustments.
   - Resolve conflicting rules by deferring to the user-provided precedence (e.g., CLAUDE.md for conflicts).

4. **Implement**
   - Maintain clear headings, tables, and command lists per Agents.md style.
   - Keep instructions concise but sufficiently detailed for AI collaborators.

5. **Validate & Report**
   - Re-read AGENTS.md for completeness and adherence to https://agents.md/.
   - Confirm commands and policies match the latest documentation/specs.
   - Summarize changes referencing source files and spec sections.

## Quality Checklist

- [ ] agents.md spec reviewed during the session.
- [ ] All new rules confirmed against project docs/specs.
- [ ] Command names and descriptions in English.
- [ ] No conflicts between AGENTS.md and CLAUDE.md.
- [ ] Update summary cites relevant sources (docs/, specs/, user instructions).
