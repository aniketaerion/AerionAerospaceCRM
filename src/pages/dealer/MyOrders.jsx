// File 7: MyOrders.jsx

import React, { useState } from 'react';

export default function MyOrders() {
  const [orders, setOrders] = useState([
    { id: 1, orderId: 'ORD1001', date: '2025-06-10', status: 'Delivered' },
    { id: 2, orderId: 'ORD1002', date: '2025-06-11', status: 'Pending' }
  ]);

  return (
    <div className="p-6 bg-[#003DA5] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <table className="w-full bg-white text-black rounded shadow">
        <thead>
          <tr className="bg-[#FFE500]">
            <th className="p-3">Order ID</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="p-3">{order.orderId}</td>
              <td className="p-3">{order.date}</td>
              <td className="p-3">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
