// src/pages/dealer/reports/dashboard/index.jsx
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCrmStore } from '@/store/crmStore';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { MetricCard } from '@/components/shared/ui/MetricCard';
import BarChart from '@/components/shared/charts/BarChart';
import TrendLineChart from '@/components/shared/charts/TrendLineChart';
import DonutChart from '@/components/shared/charts/DonutChart';
import {
  UsersIcon, CurrencyDollarIcon, ArchiveBoxIcon, WrenchScrewdriverIcon,
  MegaphoneIcon, ClipboardDocumentListIcon, ShoppingBagIcon, CalendarDaysIcon,
  ArrowUpRightIcon, ClockIcon, BuildingOfficeIcon, UserGroupIcon, DocumentTextIcon
} from '@heroicons/react/24/outline'; // Importing relevant icons

export default function ReportsDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDateRange = searchParams.get('dateRange') || 'this_month';

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [reportFilters, setReportFilters] = useState({}); // For any future specific report filters

  // Fetch the global analytics function from the store
  const getGlobalDashboardAnalytics = useCrmStore((state) => state.getGlobalDashboardAnalytics);
  const loading = useCrmStore((state) => state.loading);

  // Memoize the analytics data to prevent unnecessary re-calculations
  const analyticsData = useMemo(() => {
    return getGlobalDashboardAnalytics({ dateRange, ...reportFilters });
  }, [dateRange, reportFilters, getGlobalDashboardAnalytics]);

  const { kpis, charts, recentActivities, overdueTasks } = analyticsData;

  // Update URL search params when date range or filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (dateRange && dateRange !== 'all_time') newSearchParams.set('dateRange', dateRange);
    // Add other filters to search params if needed
    setSearchParams(newSearchParams, { replace: true });
  }, [dateRange, reportFilters, setSearchParams]);

  // Optional: Auto-refresh data (e.g., every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      // Re-fetch data by updating dateRange state (or triggering a direct fetch if available)
      // For now, re-calculating memoized data is sufficient if underlying store data updates
      console.log('Refreshing reports data...');
      // If your store had a 'refreshAllData' action, you'd call it here:
      // useCrmStore.getState().refreshAllData();
    }, 300000); // Every 5 minutes (300000 ms)
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="p-6 space-y-6 bg-neutral-light min-h-screen">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <TopHeaderBar title="Business 360 Reports" />
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
      </div>

      <p className="mt-1 text-gray-600">
        Gain a comprehensive 360-degree view of your dealership's performance across all departments.
      </p>

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-lg shadow-sm animate-pulse"></div>
            ))}
          </div>
          <div className="h-80 bg-gray-100 rounded-lg shadow-sm animate-pulse"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-100 rounded-lg shadow-sm animate-pulse"></div>
            <div className="h-64 bg-gray-100 rounded-lg shadow-sm animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* KPIs Section */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Performance Indicators</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Sales Revenue"
                value={`₹${kpis.totalSalesRevenue ? kpis.totalSalesRevenue.toLocaleString('en-IN') : '0'}`}
                icon={CurrencyDollarIcon}
                loading={loading}
                trendColor="text-green-600"
              />
              <MetricCard
                title="New Leads"
                value={kpis.newLeadsCount || 0}
                icon={ClipboardDocumentListIcon}
                loading={loading}
                trendColor="text-blue-600"
              />
              <MetricCard
                title="Total Customers"
                value={kpis.totalCustomersCount || 0}
                icon={UsersIcon}
                loading={loading}
                trendColor="text-purple-600"
              />
              <MetricCard
                title="Low Stock Items"
                value={kpis.lowStockItemsCount || 0}
                icon={ArchiveBoxIcon}
                loading={loading}
                trendColor="text-red-600"
              />
              <MetricCard
                title="Overdue Invoices"
                value={`₹${kpis.overdueInvoicesAmount ? kpis.overdueInvoicesAmount.toLocaleString('en-IN') : '0'}`}
                icon={ClockIcon}
                loading={loading}
                trendColor="text-orange-600"
              />
              <MetricCard
                title="Active Campaigns"
                value={kpis.activeMarketingCampaigns || 0}
                icon={MegaphoneIcon}
                loading={loading}
                trendColor="text-indigo-600"
              />
              <MetricCard
                title="Open Support Tickets"
                value={kpis.openSupportRequests || 0}
                icon={WrenchScrewdriverIcon}
                loading={loading}
                trendColor="text-yellow-600"
              />
              <MetricCard
                title="Total Staff"
                value={kpis.totalStaff || 0}
                icon={UserGroupIcon}
                loading={loading}
                trendColor="text-teal-600"
              />
            </div>
          </section>

          {/* Charts Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Trend (Last 6 Months)</h3>
              {charts.salesTrend && charts.salesTrend.length > 0 ? (
                <TrendLineChart data={charts.salesTrend} xAxisDataKey="name" lineDataKey="value" lineName="Sales" height={250} lineColor="#4F46E5" />
              ) : (
                <p className="h-[250px] flex items-center justify-center text-gray-600">No sales trend data available.</p>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Lead Conversion Funnel</h3>
              {charts.leadConversionFunnel && charts.leadConversionFunnel.length > 0 ? (
                <BarChart data={charts.leadConversionFunnel} xAxisDataKey="stage" barDataKey="count" barName="Leads" height={250} barColor="#22C55E" />
              ) : (
                <p className="h-[250px] flex items-center justify-center text-gray-600">No lead conversion data available.</p>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Bestselling Products</h3>
              {charts.productSales && charts.productSales.length > 0 ? (
                <DonutChart data={charts.productSales} dataKey="value" nameKey="name" height={250} />
              ) : (
                <p className="h-[250px] flex items-center justify-center text-gray-600">No product sales data available.</p>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue vs. Expenses</h3>
              {charts.revenueExpenses && charts.revenueExpenses.length > 0 ? (
                <BarChart data={charts.revenueExpenses} xAxisDataKey="name" barDataKey="value" barName="Amount" height={250} barColor="#F59E0B" />
              ) : (
                <p className="h-[250px] flex items-center justify-center text-gray-600">No revenue/expense data available.</p>
              )}
            </div>
          </section>

          {/* Recent Activities & Overdue Tasks */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
              {recentActivities && recentActivities.length > 0 ? (
                <ul className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <li key={index} className="flex items-start space-x-3 text-sm text-gray-700">
                      <ArrowUpRightIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">{activity.type}:</span> {activity.description}
                        <span className="block text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No recent activities to display.</p>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Overdue Tasks</h3>
              {overdueTasks && overdueTasks.length > 0 ? (
                <ul className="space-y-3">
                  {overdueTasks.map((task, index) => (
                    <li key={index} className="flex items-start space-x-3 text-sm text-gray-700">
                      <ClockIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Task ({task.module}):</span> {task.description}
                        <span className="block text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No overdue tasks.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
