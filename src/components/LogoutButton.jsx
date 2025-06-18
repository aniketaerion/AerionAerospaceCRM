// src/components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/App'; // Import useAuth context from App

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth(); // Get the logout function from AuthContext

  const handleLogout = async () => {
    try {
      await authLogout(); // Call the logout function from AuthContext
      console.log('Successfully logged out.');
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout error:', error.message);
      // In a real app, you'd show a user-friendly modal/toast message here instead of console.error for user.
      console.error('Logout failed. Please try again.'); 
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
