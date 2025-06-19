// src/pages/login/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '@/components/AuthForm'; // Import the enhanced AuthForm
import supabase from '@/supabaseClient'; // Import your Supabase client

const SignupPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (formData) => {
    setIsLoading(true);
    setErrorMessage(null); // Clear previous errors

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
      // Supabase signup with email and password
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        // You can add more user metadata here if needed
        // options: {
        //   data: {
        //     full_name: formData.fullName,
        //   }
        // }
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (data?.user) {
        // User successfully signed up
        // Supabase often sends a confirmation email. Inform the user.
        console.log('Signup successful! Please check your email to confirm your account.');
        setErrorMessage('Signup successful! Please check your email to confirm your account.'); // Display success message
        // Redirect to login page after a short delay
        setTimeout(() => navigate('/login'), 3000); 
      } else {
        setErrorMessage('An unexpected error occurred during signup.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage('Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm onSubmit={handleSignup} type="Signup" errorMessage={errorMessage} isLoading={isLoading}>
      {/* Fields for Signup Form */}
      {(handleChange, formData) => (
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
