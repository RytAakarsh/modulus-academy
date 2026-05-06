CREATE TABLE public.student_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  course_id TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (course_id, email)
);

ALTER TABLE public.student_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view student accounts"
  ON public.student_accounts FOR SELECT USING (true);

CREATE POLICY "Anyone can insert student accounts"
  ON public.student_accounts FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can delete student accounts"
  ON public.student_accounts FOR DELETE USING (true);

CREATE POLICY "Anyone can update student accounts"
  ON public.student_accounts FOR UPDATE USING (true);

CREATE INDEX idx_student_accounts_course ON public.student_accounts(course_id);