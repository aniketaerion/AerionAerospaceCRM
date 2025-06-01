import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import logo from '../assets/logo.png';

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { email, password, name } = formData;

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data?.user) {
        // Optional: store name/email in 'profiles' table
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id, email, name }]);

        if (insertError) {
          console.error('Profile insert failed:', insertError.message);
        }
      }

      alert('Signup successful! Please check your email to confirm.');
      navigate('/login');

    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="input mb-3"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input mb-3"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input mb-4"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
