-- ═══════════════════════════════════════════════════════════════
-- Kart Republic — Setup do banco de dados no Supabase
-- Execute no SQL Editor do painel Supabase (supabase.com/dashboard)
-- ═══════════════════════════════════════════════════════════════

-- 1. Tabela de perfis (ligada a auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id                   UUID        REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email                TEXT        NOT NULL,
  role                 TEXT        NOT NULL DEFAULT 'user',
  -- Valores: 'user' | 'admin'
  subscription_status  TEXT        NOT NULL DEFAULT 'inactive',
  -- Valores: 'inactive' | 'trial' | 'active' | 'cancelled'
  subscription_id      TEXT,       -- ID da pre-approval no Mercado Pago
  subscription_plan_id TEXT,       -- ID do plano no Mercado Pago
  trial_ends_at        TIMESTAMPTZ,
  current_period_end   TIMESTAMPTZ,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Usuário lê apenas o próprio perfil
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Usuário atualiza apenas o próprio perfil
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admin pode ver todos os usuários
CREATE POLICY "Admins view all profiles"
  ON public.profiles FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

-- Admin pode atualizar dados de qualquer usuário
CREATE POLICY "Admins update any profile"
  ON public.profiles FOR UPDATE
  USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  )
  WITH CHECK (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

-- Admin pode deletar usuários
CREATE POLICY "Admins delete users"
  ON public.profiles FOR DELETE
  USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

-- 3. Trigger: cria profile automaticamente ao fazer signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

-- 4. Tabela de setups
CREATE TABLE IF NOT EXISTS public.setups (
  id                  TEXT        PRIMARY KEY,
  user_id             UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date                TEXT,
  "kartModel"         TEXT,
  "trackName"         TEXT,
  "trackCondition"    TEXT,
  "sessionType"       TEXT,
  "setupType"         TEXT,
  "bitolaFront"       TEXT,
  "bitolaRear"        TEXT,
  "camberLeft"        TEXT,
  "camberRight"       TEXT,
  "casterLeft"        TEXT,
  "casterRight"       TEXT,
  "toeIn"             TEXT,
  "toeOut"            TEXT,
  ackerman            TEXT,
  "pressureFL"        TEXT,
  "pressureFR"        TEXT,
  "pressureRL"        TEXT,
  "pressureRR"        TEXT,
  "heightFront"       TEXT,
  "heightRear"        TEXT,
  "axleType"          TEXT,
  "seatInclination"   TEXT,
  "bumperFront"       TEXT,
  "bumperRear"        TEXT,
  coroa               TEXT,
  "gearNotes"         TEXT,
  notes               TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.setups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own setups"
  ON public.setups FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. Tabela de sessões de telemetria
CREATE TABLE IF NOT EXISTS public.telemetry_sessions (
  id                  TEXT        PRIMARY KEY,
  user_id             UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  filename            TEXT,
  date                TIMESTAMPTZ,
  format              TEXT,
  "lapCount"          INTEGER,
  "bestLapMs"         NUMERIC,
  "avgLapMs"          NUMERIC,
  laps                JSONB,
  "linked_setup_id"   TEXT        REFERENCES public.setups(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.telemetry_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own telemetry"
  ON public.telemetry_sessions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 6. Verificação
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('profiles', 'setups', 'telemetry_sessions')
ORDER BY table_name;
