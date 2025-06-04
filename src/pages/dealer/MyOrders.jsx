// src/pages/dealer/MyOrders.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sampleOrders } from '../../sampleOrders'; // Assuming this path is correct based on previous files

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // In a real app, you'd fetch orders from an API
    setOrders(sampleOrders);
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'All') {
      return true;
    }
    return order.status === filterStatus;
  });

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#0A2558', marginBottom: '20px' }}>My Orders</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>View all your placed orders and their current status.</p>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <label htmlFor="statusFilter" style={{ marginRight: '10px' }}>Filter by Status:</label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <Link to="/dealer/orders/new" style={{
            backgroundColor: '#F0B800',
            color: '#0A2558',
            padding: '10px 15px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 'bold'
        }}>
            + Place New Order
        </Link>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Order ID</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right' }}>Total Amount</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <tr key={order.id}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{order.id}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{order.date}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{order.status}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right' }}>₹{order.total.toLocaleString()}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                  <Link to={`/dealer/orders/${order.id}`} style={{ color: '#0A2558', textDecoration: 'none', fontWeight: 'bold' }}>
                    View Details
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>No orders found for the selected status.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;