// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';


// ✅ Load environment variables from .env (Vite-style)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ✅ Safety checks to avoid silent failures
if (!supabaseUrl) {
  throw new Error('❌ Missing VITE_SUPABASE_URL in .env file');
}
if (!supabaseAnonKey) {
  throw new Error('❌ Missing VITE_SUPABASE_ANON_KEY in .env file');
}

// ✅ Create and export the Supabase client instance
const supabase = createClient(supabaseUrl, supabaseAnonKey, { 
  persistSession: true,
  autoRefreshToken: true,
  detectSessionInUrl: true
});

export default supabase;   // ← correct default export
