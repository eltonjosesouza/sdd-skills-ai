import fs from "fs-extra";
import path from "path";
import os from "os";
import { execSync } from "child_process";
import chalk from "chalk";
import prompts from "prompts";

export interface ShellConfig {
  type: 'bash' | 'zsh' | 'windows' | 'other';
  configFile: string;
  completionScript: string;
  description: string;
}

export class AutocompletionService {
  private static readonly SHELLS: Record<string, Omit<ShellConfig, 'type'>> = {
    bash: {
      configFile: '~/.bashrc',
      description: 'Bash (~/.bashrc)',
      completionScript: `
# SDD Skills AI Bash completion
_sdd_skills_ai_completion() {
  local cur prev commands
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"

  commands="wizard init configure-tools apply-skills agent-init install-scrum setup-scrum-configs add-skill add-spec spec-skills-add"

  if [[ \${cur} == * ]]; then
    COMPREPLY=( $(compgen -W "\${commands}" -- \${cur}) )
  fi

  return 0
}

complete -F _sdd_skills_ai_completion sdd-skills-ai
`
    },
    zsh: {
      configFile: '~/.zshrc',
      description: 'Zsh (~/.zshrc)',
      completionScript: `
# SDD Skills AI ZSH completion
_sdd_skills_ai_completion() {
  local -a commands
  commands=(
    'wizard:Full interactive experience (RECOMMENDED)'
    'init:Setup spec-driven architecture base'
    'configure-tools:Configure AI coding assistant tools'
    'apply-skills:Inject selected skill packs'
    'agent-init:Initialize AGENTS.md context'
    'install-scrum:Install complete Scrum methodology'
    'setup-scrum-configs:Configure Scrum agents'
    'add-skill:Register custom skill repository'
    'add-spec:Register local spec-driven tool'
    'spec-skills-add:Enable autonomous tool addition'
  )

  _describe 'command' commands
}

compdef _sdd_skills_ai_completion sdd-skills-ai
`
    },
    windows: {
      configFile: 'PowerShell Profile',
      description: 'Windows PowerShell',
      completionScript: `
# SDD Skills AI PowerShell completion
Register-ArgumentCompleter -Native -CommandName sdd-skills-ai -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)

    $commands = @('wizard', 'init', 'configure-tools', 'apply-skills', 'agent-init', 'install-scrum', 'setup-scrum-configs', 'add-skill', 'add-spec', 'spec-skills-add')

    if ($wordToComplete -eq '') {
        return $commands
    }

    return $commands | Where-Object { $_ -like "$wordToComplete*" }
}
`
    },
    other: {
      configFile: 'your shell configuration file',
      description: 'Other/Custom',
      completionScript: `
# SDD Skills AI completion for your shell
# Add completion for commands: wizard, init, configure-tools, apply-skills, agent-init, install-scrum, setup-scrum-configs, add-skill, add-spec, spec-skills-add
`
    }
  };

  private static detectShellType(): string {
    const shell = process.env.SHELL;
    const platform = process.platform;

    if (platform === 'win32') {
      return 'windows';
    } else if (shell && shell.includes('zsh')) {
      return 'zsh';
    } else if (shell && shell.includes('bash')) {
      return 'bash';
    } else {
      return 'unknown';
    }
  }

  private static getShellConfig(shellType: string): ShellConfig {
    const config = AutocompletionService.SHELLS[shellType];
    if (!config) {
      return {
        type: 'other',
        ...AutocompletionService.SHELLS.other
      };
    }
    return {
      type: shellType as ShellConfig['type'],
      ...config
    };
  }

  private static expandConfigPath(configFile: string): string {
    if (configFile.startsWith('~')) {
      return path.join(os.homedir(), configFile.slice(1));
    } else if (configFile === 'PowerShell Profile') {
      const psProfile = execSync('echo $PROFILE', { encoding: 'utf8' }).trim();
      return psProfile || path.join(os.homedir(), 'Documents', 'WindowsPowerShell', 'Microsoft.PowerShell_profile.ps1');
    }
    return configFile;
  }

  private static async promptForShell(): Promise<ShellConfig | null> {
    const detected = AutocompletionService.detectShellType();
    const initialIndex = detected === 'zsh' ? 1 : detected === 'bash' ? 0 : detected === 'windows' ? 2 : 3;

    const choices = Object.entries(AutocompletionService.SHELLS).map(([key, config]) => ({
      title: config.description,
      value: key
    }));

    const response = await prompts({
      type: "select",
      name: "shell",
      message: "Which shell are you using?",
      choices,
      initial: initialIndex
    });

    if (!response.shell) {
      return null;
    }

    return AutocompletionService.getShellConfig(response.shell);
  }

  private static async promptForInstallation(config: ShellConfig): Promise<boolean> {
    const response = await prompts({
      type: "confirm",
      name: "install",
      message: `Add autocompletion to ${config.configFile}?`,
      initial: true,
    });

    return Boolean(response.install);
  }

  private static installCompletionScript(config: ShellConfig): void {
    const expandedConfigPath = AutocompletionService.expandConfigPath(config.configFile);

    // Ensure config directory exists
    const configDir = path.dirname(expandedConfigPath);
    if (!fs.existsSync(configDir)) {
      fs.ensureDirSync(configDir);
    }

    // Remove existing SDD Skills AI completion if it exists
    const completionMarker = "# SDD Skills AI completion";
    const existingContent = fs.existsSync(expandedConfigPath)
      ? fs.readFileSync(expandedConfigPath, 'utf8')
      : '';

    const cleanedContent = existingContent
      .split('\n')
      .filter(line => !line.includes(completionMarker))
      .join('\n');

    // Add new completion script
    const newContent = cleanedContent + '\n' + config.completionScript + '\n';
    fs.writeFileSync(expandedConfigPath, newContent, 'utf8');
  }

  private static printActivationInstructions(config: ShellConfig): void {
    console.log(chalk.green(`✅ Autocompletion added to ${config.configFile}`));

    if (config.type !== 'windows') {
      console.log(chalk.white(`\n🔄 To activate autocompletion, run:`));
      console.log(chalk.cyan(`   source ${config.configFile}`));
      console.log(chalk.white(`\nOr restart your terminal.`));
    } else {
      console.log(chalk.white(`\n🔄 To activate autocompletion, restart PowerShell.`));
    }

    console.log(chalk.white(`\n💡 Test it out:`));
    console.log(chalk.cyan(`   sdd-skills-ai <TAB>`));
    console.log(chalk.cyan(`   sdd-skills-ai w<TAB>`));
  }

  public static async setup(): Promise<boolean> {
    console.log(chalk.blue("\n🔧 Setting up shell autocompletion for SDD Skills AI...\n"));

    try {
      const config = await AutocompletionService.promptForShell();

      if (!config) {
        console.log(chalk.yellow("Skipping autocompletion setup."));
        return true;
      }

      console.log(chalk.cyan(`📝 Detected shell: ${config.type}`));
      console.log(chalk.cyan(`📁 Config file: ${config.configFile}`));

      const shouldInstall = await AutocompletionService.promptForInstallation(config);

      if (!shouldInstall) {
        console.log(chalk.yellow("Skipping autocompletion installation."));
        return true;
      }

      AutocompletionService.installCompletionScript(config);
      AutocompletionService.printActivationInstructions(config);

      return true;
    } catch (err) {
      console.error(chalk.red(`\n❌ Failed to setup autocompletion: ${err}`));
      return false;
    }
  }
}
