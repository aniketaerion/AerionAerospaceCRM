// src/components/Footer.jsx
import React from 'react';
import { FaLinkedin, FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 border-t">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        
        {/* Left side: Copyright */}
        <div className="text-sm text-center sm:text-left">
          © {new Date().getFullYear()} Aerion Aerospace. All rights reserved.
        </div>

        {/* Center: Contact Info */}
        <div className="text-sm text-center">
          📞 +91 9172326773 &nbsp; | &nbsp;
          🌐 <a href="https://www.aerionaerospace.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            www.aerionaerospace.io
          </a>
        </div>

        {/* Right side: Social icons */}
        <div className="flex space-x-4 text-xl text-gray-600">
          <a href="https://linkedin.com/company/aerion" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/aerionaero" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaTwitter />
          </a>
          <a href="https://youtube.com/@aerionaerospace" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
            <FaYoutube />
          </a>
          <a href="https://facebook.com/aerionaerospace" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
