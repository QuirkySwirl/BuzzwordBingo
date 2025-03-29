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
  
  // Get the relative depth to src directory
  const relativePath = path.relative(path.dirname(filePath), srcDir);
  const depth = relativePath.split(path.sep).length - 1;
  const prefix = depth === 0 ? './' : '../'.repeat(depth);
  
  // Replace @/ imports with relative paths
  let fixedContent = content.replace(
    /from\s+['"]@\/([^'"]+)['"]/g, 
    `from "${prefix}$1"`
  );
  
  // Fix shadcn UI components imports between each other
  if (filePath.includes('components/ui/')) {
    fixedContent = fixedContent.replace(
      /from\s+['"]\.\.\/components\/ui\/([^'"]+)['"]/g,
      'from "./$1"'
    );
    
    fixedContent = fixedContent.replace(
      /from\s+['"]\.\.\/hooks\/([^'"]+)['"]/g,
      'from "../../hooks/$1"'
    );
    
    fixedContent = fixedContent.replace(
      /from\s+['"]\.\.\/lib\/([^'"]+)['"]/g,
      'from "../../lib/$1"'
    );
  }
  
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