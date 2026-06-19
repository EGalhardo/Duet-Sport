import { createClient } from '@supabase/supabase-js';

// Adicionamos esta linha para evitar que o linter do Typescript bloqueie a leitura das variáveis Vite (.env)
// @ts-ignore
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// @ts-ignore
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Atenção: Credenciais do Supabase não encontradas no ficheiro .env');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);