
-- Registrations table
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_name TEXT NOT NULL,
  num_participants INTEGER NOT NULL CHECK (num_participants BETWEEN 2 AND 4),
  leader_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  year_of_study TEXT NOT NULL,
  participants JSONB NOT NULL DEFAULT '[]'::jsonb,
  id_card_url TEXT,
  payment_screenshot_url TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  registration_status TEXT NOT NULL DEFAULT 'pending',
  is_simats BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX registrations_email_team_idx ON public.registrations (lower(email), lower(team_name));

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Anyone (anon) can insert a registration
CREATE POLICY "Anyone can register"
  ON public.registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view/update/delete (admin dashboard)
CREATE POLICY "Authenticated can view registrations"
  ON public.registrations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update registrations"
  ON public.registrations FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated can delete registrations"
  ON public.registrations FOR DELETE
  TO authenticated
  USING (true);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('id-cards', 'id-cards', true)
  ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('payment-screenshots', 'payment-screenshots', true)
  ON CONFLICT (id) DO NOTHING;

-- Public can upload + read in these buckets
CREATE POLICY "Public upload id-cards"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'id-cards');

CREATE POLICY "Public read id-cards"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'id-cards');

CREATE POLICY "Public upload payment-screenshots"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'payment-screenshots');

CREATE POLICY "Public read payment-screenshots"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'payment-screenshots');
