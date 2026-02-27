import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import defaultConfig from './config.json';

export interface CommandObj {
  message: string;
  cmd: string;
  useProjectDir: boolean;
}

export interface SpecOption {
  value: string;
  title: string;
  description: string;
  selected?: boolean;
  commands: CommandObj[];
}

export interface SkillOption {
  value: string;
  title: string;
  description: string;
  commands: CommandObj[];
}

export interface Config {
  specs: SpecOption[];
  skills: SkillOption[];
}

const CONFIG_DIR = path.join(os.homedir(), '.sdd-skills-ai');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export function loadConfig(): Config {
  let mergedConfig: Config = {
    specs: [...defaultConfig.specs],
    skills: [...defaultConfig.skills],
  };

  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const userConfigObject = fs.readJsonSync(CONFIG_FILE);

      if (userConfigObject.specs && Array.isArray(userConfigObject.specs)) {
        // Merge specs, overwriting or pushing
        userConfigObject.specs.forEach((userSpec: SpecOption) => {
          const index = mergedConfig.specs.findIndex(s => s.value === userSpec.value);
          if (index >= 0) {
            mergedConfig.specs[index] = userSpec;
          } else {
            mergedConfig.specs.push(userSpec);
          }
        });
      }

      if (userConfigObject.skills && Array.isArray(userConfigObject.skills)) {
        userConfigObject.skills.forEach((userSkill: SkillOption) => {
          const index = mergedConfig.skills.findIndex(s => s.value === userSkill.value);
          if (index >= 0) {
            mergedConfig.skills[index] = userSkill;
          } else {
            mergedConfig.skills.push(userSkill);
          }
        });
      }
    } catch (err) {
      console.warn(`Warning: Could not parse user config at ${CONFIG_FILE}. Ignoring.`);
    }
  }

  return mergedConfig;
}

export function saveUserConfig(configPatch: Partial<Config>) {
  fs.ensureDirSync(CONFIG_DIR);

  let existingUserConfig: Config = { specs: [], skills: [] };
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      existingUserConfig = { ...existingUserConfig, ...fs.readJsonSync(CONFIG_FILE) };
    } catch (err) {
      // Ignored
    }
  }

  if (configPatch.specs) {
    configPatch.specs.forEach(newSpec => {
      const index = existingUserConfig.specs.findIndex(s => s.value === newSpec.value);
      if (index >= 0) {
        existingUserConfig.specs[index] = newSpec;
      } else {
        existingUserConfig.specs.push(newSpec);
      }
    });
  }

  if (configPatch.skills) {
    configPatch.skills.forEach(newSkill => {
      const index = existingUserConfig.skills.findIndex(s => s.value === newSkill.value);
      if (index >= 0) {
        existingUserConfig.skills[index] = newSkill;
      } else {
        existingUserConfig.skills.push(newSkill);
      }
    });
  }

  fs.writeJsonSync(CONFIG_FILE, existingUserConfig, { spaces: 2 });
}

export function addSpec(spec: SpecOption) {
  saveUserConfig({ specs: [spec] });
}

export function addSkill(skill: SkillOption) {
  saveUserConfig({ skills: [skill] });
}
