---
description: Generates or updates the AGENTS.md file intelligently by analyzing the project
---

# Generates or updates the AGENTS.md file intelligently

1. Check if `AGENTS.md` exists in the root directory.
2. Read `README.md` (if present) and analyze the project structure (like package managers, language files) to understand the setup.
3. Use the `sdd-skills-ai.agents-init` skill to generate the content for `AGENTS.md` following the https://agents.md/ convention.
4. Save the generated content to `AGENTS.md` in the root directory.
