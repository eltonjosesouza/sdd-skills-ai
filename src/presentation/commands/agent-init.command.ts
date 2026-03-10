import { Command } from "commander";
import path from "path";
import { AgentRepositoryImpl } from "../../domain/repositories/AgentRepository";
import { FileSystemFileService } from "../../infrastructure/filesystem/FileService";
import { AgentServiceImpl } from "../../application/services/AgentService";
import { Project } from "../../domain/entities";

export interface AgentInitOptions {
  projectDirectory?: string;
  agent?: string;
}

export class AgentInitCommand {
  private static createDependencies() {
    const agentRepository = new AgentRepositoryImpl();
    const fileService = new FileSystemFileService();
    const agentService = new AgentServiceImpl(agentRepository, fileService);

    return { agentService };
  }

  public static async execute(options: AgentInitOptions = {}): Promise<boolean> {
    const { agentService } = AgentInitCommand.createDependencies();

    const projectDirectory = options.projectDirectory || ".";
    const currentDir = process.cwd();
    const projectPath = path.resolve(currentDir, projectDirectory);

    const project: Project = {
      path: projectPath,
      name: path.basename(projectPath),
      agent: options.agent ? { name: options.agent, configDir: "", displayName: options.agent } : undefined,
    };

    const result = await agentService.initializeAgentsMd(project);
    return result.success;
  }

  public static register(program: Command): void {
    program
      .command("agent-init")
      .description("Initialize an AGENTS.md file in the project root to provide context for AI coding agents")
      .argument("[project-directory]", "Directory to create the AGENTS.md file in (defaults to current directory)")
      .option("-a, --agent <agent>", "Target AI Assistant")
      .action(async (dir, options) => {
        const success = await AgentInitCommand.execute({ projectDirectory: dir, agent: options.agent });
        if (!success) process.exit(1);
      });
  }
}
