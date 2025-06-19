// src/pages/dealer/profile/index.jsx
import React from 'react';
import LogoutButton from '@/components/auth/LogoutButton'; // Import LogoutButton

const DealerProfile = () => {
  // You would typically fetch user profile data here from Supabase
  const user = {
    name: 'Dealer User',
    email: 'user@dealership.com',
    role: 'Admin',
    lastLogin: '2025-06-18 10:00 AM'
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-neutral-dark mb-6">User Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-custom-medium max-w-lg mx-auto">
        <div className="mb-4">
          <p className="text-gray-600 font-medium">Name:</p>
          <p className="text-xl text-neutral-dark">{user.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 font-medium">Email:</p>
          <p className="text-xl text-neutral-dark">{user.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 font-medium">Role:</p>
          <p className="text-xl text-neutral-dark">{user.role}</p>
        </div>
        <div className="mb-6">
          <p className="text-gray-600 font-medium">Last Login:</p>
          <p className="text-xl text-neutral-dark">{user.lastLogin}</p>
        </div>
        
        {/* Logout Button */}
        <LogoutButton />
      </div>
    </div>
  );
};

export default DealerProfile;
