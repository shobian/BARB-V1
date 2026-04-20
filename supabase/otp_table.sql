-- ==============================================================================
-- OTP VERIFICATION TABLE
-- Run this once in Supabase SQL Editor.
-- Stores short-lived 6-digit codes for email verification on the application form.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS email_otps (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text NOT NULL,
  code       text NOT NULL,
  expires_at timestamptz NOT NULL,
  used       boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS email_otps_email_idx ON email_otps(email);

-- RLS is intentionally disabled — this table only holds short-lived 6-digit codes,
-- no personal data. The anon key can be used safely from API routes.

-- Optionally auto-clean expired rows (requires pg_cron extension in Supabase)
-- SELECT cron.schedule('delete-expired-otps', '*/10 * * * *', 'DELETE FROM email_otps WHERE expires_at < now()');
