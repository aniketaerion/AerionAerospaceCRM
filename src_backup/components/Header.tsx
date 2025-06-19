// src/components/Header.tsx
import React from 'react';
import { useDealer } from '@/contexts/DealerContext';
import { HomeIcon, UserCircleIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import AerionLogo from '../assets/aerion-logo.png'; // Path to Aerion logo in src/assets

interface HeaderProps {
  onMenuToggle?: () => void;
}

function Header({ onMenuToggle }: HeaderProps) {
  const { dealerName, dealerLogo } = useDealer();

  return (
    <header className="bg-aerion-blue text-white p-4 shadow-lg flex items-center justify-between z-20 sticky top-0">
      {/* Left Section: Mobile Menu Toggle, Dealer Logo & Name, Home Icon */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Toggle Button (visible only on small screens) */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-1 rounded-md hover:bg-aerion-blue-dark focus:outline-none focus:ring-2 focus:ring-aerion-yellow"
          aria-label="Toggle navigation menu"
        >
          <Bars3Icon className="h-7 w-7 text-white" />
        </button>

        {/* Dealer Logo & Name */}
        <div className="flex items-center space-x-2">
          {dealerLogo && (
            <img
              src={dealerLogo}
              alt="Dealer Logo"
              className="h-8 w-8 rounded-full object-cover border-2 border-aerion-yellow"
              onError={(e) => { // Fallback for broken image
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://placehold.co/32x32/aerion-yellow/aerion-blue?text=DL`;
              }}
            />
          )}
          <span className="font-semibold text-lg text-aerion-yellow hidden sm:block">{dealerName}</span>
        </div>

        {/* Home Icon for quick dashboard access */}
        <Link to="/dealer/dashboard" className="text-white hover:text-aerion-yellow transition-colors duration-200" title="Go to Dashboard">
          <HomeIcon className="h-6 w-6" />
        </Link>
      </div>

      {/* Right Section: Aerion Logo & User Profile/Help */}
      <div className="flex items-center space-x-3">
        {/* User Profile Icon - Could link to Profile page for Logout */}
        <Link to="/dealer/profile" className="flex items-center space-x-2 p-2 rounded-full hover:bg-aerion-blue-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-aerion-yellow" title="User Profile">
          <UserCircleIcon className="h-7 w-7 text-white" />
          {/* <span className="text-sm text-white hidden sm:block">John Doe</span> */} {/* Optional: Actual user name */}
        </Link>
        
        {/* Aerion Aerospace Main Logo */}
        <Link to="/" className="flex items-center space-x-2"> {/* Link to root or external Aerion site */}
          <img src={AerionLogo} alt="Aerion Aerospace Logo" className="h-8 w-auto filter brightness-125" />
          {/* <span className="font-bold text-xl tracking-tight hidden lg:block">AERION</span> */} {/* Optional: Smaller text if needed */}
        </Link>
      </div>
    </header>
  );
}

export default Header;
