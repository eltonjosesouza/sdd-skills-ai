import { execSync } from "child_process";
import os from "os";
import fs from "fs-extra";
import path from "path";

export interface ProcessService {
  executeCommand(command: string, options?: { cwd?: string; stdio?: any }): void;
  executeCommandInTemp(command: string, agentDirName: string): Promise<string>;
}

export class NodeProcessService implements ProcessService {
  executeCommand(command: string, options?: { cwd?: string; stdio?: any }): void {
    execSync(command, options || { stdio: "inherit" });
  }

  async executeCommandInTemp(command: string, agentDirName: string): Promise<string> {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "sdd-skills-ai-"));
    
    try {
      const originalCwd = process.cwd();
      process.chdir(tempDir);
      
      this.executeCommand(command, { stdio: "inherit" });
      
      process.chdir(originalCwd);
      return tempDir;
    } finally {
      process.chdir(process.cwd());
      await fs.remove(tempDir);
    }
  }
}
