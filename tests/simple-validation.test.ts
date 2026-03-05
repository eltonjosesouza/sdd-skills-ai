import fs from 'fs-extra';
import path from 'path';

describe('Static Validation Tests', () => {
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

  it('should have valid configuration structure', () => {
    const { loadConfig } = require('../src/configManager');
    const config = loadConfig();
    
    expect(config).toHaveProperty('specs');
    expect(config).toHaveProperty('tools');
    expect(Array.isArray(config.specs)).toBe(true);
    expect(Array.isArray(config.tools)).toBe(true);
  });
});