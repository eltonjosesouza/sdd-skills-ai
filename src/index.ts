#!/usr/bin/env node
import { Command } from "commander";
import { WizardCommand } from "./presentation/commands/wizard.command";
import { InitCommand } from "./presentation/commands/init.command";
import { AgentInitCommand } from "./presentation/commands/agent-init.command";
import { AutocompletionService } from "./services/autocompletion.service";
import { ToolConfigurationService } from "./services/tool-configuration.service";
import { ScrumService } from "./services/scrum.service";
import { applySkillsAction, agentInitAction, setupScrumAgentConfigsAction, specSkillsAddAction } from "./actions";

const packageJson = require("../package.json");

const program = new Command();

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

// Register all commands
WizardCommand.register(program);
InitCommand.register(program);
AgentInitCommand.register(program);

// Configure tools command
program
  .command("configure-tools")
  .description("Configure AI coding assistant tools")
  .argument("[project-directory]", "Directory to configure tools in (defaults to current directory)")
  .option("-a, --agent <agent>", "Target AI Assistant")
  .action(async (dir, options) => {
    const result = await ToolConfigurationService.configureTools(dir);
    if (!result.success) process.exit(1);
  });

// Apply skills command
program
  .command("apply-skills")
  .description("Selectively inject Antigravity skill packs into the current project")
  .argument("[project-directory]", "Directory to inject the skills into (defaults to current directory)")
  .option("-a, --agent <agent>", "Target AI Assistant (antigravity, claude, gemini, cursor, etc.)")
  .action(async (dir, options) => {
    const success = await applySkillsAction(dir, options.agent);
    if (!success) process.exit(1);
  });

// Install Scrum command
program
  .command("install-scrum")
  .description("Install complete Scrum methodology with SDD+TDD+DDD disciplines")
  .argument("[project-directory]", "Directory to install Scrum in (defaults to current directory)")
  .option("-a, --agent <agent>", "Target AI Assistant")
  .action(async (dir, options) => {
    const result = await ScrumService.installScrumAgents(dir);
    if (!result.success) process.exit(1);
  });

// Setup Scrum configs command
program
  .command("setup-scrum-configs")
  .description("Configure Scrum agents in configuration files")
  .argument("[project-directory]", "Directory to configure in (defaults to current directory)")
  .option("-a, --agent <agent>", "Target AI Assistant")
  .action(async (dir, options) => {
    const success = await setupScrumAgentConfigsAction(dir, options.agent);
    if (!success) process.exit(1);
  });

// Add skill command
program
  .command("add-skill")
  .description("Register custom skill repository")
  .argument("<repository-url>", "GitHub repository URL")
  .action(async (repoUrl) => {
    console.log("Add skill functionality - TODO: Implement");
    // TODO: Implement addSkill logic
  });

// Add spec command
program
  .command("add-spec")
  .description("Register local spec-driven tool")
  .argument("<local-path>", "Path to local spec-driven tools")
  .action(async (localPath) => {
    console.log("Add spec functionality - TODO: Implement");
    // TODO: Implement addSpec logic
  });

// Spec skills add command
program
  .command("spec-skills-add")
  .description("Enable autonomous tool addition")
  .argument("[project-directory]", "Directory to enable in (defaults to current directory)")
  .option("-a, --agent <agent>", "Target AI Assistant")
  .action(async (dir, options) => {
    const success = await specSkillsAddAction(dir, options.agent);
    if (!success) process.exit(1);
  });

// Completion command
program
  .command("completion")
  .description("Setup shell autocompletion for sdd-skills-ai commands")
  .action(async () => {
    const success = await AutocompletionService.setup();
    if (!success) process.exit(1);
  });

// Stats command (useful for debugging)
program
  .command("stats")
  .description("Show statistics about available components")
  .action(() => {
    const toolStats = ToolConfigurationService.getSupportedToolsCount();
    const scrumStats = ScrumService.getScrumStats();

    console.log("\n📊 SDD Skills AI Statistics:");
    console.log(`🔧 Supported AI Tools: ${toolStats}`);
    console.log(`🏈 Scrum Components:`);
    console.log(`   📋 Agents: ${scrumStats.agentsCount}`);
    console.log(`   🛠️ Skills: ${scrumStats.skillsCount}`);
    console.log(`   🔄 Workflows: ${scrumStats.workflowsCount}`);
    console.log(`   📦 Total: ${scrumStats.totalComponents}`);
    console.log();
  });

program.parse(process.argv);
