// src/components/Header.tsx
import React from 'react';
import { useDealer } from '@/contexts/DealerContext';
import { HomeIcon, UserCircleIcon, Bars3Icon } from '@heroicons/react/24/solid'; // Bars3Icon for mobile menu
import { Link } from 'react-router-dom';
import AerionLogo from '../assets/aerion-logo.png'; // Correct path if logo is in src/assets

interface HeaderProps {
  // Assuming a prop to handle sidebar toggle for mobile might be passed
  onMenuToggle?: () => void;
}

function Header({ onMenuToggle }: HeaderProps) {
  // useDealer context for dealer-specific info
  const { dealerName, dealerLogo } = useDealer();

  return (
    <header className="bg-aerion-blue text-white p-4 shadow-lg flex items-center justify-between z-20 sticky top-0">
      {/* Left Section: Mobile Menu Toggle, Aerion Logo & Home */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Toggle Button (visible only on small screens) */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-1 rounded-md hover:bg-aerion-blue-dark focus:outline-none focus:ring-2 focus:ring-aerion-yellow"
          aria-label="Toggle navigation menu"
        >
          <Bars3Icon className="h-7 w-7 text-white" />
        </button>

        {/* Aerion Logo */}
        <Link to="/dealer/dashboard" className="flex items-center space-x-2">
          {/* Using filter brightness for better visibility on dark blue background */}
          <img src={AerionLogo} alt="Aerion Aerospace Logo" className="h-8 w-auto filter brightness-125" />
          {/* Optional branding text next to logo, hidden on small screens */}
          <span className="font-bold text-xl tracking-tight hidden sm:block">AERION DMS</span>
        </Link>

        {/* Home Sign (always visible) */}
        <Link to="/dealer/dashboard" className="text-white hover:text-aerion-yellow transition-colors duration-200" title="Go to Dashboard">
          <HomeIcon className="h-6 w-6" />
        </Link>
      </div>

      {/* Right Section: Dealer Logo, Name & User Profile */}
      <div className="flex items-center space-x-3">
        {/* Dealer Logo (from context) */}
        {dealerLogo && (
          <img
            src={dealerLogo}
            alt="Dealer Logo"
            className="h-8 w-8 rounded-full object-cover border-2 border-aerion-yellow" // Added a border for prominence
            onError={(e) => { // Fallback for broken image
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = `https://placehold.co/32x32/aerion-yellow/aerion-blue?text=DL`; // Placeholder with brand colors
            }}
          />
        )}
        {/* Dealer Name (from context), hidden on extra small screens */}
        <span className="font-semibold text-lg text-aerion-yellow hidden xs:block">{dealerName}</span>
        
        {/* User Profile/Logout Button - could be a dropdown later */}
        <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-aerion-blue-dark focus:outline-none focus:ring-2 focus:ring-aerion-yellow">
          <UserCircleIcon className="h-7 w-7 text-white" /> {/* User icon */}
          {/* Optional: Actual user name could go here */}
          {/* <span className="text-sm text-white hidden sm:block">John Doe</span> */}
        </button>
      </div>
    </header>
  );
}

export default Header;
