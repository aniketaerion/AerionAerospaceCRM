// src/pages/dealer/finance/FinanceDashboard.jsx
import React, { useEffect, useState } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { MetricCard } from '@/components/shared/ui/MetricCard';
import BarChart from '@/components/shared/charts/BarChart';
import DonutChart from '@/components/shared/charts/DonutChart';
import { Link } from 'react-router-dom';
import {
  CurrencyDollarIcon,
  ReceiptPercentIcon,
  BanknotesIcon,
  CreditCardIcon,
  ArrowUpRightIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import { useCrmStore } from '@/store/crmStore';

export default function FinanceDashboard() {
  const [dateRange, setDateRange] = useState('this_quarter');
  const { invoices, expenses, payments, loading, fetchInvoices, fetchExpenses, fetchPayments, getAnalyticsData } = useCrmStore();
  const [financeAnalytics, setFinanceAnalytics] = useState({});

  useEffect(() => {
    // Fetch all relevant data for finance, filtered by date range
    fetchInvoices({ dateRange });
    fetchExpenses({ dateRange });
    fetchPayments({ dateRange });

    // Calculate analytics from the fetched data
    const analytics = getAnalyticsData('invoices', { dateRange }); // Can pass any main data type for generic analytics
    setFinanceAnalytics(analytics);

    const interval = setInterval(() => {
      fetchInvoices({ dateRange });
      fetchExpenses({ dateRange });
      fetchPayments({ dateRange });
      setFinanceAnalytics(getAnalyticsData('invoices', { dateRange }));
    }, 60000);
    return () => clearInterval(interval);
  }, [dateRange, fetchInvoices, fetchExpenses, fetchPayments, getAnalyticsData]);

  const {
    totalRevenue = 0,
    totalExpenses = 0,
    netProfit = 0,
    arOutstanding = 0,
    apOutstanding = 0,
    revenueTrendChartData = [],
    expenseByCategoryChartData = [],
  } = financeAnalytics;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <TopHeaderBar title="Finance Overview Dashboard" />
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
      </div>

      <p className="mt-1 text-gray-600">Gain a clear picture of your dealership's financial health, manage cash flow, and track transactions.</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue (Paid)"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon={CurrencyDollarIcon}
          loading={loading}
          trend="+10% YoY"
        />
        <MetricCard
          title="Total Expenses (Approved/Paid)"
          value={`₹${totalExpenses.toLocaleString()}`}
          icon={ReceiptPercentIcon}
          loading={loading}
          trend="-5% YoY"
          trendColor="text-red-600"
        />
        <MetricCard
          title="Net Profit"
          value={`₹${netProfit.toLocaleString()}`}
          icon={BanknotesIcon}
          loading={loading}
          trend="+15% YoY"
          trendColor="text-green-600"
        />
        <MetricCard
          title="Accounts Receivable (Outstanding)"
          value={`₹${arOutstanding.toLocaleString()}`}
          icon={CreditCardIcon}
          loading={loading}
          trend="Immediate Action"
          trendColor="text-yellow-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue Trends (Paid Invoices)</h2>
          {loading && revenueTrendChartData.length === 0 ? (
             <div className="h-[300px] flex items-center justify-center text-gray-600 animate-pulse">Loading chart...</div>
          ) : revenueTrendChartData.length > 0 ? (
            <BarChart
              data={revenueTrendChartData}
              xAxisDataKey="name"
              barDataKey="value"
              barName="Revenue"
              barColor="#4CAF50" // Green for revenue
              height={300}
            />
          ) : (
            <p className="h-[300px] flex items-center justify-center text-gray-600">No revenue data for selected period.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Expenses by Category</h2>
          {loading && expenseByCategoryChartData.length === 0 ? (
             <div className="h-[300px] flex items-center justify-center text-gray-600 animate-pulse">Loading chart...</div>
          ) : expenseByCategoryChartData.length > 0 ? (
            <DonutChart
              data={expenseByCategoryChartData}
              dataKey="value"
              nameKey="name"
              height={300}
            />
          ) : (
            <p className="h-[300px] flex items-center justify-center text-gray-600">No expense category data for selected period.</p>
          )}
        </div>
      </div>

      {/* Quick Links / Navigation to detailed views */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Invoices</h3>
          <p className="text-gray-600 mb-4">Generate and track invoices to your customers.</p>
          <Link
            to="/dealer/finance/invoices"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Manage Invoices <ArrowUpRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Payments</h3>
          <p className="text-gray-600 mb-4">Record and reconcile incoming and outgoing payments.</p>
          <Link
            to="/dealer/finance/payments"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Manage Payments <ArrowUpRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Expenses</h3>
          <p className="text-gray-600 mb-4">Track and categorize all dealership operational expenses.</p>
          <Link
            to="/dealer/finance/expenses"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Manage Expenses <ArrowUpRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Finance Module Views (Enterprise Grade)</h2>
        <p className="text-gray-600">
          The Finance module provides robust financial management capabilities through distinct views:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>
            <strong className="text-aerion-blue">Dashboard View (Current):</strong> Aggregated financial KPIs and key charts.
          </li>
          <li>
            <strong className="text-aerion-blue">Invoices View (<Link to="/dealer/finance/invoices" className="text-blue-500 hover:underline">Invoices</Link>):</strong> A comprehensive list of all customer invoices, with status and due date tracking.
          </li>
          <li>
            <strong className="text-aerion-blue">Payments View (<Link to="/dealer/finance/payments" className="text-blue-500 hover:underline">Payments</Link>):</strong> To record and reconcile both incoming customer payments and outgoing payments to suppliers like Aerion.
          </li>
          <li>
            <strong className="text-aerion-blue">Expenses View (<Link to="/dealer/finance/expenses" className="text-blue-500 hover:underline">Expenses</Link>):</strong> Detailed tracking and categorization of all operational expenses.
          </li>
          <li>
            <strong className="text-aerion-blue">Bank Reconciliation (Planned):</strong> A dedicated interface to match bank statements with recorded transactions.
          </li>
          <li>
            <strong className="text-aerion-blue">Financial Reports (P&L, Balance Sheet) (Planned):</strong> Advanced reporting for deeper financial analysis.
          </li>
        </ul>
      </div>
    </div>
  );
}