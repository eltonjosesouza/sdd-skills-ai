import { ScrumService } from '../../src/services/scrum.service';
import fs from 'fs-extra';
import path from 'path';
import { createTempDir, cleanupTempDir } from '../setup';

// Mock chalk
jest.mock('chalk', () => ({
  blue: jest.fn((text) => text),
  green: jest.fn((text) => text),
  yellow: jest.fn((text) => text),
  white: jest.fn((text) => text),
  cyan: jest.fn((text) => text),
  red: jest.fn((text) => text),
}));

// Mock templates
jest.mock('../../src/templates', () => ({
  SCRUM_PRODUCT_OWNER_SKILL: 'mock-product-owner-skill',
  SCRUM_SCRUM_MASTER_SKILL: 'mock-scrum-master-skill',
  SCRUM_DEVELOPER_SKILL: 'mock-developer-skill',
  SCRUM_TECH_LEAD_SKILL: 'mock-tech-lead-skill',
  SCRUM_UX_DESIGNER_SKILL: 'mock-ux-designer-skill',
  SCRUM_QA_ENGINEER_SKILL: 'mock-qa-engineer-skill',
  SCRUM_SECURITY_ENGINEER_SKILL: 'mock-security-engineer-skill',
  SCRUM_DEVOPS_ENGINEER_SKILL: 'mock-devops-engineer-skill',
  SCRUM_DATA_LEAD_SKILL: 'mock-data-lead-skill',
  SCRUM_SDD_CONTRACT_SKILL: 'mock-sdd-contract-skill',
  SCRUM_TDD_CYCLE_SKILL: 'mock-tdd-cycle-skill',
  SCRUM_DDD_MODELING_SKILL: 'mock-ddd-modeling-skill',
  SCRUM_TELEMETRY_DESIGN_SKILL: 'mock-telemetry-design-skill',
  SCRUM_SCRUM_FLOW_SKILL: 'mock-scrum-flow-skill',
  SCRUM_COMMUNICATION_SKILL: 'mock-communication-skill',
  SCRUM_DOD_CHECKLIST_SKILL: 'mock-dod-checklist-skill',
  SCRUM_01_DISCOVERY_SKILL: 'mock-01-discovery-skill',
  SCRUM_02_CONTRACT_SKILL: 'mock-02-contract-skill',
  SCRUM_03_SPRINT_PLANNING_SKILL: 'mock-03-sprint-planning-skill',
  SCRUM_04_DEVELOPMENT_SKILL: 'mock-04-development-skill',
  SCRUM_05_VALIDATION_SKILL: 'mock-05-validation-skill',
  SCRUM_06_RELEASE_SKILL: 'mock-06-release-skill',
  SCRUM_FEATURE_LIFECYCLE_WORKFLOW: 'mock-feature-lifecycle-workflow',
  SCRUM_SPRINT_PLANNING_WORKFLOW: 'mock-sprint-planning-workflow',
  SCRUM_INSTALL_SCRUM_AGENTS_WORKFLOW: 'mock-install-scrum-agents-workflow',
  SCRUM_SETUP_AGENT_CONFIGS_WORKFLOW: 'mock-setup-agent-configs-workflow',
}));

describe('ScrumService', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = createTempDir('scrum-test');
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupTempDir(tempDir);
  });

  describe('installScrumAgents', () => {
    it('should install all Scrum components successfully', async () => {
      const result = await ScrumService.installScrumAgents(tempDir);

      expect(result.success).toBe(true);
      expect(result.installedAgents).toHaveLength(9);
      expect(result.installedSkills).toHaveLength(13);
      expect(result.installedWorkflows).toHaveLength(4);

      // Verify agent files were created
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills', 'scrum.product-owner', 'SKILL.md'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills', 'scrum.developer', 'SKILL.md'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills', 'scrum.tech-lead', 'SKILL.md'))).toBe(true);

      // Verify skill files were created
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills', 'scrum.sdd-contract', 'SKILL.md'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills', 'scrum.tdd-cycle', 'SKILL.md'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills', 'scrum.ddd-modeling', 'SKILL.md'))).toBe(true);

      // Verify workflow files were created
      expect(fs.existsSync(path.join(tempDir, '.agent', 'workflows', 'scrum.feature-lifecycle.workflow.md'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'workflows', 'scrum.sprint-planning.workflow.md'))).toBe(true);

      // Verify content of files
      const productOwnerContent = fs.readFileSync(path.join(tempDir, '.agent', 'skills', 'scrum.product-owner', 'SKILL.md'), 'utf8');
      expect(productOwnerContent).toBe('mock-product-owner-skill');

      const workflowContent = fs.readFileSync(path.join(tempDir, '.agent', 'workflows', 'scrum.feature-lifecycle.workflow.md'), 'utf8');
      expect(workflowContent).toBe('mock-feature-lifecycle-workflow');
    });

    it('should use current directory when no project directory provided', async () => {
      // Mock process.cwd to return temp directory
      const originalCwd = process.cwd;
      process.cwd = jest.fn(() => tempDir);

      const result = await ScrumService.installScrumAgents();

      expect(result.success).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills', 'scrum.product-owner', 'SKILL.md'))).toBe(true);

      // Restore original function
      process.cwd = originalCwd;
    });

    it('should handle errors during installation', async () => {
      // Mock fs.writeFileSync to throw an error
      const originalWriteFileSync = fs.writeFileSync;
      fs.writeFileSync = jest.fn(() => {
        throw new Error('Permission denied');
      });

      const result = await ScrumService.installScrumAgents(tempDir);

      expect(result.success).toBe(false);
      expect(result.installedAgents).toEqual([]);
      expect(result.installedSkills).toEqual([]);
      expect(result.installedWorkflows).toEqual([]);

      // Restore original function
      fs.writeFileSync = originalWriteFileSync;
    });

    it('should create correct directory structure', async () => {
      await ScrumService.installScrumAgents(tempDir);

      // Check main directories
      expect(fs.existsSync(path.join(tempDir, '.agent'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'workflows'))).toBe(true);

      // Check specific agent directories
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills', 'scrum.product-owner'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills', 'scrum.scrum-master'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills', 'scrum.developer'))).toBe(true);

      // Check specific skill directories
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills', 'scrum.01-discovery'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills', 'scrum.02-contract'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills', 'scrum.03-sprint-planning'))).toBe(true);
    });
  });

  describe('getScrumStats', () => {
    it('should return correct statistics', () => {
      const stats = ScrumService.getScrumStats();

      expect(stats.agentsCount).toBe(9);
      expect(stats.skillsCount).toBe(13);
      expect(stats.workflowsCount).toBe(4);
      expect(stats.totalComponents).toBe(26);
    });
  });

  describe('getScrumComponents', () => {
    it('should return all components with correct format', () => {
      const components = ScrumService.getScrumComponents();

      // Check agents
      expect(components.agents).toHaveLength(9);
      expect(components.agents[0]).toEqual({
        id: 'scrum.product-owner',
        name: 'Product Owner'
      });
      expect(components.agents).toContainEqual({
        id: 'scrum.developer',
        name: 'Developer'
      });

      // Check skills
      expect(components.skills).toHaveLength(13);
      expect(components.skills[0]).toEqual({
        id: 'scrum.sdd-contract',
        name: 'SDD Contract'
      });
      expect(components.skills).toContainEqual({
        id: 'scrum.tdd-cycle',
        name: 'TDD Cycle'
      });

      // Check workflows
      expect(components.workflows).toHaveLength(4);
      expect(components.workflows[0]).toEqual({
        id: 'scrum.feature-lifecycle',
        name: 'Feature Lifecycle'
      });
      expect(components.workflows).toContainEqual({
        id: 'scrum.sprint-planning',
        name: 'Sprint Planning'
      });
    });
  });

  describe('component validation', () => {
    it('should have all required agents', () => {
      const components = ScrumService.getScrumComponents();
      const agentIds = components.agents.map(a => a.id);

      expect(agentIds).toContain('scrum.product-owner');
      expect(agentIds).toContain('scrum.scrum-master');
      expect(agentIds).toContain('scrum.developer');
      expect(agentIds).toContain('scrum.tech-lead');
      expect(agentIds).toContain('scrum.ux-designer');
      expect(agentIds).toContain('scrum.qa-engineer');
      expect(agentIds).toContain('scrum.security-engineer');
      expect(agentIds).toContain('scrum.devops-engineer');
      expect(agentIds).toContain('scrum.data-lead');
    });

    it('should have all required skills', () => {
      const components = ScrumService.getScrumComponents();
      const skillIds = components.skills.map(s => s.id);

      expect(skillIds).toContain('scrum.sdd-contract');
      expect(skillIds).toContain('scrum.tdd-cycle');
      expect(skillIds).toContain('scrum.ddd-modeling');
      expect(skillIds).toContain('scrum.telemetry-design');
      expect(skillIds).toContain('scrum.scrum-flow');
      expect(skillIds).toContain('scrum.communication');
      expect(skillIds).toContain('scrum.dod-checklist');
      expect(skillIds).toContain('scrum.01-discovery');
      expect(skillIds).toContain('scrum.02-contract');
      expect(skillIds).toContain('scrum.03-sprint-planning');
      expect(skillIds).toContain('scrum.04-development');
      expect(skillIds).toContain('scrum.05-validation');
      expect(skillIds).toContain('scrum.06-release');
    });

    it('should have all required workflows', () => {
      const components = ScrumService.getScrumComponents();
      const workflowIds = components.workflows.map(w => w.id);

      expect(workflowIds).toContain('scrum.feature-lifecycle');
      expect(workflowIds).toContain('scrum.sprint-planning');
      expect(workflowIds).toContain('scrum.install-scrum-agents');
      expect(workflowIds).toContain('scrum.setup-agent-configs');
    });
  });
});