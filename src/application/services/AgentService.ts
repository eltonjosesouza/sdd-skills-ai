import path from "path";
import chalk from "chalk";
import { Agent, ActionResult, Project } from "../../domain/entities";
import { AgentRepository } from "../../domain/repositories/AgentRepository";
import { FileService } from "../../infrastructure/filesystem/FileService";

export interface AgentService {
  initializeAgentsMd(project: Project): Promise<ActionResult>;
}

export class AgentServiceImpl implements AgentService {
  constructor(
    private agentRepository: AgentRepository,
    private fileService: FileService
  ) {}

  async initializeAgentsMd(project: Project): Promise<ActionResult> {
    console.log(chalk.blue("📝 Setting up AGENTS.md..."));

    try {
      const agentsMdPath = path.join(project.path, "AGENTS.md");

      if (await this.fileService.exists(agentsMdPath)) {
        console.log(chalk.yellow("⚠️  AGENTS.md already exists. Skipping creation."));
        return { success: true };
      }

      const agentsMdContent = this.generateAgentsMdContent(project);
      await this.fileService.writeFile(agentsMdPath, agentsMdContent);

      console.log(chalk.green(`✅ AGENTS.md created at ${agentsMdPath}`));
      return { success: true };
    } catch (error) {
      console.error(chalk.red(`❌ Error creating AGENTS.md: ${error}`));
      return { success: false, message: String(error) };
    }
  }

  private generateAgentsMdContent(project: Project): string {
    const allAgents = this.agentRepository.getAllAgents();

    return `# AGENTS.md

A dedicated place to provide context and instructions to help AI coding agents work on this project appropriately.
Learn more about this convention at: [agents.md](https://agents.md/)

## Context & Architecture
- **Description**: Project initialized with sdd-skills-ai CLI tool
- **Language**: TypeScript / Node.js
- **Build tool**: \`tsup\` mapping to CommonJS (CJS)
- **Core Architecture Principles**:
  - **Spec-Driven Development**: Following SDD paradigm for development
  - **AI Agent Compatibility**: Configured for multiple AI coding assistants
  - **Extensibility**: Modular skill and workflow system

## Setup commands
- **Install dependencies**: \`npm install\`
- **Run dev server (watch mode)**: \`npm run dev\`
- **Build**: \`npm run build\`
- **Run tests**: \`npm run test\`

## Code style
- Use **Strict TypeScript**. Always define explicit types and interfaces where appropriate.
- Follow the SDD paradigm: when adding new features, prefer creating/updating definitions or specifications first.
- Ensure CLI outputs remain descriptive and user-friendly, continuing the use of \`chalk\` to format messages.
- Prefer explicit and clean coding practices.

## AI Assistant Configuration
This project is configured to work with multiple AI coding assistants:
${allAgents.map((agent: Agent) => `- **${agent.displayName}**: Uses \`${agent.configDir}/\` directory for skills and workflows`).join('\n')}

## Skills & Workflows
The project includes a modular skill and workflow system located in:
- Skills: \`.agent/skills/\`
- Workflows: \`.agent/workflows/\`

These can be dynamically extended using the sdd-skills-ai CLI commands.
`;
  }
}
