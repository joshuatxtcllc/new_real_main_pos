#!/usr/bin/env node

import { spawn } from 'child_process';
import http from 'http';

console.log('Testing deployment build...');

// Start the server
const server = spawn('npx', ['tsx', 'server.ts'], { 
  cwd: 'dist',
  stdio: 'pipe'
});

server.stdout.on('data', (data) => {
  console.log('Server:', data.toString().trim());
});

server.stderr.on('data', (data) => {
  console.error('Error:', data.toString().trim());
});

// Test health check after 3 seconds
setTimeout(() => {
  console.log('Testing health check...');
  
  const req = http.request({
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'GET'
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('✅ Health check successful:', data);
      server.kill();
      process.exit(0);
    });
  });
  
  req.on('error', (err) => {
    console.error('❌ Health check failed:', err.message);
    server.kill();
    process.exit(1);
  });
  
  req.end();
}, 3000);

// Cleanup after 10 seconds
setTimeout(() => {
  console.log('Timeout - killing server');
  server.kill();
  process.exit(1);
}, 10000);