import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import prompts from "prompts";
import { execSync } from "child_process";
import os from "os";
import { loadConfig, Config } from "../configManager";
import {
  AGENT_INIT_SKILL,
  AGENT_INIT_WORKFLOW,
  AGENTS_MD_SPECIALIST_SKILL,
  CLAUDE_MD_SPECIALIST_SKILL,
  AGENTS_CLAUDE_SYNC_WORKFLOW,
} from "../templates";

export interface ActionResult {
  success: boolean;
  message?: string;
}

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
  agentDirName: string
) => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "sdd-skills-ai-"));

  try {
    // Execute command in temp directory
    const originalCwd = process.cwd();
    process.chdir(tempDir);

    console.log(chalk.gray(`Running: ${cmd} in ${tempDir}`));
    execSync(cmd, { stdio: "inherit" });

    // Merge results back to project
    process.chdir(originalCwd);
    await fs.copy(path.join(tempDir, agentDirName), path.join(projectPath, agentDirName), {
      overwrite: false,
    });

    console.log(chalk.green(`✅ Merged ${agentDirName} to project`));
  } finally {
    process.chdir(projectPath);
    await fs.remove(tempDir);
  }
};

// Apply skills action with full implementation
export async function applySkillsAction(projectDirectory?: string, agent?: string): Promise<boolean> {
  const targetDir = projectDirectory || ".";
  const currentDir = process.cwd();
  const projectPath = path.resolve(currentDir, targetDir);

  console.log(
    chalk.blue(
      `\n🚀 Assisting with AI Skills Injection in ${projectPath}\n`,
    ),
  );

  const selectedAgent = agent || (await promptAgentSelection());
  console.log(chalk.yellow(`DEBUG: Selected agent: ${selectedAgent}`));
  if (!selectedAgent) {
    console.log(chalk.red("Operation cancelled."));
    return false;
  }

  const agentDirName = getAgentConfigDir(selectedAgent);
  const config = loadConfig();
  console.log(chalk.yellow(`DEBUG: Available skills: ${config.skills.length}`));
  console.log(chalk.yellow(`DEBUG: About to show skills selection prompt...`));

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

  console.log(chalk.yellow(`DEBUG: Skills response:`, response));

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
}

export async function agentInitAction(projectDirectory?: string, agent?: string): Promise<boolean> {
  // This will be implemented when we extract the logic from index.ts
  console.log(chalk.blue("📝 Setting up AGENTS.md..."));
  // TODO: Implement the actual logic
  return true;
}

export async function setupScrumAgentConfigsAction(projectDirectory?: string, agent?: string): Promise<boolean> {
  // This will be implemented when we extract the logic from index.ts
  console.log(chalk.blue("🏈 Setting up Scrum agent configurations..."));
  // TODO: Implement the actual logic
  return true;
}