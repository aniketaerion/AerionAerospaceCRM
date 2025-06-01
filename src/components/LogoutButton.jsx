// src/components/LogoutButton.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('authToken');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error.message);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
