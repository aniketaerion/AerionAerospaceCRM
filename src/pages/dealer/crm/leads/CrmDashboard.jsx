// src/pages/dealer/crm/dashboard/CrmDashboard.jsx

import React, { useEffect, useState, Suspense, lazy, useCallback, useMemo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCrmStore } from '@/store/crmStore';

// Common UI Components
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { MetricCard } from '@/components/shared/ui/MetricCard'; // Replaced KpiCard with MetricCard for consistency
import Button from '@/components/common/Button';

// Heroicons (ensure all are imported if used)
import {
  UserPlusIcon, UsersIcon, ExclamationTriangleIcon, ArrowUpRightIcon, CurrencyDollarIcon,
  ChartBarIcon, FunnelIcon, MagnifyingGlassIcon, PlusCircleIcon, ListBulletIcon,
  // If you have a specific Kanban icon for Heroicons:
  // ViewColumnsIcon, // Example: for Kanban view
} from '@heroicons/react/24/outline';


// Lazy Load Chart Components
const LeadStatusDistributionChart = lazy(() => import('@/components/shared/charts/LeadStatusDistributionChart'));
const LeadConversionFunnel = lazy(() => import('@/components/shared/charts/LeadConversionFunnel'));

// Lazy Load CRM-specific View Components (from your file structure)
// NOTE: Ensure these paths and component names match your actual files
const LeadsPanel = lazy(() => import('@/pages/dealer/crm/leads/LeadsPanel')); // Primary leads management panel
const LeadsKanbanView = lazy(() => import('@/pages/dealer/crm/leads/LeadsKanbanView')); // Or LeadKanbanView depending on your file
const LeadAnalytics = lazy(() => import('@/pages/dealer/crm/leads/LeadAnalytics')); // For specific lead analytics page if a separate component
const CreateLead = lazy(() => import('@/pages/dealer/crm/leads/CreateLead')); // For the modal

const CustomersPanel = lazy(() => import('@/pages/dealer/crm/customers/CustomersPanel')); // Primary customers management panel
const CustomersList = lazy(() => import('@/pages/dealer/crm/customers/CustomersList'));
const CustomerCardView = lazy(() => import('@/pages/dealer/crm/customers/CustomerCardView'));
const CustomerAnalytics = lazy(() => import('@/pages/dealer/crm/customers/CustomerAnalytics')); // For specific customer analytics page
const CustomerKanbanView = lazy(() => import('@/pages/dealer/crm/customers/CustomerKanbanView')); // If you have a Kanban view for customers


// KpiCard component (re-used from previous definition, renamed to MetricCard to match import)
const KpiCard = ({ title, value, icon: Icon, linkTo, loading, trend, trendColor = 'text-green-500' }) => (
    <Link to={linkTo} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 flex flex-col justify-between">
        <div className="flex items-start justify-between">
            <p className="text-base font-semibold text-gray-500">{title}</p>
            <div className="p-2 bg-blue-100 rounded-full">
                <Icon className="h-6 w-6 text-blue-600" />
            </div>
        </div>
        {loading ? <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse mt-2"></div> : <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>}
        {trend && !loading && (
          <p className={`text-sm mt-2 ${trendColor}`}>{trend}</p>
        )}
    </Link>
);


export default function CrmDashboard() {
  const { leads, customers, products, loading, fetchLeads, fetchCustomers, fetchProducts, getAnalyticsData } = useCrmStore();
  const [dateRange, setDateRange] = useState('this_month');
  const [analytics, setAnalytics] = useState(null);
  const location = useLocation();

  // --- CRM Dashboard View States ---
  const [activeView, setActiveView] = useState('summary'); // 'summary', 'leads-kanban', 'customers-list', 'customer-cards'
  const [searchTerm, setSearchTerm] = useState('');
  const [crmFilters, setCrmFilters] = useState({
    leadStatus: '',
    customerCategory: '',
    assignedTo: ''
  });
  const [showCreateLeadModal, setShowCreateLeadModal] = useState(false);


  // Memoized function to fetch all dashboard data
  const loadCrmDashboardData = useCallback(async () => {
    // Only fetch primary data if in a summary view or if needed globally by the current active view
    // Adjust data fetching calls based on which data is relevant to the activeView to optimize performance
    if (activeView === 'summary' || activeView === 'leads-kanban' || location.pathname.startsWith('/dealer/crm/leads')) {
      await fetchLeads({ dateRange, ...crmFilters, search: searchTerm }); // Pass search term for filtering
    }
    if (activeView === 'summary' || activeView === 'customers-list' || activeView === 'customer-cards' || location.pathname.startsWith('/dealer/crm/customers')) {
      await fetchCustomers({ dateRange, ...crmFilters, search: searchTerm }); // Pass search term for filtering
    }
    // Fetch products if specifically needed for CRM analytics (e.g., customer purchase history)
    // await fetchProducts({ dateRange, ...crmFilters, search: searchTerm }); // Uncomment if products directly affect CRM dashboard KPIs/charts

    // Recalculate analytics based on fetched data
    const dashboardAnalytics = getAnalyticsData({ dateRange }); // Ensure getAnalyticsData uses current data from store
    setAnalytics(dashboardAnalytics);

  }, [dateRange, crmFilters, searchTerm, activeView, location.pathname, fetchLeads, fetchCustomers, fetchProducts, getAnalyticsData]);


  useEffect(() => {
    loadCrmDashboardData();

    // Set up real-time updates via polling (for enterprise, consider WebSockets)
    const interval = setInterval(() => {
      loadCrmDashboardData(); // Re-fetch based on current filters/view
    }, 60000); // Poll every 60 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [loadCrmDashboardData]);


  // Derived calculations for KPIs
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const unassignedLeadsCount = leads.filter(l => !l.assignedTo).length;
  const recentLeads = useMemo(() => [...leads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5), [leads]);
  const newCustomers = useMemo(() => [...customers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5), [customers]);
  const potentialQualifiedValue = leads.filter(l => l.status === 'Qualified').reduce((sum, l) => sum + (l.estimatedValue || 0), 0);


  // Filter options for dropdowns (mocked or derived from data from useCrmStore)
  const leadStatusOptions = useMemo(() => [
    { value: '', label: 'All Statuses' },
    { value: 'New', label: 'New' },
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Unqualified', label: 'Unqualified' },
  ], []);

  const customerCategoryOptions = useMemo(() => {
    // Dynamically derive categories from actual customer data if available, otherwise use mock
    const categories = Array.from(new Set(customers.map(c => c.category).filter(Boolean)));
    return [{ value: '', label: 'All Categories' }, ...categories.map(cat => ({ value: cat, label: cat }))];
  }, [customers]);

  const assignedToOptions = useMemo(() => {
    // Dynamically derive assigned users from leads/customers, otherwise use mock
    const assignedUsers = Array.from(new Set(leads.map(l => l.assignedTo).filter(Boolean)));
    return [{ value: '', label: 'All Staff' }, ...assignedUsers.map(user => ({ value: user, label: user }))];
  }, [leads]);


  // --- Conditional Render based on Loading/Error State ---
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px] bg-white rounded-lg shadow-md">
        <p className="text-lg text-gray-700">Loading CRM Dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-[calc(100vh-80px)] rounded-lg shadow-lg">

      {/* Module-Specific Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-2 border-b border-gray-200">
        <div>
          <TopHeaderBar title="CRM Overview Dashboard" />
          <p className="text-gray-600 mt-1 text-sm lg:text-base">Manage and analyze your customer and lead relationships here.</p>
        </div>

        {/* Global Search Bar for CRM */}
        <div className="flex items-center mt-4 sm:mt-0 ml-auto pl-4">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search CRM..."
              className="pl-10 pr-3 py-2 rounded-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm w-48 sm:w-64"
            />
            <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400" />
          </div>
          <Button onClick={() => loadCrmDashboardData()} variant="primary" className="ml-2 px-5 py-2 rounded-full hidden sm:inline-flex">Search</Button>
        </div>
      </div>

      {/* Control Bar: Date Range, Quick Actions, Views, Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-100">
        {/* Date Range Selector */}
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />

        {/* Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap justify-center flex-grow">
          <Button onClick={() => setShowCreateLeadModal(true)} variant="primary" className="min-w-[140px] text-sm">
            <PlusCircleIcon className="h-5 w-5 mr-1" /> New Lead
          </Button>
          <Button onClick={() => console.log('Import Customers')} variant="secondary" className="min-w-[140px] text-sm">
            Import Data
          </Button>
          <Button onClick={() => console.log('Run Automation')} variant="secondary" className="min-w-[140px] text-sm">
            Run Automation
          </Button>
        </div>

        {/* View Toggles */}
        <div className="flex flex-shrink-0 items-center gap-2 justify-end">
          <select
            value={activeView}
            onChange={(e) => setActiveView(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          >
            <option value="summary">Summary Overview</option>
            <option value="leads-kanban">Leads Kanban</option>
            <option value="customers-list">Customers List</option>
            <option value="customer-cards">Customer Cards</option>
          </select>
        </div>
      </div>

      {/* Advanced CRM Filters */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-100 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <select
            value={crmFilters.leadStatus}
            onChange={(e) => setCrmFilters(prev => ({ ...prev, leadStatus: e.target.value }))}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
          >
            {leadStatusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select
            value={crmFilters.customerCategory}
            onChange={(e) => setCrmFilters(prev => ({ ...prev, customerCategory: e.target.value }))}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
          >
            {customerCategoryOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select
            value={crmFilters.assignedTo}
            onChange={(e) => setCrmFilters(prev => ({ ...prev, assignedTo: e.target.value }))}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
          >
            {assignedToOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <div className="md:col-span-1 flex justify-end">
            <Button onClick={loadCrmDashboardData} variant="primary" className="px-6 py-2">Apply Filters</Button>
          </div>
      </div>

      {/* --- CONDITIONAL RENDERING OF VIEWS --- */}

      {activeView === 'summary' && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Summary Overview</h2>
          {/* KPI Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard
              title="New Leads"
              value={newLeadsCount}
              icon={UserPlusIcon}
              linkTo="/dealer/crm/leads/panel?tab=list&status=New"
              loading={loading}
              trend="+15% (vs. prev. period)"
            />
            <KpiCard
              title="Total Customers"
              value={customers.length}
              icon={UsersIcon}
              linkTo="/dealer/crm/customers/panel"
              loading={loading}
              trend="+5% (vs. prev. period)"
            />
            <KpiCard
              title="Unassigned Leads"
              value={unassignedLeadsCount}
              icon={ExclamationTriangleIcon}
              linkTo="/dealer/crm/leads/panel?tab=assignments&assignedTo=unassigned"
              loading={loading}
              trend="Needs Immediate Attention"
              trendColor="text-red-600"
            />
            <KpiCard
              title="Potential Qualified Value"
              value={`₹ ${potentialQualifiedValue.toLocaleString('en-IN')}`}
              icon={CurrencyDollarIcon}
              linkTo="/dealer/crm/leads/panel?tab=analytics"
              loading={loading}
              trend="Goal: ₹1.5M"
              trendColor="text-blue-600"
            />
          </div>

          {/* Analytics Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Suspense fallback={<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-[380px] flex items-center justify-center">Loading Lead Status Chart...</div>}>
              {/* Pass appropriate data and filters to your chart components */}
              <LeadStatusDistributionChart dateRange={dateRange} filters={crmFilters} data={analytics?.leadStatusData} />
            </Suspense>
            <Suspense fallback={<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-[380px] flex items-center justify-center">Loading Conversion Funnel...</div>}>
              {/* Pass appropriate data and filters to your chart components */}
              <LeadConversionFunnel dateRange={dateRange} filters={crmFilters} data={analytics?.leadConversionData} />
            </Suspense>
          </div>

          {/* Recent Leads and Newest Customers Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Recent Leads ({recentLeads.length})</h2>
                <Link to="/dealer/crm/leads/panel?tab=list" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline">
                  View All <ArrowUpRightIcon className="h-4 w-4" />
                </Link>
              </div>
              {loading ? (
                <div className="space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-gray-200 rounded-md animate-pulse"></div>)}</div>
              ) : (
                <ul role="list" className="divide-y divide-gray-200">
                  {recentLeads.length > 0 ? (
                    recentLeads.map(lead => (
                      <li key={lead.id} className="py-2.5">
                        <Link to={`/dealer/crm/leads/panel?tab=list&search=${lead.id}`} className="flex items-center space-x-4 hover:bg-gray-50 -mx-2 px-2 py-1 rounded-md transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{lead.firstName} {lead.lastName} {lead.company ? `(${lead.company})` : ''}</p>
                            <p className="text-xs text-gray-600">{new Date(lead.createdAt).toLocaleDateString()} - {lead.status}</p>
                          </div>
                          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">{lead.status}</span>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="py-4 text-center text-gray-600">No recent leads for this period.</li>
                  )}
                </ul>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Newest Customers ({newCustomers.length})</h2>
                <Link to="/dealer/crm/customers/panel" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline">
                  View All <ArrowUpRightIcon className="h-4 w-4" />
                </Link>
              </div>
              {loading ? (
                <div className="space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-gray-200 rounded-md animate-pulse"></div>)}</div>
              ) : (
                <ul role="list" className="divide-y divide-gray-200">
                  {newCustomers.length > 0 ? (
                    newCustomers.map(customer => (
                      <li key={customer.id} className="py-2.5">
                        <Link to={`/dealer/crm/customers/panel?search=${customer.id}`} className="flex items-center space-x-4 hover:bg-gray-50 -mx-2 px-2 py-1 rounded-md transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{customer.firstName} {customer.lastName}</p>
                            <p className="text-xs text-gray-600">{new Date(customer.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">{customer.classification || 'Customer'}</span>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="py-4 text-center text-gray-600">No new customers for this period.</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </>
      )}

      {activeView === 'leads-kanban' && (
        <Suspense fallback={<div className="bg-white p-6 rounded-lg shadow-sm h-[600px] flex items-center justify-center">Loading Leads Kanban View...</div>}>
          {/* Ensure LeadsKanbanView accepts these props and renders the Kanban board */}
          <LeadsKanbanView dateRange={dateRange} filters={{ ...crmFilters, search: searchTerm }} />
        </Suspense>
      )}

      {activeView === 'customers-list' && (
        <Suspense fallback={<div className="bg-white p-6 rounded-lg shadow-sm h-[600px] flex items-center justify-center">Loading Customers List...</div>}>
          {/* Ensure CustomersList accepts these props and renders the customer table */}
          <CustomersList dateRange={dateRange} filters={{ ...crmFilters, search: searchTerm }} />
        </Suspense>
      )}

      {activeView === 'customer-cards' && (
        <Suspense fallback={<div className="bg-white p-6 rounded-lg shadow-sm h-[600px] flex items-center justify-center">Loading Customer Cards...</div>}>
          {/* Ensure CustomerCardView accepts these props and renders the card layout */}
          <CustomerCardView dateRange={dateRange} filters={{ ...crmFilters, search: searchTerm }} />
        </Suspense>
      )}

      {/* Add New Lead Modal */}
      {showCreateLeadModal && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">Loading form...</div>}>
          {/* Ensure CreateLead accepts these props */}
          <CreateLead onClose={() => setShowCreateLeadModal(false)} onLeadCreated={loadCrmDashboardData} />
        </Suspense>
      )}
    </div>
  );
}