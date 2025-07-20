import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext'; // ✅ Correct path to AuthContext

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth(); // ✅ Access logout from AuthContext

  const handleLogout = async () => {
    try {
      await authLogout(); // Call logout
      console.log('Successfully logged out.');
      navigate('/login'); // Redirect after logout
    } catch (error) {
      console.error('Logout error:', error.message);
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
