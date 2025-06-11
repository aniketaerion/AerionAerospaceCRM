// File 4: BusinessProfile.jsx

import React, { useState } from 'react';

export default function BusinessProfile() {
  const [profile, setProfile] = useState({
    businessName: 'Aerion Dealer Pvt Ltd',
    ownerName: 'Dealer Name',
    gstNumber: '27ABCDE1234F1Z5',
    address: '123, Main Street, Pune',
    phone: '9876543210',
    email: 'dealer@example.com'
  });

  return (
    <div className="p-6 bg-[#003DA5] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Business Profile</h1>
      <div className="space-y-4">
        <div className="bg-white text-black p-4 rounded">
          <strong>Business Name:</strong> {profile.businessName}
        </div>
        <div className="bg-white text-black p-4 rounded">
          <strong>Owner Name:</strong> {profile.ownerName}
        </div>
        <div className="bg-white text-black p-4 rounded">
          <strong>GST Number:</strong> {profile.gstNumber}
        </div>
        <div className="bg-white text-black p-4 rounded">
          <strong>Address:</strong> {profile.address}
        </div>
        <div className="bg-white text-black p-4 rounded">
          <strong>Phone:</strong> {profile.phone}
        </div>
        <div className="bg-white text-black p-4 rounded">
          <strong>Email:</strong> {profile.email}
        </div>
      </div>
    </div>
  );
}
