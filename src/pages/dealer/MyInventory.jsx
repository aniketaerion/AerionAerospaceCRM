// src/pages/dealer/MyInventory.jsx
import React from 'react';

const MyInventory = () => {
  // Dummy data for inventory
  const inventoryItems = [
    { id: 'inv001', product: 'Aerion X-Series Drone', quantity: 3, status: 'In Stock' },
    { id: 'inv002', product: 'Aerion Y-Series Drone', quantity: 5, status: 'In Stock' },
    { id: 'inv003', product: 'X-Series Propeller Set', quantity: 20, status: 'In Stock' },
    { id: 'inv004', product: 'Aerion Z-Series Drone', quantity: 1, status: 'Low Stock' },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#0A2558', marginBottom: '20px' }}>My Inventory</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>View and manage your current stock of Aerion Aerospace products.</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Product</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Quantity</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map(item => (
            <tr key={item.id}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.id}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.product}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.quantity}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyInventory;