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
  const targetDir = projectDirectory || ".";
  const currentDir = process.cwd();
  const projectPath = path.resolve(currentDir, targetDir);

  console.log(chalk.blue("📝 Setting up AGENTS.md..."));

  try {
    // Check if AGENTS.md already exists
    const agentsMdPath = path.join(projectPath, "AGENTS.md");
    if (await fs.pathExists(agentsMdPath)) {
      console.log(chalk.yellow("⚠️  AGENTS.md already exists. Skipping creation."));
      return true;
    }

    // Create basic AGENTS.md content
    const agentsMdContent = `# AGENTS.md

A dedicated place to provide context and instructions to help AI coding agents work on this project appropriately.
Learn more about this convention at: [agents.md](https://agents.md/)

## Context & Architecture
- **Description**: Project initialized with sdd-skills-ai CLI tool
- **Language**: TypeScript / Node.js
- **Build tool**: \`tsup\` mapping to CommonJS (CJS)
- **Core Architecture Principles**:
  - **Spec-Driven Development**: Following SDD paradigm for development
  - **AI Agent Compatibility**: Configured for multiple AI coding assistants
  - **Extensibility**: Modular skill and workflow system

## Setup commands
- **Install dependencies**: \`npm install\`
- **Run dev server (watch mode)**: \`npm run dev\`
- **Build**: \`npm run build\`
- **Run tests**: \`npm run test\`

## Code style
- Use **Strict TypeScript**. Always define explicit types and interfaces where appropriate.
- Follow the SDD paradigm: when adding new features, prefer creating/updating definitions or specifications first.
- Ensure CLI outputs remain descriptive and user-friendly, continuing the use of \`chalk\` to format messages.
- Prefer explicit and clean coding practices.

## AI Assistant Configuration
This project is configured to work with multiple AI coding assistants:
- **Antigravity**: Uses \`.agent/\` directory for skills and workflows
- **Claude Code**: Uses \`.claude/\` directory
- **Gemini CLI**: Uses \`.gemini/\` directory
- **Cursor**: Uses \`.cursor/\` directory
- **Windsurf**: Uses \`.agent/\` directory

## Skills & Workflows
The project includes a modular skill and workflow system located in:
- Skills: \`.agent/skills/\`
- Workflows: \`.agent/workflows/\`

These can be dynamically extended using the sdd-skills-ai CLI commands.
`;

    await fs.writeFile(agentsMdPath, agentsMdContent, "utf8");
    console.log(chalk.green(`✅ AGENTS.md created at ${agentsMdPath}`));

    return true;
  } catch (error) {
    console.error(chalk.red(`❌ Error creating AGENTS.md: ${error}`));
    return false;
  }
}

export async function specSkillsAddAction(projectDirectory?: string, agent?: string): Promise<boolean> {
  const targetDir = projectDirectory || ".";
  const currentDir = process.cwd();
  const projectPath = path.resolve(currentDir, targetDir);

  console.log(chalk.blue("🔧 Enabling autonomous tool addition..."));

  try {
    // Create spec-skills configuration
    const specSkillsDir = path.join(projectPath, ".agent", "spec-skills");
    await fs.ensureDir(specSkillsDir);

    // Create configuration file for autonomous tool addition
    const configContent = `{
  "version": "1.0.0",
  "autonomous_addition": {
    "enabled": true,
    "auto_approve": false,
    "categories": ["skills", "workflows", "agents"],
    "sources": {
      "github": {
        "enabled": true,
        "trusted_repos": [
          "github/spec-kit",
          "fission-ai/openspec",
          "sickn33/antigravity-awesome-skills"
        ]
      },
      "local": {
        "enabled": true,
        "paths": ["./specs", "./templates"]
      }
    }
  },
  "validation": {
    "require_tests": true,
    "require_docs": true,
    "check_dependencies": true
  },
  "integration": {
    "auto_update_agents_md": true,
    "auto_update_claude_md": true,
    "sync_workflows": true
  }
}`;

    await fs.writeFile(path.join(specSkillsDir, "config.json"), configContent, "utf8");

    // Create skills registry
    const registryContent = `# Spec Skills Registry

This registry tracks all autonomously added skills and workflows.

## Skills Added
<!-- Skills will be automatically added here -->

## Workflows Added
<!-- Workflows will be automatically added here -->

## Integration Status
- AGENTS.md: ✅ Auto-sync enabled
- Claude.md: ✅ Auto-sync enabled
- Dependencies: ✅ Auto-check enabled

## Usage
Use @skill-name or /workflow-name to invoke autonomously added tools.
`;

    await fs.writeFile(path.join(specSkillsDir, "registry.md"), registryContent, "utf8");

    // Create CLI integration script
    const cliScriptContent = `#!/bin/bash
# Spec Skills CLI Integration Script

echo "🔧 Spec Skills Integration Active"
echo "📝 Registry: .agent/spec-skills/registry.md"
echo "⚙️  Config: .agent/spec-skills/config.json"
echo ""
echo "Commands:"
echo "  add-skill <repo-url>    - Add skill from GitHub repository"
echo "  add-spec <local-path>   - Add local spec-driven tool"
echo "  list-skills             - List available skills"
echo "  sync-agents             - Sync agent configurations"
`;

    await fs.writeFile(path.join(specSkillsDir, "integration.sh"), cliScriptContent, "utf8");
    await fs.chmod(path.join(specSkillsDir, "integration.sh"), "755");

    console.log(chalk.green(`✅ Autonomous tool addition enabled in ${specSkillsDir}`));
    console.log(chalk.green(`✅ Registry created: .agent/spec-skills/registry.md`));
    console.log(chalk.green(`✅ Configuration: .agent/spec-skills/config.json`));

    return true;
  } catch (error) {
    console.error(chalk.red(`❌ Error enabling autonomous tool addition: ${error}`));
    return false;
  }
}

export async function setupScrumAgentConfigsAction(projectDirectory?: string, agent?: string): Promise<boolean> {
  const targetDir = projectDirectory || ".";
  const currentDir = process.cwd();
  const projectPath = path.resolve(currentDir, targetDir);

  console.log(chalk.blue("🏈 Setting up Scrum agent configurations..."));

  try {
    // Create scrum configuration files
    const scrumConfigDir = path.join(projectPath, ".agent", "scrum");
    await fs.ensureDir(scrumConfigDir);

    // Create scrum config file
    const scrumConfigContent = `{
  "version": "1.0.0",
  "methodology": "Scrum with SDD+TDD+DDD",
  "agents": {
    "product-owner": {
      "role": "Product Owner",
      "responsibilities": ["Requirements", "Backlog Management", "Stakeholder Communication"],
      "skills": ["scrum.01-discovery", "scrum.02-contract"]
    },
    "scrum-master": {
      "role": "Scrum Master",
      "responsibilities": ["Facilitation", "Process Management", "Team Coordination"],
      "skills": ["scrum.scrum-flow", "scrum.communication"]
    },
    "developer": {
      "role": "Developer",
      "responsibilities": ["Implementation", "Testing", "Code Quality"],
      "skills": ["scrum.04-development", "scrum.tdd-cycle", "scrum.sdd-contract"]
    },
    "tech-lead": {
      "role": "Tech Lead",
      "responsibilities": ["Architecture", "Technical Decisions", "Code Review"],
      "skills": ["architecture", "scrum.ddd-modeling", "scrum.sdd-contract"]
    },
    "ux-designer": {
      "role": "UX Designer",
      "responsibilities": ["User Experience", "Interface Design", "Usability"],
      "skills": ["frontend-design", "scrum.01-discovery"]
    },
    "qa-engineer": {
      "role": "QA Engineer",
      "responsibilities": ["Quality Assurance", "Testing", "Validation"],
      "skills": ["scrum.05-validation", "testing-patterns", "scrum.dod-checklist"]
    },
    "security-engineer": {
      "role": "Security Engineer",
      "responsibilities": ["Security", "Threat Analysis", "Compliance"],
      "skills": ["vulnerability-scanner", "scrum.05-validation"]
    },
    "devops-engineer": {
      "role": "DevOps Engineer",
      "responsibilities": ["Infrastructure", "Deployment", "CI/CD"],
      "skills": ["deployment-procedures", "server-management"]
    },
    "data-lead": {
      "role": "Data Lead",
      "responsibilities": ["Data Architecture", "Analytics", "Metrics"],
      "skills": ["scrum.telemetry-design", "database-design"]
    }
  },
  "workflows": {
    "feature-lifecycle": "Complete 6-phase feature development",
    "sprint-planning": "Sprint planning ceremony",
    "bug-fix": "Systematic bug resolution"
  }
}`;

    await fs.writeFile(path.join(scrumConfigDir, "config.json"), scrumConfigContent, "utf8");

    // Update AGENTS.md with Scrum information
    const agentsMdPath = path.join(projectPath, "AGENTS.md");
    if (await fs.pathExists(agentsMdPath)) {
      const agentsMdContent = await fs.readFile(agentsMdPath, "utf8");
      const scrumSection = `

## Scrum Methodology

This project follows Scrum methodology with SDD+TDD+DDD disciplines:

### Scrum Agents
- **@scrum.product-owner** - Requirements and backlog management
- **@scrum.scrum-master** - Process facilitation and team coordination
- **@scrum.developer** - TDD implementation and development
- **@scrum.tech-lead** - Architecture and technical decisions
- **@scrum.ux-designer** - User experience and interface design
- **@scrum.qa-engineer** - Quality assurance and testing
- **@scrum.security-engineer** - Security and threat analysis
- **@scrum.devops-engineer** - Infrastructure and deployment
- **@scrum.data-lead** - Data architecture and analytics

### Scrum Workflows
- **/scrum.feature-lifecycle** - Complete 6-phase feature development
- **/scrum.sprint-planning** - Sprint planning ceremony
- **/scrum.bug-fix** - Systematic bug resolution

### Configuration
Scrum configuration is stored in \`.agent/scrum/config.json\`
`;

      const updatedContent = agentsMdContent + scrumSection;
      await fs.writeFile(agentsMdPath, updatedContent, "utf8");
    }

    console.log(chalk.green(`✅ Scrum configurations created in ${scrumConfigDir}`));
    console.log(chalk.green(`✅ AGENTS.md updated with Scrum information`));

    return true;
  } catch (error) {
    console.error(chalk.red(`❌ Error setting up Scrum configurations: ${error}`));
    return false;
  }
}