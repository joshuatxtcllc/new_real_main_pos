#!/usr/bin/env node

/**
 * Development Server Starter
 * This script starts the development servers for both frontend and backend
 * ensuring proper development environment configuration
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set development environment
process.env.NODE_ENV = 'development';

console.log('🚀 Starting Jay\'s Frames POS Development Server...');
console.log('🔧 Environment: development');

let backend, frontend;

// Function to check if port is available
async function checkPort(port) {
  return new Promise((resolve) => {
    const { createServer } = await import('net');
    const server = createServer();
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    server.on('error', () => resolve(false));
  });
}

async function startDevelopmentServers() {
  try {
    // Check if backend port is available
    const backendPortAvailable = await checkPort(5000);
    
    if (!backendPortAvailable) {
      console.log('✓ Backend already running on port 5000');
    } else {
      console.log('🚀 Starting backend server on port 5000...');
      
      // Start backend server with tsx
      backend = spawn('npx', ['tsx', 'watch', 'server/index.ts'], {
        stdio: ['pipe', 'inherit', 'inherit'],
        env: { 
          ...process.env, 
          NODE_ENV: 'development',
          PORT: '5000'
        }
      });

      backend.on('error', (error) => {
        console.error('❌ Backend startup error:', error.message);
      });

      backend.on('exit', (code, signal) => {
        if (code !== 0 && signal !== 'SIGTERM') {
          console.error(`❌ Backend exited with code ${code}, signal: ${signal}`);
        } else if (signal === 'SIGTERM') {
          console.log('✓ Backend shutdown gracefully');
        }
      });

      // Give backend time to start
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('✓ Backend server started');
    }

    // Check if frontend port is available
    const frontendPortAvailable = await checkPort(5173);
    
    if (!frontendPortAvailable) {
      console.log('✓ Frontend already running on port 5173');
    } else {
      console.log('🚀 Starting frontend server on port 5173...');
      
      // Start frontend with Vite
      frontend = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5173'], {
        stdio: 'inherit',
        env: { 
          ...process.env,
          NODE_ENV: 'development',
          VITE_API_URL: 'http://localhost:5000'
        },
        cwd: process.cwd()
      });

      frontend.on('error', (error) => {
        console.error('❌ Frontend startup error:', error.message);
      });

      frontend.on('exit', (code) => {
        if (code !== 0) {
          console.error(`❌ Frontend exited with code ${code}`);
        }
      });

      console.log('✓ Frontend server started');
    }

    console.log('\n🎉 Development servers are running!');
    console.log('🌐 Frontend: http://localhost:5173');
    console.log('🔧 Backend API: http://localhost:5000');
    console.log('\n📝 Press Ctrl+C to stop all servers');

  } catch (error) {
    console.error('❌ Failed to start development servers:', error.message);
    process.exit(1);
  }
}

// Handle cleanup
const cleanup = () => {
  console.log('\n🛑 Shutting down development servers...');
  
  if (backend && !backend.killed) {
    backend.kill('SIGTERM');
  }
  if (frontend && !frontend.killed) {
    frontend.kill('SIGTERM');
  }

  setTimeout(() => {
    if (backend && !backend.killed) backend.kill('SIGKILL');
    if (frontend && !frontend.killed) frontend.kill('SIGKILL');
    process.exit(0);
  }, 5000);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Start the servers
startDevelopmentServers();

// Keep the process alive
setInterval(() => {
  // Keep script running
}, 10000);