
-- Add flexible payment support to order groups
ALTER TABLE order_groups 
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS amount_paid NUMERIC(10, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS balance_due NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS deposit_amount NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS final_payment_due BOOLEAN DEFAULT FALSE;

-- Update existing records to have proper payment status
UPDATE order_groups 
SET payment_status = CASE 
  WHEN stripe_payment_status = 'succeeded' OR payment_method = 'cash' OR payment_method = 'check' THEN 'paid'
  ELSE 'pending'
END
WHERE payment_status = 'pending';

-- Set balance_due for existing unpaid orders
UPDATE order_groups 
SET balance_due = CAST(total AS NUMERIC)
WHERE payment_status = 'pending' AND balance_due IS NULL;
