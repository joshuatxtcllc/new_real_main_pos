#!/usr/bin/env node

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'http';
import { spawn } from 'child_process';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting Jay\'s Frames POS System...');

// Create Express app for backend
const app = express();
const PORT = 5000;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Jay\'s Frames POS System',
    timestamp: new Date().toISOString(),
    environment: 'development'
  });
});

// Start backend server
const server = createServer(app);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🔧 Backend server running on http://0.0.0.0:${PORT}`);
});

// Build the application first
console.log('📦 Building application...');
const buildProcess = spawn('npm', ['run', 'build'], {
  stdio: 'inherit',
  shell: true
});

buildProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Build completed successfully!');
    
    // Check if dist directory exists
    const distPath = join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      console.log('📁 Serving static files from dist/');
      
      // Serve static files
      app.use(express.static(distPath));
      
      // Handle SPA routing
      app.get('*', (req, res) => {
        res.sendFile(join(distPath, 'index.html'));
      });
      
      console.log('🎉 Jay\'s Frames POS System is ready!');
      console.log(`🌐 Access the application at: http://localhost:${PORT}`);
    } else {
      console.error('❌ Build output directory not found!');
    }
  } else {
    console.error('❌ Build failed with code:', code);
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  server.close(() => {
    process.exit(0);
  });
});
