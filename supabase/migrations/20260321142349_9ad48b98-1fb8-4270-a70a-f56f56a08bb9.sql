CREATE TABLE public.course_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id text NOT NULL,
  message text NOT NULL,
  message_type text NOT NULL DEFAULT 'general',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.course_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view messages" ON public.course_messages FOR SELECT USING (true);
CREATE POLICY "Anyone can insert messages" ON public.course_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete messages" ON public.course_messages FOR DELETE USING (true);
