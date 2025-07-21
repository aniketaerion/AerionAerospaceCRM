// src/pages/auth/LoginPage/index.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '@/lib/supabase/supabaseClient.ts';
import { useAuth } from '@/contexts/AuthContext';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import AerionLogo from '@/assets/images/aerion-logo.png';
import { AuthForm } from '@/components/AuthForm';

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ Fix: Add showPassword state
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

      if (error) throw new Error(error.message);

      if (data.session) {
        // login(data.user, data.session); // Optional
        navigate('/dealer/dashboard');
      } else {
        throw new Error('Login successful, but session not created.');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Navigating to forgot password page...');
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl space-y-8 border border-gray-200">
        <div className="flex justify-center">
          <img src={AerionLogo} alt="Aerion Logo" className="h-40 w-auto object-contain" />
        </div>

        <h2 className="text-center text-4xl font-extrabold text-gray-900">Welcome Back!</h2>
        <p className="mt-2 text-center text-md text-gray-600">Sign in to your Aerion account.</p>

        <AuthForm
          onSubmit={handleLogin}
          type="login"
          errorMessage={errorMessage}
          isLoading={isLoading}
        >
          {(formData, handleChange) => (
            <>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                  placeholder="Email address"
                  value={formData.email || ''}
                  onChange={handleChange}
                />
              </div>

              {/* Password Input with Toggle */}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 pr-10"
                    placeholder="Password"
                    value={formData.password || ''}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-transparent"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end text-sm">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Forgot Password?
                </button>
              </div>
            </>
          )}
        </AuthForm>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
