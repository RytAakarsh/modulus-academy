-- Create enum for submission types
CREATE TYPE public.submission_type AS ENUM ('enrollment', 'contact', 'notes_request');

-- Create table for all form submissions
CREATE TABLE public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_type submission_type NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course TEXT,
  subject TEXT,
  chapter TEXT,
  message TEXT,
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (public form submissions)
CREATE POLICY "Anyone can submit forms" 
ON public.form_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow read for authenticated users only (admin)
CREATE POLICY "Authenticated users can view submissions" 
ON public.form_submissions 
FOR SELECT 
TO authenticated
USING (true);

-- Create table for OTP verification
CREATE TABLE public.otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL, -- email or phone
  otp_code TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email', 'phone')),
  verified BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts
CREATE POLICY "Anyone can create OTP" 
ON public.otp_verifications 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow updates
CREATE POLICY "Anyone can update OTP" 
ON public.otp_verifications 
FOR UPDATE 
USING (true);

-- Create policy to allow select for verification
CREATE POLICY "Anyone can check OTP" 
ON public.otp_verifications 
FOR SELECT 
USING (true);