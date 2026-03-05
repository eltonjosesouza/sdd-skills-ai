import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { 
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
  SCRUM_SETUP_AGENT_CONFIGS_WORKFLOW
} from "../templates";

export interface ScrumInstallationResult {
  installedAgents: string[];
  installedSkills: string[];
  installedWorkflows: string[];
  success: boolean;
}

export class ScrumService {
  private static readonly SCRUM_AGENTS = [
    { name: "Product Owner", skill: SCRUM_PRODUCT_OWNER_SKILL, id: "scrum.product-owner" },
    { name: "Scrum Master", skill: SCRUM_SCRUM_MASTER_SKILL, id: "scrum.scrum-master" },
    { name: "Developer", skill: SCRUM_DEVELOPER_SKILL, id: "scrum.developer" },
    { name: "Tech Lead", skill: SCRUM_TECH_LEAD_SKILL, id: "scrum.tech-lead" },
    { name: "UX Designer", skill: SCRUM_UX_DESIGNER_SKILL, id: "scrum.ux-designer" },
    { name: "QA Engineer", skill: SCRUM_QA_ENGINEER_SKILL, id: "scrum.qa-engineer" },
    { name: "Security Engineer", skill: SCRUM_SECURITY_ENGINEER_SKILL, id: "scrum.security-engineer" },
    { name: "DevOps Engineer", skill: SCRUM_DEVOPS_ENGINEER_SKILL, id: "scrum.devops-engineer" },
    { name: "Data Lead", skill: SCRUM_DATA_LEAD_SKILL, id: "scrum.data-lead" }
  ];

  private static readonly SCRUM_SKILLS = [
    { name: "SDD Contract", skill: SCRUM_SDD_CONTRACT_SKILL, id: "scrum.sdd-contract" },
    { name: "TDD Cycle", skill: SCRUM_TDD_CYCLE_SKILL, id: "scrum.tdd-cycle" },
    { name: "DDD Modeling", skill: SCRUM_DDD_MODELING_SKILL, id: "scrum.ddd-modeling" },
    { name: "Telemetry Design", skill: SCRUM_TELEMETRY_DESIGN_SKILL, id: "scrum.telemetry-design" },
    { name: "Scrum Flow", skill: SCRUM_SCRUM_FLOW_SKILL, id: "scrum.scrum-flow" },
    { name: "Communication", skill: SCRUM_COMMUNICATION_SKILL, id: "scrum.communication" },
    { name: "DoD Checklist", skill: SCRUM_DOD_CHECKLIST_SKILL, id: "scrum.dod-checklist" },
    { name: "Phase 1: Discovery", skill: SCRUM_01_DISCOVERY_SKILL, id: "scrum.01-discovery" },
    { name: "Phase 2: Contract", skill: SCRUM_02_CONTRACT_SKILL, id: "scrum.02-contract" },
    { name: "Phase 3: Sprint Planning", skill: SCRUM_03_SPRINT_PLANNING_SKILL, id: "scrum.03-sprint-planning" },
    { name: "Phase 4: Development", skill: SCRUM_04_DEVELOPMENT_SKILL, id: "scrum.04-development" },
    { name: "Phase 5: Validation", skill: SCRUM_05_VALIDATION_SKILL, id: "scrum.05-validation" },
    { name: "Phase 6: Release", skill: SCRUM_06_RELEASE_SKILL, id: "scrum.06-release" }
  ];

  private static readonly SCRUM_WORKFLOWS = [
    { name: "Feature Lifecycle", workflow: SCRUM_FEATURE_LIFECYCLE_WORKFLOW, id: "scrum.feature-lifecycle" },
    { name: "Sprint Planning", workflow: SCRUM_SPRINT_PLANNING_WORKFLOW, id: "scrum.sprint-planning" },
    { name: "Install Scrum Agents", workflow: SCRUM_INSTALL_SCRUM_AGENTS_WORKFLOW, id: "scrum.install-scrum-agents" },
    { name: "Setup Agent Configs", workflow: SCRUM_SETUP_AGENT_CONFIGS_WORKFLOW, id: "scrum.setup-agent-configs" }
  ];

  private static createSkillFile(projectPath: string, skill: { name: string; skill: string; id: string }): void {
    const skillDir = path.join(projectPath, ".agent", "skills", skill.id);
    fs.ensureDirSync(skillDir);
    
    const skillFile = path.join(skillDir, "SKILL.md");
    fs.writeFileSync(skillFile, skill.skill, "utf8");
  }

  private static createWorkflowFile(projectPath: string, workflow: { name: string; workflow: string; id: string }): void {
    const workflowDir = path.join(projectPath, ".agent", "workflows");
    fs.ensureDirSync(workflowDir);
    
    const workflowFile = path.join(workflowDir, `${workflow.id}.workflow.md`);
    fs.writeFileSync(workflowFile, workflow.workflow, "utf8");
  }

  private static installScrumAgentsComponents(projectPath: string): string[] {
    const installedAgents: string[] = [];

    console.log(chalk.cyan("📋 Installing Scrum Agents..."));
    
    for (const agent of ScrumService.SCRUM_AGENTS) {
      try {
        ScrumService.createSkillFile(projectPath, agent);
        console.log(chalk.green(`   ✅ ${agent.name}`));
        installedAgents.push(agent.id);
      } catch (error) {
        console.error(chalk.red(`   ❌ Failed to install ${agent.name}: ${error}`));
        throw error;
      }
    }

    return installedAgents;
  }

  private static installScrumSkillsComponents(projectPath: string): string[] {
    const installedSkills: string[] = [];

    console.log(chalk.cyan("🛠️ Installing Scrum Skills..."));
    
    for (const skill of ScrumService.SCRUM_SKILLS) {
      try {
        ScrumService.createSkillFile(projectPath, skill);
        console.log(chalk.green(`   ✅ ${skill.name}`));
        installedSkills.push(skill.id);
      } catch (error) {
        console.error(chalk.red(`   ❌ Failed to install ${skill.name}: ${error}`));
        throw error;
      }
    }

    return installedSkills;
  }

  private static installScrumWorkflowsComponents(projectPath: string): string[] {
    const installedWorkflows: string[] = [];

    console.log(chalk.cyan("🔄 Installing Scrum Workflows..."));
    
    for (const workflow of ScrumService.SCRUM_WORKFLOWS) {
      try {
        ScrumService.createWorkflowFile(projectPath, workflow);
        console.log(chalk.green(`   ✅ ${workflow.name}`));
        installedWorkflows.push(workflow.id);
      } catch (error) {
        console.error(chalk.red(`   ❌ Failed to install ${workflow.name}: ${error}`));
        throw error;
      }
    }

    return installedWorkflows;
  }

  public static async installScrumAgents(projectDirectory?: string): Promise<ScrumInstallationResult> {
    const targetDir = projectDirectory || ".";
    const currentDir = process.cwd();
    const projectPath = path.resolve(currentDir, targetDir);

    console.log(chalk.blue(`\n🏈 Installing Scrum agents with SDD+TDD+DDD disciplines in ${projectPath}...\n`));

    try {
      const installedAgents = ScrumService.installScrumAgentsComponents(projectPath);
      const installedSkills = ScrumService.installScrumSkillsComponents(projectPath);
      const installedWorkflows = ScrumService.installScrumWorkflowsComponents(projectPath);

      console.log(chalk.green(`\n✅ Successfully installed Scrum methodology in ${projectPath}`));
      console.log(chalk.white(`\n📊 Installation Summary:`));
      console.log(chalk.cyan(`   📋 ${installedAgents.length} Scrum Agents`));
      console.log(chalk.cyan(`   🛠️ ${installedSkills.length} Scrum Skills`));
      console.log(chalk.cyan(`   🔄 ${installedWorkflows.length} Scrum Workflows`));
      console.log(chalk.white(`\n🎯 Ready to use:`));
      console.log(chalk.cyan(`   @scrum.product-owner - For requirements and backlog management`));
      console.log(chalk.cyan(`   @scrum.developer - For TDD implementation`));
      console.log(chalk.cyan(`   /scrum.feature-lifecycle - For complete feature development`));
      console.log(chalk.white(`\n📖 Learn more: docs/scrum/overview.md\n`));

      return {
        installedAgents,
        installedSkills,
        installedWorkflows,
        success: true
      };
    } catch (err) {
      console.error(chalk.red(`\n❌ Failed to install Scrum agents: ${err}`));
      return {
        installedAgents: [],
        installedSkills: [],
        installedWorkflows: [],
        success: false
      };
    }
  }

  public static getScrumStats(): {
    agentsCount: number;
    skillsCount: number;
    workflowsCount: number;
    totalComponents: number;
  } {
    return {
      agentsCount: ScrumService.SCRUM_AGENTS.length,
      skillsCount: ScrumService.SCRUM_SKILLS.length,
      workflowsCount: ScrumService.SCRUM_WORKFLOWS.length,
      totalComponents: ScrumService.SCRUM_AGENTS.length + ScrumService.SCRUM_SKILLS.length + ScrumService.SCRUM_WORKFLOWS.length
    };
  }

  public static getScrumComponents(): {
    agents: { id: string; name: string }[];
    skills: { id: string; name: string }[];
    workflows: { id: string; name: string }[];
  } {
    return {
      agents: ScrumService.SCRUM_AGENTS.map(agent => ({ id: agent.id, name: agent.name })),
      skills: ScrumService.SCRUM_SKILLS.map(skill => ({ id: skill.id, name: skill.name })),
      workflows: ScrumService.SCRUM_WORKFLOWS.map(workflow => ({ id: workflow.id, name: workflow.name }))
    };
  }
}