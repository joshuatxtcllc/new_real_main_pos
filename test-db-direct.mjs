// Test database connection directly
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import dotenv from 'dotenv';

dotenv.config();

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL not found");
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool });

try {
  console.log('Testing database connection...');
  const result = await db.execute('SELECT COUNT(*) as count FROM orders');
  console.log('Direct database query result:', result);
  
  const ordersQuery = await db.execute('SELECT id, customer_id, status, total FROM orders LIMIT 5');
  console.log('Sample orders:', ordersQuery);
  
} catch (error) {
  console.error('Database connection error:', error);
} finally {
  await pool.end();
}