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
  AGENTS_MD_SPECIALIST_SKILL,
  CLAUDE_MD_SPECIALIST_SKILL,
  AGENTS_CLAUDE_SYNC_WORKFLOW,
  // Scrum Templates
  SCRUM_PRODUCT_OWNER_SKILL,
  SCRUM_SCRUM_MASTER_SKILL,
  SCRUM_DEVELOPER_SKILL,
  SCRUM_TECH_LEAD_SKILL,
  SCRUM_UX_DESIGNER_SKILL,
  SCRUM_QA_ENGINEER_SKILL,
  SCRUM_SECURITY_ENGINEER_SKILL,
  SCRUM_DEVOPS_ENGINEER_SKILL,
  SCRUM_DATA_LEAD_SKILL,
  SCRUM_SDD_CONTRACT_SKILL,
  SCRUM_TDD_CYCLE_SKILL,
  SCRUM_DDD_MODELING_SKILL,
  SCRUM_TELEMETRY_DESIGN_SKILL,
  SCRUM_SCRUM_FLOW_SKILL,
  SCRUM_COMMUNICATION_SKILL,
  SCRUM_DOD_CHECKLIST_SKILL,
  SCRUM_01_DISCOVERY_SKILL,
  SCRUM_02_CONTRACT_SKILL,
  SCRUM_03_SPRINT_PLANNING_SKILL,
  SCRUM_04_DEVELOPMENT_SKILL,
  SCRUM_05_VALIDATION_SKILL,
  SCRUM_06_RELEASE_SKILL,
  SCRUM_FEATURE_LIFECYCLE_WORKFLOW,
  SCRUM_SPRINT_PLANNING_WORKFLOW,
  SCRUM_INSTALL_SCRUM_AGENTS_WORKFLOW,
  SCRUM_SETUP_AGENT_CONFIGS_WORKFLOW,
} from "./templates";
import { loadConfig, addSkill, addSpec, addTool, saveUserConfig } from "./configManager";

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

  const agentsMdSpecialistDir = path.join(
    projectPath,
    agentDirName,
    "skills",
    "sdd-skills-ai.agents-md-specialist",
  );
  const claudeMdSpecialistDir = path.join(
    projectPath,
    agentDirName,
    "skills",
    "sdd-skills-ai.claude-md-specialist",
  );

  try {
    // agents-init skill
    await fs.ensureDir(skillDir);
    await fs.writeFile(
      path.join(skillDir, "SKILL.md"),
      AGENT_INIT_SKILL,
      "utf-8",
    );

    // agents-md-specialist skill
    await fs.ensureDir(agentsMdSpecialistDir);
    await fs.writeFile(
      path.join(agentsMdSpecialistDir, "SKILL.md"),
      AGENTS_MD_SPECIALIST_SKILL,
      "utf-8",
    );

    // claude-md-specialist skill
    await fs.ensureDir(claudeMdSpecialistDir);
    await fs.writeFile(
      path.join(claudeMdSpecialistDir, "SKILL.md"),
      CLAUDE_MD_SPECIALIST_SKILL,
      "utf-8",
    );

    // workflows
    await fs.ensureDir(workflowsDir);
    await fs.writeFile(
      path.join(workflowsDir, "sdd-skills-ai.agents-init.md"),
      AGENT_INIT_WORKFLOW,
      "utf-8",
    );
    await fs.writeFile(
      path.join(workflowsDir, "sdd-skills-ai.agents-claude-sync.md"),
      AGENTS_CLAUDE_SYNC_WORKFLOW,
      "utf-8",
    );

    console.log(
      chalk.green(`\n✅ Successfully created skill at ${skillDir}/SKILL.md`),
    );
    console.log(
      chalk.green(
        `✅ Successfully created skill at ${agentsMdSpecialistDir}/SKILL.md`,
      ),
    );
    console.log(
      chalk.green(
        `✅ Successfully created skill at ${claudeMdSpecialistDir}/SKILL.md`,
      ),
    );
    console.log(
      chalk.green(
        `✅ Successfully created workflow at ${workflowsDir}/sdd-skills-ai.agents-init.md`,
      ),
    );
    console.log(
      chalk.green(
        `✅ Successfully created workflow at ${workflowsDir}/sdd-skills-ai.agents-claude-sync.md`,
      ),
    );
    console.log(
      chalk.white(
        `\n📝 To use these skills, type \`/sdd-skills-ai.agents-init\` to generate AGENTS.md,`,
      ),
    );
    console.log(
      chalk.white(
        `   or \`/sdd-skills-ai.agents-claude-sync\` to sync AGENTS.md and CLAUDE.md.`,
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

const installScrumAgentsAction = async (projectDirectory?: string, agent?: string) => {
  const targetDir = projectDirectory || ".";
  const currentDir = process.cwd();
  const projectPath = path.resolve(currentDir, targetDir);

  console.log(
    chalk.blue(
      `\n🏈 Installing Scrum agents with SDD+TDD+DDD disciplines in ${projectPath}...\n`,
    ),
  );

  await fs.ensureDir(projectPath);

  const selectedAgent = agent || (await promptAgentSelection());
  if (!selectedAgent) return false;

  const agentDirName = getAgentConfigDir(selectedAgent);

  // Scrum Agents Skills
  const scrumAgents = [
    { name: "scrum.product-owner", content: SCRUM_PRODUCT_OWNER_SKILL },
    { name: "scrum.scrum-master", content: SCRUM_SCRUM_MASTER_SKILL },
    { name: "scrum.developer", content: SCRUM_DEVELOPER_SKILL },
    { name: "scrum.tech-lead", content: SCRUM_TECH_LEAD_SKILL },
    { name: "scrum.ux-designer", content: SCRUM_UX_DESIGNER_SKILL },
    { name: "scrum.qa-engineer", content: SCRUM_QA_ENGINEER_SKILL },
    { name: "scrum.security-engineer", content: SCRUM_SECURITY_ENGINEER_SKILL },
    { name: "scrum.devops-engineer", content: SCRUM_DEVOPS_ENGINEER_SKILL },
    { name: "scrum.data-lead", content: SCRUM_DATA_LEAD_SKILL },
  ];

  // Scrum Skills
  const scrumSkills = [
    { name: "scrum.sdd-contract", content: SCRUM_SDD_CONTRACT_SKILL },
    { name: "scrum.tdd-cycle", content: SCRUM_TDD_CYCLE_SKILL },
    { name: "scrum.ddd-modeling", content: SCRUM_DDD_MODELING_SKILL },
    { name: "scrum.telemetry-design", content: SCRUM_TELEMETRY_DESIGN_SKILL },
    { name: "scrum.scrum-flow", content: SCRUM_SCRUM_FLOW_SKILL },
    { name: "scrum.communication", content: SCRUM_COMMUNICATION_SKILL },
    { name: "scrum.dod-checklist", content: SCRUM_DOD_CHECKLIST_SKILL },
    { name: "scrum.01-discovery", content: SCRUM_01_DISCOVERY_SKILL },
    { name: "scrum.02-contract", content: SCRUM_02_CONTRACT_SKILL },
    { name: "scrum.03-sprint-planning", content: SCRUM_03_SPRINT_PLANNING_SKILL },
    { name: "scrum.04-development", content: SCRUM_04_DEVELOPMENT_SKILL },
    { name: "scrum.05-validation", content: SCRUM_05_VALIDATION_SKILL },
    { name: "scrum.06-release", content: SCRUM_06_RELEASE_SKILL },
  ];

  // Scrum Workflows
  const scrumWorkflows = [
    { name: "scrum.feature-lifecycle", content: SCRUM_FEATURE_LIFECYCLE_WORKFLOW },
    { name: "scrum.sprint-planning", content: SCRUM_SPRINT_PLANNING_WORKFLOW },
    { name: "scrum.install-scrum-agents", content: SCRUM_INSTALL_SCRUM_AGENTS_WORKFLOW },
    { name: "scrum.setup-agent-configs", content: SCRUM_SETUP_AGENT_CONFIGS_WORKFLOW },
  ];

  try {
    // Install Scrum Agents
    console.log(chalk.white("📋 Installing Scrum Agents..."));
    for (const scrumAgent of scrumAgents) {
      const skillDir = path.join(
        projectPath,
        agentDirName,
        "skills",
        scrumAgent.name,
      );
      await fs.ensureDir(skillDir);
      await fs.writeFile(
        path.join(skillDir, "SKILL.md"),
        scrumAgent.content,
        "utf-8",
      );
      console.log(chalk.green(`   ✅ ${scrumAgent.name}`));
    }

    // Install Scrum Skills
    console.log(chalk.white("\n🛠️  Installing Scrum Skills..."));
    for (const scrumSkill of scrumSkills) {
      const skillDir = path.join(
        projectPath,
        agentDirName,
        "skills",
        scrumSkill.name,
      );
      await fs.ensureDir(skillDir);
      await fs.writeFile(
        path.join(skillDir, "SKILL.md"),
        scrumSkill.content,
        "utf-8",
      );
      console.log(chalk.green(`   ✅ ${scrumSkill.name}`));
    }

    // Install Scrum Workflows
    console.log(chalk.white("\n🔄 Installing Scrum Workflows..."));
    const workflowsDir = path.join(projectPath, agentDirName, "workflows");
    await fs.ensureDir(workflowsDir);

    for (const workflow of scrumWorkflows) {
      await fs.writeFile(
        path.join(workflowsDir, `${workflow.name}.md`),
        workflow.content,
        "utf-8",
      );
      console.log(chalk.green(`   ✅ ${workflow.name}`));
    }

    // Create documentation structure
    console.log(chalk.white("\n📁 Creating documentation structure..."));
    const docsDir = path.join(projectPath, "docs");
    await fs.ensureDir(docsDir);

    const structure = [
      "architecture",
      "features",
      "sprints"
    ];

    for (const dir of structure) {
      await fs.ensureDir(path.join(docsDir, dir));
    }

    console.log(chalk.green(`\n✅ Successfully installed Scrum agents in ${projectPath}`));
    console.log(chalk.white(`\n📝 To use Scrum workflows, type:`));
    console.log(chalk.cyan(`   /scrum.feature-lifecycle`));
    console.log(chalk.cyan(`   /scrum.sprint-planning`));
    console.log(chalk.white(`\n📝 To use Scrum agents, reference them by name:`));
    console.log(chalk.cyan(`   @scrum.product-owner`));
    console.log(chalk.cyan(`   @scrum.tech-lead`));
    console.log(chalk.cyan(`   @scrum.developer`));
    console.log(chalk.white(`\n📝 To use Scrum skills, reference them by name:`));
    console.log(chalk.cyan(`   scrum.sdd-contract`));
    console.log(chalk.cyan(`   scrum.tdd-cycle`));
    console.log(chalk.cyan(`   scrum.ddd-modeling\n`));

    return true;
  } catch (err) {
    console.error(
      chalk.red(`\n❌ Failed to install Scrum agents: ${err}`),
    );
    return false;
  }
};

const setupScrumAgentConfigs = async (projectDirectory?: string, agent?: string) => {
  const targetDir = projectDirectory || ".";
  const currentDir = process.cwd();
  const projectPath = path.resolve(currentDir, targetDir);

  console.log(
    chalk.blue(
      `\n⚙️  Setting up Scrum agent configurations in ${projectPath}...\n`,
    ),
  );

  const selectedAgent = agent || (await promptAgentSelection());
  if (!selectedAgent) return false;

  const agentDirName = getAgentConfigDir(selectedAgent);

  // Scrum section for Agents.md
  const scrumAgentsSection = `## Scrum Agents

The following Scrum agents are available for SDD+TDD+DDD development:

### Core Scrum Roles
- **@scrum.product-owner** - Orchestrator of Discovery, defines problems and maintains backlog
- **@scrum.scrum-master** - Facilitator of ceremonies and process guardian
- **@scrum.tech-lead** - Technical authority and SDD contract owner
- **@scrum.developer** - Implementation expert using TDD discipline

### Specialist Roles
- **@scrum.ux-designer** - User experience advocate and prototype validator
- **@scrum.qa-engineer** - Quality orchestration and contract guardian
- **@scrum.security-engineer** - Security orchestration and threat modeling
- **@scrum.devops-engineer** - Infrastructure orchestration and deployment path
- **@scrum.data-lead** - Telemetry design and data-driven decisions

### How to Use Scrum Agents

1. **Start with scrum.feature-lifecycle workflow** for complete feature development
2. **Reference agents by name** in your prompts: \`@scrum.product-owner\`
3. **Use appropriate agent for each phase** of development
4. **Follow SDD+TDD+DDD disciplines** as defined in Scrum skills

### Scrum Skills Available
- **scrum.sdd-contract** - Spec-driven development discipline
- **scrum.tdd-cycle** - Test-driven development methodology
- **scrum.ddd-modeling** - Domain-driven design principles
- **scrum.telemetry-design** - Event design and analytics
- **scrum.scrum-flow** - Phase sequence and ceremony rules
- **scrum.communication** - Artifact-first coordination
- **scrum.dod-checklist** - Definition of Done validation
- **scrum.01-discovery** through **scrum.06-release** - Phase-specific guidance

### Example Usage
\`\`\`
@scrum.product-owner Help me define the user story for a new authentication feature
@scrum.tech-lead Create the SDD contract for the authentication API
@scrum.developer Implement the authentication endpoints using TDD
@scrum.qa-engineer Validate the implementation against the contract
\`\`\`
`;

  // Scrum section for Claude.md
  const scrumClaudeSection = `## Scrum Integration

When working with Scrum methodology, follow these guidelines:

### Phase-Based Work
Always identify which phase you're working in:
- **Phase 1 (Discovery)**: Use @scrum.product-owner, @scrum.ux-designer, @scrum.data-lead
- **Phase 2 (Contract)**: Use @scrum.tech-lead, @scrum.qa-engineer, @scrum.security-engineer
- **Phase 3 (Planning)**: Use @scrum.scrum-master to facilitate, all agents for estimation
- **Phase 4 (Development)**: Use @scrum.developer with @scrum.tech-lead review
- **Phase 5 (Validation)**: Use @scrum.qa-engineer, @scrum.ux-designer, @scrum.data-lead
- **Phase 6 (Release)**: Use @scrum.devops-engineer, @scrum.product-owner, @scrum.data-lead

### Artifact-First Communication
- Always read artifacts from previous phase before starting
- Write all outputs as artifacts before next phase
- Use standard templates for consistency
- Reference scrum.communication skill for detailed rules

### SDD+TDD+DDD Discipline
- **SDD**: Follow scrum.sdd-contract for specifications
- **TDD**: Use scrum.tdd-cycle for implementation
- **DDD**: Apply scrum.ddd-modeling for domain consistency

### Quality Gates
- Verify scrum.dod-checklist before any release
- Ensure all validation criteria are met
- Get approval from all phase participants

### Quick Reference
\`\`\`
/scrum.feature-lifecycle    - Complete 6-phase feature development
/scrum.sprint-planning      - Sprint planning ceremony
scrum.01-discovery         - Phase 1 guidance
scrum.02-contract          - Phase 2 guidance
scrum.03-sprint-planning   - Phase 3 guidance
scrum.04-development       - Phase 4 guidance
scrum.05-validation        - Phase 5 guidance
scrum.06-release           - Phase 6 guidance
\`\`\`
`;

  try {
    // Setup Agents.md
    const agentsMdPath = path.join(projectPath, "Agents.md");
    let agentsMdContent = "";

    if (await fs.pathExists(agentsMdPath)) {
      agentsMdContent = await fs.readFile(agentsMdPath, "utf-8");
      if (!agentsMdContent.includes("## Scrum Agents")) {
        agentsMdContent += "\n\n" + scrumAgentsSection;
      }
    } else {
      // Create using agent-init template first
      const agentInitDir = path.join(projectPath, agentDirName, "skills", "sdd-skills-ai.agents-init");
      await fs.ensureDir(agentInitDir);
      await fs.writeFile(path.join(agentInitDir, "SKILL.md"), AGENT_INIT_SKILL, "utf-8");

      // Run agent-init to create Agents.md
      await agentInitAction(projectDirectory, selectedAgent);

      // Now read and add Scrum section
      if (await fs.pathExists(agentsMdPath)) {
        agentsMdContent = await fs.readFile(agentsMdPath, "utf-8");
        if (!agentsMdContent.includes("## Scrum Agents")) {
          agentsMdContent += "\n\n" + scrumAgentsSection;
        }
      } else {
        agentsMdContent = "# Agents\n\n" + scrumAgentsSection;
      }
    }

    await fs.writeFile(agentsMdPath, agentsMdContent, "utf-8");
    console.log(chalk.green("   ✅ Agents.md updated with Scrum configuration"));

    // Setup Claude.md
    const claudeMdPath = path.join(projectPath, "Claude.md");
    let claudeMdContent = "";

    if (await fs.pathExists(claudeMdPath)) {
      claudeMdContent = await fs.readFile(claudeMdPath, "utf-8");
      if (!claudeMdContent.includes("## Scrum Integration")) {
        claudeMdContent += "\n\n" + scrumClaudeSection;
      }
    } else {
      // Create using claude-md-specialist template first
      const claudeMdSpecialistDir = path.join(projectPath, agentDirName, "skills", "sdd-skills-ai.claude-md-specialist");
      await fs.ensureDir(claudeMdSpecialistDir);
      await fs.writeFile(path.join(claudeMdSpecialistDir, "SKILL.md"), CLAUDE_MD_SPECIALIST_SKILL, "utf-8");

      // Create basic Claude.md with Scrum section
      claudeMdContent = "# Claude Configuration\n\n" + scrumClaudeSection;
    }

    await fs.writeFile(claudeMdPath, claudeMdContent, "utf-8");
    console.log(chalk.green("   ✅ Claude.md updated with Scrum configuration"));

    console.log(chalk.green(`\n✅ Successfully configured Scrum agents in ${projectPath}`));
    console.log(chalk.white(`\n📝 Scrum agents are now available:`));
    console.log(chalk.cyan(`   @scrum.product-owner, @scrum.tech-lead, @scrum.developer`));
    console.log(chalk.cyan(`   @scrum.ux-designer, @scrum.qa-engineer, @scrum.security-engineer`));
    console.log(chalk.cyan(`   @scrum.devops-engineer, @scrum.data-lead, @scrum.scrum-master`));
    console.log(chalk.white(`\n📝 Scrum workflows are available:`));
    console.log(chalk.cyan(`   /scrum.feature-lifecycle, /scrum.sprint-planning`));
    console.log(chalk.white(`\n📝 Restart your AI assistant to reload configurations\n`));

    return true;
  } catch (err) {
    console.error(
      chalk.red(`\n❌ Failed to setup Scrum agent configurations: ${err}`),
    );
    return false;
  }
};

const configureToolsAction = async (projectDirectory?: string, agent?: string) => {
  const targetDir = projectDirectory || ".";
  const currentDir = process.cwd();
  const projectPath = path.resolve(currentDir, targetDir);

  console.log(
    chalk.blue(
      `\n🔧 Configuring AI coding assistant tools in ${projectPath}...\n`,
    ),
  );

  try {
    const config = loadConfig();
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

    if (toolPrompt.tools && toolPrompt.tools.length > 0) {
      console.log(chalk.white("\n📋 Configuring selected tools..."));

      for (const toolValue of toolPrompt.tools) {
        const tool = config.tools.find(t => t.value === toolValue);
        if (tool) {
          console.log(chalk.cyan(`   🔄 ${tool.title}`));

          // Create directories for the tool
          await fs.ensureDir(path.join(projectPath, tool.paths.skills));
          await fs.ensureDir(path.join(projectPath, tool.paths.workflows));
          await fs.ensureDir(path.join(projectPath, tool.paths.config));

          console.log(chalk.green(`   ✅ ${tool.title} configured`));
        }
      }

      // Save user's tool preferences
      const updatedTools = config.tools.map(tool => ({
        ...tool,
        selected: toolPrompt.tools.includes(tool.value)
      }));

      saveUserConfig({ tools: updatedTools });

      console.log(chalk.green(`\n✅ Successfully configured ${toolPrompt.tools.length} tools in ${projectPath}`));
      console.log(chalk.white(`\n📝 Tool directories created:`));

      for (const toolValue of toolPrompt.tools) {
        const tool = config.tools.find(t => t.value === toolValue);
        if (tool) {
          console.log(chalk.cyan(`   ${tool.title}:`));
          console.log(chalk.cyan(`     Skills: ${tool.paths.skills}`));
          console.log(chalk.cyan(`     Workflows: ${tool.paths.workflows}`));
          console.log(chalk.cyan(`     Config: ${tool.paths.config}`));
        }
      }
      console.log(chalk.white(`\n📝 Your AI assistants can now use these directories for skills and workflows\n`));
    } else {
      console.log(chalk.yellow("No tools selected. Skipping tool configuration."));
    }

    return true;
  } catch (err) {
    console.error(
      chalk.red(`\n❌ Failed to configure tools: ${err}`),
    );
    return false;
  }
};

const setupAutocompletion = async (projectDirectory?: string) => {
  console.log(
    chalk.blue(
      `\n🔧 Setting up shell autocompletion for SDD Skills AI...\n`,
    ),
  );

  try {
    // Detect shell type
    const shell = process.env.SHELL;
    const platform = process.platform;

    let shellType = '';
    let configFile = '';
    let completionScript = '';

    if (platform === 'win32') {
      shellType = 'windows';
      configFile = 'PowerShell profile';
      completionScript = `
# SDD Skills AI PowerShell completion
Register-ArgumentCompleter -Native -CommandName sdd-skills-ai -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)

    $commands = @('wizard', 'init', 'configure-tools', 'apply-skills', 'agent-init', 'install-scrum', 'setup-scrum-configs', 'add-skill', 'add-spec', 'spec-skills-add')

    if ($wordToComplete -eq '') {
        return $commands
    }

    return $commands | Where-Object { $_ -like "$wordToComplete*" }
}
`;
    } else if (shell && shell.includes('zsh')) {
      shellType = 'zsh';
      configFile = '~/.zshrc';
      completionScript = `
# SDD Skills AI ZSH completion
_sdd_skills_ai_completion() {
  local -a commands
  commands=(
    'wizard:Full interactive experience (RECOMMENDED)'
    'init:Setup spec-driven architecture base'
    'configure-tools:Configure AI coding assistant tools'
    'apply-skills:Inject selected skill packs'
    'agent-init:Initialize AGENTS.md context'
    'install-scrum:Install complete Scrum methodology'
    'setup-scrum-configs:Configure Scrum agents'
    'add-skill:Register custom skill repository'
    'add-spec:Register local spec-driven tool'
    'spec-skills-add:Enable autonomous tool addition'
  )

  _describe 'command' commands
}

compdef _sdd_skills_ai_completion sdd-skills-ai
`;
    } else if (shell && shell.includes('bash')) {
      shellType = 'bash';
      configFile = '~/.bashrc';
      completionScript = `
# SDD Skills AI Bash completion
_sdd_skills_ai_completion() {
  local cur prev commands
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"

  commands="wizard init configure-tools apply-skills agent-init install-scrum setup-scrum-configs add-skill add-spec spec-skills-add"

  if [[ \${cur} == * ]]; then
    COMPREPLY=( $(compgen -W "\${commands}" -- \${cur}) )
  fi

  return 0
}

complete -F _sdd_skills_ai_completion sdd-skills-ai
`;
    } else {
      shellType = 'unknown';
      configFile = 'your shell configuration file';
      completionScript = `
# SDD Skills AI completion for ${shell || 'your shell'}
# Add completion commands for: wizard, init, configure-tools, apply-skills, agent-init, install-scrum, setup-scrum-configs, add-skill, add-spec, spec-skills-add
`;
    }

    const qShell = await prompts({
      type: "select",
      name: "shell",
      message: "Which shell are you using?",
      choices: [
        { title: "Bash (~/.bashrc)", value: "bash" },
        { title: "Zsh (~/.zshrc)", value: "zsh" },
        { title: "Windows PowerShell", value: "windows" },
        { title: "Other/Custom", value: "other" },
      ],
      initial: shellType === 'zsh' ? 1 : shellType === 'bash' ? 0 : shellType === 'windows' ? 2 : 3
    });

    if (!qShell.shell) {
      console.log(chalk.yellow("Skipping autocompletion setup."));
      return true;
    }

    // Set appropriate config file and script based on selection
    switch (qShell.shell) {
      case 'bash':
        configFile = '~/.bashrc';
        completionScript = `
# SDD Skills AI Bash completion
_sdd_skills_ai_completion() {
  local cur prev commands
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"

  commands="wizard init configure-tools apply-skills agent-init install-scrum setup-scrum-configs add-skill add-spec spec-skills-add"

  if [[ \${cur} == * ]]; then
    COMPREPLY=( $(compgen -W "\${commands}" -- \${cur}) )
  fi

  return 0
}

complete -F _sdd_skills_ai_completion sdd-skills-ai
`;
        break;
      case 'zsh':
        configFile = '~/.zshrc';
        completionScript = `
# SDD Skills AI ZSH completion
_sdd_skills_ai_completion() {
  local -a commands
  commands=(
    'wizard:Full interactive experience (RECOMMENDED)'
    'init:Setup spec-driven architecture base'
    'configure-tools:Configure AI coding assistant tools'
    'apply-skills:Inject selected skill packs'
    'agent-init:Initialize AGENTS.md context'
    'install-scrum:Install complete Scrum methodology'
    'setup-scrum-configs:Configure Scrum agents'
    'add-skill:Register custom skill repository'
    'add-spec:Register local spec-driven tool'
    'spec-skills-add:Enable autonomous tool addition'
  )

  _describe 'command' commands
}

compdef _sdd_skills_ai_completion sdd-skills-ai
`;
        break;
      case 'windows':
        configFile = 'PowerShell Profile';
        completionScript = `
# SDD Skills AI PowerShell completion
Register-ArgumentCompleter -Native -CommandName sdd-skills-ai -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)

    $commands = @('wizard', 'init', 'configure-tools', 'apply-skills', 'agent-init', 'install-scrum', 'setup-scrum-configs', 'add-skill', 'add-spec', 'spec-skills-add')

    if ($wordToComplete -eq '') {
        return $commands
    }

    return $commands | Where-Object { $_ -like "$wordToComplete*" }
}
`;
        break;
      case 'other':
        configFile = 'your shell configuration file';
        completionScript = `
# SDD Skills AI completion for your shell
# Add completion for commands: wizard, init, configure-tools, apply-skills, agent-init, install-scrum, setup-scrum-configs, add-skill, add-spec, spec-skills-add
`;
        break;
    }

    console.log(chalk.cyan(`📝 Detected shell: ${qShell.shell}`));
    console.log(chalk.cyan(`📁 Config file: ${configFile}`));

    const qInstall = await prompts({
      type: "confirm",
      name: "install",
      message: `Add autocompletion to ${configFile}?`,
      initial: true,
    });

    if (!qInstall.install) {
      console.log(chalk.yellow("Skipping autocompletion installation."));
      return true;
    }

    // Expand the config file path
    let expandedConfigPath = configFile;
    if (configFile.startsWith('~')) {
      expandedConfigPath = path.join(os.homedir(), configFile.slice(1));
    } else if (configFile === 'PowerShell Profile') {
      const psProfile = execSync('echo $PROFILE', { encoding: 'utf8' }).trim();
      expandedConfigPath = psProfile || path.join(os.homedir(), 'Documents', 'WindowsPowerShell', 'Microsoft.PowerShell_profile.ps1');
    }

    // Ensure config directory exists
    const configDir = path.dirname(expandedConfigPath);
    if (!fs.existsSync(configDir)) {
      fs.ensureDirSync(configDir);
    }

    // Add completion script to config file
    const completionMarker = "# SDD Skills AI completion";
    const existingContent = fs.existsSync(expandedConfigPath)
      ? fs.readFileSync(expandedConfigPath, 'utf8')
      : '';

    // Remove existing SDD Skills AI completion if it exists
    const cleanedContent = existingContent
      .split('\n')
      .filter(line => !line.includes(completionMarker))
      .join('\n');

    // Add new completion script
    const newContent = cleanedContent + '\n' + completionScript + '\n';
    fs.writeFileSync(expandedConfigPath, newContent, 'utf8');

    console.log(chalk.green(`✅ Autocompletion added to ${configFile}`));

    if (qShell.shell !== 'windows') {
      console.log(chalk.white(`\n🔄 To activate autocompletion, run:`));
      console.log(chalk.cyan(`   source ${configFile}`));
      console.log(chalk.white(`\nOr restart your terminal.`));
    } else {
      console.log(chalk.white(`\n🔄 To activate autocompletion, restart PowerShell.`));
    }

    console.log(chalk.white(`\n💡 Test it out:`));
    console.log(chalk.cyan(`   sdd-skills-ai <TAB>`));
    console.log(chalk.cyan(`   sdd-skills-ai w<TAB>`));

    return true;
  } catch (err) {
    console.error(
      chalk.red(`\n❌ Failed to setup autocompletion: ${err}`),
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

  const qTools = await prompts({
    type: "confirm",
    name: "run",
    message: "Do you want to configure AI coding assistant tools?",
    initial: true,
  });
  if (qTools.run) {
    await configureToolsAction(projectDirectory, selectedAgent);
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

  const qScrum = await prompts({
    type: "confirm",
    name: "run",
    message:
      "Do you want to install Scrum agents with SDD+TDD+DDD disciplines?",
    initial: false,
  });
  if (qScrum.run) {
    await installScrumAgentsAction(projectDirectory, selectedAgent);
  }

  const qAutocomplete = await prompts({
    type: "confirm",
    name: "run",
    message: "Do you want to setup shell autocompletion for sdd-skills-ai commands?",
    initial: true,
  });
  if (qAutocomplete.run) {
    await setupAutocompletion(projectDirectory);
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
  .command("setup-scrum-configs")
  .description(
    "Setup Scrum agent configurations in Agents.md and Claude.md files"
  )
  .argument(
    "[project-directory]",
    "Directory to setup the Scrum configurations in (defaults to current directory)",
  )
  .option("-a, --agent <agent>", "Target AI Assistant")
  .action(async (dir, options) => {
    const success = await setupScrumAgentConfigs(dir, options.agent);
    if (!success) process.exit(1);
  });

program
  .command("install-scrum")
  .description(
    "Install Scrum agents with SDD+TDD+DDD disciplines"
  )
  .argument(
    "[project-directory]",
    "Directory to install the Scrum agents into (defaults to current directory)",
  )
  .option("-a, --agent <agent>", "Target AI Assistant")
  .action(async (dir, options) => {
    const success = await installScrumAgentsAction(dir, options.agent);
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

program
  .command("completion")
  .description("Setup shell autocompletion for sdd-skills-ai commands")
  .action(async () => {
    const success = await setupAutocompletion();
    if (!success) process.exit(1);
  });

program.parse(process.argv);
