// src/pages/dealer/dashboard/index.jsx
import React from 'react';

export default function DealerDashboard() {
  return (
    <div className="bg-white shadow rounded p-6">
      <h1 className="text-2xl font-bold mb-2 text-blue-800">Aerion CRM Dealer Dashboard</h1>
      <p className="text-gray-700">Welcome to your dealer control panel. Use the sidebar to navigate different modules like Sales, CRM, Inventory, and Support.</p>
      
      {/* Sample Widgets */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-yellow-700 font-semibold">Pending Orders</p>
          <h2 className="text-3xl">12</h2>
        </div>
        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
          <p className="text-green-700 font-semibold">Available Inventory</p>
          <h2 className="text-3xl">54 units</h2>
        </div>
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-semibold">Support Requests</p>
          <h2 className="text-3xl">3</h2>
        </div>
      </div>
    </div>
  );
}
