import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/contexts/AuthContext';
import { AuthForm } from '@/components/auth/AuthForm';
import Input from '@/components/Input';
import logo from '@/assets/images/aerion-logo.png'; // Adjust path if needed

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const { session } = await login({
        email: formData.email,
        password: formData.password,
      });

      if (session) {
        navigate('/dealer/dashboard');
      } else {
        throw new Error('Login successful, but no session was created.');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md space-y-6 text-center">
        
        {/* Centered Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="Aerion Logo" className="h-24 w-auto rounded-md" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">Login</h2>

        <AuthForm
          onSubmit={handleLogin}
          type="Login"
          errorMessage={errorMessage}
          isLoading={isLoading}
        >
          {(handleChange) => (
            <div className="space-y-4 text-left">
              <Input
                label="Email"
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
              <div className="text-right text-sm">
                <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-aerion-blue text-white rounded hover:bg-blue-700 transition"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          )}
        </AuthForm>

        <p className="text-sm text-gray-600">
          Don’t have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
