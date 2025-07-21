#!/usr/bin/env node

import fs from 'fs';

console.log('Creating minimal deployment...');

// Create dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Copy the TypeScript server directly
fs.copyFileSync('server/index.ts', 'dist/index.ts');

// Create minimal package.json
const pkg = {
  "name": "app",
  "type": "module",
  "scripts": { "start": "npx tsx index.ts" },
  "dependencies": {
    "tsx": "*",
    "express": "*"
  }
};
fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, 2));

// Create simple HTML file
fs.mkdirSync('dist/public', { recursive: true });
fs.writeFileSync('dist/public/index.html', '<h1>Working</h1>');

console.log('Minimal deployment ready');