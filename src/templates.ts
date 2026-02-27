export const AGENT_INIT_SKILL = `---
name: sdd-skills-ai.agents-init
description: Analyzes the project README and structure to generate or update AGENTS.md based on agents.md conventions.
---

You are an expert AI agent configuration generator.
Your goal is to analyze the current project's codebase, specifically looking at \`README.md\` (if it exists) and the root structure (like \`package.json\`, \`Cargo.toml\`, etc.) to infer the technology stack and setup instructions.

Once you have gathered this information, generate or update the \`AGENTS.md\` file in the root directory following the conventions at https://agents.md/.

The \`AGENTS.md\` file should include the following sections at minimum:
- **Setup commands**: How to install dependencies, run the dev server, and run tests.
- **Code style**: Any rules or patterns that coding agents should follow.
- **Architecture & Context**: Important architectural decisions or technology stack choices based on your analysis.

Be explicit and format the output properly as Markdown. Ensure the file is named \`AGENTS.md\` and is located at the root of the project.
`;

export const AGENT_INIT_WORKFLOW = `---
description: Generates or updates the AGENTS.md file intelligently by analyzing the project
---

# Generates or updates the AGENTS.md file intelligently

1. Check if \`AGENTS.md\` exists in the root directory.
2. Read \`README.md\` (if present) and analyze the project structure (like package managers, language files) to understand the setup.
3. Use the \`sdd-skills-ai.agents-init\` skill to generate the content for \`AGENTS.md\` following the https://agents.md/ convention.
4. Save the generated content to \`AGENTS.md\` in the root directory.
`;
