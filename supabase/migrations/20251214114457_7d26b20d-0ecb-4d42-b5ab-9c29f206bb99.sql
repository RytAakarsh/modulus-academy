-- Drop existing SELECT policy that requires authentication
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public.form_submissions;

-- Create new policy to allow anyone to view submissions (for admin dashboard)
CREATE POLICY "Anyone can view submissions" 
ON public.form_submissions 
FOR SELECT 
USING (true);