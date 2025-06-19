import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@/supabaseClient.js';
import { useAuth } from '@/App'; // Or from wherever you export your AuthContext
import AuthForm from '@/components/auth/AuthForm.jsx';
import Input from '@/components/Input'; // Assuming you have a reusable Input component

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw new Error(error.message || 'An unknown error occurred.');
      }

      if (data.session) {
        // The onAuthStateChange listener in App.jsx will handle setting the context.
        // We just need to navigate the user to the dashboard.
        navigate('/dealer/dashboard');
      } else {
        // This case is unlikely with Supabase but good for defensive programming
        throw new Error('Login successful, but no session was created.');
      }

    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      onSubmit={handleLogin}
      type="Login"
      errorMessage={errorMessage}
      isLoading={isLoading}
    >
      {(handleChange) => (
        <>
          <Input
            label="Email Address"
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            onChange={handleChange}
            required
          />
        </>
      )}
    </AuthForm>
  );
};

export default LoginPage;