-- Create seasons table for dynamic pricing
CREATE TABLE public.seasons (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  season_type text NOT NULL DEFAULT 'regular',
  start_date date NOT NULL,
  end_date date NOT NULL,
  price_multiplier numeric NOT NULL DEFAULT 1.0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create tax_config table
CREATE TABLE public.tax_config (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  percentage numeric NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create meal_plan_prices table
CREATE TABLE public.meal_plan_prices (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meal_plan text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  adult_price numeric NOT NULL DEFAULT 0,
  child_price numeric NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plan_prices ENABLE ROW LEVEL SECURITY;

-- Seasons policies
CREATE POLICY "Anyone can view active seasons" ON public.seasons FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all seasons" ON public.seasons FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Admins can insert seasons" ON public.seasons FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update seasons" ON public.seasons FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Super admins can delete seasons" ON public.seasons FOR DELETE USING (has_role(auth.uid(), 'super_admin'));

-- Tax config policies
CREATE POLICY "Anyone can view active taxes" ON public.tax_config FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all taxes" ON public.tax_config FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Admins can insert taxes" ON public.tax_config FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update taxes" ON public.tax_config FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Super admins can delete taxes" ON public.tax_config FOR DELETE USING (has_role(auth.uid(), 'super_admin'));

-- Meal plan prices policies
CREATE POLICY "Anyone can view active meal plans" ON public.meal_plan_prices FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all meal plans" ON public.meal_plan_prices FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Admins can insert meal plans" ON public.meal_plan_prices FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update meal plans" ON public.meal_plan_prices FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Super admins can delete meal plans" ON public.meal_plan_prices FOR DELETE USING (has_role(auth.uid(), 'super_admin'));

-- Insert default meal plans
INSERT INTO public.meal_plan_prices (meal_plan, name, description, adult_price, child_price, is_active) VALUES
  ('EP', 'European Plan', 'Room only, no meals included', 0, 0, true),
  ('CP', 'Continental Plan', 'Room with breakfast', 800, 400, true),
  ('MAP', 'Modified American Plan', 'Room with breakfast and dinner', 1500, 750, true),
  ('AP', 'American Plan', 'Room with all three meals', 2200, 1100, true);

-- Insert default tax
INSERT INTO public.tax_config (name, percentage, is_active) VALUES
  ('GST', 18, true);