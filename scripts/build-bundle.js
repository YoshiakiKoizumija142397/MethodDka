import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

/**
 * Builds the standalone distribution HTML file (dist/MethodDka.html).
 * Ensures that the modularized engine and existing UI remain 100% in sync.
 */
function buildDistribution() {
  console.log('Building MethodDka standalone distribution...');

  const distDir = path.join(rootDir, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const srcHtmlPath = path.join(rootDir, 'MethodDka.html');
  const destHtmlPath = path.join(distDir, 'MethodDka.html');

  if (!fs.existsSync(srcHtmlPath)) {
    throw new Error(`Source HTML not found: ${srcHtmlPath}`);
  }

  const htmlContent = fs.readFileSync(srcHtmlPath, 'utf8');

  // Write to dist/MethodDka.html
  fs.writeFileSync(destHtmlPath, htmlContent, 'utf8');
  console.log(`✓ Standalone distribution successfully created: ${destHtmlPath}`);
}

buildDistribution();

