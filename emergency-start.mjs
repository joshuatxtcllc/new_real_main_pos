#!/usr/bin/env node
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5000;

console.log('Emergency POS Server Starting...');

// Read the index.html file
const indexPath = path.join(__dirname, 'dist', 'public', 'index.html');
let indexHtml = '';

try {
  indexHtml = fs.readFileSync(indexPath, 'utf8');
  console.log('✅ Loaded index.html');
} catch (err) {
  console.error('❌ Cannot read index.html:', err.message);
  process.exit(1);
}

const server = http.createServer((req, res) => {
  console.log('Request:', req.url);
  
  // Serve static files
  if (req.url !== '/' && req.url.includes('.')) {
    const filePath = path.join(__dirname, 'dist', 'public', req.url);
    try {
      const content = fs.readFileSync(filePath);
      const ext = path.extname(filePath);
      let contentType = 'text/plain';
      
      if (ext === '.html') contentType = 'text/html';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.js') contentType = 'application/javascript';
      else if (ext === '.json') contentType = 'application/json';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
      return;
    } catch (err) {
      console.log('File not found:', filePath);
    }
  }
  
  // Serve index.html for all other requests
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(indexHtml);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Emergency POS running on port ${PORT}`);
  console.log('✅ Ready for business');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('SIGTERM', () => server.close());
process.on('SIGINT', () => server.close());