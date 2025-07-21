
-- Add payment audit log for compliance and debugging
CREATE TABLE IF NOT EXISTS payment_audit_log (
  id SERIAL PRIMARY KEY,
  payment_link_id INTEGER REFERENCES payment_links(id),
  order_id INTEGER REFERENCES orders(id),
  event_type TEXT NOT NULL, -- 'created', 'attempted', 'succeeded', 'failed', 'refunded'
  payment_intent_id TEXT,
  amount NUMERIC(10, 2),
  payment_method TEXT,
  stripe_event_id TEXT,
  customer_ip TEXT,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_payment_audit_log_payment_link_id ON payment_audit_log(payment_link_id);
CREATE INDEX IF NOT EXISTS idx_payment_audit_log_order_id ON payment_audit_log(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_audit_log_event_type ON payment_audit_log(event_type);
CREATE INDEX IF NOT EXISTS idx_payment_audit_log_created_at ON payment_audit_log(created_at);
