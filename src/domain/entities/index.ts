export interface Agent {
  name: string;
  configDir: string;
  displayName: string;
}

export interface Skill {
  title: string;
  value: string;
  description: string;
  commands: Array<{
    message: string;
    cmd: string;
    useProjectDir?: boolean;
  }>;
}

export interface Project {
  path: string;
  name: string;
  agent?: Agent;
}

export interface ActionResult {
  success: boolean;
  message?: string;
}
