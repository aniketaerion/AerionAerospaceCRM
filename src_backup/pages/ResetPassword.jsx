const handleReset = async (e) => {
  e.preventDefault();
  setError('');
  setMessage('');

  if (!validateEmailDomain(email)) {
    setError(`Email must be a valid ${allowedDomain} address.`);
    return;
  }

  setLoading(true);

  try {
    // Check if user exists in profiles table
    const { data: user, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (fetchError || !user) {
      // Explicitly reject unregistered emails before sending reset
      setError('This email is not registered with us.');
      setLoading(false);
      return;
    }

    // User exists, proceed to send reset email
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage('Password reset link sent. Check your email.');
    }
  } catch (err) {
    setError('Unexpected error occurred. Please try again.');
  } finally {
    setLoading(false);
  }
};