import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@/lib/supabase/supabaseClient.ts';
import { useAuth } from '@/contexts/AuthContext';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import AerionLogo from '@/assets/images/aerion-logo.png'; // Adjust path if needed

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw new Error(error.message);
      if (data.session) navigate('/dealer/dashboard');
      else throw new Error('Login successful, but session not created.');
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForgotPassword = () => {
    // Optional: Add your forgot password logic
    alert('Redirect to forgot password screen');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-80 px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-xl">
        <div className="flex justify-center">
          <img src={AerionLogo} alt="Aerion Logo" className="h-40 w-auto" />
        </div>

        <h2 className="text-center text-2xl font-bold text-neutral-900">Login</h2>

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-gray-300 p-2 pr-10 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end text-sm">
            <button type="button" onClick={handleForgotPassword} className="text-blue-600 hover:underline">
              Forgot Password?
            </button>
          </div>

          {errorMessage && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-md">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline font-semibold">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
