#!/usr/bin/env node

// Quick start script - just launches the built server directly
import { spawn } from 'child_process';

console.log('🚀 Jay\'s Frames POS System - Quick Start');
console.log('Starting production server on port 5000...');

const server = spawn('node', ['dist/server.mjs'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: '5000'
  }
});

server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

server.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Server exited with code ${code}`);
    process.exit(code);
  }
});

// Handle graceful shutdown
const cleanup = () => {
  console.log('Shutting down server...');
  server.kill('SIGTERM');
  setTimeout(() => {
    server.kill('SIGKILL');
    process.exit(0);
  }, 3000);
};

process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);