// src/declarations.d.ts

// These are your existing declarations
declare module '@/lib/supabase/supabaseClient.ts';
declare module '@/components/auth/AuthForm';

// --- Add this new section for image files ---
declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.jpeg' {
  const value: any;
  export default value;
}
declare module '@/components/auth/AuthForm';