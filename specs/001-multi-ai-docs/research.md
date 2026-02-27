# Research: Multi AI Coding Assistant Documentation

## Context
The user requested to adapt the `README.md` and `AGENTS.md` of `sdd-skills-ai` to follow the formatting and terminology found in `antigravity-awesome-skills` and `spec-kit`, focusing on supporting "multiple AI coding assistants" out-of-the-box (like Claude Code, Gemini CLI, Cursor, Copilot, etc.).

## Findings
- `antigravity-awesome-skills` defines a unified "Compatibility & Invocation" table mapping AI Assistants to invocation strategies and generated paths (`.claude/skills`, `.gemini/skills`, etc.).
- `sdd-skills-ai` installs capabilities in `.agent/` folders which are naturally compatible with multiple IDE/CLI setups if documented properly.

## Decision: Documentation Refactor
- Update `README.md` to include a "Compatibility & Invocation" table, demonstrating how the injected global templates and workspace templates can be consumed by tools like Cursor, Claude Code, Gemini CLI, and Kiro IDE.
- Adjust `AGENTS.md` to indicate that this is a polyglot orchestrator intended for AI Assistants in general, rather than pointing to a singular tool.
- Rationale: Aligns with the provided repository examples and standardizes the understanding of how `sdd-skills-ai` integrates into the modern AI Coding Assistant ecosystem.
- Alternatives considered: Building discrete CLI flags for each assistant (rejected: too complex, documenting path compatibility is the current standard in the reference repositories).
