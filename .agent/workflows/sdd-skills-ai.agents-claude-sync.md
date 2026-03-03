---
description: Synchronize AGENTS.md and CLAUDE.md instructions while validating supporting docs/specs
---

1. **Collect Context**
   - Open `AGENTS.md` and `CLAUDE.md` to understand current content, noting sections unique to each file.
   - Run `git status -sb` to confirm a clean baseline before editing.

2. **Scan Supporting References**
   - Review `docs/` for newly added architecture, process, or policy details that are not yet reflected in `AGENTS.md` or `CLAUDE.md` (use `rg`/`find` if needed).
   - Review `specs/` for feature-specific instructions that may belong in the agent docs (focus on specs created/updated since the last sync).
   - List any missing directives that should be mirrored between the two files.

3. **Plan the Sync**
   - Create or update a task plan summarizing which sections need alignment and whether new guidance from `docs/` or `specs/` must be incorporated.
   - Confirm there are no conflicting rules; if conflicts exist, prefer the authoritative source specified by the user (e.g., CLAUDE.md vs AGENTS.md).

4. **Update Files**
   - Edit `AGENTS.md` first (if it is the canonical source) to include any missing guidance.
   - Mirror the relevant sections in `CLAUDE.md`, ensuring terminology and command names remain in English.
   - Reference supporting documentation locations when adding new directives.

5. **Validate**
   - Re-read both files to ensure sections match and there are no duplicated or contradictory instructions.
   - Double-check `docs/` and `specs/` for any overlooked updates before finalizing.

6. **Review & Report**
   - Run `git status` to confirm only the intended files changed.
   - Summarize the updates, explicitly mentioning any new guidance sourced from `docs/` or `specs/`.
