import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

describe('Current CLI Validation', () => {
  const cliPath = path.join(__dirname, '../dist/index.js');

  describe('CLI Basic Commands', () => {
    it('should show help', () => {
      try {
        const output = execSync(`node "${cliPath}" --help`, { 
          encoding: 'utf8',
          cwd: __dirname 
        });
        
        expect(output).toContain('Usage:');
        expect(output).toContain('Commands:');
      } catch (error: any) {
        fail(`CLI help command failed: ${error.message}`);
      }
    });

    it('should show version', () => {
      try {
        const output = execSync(`node "${cliPath}" --version`, { 
          encoding: 'utf8',
          cwd: __dirname 
        });
        
        expect(output).toMatch(/\d+\.\d+\.\d+/);
      } catch (error: any) {
        fail(`CLI version command failed: ${error.message}`);
      }
    });

    it('should show stats', () => {
      try {
        const output = execSync(`node "${cliPath}" stats`, { 
          encoding: 'utf8',
          cwd: __dirname 
        });
        
        expect(output).toContain('SDD Skills AI Statistics');
        expect(output).toContain('Supported AI Tools:');
        expect(output).toContain('Scrum Components:');
      } catch (error: any) {
        fail(`CLI stats command failed: ${error.message}`);
      }
    });
  });

  describe('Module Loading', () => {
    it('should load main module without errors', () => {
      expect(() => {
        require('../dist/index.js');
      }).not.toThrow();
    });

    it('should load configManager', () => {
      expect(() => {
        const { loadConfig } = require('../src/configManager');
        expect(typeof loadConfig).toBe('function');
      }).not.toThrow();
    });

    it('should load templates', () => {
      expect(() => {
        const templates = require('../src/templates');
        expect(templates).toBeDefined();
        expect(typeof templates).toBe('object');
      }).not.toThrow();
    });
  });

  describe('Configuration Structure', () => {
    it('should have valid config.json', () => {
      const configPath = path.join(__dirname, '../src/config.json');
      expect(fs.existsSync(configPath)).toBe(true);
      
      const config = fs.readJsonSync(configPath);
      expect(config).toHaveProperty('specs');
      expect(config).toHaveProperty('tools');
      expect(Array.isArray(config.specs)).toBe(true);
      expect(Array.isArray(config.tools)).toBe(true);
    });

    it('should have valid package.json', () => {
      const packagePath = path.join(__dirname, '../package.json');
      expect(fs.existsSync(packagePath)).toBe(true);
      
      const packageJson = fs.readJsonSync(packagePath);
      expect(packageJson).toHaveProperty('name', 'sdd-skills-ai');
      expect(packageJson).toHaveProperty('scripts');
      expect(packageJson).toHaveProperty('dependencies');
      expect(packageJson).toHaveProperty('devDependencies');
    });
  });

  describe('Build Validation', () => {
    it('should have built dist files', () => {
      const distPath = path.join(__dirname, '../dist/index.js');
      expect(fs.existsSync(distPath)).toBe(true);
      
      const stats = fs.statSync(distPath);
      expect(stats.size).toBeGreaterThan(0);
    });

    it('should have reasonable bundle size', () => {
      const distPath = path.join(__dirname, '../dist/index.js');
      const stats = fs.statSync(distPath);
      const sizeKB = stats.size / 1024;
      
      // Should be under 500KB
      expect(sizeKB).toBeLessThan(500);
    });
  });

  describe('Template Validation', () => {
    it('should have all Scrum agent templates', () => {
      const templates = require('../src/templates');
      
      const requiredAgentTemplates = [
        'SCRUM_PRODUCT_OWNER_SKILL',
        'SCRUM_DEVELOPER_SKILL',
        'SCRUM_TECH_LEAD_SKILL',
        'SCRUM_UX_DESIGNER_SKILL',
        'SCRUM_QA_ENGINEER_SKILL',
        'SCRUM_SECURITY_ENGINEER_SKILL',
        'SCRUM_DEVOPS_ENGINEER_SKILL',
        'SCRUM_DATA_LEAD_SKILL',
        'SCRUM_SCRUM_MASTER_SKILL'
      ];

      requiredAgentTemplates.forEach(template => {
        expect(templates[template]).toBeDefined();
        expect(typeof templates[template]).toBe('string');
        expect(templates[template].length).toBeGreaterThan(0);
      });
    });

    it('should have all Scrum skill templates', () => {
      const templates = require('../src/templates');
      
      const requiredSkillTemplates = [
        'SCRUM_SDD_CONTRACT_SKILL',
        'SCRUM_TDD_CYCLE_SKILL',
        'SCRUM_DDD_MODELING_SKILL',
        'SCRUM_TELEMETRY_DESIGN_SKILL',
        'SCRUM_SCRUM_FLOW_SKILL',
        'SCRUM_COMMUNICATION_SKILL',
        'SCRUM_DOD_CHECKLIST_SKILL'
      ];

      requiredSkillTemplates.forEach(template => {
        expect(templates[template]).toBeDefined();
        expect(typeof templates[template]).toBe('string');
        expect(templates[template].length).toBeGreaterThan(0);
      });
    });

    it('should have all Scrum workflow templates', () => {
      const templates = require('../src/templates');
      
      const requiredWorkflowTemplates = [
        'SCRUM_FEATURE_LIFECYCLE_WORKFLOW',
        'SCRUM_SPRINT_PLANNING_WORKFLOW',
        'SCRUM_INSTALL_SCRUM_AGENTS_WORKFLOW',
        'SCRUM_SETUP_AGENT_CONFIGS_WORKFLOW'
      ];

      requiredWorkflowTemplates.forEach(template => {
        expect(templates[template]).toBeDefined();
        expect(typeof templates[template]).toBe('string');
        expect(templates[template].length).toBeGreaterThan(0);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid commands gracefully', () => {
      try {
        execSync(`node "${cliPath}" invalid-command`, { 
          encoding: 'utf8',
          cwd: __dirname 
        });
        fail('Should have thrown an error for invalid command');
      } catch (error: any) {
        expect(error.status).toBe(1);
      }
    });

    it('should handle missing arguments gracefully', () => {
      try {
        execSync(`node "${cliPath}" add-skill`, { 
          encoding: 'utf8',
          cwd: __dirname 
        });
        fail('Should have thrown an error for missing argument');
      } catch (error: any) {
        expect(error.status).toBe(1);
      }
    });
  });
});