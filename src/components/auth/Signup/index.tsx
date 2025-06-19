import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@/lib/supabase/supabaseClient.ts';
import AuthForm from '@/components/auth/AuthForm.jsx'; // Correctly import AuthForm
import Input from '@/components/common/inputs'; // Assuming you have a reusable Input component

const SignupPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      // Add checks for password confirmation if needed
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          // You can add additional data here if your users table has more columns
          // e.g., data: { full_name: formData.fullName }
        }
      });

      if (error) {
        throw new Error(error.message || 'An unknown error occurred.');
      }

      // On successful signup, Supabase may or may not create a session
      // depending on your project settings (e.g., email confirmation).
      // It's often best to navigate to a "check your email" page or back to login.
      alert('Signup successful! Please check your email to confirm your account.');
      navigate('/login');

    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      onSubmit={handleSignup}
      type="Signup"
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
            placeholder="Create a strong password"
            onChange={handleChange}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="••••••••"
            onChange={handleChange}
            required
          />
        </>
      )}
    </AuthForm>
  );
};

export default SignupPage;