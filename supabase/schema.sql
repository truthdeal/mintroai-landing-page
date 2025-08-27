-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  referral_source TEXT,
  metadata JSONB,
  confirmed BOOLEAN DEFAULT FALSE,
  confirmation_token UUID DEFAULT gen_random_uuid(),
  confirmed_at TIMESTAMP WITH TIME ZONE
);

-- Create index for faster email lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Create index for created_at for sorting
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anonymous users to insert
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a view for public stats (doesn't expose emails)
CREATE VIEW waitlist_stats AS
SELECT 
  COUNT(*) as total_signups,
  COUNT(CASE WHEN confirmed = true THEN 1 END) as confirmed_signups,
  DATE(MAX(created_at)) as last_signup_date
FROM waitlist;

-- Grant access to the view
GRANT SELECT ON waitlist_stats TO anon;