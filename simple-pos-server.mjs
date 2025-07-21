#!/usr/bin/env node
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

console.log('Starting Jay\'s Frames POS...');

// Serve static files from dist/public
const staticPath = path.join(__dirname, 'dist', 'public');
console.log('Static path:', staticPath);
console.log('Static path exists:', existsSync(staticPath));

if (existsSync(staticPath)) {
  app.use(express.static(staticPath));
  
  // SPA fallback - serve index.html for all routes  
  app.get('*', (req, res) => {
    const indexPath = path.join(staticPath, 'index.html');
    if (existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('POS system files not found');
    }
  });
  
  app.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
      console.error('Server failed to start:', err);
    } else {
      console.log('POS System running on port', PORT);
      console.log('Ready for customers');
    }
  });
} else {
  console.error('Static files not found at:', staticPath);
  process.exit(1);
}