// src/pages/dealer/RepairRequests.jsx
import React from 'react';

const RepairRequests = () => {
  // Dummy data for repair requests
  const repairRequests = [
    { id: 'rep001', product: 'Aerion X-Series Drone', status: 'Pending', date: '2025-05-20', description: 'Gimbal motor issue.' },
    { id: 'rep002', product: 'Aerion Y-Series Battery', status: 'In Progress', date: '2025-05-15', description: 'Battery not charging.' },
    { id: 'rep003', product: 'Aerion Z-Series Drone', status: 'Completed', date: '2025-05-10', description: 'Propeller replacement.' },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#0A2558', marginBottom: '20px' }}>Repair Requests</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>Manage all your drone repair and service requests here.</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Product</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {repairRequests.map(request => (
            <tr key={request.id}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{request.id}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{request.product}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{request.status}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{request.date}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{request.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RepairRequests;