// Script to fix import paths for better Replit compatibility
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory to scan for files
const srcDir = path.join(__dirname, 'client', 'src');

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Replace @/ imports with relative paths
  const fixedContent = content.replace(
    /from\s+['"]@\/([^'"]+)['"]/g, 
    'from "../$1"'
  );
  
  // Only write to the file if changes were made
  if (content !== fixedContent) {
    console.log(`Fixing imports in: ${filePath}`);
    fs.writeFileSync(filePath, fixedContent, 'utf8');
  }
}

// Function to recursively scan directory for .ts and .tsx files
function scanDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      scanDirectory(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fixImportsInFile(filePath);
    }
  }
}

// Start the process
console.log('Fixing import paths for Replit compatibility...');
scanDirectory(srcDir);
console.log('Done!');