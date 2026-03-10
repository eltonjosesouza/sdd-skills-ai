import fs from "fs-extra";
import path from "path";

export interface FileService {
  writeFile(filePath: string, content: string): Promise<void>;
  readFile(filePath: string): Promise<string>;
  exists(filePath: string): Promise<boolean>;
  ensureDir(dirPath: string): Promise<void>;
  copy(src: string, dest: string): Promise<void>;
}

export class FileSystemFileService implements FileService {
  async writeFile(filePath: string, content: string): Promise<void> {
    await fs.writeFile(filePath, content, "utf8");
  }

  async readFile(filePath: string): Promise<string> {
    return await fs.readFile(filePath, "utf8");
  }

  async exists(filePath: string): Promise<boolean> {
    return await fs.pathExists(filePath);
  }

  async ensureDir(dirPath: string): Promise<void> {
    await fs.ensureDir(dirPath);
  }

  async copy(src: string, dest: string): Promise<void> {
    await fs.copy(src, dest);
  }
}
