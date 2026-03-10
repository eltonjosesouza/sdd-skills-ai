import prompts from "prompts";

export interface PromptService {
  selectAgent(): Promise<string | undefined>;
  selectSkills(skills: Array<{title: string, value: string, description: string}>): Promise<string[] | undefined>;
  confirm(message: string): Promise<boolean>;
  multiSelect(message: string, choices: Array<{title: string, value: string, description?: string}>): Promise<string[] | undefined>;
}

export class CliPromptService implements PromptService {
  async selectAgent(): Promise<string | undefined> {
    const response = await prompts({
      type: "select",
      name: "agent",
      message: "Which AI Assistant is the target for these skills/workflows?",
      choices: [
        { title: "Antigravity (.agent/)", value: "antigravity" },
        { title: "Claude Code (.claude/)", value: "claude" },
        { title: "Gemini CLI (.gemini/)", value: "gemini" },
        { title: "Cursor (.cursor/)", value: "cursor" },
        { title: "Kiro IDE (.kiro/)", value: "kiro" },
        { title: "OpenCode (.agents/)", value: "opencode" },
        { title: "Windsurf (.agent/)", value: "windsurf" },
      ],
      initial: 0,
    });
    return response.agent;
  }

  async selectSkills(skills: Array<{title: string, value: string, description: string}>): Promise<string[] | undefined> {
    const response = await prompts({
      type: "multiselect",
      name: "skills",
      message: "Which skill packs would you like to install?",
      choices: skills.map(skill => ({
        title: skill.title,
        value: skill.value,
        description: skill.description,
      })),
      hint: "- Space to select. Return to submit",
    });
    return response.skills;
  }

  async confirm(message: string): Promise<boolean> {
    const response = await prompts({
      type: "confirm",
      name: "confirm",
      message,
      initial: true,
    });
    return response.confirm;
  }

  async multiSelect(message: string, choices: Array<{title: string, value: string, description?: string}>): Promise<string[] | undefined> {
    const response = await prompts({
      type: "multiselect",
      name: "selection",
      message,
      choices,
      hint: "- Space to select. Return to submit",
    });
    return response.selection;
  }
}
