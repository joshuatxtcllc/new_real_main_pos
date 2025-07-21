import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
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

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoints (must come before static files)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes placeholder (for basic health)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve static files from dist/public with correct MIME types
const staticPath = path.resolve(__dirname, 'dist', 'public');
console.log(`📁 Serving static files from: ${staticPath}`);

app.use(express.static(staticPath, {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  etag: true,
  index: false, // Don't auto-serve index.html
  setHeaders: (res, path) => {
    // Ensure correct MIME types for assets
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html');
    }
  }
}));

// Catch-all handler for client-side routing (must come AFTER static files)
app.get('*', (req, res) => {
  // Only serve index.html for non-asset requests
  if (!req.path.startsWith('/api') && 
      !req.path.startsWith('/assets') && 
      !req.path.includes('.')) {
    const indexPath = path.resolve(staticPath, 'index.html');
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Jay's Frames POS System`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔌 Port: ${PORT}`);
  console.log(`🌐 Serving on: http://0.0.0.0:${PORT}`);
  console.log(`✅ Server started successfully`);
});