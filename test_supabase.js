import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import ws from 'ws';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

// No backend Node.js antigo (Node 20 do sandbox) precisamos passar ws
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
  realtime: { transport: ws } // Apenas para testes Node no terminal
});

async function testSupabase() {
  console.log('Testing Supabase connection to:', supabaseUrl);
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    
    if (error) {
      console.error('Connection failed! The schema might not be deployed correctly.');
      console.error('Error Details:', error.message);
    } else {
      console.log('✅ Connection successful!');
      console.log('✅ "profiles" Table accessed. Return Data:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

testSupabase();