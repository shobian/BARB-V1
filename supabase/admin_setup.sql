-- ==============================================================================
-- BARB ADMIN SETUP — Run this in Supabase SQL Editor
-- Adds missing RLS policies needed for the admin panel API routes.
-- The service role key bypasses RLS, so these are only needed if you
-- ever query via authenticated (JWT) clients directly.
-- ==============================================================================

-- Allow authenticated users to read all applications (admin panel)
CREATE POLICY "Allow authenticated read all applications"
ON therapist_applications FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to update application review_status
CREATE POLICY "Allow authenticated update applications"
ON therapist_applications FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users to insert therapists (approve action)
CREATE POLICY "Allow authenticated insert therapists"
ON therapists FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update therapists
CREATE POLICY "Allow authenticated update therapists"
ON therapists FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users to read all therapists (including hidden ones)
CREATE POLICY "Allow authenticated read all therapists"
ON therapists FOR SELECT
TO authenticated
USING (true);

-- ==============================================================================
-- STORAGE BUCKET SETUP
-- Run this once if the bucket doesn't exist yet.
-- (Skip if you've already run supabase/storage.sql)
-- ==============================================================================

-- insert into storage.buckets (id, name, public)
-- values ('application-documents', 'application-documents', false)
-- ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- CREATE ADMIN USER
-- Do this in: Supabase Dashboard → Authentication → Users → Add User
-- Set a strong password. The admin will log in at /admin/login.
-- ==============================================================================

-- ==============================================================================
-- VERIFY SCHEMA (check that all required columns exist)
-- ==============================================================================

-- therapist_applications should have these columns (from database_schema_update.sql):
-- review_status, address_line, nic_front_file_name, nic_back_file_name,
-- expired_rbt_file_name, expired_ibt_file_name, education_file_name,
-- work_experience_file_name, cv_file_name, insurance_file_name

-- therapists should have:
-- application_id, registration_number, status (therapist_status enum),
-- directory_visible, full_name (generated column)

-- public_directory view should exist and expose:
-- id, full_name, profile_image_url, bio, registration_number,
-- designation, work_place_name, work_place_address, city, status
