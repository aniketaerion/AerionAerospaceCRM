// src/components/auth/Signup/index.jsx
// This file is responsible for the Signup page of the application.
import React, { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import AerionLogo from '@/assets/images/aerion-logo.png';
import { useNavigate } from 'react-router-dom';
import supabase from '@/lib/supabase/supabaseClient';

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

      navigate('/login');
    } catch (err) {
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-200 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={AerionLogo} alt="Aerion Logo" className="h-24 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Your Aerion Account</h2>
          <p className="mt-2 text-sm text-gray-600">Manage your dealership operations seamlessly.</p>
        </div>

        {/* Auth Form */}
        <AuthForm
          onSubmit={handleSignupSubmit}
          type="signup"
          errorMessage={error}
          isLoading={loading}
        >
          {(formData, handleChange) => (
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-1 w-full px-4 py-2 border rounded-md text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  value={formData.email || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="mt-1 w-full px-4 py-2 border rounded-md text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  value={formData.password || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="mt-1 w-full px-4 py-2 border rounded-md text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  value={formData.confirmPassword || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
        </AuthForm>

        {/* Redirect to login */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-800 transition duration-200">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
}
