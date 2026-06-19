-- Ativar a extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabela de Perfis (Profiles)
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name text,
  email text,
  avatar text,
  ranking text DEFAULT 'Bronze',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Configurar RLS para Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Utilizadores podem ler os seus próprios perfis" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Utilizadores podem atualizar os seus próprios perfis" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Qualquer pessoa pode ler perfis para Ranking" ON public.profiles FOR SELECT USING (true);

-- 2. Tabela de Carteiras (Wallets)
CREATE TABLE public.wallets (
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  balance numeric DEFAULT 1500, -- Bónus inicial de 1500 Kz
  blocked_balance numeric DEFAULT 0,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Configurar RLS para Wallets
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Utilizadores podem ver as suas próprias carteiras" ON public.wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Utilizadores podem atualizar as suas próprias carteiras" ON public.wallets FOR UPDATE USING (auth.uid() = user_id);

-- 3. Tabela de Apostas (Bets)
CREATE TABLE public.bets (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  match_id text NOT NULL,
  user_id uuid REFERENCES public.profiles(id),
  category text NOT NULL,
  market text,
  amount numeric NOT NULL,
  status text DEFAULT 'Open',
  password text,
  room_name text,
  selected_markets jsonb,
  odds jsonb,
  max_participants integer DEFAULT 2,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Configurar RLS para Bets
ALTER TABLE public.bets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Todos podem ler apostas abertas" ON public.bets FOR SELECT USING (true);
CREATE POLICY "Utilizadores podem criar apostas" ON public.bets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Utilizadores podem atualizar as suas apostas" ON public.bets FOR UPDATE USING (auth.uid() = user_id);

-- 4. Tabela de Notificações (Notifications)
CREATE TABLE public.notifications (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  emoji text,
  challenge_id text,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Configurar RLS para Notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Utilizadores vêm as suas próprias notificações" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Utilizadores atualizam as suas notificações" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Permitir envio de notificações" ON public.notifications FOR INSERT WITH CHECK (true);

-- 5. Função Triggers (Para criar carteira e perfil ao criar conta no Supabase Auth)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, avatar)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, new.raw_user_meta_data->>'avatar_url');
  
  INSERT INTO public.wallets (user_id, balance, blocked_balance)
  VALUES (new.id, 1500, 0);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger disparado no registo
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();