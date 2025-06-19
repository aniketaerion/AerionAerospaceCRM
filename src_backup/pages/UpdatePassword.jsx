// src/pages/UpdatePassword.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase/supabaseClient.ts';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('Password updated successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleUpdatePassword}
        className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold mb-4">Update Your Password</h2>
        <input
          type="password"
          className="input w-full mb-4"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn-primary w-full">Update Password</button>
        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </form>
    </div>
  );
};

export default UpdatePassword;
