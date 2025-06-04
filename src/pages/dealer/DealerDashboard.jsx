// src/pages/dealer/DealerDashboard.jsx
import React from 'react';

const DealerDashboard = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#0A2558', marginBottom: '20px' }}>Dealer Dashboard Overview</h2>
      <p style={{ color: '#555' }}>
        Welcome to your dealer portal dashboard. Here you can see key metrics and recent activities.
      </p>
      {/* Add dashboard widgets, charts, etc. here */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ color: '#0A2558' }}>Total Orders</h3>
          <p style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#F0B800' }}>125</p>
        </div>
        <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ color: '#0A2558' }}>Pending Repairs</h3>
          <p style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#F0B800' }}>7</p>
        </div>
        <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ color: '#0A2558' }}>Inventory Value</h3>
          <p style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#F0B800' }}>₹12.5M</p>
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;