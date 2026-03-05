import fs from 'fs-extra';
import path from 'path';

describe('Basic Validation Tests', () => {
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

  it('should have correct package.json scripts', () => {
    const packagePath = path.join(__dirname, '../package.json');
    const packageJson = fs.readJsonSync(packagePath);
    
    expect(packageJson.scripts).toHaveProperty('test');
    expect(packageJson.scripts).toHaveProperty('build');
    expect(packageJson.scripts).toHaveProperty('dev');
  });

  it('should have correct dependencies', () => {
    const packagePath = path.join(__dirname, '../package.json');
    const packageJson = fs.readJsonSync(packagePath);
    
    expect(packageJson.dependencies).toHaveProperty('chalk');
    expect(packageJson.dependencies).toHaveProperty('commander');
    expect(packageJson.dependencies).toHaveProperty('fs-extra');
    expect(packageJson.dependencies).toHaveProperty('prompts');
  });

  it('should have correct dev dependencies', () => {
    const packagePath = path.join(__dirname, '../package.json');
    const packageJson = fs.readJsonSync(packagePath);
    
    expect(packageJson.devDependencies).toHaveProperty('jest');
    expect(packageJson.devDependencies).toHaveProperty('ts-jest');
    expect(packageJson.devDependencies).toHaveProperty('typescript');
  });

  it('should have modular file structure', () => {
    const srcPath = path.join(__dirname, '../src');
    
    expect(fs.existsSync(path.join(srcPath, 'commands'))).toBe(true);
    expect(fs.existsSync(path.join(srcPath, 'services'))).toBe(true);
    expect(fs.existsSync(path.join(srcPath, 'utils'))).toBe(true);
    expect(fs.existsSync(path.join(srcPath, 'actions'))).toBe(true);
  });

  it('should have command files', () => {
    const commandsPath = path.join(__dirname, '../src/commands');
    
    expect(fs.existsSync(path.join(commandsPath, 'init.command.ts'))).toBe(true);
    expect(fs.existsSync(path.join(commandsPath, 'wizard.command.ts'))).toBe(true);
  });

  it('should have service files', () => {
    const servicesPath = path.join(__dirname, '../src/services');
    
    expect(fs.existsSync(path.join(servicesPath, 'autocompletion.service.ts'))).toBe(true);
    expect(fs.existsSync(path.join(servicesPath, 'tool-configuration.service.ts'))).toBe(true);
    expect(fs.existsSync(path.join(servicesPath, 'scrum.service.ts'))).toBe(true);
  });

  it('should have utils files', () => {
    const utilsPath = path.join(__dirname, '../src/utils');
    
    expect(fs.existsSync(path.join(utilsPath, 'index.ts'))).toBe(true);
  });

  it('should have actions files', () => {
    const actionsPath = path.join(__dirname, '../src/actions');
    
    expect(fs.existsSync(path.join(actionsPath, 'index.ts'))).toBe(true);
  });

  it('should have backup file', () => {
    const backupPath = path.join(__dirname, '../src/index.backup.ts');
    expect(fs.existsSync(backupPath)).toBe(true);
    
    const stats = fs.statSync(backupPath);
    expect(stats.size).toBeGreaterThan(40000); // Should be large (original monolithic)
  });

  it('should have new modular index file', () => {
    const indexPath = path.join(__dirname, '../src/index.ts');
    expect(fs.existsSync(indexPath)).toBe(true);
    
    const stats = fs.statSync(indexPath);
    expect(stats.size).toBeLessThan(10000); // Should be small (modular)
  });
});