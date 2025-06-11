// File 3: MyCustomers.jsx

import React, { useState } from 'react';

export default function MyCustomers() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', phone: '9876543210', product: 'Drone A' },
    { id: 2, name: 'Jane Smith', phone: '9123456780', product: 'Drone B' }
  ]);

  return (
    <div className="p-6 bg-[#003DA5] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">My Customers</h1>
      <table className="w-full bg-white text-black rounded shadow">
        <thead>
          <tr className="bg-[#FFE500]">
            <th className="p-3">Name</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Product</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td className="p-3">{customer.name}</td>
              <td className="p-3">{customer.phone}</td>
              <td className="p-3">{customer.product}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
