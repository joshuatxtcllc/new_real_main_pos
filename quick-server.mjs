// Quick Server Starter - No shebang to avoid syntax errors
import { spawn } from 'child_process';

console.log('🚀 Starting Jay\'s Frames POS Server...');

// Start the production server
const server = spawn('node', ['dist/server.mjs'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: '5000'
  }
});

server.on('error', (error) => {
  console.error('❌ Server error:', error.message);
});

server.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
});

// Keep process alive
process.on('SIGINT', () => {
  console.log('Shutting down...');
  server.kill();
  process.exit(0);
});