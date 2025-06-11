// src/layouts/DealerPortalLayout.jsx

import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import aerionLogo from '../assets/aerion-logo.png'; // use your updated logo path
import '../index.css'; // import tailwind or your global styles

const DealerPortalLayout = ({ dealerName }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { path: '/dealer/dashboard', label: 'Dashboard' },
    { path: '/dealer/my-customers', label: 'My Customers' },
    { path: '/dealer/add-customer', label: 'Add Customer' },
    { path: '/dealer/inventory', label: 'Inventory' },
    { path: '/dealer/orders', label: 'My Orders' },
    { path: '/dealer/place-order', label: 'Place Order' },
    { path: '/dealer/repair-requests', label: 'Repair Requests' },
    { path: '/dealer/financial-details', label: 'Financial Details' },
    { path: '/dealer/business-profile', label: 'Business Profile' },
    { path: '/dealer/team', label: 'My Team' },
    { path: '/dealer/marketing', label: 'Marketing' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0d1b2a] text-white flex flex-col justify-between">
        <div>
          <div className="p-4 flex flex-col items-center border-b border-gray-700">
            <img src={aerionLogo} alt="Aerion Logo" className="w-32 h-auto mb-2" />
            <h2 className="text-lg font-semibold text-center">{dealerName}</h2>
          </div>

          <nav className="mt-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 hover:bg-[#1b263b] transition ${
                  location.pathname === item.path ? 'bg-[#1b263b]' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-[#1b263b] text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dealer Portal</h1>
          <div className="flex items-center space-x-4">
            <span className="font-medium">{dealerName}</span>
            <a
              href="https://www.aerionaerospace.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 underline"
            >
              Visit Website
            </a>
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>

        <footer className="bg-[#1b263b] text-white text-center py-2 text-sm">
          © {new Date().getFullYear()} Aerion Aerospace | Customer Care: +91-XXXXXXXXXX | Social: FB | Insta | LinkedIn
        </footer>
      </div>
    </div>
  );
};

export default DealerPortalLayout;
