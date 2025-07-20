// src/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'; // ✅ Ensure correct path, consider using @/assets/images/logo.png if configured

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login'); // Assuming '/login' is correct for your auth flow
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* CORRECTED: Logo link should point to the correct portal dashboard */}
            <Link to={isLoggedIn ? "/dealer/dashboard" : "/login"}>
              <img
                src={logo} // Make sure this path resolves correctly (e.g., using @ alias)
                alt="Shakti Agro Drones Logo" // Updated Alt text
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6 text-sm font-medium text-gray-700 items-center">
            {isLoggedIn && (
              <>
                <li>
                  {/* CORRECTED: Dashboard link should point to the correct portal dashboard */}
                  <Link to="/dealer/dashboard" className="hover:text-blue-600">
                    Dashboard
                  </Link>
                </li>
                <li>
                  {/* Verify this path if 'leadform' is under /dealer/. If so, change to /dealer/leadform */}
                  <Link to="/leadform" className="hover:text-blue-600">
                    Lead Form
                  </Link>
                </li>
              </>
            )}
            {/* Public/General Links - verify if these are always public or should be under /dealer/ */}
            <li>
              <Link to="/about" className="hover:text-blue-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-blue-600">
                Support
              
              </Link>
            </li>

            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;