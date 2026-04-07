
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  month TEXT NOT NULL CHECK (month IN ('april', 'may', 'june')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Anyone can insert partners" ON public.partners FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete partners" ON public.partners FOR DELETE USING (true);
