import path from "path";
import fs from "fs-extra";

export class FileUtils {
  static ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.ensureDirSync(dirPath);
    }
  }

  static writeFile(filePath: string, content: string): void {
    const dir = path.dirname(filePath);
    FileUtils.ensureDirectoryExists(dir);
    fs.writeFileSync(filePath, content, "utf8");
  }

  static readFile(filePath: string): string {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf8");
    }
    return "";
  }

  static appendToFile(filePath: string, content: string): void {
    const dir = path.dirname(filePath);
    FileUtils.ensureDirectoryExists(dir);
    fs.appendFileSync(filePath, content, "utf8");
  }

  static copyFile(src: string, dest: string): void {
    const dir = path.dirname(dest);
    FileUtils.ensureDirectoryExists(dir);
    fs.copyFileSync(src, dest);
  }

  static fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  static getProjectPath(projectDirectory?: string): string {
    const currentDir = process.cwd();
    return projectDirectory 
      ? path.resolve(currentDir, projectDirectory)
      : currentDir;
  }
}

export class ValidationUtils {
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static isValidGitHubRepo(repoUrl: string): boolean {
    return repoUrl.includes("github.com") && repoUrl.includes("/");
  }

  static isValidPath(filePath: string): boolean {
    try {
      path.parse(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

export class StringUtils {
  static kebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
  }

  static camelCase(str: string): string {
    return str
      .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
      .replace(/^[A-Z]/, (g) => g.toLowerCase());
  }

  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static truncate(str: string, length: number, suffix = "..."): string {
    if (str.length <= length) {
      return str;
    }
    return str.slice(0, length - suffix.length) + suffix;
  }
}

export class ColorUtils {
  static getSuccessColor(text: string): string {
    return `\x1b[32m${text}\x1b[0m`; // Green
  }

  static getErrorColor(text: string): string {
    return `\x1b[31m${text}\x1b[0m`; // Red
  }

  static getWarningColor(text: string): string {
    return `\x1b[33m${text}\x1b[0m`; // Yellow
  }

  static getInfoColor(text: string): string {
    return `\x1b[36m${text}\x1b[0m`; // Cyan
  }

  static getHighlightColor(text: string): string {
    return `\x1b[35m${text}\x1b[0m`; // Magenta
  }
}
