import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting POS System...');
console.log(`📍 Port: ${PORT}`);
console.log(`📁 Serving from: ${path.join(__dirname, 'dist', 'public')}`);

// Serve static files
app.use(express.static(path.join(__dirname, 'dist', 'public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Catch all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ POS System running on http://0.0.0.0:${PORT}`);
  console.log(`✅ Health check: http://0.0.0.0:${PORT}/health`);
});

// Handle shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Shutting down...');
  process.exit(0);
});