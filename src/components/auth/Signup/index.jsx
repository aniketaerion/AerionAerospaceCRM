// src/pages/auth/SignupPage/index.jsx
import React, { useState } from 'react';
import { AuthForm } from '@/components/AuthForm'; // Fixed import path
import AerionLogo from '@/assets/images/aerion-logo.png';
import { useNavigate } from 'react-router-dom';
import supabase from '@/lib/supabase/supabaseClient'; // Make sure this is correct

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignupSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const { email, password, confirmPassword } = data;

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw new Error(signUpError.message);
      }

      console.log('Signup successful for:', email);
      // You may want to show a "Check your email to confirm" message here instead
      navigate('/login');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during signup.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl space-y-8 border border-gray-200">
        <div className="flex justify-center">
          <img src={AerionLogo} alt="Aerion Logo" className="h-40 w-auto object-contain" />
        </div>

        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
          Create Your Aerion Account
        </h2>
        <p className="mt-4 text-center text-md text-gray-600">
          Join us to manage your dealership's operations seamlessly.
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
            Log in here
          </a>
        </p>

        <AuthForm
          onSubmit={handleSignupSubmit}
          type="signup"
          errorMessage={error}
          isLoading={loading}
        >
          {(formData, handleChange) => (
            <>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                  value={formData.email || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Password"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                  value={formData.password || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Confirm Password"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                  value={formData.confirmPassword || ''}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </AuthForm>
      </div>
    </div>
  );
}
