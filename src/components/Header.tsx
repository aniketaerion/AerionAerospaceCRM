// src/components/layout-specific/Header.tsx
import React, { useContext } from 'react';
import { HomeIcon, UserCircleIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import AerionLogo from '../../assets/images/aerion-logo.png';
import { DealerContext } from '../../contexts/DealerContext';

interface HeaderProps {
  onMenuToggle?: () => void;
}

interface DealerContextType {
  dealerName: string;
  dealerLogo: string;
}

function Header({ onMenuToggle }: HeaderProps) {
  const context = useContext(DealerContext);

  // Handle missing context safely
  const { dealerName = 'Dealer', dealerLogo = '' } = (context || {}) as DealerContextType;

  return (
    <header className="bg-aerion-blue text-white p-4 shadow-lg flex items-center justify-between z-20 sticky top-0">
      {/* Left Section: Menu toggle, Dealer info, Home icon */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-1 rounded-md hover:bg-aerion-blue-dark focus:outline-none focus:ring-2 focus:ring-aerion-yellow"
          aria-label="Toggle navigation menu"
        >
          <Bars3Icon className="h-7 w-7 text-white" />
        </button>

        <div className="flex items-center space-x-2">
          {dealerLogo ? (
            <img
              src={dealerLogo}
              alt="Dealer Logo"
              className="h-8 w-8 rounded-full object-cover border-2 border-aerion-yellow"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://placehold.co/32x32/aerion-yellow/aerion-blue?text=DL';
              }}
            />
          ) : null}
          <span className="font-semibold text-lg text-aerion-yellow hidden sm:block">
            {dealerName}
          </span>
        </div>

        <Link
          to="/dealer/dashboard"
          className="text-white hover:text-aerion-yellow transition-colors duration-200"
          title="Go to Dashboard"
        >
          <HomeIcon className="h-6 w-6" />
        </Link>
      </div>

      {/* Right Section: User profile + Aerion logo */}
      <div className="flex items-center space-x-3">
        <Link
          to="/dealer/profile"
          className="flex items-center space-x-2 p-2 rounded-full hover:bg-aerion-blue-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-aerion-yellow"
          title="User Profile"
        >
          <UserCircleIcon className="h-7 w-7 text-white" />
        </Link>

        <Link to="/" className="flex items-center space-x-2">
          <img
            src={AerionLogo}
            alt="Aerion Aerospace Logo"
            className="h-8 w-auto filter brightness-125"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
