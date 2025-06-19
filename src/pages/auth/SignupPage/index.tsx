// src/pages/login/SignupPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm.jsx'; // Import the enhanced AuthForm
import supabase from '@/supabaseClient.js'; // Import your Supabase client
import { AuthError } from '@supabase/supabase-js'; // Import Supabase types

// Define an interface for the form data for better type safety
interface SignupFormData {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupPage = () => {
  const navigate = useNavigate();
  // Add types for state variables
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Add the type for the formData parameter
  const handleSignup = async (formData: SignupFormData) => {
    setIsLoading(true);
    setErrorMessage(null);
    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        // 'error' is now correctly typed as AuthError | null
        setErrorMessage(error.message);
      } else if (data?.user) {
        console.log('Signup successful! Please check your email to confirm your account.');
        setErrorMessage('Signup successful! Please check your email to confirm your account.');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setErrorMessage('An unexpected error occurred during signup.');
      }
    } catch (error) {
      // Safely handle the 'unknown' error type in a catch block
      console.error('Signup error:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('A critical error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Assuming AuthForm can handle typed children, otherwise this may need adjustment in AuthForm itself
    <AuthForm onSubmit={handleSignup} type="Signup" errorMessage={errorMessage} isLoading={isLoading}>
      {(handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, formData: SignupFormData) => (
        <>
          <label className="block text-neutral-dark text-sm font-medium mb-1">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-aerion-blue focus:border-aerion-blue"
              required
              autoComplete="email"
            />
          </label>
          <label className="block text-neutral-dark text-sm font-medium mb-1">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-aerion-blue focus:border-aerion-blue"
              required
              autoComplete="new-password"
            />
          </label>
          <label className="block text-neutral-dark text-sm font-medium mb-1">
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-aerion-blue focus:border-aerion-blue"
              required
              autoComplete="new-password"
            />
          </label>
          <div className="text-center text-sm mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-aerion-blue hover:underline font-semibold">
              Log in here
            </Link>
          </div>
        </>
      )}
    </AuthForm>
  );
};

export default SignupPage;