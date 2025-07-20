// src/components/layout-specific/Sidebar.tsx
import React, { useState, useEffect } from 'react';
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
  XMarkIcon,
  ShoppingBagIcon,
  PlusIcon,
  LinkIcon,
  BuildingOfficeIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  CubeTransparentIcon,
  TruckIcon,
  AdjustmentsHorizontalIcon,
  ArrowUturnLeftIcon,
  BriefcaseIcon,
  ReceiptPercentIcon,
  ScaleIcon,
  ChartPieIcon,
  CommandLineIcon,
  ShareIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  BellAlertIcon,
  UserCircleIcon,
  CreditCardIcon,
  FolderOpenIcon,
  KeyIcon,
  UserGroupIcon,
  ClipboardDocumentIcon,
  BriefcaseIcon as BriefcaseIconSolid,
  PresentationChartLineIcon,
  AdjustmentsVerticalIcon,
  DocumentMagnifyingGlassIcon,
  LifebuoyIcon,
  ArrowDownTrayIcon, // New icon for downloads
} from '@heroicons/react/24/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';

// Helper component to render dynamic icons
const DynamicIcon: React.FC<{ icon: React.ElementType; className?: string }> = ({ icon: Icon, className }) => {
  if (!Icon) return null;
  return <Icon className={className} />;
};

// Export the NavItem interface so it can be used in other files like Header.tsx
export interface NavItem {
  name: string;
  icon: React.ElementType;
  path: string;
  children?: NavItem[];
  isSubGroup?: boolean;
}

// Export navItems so Header.tsx can import it
export const navItems: NavItem[] = [
  { name: 'Dashboard', icon: ChartBarIcon, path: '/dealer/dashboard' },
  {
    name: 'CRM',
    icon: ClipboardDocumentListIcon,
    path: '/dealer/crm/dashboard',
    children: [
      { name: 'CRM Dashboard', icon: ChartBarIcon, path: '/dealer/crm/dashboard' },
      {
        name: 'Leads',
        icon: ClipboardDocumentListIcon,
        path: '/dealer/crm/leads/list',
        isSubGroup: true,
        children: [
          { name: 'Leads List', icon: ClipboardDocumentListIcon, path: '/dealer/crm/leads/list' },
          { name: 'Create Lead', icon: PlusIcon, path: '/dealer/crm/leads/create' },
        ]
      },
      {
        name: 'Customers',
        icon: UsersIcon,
        path: '/dealer/crm/customers/list',
        isSubGroup: true,
        children: [
          { name: 'Customers List', icon: UsersIcon, path: '/dealer/crm/customers/list' },
        ]
      },
      {
        name: 'Activities',
        icon: CalendarDaysIcon,
        path: '/dealer/crm/tasks',
        isSubGroup: true,
        children: [
          { name: 'CRM Tasks', icon: DocumentTextIcon, path: '/dealer/crm/tasks' },
          { name: 'Appointments', icon: CalendarDaysIcon, path: '/dealer/crm/appointments' },
        ]
      },
      { name: 'CRM Reports', icon: ChartBarIcon, path: '/dealer/reports/dashboard' },
    ]
  },
  {
    name: 'Sales',
    icon: ShoppingBagIcon,
    path: '/dealer/sales/panel',
    children: [
      { name: 'Sales Panel', icon: ShoppingBagIcon, path: '/dealer/sales/panel' },
      { name: 'Sales Dashboard', icon: ChartBarIcon, path: '/dealer/sales/dashboard' },
      {
        name: 'Quotes & Orders',
        icon: DocumentTextIcon,
        path: '/dealer/sales/orders',
        isSubGroup: true,
        children: [
          { name: 'Create Quote', icon: PlusIcon, path: '/dealer/sales/quotes/create' },
          { name: 'Quotes List', icon: DocumentTextIcon, path: '/dealer/sales/quotes' },
          { name: 'Order List', icon: ClipboardDocumentListIcon, path: '/dealer/sales/orders' },
        ]
      },
      {
        name: 'Performance',
        icon: PresentationChartLineIcon,
        path: '/dealer/sales/analytics',
        isSubGroup: true,
        children: [
          { name: 'Sales Analytics', icon: ChartBarIcon, path: '/dealer/sales/analytics' },
          { name: 'Commissions', icon: CurrencyDollarIcon, path: '/dealer/sales/commissions' },
        ]
      },
      { name: 'Place New Order', icon: PlusIcon, path: '/dealer/place-order' },
    ]
  },
  {
    name: 'Inventory',
    icon: ArchiveBoxIcon,
    path: '/dealer/inventory/dashboard',
    children: [
      { name: 'Inventory Dashboard', icon: ChartBarIcon, path: '/dealer/inventory/dashboard' },
      {
        name: 'Products',
        icon: ArchiveBoxIcon,
        path: '/dealer/inventory/my-inventory',
        isSubGroup: true,
        children: [
          { name: 'My Inventory', icon: ArchiveBoxIcon, path: '/dealer/inventory/my-inventory' },
          { name: 'Product Catalog', icon: CubeTransparentIcon, path: '/dealer/inventory/product-catalog' },
          { name: 'Add Product', icon: PlusIcon, path: '/dealer/inventory/products/add' },
        ]
      },
      {
        name: 'Purchase',
        icon: TruckIcon,
        path: '/dealer/inventory/purchase-orders',
        isSubGroup: true,
        children: [
          { name: 'Purchase Orders', icon: DocumentTextIcon, path: '/dealer/inventory/purchase-orders' },
          { name: 'Create Purchase Order', icon: TruckIcon, path: '/dealer/inventory/purchase-orders/create' },
          { name: 'Suppliers', icon: BriefcaseIcon, path: '/dealer/inventory/suppliers' },
        ]
      },
      {
        name: 'Stock Control',
        icon: AdjustmentsHorizontalIcon,
        path: '/dealer/inventory/stock-adjustments',
        isSubGroup: true,
        children: [
          { name: 'Stock Adjustments', icon: AdjustmentsHorizontalIcon, path: '/dealer/inventory/stock-adjustments' },
          { name: 'Returns Management', icon: ArrowUturnLeftIcon, path: '/dealer/inventory/returns' },
        ]
      },
      { name: 'Inventory Reports', icon: ChartBarIcon, path: '/dealer/reports/dashboard' },
    ]
  },
  {
    name: 'Finance',
    icon: CalculatorIcon,
    path: '/dealer/finance/dashboard',
    children: [
      { name: 'Finance Dashboard', icon: ChartBarIcon, path: '/dealer/finance/dashboard' },
      {
        name: 'Transactions',
        icon: CreditCardIcon,
        path: '/dealer/finance/invoices',
        isSubGroup: true,
        children: [
          { name: 'Invoices', icon: DocumentTextIcon, path: '/dealer/finance/invoices' },
          { name: 'Create Invoice', icon: PlusIcon, path: '/dealer/finance/invoices/create' },
          { name: 'Payments', icon: CurrencyDollarIcon, path: '/dealer/finance/payments' },
          { name: 'Expenses Management', icon: CalculatorIcon, path: '/dealer/finance/expenses' },
        ]
      },
      {
        name: 'Accounting Tools',
        icon: ScaleIcon,
        path: '/dealer/finance/general-ledger',
        isSubGroup: true,
        children: [
          { name: 'General Ledger', icon: BookOpenIcon, path: '/dealer/finance/general-ledger' },
          { name: 'Bank Reconciliation', icon: BanknotesIcon, path: '/dealer/finance/bank-reconciliation' },
          { name: 'Tax Management', icon: ReceiptPercentIcon, path: '/dealer/finance/tax-management' },
        ]
      },
      {
        name: 'Reporting & Budgeting',
        icon: FolderOpenIcon,
        path: '/dealer/finance/reports',
        isSubGroup: true,
        children: [
          { name: 'Financial Reports', icon: ChartPieIcon, path: '/dealer/finance/reports' },
          { name: 'Budgeting', icon: ScaleIcon, path: '/dealer/finance/budgeting' },
        ]
      },
      { name: 'Add Customer', icon: PlusIcon, path: '/dealer/add-customer' },
    ]
  },
  {
    name: 'Service',
    icon: WrenchScrewdriverIcon,
    path: '/dealer/service/dashboard',
    children: [
      { name: 'Service Dashboard', icon: ChartBarIcon, path: '/dealer/service/dashboard' },
      { name: 'Repair Request', icon: PlusIcon, path: '/dealer/service/repair-request' },
      {
        name: 'Resources', // New sub-group for Service
        icon: FolderOpenIcon,
        path: '/dealer/service/history',
        isSubGroup: true,
        children: [
          { name: 'Service History', icon: DocumentTextIcon, path: '/dealer/service/history' },
          { name: 'Warranty Management', icon: ClipboardDocumentCheckIcon, path: '/dealer/service/warranty' },
          { name: 'Service Downloads', icon: ArrowDownTrayIcon, path: '/dealer/service/downloads' }, // New download option
        ]
      },
      { name: 'Technician Schedule', icon: CalendarDaysIcon, path: '/dealer/service/technician-schedule' },
      { name: 'Service Analytics', icon: PresentationChartLineIcon, path: '/dealer/service/analytics' }, // New Service Analytics
    ]
  },
  {
    name: 'Marketing',
    icon: MegaphoneIcon,
    path: '/dealer/marketing/dashboard',
    children: [
      { name: 'Marketing Dashboard', icon: ChartBarIcon, path: '/dealer/marketing/dashboard' },
      {
        name: 'Campaigns',
        icon: DocumentTextIcon,
        path: '/dealer/marketing/campaigns',
        isSubGroup: true,
        children: [
          { name: 'Campaign Reports', icon: DocumentTextIcon, path: '/dealer/marketing/campaigns' },
          { name: 'Reimbursements', icon: CurrencyDollarIcon, path: '/dealer/marketing/reimbursements' },
        ]
      },
      {
        name: 'Digital Marketing',
        icon: ShareIcon,
        path: '/dealer/marketing/content',
        isSubGroup: true,
        children: [
          { name: 'Content Management', icon: BookOpenIcon, path: '/dealer/marketing/content' },
          { name: 'SEO/SEM Tools', icon: CommandLineIcon, path: '/dealer/marketing/seo-sem' },
          { name: 'Social Media Planner', icon: ShareIcon, path: '/dealer/marketing/social-media' },
          { name: 'Marketing Collaterals', icon: ArrowDownTrayIcon, path: '/dealer/marketing/collaterals' }, // New download option
        ]
      },
      { name: 'Marketing Analytics', icon: ChartBarIcon, path: '/dealer/reports/dashboard' },
      { name: 'Lead Acquisition', icon: UsersIcon, path: '/dealer/crm/leads/create' },
    ]
  },
  {
    name: 'Reports',
    icon: DocumentTextIcon,
    path: '/dealer/reports/dashboard',
    children: [
      { name: 'Reports Dashboard', icon: ChartBarIcon, path: '/dealer/reports/dashboard' },
      { name: 'Custom Reports', icon: DocumentTextIcon, path: '/dealer/reports/custom' },
      { name: 'Scheduled Reports', icon: CalendarDaysIcon, path: '/dealer/reports/scheduled' },
      { name: 'Data Exports', icon: FolderOpenIcon, path: '/dealer/reports/data-exports' },
      { name: 'Report Settings', icon: Cog6ToothIcon, path: '/dealer/reports/settings' },
    ]
  },
  {
    name: 'Team (HR)',
    icon: UsersIcon,
    path: '/dealer/team/dashboard',
    children: [
      { name: 'Team Dashboard', icon: ChartBarIcon, path: '/dealer/team/dashboard' },
      {
        name: 'Employee Info',
        icon: UserGroupIcon,
        path: '/dealer/team/employee-directory',
        isSubGroup: true,
        children: [
          { name: 'Employee Directory', icon: UsersIcon, path: '/dealer/team/employee-directory' },
          { name: 'User Management', icon: Cog6ToothIcon, path: '/dealer/team/users' },
        ]
      },
      {
        name: 'Performance & Dev',
        icon: ClipboardDocumentIcon,
        path: '/dealer/team/performance',
        isSubGroup: true,
        children: [
          { name: 'Performance Reviews', icon: ClipboardDocumentCheckIcon, path: '/dealer/team/performance' },
          { name: 'Training & Certs', icon: ClipboardDocumentCheckIcon, path: '/dealer/team/training' },
        ]
      },
      {
        name: 'HR Operations',
        icon: BriefcaseIconSolid,
        path: '/dealer/team/leave',
        isSubGroup: true,
        children: [
          { name: 'Leave Management', icon: CalendarDaysIcon, path: '/dealer/team/leave' },
          { name: 'Onboarding', icon: PlusIcon, path: '/dealer/team/onboarding' },
          { name: 'Payroll Management', icon: BanknotesIcon, path: '/dealer/team/payroll' },
          { name: 'Recruitment', icon: BriefcaseIcon, path: '/dealer/team/recruitment' },
        ]
      },
      { name: 'HR Reports', icon: ChartBarIcon, path: '/dealer/reports/dashboard' },
    ]
  },
  {
    name: 'Profile',
    icon: Cog6ToothIcon,
    path: '/dealer/profile',
    children: [
      { name: 'My Profile', icon: UserCircleIcon, path: '/dealer/profile' },
      { name: 'Dealer Profile', icon: BuildingOfficeIcon, path: '/dealer/profile/dealer' },
      { name: 'Security & Access', icon: ShieldCheckIcon, path: '/dealer/profile/security', isSubGroup: true, children: [
        { name: 'Security Settings', icon: ShieldCheckIcon, path: '/dealer/profile/security' },
        { name: 'Audit Log', icon: DocumentMagnifyingGlassIcon, path: '/dealer/profile/audit-log' },
      ]},
      { name: 'Notifications', icon: BellAlertIcon, path: '/dealer/profile/notifications' },
      { name: 'Account Preferences', icon: AdjustmentsVerticalIcon, path: '/dealer/profile/preferences' },
    ]
  },
  // Quick Access for global links (Lead Form, About, Contact, Support)
  {
    name: 'Quick Access',
    icon: LinkIcon,
    path: '/quick-access/lead-form',
    children: [
      { name: 'Lead Form', icon: PlusIcon, path: '/dealer/crm/leads/create' },
      { name: 'About', icon: DocumentTextIcon, path: '/about' },
      { name: 'Contact', icon: UsersIcon, path: '/contact' },
      { name: 'Support', icon: CalculatorIcon, path: '/support' },
      { name: 'Help Center', icon: LifebuoyIcon, path: '/support' },
    ]
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  useEffect(() => {
    // No longer need to manage openSubmenu based on path, as submenus are not shown here
  }, [location.pathname]);

  const handleParentClick = () => {
    onClose();
  };

  const isNavLinkActive = (path: string): boolean => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-neutral-dark bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`
          fixed left-0 w-64 bg-white shadow-xl p-6 md:p-4 overflow-y-auto z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:block
          md:min-h-[calc(100vh-80px)]
          top-[80px] bottom-0
        `}
      >
        <div className="flex justify-end md:hidden mb-4">
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-dark hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close navigation menu"
          >
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>

        <div className="flex items-center pb-6 mb-6 border-b border-gray-200">
          <img src="/assets/dealers/shakti001.png" alt="Shakti Agro Drones Logo" className="h-8 mr-2" />
          <span className="font-bold text-xl text-primary">Shakti Agro Drones</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
              <NavLink
                to={item.path}
                onClick={handleParentClick}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
                  ${isNavLinkActive(item.path)
                    ? 'bg-primary text-white shadow-md'
                    : 'text-neutral-dark hover:bg-gray-100 hover:text-primary'
                  }`
                }
              >
                <DynamicIcon icon={item.icon} className="h-6 w-6" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </React.Fragment>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
