import { InitCommand } from '../../src/commands/init.command';
import { loadConfig } from '../../src/configManager';
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
}));

// Mock child_process
jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

const prompts = require('prompts');
const mockLoadConfig = loadConfig as jest.MockedFunction<typeof loadConfig>;
const execSync = require('child_process').execSync;

describe('InitCommand', () => {
  let tempDir: string;
  let mockConfig: any;

  beforeEach(() => {
    tempDir = createTempDir('init-test');
    jest.clearAllMocks();

    // Mock config with specs
    mockConfig = {
      specs: [
        {
          value: 'spec-kit',
          title: 'Spec-Kit',
          description: 'GitHub spec-driven workflow',
          selected: true,
          commands: [
            {
              cmd: 'git init',
              message: 'Initializing git repository',
              useProjectDir: false
            },
            {
              cmd: 'npm init -y',
              message: 'Initializing package.json',
              useProjectDir: true
            }
          ]
        },
        {
          value: 'openspec',
          title: 'OpenSpec',
          description: 'Open spec-driven workflow',
          selected: false,
          commands: [
            {
              cmd: 'touch spec.md',
              message: 'Creating spec.md',
              useProjectDir: true
            }
          ]
        }
      ]
    };

    mockLoadConfig.mockReturnValue(mockConfig);
  });

  afterEach(() => {
    cleanupTempDir(tempDir);
  });

  describe('execute', () => {
    it('should initialize selected specs successfully', async () => {
      // Mock prompts to select spec-kit
      prompts.mockResolvedValueOnce({ specs: ['spec-kit'] });

      const result = await InitCommand.execute({ projectDirectory: tempDir });

      expect(result).toBe(true);
      expect(prompts).toHaveBeenCalledTimes(1);
      expect(execSync).toHaveBeenCalledWith('git init', { stdio: 'inherit' });
      expect(execSync).toHaveBeenCalledWith('npm init -y', { cwd: tempDir, stdio: 'inherit' });
    });

    it('should initialize multiple specs successfully', async () => {
      prompts.mockResolvedValueOnce({ specs: ['spec-kit', 'openspec'] });

      const result = await InitCommand.execute({ projectDirectory: tempDir });

      expect(result).toBe(true);
      expect(execSync).toHaveBeenCalledTimes(3);
      expect(execSync).toHaveBeenCalledWith('git init', { stdio: 'inherit' });
      expect(execSync).toHaveBeenCalledWith('npm init -y', { cwd: tempDir, stdio: 'inherit' });
      expect(execSync).toHaveBeenCalledWith('touch spec.md', { cwd: tempDir, stdio: 'inherit' });
    });

    it('should return success when no specs selected', async () => {
      prompts.mockResolvedValueOnce({ specs: [] });

      const result = await InitCommand.execute({ projectDirectory: tempDir });

      expect(result).toBe(true);
      expect(execSync).not.toHaveBeenCalled();
    });

    it('should return success when user cancels selection', async () => {
      prompts.mockResolvedValueOnce({ specs: null });

      const result = await InitCommand.execute({ projectDirectory: tempDir });

      expect(result).toBe(true);
      expect(execSync).not.toHaveBeenCalled();
    });

    it('should handle errors during spec execution', async () => {
      prompts.mockResolvedValueOnce({ specs: ['spec-kit'] });

      // Mock execSync to throw an error
      execSync.mockImplementation(() => {
        throw new Error('Command failed');
      });

      const result = await InitCommand.execute({ projectDirectory: tempDir });

      expect(result).toBe(false);
    });

    it('should use current directory when no project directory provided', async () => {
      prompts.mockResolvedValueOnce({ specs: ['spec-kit'] });

      // Mock process.cwd to return temp directory
      const originalCwd = process.cwd;
      process.cwd = jest.fn(() => tempDir);

      const result = await InitCommand.execute();

      expect(result).toBe(true);
      expect(execSync).toHaveBeenCalledWith('npm init -y', { cwd: tempDir, stdio: 'inherit' });

      // Restore original function
      process.cwd = originalCwd;
    });

    it('should resolve relative project directory correctly', async () => {
      prompts.mockResolvedValueOnce({ specs: ['spec-kit'] });

      // Mock process.cwd to return parent directory
      const originalCwd = process.cwd;
      process.cwd = jest.fn(() => path.dirname(tempDir));

      const result = await InitCommand.execute({ projectDirectory: path.basename(tempDir) });

      expect(result).toBe(true);
      expect(execSync).toHaveBeenCalledWith('npm init -y', { cwd: tempDir, stdio: 'inherit' });

      // Restore original function
      process.cwd = originalCwd;
    });

    it('should handle config loading errors', async () => {
      mockLoadConfig.mockImplementation(() => {
        throw new Error('Config load failed');
      });

      prompts.mockResolvedValueOnce({ specs: ['spec-kit'] });

      const result = await InitCommand.execute({ projectDirectory: tempDir });

      expect(result).toBe(false);
    });

    it('should execute commands with correct working directory', async () => {
      prompts.mockResolvedValueOnce({ specs: ['spec-kit', 'openspec'] });

      const result = await InitCommand.execute({ projectDirectory: tempDir });

      expect(result).toBe(true);
      
      // Check that commands with useProjectDir: true use the correct cwd
      expect(execSync).toHaveBeenCalledWith('npm init -y', { cwd: tempDir, stdio: 'inherit' });
      expect(execSync).toHaveBeenCalledWith('touch spec.md', { cwd: tempDir, stdio: 'inherit' });
      
      // Check that commands with useProjectDir: false don't specify cwd
      expect(execSync).toHaveBeenCalledWith('git init', { stdio: 'inherit' });
    });
  });

  describe('edge cases', () => {
    it('should handle empty config specs array', async () => {
      mockConfig.specs = [];
      prompts.mockResolvedValueOnce({ specs: [] });

      const result = await InitCommand.execute({ projectDirectory: tempDir });

      expect(result).toBe(true);
      expect(prompts).toHaveBeenCalledTimes(1);
    });

    it('should handle specs with no commands', async () => {
      mockConfig.specs = [
        {
          value: 'empty-spec',
          title: 'Empty Spec',
          description: 'Spec with no commands',
          selected: false,
          commands: []
        }
      ];
      prompts.mockResolvedValueOnce({ specs: ['empty-spec'] });

      const result = await InitCommand.execute({ projectDirectory: tempDir });

      expect(result).toBe(true);
      expect(execSync).not.toHaveBeenCalled();
    });

    it('should handle spec that is not found in config', async () => {
      prompts.mockResolvedValueOnce({ specs: ['non-existent-spec'] });

      const result = await InitCommand.execute({ projectDirectory: tempDir });

      expect(result).toBe(true);
      expect(execSync).not.toHaveBeenCalled();
    });
  });
});