import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { createTempDir, cleanupTempDir } from '../setup';

describe('Integration Tests', () => {
  let tempDir: string;
  let cliPath: string;

  beforeEach(() => {
    tempDir = createTempDir('integration-test');
    cliPath = path.join(__dirname, '../../dist/index.js');
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupTempDir(tempDir);
  });

  describe('CLI Commands Integration', () => {
    it('should show help information', () => {
      try {
        const output = execSync(`node "${cliPath}" --help`, { 
          encoding: 'utf8',
          cwd: tempDir 
        });
        
        expect(output).toContain('Usage:');
        expect(output).toContain('Commands:');
        expect(output).toContain('wizard');
        expect(output).toContain('init');
        expect(output).toContain('configure-tools');
        expect(output).toContain('install-scrum');
        expect(output).toContain('completion');
      } catch (error) {
        fail(`CLI help command failed: ${error}`);
      }
    });

    it('should show version information', () => {
      try {
        const output = execSync(`node "${cliPath}" --version`, { 
          encoding: 'utf8',
          cwd: tempDir 
        });
        
        expect(output).toMatch(/\d+\.\d+\.\d+/); // Version number pattern
      } catch (error) {
        fail(`CLI version command failed: ${error}`);
      }
    });

    it('should show statistics', () => {
      try {
        const output = execSync(`node "${cliPath}" stats`, { 
          encoding: 'utf8',
          cwd: tempDir 
        });
        
        expect(output).toContain('SDD Skills AI Statistics');
        expect(output).toContain('Supported AI Tools:');
        expect(output).toContain('Scrum Components:');
        expect(output).toContain('Agents:');
        expect(output).toContain('Skills:');
        expect(output).toContain('Workflows:');
      } catch (error) {
        fail(`CLI stats command failed: ${error}`);
      }
    });
  });

  describe('Service Integration', () => {
    it('should validate all services are properly exported', () => {
      const { AutocompletionService } = require('../../src/services/autocompletion.service');
      const { ToolConfigurationService } = require('../../src/services/tool-configuration.service');
      const { ScrumService } = require('../../src/services/scrum.service');

      expect(AutocompletionService).toBeDefined();
      expect(AutocompletionService.setup).toBeDefined();

      expect(ToolConfigurationService).toBeDefined();
      expect(ToolConfigurationService.configureTools).toBeDefined();
      expect(ToolConfigurationService.getSupportedToolsCount).toBeDefined();
      expect(ToolConfigurationService.getToolList).toBeDefined();

      expect(ScrumService).toBeDefined();
      expect(ScrumService.installScrumAgents).toBeDefined();
      expect(ScrumService.getScrumStats).toBeDefined();
      expect(ScrumService.getScrumComponents).toBeDefined();
    });

    it('should validate all commands are properly exported', () => {
      const { InitCommand } = require('../../src/commands/init.command');
      const { WizardCommand } = require('../../src/commands/wizard.command');

      expect(InitCommand).toBeDefined();
      expect(InitCommand.execute).toBeDefined();
      expect(InitCommand.register).toBeDefined();

      expect(WizardCommand).toBeDefined();
      expect(WizardCommand.execute).toBeDefined();
      expect(WizardCommand.register).toBeDefined();
    });

    it('should validate all utilities are properly exported', () => {
      const utils = require('../../src/utils');

      expect(utils.FileUtils).toBeDefined();
      expect(utils.ValidationUtils).toBeDefined();
      expect(utils.StringUtils).toBeDefined();
      expect(utils.ColorUtils).toBeDefined();

      expect(utils.FileUtils.ensureDirectoryExists).toBeDefined();
      expect(utils.FileUtils.writeFile).toBeDefined();
      expect(utils.FileUtils.readFile).toBeDefined();
      expect(utils.ValidationUtils.isValidUrl).toBeDefined();
      expect(utils.StringUtils.kebabCase).toBeDefined();
      expect(utils.ColorUtils.getSuccessColor).toBeDefined();
    });
  });

  describe('Configuration Integration', () => {
    it('should load default configuration', () => {
      const { loadConfig } = require('../../src/configManager');
      
      expect(() => {
        const config = loadConfig();
        expect(config).toBeDefined();
        expect(config.specs).toBeDefined();
        expect(config.tools).toBeDefined();
        expect(Array.isArray(config.specs)).toBe(true);
        expect(Array.isArray(config.tools)).toBe(true);
      }).not.toThrow();
    });

    it('should have valid spec configurations', () => {
      const { loadConfig } = require('../../src/configManager');
      const config = loadConfig();

      config.specs.forEach((spec: any) => {
        expect(spec).toHaveProperty('value');
        expect(spec).toHaveProperty('title');
        expect(spec).toHaveProperty('description');
        expect(spec).toHaveProperty('selected');
        expect(spec).toHaveProperty('commands');
        expect(Array.isArray(spec.commands)).toBe(true);
      });
    });

    it('should have valid tool configurations', () => {
      const { loadConfig } = require('../../src/configManager');
      const config = loadConfig();

      config.tools.forEach((tool: any) => {
        expect(tool).toHaveProperty('value');
        expect(tool).toHaveProperty('title');
        expect(tool).toHaveProperty('description');
        expect(tool).toHaveProperty('selected');
        expect(tool).toHaveProperty('paths');
        expect(tool.paths).toHaveProperty('skills');
        expect(tool.paths).toHaveProperty('workflows');
        expect(tool.paths).toHaveProperty('config');
      });
    });
  });

  describe('Template Integration', () => {
    it('should have all required Scrum templates', () => {
      const templates = require('../../src/templates');
      
      // Check for agent templates
      expect(templates.SCRUM_PRODUCT_OWNER_SKILL).toBeDefined();
      expect(templates.SCRUM_DEVELOPER_SKILL).toBeDefined();
      expect(templates.SCRUM_TECH_LEAD_SKILL).toBeDefined();

      // Check for skill templates
      expect(templates.SCRUM_SDD_CONTRACT_SKILL).toBeDefined();
      expect(templates.SCRUM_TDD_CYCLE_SKILL).toBeDefined();
      expect(templates.SCRUM_DDD_MODELING_SKILL).toBeDefined();

      // Check for workflow templates
      expect(templates.SCRUM_FEATURE_LIFECYCLE_WORKFLOW).toBeDefined();
      expect(templates.SCRUM_SPRINT_PLANNING_WORKFLOW).toBeDefined();

      // Verify templates are strings
      expect(typeof templates.SCRUM_PRODUCT_OWNER_SKILL).toBe('string');
      expect(typeof templates.SCRUM_FEATURE_LIFECYCLE_WORKFLOW).toBe('string');
    });

    it('should have all required action templates', () => {
      const templates = require('../../src/templates');
      
      expect(templates.AGENT_INIT_SKILL).toBeDefined();
      expect(templates.AGENT_INIT_WORKFLOW).toBeDefined();
      expect(templates.AGENTS_MD_SPECIALIST_SKILL).toBeDefined();
      expect(templates.CLAUDE_MD_SPECIALIST_SKILL).toBeDefined();
      expect(templates.AGENTS_CLAUDE_SYNC_WORKFLOW).toBeDefined();

      // Verify templates are strings
      expect(typeof templates.AGENT_INIT_SKILL).toBe('string');
      expect(typeof templates.AGENT_INIT_WORKFLOW).toBe('string');
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle invalid commands gracefully', () => {
      try {
        execSync(`node "${cliPath}" invalid-command`, { 
          encoding: 'utf8',
          cwd: tempDir 
        });
        fail('Should have thrown an error for invalid command');
      } catch (error: any) {
        expect(error.status).toBe(1);
        expect(error.stdout || error.stderr).toContain('error');
      }
    });

    it('should handle missing arguments gracefully', () => {
      try {
        execSync(`node "${cliPath}" add-skill`, { 
          encoding: 'utf8',
          cwd: tempDir 
        });
        fail('Should have thrown an error for missing argument');
      } catch (error: any) {
        expect(error.status).toBe(1);
      }
    });
  });

  describe('Performance Integration', () => {
    it('should load all modules within reasonable time', () => {
      const startTime = Date.now();
      
      // Load all major modules
      require('../../src/services/autocompletion.service');
      require('../../src/services/tool-configuration.service');
      require('../../src/services/scrum.service');
      require('../../src/commands/init.command');
      require('../../src/commands/wizard.command');
      require('../../src/utils');
      require('../../src/configManager');
      require('../../src/templates');
      
      const endTime = Date.now();
      const loadTime = endTime - startTime;
      
      // Should load within 1 second (very generous limit)
      expect(loadTime).toBeLessThan(1000);
    });

    it('should have reasonable bundle size', () => {
      const distPath = path.join(__dirname, '../../dist/index.js');
      const stats = fs.statSync(distPath);
      const sizeKB = stats.size / 1024;
      
      // Should be under 500KB (very generous limit)
      expect(sizeKB).toBeLessThan(500);
    });
  });
});