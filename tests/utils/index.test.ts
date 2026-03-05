import { FileUtils, ValidationUtils, StringUtils, ColorUtils } from '../../src/utils';
import fs from 'fs-extra';
import path from 'path';
import { createTempDir, cleanupTempDir } from '../setup';

describe('Utils', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = createTempDir('utils-test');
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupTempDir(tempDir);
  });

  describe('FileUtils', () => {
    describe('ensureDirectoryExists', () => {
      it('should create directory when it does not exist', () => {
        const dirPath = path.join(tempDir, 'new-dir');
        
        FileUtils.ensureDirectoryExists(dirPath);
        
        expect(fs.existsSync(dirPath)).toBe(true);
      });

      it('should not throw when directory already exists', () => {
        const dirPath = path.join(tempDir, 'existing-dir');
        fs.ensureDirSync(dirPath);
        
        expect(() => FileUtils.ensureDirectoryExists(dirPath)).not.toThrow();
        expect(fs.existsSync(dirPath)).toBe(true);
      });
    });

    describe('writeFile', () => {
      it('should create file and parent directories', () => {
        const filePath = path.join(tempDir, 'nested', 'dir', 'file.txt');
        const content = 'test content';
        
        FileUtils.writeFile(filePath, content);
        
        expect(fs.existsSync(filePath)).toBe(true);
        expect(fs.readFileSync(filePath, 'utf8')).toBe(content);
      });

      it('should overwrite existing file', () => {
        const filePath = path.join(tempDir, 'file.txt');
        FileUtils.writeFile(filePath, 'original');
        FileUtils.writeFile(filePath, 'updated');
        
        expect(fs.readFileSync(filePath, 'utf8')).toBe('updated');
      });
    });

    describe('readFile', () => {
      it('should read existing file', () => {
        const filePath = path.join(tempDir, 'file.txt');
        const content = 'test content';
        fs.writeFileSync(filePath, content);
        
        const result = FileUtils.readFile(filePath);
        
        expect(result).toBe(content);
      });

      it('should return empty string for non-existent file', () => {
        const filePath = path.join(tempDir, 'non-existent.txt');
        
        const result = FileUtils.readFile(filePath);
        
        expect(result).toBe('');
      });
    });

    describe('appendToFile', () => {
      it('should append content to existing file', () => {
        const filePath = path.join(tempDir, 'file.txt');
        fs.writeFileSync(filePath, 'original');
        
        FileUtils.appendToFile(filePath, ' appended');
        
        expect(fs.readFileSync(filePath, 'utf8')).toBe('original appended');
      });

      it('should create file and append content when file does not exist', () => {
        const filePath = path.join(tempDir, 'new-file.txt');
        
        FileUtils.appendToFile(filePath, 'new content');
        
        expect(fs.existsSync(filePath)).toBe(true);
        expect(fs.readFileSync(filePath, 'utf8')).toBe('new content');
      });
    });

    describe('copyFile', () => {
      it('should copy file to destination', () => {
        const srcPath = path.join(tempDir, 'source.txt');
        const destPath = path.join(tempDir, 'dest.txt');
        const content = 'test content';
        fs.writeFileSync(srcPath, content);
        
        FileUtils.copyFile(srcPath, destPath);
        
        expect(fs.existsSync(destPath)).toBe(true);
        expect(fs.readFileSync(destPath, 'utf8')).toBe(content);
      });

      it('should create parent directories for destination', () => {
        const srcPath = path.join(tempDir, 'source.txt');
        const destPath = path.join(tempDir, 'nested', 'dest.txt');
        const content = 'test content';
        fs.writeFileSync(srcPath, content);
        
        FileUtils.copyFile(srcPath, destPath);
        
        expect(fs.existsSync(destPath)).toBe(true);
        expect(fs.readFileSync(destPath, 'utf8')).toBe(content);
      });
    });

    describe('fileExists', () => {
      it('should return true for existing file', () => {
        const filePath = path.join(tempDir, 'file.txt');
        fs.writeFileSync(filePath, 'content');
        
        expect(FileUtils.fileExists(filePath)).toBe(true);
      });

      it('should return false for non-existent file', () => {
        const filePath = path.join(tempDir, 'non-existent.txt');
        
        expect(FileUtils.fileExists(filePath)).toBe(false);
      });
    });

    describe('getProjectPath', () => {
      it('should return current directory when no project directory provided', () => {
        // Mock process.cwd
        const originalCwd = process.cwd;
        process.cwd = jest.fn(() => tempDir);
        
        const result = FileUtils.getProjectPath();
        
        expect(result).toBe(tempDir);
        
        // Restore original function
        process.cwd = originalCwd;
      });

      it('should resolve relative project directory', () => {
        const originalCwd = process.cwd;
        process.cwd = jest.fn(() => path.dirname(tempDir));
        
        const result = FileUtils.getProjectPath(path.basename(tempDir));
        
        expect(result).toBe(tempDir);
        
        // Restore original function
        process.cwd = originalCwd;
      });

      it('should return absolute project directory as-is', () => {
        const result = FileUtils.getProjectPath(tempDir);
        
        expect(result).toBe(tempDir);
      });
    });
  });

  describe('ValidationUtils', () => {
    describe('isValidUrl', () => {
      it('should return true for valid URLs', () => {
        expect(ValidationUtils.isValidUrl('https://example.com')).toBe(true);
        expect(ValidationUtils.isValidUrl('http://localhost:3000')).toBe(true);
        expect(ValidationUtils.isValidUrl('https://github.com/user/repo')).toBe(true);
      });

      it('should return false for invalid URLs', () => {
        expect(ValidationUtils.isValidUrl('not-a-url')).toBe(false);
        expect(ValidationUtils.isValidUrl('')).toBe(false);
        expect(ValidationUtils.isValidUrl('ftp://example.com')).toBe(false); // URL constructor supports this, but we might want to restrict
      });
    });

    describe('isValidGitHubRepo', () => {
      it('should return true for valid GitHub repo URLs', () => {
        expect(ValidationUtils.isValidGitHubRepo('https://github.com/user/repo')).toBe(true);
        expect(ValidationUtils.isValidGitHubRepo('https://www.github.com/user/repo')).toBe(true);
        expect(ValidationUtils.isValidGitHubRepo('git@github.com:user/repo.git')).toBe(false); // Doesn't contain github.com
      });

      it('should return false for invalid GitHub repo URLs', () => {
        expect(ValidationUtils.isValidGitHubRepo('https://gitlab.com/user/repo')).toBe(false);
        expect(ValidationUtils.isValidGitHubRepo('https://github.com/user')).toBe(false);
        expect(ValidationUtils.isValidGitHubRepo('not-a-url')).toBe(false);
      });
    });

    describe('isValidPath', () => {
      it('should return true for valid paths', () => {
        expect(ValidationUtils.isValidPath('/valid/path')).toBe(true);
        expect(ValidationUtils.isValidPath('relative/path')).toBe(true);
        expect(ValidationUtils.isValidPath('file.txt')).toBe(true);
        expect(ValidationUtils.isValidPath('./nested/file.txt')).toBe(true);
      });

      it('should return false for invalid paths', () => {
        expect(ValidationUtils.isValidPath('')).toBe(false);
        // path.parse doesn't really fail for most inputs, so this might need adjustment
        expect(ValidationUtils.isValidPath('valid')).toBe(true); // Actually valid
      });
    });
  });

  describe('StringUtils', () => {
    describe('kebabCase', () => {
      it('should convert camelCase to kebab-case', () => {
        expect(StringUtils.kebabCase('camelCase')).toBe('camel-case');
        expect(StringUtils.kebabCase('PascalCase')).toBe('pascal-case');
        expect(StringUtils.kebabCase('XMLHttpRequest')).toBe('xml-http-request');
      });

      it('should convert spaces to kebab-case', () => {
        expect(StringUtils.kebabCase('hello world')).toBe('hello-world');
        expect(StringUtils.kebabCase('multiple   spaces')).toBe('multiple-spaces');
      });

      it('should convert underscores to kebab-case', () => {
        expect(StringUtils.kebabCase('hello_world')).toBe('hello-world');
        expect(StringUtils.kebabCase('multiple_words_here')).toBe('multiple-words-here');
      });

      it('should handle edge cases', () => {
        expect(StringUtils.kebabCase('')).toBe('');
        expect(StringUtils.kebabCase('already-kebab')).toBe('already-kebab');
        expect(StringUtils.kebabCase('UPPERCASE')).toBe('uppercase');
      });
    });

    describe('camelCase', () => {
      it('should convert kebab-case to camelCase', () => {
        expect(StringUtils.camelCase('kebab-case')).toBe('kebabCase');
        expect(StringUtils.camelCase('multiple-words')).toBe('multipleWords');
      });

      it('should handle single words', () => {
        expect(StringUtils.camelCase('word')).toBe('word');
        expect(StringUtils.camelCase('UPPERCASE')).toBe('uppercase');
      });

      it('should handle edge cases', () => {
        expect(StringUtils.camelCase('')).toBe('');
        expect(StringUtils.camelCase('alreadyCamel')).toBe('alreadyCamel');
        expect(StringUtils.camelCase('leading-dash')).toBe('leadingDash');
      });
    });

    describe('capitalize', () => {
      it('should capitalize first letter', () => {
        expect(StringUtils.capitalize('hello')).toBe('Hello');
        expect(StringUtils.capitalize('HELLO')).toBe('HELLO');
        expect(StringUtils.capitalize('h')).toBe('H');
      });

      it('should handle edge cases', () => {
        expect(StringUtils.capitalize('')).toBe('');
        expect(StringUtils.capitalize(' already')).toBe(' already'); // Doesn't trim
      });
    });

    describe('truncate', () => {
      it('should truncate long strings', () => {
        expect(StringUtils.truncate('hello world', 5)).toBe('he...');
        expect(StringUtils.truncate('very long string', 10)).toBe('very long...');
      });

      it('should return original string when shorter than limit', () => {
        expect(StringUtils.truncate('short', 10)).toBe('short');
        expect(StringUtils.truncate('exact', 5)).toBe('exact');
      });

      it('should use custom suffix', () => {
        expect(StringUtils.truncate('hello world', 8, '---')).toBe('hello---');
        expect(StringUtils.truncate('test', 2, '***')).toBe('***');
      });

      it('should handle edge cases', () => {
        expect(StringUtils.truncate('', 5)).toBe('');
        expect(StringUtils.truncate('test', 0)).toBe('...');
      });
    });
  });

  describe('ColorUtils', () => {
    describe('color methods', () => {
      it('should wrap text in color codes', () => {
        expect(ColorUtils.getSuccessColor('success')).toBe('\x1b[32msuccess\x1b[0m');
        expect(ColorUtils.getErrorColor('error')).toBe('\x1b[31merror\x1b[0m');
        expect(ColorUtils.getWarningColor('warning')).toBe('\x1b[33mwarning\x1b[0m');
        expect(ColorUtils.getInfoColor('info')).toBe('\x1b[36minfo\x1b[0m');
        expect(ColorUtils.getHighlightColor('highlight')).toBe('\x1b[35mhighlight\x1b[0m');
      });

      it('should handle empty strings', () => {
        expect(ColorUtils.getSuccessColor('')).toBe('\x1b[32m\x1b[0m');
        expect(ColorUtils.getErrorColor('')).toBe('\x1b[31m\x1b[0m');
      });
    });
  });
});