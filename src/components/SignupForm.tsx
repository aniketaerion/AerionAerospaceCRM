import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { usePasswordPwnedCheck } from '@/hooks/usePasswordPwnedCheck';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { checkPassword, isChecking, error: pwnedError } = usePasswordPwnedCheck();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email || !password) {
      setFormError('Email and password are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if password has been compromised
      const isPwned = await checkPassword(password);

      if (isPwned) {
        setFormError('This password has been compromised in data breaches. Please choose a different one.');
        setIsSubmitting(false);
        return;
      }

      // Proceed to sign up user
      const { error: signupError } = await supabase.auth.signUp({ email, password });

      if (signupError) {
        setFormError(`Signup failed: ${signupError.message}`);
      } else {
        alert('Signup successful! Please check your email to confirm your account.');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setFormError('An unexpected error occurred during signup. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="email">Email:</label><br />
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={isSubmitting || isChecking}
        />
      </div>

      {pwnedError && <p style={{ color: 'orange' }}>Warning: {pwnedError}</p>}

      {formError && <p style={{ color: 'red' }}>{formError}</p>}

      <button
        type="submit"
        disabled={isSubmitting || isChecking}
        style={{ marginTop: 20 }}
      >
        {isSubmitting ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}
