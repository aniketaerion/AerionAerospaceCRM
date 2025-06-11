// Batch 1 - Dealer CRM Production Code - Aerion Aerospace CRM
// File 1: DealerDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function DealerDashboard() {
  return (
    <div className="p-6 bg-[#003DA5] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Dealer Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <Link to="/dealer/business-profile" className="bg-[#FFE500] text-[#003DA5] p-6 rounded-2xl shadow-xl text-center font-semibold text-xl hover:scale-105 transition">
          Business Profile
        </Link>
        <Link to="/dealer/financial-details" className="bg-[#FFE500] text-[#003DA5] p-6 rounded-2xl shadow-xl text-center font-semibold text-xl hover:scale-105 transition">
          Financial Details
        </Link>
        <Link to="/dealer/my-customers" className="bg-[#FFE500] text-[#003DA5] p-6 rounded-2xl shadow-xl text-center font-semibold text-xl hover:scale-105 transition">
          My Customers
        </Link>
        <Link to="/dealer/my-inventory" className="bg-[#FFE500] text-[#003DA5] p-6 rounded-2xl shadow-xl text-center font-semibold text-xl hover:scale-105 transition">
          My Inventory
        </Link>
        <Link to="/dealer/my-orders" className="bg-[#FFE500] text-[#003DA5] p-6 rounded-2xl shadow-xl text-center font-semibold text-xl hover:scale-105 transition">
          My Orders
        </Link>
        <Link to="/dealer/my-team" className="bg-[#FFE500] text-[#003DA5] p-6 rounded-2xl shadow-xl text-center font-semibold text-xl hover:scale-105 transition">
          My Team
        </Link>
        <Link to="/dealer/repair-requests" className="bg-[#FFE500] text-[#003DA5] p-6 rounded-2xl shadow-xl text-center font-semibold text-xl hover:scale-105 transition">
          Repair Requests
        </Link>
      </div>
      <div className="mt-8 text-center text-sm opacity-70">
        Aerion Aerospace CRM v1.0
      </div>
    </div>
  );
}
