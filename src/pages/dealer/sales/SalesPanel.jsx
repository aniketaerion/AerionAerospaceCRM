// src/pages/dealer/sales/SalesPanel.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Import Common UI Components
import Button from '@/components/common/Button';
import  WidgetCard  from '@/components/common/WidgetCard';
import ChartCard from '@/components/common/ChartCard';
import { DateRangePicker } from '@/components/common/inputs/DateRangePicker';
import { TextInput } from '@/components/common/inputs/TextInput'; // Assuming this exists for search/filters

// Import Shared Chart Components
import TrendLineChart from '@/components/shared/charts/TrendLineChart'; // For sales trends
import BarChart from '@/components/shared/charts/BarChart';       // For product sales, revenue/expenses
import DonutChart from '@/components/shared/charts/DonutChart';     // For status breakdowns

// Import Sales API functions
import { fetchSalesSummaryData, fetchSalesEntities } from '@/lib/api/sales';

const SalesPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for date range and search
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null,
    label: 'This Month'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'quotes', 'orders', 'customers'

  // State for sales data
  const [salesData, setSalesData] = useState({
    kpis: {
      totalSalesRevenue: 0, newQuotesThisPeriod: 0, openSalesOrdersCount: 0,
      avgOrderValue: 0, salesTargetAchieved: 0,
    },
    charts: {
      salesByMonth: [], quotesByStatus: [], topSalespersons: [],
    },
    recentSalesActivities: [],
    quotesList: [],
    ordersList: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine active tab from URL query params if any
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['dashboard', 'quotes', 'orders', 'customer-history'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('dashboard'); // Default to dashboard if no valid tab in URL
    }
  }, [location.search]);

  const loadSalesData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const summary = await fetchSalesSummaryData(selectedDateRange);
      setSalesData(prev => ({
        ...prev,
        kpis: summary.kpis,
        charts: summary.charts,
        recentSalesActivities: summary.recentSalesActivities,
      }));

      // Fetch list data only if the respective tab is active
      if (activeTab === 'quotes') {
        const quotes = await fetchSalesEntities('quotes', { dateRange: selectedDateRange, searchTerm });
        setSalesData(prev => ({ ...prev, quotesList: quotes }));
      } else if (activeTab === 'orders') {
        const orders = await fetchSalesEntities('orders', { dateRange: selectedDateRange, searchTerm });
        setSalesData(prev => ({ ...prev, ordersList: orders }));
      }

    } catch (err) {
      console.error("Failed to fetch sales data:", err);
      setError("Failed to load sales data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [selectedDateRange, activeTab, searchTerm]);

  useEffect(() => {
    loadSalesData();
  }, [loadSalesData]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Trigger data reload with new search term
    loadSalesData();
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    // Update URL to reflect active tab, for refresh and direct linking
    navigate(`/dealer/sales/panel?tab=${tabName}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        <p>Loading Sales data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px] text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const { kpis, charts, recentSalesActivities, quotesList, ordersList } = salesData;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mt-2">Sales Control Center</h1>
      <p className="text-gray-600 mt-1">Manage your sales opportunities, quotes, and orders.</p>

      {/* Header with Date Range, Search, and Primary Actions */}
      <div className="flex justify-between items-center mb-6 mt-4 flex-wrap gap-4">
        <DateRangePicker
          selectedRange={selectedDateRange}
          onRangeChange={setSelectedDateRange}
          className="flex-grow max-w-xs" // Control width for date picker
        />
        <form onSubmit={handleSearch} className="flex items-center flex-grow max-w-sm">
          <TextInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search quotes/orders..."
            className="w-full"
          />
          <Button type="submit" className="ml-2">Search</Button>
        </form>
        <div className="flex items-center space-x-2 flex-wrap justify-end">
          <Button onClick={() => navigate('/dealer/sales/quotes/create')}>+ New Quote</Button>
          <Button onClick={() => navigate('/dealer/sales/orders/create')}>+ New Sales Order</Button>
        </div>
      </div>

      {/* Module Navigation / Deeper Functionality Gateway (Tabs) */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => handleTabChange('dashboard')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'dashboard'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => handleTabChange('quotes')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'quotes'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Quotes
          </button>
          <button
            onClick={() => handleTabChange('orders')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'orders'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => handleTabChange('customer-history')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'customer-history'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Customer History
          </button>
          {/* Add more links/tabs for other sales functionalities like 'Sales Pipeline', 'Reports' etc. */}
        </nav>
      </div>

      {/* Main Data View - Content changes based on active tab */}
      {activeTab === 'dashboard' && (
        <>
          {/* Sales KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <WidgetCard
              title="Total Sales Revenue"
              value={`₹ ${kpis.totalSalesRevenue.toLocaleString('en-IN')}`}
              description={selectedDateRange.label}
              onClick={() => handleTabChange('orders')}
            />
            <WidgetCard
              title="New Quotes (This Period)"
              value={kpis.newQuotesThisPeriod}
              description={selectedDateRange.label}
              onClick={() => handleTabChange('quotes')}
            />
            <WidgetCard
              title="Open Sales Orders"
              value={kpis.openSalesOrdersCount}
              description="Currently active"
              onClick={() => handleTabChange('orders')}
            />
            <WidgetCard
              title="Average Order Value"
              value={`₹ ${kpis.avgOrderValue.toLocaleString('en-IN')}`}
              description={selectedDateRange.label}
            />
            <WidgetCard
              title="Sales Target Achieved"
              value={`${kpis.salesTargetAchieved}%`}
              description="Progress"
              // You might use a ProgressMeter here too if it fits
            />
          </div>

          {/* Sales Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCard title="Sales Trend">
              <TrendLineChart data={charts.salesByMonth} />
            </ChartCard>
            <ChartCard title="Quotes by Status">
              <DonutChart data={charts.quotesByStatus} />
            </ChartCard>
            <ChartCard title="Top Salespersons">
              <BarChart data={charts.topSalespersons} />
            </ChartCard>
          </div>

          {/* Recent Sales Activities */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Sales Activities</h3>
            {recentSalesActivities.length === 0 ? (
              <p className="text-gray-500">No recent sales activities to display.</p>
            ) : (
              <ul className="space-y-3">
                {recentSalesActivities.map((activity) => (
                  <li key={activity.id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-700">
                        <span className="font-medium">{activity.type}:</span> {activity.description}
                      </p>
                      <span className="text-gray-500">{activity.timestamp}</span>
                    </div>
                    {activity.link && (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => navigate(activity.link)}
                        className="mt-1"
                      >
                        View Details
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      {activeTab === 'quotes' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">All Quotes</h3>
          {quotesList.length === 0 && !loading ? (
            <p className="text-gray-500">No quotes found for the selected criteria.</p>
          ) : (
            // Render your Quotes List here, e.g., a table component
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quote ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quotesList.map((quote) => (
                  <tr key={quote.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quote.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{quote.amount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="link" size="sm" onClick={() => navigate(`/dealer/sales/quotes/${quote.id}`)}>View</Button>
                      <Button variant="link" size="sm" onClick={() => console.log('Edit Quote', quote.id)}>Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">All Sales Orders</h3>
          {ordersList.length === 0 && !loading ? (
            <p className="text-gray-500">No sales orders found for the selected criteria.</p>
          ) : (
            // Render your Orders List here, e.g., a table component
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ordersList.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.amount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="link" size="sm" onClick={() => navigate(`/dealer/sales/orders/${order.id}`)}>View</Button>
                      <Button variant="link" size="sm" onClick={() => console.log('Edit Order', order.id)}>Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'customer-history' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Customer Sales History</h3>
          <p className="text-gray-500">This section would display a comprehensive sales history for customers.</p>
          {/* You would integrate CustomerSalesHistory.jsx content here or use a dedicated component */}
        </div>
      )}
    </div>
  );
};

export default SalesPanel;