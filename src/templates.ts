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

export const ADD_SKILL_SKILL_TEMPLATE = `---
name: sdd-skills-ai.add-skill
description: Adds a new AI skill to the global sdd-skills-ai configuration.
---

You are an expert at extending the \`sdd-skills-ai\` environment.
Your goal is to parse a GitHub repository URL or a local path provided by the user, and use it to add a new AI skill to their global configuration.

1. Extract the name, title, and description of the skill from the URL or local path.
2. Determine the command needed to fetch or execute it (e.g. \`npx -y ...\`).
3. Run the CLI tool to register it: \`sdd-skills-ai add-skill\` (Note: this is interactive, so you should pipe the answers or advise the user to run it with the deduced parameters).
`;

export const ADD_SKILL_WORKFLOW_TEMPLATE = `---
description: Adds a new AI skill to the sdd-skills-ai global configuration
---

# Add a new Skill

1. Ask the user for the GitHub URL or local path of the skill they want to add.
2. Read the source to understand the skill's name, description, and installation command.
3. Help the user run \`sdd-skills-ai add-skill\` and provide them the correct values to fill in the interactive prompts.
`;

export const ADD_SPEC_SKILL_TEMPLATE = `---
name: sdd-skills-ai.add-spec
description: Adds a new Spec-Driven tool to the global sdd-skills-ai configuration.
---

You are an expert at extending the \`sdd-skills-ai\` environment.
Your goal is to parse a GitHub repository URL or a local path provided by the user, and use it to add a new Spec-Driven tool to their global configuration.

1. Extract the name, title, and description of the spec tool from the URL or local path.
2. Determine the command needed to fetch or execute it (e.g. \`npx ...\`).
3. Run the CLI tool to register it: \`sdd-skills-ai add-spec\` (Note: this is interactive, so you should pipe the answers or advise the user to run it with the deduced parameters).
`;

export const ADD_SPEC_WORKFLOW_TEMPLATE = `---
description: Adds a new Spec tool to the sdd-skills-ai global configuration
---

# Add a new Spec

1. Ask the user for the GitHub URL or local path of the spec tool they want to add.
2. Read the source to understand the tool's name, description, and initialization command.
3. Help the user run \`sdd-skills-ai add-spec\` and provide them the correct values to fill in the interactive prompts.
`;
