// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom'; // Import useLocation
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
  CalculatorIcon,
  WrenchScrewdriverIcon,
  MegaphoneIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  XMarkIcon // For mobile menu close
} from '@heroicons/react/24/solid';

interface NavItem {
  name: string;
  icon: React.ElementType;
  path: string;
  // Optional: for nested items like CRM
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: ChartBarIcon, path: '/dealer/dashboard' },
  {
    name: 'CRM', // Parent CRM item
    icon: ClipboardDocumentListIcon,
    path: '/dealer/crm/dashboard', // Main CRM dashboard, or could be /dealer/crm to auto-redirect to leads
    children: [
      { name: 'Leads', icon: ClipboardDocumentListIcon, path: '/dealer/crm/leads' },
      { name: 'Customers', icon: UsersIcon, path: '/dealer/crm/customers/panel' },
    ],
  },
  { name: 'Sales', icon: CurrencyDollarIcon, path: '/dealer/sales/dashboard' },
  { name: 'Inventory', icon: ArchiveBoxIcon, path: '/dealer/inventory/dashboard' },
  { name: 'Finance', icon: CalculatorIcon, path: '/dealer/finance/dashboard' },
  { name: 'Service', icon: WrenchScrewdriverIcon, path: '/dealer/service/dashboard' },
  { name: 'Marketing', icon: MegaphoneIcon, path: '/dealer/marketing/dashboard' },
  { name: 'Reports', icon: DocumentTextIcon, path: '/dealer/reports/dashboard' },
  { name: 'Profile', icon: Cog6ToothIcon, path: '/dealer/profile' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  // State to manage expansion of nested menu items (like CRM)
  const [openCrmSubmenu, setOpenCrmSubmenu] = useState(false);
  const location = useLocation(); // Hook to get current location

  // Determine if a parent CRM link is active (any child is active)
  // `match` parameter is unused here, so explicitly type as `any` or `null` based on usage
  const isCrmActive = (match: any, currentLocation: typeof location) => { // Type `match` as any, `currentLocation` as Location object
    return navItems.find(item => item.name === 'CRM')?.children?.some(child => currentLocation.pathname.startsWith(child.path));
  };

  // Effect to close mobile sidebar and reset submenu state when route changes
  // This ensures the sidebar closes after navigation on mobile, and CRM submenu reflects current path
  React.useEffect(() => {
    // Check if the current path starts with any CRM child path
    const isAnyCrmChildActive = navItems.find(item => item.name === 'CRM')?.children?.some(child => location.pathname.startsWith(child.path));
    setOpenCrmSubmenu(isAnyCrmChildActive || false); // Open CRM submenu if any child is active
    if (isOpen) {
        onClose(); // Close the mobile sidebar on route change
    }
  }, [location.pathname, isOpen, onClose]);


  return (
    <>
      {/* Mobile Overlay (Dark overlay when sidebar is open) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-neutral-dark bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar - Desktop (always visible) and Mobile (conditionally visible) */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-64 bg-white shadow-xl p-6 md:p-4 overflow-y-auto z-40
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:shadow-lg md:block md:min-h-screen
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Close button for mobile sidebar */}
        <div className="flex justify-end md:hidden mb-4">
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-dark hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-aerion-blue"
            aria-label="Close navigation menu"
          >
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>

        {/* Top section for Sidebar - e.g., Mini Logo or just spacing */}
        <div className="pb-6 mb-6 border-b border-gray-200">
          <span className="font-bold text-xl text-aerion-blue">DMS Modules</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
              {item.children ? (
                // Parent item with children (e.g., CRM)
                <div>
                  <NavLink
                    to={item.path}
                    onClick={(e) => {
                      // Prevent navigation on click if it's just for opening submenu
                      // If you want to navigate AND open, remove e.preventDefault()
                      // Only prevent if path is undefined or if it's a parent toggle click
                      if (item.path === '/dealer/crm/dashboard' || !item.path) { // CRM parent will navigate or toggle
                          e.preventDefault();
                          setOpenCrmSubmenu(!openCrmSubmenu);
                      } else {
                          onClose(); // Close on mobile if actually navigating
                      }
                    }}
                    className={({ isActive }) =>
                      `flex items-center justify-between p-3 rounded-lg transition-colors duration-200
                      ${isActive || isCrmActive(null, location) // Highlight if parent or any child is active
                        ? 'bg-aerion-blue text-white shadow-md'
                        : 'text-neutral-dark hover:bg-aerion-yellow-dark hover:text-aerion-blue'
                      }`
                    }
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-6 w-6" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {/* Arrow icon for submenu */}
                    <svg
                      className={`h-5 w-5 transform ${openCrmSubmenu || isCrmActive(null, location) ? 'rotate-90' : ''} transition-transform`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </NavLink>
                  {/* Nested children (submenu) */}
                  {(openCrmSubmenu || isCrmActive(null, location)) && ( // Show if submenu is open or parent is active
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.name}
                          to={child.path}
                          onClick={onClose} // Close sidebar on mobile when child item is clicked
                          className={({ isActive }) =>
                            `flex items-center space-x-3 p-2 rounded-lg text-sm transition-colors duration-200
                            ${isActive
                              ? 'bg-aerion-blue-light text-white' // Active child state
                              : 'text-neutral-medium hover:bg-gray-100 hover:text-aerion-blue' // Inactive child state
                            }`
                          }
                        >
                          <child.icon className="h-5 w-5" />
                          <span>{child.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Regular single item
                <NavLink
                  to={item.path}
                  onClick={onClose} // Close sidebar on mobile when item is clicked
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
                    ${isActive
                      ? 'bg-aerion-blue text-white shadow-md'
                      : 'text-neutral-dark hover:bg-aerion-yellow-dark hover:text-aerion-blue'
                    }`
                  }
                >
                  <item.icon className="h-6 w-6" />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              )}
            </React.Fragment>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
