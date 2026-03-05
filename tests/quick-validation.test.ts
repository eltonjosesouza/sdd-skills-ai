import { AutocompletionService } from '../../src/services/autocompletion.service';
import { ToolConfigurationService } from '../../src/services/tool-configuration.service';
import { ScrumService } from '../../src/services/scrum.service';
import { InitCommand } from '../../src/commands/init.command';
import { FileUtils, ValidationUtils, StringUtils } from '../../src/utils';

// Mock all external dependencies
jest.mock('prompts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('chalk', () => ({
  blue: jest.fn((text) => text),
  green: jest.fn((text) => text),
  yellow: jest.fn((text) => text),
  white: jest.fn((text) => text),
  cyan: jest.fn((text) => text),
  red: jest.fn((text) => text),
}));

jest.mock('fs-extra', () => ({
  existsSync: jest.fn(),
  ensureDirSync: jest.fn(),
  writeFileSync: jest.fn(),
  readFileSync: jest.fn(),
  removeSync: jest.fn(),
}));

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

jest.mock('../../src/configManager', () => ({
  loadConfig: jest.fn(),
  saveUserConfig: jest.fn(),
}));

jest.mock('../../src/templates', () => ({
  SCRUM_PRODUCT_OWNER_SKILL: 'mock-product-owner-skill',
  SCRUM_DEVELOPER_SKILL: 'mock-developer-skill',
  SCRUM_FEATURE_LIFECYCLE_WORKFLOW: 'mock-workflow',
}));

describe('Quick Validation Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Services Export Validation', () => {
    it('should export AutocompletionService methods', () => {
      expect(AutocompletionService.setup).toBeDefined();
      expect(typeof AutocompletionService.setup).toBe('function');
    });

    it('should export ToolConfigurationService methods', () => {
      expect(ToolConfigurationService.configureTools).toBeDefined();
      expect(ToolConfigurationService.getSupportedToolsCount).toBeDefined();
      expect(ToolConfigurationService.getToolList).toBeDefined();
      expect(typeof ToolConfigurationService.configureTools).toBe('function');
      expect(typeof ToolConfigurationService.getSupportedToolsCount).toBe('function');
      expect(typeof ToolConfigurationService.getToolList).toBe('function');
    });

    it('should export ScrumService methods', () => {
      expect(ScrumService.installScrumAgents).toBeDefined();
      expect(ScrumService.getScrumStats).toBeDefined();
      expect(ScrumService.getScrumComponents).toBeDefined();
      expect(typeof ScrumService.installScrumAgents).toBe('function');
      expect(typeof ScrumService.getScrumStats).toBe('function');
      expect(typeof ScrumService.getScrumComponents).toBe('function');
    });
  });

  describe('Commands Export Validation', () => {
    it('should export InitCommand methods', () => {
      expect(InitCommand.execute).toBeDefined();
      expect(InitCommand.register).toBeDefined();
      expect(typeof InitCommand.execute).toBe('function');
      expect(typeof InitCommand.register).toBe('function');
    });
  });

  describe('Utils Export Validation', () => {
    it('should export FileUtils methods', () => {
      expect(FileUtils.ensureDirectoryExists).toBeDefined();
      expect(FileUtils.writeFile).toBeDefined();
      expect(FileUtils.readFile).toBeDefined();
      expect(FileUtils.fileExists).toBeDefined();
      expect(FileUtils.getProjectPath).toBeDefined();
      expect(typeof FileUtils.ensureDirectoryExists).toBe('function');
      expect(typeof FileUtils.writeFile).toBe('function');
      expect(typeof FileUtils.readFile).toBe('function');
      expect(typeof FileUtils.fileExists).toBe('function');
      expect(typeof FileUtils.getProjectPath).toBe('function');
    });

    it('should export ValidationUtils methods', () => {
      expect(ValidationUtils.isValidUrl).toBeDefined();
      expect(ValidationUtils.isValidGitHubRepo).toBeDefined();
      expect(ValidationUtils.isValidPath).toBeDefined();
      expect(typeof ValidationUtils.isValidUrl).toBe('function');
      expect(typeof ValidationUtils.isValidGitHubRepo).toBe('function');
      expect(typeof ValidationUtils.isValidPath).toBe('function');
    });

    it('should export StringUtils methods', () => {
      expect(StringUtils.kebabCase).toBeDefined();
      expect(StringUtils.camelCase).toBeDefined();
      expect(StringUtils.capitalize).toBeDefined();
      expect(StringUtils.truncate).toBeDefined();
      expect(typeof StringUtils.kebabCase).toBe('function');
      expect(typeof StringUtils.camelCase).toBe('function');
      expect(typeof StringUtils.capitalize).toBe('function');
      expect(typeof StringUtils.truncate).toBe('function');
    });
  });

  describe('Basic Functionality Tests', () => {
    it('should get Scrum stats correctly', () => {
      const stats = ScrumService.getScrumStats();
      expect(stats).toHaveProperty('agentsCount');
      expect(stats).toHaveProperty('skillsCount');
      expect(stats).toHaveProperty('workflowsCount');
      expect(stats).toHaveProperty('totalComponents');
      expect(typeof stats.agentsCount).toBe('number');
      expect(typeof stats.skillsCount).toBe('number');
      expect(typeof stats.workflowsCount).toBe('number');
      expect(typeof stats.totalComponents).toBe('number');
    });

    it('should get Scrum components correctly', () => {
      const components = ScrumService.getScrumComponents();
      expect(components).toHaveProperty('agents');
      expect(components).toHaveProperty('skills');
      expect(components).toHaveProperty('workflows');
      expect(Array.isArray(components.agents)).toBe(true);
      expect(Array.isArray(components.skills)).toBe(true);
      expect(Array.isArray(components.workflows)).toBe(true);
    });

    it('should validate URLs correctly', () => {
      expect(ValidationUtils.isValidUrl('https://example.com')).toBe(true);
      expect(ValidationUtils.isValidUrl('not-a-url')).toBe(false);
    });

    it('should validate GitHub repos correctly', () => {
      expect(ValidationUtils.isValidGitHubRepo('https://github.com/user/repo')).toBe(true);
      expect(ValidationUtils.isValidGitHubRepo('https://gitlab.com/user/repo')).toBe(false);
    });

    it('should convert string cases correctly', () => {
      expect(StringUtils.kebabCase('camelCase')).toBe('camel-case');
      expect(StringUtils.camelCase('kebab-case')).toBe('kebabCase');
      expect(StringUtils.capitalize('hello')).toBe('Hello');
      expect(StringUtils.truncate('long string', 5)).toBe('long...');
    });
  });

  describe('Configuration Validation', () => {
    it('should load configuration without errors', () => {
      const { loadConfig } = require('../../src/configManager');
      expect(() => {
        const config = loadConfig();
        expect(config).toBeDefined();
      }).not.toThrow();
    });

    it('should have valid configuration structure', () => {
      const { loadConfig } = require('../../src/configManager');
      const config = loadConfig();
      
      expect(config).toHaveProperty('specs');
      expect(config).toHaveProperty('tools');
      expect(Array.isArray(config.specs)).toBe(true);
      expect(Array.isArray(config.tools)).toBe(true);
    });
  });

  describe('Template Validation', () => {
    it('should have Scrum templates', () => {
      const templates = require('../../src/templates');
      expect(templates.SCRUM_PRODUCT_OWNER_SKILL).toBeDefined();
      expect(templates.SCRUM_DEVELOPER_SKILL).toBeDefined();
      expect(templates.SCRUM_FEATURE_LIFECYCLE_WORKFLOW).toBeDefined();
      expect(typeof templates.SCRUM_PRODUCT_OWNER_SKILL).toBe('string');
      expect(typeof templates.SCRUM_FEATURE_LIFECYCLE_WORKFLOW).toBe('string');
    });

    it('should have action templates', () => {
      const templates = require('../../src/templates');
      expect(templates.AGENT_INIT_SKILL).toBeDefined();
      expect(templates.AGENT_INIT_WORKFLOW).toBeDefined();
      expect(typeof templates.AGENT_INIT_SKILL).toBe('string');
      expect(typeof templates.AGENT_INIT_WORKFLOW).toBe('string');
    });
  });

  describe('CLI Integration', () => {
    it('should have package.json with correct scripts', () => {
      const packageJson = require('../../package.json');
      expect(packageJson.scripts).toHaveProperty('test');
      expect(packageJson.scripts).toHaveProperty('build');
      expect(packageJson.scripts).toHaveProperty('dev');
    });

    it('should have correct dependencies', () => {
      const packageJson = require('../../package.json');
      expect(packageJson.dependencies).toHaveProperty('chalk');
      expect(packageJson.dependencies).toHaveProperty('commander');
      expect(packageJson.dependencies).toHaveProperty('fs-extra');
      expect(packageJson.dependencies).toHaveProperty('prompts');
    });

    it('should have correct dev dependencies', () => {
      const packageJson = require('../../package.json');
      expect(packageJson.devDependencies).toHaveProperty('jest');
      expect(packageJson.devDependencies).toHaveProperty('ts-jest');
      expect(packageJson.devDependencies).toHaveProperty('typescript');
    });
  });
});