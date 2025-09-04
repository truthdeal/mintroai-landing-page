-- Simple waitlist table setup for Supabase

-- Create the waitlist table
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  referral_source TEXT,
  metadata JSONB
);

-- Create index for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert into waitlist
CREATE POLICY "Enable insert for all users" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role to read all data
CREATE POLICY "Enable read for service role" ON waitlist
  FOR SELECT
  TO service_role
  USING (true);