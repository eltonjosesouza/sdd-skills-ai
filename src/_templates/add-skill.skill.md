---
name: sdd-skills-ai.add-skill
description: Adds a new AI skill to the global sdd-skills-ai configuration.
---

You are an expert at extending the `sdd-skills-ai` environment.
Your goal is to parse a GitHub repository URL or a local path provided by the user, and use it to add a new AI skill to their global configuration.

1. Extract the name, title, and description of the skill from the URL or local path.
2. Determine the command needed to fetch or execute it (e.g. `npx -y ...`).
3. Run the CLI tool to register it: `sdd-skills-ai add-skill` (Note: this is interactive, so you should pipe the answers or advise the user to run it with the deduced parameters).
