import fs from 'fs-extra';
import path from 'path';

// Mock console methods to avoid noise during tests
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

beforeAll(() => {
  console.log = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});

// Helper function to create temporary directories for testing
export const createTempDir = (name: string): string => {
  const tempDir = path.join(__dirname, '../temp', name);
  fs.ensureDirSync(tempDir);
  return tempDir;
};

// Helper function to clean up temporary directories
export const cleanupTempDir = (dir: string): void => {
  if (fs.existsSync(dir)) {
    fs.removeSync(dir);
  }
};

// Mock process.cwd to return a predictable path
const originalCwd = process.cwd;
beforeEach(() => {
  process.cwd = jest.fn(() => path.join(__dirname, '../fixtures'));
});

afterEach(() => {
  process.cwd = originalCwd;
});