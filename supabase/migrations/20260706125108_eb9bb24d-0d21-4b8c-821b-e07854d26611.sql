
ALTER TABLE public.partners DROP CONSTRAINT IF EXISTS partners_month_check;

ALTER TABLE public.partners ADD CONSTRAINT partners_month_check
  CHECK (month IN ('january','february','march','april','may','june','july','august','september','october','november','december'));
