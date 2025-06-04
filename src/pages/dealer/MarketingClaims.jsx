// src/pages/dealer/MarketingClaims.jsx
import React from 'react';

const MarketingClaims = () => {
  // Dummy data for marketing claims
  const marketingClaims = [
    { id: 'mkc001', type: 'Advertising Reimbursement', status: 'Approved', amount: 5000, date: '2025-04-10' },
    { id: 'mkc002', type: 'Co-op Marketing Fund', status: 'Pending Review', amount: 2500, date: '2025-05-01' },
    { id: 'mkc003', type: 'Promotional Material Request', status: 'Shipped', date: '2025-04-25' },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#0A2558', marginBottom: '20px' }}>Marketing Claims</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>Submit and track your marketing claims and requests for support.</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Type</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Amount/Details</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {marketingClaims.map(claim => (
            <tr key={claim.id}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{claim.id}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{claim.type}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{claim.status}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{claim.amount ? `₹${claim.amount.toLocaleString()}` : claim.status}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{claim.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketingClaims;