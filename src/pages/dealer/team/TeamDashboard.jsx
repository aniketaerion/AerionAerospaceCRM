// src/pages/dealer/team/TeamDashboard.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { MetricCard } from '@/components/shared/ui/MetricCard'; // Assuming MetricCard uses Tailwind directly
import { Link } from 'react-router-dom';
// Import Lucide React icons
import {
  Users,
  Briefcase,
  GraduationCap,
  Building2,
  ArrowUpRight,
  BarChart,
  MoreHorizontal
} from 'lucide-react';
import { useCrmStore } from '@/store/crmStore';

// Simple DonutChart component using Recharts (assuming Recharts is loaded via CDN or npm)
const DonutChart = ({ data, dataKey, nameKey, height }) => {
  const { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } = window.Recharts || {};

  if (!PieChart || !Pie || !Cell || !ResponsiveContainer || !Tooltip || !Legend) {
    console.warn("Recharts components not found. Please ensure Recharts is installed or loaded via CDN.");
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Chart library (Recharts) not loaded.
      </div>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey={dataKey}
          label // Add labels to slices for visibility
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};


export default function TeamDashboard() {
  const [dateRange, setDateRange] = useState('this_month');
  // Destructure users from the store
  const { users, leads, salesOrders, loading, fetchUsers, fetchLeads, fetchSalesOrders, getAnalyticsData } = useCrmStore();
  const [teamAnalytics, setTeamAnalytics] = useState({});

  // Flag to track if initial data fetch for users has completed
  const [initialUsersFetched, setInitialUsersFetched] = useState(false);

  useEffect(() => {
    // Initial fetch for users
    const loadUsers = async () => {
      await fetchUsers(); // Ensure this completes before setting the flag
      setInitialUsersFetched(true);
    };
    loadUsers();

    // Polling for leads and sales orders
    const interval = setInterval(() => {
      fetchLeads({ dateRange });
      fetchSalesOrders({ dateRange });
    }, 60000);
    return () => clearInterval(interval);
  }, [dateRange, fetchUsers, fetchLeads, fetchSalesOrders]);

  // Separate effect for analytics that depend on `users`
  useEffect(() => {
    console.log("Users state updated:", users); // Debugging: Check users data
    if (initialUsersFetched && users.length > 0) {
      // Note: The getAnalyticsData in crmStore.js might not directly support 'users' type
      // for all these specific analytics (totalStaff, aerionReps, etc.) as per your
      // recent crmStore.js updates. You might need to calculate these here or
      // extend getAnalyticsData in crmStore.js to handle 'users' type comprehensively.
      const analytics = getAnalyticsData('users', { dateRange }); // This call might need adjustment based on crmStore.js
      console.log("Calculated Team Analytics:", analytics); // Debugging: Check analytics output
      setTeamAnalytics(analytics);
    } else if (initialUsersFetched && users.length === 0) {
        console.log("Users fetched, but array is empty. No analytics calculated.");
        setTeamAnalytics({}); // Reset analytics if no users
    }
  }, [users, dateRange, getAnalyticsData, initialUsersFetched]);


  const {
    totalStaff = 0,
    aerionReps = 0,
    certificationsDue = 0,
    rolesDistributionData = [],
  } = teamAnalytics;

  // Calculate active users today from the 'users' state
  const activeUsersToday = useMemo(() => {
    // Ensure users array exists before filtering
    return (users || []).filter(
      user => user.lastActivity && new Date(user.lastActivity).toDateString() === new Date().toDateString()
    ).length;
  }, [users]); // Dependency array includes 'users' so it re-calculates when users data changes

  // Overall loading state for the dashboard
  const overallLoading = loading && !initialUsersFetched; // Only show full loading if initial users aren't loaded yet

  if (overallLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 font-sans items-center justify-center">
        <div className="text-xl text-gray-700 animate-pulse">Loading Team Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <TopHeaderBar title="Team Overview (HR) Dashboard" />
        <DateRangeSelector selectedRange={dateRange} onSelectRange={setDateRange} />
      </div>

      <p className="mt-1 text-gray-600">Manage your dealership staff and collaborate effectively with Aerion Brand Representatives.</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Dealer Staff"
          value={totalStaff}
          icon={Users}
          loading={loading} // Use general loading for metric cards
          trend="Your internal team"
        />
        <MetricCard
          title="Aerion Brand Reps"
          value={aerionReps}
          icon={Building2}
          loading={loading}
          trend="Supporting your operations"
        />
        <MetricCard
          title="Certifications Due Soon"
          value={certificationsDue}
          icon={GraduationCap}
          loading={loading}
          trend="Action Required"
          trendColor="text-red-600"
        />
        <MetricCard
          title="Active Users Today"
          value={activeUsersToday}
          icon={Briefcase}
          loading={loading}
          trend="Logged into system"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Staff Roles Distribution</h2>
          {loading ? ( // Use the general `loading` state for chart area
              <div className="h-[300px] flex items-center justify-center text-gray-600 animate-pulse">Loading chart data...</div>
          ) : rolesDistributionData.length > 0 ? (
            <DonutChart
              data={rolesDistributionData}
              dataKey="value"
              nameKey="name"
              height={300}
            />
          ) : (
            <p className="h-[300px] flex items-center justify-center text-gray-600">No roles data available for the selected period.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Team Performance Trends (Example)</h2>
          <p className="text-gray-600 text-center py-10">
            This chart would visualize key performance indicators for your team, such as average lead conversion per sales executive,
            or service request resolution times.
          </p>
        </div>
      </div>

      {/* Quick Links / Navigation to detailed views */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">User Management</h3>
          <p className="text-gray-600 mb-4">View and manage all dealership staff and Aerion Brand Representatives, including their roles and permissions.</p>
          <Link
            to="/dealer/team/users"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Manage Users <ArrowUpRight className="ml-1 h-4 w-4 inline" />
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Training & Certifications</h3>
          <p className="text-gray-600 mb-4">Track staff training completion and essential Aerion product certifications.</p>
          <Link
            to="/dealer/team/training"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Records <ArrowUpRight className="ml-1 h-4 w-4 inline" />
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Team Module Views (Enterprise Grade)</h2>
        <p className="text-gray-600">
          The Team module offers specialized views for comprehensive human resource and collaboration management:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>
            <strong className="text-blue-600">Dashboard View (Current):</strong> Aggregated KPIs and charts for overall team health and activity.
          </li>
          <li>
            <strong className="text-blue-600">User Management View (<Link to="/dealer/team/users" className="text-blue-500 hover:underline">User Management</Link>):</strong> A centralized directory for managing all dealership staff and Aerion Brand Representatives, including roles and access.
          </li>
          <li>
            <strong className="text-blue-600">Training & Certifications View (<Link to="/dealer/team/training" className="text-blue-500 hover:underline">Training & Certifications</Link>):</strong> To track professional development and compliance.
          </li>
          <li>
            <strong className="text-blue-600">Performance Analytics (Planned):</strong> Detailed individual and team performance dashboards, potentially integrated with sales/service data.
          </li>
          <li>
            <strong className="text-blue-600">Communication Logs (Planned):</strong> A history of internal communications and system interactions.
          </li>
        </ul>
      </div>
    </div>
  );
}
