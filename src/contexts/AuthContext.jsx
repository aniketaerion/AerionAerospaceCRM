import { createContext, useContext, useState, useEffect } from 'react';
import supabase from '@/lib/supabase/supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children = null }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (!error) {
        setUser(session?.user ?? null);
      }
      setLoading(false);
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription?.unsubscribe?.();
    };
  }, []);

  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data?.user ?? null);
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const value = { user, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ✅ Export the provider by default (correct for app usage)
export default AuthProvider;
