#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting Jay\'s Frames POS System...');

// Start the server directly with simplified configuration
const server = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: { 
    ...process.env,
    NODE_ENV: 'development',
    PORT: '5000'
  }
});

server.on('error', (error) => {
  console.error('❌ Server error:', error);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(code || 0);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down...');
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Shutting down...');
  server.kill('SIGINT');
});