#!/usr/bin/env node
import { Command } from "commander";
import prompts from "prompts";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";
import { AGENT_INIT_SKILL, AGENT_INIT_WORKFLOW } from "./templates";
import config from "./config.json";

const packageJson = require("../package.json");

const program = new Command();

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command("init")
  .description(
    "Initialize the Spec-Driven base configuration in a specific directory",
  )
  .argument("[project-directory]", "Directory to create the project in")
  .action(async (projectDirectory) => {
    let targetDir = projectDirectory;

    if (!targetDir) {
      const response = await prompts({
        type: "text",
        name: "projectName",
        message: "What is your project/directory named?",
        initial: "my-spec-driven-app",
      });

      if (!response.projectName) {
        console.log(chalk.red("Operation cancelled."));
        process.exit(1);
      }

      targetDir = response.projectName;
    }

    const currentDir = process.cwd();
    const projectPath = path.join(currentDir, targetDir);

    if (!fs.existsSync(projectPath)) {
      await fs.ensureDir(projectPath);
      console.log(chalk.green(`\n📂 Created directory ${projectPath}`));
    } else {
      console.log(chalk.yellow(`\n📂 Using existing directory ${projectPath}`));
    }

    console.log(
      chalk.blue(`\n🚀 Initializing sdd-ai config in ${projectPath}...`),
    );

    try {
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

      if (!specPrompt.specs || specPrompt.specs.length === 0) {
        console.log(
          chalk.yellow("\n⚠️ No spec tools selected. Skipping spec setup."),
        );
      } else {
        for (const specId of specPrompt.specs) {
          const specConfig = config.specs.find((s: any) => s.value === specId);
          if (specConfig) {
            for (const cmdObj of specConfig.commands) {
              console.log(chalk.green(`\n${cmdObj.message}`));
              try {
                const options: any = { stdio: "inherit" };
                if (cmdObj.useProjectDir) {
                  options.cwd = projectPath;
                }
                execSync(cmdObj.cmd, options);
              } catch (err) {
                console.log(
                  chalk.yellow(
                    `Note: Command '${cmdObj.cmd}' may have exited non-zero or was aborted, continuing...`,
                  ),
                );
              }
            }
          }
        }
      }

      console.log(
        chalk.green("\n✅ Setup complete! Spec-Driven architecture is ready."),
      );
      console.log(chalk.white("\nTo start developing, run:\n"));
      console.log(chalk.cyan(`  cd ${targetDir}\n`));
    } catch (error) {
      console.error(chalk.red("Failed to initialize the configuration."));
      console.error(error);
      process.exit(1);
    }
  });

program
  .command("apply-skills")
  .description(
    "Selectively inject Antigravity skill packs into the current project",
  )
  .argument(
    "[project-directory]",
    "Directory to inject the skills into (defaults to current directory)",
  )
  .action(async (projectDirectory) => {
    const targetDir = projectDirectory || ".";
    const currentDir = process.cwd();
    const projectPath = path.resolve(currentDir, targetDir);

    console.log(
      chalk.blue(
        `\n🚀 Assisting with AI Skills Injection in ${projectPath}...\n`,
      ),
    );

    const response = await prompts({
      type: "multiselect",
      name: "skills",
      message: "Which skill packs would you like to install?",
      choices: config.skills.map((skill: any) => ({
        title: skill.title,
        value: skill.value,
        description: skill.description,
      })),
      hint: "- Space to select. Return to submit",
    });

    if (!response.skills || response.skills.length === 0) {
      console.log(chalk.yellow("\nNo skills selected. Exiting."));
      process.exit(0);
    }

    for (const skillId of response.skills) {
      const skillConfig = config.skills.find((s: any) => s.value === skillId);
      if (skillConfig) {
        for (const cmdObj of skillConfig.commands) {
          console.log(chalk.green(`\n${cmdObj.message}`));
          try {
            const options: any = { stdio: "inherit" };
            if (cmdObj.useProjectDir) {
              options.cwd = projectPath;
            }
            execSync(cmdObj.cmd, options);
          } catch (err) {
            console.log(chalk.red(`Error running command: ${cmdObj.cmd}`));
          }
        }
      }
    }

    console.log(chalk.green("\n✅ Skills injection complete!"));
  });

program
  .command("agent-init")
  .description(
    "Initialize an AGENTS.md file in the project root to provide context for AI coding agents",
  )
  .argument(
    "[project-directory]",
    "Directory to create the AGENTS.md file in (defaults to current directory)",
  )
  .action(async (projectDirectory) => {
    const targetDir = projectDirectory || ".";
    const currentDir = process.cwd();
    const projectPath = path.resolve(currentDir, targetDir);

    console.log(
      chalk.blue(
        `\n🚀 Initializing Template Skill for sdd-skills-ai.agents-init in ${projectPath}...\n`,
      ),
    );

    // Ensure the target directory exists (though it usually should if running from it)
    await fs.ensureDir(projectPath);

    const skillDir = path.join(
      projectPath,
      ".agent",
      "skills",
      "sdd-skills-ai.agents-init",
    );
    const workflowsDir = path.join(projectPath, ".agent", "workflows");

    try {
      await fs.ensureDir(skillDir);
      await fs.writeFile(
        path.join(skillDir, "SKILL.md"),
        AGENT_INIT_SKILL,
        "utf-8",
      );

      await fs.ensureDir(workflowsDir);
      await fs.writeFile(
        path.join(workflowsDir, "sdd-skills-ai.agents-init.md"),
        AGENT_INIT_WORKFLOW,
        "utf-8",
      );

      console.log(
        chalk.green(`\n✅ Successfully created skill at ${skillDir}/SKILL.md`),
      );
      console.log(
        chalk.green(
          `✅ Successfully created workflow at ${workflowsDir}/sdd-skills-ai.agents-init.md`,
        ),
      );
      console.log(
        chalk.white(
          `\n📝 To use this skill, type \`/sdd-skills-ai.agents-init\` in your chat to generate/update the AGENTS.md based on your project structure.`,
        ),
      );
    } catch (err) {
      console.error(chalk.red(`\n❌ Failed to setup agent-init skill: ${err}`));
      process.exit(1);
    }
  });

program.parse(process.argv);
