#!/usr/bin/env node
import { Command } from "commander";
import prompts from "prompts";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";

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
      console.log(
        chalk.green("\n📦 Installing @fission-ai/openspec globally..."),
      );
      execSync("npm install -g @fission-ai/openspec@latest", {
        stdio: "inherit",
      });

      console.log(chalk.green("\n🛠️ Running openspec init..."));
      try {
        execSync("openspec init", { cwd: projectPath, stdio: "inherit" });
      } catch (err) {
        console.log(
          chalk.yellow(
            "Note: openspec init may have exited non-zero or was aborted, continuing...",
          ),
        );
      }

      console.log(chalk.green("\n✨ Running spec-kit initialization..."));
      try {
        execSync(
          "uvx --from git+https://github.com/github/spec-kit.git specify init .",
          { cwd: projectPath, stdio: "inherit" },
        );
      } catch (err) {
        console.log(
          chalk.yellow(
            "Note: spec-kit (specify init) may have exited non-zero, make sure you have 'uv' installed, continuing...",
          ),
        );
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
      choices: [
        {
          title: "Antigravity Kit (vudovn/antigravity-kit)",
          value: "antigravity-kit",
          description: "Useful standard workflow skills",
        },
        {
          title: "Awesome Skills (sickn33/antigravity-awesome-skills)",
          value: "antigravity-awesome-skills",
          description: "Community curated skill tools",
        },
      ],
      hint: "- Space to select. Return to submit",
    });

    if (!response.skills || response.skills.length === 0) {
      console.log(chalk.yellow("\nNo skills selected. Exiting."));
      process.exit(0);
    }

    if (response.skills.includes("antigravity-kit")) {
      console.log(chalk.green("\n📦 Installing Antigravity Kit..."));
      try {
        execSync("npx -y @vudovn/ag-kit@latest init", {
          cwd: projectPath,
          stdio: "inherit",
        });
      } catch (err) {
        console.log(chalk.red("Error installing Antigravity Kit."));
      }
    }

    if (response.skills.includes("antigravity-awesome-skills")) {
      console.log(chalk.green("\n📦 Installing Antigravity Awesome Skills..."));
      try {
        execSync("npx -y antigravity-awesome-skills@latest", {
          cwd: projectPath,
          stdio: "inherit",
        });
      } catch (err) {
        console.log(chalk.red("Error installing Antigravity Awesome Skills."));
      }
    }

    console.log(chalk.green("\n✅ Skills injection complete!"));
  });

program.parse(process.argv);
