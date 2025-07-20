// src/pages/dealer/crm/leads/LeadAnalytics.jsx
import React, { useState, useEffect, Suspense, lazy, useMemo } from 'react';
import { useCrmStore } from '@/store/crmStore';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import { MetricCard } from '@/components/shared/ui/MetricCard';
import {
  CheckCircleIcon, TagIcon, FunnelIcon, CurrencyDollarIcon,
  ChartBarIcon, ClockIcon, ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

// Lazy load dedicated chart components (already defined in your newer LeadAnalytics)
const LeadStatusDistributionChart = lazy(() => import('@/components/shared/charts/LeadStatusDistributionChart'));
const LeadConversionFunnel = lazy(() => import('@/components/shared/charts/LeadConversionFunnel'));

// Generic chart components from LeadPerformance.jsx, assuming they are wrappers around recharts
// We will integrate their data needs into getAnalyticsData for better performance
const BarChart = lazy(() => import('@/components/shared/charts/BarChart'));
const DonutChart = lazy(() => import('@/components/shared/charts/DonutChart'));
const TrendLineChart = lazy(() => import('@/components/shared/charts/TrendLineChart'));

export default function LeadAnalytics() {
  const { leads, loading, users, getAnalyticsData } = useCrmStore();

  const [dateRange, setDateRange] = useState('this_quarter');
  const [filters, setFilters] = useState({
    source: '',
    assignedTo: '',
    // Add status filter to LeadAnalytics as well, aligning with LeadPerformance
    status: '',
  });
  const [analytics, setAnalytics] = useState(null);

  // --- Data Fetching and Analytics Calculation ---
  useEffect(() => {
    // getAnalyticsData now fetches and processes data based on dateRange and filters
    // This function inside crmStore should be responsible for returning all necessary chart data
    const data = getAnalyticsData({ dateRange, ...filters });
    setAnalytics(data);
  }, [dateRange, filters, getAnalyticsData]); // Dependency array ensures re-run on change

  // --- Filter Handlers ---
  const handleFilterChange = (newFilter) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, ...newFilter };
      // Ensure that empty strings properly clear the filter
      Object.keys(updatedFilters).forEach(key => {
        if (updatedFilters[key] === '') {
          delete updatedFilters[key];
        }
      });
      return updatedFilters;
    });
  };

  // --- Memoized Filter Options ---
  const leadStatuses = useMemo(() => [
    { value: '', label: 'All Statuses' }, // Added 'All' option
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Pitched', label: 'Pitched' },
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Disqualified', label: 'Disqualified' },
    // Add 'Converted' from old LeadPerformance if applicable in your system
    { value: 'Converted', label: 'Converted' },
  ], []);

  const leadSources = useMemo(() => [
    { value: '', label: 'All Sources' }, // Added 'All' option
    { value: 'Website', label: 'Website' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Campaign', label: 'Campaign' },
    { value: 'Partnership', label: 'Partnership' },
    { value: 'Social Media', label: 'Social Media' },
  ], []);

  const assignedUsersOptions = useMemo(() => [
    { value: '', label: 'All Assignees' }, // Added 'All' option
    ...users.map(user => ({ value: user.id, label: user.name }))
  ], [users]);

  // --- Loading and Error States ---
  if (loading && !analytics) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-4">
        <p className="text-gray-600">Loading lead analytics...</p>
      </div>
    );
  }

  // analytics could be null initially if loading hasn't started or if getAnalyticsData returns null
  // We should check for it before destructuring.
  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-96 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <p className="text-red-500">No analytics data available for the selected period/filters. Please try again or adjust filters.</p>
      </div>
    );
  }

  // Destructure analytics data for easier access
  const {
    overallConversionRate = 0,
    totalNewLeads = 0,
    totalQualifiedLeads = 0,
    totalConvertedLeads = 0, // From LeadPerformance
    estimatedPotentialValue = 0, // Calculated from leads, potentially also from getAnalyticsData
    leadStatusChartData = [],
    leadFunnelData = [],
    newLeadsChartData = [], // new Leads by Period from old LeadAnalytics
    disqualificationChartData = [],
    leadsQualifiedByUser = [],
    leadsBySourceChartData = [], // From LeadPerformance
    leadsByStatusChartData = [], // From LeadPerformance (should ideally be same as leadStatusChartData if normalized)
    leadsOverTimeChartData = [], // From LeadPerformance
    avgSalesCycleDays = 0, // Assuming this comes from analyticsData now
  } = analytics;


  return (
    <div className="space-y-8 p-4">
      {/* Header and Date Range */}
      <div className="flex justify-between items-center mb-4">
        <TopHeaderBar title="Lead Analytics Overview" />
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
      </div>

      {/* Filter Panel */}
      <FilterPanel
        filtersConfig={[
          { id: 'status', label: 'Status', type: 'select', options: leadStatuses }, // Added status filter
          { id: 'source', label: 'Lead Source', type: 'select', options: leadSources },
          { id: 'assignedTo', label: 'Assigned To', type: 'select', options: assignedUsersOptions },
        ]}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Overall Conversion Rate (New to Qualified)"
          value={`${overallConversionRate.toFixed(1)}%`} // Ensure formatting
          loading={loading}
          icon={CheckCircleIcon}
        />
        <MetricCard
          title="Total New Leads"
          value={totalNewLeads.toLocaleString()}
          loading={loading}
          icon={TagIcon}
        />
        <MetricCard
          title="Total Qualified Leads"
          value={totalQualifiedLeads.toLocaleString()}
          loading={loading}
          icon={FunnelIcon}
        />
        <MetricCard
          title="Total Converted Leads" // From LeadPerformance
          value={totalConvertedLeads.toLocaleString()}
          loading={loading}
          icon={CheckCircleIcon} // Reusing for converted count
        />
        <MetricCard
          title="Estimated Potential Value"
          value={`$${estimatedPotentialValue.toLocaleString()}`}
          loading={loading}
          icon={CurrencyDollarIcon}
        />
        <MetricCard
          title="Average Sales Cycle" // From LeadPerformance
          value={avgSalesCycleDays ? `${avgSalesCycleDays} Days` : 'N/A'}
          loading={loading}
          icon={ClockIcon}
        />
        {/* You can add more MetricCards here as needed, derived from analytics */}
      </div>


      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Lead Status Distribution Chart (from newer LeadAnalytics) */}
        <Suspense fallback={<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-[380px] flex items-center justify-center">Loading Lead Status Chart...</div>}>
          <LeadStatusDistributionChart dateRange={dateRange} filters={filters} />
        </Suspense>

        {/* Lead Conversion Funnel (from newer LeadAnalytics) */}
        <Suspense fallback={<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-[380px] flex items-center justify-center">Loading Conversion Funnel...</div>}>
          <LeadConversionFunnel dateRange={dateRange} filters={filters} />
        </Suspense>

        {/* Leads by Source (Bar Chart from LeadPerformance) */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 col-span-full xl:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Leads by Source</h2>
          <Suspense fallback={<div className="h-[300px] flex items-center justify-center">Loading chart...</div>}>
            {leadsBySourceChartData && leadsBySourceChartData.length > 0 ? (
              <BarChart data={leadsBySourceChartData} xAxisDataKey="name" barDataKey="value" height={300} />
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-600">
                <p>No source data for selected filters.</p>
              </div>
            )}
          </Suspense>
        </div>

        {/* New Leads by Period (Bar Chart from old LeadAnalytics) / Leads Over Time (TrendLineChart from LeadPerformance) */}
        {/* Using TrendLineChart for "New Leads Over Time" as it's more appropriate for time series */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 col-span-full lg:col-span-2 xl:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">New Leads Over Time</h2>
          <Suspense fallback={<div className="h-[300px] flex items-center justify-center">Loading chart...</div>}>
            {leadsOverTimeChartData && leadsOverTimeChartData.length > 0 ? (
              <TrendLineChart data={leadsOverTimeChartData} xAxisDataKey="date" lineDataKey="count" height={300} />
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-600">
                <p>No new leads trend data for this period matching filters.</p>
              </div>
            )}
          </Suspense>
        </div>

        {/* Disqualification Reasons (Pie Chart from old LeadAnalytics) */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 col-span-full xl:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Disqualification Reasons</h2>
          <Suspense fallback={<div className="h-[300px] flex items-center justify-center">Loading chart...</div>}>
            {disqualificationChartData && disqualificationChartData.length > 0 ? (
              // Assuming your DonutChart component can handle similar data to PieChart
              <DonutChart data={disqualificationChartData} dataKey="value" nameKey="name" height={300} />
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-600">
                <p>No disqualified leads data for this period matching filters.</p>
              </div>
            )}
          </Suspense>
        </div>

        {/* Leads Qualified by User (Bar Chart from old LeadAnalytics) */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 col-span-full xl:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Leads Qualified by User</h2>
          <Suspense fallback={<div className="h-[300px] flex items-center justify-center">Loading chart...</div>}>
            {leadsQualifiedByUser && leadsQualifiedByUser.length > 0 ? (
              <BarChart
                data={leadsQualifiedByUser}
                xAxisDataKey="user"
                barDataKey="qualifiedCount"
                secondaryBarDataKey="averageTime" // If your BarChart supports a second bar
                secondaryBarName="Avg. Time (Days to Qualify)"
                barName="Qualified Leads"
                height={300}
              />
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-600">
                <p>No qualified leads by user for this period matching filters.</p>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}