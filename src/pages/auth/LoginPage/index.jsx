// src/pages/login/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm.jsx';
import supabase from '@/lib/supabase/supabaseClient.ts';
import { useAuth } from '@/App.jsx';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import AerionLogo from '@/assets/images/aerion-logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setErrorMessage(null);

    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (data?.session?.access_token) {
        authLogin(data.session.access_token);
        navigate('/dealer/dashboard');
      } else {
        setErrorMessage('Invalid credentials or an unexpected error occurred.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Failed to log in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    if (!email) {
      setErrorMessage('Please enter your email to reset the password.');
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Password reset email sent. Please check your inbox.');
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        setErrorMessage('Failed to send reset email. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AuthForm onSubmit={handleLogin} type="Login" errorMessage={errorMessage} isLoading={isLoading}>
      {(handleChange, formData) => (
        <>
          {/* Aerion Logo added to the login form */}
          <div className="flex justify-center mb-8">
            <img src={AerionLogo} alt="Aerion Aerospace Logo" className="h-16 w-auto" />
          </div>

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
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-aerion-blue focus:border-aerion-blue pr-10"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-aerion-blue focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </label>
          <div className="text-right">
            <button
              type="button"
              onClick={() => handleForgotPassword(formData.email)}
              className="text-sm text-aerion-blue hover:underline focus:outline-none"
            >
              Forgot Password?
            </button>
          </div>
          <p className="text-center text-sm mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-aerion-blue hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </>
      )}
    </AuthForm>
  );
};

export default LoginPage;
