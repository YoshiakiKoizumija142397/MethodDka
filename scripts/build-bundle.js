import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function buildDistribution() {
  console.log('Building MethodDka distribution and copying static assets to docs/...');

  const docsDir = path.join(rootDir, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  // GitHub Pagesで必要なHTMLファイルのリスト
  const filesToCopy = [
    'MethodDka.html',
    'index.html',
    'help.html',
    'privacy.html'
  ];

  for (const file of filesToCopy) {
    const srcPath = path.join(rootDir, file);
    const destPath = path.join(docsDir, file);

    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠ Warning: Source file not found, skipping: ${srcPath}`);
      continue;
    }

    const content = fs.readFileSync(srcPath, 'utf8');
    fs.writeFileSync(destPath, content, 'utf8');
    console.log(`✓ Copied: ${file} -> docs/${file}`);
  }

  console.log('✓ Build completed successfully!');
}

buildDistribution();