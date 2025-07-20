// src/lib/api/dashboard.js

// This is a placeholder for your actual API calls.
// Replace with your real data fetching logic (e.g., using fetch, axios, or a Supabase client).

/**
 * Fetches aggregated summary data for the main DMS dashboard.
 * @param {object} dateRange - Object containing startDate, endDate, and label (e.g., { startDate: '2025-06-01', endDate: '2025-06-30', label: 'This Month' })
 * @returns {Promise<object>} An object containing KPIs and chart data.
 */
export const fetchDashboardSummaryData = async (dateRange) => {
  console.log(`Fetching dashboard summary data for: ${dateRange.label}`);
  console.log(`From ${dateRange.startDate} to ${dateRange.endDate}`);

  // --- Replace this mock data with actual API calls to your backend ---
  // Example:
  // const response = await fetch('/api/dashboard/summary', {
  //   method: 'POST', // Or GET with query params
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(dateRange),
  // });
  // if (!response.ok) {
  //   throw new Error('Failed to fetch dashboard summary data');
  // }
  // const data = await response.json();
  // return data;
  // --- End Example ---

  // Mock Data (for development until your backend is ready)
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  return {
    kpis: {
      overdueInvoicesAmount: 125000,
      lowStockItemsCount: 15,
      urgentSupportTicketsCount: 3,
      salesOrdersPastDueCount: 5,
      totalSalesRevenue: 15000000, // Example: 1.5 Crore
      newLeadsCount: 120,
      availableInventoryUnits: 5400,
      pendingPOCount: 250000,
      cashBalance: 5000000, // Example: 50 Lakhs
      billsDueNext7Days: 80000,
      openSupportRequests: 12,
      avgTicketResolutionTime: 4.5,
      activeMarketingCampaigns: 4,
      teamPerformanceScore: 85,
    },
    charts: {
      salesTrend: [ // Example data for a line/bar chart
        { month: 'Jan', value: 1000000 },
        { month: 'Feb', value: 1200000 },
        { month: 'Mar', value: 1100000 },
        { month: 'Apr', value: 1300000 },
        { month: 'May', value: 1500000 },
        { month: 'Jun', value: 1400000 },
      ],
      leadConversionFunnel: [ // Example data for a funnel/bar chart
        { stage: 'New Leads', value: 100 },
        { stage: 'Contacted', value: 70 },
        { stage: 'Qualified', value: 40 },
        { stage: 'Opportunity', value: 25 },
        { stage: 'Customer', value: 15 },
      ],
      productSales: [ // Example data for a bar chart
        { product: 'Tractor A', sales: 500 },
        { product: 'Plow B', sales: 300 },
        { product: 'Seeder C', sales: 250 },
        { product: 'Harvester D', sales: 200 },
        { product: 'Fertilizer E', sales: 150 },
      ],
      inventoryTurnover: 3.5, // Example for ProgressMeter/Gauge
      revenueExpensesTrend: [ // Example data for a combined chart
        { month: 'Jan', revenue: 100, expenses: 60 },
        { month: 'Feb', revenue: 120, expenses: 70 },
        { month: 'Mar', revenue: 110, expenses: 65 },
        { month: 'Apr', revenue: 130, expenses: 75 },
        { month: 'May', revenue: 150, expenses: 80 },
        { month: 'Jun', revenue: 140, expenses: 70 },
      ],
      ticketStatusBreakdown: [ // Example data for a pie/donut chart
        { status: 'Open', value: 7 },
        { status: 'Pending', value: 3 },
        { status: 'Resolved', value: 10 },
        { status: 'Closed', value: 5 },
      ],
    },
  };
};