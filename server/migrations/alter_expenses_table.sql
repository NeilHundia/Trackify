-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Alter the expenses table to use UUID type for user_id
ALTER TABLE expenses 
ALTER COLUMN user_id TYPE uuid USING user_id::uuid;

-- Add foreign key constraint if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'expenses_user_id_fkey'
    ) THEN
        ALTER TABLE expenses
        ADD CONSTRAINT expenses_user_id_fkey 
        FOREIGN KEY (user_id) 
        REFERENCES users(id);
    END IF;
END $$; 