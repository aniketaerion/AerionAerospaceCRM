// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ChartBarIcon, // Dashboard
  ClipboardDocumentListIcon, // CRM Leads
  UsersIcon, // Customers
  CurrencyDollarIcon, // Sales (using a more general financial icon)
  ArchiveBoxIcon, // Inventory
  CalculatorIcon, // Finance
  WrenchScrewdriverIcon, // Service
  MegaphoneIcon, // Marketing
  DocumentTextIcon, // Reports
  Cog6ToothIcon, // Profile
  XMarkIcon // For mobile menu close
} from '@heroicons/react/24/solid'; // Solid icons for main navigation

// Define the structure for sidebar items
interface NavItem {
  name: string;
  icon: React.ElementType; // Use React.ElementType for icon components
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: ChartBarIcon, path: '/dealer/dashboard' },
  { name: 'CRM Leads', icon: ClipboardDocumentListIcon, path: '/dealer/crm/leads' },
  { name: 'Customers', icon: UsersIcon, path: '/dealer/crm/customers/panel' },
  { name: 'Sales', icon: CurrencyDollarIcon, path: '/dealer/sales/dashboard' },
  { name: 'Inventory', icon: ArchiveBoxIcon, path: '/dealer/inventory/dashboard' },
  { name: 'Finance', icon: CalculatorIcon, path: '/dealer/finance/dashboard' },
  { name: 'Service', icon: WrenchScrewdriverIcon, path: '/dealer/service/dashboard' },
  { name: 'Marketing', icon: MegaphoneIcon, path: '/dealer/marketing/dashboard' },
  { name: 'Reports', icon: DocumentTextIcon, path: '/dealer/reports/dashboard' },
  { name: 'Profile', icon: Cog6ToothIcon, path: '/dealer/profile' },
];

interface SidebarProps {
  isOpen: boolean; // Prop to control mobile sidebar visibility
  onClose: () => void; // Prop to handle closing mobile sidebar
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
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
          fixed inset-y-0 left-0 w-64 bg-white shadow-xl p-6 overflow-y-auto z-40
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:shadow-lg md:block
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
            <NavLink
              key={item.name}
              to={item.path}
              // Close sidebar on mobile when an item is clicked
              onClick={onClose} 
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
                ${isActive
                  ? 'bg-aerion-blue text-white shadow-md' // Active state: Blue background, white text
                  : 'text-neutral-dark hover:bg-aerion-yellow-dark hover:text-aerion-blue' // Inactive state: Dark text, hover yellow background
                }`
              }
            >
              <item.icon className="h-6 w-6" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
