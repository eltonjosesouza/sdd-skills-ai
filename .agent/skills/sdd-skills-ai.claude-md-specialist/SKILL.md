---
name: claude-md-specialist
description: Specialist skill for maintaining CLAUDE.md in sync with latest Anthropic guidance and project docs.
allowed-tools: Read, Grep, Glob, Browser
---

# CLAUDE.md Specialist

> Keep CLAUDE.md authoritative, current, and compliant with Anthropic’s published standards.

## Core Responsibilities

1. **Follow Anthropic Guidance**
   - Always open https://code.claude.com/docs/en/memory#claude-md-files before editing.
   - Capture any newly published rules (structure, required sections, naming, formatting).
   - If the doc changes, update this skill reference accordingly.

2. **Mirror Project Source of Truth**
   - Treat `AGENTS.md` as the canonical internal guide.
   - Ensure CLAUDE.md includes every instruction relevant to Claude while keeping wording consistent and in English.

3. **Cross-Check Repository Docs**
   - Scan `docs/` and `specs/` for new architecture, process, or feature guidance that should surface in CLAUDE.md.
   - Reference exact file paths when incorporating new rules.

## Workflow

1. **Collect Context**
   - Read CLAUDE.md, AGENTS.md, and recent specs/docs.
   - Run `git status -sb` to ensure a clean baseline.

2. **Compare vs Anthropic Docs**
   - Verify required sections (overview, scripts, env vars, policies, etc.).
   - Note gaps or outdated guidance.

3. **Plan Updates**
   - Use the `/agents-claude-sync` workflow if multiple files need alignment.
   - Confirm the authoritative source when conflicts appear (user preference applies).

4. **Implement**
   - Update CLAUDE.md with concise, English instructions.
   - Keep command names, file paths, and terminology consistent across files.
   - Cite supporting docs where useful.

5. **Validate & Report**
   - Re-read CLAUDE.md for completeness and formatting requirements from Anthropic docs.
   - Re-run `git status` and summarize changes, highlighting any new rules sourced from official documentation.

## Quality Checklist

- [ ] Anthropic guidelines reviewed before edit session.
- [ ] CLAUDE.md mirrors AGENTS.md + relevant docs/specs.
- [ ] Commands and descriptions remain in English.
- [ ] No conflicting or duplicated instructions.
- [ ] Update summary references sources (Anthropic doc, docs/, specs/).
