import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Default target: adjacent directory ../MethodDkaWindows11
const defaultTargetDir = path.resolve(rootDir, '..', 'MethodDkaWindows11');
const targetDir = process.env.METHOD_DKA_WIN11_DIR || defaultTargetDir;

const filesToSync = [
  'MethodDka.html',
  'index.html',
  'help.html',
  'privacy.html',
  'REQUIREMENTS.md',
  'README.md',
  'package.json'
];

const dirsToSync = [
  'src'
];

/**
 * Synchronizes files and directories from MethodDka to MethodDkaWindows11 repository.
 */
function syncRepositories() {
  console.log(`Starting repository sync to: ${targetDir}`);

  if (!fs.existsSync(targetDir)) {
    console.warn(`[SKIP] Target repository directory does not exist: ${targetDir}`);
    console.log('Set METHOD_DKA_WIN11_DIR environment variable if located elsewhere.');
    return;
  }

  let copiedFiles = 0;

  // Sync individual files
  for (const file of filesToSync) {
    const srcFile = path.join(rootDir, file);
    const destFile = path.join(targetDir, file);

    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`✓ Synchronized file: ${file}`);
      copiedFiles++;
    } else {
      console.warn(`[WARN] Source file missing: ${file}`);
    }
  }

  // Sync directories recursively
  for (const dir of dirsToSync) {
    const srcSubDir = path.join(rootDir, dir);
    const destSubDir = path.join(targetDir, dir);

    if (fs.existsSync(srcSubDir)) {
      fs.cpSync(srcSubDir, destSubDir, { recursive: true });
      console.log(`✓ Synchronized directory: ${dir}/`);
    }
  }

  console.log(`Sync complete! Total synchronized root files: ${copiedFiles}`);
}

syncRepositories();

