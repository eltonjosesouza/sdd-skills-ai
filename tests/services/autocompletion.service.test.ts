import { AutocompletionService } from '../../src/services/autocompletion.service';
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

// Mock execSync
jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

const prompts = require('prompts');
const execSync = require('child_process').execSync;

describe('AutocompletionService', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = createTempDir('autocompletion-test');
    jest.clearAllMocks();
    prompts.mockReset();
  });

  afterEach(() => {
    cleanupTempDir(tempDir);
  });

  describe('setup', () => {
    it('should setup bash autocompletion successfully', async () => {
      // Mock prompts to select bash and confirm installation
      prompts.mockResolvedValue({ shell: 'bash' });
      prompts.mockResolvedValue({ install: true });

      // Mock execSync for PowerShell profile check
      execSync.mockReturnValue('C:\\Users\\test\\Documents\\WindowsPowerShell\\Microsoft.PowerShell_profile.ps1');

      const result = await AutocompletionService.setup();

      expect(result).toBe(true);
      expect(prompts).toHaveBeenCalledTimes(2);
    });

    it('should setup zsh autocompletion successfully', async () => {
      prompts.mockResolvedValue({ shell: 'zsh' });
      prompts.mockResolvedValue({ install: true });

      const result = await AutocompletionService.setup();

      expect(result).toBe(true);
      expect(prompts).toHaveBeenCalledTimes(2);
    });

    it('should setup windows autocompletion successfully', async () => {
      prompts.mockResolvedValue({ shell: 'windows' });
      prompts.mockResolvedValue({ install: true });

      const result = await AutocompletionService.setup();

      expect(result).toBe(true);
      expect(prompts).toHaveBeenCalledTimes(2);
    });

    it('should skip when user cancels shell selection', async () => {
      prompts.mockResolvedValue({ shell: null });

      const result = await AutocompletionService.setup();

      expect(result).toBe(true);
      expect(prompts).toHaveBeenCalledTimes(1);
    });

    it('should skip when user declines installation', async () => {
      prompts.mockResolvedValue({ shell: 'bash' });
      prompts.mockResolvedValue({ install: false });

      const result = await AutocompletionService.setup();

      expect(result).toBe(true);
      expect(prompts).toHaveBeenCalledTimes(2);
    });

    it('should handle errors gracefully', async () => {
      prompts.mockResolvedValue({ shell: 'bash' });
      prompts.mockResolvedValue({ install: true });

      // Mock fs.writeFileSync to throw an error
      const originalWriteFileSync = fs.writeFileSync;
      fs.writeFileSync = jest.fn(() => {
        throw new Error('Permission denied');
      });

      const result = await AutocompletionService.setup();

      expect(result).toBe(false);

      // Restore original function
      fs.writeFileSync = originalWriteFileSync;
    });

    it('should create completion script in correct file', async () => {
      prompts.mockResolvedValue({ shell: 'bash' });
      prompts.mockResolvedValue({ install: true });

      const bashrcPath = path.join(tempDir, '.bashrc');

      // Mock os.homedir to return temp directory
      const originalHomedir = require('os').homedir;
      require('os').homedir = jest.fn(() => tempDir);

      await AutocompletionService.setup();

      // Check if bashrc was created and contains completion script
      expect(fs.existsSync(bashrcPath)).toBe(true);
      const content = fs.readFileSync(bashrcPath, 'utf8');
      expect(content).toContain('_sdd_skills_ai_completion');
      expect(content).toContain('complete -F _sdd_skills_ai_completion sdd-skills-ai');

      // Restore original function
      require('os').homedir = originalHomedir;
    });

    it('should update existing completion script', async () => {
      prompts.mockResolvedValue({ shell: 'bash' });
      prompts.mockResolvedValue({ install: true });

      const bashrcPath = path.join(tempDir, '.bashrc');

      // Create existing bashrc with old completion
      fs.writeFileSync(bashrcPath, '# Existing content\n# SDD Skills AI completion\n_old_script_\n');

      // Mock os.homedir
      const originalHomedir = require('os').homedir;
      require('os').homedir = jest.fn(() => tempDir);

      await AutocompletionService.setup();

      const content = fs.readFileSync(bashrcPath, 'utf8');
      expect(content).not.toContain('_old_script_');
      expect(content).toContain('_sdd_skills_ai_completion');

      // Restore original function
      require('os').homedir = originalHomedir;
    });
  });

  describe('shell detection', () => {
    it('should detect bash shell correctly', () => {
      const originalShell = process.env.SHELL;
      process.env.SHELL = '/bin/bash';

      // Access private method through reflection for testing
      const detectShellType = (AutocompletionService as any).detectShellType();
      expect(detectShellType).toBe('bash');

      process.env.SHELL = originalShell;
    });

    it('should detect zsh shell correctly', () => {
      const originalShell = process.env.SHELL;
      process.env.SHELL = '/bin/zsh';

      const detectShellType = (AutocompletionService as any).detectShellType();
      expect(detectShellType).toBe('zsh');

      process.env.SHELL = originalShell;
    });

    it('should detect windows platform correctly', () => {
      const originalPlatform = process.platform;
      Object.defineProperty(process, 'platform', { value: 'win32' });

      const detectShellType = (AutocompletionService as any).detectShellType();
      expect(detectShellType).toBe('windows');

      Object.defineProperty(process, 'platform', { value: originalPlatform });
    });

    it('should return unknown for unrecognized shell', () => {
      const originalShell = process.env.SHELL;
      process.env.SHELL = '/bin/fish';

      const detectShellType = (AutocompletionService as any).detectShellType();
      expect(detectShellType).toBe('unknown');

      process.env.SHELL = originalShell;
    });
  });
});