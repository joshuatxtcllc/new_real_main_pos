#!/usr/bin/env node

/**
 * Simple Deployment Fix - Quick build for Cloud Run
 */

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🔧 Quick deployment fix...');

try {
  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }

  // Quick server build only
  console.log('🚀 Building server...');
  execSync(`esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/server.mjs --define:process.env.NODE_ENV=\\"production\\" --target=es2020`, { stdio: 'inherit' });

  // Copy existing frontend build if available
  if (fs.existsSync('dist/public')) {
    console.log('✓ Using existing frontend build');
  } else {
    console.log('📦 Building frontend...');
    execSync('vite build', { stdio: 'inherit' });
  }

  // Create production package.json
  const productionPackage = {
    name: "jays-frames-pos",
    version: "1.0.0",
    type: "module",
    main: "server.mjs",
    scripts: { start: "node server.mjs" },
    engines: { node: ">=18.0.0" }
  };

  fs.writeFileSync('dist/package.json', JSON.stringify(productionPackage, null, 2));

  // Create startup script with proper Cloud Run compatibility
  const startupScript = `#!/usr/bin/env node

// Force production environment
process.env.NODE_ENV = 'production';

// Cloud Run port configuration - use process.env.PORT or default to 5000
const PORT = process.env.PORT || '5000';
console.log('🚀 Starting Jay\\'s Frames POS System');
console.log('📍 Environment:', process.env.NODE_ENV);
console.log('🔌 Port:', PORT);
console.log('🌐 Binding to: 0.0.0.0:' + PORT);

// Startup timeout to prevent hanging
const startupTimeout = setTimeout(() => {
  console.error('❌ Startup timeout exceeded (60s)');
  process.exit(1);
}, 60000);

// Import and start the server
import('./server.mjs')
  .then(() => {
    clearTimeout(startupTimeout);
    console.log('✅ Server started successfully');
  })
  .catch(error => {
    clearTimeout(startupTimeout);
    console.error('❌ Server startup failed:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  });

// Handle process signals for graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  clearTimeout(startupTimeout);
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  clearTimeout(startupTimeout);
  process.exit(0);
});`;

  fs.writeFileSync('dist/start.mjs', startupScript);
  console.log('🎉 Deployment ready!');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}