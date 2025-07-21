
#!/usr/bin/env node

import express from 'express';
import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Jay\'s Frames POS System...');

const app = express();

// CORS and basic middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Basic API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/orders', (req, res) => {
  res.json({ orders: [], success: true });
});

app.get('/api/customers', (req, res) => {
  res.json({ customers: [], success: true });
});

app.get('/api/frames', (req, res) => {
  res.json({ frames: [], success: true });
});

app.post('/api/*', (req, res) => {
  res.json({ success: true, message: 'API endpoint ready' });
});

// Create Vite dev server
console.log('Creating Vite dev server...');
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'spa',
  root: path.join(__dirname, 'client'),
  resolve: {
    alias: {
      "@": path.join(__dirname, "client/src"),
      "@shared": path.join(__dirname, "shared"),
    },
  },
});

app.use(vite.ssrFixStacktrace);
app.use(vite.middlewares);

const port = 5000;

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Jay's Frames POS System running on http://0.0.0.0:${port}`);
  console.log(`📱 Access your app at: https://${port}-jayframes-rest-express.replit.dev`);
  console.log(`✅ Server is ready and serving both frontend and backend`);
});

server.on('error', (error) => {
  console.error(`❌ Server error:`, error);
  process.exit(1);
});
