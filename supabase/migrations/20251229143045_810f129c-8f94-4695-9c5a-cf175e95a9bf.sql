-- Create notes table to store uploaded notes by superadmin
CREATE TABLE public.course_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id TEXT NOT NULL,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  uploaded_by TEXT DEFAULT 'superadmin'
);

-- Create lectures table to store lecture links
CREATE TABLE public.course_lectures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  lecture_type TEXT DEFAULT 'recorded',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.course_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lectures ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (students can view after login)
CREATE POLICY "Anyone can view notes" 
ON public.course_notes 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert notes" 
ON public.course_notes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view lectures" 
ON public.course_lectures 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert lectures" 
ON public.course_lectures 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update lectures" 
ON public.course_lectures 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete lectures" 
ON public.course_lectures 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can delete notes" 
ON public.course_notes 
FOR DELETE 
USING (true);

-- Create storage bucket for course notes PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('course-notes', 'course-notes', true);

-- Create storage policies for the bucket
CREATE POLICY "Anyone can view course notes files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'course-notes');

CREATE POLICY "Anyone can upload course notes files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'course-notes');

CREATE POLICY "Anyone can delete course notes files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'course-notes');