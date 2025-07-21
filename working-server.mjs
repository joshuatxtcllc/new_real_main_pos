// Working server that properly connects to database
import express from 'express';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from "ws";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

neonConfig.webSocketConstructor = ws;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist/public')));

// Database connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Orders endpoint with proper database connection
app.get('/api/orders', async (req, res) => {
  try {
    console.log('Fetching orders from database...');
    
    const ordersResult = await pool.query(`
      SELECT 
        o.*,
        c.name as customer_name,
        c.email as customer_email,
        c.phone as customer_phone
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      ORDER BY o.created_at DESC
    `);
    
    console.log('Found', ordersResult.rows.length, 'orders');
    
    const orders = ordersResult.rows.map(row => ({
      ...row,
      customer: row.customer_name ? {
        id: row.customer_id,
        name: row.customer_name,
        email: row.customer_email,
        phone: row.customer_phone
      } : null,
      id: parseInt(row.id),
      customerId: parseInt(row.customer_id),
      artworkWidth: parseFloat(row.artwork_width) || 0,
      artworkHeight: parseFloat(row.artwork_height) || 0,
      total: row.total || '0.00'
    }));
    
    res.json({ 
      success: true, 
      orders: orders,
      count: orders.length
    });
    
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      orders: [],
      count: 0
    });
  }
});

// Customers endpoint  
app.get('/api/customers', async (req, res) => {
  try {
    const customersResult = await pool.query('SELECT * FROM customers ORDER BY created_at DESC');
    
    res.json({
      success: true,
      customers: customersResult.rows,
      count: customersResult.rows.length
    });
    
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      customers: [],
      count: 0
    });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Working server running on port ${PORT}`);
});