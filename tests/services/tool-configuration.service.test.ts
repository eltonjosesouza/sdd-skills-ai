import { ToolConfigurationService } from '../../src/services/tool-configuration.service';
import { loadConfig, saveUserConfig } from '../../src/configManager';
import fs from 'fs-extra';
import path from 'path';
import { createTempDir, cleanupTempDir } from '../setup';

// Mock prompts
jest.mock('prompts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock chalk
jest.mock('chalk', () => ({
  blue: jest.fn((text) => text),
  green: jest.fn((text) => text),
  yellow: jest.fn((text) => text),
  white: jest.fn((text) => text),
  cyan: jest.fn((text) => text),
  red: jest.fn((text) => text),
}));

// Mock configManager
jest.mock('../../src/configManager', () => ({
  loadConfig: jest.fn(),
  saveUserConfig: jest.fn(),
}));

const prompts = require('prompts');
const mockLoadConfig = loadConfig as jest.MockedFunction<typeof loadConfig>;
const mockSaveUserConfig = saveUserConfig as jest.MockedFunction<typeof saveUserConfig>;

describe('ToolConfigurationService', () => {
  let tempDir: string;
  let mockConfig: any;

  beforeEach(() => {
    tempDir = createTempDir('tool-config-test');
    jest.clearAllMocks();

    // Mock config with tools
    mockConfig = {
      tools: [
        {
          value: 'claude',
          title: 'Claude Code',
          description: 'Anthropic Claude Code Assistant',
          selected: false,
          paths: {
            skills: '.claude/skills',
            workflows: '.claude/workflows',
            config: '.claude/config'
          }
        },
        {
          value: 'cursor',
          title: 'Cursor',
          description: 'Cursor AI Editor',
          selected: true,
          paths: {
            skills: '.cursor/skills',
            workflows: '.cursor/workflows',
            config: '.cursor/config'
          }
        },
        {
          value: 'windsurf',
          title: 'Windsurf',
          description: 'Windsurf AI Assistant',
          selected: false,
          paths: {
            skills: '.agent/skills',
            workflows: '.agent/workflows',
            config: '.agent/config'
          }
        }
      ]
    };

    mockLoadConfig.mockReturnValue(mockConfig);
  });

  afterEach(() => {
    cleanupTempDir(tempDir);
  });

  describe('configureTools', () => {
    it('should configure selected tools successfully', async () => {
      // Mock prompts to select claude and windsurf
      prompts.mockResolvedValueOnce({ tools: ['claude', 'windsurf'] });

      const result = await ToolConfigurationService.configureTools(tempDir);

      expect(result.success).toBe(true);
      expect(result.selectedTools).toEqual(['claude', 'windsurf']);
      expect(result.createdDirectories).toContain('.claude/skills');
      expect(result.createdDirectories).toContain('.claude/workflows');
      expect(result.createdDirectories).toContain('.claude/config');
      expect(result.createdDirectories).toContain('.agent/skills');
      expect(result.createdDirectories).toContain('.agent/workflows');
      expect(result.createdDirectories).toContain('.agent/config');

      // Verify directories were created
      expect(fs.existsSync(path.join(tempDir, '.claude', 'skills'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.claude', 'workflows'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.claude', 'config'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'skills'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'workflows'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.agent', 'config'))).toBe(true);

      // Verify saveUserConfig was called
      expect(mockSaveUserConfig).toHaveBeenCalledWith({
        tools: expect.arrayContaining([
          expect.objectContaining({ value: 'claude', selected: true }),
          expect.objectContaining({ value: 'cursor', selected: false }),
          expect.objectContaining({ value: 'windsurf', selected: true })
        ])
      });
    });

    it('should return success with empty selection when no tools selected', async () => {
      prompts.mockResolvedValueOnce({ tools: [] });

      const result = await ToolConfigurationService.configureTools(tempDir);

      expect(result.success).toBe(true);
      expect(result.selectedTools).toEqual([]);
      expect(result.createdDirectories).toEqual([]);
    });

    it('should return success when user cancels selection', async () => {
      prompts.mockResolvedValueOnce({ tools: null });

      const result = await ToolConfigurationService.configureTools(tempDir);

      expect(result.success).toBe(true);
      expect(result.selectedTools).toEqual([]);
      expect(result.createdDirectories).toEqual([]);
    });

    it('should handle errors during directory creation', async () => {
      prompts.mockResolvedValueOnce({ tools: ['claude'] });

      // Mock fs.ensureDirSync to throw an error
      const originalEnsureDirSync = fs.ensureDirSync;
      fs.ensureDirSync = jest.fn(() => {
        throw new Error('Permission denied');
      });

      const result = await ToolConfigurationService.configureTools(tempDir);

      expect(result.success).toBe(false);
      expect(result.selectedTools).toEqual([]);
      expect(result.createdDirectories).toEqual([]);

      // Restore original function
      fs.ensureDirSync = originalEnsureDirSync;
    });

    it('should use current directory when no project directory provided', async () => {
      prompts.mockResolvedValueOnce({ tools: ['claude'] });

      // Mock process.cwd to return temp directory
      const originalCwd = process.cwd;
      process.cwd = jest.fn(() => tempDir);

      const result = await ToolConfigurationService.configureTools();

      expect(result.success).toBe(true);
      expect(fs.existsSync(path.join(tempDir, '.claude', 'skills'))).toBe(true);

      // Restore original function
      process.cwd = originalCwd;
    });
  });

  describe('getSupportedToolsCount', () => {
    it('should return correct number of supported tools', () => {
      const count = ToolConfigurationService.getSupportedToolsCount();
      expect(count).toBe(3);
    });
  });

  describe('getToolList', () => {
    it('should return list of tools with correct format', () => {
      const toolList = ToolConfigurationService.getToolList();
      
      expect(toolList).toHaveLength(3);
      expect(toolList[0]).toEqual({
        value: 'claude',
        title: 'Claude Code',
        description: 'Anthropic Claude Code Assistant'
      });
      expect(toolList[1]).toEqual({
        value: 'cursor',
        title: 'Cursor',
        description: 'Cursor AI Editor'
      });
      expect(toolList[2]).toEqual({
        value: 'windsurf',
        title: 'Windsurf',
        description: 'Windsurf AI Assistant'
      });
    });
  });

  describe('error handling', () => {
    it('should handle loadConfig errors', async () => {
      mockLoadConfig.mockImplementation(() => {
        throw new Error('Config load failed');
      });

      prompts.mockResolvedValueOnce({ tools: ['claude'] });

      const result = await ToolConfigurationService.configureTools(tempDir);

      expect(result.success).toBe(false);
    });

    it('should handle saveUserConfig errors', async () => {
      prompts.mockResolvedValueOnce({ tools: ['claude'] });
      mockSaveUserConfig.mockImplementation(() => {
        throw new Error('Config save failed');
      });

      const result = await ToolConfigurationService.configureTools(tempDir);

      expect(result.success).toBe(false);
    });
  });
});