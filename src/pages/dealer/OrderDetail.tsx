// src/pages/dealer/OrderDetail.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sampleOrders, Order } from '../../sampleOrders'; // Adjust path if needed

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>(); // Get the order ID from the URL
  const navigate = useNavigate(); // Hook for navigation

  // Find the order from your sample data
  const order: Order | undefined = sampleOrders.find(o => o.id === orderId);

  if (!order) {
    // Handle case where order is not found (e.g., show a 404 message or redirect)
    return (
      <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h2 style={{ color: '#dc3545' }}>Order Not Found</h2>
        <p>The order with ID "{orderId}" could not be found.</p>
        <button
          onClick={() => navigate('/dealer/orders')}
          style={{
            backgroundColor: '#0A2558',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '15px'
          }}
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#0A2558', marginBottom: '25px' }}>Order Details: {order.id}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div>
          <p style={{ margin: '5px 0' }}><strong>Order Date:</strong> {order.date}</p>
          <p style={{ margin: '5px 0' }}><strong>Total Amount:</strong> ₹{order.total.toLocaleString()}</p>
          <p style={{ margin: '5px 0' }}>
            <strong>Status:</strong>
            <span style={{
              padding: '4px 8px',
              borderRadius: '15px',
              fontSize: '0.9em',
              fontWeight: 'bold',
              marginLeft: '10px',
              backgroundColor:
                order.status === 'Delivered' ? '#d4edda' :
                order.status === 'Shipped' ? '#ffeeba' :
                order.status === 'Processing' ? '#cfe2ff' : '#f8d7da',
              color:
                order.status === 'Delivered' ? '#155724' :
                order.status === 'Shipped' ? '#856404' :
                order.status === 'Processing' ? '#072462' : '#721c24'
            }}>
              {order.status}
            </span>
          </p>
        </div>
        <div>
          <p style={{ margin: '5px 0' }}><strong>Tracking Number:</strong> {order.trackingNumber || 'N/A'}</p>
          <p style={{ margin: '5px 0' }}><strong>Expected Delivery:</strong> {order.expectedDelivery || 'N/A'}</p>
          {/* You can add more order header details here as per your data model */}
        </div>
      </div>

      <h3 style={{ color: '#F0B800', marginBottom: '15px' }}>Order Items</h3>
      {order.items && order.items.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '12px 15px', textAlign: 'left', color: '#0A2558' }}>Item Name</th>
              <th style={{ padding: '12px 15px', textAlign: 'left', color: '#0A2558' }}>Quantity</th>
              <th style={{ padding: '12px 15px', textAlign: 'left', color: '#0A2558' }}>Unit Price</th>
              <th style={{ padding: '12px 15px', textAlign: 'left', color: '#0A2558' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px 15px', color: '#333' }}>{item.name}</td>
                <td style={{ padding: '10px 15px', color: '#333' }}>{item.quantity}</td>
                <td style={{ padding: '10px 15px', color: '#333' }}>₹{item.price.toLocaleString()}</td>
                <td style={{ padding: '10px 15px', color: '#333' }}>₹{(item.quantity * item.price).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items found for this order.</p>
      )}

      <button
        onClick={() => navigate('/dealer/orders')}
        style={{
          backgroundColor: '#0A2558',
          color: '#fff',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '30px'
        }}
      >
        Back to Orders
      </button>
    </div>
  );
};

export default OrderDetail;