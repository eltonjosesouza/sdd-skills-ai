import { Command } from "commander";
import chalk from "chalk";
import prompts from "prompts";
import path from "path";
import { InitCommand } from "./init.command";
import { ToolConfigurationService } from "../../services/tool-configuration.service";
import { ScrumService } from "../../services/scrum.service";
import { AutocompletionService } from "../../services/autocompletion.service";
import { applySkillsAction, agentInitAction, setupScrumAgentConfigsAction } from "../../actions";

export interface WizardOptions {
  projectDirectory?: string;
}

export class WizardCommand {
  private static async promptAgentSelection(): Promise<string> {
    const agentPrompt = await prompts({
      type: "select",
      name: "agent",
      message: "Which AI assistant are you using?",
      choices: [
        { title: "Claude Code", value: "claude" },
        { title: "Cursor", value: "cursor" },
        { title: "Windsurf", value: "windsurf" },
        { title: "Gemini CLI", value: "gemini" },
        { title: "Antigravity", value: "antigravity" },
        { title: "Cline", value: "cline" },
        { title: "Codex", value: "codex" },
        { title: "Continue", value: "continue" },
        { title: "GitHub Copilot", value: "github-copilot" },
        { title: "Kiro", value: "kiro" },
        { title: "OpenCode", value: "opencode" },
        { title: "Amazon Q Developer", value: "amazon-q" },
        { title: "Auggie", value: "auggie" },
        { title: "CodeBuddy", value: "codebuddy" },
        { title: "CoStrict", value: "costrict" },
        { title: "Crush", value: "crush" },
        { title: "Factory Droid", value: "factory" },
        { title: "iFlow", value: "iflow" },
        { title: "Kilo Code", value: "kilocode" },
        { title: "Pi", value: "pi" },
        { title: "Qoder", value: "qoder" },
        { title: "Qwen Code", value: "qwen" },
        { title: "RooCode", value: "roocode" },
        { title: "Trae", value: "trae" },
      ],
      initial: 0,
    });

    return agentPrompt.agent || "claude";
  }

  public static async execute(options: WizardOptions = {}): Promise<boolean> {
    console.log(chalk.blue("\n🧙‍♂️ Welcome to the SDD Skills AI Wizard!\n"));

    const selectedAgent = await WizardCommand.promptAgentSelection();
    if (!selectedAgent) {
      console.log(chalk.red("Operation cancelled."));
      return false;
    }

    const projectDirectory = options.projectDirectory || ".";

    // Step 1: Initialize specs
    const qInit = await prompts({
      type: "confirm",
      name: "run",
      message: "Do you want to initialize Spec-Driven base configuration (specs)?",
      initial: true,
    });
    if (qInit.run) {
      const success = await InitCommand.execute({ projectDirectory, agent: selectedAgent });
      if (!success) return false;
    }

    // Step 2: Configure tools
    const qTools = await prompts({
      type: "confirm",
      name: "run",
      message: "Do you want to configure AI coding assistant tools?",
      initial: true,
    });
    if (qTools.run) {
      const result = await ToolConfigurationService.configureTools(projectDirectory);
      if (!result.success) return false;
    }

    // Step 3: Apply skills
    const qSkills = await prompts({
      type: "confirm",
      name: "run",
      message: "Do you want to inject AI Skills?",
      initial: true,
    });
    if (qSkills.run) {
      const success = await applySkillsAction(projectDirectory, selectedAgent);
      if (!success) return false;
    }

    // Step 4: Setup agents
    const qAgentInit = await prompts({
      type: "confirm",
      name: "run",
      message: "Do you want to setup AGENTS.md (agent-init)?",
      initial: true,
    });
    if (qAgentInit.run) {
      const success = await agentInitAction(projectDirectory, selectedAgent);
      if (!success) return false;
    }

    // Step 5: Install Scrum
    const qScrum = await prompts({
      type: "confirm",
      name: "run",
      message: "Do you want to install Scrum agents with SDD+TDD+DDD disciplines?",
      initial: false,
    });
    if (qScrum.run) {
      const result = await ScrumService.installScrumAgents(projectDirectory);
      if (!result.success) return false;
    }

    // Step 6: Setup autocompletion
    const qAutocomplete = await prompts({
      type: "confirm",
      name: "run",
      message: "Do you want to setup shell autocompletion for sdd-skills-ai commands?",
      initial: true,
    });
    if (qAutocomplete.run) {
      const success = await AutocompletionService.setup();
      if (!success) return false;
    }

    console.log(chalk.green("\n✨ Wizard complete! Happy coding!\n"));
    return true;
  }

  public static register(program: Command): void {
    program
      .command("wizard")
      .description("Interactive wizard to step through all setup phases")
      .argument("[project-directory]", "Directory to operate on (defaults to current directory)")
      .action(async (dir) => {
        const success = await WizardCommand.execute({ projectDirectory: dir });
        if (!success) process.exit(1);
      });
  }
}
