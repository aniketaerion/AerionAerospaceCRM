// src/pages/dealer/AccountDetails.jsx
import React from 'react';

const AccountDetails = () => {
  // Dummy data for account details
  const dealerInfo = {
    name: 'Aerion Sales & Service - Hyderabad',
    dealerId: 'DEALER-HYD-001',
    contactPerson: 'Aniket Sharma',
    email: 'aniket.sharma@aeriondealers.com',
    phone: '+91 98765 43210',
    address: '123 Aerion Dealer Road, Gachibowli, Hyderabad, Telangana, India',
    status: 'Active',
    contractDate: '2023-01-15'
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#0A2558', marginBottom: '20px' }}>Account Details</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>Manage your dealership account information.</p>

      <div style={{ lineHeight: '1.8', color: '#333' }}>
        <p><strong>Dealership Name:</strong> {dealerInfo.name}</p>
        <p><strong>Dealer ID:</strong> {dealerInfo.dealerId}</p>
        <p><strong>Contact Person:</strong> {dealerInfo.contactPerson}</p>
        <p><strong>Email:</strong> {dealerInfo.email}</p>
        <p><strong>Phone:</strong> {dealerInfo.phone}</p>
        <p><strong>Address:</strong> {dealerInfo.address}</p>
        <p><strong>Status:</strong> {dealerInfo.status}</p>
        <p><strong>Contract Date:</strong> {dealerInfo.contractDate}</p>
      </div>

      <button
        style={{
          backgroundColor: '#0A2558',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '30px',
          fontSize: '1em'
        }}
      >
        Edit Account Details
      </button>
    </div>
  );
};

export default AccountDetails;