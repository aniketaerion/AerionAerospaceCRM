// src/pages/Dashboard/index.jsx

import React, { useState, useEffect, useCallback, useMemo } from 'react';
// Re-introducing useNavigate and MemoryRouter for navigation within this self-contained environment.
import { useNavigate, MemoryRouter } from 'react-router-dom';

// --- Self-Contained Mock UI Components ---
// All UI components are defined directly in this file to remove all external dependencies.

const Button = ({ children, onClick, className = '', variant = 'primary', size = 'md' }) => {
  const baseClasses = 'font-medium rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    tertiary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
    link: 'bg-transparent text-blue-600 hover:text-blue-800 underline p-0',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const ToggleSwitch = ({ checked, onChange, id }) => (
  <label htmlFor={id} className="flex items-center cursor-pointer">
    <div className="relative">
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className={`block w-10 h-6 rounded-full ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-full' : ''}`}></div>
    </div>
  </label>
);

const WidgetCard = ({ title, value, description, status, onClick }) => (
    <div
        className={`bg-white p-4 rounded-lg shadow-sm flex flex-col h-full relative cursor-pointer hover:shadow-md transition-shadow`}
        onClick={onClick}
    >
        <h3 className="text-md font-semibold text-gray-700">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 my-2">{value}</p>
        <p className={`text-sm text-gray-500 mt-auto ${status === 'alert' ? 'text-red-500 font-medium' : status === 'warning' ? 'text-yellow-600 font-medium' : ''}`}>
            {description}
        </p>
    </div>
);


const ChartCard = ({ title, children }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col h-full">
    <h3 className="text-md font-semibold text-gray-700 mb-2">{title}</h3>
    <div className="flex-grow flex items-center justify-center min-h-[150px]">
      {children || <p className="text-gray-500">Chart Placeholder</p>}
    </div>
  </div>
);

const DateRangePicker = ({ selectedRange, onRangeChange, label }) => (
    <Button variant="tertiary" className="w-full sm:w-auto">
      {label}: <span className="font-semibold ml-2">{selectedRange.label}</span>
    </Button>
);

const TextInput = ({ type = 'text', placeholder, value, onChange, className = '' }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${className}`}
  />
);

const Select = ({ label, options, value, onChange, className = '' }) => (
  <div className={className}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <select
      value={value}
      onChange={onChange}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 pl-3 pr-10 text-base"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Mock Chart Components
const BarChart = ({ data }) => <div className="text-xs text-gray-400">Bar Chart (Data: {data.length} items)</div>;
const DonutChartComponent = ({ data }) => <div className="text-xs text-gray-400">Donut Chart (Data: {data.length} items)</div>;
const FunnelChart = ({ data }) => <div className="text-xs text-gray-400">Funnel Chart (Data: {data.length} items)</div>;
const TrendLineChart = ({ data }) => <div className="text-xs text-gray-400">Trend Line (Data: {data.length} items)</div>;
const ProgressMeter = ({ value, max, label }) => <div className="text-xs text-gray-400">Progress: {value}/{max} {label}</div>;

// Mock Icon
const MagnifyingGlassIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

// --- End of Mock Components ---


// Main Dashboard Component
const DashboardPage = () => {
  const navigate = useNavigate();

  // --- STATE DECLARATIONS ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    kpis: {},
    charts: {},
    recentActivities: [],
    overdueTasks: [],
    upcomingEvents: [],
  });
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null,
    label: 'This Month'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [advancedFilters, setAdvancedFilters] = useState({ salesperson: '', region: '', productType: '' });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeDashboardView, setActiveDashboardView] = useState('cards');
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);

  // Define all available widgets
  const allDashboardWidgets = useMemo(() => [
    { key: 'overdueInvoices', name: 'Overdue Invoices (KPI)'},
    { key: 'lowStockItems', name: 'Low Stock Items (KPI)'},
    { key: 'urgentSupportTickets', name: 'Urgent Support Tickets (KPI)'},
    { key: 'salesOrdersPastDue', name: 'Sales Orders Past Due (KPI)'},
    { key: 'totalSalesRevenue', name: 'Total Sales Revenue (KPI)'},
    { key: 'newLeads', name: 'New Leads (KPI)'},
    { key: 'availableInventory', name: 'Available Inventory (KPI)'},
    { key: 'pendingPO', name: 'Pending Purchase Orders (KPI)'},
    { key: 'cashBalance', name: 'Cash Balance (KPI)'},
    { key: 'billsDueSoon', name: 'Bills Due Soon (KPI)'},
    { key: 'openSupportRequests', name: 'Open Support Requests (KPI)'},
    { key: 'avgTicketResolutionTime', name: 'Avg. Ticket Resolution Time (KPI)'},
    { key: 'activeMarketingCampaigns', name: 'Active Marketing Campaigns (KPI)'},
    { key: 'teamPerformanceScore', name: 'Team Performance Score (KPI)'},
    { key: 'salesTrend', name: 'Sales Trend (Chart)'},
    { key: 'leadConversionFunnel', name: 'Lead Conversion Funnel (Chart)'},
    { key: 'bestsellingProducts', name: 'Bestselling Products (Chart)'},
    { key: 'revenueExpenses', name: 'Revenue vs. Expenses (Chart)'},
    { key: 'ticketStatus', name: 'Ticket Status Breakdown (Chart)'},
    { key: 'inventoryTurnover', name: 'Inventory Turnover (Chart)'},
    { key: 'salesByRegion', name: 'Sales by Region (Chart)'},
    { key: 'overdueTasksList', name: 'Overdue Tasks (List)'},
    { key: 'upcomingEventsList', name: 'Upcoming Events (List)'},
    { key: 'recentActivitiesFeed', name: 'Recent Activities Feed (List)'},
  ], []);

  // State for managing widget visibility
  const [visibleWidgets, setVisibleWidgets] = useState(() => {
    try {
        const savedVisibility = localStorage.getItem('dashboardWidgetVisibility');
        if (savedVisibility) return JSON.parse(savedVisibility);
    } catch (e) { console.error("Failed to parse widget visibility from localStorage"); }
    // Default visibility: all true
    return allDashboardWidgets.reduce((acc, widget) => {
        acc[widget.key] = true;
        return acc;
    }, {});
  });

  // Effect to save visibility changes to localStorage
  useEffect(() => {
    localStorage.setItem('dashboardWidgetVisibility', JSON.stringify(visibleWidgets));
  }, [visibleWidgets]);

  // Simulate loading dashboard data from an API
  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    // Simulate network delay
    setTimeout(() => {
        try {
            // Mock data structure that the component expects
            const mockApiData = {
                kpis: {
                    overdueInvoicesAmount: 85000, overdueInvoicesCount: 12,
                    lowStockItemsCount: 5, urgentSupportTicketsCount: 3,
                    salesOrdersPastDueCount: 8, totalSalesRevenue: 1250000,
                    newLeadsCount: 25, availableInventoryUnits: 3400,
                    pendingPOCount: 45000, cashBalance: 530000,
                    billsDueNext7Days: 15000, openSupportRequests: 15,
                    avgTicketResolutionTime: 4.5, activeMarketingCampaigns: 2,
                    teamPerformanceScore: 88,
                },
                charts: {
                    salesTrend: [{ name: 'Jan', sales: 100 }, { name: 'Feb', sales: 120 }],
                    leadConversionFunnel: [{ name: 'Leads', value: 100 }, { name: 'Qualified', value: 75 }],
                    productSales: [{ name: 'Prod A', sales: 50 }, { name: 'Prod B', sales: 80 }],
                    revenueExpensesTrend: [{ name: 'Jan', revenue: 200, expenses: 150 }],
                    ticketStatus: [{ name: 'Open', value: 10 }, { name: 'Closed', value: 50 }],
                    inventoryTurnover: 6.5,
                    salesByRegion: [{ name: 'North', sales: 300 }, { name: 'South', sales: 450 }],
                },
                recentActivities: [
                    { type: 'Invoice', description: 'Invoice #INV-012 paid by Customer X', timestamp: '2 hours ago', link: '#' },
                    { type: 'Lead', description: 'New lead "John Doe" created', timestamp: '5 hours ago', link: '#' }
                ],
                overdueTasks: [
                    { id: 'ot1', description: 'Follow up on CRM Lead #005', module: 'CRM', dueDate: '2025-06-20', link: '#' },
                ],
                upcomingEvents: [
                    { id: 'ue1', description: 'Sales Team Meeting', module: 'Team', date: '2025-06-25', time: '10:00 AM', link: '#'  },
                ]
            };
            setDashboardData(mockApiData);
        } catch (err) {
            console.error("Failed to process mock data:", err);
            setError("Failed to load dashboard data. Please try again.");
        } finally {
            setLoading(false);
        }
    }, 1000); // 1 second delay
  }, [selectedDateRange, advancedFilters]); // Re-fetch if filters change

  // Initial data load
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleNavigateToModule = (modulePath) => navigate(modulePath);
  const handleGlobalSearch = (e) => {
    e.preventDefault();
    navigate(`/dealer/search-results?q=${searchTerm}`);
  };

  const handleWidgetVisibilityToggle = (widgetKey, isVisible) => {
    setVisibleWidgets(prev => ({ ...prev, [widgetKey]: isVisible }));
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><p className="text-lg">Loading DMS Dashboard...</p></div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500"><p>{error}</p></div>;

  const { kpis, charts, recentActivities, overdueTasks, upcomingEvents } = dashboardData;

  const renderWidgetContent = (widgetKey) => {
    // This function will render the content inside the grid item
    switch (widgetKey) {
        case 'overdueInvoices': return <WidgetCard title="Overdue Invoices" value={`₹ ${kpis.overdueInvoicesAmount?.toLocaleString('en-IN') || '0'}`} status="alert" description={`${kpis.overdueInvoicesCount || '0'} customers`} onClick={() => handleNavigateToModule('/dealer/finance?status=overdue')} />;
        case 'lowStockItems': return <WidgetCard title="Low Stock Items" value={kpis.lowStockItemsCount || '0'} status="warning" description="Below reorder level" onClick={() => handleNavigateToModule('/dealer/inventory?status=low_stock')} />;
        case 'urgentSupportTickets': return <WidgetCard title="Urgent Support Tickets" value={kpis.urgentSupportTicketsCount || '0'} status="critical" description="High-priority" onClick={() => handleNavigateToModule('/dealer/service?priority=high')} />;
        case 'totalSalesRevenue': return <WidgetCard title="Total Sales Revenue" value={`₹ ${kpis.totalSalesRevenue?.toLocaleString('en-IN') || '0'}`} description={selectedDateRange.label} onClick={() => handleNavigateToModule('/dealer/sales')} />;
        case 'newLeads': return <WidgetCard title="New Leads" value={kpis.newLeadsCount || '0'} description={selectedDateRange.label} onClick={() => handleNavigateToModule('/dealer/crm/leads')} />;
        case 'cashBalance': return <WidgetCard title="Cash Balance" value={`₹ ${kpis.cashBalance?.toLocaleString('en-IN') || '0'}`} description="Across all accounts" onClick={() => handleNavigateToModule('/dealer/finance?tab=bank_accounts')} />;
        
        case 'salesTrend': return <ChartCard title="Sales Trend"><TrendLineChart data={charts.salesTrend || []} /></ChartCard>;
        case 'leadConversionFunnel': return <ChartCard title="Lead Conversion Funnel"><FunnelChart data={charts.leadConversionFunnel || []} /></ChartCard>;
        case 'bestsellingProducts': return <ChartCard title="Bestselling Products"><BarChart data={charts.productSales || []} /></ChartCard>;
        case 'ticketStatus': return <ChartCard title="Ticket Status"><DonutChartComponent data={charts.ticketStatus || []} /></ChartCard>;
        case 'inventoryTurnover': return <ChartCard title="Inventory Turnover"><ProgressMeter value={charts.inventoryTurnover || 0} max={10} label="Turns" /></ChartCard>;

        default: return <div className="bg-gray-100 p-4 rounded-lg h-full flex items-center justify-center"><p className="text-xs text-gray-500">{widgetKey} content</p></div>;
    }
  };


  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-2 border-b">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">DMS Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome, here's your operational overview.</p>
        </div>
        <form onSubmit={handleGlobalSearch} className="relative mt-4 sm:mt-0 w-full sm:w-64">
          <TextInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search across DMS..."
            className="pl-10"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </form>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6 p-3 bg-white rounded-lg shadow-sm border">
        <DateRangePicker selectedRange={selectedDateRange} onRangeChange={setSelectedDateRange} label="Date Range" />
        <div className="flex items-center gap-2 flex-wrap justify-center">
            <Button onClick={() => navigate('#')} size="sm">+ New Order</Button>
            <Button onClick={() => navigate('#')} size="sm">+ Record Payment</Button>
        </div>
        <div className="flex items-center gap-2 justify-end">
            <Button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} variant="tertiary" size="sm">
              {showAdvancedFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            <select value={activeDashboardView} onChange={(e) => setActiveDashboardView(e.target.value)} className="text-sm border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="cards">Card View</option>
                <option value="list">List View</option>
                <option value="kanban">Kanban View</option>
            </select>
            <Button onClick={() => setShowCustomizeModal(true)} variant="tertiary" size="sm">Customize</Button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mock filters */}
          <Select label="Salesperson" options={[{value: '', label: 'All'}]} />
          <Select label="Region" options={[{value: '', label: 'All'}]} />
          <Select label="Product Type" options={[{value: '', label: 'All'}]} />
        </div>
      )}

      {/* Customize Modal */}
      {showCustomizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Customize Dashboard</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {allDashboardWidgets.map(widget => (
                <div key={widget.key} className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">{widget.name}</span>
                  <ToggleSwitch id={`toggle-${widget.key}`} checked={!!visibleWidgets[widget.key]} onChange={(checked) => handleWidgetVisibilityToggle(widget.key, checked)} />
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
                <Button onClick={() => setShowCustomizeModal(false)}>Done</Button>
            </div>
          </div>
        </div>
      )}

      {/* --- Main Dashboard Content based on View --- */}

      {/* CARD VIEW */}
      {activeDashboardView === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* We explicitly render widgets that make sense for a card view */}
          {visibleWidgets.overdueInvoices && <div className="h-40">{renderWidgetContent('overdueInvoices')}</div>}
          {visibleWidgets.lowStockItems && <div className="h-40">{renderWidgetContent('lowStockItems')}</div>}
          {visibleWidgets.urgentSupportTickets && <div className="h-40">{renderWidgetContent('urgentSupportTickets')}</div>}
          {visibleWidgets.totalSalesRevenue && <div className="h-40">{renderWidgetContent('totalSalesRevenue')}</div>}
          {visibleWidgets.newLeads && <div className="h-40">{renderWidgetContent('newLeads')}</div>}
          {visibleWidgets.cashBalance && <div className="h-40">{renderWidgetContent('cashBalance')}</div>}

          {visibleWidgets.salesTrend && <div className="sm:col-span-2 h-72">{renderWidgetContent('salesTrend')}</div>}
          {visibleWidgets.leadConversionFunnel && <div className="sm:col-span-2 h-72">{renderWidgetContent('leadConversionFunnel')}</div>}
          {visibleWidgets.bestsellingProducts && <div className="sm:col-span-2 h-72">{renderWidgetContent('bestsellingProducts')}</div>}
          {visibleWidgets.ticketStatus && <div className="sm:col-span-2 h-72">{renderWidgetContent('ticketStatus')}</div>}
        </div>
      )}

      {/* LIST VIEW */}
      {activeDashboardView === 'list' && (
        <div className="space-y-6">
            {visibleWidgets.overdueTasksList && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-2">Overdue Tasks</h3>
                    <ul className="space-y-2">
                        {overdueTasks.map(task => <li key={task.id} className="text-sm border-b pb-1">{task.description} - Due: {task.dueDate}</li>)}
                    </ul>
                </div>
            )}
            {visibleWidgets.upcomingEventsList && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-2">Upcoming Events</h3>
                    <ul className="space-y-2">
                        {upcomingEvents.map(event => <li key={event.id} className="text-sm border-b pb-1">{event.description} - {event.date}</li>)}
                    </ul>
                </div>
            )}
             {visibleWidgets.recentActivitiesFeed && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-2">Recent Activities</h3>
                    <ul className="space-y-2">
                        {recentActivities.map((act, i) => <li key={i} className="text-sm border-b pb-1">{act.description}</li>)}
                    </ul>
                </div>
            )}
        </div>
      )}

      {/* KANBAN VIEW */}
      {activeDashboardView === 'kanban' && (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Attention */}
            <div className="bg-red-50 p-4 rounded-lg border-t-4 border-red-500">
                <h3 className="font-semibold text-red-700 mb-4">Requires Immediate Attention</h3>
                <div className="space-y-3">
                    {visibleWidgets.overdueInvoices && kpis.overdueInvoicesCount > 0 && <div className="bg-white p-2 rounded shadow-sm text-sm">Overdue Invoices: {kpis.overdueInvoicesCount}</div>}
                    {visibleWidgets.urgentSupportTickets && kpis.urgentSupportTicketsCount > 0 && <div className="bg-white p-2 rounded shadow-sm text-sm">Urgent Tickets: {kpis.urgentSupportTicketsCount}</div>}
                    {visibleWidgets.lowStockItems && kpis.lowStockItemsCount > 0 && <div className="bg-white p-2 rounded shadow-sm text-sm">Low Stock Items: {kpis.lowStockItemsCount}</div>}
                </div>
            </div>
            {/* Column 2: In Progress */}
            <div className="bg-yellow-50 p-4 rounded-lg border-t-4 border-yellow-500">
                <h3 className="font-semibold text-yellow-700 mb-4">In Progress</h3>
                <div className="space-y-3">
                    {visibleWidgets.pendingPO && kpis.pendingPOCount > 0 && <div className="bg-white p-2 rounded shadow-sm text-sm">Pending POs Value: ₹{kpis.pendingPOCount.toLocaleString()}</div>}
                    {visibleWidgets.newLeads && kpis.newLeadsCount > 0 && <div className="bg-white p-2 rounded shadow-sm text-sm">New Leads to Qualify: {kpis.newLeadsCount}</div>}
                </div>
            </div>
            {/* Column 3: On Track */}
            <div className="bg-green-50 p-4 rounded-lg border-t-4 border-green-500">
                <h3 className="font-semibold text-green-700 mb-4">On Track / Healthy</h3>
                 <div className="space-y-3">
                    {visibleWidgets.totalSalesRevenue && <div className="bg-white p-2 rounded shadow-sm text-sm">Sales This Month: ₹{kpis.totalSalesRevenue.toLocaleString()}</div>}
                    {visibleWidgets.cashBalance && <div className="bg-white p-2 rounded shadow-sm text-sm">Cash Balance: ₹{kpis.cashBalance.toLocaleString()}</div>}
                </div>
            </div>
         </div>
      )}
    </div>
  );
};

// Wrap Dashboard in MemoryRouter to make it a runnable, self-contained App

export default DashboardPage;