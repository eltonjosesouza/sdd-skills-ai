#!/usr/bin/env node
import { Command } from "commander";
import prompts from "prompts";
import fs from "fs-extra";
import path from "path";
import os from "os";
import chalk from "chalk";
import { execSync } from "child_process";
import {
  AGENT_INIT_SKILL,
  AGENT_INIT_WORKFLOW,
  ADD_SKILL_SKILL_TEMPLATE,
  ADD_SKILL_WORKFLOW_TEMPLATE,
  ADD_SPEC_SKILL_TEMPLATE,
  ADD_SPEC_WORKFLOW_TEMPLATE,
} from "./templates";
import { loadConfig, addSkill, addSpec } from "./configManager";

const packageJson = require("../package.json");

const program = new Command();

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

/**
 * Maps an agent name to its configuration directory.
 */
const getAgentConfigDir = (agent: string): string => {
  const mapping: Record<string, string> = {
    antigravity: ".agent",
    claude: ".claude",
    gemini: ".gemini",
    cursor: ".cursor",
    kiro: ".kiro",
    opencode: ".agents",
    windsurf: ".agent",
  };
  return mapping[agent.toLowerCase()] || ".agent";
};

/**
 * Prompts user to select the target AI assistant.
 */
const promptAgentSelection = async () => {
  const response = await prompts({
    type: "select",
    name: "agent",
    message: "Which AI Assistant is the target for these skills/workflows?",
    choices: [
      { title: "Antigravity (.agent/)", value: "antigravity" },
      { title: "Claude Code (.claude/)", value: "claude" },
      { title: "Gemini CLI (.gemini/)", value: "gemini" },
      { title: "Cursor (.cursor/)", value: "cursor" },
      { title: "Kiro IDE (.kiro/)", value: "kiro" },
      { title: "OpenCode (.agents/)", value: "opencode" },
      { title: "Windsurf (.agent/)", value: "windsurf" },
    ],
    initial: 0,
  });
  return response.agent;
};

/**
 * Executes a command in a temporary directory and merges the results back to the project.
 * This prevents tools like ag-kit from overwriting existing project configuration.
 */
const safeExecCommand = async (
  cmd: string,
  projectPath: string,
  agentDirName: string,
) => {
  const tmpDir = path.join(
    os.tmpdir(),
    `sdd-ai-${Math.random().toString(36).substring(7)}`,
  );
  await fs.ensureDir(tmpDir);

  try {
    console.log(chalk.gray(`Running command in safe mode: ${cmd}`));

    // Execute the command in the temporary directory
    execSync(cmd, { stdio: "inherit", cwd: tmpDir });

    // Merging logic that respects assistant mapping and non-destructive overwrites
    const mergeIntoProject = async (src: string, dest: string) => {
      await fs.ensureDir(dest);
      const entries = await fs.readdir(src, { withFileTypes: true });

      // Common generic assistant folders that should be mapped to the user's choice
      const genericAssistantFolders = [
        ".agent",
        ".claude",
        ".gemini",
        ".cursor",
        ".agents",
        ".kiro",
      ];

      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        // If this is a generic assistant folder, map it to the user's selected agentDirName
        if (
          entry.isDirectory() &&
          genericAssistantFolders.includes(entry.name)
        ) {
          destPath = path.join(dest, agentDirName);
          console.log(
            chalk.blue(`  Mapping ${entry.name}/ to ${agentDirName}/`),
          );
        }

        if (entry.isDirectory()) {
          await mergeIntoProject(srcPath, destPath);
        } else {
          if (!fs.existsSync(destPath)) {
            await fs.copy(srcPath, destPath);
          } else {
            console.log(
              chalk.gray(
                `  Skipping existing file: ${path.relative(projectPath, destPath)}`,
              ),
            );
          }
        }
      }
    };

    console.log(chalk.blue(`\n🔄 Merging results into project root...`));
    await mergeIntoProject(tmpDir, projectPath);
  } catch (err) {
    console.error(chalk.red(`Error in safe execution: ${err}`));
  } finally {
    // Cleanup
    await fs.remove(tmpDir);
  }
};

const initAction = async (projectDirectory?: string, agent?: string) => {
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
      return false;
    }
    targetDir = response.projectName;
  }

  const currentDir = process.cwd();
  const validTargetDir = targetDir as string;
  const projectPath = path.join(currentDir, validTargetDir);

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
    const config = loadConfig();
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
      const selectedAgent = agent || (await promptAgentSelection());
      if (!selectedAgent) return false;
      const agentDirName = getAgentConfigDir(selectedAgent);

      for (const specId of specPrompt.specs) {
        const specConfig = config.specs.find((s: any) => s.value === specId);
        if (specConfig) {
          for (const cmdObj of specConfig.commands) {
            console.log(chalk.green(`\n${cmdObj.message}`));
            try {
              if (cmdObj.useProjectDir) {
                await safeExecCommand(cmdObj.cmd, projectPath, agentDirName);
              } else {
                execSync(cmdObj.cmd, { stdio: "inherit" });
              }
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
    console.log(chalk.cyan(`  cd ${validTargetDir}\n`));
    return true;
  } catch (error) {
    console.error(chalk.red("Failed to initialize the configuration."));
    console.error(error);
    return false;
  }
};

const applySkillsAction = async (projectDirectory?: string, agent?: string) => {
  const targetDir = projectDirectory || ".";
  const currentDir = process.cwd();
  const projectPath = path.resolve(currentDir, targetDir);

  console.log(
    chalk.blue(
      `\n🚀 Assisting with AI Skills Injection in ${projectPath}...\n`,
    ),
  );

  const selectedAgent = agent || (await promptAgentSelection());
  if (!selectedAgent) {
    console.log(chalk.red("Operation cancelled."));
    return false;
  }

  const agentDirName = getAgentConfigDir(selectedAgent);
  const config = loadConfig();
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
    return false;
  }

  for (const skillId of response.skills) {
    const skillConfig = config.skills.find((s: any) => s.value === skillId);
    if (skillConfig) {
      for (const cmdObj of skillConfig.commands) {
        console.log(chalk.green(`\n${cmdObj.message}`));
        try {
          if (cmdObj.useProjectDir) {
            await safeExecCommand(cmdObj.cmd, projectPath, agentDirName);
          } else {
            execSync(cmdObj.cmd, { stdio: "inherit" });
          }
        } catch (err) {
          console.log(chalk.red(`Error running command: ${cmdObj.cmd}`));
        }
      }
    }
  }

  console.log(
    chalk.green(`\n✅ Skills injection complete (Target: ${agentDirName}/)!`),
  );
  return true;
};

const agentInitAction = async (projectDirectory?: string, agent?: string) => {
  const targetDir = projectDirectory || ".";
  const currentDir = process.cwd();
  const projectPath = path.resolve(currentDir, targetDir);

  console.log(
    chalk.blue(
      `\n🚀 Initializing AGENTS.md and context in ${projectPath}...\n`,
    ),
  );

  await fs.ensureDir(projectPath);

  const selectedAgent = agent || (await promptAgentSelection());
  if (!selectedAgent) return false;

  const agentDirName = getAgentConfigDir(selectedAgent);
  const skillDir = path.join(
    projectPath,
    agentDirName,
    "skills",
    "sdd-skills-ai.agents-init",
  );
  const workflowsDir = path.join(projectPath, agentDirName, "workflows");

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
    return true;
  } catch (err) {
    console.error(chalk.red(`\n❌ Failed to setup agent-init skill: ${err}`));
    return false;
  }
};

const addSkillAction = async () => {
  const response = await prompts([
    {
      type: "text",
      name: "value",
      message: "What is the unique ID for this skill? (e.g. my-custom-skill)",
      validate: (value) => (value.length > 0 ? true : "ID is required"),
    },
    {
      type: "text",
      name: "title",
      message: "What is the display title? (e.g. My Custom Skill)",
      validate: (value) => (value.length > 0 ? true : "Title is required"),
    },
    {
      type: "text",
      name: "description",
      message: "Provide a short description:",
    },
    {
      type: "text",
      name: "cmd",
      message: "What is the bash command to install/apply this skill?",
      validate: (value) => (value.length > 0 ? true : "Command is required"),
    },
    {
      type: "confirm",
      name: "useProjectDir",
      message: "Should this command run inside the project directory?",
      initial: true,
    },
  ]);

  if (!response.value || !response.title || !response.cmd) {
    console.log(chalk.red("Operation cancelled. Missing required fields."));
    return false;
  }

  addSkill({
    value: response.value,
    title: response.title,
    description: response.description || "",
    commands: [
      {
        message: `Installing ${response.title}...`,
        cmd: response.cmd,
        useProjectDir: response.useProjectDir,
      },
    ],
  });

  console.log(
    chalk.green(`\n✅ Skill '${response.title}' added to user config!`),
  );
  return true;
};

const addSpecAction = async () => {
  const response = await prompts([
    {
      type: "text",
      name: "value",
      message: "What is the unique ID for this spec tool? (e.g. my-spec)",
      validate: (value) => (value.length > 0 ? true : "ID is required"),
    },
    {
      type: "text",
      name: "title",
      message: "What is the display title? (e.g. My Custom Spec)",
      validate: (value) => (value.length > 0 ? true : "Title is required"),
    },
    {
      type: "text",
      name: "description",
      message: "Provide a short description:",
    },
    {
      type: "text",
      name: "cmd",
      message: "What is the bash command to initialize this tool?",
      validate: (value) => (value.length > 0 ? true : "Command is required"),
    },
    {
      type: "confirm",
      name: "useProjectDir",
      message: "Should this command run inside the project directory?",
      initial: true,
    },
  ]);

  if (!response.value || !response.title || !response.cmd) {
    console.log(chalk.red("Operation cancelled. Missing required fields."));
    return false;
  }

  addSpec({
    value: response.value,
    title: response.title,
    description: response.description || "",
    selected: true,
    commands: [
      {
        message: `Running initialization for ${response.title}...`,
        cmd: response.cmd,
        useProjectDir: response.useProjectDir,
      },
    ],
  });

  console.log(
    chalk.green(`\n✅ Spec tool '${response.title}' added to user config!`),
  );
  return true;
};

const specSkillsAddAction = async (
  projectDirectory?: string,
  agent?: string,
) => {
  const targetDir = projectDirectory || ".";
  const currentDir = process.cwd();
  const projectPath = path.resolve(currentDir, targetDir);

  console.log(
    chalk.blue(`\n🚀 Initializing Template Skills down to ${projectPath}...\n`),
  );

  await fs.ensureDir(projectPath);

  const selectedAgent = agent || (await promptAgentSelection());
  if (!selectedAgent) return false;

  const agentDirName = getAgentConfigDir(selectedAgent);
  const skillsDir = path.join(projectPath, agentDirName, "skills");
  const workflowsDir = path.join(projectPath, agentDirName, "workflows");

  const addSkillDir = path.join(skillsDir, "sdd-skills-ai.add-skill");
  const addSpecDir = path.join(skillsDir, "sdd-skills-ai.add-spec");

  try {
    // Create skills
    await fs.ensureDir(addSkillDir);
    await fs.writeFile(
      path.join(addSkillDir, "SKILL.md"),
      ADD_SKILL_SKILL_TEMPLATE,
      "utf-8",
    );

    await fs.ensureDir(addSpecDir);
    await fs.writeFile(
      path.join(addSpecDir, "SKILL.md"),
      ADD_SPEC_SKILL_TEMPLATE,
      "utf-8",
    );

    // Create workflows
    await fs.ensureDir(workflowsDir);
    await fs.writeFile(
      path.join(workflowsDir, "sdd-skills-ai.add-skill.md"),
      ADD_SKILL_WORKFLOW_TEMPLATE,
      "utf-8",
    );
    await fs.writeFile(
      path.join(workflowsDir, "sdd-skills-ai.add-spec.md"),
      ADD_SPEC_WORKFLOW_TEMPLATE,
      "utf-8",
    );

    console.log(
      chalk.green(`✅ Successfully created skill at ${addSkillDir}/SKILL.md`),
    );
    console.log(
      chalk.green(`✅ Successfully created skill at ${addSpecDir}/SKILL.md`),
    );
    console.log(
      chalk.green(`✅ Successfully created workflows in ${workflowsDir}`),
    );

    console.log(chalk.white(`\n📝 To add a new skill via agent, type:`));
    console.log(
      chalk.cyan(`   /sdd-skills-ai.add-skill <github-url-or-local-path>`),
    );
    console.log(chalk.white(`\n📝 To add a new spec tool via agent, type:`));
    console.log(
      chalk.cyan(`   /sdd-skills-ai.add-spec <github-url-or-local-path>\n`),
    );
    return true;
  } catch (err) {
    console.error(
      chalk.red(`\n❌ Failed to setup spec-skills-add templates: ${err}`),
    );
    return false;
  }
};

const wizardAction = async (projectDirectory?: string) => {
  console.log(chalk.blue("\n🧙‍♂️ Welcome to the SDD Skills AI Wizard!\n"));

  const selectedAgent = await promptAgentSelection();
  if (!selectedAgent) {
    console.log(chalk.red("Operation cancelled."));
    return false;
  }

  const qInit = await prompts({
    type: "confirm",
    name: "run",
    message:
      "Do you want to initialize Spec-Driven base configuration (specs)?",
    initial: true,
  });
  if (qInit.run) {
    await initAction(projectDirectory, selectedAgent);
  }

  const qSkills = await prompts({
    type: "confirm",
    name: "run",
    message: "Do you want to inject AI Skills?",
    initial: true,
  });
  if (qSkills.run) {
    await applySkillsAction(projectDirectory, selectedAgent);
  }

  const qAgentInit = await prompts({
    type: "confirm",
    name: "run",
    message: "Do you want to setup AGENTS.md (agent-init)?",
    initial: true,
  });
  if (qAgentInit.run) {
    await agentInitAction(projectDirectory, selectedAgent);
  }

  const qSpecSkills = await prompts({
    type: "confirm",
    name: "run",
    message:
      "Do you want to install AI agent templates for adding new skills/specs?",
    initial: true,
  });
  if (qSpecSkills.run) {
    await specSkillsAddAction(projectDirectory, selectedAgent);
  }

  console.log(chalk.green("\n✨ Wizard complete! Happy coding!\n"));
};

program
  .command("init")
  .description(
    "Initialize the Spec-Driven base configuration in a specific directory",
  )
  .argument("[project-directory]", "Directory to create the project in")
  .action(async (dir) => {
    const success = await initAction(dir);
    if (!success) process.exit(1);
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
  .option(
    "-a, --agent <agent>",
    "Target AI Assistant (antigravity, claude, gemini, cursor, etc.)",
  )
  .action(async (dir, options) => {
    const success = await applySkillsAction(dir, options.agent);
    if (!success) process.exit(1);
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
  .option("-a, --agent <agent>", "Target AI Assistant")
  .action(async (dir, options) => {
    const success = await agentInitAction(dir, options.agent);
    if (!success) process.exit(1);
  });

program
  .command("add-skill")
  .description("Add a new AI skill to the global configuration")
  .action(async () => {
    const success = await addSkillAction();
    if (!success) process.exit(1);
  });

program
  .command("add-spec")
  .description("Add a new Spec-Driven tool to the global configuration")
  .action(async () => {
    const success = await addSpecAction();
    if (!success) process.exit(1);
  });

program
  .command("spec-skills-add")
  .description(
    "Generates AI agent templates to dynamically add new specs and skills",
  )
  .argument(
    "[project-directory]",
    "Directory to install the templates into (defaults to current directory)",
  )
  .option("-a, --agent <agent>", "Target AI Assistant")
  .action(async (dir, options) => {
    const success = await specSkillsAddAction(dir, options.agent);
    if (!success) process.exit(1);
  });

program
  .command("wizard")
  .description("Interactive wizard to step through all setup phases")
  .argument(
    "[project-directory]",
    "Directory to operate on (defaults to current directory)",
  )
  .action(async (dir) => {
    await wizardAction(dir);
  });

program.parse(process.argv);
