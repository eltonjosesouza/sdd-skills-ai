import { Agent } from "../entities";

export interface AgentRepository {
  getAgentConfigDir(agentName: string): string;
  getAllAgents(): Agent[];
  getAgentByName(name: string): Agent | undefined;
}

export class AgentRepositoryImpl implements AgentRepository {
  private agentMapping: Record<string, string> = {
    antigravity: ".agent",
    claude: ".claude",
    gemini: ".gemini",
    cursor: ".cursor",
    kiro: ".kiro",
    opencode: ".agents",
    windsurf: ".agent",
  };

  getAgentConfigDir(agentName: string): string {
    return this.agentMapping[agentName.toLowerCase()] || ".agent";
  }

  getAllAgents(): Agent[] {
    return Object.entries(this.agentMapping).map(([name, configDir]) => ({
      name,
      configDir,
      displayName: this.getDisplayName(name),
    }));
  }

  getAgentByName(name: string): Agent | undefined {
    const configDir = this.getAgentConfigDir(name);
    return {
      name,
      configDir,
      displayName: this.getDisplayName(name),
    };
  }

  private getDisplayName(name: string): string {
    const displayNames: Record<string, string> = {
      antigravity: "Antigravity (.agent/)",
      claude: "Claude Code (.claude/)",
      gemini: "Gemini CLI (.gemini/)",
      cursor: "Cursor (.cursor/)",
      kiro: "Kiro IDE (.kiro/)",
      opencode: "OpenCode (.agents/)",
      windsurf: "Windsurf (.agent/)",
    };
    return displayNames[name] || name;
  }
}
