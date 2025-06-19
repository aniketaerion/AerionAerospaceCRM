import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'; // ✅ Ensure correct path

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={isLoggedIn ? "/dashboard" : "/login"}>
              <img
                src={logo}
                alt="Aerion Aerospace Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6 text-sm font-medium text-gray-700 items-center">
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/dashboard" className="hover:text-blue-600">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/leadform" className="hover:text-blue-600">
                    Lead Form
                  </Link>
                </li>
              </>
            )}
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
