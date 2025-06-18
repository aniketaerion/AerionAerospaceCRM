// src/components/Sidebar.tsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import { NavLink, useLocation } from 'react-router-dom';
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
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: ChartBarIcon, path: '/dealer/dashboard' },
  {
    name: 'CRM', // Parent CRM item
    icon: ClipboardDocumentListIcon,
    path: '/dealer/crm', // Points to the main CRM dashboard
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
  const location = useLocation();
  // State to manage expansion of nested menu items (like CRM)
  const [openCrmSubmenu, setOpenCrmSubmenu] = useState(false);

  // UseEffect to open CRM submenu if current path is within CRM
  useEffect(() => {
    const isCrmPathActive = location.pathname.startsWith('/dealer/crm');
    setOpenCrmSubmenu(isCrmPathActive);
  }, [location.pathname]);

  // Determine if a parent CRM link is active (any child is active, or parent itself)
  const isCrmParentActive = (currentLocation: typeof location): boolean => {
    const crmItem = navItems.find(item => item.name === 'CRM');
    if (!crmItem) return false;
    
    // Check if the current path starts with the CRM parent path
    if (currentLocation.pathname.startsWith(crmItem.path)) {
      return true;
    }
    // Check if any CRM child path is active
    return crmItem.children?.some(child => currentLocation.pathname.startsWith(child.path)) || false;
  };


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
                    // Use a functional update for setOpenCrmSubmenu
                    onClick={(e) => {
                        // Only prevent default if the item itself is a folder toggle (has children and is not a direct page)
                        if (item.children && item.path) { // Assumes items with children have a path, and it's for navigation
                            // We explicitly navigate to the path provided, but also toggle submenu
                            // If you want to ONLY toggle and NOT navigate, uncomment e.preventDefault()
                            // e.preventDefault();
                            setOpenCrmSubmenu(prev => !prev);
                            onClose(); // Close mobile sidebar after navigating or toggling
                        } else {
                            onClose(); // Close mobile sidebar if it's a simple nav click
                        }
                    }}
                    className={({ isActive }) =>
                      `flex items-center justify-between p-3 rounded-lg transition-colors duration-200
                      ${isActive || isCrmParentActive(location) // Highlight if parent itself is active or any child is active
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
                      className={`h-5 w-5 transform ${openCrmSubmenu ? 'rotate-90' : ''} transition-transform`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </NavLink>
                  {/* Nested children (submenu) */}
                  {openCrmSubmenu && ( // Show only if submenu is explicitly open
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
