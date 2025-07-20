// src/components/layout-specific/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useDealer } from '@/contexts/DealerContext';
import {
  Bars3Icon,
  // Import specific icons for submenu items if they are used in navItems children
  ChartBarIcon, ClipboardDocumentListIcon, PlusIcon, UsersIcon, DocumentTextIcon, CurrencyDollarIcon, ShoppingBagIcon, LinkIcon,
  ChevronDownIcon, // For dropdown arrows
  MagnifyingGlassIcon, // For search input
} from '@heroicons/react/24/solid';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import AerionLogo from '@/assets/images/aerion-logo.png';
import { navItems, NavItem } from './Sidebar'; // Import navItems AND NavItem from Sidebar.tsx

interface HeaderProps {
  onMenuToggle?: () => void;
}

function Header({ onMenuToggle }: HeaderProps) {
  const { dealerName, dealerLogo } = useDealer();
  const navigate = useNavigate();
  const location = useLocation();
  // const isLoggedIn = !!localStorage.getItem('authToken'); // No longer needed for Logout button directly

  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // State to manage open dropdowns
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for click outside detection
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // const handleLogout = () => { // Logout handled elsewhere or removed from header
  //   localStorage.removeItem('authToken');
  //   navigate('/login');
  // };

  // Determine the active main department to show its submenu in the header
  const activeDepartment = navItems.find(item =>
    location.pathname.startsWith(item.path) && item.children
  );

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Close dropdown when navigating
  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your search logic here.
    // For example, navigate to a search results page or filter current view.
    console.log('Searching for:', searchTerm);
    // Example: navigate(`/dealer/search-results?query=${searchTerm}`);
    // Or, if search is local to the current view, pass searchTerm to a context/store.
  };


  const renderSubMenuItems = (items: NavItem[]) => {
    return items.map((item: NavItem) => {
      if (item.isSubGroup && item.children) {
        // Render as a dropdown/sub-group heading
        return (
          <div key={item.name} className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
              className="flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 text-white hover:bg-primary/80 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <DynamicIcon icon={item.icon} className="h-5 w-5" />
              <span>{item.name}</span>
              <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === item.name && (
              <div className="absolute top-full mt-2 left-0 bg-white text-gray-800 rounded-md shadow-lg py-1 z-50 min-w-[160px]">
                {item.children.map((childItem: NavItem) => (
                  <NavLink
                    key={childItem.name}
                    to={childItem.path}
                    onClick={() => setOpenDropdown(null)} // Close dropdown on item click
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-150
                      ${isActive ? 'font-semibold text-primary' : 'text-gray-700'}`
                    }
                  >
                    <DynamicIcon icon={childItem.icon} className="h-4 w-4" />
                    <span>{childItem.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        );
      } else {
        // Render as a regular NavLink
        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-md transition-colors duration-200
              ${isActive
                ? 'bg-primary/80 text-white shadow-md'
                : 'text-white hover:bg-primary/80 hover:text-secondary'
              }`
            }
          >
            <DynamicIcon icon={item.icon} className="h-5 w-5" />
            <span>{item.name}</span>
          </NavLink>
        );
      }
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[80px] bg-primary text-white p-4 shadow-lg flex items-center justify-between z-50 w-full">
      {/* Left Section: Mobile Toggle, Dealer Logo & Name (now home link) */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-1 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-secondary"
          aria-label="Toggle navigation menu"
        >
          <Bars3Icon className="h-7 w-7" />
        </button>
        {/* Dealer Logo and Name as a clickable link to Dashboard */}
        <Link
          to="/dealer/dashboard"
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-primary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary"
          title="Go to Dashboard"
        >
          {dealerLogo && (
            <img
              src={dealerLogo}
              alt="Dealer Logo"
              className="h-8 w-8 rounded-full object-cover border-2 border-secondary"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://placehold.co/32x32/FFF000/0047AB?text=DL`;
              }}
            />
          )}
          <span className="font-semibold text-lg text-secondary hidden sm:block">
            {dealerName}
          </span>
        </Link>
      </div>

      {/* Center Section: Dynamic Submenu for Active Department (Desktop Only) */}
      <nav className="hidden md:flex flex-1 justify-center space-x-6 lg:space-x-8 text-sm font-medium">
        {activeDepartment && activeDepartment.children ? (
          renderSubMenuItems(activeDepartment.children)
        ) : (
          <span className="text-white/70">Select a department from the sidebar</span>
        )}
      </nav>

      {/* Right Section: Search Input and Aerion Logo */}
      <div className="flex items-center space-x-3">
        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3 pr-8 py-1.5 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-secondary text-sm w-32 sm:w-48 transition-all duration-200"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-secondary focus:outline-none">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </form>

        {/* Aerion Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={AerionLogo.default || AerionLogo}
            alt="Aerion Aerospace Logo"
            className="h-8 w-auto filter brightness-125"
          />
        </Link>
        {/* Profile and Logout links removed as per request */}
      </div>
    </header>
  );
}

// Helper component to render dynamic icons (copied from Sidebar.tsx for self-contained Header)
const DynamicIcon: React.FC<{ icon: React.ElementType; className?: string }> = ({ icon: Icon, className }) => {
  if (!Icon) return null;
  return <Icon className={className} />;
};

export default Header;
