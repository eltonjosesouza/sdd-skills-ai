import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import prompts from "prompts";
import { loadConfig, saveUserConfig, Config, ToolOption } from "../configManager";

export interface ToolConfigurationResult {
  selectedTools: string[];
  createdDirectories: string[];
  success: boolean;
}

export class ToolConfigurationService {
  private static createToolDirectories(projectPath: string, tools: ToolOption[]): string[] {
    const createdDirectories: string[] = [];

    for (const tool of tools) {
      try {
        // Create directories for the tool
        const skillsDir = path.join(projectPath, tool.paths.skills);
        const workflowsDir = path.join(projectPath, tool.paths.workflows);
        const configDir = path.join(projectPath, tool.paths.config);

        fs.ensureDirSync(skillsDir);
        fs.ensureDirSync(workflowsDir);
        fs.ensureDirSync(configDir);

        createdDirectories.push(
          tool.paths.skills,
          tool.paths.workflows,
          tool.paths.config
        );

        console.log(chalk.green(`   ✅ ${tool.title}`));
      } catch (error) {
        console.error(chalk.red(`   ❌ Failed to create directories for ${tool.title}: ${error}`));
        throw error;
      }
    }

    return createdDirectories;
  }

  private static async promptForToolSelection(config: Config): Promise<string[] | null> {
    const toolPrompt = await prompts({
      type: "multiselect",
      name: "tools",
      message: "Which AI coding assistants would you like to configure?",
      choices: config.tools.map((tool) => ({
        title: tool.title,
        value: tool.value,
        description: tool.description,
        selected: tool.selected,
      })),
      hint: "- Space to select. Return to submit",
    });

    return toolPrompt.tools || null;
  }

  private static saveToolPreferences(config: Config, selectedToolValues: string[]): void {
    const updatedTools = config.tools.map(tool => ({
      ...tool,
      selected: selectedToolValues.includes(tool.value)
    }));
    
    saveUserConfig({ tools: updatedTools });
  }

  private static printConfigurationSummary(
    selectedToolValues: string[], 
    config: Config, 
    projectPath: string
  ): void {
    console.log(chalk.green(`\n✅ Successfully configured ${selectedToolValues.length} tools in ${projectPath}`));
    console.log(chalk.white(`\n📝 Tool directories created:`));
    
    for (const toolValue of selectedToolValues) {
      const tool = config.tools.find(t => t.value === toolValue);
      if (tool) {
        console.log(chalk.cyan(`   ${tool.title}:`));
        console.log(chalk.cyan(`     Skills: ${tool.paths.skills}`));
        console.log(chalk.cyan(`     Workflows: ${tool.paths.workflows}`));
        console.log(chalk.cyan(`     Config: ${tool.paths.config}`));
      }
    }
    console.log(chalk.white(`\n📝 Your AI assistants can now use these directories for skills and workflows\n`));
  }

  public static async configureTools(projectDirectory?: string): Promise<ToolConfigurationResult> {
    const targetDir = projectDirectory || ".";
    const currentDir = process.cwd();
    const projectPath = path.resolve(currentDir, targetDir);

    console.log(chalk.blue(`\n🔧 Configuring AI coding assistant tools in ${projectPath}...\n`));

    try {
      const config = loadConfig();
      const selectedToolValues = await ToolConfigurationService.promptForToolSelection(config);

      if (!selectedToolValues || selectedToolValues.length === 0) {
        console.log(chalk.yellow("No tools selected. Skipping tool configuration."));
        return {
          selectedTools: [],
          createdDirectories: [],
          success: true
        };
      }

      console.log(chalk.white("\n📋 Configuring selected tools..."));

      const selectedTools = config.tools.filter(tool => selectedToolValues.includes(tool.value));
      const createdDirectories = ToolConfigurationService.createToolDirectories(projectPath, selectedTools);

      // Save user's tool preferences
      ToolConfigurationService.saveToolPreferences(config, selectedToolValues);

      ToolConfigurationService.printConfigurationSummary(selectedToolValues, config, projectPath);

      return {
        selectedTools: selectedToolValues,
        createdDirectories,
        success: true
      };
    } catch (err) {
      console.error(chalk.red(`\n❌ Failed to configure tools: ${err}`));
      return {
        selectedTools: [],
        createdDirectories: [],
        success: false
      };
    }
  }

  public static getSupportedToolsCount(): number {
    const config = loadConfig();
    return config.tools.length;
  }

  public static getToolList(): { value: string; title: string; description: string }[] {
    const config = loadConfig();
    return config.tools.map(tool => ({
      value: tool.value,
      title: tool.title,
      description: tool.description
    }));
  }
}
