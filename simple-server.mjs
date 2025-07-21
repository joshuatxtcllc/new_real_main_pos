#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧹 Cleaning up existing processes...');

// Kill any existing processes
const killProcesses = () => {
  return new Promise((resolve) => {
    const killCommands = [
      'pkill -f "node dist/server.mjs" || true',
      'pkill -f "tsx server/index.ts" || true',
      'pkill -f "vite" || true'
    ];

    let completed = 0;
    killCommands.forEach(cmd => {
      const [command, ...args] = cmd.split(' ');
      const proc = spawn(command, args, { shell: true });

      proc.on('close', () => {
        completed++;
        if (completed === killCommands.length) {
          resolve();
        }
      });
    });
  });
};

const startServer = async () => {
  try {
    console.log('🚀 Starting Jay\'s Frames POS System...');

    // Wait for cleanup
    await killProcesses();
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check if dist/server.mjs exists
    const serverPath = join(__dirname, 'dist', 'server.mjs');

    console.log('📡 Starting production server...');
    const server = spawn('node', [serverPath], {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production',
        PORT: '5000'
      }
    });

    server.on('error', (error) => {
      console.error('❌ Server error:', error.message);
      process.exit(1);
    });

    server.on('close', (code) => {
      console.log(`🔄 Server process exited with code ${code}`);
      if (code !== 0) {
        console.log('🔄 Attempting to restart...');
        setTimeout(startServer, 3000);
      }
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('🛑 Shutting down server...');
      server.kill();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('🛑 Shutting down server...');
      server.kill();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();