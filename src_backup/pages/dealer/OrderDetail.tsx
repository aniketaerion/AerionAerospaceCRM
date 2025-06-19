// File 8: OrderDetail.tsx

import React from 'react';

type OrderDetailProps = {
  orderId: string;
  date: string;
  status: string;
  items: Array<{ productName: string; quantity: number }>;
};

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId, date, status, items }) => {
  return (
    <div className="p-6 bg-[#003DA5] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="bg-white text-black p-4 rounded mb-6">
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Status:</strong> {status}</p>
      </div>
      <h2 className="text-2xl font-bold mb-4">Items</h2>
      <table className="w-full bg-white text-black rounded shadow">
        <thead>
          <tr className="bg-[#FFE500]">
            <th className="p-3">Product Name</th>
            <th className="p-3">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="p-3">{item.productName}</td>
              <td className="p-3">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;
