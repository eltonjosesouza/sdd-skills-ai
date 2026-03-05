import { Command } from "commander";
import chalk from "chalk";
import prompts from "prompts";
import path from "path";
import { loadConfig, Config, SpecOption } from "../configManager";

export interface InitOptions {
  projectDirectory?: string;
  agent?: string;
}

export class InitCommand {
  private static async promptForSpecSelection(config: Config): Promise<string[] | null> {
    const specPrompt = await prompts({
      type: "multiselect",
      name: "specs",
      message: "Which Spec-Driven tools would you like to initialize?",
      choices: config.specs.map((spec) => ({
        title: spec.title,
        value: spec.value,
        description: spec.description,
        selected: spec.selected,
      })),
      hint: "- Space to select. Return to submit",
    });

    return specPrompt.specs || null;
  }

  private static async executeSpecCommands(selectedSpecs: string[], config: Config, projectPath: string): Promise<void> {
    console.log(chalk.white("\n📋 Initializing selected specs..."));

    for (const specValue of selectedSpecs) {
      const spec = config.specs.find(s => s.value === specValue);
      if (spec) {
        console.log(chalk.cyan(`   🔄 ${spec.title}`));

        for (const command of spec.commands) {
          try {
            console.log(chalk.white(`     ${command.message}`));

            if (command.useProjectDir) {
              const { execSync } = require("child_process");
              execSync(command.cmd, {
                cwd: projectPath,
                stdio: "inherit"
              });
            } else {
              const { execSync } = require("child_process");
              execSync(command.cmd, { stdio: "inherit" });
            }

            console.log(chalk.green(`     ✅ ${spec.title} initialized`));
          } catch (error) {
            console.error(chalk.red(`     ❌ Failed to initialize ${spec.title}: ${error}`));
            throw error;
          }
        }
      }
    }
  }

  public static async execute(options: InitOptions = {}): Promise<boolean> {
    const targetDir = options.projectDirectory || ".";
    const currentDir = process.cwd();
    const projectPath = currentDir === targetDir ? "." : path.resolve(currentDir, targetDir);

    console.log(chalk.blue(`\n🔧 Initializing Spec-Driven base configuration in ${projectPath}...\n`));

    try {
      const config = loadConfig();
      const selectedSpecs = await InitCommand.promptForSpecSelection(config);

      if (!selectedSpecs || selectedSpecs.length === 0) {
        console.log(chalk.yellow("No specs selected. Skipping initialization."));
        return true;
      }

      await InitCommand.executeSpecCommands(selectedSpecs, config, projectPath);

      console.log(chalk.green(`\n✅ Successfully initialized ${selectedSpecs.length} specs in ${projectPath}`));
      console.log(chalk.white(`\n📝 Initialized specs:`));

      for (const specValue of selectedSpecs) {
        const spec = config.specs.find(s => s.value === specValue);
        if (spec) {
          console.log(chalk.cyan(`   ✅ ${spec.title}`));
        }
      }
      console.log(chalk.white(`\n🎯 Your project is now ready for spec-driven development!\n`));

      return true;
    } catch (err) {
      console.error(chalk.red(`\n❌ Failed to initialize specs: ${err}`));
      return false;
    }
  }

  public static register(program: Command): void {
    program
      .command("init")
      .description("Initialize the Spec-Driven base configuration in a specific directory")
      .argument("[project-directory]", "Directory to create the project in")
      .option("-a, --agent <agent>", "Target AI Assistant")
      .action(async (dir, options) => {
        const success = await InitCommand.execute({
          projectDirectory: dir,
          agent: options.agent
        });
        if (!success) process.exit(1);
      });
  }
}
