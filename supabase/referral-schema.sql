-- Enhanced Waitlist with Referral System
-- Drop existing table if needed (backup data first!)
-- DROP TABLE IF EXISTS waitlist CASCADE;

-- Create enhanced waitlist table with referral system
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  wallet_address TEXT UNIQUE,
  twitter_username TEXT UNIQUE,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by TEXT, -- referral code of the referrer
  points INTEGER DEFAULT 0,
  total_referrals INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb,
  verified BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX idx_waitlist_email ON waitlist(LOWER(email));
CREATE INDEX idx_waitlist_referral_code ON waitlist(referral_code);
CREATE INDEX idx_waitlist_referred_by ON waitlist(referred_by);
CREATE INDEX idx_waitlist_points ON waitlist(points DESC);
CREATE INDEX idx_waitlist_wallet ON waitlist(LOWER(wallet_address));
CREATE INDEX idx_waitlist_twitter ON waitlist(LOWER(twitter_username));

-- Create referral tracking table for detailed analytics
CREATE TABLE IF NOT EXISTS referral_events (
  id SERIAL PRIMARY KEY,
  referrer_id INTEGER REFERENCES waitlist(id),
  referee_id INTEGER REFERENCES waitlist(id),
  referrer_code TEXT NOT NULL,
  points_awarded INTEGER DEFAULT 10,
  event_type TEXT DEFAULT 'signup', -- signup, verified, bonus
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leaderboard view
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
  id,
  CASE 
    WHEN twitter_username IS NOT NULL THEN '@' || twitter_username
    ELSE SUBSTRING(email FROM 1 FOR 3) || '***' || SUBSTRING(email FROM POSITION('@' IN email))
  END as display_name,
  points,
  total_referrals,
  referral_code,
  created_at,
  ROW_NUMBER() OVER (ORDER BY points DESC, total_referrals DESC, created_at ASC) as rank
FROM waitlist
WHERE points > 0
ORDER BY points DESC, total_referrals DESC
LIMIT 100;

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    -- Generate 6-character alphanumeric code
    code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM waitlist WHERE referral_code = code) INTO exists;
    
    -- If unique, return it
    IF NOT exists THEN
      RETURN code;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to process referral and award points
CREATE OR REPLACE FUNCTION process_referral(
  referee_email TEXT,
  referrer_code TEXT
)
RETURNS VOID AS $$
DECLARE
  referrer_id INTEGER;
  referee_id INTEGER;
BEGIN
  -- Get referrer's ID
  SELECT id INTO referrer_id 
  FROM waitlist 
  WHERE referral_code = referrer_code;
  
  -- Get referee's ID
  SELECT id INTO referee_id 
  FROM waitlist 
  WHERE email = referee_email;
  
  IF referrer_id IS NOT NULL AND referee_id IS NOT NULL THEN
    -- Update referrer's points and referral count
    UPDATE waitlist 
    SET 
      points = points + 10,
      total_referrals = total_referrals + 1,
      updated_at = NOW()
    WHERE id = referrer_id;
    
    -- Log the referral event
    INSERT INTO referral_events (
      referrer_id, 
      referee_id, 
      referrer_code,
      points_awarded
    ) VALUES (
      referrer_id,
      referee_id,
      referrer_code,
      10
    );
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate referral code on insert
CREATE OR REPLACE FUNCTION auto_generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := generate_referral_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_code_on_insert
BEFORE INSERT ON waitlist
FOR EACH ROW
EXECUTE FUNCTION auto_generate_referral_code();

-- Disable RLS for simplicity (enable with proper policies in production)
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;
ALTER TABLE referral_events DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON waitlist TO anon, authenticated;
GRANT ALL ON referral_events TO anon, authenticated;
GRANT SELECT ON leaderboard TO anon, authenticated;
GRANT ALL ON SEQUENCE waitlist_id_seq TO anon, authenticated;
GRANT ALL ON SEQUENCE referral_events_id_seq TO anon, authenticated;